/* 상시 워커(min workers) 운영 시간.
 *
 * 컨테이너 콜드스타트가 186초라 전시 중에는 워커를 상시 켜 둬야 하지만,
 * 24시간 켜 두면 유휴 GPU 비용이 그대로 나간다. 전시 시간대에만 1로 두고
 * 나머지는 0으로 내린다.
 *
 * 한국은 서머타임이 없어 KST = UTC+9로 고정이다. Vercel 크론은 항상 UTC라
 * 여기서 직접 환산한다.
 */

export const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
export const WORKER_ACTIVE_START_HOUR_KST = 9;
/* 24 = 자정. getUTCHours()는 0~23이라 `hour < 24`면 9시부터 23:59까지가
   창 안이고 00시부터는 밖이다 — 경계가 자정에 정확히 떨어진다. */
export const WORKER_ACTIVE_END_HOUR_KST = 24;

/* 전시가 끝나는 시점 — 2026년 10월 1일 00:00 KST(= 9월 30일 15:00 UTC).
   이후로는 시간대와 무관하게 상시 워커를 두지 않고, 탭 시점 워밍업만으로
   돌아간다. 날짜를 코드에 박아 두는 편이 낫다: 크론을 지우는 걸 잊어도
   10월 1일이 되면 스스로 0으로 내려가고, 워밍업 경로의 교정도 같은 값을
   본다. 전시가 연장되면 이 날짜만 미루면 된다. */
export const SCHEDULE_END_MS = Date.UTC(2026, 9, 1, 0, 0, 0) - KST_OFFSET_MS;

export function kstHourAt(now = Date.now()) {
  return new Date(now + KST_OFFSET_MS).getUTCHours();
}

export function isScheduleActive(now = Date.now()) {
  return now < SCHEDULE_END_MS;
}

/** 지금 이 시각에 켜져 있어야 할 워커 수. */
export function desiredMinWorkers(now = Date.now()) {
  if (!isScheduleActive(now)) return 0;
  const hour = kstHourAt(now);
  const active = hour >= WORKER_ACTIVE_START_HOUR_KST && hour < WORKER_ACTIVE_END_HOUR_KST;
  return active ? 1 : 0;
}

/* 엔드포인트 설정 변경은 잡 실행과 권한이 다르다. 잡만 돌리는 키는 보통
   Restricted라 관리 REST API에서 401이 난다. 그래서 Read/Write 키를 따로
   둘 수 있게 하고, 없으면 기존 키로 시도한다. */
export function getRunPodAdminApiKey() {
  return process.env.RUNPOD_ADMIN_API_KEY || process.env.RUNPOD_API_KEY || '';
}

const endpointUrl = (endpointId) =>
  `https://rest.runpod.io/v1/endpoints/${encodeURIComponent(endpointId)}`;

async function runpodRest(url, apiKey, options) {
  const response = await fetch(url, {
    ...options,
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
      ...(options?.headers || {}),
    },
    cache: 'no-store',
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const detail = JSON.stringify(payload || {}).slice(0, 200);
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        `RunPod REST ${response.status}: 이 키에는 엔드포인트 설정 변경 권한이 없다. `
        + 'Read/Write 키를 만들어 RUNPOD_ADMIN_API_KEY로 넣어야 한다.'
      );
    }
    throw new Error(`RunPod REST ${response.status} ${detail}`);
  }
  return payload;
}

export async function readRunPodMinWorkers(endpointId, apiKey) {
  const payload = await runpodRest(endpointUrl(endpointId), apiKey, { method: 'GET' });
  const value = payload?.workersMin;
  return Number.isFinite(Number(value)) ? Number(value) : null;
}

export async function setRunPodMinWorkers(endpointId, apiKey, workersMin) {
  return runpodRest(endpointUrl(endpointId), apiKey, {
    method: 'PATCH',
    body: JSON.stringify({ workersMin }),
  });
}

/** 지금 시각에 맞는 값으로 맞춘다. 이미 맞으면 아무것도 쓰지 않는다.
 *  Hobby 플랜은 크론이 하루 2회뿐이라 여닫는 시각 한 번을 놓치면 하루가
 *  통째로 어긋난다 — 워밍업이 실제로 도는 드문 순간(9분에 한 번 이하)마다
 *  같이 확인해 그 구멍을 메운다. 실패는 삼킨다: 워밍업을 막을 이유가 없다. */
export async function reconcileMinWorkers(endpointId, apiKey, now = Date.now()) {
  try {
    const want = desiredMinWorkers(now);
    const current = await readRunPodMinWorkers(endpointId, apiKey);
    if (current === want) return { changed: false, workersMin: want };
    await setRunPodMinWorkers(endpointId, apiKey, want);
    return { changed: true, workersMin: want, from: current };
  } catch {
    return null;
  }
}

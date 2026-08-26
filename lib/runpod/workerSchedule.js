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
export const WORKER_ACTIVE_END_HOUR_KST = 21;

export function kstHourAt(now = Date.now()) {
  return new Date(now + KST_OFFSET_MS).getUTCHours();
}

/** 지금 이 시각에 켜져 있어야 할 워커 수. */
export function desiredMinWorkers(now = Date.now()) {
  const hour = kstHourAt(now);
  const active = hour >= WORKER_ACTIVE_START_HOUR_KST && hour < WORKER_ACTIVE_END_HOUR_KST;
  return active ? 1 : 0;
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

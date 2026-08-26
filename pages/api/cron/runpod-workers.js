import { getRunPodCredentials, submitRunPodWarmup } from '@/lib/runpod/warmupServer';
import { safelyWriteWarmupState } from '@/lib/runpod/warmupStore';
import {
  WORKER_ACTIVE_END_HOUR_KST,
  WORKER_ACTIVE_START_HOUR_KST,
  desiredMinWorkers,
  kstHourAt,
  getRunPodAdminApiKey,
  readRunPodMinWorkers,
  setRunPodMinWorkers,
} from '@/lib/runpod/workerSchedule';

function json(res, status, data) {
  res.setHeader('cache-control', 'no-store, max-age=0');
  res.status(status).json(data);
}

/* CRON_SECRET이 있으면 그것만 인정한다. 없으면 Vercel 크론이 붙이는 헤더를
   본다 — 이 라우트는 시각에서 계산한 값만 적용하므로, 설령 외부에서 불려도
   지금 있어야 할 상태로 맞춰질 뿐이다. 임의의 값을 넣는 override는
   CRON_SECRET이 있을 때만 열린다. */
function authorize(req) {
  const secret = process.env.CRON_SECRET || '';
  if (secret) {
    return req.headers.authorization === `Bearer ${secret}`
      ? 'secret'
      : null;
  }
  const fromCron = String(req.headers['user-agent'] || '').startsWith('vercel-cron/')
    || Boolean(req.headers['x-vercel-cron-schedule'])
    || Boolean(req.headers['x-vercel-cron']);
  return fromCron ? 'cron' : null;
}

export default async function handler(req, res) {
  const auth = authorize(req);
  if (!auth) return json(res, 401, { error: 'Unauthorized' });

  const { apiKey, endpointId } = getRunPodCredentials();
  if (!apiKey || !endpointId) {
    return json(res, 200, { skipped: 'runpod_not_configured' });
  }

  const now = Date.now();
  const kstHour = kstHourAt(now);
  const override = auth === 'secret' ? String(req.query.min ?? '') : '';
  const workersMin = override === '0' || override === '1'
    ? Number(override)
    : desiredMinWorkers(now);

  const window = `${WORKER_ACTIVE_START_HOUR_KST}-${WORKER_ACTIVE_END_HOUR_KST} KST`;
  try {
    /* 이미 맞으면 건드리지 않는다 — 매시 도는 크론이 같은 값을 계속 쓰지
       않게 하고, 대시보드에서 수동으로 바꾼 값도 다음 정시에만 되돌린다. */
    const adminKey = getRunPodAdminApiKey();
    const current = await readRunPodMinWorkers(endpointId, adminKey).catch(() => null);
    if (current === workersMin) {
      return json(res, 200, { ok: true, kstHour, window, workersMin, changed: false });
    }
    await setRunPodMinWorkers(endpointId, adminKey, workersMin);

    /* 워커를 켜는 것만으로는 부족하다 — 컨테이너가 뜨는 것과 체크포인트가
       VRAM에 올라오는 것은 다르고, 후자가 70초다. 그대로 두면 아침 첫
       관람객이 그 70초를 낸다. 그래서 여는 시각에 워밍업 잡을 함께 넣어
       개관 전에 모델을 올려 둔다. 잡이 큐에 들어간 것만 확인하고 끝낸다 —
       완료를 기다리면 크론 함수가 그만큼 붙잡힌다. */
    let warmupJobId = null;
    if (workersMin === 1) {
      try {
        const host = String(req.headers['x-forwarded-host'] || req.headers.host || '');
        const proto = String(req.headers['x-forwarded-proto'] || 'https').split(',')[0];
        const run = await submitRunPodWarmup(endpointId, apiKey, {
          origin: host ? `${proto}://${host}` : '',
        });
        warmupJobId = run?.id || null;
        if (warmupJobId) {
          await safelyWriteWarmupState(endpointId, {
            status: 'warming',
            source: 'schedule-open',
            requestedAt: now,
            lastWarmupRequestedAt: now,
            jobId: warmupJobId,
          });
        }
      } catch {
        // 워밍업 실패가 스케줄 변경까지 되돌릴 이유는 없다.
      }
    }
    return json(res, 200, {
      ok: true, kstHour, window, workersMin, changed: true, from: current, warmupJobId,
    });
  } catch (error) {
    return json(res, 502, {
      ok: false,
      kstHour,
      window,
      workersMin,
      detail: String(error?.message || error).slice(0, 300),
    });
  }
}

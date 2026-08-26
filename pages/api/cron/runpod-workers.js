import { getRunPodCredentials } from '@/lib/runpod/warmupServer';
import {
  WORKER_ACTIVE_END_HOUR_KST,
  WORKER_ACTIVE_START_HOUR_KST,
  desiredMinWorkers,
  kstHourAt,
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
    const current = await readRunPodMinWorkers(endpointId, apiKey).catch(() => null);
    if (current === workersMin) {
      return json(res, 200, { ok: true, kstHour, window, workersMin, changed: false });
    }
    await setRunPodMinWorkers(endpointId, apiKey, workersMin);
    return json(res, 200, { ok: true, kstHour, window, workersMin, changed: true, from: current });
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

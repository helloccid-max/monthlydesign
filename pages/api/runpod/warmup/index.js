import { randomUUID } from 'crypto';

import {
  RUNPOD_WARMUP_LOCK_SECONDS,
  RUNPOD_WARMUP_RETRY_SECONDS,
  isRunPodWarmupEnabled,
} from '@/lib/runpod/warmupConfig';
import {
  acquireWarmupLock,
  isWarmupStoreConfigured,
  readWarmupState,
  releaseWarmupLock,
  writeWarmupState,
} from '@/lib/runpod/warmupStore';
import {
  cancelRunPodJob,
  getRunPodCredentials,
  getRunPodHealth,
  submitRunPodWarmup,
  summarizeRunPodHealth,
} from '@/lib/runpod/warmupServer';

function json(res, status, data) {
  res.setHeader('cache-control', 'no-store, max-age=0');
  res.status(status).json(data);
}

function isSameSiteRequest(req) {
  const fetchSite = String(req.headers['sec-fetch-site'] || '');
  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) return false;
  const origin = String(req.headers.origin || '');
  if (!origin) return true;
  try {
    const originHost = new URL(origin).host;
    const requestHost = String(req.headers['x-forwarded-host'] || req.headers.host || '');
    return Boolean(originHost && requestHost && originHost === requestHost);
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  if (!isSameSiteRequest(req)) return json(res, 403, { error: 'Cross-site warmup is not allowed' });
  if (!isRunPodWarmupEnabled()) {
    return json(res, 200, { enabled: false, status: 'disabled', reason: 'warmup_disabled' });
  }
  if (!isWarmupStoreConfigured()) {
    return json(res, 200, { enabled: false, status: 'disabled', reason: 'store_not_configured' });
  }

  const { apiKey, endpointId } = getRunPodCredentials();
  if (!apiKey || !endpointId) {
    return json(res, 200, { enabled: false, status: 'disabled', reason: 'runpod_not_configured' });
  }

  const now = Date.now();
  let lockToken = null;
  try {
    const existing = await readWarmupState(endpointId);
    if (Number(existing?.readyUntil || 0) > now) {
      return json(res, 200, { enabled: true, status: 'ready', source: existing.source || 'cached' });
    }
    if (existing?.status === 'warming'
      && now - Number(existing.requestedAt || 0) < RUNPOD_WARMUP_LOCK_SECONDS * 1000) {
      return json(res, 202, { enabled: true, status: 'warming', jobId: existing.jobId || null });
    }
    if (existing?.status === 'failed' && Number(existing.retryAt || 0) > now) {
      return json(res, 200, {
        enabled: true,
        status: 'cooldown',
        retryInMs: Number(existing.retryAt) - now,
      });
    }

    /* 시한을 넘긴 워밍업 잡이 남아 있으면 새 잡을 얹기 전에 치운다.
       그러지 않으면 큐가 고아 잡으로 쌓여 워커가 실제 생성을 못 받는다. */
    if (existing?.status === 'warming' && existing.jobId) {
      await cancelRunPodJob(endpointId, apiKey, existing.jobId).catch(() => null);
    }

    /* 유휴 워커가 있다는 건 컨테이너가 떠 있다는 뜻일 뿐, 체크포인트가 VRAM에
       올라와 있다는 보장이 아니다. Min Workers를 1로 두면 엔드포인트는 늘
       idle을 보고하는데, 컨테이너가 막 뜬 뒤 첫 생성은 모델 로딩에 70초가
       걸렸고 모델이 올라온 뒤에는 4초였다(실측). 그래서 유휴 워커를 ready로
       치지 않고 잡을 한 번 태워 모델을 올린다 — 모델이 올라왔다는 근거는
       readyUntil 캐시뿐이고, 그건 성공한 잡만 쓴다. */
    const health = await getRunPodHealth(endpointId, apiKey);
    const summary = summarizeRunPodHealth(health);
    if (summary.activeJobs > 0) {
      /* 이미 도는 잡이 있으면 그게 모델을 올린다 — 겹쳐 넣지 않는다. */
      await writeWarmupState(endpointId, {
        status: 'warming',
        source: 'endpoint-health',
        requestedAt: now,
        health: summary,
      });
      return json(res, 202, { enabled: true, status: 'warming', source: 'endpoint-health' });
    }

    lockToken = randomUUID();
    const acquired = await acquireWarmupLock(endpointId, lockToken);
    if (!acquired) {
      return json(res, 202, { enabled: true, status: 'warming', source: 'lock' });
    }

    await writeWarmupState(endpointId, {
      status: 'warming',
      source: 'tap-to-play',
      requestedAt: now,
      lastWarmupRequestedAt: now,
      jobId: null,
      lockToken,
    });
    const run = await submitRunPodWarmup(endpointId, apiKey);
    const jobId = run?.id || null;
    if (!jobId) throw new Error('RunPod warmup did not return a job id');

    await writeWarmupState(endpointId, {
      status: 'warming',
      source: 'tap-to-play',
      requestedAt: now,
      lastWarmupRequestedAt: now,
      jobId,
      lockToken,
    });
    return json(res, 202, { enabled: true, status: 'warming', jobId });
  } catch (error) {
    const detail = String(error?.message || error);
    try {
      await writeWarmupState(endpointId, {
        status: 'failed',
        failedAt: now,
        retryAt: now + RUNPOD_WARMUP_RETRY_SECONDS * 1000,
        detail: detail.slice(0, 500),
      });
    } catch {
      // The warmup path is best-effort and must never block the real flow.
    }
    try {
      await releaseWarmupLock(endpointId, lockToken);
    } catch {
      // TTL remains the final lock-release fallback.
    }
    return json(res, 200, { enabled: true, status: 'failed', reason: 'warmup_failed' });
  }
}

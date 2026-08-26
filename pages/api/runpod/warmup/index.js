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
  createReadyState,
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

    const health = await getRunPodHealth(endpointId, apiKey);
    const summary = summarizeRunPodHealth(health);
    if (summary.idle > 0 || summary.ready > 0) {
      await writeWarmupState(endpointId, createReadyState({ source: 'endpoint-health', now }));
      return json(res, 200, { enabled: true, status: 'ready', source: 'endpoint-health' });
    }
    if (summary.activeWorkers > 0 || summary.activeJobs > 0) {
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

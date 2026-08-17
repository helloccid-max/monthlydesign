import {
  RUNPOD_WARMUP_LOCK_SECONDS,
  isRunPodWarmupEnabled,
} from '@/lib/runpod/warmupConfig';
import {
  isWarmupStoreConfigured,
  readWarmupState,
  releaseWarmupLock,
  writeWarmupState,
} from '@/lib/runpod/warmupStore';
import {
  createFailedState,
  createReadyState,
  getRunPodCredentials,
  getRunPodHealth,
  getRunPodJobStatus,
  summarizeRunPodHealth,
} from '@/lib/runpod/warmupServer';

function json(res, status, data) {
  res.setHeader('cache-control', 'no-store, max-age=0');
  res.status(status).json(data);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });
  if (!isRunPodWarmupEnabled() || !isWarmupStoreConfigured()) {
    return json(res, 200, { enabled: false, status: 'disabled' });
  }

  const { apiKey, endpointId } = getRunPodCredentials();
  if (!apiKey || !endpointId) {
    return json(res, 200, { enabled: false, status: 'disabled' });
  }

  try {
    const state = await readWarmupState(endpointId);
    if (!state) return json(res, 200, { enabled: true, status: 'idle' });

    const now = Date.now();
    if (Number(state.readyUntil || 0) > now) {
      return json(res, 200, { enabled: true, status: state.status || 'ready', source: state.source || 'cached' });
    }
    if (state.status !== 'warming') {
      return json(res, 200, { enabled: true, status: state.status || 'idle' });
    }

    if (state.jobId) {
      const job = await getRunPodJobStatus(endpointId, apiKey, state.jobId);
      const status = String(job?.status || '').toUpperCase();
      if (status === 'COMPLETED') {
        const next = createReadyState({
          source: 'warmup-job',
          jobId: state.jobId,
          workerId: job?.workerId || job?.worker_id || null,
          now,
        });
        await writeWarmupState(endpointId, next);
        await releaseWarmupLock(endpointId, state.lockToken).catch(() => false);
        return json(res, 200, { enabled: true, status: 'ready', source: 'warmup-job' });
      }
      if (['FAILED', 'CANCELLED', 'TIMED_OUT'].includes(status)) {
        // Older handlers can reject mode=warmup after starting a container.
        const health = await getRunPodHealth(endpointId, apiKey);
        const summary = summarizeRunPodHealth(health);
        if (summary.idle > 0 || summary.ready > 0) {
          const next = createReadyState({ source: 'container-health', jobId: state.jobId, now });
          next.status = 'container-ready';
          await writeWarmupState(endpointId, next);
          await releaseWarmupLock(endpointId, state.lockToken).catch(() => false);
          return json(res, 200, { enabled: true, status: 'container-ready' });
        }
        const next = createFailedState({
          jobId: state.jobId,
          detail: job?.error || status,
          now,
        });
        await writeWarmupState(endpointId, next);
        await releaseWarmupLock(endpointId, state.lockToken).catch(() => false);
        return json(res, 200, { enabled: true, status: 'failed' });
      }
      return json(res, 200, { enabled: true, status: 'warming', jobId: state.jobId });
    }

    const health = await getRunPodHealth(endpointId, apiKey);
    const summary = summarizeRunPodHealth(health);
    if (summary.idle > 0 || summary.ready > 0) {
      const next = createReadyState({ source: 'endpoint-health', now });
      await writeWarmupState(endpointId, next);
      return json(res, 200, { enabled: true, status: 'ready', source: 'endpoint-health' });
    }
    if (summary.activeWorkers > 0 || summary.activeJobs > 0) {
      return json(res, 200, { enabled: true, status: 'warming' });
    }

    const stale = now - Number(state.requestedAt || 0) >= RUNPOD_WARMUP_LOCK_SECONDS * 1000;
    return json(res, 200, { enabled: true, status: stale ? 'idle' : 'warming' });
  } catch {
    return json(res, 200, { enabled: true, status: 'unknown' });
  }
}

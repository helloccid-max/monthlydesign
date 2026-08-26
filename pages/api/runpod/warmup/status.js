import {
  RUNPOD_WARMUP_LOCK_SECONDS,
  isRunPodWarmupEnabled,
} from '@/lib/runpod/warmupConfig';
import {
  clearWarmupState,
  isWarmupStoreConfigured,
  readWarmupState,
  releaseWarmupLock,
  writeWarmupState,
} from '@/lib/runpod/warmupStore';
import {
  cancelRunPodJob,
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
    const now = Date.now();

    /* 1) 아직 유효한 ready 캐시. */
    if (state && Number(state.readyUntil || 0) > now) {
      return json(res, 200, {
        enabled: true,
        status: state.status || 'ready',
        source: state.source || 'cached',
        readyForMs: Number(state.readyUntil) - now,
      });
    }

    /* 2) 워밍 중이면 잡을 따라간다. */
    if (state?.status === 'warming' && state.jobId) {
      const job = await getRunPodJobStatus(endpointId, apiKey, state.jobId);
      const jobStatus = String(job?.status || '').toUpperCase();
      if (jobStatus === 'COMPLETED') {
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
      const health = await getRunPodHealth(endpointId, apiKey);
      const summary = summarizeRunPodHealth(health);
      if (['FAILED', 'CANCELLED', 'TIMED_OUT'].includes(jobStatus)) {
        // 옛 핸들러는 컨테이너를 띄운 뒤 mode=warmup을 거절할 수 있다.
        if (summary.idle > 0 || summary.ready > 0) {
          const next = createReadyState({ source: 'container-health', jobId: state.jobId, now });
          next.status = 'container-ready';
          await writeWarmupState(endpointId, next);
          await releaseWarmupLock(endpointId, state.lockToken).catch(() => false);
          return json(res, 200, { enabled: true, status: 'container-ready', health: summary });
        }
        const next = createFailedState({ jobId: state.jobId, detail: job?.error || jobStatus, now });
        await writeWarmupState(endpointId, next);
        await releaseWarmupLock(endpointId, state.lockToken).catch(() => false);
        return json(res, 200, { enabled: true, status: 'failed', jobStatus, health: summary });
      }
      const stale = now - Number(state.requestedAt || 0) >= RUNPOD_WARMUP_LOCK_SECONDS * 1000;
      /* 락 시한을 넘겼는데도 아직 큐에 있다면 그 잡은 되살아나지 않는다.
         워커가 한 대뿐인 엔드포인트에서는 이런 잡 하나가 뒤따르는 실제 생성
         잡까지 막으므로 취소하고 상태를 비운다 — 다음 호출이 엔드포인트를
         새로 보고 판단한다. */
      if (stale) {
        await cancelRunPodJob(endpointId, apiKey, state.jobId).catch(() => null);
        await releaseWarmupLock(endpointId, state.lockToken).catch(() => false);
        await clearWarmupState(endpointId).catch(() => null);
        return json(res, 200, {
          enabled: true,
          status: 'idle',
          cancelled: state.jobId,
          jobStatus,
          health: summary,
        });
      }
      /* 아직 시한 안 — 큐에 갇힌 것과 워커가 물고 있는 것은 원인이 다르므로
         jobStatus와 워커 수를 그대로 실어 보낸다. */
      return json(res, 200, {
        enabled: true,
        status: 'warming',
        jobId: state.jobId,
        jobStatus,
        stale,
        health: summary,
      });
    }

    /* 3) 그 밖에는 저장값을 되풀이하지 않고 엔드포인트를 실제로 본다.
       예전에는 만료된 ready를 그대로 돌려줘서, 식은 지 한참인 엔드포인트가
       계속 ready로 보고됐다. */
    const health = await getRunPodHealth(endpointId, apiKey);
    const summary = summarizeRunPodHealth(health);
    if (summary.idle > 0 || summary.ready > 0) {
      await writeWarmupState(endpointId, createReadyState({ source: 'endpoint-health', now }));
      return json(res, 200, { enabled: true, status: 'ready', source: 'endpoint-health', health: summary });
    }
    if (summary.activeWorkers > 0 || summary.activeJobs > 0) {
      return json(res, 200, { enabled: true, status: 'warming', source: 'endpoint-health', health: summary });
    }
    return json(res, 200, { enabled: true, status: 'idle', health: summary });
  } catch {
    return json(res, 200, { enabled: true, status: 'unknown' });
  }
}

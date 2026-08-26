import { runpodFetch } from './fetch';
import {
  RUNPOD_READY_TTL_SECONDS,
  RUNPOD_WARMUP_RETRY_SECONDS,
  getRunPodWarmupInput,
} from './warmupConfig';
import { safelyWriteWarmupState } from './warmupStore';

export function getRunPodCredentials() {
  return {
    apiKey: process.env.RUNPOD_API_KEY || '',
    endpointId: process.env.RUNPOD_ENDPOINT_ID || '',
  };
}

export async function getRunPodHealth(endpointId, apiKey) {
  const url = `https://api.runpod.ai/v2/${encodeURIComponent(endpointId)}/health`;
  return runpodFetch(url, apiKey, { method: 'GET' });
}

export function summarizeRunPodHealth(health) {
  const workers = health?.workers || {};
  const jobs = health?.jobs || {};
  const idle = Number(workers.idle || 0);
  const running = Number(workers.running || 0);
  const initializing = Number(workers.initializing || 0);
  const ready = Number(workers.ready || 0);
  const inQueue = Number(jobs.inQueue ?? jobs.in_queue ?? 0);
  const inProgress = Number(jobs.inProgress ?? jobs.in_progress ?? 0);
  return {
    idle,
    running,
    initializing,
    ready,
    inQueue,
    inProgress,
    activeWorkers: idle + running + initializing + ready,
    activeJobs: inQueue + inProgress,
  };
}

export async function submitRunPodWarmup(endpointId, apiKey) {
  const url = `https://api.runpod.ai/v2/${encodeURIComponent(endpointId)}/run`;
  return runpodFetch(url, apiKey, {
    method: 'POST',
    body: JSON.stringify({ input: getRunPodWarmupInput() }),
  });
}

export async function getRunPodJobStatus(endpointId, apiKey, jobId) {
  const url = `https://api.runpod.ai/v2/${encodeURIComponent(endpointId)}/status/${encodeURIComponent(jobId)}`;
  return runpodFetch(url, apiKey, { method: 'GET' });
}

/** 큐에 갇힌 워밍업 잡을 취소한다. 워커가 한 대뿐이면 이런 잡 하나가
 *  뒤따르는 실제 생성 잡까지 막으므로, 되살릴 수 없는 잡은 치워야 한다. */
export async function cancelRunPodJob(endpointId, apiKey, jobId) {
  const url = `https://api.runpod.ai/v2/${encodeURIComponent(endpointId)}/cancel/${encodeURIComponent(jobId)}`;
  return runpodFetch(url, apiKey, { method: 'POST' });
}

export function createReadyState({ source, jobId = null, workerId = null, now = Date.now() }) {
  return {
    status: 'ready',
    source,
    jobId,
    workerId,
    lastSuccessfulAt: now,
    readyUntil: now + RUNPOD_READY_TTL_SECONDS * 1000,
  };
}

export function createFailedState({ jobId = null, detail = '', now = Date.now() }) {
  return {
    status: 'failed',
    jobId,
    detail: String(detail || '').slice(0, 500),
    failedAt: now,
    retryAt: now + RUNPOD_WARMUP_RETRY_SECONDS * 1000,
  };
}

export async function recordSuccessfulRunPodGeneration({ endpointId, jobId, workerId }) {
  return safelyWriteWarmupState(endpointId, createReadyState({
    source: 'generation',
    jobId,
    workerId,
  }));
}

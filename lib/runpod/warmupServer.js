import { buildWorkflowPayload } from '@/lib/comfy/buildWorkflow';

import { runpodFetch } from './fetch';
import {
  RUNPOD_READY_TTL_SECONDS,
  RUNPOD_WARMUP_RETRY_SECONDS,
  WARMUP_IMAGE_PATH,
  getRunPodWarmupInput,
  isPromptOnlyInput,
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

/* 워밍업은 생성과 똑같은 잡을 한 번 태운다 — 컨테이너를 깨우는 게 아니라
   체크포인트를 VRAM에 올리는 게 목적이고, 그건 같은 워크플로를 돌려야만
   보장된다. 워커는 workflow가 없으면 즉시 거절한다. */
export async function submitRunPodWarmup(endpointId, apiKey, { origin } = {}) {
  const input = getRunPodWarmupInput();
  if (!input.image && origin) input.image = `${origin}${WARMUP_IMAGE_PATH}`;
  if (!input.workflow && !isPromptOnlyInput()) {
    const workflow = await buildWorkflowPayload({
      mode: input.mode,
      prompt: input.prompt,
      texturePrompt: input.texture_prompt,
      imageUrl: input.image,
    });
    if (!workflow || Object.keys(workflow).length === 0) {
      throw new Error('Warmup could not load the Comfy workflow');
    }
    input.workflow = workflow;
  }
  const url = `https://api.runpod.ai/v2/${encodeURIComponent(endpointId)}/run`;
  return runpodFetch(url, apiKey, {
    method: 'POST',
    body: JSON.stringify({ input }),
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

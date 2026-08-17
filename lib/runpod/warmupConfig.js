export const RUNPOD_IDLE_TIMEOUT_SECONDS = 600;
export const RUNPOD_READY_TTL_SECONDS = 540;
export const RUNPOD_WARMUP_LOCK_SECONDS = 240;
export const RUNPOD_WARMUP_RETRY_SECONDS = 120;
export const RUNPOD_STATE_TTL_SECONDS = 86400;

export function isRunPodWarmupEnabled() {
  const value = process.env.RUNPOD_WARMUP_ENABLED;
  if (value === undefined || value === null || value === '') return true;
  return String(value).toLowerCase() === 'true' || value === '1';
}

export function getRunPodWarmupInput() {
  const configured = String(process.env.RUNPOD_WARMUP_INPUT_JSON || '').trim();
  if (configured) {
    const parsed = JSON.parse(configured);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('RUNPOD_WARMUP_INPUT_JSON must be a JSON object');
    }
    return parsed;
  }

  // The worker should load the same checkpoint/CLIP/VAE as generation and
  // return without rendering. An older worker may only wake the container.
  return { mode: 'warmup', warmup: true };
}

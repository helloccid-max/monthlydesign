const POLL_INTERVAL_MS = 5000;
const POLL_LIMIT = 36;

let prewarmPromise = null;

const sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

async function requestJson(url, options) {
  const response = await fetch(url, {
    credentials: 'same-origin',
    cache: 'no-store',
    ...options,
  });
  if (!response.ok) throw new Error(`RunPod prewarm ${response.status}`);
  return response.json();
}

async function runPrewarm() {
  const initial = await requestJson('/api/runpod/warmup', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{}',
    keepalive: true,
  });
  if (!initial?.enabled || ['ready', 'container-ready', 'disabled', 'cooldown', 'failed'].includes(initial.status)) {
    return initial;
  }

  for (let attempt = 0; attempt < POLL_LIMIT; attempt += 1) {
    await sleep(POLL_INTERVAL_MS);
    const state = await requestJson('/api/runpod/warmup/status', { method: 'GET' });
    if (!state?.enabled || !['warming', 'unknown'].includes(state.status)) return state;
  }
  return { enabled: true, status: 'warming' };
}

export function startRunPodPrewarm() {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (!prewarmPromise) {
    prewarmPromise = runPrewarm().catch(() => ({ enabled: true, status: 'unknown' }));
  }
  return prewarmPromise;
}

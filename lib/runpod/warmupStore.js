import {
  RUNPOD_STATE_TTL_SECONDS,
  RUNPOD_WARMUP_LOCK_SECONDS,
} from './warmupConfig';

function getRedisConfig() {
  const url = String(
    process.env.UPSTASH_REDIS_REST_URL
      || process.env.KV_REST_API_URL
      || ''
  ).replace(/\/$/u, '');
  const token = String(
    process.env.UPSTASH_REDIS_REST_TOKEN
      || process.env.KV_REST_API_TOKEN
      || ''
  );
  return { url, token };
}

function safeEndpointKey(endpointId) {
  return String(endpointId || 'unknown').replace(/[^a-zA-Z0-9_-]/gu, '_');
}

const stateKey = (endpointId) => `monthlydesign:runpod:${safeEndpointKey(endpointId)}:warmup-state`;
const lockKey = (endpointId) => `monthlydesign:runpod:${safeEndpointKey(endpointId)}:warmup-lock`;

async function command(args) {
  const { url, token } = getRedisConfig();
  if (!url || !token) throw new Error('RunPod warmup store is not configured');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
    cache: 'no-store',
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.error) {
    throw new Error(`Warmup store error: ${payload?.error || response.statusText}`);
  }
  return payload?.result;
}

export function isWarmupStoreConfigured() {
  const { url, token } = getRedisConfig();
  return Boolean(url && token);
}

export async function readWarmupState(endpointId) {
  const raw = await command(['GET', stateKey(endpointId)]);
  if (!raw) return null;
  if (typeof raw === 'object') return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function writeWarmupState(endpointId, state) {
  const value = JSON.stringify({ ...state, updatedAt: Date.now() });
  await command([
    'SET',
    stateKey(endpointId),
    value,
    'EX',
    String(RUNPOD_STATE_TTL_SECONDS),
  ]);
  return state;
}

/** 고아 상태를 지운다 — 다음 호출이 엔드포인트를 새로 보고 판단하게 한다. */
export async function clearWarmupState(endpointId) {
  await command(['DEL', stateKey(endpointId)]);
}

export async function acquireWarmupLock(endpointId, token) {
  const result = await command([
    'SET',
    lockKey(endpointId),
    token,
    'NX',
    'EX',
    String(RUNPOD_WARMUP_LOCK_SECONDS),
  ]);
  return result === 'OK';
}

export async function releaseWarmupLock(endpointId, token) {
  if (!token) return false;
  const script = [
    "if redis.call('get', KEYS[1]) == ARGV[1] then",
    "  return redis.call('del', KEYS[1])",
    'end',
    'return 0',
  ].join('\n');
  const result = await command(['EVAL', script, '1', lockKey(endpointId), token]);
  return Number(result) === 1;
}

export async function safelyWriteWarmupState(endpointId, state) {
  if (!isWarmupStoreConfigured()) return false;
  try {
    await writeWarmupState(endpointId, state);
    return true;
  } catch (error) {
    console.warn('RunPod warmup state write skipped:', String(error?.message || error));
    return false;
  }
}

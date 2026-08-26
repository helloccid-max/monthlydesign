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

  // 실측 결과 워커는 생성과 똑같은 형태를 요구한다 — mode/warmup 플래그만
  // 보내면 "Missing 'workflow' parameter"로 즉시 실패한다. 그래서 워밍업도
  // 실제 texture 잡과 같은 입력을 쓰고, 워크플로는 호출부에서 붙인다.
  return {
    mode: 'texture',
    texture_prompt: WARMUP_TEXTURE_PROMPT,
    image_name: 'warmup',
  };
}

/** 워밍업이 쓰는 기준 표지 — 사이트에 이미 실려 있어 추가 자산이 필요 없다. */
export const WARMUP_IMAGE_PATH = '/covers/D277-2001-07-intro.webp';
export const WARMUP_TEXTURE_PROMPT = 'warmup';

/** run.js와 같은 판정 — 워크플로를 서버에서 만들어 붙일지 여부. */
export function isPromptOnlyInput() {
  const v = process.env.RUNPOD_INPUT_PROMPT_ONLY;
  if (v === undefined || v === null || v === '') return true;
  return String(v).toLowerCase() === 'true' || v === '1';
}

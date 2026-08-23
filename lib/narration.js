/* 전시 나래이션 컨트롤러 (싱글턴).
 *
 * 파트 1(54.9s): 인트로 — 탭 제스처 안에서 재생을 시작해야 하며,
 *   같은 제스처에서 파트 2도 무음 재생→즉시 정지로 '언락'해 둔다
 *   (iOS/Safari는 제스처 밖에서 새 오디오 재생을 막는다).
 * 파트 2(43.3s): 표지 선택 화면 도착 시 재생. 마이크 세션 동안에는
 *   덕킹(볼륨을 낮춤)해 STT와 발화를 방해하지 않는다.
 */

const INTRO_SRC = '/audio/narration-intro.mp3';
const COVER_SRC = '/audio/narration-cover.mp3';
const DUCKED_VOLUME = 0.12;
/* SOUND ON 토스트(탭 +1.2s)와 함께 나래이션이 시작된다. */
const INTRO_START_DELAY_MS = 1200;

const state = {
  intro: null,
  cover: null,
  volumeTimer: null,
};

function getAudio(key, src) {
  if (typeof window === 'undefined') return null;
  if (!state[key]) {
    const audio = new Audio(src);
    audio.preload = 'auto';
    state[key] = audio;
  }
  return state[key];
}

/** 탭 제스처 안에서 호출: 파트 1을 언락한 뒤 SOUND ON 타이밍(1.2s)에
 *  재생을 시작하고, 파트 2도 같은 제스처에서 언락해 둔다. */
export function startIntroNarration() {
  const intro = getAudio('intro', INTRO_SRC);
  if (intro) {
    // 제스처 안에서 무음 재생→정지로 언락 — 이후의 지연 play()가 허용된다.
    intro.muted = true;
    intro.play().then(() => {
      intro.pause();
      intro.currentTime = 0;
      intro.muted = false;
    }).catch(() => { intro.muted = false; });
    window.setTimeout(() => {
      intro.currentTime = 0;
      intro.play().catch(() => {});
    }, INTRO_START_DELAY_MS);
  }
  const cover = getAudio('cover', COVER_SRC);
  if (cover) {
    cover.muted = true;
    cover.play().then(() => {
      cover.pause();
      cover.currentTime = 0;
      cover.muted = false;
    }).catch(() => { cover.muted = false; });
  }
}

export function stopIntroNarration() {
  state.intro?.pause();
}

/** 표지 선택 화면 도착 시 호출 — 세션당 한 번. */
export function startCoverNarration() {
  const cover = getAudio('cover', COVER_SRC);
  if (!cover) return;
  cover.volume = 1;
  cover.currentTime = 0;
  cover.play().catch(() => {});
}

/** 마이크 세션 동안 나래이션을 낮춘다(부드러운 램프). */
export function duckNarration(active) {
  const cover = state.cover;
  if (!cover) return;
  const target = active ? DUCKED_VOLUME : 1;
  window.clearInterval(state.volumeTimer);
  state.volumeTimer = window.setInterval(() => {
    const delta = target - cover.volume;
    if (Math.abs(delta) <= 0.08) {
      cover.volume = target;
      window.clearInterval(state.volumeTimer);
      return;
    }
    cover.volume += Math.sign(delta) * 0.08;
  }, 50);
}

export function stopAllNarration() {
  window.clearInterval(state.volumeTimer);
  state.intro?.pause();
  state.cover?.pause();
}

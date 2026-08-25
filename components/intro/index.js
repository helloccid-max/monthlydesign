import { useCallback, useEffect, useRef, useState } from 'react';
import Grainient from '@/components/Grainient';
import { startRunPodPrewarm } from '@/lib/runpod/prewarmClient';
import createAtlasRenderer from './atlasRenderer';
import { startIntroNarration, stopIntroNarration } from '@/lib/narration';
import styles from './styles.module.css';

const INTRO_IDLE_MS = 1800;
const INTRO_AUTO_ADVANCE_ENABLED = false;
// 2카드 시퀀스: 탭 후 0.5초간 타이틀이 꿈틀(프레스 팝)하고, 타이틀 상승과
// 표지 상승이 같은 커브·같은 구간으로 동시에 움직인다 — 뷰포인트가 아래층으로
// 내려가는 카메라 팬. 표지가 뒤집히면 뒷면이 곧 시각화 캔버스(iframe)이고,
// 카드 창이 줌인되면서 캔버스가 풀스크린을 이어받는다.
// 나래이션 동기: 파트 1이 SOUND ON(탭 +1.2s)과 함께 시작되고, 타이틀은
// 이동 없이 1문단이 끝나는 지점(오디오 23.2s → 탭 +24.4s)에서 페이드만
// 한다. 표지 시퀀스는 그 뒤를 잇고, 하이퍼볼릭→타임라인 morph는
// "50년의 연대기 지도" 문장(≈탭 +49.5s)에, 인트로 종료는 "경험을
// 더했다"가 끝나는 ≈탭 +64.8s에 온다.
// 표지가 화면 아래에서 등장하기 시작하는 순간(2.0s)에 맞춰 타이틀도
// 함께 회전 상승하며 페이드 아웃한다 — 두 층이 같이 움직인다.
const TITLE_FADE_START_MS = 2100;
const TITLE_FADE_DURATION_MS = 1500;
// 표지는 나래이션이 "2001년 7월호"를 말할 때(탭 +2.1~3.6s 발화) 아래에서
// 올라온다 — 2.0s 시작, 3.8s 안착.
const COVER_ENTER_START_MS = 2000;
const COVER_ENTER_DURATION_MS = 1800;
// 나래이션이 "인터넷의 복잡한 연결 관계를"의 "인터넷"을 말하는 순간
// (오디오 5.14s → 탭 +6.35s)에 표지가 이미지 1로 넘어가고, 이후 2.8s
// 간격(회전 0.81s + 대기)으로 8장이 이어진다 — 마지막 착지 ≈26.8s.
const ARTICLE_PAGE_COUNT = 8;
const ARTICLE_CYCLE_START_MS = 6350;
const ARTICLE_FRAME_MS = 2800;
const ARTICLE_PAGES = Array.from(
  { length: ARTICLE_PAGE_COUNT },
  (_, index) => `/covers/article-200107/${String(index + 1).padStart(2, '0')}.webp`
);
const INTRO_COVER_SRC = '/covers/D277-2001-07-intro.webp';
// 플립 시퀀스: 277 표지 → 특집 지면 8장. 레퍼런스 영상처럼 매 전환마다
// 카드가 Y축 +180° 돌며 반대 면에 미리 실린 다음 장을 드러낸다.
const PAGE_SEQUENCE = [INTRO_COVER_SRC, ...ARTICLE_PAGES];
// 8장 페이지 넘김이 끝나면(마지막 착지 ≈28.85s) 잠시 숨을 고른 뒤,
// 카드가 위로 회전 상승하며 떠나고 하이퍼볼릭 캔버스가 작은 크기에서
// 화면 가득 확대되어 이어받는다.
const COVER_SEQUENCE_DURATION_MS = 29800;
// 캔버스가 나타나기 전 리빌을 미리 끌어올리는 램프 시작점.
const PRE_REVEAL_START_MS = 27700;
// 플립 중 뒷면이 열리는 동안 캔버스가 새까맣지 않도록 미리 올려두는 리빌 —
// 플립이 끝나는 시점에 램프도 끝나, 뒷면이 열리는 동안 원판이 살아난다.
const COVER_PRE_REVEAL_TARGET = 0.55;
const EXPLORATION_FALLBACK_MS = COVER_SEQUENCE_DURATION_MS;
const FOCUS_DELAY_MS = 650;
const FOCUS_DURATION_MS = 820;
const POST_FOCUS_HOLD_MS = 5200;
// started(29.8s) + 0.745×26400 ≈ 49.5s(morph) / 56.2s + 8600 ≈ 64.8s(종료).
const AUTOPLAY_DURATION_MS = 26400;
const AUTOPLAY_END_HOLD_MS = 8600;
const TOPOLOGY_SOUND_START_PROGRESS = 0.24;
const TOPOLOGY_SOUND_FADE_IN_SECONDS = 1.35;
const INTRO_ASSET_RELEASE_MS = 10000;
const TITLE_LINES = ['From', 'Information', 'Architecture', 'to Generative', 'Systems'];

// Loading → Tap to Play 전환: 기본형 타자기 — Loading을 오른쪽부터 지운 뒤
// Tap to Play를 왼쪽부터 타이핑한다. 진행에 ease-in을 걸어 갈수록 빨라진다.
const START_PROMPT_LOADING_TEXT = 'LOADING';
const START_PROMPT_READY_TEXT = 'TAP TO PLAY';
// 준비 완료 프롬프트는 라임 하이라이트가 타자 치듯 번진다 — 단어별로 한
// 글자씩 물들고, 다음 단어가 시작되면 앞 단어는 흰색으로 돌아간다(5fps).
const PROMPT_WORDS = ['TAP', 'TO', 'PLAY'];
const PROMPT_HIGHLIGHT_STEP_MS = 200;
const PROMPT_HIGHLIGHT_STEPS = [
  { word: 0, lit: 1 }, { word: 0, lit: 2 }, { word: 0, lit: 3 }, { word: 0, lit: 3 },
  { word: 1, lit: 1 }, { word: 1, lit: 2 }, { word: 1, lit: 2 },
  { word: 2, lit: 1 }, { word: 2, lit: 2 }, { word: 2, lit: 3 }, { word: 2, lit: 4 },
  { word: 2, lit: 4 },
];
const START_PROMPT_ERASE_DURATION_MS = 233;
const START_PROMPT_TYPE_DURATION_MS = 500;
// Mobile image decoding or iframe rendering can occasionally occupy the main
// thread for several frames. Advancing from the wall clock would then jump
// over the topology contraction and lime-panel choreography. Cap the amount
// consumed by a single frame so a slow device stretches the sequence instead
// of deleting its important beats.
const INTRO_MAX_FRAME_DELTA_MS = 64;

const clampAudio = (value, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));
const seededUnit = (value) => {
  const result = Math.sin(value * 12.9898) * 43758.5453;
  return result - Math.floor(result);
};

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const segment = (value, start, end) => clamp01((value - start) / Math.max(0.0001, end - start));
// A physically suggestive move: a short gathering phase, a pronounced burst
// of speed, then a longer controlled settle. The two halves meet with the
// same velocity, so the acceleration reads as intentional rather than jerky.
const easeHumanImpulse = (value) => {
  const progress = clamp01(value);
  const split = 0.4;
  const risePower = 2.8;
  const settlePower = 4.2;
  const anchor = (settlePower * split)
    / (risePower * (1 - split) + settlePower * split);
  if (progress <= split) {
    return anchor * ((progress / split) ** risePower);
  }
  const settle = (progress - split) / (1 - split);
  return anchor + (1 - anchor) * (1 - ((1 - settle) ** settlePower));
};
const easeOutQuint = (value) => 1 - ((1 - value) ** 5);

function createCyberAtlasSoundEngine() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;

  const context = new AudioContext({ latencyHint: 'interactive' });
  const master = context.createGain();
  const compressor = context.createDynamicsCompressor();
  const bedFilter = context.createBiquadFilter();
  const bedGain = context.createGain();
  const bedA = context.createOscillator();
  const bedB = context.createOscillator();

  master.gain.value = 0.0001;
  compressor.threshold.value = -24;
  compressor.knee.value = 10;
  compressor.ratio.value = 7;
  compressor.attack.value = 0.002;
  compressor.release.value = 0.14;
  bedFilter.type = 'lowpass';
  bedFilter.frequency.value = 150;
  bedFilter.Q.value = 4.2;
  bedGain.gain.value = 0.0001;
  bedA.type = 'sine';
  bedB.type = 'triangle';
  bedA.frequency.value = 48;
  bedB.frequency.value = 72;

  bedA.connect(bedGain);
  bedB.connect(bedGain);
  bedGain.connect(bedFilter);
  bedFilter.connect(master);
  master.connect(compressor);
  compressor.connect(context.destination);
  bedA.start();
  bedB.start();

  const noiseBuffer = context.createBuffer(1, Math.ceil(context.sampleRate * 0.055), context.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let index = 0; index < noiseData.length; index += 1) {
    noiseData[index] = (Math.random() * 2 - 1) * (1 - index / noiseData.length);
  }

  let active = false;
  let audible = false;
  let stopped = false;
  let lastStep = -1;
  let lastSeed = null;

  const pulse = (frequency, duration, level, type = 'sine', pan = 0) => {
    if (!active || stopped || context.state === 'closed') return;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const panner = typeof context.createStereoPanner === 'function' ? context.createStereoPanner() : null;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(Math.max(28, frequency), now);
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.exponentialRampToValueAtTime(Math.max(0.0002, level), now + 0.003);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(envelope);
    if (panner) {
      panner.pan.value = clampAudio(pan, -1, 1);
      envelope.connect(panner);
      panner.connect(master);
    } else {
      envelope.connect(master);
    }
    oscillator.start(now);
    oscillator.stop(now + duration + 0.015);
  };

  const noiseTick = (level, pan) => {
    if (!active || stopped || context.state === 'closed') return;
    const now = context.currentTime;
    const source = context.createBufferSource();
    const highpass = context.createBiquadFilter();
    const envelope = context.createGain();
    const panner = typeof context.createStereoPanner === 'function' ? context.createStereoPanner() : null;
    source.buffer = noiseBuffer;
    highpass.type = 'highpass';
    highpass.frequency.value = 2600;
    envelope.gain.setValueAtTime(Math.max(0.0002, level), now);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
    source.connect(highpass);
    highpass.connect(envelope);
    if (panner) {
      panner.pan.value = clampAudio(pan, -1, 1);
      envelope.connect(panner);
      panner.connect(master);
    } else {
      envelope.connect(master);
    }
    source.start(now);
  };

  return {
    async start({ muted = false } = {}) {
      if (stopped) return;
      await context.resume();
      active = true;
      if (muted) return;
      audible = true;
      const now = context.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
      master.gain.exponentialRampToValueAtTime(0.18, now + 0.32);
      bedGain.gain.exponentialRampToValueAtTime(0.026, now + 0.8);
    },
    fadeIn(duration = TOPOLOGY_SOUND_FADE_IN_SECONDS) {
      if (!active || audible || stopped || context.state === 'closed') return;
      audible = true;
      const now = context.currentTime;
      const safeDuration = Math.max(0.08, Number(duration) || TOPOLOGY_SOUND_FADE_IN_SECONDS);
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
      master.gain.exponentialRampToValueAtTime(0.18, now + safeDuration);
      bedGain.gain.cancelScheduledValues(now);
      bedGain.gain.setValueAtTime(Math.max(bedGain.gain.value, 0.0001), now);
      bedGain.gain.exponentialRampToValueAtTime(0.026, now + safeDuration * 1.12);
    },
    update(sample) {
      if (!active || !audible || stopped || !sample || context.state === 'closed') return;
      const now = context.currentTime;
      const progress = clampAudio(Number(sample.progress) || 0);
      const depth = Math.max(0, Number(sample.pointDepth) || 0);
      const degree = Math.max(0, Number(sample.pointDegree) || 0);
      const radius = clampAudio(Number(sample.pointRadius) || 0);
      const degreeEnergy = Math.max(0, Number(sample.degreeEnergy) || 0);
      const depthEnergy = Math.max(0, Number(sample.depthEnergy) || 0);
      const seed = Number(sample.seed) || 1;
      const base = 44 + (seed % 13) * 1.45;

      bedA.frequency.setTargetAtTime(base * (1 + progress * 0.08), now, 0.11);
      bedB.frequency.setTargetAtTime(base * (1.5 + (depthEnergy % 5) * 0.025), now, 0.16);
      bedFilter.frequency.setTargetAtTime(105 + radius * 130 + degreeEnergy * 7, now, 0.08);
      bedFilter.Q.setTargetAtTime(3.2 + progress * 5.5, now, 0.12);
      bedGain.gain.setTargetAtTime(0.014 + radius * 0.018, now, 0.12);

      const step = Math.floor(progress * 128);
      if (step === lastStep) return;
      lastStep = step;
      const variation = seededUnit(seed + sample.pointIndex * 0.173 + step * 2.41);
      const pan = radius * 2 - 1;
      const scaleStep = (depth + Math.round(degreeEnergy)) % 17;
      const clickFrequency = 720 * (2 ** (scaleStep / 12)) * (1 + variation * 0.18);
      pulse(clickFrequency, 0.012 + variation * 0.026, 0.042 + Math.min(0.032, degree * 0.0028), variation > 0.72 ? 'square' : 'sine', pan);

      if (step % 8 === 0 || degree > 8) {
        pulse(base * (1 + (depth % 4) * 0.25), 0.11 + radius * 0.08, 0.085, 'sine', -pan * 0.45);
      }
      if (variation > 0.67) noiseTick(0.025 + variation * 0.025, -pan);
      if (lastSeed !== seed) {
        lastSeed = seed;
        pulse(base * 2, 0.34, 0.065, 'triangle', 0);
        noiseTick(0.055, 0);
      }
    },
    stop() {
      if (stopped || context.state === 'closed') return;
      stopped = true;
      active = false;
      audible = false;
      const now = context.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.58);
      window.setTimeout(() => context.close().catch(() => {}), 650);
    },
  };
}

export default function IntroScreen({
  onExitStart,
  onDone,
  debugState = null,
  canExit = true,
} = {}) {
  const [engaged, setEngaged] = useState(false);
  const [started, setStarted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [scrubProgress, setScrubProgress] = useState(0);
  const [startPromptText, setStartPromptText] = useState(START_PROMPT_LOADING_TEXT);
  const [promptHighlightStep, setPromptHighlightStep] = useState(0);
  const [coverAssetReady, setCoverAssetReady] = useState(false);
  const [topologyAssetReady, setTopologyAssetReady] = useState(false);
  const [assetReleaseExpired, setAssetReleaseExpired] = useState(false);
  // 카드 위에서 넘어가는 특집 지면 인덱스(-1 = 277 표지).
  const [articleFrame, setArticleFrame] = useState(-1);
  // 플리퍼 양면에 실린 시퀀스 인덱스. 들어오는 면은 이전 스텝이 미리
  // 실어 두고, 나가는 면은 플립이 끝나 가려진 뒤에야 다음 장으로 바뀐다.
  const [faceAIndex, setFaceAIndex] = useState(0);
  const [faceBIndex, setFaceBIndex] = useState(1);
  // 플립이 도는 동안 배경 캔버스를 미리 깨워두는 리빌.
  const [preReveal, setPreReveal] = useState(0);
  const completedRef = useRef(false);
  const pendingCompleteRef = useRef(false);
  const atlasCanvasRef = useRef(null);
  const atlasApiRef = useRef(null);
  const atlasHandlersRef = useRef({});
  const scrubProgressRef = useRef(0);
  const soundEngineRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const startedRef = useRef(false);
  const interactionActiveRef = useRef(false);
  const minimumExitAtRef = useRef(0);
  const introAssetsReady = (coverAssetReady && topologyAssetReady) || assetReleaseExpired;

  const complete = useCallback(() => {
    if (completedRef.current) return;
    if (!canExit && !debugState) {
      pendingCompleteRef.current = true;
      return;
    }
    pendingCompleteRef.current = false;
    completedRef.current = true;
    window.clearTimeout(inactivityTimerRef.current);
    soundEngineRef.current?.stop();
    onExitStart?.();
    setLeaving(true);
    setTimeout(() => onDone?.(), 720);
  }, [canExit, debugState, onDone, onExitStart]);

  useEffect(() => {
    if (!canExit || !pendingCompleteRef.current || completedRef.current) return;
    complete();
  }, [canExit, complete]);

  useEffect(() => {
    if (coverAssetReady && topologyAssetReady) return undefined;
    const timer = window.setTimeout(() => setAssetReleaseExpired(true), INTRO_ASSET_RELEASE_MS);
    return () => window.clearTimeout(timer);
  }, [coverAssetReady, topologyAssetReady]);

  // 특집 지면 8장을 미리 데워 플립 순간 디코딩 지연이 없게 한다.
  useEffect(() => {
    ARTICLE_PAGES.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  // "하이퍼볼릭" 첫 발화부터 특집 지면 8장을 180° 플립으로 넘긴다 —
  // 마지막 장은 카드 플립 직전까지 유지된다.
  useEffect(() => {
    if (!engaged || started || debugState) {
      // started로 넘어갈 때는 플리퍼 회전 상태를 그대로 둔다 — 리셋하면
      // 누적 회전(-1440°)이 0°로 트랜지션되며 퇴장 중 카드가 마구 돈다.
      // 처음(유휴)으로 돌아가는 경우에만 초기화한다.
      if (!engaged || debugState) {
        setArticleFrame(-1);
        setFaceAIndex(0);
        setFaceBIndex(1);
      }
      return undefined;
    }
    let interval = 0;
    const faceTimers = [];
    const lastIndex = PAGE_SEQUENCE.length - 1;
    const step = (frameIndex) => {
      setArticleFrame(frameIndex);
      const position = frameIndex + 1;
      // 나가는 면(직전 면)은 플립(810ms) 종료 후 가려진 상태에서
      // 다음 장을 싣는다.
      faceTimers.push(window.setTimeout(() => {
        if (position % 2 === 1) setFaceAIndex(Math.min(position + 1, lastIndex));
        else setFaceBIndex(Math.min(position + 1, lastIndex));
      }, 880));
    };
    const startTimer = window.setTimeout(() => {
      let frameIndex = 0;
      step(0);
      interval = window.setInterval(() => {
        frameIndex += 1;
        if (frameIndex >= ARTICLE_PAGE_COUNT) {
          window.clearInterval(interval);
          return;
        }
        step(frameIndex);
      }, ARTICLE_FRAME_MS);
    }, ARTICLE_CYCLE_START_MS);
    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(interval);
      faceTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [debugState, engaged, started]);

  // 플립 시작~시퀀스 종점 사이에 뒷면 캔버스의 리빌을 미리 끌어올린다 —
  // 카드가 도는 순간 뒷면에 이미 살아 있는 원판이 보인다.
  useEffect(() => {
    if (!engaged || started || debugState) return undefined;
    const startedAt = performance.now();
    const rampDuration = COVER_SEQUENCE_DURATION_MS - PRE_REVEAL_START_MS;
    let frame = 0;
    const tick = (now) => {
      const progress = clamp01((now - startedAt - PRE_REVEAL_START_MS) / rampDuration);
      setPreReveal(COVER_PRE_REVEAL_TARGET * (1 - ((1 - progress) ** 3)));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [engaged, started, debugState]);

  useEffect(() => {
    if (!introAssetsReady) return undefined;
    const startedAt = performance.now();
    // 가속 이징: 처음 몇 글자는 머뭇거리다 갈수록 빨라진다.
    const easeInQuad = (value) => clamp01(value) ** 2;
    let frame = 0;

    const tick = (now) => {
      const elapsed = now - startedAt;
      if (elapsed < START_PROMPT_ERASE_DURATION_MS) {
        const erasedCount = Math.floor(
          easeInQuad(elapsed / START_PROMPT_ERASE_DURATION_MS)
            * START_PROMPT_LOADING_TEXT.length
        );
        setStartPromptText(
          START_PROMPT_LOADING_TEXT.slice(0, START_PROMPT_LOADING_TEXT.length - erasedCount)
            || '\u00a0'
        );
        frame = window.requestAnimationFrame(tick);
        return;
      }
      const typeProgress = (elapsed - START_PROMPT_ERASE_DURATION_MS)
        / START_PROMPT_TYPE_DURATION_MS;
      if (typeProgress >= 1) {
        setStartPromptText(START_PROMPT_READY_TEXT);
        return;
      }
      const typedCount = Math.floor(
        easeInQuad(typeProgress) * START_PROMPT_READY_TEXT.length
      );
      setStartPromptText(START_PROMPT_READY_TEXT.slice(0, typedCount) || '\u00a0');
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [introAssetsReady]);

  // 준비 완료 후 탭 전까지 라임 하이라이트가 순환한다.
  useEffect(() => {
    if (engaged || debugState) return undefined;
    if (startPromptText !== START_PROMPT_READY_TEXT) return undefined;
    setPromptHighlightStep(0);
    const timer = window.setInterval(
      () => setPromptHighlightStep((step) => (step + 1) % PROMPT_HIGHLIGHT_STEPS.length),
      PROMPT_HIGHLIGHT_STEP_MS
    );
    return () => window.clearInterval(timer);
  }, [debugState, engaged, startPromptText]);

  const clearIdleExit = useCallback(() => {
    window.clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = null;
  }, []);

  const scheduleIdleExit = useCallback(() => {
    clearIdleExit();
    if (!INTRO_AUTO_ADVANCE_ENABLED || debugState) return;
    if (!startedRef.current || interactionActiveRef.current || completedRef.current) return;
    const remainingMinimumHold = Math.max(0, minimumExitAtRef.current - performance.now());
    inactivityTimerRef.current = window.setTimeout(
      complete,
      Math.max(INTRO_IDLE_MS, remainingMinimumHold)
    );
  }, [clearIdleExit, complete, debugState]);

  const beginInteraction = useCallback(() => {
    interactionActiveRef.current = true;
    clearIdleExit();
  }, [clearIdleExit]);

  const continueInteraction = useCallback(() => {
    if (interactionActiveRef.current) {
      clearIdleExit();
      return;
    }
    scheduleIdleExit();
  }, [clearIdleExit, scheduleIdleExit]);

  const endInteraction = useCallback(() => {
    interactionActiveRef.current = false;
    scheduleIdleExit();
  }, [scheduleIdleExit]);

  // 렌더러 콜백은 ref를 거쳐 항상 최신 핸들러로 향한다 — 렌더러 자체는
  // 마운트에 한 번만 만든다.
  atlasHandlersRef.current = {
    sonify: (sample) => soundEngineRef.current?.update(sample),
    interaction: (phase) => {
      if (phase === 'start') beginInteraction();
      else if (phase === 'end') endInteraction();
      else continueInteraction();
    },
  };

  useEffect(() => {
    const canvas = atlasCanvasRef.current;
    if (!canvas) return undefined;
    const api = createAtlasRenderer(canvas, {
      onReady: () => setTopologyAssetReady(true),
      onSonify: (sample) => atlasHandlersRef.current.sonify?.(sample),
      onInteraction: (phase) => atlasHandlersRef.current.interaction?.(phase),
      // 커버 안무가 전환 타이밍을 소유한다 — 렌더러 완주 신호는 무시(기존 동일).
      onExplorationComplete: () => {},
    });
    atlasApiRef.current = api;
    api.setLowerCenter(false, 0, FOCUS_DURATION_MS);
    api.setFocus(false, 0, FOCUS_DURATION_MS);
    return () => {
      api.destroy();
      atlasApiRef.current = null;
    };
  }, []);

  useEffect(() => () => {
    clearIdleExit();
    soundEngineRef.current?.stop();
    soundEngineRef.current = null;
    // 파트 1은 인트로 종료(54.65s)와 거의 동시에 자연 종료(54.9s)되지만,
    // QA 점프·리로드 등으로 일찍 떠나는 경우를 정리한다.
    stopIntroNarration();
  }, [clearIdleExit]);

  useEffect(() => {
    if (!debugState) return;
    clearIdleExit();
    completedRef.current = false;
    pendingCompleteRef.current = false;
    interactionActiveRef.current = false;
    soundEngineRef.current?.stop();
    soundEngineRef.current = null;
    setLeaving(false);
    setEngaged(debugState !== 'idle');
    setStarted(debugState === 'statement');
    const nextProgress = debugState === 'statement' ? 1 : 0;
    scrubProgressRef.current = nextProgress;
    setScrubProgress(nextProgress);
  }, [clearIdleExit, debugState]);

  useEffect(() => {
    if (!started || debugState || completedRef.current) return undefined;
    const initialProgress = scrubProgressRef.current;
    const duration = Math.max(1, AUTOPLAY_DURATION_MS * (1 - initialProgress));
    let previousFrameAt = performance.now();
    let accumulatedTime = 0;
    let frame = 0;
    let holdTimer = 0;

    const advance = (now) => {
      const frameDelta = Math.min(
        INTRO_MAX_FRAME_DELTA_MS,
        Math.max(0, now - previousFrameAt)
      );
      previousFrameAt = now;
      accumulatedTime += frameDelta;
      const next = clamp01(
        initialProgress + (accumulatedTime / duration) * (1 - initialProgress)
      );
      scrubProgressRef.current = next;
      setScrubProgress(next);
      if (next < 1) {
        frame = window.requestAnimationFrame(advance);
        return;
      }
      holdTimer = window.setTimeout(complete, AUTOPLAY_END_HOLD_MS);
    };

    frame = window.requestAnimationFrame(advance);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(holdTimer);
    };
  }, [complete, debugState, started]);

  useEffect(() => {
    startedRef.current = started;
    if (started) {
      minimumExitAtRef.current = performance.now()
        + FOCUS_DELAY_MS
        + FOCUS_DURATION_MS
        + POST_FOCUS_HOLD_MS;
      scheduleIdleExit();
    } else {
      minimumExitAtRef.current = 0;
      clearIdleExit();
    }
  }, [clearIdleExit, scheduleIdleExit, started]);

  useEffect(() => {
    if (debugState || !engaged || started) return undefined;
    atlasApiRef.current?.startExploration(3);
    const timer = setTimeout(() => setStarted(true), EXPLORATION_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [debugState, engaged, started]);

  useEffect(() => {
    atlasApiRef.current?.setLowerCenter(false, 0, FOCUS_DURATION_MS);
    atlasApiRef.current?.setFocus(false, 0, FOCUS_DURATION_MS);
  }, [started]);

  const handleTap = useCallback(() => {
    if (debugState || !introAssetsReady) return;
    if (!engaged) {
      if (!soundEngineRef.current) soundEngineRef.current = createCyberAtlasSoundEngine();
      soundEngineRef.current?.start({ muted: true }).catch(() => {});
      // 나래이션 파트 1 재생 시작 — 반드시 이 탭 제스처 안에서.
      startIntroNarration();
      // The call is best-effort: the intro never waits for RunPod or Redis.
      startRunPodPrewarm();
      setEngaged(true);
      return;
    }

    continueInteraction();
  }, [continueInteraction, debugState, engaged, introAssetsReady]);

  const topologySoundReady = started && scrubProgress >= TOPOLOGY_SOUND_START_PROGRESS;
  // 미리 깨운 리빌(preReveal)에서 이어받아 1까지 채운다. 임펄스 커브는
  // 중반 가속이 '움찔'로 읽혀서, 양끝 속도가 0인 스무스스텝으로 CSS
  // 확대와 한 흐름으로 이어지게 한다.
  const easeSmoothstep = (value) => {
    const t = clamp01(value);
    return t * t * (3 - 2 * t);
  };
  const topologyReveal = started
    ? COVER_PRE_REVEAL_TARGET
      + (1 - COVER_PRE_REVEAL_TARGET) * easeSmoothstep(segment(scrubProgress, 0, 0.24))
    : preReveal;
  // 스테이트먼트(텍스트·라임 분할)는 제거됐다 — 이 지점은 이제 디스크가
  // 타임라인 지도로 morph되는 트리거로만 남는다(나래이션 "50년의 연대기
  // 지도" ≈ 탭 +49.5초).
  const finalSplitActive = scrubProgress >= 0.745;

  useEffect(() => {
    if (!topologySoundReady) return;
    soundEngineRef.current?.fadeIn(TOPOLOGY_SOUND_FADE_IN_SECONDS);
  }, [topologySoundReady]);

  useEffect(() => {
    atlasApiRef.current?.setReveal(topologyReveal);
  }, [topologyReveal]);

  useEffect(() => {
    // 라임 패널이 사라졌으므로 중심 하향(lower)은 보내지 않는다 —
    // 풀스크린 그대로 morph만 일어난다.
    atlasApiRef.current?.setFocus(finalSplitActive, 0, 1280);
  }, [finalSplitActive]);

  // 3차 뷰(아트웍 유형 밴드): 스크럽 종점(≈56.2s, "아카이브를 자유롭게
  // 탐색…" 직전)에 타임라인이 이동 중 줌아웃되며 유형 밴드로 재정렬된다.
  const bandActive = scrubProgress >= 0.995;
  useEffect(() => {
    atlasApiRef.current?.setBand(bandActive, 0, 3000);
  }, [bandActive]);

  return (
    <main
      className={styles.page}
      data-engaged={engaged ? 'true' : 'false'}
      data-started={started ? 'true' : 'false'}
      data-leaving={leaving ? 'true' : 'false'}
      data-assets-ready={introAssetsReady ? 'true' : 'false'}
      data-debug={debugState ? 'true' : 'false'}
      onClick={handleTap}
      onPointerDown={beginInteraction}
      onPointerMove={continueInteraction}
      onPointerUp={endInteraction}
      onPointerCancel={endInteraction}
      onKeyDown={continueInteraction}
    >
      <div className={styles.scene}>
        {/* 아카이브 아틀라스 — 카드와 분리된 독립 풀스크린 레이어. 트랜스폼
            없이 항상 1:1로 합성되므로 텍스트가 항상 선명하다. started에서
            카드가 페이드 아웃되며 이 레이어가 페이드 인으로 이어받는다. */}
        <canvas
          ref={atlasCanvasRef}
          className={styles.atlasCanvas}
          role="img"
          aria-label="살아 움직이는 아카이브 아틀라스"
        />
        <Grainient className={styles.grainientOverlay} />

        {/* 첫 화면: 영문 타이틀 카드. 탭하면 꿈틀했다가 회전하며 위로 사라진다. */}
        <div
          className={styles.titleFilm}
          style={{
            '--title-fade-start': `${TITLE_FADE_START_MS}ms`,
            '--title-fade-duration': `${TITLE_FADE_DURATION_MS}ms`,
          }}
        >
          <div
            className={styles.titleFace}
            role="img"
            aria-label="From Information Architecture to Generative Systems"
          >
            <span className={styles.titleFaceHeadline}>
              {TITLE_LINES.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          </div>
        </div>

        {/* 카드 필름 묶음 — started에서 기존 씬 전환 문법대로 좌측으로
            밀려 나가고, 캔버스가 우측에서 밀고 들어온다. */}
        <div className={styles.cardFilms}>
        {/* 타이틀이 사라진 뒤 아래에서 올라오는 277호 표지 — 뒤집히면 뒷면
            (라임 플레이스홀더, 이미지 별도 제공 예정)이 보인다. */}
        <div
          className={styles.coverFilm}
          style={{
            '--cover-enter-start': `${COVER_ENTER_START_MS}ms`,
            '--cover-enter-duration': `${COVER_ENTER_DURATION_MS}ms`,
            '--article-grow-delay': `${ARTICLE_CYCLE_START_MS}ms`,
          }}
        >
          <div className={styles.coverArrivalTilt}>
            <div
              className={styles.coverCard}
            >
              <div className={`${styles.coverFace} ${styles.coverFront}`}>
                {/* 양면 플리퍼: 매 단계 -180°(우→좌) 회전 — 뒷면에 미리
                    실린 다음 장이 뒤에서 앞으로 돌아 나온다. 나가는 면은
                    가려진 뒤에야 교체되어 회전 전반부에도 이전 장이 남는다. */}
                <div
                  className={styles.pageFlipper}
                  style={{ transform: `rotateY(${(articleFrame + 1) * -180}deg)` }}
                >
                  <div className={styles.pageFace}>
                    <img
                      className={styles.coverImage}
                      src={PAGE_SEQUENCE[faceAIndex]}
                      alt="월간 디자인 2001년 7월호 277호 표지"
                      loading="eager"
                      decoding="async"
                      fetchpriority="high"
                      onLoad={(event) => {
                        const image = event.currentTarget;
                        if (typeof image.decode !== 'function') {
                          setCoverAssetReady(true);
                          return;
                        }
                        image.decode()
                          .catch(() => {})
                          .finally(() => setCoverAssetReady(true));
                      }}
                    />
                  </div>
                  <div className={`${styles.pageFace} ${styles.pageFaceBack}`}>
                    <img
                      className={styles.coverImage}
                      src={PAGE_SEQUENCE[faceBIndex]}
                      alt=""
                      aria-hidden="true"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

      </div>

      <button
        type="button"
        className={styles.startPrompt}
        aria-label={introAssetsReady ? '인트로 애니메이션 시작' : '인트로 에셋 준비 중'}
        aria-hidden={engaged ? 'true' : undefined}
        tabIndex={engaged ? -1 : 0}
        disabled={!introAssetsReady}
        onClick={(event) => {
          event.stopPropagation();
          handleTap();
        }}
      >
        <span>
          {startPromptText === START_PROMPT_READY_TEXT
            ? PROMPT_WORDS.map((word, wordIndex) => {
              const step = PROMPT_HIGHLIGHT_STEPS[promptHighlightStep];
              return (
                <span key={word}>
                  {wordIndex > 0 ? '\u00a0' : ''}
                  {[...word].map((glyph, glyphIndex) => (
                    <span
                      key={`${word}-${glyphIndex}`}
                      className={step.word === wordIndex && glyphIndex < step.lit
                        ? styles.promptGlyphLime
                        : undefined}
                    >
                      {glyph}
                    </span>
                  ))}
                </span>
              );
            })
            : startPromptText}
        </span>
      </button>

    </main>
  );
}

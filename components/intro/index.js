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
const TITLE_FADE_START_MS = 24400;
const TITLE_FADE_DURATION_MS = 800;
const COVER_ENTER_START_MS = 24900;
const COVER_ENTER_DURATION_MS = 1800;
const COVER_GLARE_DELAY_MS = 26550;
const COVER_GLARE_DURATION_MS = 900;
// 글레어 시트가 피크를 지나는 순간 바로 뒤집힌다 — 광택이 회전으로 이어진다.
const COVER_FLIP_START_MS = 26950;
const COVER_FLIP_DURATION_MS = 1350;
const COVER_BACK_HOLD_MS = 400;
const COVER_SEQUENCE_DURATION_MS =
  COVER_FLIP_START_MS + COVER_FLIP_DURATION_MS + COVER_BACK_HOLD_MS;
// 플립 중 뒷면이 열리는 동안 캔버스가 새까맣지 않도록 미리 올려두는 리빌 —
// 플립이 끝나는 시점에 램프도 끝나, 뒷면이 열리는 동안 원판이 살아난다.
const COVER_PRE_REVEAL_TARGET = 0.55;
const EXPLORATION_FALLBACK_MS = COVER_SEQUENCE_DURATION_MS;
const FOCUS_DELAY_MS = 650;
const FOCUS_DURATION_MS = 820;
const POST_FOCUS_HOLD_MS = 5200;
// started(28.7s) + 0.745×27900 ≈ 49.5s(morph) / 56.6s + 8200 ≈ 64.8s(종료).
const AUTOPLAY_DURATION_MS = 27900;
const AUTOPLAY_END_HOLD_MS = 8200;
const TOPOLOGY_SOUND_START_PROGRESS = 0.24;
const TOPOLOGY_SOUND_FADE_IN_SECONDS = 1.35;
const INTRO_ASSET_RELEASE_MS = 10000;
// 탭 순간 타이틀 글자가 변이한다: 한글 독음의 초성에 해당하는 자음은
// 랜덤 대문자로, 모음(y 포함 — '시스템스'의 ㅣ)은 랜덤 라임으로.
const TITLE_LINES = ['From', 'Information', 'Architecture', 'to Generative', 'Systems'];
const TITLE_VOWEL_SET = 'aeiouyAEIOUY';
const TITLE_CONSONANT_PATTERN = /[b-df-hj-np-tv-xz]/;
const TITLE_MUTATION_INTERVAL_MS = 140;
const TITLE_MUTATION_STOP_MS = 1300;

// Loading → Tap to Play 전환: 기본형 타자기 — Loading을 오른쪽부터 지운 뒤
// Tap to Play를 왼쪽부터 타이핑한다. 진행에 ease-in을 걸어 갈수록 빨라진다.
const START_PROMPT_LOADING_TEXT = 'LOADING';
const START_PROMPT_READY_TEXT = 'TAP TO PLAY';
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
  const [coverAssetReady, setCoverAssetReady] = useState(false);
  const [topologyAssetReady, setTopologyAssetReady] = useState(false);
  const [assetReleaseExpired, setAssetReleaseExpired] = useState(false);
  // 탭 순간의 타이틀 글자 변이 상태 — null이면 원문 그대로.
  const [titleMutation, setTitleMutation] = useState(null);
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

  // 탭 직후 ~1.3초 동안 타이틀 글자를 주기적으로 재추첨(변이)한다 —
  // 마지막 상태는 타이틀이 떠오르는 동안 그대로 얼어붙는다.
  useEffect(() => {
    if (!engaged || started || debugState) {
      setTitleMutation(null);
      return undefined;
    }
    const roll = () => setTitleMutation(TITLE_LINES.map((line) => [...line].map((glyph) => ({
      glyph: TITLE_CONSONANT_PATTERN.test(glyph) && Math.random() < 0.45
        ? glyph.toUpperCase()
        : glyph,
      lime: TITLE_VOWEL_SET.includes(glyph) && Math.random() < 0.45,
    }))));
    roll();
    const interval = window.setInterval(roll, TITLE_MUTATION_INTERVAL_MS);
    const stop = window.setTimeout(
      () => window.clearInterval(interval),
      TITLE_MUTATION_STOP_MS
    );
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(stop);
    };
  }, [debugState, engaged, started]);

  // 플립 시작~시퀀스 종점 사이에 뒷면 캔버스의 리빌을 미리 끌어올린다 —
  // 카드가 도는 순간 뒷면에 이미 살아 있는 원판이 보인다.
  useEffect(() => {
    if (!engaged || started || debugState) return undefined;
    const startedAt = performance.now();
    const rampDuration = COVER_FLIP_DURATION_MS;
    let frame = 0;
    const tick = (now) => {
      const progress = clamp01((now - startedAt - COVER_FLIP_START_MS) / rampDuration);
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
  // 플립 중 미리 깨운 리빌(preReveal)에서 이어받아 1까지 채운다.
  const topologyReveal = started
    ? COVER_PRE_REVEAL_TARGET
      + (1 - COVER_PRE_REVEAL_TARGET) * easeHumanImpulse(segment(scrubProgress, 0, 0.26))
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
              {TITLE_LINES.map((line, lineIndex) => (
                <span key={line}>
                  {titleMutation
                    ? titleMutation[lineIndex].map((entry, glyphIndex) => (entry.lime
                      ? (
                        <span
                          key={`${glyphIndex}-${entry.glyph}`}
                          className={styles.titleGlyphLime}
                        >
                          {entry.glyph}
                        </span>
                      )
                      : entry.glyph))
                    : line}
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* 타이틀이 사라진 뒤 아래에서 올라오는 277호 표지 — 뒤집히면 뒷면
            (라임 플레이스홀더, 이미지 별도 제공 예정)이 보이고, started에서
            카드 전체가 페이드 아웃되며 배경 캔버스로 넘어간다. */}
        <div
          className={styles.coverFilm}
          style={{
            '--cover-enter-start': `${COVER_ENTER_START_MS}ms`,
            '--cover-enter-duration': `${COVER_ENTER_DURATION_MS}ms`,
            '--cover-shrink-delay': `${COVER_FLIP_START_MS}ms`,
            '--cover-shrink-duration': `${COVER_FLIP_DURATION_MS + COVER_BACK_HOLD_MS}ms`,
          }}
        >
          <div className={styles.coverArrivalTilt}>
            <div
              className={styles.coverCard}
              style={{
                '--cover-flip-delay': `${COVER_FLIP_START_MS}ms`,
                '--cover-flip-duration': `${COVER_FLIP_DURATION_MS}ms`,
                '--cover-glare-delay': `${COVER_GLARE_DELAY_MS}ms`,
                '--cover-glare-duration': `${COVER_GLARE_DURATION_MS}ms`,
              }}
            >
              <div className={`${styles.coverFace} ${styles.coverFront}`}>
                <img
                  className={styles.coverImage}
                  src="/covers/D277-2001-07-intro.webp"
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
              <div
                className={`${styles.coverFace} ${styles.coverBack}`}
                role="img"
                aria-label="표지 뒷면 — 라임 플레이스홀더(이미지 별도 제공 예정)"
              />
            </div>
          </div>
        </div>

      </div>

      {/* 탭 후 TAP TO PLAY가 사라진 자리에 3초간 떠 있는 사운드 안내 —
          나래이션 오디오가 붙을 예정이라 볼륨을 미리 올리게 한다. */}
      <div className={styles.volumeHint} aria-hidden={engaged ? undefined : 'true'}>
        SOUND ON
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
        <span>{startPromptText}</span>
      </button>

    </main>
  );
}

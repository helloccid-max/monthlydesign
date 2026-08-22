import { useCallback, useEffect, useRef, useState } from 'react';
import Grainient from '@/components/Grainient';
import { startRunPodPrewarm } from '@/lib/runpod/prewarmClient';
import styles from './styles.module.css';

const INTRO_IDLE_MS = 1800;
const INTRO_AUTO_ADVANCE_ENABLED = false;
// 표지는 처음부터 중앙에 놓여 있다(진입 연출 없음). 탭 후 잠깐 호흡을 두고
// 글레어가 지나가면 카드가 뒤집혀 파란 뒷면을 보여준 뒤 틸트 퇴장한다.
const COVER_CENTER_HOLD_MS = 1200;
const COVER_GLARE_DELAY_MS = COVER_CENTER_HOLD_MS;
const COVER_GLARE_DURATION_MS = 1600;
const COVER_FLIP_START_MS = COVER_GLARE_DELAY_MS + COVER_GLARE_DURATION_MS;
const COVER_FLIP_DURATION_MS = 1350;
const COVER_BACK_HOLD_MS = 5000;
const COVER_SEQUENCE_DURATION_MS =
  COVER_FLIP_START_MS + COVER_FLIP_DURATION_MS + COVER_BACK_HOLD_MS;
const EXPLORATION_FALLBACK_MS = COVER_SEQUENCE_DURATION_MS;
const FOCUS_DELAY_MS = 650;
const FOCUS_DURATION_MS = 820;
const POST_FOCUS_HOLD_MS = 5200;
const AUTOPLAY_DURATION_MS = 12000;
const AUTOPLAY_END_HOLD_MS = 5200;
const TOPOLOGY_SOUND_START_PROGRESS = 0.24;
const TOPOLOGY_SOUND_FADE_IN_SECONDS = 1.35;
const INTRO_ASSET_RELEASE_MS = 10000;
// Loading → Tap to Play 전환: 기본형 타자기 — Loading을 오른쪽부터 지운 뒤
// Tap to Play를 왼쪽부터 타이핑한다. 진행에 ease-in을 걸어 갈수록 빨라진다.
const START_PROMPT_LOADING_TEXT = 'LOADING';
// 소문자 하나가 왼→오로 자리를 옮겨가는 간격(rAF 프레임 수). 3프레임 ≈ 50ms.
const LOADING_CASE_CYCLE_FRAMES = 3;
const START_PROMPT_READY_TEXT = 'Tap to Play';
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
  const completedRef = useRef(false);
  const pendingCompleteRef = useRef(false);
  const rendererRef = useRef(null);
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

  useEffect(() => {
    if (introAssetsReady) return undefined;
    let frame = 0;
    let framesSinceStep = 0;
    let lowercasePosition = 0;
    const tick = () => {
      framesSinceStep += 1;
      if (framesSinceStep >= LOADING_CASE_CYCLE_FRAMES) {
        framesSinceStep = 0;
        const characters = START_PROMPT_LOADING_TEXT.split('');
        characters[lowercasePosition] = characters[lowercasePosition].toLowerCase();
        setStartPromptText(characters.join(''));
        lowercasePosition = (lowercasePosition + 1) % START_PROMPT_LOADING_TEXT.length;
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [introAssetsReady]);

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

  useEffect(() => {
    const handleRendererMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== rendererRef.current?.contentWindow) return;
      if (event.data?.type === 'cyberatlas:ready') {
        setTopologyAssetReady(true);
        return;
      }
      if (event.data?.type === 'cyberatlas:sonify') {
        soundEngineRef.current?.update(event.data.sample);
        return;
      }
      if (event.data?.type === 'cyberatlas:exploration-complete') {
        // The cover choreography owns the transition timing. Renderer completion
        // can arrive early on fast devices, but the blue back must hold for 5s.
        return;
      }
      if (event.data?.type === 'cyberatlas:interaction') {
        if (event.data.phase === 'start') beginInteraction();
        else if (event.data.phase === 'end') endInteraction();
        else continueInteraction();
      }
    };

    window.addEventListener('message', handleRendererMessage);
    return () => {
      window.removeEventListener('message', handleRendererMessage);
      clearIdleExit();
      soundEngineRef.current?.stop();
      soundEngineRef.current = null;
    };
  }, [beginInteraction, clearIdleExit, complete, continueInteraction, debugState, endInteraction]);

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
    rendererRef.current?.contentWindow?.postMessage(
      { type: 'cyberatlas:start-exploration', turns: 3 },
      window.location.origin
    );
    const timer = setTimeout(() => setStarted(true), EXPLORATION_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [debugState, engaged, started]);

  useEffect(() => {
    rendererRef.current?.contentWindow?.postMessage(
      {
        type: 'cyberatlas:set-lower-center',
        lowered: false,
        delay: 0,
        duration: FOCUS_DURATION_MS,
      },
      window.location.origin
    );
    rendererRef.current?.contentWindow?.postMessage(
      {
        type: 'cyberatlas:set-focus',
        focused: false,
        delay: 0,
        duration: FOCUS_DURATION_MS,
      },
      window.location.origin
    );
  }, [started]);

  const handleTap = useCallback(() => {
    if (debugState || !introAssetsReady) return;
    if (!engaged) {
      if (!soundEngineRef.current) soundEngineRef.current = createCyberAtlasSoundEngine();
      soundEngineRef.current?.start({ muted: true }).catch(() => {});
      // The call is best-effort: the intro never waits for RunPod or Redis.
      startRunPodPrewarm();
      setEngaged(true);
      return;
    }

    continueInteraction();
  }, [continueInteraction, debugState, engaged, introAssetsReady]);

  // 하나로 이어진 임펄스: z-밀림이 먼저 시작되지만 멈추기 전에(밀림이 아직
  // 진행 중인 0.045 지점) 상승과 회전이 함께 들어온다. 밀림은 완만한 cubic으로
  // 길게 끌어(0.16까지) 상승 가속과 겹치게 하고, 상승·회전은 같은 지점에서
  // 동시에 출발한다.
  const easeOutCubicIntro = (value) => 1 - ((1 - clamp01(value)) ** 3);
  const coverExitScaleProgress = easeOutCubicIntro(segment(scrubProgress, 0, 0.16));
  const coverExitSpinProgress = easeHumanImpulse(segment(scrubProgress, 0.045, 0.2));
  const coverRise = easeHumanImpulse(segment(scrubProgress, 0.045, 0.24));
  const topologySoundReady = started && scrubProgress >= TOPOLOGY_SOUND_START_PROGRESS;
  const topologyReveal = easeHumanImpulse(segment(scrubProgress, 0.075, 0.29));
  const finalSplit = easeOutQuint(segment(scrubProgress, 0.745, 0.825));
  const finalTitle = easeOutQuint(segment(scrubProgress, 0.765, 0.855));
  // 둘째 줄 인덴트는 타이틀이 반쯤 올라온 뒤에야 0에서 서서히 벌어진다.
  const finalTitleIndent = easeOutQuint(segment(scrubProgress, 0.8, 0.89));
  const finalTranslation = easeOutQuint(segment(scrubProgress, 0.795, 0.88));
  const finalSplitActive = scrubProgress >= 0.745;
  // 대기 중 슬로우 축소의 종점(0.62)에서 끊김 없이 이어받아 계속 수축한다.
  const coverExitScale = 0.62 * (1 - 0.2 * coverExitScaleProgress);
  const coverTransform = `translate3d(0, ${(-132 * coverRise).toFixed(3)}dvh, 0) perspective(1400px) rotateY(${(45 * coverExitSpinProgress).toFixed(3)}deg) scale(${coverExitScale.toFixed(4)})`;

  useEffect(() => {
    if (!topologySoundReady) return;
    soundEngineRef.current?.fadeIn(TOPOLOGY_SOUND_FADE_IN_SECONDS);
  }, [topologySoundReady]);

  useEffect(() => {
    rendererRef.current?.contentWindow?.postMessage(
      { type: 'cyberatlas:set-reveal', progress: topologyReveal },
      window.location.origin
    );
  }, [topologyReveal]);

  useEffect(() => {
    const renderer = rendererRef.current?.contentWindow;
    renderer?.postMessage(
      {
        type: 'cyberatlas:set-lower-center',
        lowered: finalSplitActive,
        delay: 0,
        duration: 1280,
      },
      window.location.origin
    );
    renderer?.postMessage(
      {
        type: 'cyberatlas:set-focus',
        focused: finalSplitActive,
        delay: 0,
        duration: 1280,
      },
      window.location.origin
    );
  }, [finalSplitActive]);

  return (
    <main
      className={styles.page}
      data-engaged={engaged ? 'true' : 'false'}
      data-started={started ? 'true' : 'false'}
      data-leaving={leaving ? 'true' : 'false'}
      data-assets-ready={introAssetsReady ? 'true' : 'false'}
      onClick={handleTap}
      onPointerDown={beginInteraction}
      onPointerMove={continueInteraction}
      onPointerUp={endInteraction}
      onPointerCancel={endInteraction}
      onKeyDown={continueInteraction}
    >
      <div className={styles.scene}>
        <iframe
          ref={rendererRef}
          className={styles.cyberAtlasBackground}
          /* 아카이브 아틀라스(평면 지도). 하이퍼볼릭 원판으로 되돌리려면
             cyberatlas-render.html로 바꾸면 된다 — 메시지 계약 동일. */
          src="/experiments/atlas-render.html"
          title="살아 움직이는 하이퍼볼릭 데이터 토폴로지"
          loading="eager"
          onLoad={() => {
            const renderer = rendererRef.current?.contentWindow;
            renderer?.postMessage(
              { type: 'cyberatlas:request-ready' },
              window.location.origin
            );
            renderer?.postMessage(
              { type: 'cyberatlas:set-reveal', progress: topologyReveal },
              window.location.origin
            );
            renderer?.postMessage(
              {
                type: 'cyberatlas:set-lower-center',
                lowered: false,
                delay: 0,
                duration: FOCUS_DURATION_MS,
              },
              window.location.origin
            );
            renderer?.postMessage(
              {
                type: 'cyberatlas:set-focus',
                focused: false,
                delay: 0,
                duration: FOCUS_DURATION_MS,
              },
              window.location.origin
            );
            if (engaged && !started) {
              renderer?.postMessage(
                { type: 'cyberatlas:start-exploration', turns: 3 },
                window.location.origin
              );
            }
          }}
        />

        <Grainient className={styles.grainientOverlay} />

        <div
          className={styles.coverFilm}
          style={{
            '--cover-shrink-delay': `${COVER_FLIP_START_MS + COVER_FLIP_DURATION_MS}ms`,
            '--cover-back-hold': `${COVER_BACK_HOLD_MS}ms`,
            ...(started ? { transform: coverTransform } : null),
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
                aria-label="추후 다른 표지가 들어갈 파란색 뒷면"
              />
            </div>
          </div>
        </div>

        <section
          className={styles.statement}
          aria-label="정보 아키텍처에서 생성 시스템으로"
          style={{ transform: `translateY(${(-100 + finalSplit * 100).toFixed(3)}%)` }}
        >
          <h1
            style={{
              transform: `translateY(${(-48 * (1 - finalTitle)).toFixed(2)}px)`,
              '--title-indent': finalTitleIndent.toFixed(4),
            }}
          >
            <span>정보 아키텍처에서</span>
            <span>생성 시스템으로</span>
          </h1>
          <p
            className={styles.translation}
            style={{ transform: `translateY(${(-58 * (1 - finalTranslation)).toFixed(2)}px)` }}
          >
            <span>FROM INFORMATION ARCHITECTURE</span>
            <span>TO GENERATIVE SYSTEMS</span>
          </p>
        </section>

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

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

const INTRO_IDLE_MS = 1800;
const INTRO_AUTO_ADVANCE_ENABLED = false;
const COVER_ENTRY_DURATION_MS = 3600;
const COVER_FLIP_START_MS = 3100;
const COVER_FLIP_DURATION_MS = 1650;
const COVER_BACK_HOLD_MS = 5000;
const COVER_SEQUENCE_DURATION_MS = Math.max(
  COVER_ENTRY_DURATION_MS,
  COVER_FLIP_START_MS + COVER_FLIP_DURATION_MS
)
  + COVER_BACK_HOLD_MS;
const EXPLORATION_FALLBACK_MS = COVER_SEQUENCE_DURATION_MS;
const FOCUS_DELAY_MS = 650;
const FOCUS_DURATION_MS = 820;
const POST_FOCUS_HOLD_MS = 5200;
const AUTOPLAY_DURATION_MS = 12000;
const AUTOPLAY_END_HOLD_MS = 5200;

const clampAudio = (value, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));
const seededUnit = (value) => {
  const result = Math.sin(value * 12.9898) * 43758.5453;
  return result - Math.floor(result);
};

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const segment = (value, start, end) => clamp01((value - start) / Math.max(0.0001, end - start));
const easeInOut = (value) => (
  value < 0.5
    ? 4 * value * value * value
    : 1 - ((-2 * value + 2) ** 3) / 2
);
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
    async start() {
      if (stopped) return;
      await context.resume();
      active = true;
      const now = context.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
      master.gain.exponentialRampToValueAtTime(0.18, now + 0.32);
      bedGain.gain.exponentialRampToValueAtTime(0.026, now + 0.8);
    },
    update(sample) {
      if (!active || stopped || !sample || context.state === 'closed') return;
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
      const now = context.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.58);
      window.setTimeout(() => context.close().catch(() => {}), 650);
    },
  };
}

export default function IntroScreen({ onExitStart, onDone, debugState = null } = {}) {
  const [engaged, setEngaged] = useState(false);
  const [started, setStarted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [scrubProgress, setScrubProgress] = useState(0);
  const completedRef = useRef(false);
  const rendererRef = useRef(null);
  const scrubProgressRef = useRef(0);
  const soundEngineRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const startedRef = useRef(false);
  const interactionActiveRef = useRef(false);
  const minimumExitAtRef = useRef(0);

  const complete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    window.clearTimeout(inactivityTimerRef.current);
    soundEngineRef.current?.stop();
    onExitStart?.();
    setLeaving(true);
    setTimeout(() => onDone?.(), 720);
  }, [onDone, onExitStart]);

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
    const startedAt = performance.now();
    let frame = 0;
    let holdTimer = 0;

    const advance = (now) => {
      const elapsed = now - startedAt;
      const next = clamp01(initialProgress + (elapsed / duration) * (1 - initialProgress));
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
    if (debugState) return;
    if (!engaged) {
      if (!soundEngineRef.current) soundEngineRef.current = createCyberAtlasSoundEngine();
      soundEngineRef.current?.start().catch(() => {});
      setEngaged(true);
      return;
    }

    continueInteraction();
  }, [continueInteraction, debugState, engaged]);

  const coverRise = easeInOut(segment(scrubProgress, 0, 0.24));
  const topologyReveal = easeInOut(segment(scrubProgress, 0.07, 0.31));
  const finalSplit = easeOutQuint(segment(scrubProgress, 0.745, 0.825));
  const finalTitle = easeOutQuint(segment(scrubProgress, 0.765, 0.855));
  const finalTranslation = easeOutQuint(segment(scrubProgress, 0.795, 0.88));
  const finalSplitActive = scrubProgress >= 0.745;
  const coverTransform = `translate3d(0, ${(-132 * coverRise).toFixed(3)}dvh, 0) perspective(1400px) rotateY(${(30 * coverRise).toFixed(3)}deg) scale(0.7)`;

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
          src="/experiments/cyberatlas-render.html"
          title="살아 움직이는 하이퍼볼릭 데이터 토폴로지"
          loading="eager"
          onLoad={() => {
            const renderer = rendererRef.current?.contentWindow;
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

        <div
          className={styles.coverFilm}
          style={started ? { transform: coverTransform } : undefined}
        >
          <div className={styles.coverCard}>
            <div className={`${styles.coverFace} ${styles.coverFront}`}>
              <img
                className={styles.coverImage}
                src="/covers/D277-2001-07-intro.jpg"
                alt="월간 디자인 2001년 7월호 277호 표지"
              />
            </div>
            <div
              className={`${styles.coverFace} ${styles.coverBack}`}
              role="img"
              aria-label="추후 다른 표지가 들어갈 파란색 뒷면"
            />
          </div>
        </div>

        <section
          className={styles.statement}
          aria-label="정보 아키텍처에서 판단과 행동의 구조로"
          style={{ transform: `translateY(${(-100 + finalSplit * 100).toFixed(3)}%)` }}
        >
          <h1 style={{ transform: `translateY(${(-48 * (1 - finalTitle)).toFixed(2)}px)` }}>
            <span>정보 아키텍처에서</span>
            <span>판단과 행동의 구조로</span>
          </h1>
          <p
            className={styles.translation}
            style={{ transform: `translateY(${(-58 * (1 - finalTranslation)).toFixed(2)}px)` }}
          >
            <span>FROM INFORMATION ARCHITECTURE</span>
            <span>TO THE ARCHITECTURE OF AGENCY</span>
          </p>
        </section>

      </div>

      <button
        type="button"
        className={styles.startPrompt}
        aria-label="인트로 애니메이션 시작"
        aria-hidden={engaged ? 'true' : undefined}
        tabIndex={engaged ? -1 : 0}
        onClick={(event) => {
          event.stopPropagation();
          handleTap();
        }}
      >
        <span>Tap to Play</span>
      </button>

    </main>
  );
}

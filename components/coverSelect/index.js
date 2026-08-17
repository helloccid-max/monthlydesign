import { useCallback, useEffect, useRef, useState } from 'react';
import GlassSurface from '@/components/GlassSurface';
import { DEFAULT_MONTHLY_DESIGN_COVER, MONTHLY_DESIGN_COVERS } from '@/lib/monthlyDesignCovers';
import { POSTCARD_QUOTE_MAX_CHARS } from '@/lib/postcardQuoteLimit';
import styles from './styles.module.css';

const PARTICLE_COUNT = 48;
const FIELD_PERSPECTIVE = 720;
const FLOW_X = -0.78;
const FLOW_Y = -0.625;
const NEIGHBOR_RADIUS = 172;
const SEPARATION_RADIUS = 58;
const COVER_BASE_SIZE = 12;
const SELECTED_Z = 605;
const SELECTED_CENTER_Y = 0.45;
const SELECTED_SAFE_MARGIN = 20;
const SELECTED_BADGE_OUTSIDE_GAP = 8;
const SELECTED_ACTION_OUTSIDE_GAP = 12 * 1.8;
const SELECTION_EASE_MS = 520;
const SELECTED_UI_REVEAL_DELAY_MS = 90;
const SELECTED_PILL_REVEAL_OFFSET_MS = 150;
const SELECTED_PILL_FADE_MS = 260;
const SELECTED_PILL_TRAVEL_PX = 14;
const SELECTED_PILL_COVER_SCALE_RATIO = 0.982;
const SELECTED_COVER_SETTLE_MS = 420;
const SELECTED_ACTION_STAGGER_MS = 90;
const SELECTED_ACTION_ADVANCE_MS = 300;
const SELECTED_ACTION_FADE_MS = 300;
const SELECTED_ACTION_TRAVEL_PX = 16;
const RELEASE_EASE_MS = 480;
const VOICE_LONG_PRESS_MS = 520;
const SPEECH_SEND_READY_DELAY_MS = 2000;
const PROMPT_CONFIRM_HOLD_MS = 4000;
const FLOCK_SPEED_MULTIPLIER = 2.76;
const POINTER_SLOW_RADIUS = 168;
const POINTER_SLOW_MINIMUM = 0.22;
const POINTER_SLOW_IN_RESPONSE = 7.2;
const POINTER_SLOW_OUT_RESPONSE = 2.8;
const TOUCH_HIT_SLOP_PX = 38;
const POINTER_HIT_SLOP_PX = 10;
const MAXIMUM_FRAME_DELTA_SECONDS = 0.08;
// The archive flow is functional navigation, not only decoration. Keep it
// unmistakably alive when the OS requests reduced motion, while lowering its
// velocity enough to avoid an aggressive field.
const REDUCED_MOTION_SPEED_SCALE = 0.72;
const DEPTH_DISTRIBUTION_INTERVAL = 24;
const MIDDLE_DEPTH_COUNT_PER_INTERVAL = 16;
const ULTRA_NEAR_Z_MIN = 500;
const ULTRA_NEAR_Z_SPAN = 38;
const COVER_SELECTION_TITLE_LINES = [
  { text: '마음에 드는 표지를', offset: 0 },
  { text: '하나 선택하세요', offset: 10 },
];
const VOICE_BUTTON_LABEL = '나만의 오마주 표지 만들기';

const SPEECH_ERROR_MESSAGES = {
  'not-allowed': '마이크 권한 허용해주세요',
  'service-not-allowed': '이 브라우저에서 음성 인식을 사용할 수 없습니다.',
  'audio-capture': '사용 가능한 마이크를 찾지 못했습니다.',
  network: '음성 인식 연결이 원활하지 않습니다. 다시 시도해 주세요.',
  'no-speech': '목소리가 들리지 않았습니다. 다시 말해 주세요.',
};

const hash = (index, salt) => {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const easeInOutCubic = (value) => (
  value < 0.5
    ? 4 * value ** 3
    : 1 - ((-2 * value + 2) ** 3) / 2
);

const easeOutCubic = (value) => 1 - ((1 - value) ** 3);

const getPillRevealProgress = (time, selectionStartedAt) => {
  const elapsed = time
    - selectionStartedAt
    - SELECTION_EASE_MS
    - SELECTED_PILL_REVEAL_OFFSET_MS;
  const progress = Math.min(1, Math.max(0, elapsed / SELECTED_PILL_FADE_MS));
  return easeInOutCubic(progress);
};

// 표지 축소는 pill 페이드와 분리한다. 축소폭이 1.8%로 커진 만큼,
// 빠르게 물러났다가 부드럽게 안착하는 ease-out 커브를 쓴다.
const getCoverSettleProgress = (time, selectionStartedAt) => {
  const elapsed = time
    - selectionStartedAt
    - SELECTION_EASE_MS
    - SELECTED_PILL_REVEAL_OFFSET_MS;
  const progress = Math.min(1, Math.max(0, elapsed / SELECTED_COVER_SETTLE_MS));
  return easeOutCubic(progress);
};

const getDepthAtProjectedScaleRatio = (depth, ratio) => {
  const projectedScale = FIELD_PERSPECTIVE / (FIELD_PERSPECTIVE - depth);
  const adjustedScale = projectedScale * ratio;
  return FIELD_PERSPECTIVE - FIELD_PERSPECTIVE / adjustedScale;
};

function chooseCover(index, covers, generation = 0, previousCoverId = null) {
  const coverPool = Array.isArray(covers) && covers.length ? covers : MONTHLY_DESIGN_COVERS;
  const cycleSalt = generation * 19.173;
  let coverIndex = Math.floor(hash(index, cycleSalt + 13) * coverPool.length);
  let cover = index === 0 && generation === 0 ? DEFAULT_MONTHLY_DESIGN_COVER : coverPool[coverIndex];

  if (coverPool.length > 1 && cover?.id === previousCoverId) {
    coverIndex = (coverIndex + 1 + (index % (coverPool.length - 1))) % coverPool.length;
    cover = coverPool[coverIndex];
  }

  return cover;
}

function buildParticleNode(index, covers, generation = 0, previousCoverId = null) {
  const cycleSalt = generation * 19.173;
  const tierIndex = (index + generation * 5) % DEPTH_DISTRIBUTION_INTERVAL;
  const depthTier = tierIndex === 0
    ? 3
    : tierIndex <= MIDDLE_DEPTH_COUNT_PER_INTERVAL
      ? 1
      : 0;
  const near = depthTier === 3;
  const middle = depthTier === 1;
  const depthName = near ? 'near' : middle ? 'middle' : 'far';
  const z = near
    ? ULTRA_NEAR_Z_MIN + hash(index, cycleSalt + 8) * ULTRA_NEAR_Z_SPAN
    : middle
      ? -80 + hash(index, cycleSalt + 8) * 240
      : -420 + hash(index, cycleSalt + 8) * 260;

  return {
    id: `archive-particle-${index}`,
    generation,
    cover: chooseCover(index, covers, generation, previousCoverId),
    depthName,
    size: COVER_BASE_SIZE,
    speed: (near ? 74 + hash(index, 14) * 28 : middle ? 55 + hash(index, 14) * 29 : 42 + hash(index, 14) * 24)
      * FLOCK_SPEED_MULTIPLIER,
    z,
    zRange: near ? 6 : middle ? 24 : 24,
    phase: hash(index, 23) * Math.PI * 2,
    initialX: -12 + hash(index, 31) * 124,
    initialY: -16 + hash(index, 37) * 132,
    zIndex: 20 + depthTier * 28,
  };
}

function buildParticleNodes(covers = MONTHLY_DESIGN_COVERS) {
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => buildParticleNode(index, covers));
}

export function getInitialParticleCoverUrls(covers = MONTHLY_DESIGN_COVERS) {
  return buildParticleNodes(covers).map((particle) => particle.cover.imageUrl);
}

function getNaturalZ(boid, time) {
  const depthTime = time * 0.00022;
  const primary = Math.sin(depthTime * boid.depthRate + boid.phase);
  const secondary = Math.sin(depthTime * 2.37 + boid.phase * 1.73) * 0.28;
  return boid.z + (primary + secondary) * boid.zRange;
}

function getContainedSelectedZ(element, viewportWidth, viewportHeight) {
  const fallbackWidth = Math.max(32, Math.min(Math.min(viewportWidth, viewportHeight) * 0.12, 220));
  const baseWidth = element?.offsetWidth || fallbackWidth;
  const baseHeight = element?.offsetHeight || fallbackWidth / 0.75;
  const centerY = viewportHeight * SELECTED_CENTER_Y;
  const horizontalRoom = Math.max(baseWidth, viewportWidth - SELECTED_SAFE_MARGIN * 2);
  const verticalHalfRoom = Math.max(
    baseHeight * 0.5,
    Math.min(
      centerY - SELECTED_SAFE_MARGIN,
      viewportHeight - SELECTED_SAFE_MARGIN - centerY
    )
  );
  const verticalRoom = verticalHalfRoom * 2;
  const maximumContainedScale = Math.max(
    1,
    Math.min(horizontalRoom / baseWidth, verticalRoom / baseHeight)
  );
  const desiredScale = FIELD_PERSPECTIVE / (FIELD_PERSPECTIVE - SELECTED_Z);
  const containedScale = Math.min(desiredScale, maximumContainedScale);

  return FIELD_PERSPECTIVE - FIELD_PERSPECTIVE / containedScale;
}

function limitVector(x, y, maximum) {
  const length = Math.hypot(x, y);
  if (!length || length <= maximum) return { x, y };
  return { x: (x / length) * maximum, y: (y / length) * maximum };
}

function steeringVector(desiredX, desiredY, velocityX, velocityY, maximumSpeed, maximumForce) {
  const desiredLength = Math.hypot(desiredX, desiredY);
  if (!desiredLength) return { x: 0, y: 0 };
  const scaledX = (desiredX / desiredLength) * maximumSpeed;
  const scaledY = (desiredY / desiredLength) * maximumSpeed;
  return limitVector(scaledX - velocityX, scaledY - velocityY, maximumForce);
}

export default function CoverSelectScreen({
  onSubmit,
  debugState = null,
  initialCovers = null,
} = {}) {
  const initialCoverPool = Array.isArray(initialCovers) && initialCovers.length
    ? initialCovers
    : MONTHLY_DESIGN_COVERS;
  const [selectedId, setSelectedId] = useState(null);
  const [selectedParticleId, setSelectedParticleId] = useState(null);
  const [promptValue, setPromptValue] = useState('');
  const [displayedPrompt, setDisplayedPrompt] = useState('');
  const [speechStatus, setSpeechStatus] = useState('idle');
  const [speechActive, setSpeechActive] = useState(false);
  const [voiceSoundActive, setVoiceSoundActive] = useState(false);
  const [speechSendReady, setSpeechSendReady] = useState(false);
  const [speechError, setSpeechError] = useState('');
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const [voicePromptSingleLine, setVoicePromptSingleLine] = useState(false);
  const [guidanceDismissed, setGuidanceDismissed] = useState(false);
  const [coverPool, setCoverPool] = useState(initialCoverPool);
  const [particles, setParticles] = useState(() => buildParticleNodes(initialCoverPool));
  const initialParticlesRef = useRef(particles);
  const particleElementsRef = useRef(new Map());
  const pageRef = useRef(null);
  const selectedDateBadgeRef = useRef(null);
  const selectedActionRef = useRef(null);
  const boidsRef = useRef([]);
  const coverPoolRef = useRef(initialCoverPool);
  const selectedParticleRef = useRef(null);
  const selectionTransitionRef = useRef(null);
  const releaseTransitionsRef = useRef(new Map());
  const recognitionRef = useRef(null);
  const promptValueRef = useRef('');
  const speechBaseRef = useRef('');
  const speechFinalRef = useRef('');
  const speechHadErrorRef = useRef(false);
  const speechActivityTimerRef = useRef(null);
  const microphoneStreamRef = useRef(null);
  const microphoneAudioContextRef = useRef(null);
  const microphoneSourceRef = useRef(null);
  const microphoneMeterFrameRef = useRef(null);
  const voiceTranscriptRef = useRef(null);
  const voiceWaveRef = useRef(null);
  const voiceLongPressTimerRef = useRef(null);
  const voiceLongPressStartedRef = useRef(false);
  const suppressVoiceClickRef = useRef(false);
  const manualStopRef = useRef(false);
  const pointerFieldRef = useRef({ active: false, x: 0, y: 0 });
  const selected = selectedId
    ? coverPool.find((cover) => cover.id === selectedId)
      || particles.find((particle) => particle.cover.id === selectedId)?.cover
      || null
    : null;

  useEffect(() => {
    const transcript = voiceTranscriptRef.current;
    if (!displayedPrompt || !transcript) {
      setVoicePromptSingleLine(false);
      return undefined;
    }

    let frame = 0;
    const measureLineCount = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const lineHeight = Number.parseFloat(window.getComputedStyle(transcript).lineHeight);
        if (!Number.isFinite(lineHeight) || lineHeight <= 0) return;
        setVoicePromptSingleLine(transcript.getBoundingClientRect().height <= lineHeight * 1.25);
      });
    };

    measureLineCount();
    const observer = new ResizeObserver(measureLineCount);
    observer.observe(transcript);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [displayedPrompt]);

  const scheduleSpeechSendReady = useCallback(() => {
    window.clearTimeout(speechActivityTimerRef.current);
    speechActivityTimerRef.current = window.setTimeout(() => {
      setSpeechActive(false);
      if (promptValueRef.current.trim()) setSpeechSendReady(true);
    }, SPEECH_SEND_READY_DELAY_MS);
  }, []);

  const stopInputMeter = useCallback(() => {
    window.cancelAnimationFrame(microphoneMeterFrameRef.current);
    microphoneMeterFrameRef.current = null;
    try {
      microphoneSourceRef.current?.disconnect();
    } catch (_) {}
    microphoneSourceRef.current = null;
    microphoneStreamRef.current?.getTracks().forEach((track) => track.stop());
    microphoneStreamRef.current = null;
    if (microphoneAudioContextRef.current?.state !== 'closed') {
      microphoneAudioContextRef.current?.close().catch(() => {});
    }
    microphoneAudioContextRef.current = null;
    setVoiceSoundActive(false);
    Array.from(voiceWaveRef.current?.children || []).forEach((bar) => {
      bar.style.removeProperty('--voice-level');
    });
  }, []);

  const startInputMeter = useCallback((stream) => {
    stopInputMeter();
    microphoneStreamRef.current = stream;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const context = new AudioContext({ latencyHint: 'interactive' });
    const analyser = context.createAnalyser();
    const source = context.createMediaStreamSource(stream);
    analyser.fftSize = 256;
    analyser.minDecibels = -72;
    analyser.maxDecibels = -18;
    analyser.smoothingTimeConstant = 0.68;
    source.connect(analyser);
    microphoneAudioContextRef.current = context;
    microphoneSourceRef.current = source;
    context.resume().catch(() => {});

    const frequencyData = new Uint8Array(analyser.frequencyBinCount);
    const bandRanges = [[1, 4], [3, 8], [6, 14], [11, 23], [18, 38]];
    const smoothedLevels = [0.08, 0.08, 0.08, 0.08, 0.08];
    let soundVisible = false;
    let quietFrames = 0;
    const renderMeter = () => {
      analyser.getByteFrequencyData(frequencyData);
      const bars = Array.from(voiceWaveRef.current?.children || []);
      let strongestEnergy = 0;
      bandRanges.forEach(([start, end], index) => {
        let total = 0;
        for (let bin = start; bin < end; bin += 1) total += frequencyData[bin] || 0;
        const average = total / Math.max(1, end - start);
        const gated = Math.max(0, (average - 18) / 170);
        strongestEnergy = Math.max(strongestEnergy, gated);
        const target = 0.08 + Math.min(0.92, Math.pow(gated, 0.72));
        const response = target > smoothedLevels[index] ? 0.48 : 0.2;
        smoothedLevels[index] += (target - smoothedLevels[index]) * response;
        bars[index]?.style.setProperty('--voice-level', smoothedLevels[index].toFixed(3));
      });

      if (strongestEnergy > 0.045) {
        quietFrames = 0;
        if (!soundVisible) {
          soundVisible = true;
          setVoiceSoundActive(true);
        }
      } else if (soundVisible) {
        quietFrames += 1;
        if (quietFrames >= 10) {
          soundVisible = false;
          quietFrames = 0;
          setVoiceSoundActive(false);
        }
      }
      microphoneMeterFrameRef.current = window.requestAnimationFrame(renderMeter);
    };
    renderMeter();
  }, [stopInputMeter]);

  useEffect(() => {
    coverPoolRef.current = coverPool;
  }, [coverPool]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
      stopInputMeter();
      window.clearTimeout(speechActivityTimerRef.current);
      window.clearTimeout(voiceLongPressTimerRef.current);
    };
  }, [stopInputMeter]);

  useEffect(() => {
    if (displayedPrompt === promptValue) return undefined;

    const timer = window.setTimeout(() => {
      setDisplayedPrompt((current) => {
        if (current === promptValue) return current;
        if (!promptValue.startsWith(current)) {
          let sharedLength = 0;
          const maximum = Math.min(current.length, promptValue.length);
          while (sharedLength < maximum && current[sharedLength] === promptValue[sharedLength]) {
            sharedLength += 1;
          }
          return promptValue.slice(0, sharedLength);
        }
        const remaining = promptValue.length - current.length;
        const step = Math.max(1, Math.ceil(remaining / 12));
        return promptValue.slice(0, current.length + step);
      });
    }, 28);

    return () => window.clearTimeout(timer);
  }, [displayedPrompt, promptValue]);

  useEffect(() => {
    if (Array.isArray(initialCovers) && initialCovers.length) return undefined;
    const controller = new AbortController();

    fetch('/api/monthly-design-covers', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('cover archive unavailable'))))
      .then((payload) => {
        if (Array.isArray(payload?.covers) && payload.covers.length) {
          setCoverPool(payload.covers);
          setParticles(buildParticleNodes(payload.covers));
        }
      })
      .catch((error) => {
        if (error?.name !== 'AbortError') {
          setCoverPool(MONTHLY_DESIGN_COVERS);
          setParticles(buildParticleNodes(MONTHLY_DESIGN_COVERS));
        }
      });

    return () => controller.abort();
  }, [initialCovers]);

  useEffect(() => {
    let frameId;
    let previousTime = performance.now();
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionSpeedScale = reduceMotion ? REDUCED_MOTION_SPEED_SCALE : 1;

    pageRef.current?.style.setProperty('--cover-viewport-height', `${viewportHeight}px`);

    const createBoids = () => {
      boidsRef.current = initialParticlesRef.current.map((particle, index) => {
        const angle = Math.atan2(FLOW_Y, FLOW_X) + (hash(index, 41) - 0.5) * 0.12;
        return {
          id: particle.id,
          index,
          generation: particle.generation,
          x: (particle.initialX / 100) * viewportWidth,
          y: (particle.initialY / 100) * viewportHeight,
          vx: Math.cos(angle) * particle.speed,
          vy: Math.sin(angle) * particle.speed,
          ax: 0,
          ay: 0,
          speed: particle.speed,
          dynamicSpeed: particle.speed * (0.78 + hash(index, 43) * 0.34),
          pointerSpeedFactor: 1,
          z: particle.z,
          zRange: particle.zRange,
          phase: particle.phase,
          burstPhase: hash(index, 47) * Math.PI * 2,
          burstRate: 0.68 + hash(index, 53) * 0.72,
          swayPhase: hash(index, 59) * Math.PI * 2,
          swayRate: 0.44 + hash(index, 61) * 0.66,
          depthRate: 0.78 + hash(index, 67) * 0.48,
        };
      });
    };

    const placeBoid = (boid, time, override = null) => {
      const element = particleElementsRef.current.get(boid.id);
      if (!element) return;
      const x = override?.x ?? boid.x;
      const y = override?.y ?? boid.y;
      const z = override?.z ?? getNaturalZ(boid, time);
      const depthCompensation = (FIELD_PERSPECTIVE - z) / FIELD_PERSPECTIVE;
      const localX = (x - viewportWidth * 0.5) * depthCompensation;
      const localY = (y - viewportHeight * 0.52) * depthCompensation;
      element.style.transform = `translate3d(calc(-50% + ${localX.toFixed(2)}px), calc(-50% + ${localY.toFixed(2)}px), ${z.toFixed(2)}px)`;
      element.style.zIndex = String(Math.round(z + 720));

      if (boid.id === selectedParticleRef.current) {
        const projectedScale = FIELD_PERSPECTIVE / (FIELD_PERSPECTIVE - z);
        const projectedHeight = (element.offsetHeight || 48) * projectedScale;
        const badgeProgress = override?.badgeProgress ?? 1;
        const actionProgress = override?.actionProgress ?? badgeProgress;
        const badgeX = Math.min(viewportWidth - SELECTED_SAFE_MARGIN, Math.max(SELECTED_SAFE_MARGIN, x));
        const badgeHeight = selectedDateBadgeRef.current?.offsetHeight || 28;
        const badgeY = Math.max(
          SELECTED_SAFE_MARGIN + badgeHeight * 0.5,
          y - projectedHeight * 0.5 - SELECTED_BADGE_OUTSIDE_GAP - badgeHeight * 0.5
        );
        if (selectedDateBadgeRef.current) {
          const badgeRevealY = badgeY - (1 - badgeProgress) * SELECTED_PILL_TRAVEL_PX;
          selectedDateBadgeRef.current.style.opacity = String(badgeProgress);
          selectedDateBadgeRef.current.style.transform = `translate3d(${badgeX.toFixed(2)}px, ${badgeRevealY.toFixed(2)}px, 0) translate(-50%, -50%)`;
        }

        if (selectedActionRef.current) {
          const actionHeight = selectedActionRef.current.offsetHeight || 50;
          const actionY = Math.min(
            viewportHeight - SELECTED_SAFE_MARGIN - actionHeight * 0.5,
            Math.max(
              SELECTED_SAFE_MARGIN + actionHeight * 0.5,
              y + projectedHeight * 0.5 + SELECTED_ACTION_OUTSIDE_GAP + actionHeight * 0.5
            )
          );
          const actionRevealY = actionY + (1 - actionProgress) * SELECTED_ACTION_TRAVEL_PX;
          selectedActionRef.current.style.opacity = String(actionProgress);
          selectedActionRef.current.style.pointerEvents = actionProgress >= 0.98 ? 'auto' : 'none';
          selectedActionRef.current.style.transform = `translate3d(${badgeX.toFixed(2)}px, ${actionRevealY.toFixed(2)}px, 0) translate(-50%, -50%)`;
        }
      }
    };

    const respawnBoid = (boid) => {
      boid.generation += 1;
      const fromRight = hash(boid.index, boid.generation * 7.19) > 0.45;
      if (fromRight) {
        boid.x = viewportWidth + 130;
        boid.y = viewportHeight * (0.22 + hash(boid.index, boid.generation * 11.3) * 0.82);
      } else {
        boid.x = viewportWidth * (0.3 + hash(boid.index, boid.generation * 13.7) * 0.82);
        boid.y = viewportHeight + 150;
      }

      const angle = Math.atan2(FLOW_Y, FLOW_X) + (hash(boid.index, boid.generation * 17.1) - 0.5) * 0.28;
      boid.vx = Math.cos(angle) * boid.speed;
      boid.vy = Math.sin(angle) * boid.speed;
      boid.ax = 0;
      boid.ay = 0;
      boid.dynamicSpeed = boid.speed * (0.74 + hash(boid.index, boid.generation * 19.7) * 0.52);
      boid.pointerSpeedFactor = 1;
      boid.burstPhase = hash(boid.index, boid.generation * 23.9) * Math.PI * 2;
      boid.burstRate = 0.68 + hash(boid.index, boid.generation * 29.3) * 0.72;
      boid.swayPhase = hash(boid.index, boid.generation * 31.1) * Math.PI * 2;
      boid.swayRate = 0.44 + hash(boid.index, boid.generation * 37.7) * 0.66;

      setParticles((current) => current.map((particle, index) => {
        if (particle.id !== boid.id) return particle;
        return {
          ...particle,
          generation: boid.generation,
          cover: chooseCover(index, coverPoolRef.current, boid.generation, particle.cover.id),
        };
      }));
      setSelectedParticleId((current) => (current === boid.id ? null : current));
    };

    const update = (time) => {
      // Preserve elapsed time through ordinary mobile frame drops. The old
      // 34ms cap discarded time, so the same choreography ran in slow motion
      // on a busy phone while looking correct on a desktop.
      const delta = Math.min(
        Math.max(0, (time - previousTime) / 1000),
        MAXIMUM_FRAME_DELTA_SECONDS
      ) * motionSpeedScale;
      previousTime = time;
      const boids = boidsRef.current;
      const nextForces = boids.map((boid, index) => {
        const seconds = time * 0.001;
        const burstWave = Math.max(0, Math.sin(seconds * boid.burstRate + boid.burstPhase));
        const burst = burstWave ** 6;
        const breath = 0.5 + 0.5 * Math.sin(seconds * boid.burstRate * 0.37 + boid.phase);
        const targetSpeed = boid.speed * (0.72 + breath * 0.28 + burst * 1.02);
        const speedResponse = targetSpeed > boid.dynamicSpeed ? 5.6 : 0.96;
        boid.dynamicSpeed += (targetSpeed - boid.dynamicSpeed) * Math.min(1, speedResponse * delta);
        const baseMaximumSpeed = Math.max(boid.speed * 0.7, Math.min(boid.speed * 2.18, boid.dynamicSpeed));
        const pointer = pointerFieldRef.current;
        let pointerTargetFactor = 1;
        if (pointer.active) {
          const pointerDistance = Math.hypot(boid.x - pointer.x, boid.y - pointer.y);
          const normalizedProximity = Math.max(0, 1 - pointerDistance / POINTER_SLOW_RADIUS);
          const easedProximity = normalizedProximity * normalizedProximity * (3 - 2 * normalizedProximity);
          pointerTargetFactor = 1 - easedProximity * (1 - POINTER_SLOW_MINIMUM);
        }
        const pointerResponse = pointerTargetFactor < boid.pointerSpeedFactor
          ? POINTER_SLOW_IN_RESPONSE
          : POINTER_SLOW_OUT_RESPONSE;
        boid.pointerSpeedFactor += (pointerTargetFactor - boid.pointerSpeedFactor)
          * Math.min(1, pointerResponse * delta);
        const maximumSpeed = baseMaximumSpeed * boid.pointerSpeedFactor;
        const maximumForce = boid.speed
          * (0.92 + burst * 1.32)
          * Math.max(0.38, boid.pointerSpeedFactor);

        let neighborCount = 0;
        let separationCount = 0;
        let alignX = 0;
        let alignY = 0;
        let centerX = 0;
        let centerY = 0;
        let separateX = 0;
        let separateY = 0;

        for (let otherIndex = 0; otherIndex < boids.length; otherIndex += 1) {
          if (otherIndex === index) continue;
          const other = boids[otherIndex];
          if (other.id === selectedParticleRef.current) continue;
          const dx = other.x - boid.x;
          const dy = other.y - boid.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared > NEIGHBOR_RADIUS * NEIGHBOR_RADIUS) continue;

          neighborCount += 1;
          alignX += other.vx;
          alignY += other.vy;
          centerX += other.x;
          centerY += other.y;

          if (distanceSquared < SEPARATION_RADIUS * SEPARATION_RADIUS && distanceSquared > 0.01) {
            separateX -= dx / distanceSquared;
            separateY -= dy / distanceSquared;
            separationCount += 1;
          }
        }

        let separation = { x: 0, y: 0 };
        let alignment = { x: 0, y: 0 };
        let cohesion = { x: 0, y: 0 };

        if (separationCount > 0) {
          separateX /= separationCount;
          separateY /= separationCount;
          separation = steeringVector(
            separateX,
            separateY,
            boid.vx,
            boid.vy,
            maximumSpeed,
            maximumForce
          );
        }

        if (neighborCount > 0) {
          alignment = steeringVector(
            alignX / neighborCount,
            alignY / neighborCount,
            boid.vx,
            boid.vy,
            maximumSpeed,
            maximumForce
          );
          cohesion = steeringVector(
            centerX / neighborCount - boid.x,
            centerY / neighborCount - boid.y,
            boid.vx,
            boid.vy,
            maximumSpeed,
            maximumForce
          );
        }

        const flow = steeringVector(
          FLOW_X,
          FLOW_Y,
          boid.vx,
          boid.vy,
          maximumSpeed,
          maximumForce * 0.72
        );
        const organicSway = Math.sin(seconds * boid.swayRate + boid.swayPhase + boid.y * 0.0035)
          + Math.sin(seconds * boid.swayRate * 2.17 + boid.phase + boid.x * 0.0024) * 0.42;
        const swayForce = maximumForce * (0.34 + burst * 0.42) * organicSway;

        return {
          x: separation.x * 1.5 + alignment.x + cohesion.x + flow.x - FLOW_Y * swayForce,
          y: separation.y * 1.5 + alignment.y + cohesion.y + flow.y + FLOW_X * swayForce,
          maximumSpeed,
        };
      });

      boids.forEach((boid, index) => {
        if (boid.id === selectedParticleRef.current) {
          const selectedElement = particleElementsRef.current.get(boid.id);
          const selectedTargetZ = getContainedSelectedZ(selectedElement, viewportWidth, viewportHeight);
          let transition = selectionTransitionRef.current;
          if (!transition || transition.id !== boid.id) {
            transition = {
              id: boid.id,
              startedAt: time,
              fromX: boid.x,
              fromY: boid.y,
              fromZ: getNaturalZ(boid, time),
            };
            selectionTransitionRef.current = transition;
          }

          const progress = Math.min(Math.max((time - transition.startedAt) / SELECTION_EASE_MS, 0), 1);
          const eased = 1 - ((1 - progress) ** 4);
          const renderX = transition.fromX + (viewportWidth * 0.5 - transition.fromX) * eased;
          const renderY = transition.fromY + (viewportHeight * SELECTED_CENTER_Y - transition.fromY) * eased;
          const baseRenderZ = transition.fromZ + (selectedTargetZ - transition.fromZ) * eased;

          boid.x = renderX;
          boid.y = renderY;
          const revealElapsed = time - transition.startedAt - SELECTION_EASE_MS - SELECTED_UI_REVEAL_DELAY_MS;
          const actionFadeProgress = Math.min(
            1,
            Math.max(
              0,
              (revealElapsed - SELECTED_ACTION_STAGGER_MS + SELECTED_ACTION_ADVANCE_MS)
                / SELECTED_ACTION_FADE_MS
            )
          );
          const badgeProgress = getPillRevealProgress(time, transition.startedAt);
          const coverSettle = getCoverSettleProgress(time, transition.startedAt);
          const actionProgress = easeInOutCubic(actionFadeProgress);
          const pillSettledZ = getDepthAtProjectedScaleRatio(
            selectedTargetZ,
            SELECTED_PILL_COVER_SCALE_RATIO
          );
          const renderZ = baseRenderZ + (pillSettledZ - selectedTargetZ) * coverSettle;
          placeBoid(boid, time, {
            x: renderX,
            y: renderY,
            z: renderZ,
            badgeProgress,
            actionProgress,
          });
          return;
        }

        const release = releaseTransitionsRef.current.get(boid.id);
        if (release) {
          const force = nextForces[index];
          boid.ax = force.x;
          boid.ay = force.y;
          const velocity = limitVector(
            boid.vx + boid.ax * delta,
            boid.vy + boid.ay * delta,
            force.maximumSpeed
          );
          boid.vx = velocity.x;
          boid.vy = velocity.y;
          boid.ax = 0;
          boid.ay = 0;
          boid.x += boid.vx * delta;
          boid.y += boid.vy * delta;

          const progress = Math.min(Math.max((time - release.startedAt) / RELEASE_EASE_MS, 0), 1);
          const eased = 1 - ((1 - progress) ** 4);
          const naturalZ = getNaturalZ(boid, time);
          const renderZ = release.fromZ + (naturalZ - release.fromZ) * eased;
          placeBoid(boid, time, { x: boid.x, y: boid.y, z: renderZ });

          if (progress >= 1) releaseTransitionsRef.current.delete(boid.id);
          return;
        }

        const force = nextForces[index];
        boid.ax = force.x;
        boid.ay = force.y;
        const velocity = limitVector(
          boid.vx + boid.ax * delta,
          boid.vy + boid.ay * delta,
          force.maximumSpeed
        );
        boid.vx = velocity.x;
        boid.vy = velocity.y;
        boid.ax = 0;
        boid.ay = 0;
        boid.x += boid.vx * delta;
        boid.y += boid.vy * delta;

        if (boid.x < -170 || boid.y < -190) respawnBoid(boid);
        placeBoid(boid, time);
      });

      frameId = window.requestAnimationFrame(update);
    };

    const handleResize = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const widthChanged = Math.abs(nextWidth - viewportWidth) > 2;
      const heightChanged = Math.abs(nextHeight - viewportHeight) > 2;
      // Bottom sheets and mobile software keyboards can change only the visual
      // viewport height. Keep the field camera frozen while a cover is selected;
      // real orientation changes also change the viewport width and still pass.
      if (!widthChanged && heightChanged && selectedParticleRef.current) return;

      boidsRef.current.forEach((boid) => {
        boid.x *= nextWidth / viewportWidth;
        boid.y *= nextHeight / viewportHeight;
      });
      viewportWidth = nextWidth;
      viewportHeight = nextHeight;
      pageRef.current?.style.setProperty('--cover-viewport-height', `${nextHeight}px`);
    };

    createBoids();
    boidsRef.current.forEach((boid) => placeBoid(boid, previousTime));
    window.addEventListener('resize', handleResize);
    frameId = window.requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const commitPrompt = useCallback((value) => {
    const safePrompt = value.trim().slice(0, POSTCARD_QUOTE_MAX_CHARS);
    if (!selected || !safePrompt) return;

    // GENERATION_HANDOFF_START: everything after CoverSelect consumes this payload.
    // Keep this contract in sync with components/generation/contract.js.
    onSubmit?.({
      coverId: selected.id,
      coverImageUrl: selected.imageUrl,
      issue: selected.issue,
      date: selected.date,
      prompt: safePrompt,
    });
  }, [onSubmit, selected]);

  useEffect(() => {
    if (!pendingSubmit || !promptValue.trim() || displayedPrompt !== promptValue) return undefined;
    const timer = window.setTimeout(() => commitPrompt(promptValue), PROMPT_CONFIRM_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [commitPrompt, displayedPrompt, pendingSubmit, promptValue]);

  const stopSpeech = useCallback(() => {
    manualStopRef.current = true;
    window.clearTimeout(speechActivityTimerRef.current);
    setSpeechActive(false);
    setSpeechSendReady(false);
    try {
      recognitionRef.current?.stop();
    } catch (_) {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
      manualStopRef.current = false;
      setSpeechStatus('idle');
      stopInputMeter();
    }
  }, [stopInputMeter]);

  const startSpeech = useCallback((basePromptOverride) => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      stopInputMeter();
      setSpeechStatus('error');
      setSpeechError('이 브라우저에서는 음성 인식을 지원하지 않습니다.');
      return;
    }

    const basePrompt = typeof basePromptOverride === 'string'
      ? basePromptOverride.trim()
      : promptValue.trim();
    recognitionRef.current?.abort();
    manualStopRef.current = false;
    speechBaseRef.current = basePrompt;
    speechFinalRef.current = '';
    speechHadErrorRef.current = false;
    promptValueRef.current = basePrompt;
    if (typeof basePromptOverride === 'string') {
      setPromptValue(basePrompt);
      setDisplayedPrompt(basePrompt);
    }
    setPendingSubmit(false);
    setSpeechActive(false);
    setSpeechSendReady(false);
    setSpeechError('');
    setSpeechStatus('starting');

    const recognition = new Recognition();
    recognition.lang = 'ko-KR';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      if (recognitionRef.current !== recognition) return;
      setSpeechStatus('listening');
    };

    recognition.onspeechstart = () => {
      window.clearTimeout(speechActivityTimerRef.current);
      setSpeechActive(true);
      setSpeechSendReady(false);
    };

    recognition.onspeechend = () => {
      setSpeechActive(false);
      scheduleSpeechSendReady();
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const fragment = event.results[index][0]?.transcript?.trim() || '';
        if (!fragment) continue;
        if (event.results[index].isFinal) {
          speechFinalRef.current = `${speechFinalRef.current} ${fragment}`.trim();
        } else {
          interimTranscript = `${interimTranscript} ${fragment}`.trim();
        }
      }

      const nextPrompt = [speechBaseRef.current, speechFinalRef.current, interimTranscript]
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .slice(0, POSTCARD_QUOTE_MAX_CHARS);
      promptValueRef.current = nextPrompt;
      setPromptValue(nextPrompt);
      setSpeechActive(true);
      setSpeechSendReady(false);
      scheduleSpeechSendReady();
    };

    recognition.onerror = (event) => {
      if (event.error === 'aborted') return;
      stopInputMeter();
      speechHadErrorRef.current = true;
      manualStopRef.current = false;
      setSpeechActive(false);
      setSpeechSendReady(false);
      setSpeechStatus('error');
      setSpeechError(SPEECH_ERROR_MESSAGES[event.error] || '음성을 인식하지 못했습니다. 다시 시도해 주세요.');
    };

    recognition.onend = () => {
      if (recognitionRef.current !== recognition) return;
      recognitionRef.current = null;
      window.clearTimeout(speechActivityTimerRef.current);
      setSpeechActive(false);
      setSpeechSendReady(false);
      if (!speechHadErrorRef.current) {
        setSpeechStatus('idle');
        if (manualStopRef.current && promptValueRef.current.trim()) setPendingSubmit(true);
      }
      manualStopRef.current = false;
      stopInputMeter();
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (_) {
      recognitionRef.current = null;
      stopInputMeter();
      setSpeechStatus('error');
      setSpeechError('음성 인식을 시작하지 못했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }, [promptValue, scheduleSpeechSendReady, stopInputMeter]);

  const requestMicrophonePermission = useCallback(async (basePromptOverride) => {
    if (speechStatus === 'requesting-permission') return;

    setSpeechStatus('requesting-permission');
    setSpeechActive(false);
    setSpeechSendReady(false);
    setSpeechError('');

    try {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        startInputMeter(stream);
      }
      setSpeechStatus('idle');
      setSpeechError('');
      startSpeech(basePromptOverride);
    } catch (_) {
      setSpeechStatus('error');
      setSpeechError(SPEECH_ERROR_MESSAGES['not-allowed']);
    }
  }, [speechStatus, startInputMeter, startSpeech]);

  const cancelVoicePrompt = useCallback((event) => {
    event?.preventDefault();
    event?.stopPropagation();
    window.clearTimeout(speechActivityTimerRef.current);
    window.clearTimeout(voiceLongPressTimerRef.current);
    const recognition = recognitionRef.current;
    recognitionRef.current = null;
    try {
      recognition?.abort();
    } catch (_) {}
    stopInputMeter();
    manualStopRef.current = false;
    promptValueRef.current = '';
    speechBaseRef.current = '';
    speechFinalRef.current = '';
    speechHadErrorRef.current = false;
    setPromptValue('');
    setDisplayedPrompt('');
    setSpeechActive(false);
    setSpeechSendReady(false);
    setSpeechError('');
    setPendingSubmit(false);
    requestMicrophonePermission('');
  }, [requestMicrophonePermission, stopInputMeter]);

  const handleVoiceButton = useCallback((event) => {
    if (!selected || pendingSubmit) return;
    if (suppressVoiceClickRef.current) {
      suppressVoiceClickRef.current = false;
      return;
    }
    event?.currentTarget?.blur();

    if (speechStatus === 'requesting-permission') return;
    if (speechError === SPEECH_ERROR_MESSAGES['not-allowed']) {
      requestMicrophonePermission();
      return;
    }
    if (speechStatus === 'starting' || speechStatus === 'listening') {
      if (promptValueRef.current.trim()) setPendingSubmit(true);
      stopSpeech();
    } else requestMicrophonePermission();
  }, [pendingSubmit, requestMicrophonePermission, selected, speechError, speechStatus, stopSpeech]);

  const beginVoiceLongPress = useCallback((event) => {
    if (!selected || pendingSubmit || speechError) return;
    if (typeof event.button === 'number' && event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    window.clearTimeout(voiceLongPressTimerRef.current);
    voiceLongPressStartedRef.current = false;
    suppressVoiceClickRef.current = false;
    event.currentTarget.dataset.pressing = 'true';

    voiceLongPressTimerRef.current = window.setTimeout(() => {
      voiceLongPressStartedRef.current = true;
      suppressVoiceClickRef.current = true;
      requestMicrophonePermission();
    }, VOICE_LONG_PRESS_MS);
  }, [pendingSubmit, requestMicrophonePermission, selected, speechError]);

  const endVoiceLongPress = useCallback((event) => {
    window.clearTimeout(voiceLongPressTimerRef.current);
    event.currentTarget.dataset.pressing = 'false';
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!voiceLongPressStartedRef.current) return;
    voiceLongPressStartedRef.current = false;
    stopSpeech();
  }, [stopSpeech]);

  const selectParticle = useCallback((particleId, coverId) => {
    if (selectedParticleRef.current === particleId) return;

    if (selectedDateBadgeRef.current) selectedDateBadgeRef.current.style.opacity = '0';
    if (selectedActionRef.current) {
      selectedActionRef.current.style.opacity = '0';
      selectedActionRef.current.style.pointerEvents = 'none';
    }

    setGuidanceDismissed(true);

    recognitionRef.current?.abort();
    recognitionRef.current = null;
    stopInputMeter();
    window.clearTimeout(speechActivityTimerRef.current);
    manualStopRef.current = false;
    promptValueRef.current = '';
    speechBaseRef.current = '';
    speechFinalRef.current = '';
    speechHadErrorRef.current = false;
    setPromptValue('');
    setDisplayedPrompt('');
    setSpeechStatus('idle');
    setSpeechActive(false);
    setSpeechSendReady(false);
    setSpeechError('');
    setPendingSubmit(false);

    const now = performance.now();
    const previousParticleId = selectedParticleRef.current;
    const previousBoid = boidsRef.current.find((item) => item.id === previousParticleId);
    const previousSelection = selectionTransitionRef.current;

    if (previousParticleId && previousBoid) {
      const previousElement = particleElementsRef.current.get(previousParticleId);
      const previousTargetZ = getContainedSelectedZ(previousElement, window.innerWidth, window.innerHeight);
      let previousZ = previousTargetZ;
      if (previousSelection?.id === previousParticleId) {
        const progress = Math.min(Math.max((now - previousSelection.startedAt) / SELECTION_EASE_MS, 0), 1);
        const eased = 1 - ((1 - progress) ** 4);
        previousZ = previousSelection.fromZ + (previousTargetZ - previousSelection.fromZ) * eased;
      }

      releaseTransitionsRef.current.set(previousParticleId, {
        id: previousParticleId,
        startedAt: now,
        fromZ: previousZ,
      });
    }

    const boid = boidsRef.current.find((item) => item.id === particleId);
    const activeRelease = releaseTransitionsRef.current.get(particleId);
    let fromZ = boid
      ? getNaturalZ(boid, now)
      : 0;

    if (boid && activeRelease) {
      const progress = Math.min(Math.max((now - activeRelease.startedAt) / RELEASE_EASE_MS, 0), 1);
      const eased = 1 - ((1 - progress) ** 4);
      const naturalZ = getNaturalZ(boid, now);
      fromZ = activeRelease.fromZ + (naturalZ - activeRelease.fromZ) * eased;
      releaseTransitionsRef.current.delete(particleId);
    }

    selectedParticleRef.current = particleId;
    selectionTransitionRef.current = boid
      ? {
        id: particleId,
        startedAt: now,
        fromX: boid.x,
        fromY: boid.y,
        fromZ,
      }
      : null;

    setSelectedId(coverId);
    setSelectedParticleId(particleId);
  }, [stopInputMeter]);

  const releaseParticle = useCallback((particleId) => {
    if (selectedParticleRef.current !== particleId) return;

    if (selectedDateBadgeRef.current) selectedDateBadgeRef.current.style.opacity = '0';
    if (selectedActionRef.current) {
      selectedActionRef.current.style.opacity = '0';
      selectedActionRef.current.style.pointerEvents = 'none';
    }

    const now = performance.now();
    const boid = boidsRef.current.find((item) => item.id === particleId);
    const transition = selectionTransitionRef.current;
    const selectedElement = particleElementsRef.current.get(particleId);
    const selectedTargetZ = getContainedSelectedZ(selectedElement, window.innerWidth, window.innerHeight);
    let fromZ = selectedTargetZ;

    if (transition?.id === particleId) {
      const progress = Math.min(Math.max((now - transition.startedAt) / SELECTION_EASE_MS, 0), 1);
      const eased = 1 - ((1 - progress) ** 4);
      fromZ = transition.fromZ + (selectedTargetZ - transition.fromZ) * eased;
      const coverSettle = getCoverSettleProgress(now, transition.startedAt);
      const pillSettledZ = getDepthAtProjectedScaleRatio(
        selectedTargetZ,
        SELECTED_PILL_COVER_SCALE_RATIO
      );
      fromZ += (pillSettledZ - selectedTargetZ) * coverSettle;
    }

    if (boid) {
      releaseTransitionsRef.current.set(particleId, {
        id: particleId,
        startedAt: now,
        fromZ,
      });
    }
    selectedParticleRef.current = null;
    selectionTransitionRef.current = null;
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    stopInputMeter();
    window.clearTimeout(speechActivityTimerRef.current);
    manualStopRef.current = false;
    promptValueRef.current = '';
    speechBaseRef.current = '';
    speechFinalRef.current = '';
    speechHadErrorRef.current = false;
    setPromptValue('');
    setDisplayedPrompt('');
    setSpeechStatus('idle');
    setSpeechActive(false);
    setSpeechSendReady(false);
    setSpeechError('');
    setPendingSubmit(false);
    setSelectedId(null);
    setSelectedParticleId(null);
  }, [stopInputMeter]);

  const toggleParticle = useCallback((particleId, coverId) => {
    if (selectedParticleRef.current === particleId) {
      releaseParticle(particleId);
      return;
    }
    selectParticle(particleId, coverId);
  }, [releaseParticle, selectParticle]);

  useEffect(() => {
    if (!debugState) return;

    recognitionRef.current?.abort();
    recognitionRef.current = null;
    stopInputMeter();
    window.clearTimeout(speechActivityTimerRef.current);
    setPendingSubmit(false);
    setSpeechError('');
    setGuidanceDismissed(debugState !== 'guidance');

    if (debugState === 'guidance' || debugState === 'archive') {
      if (selectedParticleRef.current) releaseParticle(selectedParticleRef.current);
      setPromptValue('');
      setDisplayedPrompt('');
      setSpeechStatus('idle');
      setSpeechActive(false);
      setSpeechSendReady(false);
      return;
    }

    const qaParticle = particles[0];
    if (!qaParticle) return;
    if (selectedParticleRef.current !== qaParticle.id) {
      selectParticle(qaParticle.id, qaParticle.cover.id);
    }

    const qaPrompt = '데이터가 유기체처럼 자라나는 우주';
    if (debugState === 'selected') {
      setPromptValue('');
      setDisplayedPrompt('');
      setSpeechStatus('idle');
      setSpeechActive(false);
      setSpeechSendReady(false);
    } else if (debugState === 'permission') {
      setPromptValue('');
      setDisplayedPrompt('');
      setSpeechStatus('requesting-permission');
      setSpeechActive(false);
      setSpeechSendReady(false);
    } else if (debugState === 'listening') {
      setPromptValue('');
      setDisplayedPrompt('');
      setSpeechStatus('listening');
      setSpeechActive(true);
      setSpeechSendReady(false);
    } else if (debugState === 'transcript') {
      promptValueRef.current = qaPrompt;
      setPromptValue(qaPrompt);
      setDisplayedPrompt(qaPrompt);
      setSpeechStatus('listening');
      setSpeechActive(false);
      setSpeechSendReady(true);
    }
  }, [debugState, particles, releaseParticle, selectParticle, stopInputMeter]);

  const handleParticlePointerDown = useCallback((event) => {
    if (typeof event.button === 'number' && event.button !== 0) return;

    const directTarget = event.target.closest?.('[data-particle-id]');
    let particle = directTarget
      ? particles.find((item) => item.id === directTarget.dataset.particleId)
      : null;

    if (!particle) {
      const hitSlop = event.pointerType === 'touch'
        ? TOUCH_HIT_SLOP_PX
        : POINTER_HIT_SLOP_PX;
      const matches = particles
        .map((item) => {
          const element = particleElementsRef.current.get(item.id);
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          const outsideX = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right);
          const outsideY = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom);
          const distance = Math.hypot(outsideX, outsideY);
          if (distance > hitSlop) return null;
          return {
            item,
            distance,
            depth: Number(window.getComputedStyle(element).zIndex) || 0,
          };
        })
        .filter(Boolean)
        .sort((a, b) => a.distance - b.distance || b.depth - a.depth);

      particle = matches[0]?.item;
    }

    if (particle) toggleParticle(particle.id, particle.cover.id);
  }, [particles, toggleParticle]);

  const handleFieldPointerMove = useCallback((event) => {
    if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    pointerFieldRef.current.active = true;
    pointerFieldRef.current.x = event.clientX;
    pointerFieldRef.current.y = event.clientY;
  }, []);

  const handleFieldPointerLeave = useCallback(() => {
    pointerFieldRef.current.active = false;
  }, []);

  const voicePermissionRequesting = speechStatus === 'requesting-permission';
  const voicePermissionPrompt = voicePermissionRequesting
    || speechError === SPEECH_ERROR_MESSAGES['not-allowed'];
  const voiceRecording = speechStatus === 'starting' || speechStatus === 'listening';
  const voiceAwaitingSpeech = voiceRecording && !displayedPrompt;
  const voiceSendReady = Boolean(displayedPrompt)
    && ((voiceRecording && speechSendReady) || pendingSubmit);
  const voiceButtonIdle = !displayedPrompt && !speechError && !voiceRecording && !voicePermissionRequesting;
  const voiceButtonCopy = displayedPrompt || (speechError && !voicePermissionPrompt
    ? speechError
    : VOICE_BUTTON_LABEL);
  const voiceButtonExpanded = Boolean(displayedPrompt || speechError || voicePermissionRequesting);
  const voicePromptCancellable = Boolean(displayedPrompt);
  const voiceCopyTyping = !speechError && displayedPrompt.length < promptValue.length;
  const promptWords = displayedPrompt.trim().split(/\s+/).filter(Boolean);
  const promptLastWord = promptWords.at(-1) || '';
  const promptLeadingText = promptWords.slice(0, -1).join(' ');
  const renderVoiceWave = () => (
    <span className={styles.voiceIconSlot} aria-hidden="true">
      <span
        ref={voiceWaveRef}
        className={styles.voiceWave}
        data-listening="true"
        data-speaking={speechActive || voiceSoundActive ? 'true' : 'false'}
      >
        <span style={{ '--wave-index': 0 }} />
        <span style={{ '--wave-index': 1 }} />
        <span style={{ '--wave-index': 2 }} />
        <span style={{ '--wave-index': 3 }} />
        <span style={{ '--wave-index': 4 }} />
      </span>
    </span>
  );
  const renderSendIcon = () => (
    <span className={styles.voiceSendIcon} aria-hidden="true">
      <img src="/ui/one-ui-send.svg" alt="" />
    </span>
  );

  return (
    <main
      ref={pageRef}
      className={styles.page}
      data-debug-state={debugState || undefined}
    >
      {!guidanceDismissed && (
        <>
          <div className={styles.titleShade} aria-hidden="true" />
          <header className={styles.header}>
            <div>
              <h1 aria-label="마음에 드는 표지를 하나 선택하세요">
                {COVER_SELECTION_TITLE_LINES.map((line) => (
                  <span key={line.text} className={styles.titleLine} aria-hidden="true">
                    {Array.from(line.text).map((character, characterIndex) => (
                      <span
                        key={`${line.text}-${characterIndex}`}
                        className={styles.titleCharacter}
                        style={{ '--character-order': line.offset + characterIndex }}
                      >
                        {character === ' ' ? '\u00a0' : character}
                      </span>
                    ))}
                  </span>
                ))}
              </h1>
            </div>
          </header>
        </>
      )}

      <section
        className={styles.field}
        aria-label="월간디자인 과거 표지 파티클 아카이브"
        onPointerDown={handleParticlePointerDown}
        onPointerMove={handleFieldPointerMove}
        onPointerLeave={handleFieldPointerLeave}
        onPointerCancel={handleFieldPointerLeave}
      >
        {particles.map((particle) => {
          const isSelected = particle.id === selectedParticleId;
          return (
            <button
              key={particle.id}
              ref={(element) => {
                if (element) particleElementsRef.current.set(particle.id, element);
                else particleElementsRef.current.delete(particle.id);
              }}
              type="button"
              className={styles.particle}
              data-selected={isSelected ? 'true' : 'false'}
              data-depth={particle.depthName}
              data-generation={particle.generation}
              data-particle-id={particle.id}
              aria-label={`월간디자인 ${particle.cover.issue}호 ${particle.cover.date} ${isSelected ? '선택 해제' : '선택'}`}
              aria-pressed={isSelected}
              onPointerDown={(event) => {
                if (typeof event.button === 'number' && event.button !== 0) return;
                // Select at contact time. Waiting for click/touchend lets a
                // fast flocking card move out from under the finger on mobile.
                event.stopPropagation();
                event.currentTarget.setPointerCapture?.(event.pointerId);
                toggleParticle(particle.id, particle.cover.id);
              }}
              onClick={(event) => {
                if (event.detail === 0) toggleParticle(particle.id, particle.cover.id);
              }}
              style={{
                '--size': `${particle.size}vmin`,
                '--z': particle.zIndex,
                '--initial-x': `${particle.initialX}vw`,
                '--initial-y': `${particle.initialY}vh`,
                '--initial-z': `${particle.z}px`,
              }}
            >
              <img
                src={particle.cover.imageUrl}
                alt=""
                onLoad={(event) => {
                  const image = event.currentTarget;
                  if (!image.naturalWidth || !image.naturalHeight) return;
                  image.parentElement?.style.setProperty(
                    '--cover-aspect-ratio',
                    `${image.naturalWidth} / ${image.naturalHeight}`
                  );
                }}
              />
            </button>
          );
        })}

        <p className={styles.fieldLabel}>ARCHIVE 1976–2026</p>
        {selected && (
          <time
            ref={selectedDateBadgeRef}
            className={styles.selectedDateBadge}
            dateTime={selected.date.replace('.', '-')}
            aria-live="polite"
          >
            {selected.date}
          </time>
        )}
      </section>

      <footer
        ref={selectedActionRef}
        className={styles.footer}
        data-visible={selected ? 'true' : 'false'}
        aria-hidden={selected ? undefined : 'true'}
      >
        <div
          className={styles.voiceControl}
          data-single-line={voicePromptSingleLine ? 'true' : 'false'}
        >
          <GlassSurface
            key={selectedParticleId || 'no-selection'}
            as="button"
            type="button"
            className={styles.continueButton}
            borderRadius={999}
            timedGlare={voiceButtonIdle || pendingSubmit}
            timedGlareMode={pendingSubmit ? 'confirm' : 'idle'}
            data-expanded={voiceButtonExpanded ? 'true' : 'false'}
            data-listening={voiceRecording ? 'true' : 'false'}
            data-send-ready={voiceSendReady ? 'true' : 'false'}
            data-send-confirmed={pendingSubmit ? 'true' : 'false'}
            data-awaiting-speech={voiceAwaitingSpeech ? 'true' : 'false'}
            data-idle={voiceButtonIdle ? 'true' : 'false'}
            data-permission={voicePermissionPrompt ? 'true' : 'false'}
            data-has-transcript={displayedPrompt ? 'true' : 'false'}
            data-error={speechError && !voicePermissionPrompt ? 'true' : 'false'}
            data-cancellable={voicePromptCancellable ? 'true' : 'false'}
            data-pressing="false"
            aria-label={pendingSubmit
              ? '음성 프롬프트 전송 중'
              : voiceSendReady
                ? '음성 프롬프트 전송'
              : voiceRecording
                ? '음성 프롬프트 입력 중'
                : '클릭하거나 길게 눌러 음성으로 나만의 표지 만들기'}
            aria-pressed={voiceRecording}
            disabled={!selected || pendingSubmit || Boolean(debugState)}
            onClick={handleVoiceButton}
            onPointerDown={beginVoiceLongPress}
            onPointerUp={endVoiceLongPress}
            onPointerCancel={endVoiceLongPress}
            onLostPointerCapture={endVoiceLongPress}
            onContextMenu={(event) => event.preventDefault()}
          >
            <span className={styles.voiceButtonContent}>
            <span
              ref={voiceTranscriptRef}
              className={styles.voiceTranscript}
              data-empty={displayedPrompt || speechError ? 'false' : 'true'}
              data-typing={voiceCopyTyping ? 'true' : 'false'}
              aria-live="polite"
            >
              {(voiceRecording || pendingSubmit) && displayedPrompt ? (
                <>
                  {promptLeadingText ? `${promptLeadingText} ` : ''}
                  <span className={styles.voiceTranscriptTail}>
                    {promptLastWord}
                    {voiceSendReady ? renderSendIcon() : renderVoiceWave()}
                  </span>
                </>
              ) : voiceButtonCopy}
            </span>
            <span className={styles.voiceListeningPrompt} aria-hidden="true">
              <span className={styles.voiceListeningCopy}>
                프롬프트를 말해보세요
                {voiceAwaitingSpeech && renderVoiceWave()}
              </span>
            </span>
            <span className={styles.permissionPrompt} aria-hidden="true">
              <span>마이크 권한 허용해주세요</span>
              <span className={styles.permissionMicIcon}>
                <span />
              </span>
            </span>
            </span>
          </GlassSurface>
          {voicePromptCancellable && (
            <button
              type="button"
              className={styles.voiceCancelButton}
              aria-label="프롬프트 입력 취소"
              disabled={Boolean(debugState)}
              onClick={cancelVoicePrompt}
            >
              <span aria-hidden="true" />
            </button>
          )}
        </div>
      </footer>
    </main>
  );
}

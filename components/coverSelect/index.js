import { memo, useCallback, useEffect, useRef, useState } from 'react';
import GlassSurface from '@/components/GlassSurface';
import { DEFAULT_MONTHLY_DESIGN_COVER, MONTHLY_DESIGN_COVERS } from '@/lib/monthlyDesignCovers';
import { duckNarration } from '@/lib/narration';
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
// send 직후 빠르게 커밋해 다음 화면(로딩)이 글레어 2회가 도는 동안
// 미리 마운트·준비되게 한다. 실제 화면 전환 타이밍은 mobile 쪽
// LOAD_REVEAL_DELAY_MS가 잡는다 (send +6.84초).
const PROMPT_CONFIRM_HOLD_MS = 500;
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
const DEPTH_DISTRIBUTION_INTERVAL = 24;
const MIDDLE_DEPTH_COUNT_PER_INTERVAL = 16;
const ULTRA_NEAR_Z_MIN = 500;
const ULTRA_NEAR_Z_SPAN = 38;
const COVER_SELECTION_TITLE_LINES = [
  { text: '마음에 드는 표지를', offset: 0 },
  { text: '하나 선택하세요', offset: 10 },
];
const VOICE_BUTTON_LABEL = '나만의 오마주 표지 만들기';
const VOICE_GUIDE_PROMPT_TEXT = '프롬프트를 말해보세요';
// 탭 직후 이 시간 동안은 기존 버튼 모양을 그대로 유지하고, 그 뒤에
// 컨테이너 morph(1초)와 가이드 타자기가 함께 시작된다.
const VOICE_MORPH_HOLD_MS = 400;

const SPEECH_ERROR_MESSAGES = {
  'not-allowed': '마이크 권한 허용해주세요',
  'service-not-allowed': '이 브라우저에서 음성 인식을 사용할 수 없습니다.',
  'audio-capture': '사용 가능한 마이크를 찾지 못했습니다.',
  network: '음성 인식 연결이 원활하지 않습니다. 다시 시도해 주세요.',
  'no-speech': '목소리가 들리지 않았습니다.\n다시 말해주세요.',
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

/**
 * 시드 셔플로 파티클마다 서로 다른 표지를 배정한다. 해시 단독 선택은 충돌로
 * 같은 잡지가 화면에 여러 장 보였다. SSR과 클라이언트가 같은 결과를 내도록
 * Math.random 대신 hash를 쓰고, 첫 파티클은 기본 표지(277호)를 유지한다.
 */
function buildUniqueCoverAssignment(coverPool, count) {
  const order = coverPool.map((_, index) => index);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(hash(i, 71.13) * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  const defaultIndex = coverPool.findIndex(
    (cover) => cover.id === DEFAULT_MONTHLY_DESIGN_COVER.id
  );
  if (defaultIndex >= 0) {
    const slot = order.indexOf(defaultIndex);
    if (slot > 0) [order[0], order[slot]] = [order[slot], order[0]];
  }

  return Array.from({ length: count }, (_, index) => coverPool[order[index % order.length]]);
}

function buildParticleNode(index, cover, generation = 0) {
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
  const rawZ = near
    ? ULTRA_NEAR_Z_MIN + hash(index, cycleSalt + 8) * ULTRA_NEAR_Z_SPAN
    : middle
      ? -80 + hash(index, cycleSalt + 8) * 240
      : -420 + hash(index, cycleSalt + 8) * 260;
  // 가장 큰(near) 표지와 그 아래 티어의 크기 격차가 커서, near의 절반은
  // 투영 스케일 80% 지점으로 물러난다. 선택 확대 크기는 z와 무관해 동일.
  const nearSoftened = near && hash(index, cycleSalt + 47) < 0.5;
  const z = nearSoftened ? getDepthAtProjectedScaleRatio(rawZ, 0.8) : rawZ;

  return {
    id: `archive-particle-${index}`,
    generation,
    cover,
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
  const coverPool = Array.isArray(covers) && covers.length ? covers : MONTHLY_DESIGN_COVERS;
  const assignment = buildUniqueCoverAssignment(coverPool, PARTICLE_COUNT);
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => (
    buildParticleNode(index, assignment[index])
  ));
}

export function getInitialParticleCoverUrls(covers = MONTHLY_DESIGN_COVERS) {
  return buildParticleNodes(covers).map((particle) => particle.cover.imageUrl);
}

/**
 * 인트로에서 실제로 미리 받아 디코딩해 둔 표지들만 모은 풀.
 *
 * 재생성(respawn)이 578장 전체에서 표지를 고르면 화면 밖으로 나간 카드가
 * 돌아올 때마다 새 이미지를 네트워크에서 받아야 한다. 그동안 그 파티클은
 * 빈 칸으로 보이고, 초당 수십 장의 디코딩이 애니메이션 프레임을 잡아먹는다.
 * 미리 데워둔 집합 안에서만 순환시키면 재생성 비용이 0이 된다.
 */
export function getWarmCoverPool(covers = MONTHLY_DESIGN_COVERS) {
  const seen = new Set();
  const warm = [];
  buildParticleNodes(covers).forEach((particle) => {
    if (seen.has(particle.cover.id)) return;
    seen.add(particle.cover.id);
    warm.push(particle.cover);
  });
  return warm;
}

function mergeWarmCovers(base, extras) {
  if (!Array.isArray(extras) || !extras.length) return base;
  const seen = new Set(base.map((cover) => cover.id));
  const additions = extras.filter((cover) => cover?.id && cover?.imageUrl && !seen.has(cover.id));
  return additions.length ? [...base, ...additions] : base;
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

/**
 * 카드 한 장. memo가 없으면 파티클 하나가 재진입할 때마다 48장 전체가 다시
 * 렌더되고, 인라인 ref 콜백이 매번 새 함수라 48개 ref가 통째로 detach/attach된다.
 * 재진입은 초당 수차례 일어나므로 모바일에서 이 비용이 곧 끊김으로 나타난다.
 */
const ArchiveParticle = memo(function ArchiveParticle({
  particle,
  isSelected,
  onRegisterElement,
  onToggle,
}) {
  const { cover } = particle;
  // 500px 필드용 이미지는 3x 레티나에서 해상도가 모자란다 — 측정상 near
  // 티어는 표시 530 device px인데 래스터가 405뿐이라 1.3배 업스케일된다.
  // 그래서 선택 확대뿐 아니라 near 티어도 800px 세트(archive-lg)를
  // 프리로드해 완료 시에만 교체한다. lg 파일이 없는 달(손상 원본 등)은
  // onerror로 조용히 기본 이미지를 유지.
  const needsHighRes = isSelected || particle.depthName === 'near';
  const [highResReady, setHighResReady] = useState(false);
  const highResUrl = cover.imageUrl.replace('/covers/archive/', '/covers/archive-lg/');
  const hasHighResVariant = highResUrl !== cover.imageUrl;

  useEffect(() => {
    setHighResReady(false);
  }, [cover.id]);

  useEffect(() => {
    if (!needsHighRes || highResReady || !hasHighResVariant) return undefined;
    let active = true;
    const image = new Image();
    image.onload = () => {
      if (active) setHighResReady(true);
    };
    image.src = highResUrl;
    return () => {
      active = false;
    };
  }, [needsHighRes, highResReady, hasHighResVariant, highResUrl]);

  return (
    <button
      ref={(element) => onRegisterElement(particle.id, element)}
      type="button"
      className={styles.particle}
      data-selected={isSelected ? 'true' : 'false'}
      data-depth={particle.depthName}
      data-generation={particle.generation}
      data-particle-id={particle.id}
      aria-label={`월간디자인 ${cover.issue}호 ${cover.date} ${isSelected ? '선택 해제' : '선택'}`}
      aria-pressed={isSelected}
      onPointerDown={(event) => {
        if (typeof event.button === 'number' && event.button !== 0) return;
        // Select at contact time. Waiting for click/touchend lets a
        // fast flocking card move out from under the finger on mobile.
        event.stopPropagation();
        event.currentTarget.setPointerCapture?.(event.pointerId);
        onToggle(particle.id, cover.id);
      }}
      onClick={(event) => {
        if (event.detail === 0) onToggle(particle.id, cover.id);
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
        src={needsHighRes && highResReady ? highResUrl : cover.imageUrl}
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
});

export default function CoverSelectScreen({
  onSubmit,
  debugState = null,
  initialCovers = null,
  extraWarmCovers = null,
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
  // 리스닝 시작~첫 단어 사이: 트랜스크립트 자리에 가이드 문구를 띄우는 단계.
  // 가이드가 같은 요소에 있어야 컨테이너·텍스트·웨이브가 끊기지 않고 이어진다.
  const [promptPlaceholder, setPromptPlaceholder] = useState(false);
  const [voiceMorphHold, setVoiceMorphHold] = useState(false);
  const voiceMorphHoldTimerRef = useRef(null);
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
  const warmCoverPoolRef = useRef(getWarmCoverPool(initialCoverPool));
  const extraWarmCoversRef = useRef(null);
  const selectedParticleRef = useRef(null);
  const selectionTransitionRef = useRef(null);
  const releaseTransitionsRef = useRef(new Map());
  const recognitionRef = useRef(null);
  const promptValueRef = useRef('');
  const promptPlaceholderRef = useRef(false);
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

  useEffect(() => {
    promptPlaceholderRef.current = promptPlaceholder;
  }, [promptPlaceholder]);

  useEffect(() => {
    // 첫 단어가 도착하면 가이드 단계 종료 → 아래 동기화 효과가 가이드를
    // 한 글자씩 지운 뒤 실제 프롬프트를 타이핑한다.
    if (promptPlaceholder && promptValue) setPromptPlaceholder(false);
  }, [promptPlaceholder, promptValue]);

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
    // AudioContext는 닫지 않고 살려둔다. iOS Safari는 컨텍스트를 세션마다
    // 만들고 닫으면 다음 세션이 'interrupted' 상태로 시작해 두 번째
    // 음성 입력("다시 생성" 후)이 조용히 실패하는 일이 있다. 완전한 close는
    // 컴포넌트 언마운트에서만 수행한다.
    microphoneAudioContextRef.current?.suspend?.().catch?.(() => {});
    setVoiceSoundActive(false);
    Array.from(voiceWaveRef.current?.children || []).forEach((bar) => {
      bar.style.removeProperty('--voice-level');
      bar.style.removeProperty('--voice-amp');
    });
  }, []);

  const startInputMeter = useCallback((stream) => {
    stopInputMeter();
    microphoneStreamRef.current = stream;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    // 세션 간 하나의 AudioContext를 재사용한다(위 stopInputMeter 주석 참고).
    let context = microphoneAudioContextRef.current;
    if (!context || context.state === 'closed') {
      context = new AudioContext({ latencyHint: 'interactive' });
      microphoneAudioContextRef.current = context;
    }
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
    // 4개 대역을 계산해 7막대에 좌우 대칭으로 배분한다(중앙 = 저역).
    const bandRanges = [[1, 5], [4, 10], [8, 18], [14, 30]];
    const smoothedLevels = [0.08, 0.08, 0.08, 0.08];
    const barBandIndex = [3, 2, 1, 0, 1, 2, 3];
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
      });
      bars.forEach((bar, barIndex) => {
        const level = smoothedLevels[barBandIndex[barIndex] ?? 3];
        // 사인 웨이브를 멈추지 않는다 — 목소리는 웨이브의 진폭 배율만 키운다.
        bar?.style.setProperty('--voice-amp', (0.75 + level * 0.45).toFixed(3));
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
    warmCoverPoolRef.current = mergeWarmCovers(
      getWarmCoverPool(coverPool),
      extraWarmCoversRef.current
    );
  }, [coverPool]);

  // 2차 워밍이 끝난 표지를 재진입 풀에 흡수한다. 이미 디코딩된 이미지들이라
  // 콜드 페치 없이 플로킹의 표지 순환만 다양해진다. ref만 갱신하므로
  // 파티클 리렌더도 일어나지 않는다.
  useEffect(() => {
    extraWarmCoversRef.current = extraWarmCovers;
    warmCoverPoolRef.current = mergeWarmCovers(warmCoverPoolRef.current, extraWarmCovers);
  }, [extraWarmCovers]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
      stopInputMeter();
      // 세션 간 재사용하던 AudioContext는 화면을 떠날 때만 완전히 닫는다.
      if (microphoneAudioContextRef.current?.state !== 'closed') {
        microphoneAudioContextRef.current?.close().catch(() => {});
      }
      microphoneAudioContextRef.current = null;
      window.clearTimeout(speechActivityTimerRef.current);
      window.clearTimeout(voiceLongPressTimerRef.current);
    };
  }, [stopInputMeter]);

  useEffect(() => {
    if (displayedPrompt === promptValue) return undefined;
    // 가이드 단계에서는 동기화하지 않는다(빈 promptValue로 지워지는 것 방지).
    if (promptPlaceholder && !promptValue) return undefined;

    const timer = window.setTimeout(() => {
      setDisplayedPrompt((current) => {
        if (current === promptValue) return current;
        if (!promptValue.startsWith(current)) {
          let sharedLength = 0;
          const maximum = Math.min(current.length, promptValue.length);
          while (sharedLength < maximum && current[sharedLength] === promptValue[sharedLength]) {
            sharedLength += 1;
          }
          // 한 번에 지우지 않고 타자기처럼 몇 글자씩 되감는다 — 가이드 문구가
          // 지워지며 실제 프롬프트로 이어지는 연속성의 핵심.
          const erasable = current.length - sharedLength;
          const eraseStep = Math.max(1, Math.ceil(erasable / 8));
          return current.slice(0, Math.max(sharedLength, current.length - eraseStep));
        }
        const remaining = promptValue.length - current.length;
        const step = Math.max(1, Math.ceil(remaining / 12));
        return promptValue.slice(0, current.length + step);
      });
    }, 28);

    return () => window.clearTimeout(timer);
  }, [displayedPrompt, promptValue, promptPlaceholder]);

  // 가이드 단계: "프롬프트를 말해보세요"가 컨테이너 morph(1초)와 같은 호흡으로
  // 한 글자씩 입력된다. 발화가 시작되면 placeholder가 풀리며 즉시 중단된다.
  // 버튼 모양을 유지하는 홀드 구간에는 시작하지 않는다.
  useEffect(() => {
    if (voiceMorphHold) return undefined;
    if (!promptPlaceholder || promptValue) return undefined;
    if (displayedPrompt === VOICE_GUIDE_PROMPT_TEXT) return undefined;
    if (!VOICE_GUIDE_PROMPT_TEXT.startsWith(displayedPrompt)) return undefined;
    const timer = window.setTimeout(() => {
      setDisplayedPrompt((current) => (
        VOICE_GUIDE_PROMPT_TEXT.startsWith(current)
          ? VOICE_GUIDE_PROMPT_TEXT.slice(0, current.length + 1)
          : current
      ));
    }, Math.round(1000 / VOICE_GUIDE_PROMPT_TEXT.length));
    return () => window.clearTimeout(timer);
  }, [displayedPrompt, promptPlaceholder, promptValue, voiceMorphHold]);

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
    const motionSpeedScale = 1;

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

      // 재진입 표지는 프리로드된 풀 중 "지금 화면에 없는" 표지에서 고른다.
      // (콜드 페치 방지 + 같은 잡지가 동시에 두 장 보이는 중복 방지.)
      setParticles((current) => current.map((particle, index) => {
        if (particle.id !== boid.id) return particle;
        const pool = warmCoverPoolRef.current;
        const usedIds = new Set(
          current.filter((item) => item.id !== boid.id).map((item) => item.cover.id)
        );
        const unused = pool.filter((cover) => !usedIds.has(cover.id));
        const source = unused.length ? unused : pool;
        const cover = source[
          Math.floor(hash(index, boid.generation * 19.173 + 13) * source.length)
        ] || particle.cover;
        return { ...particle, generation: boid.generation, cover };
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
    if (!basePrompt) {
      // 버튼이 입력 창으로 morph(1초)되는 동안 가이드 문구가 타자기로
      // 입력된다 — 즉시 세팅하지 않고 아래 타이핑 이펙트가 채운다.
      // (버튼 외형 홀드는 탭 시점의 requestMicrophonePermission이 앵커.)
      setPromptPlaceholder(true);
      setDisplayedPrompt('');
    } else {
      setPromptPlaceholder(false);
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
      if (promptPlaceholderRef.current) {
        setPromptPlaceholder(false);
        setDisplayedPrompt('');
      }
      setSpeechActive(false);
      setSpeechSendReady(false);
      setSpeechStatus('error');
      setSpeechError(SPEECH_ERROR_MESSAGES[event.error] || '음성을 인식하지 못했습니다. 다시 시도해 주세요.');
    };

    recognition.onend = () => {
      if (recognitionRef.current !== recognition) return;
      recognitionRef.current = null;
      window.clearTimeout(speechActivityTimerRef.current);
      if (promptPlaceholderRef.current && !promptValueRef.current.trim()) {
        setPromptPlaceholder(false);
        setDisplayedPrompt('');
      }
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

    // 홀드는 사용자 탭에 앵커: 새 세션(기존 프롬프트 없음)이면 지금부터
    // 400ms 동안 버튼 외형을 유지한다 — 권한 요청·시작 상태 전환을 포함.
    const effectiveBase = typeof basePromptOverride === 'string'
      ? basePromptOverride
      : promptValueRef.current;
    if (!effectiveBase.trim()) {
      setVoiceMorphHold(true);
      window.clearTimeout(voiceMorphHoldTimerRef.current);
      voiceMorphHoldTimerRef.current = window.setTimeout(
        () => setVoiceMorphHold(false),
        VOICE_MORPH_HOLD_MS
      );
    }

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
    setPromptPlaceholder(false);
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
    setPromptPlaceholder(false);
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
    setPromptPlaceholder(false);
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
      setPromptPlaceholder(false);
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
      setPromptPlaceholder(false);
      setSpeechStatus('idle');
      setSpeechActive(false);
      setSpeechSendReady(false);
    } else if (debugState === 'permission') {
      setPromptValue('');
      setDisplayedPrompt('');
      setPromptPlaceholder(false);
      setSpeechStatus('requesting-permission');
      setSpeechActive(false);
      setSpeechSendReady(false);
    } else if (debugState === 'listening') {
      setPromptValue('');
      setPromptPlaceholder(true);
      setDisplayedPrompt(VOICE_GUIDE_PROMPT_TEXT);
      setSpeechStatus('listening');
      setSpeechActive(true);
      setSpeechSendReady(false);
    } else if (debugState === 'transcript') {
      setPromptPlaceholder(false);
      promptValueRef.current = qaPrompt;
      setPromptValue(qaPrompt);
      setDisplayedPrompt(qaPrompt);
      setSpeechStatus('listening');
      setSpeechActive(false);
      setSpeechSendReady(true);
    }
  }, [debugState, particles, releaseParticle, selectParticle, stopInputMeter]);

  // 안정적인 identity여야 ArchiveParticle의 memo가 유지된다.
  const registerParticleElement = useCallback((particleId, element) => {
    if (element) particleElementsRef.current.set(particleId, element);
    else particleElementsRef.current.delete(particleId);
  }, []);

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
  // 홀드 중에는 권한 요청 UI로도 바뀌지 않는다 — 이미 허용된 마이크의
  // 순간적인 requesting 상태가 버튼을 흔드는 플리커도 함께 막는다.
  const voicePermissionPrompt = (voicePermissionRequesting && !voiceMorphHold)
    || speechError === SPEECH_ERROR_MESSAGES['not-allowed'];
  const voiceRecording = speechStatus === 'starting' || speechStatus === 'listening';
  // 홀드 구간(탭 직후 400ms)에는 녹음이 시작됐어도 버튼 외형을 그대로 둔다.
  const voiceInputLive = voiceRecording && !voiceMorphHold;
  const voiceAwaitingSpeech = voiceInputLive && promptPlaceholder;
  const voiceSendReady = Boolean(displayedPrompt)
    && ((voiceRecording && speechSendReady) || pendingSubmit);
  const voiceButtonIdle = !displayedPrompt && !speechError && !voiceInputLive && !voicePermissionRequesting;
  const voiceButtonCopy = displayedPrompt || (speechError && !voicePermissionPrompt
    ? speechError
    : VOICE_BUTTON_LABEL);
  // voiceInputLive 포함: 가이드가 다 지워진 빈 프레임에 컨테이너가
  // 수축했다 재확장하는 출렁임을 막는다.
  const voiceButtonExpanded = Boolean(
    displayedPrompt || voiceInputLive || speechError
    || (voicePermissionRequesting && !voiceMorphHold)
  );
  const voicePromptCancellable = Boolean(displayedPrompt) && !promptPlaceholder;
  const voiceCopyTyping = !speechError && displayedPrompt.length < promptValue.length;
  // 타자기 진행 중(가이드 입력·지우기·STT 타이핑)에만 캐럿이 깜빡인다.
  const voiceTypewriterActive = !speechError && (
    promptPlaceholder && !promptValue
      ? displayedPrompt !== VOICE_GUIDE_PROMPT_TEXT
      : displayedPrompt !== promptValue
  );
  const promptWords = displayedPrompt.trim().split(/\s+/).filter(Boolean);
  const promptLastWord = promptWords.at(-1) || '';
  const promptLeadingText = promptWords.slice(0, -1).join(' ');

  // 마이크 세션(권한 요청 포함) 동안 나래이션을 덕킹해 STT·발화를
  // 방해하지 않는다. 세션이 끝나면 원래 볼륨으로 돌아온다.
  useEffect(() => {
    duckNarration(voiceRecording || voicePermissionRequesting);
  }, [voicePermissionRequesting, voiceRecording]);

  // 세션 종료(에러·유휴 복귀) 시 홀드 타이머를 정리한다. 권한 요청·시작·
  // 청취 상태에서는 유지 — 홀드는 탭부터 morph 시작까지를 덮는다.
  useEffect(() => {
    if (
      speechStatus === 'requesting-permission'
      || speechStatus === 'starting'
      || speechStatus === 'listening'
    ) return undefined;
    window.clearTimeout(voiceMorphHoldTimerRef.current);
    setVoiceMorphHold(false);
    return undefined;
  }, [speechStatus]);
  const renderVoiceWave = () => (
    <span className={styles.voiceIconSlot} aria-hidden="true">
      <span
        ref={voiceWaveRef}
        className={styles.voiceWave}
        data-listening="true"
        // 컬러는 '실제 인식이 잡히는 중'(speechActive)일 때만. 단순 소음
        // (voiceSoundActive)은 진폭만 키우고 색은 바꾸지 않는다.
        data-speaking={speechActive ? 'true' : 'false'}
      >
        {/* sound_balance.svg의 7-막대 기하를 그대로 재현 — 정적 아이콘 대신
            막대로 그려 사인 웨이브·발화 증폭 애니메이션을 유지한다. */}
        <span style={{ '--wave-index': 0 }} />
        <span style={{ '--wave-index': 1 }} />
        <span style={{ '--wave-index': 2 }} />
        <span style={{ '--wave-index': 3 }} />
        <span style={{ '--wave-index': 4 }} />
        <span style={{ '--wave-index': 5 }} />
        <span style={{ '--wave-index': 6 }} />
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
        {particles.map((particle) => (
          <ArchiveParticle
            key={particle.id}
            particle={particle}
            isSelected={particle.id === selectedParticleId}
            onRegisterElement={registerParticleElement}
            onToggle={toggleParticle}
          />
        ))}

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
            data-listening={voiceInputLive ? 'true' : 'false'}
            data-send-ready={voiceSendReady ? 'true' : 'false'}
            data-send-confirmed={pendingSubmit ? 'true' : 'false'}
            data-awaiting-speech={voiceAwaitingSpeech ? 'true' : 'false'}
            data-idle={voiceButtonIdle ? 'true' : 'false'}
            data-permission={voicePermissionPrompt ? 'true' : 'false'}
            data-has-transcript={displayedPrompt || voiceInputLive ? 'true' : 'false'}
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
              {(voiceInputLive || pendingSubmit) ? (
                displayedPrompt ? (
                  <>
                    {promptLeadingText ? `${promptLeadingText} ` : ''}
                    <span className={styles.voiceTranscriptTail}>
                      {promptLastWord}
                      {voiceTypewriterActive && (
                        <span className={styles.voiceTypeCursor} aria-hidden="true" />
                      )}
                      {voiceSendReady ? renderSendIcon() : renderVoiceWave()}
                    </span>
                  </>
                ) : (
                  // 가이드가 다 지워지고 실제 텍스트가 시작되기 전의 빈 프레임:
                  // 유휴 라벨로 되돌아가지 않고 웨이브만 남겨 연속성을 지킨다.
                  <span className={styles.voiceTranscriptTail}>{renderVoiceWave()}</span>
                )
              ) : voiceButtonCopy}
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

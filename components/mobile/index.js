import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import IntroScreen from '@/components/intro';
import CoverSelectScreen, { getInitialParticleCoverUrls, getWarmCoverPool } from '@/components/coverSelect';
import GenerationFlow, {
  DEFAULT_GENERATION_REQUEST,
  GENERATION_PHASES,
  normalizeGenerationRequest,
} from '@/components/generation';
import End2Screen from '@/components/end2';
import { WALL_ENABLED } from '@/lib/featureFlags';
import { startCoverNarration, stopAllNarration } from '@/lib/narration';
import { MONTHLY_DESIGN_COVERS } from '@/lib/monthlyDesignCovers';
import { preloadImageBatch } from '@/lib/preloadImages';
import styles from './styles.module.css';

const STEPS = {
  INTRO: 'intro',
  COVER: 'cover',
  LOAD: 'load',
  HOMAGE: 'homage',
  END2: 'end2',
};

const QA_STAGES = [
  { scene: STEPS.INTRO, state: 'idle' },
  { scene: STEPS.INTRO, state: 'exploring' },
  { scene: STEPS.INTRO, state: 'statement' },
  { scene: STEPS.COVER, state: 'guidance' },
  { scene: STEPS.COVER, state: 'archive' },
  { scene: STEPS.COVER, state: 'selected' },
  { scene: STEPS.COVER, state: 'permission' },
  { scene: STEPS.COVER, state: 'listening' },
  { scene: STEPS.COVER, state: 'transcript' },
  { scene: STEPS.LOAD, state: 'loading' },
  { scene: STEPS.HOMAGE, state: 'result' },
  // END2(구 엔딩 씬)는 비활성 — 일반 플로우에 진입 경로가 없고, QA에서도
  // 실수로 열리지 않게 제외한다. 코드는 components/end2/에 그대로 있다.
];

const QA_SCENE_START = {
  [STEPS.INTRO]: 0,
  [STEPS.COVER]: 3,
  [STEPS.LOAD]: 9,
  [STEPS.HOMAGE]: 10,
};

const SCENE_TRANSITION_MS = 660;
const RESULT_TRANSITION_MS = 820;
// send 확인 글레어 안무가 끝날 때까지 로드 화면 공개를 미룬다:
// 커밋(send+500ms) 후 5980ms 대기 → send 기준 0.88s 딜레이 + 스윕(1.68s)
// + 1.44s 쉼 + 스윕(1.68s) + 0.8s 뒤(=6.48s)에 슬라이드가 시작된다.
// 그 사이 로드 화면은 이미 마운트되어 준비를 마친다.
const LOAD_REVEAL_DELAY_MS = 5980;
const DESKTOP_COVER_PRELOAD_CONCURRENCY = 4;
const MOBILE_COVER_PRELOAD_CONCURRENCY = 2;
const COVER_PRELOAD_RELEASE_MS = 12000;
// 로딩 구의 모바일 파티클 수(components/load MOBILE_PARTICLE_COUNT)와 맞춘 목표.
// 1차 워밍(≈45장) + 2차 워밍으로 이 수만큼 고유 표지를 만들어 둔다.
const SPHERE_UNIQUE_COVER_TARGET = 96;

export default function MobileScreen() {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.INTRO);
  const [coverMounted, setCoverMounted] = useState(false);
  const [transitioningToCover, setTransitioningToCover] = useState(false);
  const [loadMounted, setLoadMounted] = useState(false);
  const [transitioningToLoad, setTransitioningToLoad] = useState(false);
  const [homageMounted, setHomageMounted] = useState(false);
  const [transitioningToHomage, setTransitioningToHomage] = useState(false);
  // "다시 생성" 역방향 전환: 결과 화면이 우측으로 빠지고 표지 선택이
  // 좌측(-100%)에서 들어온다 — 전진 방향(우→좌)의 정확한 되감기.
  const [backStagingToCover, setBackStagingToCover] = useState(false);
  const [transitioningBackToCover, setTransitioningBackToCover] = useState(false);
  const [generationRequest, setGenerationRequest] = useState(null);
  const [coverArchive, setCoverArchive] = useState(null);
  const [coverPreload, setCoverPreload] = useState({
    total: 48,
    loaded: 0,
    failed: 0,
    ready: false,
    timedOut: false,
  });
  // 1차 워밍 풀: 인트로에서 미리 디코딩해 둔 초기 파티클 표지(≈45장).
  const warmCoverArchive = useMemo(
    () => (coverArchive ? getWarmCoverPool(coverArchive) : null),
    [coverArchive]
  );
  // 2차 워밍 풀: 표지 선택(플로킹) 동안 백그라운드로 추가 디코딩한 표지.
  // 로딩 구가 뜨기 전에 1차+2차 = 96장 고유 표지를 만들어 두는 것이 목표다.
  const [extraWarmCovers, setExtraWarmCovers] = useState(null);
  // 구(球) 풀은 제출 시점에 동결한 스냅샷. 로딩 도중 2차 워밍 완료로 풀이
  // 바뀌면 구가 모든 비트맵을 다시 만들며 히치가 생기므로 갱신하지 않는다.
  const [sphereCovers, setSphereCovers] = useState(null);
  const warmCoverArchiveRef = useRef(null);
  const extraWarmCoversRef = useRef(null);
  const coverNarrationPlayedRef = useRef(false);
  const [qaIndex, setQaIndex] = useState(null);
  const qaStage = qaIndex == null ? null : QA_STAGES[qaIndex];
  const coverTransitionReady = coverPreload.ready || coverPreload.timedOut;

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const htmlWasLocked = html.classList.contains('mobile-flow-scroll-lock');
    const bodyWasLocked = body.classList.contains('mobile-flow-scroll-lock');

    html.classList.add('mobile-flow-scroll-lock');
    body.classList.add('mobile-flow-scroll-lock');
    window.scrollTo(0, 0);

    return () => {
      if (!htmlWasLocked) html.classList.remove('mobile-flow-scroll-lock');
      if (!bodyWasLocked) body.classList.remove('mobile-flow-scroll-lock');
    };
  }, []);

  const go = useCallback((next) => {
    setStep(next);
  }, []);

  const beginIntroExit = useCallback(() => {
    setCoverMounted(true);
  }, []);

  const finishIntroExit = useCallback(() => {
    setStep(STEPS.COVER);
    setTransitioningToCover(false);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const releaseTimer = window.setTimeout(() => {
      if (active) setCoverPreload((current) => ({ ...current, timedOut: true }));
    }, COVER_PRELOAD_RELEASE_MS);

    const preloadCoverArchive = async () => {
      let covers = MONTHLY_DESIGN_COVERS;
      try {
        const response = await fetch('/api/monthly-design-covers', {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`cover archive ${response.status}`);
        const payload = await response.json();
        if (Array.isArray(payload?.covers) && payload.covers.length) covers = payload.covers;
      } catch (error) {
        if (error?.name === 'AbortError') return;
      }

      if (!active) return;
      setCoverArchive(covers);
      const imageUrls = getInitialParticleCoverUrls(covers);
      const mobileDecodeBudget = window.matchMedia('(pointer: coarse)').matches
        || window.innerWidth < 768;
      const result = await preloadImageBatch(imageUrls, {
        concurrency: mobileDecodeBudget
          ? MOBILE_COVER_PRELOAD_CONCURRENCY
          : DESKTOP_COVER_PRELOAD_CONCURRENCY,
        signal: controller.signal,
        onProgress: (progress) => {
          if (!active) return;
          const completed = progress.loaded + progress.failed;
          // Progress is not visible UI. Batch state updates so decoding dozens
          // of thumbnails cannot force the intro to rerender dozens of times.
          if (completed !== progress.total && completed % 4 !== 0) return;
          setCoverPreload((current) => ({
            ...current,
            total: progress.total,
            loaded: progress.loaded,
            failed: progress.failed,
          }));
        },
      });

      if (!active || result.aborted) return;
      window.clearTimeout(releaseTimer);
      setCoverPreload((current) => ({
        ...current,
        total: result.total,
        loaded: result.loaded,
        failed: result.failed,
        ready: true,
      }));
    };

    preloadCoverArchive();
    return () => {
      active = false;
      window.clearTimeout(releaseTimer);
      controller.abort();
    };
  }, []);

  // 최신 워밍 풀을 제출 핸들러(stale closure)에서도 읽을 수 있게 ref로 미러링.
  useEffect(() => {
    warmCoverArchiveRef.current = warmCoverArchive;
  }, [warmCoverArchive]);
  useEffect(() => {
    extraWarmCoversRef.current = extraWarmCovers;
  }, [extraWarmCovers]);

  // 2차 워밍: 플로킹(표지 선택) 화면이 떠 있는 동안 추가 표지를 미리 디코딩한다.
  // 사용자가 표지를 고르고 프롬프트를 말하는 구간이라 시간 여유가 충분하고,
  // 로딩 구가 뜬 뒤의 콜드 페치·디코딩 폭주를 피할 수 있다. best-effort —
  // 완료 전에 제출하면 구는 그때까지 데워진 1차 풀만 쓴다.
  useEffect(() => {
    if (step !== STEPS.COVER || !coverTransitionReady) return undefined;
    if (!coverArchive || !warmCoverArchive || extraWarmCovers) return undefined;

    const warmIds = new Set(warmCoverArchive.map((cover) => cover.id));
    const candidates = coverArchive.filter((cover) => !warmIds.has(cover.id));
    const targetCount = Math.max(0, SPHERE_UNIQUE_COVER_TARGET - warmIds.size);
    if (!candidates.length || !targetCount) {
      setExtraWarmCovers([]);
      return undefined;
    }

    // 아카이브 전체에서 등간격으로 샘플링해 연대가 고르게 섞이게 한다.
    const sampleStep = Math.max(1, Math.floor(candidates.length / targetCount));
    const offset = Math.floor(Math.random() * sampleStep);
    const picked = [];
    for (let index = offset; index < candidates.length && picked.length < targetCount; index += sampleStep) {
      picked.push(candidates[index]);
    }

    const controller = new AbortController();
    let active = true;
    const mobileDecodeBudget = window.matchMedia('(pointer: coarse)').matches
      || window.innerWidth < 768;
    preloadImageBatch(picked.map((cover) => cover.imageUrl), {
      concurrency: mobileDecodeBudget
        ? MOBILE_COVER_PRELOAD_CONCURRENCY
        : DESKTOP_COVER_PRELOAD_CONCURRENCY,
      signal: controller.signal,
    }).then((result) => {
      if (!active || result.aborted) return;
      setExtraWarmCovers(picked);
    });

    return () => {
      active = false;
      controller.abort();
    };
  }, [step, coverTransitionReady, coverArchive, warmCoverArchive, extraWarmCovers]);

  useEffect(() => {
    if (!coverMounted || step !== STEPS.INTRO || transitioningToCover) return undefined;
    const frame = window.requestAnimationFrame(() => setTransitioningToCover(true));
    return () => window.cancelAnimationFrame(frame);
  }, [coverMounted, step, transitioningToCover]);

  useEffect(() => {
    if (!loadMounted || step !== STEPS.COVER || transitioningToLoad) return undefined;
    const timer = window.setTimeout(
      () => setTransitioningToLoad(true),
      LOAD_REVEAL_DELAY_MS
    );
    return () => window.clearTimeout(timer);
  }, [loadMounted, step, transitioningToLoad]);

  // 역방향 스테이징: 커버 레이어가 좌측(-100%)에 한 프레임 칠해진 뒤
  // 전환을 켠다(이중 rAF — 전진 전환과 같은 이유).
  useEffect(() => {
    if (!backStagingToCover || step !== STEPS.HOMAGE || transitioningBackToCover) return undefined;
    let innerFrame = 0;
    const outerFrame = window.requestAnimationFrame(() => {
      innerFrame = window.requestAnimationFrame(() => {
        setBackStagingToCover(false);
        setTransitioningBackToCover(true);
      });
    });
    return () => {
      window.cancelAnimationFrame(outerFrame);
      window.cancelAnimationFrame(innerFrame);
    };
  }, [backStagingToCover, step, transitioningBackToCover]);

  useEffect(() => {
    if (!transitioningBackToCover) return undefined;
    const timer = window.setTimeout(() => {
      setStep(STEPS.COVER);
      setTransitioningBackToCover(false);
      setHomageMounted(false);
      setGenerationRequest(null);
      setSphereCovers(null);
    }, SCENE_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [transitioningBackToCover]);

  // 나래이션 파트 2(표지 생성 경험·디자이너에게 던지는 질문) — 표지 선택
  // 화면 첫 도착 시 한 번만. QA 점프에서는 재생하지 않는다.
  useEffect(() => {
    if (step !== STEPS.COVER || qaStage || coverNarrationPlayedRef.current) return;
    coverNarrationPlayedRef.current = true;
    startCoverNarration();
  }, [qaStage, step]);

  useEffect(() => () => stopAllNarration(), []);

  useEffect(() => {
    if (!transitioningToLoad) return undefined;
    const timer = window.setTimeout(() => {
      setStep(STEPS.LOAD);
      setTransitioningToLoad(false);
    }, SCENE_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [transitioningToLoad]);

  useEffect(() => {
    if (!homageMounted || step !== STEPS.LOAD || transitioningToHomage) return undefined;
    // 이중 rAF: 결과 레이어가 오른쪽(+100%) 위치로 한 프레임 칠해진 뒤에
    // 전환을 켜야 우측→좌측 슬라이드가 실제로 보인다. 단일 rAF는 첫
    // 페인트를 앞질러서 결과 화면이 제자리에서 튀어나온다.
    let innerFrame = 0;
    const outerFrame = window.requestAnimationFrame(() => {
      innerFrame = window.requestAnimationFrame(() => setTransitioningToHomage(true));
    });
    return () => {
      window.cancelAnimationFrame(outerFrame);
      window.cancelAnimationFrame(innerFrame);
    };
  }, [homageMounted, step, transitioningToHomage]);

  useEffect(() => {
    if (!transitioningToHomage) return undefined;
    const timer = window.setTimeout(() => {
      setStep(STEPS.HOMAGE);
      setTransitioningToHomage(false);
      // 전환이 끝나면 로드 레이어를 내려놓는다. 남겨두면 기본 위치(+100%)로
      // 되돌아가는 슬라이드가 결과 화면 위(z-index 1)로 지나가 꼬여 보이고,
      // 구 캔버스 루프도 배경에서 계속 돈다.
      setLoadMounted(false);
    }, RESULT_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [transitioningToHomage]);

  useEffect(() => {
    const handleQaNavigation = (event) => {
      if (event.key === 'Escape' && qaIndex != null) {
        event.preventDefault();
        setQaIndex(null);
        return;
      }
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const currentIndex = qaIndex ?? QA_SCENE_START[step] ?? 0;
      const nextIndex = Math.min(QA_STAGES.length - 1, Math.max(0, currentIndex + direction));
      const nextStage = QA_STAGES[nextIndex];

      setQaIndex(nextIndex);
      setStep(nextStage.scene);
      setCoverMounted(nextStage.scene === STEPS.COVER);
      setLoadMounted(nextStage.scene === STEPS.LOAD);
      setHomageMounted(nextStage.scene === STEPS.HOMAGE);
      setTransitioningToCover(false);
      setTransitioningToLoad(false);
      setTransitioningToHomage(false);

      if (nextStage.state === 'transcript' || nextStage.scene === STEPS.LOAD) {
        setGenerationRequest(DEFAULT_GENERATION_REQUEST);
      } else if (nextStage.scene === STEPS.HOMAGE) {
        // QA 결과 화면은 '생성 완료' 상태로 본다(Iridescence 배경 포함).
        // 무지 패널(생성 실패) 상태는 실제 플로우로 확인한다.
        setGenerationRequest({
          ...DEFAULT_GENERATION_REQUEST,
          generatedImageUrl: DEFAULT_GENERATION_REQUEST.coverImageUrl,
        });
      }
    };

    window.addEventListener('keydown', handleQaNavigation);
    return () => window.removeEventListener('keydown', handleQaNavigation);
  }, [qaIndex, step]);

  const handlers = useMemo(() => {
    return {
      // 결과 화면의 "다시 생성"이 여기로 돌아온다 — 인트로가 아니라 표지
      // 선택부터 다시 시작한다.
      goCover: () => {
        setCoverMounted(true);
        setLoadMounted(false);
        setTransitioningToLoad(false);
        setTransitioningToHomage(false);
        // 홈이지·요청은 슬라이드가 끝난 뒤에 정리한다 — 빠져나가는 동안
        // 결과 화면이 그대로 보여야 한다.
        setBackStagingToCover(true);
      },
      // GENERATION_HANDOFF_START: downstream ownership begins at this callback.
      // Generation implementation belongs under components/generation/.
      submitGeneration: (request) => {
        setGenerationRequest(normalizeGenerationRequest(request));
        // 구 풀을 제출 시점에 동결한다. 이후 2차 워밍이 끝나도 로딩 중인
        // 구가 비트맵을 다시 만들지 않도록 스냅샷만 넘긴다.
        const stageOne = warmCoverArchiveRef.current || [];
        const extras = extraWarmCoversRef.current || [];
        setSphereCovers(stageOne.length ? [...stageOne, ...extras] : null);
        setLoadMounted(true);
      },
      goHomage: (generatedImageUrl) => {
        let finalUrl = null;
        if (typeof generatedImageUrl === 'string') {
          finalUrl = generatedImageUrl;
        }
        setGenerationRequest(prev => {
          return { ...prev, generatedImageUrl: finalUrl };
        });
        setHomageMounted(true);
      },
      goArchive: () => router.push('/wall'),
      goEnd2: () => go(STEPS.END2),
      goIntro: () => {
        setCoverMounted(false);
        setLoadMounted(false);
        setHomageMounted(false);
        setTransitioningToCover(false);
        setTransitioningToLoad(false);
        setTransitioningToHomage(false);
        setGenerationRequest(null);
        setSphereCovers(null);
        go(STEPS.INTRO);
      },
    };
  }, [go, router]);

  if (step === STEPS.INTRO || step === STEPS.COVER || step === STEPS.LOAD || step === STEPS.HOMAGE) {
    const showCover = step === STEPS.INTRO
      ? coverMounted
      : (step === STEPS.COVER || backStagingToCover || transitioningBackToCover);
    const showLoad = loadMounted || step === STEPS.LOAD;
    const showHomage = homageMounted || step === STEPS.HOMAGE;
    return (
      <main
        className={styles.flowViewport}
        data-step={step}
        data-transitioning={transitioningToCover ? 'true' : 'false'}
        data-load-transitioning={transitioningToLoad ? 'true' : 'false'}
        data-homage-transitioning={transitioningToHomage ? 'true' : 'false'}
        data-back-staging={backStagingToCover ? 'true' : 'false'}
        data-back-transitioning={transitioningBackToCover ? 'true' : 'false'}
        data-cover-preload-ready={coverPreload.ready ? 'true' : 'false'}
        data-cover-preload-loaded={coverPreload.loaded}
      >
        {showHomage && (
          <div className={styles.homageLayer}>
            <GenerationFlow
              phase={GENERATION_PHASES.RESULT}
              request={generationRequest}
              onArchive={WALL_ENABLED ? handlers.goArchive : null}
              onRestart={handlers.goCover}
            />
          </div>
        )}
        {showLoad && (
          <div className={styles.loadLayer}>
            <GenerationFlow
              phase={GENERATION_PHASES.LOADING}
              request={generationRequest}
              onGenerated={handlers.goHomage}
              debugMode={Boolean(qaStage) || step !== STEPS.LOAD || transitioningToLoad}
              archiveCovers={sphereCovers || warmCoverArchive}
            />
          </div>
        )}
        {showCover && (
          <div
            className={styles.coverLayer}
            aria-hidden={step === STEPS.INTRO ? 'true' : undefined}
          >
            <CoverSelectScreen
              onSubmit={handlers.submitGeneration}
              debugState={qaStage?.state || null}
              initialCovers={coverArchive}
              extraWarmCovers={extraWarmCovers}
            />
          </div>
        )}
        {step === STEPS.INTRO && (
          <div className={styles.introLayer}>
            <IntroScreen
              onExitStart={beginIntroExit}
              onDone={finishIntroExit}
              debugState={qaStage?.state || null}
              canExit={coverTransitionReady || Boolean(qaStage)}
            />
          </div>
        )}
      </main>
    );
  }
  if (step === STEPS.END2) return <End2Screen onRestart={handlers.goIntro} />;
  return null;
}

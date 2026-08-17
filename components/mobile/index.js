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
  { scene: STEPS.END2, state: 'archive-cta' },
];

const QA_SCENE_START = {
  [STEPS.INTRO]: 0,
  [STEPS.COVER]: 3,
  [STEPS.LOAD]: 9,
  [STEPS.HOMAGE]: 10,
  [STEPS.END2]: 11,
};

const SCENE_TRANSITION_MS = 660;
const RESULT_TRANSITION_MS = 820;
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
    const frame = window.requestAnimationFrame(() => setTransitioningToLoad(true));
    return () => window.cancelAnimationFrame(frame);
  }, [loadMounted, step, transitioningToLoad]);

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
    const frame = window.requestAnimationFrame(() => setTransitioningToHomage(true));
    return () => window.cancelAnimationFrame(frame);
  }, [homageMounted, step, transitioningToHomage]);

  useEffect(() => {
    if (!transitioningToHomage) return undefined;
    const timer = window.setTimeout(() => {
      setStep(STEPS.HOMAGE);
      setTransitioningToHomage(false);
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

      if (nextStage.state === 'transcript' || nextStage.scene === STEPS.LOAD || nextStage.scene === STEPS.HOMAGE) {
        setGenerationRequest(DEFAULT_GENERATION_REQUEST);
      }
    };

    window.addEventListener('keydown', handleQaNavigation);
    return () => window.removeEventListener('keydown', handleQaNavigation);
  }, [qaIndex, step]);

  const handlers = useMemo(() => {
    return {
      goCover: () => {
        setCoverMounted(true);
        setLoadMounted(false);
        setHomageMounted(false);
        setTransitioningToLoad(false);
        setTransitioningToHomage(false);
        go(STEPS.COVER);
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
    const showCover = step === STEPS.INTRO ? coverMounted : step === STEPS.COVER;
    const showLoad = loadMounted || step === STEPS.LOAD;
    const showHomage = homageMounted || step === STEPS.HOMAGE;
    return (
      <main
        className={styles.flowViewport}
        data-step={step}
        data-transitioning={transitioningToCover ? 'true' : 'false'}
        data-load-transitioning={transitioningToLoad ? 'true' : 'false'}
        data-homage-transitioning={transitioningToHomage ? 'true' : 'false'}
        data-cover-preload-ready={coverPreload.ready ? 'true' : 'false'}
        data-cover-preload-loaded={coverPreload.loaded}
      >
        {showHomage && (
          <div className={styles.homageLayer}>
            <GenerationFlow
              phase={GENERATION_PHASES.RESULT}
              request={generationRequest}
              onArchive={WALL_ENABLED ? handlers.goArchive : null}
              onRestart={handlers.goIntro}
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

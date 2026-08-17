import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import IntroScreen from '@/components/intro';
import CoverSelectScreen, { getInitialParticleCoverUrls } from '@/components/coverSelect';
import GenerationFlow, {
  DEFAULT_GENERATION_REQUEST,
  GENERATION_PHASES,
  normalizeGenerationRequest,
} from '@/components/generation';
import End2Screen from '@/components/end2';
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
  const [qaIndex, setQaIndex] = useState(null);
  const qaStage = qaIndex == null ? null : QA_STAGES[qaIndex];
  const coverTransitionReady = coverPreload.ready || coverPreload.timedOut;

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
              onArchive={handlers.goArchive}
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

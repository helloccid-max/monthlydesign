import { useCallback, useEffect, useMemo, useState } from 'react';

import IntroScreen from '@/components/intro';
import CoverSelectScreen from '@/components/coverSelect';
import LoadScreen from '@/components/load';
import HomageScreen from '@/components/homage';
import End2Screen from '@/components/end2';
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

export default function MobileScreen() {
  const [step, setStep] = useState(STEPS.INTRO);
  const [coverMounted, setCoverMounted] = useState(false);
  const [transitioningToCover, setTransitioningToCover] = useState(false);
  const [loadMounted, setLoadMounted] = useState(false);
  const [transitioningToLoad, setTransitioningToLoad] = useState(false);
  const [qaIndex, setQaIndex] = useState(null);
  const qaStage = qaIndex == null ? null : QA_STAGES[qaIndex];

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
      setTransitioningToCover(false);
      setTransitioningToLoad(false);

      if (nextStage.state === 'transcript' || nextStage.scene === STEPS.LOAD || nextStage.scene === STEPS.HOMAGE) {
        try {
          localStorage.setItem('monthlyDesign:selectedCover', 'design-277-2001-07');
          localStorage.setItem('monthlyDesign:prompt', '데이터가 유기체처럼 자라나는 우주');
          localStorage.setItem('platforml:userText', '데이터가 유기체처럼 자라나는 우주');
        } catch (_) {}
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
        setTransitioningToLoad(false);
        go(STEPS.COVER);
      },
      goLoad: () => setLoadMounted(true),
      goHomage: () => go(STEPS.HOMAGE),
      goEnd2: () => go(STEPS.END2),
      goIntro: () => {
        setCoverMounted(false);
        setLoadMounted(false);
        setTransitioningToCover(false);
        setTransitioningToLoad(false);
        go(STEPS.INTRO);
      },
    };
  }, [go]);

  if (step === STEPS.INTRO || step === STEPS.COVER || step === STEPS.LOAD) {
    const showCover = step === STEPS.INTRO ? coverMounted : step === STEPS.COVER;
    const showLoad = loadMounted || step === STEPS.LOAD;
    return (
      <main
        className={styles.flowViewport}
        data-step={step}
        data-transitioning={transitioningToCover ? 'true' : 'false'}
        data-load-transitioning={transitioningToLoad ? 'true' : 'false'}
      >
        {showLoad && (
          <div className={styles.loadLayer}>
            <LoadScreen
              onDone={handlers.goHomage}
              debugMode={Boolean(qaStage) || step !== STEPS.LOAD || transitioningToLoad}
            />
          </div>
        )}
        {showCover && (
          <div
            className={styles.coverLayer}
            aria-hidden={step === STEPS.INTRO ? 'true' : undefined}
          >
            <CoverSelectScreen onNext={handlers.goLoad} debugState={qaStage?.state || null} />
          </div>
        )}
        {step === STEPS.INTRO && (
          <div className={styles.introLayer}>
            <IntroScreen
              onExitStart={beginIntroExit}
              onDone={finishIntroExit}
              debugState={qaStage?.state || null}
            />
          </div>
        )}
      </main>
    );
  }
  if (step === STEPS.HOMAGE) return <HomageScreen onDone={handlers.goEnd2} onEdit={handlers.goCover} />;
  if (step === STEPS.END2) return <End2Screen onRestart={handlers.goIntro} />;
  return null;
}

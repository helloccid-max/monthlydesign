import { useRef, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SWIPE_THRESHOLD = 30;
const EXPAND_DURATION_MS = 750;
const SHARPEN_DELAY_MS = 550;
const NAVIGATE_DELAY_MS = 1050;

export function useLandingLogic({ onNext } = {}) {
  const router = useRouter();
  const startY = useRef(0);
  const touchActive = useRef(false);
  const isTransitioning = useRef(false);
  const timersRef = useRef([]);

  // 0: 초기, 1: text박스 상태(멈춤), 2: 이동 중
  const [phase, setPhase] = useState(0);
  const [blurPx, setBlurPx] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [bgOpacity, setBgOpacity] = useState(1);

  const goNext = useCallback(() => {
    if (typeof onNext === 'function') return onNext();
    router.push('/text');
  }, [onNext, router]);

  const expandToTextBox = useCallback(() => {
    if (phase !== 0 || isTransitioning.current) return;
    isTransitioning.current = true;

    // 카드가 올라오는 동안 전체 블러 + 배경 이미지 서서히 사라짐
    setBgOpacity(0);
    setBlurPx(12);
    setOverlayOpacity(1);
    setPhase(1);

    const t1 = setTimeout(() => {
      setBlurPx(0);
      setOverlayOpacity(0);
    }, SHARPEN_DELAY_MS);

    const t2 = setTimeout(() => {
      goNext();
    }, NAVIGATE_DELAY_MS);

    timersRef.current.push(t1, t2);

    // transition은 타이머 기반으로 막아둠
    const t3 = setTimeout(() => {
      isTransitioning.current = false;
    }, EXPAND_DURATION_MS);
    timersRef.current.push(t3);
  }, [phase, goNext]);

  const goToTextPage = useCallback(() => {
    if (phase !== 1 || isTransitioning.current) return;
    isTransitioning.current = true;
    setPhase(2);
    setTimeout(() => goNext(), 900);
  }, [phase, goNext]);

  const handleAction = useCallback(() => {
    if (phase === 0) expandToTextBox();
    else if (phase === 1) goToTextPage();
  }, [phase, expandToTextBox, goToTextPage]);

  const handleTouchStart = useCallback((e) => {
    touchActive.current = true;
    startY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      if (e.changedTouches?.[0] && startY.current - e.changedTouches[0].clientY > SWIPE_THRESHOLD) {
        handleAction();
      }
      touchActive.current = false;
    },
    [handleAction]
  );

  const handleMouseDown = useCallback((e) => {
    startY.current = e.clientY;
  }, []);

  const handleMouseUp = useCallback(
    (e) => {
      if (startY.current - e.clientY > SWIPE_THRESHOLD) handleAction();
    },
    [handleAction]
  );

  const handleWheel = useCallback(
    (e) => {
      if (e.deltaY < -15) {
        e.preventDefault();
        handleAction();
      }
    },
    [handleAction]
  );

  const handleClick = useCallback(() => {
    handleAction();
  }, [handleAction]);

  useEffect(() => {
    const onTouchMove = (e) => {
      if (!touchActive.current || !e.touches.length) return;
      const currentY = e.touches[0].clientY;
      if (startY.current - currentY > SWIPE_THRESHOLD) {
        if (e.cancelable) e.preventDefault();
        touchActive.current = false;
        handleAction();
      }
    };
    const onTouchEnd = () => {
      touchActive.current = false;
    };
    const onWheel = (e) => {
      if (e.deltaY < -15) {
        if (e.cancelable) e.preventDefault();
        handleAction();
      }
    };
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
    document.addEventListener('touchcancel', onTouchEnd);
    document.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('touchcancel', onTouchEnd);
      document.removeEventListener('wheel', onWheel);
    };
  }, [handleAction]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, []);

  return {
    phase,
    blurPx,
    overlayOpacity,
    bgOpacity,
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
    handleWheel,
    handleClick,
  };
}


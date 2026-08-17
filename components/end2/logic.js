import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

export function useEnd2Logic({ onRestart } = {}) {
  const router = useRouter();
  const [touchStartY, setTouchStartY] = useState(null);

  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverscroll = document.documentElement.style.overscrollBehaviorY;
    const prevBodyOverscroll = document.body.style.overscrollBehaviorY;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overscrollBehaviorY = 'none';
    document.body.style.overscrollBehaviorY = 'none';

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overscrollBehaviorY = prevHtmlOverscroll;
      document.body.style.overscrollBehaviorY = prevBodyOverscroll;
    };
  }, []);

  const goHome = useCallback(() => {
    if (typeof onRestart === 'function') return onRestart();
    // `/landing`은 legacy로 이동해 더 이상 라우트가 없다. 플로우 시작점으로 돌린다.
    router.push('/mobile');
  }, [onRestart, router]);

  const goWall = useCallback(() => {
    router.push('/wall');
  }, [router]);

  const onTouchStart = useCallback((e) => {
    setTouchStartY(e.touches[0].clientY);
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      if (touchStartY === null) return;
      const endY = e.changedTouches[0].clientY;
      if (touchStartY - endY > 80) goHome();
      setTouchStartY(null);
    },
    [touchStartY, goHome]
  );

  const onWheel = useCallback(
    (e) => {
      if (e.deltaY > 50) goHome();
    },
    [goHome]
  );

  return {
    goHome,
    goWall,
    onTouchStart,
    onTouchEnd,
    onWheel,
  };
}

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

export function useLoadLogic({ onDone, paused = false } = {}) {
  const router = useRouter();

  const goDone = useCallback(() => {
    if (typeof onDone === 'function') return onDone();
    router.push('/end');
  }, [onDone, router]);

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

  useEffect(() => {
    if (paused) return undefined;
    const t = setTimeout(() => {
      goDone();
    }, 8000);
    return () => clearTimeout(t);
  }, [goDone, paused]);
}

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { POSTCARD_QUOTE_MAX_CHARS } from '@/lib/postcardQuoteLimit';

export function useTextLogic({ onNext } = {}) {
  const router = useRouter();
  const [inputValue, setInputValueRaw] = useState('');

  const setInputValue = useCallback((next) => {
    setInputValueRaw((prev) => {
      const v = typeof next === 'function' ? next(prev) : next;
      const s = typeof v === 'string' ? v : String(v ?? '');
      return s.slice(0, POSTCARD_QUOTE_MAX_CHARS);
    });
  }, []);
  const [touchStartY, setTouchStartY] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [dateText, setDateText] = useState('----.--.--');
  const textareaRef = useRef(null);

  const syncTextareaHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

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
    const d = new Date();
    setDateText(
      `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
    );
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(syncTextareaHeight);
    return () => cancelAnimationFrame(raf);
  }, [inputValue, syncTextareaHeight]);

  const persistInput = useCallback(() => {
    try {
      const safe = inputValue.slice(0, POSTCARD_QUOTE_MAX_CHARS);
      localStorage.setItem('monthlyDesign:prompt', safe);
      localStorage.setItem('platforml:userText', safe);
    } catch (_) {
      // ignore
    }
  }, [inputValue]);

  const goNextPage = useCallback(() => {
    if (typeof onNext === 'function') return onNext();
    router.push('/load');
  }, [onNext, router]);

  const goNext = useCallback(() => {
    persistInput();
    setIsExiting(true);
    setTimeout(() => {
      goNextPage();
    }, 500);
  }, [persistInput, goNextPage]);

  const handleTouchStart = useCallback((e) => {
    setTouchStartY(e.touches[0].clientY);
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      if (touchStartY === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      if (deltaY > 80) goNext();
      setTouchStartY(null);
    },
    [touchStartY, goNext]
  );

  const handleWheel = useCallback(
    (e) => {
      if (e.deltaY > 50) goNext();
    },
    [goNext]
  );

  return {
    inputValue,
    setInputValue,
    textareaRef,
    syncTextareaHeight,
    dateText,
    isExiting,
    handleTouchStart,
    handleTouchEnd,
    handleWheel,
  };
}

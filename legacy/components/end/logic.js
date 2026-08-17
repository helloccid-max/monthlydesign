import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { POSTCARD_QUOTE_MAX_CHARS } from '@/lib/postcardQuoteLimit';

/**
 * 사용자 미입력 시 엽서 뒷면 기본 문구 (길이는 POSTCARD_QUOTE_MAX_CHARS 이하).
 */
const DEFAULT_EMPTY_POSTCARD_QUOTE =
  '하루키 작가님, 익숙한 불안이 포근한 밤길 같아요. 첫 문장부터 다시 읽고 싶어요.';

export function useEndLogic({ onNext } = {}) {
  const router = useRouter();
  const [scale, setScale] = useState(1);
  const [flipped, setFlipped] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [touchStartY, setTouchStartY] = useState(null);
  const [dateText, setDateText] = useState('----.--.--');
  const [quoteText, setQuoteText] = useState('불러오는 중…');
  const [randomImageUrl, setRandomImageUrl] = useState(null);

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
    let cancelled = false;
    async function run() {
      try {
        let history = [];
        let recentSession = [];
        try {
          const raw = localStorage.getItem('platforml:cardImageHistory') || '[]';
          const parsed = JSON.parse(raw);
          history = Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : [];
        } catch (_) {
          history = [];
        }

        try {
          const rawSession = localStorage.getItem('platforml:cardImageSession') || '[]';
          const parsedSession = JSON.parse(rawSession);
          recentSession = Array.isArray(parsedSession) ? parsedSession.filter((v) => typeof v === 'string') : [];
        } catch (_) {
          recentSession = [];
        }

        const recentHistory = history.slice(-8);
        const excludePool = [...new Set([...recentHistory, ...recentSession])];
        const qs = excludePool.length > 0 ? `?exclude=${encodeURIComponent(excludePool.join(','))}` : '';
        const r = await fetch(`/api/random-public-image${qs}`);
        const data = await r.json().catch(() => ({}));
        const url = typeof data?.url === 'string' ? data.url : null;
        if (!cancelled) setRandomImageUrl(url || null);
        if (url) {
          try {
            const next = [...history.filter((u) => u !== url), url].slice(-20);
            localStorage.setItem('platforml:cardImageHistory', JSON.stringify(next));

            const updatedSession = [...recentSession.filter((u) => u !== url), url].slice(-4);
            localStorage.setItem('platforml:cardImageSession', JSON.stringify(updatedSession));
          } catch (_) {
            // ignore
          }
        }
      } catch (_) {
        if (!cancelled) setRandomImageUrl(null);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      let raw = '';
      try {
        raw = localStorage.getItem('platforml:userText') || '';
      } catch (_) {
        raw = '';
      }
      const trimmed = raw.trim().slice(0, POSTCARD_QUOTE_MAX_CHARS);
      if (!trimmed) {
        if (!cancelled) setQuoteText(DEFAULT_EMPTY_POSTCARD_QUOTE);
        return;
      }

      try {
        const r = await fetch('/api/normalize-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: trimmed }),
        });
        const data = await r.json().catch(() => ({}));
        const out = typeof data?.output === 'string' ? data.output : '';
        if (!cancelled) setQuoteText(out.trim() ? out : DEFAULT_EMPTY_POSTCARD_QUOTE);
      } catch (_) {
        if (!cancelled) setQuoteText(DEFAULT_EMPTY_POSTCARD_QUOTE);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const next = Math.min(window.innerWidth / 402, window.innerHeight / 876);
      setScale(Number.isFinite(next) ? next : 1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setFlipped(true), 900);
    return () => clearTimeout(t);
  }, []);

  const sendToWall = useCallback(() => {
    let userTextForWall = '';
    try {
      userTextForWall = (localStorage.getItem('platforml:userText') || '')
        .trim()
        .slice(0, POSTCARD_QUOTE_MAX_CHARS);
    } catch (_) {}
    if (!userTextForWall) userTextForWall = quoteText.slice(0, POSTCARD_QUOTE_MAX_CHARS);

    const payload = {
      text: userTextForWall,
      date: dateText,
      imageUrl: randomImageUrl || '',
    };
    // 시트에는 사용자가 적은 원문 저장 (localStorage에서 직전에 읽어서 전송)
    let userTextForSheet = '';
    try {
      userTextForSheet = (localStorage.getItem('platforml:userText') || '')
        .trim()
        .slice(0, POSTCARD_QUOTE_MAX_CHARS);
    } catch (_) {}
    if (!userTextForSheet) userTextForSheet = quoteText.slice(0, POSTCARD_QUOTE_MAX_CHARS);
    const textToLog = userTextForSheet || quoteText.slice(0, POSTCARD_QUOTE_MAX_CHARS);
    try {
      fetch('/api/log-interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToLog,
          imageUrl: randomImageUrl || '',
        }),
        keepalive: true,
      }).catch(() => {});
    } catch (_) {
      // ignore logging errors
    }
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon('/api/wall-send', blob);
        return;
      }
    } catch (_) {
      // ignore
    }
    // fallback
    fetch('/api/wall-send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }, [quoteText, dateText, randomImageUrl]);

  const goNextPage = useCallback(() => {
    if (typeof onNext === 'function') return onNext();
    router.push('/end2');
  }, [onNext, router]);

  const goNext = useCallback(() => {
    if (!flipped || isFadingOut) return;
    sendToWall();
    setIsFadingOut(true);
    setTimeout(() => {
      goNextPage();
    }, 320);
  }, [flipped, isFadingOut, sendToWall, goNextPage]);

  const onTouchStart = useCallback((e) => {
    setTouchStartY(e.touches[0].clientY);
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      if (touchStartY === null) return;
      const endY = e.changedTouches[0].clientY;
      if (touchStartY - endY > 80) goNext();
      setTouchStartY(null);
    },
    [touchStartY, goNext]
  );

  const onWheel = useCallback(
    (e) => {
      if (e.deltaY > 50) goNext();
    },
    [goNext]
  );

  return {
    scale,
    flipped,
    isFadingOut,
    onTouchStart,
    onTouchEnd,
    onWheel,
    dateText,
    quoteText,
    randomImageUrl,
  };
}


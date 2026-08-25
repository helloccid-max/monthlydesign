import Head from 'next/head';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useEffect } from 'react';
import '@/styles/globals.css';
import { RELOAD_BROADCAST_CHANNEL } from '@/lib/socket/events';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof BroadcastChannel === 'undefined') return undefined;

    const bc = new BroadcastChannel(RELOAD_BROADCAST_CHANNEL);
    const onMessage = () => {
      window.location.reload();
    };
    bc.addEventListener('message', onMessage);
    return () => {
      bc.removeEventListener('message', onMessage);
      bc.close();
    };
  }, []);

  // 모바일은 세로 전용. 잠금이 지원되는 환경(Android 등)에서는 best-effort로
  // 잠그고, 그 외(iOS Safari)는 아래 가로 모드 오버레이가 화면을 막는다.
  useEffect(() => {
    try {
      screen.orientation?.lock?.('portrait').catch(() => {});
    } catch (_) { /* 미지원 브라우저 — 오버레이가 대신한다 */ }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
      </Head>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
      {/* 모바일 가로 모드 차단 오버레이 — globals.css의 미디어쿼리로만 표시. */}
      <div className="orientationGuard" aria-hidden="true">
        <span className="orientationGuardIcon" />
        <p>
          세로 화면으로 돌려주세요
          <br />
          <span>Please rotate your device to portrait</span>
        </p>
      </div>
    </>
  );
}

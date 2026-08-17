import Head from 'next/head';
import WallScreen from '@/components/wall';
import { WALL_ENABLED } from '@/lib/featureFlags';

// Wall은 코드를 유지한 채 비활성화 상태다. WallScreen을 렌더하지 않으면
// Socket.IO 연결, Three.js 장면, 이미지 API 폴링이 모두 시작되지 않는다.
// 되살릴 때는 lib/featureFlags.js의 WALL_ENABLED만 true로 바꾼다.
export default function Wall() {
  if (!WALL_ENABLED) {
    return (
      <>
        <Head>
          <title>Data Universe (비활성화) | Monthly Design Homage</title>
          <meta name="robots" content="noindex" />
        </Head>
        <main
          style={{
            minHeight: '100vh',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0a',
            color: '#8a8a8a',
            textAlign: 'center',
            fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif",
          }}
        >
          <p style={{ margin: 0, fontSize: '0.95rem' }}>DATA UNIVERSE 비활성화</p>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#5a5a5a' }}>
            lib/featureFlags.js의 WALL_ENABLED를 true로 바꾸면 복구됩니다.
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Data Universe | Monthly Design Homage</title>
      </Head>
      <WallScreen />
    </>
  );
}

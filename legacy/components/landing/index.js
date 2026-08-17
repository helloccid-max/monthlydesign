import { useLandingLogic } from './logic';
import styles from './styles.module.css';

const cx = (...names) => names.filter(Boolean).map((n) => styles[n]).filter(Boolean).join(' ');

export default function LandingScreen({ onNext } = {}) {
  const {
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
  } = useLandingLogic({ onNext });

  return (
    <div
      className={styles['landing-page']}
      style={{
        '--landing-blur': `${blurPx}px`,
        '--landing-overlay-opacity': overlayOpacity,
        '--landing-bg-opacity': bgOpacity,
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles['landing-field']} aria-hidden="true">
        <span className={styles['landing-orb']} />
      </div>

      <header className={styles['landing-masthead']} aria-hidden="true">
        <span className={styles['landing-issue']}>277</span>
        <p className={styles['landing-kicker']}>
          <span /> a generative homage to contemporary design
        </p>
        <h1 className={styles['landing-brand']}>
          design <em>after</em>
        </h1>
        <p className={styles['landing-meta']}>Archive / Prompt / Generative Cover / 2026</p>
      </header>

      <section className={styles['landing-feature']} aria-hidden="true">
        <small>GENERATIVE COVER LAB</small>
        <p>월간디자인 표지를 고르고<br />당신의 언어로 다시 디자인하세요.</p>
      </section>

      <div className={styles['landing-indicator']}>
        <span className={cx('landing-dot', 'active')} aria-current="true" />
        <span className={styles['landing-dot']} />
        <span className={styles['landing-dot']} />
      </div>

      <div
        className={styles['landing-swipe-area']}
        role="button"
        tabIndex={0}
        aria-label="위로 스크롤하여 체험 시작"
        onClick={handleClick}
      />

      <div
        className={cx(
          'landing-cta-wrap',
          phase >= 1 && 'expanded',
          phase === 2 && 'slide-up'
        )}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onClick={handleClick}
      >
        <div className={cx('landing-cta-face', 'landing-cta')}>
          {phase === 0 ? (
            <>
              <span className={styles['landing-cta-line1']}>위로 스크롤 하여</span>
              <span className={styles['landing-cta-line2']}>표지 아카이브 열기</span>
            </>
          ) : (
            <>
              <span className={styles['landing-cta-line1']}>다음</span>
              <span className={styles['landing-cta-line2']}>탭하여 계속하기</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

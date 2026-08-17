import { useEnd2Logic } from './logic';
import GlassSurface from '@/components/GlassSurface';
import { WALL_ENABLED } from '@/lib/featureFlags';
import styles from './styles.module.css';

export default function End2Screen({ onRestart } = {}) {
  const { goHome, goWall, onTouchStart, onTouchEnd, onWheel } = useEnd2Logic({ onRestart });

  return (
    <div className={styles['end2-page']} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onWheel={onWheel}>
      <div className={styles['end2-canvas']}>
        <section className={styles['end2-text-section']} aria-hidden="true">
          <h1 className={styles['end2-title']}>
            <span className={styles['end2-title-line']}>DESIGN</span>
            <span className={styles['end2-title-line']}>AFTER</span>
            <span className={styles['end2-title-line']}>YOUR</span>
            <span className={styles['end2-title-line']}>PROMPT</span>
          </h1>
        </section>

        {WALL_ENABLED && (
          <div className={styles['end2-desc']} aria-hidden="true">
          <div>DATA UNIVERSE에 추가된</div>
          <div>나의 오마주 표지를 확인해보세요</div>
          </div>
        )}

        <div className={styles['end2-actions']}>
          {WALL_ENABLED && (
            <GlassSurface as="button" type="button" className={styles['end2-wall-button']} onClick={goWall}>
              생성 표지 아카이브 보기
            </GlassSurface>
          )}
          <GlassSurface as="button" type="button" className={styles['end2-exit-button']} aria-label="새 표지 만들기" onClick={goHome}>
            새 표지 만들기
          </GlassSurface>
        </div>
      </div>
    </div>
  );
}

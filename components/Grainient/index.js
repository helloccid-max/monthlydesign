import styles from './styles.module.css';

/**
 * 그레인 입힌 드리프트 그라디언트 배경 (react-bits Grainient와 동일 원리를
 * 의존성 없이 CSS로 구현). 라임 액센트 + 인트로 뒷면 블루를 아주 낮은
 * 강도로 섞어 검은 배경 위에서 천천히 흐른다.
 */
export default function Grainient({ className = '' }) {
  return (
    <div className={`${styles.root} ${className}`.trim()} aria-hidden="true">
      {/* 두 블롭 레이어가 서로 다른 주기·역방향으로 떠돌며 간섭 변주를
          만든다 — 결합된 필드가 같은 모양으로 반복되지 않는다. */}
      <div className={`${styles.blobs} ${styles.blobsA}`} />
      <div className={`${styles.blobs} ${styles.blobsB}`} />
    </div>
  );
}

import styles from './styles.module.css';

function ConnectionLabel({ status }) {
  if (status === 'connected') return 'LIVE SIGNAL';
  if (status === 'error') return 'SIGNAL LOST';
  if (status === 'disconnected') return 'OFFLINE ARCHIVE';
  return 'TUNING SIGNAL';
}

export default function EditorialOverlay({ status = 'connecting', cardCount = 0, archiveActive = false }) {
  const issueNo = String(Math.max(cardCount, 1)).padStart(2, '0');
  const modeLabel = archiveActive ? 'ARCHIVE FIELD' : status === 'connected' ? 'LIVE FIELD' : 'SYNC FIELD';

  return (
    <div className={styles.editorialChrome} aria-hidden="true">
      <header className={styles.masthead}>
        <span className={styles.issueMark}>{issueNo}</span>
        <p className={styles.kicker}>
          <span className={styles.signalDot} />
          a live universe of generated homage covers
        </p>
        <h1 className={styles.wallTitle}>
          <span>design</span>
          <em>A</em>
        </h1>
        <div className={styles.mastheadMeta}>
          <span>Monthly Design Homage / Seoul / 2026</span>
          <span>{archiveActive ? 'ARCHIVE PLAYBACK' : <ConnectionLabel status={status} />}</span>
        </div>
      </header>

      <section className={styles.dataKey}>
        <p className={styles.dataMode}>{modeLabel}</p>
        <div className={styles.dataReading}>
          <span><i className={styles.imageSignal} />homage cover</span>
          <span><i className={styles.archiveSignal} />organic field</span>
          <span><i className={styles.eventSignal} />input pulse</span>
        </div>
        <p className={styles.dataMetric}>
          <b>{String(cardCount).padStart(2, '0')}</b> generated covers / <b>3,828</b> field nodes
        </p>
      </section>

      <aside className={styles.sideNote}>
        <span>LIVE DATA / GENERATIVE MATERIAL</span>
        <span>THREE.JS / REAL–TIME</span>
      </aside>

      <footer className={styles.wallFooter}>
        <div className={styles.footerCopy}>
          <p><b>PROJECT</b> 월간디자인 표지와 프롬프트로 만드는 오마주</p>
          <p><b>LIVE ARCHIVE</b> 생성된 표지가 연결되는 데이터 우주</p>
          <p className={styles.footerEnglish}>design after prompt / organic data field</p>
        </div>
        <div className={styles.barcodeBlock}>
          <span className={styles.barcode} />
          <small>DA—001—{issueNo}</small>
        </div>
      </footer>
    </div>
  );
}

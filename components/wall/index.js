import styles from './styles.module.css';
import { useWallLogic } from './logic';
import PostcardSequence from './postcardSequence';
import DataUniverseWall from './DataUniverseWall';
import HomageCoverArchive from './HomageCoverArchive';
import ArchiveSpotlight from './ArchiveSpotlight';
import EditorialOverlay from './EditorialOverlay';

export default function WallScreen() {
  const { status, cards, lastInputAt, archiveRunId, archiveActive, archiveTextOverride } = useWallLogic();

  const clearWallSelection = () => {
    try {
      window.getSelection()?.removeAllRanges?.();
    } catch (_) {}
  };

  return (
    <div
      className={styles.page}
      tabIndex={-1}
      onMouseDown={clearWallSelection}
      onTouchStart={clearWallSelection}
    >
      <DataUniverseWall cards={cards} lastInputAt={lastInputAt} archiveActive={archiveActive} />
      <HomageCoverArchive cards={cards} archiveActive={archiveActive} />
      <EditorialOverlay status={status} cardCount={cards.length} archiveActive={archiveActive} />
      <ArchiveSpotlight cards={cards} runId={archiveRunId} active={archiveActive} textOverride={archiveTextOverride} />
      {!archiveActive &&
        cards.map((card) =>
          card ? <PostcardSequence key={card.sentAt || card.sentAt === 0 ? String(card.sentAt) : Math.random()} card={card} /> : null
        )}
    </div>
  );
}

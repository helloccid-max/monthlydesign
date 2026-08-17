import LoadScreen from '@/components/load';
import HomageScreen from '@/components/homage';
import { normalizeGenerationRequest } from './contract';

export { DEFAULT_GENERATION_REQUEST, normalizeGenerationRequest } from './contract';

export const GENERATION_PHASES = Object.freeze({
  LOADING: 'loading',
  RESULT: 'result',
});

/**
 * Single ownership boundary for everything after CoverSelect.
 * The parent flow only chooses a phase and supplies the immutable request payload.
 */
export default function GenerationFlow({
  phase,
  request,
  onGenerated,
  onArchive,
  debugMode = false,
  archiveCovers = null,
} = {}) {
  const normalizedRequest = {
    ...normalizeGenerationRequest(request),
    generatedImageUrl: request?.generatedImageUrl || null
  };

  if (phase === GENERATION_PHASES.RESULT) {
    return <HomageScreen request={normalizedRequest} onArchive={onArchive} />;
  }

  return (
    <LoadScreen
      request={normalizedRequest}
      onDone={onGenerated}
      debugMode={debugMode}
      initialCovers={archiveCovers}
    />
  );
}

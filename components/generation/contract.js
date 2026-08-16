export const DEFAULT_GENERATION_REQUEST = Object.freeze({
  coverId: 'design-277-2001-07',
  coverImageUrl: '/covers/design-277-2001-07.jpg',
  issue: '277',
  date: '2001.07',
  prompt: '데이터가 유기체처럼 자라나는 우주',
});

const normalizeText = (value, fallback, maximumLength) => {
  const normalized = String(value || '').trim().slice(0, maximumLength);
  return normalized || fallback;
};

/**
 * Stable handoff contract between CoverSelect and the generation/result flow.
 * Downstream screens should consume this object instead of reading localStorage.
 */
export function normalizeGenerationRequest(request = {}) {
  return {
    coverId: normalizeText(request.coverId, DEFAULT_GENERATION_REQUEST.coverId, 96),
    coverImageUrl: normalizeText(
      request.coverImageUrl,
      DEFAULT_GENERATION_REQUEST.coverImageUrl,
      512
    ),
    issue: normalizeText(request.issue, DEFAULT_GENERATION_REQUEST.issue, 16),
    date: normalizeText(request.date, DEFAULT_GENERATION_REQUEST.date, 16),
    prompt: normalizeText(request.prompt, DEFAULT_GENERATION_REQUEST.prompt, 180),
  };
}

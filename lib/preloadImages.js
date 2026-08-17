const waitForImageDecode = (url, signal) => new Promise((resolve) => {
  if (signal?.aborted) {
    resolve({ url, loaded: false, aborted: true });
    return;
  }

  const image = new window.Image();
  let settled = false;

  const finish = (loaded, aborted = false) => {
    if (settled) return;
    settled = true;
    signal?.removeEventListener('abort', handleAbort);
    image.onload = null;
    image.onerror = null;
    resolve({ url, loaded, aborted });
  };

  const handleAbort = () => finish(false, true);
  image.decoding = 'async';
  image.onload = () => {
    if (typeof image.decode !== 'function') {
      finish(true);
      return;
    }
    image.decode().then(() => finish(true)).catch(() => finish(true));
  };
  image.onerror = () => finish(false);
  signal?.addEventListener('abort', handleAbort, { once: true });
  image.src = url;
});

const yieldToRenderer = (signal) => new Promise((resolve) => {
  if (signal?.aborted) {
    resolve();
    return;
  }
  window.setTimeout(resolve, 16);
});

/**
 * Preload and decode a bounded image batch without flooding a mobile network.
 * Failed files are reported but do not block the remaining queue.
 */
export async function preloadImageBatch(
  imageUrls,
  { concurrency = 6, onProgress, signal } = {}
) {
  const urls = [...new Set((imageUrls || []).filter(Boolean))];
  const result = { total: urls.length, loaded: 0, failed: 0, aborted: false };
  let cursor = 0;

  onProgress?.({ ...result });

  const worker = async () => {
    while (!signal?.aborted) {
      const index = cursor;
      cursor += 1;
      if (index >= urls.length) return;

      const outcome = await waitForImageDecode(urls[index], signal);
      if (outcome.aborted) {
        result.aborted = true;
        return;
      }
      if (outcome.loaded) result.loaded += 1;
      else result.failed += 1;
      onProgress?.({ ...result });
      // Give canvas/CSS animation a paint opportunity between decodes. This is
      // especially important on mobile Safari, where decode() can otherwise
      // monopolize several consecutive frames.
      await yieldToRenderer(signal);
    }
    result.aborted = Boolean(signal?.aborted);
  };

  const workerCount = Math.min(Math.max(1, concurrency), Math.max(1, urls.length));
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  result.aborted ||= Boolean(signal?.aborted);
  return result;
}

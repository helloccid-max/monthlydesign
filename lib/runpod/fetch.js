export async function runpodFetch(url, apiKey, opts) {
  const res = await fetch(url, {
    ...opts,
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
      ...(opts?.headers || {})
    }
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // ignore
  }
  if (!res.ok) {
    throw new Error(`RunPod HTTP ${res.status}: ${data?.error || data?.message || text || res.statusText}`);
  }
  return data;
}

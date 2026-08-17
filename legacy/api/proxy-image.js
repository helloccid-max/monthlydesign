const MAX_BYTES = 10 * 1024 * 1024;

function hostnameAllowed(hostname) {
  if (hostname === 'lh3.googleusercontent.com') return true;
  if (hostname === 'drive.usercontent.google.com') return true;
  if (hostname.endsWith('.googleusercontent.com')) return true;
  if (hostname === 'drive.google.com') return true;
  return false;
}

function isAllowedImageUrl(urlStr) {
  let u;
  try {
    u = new URL(urlStr);
  } catch {
    return false;
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
  if (!hostnameAllowed(u.hostname)) return false;
  if (/^(localhost|127\.0\.0\.1)$/i.test(u.hostname)) return false;
  return true;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  const raw = req.query.url;
  if (typeof raw !== 'string' || !raw.trim()) {
    return res.status(400).end('missing url');
  }

  let target;
  try {
    target = decodeURIComponent(raw);
  } catch {
    return res.status(400).end('bad url');
  }

  if (!isAllowedImageUrl(target)) {
    return res.status(403).end('forbidden');
  }

  try {
    const upstream = await fetch(target, {
      headers: { Accept: 'image/*,*/*' },
      redirect: 'follow',
    });
    if (!upstream.ok) {
      return res.status(502).end('upstream');
    }
    const ct = upstream.headers.get('content-type') || 'image/jpeg';
    if (/text\/html/i.test(ct)) {
      return res.status(502).end('bad type');
    }
    const buf = Buffer.from(await upstream.arrayBuffer());
    if (buf.length > MAX_BYTES) {
      return res.status(413).end('too large');
    }
    res.setHeader('Content-Type', ct.startsWith('image/') ? ct : 'image/jpeg');
    res.setHeader('Cache-Control', 'private, max-age=300');
    res.send(buf);
  } catch {
    res.status(502).end('fetch failed');
  }
}

function hashString(value) {
  const text = String(value || 'monthly-design');
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRandom(seed) {
  let state = seed || 1;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function createHomageCoverUrl({ prompt, issue = '277', date = '2001.07' } = {}) {
  const params = new URLSearchParams({
    v: 'visual-only-1',
    prompt: String(prompt || '').slice(0, 180),
    issue: String(issue || '277').slice(0, 8),
    date: String(date || '2001.07').slice(0, 12),
  });
  return `/api/homage-cover?${params.toString()}`;
}

export function buildHomageCoverSvg({ prompt, issue = '277', date = '2001.07' } = {}) {
  const safePrompt = String(prompt || '').slice(0, 180);
  const seed = hashString(`${safePrompt}|${issue}|${date}`);
  const random = createRandom(seed);
  const cx = 515 + (random() - 0.5) * 110;
  const cy = 800 + (random() - 0.5) * 100;
  const lime = '#a8f22a';
  const darkLime = '#497813';

  const orbitEllipses = Array.from({ length: 7 }, (_, index) => {
    const rx = 150 + index * 74 + random() * 35;
    const ry = 92 + index * 48 + random() * 30;
    const rotate = -24 + random() * 48;
    return `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(
      1
    )}" transform="rotate(${rotate.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(
      1
    )})" fill="none" stroke="${lime}" stroke-opacity="${(0.12 + index * 0.018).toFixed(3)}" stroke-width="1"/>`;
  }).join('');

  const radialLines = Array.from({ length: 128 }, (_, index) => {
    const angle = (index / 128) * Math.PI * 2 + (random() - 0.5) * 0.045;
    const start = 22 + random() * 78;
    const length = 270 + random() * 440;
    const squash = 0.48 + random() * 0.42;
    const sx = cx + Math.cos(angle) * start;
    const sy = cy + Math.sin(angle) * start * squash;
    const ex = cx + Math.cos(angle) * length;
    const ey = cy + Math.sin(angle) * length * squash;
    const bend = (random() - 0.5) * 95;
    const mx = (sx + ex) / 2 - Math.sin(angle) * bend;
    const my = (sy + ey) / 2 + Math.cos(angle) * bend * 0.45;
    return `<path d="M${sx.toFixed(1)} ${sy.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(
      1
    )} ${ey.toFixed(1)}" fill="none" stroke="${index % 9 === 0 ? lime : darkLime}" stroke-opacity="${(
      0.22 + random() * 0.5
    ).toFixed(3)}" stroke-width="${index % 13 === 0 ? '2' : '1'}"/>`;
  }).join('');

  const nodes = Array.from({ length: 62 }, (_, index) => {
    const angle = random() * Math.PI * 2;
    const distance = 90 + Math.pow(random(), 0.72) * 610;
    const x = cx + Math.cos(angle) * distance;
    const y = cy + Math.sin(angle) * distance * (0.48 + random() * 0.28);
    const size = 3 + Math.pow(random(), 2.2) * 28;
    const opacity = 0.32 + random() * 0.58;
    if (index % 5 === 0) {
      const points = Array.from({ length: 3 }, (_, pointIndex) => {
        const a = (pointIndex / 3) * Math.PI * 2 + angle;
        return `${(x + Math.cos(a) * size).toFixed(1)},${(y + Math.sin(a) * size).toFixed(1)}`;
      }).join(' ');
      return `<polygon points="${points}" fill="none" stroke="${lime}" stroke-opacity="${opacity.toFixed(
        3
      )}" stroke-width="1.5"/>`;
    }
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${size.toFixed(1)}" fill="${
      index % 7 === 0 ? lime : darkLime
    }" fill-opacity="${opacity.toFixed(3)}"/>`;
  }).join('');

  const mesh = Array.from({ length: 9 }, (_, index) => {
    const angle = random() * Math.PI * 2;
    const x = 120 + random() * 760;
    const y = 390 + random() * 800;
    const radius = 48 + random() * 120;
    const sides = 3 + Math.floor(random() * 4);
    const points = Array.from({ length: sides }, (_, pointIndex) => {
      const a = angle + (pointIndex / sides) * Math.PI * 2;
      return `${(x + Math.cos(a) * radius).toFixed(1)},${(y + Math.sin(a) * radius * 0.72).toFixed(1)}`;
    }).join(' ');
    return `<polygon points="${points}" fill="none" stroke="${lime}" stroke-opacity="${(
      0.16 + random() * 0.24
    ).toFixed(3)}" stroke-width="1"/>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1360" role="img" aria-label="Generated data-organic cover visualization">
  <defs>
    <radialGradient id="halo"><stop offset="0" stop-color="${lime}" stop-opacity=".68"/><stop offset=".52" stop-color="${darkLime}" stop-opacity=".18"/><stop offset="1" stop-color="#020302" stop-opacity="0"/></radialGradient>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="2" seed="${seed %
      97}"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .06"/></feComponentTransfer></filter>
    <filter id="glow"><feGaussianBlur stdDeviation="12"/></filter>
  </defs>
  <rect width="1000" height="1360" fill="#020302"/>
  <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="265" fill="url(#halo)" filter="url(#glow)"/>
  <g>${orbitEllipses}${mesh}</g>
  <g>${radialLines}</g>
  <g>${nodes}</g>
  <ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(108 + random() * 42).toFixed(1)}" ry="${(
    126 + random() * 58
  ).toFixed(1)}" fill="${lime}" fill-opacity=".73"/>
  <rect width="1000" height="1360" filter="url(#grain)" opacity=".76"/>
</svg>`;
}

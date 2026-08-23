/* ============================================================
   Archive Atlas — 인트로 시각화 렌더러 (iframe 없이 부모 문서의
   <canvas>에 직접 그린다).

   public/experiments/atlas-render.html의 포팅: postMessage 계약을
   직접 호출 API·콜백으로 바꾼 것 외에 로직은 동일하다.
     API: setReveal / setFocus / setLowerCenter / startExploration / destroy
     콜백: onReady / onSonify / onInteraction / onExplorationComplete

   iframe을 없앤 이유: iOS가 3D 변환 조상 아래의 iframe 레이어를
   초기 스케일로 래스터해 캐시하는 습성이 있어 도킹 후에도 흐린
   래스터가 남았다. canvas는 GPU가 백킹 텍스처를 매 프레임 그대로
   샘플링하므로 이 문제가 없다.
   ============================================================ */

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;
const mulberry32 = (s) => () => {
  s |= 0; s = (s + 0x6D2B79F5) | 0;
  let t = Math.imul(s ^ (s >>> 15), 1 | s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/* ---------- 필드(지도) 좌표계 ---------- */
const MAP_W = 6200, MAP_H = 1500;
const MARGIN_X = 260, MARGIN_Y = 210;
const YEAR_MIN = 1976, YEAR_MAX = 2026;
const TRAVEL_VISIBLE_W = 1200;   /* 순항 고도에서 보이는 필드 폭(맵 단위) */
const OVERVIEW_VISIBLE_W = 5600; /* 리빌 시작 시 전체 조망 폭 */
const COVER_MAP_H = 78;          /* 표지 높이(맵 단위) — 순항 시 ~37px */
const DOT_COUNT = 2400;
const THUMB_CACHE_LIMIT = 640;
/* 타임라인 표지는 아주 작은 썸네일로만 그린다 — 500px 원본 대신
   128px 초경량 세트(총 ~2.4MB)를 써서 로드·디코드가 즉각적이다. */
const ATLAS_THUMB_VERSION = 'atlas-1';
const atlasThumbUrl = (id) => `/covers/archive-atlas/${id}.webp?v=${ATLAS_THUMB_VERSION}`;

const DECADES = [1980, 1990, 2000, 2010, 2020];
const yearT = (y) => ((y - YEAR_MIN) * 12) / ((YEAR_MAX - YEAR_MIN) * 12 + 11);

export default function createAtlasRenderer(canvas, {
  onReady,
  onSonify,
  onInteraction,
  onExplorationComplete,
} = {}) {
  const ctx = canvas.getContext('2d');
  let W = 1, H = 1, DPR = 1;
  let destroyed = false;

  /* ---------- 상태 ---------- */
  const VIEW = {
    reveal: { value: 0, from: 0, to: 0, startedAt: 0, duration: 1 },
    focus: { value: 0, from: 0, to: 0, startedAt: 0, duration: 1 },
    lower: { value: 0, from: 0, to: 0, startedAt: 0, duration: 1 },
    /* morph 0 = 유기체 디스크(정보 아키텍처), 1 = 타임라인(생성 시스템). */
    morph: { value: 0, from: 0, to: 0, startedAt: 0, duration: 1 },
  };
  let READY = false;
  let exploring = false, explorationStartedAt = 0, explorationTurns = 1, explorationDone = false;
  let covers = [], dots = [], links = [], spokes = [];
  const pan = { x: 0, y: 0, tx: 0, ty: 0 };
  let lastSonifyAt = 0;
  const REDUCE_MOTION = typeof matchMedia === 'function'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  try { document.fonts?.load('9px "Neue Haas Grotesk"'); } catch (_) { /* 폰트는 있으면 쓴다 */ }

  /* ---------- 데이터 → 지도 배치 ---------- */
  function buildAtlas(payload) {
    const list = (payload.covers || []).filter((c) => c && c.imageUrl && /^(\d{4})_(\d{2})$/.test(c.id));
    let lumMin = 1e9, lumMax = -1e9, satMin = 1e9, satMax = -1e9;
    for (const c of list) {
      const f = c.features || {};
      lumMin = Math.min(lumMin, f.luminance ?? 0.5); lumMax = Math.max(lumMax, f.luminance ?? 0.5);
      satMin = Math.min(satMin, f.saturation ?? 0.5); satMax = Math.max(satMax, f.saturation ?? 0.5);
    }
    const rnd = mulberry32(payload.seed || 20260822);
    covers = list.map((c, i) => {
      const [, ys, ms] = /^(\d{4})_(\d{2})$/.exec(c.id);
      const year = +ys, month = +ms;
      const f = c.features || {};
      const lum = (f.luminance - lumMin) / Math.max(1e-6, lumMax - lumMin);
      const sat = (f.saturation - satMin) / Math.max(1e-6, satMax - satMin);
      const t = ((year - YEAR_MIN) * 12 + (month - 1)) / ((YEAR_MAX - YEAR_MIN) * 12 + 11);
      /* Y: 밝고 채도 높은 표지가 위, 어둡고 무거운 표지가 아래 */
      const clusterSpread = ((c.visualCluster ?? 0) / 11 - 0.5) * 0.34;
      const v = clamp(1 - clamp(lum * 0.62 + sat * 0.38, 0, 1) + clusterSpread, 0, 1);
      return {
        id: c.id, url: atlasThumbUrl(c.id), year, month,
        cluster: c.visualCluster ?? 0,
        complexity: clamp(f.complexity ?? 0.4, 0, 1),
        entropy: clamp(f.entropy ?? 0.4, 0, 1),
        regions: f.regionCount ?? 4,
        x: MARGIN_X + t * (MAP_W - 2 * MARGIN_X) + (rnd() - 0.5) * 54,
        y: MARGIN_Y + v * (MAP_H - 2 * MARGIN_Y) + (rnd() - 0.5) * 220,
        h: COVER_MAP_H * (0.82 + 0.36 * (f.complexity ?? 0.4)),
        aspect: 0.74,
        /* 디스크(유기체) 좌표: 골든앵글 배치 + 중심 밀집 반경 */
        diskA: i * 2.399963 + (rnd() - 0.5) * 0.3,
        diskU: Math.pow(rnd(), 0.62),
        featured: i % 8 === 0, /* 디스크에서는 1/8만 이미지 — morph되며 '생성'된다 */
        wob: rnd() * Math.PI * 2,
      };
    });

    /* 디스크 모드의 방사 스포크(코로나 선) — morph되며 사라진다 */
    spokes = [];
    for (let i = 0; i < 88; i++) {
      spokes.push({
        a: rnd() * Math.PI * 2, r0: 0.05 + rnd() * 0.18, r1: 0.5 + rnd() * 0.78,
        alpha: 0.05 + rnd() * 0.09, w: rnd() < 0.12 ? 1.05 : 0.6,
      });
    }

    /* 성긴 별점: 70%는 표지 주변 가우시안, 30%는 균등 산포. 4%만 라임. */
    dots = [];
    for (let i = 0; i < DOT_COUNT; i++) {
      let x, y;
      if (rnd() < 0.7 && covers.length) {
        const c = covers[(rnd() * covers.length) | 0];
        const a = rnd() * Math.PI * 2, r = Math.abs(rnd() + rnd() - 1) * 180;
        x = c.x + Math.cos(a) * r; y = c.y + Math.sin(a) * r * 0.8;
      } else {
        x = rnd() * MAP_W; y = rnd() * MAP_H;
      }
      const spoke = rnd() < 0.28;
      dots.push({
        x, y, size: 0.6 + rnd() * 1.5, phase: rnd() * Math.PI * 2,
        lime: rnd() < 0.04, light: 40 + rnd() * 38,
        diskA: spoke ? (Math.floor(rnd() * 56) / 56) * Math.PI * 2 : rnd() * Math.PI * 2,
        diskU: spoke ? 0.25 + rnd() * 0.95 : Math.pow(Math.abs(rnd() + rnd() - 1), 0.9) * 1.12,
      });
    }

    /* 연결선: 같은 시각 군집의 시간순 이웃만, 가까울 때만 잇는다. */
    links = [];
    const byCluster = new Map();
    for (const c of covers) {
      if (!byCluster.has(c.cluster)) byCluster.set(c.cluster, []);
      byCluster.get(c.cluster).push(c);
    }
    byCluster.forEach((group) => {
      group.sort((a, b) => a.x - b.x);
      for (let i = 1; i < group.length; i++) {
        const a = group[i - 1], b = group[i];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 430) links.push({ a, b, alpha: 0.05 + 0.07 * (1 - d / 430) });
      }
    });
  }

  /* ---------- 카메라 ---------- */
  function viewValue(track, now) {
    const v = VIEW[track];
    if (now >= v.startedAt + v.duration || v.duration <= 0) { v.value = v.to; return v.value; }
    if (now < v.startedAt) return v.value;
    const p = smooth((now - v.startedAt) / v.duration);
    v.value = v.from + (v.to - v.from) * p;
    return v.value;
  }
  function setView(track, to, delay, duration) {
    const v = VIEW[track], now = performance.now();
    v.from = v.value; v.to = to;
    v.startedAt = now + (delay || 0); v.duration = Math.max(1, duration || 820);
  }

  /* 연대 스텝핑 스케줄: 0.5초에 슝 넘어가고 1.5초 서행을 반복하며
     1980→1990→2000→2010을 지나, 2020에서 3초 머문 뒤 처음으로 되돌아간다. */
  let SCHEDULE = null;
  function buildSchedule() {
    const drift = 1500, hop = 500, hold = 3000, back = 900, driftYears = 2.2;
    const segs = []; let acc = 0;
    for (let i = 0; i < DECADES.length; i++) {
      const year = DECADES[i], last = i === DECADES.length - 1;
      const d = {
        t0: acc, dur: last ? hold : drift, from: yearT(year),
        to: yearT(year + (last ? 1.1 : driftYears)), ease: 'lin',
      };
      segs.push(d); acc += d.dur;
      const next = last ? DECADES[0] : DECADES[i + 1];
      const h = { t0: acc, dur: last ? back : hop, from: d.to, to: yearT(next), ease: 'smooth' };
      segs.push(h); acc += h.dur;
    }
    SCHEDULE = { segs, total: acc };
  }

  function cameraCenter(now) {
    let t;
    if (exploring) {
      if (!SCHEDULE) buildSchedule();
      const scale = REDUCE_MOTION ? 1.7 : 1;
      const elapsed = ((now - explorationStartedAt) / scale) % SCHEDULE.total;
      t = SCHEDULE.segs[0].from;
      for (const s of SCHEDULE.segs) {
        if (elapsed >= s.t0 && elapsed < s.t0 + s.dur) {
          const p = (elapsed - s.t0) / s.dur;
          t = lerp(s.from, s.to, s.ease === 'smooth' ? smooth(p) : p);
          break;
        }
        t = s.to;
      }
      if (!explorationDone && (now - explorationStartedAt) > SCHEDULE.total * explorationTurns) {
        explorationDone = true;
        onExplorationComplete?.(explorationTurns);
      }
    } else {
      t = yearT(1980) + Math.sin(now * 0.00005) * 0.012;
    }
    const x = MARGIN_X + t * (MAP_W - 2 * MARGIN_X);
    const y = MAP_H * 0.5 + Math.sin(now * 0.000041 + 1.7) * MAP_H * 0.11;
    return { x: x + pan.x, y: y + pan.y, t };
  }

  /* ---------- 그리기 ---------- */
  const thumbCache = new Map();
  let thumbMissBudget = 8; /* 프레임당 신규 로드 상한 — 로딩 폭주 방지 */
  const THUMB_STUB = { ready: false, img: null };
  function thumb(url) {
    let e = thumbCache.get(url);
    const now = performance.now();
    if (e) { e.usedAt = now; return e; }
    if (thumbMissBudget <= 0) return THUMB_STUB;
    thumbMissBudget -= 1;
    const img = new Image();
    img.decoding = 'async';
    e = { img, ready: false, usedAt: now };
    img.onload = () => {
      e.ready = true;
      /* 디코딩까지 미리 끝낸다 — 첫 drawImage 순간의 디코드 스톰 방지. */
      img.decode?.().catch(() => {});
    };
    img.src = url;
    thumbCache.set(url, e);
    if (thumbCache.size > THUMB_CACHE_LIMIT) {
      [...thumbCache.entries()].filter(([, x]) => x.ready)
        .sort((a, b) => a[1].usedAt - b[1].usedAt)
        .slice(0, thumbCache.size - THUMB_CACHE_LIMIT)
        .forEach(([k]) => thumbCache.delete(k));
    }
    return e;
  }

  let warmCursor = 0;
  let frame = 0;
  let settledAt = 0;
  function draw(now) {
    if (destroyed) return;
    frame = requestAnimationFrame(draw);
    if (!READY) return;
    thumbMissBudget = 8;

    const reveal = viewValue('reveal', now);
    const focus = viewValue('focus', now);
    const lower = viewValue('lower', now);
    if (reveal <= 0.001) {
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.fillStyle = '#020702'; ctx.fillRect(0, 0, W, H);
      return;
    }

    pan.x += (pan.tx - pan.x) * 0.06; pan.y += (pan.ty - pan.y) * 0.06;
    if (!pointerActive) { pan.tx *= 0.995; pan.ty *= 0.995; }

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.fillStyle = '#020702'; ctx.fillRect(0, 0, W, H);

    /* 뷰포트는 항상 풀블리드 — 라임 패널이 위를 덮어도 시각화는 축소되지
       않고, 타임라인 morph와 중심 하향 이동(lower)만 일어난다. */
    const vp = { x: 0, y: 0, w: W, h: H };

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(vp.x, vp.y, vp.w, vp.h, 0);
    ctx.clip();

    /* 순항 고도 ↔ 전체 조망 사이를 리빌이 보간. 완주 후에도 아주 느린
       줌 크립이 이어진다(포커스에서는 감쇠). */
    let creep = 1;
    if (reveal >= 0.999) {
      if (!settledAt) settledAt = now;
      creep = 1 + Math.min(0.14, (now - settledAt) * 0.000008) * (1 - focus);
    } else settledAt = 0;
    const visibleW = lerp(OVERVIEW_VISIBLE_W, TRAVEL_VISIBLE_W, smooth(reveal)) / creep;
    const zoom = vp.w / visibleW;
    const cam = cameraCenter(now);
    /* 스테이트먼트가 위 52.5%를 덮는 동안 투영 중심을 노출 밴드의
       중앙(아래로 26.25%)에 맞춘다 — 스케일 변화 없는 평행이동. */
    const cx = vp.x + vp.w / 2, cy = vp.y + vp.h / 2 + H * 0.2625 * lower;
    const toX = (x) => cx + (x - cam.x) * zoom, toY = (y) => cy + (y - cam.y) * zoom;
    const alpha = smooth(clamp(reveal * 1.35, 0, 1));

    /* morph 0 = 유기체 디스크, 1 = 타임라인. */
    const morph = smooth(viewValue('morph', now));
    const inv = 1 - morph;
    const breath = 1 + 0.022 * Math.sin(now * 0.0006) * inv; /* 디스크의 호흡 */
    const spin = now * 0.000055 * inv + 0.4;                 /* 디스크의 느린 자전 */
    /* 스케일 0에서 자라나지 않는다 — 62% 크기에서 등장해 알파와 함께 안착. */
    const diskR = Math.min(vp.w, vp.h) * 0.56 * (0.62 + 0.38 * smooth(reveal)) * breath * creep;

    /* 디스크 핵 글로우 — morph되며 사라진다 */
    if (inv > 0.02) {
      const glow = ctx.createRadialGradient(cx, cy, diskR * 0.04, cx, cy, diskR * 0.72);
      glow.addColorStop(0, `rgba(206,212,200,${0.16 * inv * alpha})`);
      glow.addColorStop(0.6, `rgba(160,168,158,${0.05 * inv * alpha})`);
      glow.addColorStop(1, 'rgba(96,102,96,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(vp.x, vp.y, vp.w, vp.h);
    }

    /* 연대 눈금 — 지도가 되어가면서(morph) 함께 떠오른다 */
    const gridA = alpha * morph;
    if (gridA > 0.02) {
      ctx.strokeStyle = `rgba(214,220,210,${0.05 * gridA})`;
      /* 텍스트는 감쇠 없이 순수 화이트 — morph 진입 페이드만 탄다 */
      ctx.fillStyle = `rgba(255,255,255,${gridA})`;
      ctx.lineWidth = 1;
      ctx.font = '600 9px "Neue Haas Grotesk", Inter, sans-serif';
      ctx.textAlign = 'center';
      for (let year = 1980; year <= 2020; year += 10) {
        const t = ((year - YEAR_MIN) * 12) / ((YEAR_MAX - YEAR_MIN) * 12 + 11);
        const gx = toX(MARGIN_X + t * (MAP_W - 2 * MARGIN_X));
        if (gx < vp.x - 40 || gx > vp.x + vp.w + 40) continue;
        ctx.beginPath(); ctx.moveTo(gx, vp.y); ctx.lineTo(gx, vp.y + vp.h); ctx.stroke();
        if (zoom > 0.12) ctx.fillText(String(year), gx, vp.y + 18);
      }
    }

    /* 방사 스포크(디스크 전용 코로나 선) */
    if (inv > 0.02) {
      for (const s of spokes) {
        const a = s.a + spin;
        ctx.strokeStyle = `rgba(196,202,192,${s.alpha * inv * alpha})`;
        ctx.lineWidth = s.w;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * diskR * s.r0, cy + Math.sin(a) * diskR * s.r0 * 0.94);
        ctx.lineTo(cx + Math.cos(a) * diskR * s.r1, cy + Math.sin(a) * diskR * s.r1 * 0.94);
        ctx.stroke();
      }
    }

    /* morph 순간의 이미지 로딩 폭주 방지: 디스크 단계에서 매 프레임 몇 장씩
       미리 데워 전환 시점엔 대부분 디코딩이 끝나 있게 한다. */
    if (reveal > 0.25 && warmCursor < covers.length) {
      for (let k = 0; k < 4 && warmCursor < covers.length; k++) {
        thumb(covers[warmCursor].url);
        warmCursor += 1;
      }
    }

    /* 표지 위치: 디스크 좌표와 타임라인 좌표를 morph로 보간해 저장.
       타임라인에서도 정지하지 않는다 — 표지마다 위상이 다른 아주 느린
       위글(주기 ~11–15초)로 지형이 살아 숨쉰다. */
    let centerCover = null, centerDist = 1e9;
    for (const c of covers) {
      const da = c.diskA + spin;
      const dx = cx + Math.cos(da) * diskR * c.diskU;
      const dy = cy + Math.sin(da) * diskR * c.diskU * 0.94 + Math.sin(now * 0.0009 + c.wob) * 3 * inv;
      c.sx = lerp(dx, toX(c.x), morph) + Math.cos(now * 0.00042 + c.wob * 1.7) * 1.8 * morph;
      c.sy = lerp(dy, toY(c.y), morph) + Math.sin(now * 0.00058 + c.wob) * 2.4 * morph;
    }

    /* 연결선 — 양 끝이 함께 morph되므로 유기적 그물이 지형의 실로 풀린다 */
    ctx.lineWidth = 0.6;
    for (const l of links) {
      const x1 = l.a.sx, y1 = l.a.sy, x2 = l.b.sx, y2 = l.b.sy;
      if (Math.max(x1, x2) < vp.x - 30 || Math.min(x1, x2) > vp.x + vp.w + 30) continue;
      ctx.strokeStyle = `rgba(200,206,196,${l.alpha * alpha})`;
      ctx.beginPath(); ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, (y1 + y2) / 2 - 12 * zoom * morph, x2, y2);
      ctx.stroke();
    }

    /* 별점 */
    for (const d of dots) {
      const da = d.diskA + spin * 1.35;
      const x = lerp(cx + Math.cos(da) * diskR * d.diskU, toX(d.x), morph);
      const y = lerp(cy + Math.sin(da) * diskR * d.diskU * 0.94, toY(d.y), morph);
      if (x < vp.x - 8 || x > vp.x + vp.w + 8 || y < vp.y - 8 || y > vp.y + vp.h + 8) continue;
      const tw = 0.62 + 0.38 * Math.sin(now * 0.0009 + d.phase);
      const size = clamp(d.size * lerp(1.1, zoom * 3.4, morph), 0.5, 2.3);
      ctx.fillStyle = d.lime
        ? `hsla(84,64%,56%,${0.5 * tw * alpha})`
        : `hsla(92,7%,${d.light}%,${0.42 * tw * alpha})`;
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    }

    /* 표지 — 디스크에서는 1/8만 이미지, 나머지는 점.
       morph가 진행되면 점들이 이미지로 '생성'되며 아카이브가 펼쳐진다. */
    for (const c of covers) {
      const x = c.sx, y = c.sy;
      const hT = c.h * zoom;
      const hD = 30 * (0.85 + 0.5 * c.complexity) * smooth(reveal);
      const h = lerp(hD, hT, morph);
      const w = h * c.aspect;
      if (x < vp.x - w || x > vp.x + vp.w + w || y < vp.y - h || y > vp.y + vp.h + h) continue;
      const dc = Math.hypot(x - cx, y - cy);
      if (dc < centerDist) { centerDist = dc; centerCover = c; }
      const imageAlpha = c.featured ? 1 : morph;
      const speckAlpha = c.featured ? 0 : inv;
      if (speckAlpha > 0.02) {
        ctx.fillStyle = `hsla(92,9%,74%,${0.55 * speckAlpha * alpha})`;
        ctx.fillRect(x - 1.3, y - 1.3, 2.6, 2.6);
      }
      if (imageAlpha < 0.02) continue;
      /* 전환 중에는 점→이미지 승격 문턱을 높여(16px→7px) 한 프레임에
         수백 장이 동시에 이미지가 되는 피크를 없앤다. */
      const speckThreshold = lerp(16, 7, morph);
      if (h < speckThreshold) {
        ctx.fillStyle = `hsla(92,9%,72%,${0.5 * imageAlpha * alpha})`;
        ctx.fillRect(x - 1.2, y - 1.2, 2.4, 2.4);
        continue;
      }
      const e = thumb(c.url);
      ctx.save();
      ctx.translate(x, y);
      /* shadowBlur는 비싸다 — 전환 중(morph 진행)이나 작은 카드에는 생략. */
      if (h >= 18 && (morph > 0.98 || morph < 0.02)) {
        ctx.shadowColor = 'rgba(0,0,0,.32)';
        ctx.shadowBlur = 6 + h * 0.05;
        ctx.shadowOffsetY = 2;
      }
      if (e.ready && e.img.naturalWidth) {
        const ar = e.img.naturalWidth / e.img.naturalHeight;
        ctx.globalAlpha = alpha * imageAlpha;
        ctx.drawImage(e.img, -h * ar / 2, -h / 2, h * ar, h);
      } else {
        ctx.fillStyle = `rgba(226,230,222,${0.13 * alpha * imageAlpha})`;
        ctx.fillRect(-w / 2, -h / 2, w, h);
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    /* HUD — 지도 상태에서만: 현재 시야의 연대 범위 */
    if (morph > 0.4) {
      const hudA = alpha * (morph - 0.4) / 0.6;
      const halfYears = (visibleW / (MAP_W - 2 * MARGIN_X)) * (YEAR_MAX - YEAR_MIN) / 2;
      const camT = clamp((cam.x - MARGIN_X) / (MAP_W - 2 * MARGIN_X), 0, 1);
      const camYear = YEAR_MIN + camT * (YEAR_MAX - YEAR_MIN);
      const y0 = Math.max(YEAR_MIN, Math.round(camYear - halfYears));
      const y1 = Math.min(YEAR_MAX, Math.round(camYear + halfYears));
      ctx.textAlign = 'left';
      ctx.fillStyle = `rgba(255,255,255,${hudA})`;
      ctx.font = '700 10px "Neue Haas Grotesk", Inter, sans-serif';
      ctx.fillText('ARCHIVE ATLAS · 578 COVERS', vp.x + 16, vp.y + vp.h - 30);
      ctx.fillText(`IN VIEW ${y0}–${y1}`, vp.x + 16, vp.y + vp.h - 16);

      /* 세로축 설명 — Y는 각 표지를 이미지 분석해 얻은 톤(명도·채도)이라는
         것을 노출 밴드의 위·아래 라벨과 범례 한 줄로 알린다. */
      const visTop = H * 0.525 * lower;
      ctx.font = '600 9px "Neue Haas Grotesk", Inter, sans-serif';
      ctx.fillStyle = `rgba(255,255,255,${hudA})`;
      ctx.fillText('BRIGHT · SATURATED', vp.x + 16, visTop + 22);
      ctx.fillText('DARK · MUTED', vp.x + 16, vp.y + vp.h - 52);
      ctx.fillStyle = `rgba(255,255,255,${0.66 * hudA})`;
      ctx.fillText('Y · LUMINANCE + SATURATION, ANALYZED FROM EACH COVER', vp.x + 16, visTop + 36);
      /* 위–아래를 잇는 가는 축선 */
      ctx.strokeStyle = `rgba(255,255,255,${0.22 * hudA})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(vp.x + 10, visTop + 28);
      ctx.lineTo(vp.x + 10, vp.y + vp.h - 58);
      ctx.stroke();
    }

    ctx.restore();

    /* 사운드: 카메라 중앙에 가장 가까운 표지의 특성을 샘플로 전달 */
    if (reveal > 0.2 && centerCover && now - lastSonifyAt > 140) {
      lastSonifyAt = now;
      onSonify?.({
        progress: cam.t ?? 0.5,
        pointDepth: centerCover.cluster,
        pointDegree: centerCover.regions,
        pointRadius: clamp((cam.x - MARGIN_X) / (MAP_W - 2 * MARGIN_X), 0, 1),
        degreeEnergy: centerCover.complexity * 10,
        depthEnergy: centerCover.entropy * 10,
        seed: centerCover.year,
        pointIndex: covers.indexOf(centerCover),
      });
    }
  }

  /* ---------- 입력(팬) ---------- */
  let pointerActive = false, lastPX = 0, lastPY = 0;
  const onPointerDown = (e) => {
    pointerActive = true; lastPX = e.clientX; lastPY = e.clientY;
    canvas.setPointerCapture?.(e.pointerId);
    onInteraction?.('start');
  };
  const onPointerMove = (e) => {
    if (!pointerActive) return;
    const reveal = VIEW.reveal.value, focus = VIEW.focus.value;
    const visibleW = lerp(OVERVIEW_VISIBLE_W, TRAVEL_VISIBLE_W, smooth(reveal));
    const zoom = W / visibleW;
    pan.tx = clamp(pan.tx - (e.clientX - lastPX) / zoom, -MAP_W * 0.4, MAP_W * 0.4);
    if (focus < 0.5) pan.ty = clamp(pan.ty - (e.clientY - lastPY) / zoom, -MAP_H * 0.45, MAP_H * 0.45);
    lastPX = e.clientX; lastPY = e.clientY;
    onInteraction?.('move');
  };
  const onPointerEnd = () => {
    if (!pointerActive) return;
    pointerActive = false;
    onInteraction?.('end');
  };
  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerEnd);
  canvas.addEventListener('pointercancel', onPointerEnd);

  /* ---------- 부트 ---------- */
  function resize() {
    /* clientWidth/Height는 레이아웃 크기 — 조상 트랜스폼(카드 줌)의 영향을
       받지 않으므로 백킹 해상도가 항상 뷰포트 기준으로 유지된다. */
    W = canvas.clientWidth || 1; H = canvas.clientHeight || 1;
    /* 텍스트 선명도의 핵심: 모바일에서도 DPR을 1로 깎지 않는다(상한 2). */
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
  }
  window.addEventListener('resize', resize);
  resize();
  frame = requestAnimationFrame(draw);

  fetch('/data/monthly-design-cover-topology.json', { headers: { Accept: 'application/json' } })
    .then((r) => r.json())
    .then((payload) => {
      if (destroyed) return;
      buildAtlas(payload);
      READY = true;
      onReady?.('atlas');
    })
    .catch(() => {
      /* 데이터 실패 시에도 인트로를 막지 않는다 — 빈 필드로 ready. */
      if (destroyed) return;
      covers = []; dots = []; links = [];
      READY = true;
      onReady?.('atlas-fallback');
    });

  return {
    setReveal(progress) { setView('reveal', clamp(Number(progress) || 0, 0, 1), 0, 220); },
    setFocus(focused, delay = 0, duration = 1280) {
      setView('focus', focused ? 1 : 0, Number(delay) || 0, Number(duration) || 1280);
      setView('morph', focused ? 1 : 0, Number(delay) || 0, focused ? 1000 : 700);
    },
    setLowerCenter(lowered, delay = 0, duration = 1280) {
      setView('lower', lowered ? 1 : 0, Number(delay) || 0, Number(duration) || 1280);
    },
    startExploration(turns = 1) {
      if (!exploring) { exploring = true; explorationStartedAt = performance.now(); }
      explorationTurns = Math.max(1, Number(turns) || 1);
    },
    resize,
    destroy() {
      destroyed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerEnd);
      canvas.removeEventListener('pointercancel', onPointerEnd);
      thumbCache.clear();
    },
  };
}

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
const MARGIN_X = 260, MARGIN_Y = 120;
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
/* 3차 뷰(아트웍 유형 밴드)의 밴드 순서·라벨. */
const BAND_ORDER = { photo: 0, illustration: 1, typography: 2, cg: 3 };
const BAND_NAMES = ['Photo', 'Illustration', 'Typography', 'CG'];
const seg01 = (v, a, b) => clamp((v - a) / Math.max(1e-4, b - a), 0, 1);

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
    /* band 0 = 타임라인(톤 축), 1 = 아트웍 유형 밴드(3차 뷰) —
       전반부는 X 줌아웃, 후반부는 유형별 재정렬. */
    band: { value: 0, from: 0, to: 0, startedAt: 0, duration: 1 },
  };
  let READY = false;
  let exploring = false, explorationStartedAt = 0, explorationTurns = 1, explorationDone = false;
  let covers = [], dots = [], links = [], spokes = [];
  const pan = { x: 0, y: 0, tx: 0, ty: 0 };
  let lastSonifyAt = 0;

  try { document.fonts?.load('9px "Neue Haas Grotesk"'); } catch (_) { /* 폰트는 있으면 쓴다 */ }

  /* ---------- 데이터 → 지도 배치 ---------- */
  function buildAtlas(payload) {
    const list = (payload.covers || []).filter((c) => c && c.imageUrl && /^(\d{4})_(\d{2})$/.test(c.id));
    /* 톤(명도·채도 혼합)의 순위 균등화 — 값 분포가 중앙에 몰려 있어도
       세로축에 고르게 펴진다. 정렬(밝음=위) 자체는 그대로 유지된다. */
    const tones = list.map((c) => {
      const f = c.features || {};
      return clamp((f.luminance ?? 0.5) * 0.62 + (f.saturation ?? 0.5) * 0.38, 0, 1);
    });
    const rankOf = new Array(list.length);
    tones.map((tone, index) => [tone, index])
      .sort((a, b) => a[0] - b[0])
      .forEach(([, index], rank) => { rankOf[index] = rank; });
    const rnd = mulberry32(payload.seed || 20260822);
    covers = list.map((c, i) => {
      const [, ys, ms] = /^(\d{4})_(\d{2})$/.exec(c.id);
      const year = +ys, month = +ms;
      const f = c.features || {};
      const t = ((year - YEAR_MIN) * 12 + (month - 1)) / ((YEAR_MAX - YEAR_MIN) * 12 + 11);
      /* 위치는 순수 데이터: X = 발행 연월(지터 없음), Y = 톤 순위(밝고
         채도 높은 표지가 위). 랜덤 요소를 걷어내야 축이 그대로 읽힌다. */
      const v = 1 - rankOf[i] / Math.max(1, list.length - 1);
      return {
        id: c.id, url: atlasThumbUrl(c.id), year, month,
        cluster: c.visualCluster ?? 0,
        bandIndex: BAND_ORDER[c.artworkType] ?? 0,
        toneRank: rankOf[i],
        complexity: clamp(f.complexity ?? 0.4, 0, 1),
        entropy: clamp(f.entropy ?? 0.4, 0, 1),
        regions: f.regionCount ?? 4,
        x: MARGIN_X + t * (MAP_W - 2 * MARGIN_X),
        y: MARGIN_Y + v * (MAP_H - 2 * MARGIN_Y),
        h: COVER_MAP_H * (0.82 + 0.36 * (f.complexity ?? 0.4)),
        aspect: 0.74,
        /* 디스크(유기체) 좌표: 골든앵글 배치 + 중심 밀집 반경 */
        diskA: i * 2.399963 + (rnd() - 0.5) * 0.3,
        diskU: Math.pow(rnd(), 0.62),
        featured: i % 8 === 0, /* 디스크에서는 1/8만 이미지 — morph되며 '생성'된다 */
        wob: rnd() * Math.PI * 2,
      };
    });

    /* 그리드 배치 — X는 연월 그대로 두고, Y는 톤 순위를 그리드 행으로
       양자화해 줄을 맞춘다. X가 겹치는 이웃과 행이 충돌하면 목표 행에서
       가장 가까운 빈 행으로 옮긴다(±1, ±2 …). 정렬은 유지되고 겹침은
       구조적으로 사라지며, 배치가 랜덤이 아니라 격자로 읽힌다. */
    const kX = Math.max(1e-6, W / TRAVEL_VISIBLE_W);
    const kY = Math.max(1e-6, (H * 0.88) / MAP_H);
    const yFactor = kX / kY;
    const maxCoverH = covers.reduce((m, c) => Math.max(m, c.h), 1);
    const rowPitch = (maxCoverH + 12) * yFactor;
    const gridTop = 150, gridBottom = MAP_H - 150;
    const rows = Math.max(4, Math.floor((gridBottom - gridTop) / rowPitch));
    const lastRank = Math.max(1, covers.length - 1);
    const byX = [...covers].sort((a, b) => a.x - b.x);
    const maxNeedX = maxCoverH * 0.74 + 6;
    for (let i = 0; i < byX.length; i++) {
      const c = byX[i];
      /* 밝은 표지(높은 순위)가 위 행. */
      const targetRow = Math.round((1 - c.toneRank / lastRank) * (rows - 1));
      const taken = new Set();
      for (let j = i - 1; j >= 0; j--) {
        const p = byX[j];
        if (c.x - p.x >= maxNeedX) break;
        if (c.x - p.x < (c.h + p.h) * 0.5 * 0.74 + 6) taken.add(p.gridRow);
      }
      let chosen = null;
      for (let d = 0; d < rows && chosen === null; d++) {
        const candidates = d === 0 ? [targetRow] : [targetRow + d, targetRow - d];
        for (const candidate of candidates) {
          if (candidate >= 0 && candidate < rows && !taken.has(candidate)) {
            chosen = candidate;
            break;
          }
        }
      }
      c.gridRow = chosen === null ? targetRow : chosen;
      c.y = gridTop + (c.gridRow + 0.5) * ((gridBottom - gridTop) / rows);
    }

    /* 3차 뷰: 유형 밴드 내부 세로 위치 — 밴드 안에서도 밝은 표지가 위. */
    const byBand = new Map();
    for (const c of covers) {
      if (!byBand.has(c.bandIndex)) byBand.set(c.bandIndex, []);
      byBand.get(c.bandIndex).push(c);
    }
    byBand.forEach((group) => {
      group.sort((a, b) => b.toneRank - a.toneRank);
      group.forEach((c, i) => {
        c.bandInnerU = group.length > 1 ? i / (group.length - 1) : 0.5;
      });
    });

    /* 디스크 모드의 방사 스포크(코로나 선) — morph되며 사라진다 */
    spokes = [];
    for (let i = 0; i < 88; i++) {
      spokes.push({
        a: rnd() * Math.PI * 2, r0: 0.05 + rnd() * 0.18, r1: 0.5 + rnd() * 0.78,
        alpha: 0.05 + rnd() * 0.09, w: rnd() < 0.12 ? 1.05 : 0.6,
        lime: rnd() < 0.26,
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
        /* 라임 비중을 높여 저채도로 쳐지지 않게. */
        lime: rnd() < 0.14, light: 40 + rnd() * 38,
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

  /* 연대 스텝핑 스케줄: 타임라인 morph 순간을 기점으로 1980에서 출발해
     0.55초 홉 + 2.2초 서행으로 1990→2000→2010을 지나고, 2020 구간을
     천천히 흐른 뒤 그 자리에 머문다 — 한 번만 재생, 처음으로 되감지 않는다.
     (총 17초 ≥ 타임라인 노출 15.3초라 인트로가 끝날 때까지 안 돈다.) */
  let SCHEDULE = null;
  function buildSchedule() {
    const drift = 2200, hop = 550, finalDrift = 6000, driftYears = 2.6;
    const segs = []; let acc = 0;
    for (let i = 0; i < DECADES.length; i++) {
      const year = DECADES[i], last = i === DECADES.length - 1;
      const d = {
        t0: acc, dur: last ? finalDrift : drift, from: yearT(year),
        to: yearT(year + (last ? 3.4 : driftYears)), ease: 'lin',
      };
      segs.push(d); acc += d.dur;
      if (last) break;
      const h = { t0: acc, dur: hop, from: d.to, to: yearT(DECADES[i + 1]), ease: 'smooth' };
      segs.push(h); acc += h.dur;
    }
    SCHEDULE = { segs, total: acc };
  }

  function cameraCenter(now) {
    let t;
    if (exploring) {
      if (!SCHEDULE) buildSchedule();
      /* 나래이션과 초 단위로 동기화된 여정이라 속도를 바꾸지 않는다.
         클램프 — 스케줄 종점(2020 서행 끝)에 도달하면 그 자리에 머문다. */
      const elapsed = Math.min(now - explorationStartedAt, SCHEDULE.total - 1);
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
    /* 3차 뷰(유형 밴드): 전반부는 X 줌아웃(Y·텍스트는 그대로), 후반부는
       유형별 재정렬. */
    const bandRaw = viewValue('band', now);
    const bandZoom = smooth(seg01(bandRaw, 0, 0.6));
    const bandGroup = smooth(seg01(bandRaw, 0.35, 1));
    let visibleW = lerp(OVERVIEW_VISIBLE_W, TRAVEL_VISIBLE_W, smooth(reveal)) / creep;
    visibleW = lerp(visibleW, MAP_W * 1.04, bandZoom);
    const zoom = vp.w / visibleW;
    const cam = cameraCenter(now);
    const camX = lerp(cam.x, MAP_W / 2, bandZoom);
    const cx = vp.x + vp.w / 2, cy = vp.y + vp.h / 2 + H * 0.2625 * lower;
    /* 세로는 화면을 채우는 전용 줌 — 색상(톤) 정렬 축이 중앙에 뭉치지 않고
       화면 높이의 88%에 펼쳐진다. 가로(연대) 줌과는 독립. */
    const zoomY = (vp.h * 0.88) / MAP_H;
    const toX = (x) => cx + (x - camX) * zoom, toY = (y) => cy + (y - cam.y) * zoomY;
    const alpha = smooth(clamp(reveal * 1.35, 0, 1));

    /* morph 0 = 유기체 디스크, 1 = 타임라인. */
    const morph = smooth(viewValue('morph', now));
    const inv = 1 - morph;
    /* 디스크의 호흡 — 진폭·속도를 낮춰 '움찔'이 아니라 숨으로 읽히게. */
    const breath = 1 + 0.012 * Math.sin(now * 0.00042) * inv;
    const spin = now * 0.000055 * inv + 0.4;                 /* 디스크의 느린 자전 */
    /* 스케일 0에서 자라나지 않는다 — 62% 크기에서 등장해 알파와 함께 안착.
       확대가 끝나면 화면을 가득 채워도 된다 — 최대변 기준 반경. */
    const diskR = Math.max(vp.w, vp.h) * 0.54 * (0.62 + 0.38 * smooth(reveal)) * breath * creep;

    /* 디스크 핵 글로우 — morph되며 사라진다 */
    if (inv > 0.02) {
      const glow = ctx.createRadialGradient(cx, cy, diskR * 0.04, cx, cy, diskR * 0.72);
      /* 핵 글로우에 라임 기운 — 유기체에 생기를 준다. */
      glow.addColorStop(0, `rgba(190,236,90,${0.15 * inv * alpha})`);
      glow.addColorStop(0.6, `rgba(150,180,110,${0.05 * inv * alpha})`);
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
        ctx.strokeStyle = s.lime
          ? `rgba(168,242,42,${s.alpha * 1.5 * inv * alpha})`
          : `rgba(196,202,192,${s.alpha * inv * alpha})`;
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
       타임라인에서는 제 위치에 정확히 고정된다(위글 없음) — 축의 의미가
       그대로 읽히게. */
    let centerCover = null, centerDist = 1e9;
    const bandsTop = vp.y + vp.h * 0.09;
    const bandPitch = (vp.h * 0.82) / BAND_NAMES.length;
    for (const c of covers) {
      const da = c.diskA + spin;
      const dx = cx + Math.cos(da) * diskR * c.diskU;
      const dy = cy + Math.sin(da) * diskR * c.diskU * 0.94 + Math.sin(now * 0.0009 + c.wob) * 3 * inv;
      const bandY = bandsTop + c.bandIndex * bandPitch
        + (0.16 + 0.68 * (c.bandInnerU ?? 0.5)) * bandPitch;
      const targetY = lerp(toY(c.y), bandY, bandGroup);
      c.sx = lerp(dx, toX(c.x), morph);
      c.sy = lerp(dy, targetY, morph);
    }

    /* 연결선 — 양 끝이 함께 morph되므로 유기적 그물이 지형의 실로 풀린다.
       유형 밴드로 재정렬될 때는 양 끝이 다른 밴드로 흩어지며 표지 사이에
       긴 세로줄만 남으므로, 밴드 전환이 시작되기 전에 먼저 사라진다. */
    const linkFade = 1 - smooth(seg01(bandRaw, 0, 0.45));
    if (linkFade > 0.01) {
      ctx.lineWidth = 0.6;
      for (const l of links) {
        const x1 = l.a.sx, y1 = l.a.sy, x2 = l.b.sx, y2 = l.b.sy;
        if (Math.max(x1, x2) < vp.x - 30 || Math.min(x1, x2) > vp.x + vp.w + 30) continue;
        ctx.strokeStyle = `rgba(200,206,196,${l.alpha * alpha * linkFade})`;
        ctx.beginPath(); ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo((x1 + x2) / 2, (y1 + y2) / 2 - 12 * zoom * morph, x2, y2);
        ctx.stroke();
      }
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
      /* 밴드 뷰에선 최소 크기 바닥을 둬 초소형 화면에서도 이미지로 남는다. */
      const h = Math.max(lerp(hD, hT, morph), 13 * bandGroup);
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
      ctx.fillText('Archive Atlas · 578 Covers', vp.x + 16, vp.y + vp.h - 30);
      ctx.fillText(`In View ${y0}–${y1}`, vp.x + 16, vp.y + vp.h - 16);

      /* 세로축 설명(톤) — 밴드 뷰로 넘어가면 페이드 아웃. */
      const toneA = hudA * (1 - bandGroup);
      if (toneA > 0.02) {
        ctx.font = '600 9px "Neue Haas Grotesk", Inter, sans-serif';
        ctx.fillStyle = `rgba(255,255,255,${toneA})`;
        ctx.fillText('Bright · Saturated', vp.x + 16, vp.y + 66);
        ctx.fillText('Dark · Muted', vp.x + 16, vp.y + vp.h - 156);
        ctx.fillStyle = `rgba(255,255,255,${0.66 * toneA})`;
        ctx.fillText('Y · Luminance + Saturation, analyzed from each cover', vp.x + 16, vp.y + 80);
        ctx.strokeStyle = `rgba(255,255,255,${0.22 * toneA})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(vp.x + 10, vp.y + 74);
        ctx.lineTo(vp.x + 10, vp.y + vp.h - 166);
        ctx.stroke();
      }

      /* 3차 뷰: 아트웍 유형 밴드 라벨·구분선. */
      if (bandGroup > 0.02) {
        const bandA = alpha * bandGroup;
        ctx.font = '600 9px "Neue Haas Grotesk", Inter, sans-serif';
        for (let i = 0; i < BAND_NAMES.length; i++) {
          const top = bandsTop + i * bandPitch;
          ctx.fillStyle = `rgba(255,255,255,${bandA})`;
          ctx.fillText(BAND_NAMES[i], vp.x + 16, top + 12);
          if (i > 0) {
            ctx.strokeStyle = `rgba(255,255,255,${0.1 * bandA})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(vp.x, top);
            ctx.lineTo(vp.x + vp.w, top);
            ctx.stroke();
          }
        }
      }
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
      // 타임라인이 펼쳐지는 순간을 연대 여정의 기점으로 삼는다 —
      // 1980에서 출발해 한 번만 순행하고 2020에 머문다.
      if (focused) {
        explorationStartedAt = performance.now() + (Number(delay) || 0);
        explorationDone = false;
      }
    },
    setLowerCenter(lowered, delay = 0, duration = 1280) {
      setView('lower', lowered ? 1 : 0, Number(delay) || 0, Number(duration) || 1280);
    },
    /* 3차 뷰: 타임라인 이동 중 줌아웃 → 아트웍 유형 밴드로 재정렬. */
    setBand(active, delay = 0, duration = 3000) {
      setView('band', active ? 1 : 0, Number(delay) || 0, Number(duration) || 3000);
    },
    startExploration(turns = 1) {
      if (!exploring) { exploring = true; explorationStartedAt = performance.now(); }
      explorationTurns = Math.max(1, Number(turns) || 1);
    },
    /* 로딩 화면에서 타임라인 썸네일을 미리 받아 둔다 — morph 순간의
       디코드 폭주를 없앤다. 프레임 예산과 무관한 일회성 워밍. */
    prewarmThumbs(count = 160) {
      if (!covers.length) return 0;
      const total = Math.min(count, covers.length);
      for (let i = 0; i < total; i++) {
        const url = covers[i].url;
        if (thumbCache.has(url)) continue;
        const img = new Image();
        img.decoding = 'async';
        const entry = { img, ready: false, usedAt: performance.now() };
        img.onload = () => { entry.ready = true; img.decode?.().catch(() => {}); };
        img.src = url;
        thumbCache.set(url, entry);
      }
      warmCursor = Math.max(warmCursor, total);
      return total;
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

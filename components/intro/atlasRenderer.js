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
/* 순항 고도에서 보이는 필드 폭(맵 단위).
   가로 줌이 vp.w / visibleW이고 표지 크기가 그 줌에 실리기 때문에, 이 값을
   상수로 두면 화면이 넓어질수록 표지가 그대로 커진다(1920폭에서 125px,
   세로로 5줄밖에 안 들어감). 폭에 비례해 늘려서 표지의 화면상 크기를
   붙잡아 두고, 넓은 화면은 표지를 키우는 대신 더 긴 연대를 보여준다. */
const COVER_MAP_H = 78;          /* 표지 높이(맵 단위) — 순항 시 ~37px */
const TRAVEL_COVER_TARGET_PX = 40;
function travelVisibleW(width) {
  const raw = (width * COVER_MAP_H) / TRAVEL_COVER_TARGET_PX;
  return clamp(raw, 1200, 3600);
}
const OVERVIEW_VISIBLE_W = 5600; /* 리빌 시작 시 전체 조망 폭 */
/* 표지가 놓이는 맵 세로 구간. 아래를 더 잘라 화면 하단 HUD(Archive Atlas…)와
   겹치지 않게 하고, 전체 덩어리를 위로 올린다. 톤 라벨도 이 값에서 뽑는다. */
const GRID_TOP = 120, GRID_BOTTOM = 1250;
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
/* HUD 서체 — 단일 웨이트(400)만 로드되므로 굵기 대신 크기·트래킹으로
   위계를 만든다. 11/12px는 팔 길이 관람 거리의 가독 하한. */
/* 디스크 단계에서 동시에 이미지로 그리는 표지 비율. 578장을 전부 썸네일로
   올리면 실기기에서 프레임이 무너지고 화면도 번잡해진다. 나머지는 대표색
   점으로 남아 '전부 분석됐다'는 사실은 하단 진행 바가 대신 말한다.
   morph(타임라인 전환)가 진행되면 1로 풀려 지도에서는 전부 이미지가 된다. */
const DISK_THUMB_FRACTION = 0.14;
const HUD_FONT_SM = '400 11px "Neue Haas Grotesk", sans-serif';
const HUD_FONT_LG = '400 12px "Neue Haas Grotesk", sans-serif';
const BAND_NAMES = ['Photo', 'Illustration', 'Typography', 'CG'];
const seg01 = (v, a, b) => clamp((v - a) / Math.max(1e-4, b - a), 0, 1);
const TAU = Math.PI * 2;
/* 표지 대표색(LAB)을 점 색으로 쓴다. 원본 채도 중앙값이 8.8로 낮아
   그대로 쓰면 회색이 되므로 채도를 키우고, 아주 어두운 표지는 검은
   배경에서 보이도록 명도 바닥을 둔다. */
const SPECK_CHROMA_GAIN = 2.4;
const SPECK_MIN_L = 46;
function labToRgb(L, a, b) {
  const fy = (L + 16) / 116;
  const fx = fy + a / 500;
  const fz = fy - b / 200;
  const inv = (t) => (t > 6 / 29 ? t * t * t : 3 * ((6 / 29) ** 2) * (t - 4 / 29));
  const X = 0.95047 * inv(fx), Y = inv(fy), Z = 1.08883 * inv(fz);
  const lin = [
    X * 3.2406 + Y * -1.5372 + Z * -0.4986,
    X * -0.9689 + Y * 1.8758 + Z * 0.0415,
    X * 0.0557 + Y * -0.204 + Z * 1.057,
  ];
  return lin.map((u) => {
    const v = u <= 0.0031308 ? 12.92 * u : 1.055 * (Math.max(u, 0) ** (1 / 2.4)) - 0.055;
    return Math.round(clamp(v, 0, 1) * 255);
  });
}
/* 분석 스캔: 라임 레이더가 원판을 한 바퀴 훑고, 지나간 표지가 점에서
   이미지로 '생성'된다 — 나래이션 "하나의 데이터셋으로 삼아 분석하고"를
   화면으로 옮긴 것. */
const SCAN_READOUT_WINDOW = 0.03;  /* 추출값이 떠 있는 폭 */
const SCAN_READOUT_MAX = 5;        /* 한 프레임에 그리는 추출값 개수 상한 */

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
    /* scan 0→1 = 디스크 구간의 분석 레이더 한 바퀴. */
    scan: { value: 0, from: 0, to: 0, startedAt: 0, duration: 1 },
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
        /* 디스크 좌표는 아래에서 데이터로 채운다 — 각도=시각 군집,
           반경=군집 전형성(중심일수록 전형적). */
        diskA: 0,
        diskU: 0.5,
        jitter: (rnd() - 0.5),
        speckColor: (() => {
          const [L, ca, cb] = f.color || [62, 0, 0];
          const [r, g, b] = labToRgb(
            Math.max(SPECK_MIN_L, L),
            (ca || 0) * SPECK_CHROMA_GAIN,
            (cb || 0) * SPECK_CHROMA_GAIN
          );
          return `${r},${g},${b}`;
        })(),
        featured: i % 8 === 0, /* 스캔 전에도 보이는 씨앗 — 나머지는 레이더가 깨운다 */
        /* 디스크 단계에서 썸네일로 승격될 후보 순위. 황금비 해시라 발행
           순서·클러스터와 상관이 없어 원판 전체에 고르게 흩어진다. */
        thumbKey: (i * 0.618033988749895) % 1,
        wob: rnd() * Math.PI * 2,
      };
    });

    /* 그리드 배치 — X는 연월 그대로 두고, Y는 톤 순위를 그리드 행으로
       양자화해 줄을 맞춘다. X가 겹치는 이웃과 행이 충돌하면 목표 행에서
       가장 가까운 빈 행으로 옮긴다(±1, ±2 …). 정렬은 유지되고 겹침은
       구조적으로 사라지며, 배치가 랜덤이 아니라 격자로 읽힌다. */
    const kX = Math.max(1e-6, W / travelVisibleW(W));
    const kY = Math.max(1e-6, (H * 0.88) / MAP_H);
    const yFactor = kX / kY;
    const maxCoverH = covers.reduce((m, c) => Math.max(m, c.h), 1);
    const rowPitch = (maxCoverH + 12) * yFactor;
    const gridTop = GRID_TOP, gridBottom = GRID_BOTTOM;
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

    /* ── 디스크 배치(1안: 군집 방사) ──
       각도: 시각 군집 12개가 원주를 12등분해 각자의 부채꼴을 가지고,
             부채꼴 안에서는 발행순으로 펼쳐진다.
       반경: 군집 중심(특징 공간 무게중심)으로부터의 거리 순위.
             전형적인 표지가 안쪽, 이질적인 표지가 바깥 테두리에 놓인다 —
             2001년 원본 하이퍼볼릭의 '중심=핵심, 바깥=주변'을 계승한다. */
    const clusterGroups = new Map();
    for (const c of covers) {
      if (!clusterGroups.has(c.cluster)) clusterGroups.set(c.cluster, []);
      clusterGroups.get(c.cluster).push(c);
    }
    const clusterIds = [...clusterGroups.keys()].sort((a, b) => a - b);
    const wedge = TAU / Math.max(1, clusterIds.length);
    clusterIds.forEach((id, wedgeIndex) => {
      const group = clusterGroups.get(id);
      /* 무게중심 — 정규화된 특징 4종. */
      const axes = group.map((c) => [
        c.toneRank / Math.max(1, covers.length - 1),
        c.complexity,
        c.entropy,
        clamp((c.regions ?? 4) / 12, 0, 1),
      ]);
      const centroid = axes[0].map((_, k) => axes.reduce((sum, v) => sum + v[k], 0) / axes.length);
      const scored = group.map((c, i) => ({
        c,
        d: Math.hypot(...axes[i].map((v, k) => v - centroid[k])),
      }));
      /* 반경: 중심 거리 순위 → 면적 균등을 위해 제곱근, 살짝 중심 밀집. */
      [...scored].sort((a, b) => a.d - b.d).forEach((entry, rank) => {
        const u = group.length > 1 ? rank / (group.length - 1) : 0.5;
        entry.c.diskU = Math.pow(u, 0.58) * 0.98 + 0.02;
      });
      /* 각도: 부채꼴 안에서 발행순 — 군집의 시대 흐름이 부채꼴을 훑는다. */
      [...group].sort((a, b) => a.x - b.x).forEach((c, order) => {
        const slot = (order + 0.5) / group.length;
        c.diskA = (wedgeIndex + clamp(slot + c.jitter * 0.06, 0.02, 0.98)) * wedge;
      });
    });

    /* 분석 레이더가 지나는 차례 — 디스크 각도순이라 훑는 방향과 일치한다. */
    for (const c of covers) {
      c.scanU = (((c.diskA % TAU) + TAU) % TAU) / TAU;
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
  /* HUD 글자는 표지 위에 얹히므로 어두운 그림자로 바탕을 만든다.
     스크림(가림막)을 깔면 눈금선·표지까지 같이 죽는데, 그림자는 글자
     주변만 눌러 시각화를 가리지 않는다. fillText 호출만 감싸 그림자가
     다른 드로로 새지 않게 한다. */
  function hudText(text, x, y) {
    ctx.shadowColor = 'rgba(2,3,2,0.92)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 0;
    ctx.fillText(text, x, y);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }

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
    const scan = viewValue('scan', now);
    const bandZoom = smooth(seg01(bandRaw, 0, 0.6));
    const bandGroup = smooth(seg01(bandRaw, 0.35, 1));
    /* morph 0 = 유기체 디스크, 1 = 타임라인. 카메라가 이 값을 쓰므로
       좌표계보다 먼저 구한다. */
    const morph = smooth(viewValue('morph', now));
    const inv = 1 - morph;
    let visibleW = lerp(OVERVIEW_VISIBLE_W, travelVisibleW(vp.w), smooth(reveal)) / creep;
    visibleW = lerp(visibleW, MAP_W * 1.04, bandZoom);
    const zoom = vp.w / visibleW;
    const cam = cameraCenter(now);
    const camX = lerp(cam.x, MAP_W / 2, bandZoom);
    /* 세로 표류(±MAP_H*0.11)는 디스크 단계의 부유감이지, 라벨이 붙은 데이터
       축에는 있으면 안 된다. 흔들리는 만큼 표지가 'Dark · Muted' 아래로
       내려간다. morph가 진행될수록 중앙에 고정한다(드래그 pan은 유지). */
    const camY = lerp(cam.y, MAP_H * 0.5 + pan.y, morph);
    const cx = vp.x + vp.w / 2, cy = vp.y + vp.h / 2 + H * 0.2625 * lower;
    /* 세로는 화면을 채우는 전용 줌 — 색상(톤) 정렬 축이 중앙에 뭉치지 않고
       화면 높이의 88%에 펼쳐진다. 가로(연대) 줌과는 독립. */
    const zoomY = (vp.h * 0.88) / MAP_H;
    const toX = (x) => cx + (x - camX) * zoom, toY = (y) => cy + (y - camY) * zoomY;
    const alpha = smooth(clamp(reveal * 1.35, 0, 1));

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
      ctx.font = HUD_FONT_SM;
      ctx.textAlign = 'center';
      for (let year = 1980; year <= 2020; year += 10) {
        const t = ((year - YEAR_MIN) * 12) / ((YEAR_MAX - YEAR_MIN) * 12 + 11);
        const gx = toX(MARGIN_X + t * (MAP_W - 2 * MARGIN_X));
        if (gx < vp.x - 40 || gx > vp.x + vp.w + 40) continue;
        ctx.beginPath(); ctx.moveTo(gx, vp.y); ctx.lineTo(gx, vp.y + vp.h); ctx.stroke();
        if (zoom > 0.12) hudText(String(year), gx, vp.y + 19);
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

    /* 분석 레이더 — 디스크를 한 바퀴 훑는 라임 선. 지나간 자리의 표지가
       점에서 이미지로 피어난다(아래 승격 로직). */
    const scanActive = inv > 0.02 && scan > 0.001 && scan < 0.999;
    if (scanActive) {
      const scanA = spin + scan * TAU;
      const reach = diskR * 1.06;
      const glow = ctx.createLinearGradient(cx, cy, cx + Math.cos(scanA) * reach, cy + Math.sin(scanA) * reach * 0.94);
      glow.addColorStop(0, `rgba(168,242,42,${0.05 * inv * alpha})`);
      glow.addColorStop(0.55, `rgba(168,242,42,${0.34 * inv * alpha})`);
      glow.addColorStop(1, 'rgba(168,242,42,0)');
      ctx.strokeStyle = glow;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(scanA) * reach, cy + Math.sin(scanA) * reach * 0.94);
      ctx.stroke();
      /* 훑고 지나간 잔상 — 방금 지난 각도 구간을 옅게 채운다. */
      ctx.fillStyle = `rgba(168,242,42,${0.028 * inv * alpha})`;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, reach, scanA - 0.5, scanA);
      ctx.closePath();
      ctx.fill();
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
    const readouts = [];
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

    /* 표지 — 디스크에서는 일부만 이미지, 나머지는 대표색 점.
       morph가 진행되면 점들이 이미지로 '생성'되며 아카이브가 펼쳐진다. */
    const thumbFraction = lerp(DISK_THUMB_FRACTION, 1, smooth(morph));
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
      /* 레이더가 지난 표지는 디스크 단계에서도 이미지가 된다 — 점이
         '분석되어' 데이터셋이 되는 과정. 페이드가 아니라 하드 컷이라
         한 장씩 탁탁 켜지는 느낌이 산다. featured는 스캔 전의 씨앗. */
      const scanned = (c.featured || scan >= c.scanU) ? 1 : 0;
      /* 스캔됐다고 전부 이미지가 되지는 않는다 — 씨앗과 상한 안쪽만 승격하고,
         나머지는 '분석 완료'를 뜻하는 밝은 점으로 남는다. morph가 진행되면
         상한이 1까지 풀려 지도에서는 모두 이미지가 된다. */
      const promoted = (c.featured || c.thumbKey < thumbFraction) ? scanned : 0;
      const imageAlpha = Math.max(promoted, morph);
      /* 추출값은 실제로 이미지가 된 표지에만 붙인다 — 빈 공간에 숫자만
         떠 있으면 무엇을 가리키는지 읽히지 않는다. */
      if (scanActive && promoted && readouts.length < SCAN_READOUT_MAX && !c.featured) {
        const since = scan - c.scanU;
        if (since >= 0 && since < SCAN_READOUT_WINDOW) {
          readouts.push({ c, x, y, h, fade: 1 - since / SCAN_READOUT_WINDOW });
        }
      }
      const speckAlpha = (1 - promoted) * inv;
      if (speckAlpha > 0.02) {
        /* 분석 전은 흐린 점, 분석 후(미승격)는 또렷한 점 — 레이더가 지나간
           자리가 점의 밝기만으로도 읽힌다. */
        const speckA = (scanned ? 0.9 : 0.5) * speckAlpha * alpha;
        const r = scanned ? 1.6 : 1.3;
        ctx.fillStyle = `rgba(${c.speckColor},${speckA})`;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      }
      if (imageAlpha < 0.02) continue;
      /* 전환 중에는 점→이미지 승격 문턱을 높여(16px→7px) 한 프레임에
         수백 장이 동시에 이미지가 되는 피크를 없앤다. */
      const speckThreshold = lerp(16, 7, morph);
      if (h < speckThreshold) {
        /* 이미지로 그리기엔 너무 작은 구간 — 표지의 대표색 점으로 추상화. */
        ctx.fillStyle = `rgba(${c.speckColor},${0.72 * imageAlpha * alpha})`;
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

    /* 방금 분석된 표지의 추출값 — 레이더가 훑고 간 자리에 잠깐 뜬다.
       타임라인 Y축(명도·채도)이 어디서 왔는지 미리 알려주는 역할. */
    if (readouts.length) {
      ctx.font = HUD_FONT_SM;
      ctx.textAlign = 'left';
      for (const r of readouts) {
        const a = r.fade * inv * alpha;
        if (a < 0.03) continue;
        const tx = r.x + r.h * 0.42 + 4;
        const ty = r.y - r.h * 0.18;
        ctx.strokeStyle = `rgba(168,242,42,${0.5 * a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(r.x + r.h * 0.34, r.y);
        ctx.lineTo(tx - 2, r.y);
        ctx.stroke();
        ctx.fillStyle = `rgba(168,242,42,${0.92 * a})`;
        ctx.fillText(
          `L·${Math.round(r.c.toneRank / Math.max(1, covers.length - 1) * 100)}`
            + `  ${r.c.year}`,
          tx, ty
        );
      }
    }

    /* 디스크 축 범례 — 각도·반경이 무엇을 뜻하는지 밝힌다. */
    if (inv > 0.02) {
      const a = inv * alpha * 0.86;
      ctx.textAlign = 'left';
      ctx.font = HUD_FONT_LG;
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      hudText('Angle · 12 Visual Clusters', vp.x + 16, vp.y + 66);
      hudText('Radius · Distance from Cluster Center', vp.x + 16, vp.y + 84);
    }

    /* 분석 진행 바 — 레이더가 도는 동안 0→100%로 찬다. 개수 대신 비율로
       읽히므로 화면에 실제로 그려지는 썸네일 수와 무관하게 '아카이브 전체를
       훑고 있다'는 사실이 전달된다. */
    if (scanActive) {
      const a = inv * alpha;
      const pct = clamp(scan, 0, 1);
      const barW = Math.min(vp.w - 32, 232);
      const barX = vp.x + 16;
      const barY = vp.y + vp.h - 22;
      ctx.textAlign = 'left';
      ctx.font = HUD_FONT_LG;
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      hudText('Analyzing Archive', barX, barY - 10);
      ctx.textAlign = 'right';
      ctx.fillStyle = `rgba(168,242,42,${a})`;
      hudText(`${Math.round(pct * 100)}%`, barX + barW, barY - 10);
      ctx.textAlign = 'left';
      /* 트랙 → 채움. 납작한 사각형이라 HUD의 다른 선들과 같은 언어로 읽힌다. */
      ctx.shadowColor = 'rgba(2,3,2,0.92)';
      ctx.shadowBlur = 5;
      ctx.fillStyle = `rgba(255,255,255,${0.16 * a})`;
      ctx.fillRect(barX, barY, barW, 3);
      ctx.fillStyle = `rgba(168,242,42,${a})`;
      ctx.fillRect(barX, barY, barW * pct, 3);
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
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
      ctx.font = HUD_FONT_LG;
      hudText('Archive Atlas · 578 Covers', vp.x + 16, vp.y + vp.h - 34);
      hudText(`In View ${y0}–${y1}`, vp.x + 16, vp.y + vp.h - 16);

      /* 세로축 설명(톤) — 밴드 뷰로 넘어가면 페이드 아웃.
         라벨 위치를 화면 상수로 두면 표지 밴드와 어긋나 표지가 'Dark ·
         Muted' 아래로 넘어간다. 실제 표지가 놓이는 구간(GRID_TOP~GRID_BOTTOM)
         을 투영하고 표지 반 장만큼 여유를 둬, 라벨이 항상 밴드를 감싼다. */
      const toneA = hudA * (1 - bandGroup);
      if (toneA > 0.02) {
        const halfCover = COVER_MAP_H * 1.18 * 0.5 * zoom;
        const bandTop = toY(GRID_TOP) - halfCover;
        const bandBottom = toY(GRID_BOTTOM) + halfCover;
        ctx.font = HUD_FONT_SM;
        ctx.fillStyle = `rgba(255,255,255,${toneA})`;
        hudText('Bright · Saturated', vp.x + 16, bandTop - 10);
        hudText('Dark · Muted', vp.x + 16, bandBottom + 18);
        ctx.fillStyle = `rgba(255,255,255,${0.66 * toneA})`;
        hudText('Y · Luminance + Saturation, analyzed from each cover', vp.x + 16, bandTop + 8);
        ctx.strokeStyle = `rgba(255,255,255,${0.22 * toneA})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(vp.x + 10, bandTop + 16);
        ctx.lineTo(vp.x + 10, bandBottom + 6);
        ctx.stroke();
      }

      /* 3차 뷰: 아트웍 유형 밴드 라벨·구분선. */
      if (bandGroup > 0.02) {
        const bandA = alpha * bandGroup;
        ctx.font = HUD_FONT_SM;
        for (let i = 0; i < BAND_NAMES.length; i++) {
          const top = bandsTop + i * bandPitch;
          ctx.fillStyle = `rgba(255,255,255,${bandA})`;
          hudText(BAND_NAMES[i], vp.x + 16, top + 13);
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
    const visibleW = lerp(OVERVIEW_VISIBLE_W, travelVisibleW(W), smooth(reveal));
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
    /* 텍스트 선명도의 핵심: 상한 2로 두면 DPR 3 기기에서 캔버스 전체가
       1.5배 확대되어 HUD 글자가 흐려진다. 3까지 허용한다. */
    DPR = Math.min(window.devicePixelRatio || 1, 3);
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
    /* 디스크 구간의 분석 레이더 진행도(0→1). */
    setScan(progress) {
      setView('scan', clamp(Number(progress) || 0, 0, 1), 0, 220);
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

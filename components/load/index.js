import { useEffect, useMemo, useRef, useState } from 'react';
import { useLoadLogic } from './logic';
import { MONTHLY_DESIGN_COVERS } from '@/lib/monthlyDesignCovers';
import styles from './styles.module.css';

/* 로딩 구 표지 크기를 정하는 기준 폭의 상한 — 1920 화면에서 정확히 절반이
   되고, 이보다 좁은 화면에서는 아무것도 바뀌지 않는다. */
const SPHERE_SIZE_REFERENCE_W = 960;

const MOBILE_PARTICLE_COUNT = 96;
const DESKTOP_PARTICLE_COUNT = 156;
const BITMAP_MAX = 220;
// 모바일은 dpr 1로 렌더하고 파티클 최대 그리기 폭이 ~170px라 220px 비트맵은
// 과잉이다. 96장 고유 표지 기준 캔버스 메모리를 약 1/3 줄인다.
const MOBILE_BITMAP_MAX = 176;
const STATUS_TEXT = '당신의 오마주 표지를 생성하고 있어요';
const STATUS_CHARACTERS = Array.from(STATUS_TEXT);
const STATUS_VISIBLE_CHARACTER_COUNT = STATUS_CHARACTERS.filter((value) => value !== ' ').length;
// 사이클(styles.module.css --character-cycle)과 비율을 맞춰야 파장(8글자)이
// 유지된다. 둘을 같이 조절할 것.
const STATUS_WAVE_CHARACTER_OFFSET_MS = 208;
// 진폭 감쇠는 문장 양 끝의 이 비율 구간에서만 일어난다. 나머지 가운데
// 구간은 전폭으로 움직여 웨이브가 문장 전체를 넓게 흐르는 것처럼 보인다.
const STATUS_WAVE_EDGE_TAPER_RATIO = 0.18;

// 평탄 사인 창(tapered cosine). 기존 sin(πt)는 정중앙 글자만 크게 움직여
// 웨이브가 좁은 산처럼 보였다. 양 끝만 사인 곡선으로 부드럽게 감쇠한다.
const statusWaveEnvelope = (progress) => {
  if (progress < STATUS_WAVE_EDGE_TAPER_RATIO) {
    return Math.sin((Math.PI / 2) * (progress / STATUS_WAVE_EDGE_TAPER_RATIO));
  }
  if (progress > 1 - STATUS_WAVE_EDGE_TAPER_RATIO) {
    return Math.sin((Math.PI / 2) * ((1 - progress) / STATUS_WAVE_EDGE_TAPER_RATIO));
  }
  return 1;
};

function createRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function fibonacciSphere(count) {
  const points = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / Math.max(count - 1, 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * index;
    points.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    });
  }
  return points;
}

function buildParticleUrls(covers, seed, count) {
  const pool = [...new Set(covers.map((cover) => cover?.imageUrl).filter(Boolean))];
  const random = createRandom(seed);

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
  }

  if (pool.length >= count) return pool.slice(0, count);
  return Array.from({ length: count }, (_, index) => pool[index % pool.length]).filter(Boolean);
}

function CoverParticleSphere({ imageUrls, seed }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || !imageUrls.length) return undefined;

    const motionScale = 1;
    const points = fibonacciSphere(imageUrls.length);
    const depthRandom = createRandom(seed ^ 0x9e3779b9);
    const depthOffsets = points.map(() => 0.78 + depthRandom() * 0.44);
    const bitmaps = new Array(imageUrls.length);
    let width = 1;
    let height = 1;
    let dpr = 1;
    let frameId = 0;
    let previousTime = performance.now();
    let rhythmStartedAt = previousTime;
    let currentSpeed = 0.46;
    let speedFrom = 0.46;
    let speedTo = 1.04;
    let angleY = ((seed % 360) * Math.PI) / 180;
    let angleX = ((((seed >>> 5) % 36) - 18) * Math.PI) / 180;
    let destroyed = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = window.innerWidth <= 768 ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
    };

    const draw = (time) => {
      if (destroyed) return;
      const delta = Math.min(0.05, Math.max(0.001, (time - previousTime) / 1000));
      previousTime = time;

      const rhythmElapsed = time - rhythmStartedAt;
      if (rhythmElapsed >= 1450) {
        rhythmStartedAt = time;
        speedFrom = currentSpeed;
        speedTo = speedTo > 0.7 ? 0.42 : 1.04;
      }
      const rhythmProgress = Math.min(1, (time - rhythmStartedAt) / 620);
      const easedRhythm = rhythmProgress * rhythmProgress * (3 - 2 * rhythmProgress);
      currentSpeed = speedFrom + (speedTo - speedFrom) * easedRhythm;
      angleY += currentSpeed * delta * motionScale;
      angleX += currentSpeed * 0.38 * delta * motionScale;

      const centerX = width * 0.5;
      const centerY = height * 0.49;
      const radius = Math.max(width * 0.78, height * 0.43);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const projected = new Array(points.length);

      context.clearRect(0, 0, width, height);

      points.forEach((point, index) => {
        const particleRadius = radius * depthOffsets[index];
        const x = point.x * particleRadius;
        const y = point.y * particleRadius;
        const z = point.z * particleRadius;
        const rotatedX = x * cosY - z * sinY;
        const rotatedZ = x * sinY + z * cosY;
        const rotatedY = y * cosX - rotatedZ * sinX;
        const depth = y * sinX + rotatedZ * cosX;
        const perspective = 1 / (1 + depth / (radius * 3));
        projected[index] = {
          x: centerX + rotatedX * perspective,
          y: centerY + rotatedY * perspective,
          z: depth,
          scale: perspective,
        };
      });

      const order = projected.map((_, index) => index).sort((a, b) => projected[b].z - projected[a].z);
      order.forEach((index) => {
        const bitmap = bitmaps[index];
        if (!bitmap) return;
        const point = projected[index];
        /* 표지 크기가 캔버스 폭에 그대로 비례해서, 1920 화면에서는 한 장이
           250~595px까지 커졌다. 기준 폭에 상한을 둬 넓은 화면에서 더 자라지
           않게 한다 — 960 미만(휴대폰·태블릿)에서는 계산이 그대로다. */
        const sizeBase = Math.min(width, SPHERE_SIZE_REFERENCE_W);
        const size = Math.max(54, sizeBase * 0.13) + point.scale * Math.max(58, sizeBase * 0.18);
        const sourceWidth = bitmap.naturalWidth || bitmap.width;
        const sourceHeight = bitmap.naturalHeight || bitmap.height;
        const aspect = sourceWidth / Math.max(1, sourceHeight);
        const drawHeight = aspect >= 1 ? size / aspect : size;
        const drawWidth = aspect >= 1 ? size : size * aspect;
        context.drawImage(
          bitmap,
          point.x - drawWidth / 2,
          point.y - drawHeight / 2,
          drawWidth,
          drawHeight
        );
      });

      frameId = window.requestAnimationFrame(draw);
    };

    // 같은 URL을 쓰는 파티클끼리 비트맵 캔버스를 공유한다. 풀보다 파티클이
    // 많으면(특히 데스크톱 156개) 중복 URL마다 캔버스를 만들던 것이 곧
    // 파티클 수에 비례하는 메모리였다.
    const bitmapMax = window.innerWidth <= 768 ? MOBILE_BITMAP_MAX : BITMAP_MAX;
    const urlIndices = new Map();
    imageUrls.forEach((url, index) => {
      const indices = urlIndices.get(url);
      if (indices) indices.push(index);
      else urlIndices.set(url, [index]);
    });

    const loadBitmap = (source, indices) => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => {
        if (destroyed) return;
        const aspect = image.naturalWidth / Math.max(1, image.naturalHeight);
        const bitmap = document.createElement('canvas');
        if (aspect >= 1) {
          bitmap.width = bitmapMax;
          bitmap.height = Math.max(1, Math.round(bitmapMax / aspect));
        } else {
          bitmap.height = bitmapMax;
          bitmap.width = Math.max(1, Math.round(bitmapMax * aspect));
        }
        const bitmapContext = bitmap.getContext('2d');
        let shared = image;
        if (bitmapContext) {
          bitmapContext.imageSmoothingEnabled = true;
          bitmapContext.imageSmoothingQuality = 'high';
          bitmapContext.drawImage(image, 0, 0, bitmap.width, bitmap.height);
          shared = bitmap;
        }
        indices.forEach((index) => {
          bitmaps[index] = shared;
        });
      };
      image.src = source;
    };

    resize();
    urlIndices.forEach((indices, url) => loadBitmap(url, indices));
    frameId = window.requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      destroyed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [imageUrls, seed]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}

export default function LoadScreen({
  request,
  onDone,
  debugMode = false,
  initialCovers = null,
} = {}) {
  useLoadLogic({ request, onDone, paused: debugMode });
  const [archiveCovers, setArchiveCovers] = useState(() => (
    Array.isArray(initialCovers) && initialCovers.length
      ? initialCovers
      : MONTHLY_DESIGN_COVERS
  ));
  const [runSeed, setRunSeed] = useState(null);

  useEffect(() => {
    const values = new Uint32Array(1);
    if (window.crypto?.getRandomValues) window.crypto.getRandomValues(values);
    setRunSeed(values[0] || (Date.now() >>> 0));
  }, []);

  useEffect(() => {
    if (Array.isArray(initialCovers) && initialCovers.length) {
      setArchiveCovers(initialCovers);
      return undefined;
    }

    const controller = new AbortController();
    fetch('/api/monthly-design-covers', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Cover archive request failed');
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data?.covers) || !data.covers.length) {
          throw new Error('Cover archive is empty');
        }
        setArchiveCovers(data.covers);
      })
      .catch((error) => {
        if (error?.name !== 'AbortError') setArchiveCovers(MONTHLY_DESIGN_COVERS);
      });
    return () => controller.abort();
  }, [initialCovers]);

  const particleCount = typeof window !== 'undefined' && window.innerWidth > 768
    ? DESKTOP_PARTICLE_COUNT
    : MOBILE_PARTICLE_COUNT;
  const imageUrls = useMemo(
    () => (runSeed === null ? [] : buildParticleUrls(archiveCovers, runSeed, particleCount)),
    [archiveCovers, particleCount, runSeed]
  );

  return (
    <main className={styles.page}>
      <CoverParticleSphere imageUrls={imageUrls} seed={runSeed ?? 1} />
      <div className={styles.vignette} aria-hidden="true" />
      <section className={styles.status} aria-live="polite">
        <p aria-label={STATUS_TEXT}>
          <span className={styles.statusCharacters} aria-hidden="true">
            {STATUS_CHARACTERS.map((character, index) => {
              const visibleIndex = STATUS_CHARACTERS
                .slice(0, index)
                .filter((value) => value !== ' ').length;
              const envelope = character === ' '
                ? 0
                : statusWaveEnvelope(visibleIndex / (STATUS_VISIBLE_CHARACTER_COUNT - 1));

              return (
                <span
                  className={styles.statusCharacter}
                  key={`${character}-${index}`}
                  style={{
                    '--character-delay': `${-(STATUS_VISIBLE_CHARACTER_COUNT - 1 - visibleIndex) * STATUS_WAVE_CHARACTER_OFFSET_MS}ms`,
                    '--wave-up-shoulder': `${(-0.12 * envelope).toFixed(4)}em`,
                    '--wave-up-peak': `${(-0.22 * envelope).toFixed(4)}em`,
                    '--wave-down-shoulder': `${(0.07 * envelope).toFixed(4)}em`,
                    '--wave-down-peak': `${(0.11 * envelope).toFixed(4)}em`,
                    '--wave-scale-up-shoulder': (1 + 0.06 * envelope).toFixed(4),
                    '--wave-scale-up-peak': (1 + 0.14 * envelope).toFixed(4),
                    '--wave-scale-down-shoulder': (1 - 0.02 * envelope).toFixed(4),
                    '--wave-scale-down-peak': (1 - 0.04 * envelope).toFixed(4),
                  }}
                >
                  {character}
                </span>
              );
            })}
          </span>
        </p>
      </section>
    </main>
  );
}

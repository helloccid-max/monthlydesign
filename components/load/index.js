import { useEffect, useMemo, useRef, useState } from 'react';
import { useLoadLogic } from './logic';
import { MONTHLY_DESIGN_COVERS } from '@/lib/monthlyDesignCovers';
import styles from './styles.module.css';

const MOBILE_PARTICLE_COUNT = 96;
const DESKTOP_PARTICLE_COUNT = 156;
const BITMAP_MAX = 220;
const STATUS_TEXT = '당신의 오마주 표지를 생성하고 있어요';
const STATUS_CHARACTERS = Array.from(STATUS_TEXT);

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

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

    const loadBitmap = (source, index) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = source;
      image.onload = () => {
        if (destroyed) return;
        const aspect = image.naturalWidth / Math.max(1, image.naturalHeight);
        const bitmap = document.createElement('canvas');
        if (aspect >= 1) {
          bitmap.width = BITMAP_MAX;
          bitmap.height = Math.max(1, Math.round(BITMAP_MAX / aspect));
        } else {
          bitmap.height = BITMAP_MAX;
          bitmap.width = Math.max(1, Math.round(BITMAP_MAX * aspect));
        }
        const bitmapContext = bitmap.getContext('2d');
        if (!bitmapContext) {
          bitmaps[index] = image;
          return;
        }
        bitmapContext.imageSmoothingEnabled = true;
        bitmapContext.imageSmoothingQuality = 'high';
        bitmapContext.drawImage(image, 0, 0, bitmap.width, bitmap.height);
        bitmaps[index] = bitmap;
      };
    };

    imageUrls.forEach(loadBitmap);
    resize();

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
      angleY += currentSpeed * delta;
      angleX += currentSpeed * 0.38 * delta;

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
        const size = Math.max(54, width * 0.13) + point.scale * Math.max(58, width * 0.18);
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

      if (!reduceMotion) frameId = window.requestAnimationFrame(draw);
    };

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

export default function LoadScreen({ request, onDone, debugMode = false } = {}) {
  useLoadLogic({ request, onDone, paused: debugMode });
  const [archiveCovers, setArchiveCovers] = useState([]);
  const [runSeed, setRunSeed] = useState(null);

  useEffect(() => {
    const values = new Uint32Array(1);
    if (window.crypto?.getRandomValues) window.crypto.getRandomValues(values);
    setRunSeed(values[0] || (Date.now() >>> 0));
  }, []);

  useEffect(() => {
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
  }, []);

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
            {STATUS_CHARACTERS.map((character, index) => (
              <span
                className={styles.statusCharacter}
                key={`${character}-${index}`}
                style={{
                  '--character-delay': `${STATUS_CHARACTERS
                    .slice(0, index)
                    .filter((value) => value !== ' ').length * 130}ms`,
                }}
              >
                {character}
              </span>
            ))}
          </span>
        </p>
      </section>
    </main>
  );
}

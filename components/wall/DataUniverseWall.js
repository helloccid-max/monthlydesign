import { useEffect, useRef } from 'react';
import { mountDataUniverseWall } from './dataUniverse/dataUniverseMount';
import styles from './dataUniverseWall.module.css';

const FILLER_COUNT = 108;

/**
 * 카드 이미지를 유기적인 데이터 우주의 노드로 시각화한다.
 * 기존 나무 구조와 분리된 독립적인 Three.js 장면이다.
 */
export default function DataUniverseWall({ cards = [], lastInputAt = 0, archiveActive = false }) {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const fillerUrlsRef = useRef([]);
  const cardsRef = useRef(cards);
  cardsRef.current = cards;

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/random-public-image?count=${FILLER_COUNT}`)
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
        const urls = Array.isArray(data?.urls) ? data.urls : [];
        fillerUrlsRef.current = urls.filter((url) => typeof url === 'string' && url.trim());
        mountRef.current?.rebuild?.();
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const getCards = () =>
      (cardsRef.current || [])
        .filter((card) => card && typeof card === 'object')
        .map((card) => ({
          imageUrl: typeof card.imageUrl === 'string' ? card.imageUrl.trim() : '',
          text: typeof card.text === 'string' ? card.text.trim() : '',
          sentAt: Number(card.sentAt) || 0,
        }))
        .filter((card) => card.imageUrl);

    mountRef.current = mountDataUniverseWall(root, {
      getCards,
      getFillerUrls: () => fillerUrlsRef.current,
    });

    return () => {
      mountRef.current?.dispose?.();
      mountRef.current = null;
    };
  }, []);

  useEffect(() => {
    mountRef.current?.rebuild?.();
  }, [cards, lastInputAt]);

  useEffect(() => {
    mountRef.current?.setDataState?.({
      lastInputAt,
      cardCount: cards.length,
      archiveActive,
    });
  }, [archiveActive, lastInputAt, cards.length]);

  return <div ref={containerRef} className={styles.root} aria-hidden="true" />;
}

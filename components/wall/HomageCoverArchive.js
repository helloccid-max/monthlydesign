import { useMemo } from 'react';
import { createHomageCoverUrl } from '@/lib/homageCover';
import { MONTHLY_DESIGN_COVERS } from '@/lib/monthlyDesignCovers';
import styles from './homageCoverArchive.module.css';

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const cssNumber = (value) => Number(value.toFixed(5));
const ARCHIVE_PROMPTS = [
  '도시의 소음을 살아 있는 지형처럼',
  '기억이 중력에 반응하는 데이터 우주',
  '낮과 밤 사이를 이동하는 타이포그래피',
  '바람의 방향으로 성장하는 정보 구조',
  '느리게 호흡하는 공공 데이터 생태계',
  '빛의 밀도로 번역한 서울의 이동',
  '감정의 온도를 기록하는 유기적 지도',
  '중첩된 목소리가 만드는 다공성 표면',
  '확률과 리듬으로 움직이는 모듈 시스템',
  '보이지 않는 관계의 궤도를 시각화하기',
  '시간을 입자로 분해한 편집 디자인',
  '낯선 행성의 디자인 인덱스',
  '자라나는 그리드와 붕괴하는 규칙',
  '신호가 물질이 되는 순간',
  '작은 선택들이 만든 거대한 형태',
  '인간과 기계가 함께 편집한 풍경',
  '불완전한 데이터의 아름다운 밀도',
  '규칙 사이에서 발생하는 예외의 우주',
  '문장이 폴리곤으로 변하는 과정',
  '데이터가 유기체처럼 자라나는 우주',
  '움직임으로 읽는 동시대 디자인',
  'archive as a living organism',
  'signal, trace, orbit and memory',
  'a field of responsive visual matter',
];

function buildArchiveItems(cards) {
  const fillerItems = ARCHIVE_PROMPTS.map((prompt, index) => {
    const reference = MONTHLY_DESIGN_COVERS[index % MONTHLY_DESIGN_COVERS.length];
    return {
      id: `generated-archive-${index}`,
      prompt,
      imageUrl: createHomageCoverUrl({ prompt, issue: reference.issue, date: reference.date }),
      isLive: false,
    };
  });

  const liveItems = (Array.isArray(cards) ? cards : [])
    .filter((card) => card && typeof card.imageUrl === 'string' && card.imageUrl.trim())
    .slice(-12)
    .map((card, index) => ({
      id: `live-cover-${card.sentAt || index}`,
      prompt: typeof card.text === 'string' ? card.text : '',
      imageUrl: card.imageUrl,
      isLive: true,
    }));

  return [...fillerItems, ...liveItems];
}

export default function HomageCoverArchive({ cards = [], archiveActive = false } = {}) {
  const items = useMemo(() => buildArchiveItems(cards), [cards]);
  const total = items.length;

  return (
    <section className={styles.root} data-archive={archiveActive ? 'true' : 'false'} aria-hidden="true">
      <div className={styles.archiveTitle}>GENERATED HOMAGE COVER ARCHIVE</div>
      <div className={styles.cluster}>
        {items.map((item, index) => {
          const latitude = 1 - ((index + 0.5) / total) * 2;
          const radial = Math.sqrt(Math.max(0, 1 - latitude * latitude));
          const angle = index * GOLDEN_ANGLE;
          const x = Math.cos(angle) * radial;
          const z = Math.sin(angle) * radial;
          const y = latitude;
          const liveBoost = item.isLive ? 0.34 : 0;
          const scale = 0.45 + ((z + 1) / 2) * 0.72 + liveBoost;
          const xVmin = x * 31;
          const yVmin = y * 27;
          const rotation = Math.sin(index * 1.91) * 10;
          const layer = 30 + Math.round((z + 1) * 40) + (item.isLive ? 80 : 0);

          return (
            <figure
              key={item.id}
              className={styles.item}
              data-live={item.isLive ? 'true' : 'false'}
              style={{
                '--x': `${cssNumber(xVmin)}vmin`,
                '--y': `${cssNumber(yVmin)}vmin`,
                '--s': cssNumber(scale),
                '--r': `${cssNumber(rotation)}deg`,
                '--z': layer,
                '--delay': `${-(index % 11) * 1.8}s`,
                '--duration': `${19 + (index % 7) * 2.3}s`,
              }}
            >
              <img src={item.imageUrl} alt="" />
              {item.isLive && <span>LIVE</span>}
            </figure>
          );
        })}
      </div>
      <div className={styles.archiveMeta}>
        <b>{String(cards.length).padStart(2, '0')}</b>
        <span>LIVE OUTPUTS</span>
        <small>prompt · cover · orbit · archive</small>
      </div>
    </section>
  );
}

export const MONTHLY_DESIGN_COVERS = [
  {
    id: 'design-277-2001-07',
    issue: '277',
    date: '2001.07',
    title: 'Information Architecture 2',
    subtitle: 'web + digital',
    imageUrl: '/covers/design-277-2001-07.jpg',
    accent: '#a8f22a',
  },
  {
    id: 'design-547-2024-01',
    issue: '547',
    date: '2024.01',
    title: 'The Next Big Step',
    subtitle: 'designers to watch',
    imageUrl: '/covers/design-547-2024-01.jpg',
    accent: '#1835d4',
  },
  {
    id: 'design-548-2024-02',
    issue: '548',
    date: '2024.02',
    title: 'Pop-up Here!',
    subtitle: 'trend hitchhiker',
    imageUrl: '/covers/design-548-2024-02.jpg',
    accent: '#17c7bd',
  },
  {
    id: 'design-549-2024-03',
    issue: '549',
    date: '2024.03',
    title: 'Design Prescription',
    subtitle: 'office & lifestyle',
    imageUrl: '/covers/design-549-2024-03.jpg',
    accent: '#ff3346',
  },
];

// 아카이브 이미지 교체 시 버전을 올려 브라우저 캐시를 무효화한다.
// 20260819-hires-1: 고해상 재스캔본(500px, 567장) 적용.
const MONTHLY_DESIGN_ARCHIVE_VERSION = '20260819-hires-1';

export const DEFAULT_MONTHLY_DESIGN_COVER = MONTHLY_DESIGN_COVERS[0];

export function createArchiveMonthlyDesignCover(year, month) {
  const safeYear = String(year || '').padStart(4, '0');
  const safeMonth = String(month || '').padStart(2, '0');
  const date = `${safeYear}.${safeMonth}`;
  const known = MONTHLY_DESIGN_COVERS.find((cover) => cover.date === date);

  if (known) {
    return {
      ...known,
      imageUrl: `/covers/archive/${safeYear}_${safeMonth}.webp?v=${MONTHLY_DESIGN_ARCHIVE_VERSION}`,
    };
  }

  return {
    id: `design-archive-${safeYear}-${safeMonth}`,
    issue: date,
    date,
    title: 'Monthly Design Archive',
    subtitle: `${safeYear} / ${safeMonth}`,
    imageUrl: `/covers/archive/${safeYear}_${safeMonth}.webp?v=${MONTHLY_DESIGN_ARCHIVE_VERSION}`,
    accent: '#a8f22a',
  };
}

export function getMonthlyDesignCover(id) {
  const known = MONTHLY_DESIGN_COVERS.find((cover) => cover.id === id);
  if (known) return known;

  const archiveMatch = /^design-archive-(\d{4})-(\d{2})$/.exec(String(id || ''));
  if (archiveMatch) return createArchiveMonthlyDesignCover(archiveMatch[1], archiveMatch[2]);

  return DEFAULT_MONTHLY_DESIGN_COVER;
}

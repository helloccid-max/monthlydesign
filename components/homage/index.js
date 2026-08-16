import { useCallback, useEffect, useMemo, useState } from 'react';
import GlassSurface from '@/components/GlassSurface';
import { createHomageCoverUrl } from '@/lib/homageCover';
import { getMonthlyDesignCover } from '@/lib/monthlyDesignCovers';
import styles from './styles.module.css';

const DEFAULT_PROMPT = '데이터가 유기체처럼 자라나는 우주';

export default function HomageScreen({ onEdit } = {}) {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [coverId, setCoverId] = useState('design-277-2001-07');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      setPrompt(localStorage.getItem('monthlyDesign:prompt') || DEFAULT_PROMPT);
      setCoverId(localStorage.getItem('monthlyDesign:selectedCover') || 'design-277-2001-07');
    } catch (_) {}
  }, []);

  const cover = getMonthlyDesignCover(coverId);
  const generatedUrl = useMemo(
    () => createHomageCoverUrl({ prompt, issue: cover.issue, date: cover.date }),
    [cover.date, cover.issue, prompt]
  );

  const renderPngBlob = useCallback(async () => {
    const response = await fetch(generatedUrl, { cache: 'force-cache' });
    if (!response.ok) throw new Error('Generated cover could not be loaded');
    const sourceBlob = await response.blob();
    const sourceUrl = URL.createObjectURL(sourceBlob);

    try {
      const image = await new Promise((resolve, reject) => {
        const sourceImage = new Image();
        sourceImage.onload = () => resolve(sourceImage);
        sourceImage.onerror = reject;
        sourceImage.src = sourceUrl;
      });
      const canvas = document.createElement('canvas');
      canvas.width = 1000;
      canvas.height = 1360;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas is unavailable');
      context.fillStyle = '#020302';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      return await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 1));
    } finally {
      URL.revokeObjectURL(sourceUrl);
    }
  }, [generatedUrl]);

  const handleSave = useCallback(async () => {
    if (saving) return;
    setSaving(true);
    try {
      const blob = await renderPngBlob();
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `monthly-design-homage-${cover.issue}.png`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (_) {
      const anchor = document.createElement('a');
      anchor.href = generatedUrl;
      anchor.download = `monthly-design-homage-${cover.issue}.svg`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    } finally {
      setSaving(false);
    }
  }, [cover.issue, generatedUrl, renderPngBlob, saving]);

  return (
    <main className={styles.page}>
      <section className={styles.stage}>
        <div className={styles.cover}>
          <img src={generatedUrl} alt={`프롬프트 “${prompt}”로 만든 월간디자인 오마주 표지`} />
        </div>
      </section>

      <footer className={styles.actions}>
        <GlassSurface as="button" type="button" borderRadius={999} className={styles.actionButton} onClick={onEdit}>다시 생성</GlassSurface>
        <GlassSurface as="button" type="button" borderRadius={999} className={styles.actionButton} data-busy={saving ? 'true' : 'false'} onClick={handleSave}>
          {saving ? '저장 중' : '표지 저장'}
        </GlassSurface>
      </footer>
    </main>
  );
}

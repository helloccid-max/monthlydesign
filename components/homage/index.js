import { useCallback, useMemo, useState } from 'react';
import GlassSurface from '@/components/GlassSurface';
import styles from './styles.module.css';

export default function HomageScreen({ request, onArchive, onRestart } = {}) {
  const [saving, setSaving] = useState(false);
  const prompt = request?.prompt || '';
  const issue = request?.issue || '277';
  const date = request?.date || '2001.07';
  // 실제 생성 결과가 없으면(RunPod 미연결·실패) 랜덤 SVG 대신 무지 패널을
  // 보여준다. 가짜 결과처럼 보이는 것을 피하기 위한 의도적 공백이다.
  const hasGeneratedImage = Boolean(
    request?.generatedImageUrl && typeof request.generatedImageUrl === 'string'
  );
  const generatedUrl = useMemo(
    () => (hasGeneratedImage ? request.generatedImageUrl : null),
    [hasGeneratedImage, request?.generatedImageUrl]
  );

  const renderPngBlob = useCallback(async () => {
    // 생성 결과가 없으면 화면과 동일한 무지 패널을 그대로 저장한다.
    if (!generatedUrl) {
      const canvas = document.createElement('canvas');
      canvas.width = 1000;
      canvas.height = 1360;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas is unavailable');
      context.fillStyle = '#101208';
      context.fillRect(0, 0, canvas.width, canvas.height);
      return new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 1));
    }
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
      anchor.download = `monthly-design-homage-${issue}.png`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (_) {
      if (generatedUrl) {
        const anchor = document.createElement('a');
        anchor.href = generatedUrl;
        anchor.download = `monthly-design-homage-${issue}.svg`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
      }
    } finally {
      setSaving(false);
    }
  }, [generatedUrl, issue, renderPngBlob, saving]);

  return (
    <main className={styles.page}>
      <section className={styles.stage}>
        <div className={styles.cover}>
          {hasGeneratedImage ? (
            <img src={generatedUrl} alt={`프롬프트 “${prompt}”로 만든 월간디자인 오마주 표지`} />
          ) : (
            <div className={styles.plainCover} role="img" aria-label="생성 결과를 불러오지 못한 자리" />
          )}
        </div>
      </section>

      <footer className={styles.actions}>
        {/* Wall이 꺼져 있으면 onArchive가 전달되지 않는다. 그때는 대신 restart를
            노출해 전시 루프가 결과 화면에서 막히지 않도록 한다. */}
        {onArchive ? (
          <GlassSurface as="button" type="button" borderRadius={999} className={styles.actionButton} onClick={onArchive}>아카이브 보기</GlassSurface>
        ) : onRestart ? (
          <GlassSurface as="button" type="button" borderRadius={999} className={styles.actionButton} onClick={onRestart}>다시 생성</GlassSurface>
        ) : null}
        <GlassSurface as="button" type="button" borderRadius={999} className={styles.actionButton} data-busy={saving ? 'true' : 'false'} onClick={handleSave}>
          {saving ? '저장 중' : '표지 저장'}
        </GlassSurface>
      </footer>
    </main>
  );
}

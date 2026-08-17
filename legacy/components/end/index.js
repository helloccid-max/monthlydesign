import { useCallback, useMemo, useRef, useState } from 'react';
import { getFirstDriveImageUrl } from '@/lib/driveImages';
import { POSTCARD_QUOTE_MAX_CHARS } from '@/lib/postcardQuoteLimit';
import { useEndLogic } from './logic';
import styles from './styles.module.css';

const fallbackCardFront = getFirstDriveImageUrl();
const fallbackCardBack = getFirstDriveImageUrl();

const cx = (...names) => names.filter(Boolean).map((n) => styles[n]).filter(Boolean).join(' ');

export default function EndScreen({ onNext } = {}) {
  const {
    scale,
    flipped,
    isFadingOut,
    onTouchStart,
    onTouchEnd,
    onWheel,
    dateText,
    quoteText,
    randomImageUrl,
  } = useEndLogic({ onNext });

  const cardImage = randomImageUrl || fallbackCardBack;
  const frontImage = randomImageUrl || fallbackCardFront;

  const imageCrossOrigin = useMemo(() => {
    const src = typeof randomImageUrl === 'string' && randomImageUrl ? randomImageUrl : '';
    if (!src || !src.startsWith('/')) return undefined;
    return 'anonymous';
  }, [randomImageUrl]);

  const [saving, setSaving] = useState(false);

  const postcardBackRef = useRef(null);

  const downloadName = useMemo(() => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `platforml-postcard-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(
      d.getMinutes()
    )}${pad(d.getSeconds())}.png`;
  }, []);

  const shareOrDownloadBlob = useCallback(async (blob) => {
    const file = new File([blob], downloadName, { type: blob.type || 'image/png' });
    if (navigator?.canShare && navigator.canShare({ files: [file] }) && navigator?.share) {
      await navigator.share({ files: [file], title: '엽서' });
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadName;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [downloadName]);

  const handleSave = useCallback(
    async (e) => {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      if (saving) return;
      setSaving(true);

      const href = typeof cardImage === 'string' ? cardImage : '';

      try {
        const el = postcardBackRef.current;
        if (el && typeof window !== 'undefined') {
          const html2canvas = (await import('html2canvas')).default;
          const origin = window.location.origin;
          const imgs = [...el.querySelectorAll('img')];
          const revertList = [];

          for (const img of imgs) {
            let abs;
            try {
              abs = new URL(img.currentSrc || img.src, origin).href;
            } catch {
              continue;
            }
            if (abs.startsWith('data:')) continue;
            let host;
            try {
              host = new URL(abs).origin;
            } catch {
              continue;
            }
            if (host !== origin) {
              const prevSrc = img.getAttribute('src');
              const hadCrossOrigin = img.hasAttribute('crossorigin');
              const prevCrossOrigin = img.getAttribute('crossorigin');
              const proxy = `${origin}/api/proxy-image?url=${encodeURIComponent(abs)}`;
              img.setAttribute('crossorigin', 'anonymous');
              img.src = proxy;
              revertList.push({ img, prevSrc, hadCrossOrigin, prevCrossOrigin });
            }
          }

          const waitImg = async (img) => {
            try {
              if (img.complete && img.naturalWidth > 0) return;
              if (typeof img.decode === 'function') {
                await img.decode();
                return;
              }
            } catch {
              /* decode failed — wait for load */
            }
            await new Promise((resolve) => {
              img.onload = () => resolve();
              img.onerror = () => resolve();
              setTimeout(resolve, 10000);
            });
          };
          await Promise.all(imgs.map(waitImg));
          await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

          let canvas;
          try {
            canvas = await html2canvas(el, {
              scale: 2,
              useCORS: true,
              allowTaint: false,
              logging: false,
              scrollX: 0,
              scrollY: 0,
              backgroundColor: '#fffdf6',
              ignoreElements: (node) =>
                Boolean(node?.classList?.contains?.('end-back-save') || node?.getAttribute?.('data-no-postcard-capture')),
            });
          } finally {
            for (const { img, prevSrc, hadCrossOrigin, prevCrossOrigin } of revertList) {
              if (prevSrc == null) img.removeAttribute('src');
              else img.setAttribute('src', prevSrc);
              if (hadCrossOrigin) img.setAttribute('crossorigin', prevCrossOrigin || 'anonymous');
              else img.removeAttribute('crossorigin');
            }
          }

          const blob =
            canvas && canvas.width > 0
              ? await new Promise((resolve) => {
                  canvas.toBlob(resolve, 'image/png', 0.92);
                })
              : null;
          if (blob && blob.size > 0) {
            await shareOrDownloadBlob(blob);
            return;
          }
        }

        if (!href) return;

        const r = await fetch(href, { cache: 'no-store' });
        const blob = await r.blob();
        const fileType = blob.type || (href.endsWith('.png') ? 'image/png' : 'image/jpeg');
        const ext = fileType.includes('png') ? '.png' : '.jpg';
        const name = downloadName.replace(/\.png$/i, ext);
        const file = new File([blob], name, { type: fileType });

        if (navigator?.canShare && navigator.canShare({ files: [file] }) && navigator?.share) {
          await navigator.share({ files: [file], title: '엽서' });
          return;
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } catch (_) {
        if (href) {
          try {
            window.open(href, '_blank', 'noopener,noreferrer');
          } catch (_) {}
        }
      } finally {
        setTimeout(() => setSaving(false), 450);
      }
    },
    [saving, cardImage, downloadName, shareOrDownloadBlob]
  );

  return (
    <div
      className={cx('end-page', isFadingOut && 'end-fadeout')}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
    >
      <div
        className={styles['end-canvas']}
        style={{
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <div
          className={styles['end-indicator']}
          aria-hidden="true"
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={styles['end-dot']} />
          <span className={styles['end-dot']} />
          <span className={cx('end-dot', 'active')} />
        </div>

        <div className={cx('end-flip', flipped && 'flipped')}>
          <div className={styles['end-flip-inner']}>
            <div className={cx('end-face', 'front')}>
              <div className={cx('end-glass', 'front')} />
              <div className={styles['end-front-img']} aria-hidden="true">
                <img src={frontImage} alt="" crossOrigin={imageCrossOrigin} />
              </div>
              <div className={styles['end-front-title']} aria-hidden="true">
                <div>무라카미</div>
                <div>하루키전</div>
              </div>
              <div className={styles['end-front-author']} aria-hidden="true">
                안자이 이즈마루
              </div>
            </div>

            <div ref={postcardBackRef} className={cx('end-face', 'back')}>
              <div className={cx('end-glass', 'back')} />
              <div className={styles['end-back-title']} aria-hidden="true">
                <div>무라카미</div>
                <div>하루키전</div>
              </div>
              <div className={styles['end-back-author']} aria-hidden="true">
                안자이 이즈마루
              </div>
              <div className={styles['end-back-img']} aria-hidden="true">
                <img src={cardImage} alt="" crossOrigin={imageCrossOrigin} />
              </div>
              <div className={styles['end-back-meta']}>
                <div className={styles['end-back-date']}>{dateText}</div>
              </div>
              <div className={styles['end-back-quote']}>{quoteText.slice(0, POSTCARD_QUOTE_MAX_CHARS)}</div>
              <div className={styles['end-back-save-wrap']} data-no-postcard-capture>
                <button
                  type="button"
                  className={styles['end-back-save']}
                  data-saving={saving ? 'true' : 'false'}
                  onPointerDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={handleSave}
                >
                  저장하기
                </button>
              </div>
            </div>
          </div>
        </div>

        {flipped && (
          <div className={styles['end-send-text']}>
            <div>위로 슬라이드 하여</div>
            <div>엽서를 완성</div>
          </div>
        )}
      </div>
    </div>
  );
}


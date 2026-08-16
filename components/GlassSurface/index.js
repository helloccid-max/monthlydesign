import { forwardRef, useId } from 'react';
import styles from './styles.module.css';

const toCssSize = (value) => (typeof value === 'number' ? `${value}px` : value);

const GlassSurface = forwardRef(function GlassSurface({
  as: Component = 'div',
  width,
  height,
  borderRadius,
  displace = 0.5,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  brightness = 50,
  opacity = 0.64,
  mixBlendMode = 'screen',
  timedGlare = false,
  timedGlareMode = 'idle',
  className = '',
  style,
  children,
  ...props
}, ref) {
  const reactId = useId();
  const filterId = `glass-surface-${reactId.replace(/:/g, '')}`;
  const displacement = Math.max(-18, Math.min(18, distortionScale * displace * 0.08));
  const surfaceStyle = {
    ...(width == null ? {} : { width: toCssSize(width) }),
    ...(height == null ? {} : { height: toCssSize(height) }),
    ...(borderRadius == null ? {} : { borderRadius: toCssSize(borderRadius) }),
    '--glass-red-offset': `${redOffset}px`,
    '--glass-green-offset': `${greenOffset}px`,
    '--glass-blue-offset': `${blueOffset}px`,
    '--glass-brightness': `${brightness}%`,
    '--glass-opacity': opacity,
    '--glass-blend-mode': mixBlendMode,
    ...style,
  };

  return (
    <Component
      ref={ref}
      className={`${styles.surface} ${className}`.trim()}
      style={surfaceStyle}
      {...props}
    >
      <svg className={styles.filterDefinitions} aria-hidden="true" focusable="false">
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.045"
            numOctaves="2"
            seed="8"
            result="surfaceNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="surfaceNoise"
            scale={displacement}
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </svg>
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.effects} aria-hidden="true">
        <span
          className={styles.refraction}
          style={{ filter: `url(#${filterId})` }}
        />
        <span className={`${styles.channel} ${styles.red}`} />
        <span className={`${styles.channel} ${styles.green}`} />
        <span className={`${styles.channel} ${styles.blue}`} />
        {timedGlare ? <span className={styles.timedGlare} data-mode={timedGlareMode} /> : null}
      </span>
      <span className={styles.content}>{children}</span>
    </Component>
  );
});

export default GlassSurface;

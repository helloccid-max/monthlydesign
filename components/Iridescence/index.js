import { useEffect, useRef } from 'react';
import styles from './styles.module.css';

/**
 * react-bits Iridescence와 동일한 셰이더를 ogl 의존성 없이 바닐라 WebGL로
 * 구현한 배경. 생성 완료된 결과 화면의 배경으로 쓴다.
 */

const VERTEX_SHADER = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function Iridescence({
  color = [1, 1, 1],
  speed = 1.0,
  amplitude = 0.1,
  mouseReact = false,
  className = '',
}) {
  const containerRef = useRef(null);
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });
  // 인라인 배열 prop이 렌더마다 새 참조가 되어 WebGL이 재초기화되는 것을 막는다.
  const colorKey = color.join(',');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
      || canvas.getContext('experimental-webgl');
    if (!gl) return undefined;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined;
    gl.useProgram(program);

    // ogl의 Triangle과 동일한 풀스크린 삼각형.
    const positionLocation = gl.getAttribLocation(program, 'position');
    const uvLocation = gl.getAttribLocation(program, 'uv');
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 2, 0, 0, 2]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(uvLocation);
    gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      uTime: gl.getUniformLocation(program, 'uTime'),
      uColor: gl.getUniformLocation(program, 'uColor'),
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uMouse: gl.getUniformLocation(program, 'uMouse'),
      uAmplitude: gl.getUniformLocation(program, 'uAmplitude'),
      uSpeed: gl.getUniformLocation(program, 'uSpeed'),
    };
    const colorValue = colorKey.split(',').map(Number);
    gl.uniform3f(uniforms.uColor, colorValue[0] ?? 1, colorValue[1] ?? 1, colorValue[2] ?? 1);
    gl.uniform2f(uniforms.uMouse, mousePositionRef.current.x, mousePositionRef.current.y);
    gl.uniform1f(uniforms.uAmplitude, amplitude);
    gl.uniform1f(uniforms.uSpeed, speed);

    const resize = () => {
      // 배경 용도라 dpr 1이면 충분하다 — 모바일 GPU 부담을 줄인다.
      const width = Math.max(1, container.offsetWidth);
      const height = Math.max(1, container.offsetHeight);
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform3f(uniforms.uResolution, width, height, width / height);
    };
    window.addEventListener('resize', resize, false);
    resize();

    let frame = 0;
    const update = (time) => {
      frame = window.requestAnimationFrame(update);
      gl.uniform1f(uniforms.uTime, time * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    frame = window.requestAnimationFrame(update);
    container.appendChild(canvas);

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1.0 - (event.clientY - rect.top) / rect.height;
      mousePositionRef.current = { x, y };
      gl.uniform2f(uniforms.uMouse, x, y);
    };
    if (mouseReact) container.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      if (mouseReact) container.removeEventListener('mousemove', handleMouseMove);
      if (canvas.parentNode === container) container.removeChild(canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [colorKey, speed, amplitude, mouseReact]);

  return <div ref={containerRef} className={`${styles.root} ${className}`.trim()} aria-hidden="true" />;
}

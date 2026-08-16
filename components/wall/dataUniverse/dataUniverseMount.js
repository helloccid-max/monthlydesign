import * as THREE from 'three';

const PALETTE = {
  lime: new THREE.Color('#a8f22a'),
  bright: new THREE.Color('#d8ff82'),
  mid: new THREE.Color('#5f9518'),
  dark: new THREE.Color('#102507'),
  cyan: new THREE.Color('#81e4ff'),
  red: new THREE.Color('#ef2b12'),
  bone: new THREE.Color('#f1f1e9'),
};

const FIELD = {
  seed: 277,
  strandCount: 58,
  pointsPerStrand: 66,
  postcardLimit: 108,
};

function mulberry32(seed) {
  let value = seed >>> 0;
  return function random() {
    value += 0x6d2b79f5;
    let result = Math.imul(value ^ (value >>> 15), value | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function createGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 96;
  canvas.height = 96;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(48, 48, 0, 48, 48, 48);
  gradient.addColorStop(0, 'rgba(226, 255, 151, 1)');
  gradient.addColorStop(0.18, 'rgba(168, 242, 42, .9)');
  gradient.addColorStop(0.48, 'rgba(112, 172, 28, .3)');
  gradient.addColorStop(1, 'rgba(2, 3, 2, 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 96, 96);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function hashString(value) {
  let hash = 2166136261;
  for (const character of String(value || '')) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

const BODY_MOTION_KEYS = [
  'orbitSpeed',
  'orbitRadiusX',
  'orbitRadiusY',
  'orbitRadiusZ',
  'spinX',
  'spinY',
  'spinZ',
  'scaleAmpX',
  'scaleAmpY',
  'scaleFrequency',
];

function signedRange(random, minimum, maximum) {
  const magnitude = minimum + random() * (maximum - minimum);
  return (random() < 0.5 ? -1 : 1) * magnitude;
}

function createBodyMotionTarget(random, isCore) {
  const radiusScale = isCore ? 0.55 : 1;
  return {
    orbitSpeed: signedRange(random, 0.055, 0.16),
    orbitRadiusX: (0.22 + random() * 0.46) * radiusScale,
    orbitRadiusY: (0.16 + random() * 0.38) * radiusScale,
    orbitRadiusZ: (0.08 + random() * 0.24) * radiusScale,
    spinX: signedRange(random, 0.075, 0.22),
    spinY: signedRange(random, 0.11, 0.34),
    spinZ: signedRange(random, 0.025, 0.11),
    scaleAmpX: 0.045 + random() * 0.105,
    scaleAmpY: 0.055 + random() * 0.12,
    scaleFrequency: (Math.PI * 2) / (3 + random() * 5),
  };
}

function createBodyRecord(mesh, phase, index, isCore = false) {
  const random = mulberry32(FIELD.seed + 701 + index * 137);
  const initialMotion = createBodyMotionTarget(random, isCore);
  return {
    mesh,
    phase,
    isCore,
    basePosition: mesh.position.clone(),
    baseScale: mesh.scale.clone(),
    orbitAngle: phase,
    random,
    currentMotion: { ...initialMotion },
    fromMotion: { ...initialMotion },
    targetMotion: { ...initialMotion },
    transitionStart: 0,
    transitionDuration: 1,
    nextMotionAt: 0.7 + random() * 3.1,
  };
}

function retargetBodyMotion(body, elapsed) {
  body.fromMotion = { ...body.currentMotion };
  body.targetMotion = createBodyMotionTarget(body.random, body.isCore);
  body.transitionStart = elapsed;
  body.transitionDuration = 0.8 + body.random() * 0.85;
  body.nextMotionAt = elapsed + 3 + body.random() * 5;
}

function updateBodyMotion(body, elapsed, delta) {
  if (elapsed >= body.nextMotionAt) retargetBodyMotion(body, elapsed);
  const progress = THREE.MathUtils.clamp((elapsed - body.transitionStart) / body.transitionDuration, 0, 1);
  const eased = easeInOutCubic(progress);
  BODY_MOTION_KEYS.forEach((key) => {
    body.currentMotion[key] = THREE.MathUtils.lerp(body.fromMotion[key], body.targetMotion[key], eased);
  });

  const motion = body.currentMotion;
  body.orbitAngle += motion.orbitSpeed * delta;
  body.mesh.position.set(
    body.basePosition.x + Math.cos(body.orbitAngle) * motion.orbitRadiusX,
    body.basePosition.y + Math.sin(body.orbitAngle) * motion.orbitRadiusY,
    body.basePosition.z + Math.sin(body.orbitAngle * 0.73 + body.phase) * motion.orbitRadiusZ,
  );
  body.mesh.rotation.x += motion.spinX * delta;
  body.mesh.rotation.y += motion.spinY * delta;
  body.mesh.rotation.z += motion.spinZ * delta;

  const scalePhase = elapsed * motion.scaleFrequency + body.phase;
  body.mesh.scale.set(
    body.baseScale.x * (1 + Math.sin(scalePhase) * motion.scaleAmpX),
    body.baseScale.y * (1 + Math.cos(scalePhase * 0.87 + body.phase) * motion.scaleAmpY),
    body.baseScale.z * (1 + Math.sin(scalePhase * 0.61) * 0.025),
  );
}

function mergeSources(cards, fillerUrls, limit) {
  const primary = (cards || [])
    .map((card, index) => ({
      url: String(card?.imageUrl || '').trim(),
      kind: 'visitor',
      textLength: String(card?.text || '').trim().length,
      sentAt: Number(card?.sentAt) || 0,
      seed: hashString(`${card?.imageUrl || ''}:${card?.sentAt || index}`),
    }))
    .filter((source) => source.url);
  const filler = (fillerUrls || [])
    .map((url, index) => ({
      url: String(url || '').trim(),
      kind: 'archive',
      textLength: 0,
      sentAt: 0,
      seed: hashString(`${url}:${index}`),
    }))
    .filter((source) => source.url);
  const seen = new Set();
  const sources = [];

  for (const source of [...primary, ...filler]) {
    if (!source.url || seen.has(source.url)) continue;
    seen.add(source.url);
    sources.push(source);
    if (sources.length >= limit) break;
  }
  return sources;
}

function buildOrganicField(group, glowTexture) {
  const random = mulberry32(FIELD.seed);
  const particlePositions = [];
  const particleColors = [];
  const linePositions = [];
  const strandPoints = [];
  const anchorPool = [];

  for (let strandIndex = 0; strandIndex < FIELD.strandCount; strandIndex += 1) {
    const phase = (strandIndex / FIELD.strandCount) * Math.PI * 2;
    const strand = [];
    const phaseJitter = (random() - 0.5) * 0.24;
    const radiusJitter = 0.78 + random() * 0.44;

    for (let pointIndex = 0; pointIndex < FIELD.pointsPerStrand; pointIndex += 1) {
      const t = pointIndex / (FIELD.pointsPerStrand - 1);
      const vertical = t * 2 - 1;
      const envelope = Math.pow(Math.sin(t * Math.PI), 0.7);
      const lobe = 0.8 + Math.sin(phase * 3 + vertical * 4.7) * 0.17;
      const radius = (2.15 + envelope * 5.3 + Math.sin(vertical * 7 + phase * 2) * 0.55) * radiusJitter;
      const twist = phase + phaseJitter + vertical * 2.8 + Math.sin(vertical * 3.2 + phase) * 0.5;
      const ripple = Math.sin(vertical * 8.5 + phase * 4) * 0.42;
      const pinch = 0.72 + envelope * 0.32;

      const point = new THREE.Vector3(
        Math.cos(twist) * radius * lobe * pinch + Math.sin(vertical * 4.1 + phase * 2) * 0.9,
        vertical * 10.8 + Math.sin(twist * 2.1) * (0.55 + envelope * 0.9),
        Math.sin(twist) * radius * 0.68 + ripple + Math.cos(vertical * 5.4 + phase) * 0.7,
      );

      strand.push(point);
      particlePositions.push(point.x, point.y, point.z);

      const energy = THREE.MathUtils.clamp(envelope * 0.72 + random() * 0.34, 0, 1);
      const color = PALETTE.dark.clone().lerp(PALETTE.lime, energy);
      if (random() > 0.965) color.lerp(PALETTE.bright, 0.74);
      particleColors.push(color.r, color.g, color.b);

      if (pointIndex > 0) {
        const previous = strand[pointIndex - 1];
        linePositions.push(previous.x, previous.y, previous.z, point.x, point.y, point.z);
      }

      if (pointIndex % 5 === 0 && strandIndex % 2 === 0 && envelope > 0.12) {
        anchorPool.push(point.clone());
      }
    }
    strandPoints.push(strand);
  }

  for (let strandIndex = 0; strandIndex < FIELD.strandCount; strandIndex += 1) {
    const strand = strandPoints[strandIndex];
    const neighbor = strandPoints[(strandIndex + 1) % FIELD.strandCount];
    for (let pointIndex = 3; pointIndex < FIELD.pointsPerStrand - 2; pointIndex += 5) {
      const a = strand[pointIndex];
      const b = neighbor[pointIndex + ((strandIndex % 3) - 1)];
      if (!a || !b) continue;
      linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
  particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
  const particleMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: 0.84 },
      uGlow: { value: glowTexture },
      uSignal: { value: 0 },
    },
    vertexShader: `
      uniform float uTime;
      uniform float uSignal;
      varying vec3 vColor;

      void main() {
        float time = uTime * 0.052;
        vec3 transformed = position;
        transformed.x += sin(position.y * 0.31 + position.z * 0.17 + time) * 0.17;
        transformed.z += cos(position.x * 0.24 - position.y * 0.13 + time * 0.82) * 0.15;
        transformed.y += sin(position.x * 0.18 + position.z * 0.21 - time * 0.68) * 0.065;
        float signalWave = sin(length(position.xy) * 1.18 - uTime * 1.35) * uSignal;
        transformed += normalize(position + vec3(0.001)) * signalWave * 0.12;

        vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);
        float breathing = 0.88 + sin(position.y * 0.19 + time * 1.4) * 0.12;
        gl_PointSize = 5.2 * breathing * (34.0 / max(-viewPosition.z, 1.0));
        gl_Position = projectionMatrix * viewPosition;
        vColor = color;
      }
    `,
    fragmentShader: `
      uniform sampler2D uGlow;
      uniform float uOpacity;
      varying vec3 vColor;

      void main() {
        vec4 glow = texture2D(uGlow, gl_PointCoord);
        gl_FragColor = vec4(vColor * glow.rgb, glow.a * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  group.add(particles);

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    color: PALETTE.mid,
    transparent: true,
    opacity: 0.26,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const network = new THREE.LineSegments(lineGeometry, lineMaterial);
  group.add(network);

  return { anchorPool, particles, network, strandPoints };
}

function createMembrane(radius, detail, color, opacity, shaderMaterials) {
  const shell = new THREE.Group();
  const fillMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: color.clone() },
      uEnergy: { value: 0.2 },
      uArchive: { value: 0 },
      uPhase: { value: shaderMaterials.length * 0.83 },
    },
    vertexShader: `
      uniform float uTime;
      uniform float uPhase;
      uniform float uEnergy;
      varying vec3 vNormalView;
      varying vec3 vViewDirection;
      varying float vWave;

      void main() {
        float time = uTime * 0.034;
        float chladni = sin(position.x * 2.1 + uPhase) * sin(position.y * 2.8 - time)
          - sin(position.x * 2.8 - time) * sin(position.y * 2.1 + uPhase);
        float strata = sin(length(position.xy) * 3.2 - time * 1.7 + uPhase) * 0.5;
        float signalWave = sin(length(position) * 4.4 - uTime * 1.55 + uPhase) * uEnergy;
        float displacement = chladni * 0.032 + strata * 0.012 + signalWave * 0.048;
        vec3 deformed = position + normal * displacement;
        vec4 viewPosition = modelViewMatrix * vec4(deformed, 1.0);
        vNormalView = normalize(normalMatrix * normal);
        vViewDirection = normalize(-viewPosition.xyz);
        vWave = chladni * 0.5 + strata * 0.25;
        gl_Position = projectionMatrix * viewPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uEnergy;
      uniform float uArchive;
      varying vec3 vNormalView;
      varying vec3 vViewDirection;
      varying float vWave;

      void main() {
        float fresnel = pow(1.0 - max(dot(vNormalView, vViewDirection), 0.0), 2.5);
        vec3 ice = vec3(0.50, 0.89, 1.0);
        vec3 modeColor = mix(uColor, ice, uArchive * 0.62);
        vec3 finalColor = mix(modeColor, vec3(0.91, 1.0, 0.72), fresnel * 0.28);
        float alpha = (0.018 + fresnel * 0.31 + abs(vWave) * 0.022)
          * (0.72 + uEnergy * 0.58);
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  shaderMaterials.push(fillMaterial);

  const fill = new THREE.Mesh(new THREE.IcosahedronGeometry(radius, detail), fillMaterial);
  const wire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(radius * 1.004, detail),
    new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  const surfacePoints = new THREE.Points(
    new THREE.IcosahedronGeometry(radius * 1.008, detail),
    new THREE.PointsMaterial({
      color,
      size: 0.055,
      transparent: true,
      opacity: 0.26,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    }),
  );
  shell.add(fill, wire, surfacePoints);
  shell.userData.wire = wire;
  shell.userData.surfacePoints = surfacePoints;
  return shell;
}

function buildCellularBodies(group, glowTexture, shaderMaterials) {
  const bodies = [];
  const core = createMembrane(3.1, 3, PALETTE.lime, 0.23, shaderMaterials);
  core.position.set(1.2, 0.6, -0.7);
  core.scale.set(1.16, 0.92, 1.04);
  group.add(core);
  bodies.push(createBodyRecord(core, 0.2, 0, true));

  const coreGlowGeometry = new THREE.BufferGeometry();
  const coreGlowPositions = [];
  const random = mulberry32(FIELD.seed + 91);
  for (let i = 0; i < 420; i += 1) {
    const phi = Math.acos(2 * random() - 1);
    const theta = Math.PI * 2 * random();
    const radius = 0.35 + Math.pow(random(), 0.65) * 2.45;
    coreGlowPositions.push(
      Math.sin(phi) * Math.cos(theta) * radius,
      Math.cos(phi) * radius * 0.82,
      Math.sin(phi) * Math.sin(theta) * radius,
    );
  }
  coreGlowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(coreGlowPositions, 3));
  const coreGlow = new THREE.Points(
    coreGlowGeometry,
    new THREE.PointsMaterial({
      color: PALETTE.bright,
      map: glowTexture,
      size: 0.31,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  coreGlow.position.copy(core.position);
  group.add(coreGlow);

  const satelliteSpecs = [
    { position: [-6.8, 4.2, -1.4], radius: 1.75, scale: [1.2, 1.65, 0.95], phase: 0.8 },
    { position: [6.5, -3.8, 0.7], radius: 2.05, scale: [1.5, 0.92, 1.1], phase: 2.1 },
    { position: [-4.5, -7.1, -2.2], radius: 1.35, scale: [0.9, 1.35, 1.05], phase: 4.4 },
    { position: [5.6, 6.8, -3.1], radius: 1.15, scale: [1.2, 0.88, 1.35], phase: 5.6 },
  ];

  for (const spec of satelliteSpecs) {
    const bodyColor = spec.phase > 4 ? PALETTE.cyan : PALETTE.lime;
    const body = createMembrane(spec.radius, 2, bodyColor, 0.17, shaderMaterials);
    body.position.set(...spec.position);
    body.scale.set(...spec.scale);
    group.add(body);
    bodies.push(createBodyRecord(body, spec.phase, bodies.length));
  }

  const linkMaterial = new THREE.LineBasicMaterial({
    color: PALETTE.lime,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  for (const spec of satelliteSpecs) {
    const end = new THREE.Vector3(...spec.position);
    const midpoint = core.position.clone().lerp(end, 0.5);
    midpoint.z += 2.6;
    midpoint.x += Math.sin(spec.phase) * 1.4;
    const curve = new THREE.CatmullRomCurve3([core.position.clone(), midpoint, end]);
    const link = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(42)), linkMaterial.clone());
    group.add(link);
  }

  const rings = [];
  for (let index = 0; index < 3; index += 1) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(4.2 + index * 1.05, 0.018, 6, 160),
      new THREE.MeshBasicMaterial({
        color: index === 1 ? PALETTE.red : PALETTE.lime,
        transparent: true,
        opacity: index === 1 ? 0.34 : 0.2,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    ring.position.copy(core.position);
    ring.rotation.set(0.72 + index * 0.34, 0.2 + index * 0.55, index * 0.42);
    group.add(ring);
    rings.push(ring);
  }

  const shockwave = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.025, 6, 160),
    new THREE.MeshBasicMaterial({
      color: PALETTE.cyan,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  shockwave.position.copy(core.position);
  shockwave.rotation.set(0.82, 0.35, -0.18);
  shockwave.scale.setScalar(0.1);
  group.add(shockwave);

  return { bodies, rings, coreGlow, shockwave };
}

function buildDataCurrents(group, organic, cellular, glowTexture) {
  const routeGroup = new THREE.Group();
  const routes = [];
  const routeColors = [PALETTE.lime, PALETTE.lime, PALETTE.cyan, PALETTE.lime, PALETTE.red, PALETTE.lime, PALETTE.cyan];
  const bodyPositions = cellular.bodies.map((body) => body.mesh.position.clone());
  const radialPositions = [];
  const radialOrigin = bodyPositions[0];

  for (let anchorIndex = 0; anchorIndex < organic.anchorPool.length; anchorIndex += 4) {
    const endpoint = organic.anchorPool[anchorIndex].clone().multiplyScalar(1.08);
    radialPositions.push(
      radialOrigin.x,
      radialOrigin.y,
      radialOrigin.z,
      endpoint.x,
      endpoint.y,
      endpoint.z,
    );
  }

  const radialGeometry = new THREE.BufferGeometry();
  radialGeometry.setAttribute('position', new THREE.Float32BufferAttribute(radialPositions, 3));
  const radialScaffold = new THREE.LineSegments(
    radialGeometry,
    new THREE.LineBasicMaterial({
      color: PALETTE.lime,
      transparent: true,
      opacity: 0.052,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  routeGroup.add(radialScaffold);

  for (let routeIndex = 0; routeIndex < routeColors.length; routeIndex += 1) {
    const start = organic.anchorPool[(routeIndex * 53 + 17) % organic.anchorPool.length].clone();
    const end = routeIndex < bodyPositions.length
      ? bodyPositions[(routeIndex + 2) % bodyPositions.length].clone()
      : organic.anchorPool[(routeIndex * 71 + 103) % organic.anchorPool.length].clone();
    const controlA = start.clone().lerp(end, 0.34);
    const controlB = start.clone().lerp(end, 0.68);
    controlA.x += Math.sin(routeIndex * 1.7) * (1.4 + routeIndex * 0.12);
    controlA.z += 2.1 + Math.cos(routeIndex * 0.8) * 1.2;
    controlB.y += Math.cos(routeIndex * 1.3) * 1.8;
    controlB.z -= 1.1 + Math.sin(routeIndex) * 0.9;

    const curve = new THREE.CatmullRomCurve3([start, controlA, controlB, end]);
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(128)),
      new THREE.LineDashedMaterial({
        color: routeColors[routeIndex],
        dashSize: routeIndex === 4 ? 0.32 : 0.18,
        gapSize: routeIndex === 4 ? 0.46 : 0.28,
        transparent: true,
        opacity: routeIndex === 4 ? 0.24 : 0.14,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    line.computeLineDistances();
    routeGroup.add(line);
    routes.push({
      curve,
      line,
      speed: 0.0048 + routeIndex * 0.00052,
      color: routeColors[routeIndex],
    });
  }

  const travellerPositions = [];
  const travellerColors = [];
  const travellers = [];
  routes.forEach((route, routeIndex) => {
    const travellerCount = routeIndex === 4 ? 2 : 3;
    for (let travellerIndex = 0; travellerIndex < travellerCount; travellerIndex += 1) {
      const offset = travellerIndex / travellerCount + ((routeIndex * 0.137) % 1);
      const point = route.curve.getPointAt(offset % 1);
      travellerPositions.push(point.x, point.y, point.z);
      travellerColors.push(route.color.r, route.color.g, route.color.b);
      travellers.push({ route, offset: offset % 1, speedVariance: 0.86 + travellerIndex * 0.11 });
    }
  });

  const travellerGeometry = new THREE.BufferGeometry();
  travellerGeometry.setAttribute('position', new THREE.Float32BufferAttribute(travellerPositions, 3).setUsage(THREE.DynamicDrawUsage));
  travellerGeometry.setAttribute('color', new THREE.Float32BufferAttribute(travellerColors, 3));
  const travellerPoints = new THREE.Points(
    travellerGeometry,
    new THREE.PointsMaterial({
      map: glowTexture,
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    }),
  );
  routeGroup.add(travellerPoints);
  group.add(routeGroup);

  return { routes, travellers, travellerPoints, radialScaffold };
}

function createRevealMaterial(texture) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: texture },
      uReveal: { value: 0 },
      uOpacity: { value: 1 },
    },
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform float uReveal;
      uniform float uOpacity;
      varying vec2 vUv;

      void main() {
        vec4 imageColor = texture2D(uTexture, vUv);
        vec2 centered = abs(vUv - 0.5);
        float aperture = mix(0.015, 0.515, uReveal);
        float mask = 1.0 - smoothstep(aperture - 0.026, aperture, max(centered.x, centered.y));

        float sweepPosition = mix(-0.55, 1.65, uReveal);
        float diagonal = vUv.x + vUv.y * 0.28;
        float glareBand = 1.0 - smoothstep(0.035, 0.16, abs(diagonal - sweepPosition));
        float glareEnvelope = sin(uReveal * 3.14159265);
        vec3 glare = vec3(1.0) * glareBand * glareEnvelope * 0.58;

        gl_FragColor = vec4(imageColor.rgb + glare, imageColor.a * mask * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

function easeInOutCubic(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

/**
 * @param {HTMLElement} root
 * @param {{ getCards?: () => object[], getFillerUrls?: () => string[] }} options
 */
export function mountDataUniverseWall(root, options = {}) {
  const getCards = typeof options.getCards === 'function' ? options.getCards : () => [];
  const getFillerUrls = typeof options.getFillerUrls === 'function' ? options.getFillerUrls : () => [];
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor('#020302', 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  root.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('#020302', 0.018);
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 120);
  camera.position.set(0, 0.2, 35);
  camera.lookAt(0, -1, 0);

  const universe = new THREE.Group();
  universe.position.y = -1.15;
  scene.add(universe);

  const glowTexture = createGlowTexture();
  const shaderMaterials = [];
  const organic = buildOrganicField(universe, glowTexture);
  const cellular = buildCellularBodies(universe, glowTexture, shaderMaterials);
  const dataCurrents = buildDataCurrents(universe, organic, cellular, glowTexture);
  const textureLoader = new THREE.TextureLoader();
  const textureCache = new Map();
  const postcardGeometry = new THREE.PlaneGeometry(1, 1);
  const postcards = [];
  const postcardHitTargets = [];
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2(2, 2);
  let loadToken = 0;
  let loadTimer = null;
  let animationFrame = null;
  let elapsed = 0;
  let pointerActive = false;
  let pointerId = null;
  let pointerX = 0;
  let dragRotation = 0;
  let targetDragRotation = 0;
  let activityEnergy = 0;
  let archiveBlend = 0;
  let shockwaveEnergy = 0;
  let lastInputMarker = 0;
  let hoveredCard = null;
  const dataState = {
    cardCount: 0,
    archiveActive: false,
  };
  const universeWorldQuaternion = new THREE.Quaternion();
  const inverseUniverseQuaternion = new THREE.Quaternion();
  const localBillboardQuaternion = new THREE.Quaternion();

  function clearPostcards() {
    loadToken += 1;
    if (loadTimer) {
      window.clearTimeout(loadTimer);
      loadTimer = null;
    }
    while (postcards.length) {
      const card = postcards.pop();
      universe.remove(card.group);
      card.plane.geometry.dispose();
      card.plane.material.dispose();
      card.frame.geometry.dispose();
      card.frame.material.dispose();
      card.dot.geometry.dispose();
      card.dot.material.dispose();
      card.hitArea.geometry.dispose();
      card.hitArea.material.dispose();
    }
    postcardHitTargets.length = 0;
    hoveredCard = null;
    renderer.domElement.style.cursor = 'grab';
  }

  function getTexture(url, onReady, onError) {
    const cached = textureCache.get(url);
    if (cached) {
      onReady(cached);
      return;
    }
    textureLoader.load(
      url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        textureCache.set(url, texture);
        onReady(texture);
      },
      undefined,
      onError,
    );
  }

  function createPostcard(texture, source, index, sourceCount) {
    const image = texture.image || {};
    const aspect = Math.max(0.55, Math.min(1.8, (image.naturalWidth || image.width || 1) / Math.max(image.naturalHeight || image.height || 1, 1)));
    const isVisitor = source.kind === 'visitor';
    const textEnergy = THREE.MathUtils.clamp(source.textLength / 80, 0, 1);
    const scaleBias = isVisitor ? 1.22 + textEnergy * 0.72 : 0.58 + ((source.seed >>> 4) % 11) / 28;
    const longSide = 1.08 * scaleBias;
    const width = aspect >= 1 ? longSide : longSide * aspect;
    const height = aspect >= 1 ? longSide / aspect : longSide;
    const dotSize = isVisitor ? 0.19 : 0.135;
    const anchorIndex = source.seed % organic.anchorPool.length;
    const base = organic.anchorPool[anchorIndex].clone();
    base.multiplyScalar(0.95 + ((source.seed >>> 9) % 9) * 0.018);

    const group = new THREE.Group();
    group.position.copy(base);
    const imageMaterial = createRevealMaterial(texture);
    const plane = new THREE.Mesh(
      postcardGeometry.clone(),
      imageMaterial,
    );
    plane.scale.set(dotSize, dotSize, 1);
    plane.renderOrder = 2;
    group.add(plane);

    const frameGeometry = new THREE.EdgesGeometry(new THREE.PlaneGeometry(1, 1));
    const frame = new THREE.LineSegments(
      frameGeometry,
      new THREE.LineBasicMaterial({
        color: isVisitor ? PALETTE.cyan : PALETTE.bone,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    );
    frame.scale.set(dotSize, dotSize, 1);
    frame.position.z = 0.008;
    frame.renderOrder = 3;
    group.add(frame);

    const dot = new THREE.Mesh(
      postcardGeometry.clone(),
      new THREE.MeshBasicMaterial({
        color: PALETTE.lime,
        transparent: true,
        opacity: isVisitor ? 1 : 0.82,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    );
    dot.scale.set(dotSize, dotSize, 1);
    dot.position.z = 0.012;
    dot.renderOrder = 4;
    group.add(dot);

    const hitArea = new THREE.Mesh(
      postcardGeometry.clone(),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    hitArea.scale.set(Math.max(width, 0.72), Math.max(height, 0.72), 1);
    hitArea.position.z = 0.02;
    group.add(hitArea);
    universe.add(group);

    const card = {
      group,
      plane,
      frame,
      dot,
      hitArea,
      imageMaterial,
      base,
      width,
      height,
      dotSize,
      isVisitor,
      energy: 0.25 + textEnergy * 0.75,
      phase: (index / Math.max(sourceCount, 1)) * Math.PI * 2 + index * 0.37,
      reveal: 0,
      targetReveal: 0,
    };
    hitArea.userData.card = card;
    postcards.push(card);
    postcardHitTargets.push(hitArea);
  }

  function loadSourceAt(sources, index, token) {
    if (token !== loadToken || index >= sources.length) return;
    const source = sources[index];
    getTexture(
      source.url,
      (texture) => {
        if (token !== loadToken) return;
        createPostcard(texture, source, index, sources.length);
        loadTimer = window.setTimeout(() => loadSourceAt(sources, index + 1, token), 30);
      },
      () => {
        if (token !== loadToken) return;
        loadTimer = window.setTimeout(() => loadSourceAt(sources, index + 1, token), 10);
      },
    );
  }

  function rebuildPostcards() {
    clearPostcards();
    const sources = mergeSources(getCards(), getFillerUrls(), FIELD.postcardLimit);
    const token = loadToken;
    if (sources.length) loadSourceAt(sources, 0, token);
  }

  function resize() {
    const width = Math.max(root.clientWidth, 1);
    const height = Math.max(root.clientHeight, 1);
    const aspect = width / height;
    renderer.setSize(width, height, false);
    camera.aspect = aspect;
    camera.position.z = aspect > 1.35 ? 29 : aspect < 0.72 ? 38 : 35;
    camera.updateProjectionMatrix();
    const scale = aspect > 1.35 ? 0.9 : aspect < 0.72 ? 0.82 : 1;
    universe.scale.setScalar(scale);
    universe.position.y = aspect > 1.35 ? -1.9 : -1.15;
  }

  function updatePostcards() {
    universe.updateMatrixWorld(true);
    universe.getWorldQuaternion(universeWorldQuaternion);
    inverseUniverseQuaternion.copy(universeWorldQuaternion).invert();
    localBillboardQuaternion.copy(camera.quaternion).premultiply(inverseUniverseQuaternion);

    for (const card of postcards) {
      card.group.position.copy(card.base);
      card.group.quaternion.copy(localBillboardQuaternion);

      const revealStep = 0.016 * (card.targetReveal > card.reveal ? 2.85 : 2.15);
      if (card.targetReveal > card.reveal) {
        card.reveal = Math.min(card.targetReveal, card.reveal + revealStep);
      } else if (card.targetReveal < card.reveal) {
        card.reveal = Math.max(card.targetReveal, card.reveal - revealStep);
      }
      const easedReveal = easeInOutCubic(card.reveal);
      const currentWidth = THREE.MathUtils.lerp(card.dotSize, card.width, easedReveal);
      const currentHeight = THREE.MathUtils.lerp(card.dotSize, card.height, easedReveal);
      card.plane.scale.set(currentWidth, currentHeight, 1);
      card.frame.scale.set(currentWidth, currentHeight, 1);
      card.imageMaterial.uniforms.uReveal.value = easedReveal;
      card.frame.material.opacity = easedReveal * (card.isVisitor ? 0.86 : 0.68);
      card.dot.material.opacity = (1 - easedReveal) * (card.isVisitor ? 1 : 0.82);
      card.dot.scale.setScalar(card.dotSize * (1 + easedReveal * 0.3));
    }
  }

  function updateDataCurrents() {
    const positions = dataCurrents.travellerPoints.geometry.attributes.position;
    const speedBoost = 1 + activityEnergy * 2.8;
    dataCurrents.travellers.forEach((traveller, index) => {
      const progress = (traveller.offset + elapsed * traveller.route.speed * traveller.speedVariance * speedBoost) % 1;
      const point = traveller.route.curve.getPointAt(progress);
      positions.setXYZ(index, point.x, point.y, point.z);
    });
    positions.needsUpdate = true;
    dataCurrents.travellerPoints.material.opacity = 0.58 + activityEnergy * 0.34 - archiveBlend * 0.12;
    dataCurrents.radialScaffold.material.opacity = 0.078 + activityEnergy * 0.042 + archiveBlend * 0.012;
    dataCurrents.routes.forEach((route, index) => {
      const baseOpacity = index === 4 ? 0.22 : 0.12;
      route.line.material.opacity = baseOpacity + activityEnergy * 0.09 + archiveBlend * 0.025;
    });
  }

  function setHoveredCard(nextCard) {
    if (hoveredCard === nextCard) return;
    hoveredCard = nextCard;
    for (const card of postcards) card.targetReveal = card === hoveredCard ? 1 : 0;
    renderer.domElement.style.cursor = hoveredCard ? 'zoom-in' : 'grab';
  }

  function updateHover(event) {
    if (pointerActive || !postcardHitTargets.length) return;
    const bounds = renderer.domElement.getBoundingClientRect();
    pointerNdc.set(
      ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1,
      -((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 2 + 1,
    );
    raycaster.setFromCamera(pointerNdc, camera);
    const intersection = raycaster.intersectObjects(postcardHitTargets, false)[0];
    setHoveredCard(intersection?.object?.userData?.card || null);
  }

  function animate() {
    elapsed += 0.016;
    activityEnergy *= 0.992;
    archiveBlend += ((dataState.archiveActive ? 1 : 0) - archiveBlend) * 0.025;
    dragRotation += (targetDragRotation - dragRotation) * 0.06;
    universe.rotation.y = dragRotation;
    universe.rotation.z = Math.sin(elapsed * 0.026) * 0.004;
    organic.particles.rotation.y = 0;
    organic.network.rotation.y = 0;

    for (const body of cellular.bodies) updateBodyMotion(body, elapsed, 0.016);
    const animatedCore = cellular.bodies[0].mesh;
    cellular.coreGlow.position.copy(animatedCore.position);
    cellular.coreGlow.scale.copy(animatedCore.scale);
    cellular.rings.forEach((ring, index) => {
      ring.position.copy(animatedCore.position);
      ring.rotation.z += 0.0001 + index * 0.00004;
    });
    cellular.shockwave.position.copy(animatedCore.position);
    organic.particles.material.uniforms.uTime.value = elapsed;
    organic.particles.material.uniforms.uOpacity.value = 0.77 + activityEnergy * 0.18 - archiveBlend * 0.14;
    organic.particles.material.uniforms.uSignal.value = activityEnergy;
    organic.network.material.opacity = 0.24 + activityEnergy * 0.12 + archiveBlend * 0.06;
    cellular.coreGlow.material.opacity = 0.52 + Math.sin(elapsed * 0.14) * 0.08 + activityEnergy * 0.2;
    shaderMaterials.forEach((material) => {
      material.uniforms.uTime.value = elapsed;
      material.uniforms.uEnergy.value = activityEnergy;
      material.uniforms.uArchive.value = archiveBlend;
    });
    cellular.bodies.forEach((body) => {
      const formCycle = 0.5 + Math.sin(elapsed * 0.019 + body.phase) * 0.5;
      const wire = body.mesh.userData.wire;
      if (wire) wire.material.opacity = 0.1 + formCycle * 0.085 + activityEnergy * 0.13 + archiveBlend * 0.035;
      const surfacePoints = body.mesh.userData.surfacePoints;
      if (surfacePoints) surfacePoints.material.opacity = 0.28 - formCycle * 0.13 + activityEnergy * 0.2 + archiveBlend * 0.045;
    });
    if (shockwaveEnergy > 0.005) {
      shockwaveEnergy *= 0.975;
      const expansion = 0.35 + (1 - shockwaveEnergy) * 8.5;
      cellular.shockwave.scale.setScalar(expansion);
      cellular.shockwave.material.opacity = shockwaveEnergy * 0.72;
    } else {
      cellular.shockwave.material.opacity = 0;
    }
    root.dataset.mode = dataState.archiveActive ? 'archive' : activityEnergy > 0.08 ? 'active' : 'ambient';
    updatePostcards();
    updateDataCurrents();
    renderer.render(scene, camera);
    animationFrame = window.requestAnimationFrame(animate);
  }

  function handlePointerDown(event) {
    if (event.button !== 0) return;
    pointerActive = true;
    pointerId = event.pointerId;
    pointerX = event.clientX;
    renderer.domElement.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    if (pointerActive && event.pointerId === pointerId) {
      const delta = event.clientX - pointerX;
      pointerX = event.clientX;
      targetDragRotation += delta * 0.006;
      return;
    }
    updateHover(event);
  }

  function handlePointerUp(event) {
    if (!pointerActive || event.pointerId !== pointerId) return;
    pointerActive = false;
    pointerId = null;
    try {
      renderer.domElement.releasePointerCapture(event.pointerId);
    } catch (_) {}
    updateHover(event);
  }

  function handlePointerLeave() {
    setHoveredCard(null);
  }

  renderer.domElement.style.touchAction = 'none';
  renderer.domElement.addEventListener('pointerdown', handlePointerDown);
  renderer.domElement.addEventListener('pointermove', handlePointerMove);
  renderer.domElement.addEventListener('pointerup', handlePointerUp);
  renderer.domElement.addEventListener('pointercancel', handlePointerUp);
  renderer.domElement.addEventListener('pointerleave', handlePointerLeave);
  window.addEventListener('resize', resize);
  resize();
  rebuildPostcards();
  animationFrame = window.requestAnimationFrame(animate);

  return {
    rebuild() {
      rebuildPostcards();
    },
    setDataState(next = {}) {
      const nextMarker = Number(next.lastInputAt) || 0;
      dataState.cardCount = Number(next.cardCount) || 0;
      dataState.archiveActive = Boolean(next.archiveActive);
      if (nextMarker && nextMarker !== lastInputMarker) {
        lastInputMarker = nextMarker;
        activityEnergy = 1;
        shockwaveEnergy = 1;
        cellular.shockwave.scale.setScalar(0.1);
      }
      root.dataset.mode = dataState.archiveActive ? 'archive' : activityEnergy > 0.08 ? 'active' : 'ambient';
    },
    dispose() {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerup', handlePointerUp);
      renderer.domElement.removeEventListener('pointercancel', handlePointerUp);
      renderer.domElement.removeEventListener('pointerleave', handlePointerLeave);
      clearPostcards();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose?.();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose?.());
        }
      });
      textureCache.forEach((texture) => texture.dispose());
      glowTexture.dispose();
      postcardGeometry.dispose();
      renderer.dispose();
      try {
        root.removeChild(renderer.domElement);
      } catch (_) {}
    },
  };
}

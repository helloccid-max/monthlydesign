import * as THREE from 'three';

/**
 * Fork: SimpleSynthTree main.js — createTreePointCloud (outline/skeleton/original).
 * colorState: { trunkFill, trunkLine } (hex strings)
 */

function mulberry32(seed) {
  let t = seed >>> 0;
  return function rand() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function smoothstep(edge0, edge1, x) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function createCurvePoint(baseX, baseZ, t, profile) {
  const lowerLock = smoothstep(0.28, 0.72, t);
  const bendX =
    Math.sin(t * Math.PI * 0.92) * profile.primaryBendX * lowerLock +
    Math.sin(t * Math.PI * 2.0) * profile.secondaryBendX * lowerLock * 0.4;
  const bendZ =
    Math.cos(t * Math.PI * 0.95) * profile.primaryBendZ * lowerLock;
  return new THREE.Vector3(baseX + bendX, t * baseZ, bendZ);
}

export function createTreePointCloud(options, colorState) {
  const rand = mulberry32(options.randomSeed);
  const randLeaf = mulberry32(options.randomSeed + 1009);
  const pointData = [];
  const skeletonData = [];
  const outlineData = [];
  const centerline = [];
  const branchLines = [];
  const silhouetteSpecs = [];
  const leafOccupancy = new Map();
  const trunkColor = new THREE.Color(colorState.trunkFill);
  const branchColor = new THREE.Color(colorState.trunkLine);
  const leafColor = new THREE.Color("#7ea05a");
  const trunkProfile = {
    primaryBendX: (rand() - 0.5) * 1.15,
    secondaryBendX: (rand() - 0.5) * 0.45,
    primaryBendZ: (rand() - 0.5) * 0.22,
  };
  const childCountByLevel = {
    1: options.branchCount,
    2: options.secondaryBranchCount,
    3: options.tertiaryBranchCount,
  };
  const canopyCenter = THREE.MathUtils.clamp(
    options.canopyBaseHeight + (1 - options.canopyBaseHeight) * 0.45,
    0.2,
    0.82,
  );
  const canopyRadius = Math.max(0.16, (1 - options.canopyBaseHeight) * 0.62);

  function canopyEnvelope(heightT) {
    if (heightT < options.canopyBaseHeight) {
      return 0.14 + 0.18 * (heightT / Math.max(options.canopyBaseHeight, 0.01));
    }

    const normalizedDistance = Math.abs(heightT - canopyCenter) / canopyRadius;
    const dome = Math.max(0, 1 - Math.pow(normalizedDistance, options.canopyRoundness));
    return Math.pow(dome, 0.8) * options.canopyWidth;
  }

  function pushBranchVolumePoint(branchPoint, thickness) {
    const clusterCount = 5;
    for (let k = 0; k < clusterCount; k += 1) {
      const point = {
        x: branchPoint.x + (rand() - 0.5) * thickness,
        y: branchPoint.y + (rand() - 0.5) * thickness,
        z: branchPoint.z + (rand() - 0.5) * thickness,
        color: branchColor,
        kind: "branch",
      };
      pointData.push(point);
      if (k === 0 || k === clusterCount - 1) {
        outlineData.push(point);
      }
    }
  }

  function getLeafCellKey(point) {
    const cellSizeX = 0.72;
    const cellSizeY = 0.82;
    const cellSizeZ = 0.72;
    return [
      Math.round(point.x / cellSizeX),
      Math.round(point.y / cellSizeY),
      Math.round(point.z / cellSizeZ),
    ].join(":");
  }

  function getLeafOccupancy(point) {
    return leafOccupancy.get(getLeafCellKey(point)) ?? 0;
  }

  function addLeafPoint(point, outerThreshold = 0, radius = 0, skeletonStride = 10, index = 0) {
    pointData.push(point);
    const key = getLeafCellKey(point);
    leafOccupancy.set(key, (leafOccupancy.get(key) ?? 0) + 1);

    if (radius > outerThreshold) {
      outlineData.push(point);
    }

    if (index % skeletonStride === 0) {
      skeletonData.push({
        x: point.x,
        y: point.y,
        z: point.z,
        color: point.color,
        kind: "leaf",
      });
    }
  }

  function pushLeafCluster(origin, branchLength, densityScale = 1) {
    if (options.leafDensity <= 0) {
      return;
    }

    const leavesForBranch = Math.max(
      0,
      Math.floor(
        ((options.leafDensity * 3) / Math.max(1, options.branchCount)) * densityScale,
      ),
    );
    const leafRadius =
      branchLength *
      (0.3 + densityScale * 0.12) *
      (1.02 + options.canopyWidth * 0.22);
    const innerGap = leafRadius * 0.08;
    const arcOffset = randLeaf() * Math.PI * 2;
    for (let l = 0; l < leavesForBranch; l += 1) {
      const angle =
        arcOffset +
        (l / leavesForBranch) * Math.PI * 2 +
        (randLeaf() - 0.5) * 0.22;
      const radius = innerGap + (leafRadius - innerGap) * Math.pow(randLeaf(), 0.78);
      const height = (randLeaf() - 0.38) * leafRadius * 1.34;
      const tint = 0.88 + randLeaf() * 0.18;
      const point = {
        x:
          origin.x +
          Math.cos(angle) *
            radius *
            (0.58 + options.canopyWidth * 0.08) *
            options.lateralSpread,
        y: origin.y + height,
        z:
          origin.z +
          Math.sin(angle) * radius * (0.92 + options.canopyWidth * 0.08),
        color: new THREE.Color(
          leafColor.r * tint,
          leafColor.g * tint,
          leafColor.b * tint,
        ),
        kind: "leaf",
      };
      addLeafPoint(point, leafRadius * 0.72, radius, 10, l);
    }
  }

  function pushCanopyFill(branchLine, branchLength, densityScale = 1) {
    if (options.leafDensity <= 0) {
      return;
    }

    const fillCount = Math.max(
      0,
      Math.floor(
        ((options.leafDensity * 1.8) / Math.max(1, options.branchCount)) * densityScale,
      ),
    );

    for (let i = 0; i < fillCount; i += 1) {
      let bestCandidate = null;
      let bestScore = Number.POSITIVE_INFINITY;
      let bestRadius = 0;

      for (let attempt = 0; attempt < 5; attempt += 1) {
        const t = 0.22 + randLeaf() * 0.74;
        const sampleIndex = Math.min(
          branchLine.length - 1,
          Math.max(1, Math.floor(t * (branchLine.length - 1))),
        );
        const anchor = branchLine[sampleIndex];
        const heightT = THREE.MathUtils.clamp(anchor.y / options.trunkHeight, 0, 1);
        const envelope = canopyEnvelope(heightT);
        const spreadRadius =
          branchLength *
          (0.075 + densityScale * 0.055) *
          (0.64 + envelope * 0.22);
        const angle = randLeaf() * Math.PI * 2;
        const radius = spreadRadius * Math.pow(randLeaf(), 1.05);
        const candidate = {
          x:
            anchor.x +
            Math.cos(angle) *
              radius *
              (0.42 + options.canopyWidth * 0.05) *
              options.lateralSpread,
          y: anchor.y + (randLeaf() - 0.18) * spreadRadius * 1.05,
          z:
            anchor.z +
            Math.sin(angle) * radius * (0.82 + options.canopyWidth * 0.06),
          color: new THREE.Color(
            leafColor.r * (0.92 + randLeaf() * 0.14),
            leafColor.g * (0.92 + randLeaf() * 0.14),
            leafColor.b * (0.92 + randLeaf() * 0.14),
          ),
          kind: "leaf",
        };
        const occupancyScore = getLeafOccupancy(candidate);
        const centerBias = Math.abs(candidate.x - anchor.x) * 0.35;
        const radiusPenalty = radius * 0.6;
        const score = occupancyScore + centerBias + radiusPenalty;
        if (score < bestScore) {
          bestScore = score;
          bestCandidate = candidate;
          bestRadius = radius;
        }
      }

      if (bestCandidate) {
        addLeafPoint(bestCandidate, branchLength * 0.18, bestRadius, 8, i);
      }
    }
  }

  function pushCoreCanopyFill(branchLine, branchLength, densityScale = 1) {
    if (options.leafDensity <= 0) {
      return;
    }

    const fillCount = Math.max(
      0,
      Math.floor(
        ((options.leafDensity * 1.45) / Math.max(1, options.branchCount)) * densityScale,
      ),
    );

    for (let i = 0; i < fillCount; i += 1) {
      let bestCandidate = null;
      let bestScore = Number.POSITIVE_INFINITY;
      let bestRadius = 0;

      for (let attempt = 0; attempt < 6; attempt += 1) {
        const t = 0.12 + randLeaf() * 0.56;
        const sampleIndex = Math.min(
          branchLine.length - 1,
          Math.max(1, Math.floor(t * (branchLine.length - 1))),
        );
        const anchor = branchLine[sampleIndex];
        const heightT = THREE.MathUtils.clamp(anchor.y / options.trunkHeight, 0, 1);
        const spreadRadius =
          branchLength *
          (0.06 + densityScale * 0.04) *
          (0.9 + canopyEnvelope(heightT) * 0.12);
        const angle = randLeaf() * Math.PI * 2;
        const radius = spreadRadius * Math.pow(randLeaf(), 1.2);
        const candidate = {
          x:
            anchor.x +
            Math.cos(angle) *
              radius *
              (0.34 + options.canopyWidth * 0.035) *
              options.lateralSpread,
          y: anchor.y + (randLeaf() - 0.12) * spreadRadius * 1.3,
          z:
            anchor.z +
            Math.sin(angle) * radius * (0.68 + options.canopyWidth * 0.04),
          color: new THREE.Color(
            leafColor.r * (0.9 + randLeaf() * 0.12),
            leafColor.g * (0.9 + randLeaf() * 0.12),
            leafColor.b * (0.9 + randLeaf() * 0.12),
          ),
          kind: "leaf",
        };
        const occupancyScore = getLeafOccupancy(candidate);
        const centerBias =
          Math.abs(candidate.x - anchor.x) * 0.55 +
          Math.abs(candidate.z - anchor.z) * 0.28;
        const score = occupancyScore + centerBias + radius * 0.7;
        if (score < bestScore) {
          bestScore = score;
          bestCandidate = candidate;
          bestRadius = radius;
        }
      }

      if (bestCandidate) {
        addLeafPoint(bestCandidate, branchLength * 0.12, bestRadius, 8, i);
      }
    }
  }

  function createContourLinePair(linePoints, baseThickness, thicknessScale = 1) {
    silhouetteSpecs.push({
      points: linePoints.map((point) => point.clone()),
      baseThickness,
      thicknessScale,
    });
  }

  function generateBranchLine({
    start,
    azimuth,
    pitch,
    branchLength,
    branchSegments,
    thicknessScale,
    level,
  }) {
    let lastPoint = start.clone();
    const branchLine = [start.clone()];

    for (let step = 1; step <= branchSegments; step += 1) {
      const t = step / branchSegments;
      const spread = branchLength * t;
      const curveLift =
        Math.sin(t * Math.PI * 0.85) * branchLength * (0.18 - level * 0.02);
      const branchPoint = new THREE.Vector3(
        start.x + Math.cos(azimuth) * spread * Math.cos(pitch) * options.lateralSpread,
        start.y + spread * Math.sin(pitch) + curveLift,
        start.z + Math.sin(azimuth) * spread * Math.cos(pitch),
      );
      lastPoint = branchPoint;
      branchLine.push(branchPoint.clone());
      skeletonData.push({
        x: branchPoint.x,
        y: branchPoint.y,
        z: branchPoint.z,
        color: branchColor,
        kind: "branch",
      });

      const thickness =
        options.trunkRadius * thicknessScale * (0.18 * (1 - t) + 0.03);
      pushBranchVolumePoint(branchPoint, thickness);
    }

    branchLines.push(branchLine);
    return { line: branchLine, end: lastPoint };
  }

  function spawnChildBranches(parentLine, parentAzimuth, level) {
    if (level > 3) {
      return;
    }

    const count = childCountByLevel[level];
    if (!count) {
      return;
    }

    for (let i = 0; i < count; i += 1) {
      const startIndex = Math.min(
        parentLine.length - 2,
        Math.max(
          1,
          Math.floor(
            (0.42 + rand() * 0.42) * (parentLine.length - 1),
          ),
        ),
      );
      const start = parentLine[startIndex];
      const direction = i % 2 === 0 ? 1 : -1;
      const azimuth =
        parentAzimuth +
        direction * (0.45 + rand() * 0.55) +
        (rand() - 0.5) * 0.2;
      const pitch = 0.22 + rand() * (level === 2 ? 0.33 : 0.25);
      const relativeHeight = THREE.MathUtils.clamp(start.y / options.trunkHeight, 0, 1);
      const childHeightFalloff = 1 - relativeHeight;
      const canopyFactor = canopyEnvelope(relativeHeight);
      const branchLength =
        options.trunkHeight *
        (level === 2
          ? ((0.035 + rand() * 0.025) + childHeightFalloff * (0.045 + rand() * 0.035)) * canopyFactor
          : ((0.02 + rand() * 0.015) + childHeightFalloff * (0.028 + rand() * 0.02)) * canopyFactor);
      const branchSegments = level === 2 ? 8 + Math.floor(rand() * 5) : 6 + Math.floor(rand() * 4);
      const thicknessScale = level === 2 ? 0.72 : 0.48;
      const { line, end } = generateBranchLine({
        start,
        azimuth,
        pitch,
        branchLength,
        branchSegments,
        thicknessScale,
        level,
      });
      createContourLinePair(
        line,
        options.trunkRadius * (level === 2 ? 0.2 : 0.13),
        thicknessScale,
      );

      pushLeafCluster(end, branchLength, level === 2 ? 0.6 : 0.42);
      pushCanopyFill(line, branchLength, level === 2 ? 0.42 : 0.28);
      spawnChildBranches(line, azimuth, level + 1);
    }
  }

  const trunkSegments = 42;
  for (let i = 0; i <= trunkSegments; i += 1) {
    const t = i / trunkSegments;
    const center = createCurvePoint(0, options.trunkHeight, t, trunkProfile);
    centerline.push(center);
    skeletonData.push({
      x: center.x,
      y: center.y,
      z: center.z,
      color: trunkColor,
      kind: "trunk",
    });

    const radius = lerp(options.trunkRadius, options.trunkRadius * 0.14, t);
    const ringCount = Math.max(9, Math.floor(radius * 22));
    for (let j = 0; j < ringCount; j += 1) {
      const angle = (j / ringCount) * Math.PI * 2;
      const wobble = 0.75 + rand() * 0.4;
      const point = {
        x: center.x + Math.cos(angle) * radius * wobble,
        y: center.y,
        z: center.z + Math.sin(angle) * radius * wobble,
        color: trunkColor,
        kind: "trunk",
      };
      pointData.push(point);

      const outlineQuarter = Math.abs(Math.sin(angle)) < 0.22;
      if (j === 0 || j === Math.floor(ringCount / 2) || outlineQuarter) {
        outlineData.push(point);
      }
    }
  }
  branchLines.push(centerline.map((point) => point.clone()));
  createContourLinePair(centerline, options.trunkRadius * 0.75, 1);
  pushCoreCanopyFill(centerline, options.trunkHeight * 0.7, 0.9);

  for (let i = 0; i < options.branchCount; i += 1) {
    const startT = options.canopyBaseHeight + rand() * (0.82 - options.canopyBaseHeight);
    const startIndex = Math.min(
      centerline.length - 1,
      Math.floor(startT * (centerline.length - 1)),
    );
    const start = centerline[startIndex];
    const azimuth = ((i / options.branchCount) * Math.PI * 2) + (rand() - 0.5) * 0.65;
    const pitch = 0.28 + rand() * 0.55;
    const heightFalloff = 1 - startT;
    const canopyFactor = canopyEnvelope(startT);
    const branchLength =
      options.trunkHeight *
      ((0.06 + rand() * 0.04) + heightFalloff * (0.08 + rand() * 0.08)) *
      canopyFactor;
    const branchSegments = 12 + Math.floor(rand() * 8);

    const { line, end } = generateBranchLine({
      start,
      azimuth,
      pitch,
      branchLength,
      branchSegments,
      thicknessScale: 1,
      level: 1,
    });
    createContourLinePair(line, options.trunkRadius * 0.32, 1);
    pushCoreCanopyFill(line, branchLength, 0.82);
    pushLeafCluster(end, branchLength, 1);
    pushCanopyFill(line, branchLength, 0.72);
    spawnChildBranches(line, azimuth, 2);
  }

  const renderPoints =
    options.renderMode === "skeleton"
      ? skeletonData
      : options.renderMode === "outline"
        ? outlineData
        : pointData;
  const finalRenderPoints = renderPoints.length > 0 ? renderPoints : pointData;

  // Reorder reveal so the animation grows from the trunk base outward
  // instead of exposing one side of the canopy first.
  finalRenderPoints.sort((a, b) => {
    const kindWeight = { trunk: 0, branch: 1, leaf: 2 };
    const aRadius = Math.hypot(a.x, a.z);
    const bRadius = Math.hypot(b.x, b.z);
    const aScore = kindWeight[a.kind] * 1000 + a.y * 6 + aRadius;
    const bScore = kindWeight[b.kind] * 1000 + b.y * 6 + bRadius;
    return aScore - bScore;
  });

  const positions = [];
  const colors = [];
  for (const point of finalRenderPoints) {
    positions.push(point.x, point.y, point.z);
    colors.push(point.color.r, point.color.g, point.color.b);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3),
  );

  // Anchor the generated tree start exactly at the world origin.
  const trunkBase = centerline[0];
  geometry.translate(-trunkBase.x, -trunkBase.y, -trunkBase.z);
  const anchoredBranchLines = branchLines.map((line) =>
    line.map(
      (point) =>
        new THREE.Vector3(
          point.x - trunkBase.x,
          point.y - trunkBase.y,
          point.z - trunkBase.z,
        ),
    ),
  );
  const anchoredSilhouetteSpecs = silhouetteSpecs.map((spec) => ({
    ...spec,
    points: spec.points.map(
      (point) =>
        new THREE.Vector3(
          point.x - trunkBase.x,
          point.y - trunkBase.y,
          point.z - trunkBase.z,
        ),
    ),
  }));
  const anchoredLeafPoints =
    (options.renderMode === "skeleton"
      ? skeletonData.filter((point) => point.kind === "leaf")
      : options.renderMode === "outline"
        ? outlineData.filter((point) => point.kind === "leaf")
        : []
    ).map((point) => ({
      ...point,
      x: point.x - trunkBase.x,
      y: point.y - trunkBase.y,
      z: point.z - trunkBase.z,
    }));
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return {
    geometry,
    branchLines: anchoredBranchLines,
    silhouetteSpecs: anchoredSilhouetteSpecs,
    leafPoints: anchoredLeafPoints,
  };
}

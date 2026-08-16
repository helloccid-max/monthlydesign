import { execFileSync } from 'node:child_process';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIRECTORY = path.resolve(SCRIPT_DIRECTORY, '..');
const ARCHIVE_DIRECTORY = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(PROJECT_DIRECTORY, 'public', 'covers', 'archive');
const OUTPUT_FILE = process.argv[3]
  ? path.resolve(process.argv[3])
  : path.join(PROJECT_DIRECTORY, 'public', 'data', 'monthly-design-cover-topology.json');

const SAMPLE_WIDTH = 24;
const SAMPLE_HEIGHT = 32;
const REFERENCE_ID = '2001_07';
const VISUAL_CLUSTER_COUNT = 12;
const FILE_PATTERN = /^(\d{4})_(\d{2})\.png$/;

const clamp = (value, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));
const round = (value, digits = 4) => Number(Number(value).toFixed(digits));

function rgbToLab(red, green, blue) {
  const linear = (value) => {
    const channel = value / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  };
  const r = linear(red);
  const g = linear(green);
  const b = linear(blue);
  const x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  const f = (value) => (value > 0.008856 ? Math.cbrt(value) : 7.787 * value + 16 / 116);
  const fx = f(x);
  const fy = f(y);
  const fz = f(z);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

function pixelAt(buffer, coverOffset, x, y) {
  const index = coverOffset + (y * SAMPLE_WIDTH + x) * 3;
  return [buffer[index], buffer[index + 1], buffer[index + 2]];
}

function regionStatistics(buffer, coverOffset, bounds) {
  let red = 0;
  let green = 0;
  let blue = 0;
  let luminance = 0;
  let luminanceSquared = 0;
  let saturation = 0;
  let count = 0;

  for (let y = bounds.y0; y < bounds.y1; y += 1) {
    for (let x = bounds.x0; x < bounds.x1; x += 1) {
      const [r, g, b] = pixelAt(buffer, coverOffset, x, y);
      const maximum = Math.max(r, g, b);
      const minimum = Math.min(r, g, b);
      const light = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      red += r;
      green += g;
      blue += b;
      luminance += light;
      luminanceSquared += light * light;
      saturation += maximum ? (maximum - minimum) / maximum : 0;
      count += 1;
    }
  }

  const meanRed = red / count;
  const meanGreen = green / count;
  const meanBlue = blue / count;
  const meanLuminance = luminance / count;
  const variance = Math.max(0, luminanceSquared / count - meanLuminance ** 2) / (255 ** 2);
  return {
    ...bounds,
    area: count / (SAMPLE_WIDTH * SAMPLE_HEIGHT),
    color: rgbToLab(meanRed, meanGreen, meanBlue),
    luminance: meanLuminance / 255,
    saturation: saturation / count,
    variance,
    cx: ((bounds.x0 + bounds.x1) * 0.5) / SAMPLE_WIDTH,
    cy: ((bounds.y0 + bounds.y1) * 0.5) / SAMPLE_HEIGHT,
  };
}

function splitVisualRegions(buffer, coverOffset, targetCount) {
  let regions = [regionStatistics(buffer, coverOffset, {
    x0: 0,
    y0: 0,
    x1: SAMPLE_WIDTH,
    y1: SAMPLE_HEIGHT,
  })];

  while (regions.length < targetCount) {
    let candidateIndex = -1;
    let candidateScore = -1;
    regions.forEach((region, index) => {
      const width = region.x1 - region.x0;
      const height = region.y1 - region.y0;
      if (width < 4 || height < 4) return;
      const score = region.variance * Math.sqrt(region.area);
      if (score > candidateScore) {
        candidateScore = score;
        candidateIndex = index;
      }
    });
    if (candidateIndex < 0) break;

    const candidate = regions[candidateIndex];
    const middleX = Math.round((candidate.x0 + candidate.x1) * 0.5);
    const middleY = Math.round((candidate.y0 + candidate.y1) * 0.5);
    const children = [
      { x0: candidate.x0, y0: candidate.y0, x1: middleX, y1: middleY },
      { x0: middleX, y0: candidate.y0, x1: candidate.x1, y1: middleY },
      { x0: candidate.x0, y0: middleY, x1: middleX, y1: candidate.y1 },
      { x0: middleX, y0: middleY, x1: candidate.x1, y1: candidate.y1 },
    ].map((bounds) => regionStatistics(buffer, coverOffset, bounds));
    regions.splice(candidateIndex, 1, ...children);
  }

  return regions.sort((left, right) => right.area - left.area || right.variance - left.variance);
}

function extractPalette(buffer, coverOffset, count = 4) {
  const pixels = [];
  for (let y = 0; y < SAMPLE_HEIGHT; y += 1) {
    for (let x = 0; x < SAMPLE_WIDTH; x += 1) {
      const rgb = pixelAt(buffer, coverOffset, x, y);
      pixels.push({ rgb, lab: rgbToLab(...rgb) });
    }
  }

  const centroids = [pixels[Math.floor(pixels.length * 0.5)].lab.slice()];
  while (centroids.length < count) {
    let farthest = pixels[0];
    let farthestDistance = -1;
    for (const pixel of pixels) {
      const distance = Math.min(...centroids.map((centroid) => (
        (pixel.lab[0] - centroid[0]) ** 2
        + (pixel.lab[1] - centroid[1]) ** 2
        + (pixel.lab[2] - centroid[2]) ** 2
      )));
      if (distance > farthestDistance) {
        farthest = pixel;
        farthestDistance = distance;
      }
    }
    centroids.push(farthest.lab.slice());
  }

  let assignments = new Int16Array(pixels.length);
  for (let iteration = 0; iteration < 8; iteration += 1) {
    const sums = Array.from({ length: count }, () => [0, 0, 0, 0]);
    pixels.forEach((pixel, index) => {
      let best = 0;
      let bestDistance = Infinity;
      centroids.forEach((centroid, centroidIndex) => {
        const distance = (pixel.lab[0] - centroid[0]) ** 2
          + (pixel.lab[1] - centroid[1]) ** 2
          + (pixel.lab[2] - centroid[2]) ** 2;
        if (distance < bestDistance) {
          best = centroidIndex;
          bestDistance = distance;
        }
      });
      assignments[index] = best;
      sums[best][0] += pixel.lab[0];
      sums[best][1] += pixel.lab[1];
      sums[best][2] += pixel.lab[2];
      sums[best][3] += 1;
    });
    sums.forEach((sum, index) => {
      if (!sum[3]) return;
      centroids[index] = [sum[0] / sum[3], sum[1] / sum[3], sum[2] / sum[3]];
    });
  }

  const weights = new Uint16Array(count);
  assignments.forEach((assignment) => { weights[assignment] += 1; });
  return centroids
    .map((color, index) => ({ color, weight: weights[index] / pixels.length }))
    .sort((left, right) => right.weight - left.weight);
}

function analyzeCover(buffer, coverIndex, metadata) {
  const coverOffset = coverIndex * SAMPLE_WIDTH * SAMPLE_HEIGHT * 3;
  const luminanceValues = [];
  const saturationValues = [];
  const histogram = new Uint16Array(16);
  let red = 0;
  let green = 0;
  let blue = 0;
  let white = 0;
  let dark = 0;
  let edge = 0;
  let edgeCount = 0;
  let saliencyX = 0;
  let saliencyY = 0;
  let saliencyTotal = 0;
  let horizontalDifference = 0;
  let verticalDifference = 0;

  for (let y = 0; y < SAMPLE_HEIGHT; y += 1) {
    for (let x = 0; x < SAMPLE_WIDTH; x += 1) {
      const [r, g, b] = pixelAt(buffer, coverOffset, x, y);
      const maximum = Math.max(r, g, b);
      const minimum = Math.min(r, g, b);
      const saturation = maximum ? (maximum - minimum) / maximum : 0;
      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      red += r;
      green += g;
      blue += b;
      luminanceValues.push(luminance);
      saturationValues.push(saturation);
      histogram[Math.min(15, Math.floor(luminance * 16))] += 1;
      if (luminance > 0.9 && saturation < 0.13) white += 1;
      if (luminance < 0.18) dark += 1;

      let localEdge = 0;
      if (x + 1 < SAMPLE_WIDTH) {
        const [rr, rg, rb] = pixelAt(buffer, coverOffset, x + 1, y);
        localEdge += Math.abs(luminance - (0.2126 * rr + 0.7152 * rg + 0.0722 * rb) / 255);
        edgeCount += 1;
      }
      if (y + 1 < SAMPLE_HEIGHT) {
        const [br, bg, bb] = pixelAt(buffer, coverOffset, x, y + 1);
        localEdge += Math.abs(luminance - (0.2126 * br + 0.7152 * bg + 0.0722 * bb) / 255);
        edgeCount += 1;
      }
      edge += localEdge;
      const saliency = localEdge + saturation * 0.24 + Math.abs(luminance - 0.5) * 0.12 + 0.01;
      saliencyX += (x / (SAMPLE_WIDTH - 1)) * saliency;
      saliencyY += (y / (SAMPLE_HEIGHT - 1)) * saliency;
      saliencyTotal += saliency;

      if (x < SAMPLE_WIDTH / 2) {
        const mirror = pixelAt(buffer, coverOffset, SAMPLE_WIDTH - 1 - x, y);
        horizontalDifference += (Math.abs(r - mirror[0]) + Math.abs(g - mirror[1]) + Math.abs(b - mirror[2])) / (255 * 3);
      }
      if (y < SAMPLE_HEIGHT / 2) {
        const mirror = pixelAt(buffer, coverOffset, x, SAMPLE_HEIGHT - 1 - y);
        verticalDifference += (Math.abs(r - mirror[0]) + Math.abs(g - mirror[1]) + Math.abs(b - mirror[2])) / (255 * 3);
      }
    }
  }

  const count = SAMPLE_WIDTH * SAMPLE_HEIGHT;
  const meanLuminance = luminanceValues.reduce((sum, value) => sum + value, 0) / count;
  const contrast = Math.sqrt(luminanceValues.reduce((sum, value) => sum + (value - meanLuminance) ** 2, 0) / count);
  const saturation = saturationValues.reduce((sum, value) => sum + value, 0) / count;
  const entropy = -[...histogram].reduce((sum, bin) => {
    if (!bin) return sum;
    const probability = bin / count;
    return sum + probability * Math.log2(probability);
  }, 0) / 4;
  const meanColor = rgbToLab(red / count, green / count, blue / count);
  const palette = extractPalette(buffer, coverOffset);

  const grid = [];
  for (let gridY = 0; gridY < 4; gridY += 1) {
    for (let gridX = 0; gridX < 4; gridX += 1) {
      const statistics = regionStatistics(buffer, coverOffset, {
        x0: gridX * 6,
        y0: gridY * 8,
        x1: (gridX + 1) * 6,
        y1: (gridY + 1) * 8,
      });
      grid.push(statistics.color[0] / 100, statistics.saturation);
    }
  }

  return {
    ...metadata,
    meanColor,
    palette,
    luminance: meanLuminance,
    saturation,
    contrast,
    edgeDensity: edge / Math.max(1, edgeCount),
    whitespace: white / count,
    dark: dark / count,
    entropy,
    saliency: [saliencyX / saliencyTotal, saliencyY / saliencyTotal],
    symmetry: [
      1 - horizontalDifference / (count * 0.5),
      1 - verticalDifference / (count * 0.5),
    ],
    grid,
    coverOffset,
  };
}

function normalizeScalar(covers, key) {
  const values = covers.map((cover) => cover[key]);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  covers.forEach((cover) => {
    cover[`${key}Normalized`] = (cover[key] - minimum) / Math.max(1e-7, maximum - minimum);
  });
}

function rawFeatureVector(cover) {
  const palette = cover.palette.slice(0, 3).flatMap((entry) => [
    entry.color[0] / 100,
    entry.color[1] / 128,
    entry.color[2] / 128,
    entry.weight,
  ]);
  return [
    cover.meanColor[0] / 100,
    cover.meanColor[1] / 128,
    cover.meanColor[2] / 128,
    cover.luminance,
    cover.saturation,
    cover.contrast,
    cover.edgeDensity,
    cover.whitespace,
    cover.dark,
    cover.entropy,
    ...cover.saliency,
    ...cover.symmetry,
    ...palette,
    ...cover.grid,
  ];
}

function standardize(vectors) {
  const means = new Float64Array(vectors[0].length);
  const deviations = new Float64Array(vectors[0].length);
  vectors.forEach((vector) => vector.forEach((value, index) => { means[index] += value; }));
  means.forEach((_, index) => { means[index] /= vectors.length; });
  vectors.forEach((vector) => vector.forEach((value, index) => {
    deviations[index] += (value - means[index]) ** 2;
  }));
  deviations.forEach((_, index) => {
    deviations[index] = Math.sqrt(deviations[index] / vectors.length) || 1;
  });
  return vectors.map((vector) => vector.map((value, index) => {
    const weight = index < 14 ? 1.35 : (index < 26 ? 0.82 : 0.42);
    return ((value - means[index]) / deviations[index]) * weight;
  }));
}

function squaredDistance(left, right) {
  let distance = 0;
  for (let index = 0; index < left.length; index += 1) distance += (left[index] - right[index]) ** 2;
  return distance / left.length;
}

function kMeans(vectors, clusterCount, iterations = 28, firstIndex = 0) {
  const centroids = [vectors[firstIndex].slice()];
  while (centroids.length < clusterCount) {
    let farthestIndex = 0;
    let farthestDistance = -1;
    vectors.forEach((vector, index) => {
      const distance = Math.min(...centroids.map((centroid) => squaredDistance(vector, centroid)));
      if (distance > farthestDistance) {
        farthestDistance = distance;
        farthestIndex = index;
      }
    });
    centroids.push(vectors[farthestIndex].slice());
  }

  const assignments = new Int16Array(vectors.length);
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const sums = Array.from({ length: clusterCount }, () => new Float64Array(vectors[0].length));
    const counts = new Uint16Array(clusterCount);
    vectors.forEach((vector, vectorIndex) => {
      let best = 0;
      let bestDistance = Infinity;
      centroids.forEach((centroid, centroidIndex) => {
        const distance = squaredDistance(vector, centroid);
        if (distance < bestDistance) {
          best = centroidIndex;
          bestDistance = distance;
        }
      });
      assignments[vectorIndex] = best;
      counts[best] += 1;
      vector.forEach((value, index) => { sums[best][index] += value; });
    });
    centroids.forEach((centroid, centroidIndex) => {
      if (!counts[centroidIndex]) return;
      centroid.forEach((_, index) => { centroid[index] = sums[centroidIndex][index] / counts[centroidIndex]; });
    });
  }
  return { assignments: [...assignments], centroids };
}

function nearestNeighbourLinks(vectors, coverNodeIndexes, count = 5) {
  const links = [];
  const seen = new Set();
  vectors.forEach((vector, sourceIndex) => {
    const nearest = vectors
      .map((candidate, targetIndex) => ({
        targetIndex,
        distance: sourceIndex === targetIndex ? Infinity : squaredDistance(vector, candidate),
      }))
      .sort((left, right) => left.distance - right.distance)
      .slice(0, count);
    nearest.forEach(({ targetIndex, distance }) => {
      const source = coverNodeIndexes[sourceIndex];
      const target = coverNodeIndexes[targetIndex];
      const key = source < target ? `${source}:${target}` : `${target}:${source}`;
      if (seen.has(key)) return;
      seen.add(key);
      links.push([source, target, round(1 / (1 + distance), 5), 0]);
    });
  });
  return links;
}

async function main() {
  execFileSync('magick', ['-version'], { stdio: 'ignore' });
  const filenames = (await readdir(ARCHIVE_DIRECTORY))
    .filter((filename) => FILE_PATTERN.test(filename))
    .sort((left, right) => left.localeCompare(right));
  if (!filenames.length) throw new Error(`No cover PNGs found in ${ARCHIVE_DIRECTORY}`);

  const files = filenames.map((filename) => path.join(ARCHIVE_DIRECTORY, filename));
  const raw = execFileSync('magick', [
    ...files,
    '-alpha', 'off',
    '-resize', `${SAMPLE_WIDTH}x${SAMPLE_HEIGHT}!`,
    '-colorspace', 'sRGB',
    '-depth', '8',
    '-append',
    'rgb:-',
  ], { encoding: null, maxBuffer: 16 * 1024 * 1024 });
  const expectedLength = filenames.length * SAMPLE_WIDTH * SAMPLE_HEIGHT * 3;
  if (raw.length !== expectedLength) {
    throw new Error(`Unexpected pixel buffer: received ${raw.length}, expected ${expectedLength}`);
  }

  const covers = filenames.map((filename, index) => {
    const [, year, month] = FILE_PATTERN.exec(filename);
    return analyzeCover(raw, index, {
      id: `${year}_${month}`,
      date: `${year}.${month}`,
      year: Number(year),
      month: Number(month),
      imageUrl: `/covers/archive/${filename}`,
    });
  });
  const referenceIndex = covers.findIndex((cover) => cover.id === REFERENCE_ID);
  if (referenceIndex < 0) throw new Error(`Reference cover ${REFERENCE_ID} is missing`);

  ['contrast', 'edgeDensity', 'entropy'].forEach((key) => normalizeScalar(covers, key));
  covers.forEach((cover) => {
    cover.complexity = clamp(
      cover.entropyNormalized * 0.34
      + cover.edgeDensityNormalized * 0.34
      + cover.contrastNormalized * 0.18
      + (1 - cover.whitespace) * 0.14
    );
    const targetCount = cover.complexity < 0.34 ? 4 : (cover.complexity < 0.68 ? 7 : 10);
    cover.regions = splitVisualRegions(raw, cover.coverOffset, targetCount);
  });

  const vectors = standardize(covers.map(rawFeatureVector));
  const visualClusters = kMeans(vectors, VISUAL_CLUSTER_COUNT, 30, referenceIndex);
  const paletteVectors = standardize(covers.map((cover) => [
    cover.meanColor[0] / 100,
    cover.meanColor[1] / 128,
    cover.meanColor[2] / 128,
    cover.saturation,
    cover.luminance,
    cover.contrast,
    cover.whitespace,
  ]));
  const paletteClusters = kMeans(paletteVectors, VISUAL_CLUSTER_COUNT, 24, referenceIndex);

  const nodes = [{
    id: `cover:${REFERENCE_ID}`,
    kind: 'reference',
    cover: REFERENCE_ID,
    date: covers[referenceIndex].date,
    color: covers[referenceIndex].meanColor.map((value) => round(value, 2)),
    weight: 1,
    complexity: round(covers[referenceIndex].complexity),
  }];
  const visualClusterNodeIndexes = [];
  for (let index = 0; index < VISUAL_CLUSTER_COUNT; index += 1) {
    visualClusterNodeIndexes.push(nodes.length);
    nodes.push({ id: `cluster:${index}`, kind: 'cluster', weight: 0.92 });
  }
  const decades = [...new Set(covers.map((cover) => Math.floor(cover.year / 10) * 10))];
  const decadeNodeIndexes = new Map();
  decades.forEach((decade) => {
    decadeNodeIndexes.set(decade, nodes.length);
    nodes.push({ id: `decade:${decade}`, kind: 'decade', weight: 0.86 });
  });

  const coverNodeIndexes = new Array(covers.length);
  coverNodeIndexes[referenceIndex] = 0;
  covers.forEach((cover, index) => {
    if (index === referenceIndex) return;
    coverNodeIndexes[index] = nodes.length;
    nodes.push({
      id: `cover:${cover.id}`,
      kind: 'cover',
      cover: cover.id,
      date: cover.date,
      color: cover.meanColor.map((value) => round(value, 2)),
      weight: round(0.58 + cover.complexity * 0.42),
      complexity: round(cover.complexity),
    });
  });

  const regionNodeIndexes = [];
  covers.forEach((cover, coverIndex) => {
    cover.regions.forEach((region, regionIndex) => {
      const nodeIndex = nodes.length;
      regionNodeIndexes.push({ nodeIndex, coverIndex, region });
      nodes.push({
        id: `region:${cover.id}:${regionIndex}`,
        kind: 'region',
        cover: cover.id,
        color: region.color.map((value) => round(value, 2)),
        weight: round(region.area * (0.72 + region.variance * 4.2)),
        spatial: [round(region.cx), round(region.cy)],
        variance: round(region.variance),
      });
    });
  });

  const createParents = (mode) => {
    const parents = new Int32Array(nodes.length).fill(0);
    parents[0] = -1;
    covers.forEach((cover, coverIndex) => {
      const nodeIndex = coverNodeIndexes[coverIndex];
      if (nodeIndex === 0) return;
      if (mode === 'chronology') {
        parents[nodeIndex] = decadeNodeIndexes.get(Math.floor(cover.year / 10) * 10);
      } else if (mode === 'palette') {
        parents[nodeIndex] = visualClusterNodeIndexes[paletteClusters.assignments[coverIndex]];
      } else {
        parents[nodeIndex] = visualClusterNodeIndexes[visualClusters.assignments[coverIndex]];
      }
    });
    regionNodeIndexes.forEach(({ nodeIndex, coverIndex }) => {
      parents[nodeIndex] = coverNodeIndexes[coverIndex];
    });
    return [...parents];
  };

  const links = nearestNeighbourLinks(vectors, coverNodeIndexes, 5);
  for (let index = 1; index < covers.length; index += 1) {
    links.push([coverNodeIndexes[index - 1], coverNodeIndexes[index], 1, 1]);
  }
  const regionsByColor = new Map();
  regionNodeIndexes.forEach((entry) => {
    const [lightness, a, b] = entry.region.color;
    const key = `${Math.floor(lightness / 25)}:${Math.floor((a + 128) / 64)}:${Math.floor((b + 128) / 64)}`;
    const bucket = regionsByColor.get(key) || [];
    bucket.push(entry);
    regionsByColor.set(key, bucket);
  });
  regionsByColor.forEach((entries) => {
    entries.sort((left, right) => covers[left.coverIndex].date.localeCompare(covers[right.coverIndex].date));
    for (let index = 1; index < entries.length; index += 1) {
      const left = entries[index - 1];
      const right = entries[index];
      if (left.coverIndex === right.coverIndex) continue;
      links.push([left.nodeIndex, right.nodeIndex, 0.72, 2]);
    }
  });

  const compactCovers = covers.map((cover, index) => ({
    id: cover.id,
    date: cover.date,
    imageUrl: cover.imageUrl,
    node: coverNodeIndexes[index],
    visualCluster: visualClusters.assignments[index],
    paletteCluster: paletteClusters.assignments[index],
    features: {
      color: cover.meanColor.map((value) => round(value, 2)),
      luminance: round(cover.luminance),
      saturation: round(cover.saturation),
      contrast: round(cover.contrast),
      edgeDensity: round(cover.edgeDensity),
      whitespace: round(cover.whitespace),
      entropy: round(cover.entropy),
      saliency: cover.saliency.map((value) => round(value)),
      symmetry: cover.symmetry.map((value) => round(value)),
      complexity: round(cover.complexity),
      regionCount: cover.regions.length,
    },
  }));

  const output = {
    version: 1,
    kind: 'cover-archive',
    source: 'Monthly Design cover archive',
    method: 'measured CIELAB palette, composition, contrast, spatial density and adaptive visual regions',
    generatedAt: new Date().toISOString(),
    seed: 200107,
    range: `${covers[0].date}-${covers.at(-1).date}`,
    referenceCover: REFERENCE_ID,
    coverCount: covers.length,
    nodeCount: nodes.length,
    nodes,
    covers: compactCovers,
    links,
    scenes: [
      {
        id: 'visual-genealogy',
        layout: 'communities',
        title: 'VISUAL GENEALOGY',
        method: 'measured palette · composition · spatial density',
        parents: createParents('visual'),
      },
      {
        id: 'cover-chronology',
        layout: 'hierarchy',
        title: '50 YEARS OF COVERS',
        method: '1976–2026 chronology · monthly continuity',
        parents: createParents('chronology'),
      },
      {
        id: 'palette-constellations',
        layout: 'bridges',
        title: 'PALETTE CONSTELLATIONS',
        method: 'CIELAB similarity · contrast · whitespace',
        parents: createParents('palette'),
      },
    ],
  };

  await mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await writeFile(OUTPUT_FILE, `${JSON.stringify(output)}\n`);
  process.stdout.write([
    `Analyzed ${covers.length} covers`,
    `Generated ${nodes.length} measured nodes and ${links.length} non-tree links`,
    `Reference root: ${REFERENCE_ID}`,
    `Output: ${OUTPUT_FILE}`,
  ].join('\n') + '\n');
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});

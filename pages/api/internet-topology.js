const RIPESTAT_BASE = 'https://stat.ripe.net/data';
const CACHE_TTL_MS = 15 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 9000;

const SCENE_SPECS = [
  {
    id: 'orbital',
    layout: 'hierarchy',
    title: 'TRANSIT ORBITS',
    method: 'provider–customer direction · path-power weighted',
    roots: [
      { asn: 3356, label: 'Lumen', role: 'transit' },
      { asn: 1299, label: 'Arelion', role: 'transit' },
    ],
  },
  {
    id: 'cone',
    layout: 'hierarchy',
    title: 'CUSTOMER CONE',
    method: 'outward path direction · depth-weighted reach',
    roots: [
      { asn: 174, label: 'Cogent', role: 'transit' },
      { asn: 2914, label: 'NTT', role: 'transit' },
    ],
  },
  {
    id: 'traces',
    layout: 'bridges',
    title: 'ROUTE TRACES',
    method: 'collector visibility · recurrent path detection',
    roots: [
      { asn: 3333, label: 'RIPE NCC', role: 'regional' },
      { asn: 6939, label: 'Hurricane Electric', role: 'transit' },
    ],
  },
  {
    id: 'communities',
    layout: 'communities',
    title: 'PEERING COMMUNITIES',
    method: 'shared-neighbour overlap · peer visibility',
    roots: [
      { asn: 13335, label: 'Cloudflare', role: 'content' },
      { asn: 15169, label: 'Google', role: 'content' },
    ],
  },
  {
    id: 'medusa',
    layout: 'communities',
    title: 'HYPERGIANT REACH',
    method: 'route visibility · dense peer-neighbour bloom',
    roots: [
      { asn: 16509, label: 'Amazon', role: 'content' },
      { asn: 8075, label: 'Microsoft', role: 'content' },
    ],
  },
  {
    id: 'bridges',
    layout: 'bridges',
    title: 'REGIONAL BRIDGES',
    method: 'cross-cluster recurrence · bridge centrality',
    roots: [
      { asn: 3320, label: 'Deutsche Telekom', role: 'regional' },
      { asn: 4766, label: 'Korea Telecom', role: 'regional' },
      { asn: 37468, label: 'Angola Cables', role: 'regional' },
    ],
  },
];

let topologyCache = null;
let topologyPromise = null;

async function fetchJson(pathname) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${RIPESTAT_BASE}/${pathname}`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`RIPEstat ${response.status}`);
    const payload = await response.json();
    if (payload?.status !== 'ok') throw new Error('RIPEstat returned an unsupported result');
    return payload.data;
  } finally {
    clearTimeout(timeout);
  }
}

function aggregateNeighbours(rootResults) {
  const byAsn = new Map();

  rootResults.forEach(({ root, data }) => {
    const local = new Map();
    for (const neighbour of data.neighbours || []) {
      const asn = Number(neighbour.asn);
      if (!Number.isFinite(asn) || asn === root.asn) continue;
      const entry = local.get(asn) || {
        asn,
        power: 0,
        v4Peers: 0,
        v6Peers: 0,
        types: new Set(),
      };
      entry.power += Math.max(0, Number(neighbour.power) || 0);
      entry.v4Peers += Math.max(0, Number(neighbour.v4_peers) || 0);
      entry.v6Peers += Math.max(0, Number(neighbour.v6_peers) || 0);
      entry.types.add(neighbour.type || 'uncertain');
      local.set(asn, entry);
    }

    for (const neighbour of local.values()) {
      const entry = byAsn.get(neighbour.asn) || {
        asn: neighbour.asn,
        power: 0,
        v4Peers: 0,
        v6Peers: 0,
        types: new Set(),
        roots: new Map(),
      };
      entry.power += neighbour.power;
      entry.v4Peers += neighbour.v4Peers;
      entry.v6Peers += neighbour.v6Peers;
      neighbour.types.forEach((type) => entry.types.add(type));
      entry.roots.set(root.asn, neighbour);
      byAsn.set(neighbour.asn, entry);
    }
  });

  return byAsn;
}

function scoreNeighbour(entry, layout) {
  const rootCount = entry.roots.size;
  const pathPower = Math.log1p(entry.power);
  const peerVisibility = Math.log1p(entry.v4Peers + entry.v6Peers);
  const directional = entry.types.has('left') && entry.types.has('right') ? 1 : 0;

  if (layout === 'hierarchy') {
    const rightBias = entry.types.has('right') ? 2.8 : 0;
    return pathPower * 1.35 + peerVisibility * 0.28 + rightBias + rootCount * 1.6;
  }
  if (layout === 'communities') {
    return rootCount * 7.5 + peerVisibility * 0.82 + pathPower * 0.55 + directional * 2;
  }
  return rootCount * 10 + directional * 5 + pathPower * 0.72 + peerVisibility * 0.42;
}

function selectSceneTopology(spec, rootResults) {
  const aggregate = aggregateNeighbours(rootResults);
  const rootAsns = new Set(spec.roots.map((root) => root.asn));
  const selected = [...aggregate.values()]
    .filter((entry) => !rootAsns.has(entry.asn))
    .sort((a, b) => scoreNeighbour(b, spec.layout) - scoreNeighbour(a, spec.layout))
    .slice(0, spec.layout === 'communities' ? 72 : 60);

  const groupForRoot = (asn) => `as${asn}`;
  const groups = spec.roots.map((root, index) => ({
    id: groupForRoot(root.asn),
    weight: 1.2 - index * 0.08,
  }));
  if (selected.some((entry) => entry.roots.size > 1)) {
    groups.push({ id: 'shared-bridges', weight: 0.92 });
  }

  const anchors = spec.roots.map((root, index) => ({
    ...root,
    group: groupForRoot(root.asn),
    reach: 100 - index * 9,
    observedDegree: rootResults[index]?.data?.neighbour_counts?.unique || 0,
  }));

  for (const entry of selected) {
    const strongestRoot = [...entry.roots.entries()]
      .sort(([, a], [, b]) => (b.power + b.v4Peers + b.v6Peers) - (a.power + a.v4Peers + a.v6Peers))[0];
    const shared = entry.roots.size > 1;
    anchors.push({
      asn: entry.asn,
      label: `AS${entry.asn}`,
      group: shared ? 'shared-bridges' : groupForRoot(strongestRoot?.[0] || spec.roots[0].asn),
      role: shared ? 'bridge' : 'edge',
      reach: Math.max(7, Math.min(62, 8 + scoreNeighbour(entry, spec.layout) * 1.7)),
      observedDegree: entry.roots.size,
    });
  }

  const selectedAsns = new Set(anchors.map((anchor) => anchor.asn));
  const links = [];
  for (const entry of selected) {
    for (const [rootAsn, relation] of entry.roots) {
      if (!selectedAsns.has(rootAsn)) continue;
      links.push({
        source: rootAsn,
        target: entry.asn,
        power: relation.power,
        visibility: relation.v4Peers + relation.v6Peers,
        types: [...relation.types],
      });
    }
  }

  return {
    id: spec.id,
    layout: spec.layout,
    title: spec.title,
    method: spec.method,
    groups,
    anchors,
    links,
    sampledAsnCount: anchors.length,
    observedEdgeCount: links.length,
  };
}

async function buildTopologyPayload() {
  const [countData, sceneResults] = await Promise.all([
    fetchJson('ris-asns/data.json'),
    Promise.all(SCENE_SPECS.map(async (spec) => {
      const rootResults = await Promise.all(spec.roots.map(async (root) => ({
        root,
        data: await fetchJson(`asn-neighbours/data.json?resource=AS${root.asn}`),
      })));
      return { spec, rootResults };
    })),
  ]);

  const queryTimes = sceneResults.flatMap(({ rootResults }) => (
    rootResults.map(({ data }) => data.query_endtime || data.query_starttime).filter(Boolean)
  ));
  const queryTime = queryTimes.sort().at(-1) || countData.query_time || new Date().toISOString();

  return {
    source: 'RIPE NCC RIS',
    sourceUrl: 'https://stat.ripe.net/',
    queryTime,
    fetchedAt: new Date().toISOString(),
    observedAsnCount: Number(countData?.counts?.total) || 0,
    scenes: sceneResults.map(({ spec, rootResults }) => selectSceneTopology(spec, rootResults)),
  };
}

async function getTopologyPayload() {
  const now = Date.now();
  if (topologyCache && now - topologyCache.cachedAt < CACHE_TTL_MS) return topologyCache.payload;
  if (!topologyPromise) {
    topologyPromise = buildTopologyPayload()
      .then((payload) => {
        topologyCache = { cachedAt: Date.now(), payload };
        return payload;
      })
      .finally(() => {
        topologyPromise = null;
      });
  }
  return topologyPromise;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = await getTopologyPayload();
    res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600');
    return res.status(200).json(payload);
  } catch (error) {
    return res.status(503).json({
      error: 'Live Internet topology is temporarily unavailable',
      detail: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
module.exports = (phase) => ({
  reactStrictMode: true,
  experimental: {
    // The Comfy workflow is loaded with fs at runtime. Next.js cannot infer a
    // dynamic path from COMFY_WORKFLOW_FILE, so explicitly include the asset in
    // the Vercel serverless trace for this route.
    outputFileTracingIncludes: {
      '/api/runpod/run': ['./Monthly Design.json'],
    },
  },
  // Keep `next build` from overwriting the manifests used by the running
  // development server. Sharing `.next` caused blank frames and HMR reload
  // loops that made local motion appear different from production.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
});

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
module.exports = (phase) => ({
  reactStrictMode: true,
  // Keep `next build` from overwriting the manifests used by the running
  // development server. Sharing `.next` caused blank frames and HMR reload
  // loops that made local motion appear different from production.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
});

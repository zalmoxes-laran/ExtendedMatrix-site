import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// =============================================================
// PREVIEW vs PRODUCTION configuration
// =============================================================
// While the site is hosted on GitHub Pages without a custom domain,
// it is served from https://zalmoxes-laran.github.io/ExtendedMatrix-site/
// — i.e. inside a sub-path. Astro must know that, otherwise every
// internal link and asset resolves to the wrong place.
//
// When we flip the DNS to extendedmatrix.org:
//   1. set GO_LIVE = true (or just delete the GO_LIVE block)
//   2. restore public/CNAME with `www.extendedmatrix.org`
//   3. set the Custom domain in GitHub Settings → Pages
// =============================================================
const GO_LIVE = false;

export default defineConfig({
  site: GO_LIVE
    ? 'https://www.extendedmatrix.org'
    : 'https://zalmoxes-laran.github.io',
  base: GO_LIVE ? '/' : '/ExtendedMatrix-site',
  integrations: [sitemap()],
  // Default output is static — every page becomes a plain HTML file at build time.
  // No SSR, no Node runtime. The result deploys equally well to GitHub Pages,
  // Cloudflare Pages, Netlify or any static host.
  output: 'static',
  build: {
    // Place built assets under /_astro/ — keeps URLs predictable.
    assets: '_astro',
  },
  vite: {
    // TEMP-FIX-FOR-SCREENSHOTS: writable cache dir outside the mounted
    // host folder. Revert this block before committing.
    cacheDir: process.env.VITE_CACHE_DIR || undefined,
  },
});

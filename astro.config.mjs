import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.extendedmatrix.org',
  integrations: [sitemap()],
  // Default output is static — every page becomes a plain HTML file at build time.
  // No SSR, no Node runtime. The result deploys equally well to GitHub Pages,
  // Cloudflare Pages, Netlify or any static host.
  output: 'static',
  build: {
    // Place built assets under /_astro/ — keeps URLs predictable.
    assets: '_astro',
  },
});

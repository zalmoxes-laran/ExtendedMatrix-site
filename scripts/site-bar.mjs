#!/usr/bin/env node
/**
 * THE STANDARDS PAGES BELONG TO THE SITE.
 *
 * /ontology/, /spec/em-json/, /schemas/ and /vocab/ are generated outside
 * Astro (from s3Dgraphy and from the vocabularies repository) and copied
 * into public/. They already use the brand colours, but they had no way
 * back to the site. After `astro build` this script puts a thin site bar at
 * the top of each of them in dist/: the mark, «Extended Matrix», the path
 * Standards › <page>, and a link back. The generators are not touched, so
 * the next regeneration keeps working; the bar is added again at the next
 * build. Idempotent: a page that already has the bar is left alone.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const ROOTS = [['ontology', 'CRMem ontology'], ['spec', 'em.json'], ['schemas', 'JSON schemas'], ['vocab', 'Vocabularies']];
const MARK = '<svg viewBox="0 0 24 40" width="13" height="22" aria-hidden="true"><path d="M2 2h20M2 38h20" stroke="#fcfcfc" stroke-width="2.4" stroke-linecap="round"/><path d="M4 3c0 8 8 13 8 17s-8 9-8 17M20 3c0 8-8 13-8 17s8 9 8 17" stroke="#fcfcfc" stroke-width="1.8" fill="none"/><path d="M5 37c2-9 9-16 13-27" stroke="#e3b43a" stroke-width="1.8" fill="none"/></svg>';
const bar = (label) => `
<!-- em-site-bar: added by scripts/site-bar.mjs -->
<div class="em-site-bar" role="navigation" aria-label="Extended Matrix site" style="position:relative;z-index:1000;display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding:9px clamp(16px,4vw,28px);background:#073763;color:#fcfcfc;font:500 13px/1.3 Sora,system-ui,sans-serif">
  <a href="/" style="display:inline-flex;align-items:center;gap:8px;color:#fcfcfc;text-decoration:none;font:700 14px Comfortaa,Sora,system-ui,sans-serif">${MARK}Extended Matrix</a>
  <span style="opacity:.55">/</span><a href="/standards/" style="color:#fcfcfc;opacity:.85;text-decoration:none">Standards</a>
  <span style="opacity:.55">/</span><span>${label}</span>
  <span style="flex:1"></span>
  <a href="/download/" style="color:#f1d27c;text-decoration:none;font-weight:600">Download</a>
  <a href="https://docs.extendedmatrix.org" style="color:#fcfcfc;opacity:.85;text-decoration:none">Docs ↗</a>
</div>`;

let n = 0;
for (const [dir, label] of ROOTS) {
  const root = join(DIST, dir);
  if (!existsSync(root)) continue;
  (function walk(d) {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) { walk(p); continue; }
      if (!p.endsWith('.html')) continue;
      const html = readFileSync(p, 'utf8');
      if (html.includes('em-site-bar')) continue;
      const out = html.replace(/<body([^>]*)>/i, (m) => m + bar(label));
      if (out !== html) { writeFileSync(p, out); n++; }
    }
  })(root);
}
console.log(`[site-bar] ${n} pages of the standards linked back to the site`);

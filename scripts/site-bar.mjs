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
const MARK = '<svg viewBox="0 0 140 240" width="16" height="27" aria-hidden="true"><g transform="translate(-54.627,-41.612)"><path fill="#fcfcfc" d="M 114.24805 55.322266 L 114.24805 67.988281 L 266.24805 67.988281 L 418.24805 67.988281 L 418.24805 55.322266 L 114.24805 55.322266 z M 122.04492 97.322266 L 122.50391 112.82227 C 125.35526 208.78581 145.81264 282.58323 190.46289 357.98828 C 198.23048 371.10612 208.92398 387.17871 221.76758 405.20508 L 230.12305 395.125 C 223.45209 385.75205 217.36618 376.98617 213.46484 370.98828 C 168.08335 301.21885 144.60415 233.31858 137.27734 150.65625 C 136.04068 136.70409 134.93517 115.19435 134.92383 104.82227 L 134.91602 97.322266 L 128.48047 97.322266 L 122.04492 97.322266 z M 397.7793 97.322266 L 397.31445 112.48828 C 394.12438 216.83154 369.50435 295.5664 314.4375 377.52734 C 302.83552 394.79563 268.25929 441.7463 266.21094 443.01172 L 257.29102 453.66992 L 257.25977 453.65039 C 257.33925 454.13844 255.04036 457.52641 252.03711 461.32227 C 196.46634 531.55885 165.14166 584.26191 144.98633 641.42969 C 128.39008 688.50253 119.17432 741.63406 117.80273 798.15625 L 117.37109 815.98828 L 130.25 815.98828 L 130.25781 805.15625 C 130.27476 770.70465 135.71127 724.67316 143.86719 689.87305 C 153.98491 646.70238 171.77168 603.50327 196.79688 561.32227 C 204.21492 548.81887 220.09488 525.12112 232.08789 508.65625 C 239.07711 499.06094 262.00568 468.81615 265.4082 464.67383 L 274.69922 453.27734 C 274.6841 453.20704 274.68032 453.15524 274.69922 453.125 C 274.97097 452.68287 278.34178 448.27228 282.18945 443.32227 C 319.30309 395.57587 345.98677 354.48619 363.00977 318.87109 C 393.23544 255.63366 407.42305 192.98826 409.97461 111.48828 L 410.41797 97.322266 L 397.7793 97.322266 z M 295.57031 482.26953 L 286.13867 490.90625 C 293.74127 501.17353 301.60669 511.94926 306.07617 518.32227 C 367.554 605.98327 394.08114 686.67084 397.31445 795.8457 L 397.77344 811.36914 L 409.91406 810.98828 L 409.74219 796.98828 C 409.32829 763.31201 405.68375 729.27362 398.82031 694.98828 C 390.68193 654.33421 375.15586 611.34096 354.76172 572.98828 C 346.70448 557.83608 327.78732 526.60615 316.32031 510.85156 C 307.22231 498.35176 304.54597 494.32305 295.57031 482.26953 z M 111.58008 833.98828 L 111.58008 846.65625 L 263.58008 846.65625 L 415.58008 846.65625 L 415.58008 833.98828 L 111.58008 833.98828 z" transform="matrix(0.26458333,0,0,0.26458333,54.627395,41.611548)"/><path fill="#e3b43a" d="m 76.740899,251.47846 c 0.64354,-24.80844 6.55086,-44.14327 18.49891,-64.41399 4.35447,-7.38765 8.897031,-13.95667 18.455461,-26.68848 2.69082,-3.58417 5.26884,-7.03126 5.72892,-7.66018 2.1456,-2.93302 3.53107,-4.80003 4.6563,-6.36544 1.12522,-1.56541 1.9862,-2.83178 3.09484,-4.5558 5.99608,-9.32436 10.10402,-15.59456 13.42427,-24.65454 3.30786,-9.02619 4.84675,-17.576315 5.79076,-26.931143 0.52815,-5.233824 0.98744,-4.766593 -1.08007,-4.799675 -0.95257,-0.01525 -2.37394,-0.101421 -3.15861,-0.191505 l -1.42669,-0.163792 4.75568,-10.93637 c 3.50162,-8.052468 4.80846,-10.813102 4.95587,-10.468913 0.1101,0.257102 1.58845,5.121017 3.28521,10.808701 1.69676,5.687683 3.19462,10.666885 3.32857,11.06489 0.24279,0.721433 0.24061,0.723223 -0.71282,0.585442 -0.526,-0.07601 -2.04704,-0.171851 -3.3801,-0.212969 l -2.42374,-0.07476 -0.44858,2.966116 c -1.11573,7.377493 -1.97056,14.510338 -3.51605,20.521278 -1.49364,5.80926 -4.31137,13.54151 -6.53316,17.36939 -5.75622,9.91727 -10.81444,18.85112 -22.97961,34.98148 -12.74244,16.89582 -17.933971,24.73086 -23.094261,34.85383 -6.95819,13.6499 -11.12242,27.78227 -12.94146,43.92017 -0.58548,5.19421 -1.02159,10.51201 -1.02159,14.45784 v 2.65273 h -1.70768 -1.70768 z"/></g></svg>'; // the official EM mark, same symbol as the site's Nav
// light/dark switch, shown only on pages whose own style answers to data-theme
// (em.json does; the reader's choice is the site's, same key as the Nav button)
const THEME_BTN = `<button type="button" aria-label="Switch light or dark" title="Light / dark" onclick="(function(){var r=document.documentElement,d=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches,t=d?'light':'dark';r.dataset.theme=t;try{localStorage.setItem('em-theme',t)}catch(e){}})()" style="background:none;border:1px solid rgba(252,252,252,.35);border-radius:999px;width:28px;height:28px;display:inline-grid;place-items:center;cursor:pointer;color:#fcfcfc;padding:0"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor"/></svg></button>`;
const bar = (label, themed) => `
<!-- em-site-bar: added by scripts/site-bar.mjs -->
<div class="em-site-bar" role="navigation" aria-label="Extended Matrix site" style="position:relative;z-index:1000;display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding:9px clamp(16px,4vw,28px);background:#073763;color:#fcfcfc;font:500 13px/1.3 Sora,system-ui,sans-serif">
  <a href="/" style="display:inline-flex;align-items:center;gap:8px;color:#fcfcfc;text-decoration:none;font:700 14px Comfortaa,Sora,system-ui,sans-serif">${MARK}Extended Matrix</a>
  <span style="opacity:.55">/</span><a href="/standards/" style="color:#fcfcfc;opacity:.85;text-decoration:none">Standards</a>
  <span style="opacity:.55">/</span><span>${label}</span>
  <span style="flex:1"></span>
  <a href="https://docs.extendedmatrix.org" style="color:#fcfcfc;opacity:.85;text-decoration:none">Docs ↗</a>${themed ? THEME_BTN : ''}
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
      if (html.includes('<!-- em-site-bar:')) continue; // the marker comment, not the class (a page may style the bar)
      const out = html.replace(/<body([^>]*)>/i, (m) => m + bar(label, /data-theme/.test(html)));
      if (out !== html) { writeFileSync(p, out); n++; }
    }
  })(root);
}
console.log(`[site-bar] ${n} pages of the standards linked back to the site`);

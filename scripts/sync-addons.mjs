#!/usr/bin/env node
// =============================================================
// sync-addons.mjs — mirror the BlenderAddons4CH catalog into this site
// =============================================================
// The CANONICAL source of the Blender add-on catalog is the separate repo
// `BlenderAddons4CH` (data/addons/*.md). This site only RENDERS it, so we copy
// the data in at build time into src/content/blenderAddons/ (a git-ignored
// mirror). Edit the catalog in BlenderAddons4CH, not here.
//
// Runs automatically via the `predev` / `prebuild` npm hooks.
//
// Resolution order for the source:
//   1. $BLENDERADDONS4CH_DIR (explicit override)
//   2. ../BlenderAddons4CH/data/addons (sibling checkout — live local edits)
//   3. vendor/blenderaddons4ch/data/addons (git submodule — CI / fallback)
//
// The submodule (added with `git submodule add … vendor/blenderaddons4ch`) is
// what makes the production build work: GitHub Actions checks it out
// (submodules: recursive) and this script copies from it. Locally the sibling
// checkout wins so your in-progress edits to BlenderAddons4CH show immediately
// without a submodule pointer bump. If no source is found, the existing mirror
// is left untouched and the script exits 0 so the build never hard-fails.
// =============================================================

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEST = join(ROOT, 'src', 'content', 'blenderAddons');

const candidates = [
  process.env.BLENDERADDONS4CH_DIR,
  resolve(ROOT, '..', 'BlenderAddons4CH', 'data', 'addons'), // sibling (live local edits)
  resolve(ROOT, 'vendor', 'blenderaddons4ch', 'data', 'addons'), // git submodule (CI)
].filter(Boolean);

const SRC = candidates.find((p) => existsSync(p));

if (!SRC) {
  console.warn(
    `⚠️  sync-addons: source not found (looked in: ${candidates.join(', ')}). ` +
      `Leaving existing mirror in place.`
  );
  process.exit(0);
}

mkdirSync(DEST, { recursive: true });

// Clean stale mirror files (keep the dir, drop old *.md) so deletions propagate.
for (const f of readdirSync(DEST)) {
  if (f.endsWith('.md')) rmSync(join(DEST, f));
}

let n = 0;
for (const f of readdirSync(SRC)) {
  if (!f.endsWith('.md')) continue;
  writeFileSync(join(DEST, f), readFileSync(join(SRC, f)));
  n++;
}

console.log(`✅ sync-addons: mirrored ${n} entries from ${SRC} → src/content/blenderAddons/`);

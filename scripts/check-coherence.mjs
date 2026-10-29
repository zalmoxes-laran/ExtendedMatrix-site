#!/usr/bin/env node
/**
 * IL SITO CONTROLLA SE STESSO — dopo `astro build`, su dist/.
 *
 * Quattro controlli, tutti su ciò che il pubblico legge davvero:
 *   1. parole da manutentore nel testo visibile («maintainer», «TBD»,
 *      «audit 20…», «un-hides»): sono note per noi, non per chi legge;
 *   2. date «planned» già passate («planned for July 2026» a ottobre);
 *   3. link ai manuali su docs.extendedmatrix.org la cui radice di versione
 *      non si apre (versione nascosta o mai costruita su Read the Docs);
 *   4. numeri di versione EM nel testo che non coincidono con /status.json
 *      quando la frase dice «recommended» o «current».
 *
 * Di default AVVISA e non ferma la build. Con `--strict` un link rotto
 * diventa errore. Si lancia con `npm run check:coherence`.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const STRICT = process.argv.includes('--strict');
if (!existsSync(DIST)) { console.error('[coerenza] manca dist/: lancia prima astro build'); process.exit(0); }

const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(DIST);

const testo = (html) => html
  .replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ');

const MESI = { january: 0, february: 1, march: 2, april: 3, may: 4, june: 5, july: 6, august: 7, september: 8, october: 9, november: 10, december: 11 };
const oggi = new Date();
const avvisi = [], errori = [];
const rtdLinks = new Map();

for (const f of files) {
  if (f.includes(`${DIST}/ontology/`) || f.includes(`${DIST}/spec/`) || f.includes(`${DIST}/vocab/`) || f.includes(`${DIST}/schemas/`)) continue;
  const html = readFileSync(f, 'utf8');
  const t = testo(html);
  const pagina = f.slice(DIST.length).replace(/index\.html$/, '');
  for (const re of [/the maintainer (?:un-)?hides/i, /\bTBD\b/, /\baudit 20\d\d/i, /un-hides?/i, /\bTODO\b/]) {
    const m = re.exec(t);
    if (m) avvisi.push(`${pagina}: parola da manutentore «${m[0]}» … ${t.slice(Math.max(0, m.index - 60), m.index + 60).trim()}`);
  }
  for (const m of t.matchAll(/planned (?:for )?(?:in )?(January|February|March|April|May|June|July|August|September|October|November|December) (20\d\d)/gi)) {
    const d = new Date(+m[2], MESI[m[1].toLowerCase()] + 1, 0);
    if (d < oggi) avvisi.push(`${pagina}: data pianificata già passata «${m[0]}»`);
  }
  for (const m of html.matchAll(/https:\/\/docs\.extendedmatrix\.org\/(?:projects\/([\w-]+)\/)?en\/([\w.-]+)\//g)) {
    const k = `${m[1] ?? 'extendedmatrix'}@${m[2]}`;
    if (!rtdLinks.has(k)) rtdLinks.set(k, new Set());
    rtdLinks.get(k).add(pagina);
  }
}

// 3. ogni radice di manuale citata deve aprirsi (una richiesta per radice)
for (const [k, pagine] of rtdLinks) {
  const [prog, ver] = k.split('@');
  const url = prog === 'extendedmatrix' ? `https://docs.extendedmatrix.org/en/${ver}/` : `https://docs.extendedmatrix.org/projects/${prog}/en/${ver}/`;
  let stato = 0;
  try { stato = (await fetch(url, { redirect: 'follow' })).status; } catch { continue; }   // rete assente: nessun giudizio
  if (stato >= 400) (STRICT ? errori : avvisi).push(`manuale non raggiungibile ${url} (HTTP ${stato}) — da ${[...pagine].slice(0, 3).join(', ')}${pagine.size > 3 ? '…' : ''}`);
}

// 4. «recommended/current … 1.x» contro lo stato pubblicato
if (existsSync(join(DIST, 'status.json'))) {
  const s = JSON.parse(readFileSync(join(DIST, 'status.json'), 'utf8'));
  for (const f of files) {
    const t = testo(readFileSync(f, 'utf8'));
    for (const m of t.matchAll(/(?:recommended|current) (?:line|version|LTS)?\s*(?:is|:)?\s*(?:EM )?(1\.\d+)/gi)) {
      if (m[1] !== s.recommended) avvisi.push(`${f.slice(DIST.length)}: «${m[0]}» ma la raccomandata è ${s.recommended}`);
    }
  }
}

for (const a of avvisi) console.warn(`::warning::[coerenza] ${a}`);
for (const e of errori) console.error(`::error::[coerenza] ${e}`);
console.log(`[coerenza] ${files.length} pagine, ${avvisi.length} avvisi, ${errori.length} errori`);
process.exit(errori.length ? 1 : 0);

/**
 * IL MANIFESTO DELLE VERSIONI — una sola lettura, molte pagine.
 *
 * Perché esiste. Lo stato di una linea EM («raccomandata», «legacy», «in
 * sviluppo») e i numeri dei suoi componenti erano scritti in più posti:
 * il frontmatter di ogni versione, la pagina Download, la home, la
 * navigazione. Qui si calcolano UNA volta per build e tutte le pagine
 * leggono da `manifesto()`. Lo stesso oggetto esce pubblico in
 * `/status.json`, che leggono il banner dei manuali e EMStudio.
 *
 * Lo stato si CALCOLA dalle date, non si scrive:
 *   - senza `releaseDate`                         → dev
 *   - con `eolDate` già passata, o senza `eolDate` → archived
 *   - tra le linee rilasciate e ancora supportate,
 *     la più recente                              → recommended
 *   - le altre ancora supportate                  → legacy
 * Così il giorno in cui 1.6 esce e 1.5 diventa legacy non c'è niente da
 * ricordarsi di cambiare: basta la data di rilascio di 1.6.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { risolviVersioni, versioneMostrata, descriviFonte } from './upstream';

export type Stato = 'recommended' | 'legacy' | 'dev' | 'archived';
export const ETICHETTA: Record<Stato, string> = {
  recommended: 'Recommended · LTS',
  legacy: 'Legacy LTS',
  dev: 'In development',
  archived: 'Archived',
};

export interface Componente {
  slug: string; name: string; role: string; summary: string;
  roles: string[]; core: boolean;
  version: string | null; source: string | null; dev: boolean;
  action: 'download' | 'install' | 'open' | 'pip' | 'app' | 'none';
  status: string; note?: string; downloadUrl?: string; docsUrl?: string; repoUrl?: string;
}
export interface Linea {
  version: string; slug: string; title: string; state: Stato; label: string;
  summary: string; releaseDate?: string; eolDate?: string;
  blenderMin?: string; blenderTested: string[]; blenderLts?: string;
  usesYed: boolean; yed?: string; docsUrl?: string; changelogUrl?: string;
  components: Componente[];
}
export interface Manifesto { built: string; lines: Linea[]; recommended?: Linea; dev?: Linea }

const iso = (d?: Date) => (d ? d.toISOString().slice(0, 10) : undefined);
const CORE = new Set(['yed-palette', 'source-list-xlsx', 'folder-tree']);

export function statoDi(v: CollectionEntry<'versions'>, tutte: CollectionEntry<'versions'>[], oggi = new Date()): Stato {
  const d = v.data;
  if (!d.releaseDate) return 'dev';
  if (!d.eolDate || d.eolDate < oggi) return 'archived';
  const vive = tutte.filter((x) => x.data.releaseDate && x.data.eolDate && x.data.eolDate >= oggi && x.data.releaseDate <= oggi);
  const piuRecente = vive.sort((a, b) => b.data.releaseDate!.valueOf() - a.data.releaseDate!.valueOf())[0];
  return piuRecente?.id === v.id ? 'recommended' : 'legacy';
}

let memo: Promise<Manifesto> | null = null;
export function manifesto(): Promise<Manifesto> {
  if (!memo) memo = costruisci();
  return memo;
}

async function costruisci(): Promise<Manifesto> {
  const versioni = (await getCollection('versions')).sort((a, b) => (b.data.order ?? 0) - (a.data.order ?? 0));
  const tools = await getCollection('tools');
  const perSlug = new Map(tools.map((t) => [t.id.replace(/\.md$/, ''), t]));
  const tuttiComp = versioni.flatMap((v) => v.data.tools);
  const risolte = await risolviVersioni(tuttiComp);

  const lines: Linea[] = versioni.map((v) => {
    const d = v.data;
    const state = statoDi(v, versioni);
    const components: Componente[] = d.tools
      .filter((c) => c.status !== 'removed')
      .map((c) => {
        const t = perSlug.get(c.slug);
        const raw = c.version;
        const shown = raw ? versioneMostrata(raw, risolte) : null;
        const paired = !!raw && !/^tbd$/i.test(raw.trim()) && shown !== '—';
        const isPip = c.slug === 's3dgraphy';
        const isApp = c.slug === 'emstudio';
        return {
          slug: c.slug,
          name: t?.data.name ?? c.slug,
          role: t?.data.role ?? '',
          summary: t?.data.summary ?? '',
          roles: t?.data.roles ?? [],
          core: CORE.has(c.slug),
          version: paired ? shown : null,
          source: descriviFonte(raw),
          dev: paired && /dev|rc|a\d|b\d/i.test(String(shown)),
          action: !paired ? 'none' : isPip ? 'pip' : isApp ? 'app' : c.action,
          status: c.status,
          note: c.note,
          downloadUrl: c.downloadUrl ?? t?.data.downloadUrl,
          docsUrl: c.docsUrl ?? t?.data.docsUrl,
          repoUrl: t?.data.repoUrl,
        } satisfies Componente;
      });
    return {
      version: d.version, slug: v.id.replace(/\.md$/, ''), title: d.title, state, label: ETICHETTA[state],
      summary: d.summary, releaseDate: iso(d.releaseDate), eolDate: iso(d.eolDate),
      blenderMin: d.blenderMin, blenderTested: d.blenderTested, blenderLts: d.blenderLts,
      usesYed: d.usesYed, yed: d.usesYed ? d.yedRequirement : undefined,
      docsUrl: d.docsUrl, changelogUrl: d.changelogUrl, components,
    };
  });
  return {
    built: new Date().toISOString(),
    lines,
    recommended: lines.find((l) => l.state === 'recommended'),
    dev: lines.find((l) => l.state === 'dev'),
  };
}

/** «May 2026» da una data ISO. */
export function meseAnno(iso?: string): string {
  if (!iso) return '';
  const [y, m] = iso.split('-');
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+m - 1] + ' ' + y;
}

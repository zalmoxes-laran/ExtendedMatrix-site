/**
 * Le versioni pubblicate, LETTE dalle fonti invece che battute a mano.
 *
 * Perché esiste. La tabella dei componenti in `src/content/versions/*.md`
 * portava quattro numeri scritti a mano contro quattro upstream che si
 * muovono da soli, e il 16-09-2026 erano tutti vecchi: em_tools diceva
 * `1.6.0-dev.6` con un `dev.9` pubblicato e si autodefiniva «latest dev
 * cut», s3dgraphy diceva `1.6.0.dev9` con un `dev18` su PyPI — e la sua
 * nota dava un `pip install` PINNATO a quel numero, cioè istruzioni
 * sbagliate e non solo un'etichetta vecchia — ed EMStudio diceva
 * `v1.6.0-dev.3` con un `dev.10` pubblicato.
 *
 * Nessuno di quei numeri era sbagliato il giorno in cui è stato scritto.
 * È il punto: una cifra copiata accanto a un'infrastruttura che la sa
 * calcolare invecchia in silenzio, e il sito si mette a contraddire sé
 * stesso senza che nessun controllo diventi rosso.
 *
 * QUANDO si aggiorna. A build time, quindi il sito è vecchio quanto la
 * sua ultima costruzione. `fetch-visits.yml` ne lancia una ogni giorno
 * alle 06:00 UTC (ma solo se i dati delle visite sono cambiati, quindi
 * non è una garanzia). Per allinearlo SUBITO dopo una pubblicazione, il
 * workflow che pubblica chiama `build.yml` del repo del sito, che ha già
 * `workflow_dispatch`.
 *
 * IN LOCALE DEGRADA, IN CI SI FERMA. Il 13-10-2026 la build delle 06:46Z
 * ha pubblicato /tools/emstudio/ SENZA download — nemmeno quello della
 * versione prima — perché GitHub aveva risposto non-2xx a una build senza
 * credenziali e `json()` lo trasformava in un `null` muto. La pagina vuota
 * è andata online e nessun controllo è diventato rosso.
 *
 * Ora ogni lettura che fallisce lo SCRIVE nel log con l'URL, lo stato HTTP
 * e la ragione (limite esaurito, 404, rete…). In locale resta un avviso e
 * chi chiama mostra ciò che ha; in CI (`CI=true`, che Actions imposta da
 * sé) la build fallisce, così il sito pubblicato resta quello di prima
 * invece di essere sostituito da uno peggiore.
 */

export interface GhAsset { name: string; url: string; size: number }
export interface GhRelease { tag: string; version: string; assets: GhAsset[]; url: string }

/** Il repo di EMStudio, in un posto solo: componente, tabella e link. */
export const EMSTUDIO_REPO = 'ExtendedMatrix/EMStudio';
export const EMSTUDIO_RELEASES_URL = `https://github.com/${EMSTUDIO_REPO}/releases`;

/** Una fonte non letta: avviso in locale, errore che ferma la build in CI. */
export function segnalaFonte(msg: string): void {
  const testo = `[upstream] ${msg}`;
  if (process.env.CI) throw new Error(`${testo}\n(in CI una fonte non letta ferma la build: meglio il sito di ieri che una pagina vuota)`);
  console.warn(`${testo} — in locale si continua con il ramo di riserva`);
}

// Una lettura per URL e per build: ogni pagina /tools/* e /versions/* risolve
// la stessa tabella, e senza memoria la stessa release si chiederebbe a
// GitHub decine di volte — consumando proprio il limite che la fa fallire.
const letture = new Map<string, Promise<any | null>>();

function json(url: string, init?: RequestInit): Promise<any | null> {
  if (!letture.has(url)) letture.set(url, leggi(url, init));
  return letture.get(url)!;
}

async function leggi(url: string, init?: RequestInit): Promise<any | null> {
  let r: Response;
  try {
    r = await fetch(url, init);
  } catch (e: any) {
    segnalaFonte(`GET ${url} → errore di rete: ${e?.cause?.code ?? e?.message ?? e}`);
    return null;
  }
  if (r.ok) return await r.json();
  // La ragione: GitHub la scrive in `message` e segnala il limite con
  // `x-ratelimit-remaining: 0`; per gli altri basta lo stato.
  let ragione = r.statusText;
  try { ragione = (await r.json())?.message ?? ragione; } catch { /* corpo non JSON */ }
  if (r.headers.get('x-ratelimit-remaining') === '0') {
    const reset = Number(r.headers.get('x-ratelimit-reset'));
    ragione = `limite di richieste esaurito${reset ? ` (riparte alle ${new Date(reset * 1000).toISOString()})` : ''} — ${ragione}`;
  }
  segnalaFonte(`GET ${url} → HTTP ${r.status}: ${ragione}`);
  return null;
}

/** La versione più alta di un pacchetto nell'indice di un repo Blender. */
export async function blenderRepoVersion(
  id: string, channel: 'stable' | 'dev' = 'dev',
): Promise<string | null> {
  const base = 'https://blender.extendedmatrix.org';
  const idx = await json(channel === 'dev' ? `${base}/dev/index.json` : `${base}/index.json`);
  const vs = (idx?.data ?? []).filter((e: any) => e.id === id).map((e: any) => String(e.version));
  return vs.length ? vs.sort(comparePep440).at(-1)! : null;
}

/**
 * ORDINAMENTO PEP 440, e non alfabetico.
 *
 * Non è pedanteria: alfabeticamente `1.6.0.dev9` viene DOPO `1.6.0.dev18`,
 * perché '9' > '1'. È un errore che si fa una volta sola e costa una
 * conclusione sbagliata — qui l'ultima versione diventerebbe la nona
 * invece della diciottesima, e il sito annuncerebbe una release vecchia
 * con l'aria di essere aggiornato.
 */
export function comparePep440(a: string, b: string): number {
  const parse = (v: string) => {
    const m = /^v?(\d+)\.(\d+)\.(\d+)(?:[.-]?(?:dev|rc|a|b)\.?(\d+))?/.exec(v);
    if (!m) return [0, 0, 0, Number.MAX_SAFE_INTEGER];
    const pre = m[4] === undefined ? Number.MAX_SAFE_INTEGER : Number(m[4]);
    return [Number(m[1]), Number(m[2]), Number(m[3]), pre];
  };
  const [x, y] = [parse(a), parse(b)];
  for (let i = 0; i < 4; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return 0;
}

/** L'ultima versione di un pacchetto su PyPI, opzionalmente su una linea. */
export async function pypiVersion(pkg: string, line?: string): Promise<string | null> {
  const d = await json(`https://pypi.org/pypi/${pkg}/json`);
  if (!d) return null;
  let vs = Object.keys(d.releases ?? {}).filter((v) => (d.releases[v] ?? []).length);
  if (line) vs = vs.filter((v) => v.startsWith(line));
  return vs.length ? vs.sort(comparePep440).at(-1)! : null;
}

/**
 * L'ultima release NON bozza di un repo GitHub, con i suoi asset.
 *
 * Le bozze si escludono per un motivo misurato: la `v1.6.0-dev.9` di
 * EMStudio è rimasta bozza perché tre build su quattro erano fallite e il
 * job `publish` non è mai partito. Una bozza non ha asset scaricabili, e
 * indicarla darebbe un bottone che porta a una pagina vuota.
 */
export async function latestGithubRelease(repo: string): Promise<GhRelease | null> {
  // In Actions `build.yml` passa GITHUB_TOKEN e il limite sale da 60 a 1000
  // richieste l'ora; senza, i 60 sono per indirizzo e condivisi fra i
  // runner, ed è così che il 13-10-2026 la lettura è fallita. In locale le
  // poche chiamate stanno dentro i 60.
  const token = process.env.GITHUB_TOKEN;
  const rels = await json(`https://api.github.com/repos/${repo}/releases?per_page=20`, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!Array.isArray(rels)) return null;   // già segnalato da json()
  const live = rels.filter((r: any) => !r.draft);
  if (!live.length) {
    segnalaFonte(`${repo}: nessuna release pubblicata (solo bozze o nessuna)`);
    return null;
  }
  live.sort((a: any, b: any) => comparePep440(a.tag_name, b.tag_name));
  const r = live.at(-1);
  return {
    tag: r.tag_name,
    version: String(r.tag_name).replace(/^v/, ''),
    url: r.html_url,
    assets: (r.assets ?? []).map((a: any) => ({
      name: a.name, url: a.browser_download_url, size: a.size,
    })),
  };
}

/**
 * Le fonti che una riga `components[].version: "auto:<chiave>"` può citare.
 *
 * Tenerle qui e non in una pagina è deliberato: la stessa tabella si rende
 * in DUE posti — la riga-CTA di /versions/<x>/ e la tabella di
 * /tools/<slug>/ — e due risolutori che leggono la stessa cosa in due modi
 * sono due numeri che prima o poi divergono, cioè il difetto di partenza
 * con un passaggio in più.
 */
export const FONTI_VERSIONE: Record<string, () => Promise<string | null>> = {
  'em-tools-dev':  () => blenderRepoVersion('em_tools', 'dev'),
  'em-tools':      () => blenderRepoVersion('em_tools', 'stable'),
  'dsc-tools-dev': () => blenderRepoVersion('dsc_tools', 'dev'),
  's3dgraphy-dev': () => pypiVersion('s3dgraphy', '1.6.0.dev'),
  's3dgraphy':     () => pypiVersion('s3dgraphy'),
  'emstudio':      () => latestGithubRelease(EMSTUDIO_REPO).then((r) => r?.version ?? null),
};

/** Legge una volta sola ogni fonte citata da un elenco di componenti. */
export async function risolviVersioni(
  componenti: ReadonlyArray<{ version?: unknown }> = [],
): Promise<Map<string, string | null>> {
  const chiavi = new Set<string>();
  for (const c of componenti) {
    const m = /^auto:(.+)$/.exec(String(c?.version ?? ''));
    if (m && FONTI_VERSIONE[m[1]]) chiavi.add(m[1]);
  }
  const coppie = await Promise.all(
    [...chiavi].map(async (k) => [k, await FONTI_VERSIONE[k]()] as const));
  return new Map(coppie);
}

/**
 * Il valore da mostrare. Quando la lettura fallisce NON inventa e NON tiene
 * l'ultimo numero conosciuto: mostra `—`, perché un trattino si legge come
 * «non lo so» mentre un numero vecchio si legge come un fatto.
 */
export function versioneMostrata(v: unknown, risolte: Map<string, string | null>): string {
  const m = /^auto:(.+)$/.exec(String(v ?? ''));
  if (!m) return String(v ?? '—');
  return risolte.get(m[1]) ?? '—';
}

/** Sostituisce `{version}` in una nota, così la prosa non ripete il numero. */
export function notaConVersione(
  nota: string, v: unknown, risolte: Map<string, string | null>,
): string {
  return String(nota ?? '').replaceAll('{version}', versioneMostrata(v, risolte));
}

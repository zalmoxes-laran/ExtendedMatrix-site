/**
 * /status.json — lo stato delle linee EM, letto dal manifesto.
 * Lo leggono il banner dei manuali su Read the Docs (public/status-banner.js)
 * e la schermata «Novità» di EMStudio: nessuno dei due ripete a mano
 * quale sia la linea raccomandata.
 */
import type { APIRoute } from 'astro';
import { manifesto } from '../lib/releases';

export const GET: APIRoute = async () => {
  const m = await manifesto();
  const body = {
    schema: 'https://www.extendedmatrix.org/status.json#v1',
    built: m.built,
    recommended: m.recommended?.version ?? null,
    development: m.dev?.version ?? null,
    lines: m.lines.map((l) => ({
      version: l.version,
      state: l.state,
      label: l.label,
      released: l.releaseDate ?? null,
      supportedUntil: l.eolDate ?? null,
      blender: { min: l.blenderMin ?? null, tested: l.blenderTested, lts: l.blenderLts ?? null },
      page: `https://www.extendedmatrix.org/versions/${l.slug}/`,
      components: Object.fromEntries(l.components.map((c) => [c.slug, { version: c.version, source: c.source }])),
    })),
  };
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json' } });
};

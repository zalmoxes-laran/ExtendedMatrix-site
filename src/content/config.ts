/**
 * Content collections — the schema that protects the site from broken posts.
 *
 * Each collection defines the *shape* of the markdown frontmatter that members
 * of the team must fill in. If a required field is missing, or has the wrong
 * type, the build fails with a readable error pointing at the file. This means
 * the team can author content freely without ever breaking production.
 *
 * To add a new collection, define it below and add it to `collections`.
 */
import { defineCollection, z } from 'astro:content';

const news = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      excerpt: z.string().max(280),
      tags: z.array(z.string()).default([]),
      author: z.string().default('Extended Matrix team'),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number().optional(),  // primary chronological order
      period: z.string().optional(), // human-readable period if multi-year
      partners: z.array(z.string()).default([]),
      cover: image().optional(),    // local image (preferred)
      coverUrl: z.string().url().optional(), // remote URL (fallback while images are migrated)
      coverAlt: z.string().optional(),
      location: z.string().optional(),
      summary: z.string().max(320),
      website: z.string().url().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      draft: z.boolean().default(false),
      // homepageImages — editor-curated list of gallery images surfaced in
      // the homepage carousel (the "EM in practice" strip under the
      // vocabulary diagram). Each entry is a path RELATIVE TO
      // `src/assets/projects/` — e.g. `"villa-of-aiano/unnamed.jpg"`
      // resolves to `src/assets/projects/villa-of-aiano/unnamed.jpg`. If
      // omitted or empty the project's `cover` is used as a single fallback
      // tile. See `src/content/projects/README.md` for guidance on picking
      // good carousel images.
      homepageImages: z.array(z.string()).default([]),
    }),
});

const team = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      affiliation: z.string(),
      bio: z.string().optional(),
      avatar: image().optional(),
      orcid: z.string().optional(),
      email: z.string().email().optional(),
      order: z.number().default(0),
    }),
});

/**
 * Partners — institutions, projects, companies that USE, CONTRIBUTE TO, or
 * FUND Extended Matrix. Drives the "Used by" strip on the homepage and the
 * full grid on /community.
 *
 * To add a partner, drop a `<slug>.yaml` file (or .md without body) in
 * src/content/partners/ with the fields below. Logos go in
 * src/assets/partners/<slug>.svg (preferred) or .png.
 */
const partners = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      kind: z.enum(['university', 'research-institute', 'company', 'eu-project', 'national-project', 'cultural-institution']),
      relation: z.enum(['uses', 'contributes', 'funds', 'collaborates', 'orchestrates']).default('uses'),
      // Optional human-readable activity window for the partner (e.g.
      // "2019–2022" for a finished EU project, "2025–2029" for an active
      // one). Surfaces next to the partner name on the about page.
      timeline: z.string().optional(),
      // Optional short note shown below the partner name on the about
      // page. Use it to clarify how the partner relates to EM (e.g.
      // "Funded EM development; produced project Deliverables.").
      note: z.string().optional(),
      logo: image().optional(),
      logoAlt: z.string().optional(),
      url: z.string().url().optional(),
      country: z.string().optional(),
      order: z.number().default(0),
    }),
});

/**
 * EM Hour — the recurring community happy hour. Each session gets a single
 * markdown file with notes, slides link, video link, and a one-paragraph
 * summary. Future sessions can be added with `upcoming: true` and a date.
 */
const emHour = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      duration: z.string().default('60 min'),
      host: z.string().default('Emanuel Demetrescu'),
      guests: z.array(z.string()).default([]),
      videoUrl: z.string().url().optional(),
      slidesUrl: z.string().url().optional(),
      meetingUrl: z.string().url().optional(),
      summary: z.string().max(400),
      upcoming: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
    }),
});

/**
 * Development meetings — internal-but-public coordination sessions where the
 * core devs and active contributors decide directions. Notes-first format,
 * per blender.org practice. Helps prevent fork-waves by making decisions
 * visible early.
 */
const devMeetings = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      attendees: z.array(z.string()).default([]),
      decisions: z.array(z.string()).default([]),
      actionItems: z.array(z.string()).default([]),
      videoUrl: z.string().url().optional(),
      meetingUrl: z.string().url().optional(),
      upcoming: z.boolean().default(false),
      // One-sentence TL;DR shown at the top of the meeting page,
      // blender.org-module-meeting style. Keep it under a sentence —
      // anything longer belongs in the body.
      tldr: z.string().max(280).optional(),
      // The date of the next scheduled meeting. When set, the
      // meeting page renders a "Next meeting: <date>" pointer at the
      // bottom; the date is also surfaced on the /community list so
      // readers can subscribe even without reading the body.
      nextMeeting: z.coerce.date().optional(),
      // Optional link to a GitHub Discussions thread used for async
      // agenda gathering before the meeting and follow-up after.
      // Lives under the "Meeting Notes" category on the
      // ExtendedMatrix-dev-site repo.
      discussionUrl: z.string().url().optional(),
    }),
});

/**
 * Showcase slides — image + caption pairs used by the homepage hero
 * slideshow and the /showcase page. Drop a high-res image in
 * src/assets/showcase/<slug>.jpg and reference it here.
 */
const showcase = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      imageAlt: z.string(),
      caption: z.string().max(160).optional(),
      project: z.string().optional(), // optional link to a project slug
      featured: z.boolean().default(false),
      order: z.number().default(0),
    }),
});

/**
 * Versions — one entry per major EM release (1.0, 1.2, 1.3, 1.4, 1.5, ...).
 * Each version page declares its support status, the Blender / yEd
 * combinations it has been tested with, the addon release URL, and any
 * LTS commitment.
 */
const versions = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      version: z.string(),                  // "1.5"
      title: z.string(),                    // "EM 1.5 — Development snapshot"
      status: z.enum([
        'development',
        'stable',
        'lts',
        'legacy',
        'eol',
      ]),
      // Preference flag — when multiple versions share a stable/LTS status
      // (e.g. an outgoing LTS still supported alongside the new LTS),
      // mark the one that should be presented as the default starting point
      // for new projects. The download chooser and versions index use this
      // to drive a "Start here" badge / accent. At most one version should
      // carry `is_preferred: true` at any time. Optional, defaults to false
      // so existing version files keep building unchanged.
      is_preferred: z.boolean().default(false),
      releaseDate: z.coerce.date().optional(),
      eolDate: z.coerce.date().optional(),
      blenderMin: z.string().optional(),    // "4.4"
      blenderTested: z.array(z.string()).default([]),
      blenderLts: z.string().optional(),    // "4.3" — only when status==='lts'
      yedRequirement: z.string().default('yEd 3.21 or later'),
      // Direct download URLs for the *prerequisites* of this version
      blenderDownloadUrl: z.string().url().optional(),
      yedDownloadUrl: z.string().url().default('https://www.yworks.com/products/yed/download'),
      paletteUrl: z.string().url().optional(),
      addonReleaseUrl: z.string().url().optional(),
      changelogUrl: z.string().url().optional(),
      docsUrl: z.string().url().optional(),
      // Core formal language — the "soul" of the release
      languageFeatures: z.array(z.string()).default([]),
      languagePaperUrl: z.string().url().optional(), // legacy single-URL pointer
      // Flag paper: the canonical scientific reference for THIS release.
      // Cumulative-citation rule: the foundation paper (1.0) is always cited;
      // every later release additionally cites its own flag paper. The
      // /cite page assembles this list from the active version + 1.0.
      flagPaper: z
        .object({
          authors: z.string(),                  // "Demetrescu, E."
          year: z.number(),                     // 2015
          title: z.string(),                    // full paper title
          venue: z.string().optional(),         // journal / conference
          doi: z.string().optional(),
          url: z.string().url().optional(),
          bibtex: z.string().optional(),        // raw BibTeX block
          note: z.string().optional(),          // contextual note
          isFoundation: z.boolean().default(false), // true only for 1.0
        })
        .optional(),
      summary: z.string().max(400),
      supersededBy: z.string().optional(),  // version slug
      tools: z
        .array(
          z.object({
            slug: z.string(), // ref to a tools collection entry
            version: z.string().optional(),
            status: z.enum(['included', 'optional', 'deprecated', 'removed']).default('included'),
            // Direct download for THIS tool in THIS EM version.
            // Accepts either an absolute URL (https://…) or a root-relative
            // path (e.g. "/tools/em-tools/#download") that points to an
            // on-site picker/landing page. Root-relative values are
            // base-prefixed at render time so they work under the
            // /ExtendedMatrix-site/ preview path as well as on the bare
            // production domain.
            downloadUrl: z
              .string()
              .refine(
                (v) => /^(https?:|mailto:|tel:)/i.test(v) || v.startsWith('/'),
                { message: 'downloadUrl must be an absolute URL (https://…) or a root-relative path (/…)' }
              )
              .optional(),
            note: z.string().optional(),
          })
        )
        .default([]),
      installSteps: z.array(z.string()).default([]),
      // Image-ready media slot index — editor-facing metadata listing
      // the figure placeholders used inside the body of this version
      // page. The body itself uses inline `<figure class="emfig
      // emfig--placeholder" data-slot="...">` markers (rendered as
      // dashed cards by the [...slug].astro page styles). When real
      // images are ready, the editor populates `src` here and replaces
      // the inline placeholder with `<figure class="emfig">…</figure>`.
      // Slot names should be unique within a version page. The page
      // template does not auto-render this array — it is metadata only.
      media: z
        .array(
          z.object({
            slot: z.string(),                       // unique slot id, e.g. "overture"
            alt: z.string(),                        // mandatory alt text
            caption: z.string().optional(),         // figcaption
            src: z.string().default(''),            // empty until image is ready
            credit: z.string().optional(),          // optional photo / render credit
          })
        )
        .default([]),
      order: z.number().default(0),
    }),
});

/**
 * Tools — one entry per component of the EM Framework (EMF).
 * Surfaces on /tools and /tools/<slug>; also driven by the homepage
 * "Framework" grid.
 */
const tools = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      name: z.string(),                    // "EM Tools"
      role: z.string(),                    // "Blender add-on"
      summary: z.string().max(280),
      icon: image().optional(),
      docsUrl: z.string().url().optional(),
      repoUrl: z.string().url().optional(),
      downloadUrl: z.string().url().optional(),
      // Bundled artifact served from /public/templates/ (e.g. an empty XLSX
      // template). When set, the tool page renders an extra "Download
      // template" button that resolves to ${BASE_URL}/templates/<file>,
      // base-aware across dev / GitHub Pages / production domain.
      templateFile: z.string().optional(),
      licence: z.string().default('GPL-3.0'),
      status: z.enum(['stable', 'beta', 'alpha', 'planned']).default('stable'),
      // Roles a tool serves — drives badges on the tools page and the
      // version pages, and the cross-references on /start.
      roles: z.array(z.enum(['archaeologist', 'modeller', 'developer'])).default([]),
      order: z.number().default(0),
    }),
});

/**
 * Events — non-recurring gatherings (EM Conference, EM Bazaar, talks at
 * external conferences, workshops). Distinct from emHour and devMeetings,
 * which are recurring meetings.
 */
const events = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      kind: z.enum(['conference', 'bazaar', 'workshop', 'talk']),
      audience: z.enum(['users', 'developers', 'mixed']).default('mixed'),
      location: z.string().optional(),
      duration: z.string().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      summary: z.string().max(360),
      videoPlaylist: z.string().url().optional(),
      videos: z
        .array(
          z.object({
            title: z.string(),
            url: z.string().url(),
            speaker: z.string().optional(),
          })
        )
        .default([]),
      slidesUrl: z.string().url().optional(),
      programmeUrl: z.string().url().optional(),
      order: z.number().default(0),
    }),
});

/**
 * Publications — the bibliographic record of the EM ecosystem.
 *
 * Five kinds of entry live here, distinguished by the `kind` field. The
 * /publications page renders one section per kind, in this order:
 *
 *   1. **foundational** — papers that *define* Extended Matrix (the
 *      formal language, the framework, the method, extensions to it).
 *      Typically authored by the core team. The 2015 JAS paper is the
 *      archetype.
 *
 *   2. **tools** — papers about the EM software ecosystem (EM Tools, EM
 *      Manager, EMviq, Aton+EM integration, interop work). These don't
 *      define EM the language, they extend its ecosystem.
 *
 *   3. **software** — citable software releases on Zenodo (DOI-bearing
 *      archives of EM Tools, s3dgraphy, EM Manager). Distinct from
 *      tools papers in that there is no peer-reviewed paper — just a
 *      software citation.
 *
 *   4. **application** — papers from the community that *use* EM on a
 *      specific case study or project. They demonstrate the method in
 *      practice and grow the citable footprint of the framework.
 *
 *   5. **thesis** — PhD, master and bachelor theses where EM is the
 *      methodological backbone. Useful for students looking for prior
 *      art and for tracking who's working with EM in academic training.
 *
 * The /cite page is unchanged and remains the operational "which papers
 * should I cite when using EM" guide; it pulls from
 * versions[].flagPaper. Foundational entries here and flag papers there
 * can overlap — that's fine, the two pages serve different purposes.
 *
 * To add a publication, drop a markdown file in
 * src/content/publications/<year>-<slug>.md with the frontmatter below.
 * The body, if any, becomes the abstract/summary block on the page.
 */
const publications = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      authors: z.string(),                  // "Demetrescu, E.; Cocca, E."
      year: z.number(),
      venue: z.string().optional(),         // "Journal of Archaeological Science, 57, 42–55"
      doi: z.string().optional(),
      url: z.string().url().optional(),     // fallback when no DOI
      pdfUrl: z.string().url().optional(),  // open-access PDF if separate
      bibtex: z.string().optional(),        // raw BibTeX block, no fences
      // foundational = define EM | tools = software-ecosystem papers
      // application = community case studies | software = Zenodo DOIs
      // thesis = PhD/Master/Bachelor theses
      kind: z.enum(['foundational', 'tools', 'application', 'software', 'thesis']),
      // EM version used or attached to. Free text so authors can say
      // "1.4 LTS" or "1.5-dev" without us needing to keep a registry.
      emVersion: z.string().optional(),
      // Marks an entry as the *flag paper* of the EM version named in
      // `emVersion`. Driven by the cumulative-citation rule on /cite:
      // each release line has at most one flag paper that you cite when
      // you use features it introduced. Surfaces as a dedicated "Version
      // flag" chip on the publications page. Always pair `versionFlag:
      // true` with an explicit `emVersion` value.
      versionFlag: z.boolean().default(false),
      // Optional link to a project in the projects collection. Use the
      // project's slug (file basename without .md). Surfaces a small
      // "Project: <name>" pill on the publication card.
      project: z.string().optional(),
      // Optional short tagline that appears under the title on the card.
      // If absent, the body's first paragraph is used as fallback.
      tagline: z.string().max(280).optional(),
      // Thesis-only fields. Ignored unless kind === 'thesis'.
      degreeLevel: z.enum(['phd', 'master', 'bachelor']).optional(),
      institution: z.string().optional(),   // "Università degli Studi di Padova"
      advisor: z.string().optional(),       // "Prof. M. Surname"
      featured: z.boolean().default(false), // highlight on the page
      order: z.number().default(0),         // tie-breaker within a year
      draft: z.boolean().default(false),
    }),
});

/**
 * Blender add-ons catalog (BlenderAddons4CH) — a curated catalog of THIRD-PARTY
 * Blender add-ons (and a few standalone companions) useful in Cultural Heritage
 * 3D work. Distinct from the `tools` collection above (EM's OWN framework
 * components). Source of truth: the BlenderAddons4CH repo; the markdown under
 * src/content/blenderAddons/ is a build-time mirror — see scripts/sync-addons.mjs.
 */
const blenderAddons = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      name: z.string(),
      // NB: `slug` is a reserved field in Astro content collections (it sets the
      // entry's routing slug and is stripped from `data`), so it is intentionally
      // NOT declared here. The filename already equals the slug.
      category: z.enum([
        'sites', 'texturing', 'vertex-paint', 'sculpting', 'materials', 'pbr',
        'modelling', 'retopology', 'uv', 'interface', 'baking', 'photogrammetry',
        'point-cloud', 'gaussian-splatting', 'compositor', 'multiuser',
        'gis-landscape', 'camera', 'rendering', 'animation', 'libraries', 'coding',
        'themes', 'paid', 'simulation', 'exchange', 'derived-data', 'bim-hbim',
        'documentation', 'misc',
      ]),
      platform: z.enum(['blender', 'standalone', 'web']),
      status: z.enum(['maintained', 'legacy', 'dead', 'unknown']),
      recommended: z.boolean().default(false),
      emPipeline: z.boolean().default(false),
      blenderVersion: z.string().optional(),
      license: z.string().optional(),
      stars: z.number().int().nonnegative().optional(),
      added: z.string().optional(),
      lastVerified: z.string(),
      tags: z.array(z.string()).default([]),
      links: z
        .array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
      summary: z.string(),
      image: z.string().optional(),
    }),
});

export const collections = {
  news,
  blenderAddons,
  projects,
  team,
  partners,
  emHour,
  devMeetings,
  showcase,
  versions,
  tools,
  events,
  publications,
};

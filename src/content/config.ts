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
      relation: z.enum(['uses', 'contributes', 'funds', 'collaborates']).default('uses'),
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
            // Direct download for THIS tool in THIS EM version
            downloadUrl: z.string().url().optional(),
            note: z.string().optional(),
          })
        )
        .default([]),
      installSteps: z.array(z.string()).default([]),
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

export const collections = {
  news,
  projects,
  team,
  partners,
  emHour,
  devMeetings,
  showcase,
  versions,
  tools,
  events,
};

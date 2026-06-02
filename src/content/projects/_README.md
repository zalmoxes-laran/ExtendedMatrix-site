# Projects content collection

Each `.md` file here is one project page surfaced at
`/projects/<slug>/` and on `/projects/`. The schema lives in
`src/content/config.ts` (`projects` collection).

## `homepageImages` — the homepage carousel knob

The homepage (`src/pages/index.astro`) renders an infinite-scroll
carousel of project imagery below the "EM Node Vocabulary" diagram.
By default each project contributes a single tile based on its
`cover`. To send richer gallery images to the carousel instead, add
a `homepageImages` array to the project's frontmatter:

```yaml
homepageImages:
  - "villa-of-aiano/unnamed.jpg"
  - "villa-of-aiano/unnamed-2.jpg"
```

Rules of thumb:

- **Paths are relative to `src/assets/projects/`**. They resolve to
  `src/assets/projects/<entry>` at build time (e.g.
  `villa-of-aiano/unnamed.jpg` → `src/assets/projects/villa-of-aiano/unnamed.jpg`).
- **Each entry becomes one tile** in the carousel. Pick images that
  look good at ~320×180 (16:9). Anything under ~800px on the long
  edge will look blurry at that crop.
- **1–2 entries per project is a good ceiling.** The carousel is
  meant to read as a survey across the project portfolio, not as a
  single project's portfolio.
- **Featured projects appear first.** The carousel sorts by
  `featured: true` first, then by `order`, then by title.
- **Leave it empty** if the cover is already the best image. The
  carousel falls back to `cover` when `homepageImages` is missing or
  empty.

## Other notable fields

- `featured: true` — surfaces the project in the homepage carousel
  ordering and in any "featured projects" listings.
- `order: <number>` — lower numbers appear first within their
  featured bucket.
- `draft: true` — hides the project from listings and the carousel.
- `cover` — relative path to a local image in `src/assets/projects/`,
  used as the project card image and as the carousel fallback.
- `coverUrl` — remote URL fallback while images are being migrated
  into the repo. Prefer local `cover`.

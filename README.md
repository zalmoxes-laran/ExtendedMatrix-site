# Extended Matrix — website source

Static site for [extendedmatrix.org](https://www.extendedmatrix.org) — built with [Astro](https://astro.build), deployed automatically from `main`.

This repo is the **public-facing landing** for the Extended Matrix project. It links out to the technical manuals (which live in their own Read the Docs repos), to the GitHub releases, to the community channels — but does not host the manuals themselves.

---

## Adding content (no code required)

The site has two kinds of pages.

**Fixed pages** (home, `/start`, `/about`, …) live as `.astro` files under `src/pages/`. Touched only by the maintainer when the layout itself needs to change.

**Repeatable content** (news, projects, team members) lives as Markdown / YAML files inside `src/content/<collection>/`. Adding a new entry is just:

1. Create a new file in the right folder.
2. Fill in the frontmatter at the top.
3. Write the body in Markdown.
4. Commit and push.

The build will fail with a readable error if the frontmatter is missing required fields — so you can't accidentally publish a half-finished post.

### Adding a news item

```bash
# In src/content/news/, create a file like:
2026-04-25-em-1-5-out.md
```

with this frontmatter:

```markdown
---
title: "EM 1.5 is out"
date: 2026-04-25
excerpt: "One sentence summary, max 280 chars."
tags: [release]
cover: ./em-1-5.jpg            # optional, place image alongside
coverAlt: "Cover image"        # required if cover is present
draft: false                   # set true to hide from the live site
---

# Markdown body goes here

Write whatever you want, link [like this](https://example.org).
```

### Adding a project

```markdown
---
title: "The Roman Forum of Nora"
period: "2018–2024"
partners: ["CNR-ISPC", "Università di Padova"]
location: "Sardinia, Italy"
cover: ./nora-cover.jpg
coverAlt: "Aerial view of the forum"
summary: "EM applied to the multi-phase reconstruction of the Roman forum at Nora."
featured: true
order: 10
---

Long-form description in Markdown.
```

### Adding a team member

Team members live in `src/content/team/` as YAML files (no body):

```yaml
# src/content/team/jane-doe.yaml
name: "Jane Doe"
role: "Senior researcher"
affiliation: "CNR-ISPC"
bio: "One paragraph about Jane and her work."
avatar: ./jane.jpg
orcid: "0000-0000-0000-0000"
email: "jane.doe@cnr.it"
order: 20
```

---

## Editor recommendations

Pick the workflow that fits you:

- **Never touched Markdown** → use the GitHub web editor: open the file on github.com, click the pencil icon, write, commit.
- **Comfortable with files** → install [Obsidian](https://obsidian.md/) (free), open the `src/content/` folder as a vault, edit in WYSIWYG.
- **Developer** → clone the repo, `npm install`, `npm run dev`, edit in VS Code with live reload.

A web admin (Decap CMS) can be added later if the team prefers a form-based interface.

---

## Local development

Requires Node.js 20+.

```bash
git clone https://github.com/zalmoxes-laran/ExtendedMatrix-site.git
cd ExtendedMatrix-site
npm install
npm run dev      # http://localhost:4321
npm run build    # produces ./dist
```

---

## Deployment

Pushes to `main` trigger the **Build site** workflow (`.github/workflows/build.yml`), which:

1. Runs `astro check` (TypeScript + content schema validation).
2. Builds the static site into `dist/`.
3. Deploys to **GitHub Pages**.

To switch host (Cloudflare Pages, Netlify), replace the `deploy` job in the workflow — the build artifact is the same.

The `public/CNAME` file points the GitHub Pages site at `www.extendedmatrix.org`. DNS is configured separately (CNAME record on the domain registrar pointing at `zalmoxes-laran.github.io`).

---

## Architecture

- [Astro 5](https://astro.build/) — static site generator
- Content collections with [Zod schemas](src/content/config.ts) for type-safe markdown
- No JavaScript shipped to the client unless explicitly opted in (Astro Islands)

The brand identity (palette, logo) lives in `src/styles/global.css` and `src/assets/`. Brand pack source: `~/Library/CloudStorage/OneDrive-CNR/Extended Matrix/EM LOGO 2022/`.

---

## License

Code: MIT. Content: see individual files / project licenses.

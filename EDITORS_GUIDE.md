# Editors' Guide

A practical guide for members of the Extended Matrix community who want to publish content on [extendedmatrix.org](https://extendedmatrix.org) — news, project pages, partner logos, EM Hour and development meeting notes, showcase slides — without having to write any code.

If you have never used Markdown or Git, the safest path is the **GitHub web editor** route described below. If you prefer working on your own machine, jump to [Local editing with Obsidian](#local-editing-with-obsidian).

---

## What you can publish (and where)

The site has *content collections*: folders where each file becomes a page. The schema is enforced by the build, so a malformed post can never break the live site — at worst the build fails and a clear error tells you what to fix.

| What | Folder | File format |
|---|---|---|
| News post | `src/content/news/` | `YYYY-MM-DD-slug.md` |
| Project / case study | `src/content/projects/` | `slug.md` |
| Team member | `src/content/team/` | `slug.yaml` |
| Partner / institution | `src/content/partners/` | `slug.yaml` |
| EM Hour session | `src/content/em-hour/` | `YYYY-MM-DD-slug.md` |
| Development meeting | `src/content/dev-meetings/` | `YYYY-MM-DD-slug.md` |
| Showcase slide | `src/content/showcase/` | `slug.md` (image required) |

The **frontmatter** (the bit at the top between the `---` lines) is where the structured data lives. The body below the frontmatter is free Markdown.

---

## Path 1 — Editing in the GitHub web editor (no install)

Use this if you have a GitHub account and prefer to work in the browser.

1. Open the repository: <https://github.com/zalmoxes-laran/ExtendedMatrix-site>.
2. Navigate to the right folder (e.g. `src/content/news`).
3. Click **Add file → Create new file**, or open an existing file and click the **pencil icon** to edit it.
4. Use an existing file as a template — copy its frontmatter, change the values.
5. At the bottom of the page, write a short description (e.g. *"Add EM Hour session of 8 May"*) and **Propose changes**.
6. GitHub will create a Pull Request. The maintainer reviews and merges; the site rebuilds automatically.

**Tip — preview before merging.** The build CI runs on every PR. If your frontmatter is wrong, the PR will go red and the error message will point you straight at the offending line.

---

## Path 2 — Local editing with Obsidian (no terminal)

Use this if you want a WYSIWYG editor and don't want to learn Git on the command line.

1. Install [GitHub Desktop](https://desktop.github.com/) and clone the repository.
2. Install [Obsidian](https://obsidian.md/) (free).
3. In Obsidian, **Open folder as vault** → point at the cloned repo's `src/content/` folder.
4. Edit Markdown files like notes. Drag images into `src/assets/<collection>/`.
5. When you are done, open GitHub Desktop, write a commit message, and click **Push**.
6. The build CI runs; the site updates within a couple of minutes.

---

## Path 3 — Local editing with VS Code (developers)

```bash
git clone https://github.com/zalmoxes-laran/ExtendedMatrix-site.git
cd ExtendedMatrix-site
npm install
npm run dev    # http://localhost:4321 with live reload
```

Edit files in `src/`, see changes in the browser, commit and push when ready.

---

## Adding a news post — example

Create `src/content/news/2026-05-12-em-1-5-released.md`:

```markdown
---
title: "EM 1.5 is out"
date: 2026-05-12
excerpt: "Landscape mode, CronoFilter, TSU vocabulary and a new intermediate tutorial track. One sentence summary, max 280 characters."
tags: [release, em, em-tools]
author: "Extended Matrix team"
cover: ./em-1-5-cover.jpg          # optional — drop the image alongside this file
coverAlt: "EM 1.5 release banner"  # required if cover is present
draft: false                       # set true to keep the post hidden
---

Body in Markdown. **Bold**, *italic*, [links](https://example.org), images,
code blocks — all standard.

## Section heading

Lists, quotes, tables — see any Markdown reference.
```

That's it. Push the file. The post appears on `/news` and at `/news/2026-05-12-em-1-5-released`.

---

## Adding a partner logo

Partners are YAML files with no body. Drop the logo SVG (preferred) in `src/assets/partners/<slug>.svg`, then create `src/content/partners/<slug>.yaml`:

```yaml
name: "Università di Padova"
kind: "university"          # see EDITORS_GUIDE for allowed values
relation: "uses"            # uses | contributes | funds | collaborates
logo: ../../assets/partners/unipd.svg
logoAlt: "Università di Padova logo"
url: "https://www.unipd.it"
country: "IT"
order: 20                   # smaller = earlier in the strip
```

Allowed `kind` values: `university`, `research-institute`, `company`, `eu-project`, `national-project`, `cultural-institution`.

---

## Adding an EM Hour session

Create `src/content/em-hour/YYYY-MM-DD-topic.md`. Pre-meeting frontmatter:

```markdown
---
title: "EM Hour — TSU and conservation workflows"
date: 2026-05-22T17:30:00+02:00
duration: "60 min"
host: "Emanuel Demetrescu"
guests: ["Jane Doe (Sapienza)"]
upcoming: true
meetingUrl: "https://meet.example.org/em-hour"
summary: "Walk-through of the new TSU node type. Bring questions."
tags: [tsu, conservation]
---

A paragraph or two of agenda / context. The meeting link is in the
frontmatter and surfaces on /community automatically.
```

After the session, add `videoUrl` and/or `slidesUrl` to the frontmatter, set `upcoming: false`, and append a *"What we discussed"* section to the body.

---

## Adding a showcase slide

Showcase slides are image-led. Drop `src/assets/showcase/<slug>.jpg` (1600 px wide minimum), then create `src/content/showcase/<slug>.md`:

```markdown
---
title: "Forum of Augustus — phase III reconstruction"
image: ../../assets/showcase/forum-augustus.jpg
imageAlt: "3D reconstruction of the Forum of Augustus, phase III"
caption: "Multi-temporal reconstruction with paradata-driven materials."
project: "forum-of-augustus"   # optional, links to a /projects/<slug> page
featured: true                 # appear on the homepage rotator
order: 10
---

Optional long-form description for the dedicated /showcase page.
```

---

## Image guidelines

- **Cover photos** for news and projects: 1600×900 (16:9), JPG or WebP.
- **Showcase**: 1600 px wide minimum, 16:9 preferred.
- **Logos**: SVG strongly preferred (monochrome works best for the *Used by* strip). PNG with transparent background is acceptable.
- Always fill `imageAlt` / `coverAlt` — accessibility first, and it's what screen readers read aloud.

The build optimises images automatically to WebP / AVIF and produces multiple sizes for `srcset`. You don't have to do anything.

---

## What happens after you push

1. **GitHub Action runs** — installs dependencies, validates the content schema, builds the site, deploys to GitHub Pages.
2. **Schema validation** — if your frontmatter is missing a required field or has the wrong type, the build fails with a readable error pointing at the file. Fix and push again.
3. **Preview deploy** *(if your host supports it — Cloudflare/Netlify do)* — every PR generates a temporary URL where you can see your change before it goes live.
4. **Cache invalidation** — usually 1–2 minutes after the deploy.

---

## Style and tone

- **Voice:** plain, specific, technical when needed. EM is a scientific project — over-promising marketing copy is off-brand.
- **Length:** short headlines, mid-length excerpts (≤ 280 chars), bodies as long as the topic requires.
- **Linking:** internal links to other site pages with `/news/...` (no full URL); external links open in a new tab.
- **Images:** at least one image per news post and every project page; for showcase, the image *is* the post.

---

## Getting help

- Quick questions: [Telegram group](https://t.me/UserGroupEM).
- Site bugs / feature requests: [open an issue](https://github.com/zalmoxes-laran/ExtendedMatrix-site/issues).
- Direct contact: emanuel.demetrescu@cnr.it.

Welcome aboard.

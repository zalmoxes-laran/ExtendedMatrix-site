# Cookbook collection — authoring guide

Cross-tool recipes that orchestrate the Extended Matrix ecosystem
(EM language + EM Tools + s3dgraphy + 3DSC + Heriverse) to solve a
concrete archaeological problem end-to-end. Recipes are the
**operational glue** between the manuals — they link INTO each
tool's own manual rather than duplicating reference content.

## Why a cookbook (not a fifth manual)

Each tool's manual is the canonical reference for that tool. When
the archaeologist has a workflow that spans tools, scattering the
"how do I do X across all of them" content into each manual leads
to duplication (the EM Tools install instructions on /tools/em-tools/
were repeated in five places before the 2026-06-16 restructure).

The cookbook is the home for cross-tool workflow content. It does
not own reference material — it points into each tool's manual
section at the right depth.

## Recipe authoring conventions

Each recipe is a single Markdown file in this directory.

### Frontmatter

The schema is intentionally lightweight (2026-06-16 decision):

```yaml
---
title: "Author EM in yEd, render in Blender"
summary: "End-to-end walkthrough that takes a freshly drawn EM graph
  from yEd through EM Tools' Stratigraphy Manager all the way to a
  navigable Blender scene."
tools_used:
  - "yed-palette"
  - "em-tools"
cover: ./covers/yed-to-blender.jpg     # optional
coverAlt: "..."                         # optional
order: 0                                # higher = earlier in the index
draft: false                            # exclude from the index when true
---
```

`tools_used` slugs come from the `tools/` content collection
(`src/content/tools/*.md`). Each slug renders as a clickable badge
that links to `/tools/<slug>/`.

Field additions (`difficulty`, `duration`, `outputs`) will land once
patterns emerge from the first three real recipes.

### Body

Free-form Markdown. Use H2 / H3 headings, code blocks, and the
inline-image-paragraph pattern (a paragraph that contains only an
image, optionally followed by an italic caption). Images are capped
to 60% on desktop, 100% on mobile (same convention as project pages).

Cross-references into tool manuals use full URLs (Markdown links),
not Astro internal links — the cookbook lives on the site, the tool
manuals live on Read the Docs.

### Initial recipe list (planned)

Tracked in `.cowork-work/docs-restructure-2026-06-16.md`:

1. *Author EM in yEd → render in Blender* — covers EM language manual
   + EM Tools.
2. *Start from a published dataset → publish your own* — covers EM
   Tools + Heriverse.
3. *Drone survey → reconstruction* — covers 3DSC + EM Tools.
4. *Excavate with PyArchInit → annotate with EM Tools* — covers
   s3dgraphy reverse-export + EM Tools.
5. *Re-publish the same plate at A2 + A3* — the DP-34 Layout System
   use case.

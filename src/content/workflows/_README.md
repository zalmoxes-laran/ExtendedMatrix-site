# Workflows collection — authoring guide

Multi-tool **end-to-end paths** tied to a scientific question or a
technology (photogrammetric pipeline, geophysical survey,
anastylosis, drone survey, web publication). Each workflow
orchestrates several Extended Matrix tools in sequence (EM language
+ EM Tools + s3dgraphy + 3DSC + Heriverse), and is the **operational
glue** between the tool-specific manuals — each step links INTO the
tool's own manual rather than duplicating reference content.

## Workflows vs cookbook

The site **Workflows** collection is **not** the same thing as the
**EM language cookbook** inside `ExtendedMatrix-doc/docs/cookbook/`.

| Surface | Lives on | Answers | Unit of analysis |
|---|---|---|---|
| **Workflow** | site (`/workflows/`) | *"How does this method / technology work end-to-end?"* | A methodology or technology (photogrammetric pipeline, anastylosis, web publication) |
| **Cookbook** | inside the language manual | *"How do I express this archaeological situation in the EM language?"* | A grammar pattern (VSF nodegroup with SFs, TimeBranches, dubitative reconstructions) |

A workflow can call cookbook patterns as reusable building blocks:

> *Workflow step 4*: "For the spolia fragments, apply the
> [Anastylosis NodeGroup](https://docs.extendedmatrix.org/en/1.5/cookbook/anastylosis-nodegroup.html)
> cookbook pattern, then visualize via the EM Tools panel below."

The cookbook lives in the language manual because it's about
**language grammar** (single tool, even when the result is then
visualized elsewhere). The workflows collection lives on the site
because it's about **method orchestration** (multi-tool by
construction).

## Why workflows live on the site (not in a manual)

Each tool's manual is the canonical reference for that tool. When
the archaeologist follows a workflow that spans tools, scattering
the "how do I do X across all of them" content into each manual
leads to duplication (the EM Tools install instructions on
`/tools/em-tools/` were repeated in five places before the
2026-06-16 restructure).

The site is the natural home for cross-tool orchestration because
it sits *above* the manuals in the information architecture. The
workflow links into each tool's manual at the right depth and never
owns reference material itself.

## Workflow authoring conventions

Each workflow is a single Markdown file in this directory.

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
patterns emerge from the first three real workflows.

### Body

Free-form Markdown. Use H2 / H3 headings, code blocks, and the
inline-image-paragraph pattern (a paragraph that contains only an
image, optionally followed by an italic caption). Images are capped
to 60% on desktop, 100% on mobile (same convention as project pages).

Cross-references use full URLs (Markdown links), not Astro internal
links — the workflow lives on the site, the tool manuals live on
Read the Docs, the cookbook patterns live in ExtendedMatrix-doc.

### Initial workflow list (planned)

Tracked in `.cowork-work/docs-restructure-2026-06-16.md`:

1. *Author EM in yEd → render in Blender* — covers EM language manual
   + EM Tools.
2. *Drone survey → reconstruction* — covers 3DSC + EM Tools.
3. *Publish your reconstruction to Heriverse* — covers EM Tools +
   Heriverse.
4. *Excavate with PyArchInit → annotate with EM Tools* — covers
   s3dgraphy reverse-export + EM Tools.
5. *Re-publish the same plate at A2 + A3* — the DP-34 Layout System
   use case.

Future workflows that map naturally to this collection: photogrammetric
workflow (drone / terrestrial / multi-temporal), geophysical workflow
(measurement → pseudostratigraphy → graph annotation), lithic
analysis workflow, anastylosis workflow.

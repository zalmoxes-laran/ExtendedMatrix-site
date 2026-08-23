---
name: "EMStudio"
role: "Desktop EM editor"
summary: "Sovereign desktop editor for Extended Matrix and successor to yEd from 1.6. Reads and writes em.json natively, imports existing .graphml, and organises work across six task-shaped workspaces. In active development, paired with EM 1.6."
docsUrl: "https://docs.extendedmatrix.org/projects/emstudio-doc/en/latest/"
repoUrl: "https://github.com/zalmoxes-laran/EMStudio"
downloadUrl: "https://github.com/zalmoxes-laran/EMStudio"
action: open
licence: "GPL-3.0"
status: alpha
roles: [archaeologist, modeller, developer]
order: 15
---

## What it is

**EMStudio** is the standalone editor for the Extended Matrix and, from EM 1.6,
the **successor to yEd** for authoring the graph. It reads and writes
**`em.json`** natively, so the record is never round-tripped through a foreign
format: the graph you edit is the graph on disk. Existing **GraphML** files
remain first-class — EMStudio opens them directly and translates the
palette-based semantics into native `em.json` entities, so nothing that was
authored in yEd is left behind.

Where EM Tools lives inside Blender and drives a 3D scene, EMStudio is the
**sovereign** editor: it owns the graph, the documentation corpus and the
narrative, and it talks to everything else — Blender, a Heriverse viewer, a Tropy
library — through a single connector contract.

## The six workspaces

EMStudio is organised as six tab arrangements, each a task rather than a panel:

- **Documentation** — bring material in: drop files, browse storage, read what a
  study is built from.
- **Graph** — interpret stratigraphy: the graph with the table below and the
  inspector, outliner and log to the side.
- **DTC** — declare provenance: the documentation corpus as a directed graph
  (acquisition, derivation, attribution), where the *attributor* is recorded as
  distinct from the *author*.
- **Comparisons** — hold your study next to what is not yours, on a curated shelf
  fenced by whose each resource is (own study · own HDT · other HDT).
- **Narrative** — read the graph as prose: chapters that anchor to epochs and
  activities, with live embeds (matrix, map, timeline) that stay in sync with the
  record.
- **Annotator** — trace regions on a photograph or drawing and tie them back to
  the graph.

## Why it matters

EMStudio makes the **two-tier** model first-class — the interpretive record
(stratigraphic units, epochs, activities) and the documentation/provenance corpus
(the DTC) live side by side, and rights declared in the DTC *bite*: an asset under
embargo is refused, its licence travels with it. The narrative is not a separate
document but the same graph read differently, and its exports (HTML, Word, LaTeX,
Jupyter) carry the live figures with them.

## Manual

The full user manual — tutorial, how-to recipes, interface reference and the
rationale behind the design — is on **Read the Docs**:
[EMStudio documentation](https://docs.extendedmatrix.org/projects/emstudio-doc/en/latest/).

## Status & versions

EMStudio is developed within the **StratiGraph** project. It is in **active
development** (1.6-dev), paired with **EM 1.6** and built on **s3Dgraphy 1.6**.
English is the default interface language. Cross-platform binaries (macOS,
Windows, Linux) are planned for **autumn 2026**. Because it is
pre-release, expect the interface and the feature set to keep moving — the manual
tracks the current state, and news of what is landing appears on the **News**
page.

**Editor transition.** From EM 1.6, EMStudio is the recommended editor for
authoring the Extended Matrix. **yEd** remains fully supported for the entire
**EM 1.5 LTS** line — it is not deprecated on 1.5, and the palette convention
that formalised EM lives on there. The GraphML import path exists precisely to
make the switch to 1.6 painless: open your `.graphml`, save as `.em.json`, keep
going.

---
name: "EMStudio"
role: "Desktop EM editor"
summary: "The sovereign desktop editor for Extended Matrix: read and write em.json natively, interpret stratigraphy in the graph, declare provenance in the DTC, compare on the shelf, and read the graph as a narrative. In active development, paired with EM 1.6."
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

**EMStudio** is the standalone editor for the Extended Matrix — the place where an
EM graph is authored end to end, without Blender and without yEd. It reads and
writes **`em.json`** natively, so the record is never round-tripped through a
foreign format: the graph you edit is the graph on disk.

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

EMStudio is in **active development** (1.6-dev), paired with **EM 1.6** and built
on **s3Dgraphy 1.6**. English is the default interface language. Because it is
pre-release, expect the interface and the feature set to keep moving — the manual
tracks the current state, and news of what is landing appears on the **News**
page.

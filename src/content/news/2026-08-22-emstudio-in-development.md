---
title: "EMStudio — the standalone EM editor, in development for EM 1.6"
date: 2026-08-22T10:00:00+02:00
excerpt: "EMStudio, the sovereign desktop editor for the Extended Matrix, is in active development for EM 1.6: author em.json natively across six workspaces, and connect Blender, Heriverse and more through a single connector contract. The user manual is now online."
tags:
  - emstudio
  - tools
  - em-1-6
---

A new tool joins the ecosystem: **EMStudio**, the standalone editor for
the Extended Matrix. Where EM Tools lives inside Blender and drives a 3D
scene, EMStudio is the **sovereign** editor — it reads and writes
**`em.json`** natively, so the graph you edit is the graph on disk, with no
round-trip through a foreign format. Existing **GraphML** files stay
first-class: EMStudio opens them directly, translates the palette-based
semantics to native `em.json` entities, and lets you keep working from
where you left off in yEd.

## The successor to yEd

**EMStudio is the tool that will replace yEd for authoring the Extended
Matrix.** yEd served the project since the beginning — the palette
convention formalised there is what turned EM from a proposal into a
working practice — and remains fully supported for the entire 1.5 LTS
line. From **EM 1.6 onwards**, EMStudio becomes the recommended editor
and `em.json` the native file it reads and writes end-to-end. The
GraphML import path exists precisely to make the transition painless:
open your existing `.graphml`, save as `.em.json`, keep going.

## Six workspaces, one record

EMStudio is organised as six task-shaped workspaces: **Documentation** to
bring material in, **Graph** to interpret stratigraphy, **DTC** to declare
provenance (where the *attributor* is recorded as distinct from the
*author*), **Comparisons** to hold your study next to what is not yours,
**Narrative** to read the graph as prose with live figures, and
**Annotator** to trace regions on photographs and drawings.

## One contract for everything else

EMStudio talks to Blender, a Heriverse viewer, a Tropy library and more
through a **single connector contract** — the same shape whether a tool
sits beside it on the desktop or a viewer serves the published graph from
the cloud. Every write is attributed; rights declared in the DTC are
enforced, not decorative.

## The manual is online

The full user manual — tutorial, how-to recipes, interface reference and
the rationale behind the design — is available on **Read the Docs**. See the
[EMStudio tool page](/tools/emstudio) for the links.

EMStudio is developed within the **StratiGraph** project. It is pre-release
(1.6-dev): expect the interface and the feature set to keep moving. Cross-platform binaries for macOS, Windows and Linux are planned
for **autumn 2026**; until then, development is open on the repository. News of
what is landing will appear here.

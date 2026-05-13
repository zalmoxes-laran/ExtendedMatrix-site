---
name: "EM palette for yEd"
role: "Graph editor extension"
summary: "The EM palette adds the Extended Matrix typed nodes to yEd — the free graph editor used to author GraphML files. The starting point for anyone who wants to draw an EM by hand."
docsUrl: "https://docs.extendedmatrix.org/en/1.5.0/mini_tutorials/setup_yed_palette.html"
repoUrl: "https://github.com/zalmoxes-laran/ExtendedMatrix"
downloadUrl: "https://github.com/zalmoxes-laran/ExtendedMatrix/raw/main/02_ExtendedMatrix_palette/Extended%20Matrix%20palette%20v.1.5.graphml.zip"
licence: "GPL-3.0"
status: stable
roles: [archaeologist]
order: 10
---

## What it is

The **EM palette** is the canonical Extended Matrix node palette for
[yEd Graph Editor](https://www.yworks.com/products/yed). It is a small
`.graphml` file that, once imported into yEd, adds an *Extended Matrix*
section to yEd's right-hand drag-and-drop panel — with all the typed
nodes (US, USV, USD, SF, RSF, DOC, EXT, Property, …) and the standard
connectors as pre-styled stencils.

The palette is to yEd what an add-on is to Blender: it does not change
the tool itself, but extends it with the EM-specific vocabulary so that
the matrix you draw is structurally identical to those authored through
other EM tools, and is round-trippable across the toolchain.

yEd itself is free and runs on Windows, macOS and Linux. The palette
travels in the EM language repository.

## Capabilities

- **Canonical node stencils** — every EM node type with the right shape,
  border colour, and label conventions (Stratigraphic Units, paradata
  nodes, group containers, source nodes, extractors, properties).
- **Canonical connectors** — the standard EM edges (`is_after`,
  `is_part_of`, `survive_in_epoch`, `changed_from`, …) pre-styled so
  that semantics are reflected in the visual.
- **Round-trip fidelity** — files authored through the palette stay
  importable in EM Tools, s3dgraphy, and any downstream consumer
  without manual cleanup.

## Why a separate tool

While yEd is general-purpose, the EM matrix is a specific archaeological
formalism. The palette enforces the canonical node shapes, border
colours, and label patterns expected by the EM toolchain (EM Tools,
Heriverse, s3dgraphy round-trip). Authoring in yEd without the palette
is possible but breaks downstream interoperability.

## Installing

1. Install [yEd](https://www.yworks.com/products/yed) from yworks.com.
2. Open `Edit → Manage Palette… → Import Section…`
3. Select the EM palette `.graphml` file (download it from the
   [Extended Matrix repository](https://github.com/zalmoxes-laran/ExtendedMatrix)
   — pick the branch matching the EM version you are using).
4. Tick the new section so it is visible.

The step-by-step walkthrough with screenshots lives in the
[Set up the yEd palette](https://docs.extendedmatrix.org/en/1.5.0/mini_tutorials/setup_yed_palette.html)
mini tutorial.

## Versions

The palette tracks the EM formal language version. See the **Versions**
page for the support matrix.

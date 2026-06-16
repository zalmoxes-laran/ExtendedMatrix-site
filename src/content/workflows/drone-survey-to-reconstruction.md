---
title: "From drone survey to EM reconstruction"
summary: >
  Photogrammetric pipeline that takes drone imagery through 3D Survey
  Collection (LOD, georeferencing, Cesium tilesets) and lands the
  cleaned mesh inside EM Tools as Representation Models attached to
  stratigraphic units.
tools_used:
  - 3dsc
  - em-tools
order: 90
draft: true
---

> *Stub — recipe body is being authored. When the body is final,
> flip `draft: false` to publish.*

## What you'll do

Process a drone-imagery dataset (orthomosaic + dense mesh) through
the 3D Survey Collection pipeline — set LOD levels, georeference
against a known projected origin, optionally produce a Cesium
tileset for web viewers — and bring the cleaned mesh into EM Tools
as a Representation Model linked to the stratigraphic units that
the survey covers.

## What you'll need

- **Blender 4.4 LTS or later** with the standard EM Tools install
  card from
  [extendedmatrix.org/tools/em-tools](https://www.extendedmatrix.org/tools/em-tools/).
- **3D Survey Collection** add-on from
  [extendedmatrix.org/tools/3dsc](https://www.extendedmatrix.org/tools/3dsc/).
  Same one-gesture install pattern as EM Tools.
- A drone-survey dataset to import. The 3DSC documentation includes
  sample datasets if you want to follow along without your own data.

## Steps

### 1. Set up the survey scene in 3DSC

*[TBD — narrative covering: scene CRS + projected origin (DP-56 georef
pipeline), 3DSC LOD presets, panorama / orthomosaic handling. Link
into the 3DSC manual at the right depth.]*

### 2. Quality-check at LOD

*[TBD — verifying LOD transitions read cleanly at viewer distance,
linking to the 3DSC LOD concept page.]*

### 3. Optionally generate Cesium tilesets

*[TBD — for web viewers, generate the tileset and document the
generated URL as a custom property on a placeholder EMPTY in
Blender.]*

### 4. Bring the mesh into EM Tools as an RM

*[TBD — promote the survey mesh to a Representation Model via the
EM Tools RM Manager, link it to the appropriate USVs in the
Stratigraphy Manager. Link to the canonical RM Manager reference
page in the EM Tools manual.]*

### 5. Save and iterate

*[TBD — the `.blend` carries both the surveyed mesh and the
graph-linked proxies; the GraphML carries the EM. Edit either side
independently and re-sync.]*

## Where to go next

- *Publish to the web*: see the upcoming *Start from a published
  dataset → publish your own* recipe (Heriverse integration).
- *Cap a plate from this scene*: see DP-34's MVP for the
  prospetto / sezione authoring (Layout System).

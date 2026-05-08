---
name: "3DSC for Metashape"
role: "Survey pipeline (Metashape)"
summary: "Companion to 3DSC that runs the photogrammetric processing inside Agisoft Metashape — chunk management, alignment, mesh generation, texture baking, ready for the LOD step in 3DSC for Blender."
docsUrl: "https://docs.extendedmatrix.org/projects/3DSC/en/latest/"
repoUrl: "https://github.com/zalmoxes-laran/3DSC_Metashape"
downloadUrl: "https://github.com/zalmoxes-laran/3DSC_Metashape/releases/latest"
licence: "GPL-3.0"
status: stable
roles: [modeller]
order: 55
---

## What it is

**3DSC for Metashape** is the *upstream* half of the 3D Survey Collection
pipeline. It runs inside [Agisoft Metashape](https://www.agisoft.com/)
and handles the photogrammetric stages — chunk creation, image
alignment, mesh and texture generation — that produce the meshes
3DSC for Blender then pulls in for level-of-detail and metadata
propagation.

Use 3DSC for Metashape when you have raw photographs and need to take
them all the way to a clean textured mesh.

## Capabilities

- Chunk management with consistent naming for downstream LOD scripting.
- Standardised alignment and dense-cloud parameters.
- Mesh and texture export presets compatible with the Blender side of 3DSC.
- Metadata stub generation (capture date, photogrammetry parameters)
  that travels with the mesh into EM Tools.

## Installing

Drop the script into Metashape's *scripts* folder and reload. Detailed
installation steps are in the
[3DSC documentation](https://docs.extendedmatrix.org/projects/3DSC/en/latest/).

> **Editors:** confirm the script-folder path and add a precise
> Metashape version requirement when available.

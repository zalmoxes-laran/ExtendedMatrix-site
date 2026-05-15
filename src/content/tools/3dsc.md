---
name: "3DSC"
role: "Survey pipeline (Blender)"
summary: "3D Survey Collection — photogrammetry workflow management, level-of-detail handling, metadata propagation. The upstream pipeline that produces high-quality 3D models for EM Tools to annotate."
docsUrl: "https://docs.extendedmatrix.org/projects/3DSC/en/latest/"
repoUrl: "https://github.com/zalmoxes-laran/3D-survey-collection"
licence: "GPL-3.0"
status: stable
roles: [modeller]
order: 50
---

## What it is

**3DSC (3D Survey Collection)** is the EMF tool for *making* the 3D
models that EM Tools then annotates. It runs entirely on modest
hardware and is designed for archaeologists, not for visual-effects
studios — so don't be put off by the words "3D survey".

Workflow: photogrammetry chunks (Metashape, Reality Capture in
progress) → 3DSC LOD pipeline → clean low-poly proxies →
EM Tools.

## Capabilities

- Workflow management for photogrammetry chunks.
- Level-of-detail (LOD) pipeline producing proxies suitable for
  annotation.
- Metadata propagation across LOD levels.
- Direct integration with EM Tools.

See the [3DSC documentation](https://docs.extendedmatrix.org/projects/3DSC/en/latest/)
for the full reference.

---
name: "EM Tools"
role: "Blender add-on"
summary: "Connect an Extended Matrix graph to 3D content inside Blender. Browse stratigraphic units, link proxies, drive visualisation by epoch and property, export to Heriverse and CSV."
docsUrl: "https://docs.extendedmatrix.org/projects/EM-tools/en/latest/"
repoUrl: "https://github.com/zalmoxes-laran/EM-blender-tools"
downloadUrl: "https://github.com/zalmoxes-laran/EM-blender-tools/releases"
licence: "GPL-3.0"
status: stable
roles: [archaeologist, modeller]
order: 20
---

## What it is

**EM Tools** is the Blender extension that turns an EM graph into an
interactive 3D scene. Drop a `.graphml` and a `DosCo` folder into the
*EM Setup* panel, hit *Reload*, and every stratigraphic unit becomes a
selectable proxy in the viewport — tied back to its sources, epoch and
paradata.

## Capabilities

- **Stratigraphy Manager** — browse, filter, edit US/USV/USD/SF/TSU.
- **Epochs Manager** — define and colour chronological periods.
- **Visual Manager** — display modes by EM type, by epoch, by property.
- **Proxy Box Creator** — author proxies with a 7-point pick on the mesh.
- **Anastylosis Manager (RMSF)** — link 3D objects to SpecialFind nodes with LOD.
- **3D Document Manager** — place historic photos and drawings in space and time.
- **CronoFilter** — chronological-horizon filtering in landscape mode.
- **Conservation Workflow (TSU)** — surface-level decay and restoration mapping.
- **Heriverse export** — produce a publishable web bundle in one click.

## Installing

The recommended path is through Blender's extension system. See the
[installation guide](https://docs.extendedmatrix.org/projects/EM-tools/en/latest/installation.html)
or pick the right `.zip` for your Blender + OS combo from the
[GitHub Releases page](https://github.com/zalmoxes-laran/EM-blender-tools/releases).

## Versions

EM Tools versions track the EM formal language version. See the
**Versions** page for the support matrix (which Blender, which yEd,
LTS commitments).

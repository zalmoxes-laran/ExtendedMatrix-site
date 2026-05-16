---
name: "PyArchInit"
role: "QGIS plugin"
summary: "QGIS plugin for archaeological data management with strong 2D GIS visualization of stratigraphic data. Connected to EM via s3Dgraphy as an auxiliary data source."
docsUrl: "https://pyarchinit-api.readthedocs.io/en/latest/"
repoUrl: "https://github.com/pyarchinit/pyarchinit"
licence: "GPL-2.0"
status: stable
roles: [archaeologist]
order: 70
---

## What is PyArchInit

**PyArchInit** is an open-source QGIS plugin for archaeological data
management, with particular strength in **2D GIS visualization of
stratigraphic data**. Maintained by an active community led by Luca
Mandolesi, it is used in production by archaeology teams across
Europe — a single environment for stratigraphic, alphanumeric,
multimedia and topographical records inside QGIS.

## How it connects to Extended Matrix

Through the [s3Dgraphy](/tools/s3dgraphy/) library, an existing
PyArchInit project can be brought into the Extended Matrix workflow
as a connected auxiliary data source — referencing records live or
baking them into the graph. Stratigraphic units, relationships and
selected paradata authored in PyArchInit can be projected onto an
s3dgraphy graph and exchanged with the rest of the EM Framework.

EM does not require PyArchInit: an excavation can be managed with
EM plus Excel spreadsheets alone. PyArchInit is one strong,
established option, particularly attractive when 2D GIS
visualization is already part of your workflow.

## A pattern, not a dependency

This kind of integration — independent tools connecting to EM
through s3Dgraphy — is what we hope to see grow across the
ecosystem. **Revit**, **Unreal Engine**, **Houdini**,
**PostgreSQL/PostGIS**, and other domain-specific tools are all
natural candidates for similar bridges.

## Getting started

- **API docs** — [pyarchinit-api.readthedocs.io](https://pyarchinit-api.readthedocs.io/en/latest/)
- **Source** — [github.com/pyarchinit/pyarchinit](https://github.com/pyarchinit/pyarchinit)
- **EM integration cookbook** — [`cookbook/pyarchinit_integration`](https://docs.extendedmatrix.org/en/latest/cookbook/pyarchinit_integration.html) in the Extended Matrix manual

## Maintainers

- **Luca Mandolesi** — project lead ([github.com/pyarchinit](https://github.com/pyarchinit))
- **Enzo Cocca** — s3Dgraphy integration design discussions, including the issue that drove the LocationNodeGroup design in s3Dgraphy 0.1.41 ([github.com/enzococca](https://github.com/enzococca))
- Community contributions welcome via the [PyArchInit GitHub repository](https://github.com/pyarchinit/pyarchinit).

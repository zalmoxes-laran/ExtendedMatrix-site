---
name: "source_list.xlsx"
role: "Source registry template"
summary: "Spreadsheet template for the systematic registration of bibliographic and archival sources behind an EM project. Designed for EM 1.3, still fully valid for EM 1.4. A revised version is in preparation for EM 1.5."
repoUrl: "https://github.com/zalmoxes-laran/ExtendedMatrix"
downloadUrl: "https://github.com/zalmoxes-laran/ExtendedMatrix/raw/main/03_Sources_list/source_list.xlsx"
licence: "GPL-3.0"
status: stable
roles: [archaeologist]
order: 15
---

## What it is

`source_list.xlsx` is the canonical template for the **bibliographic
and archival source registry** of an EM project. Each row is one
source (a publication, an archival document, a photograph, an
analysis report); each column is a metadata field used to cite the
source from the EM graph.

The file pairs with the `DosCo` folder convention: each entry in the
spreadsheet has a stable `id` that the GraphML's `Document` nodes
reference, and a `file_path` (relative to DosCo) that points to the
actual file on disk.

## When to use it

- You are starting a new EM project and want to capture the
  bibliography upfront, before any nodes are drawn.
- You are migrating a legacy project's sources into EM and need a
  consistent registry.
- You want every paradata chain in the graph to terminate on a
  citeable record with stable id and metadata.

## Compatibility

| EM version | Status |
|---|---|
| 1.3 | Original target |
| 1.4 | **Fully valid** — keep using this template |
| 1.5 | Still usable; a revised template is in preparation and will be linked here when ready |

## Filling it in

The spreadsheet has a small set of mandatory columns (`id`, `title`,
`year`, `file_path`, `licence`) and a larger optional area for type,
author, archive code, page range, geographic reference, etc. Fields
that are not relevant to a given source can be left empty — the EM
exporter only emits what is filled.

> **Editors:** add a screenshot of the template open in Excel/LibreOffice
> and a half-screen of a real example when one is available.

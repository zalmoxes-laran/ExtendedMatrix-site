---
title: "Extended Matrix on Zenodo: a FAIR home for our datasets"
date: 2026-04-26
excerpt: "The EM Zenodo community is now the canonical landing place for datasets, paradata bundles, training material and case-study GraphML. With long-term automation on the way."
tags: [open-data, zenodo, fair, infrastructure]
author: "Extended Matrix team"
---

The Extended Matrix project now has a dedicated
[Zenodo community](https://zenodo.org/communities/extendedmatrix) — the
canonical place where EM datasets, paradata bundles, training material,
case-study GraphML and reference reconstructions are deposited.

## Why Zenodo

Zenodo is operated by CERN as a free, persistent, FAIR-compliant
repository for research output. Every deposit gets a **DOI**, structured
metadata, and long-term preservation. For EM, this means three things:

- **Citable datasets.** When you publish a paper that uses an EM graph,
  the dataset you trained the work on can be cited the same way you cite
  the paper itself.
- **Openness without lock-in.** Anyone — anywhere, with or without a
  CNR/EM account — can browse, download, and reuse what is on Zenodo.
- **Reproducibility.** Releases of the EM language and of EM Tools can be
  pinned to the dataset versions they were built against; future readers
  can reconstruct exactly what you did.

## What goes there

Today the community accepts five kinds of deposits:

1. **Reference datasets** — fully documented case-study graphs (e.g. the
   training site *Casa di Esempio*, when ready) with GraphML +
   `em_data.xlsx` + DosCo bundle.
2. **Paradata extracts** — focused exports demonstrating one node
   typology, one extractor pattern, or one paradata chain.
3. **Training material** — slide decks, exercise sheets, recordings of
   workshops.
4. **Case-study reconstructions** — Heriverse export packages,
   photogrammetric meshes with proxy alignments, multi-temporal
   reconstructions.
5. **Papers and theses** preprints / postprints, with the dataset they
   describe deposited alongside.

## What is coming next

Manual upload is the starting point. The next step — tracked as
[DP-57](https://dev.extendedmatrix.org/dev-projects) on the development
board — is **automation in both directions**:

- A **"Publish to Zenodo"** operator inside EM Tools and Heriverse
  packages a project and uploads it with one click.
- A **custom EM metadata layer** (`em_metadata.json`) travels alongside
  Zenodo's standard fields, capturing things Zenodo's vanilla schema
  cannot — stratigraphic typology coverage, epoch range, paradata
  statistics, CIDOC-CRM mapping version, language version.
- A **Browse Zenodo** panel inside EM Tools talks to the community via
  the Zenodo API and lets users search and import example projects with
  one click — turning the community into a project-template marketplace.
- **CI integration** publishes example datasets automatically when a
  GitHub release is tagged.

## How to deposit today

While the automation is in development, deposits are manual:

1. Sign in at [zenodo.org](https://zenodo.org) (ORCID login works).
2. Create a new upload, fill in the standard metadata.
3. **Crucially**: in the *Communities* field, select
   *Extended Matrix* — this is what makes your deposit appear on the
   community page.
4. Use the licence that fits your project (CC-BY 4.0 is the default
   recommendation for non-sensitive material).
5. Save — Zenodo issues a DOI immediately.

Comments, suggestions, and proposals for the metadata schema are very
welcome on [Telegram](https://t.me/UserGroupEM) or as
[GitHub issues](https://github.com/zalmoxes-laran/s3dgraphy/issues)
tagged `zenodo`.

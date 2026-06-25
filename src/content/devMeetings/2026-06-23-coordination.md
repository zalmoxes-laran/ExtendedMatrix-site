---
title: "Dev coordination — June public sync"
date: 2026-06-23T15:00:00+02:00
attendees:
  - "Emanuel Demetrescu"
  - "Simone Berto"
  - "Mattia Curto"
  - "Giacomo Mancuso"
decisions:
  - "Move Oxigraph integration directly into the Extended Matrix library so the knowledge-graph can be written to the triplestore from Python rather than only exported as Turtle and re-imported."
  - "Adopt a parallel persistence model for the graph (DB + GraphML), so that recovery and external interoperability stay first-class even when the primary tool's database file becomes the source of truth."
  - "Treat property-graph vs triple-store as a mapping question, not an architectural choice — the same EM dataset must be expressible in both, with national archaeological cataloguing schemas (Italian, German, Israeli, …) as the user-facing layer."
  - "Adopt the Visual Studio Code + Jacques Lucke add-on workflow as the recommended Blender-Python dev loop (live reload, in-Blender debugger, no restart required)."
actionItems:
  - "Emanuel — wire direct Oxigraph write from the Extended Matrix library (in addition to the existing Turtle export)."
  - "Mattia — implement an automatic graph backup alongside the database file (GraphML format), on top of the existing trash-bin recovery system."
  - "Giacomo + Emanuel — evaluate an analytics module in EM Meter using Jupyter, for volumes / visible surfaces / proxy statistics, leveraging the graph structure for queries."
  - "Mattia — analyse how to map and auto-convert national archaeological catalogue schedas (Italian / German / Israeli) via the knowledge graph and the underlying data structure."
upcoming: false
meetingUrl: "https://teams.microsoft.com/meet/388419352314569?p=qvWgByiUm0jGtpW4mQ"
# Async agenda gathering happens in the GitHub Discussions thread
# linked below. Open this URL once the thread is created on the
# ExtendedMatrix-dev-site repo under the "Meeting Notes" category.
# discussionUrl: "https://github.com/zalmoxes-laran/ExtendedMatrix-dev-site/discussions/NNN"
tldr: "First public dev meeting of the post-1.5 cycle. Python-for-Blender pipeline, Oxigraph integration in EM, GraphML backups alongside the DB, EM Meter analytics with Jupyter, multi-national cataloguing mapping. Four action items assigned."
nextMeeting: 2026-07-21T15:00:00+02:00
---

## TL;DR

First public dev meeting of the post-1.5 cycle. The session ran for
just over an hour and stayed close to engineering work in flight,
rather than process or governance. Five discussion threads, four
action items assigned — see the side card on this page for the
crisp summary.

## Cadence

Roughly **monthly, on a Tuesday afternoon at 15:00 CET**, with the
exact Tuesday decided per meeting (calendars permitting). The next
meeting date is pinned in `nextMeeting` in the frontmatter of this
page and shown at the bottom, so subscribing to the
[Meeting Notes discussion thread](https://github.com/zalmoxes-laran/ExtendedMatrix-dev-site/discussions/categories/meeting-notes)
on the dev-site repo is enough to never miss a session.

## Discussion

### Python for Blender — the maturing dev pipeline

Emanuel walked through how the Python-for-Blender ecosystem has
evolved since the first EM-Tools releases. The relevant components
now span 3D modelling, geophysics, photogrammetry and several
adjacent pipelines, which has pushed the project to split the work
into smaller, individually-shippable modules.

The current setup is automated end-to-end:

- An `EM.sh` / `EM.bat` bootstrap script installs every Python
  dependency the Blender extension needs. Differences between
  Blender's bundled Python versions are handled by the script,
  including how the manifest declares which Python it targets.
- External libraries (PyTorch, TorchVision, …) are added to the
  requirements file. The script picks the right wheels per
  platform so the extension sees its dependencies without
  conflicting with anything else Blender already ships.
- Releases for the dev branch are published to GitHub via a single
  automated command — build per OS, draft a release, generate the
  drag-and-drop install asset. Users install stable or dev
  versions with the same drag-and-drop gesture.
- Visual Studio Code is the recommended editor. The
  [Blender Development add-on by Jacques Lucke](https://marketplace.visualstudio.com/items?itemName=JacquesLucke.blender-development)
  attaches a debugger to a running Blender instance and live-reloads
  code without a Blender restart. The productivity delta vs the
  pre-add-on workflow is large enough that the team is treating it
  as the recommended dev loop going forward.

### Knowledge graphs in Extended Matrix and Stratigraph

Emanuel introduced the role of the knowledge graph in StratiGraph
(the EU project, hardening EM-aware infrastructure 2025–2029) and
the trade-offs between a triplestore and a property graph for
archaeological data. The learning curve of a full triplestore
deployment was flagged as a real barrier for the archaeology
community; the team is evaluating
[Oxigraph](https://github.com/oxigraph/oxigraph) as a more
accessible alternative — a fast embeddable triplestore with a
small operational footprint.

The discussion converged on three points:

- A graph store gives more flexibility than a tabular schema for
  mapping different national archaeological cataloguing standards
  (Italian, Anglo-Saxon, German, Israeli) without forcing a
  lowest-common-denominator schema. Mapping happens *at the model
  level*, not *at the database level*.
- Export and import between graph formats (JSON, RDF, Turtle) are
  already automated inside the Extended Matrix ecosystem.
  Serialisation between formats is not the bottleneck.
- Mattia showed how his own software already stores data in
  parallel as tables and GraphML, with automatic backups and a
  trash-bin recovery system. The pattern (DB + GraphML side-by-side)
  is a good template for the EM core.

Giacomo shared related experience with CIDOC-CRM, ARCO and Omeka S,
and underlined that the value of a graph-based approach is the
ability to **map between ontologies** rather than picking one — a
position aligned with the long-term [[project_cidoc_s3d_extension]]
direction.

### Open-source collaboration

Emanuel sketched how the project handles contributions: pull
requests review, merge into the dev branch, Zenodo publication for
stable releases (a DOI per release, citation-ready and durable
beyond GitHub itself). Newcomers — including Enzo Cocca, whose PR
#28 brought Postgres pyArchInit backend support — are explicitly
welcomed and encouraged to propose changes and new features
through the same workflow.

### Georeferencing + GIS in Blender

Emanuel and Simone discussed the need to integrate georeferencing
into Extended Matrix workflows so that datasets keep their spatial
context inside Blender. The direction is a pipeline that ingests
georeferenced data — including from
[Open Topography](https://opentopography.org/) — via existing libraries
like GDAL, and surfaces them in Blender as native scene objects.
This is a forward-looking conversation; no immediate action item.

### Analytics and quantitative pipelines

Giacomo raised the question of an analytics surface in EM-Tools —
volume, visible surface, proxy-count statistics, and similar
metrics computed against the graph and the 3D scene. The direction
is a Jupyter-integrated module in EM Meter that surfaces these
calculations and ties results back to the graph for richer
queries. Owners assigned (see action items).

## Notes for next meeting (21 July 2026)

The four action items above are the natural agenda for the next
session — each owner brings status. Anything else discovered in
between belongs in the
[Meeting Notes discussion thread](https://github.com/zalmoxes-laran/ExtendedMatrix-dev-site/discussions/categories/meeting-notes)
so it can be pinned to the agenda before the meeting opens.

---
name: "EM Folder Tree"
role: "Canonical project structure"
summary: "Canonical project folder tree for any Extended Matrix project — the `DosCO` document collection, sub-folders for graphs, exports, sources, and the `D.NN` document naming convention. Pencil-and-paper foundation; unzip into the project root before authoring nodes."
docsUrl: "https://docs.extendedmatrix.org/projects/3DSC/en/1.7.0/reference/file-locations.html#folder-structure"
repoUrl: "https://github.com/zalmoxes-laran/ExtendedMatrix/tree/EM_v1.5/07_FolderTree"
licence: "CC-BY-SA 4.0"
status: stable
roles: [archaeologist]
order: 12
---

## What it is

The **EM Folder Tree** is the canonical project structure for an
Extended Matrix project. It is a small zipped scaffold that you
unzip into the root of your project folder before you start
authoring nodes in yEd or annotating proxies in Blender.

It contains:

- the `DosCO` directory — the *document collection*, the place where
  every source file you intend to cite as a `Document` node lives,
  named with the `D.NN` convention (`D.01_florence_state_archive_…`,
  `D.02_aerial_orthophoto_…`, etc.);
- canonical sub-folders for graphs, exports, source lists, and
  intermediate artefacts so the project tree stays predictable;
- README placeholders inside each folder pointing at the relevant
  manual page.

## Why use it

The folder tree is an **EM language convention**, not bound to any
single tool. It lets multiple collaborators on the same project
find each other's documents and exports without a per-project
naming discussion. It also lets EM Tools (and any other consumer
of the project tree) discover documents by convention rather than
by configuration.

## How to install

Download the zip from the link on the version page, unzip it into
the root of your new project, and start populating the `DosCO`
folder with the sources you intend to cite.

---
name: "s3dgraphy"
role: "Python library"
summary: "The computational core of the EM Framework. Reads, writes, validates and converts EM graphs (GraphML / JSON), enforces the data model, and powers every other tool in the framework."
docsUrl: "https://docs.extendedmatrix.org/projects/s3dgraphy/"
repoUrl: "https://github.com/zalmoxes-laran/s3dgraphy"
licence: "GPL-3.0"
status: stable
roles: [developer]
order: 30
---

## What it is

**s3dgraphy** is the Python library that implements the Extended Matrix
formal language as a property knowledge graph. It is what every EMF tool
reads and writes under the hood — yEd produces the GraphML, EM Tools
loads it through s3dgraphy, Heriverse consumes its JSON export.

You normally do not interact with s3dgraphy directly: EM Tools wraps it
inside the Blender add-on. You will reach for the library when you want
to **bring EM into a different platform** — Revit, 3ds Max, Unity,
Unreal, a CLI batch job, a Jupyter notebook.

## Installing

```bash
pip install s3dgraphy
```

See the [GitHub repository](https://github.com/zalmoxes-laran/s3dgraphy)
for the API reference and the import/export utilities.

## When to use it

- You are building a custom pipeline that needs to read EM graphs.
- You want CI validation of the graphs in your repository.
- You are integrating EM into a host platform that is not Blender.
- You are writing code that talks to the Heriverse JSON format directly.

## Production users & integrations

[**PyArchInit**](/tools/pyarchinit/) is the first production consumer of
s3dgraphy. It is an open-source QGIS plugin for archaeological data
management with particular strength in **2D GIS visualization of
stratigraphic data**, maintained by an active community led by Luca
Mandolesi.

The PyArchInit integration drove the design of the `LocationNodeGroup`
in s3dgraphy 0.1.41 (insight from
[issue #5](https://github.com/zalmoxes-laran/s3Dgraphy/issues/5) by Enzo
Cocca). Use the [PyArchInit tool page](/tools/pyarchinit/) and the
[Extended Matrix manual cookbook](https://docs.extendedmatrix.org/en/latest/cookbook/pyarchinit_integration.html)
as a worked example of how an independent tool bridges into Extended
Matrix through s3dgraphy.

### Open invitation

s3dgraphy is designed to be consumed by other independent tools.
**Revit**, **Unreal Engine**, **Houdini**, **PostgreSQL/PostGIS**, and
similar domain-specific tools are natural candidates for similar
bridges. If you maintain such a project and want to explore an
integration, look at PyArchInit as a worked example or
[open a discussion on GitHub](https://github.com/zalmoxes-laran/s3Dgraphy/discussions).

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

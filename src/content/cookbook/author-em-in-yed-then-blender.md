---
title: "Author EM in yEd, render in Blender"
summary: >
  End-to-end recipe that takes a freshly drawn Extended Matrix
  from yEd, through the EM Tools Stratigraphy Manager, all the way
  to a navigable Blender scene with proxies linked to the graph.
  Three tools, three manuals, one workflow.
tools_used:
  - yed-palette
  - em-tools
order: 100
draft: true
---

> *This recipe is a starter / pattern example for the new cookbook
> collection. It is currently marked `draft: true` while the body is
> being filled in. When the body is final, flip `draft` to false.*

## What you'll do

You'll start from a stratigraphic sequence already excavated and
documented in field notes, draw it as an Extended Matrix in yEd
using the EM palette, hand the resulting GraphML file to EM Tools,
build proxy volumes inside Blender for each stratigraphic unit, and
end up with a 3D scene where every proxy carries the metadata of its
matching graph node.

## What you'll need

- **Blender 4.4 LTS or later** — installed via the
  [drag-and-drop card on extendedmatrix.org](https://www.extendedmatrix.org/tools/em-tools/#install).
- **yEd Graph Editor** — free download from
  [yworks.com](https://www.yworks.com/products/yed). The **EM palette**
  for yEd is the language's authoring surface; install it following
  the [Setting up the yEd palette](https://docs.extendedmatrix.org/en/1.5/mini_tutorials/setup_yed_palette.html)
  walkthrough in the EM language manual.
- A site or context to model. For a first try, a small two-or-three
  stratum cut is plenty — the workflow scales unchanged to larger
  projects.

## Steps

### 1. Author the matrix in yEd

Follow the EM language manual's [Draw your first Extended Matrix](https://docs.extendedmatrix.org/en/1.5/draw_the_matrix.html)
walkthrough. Save the resulting `.graphml`.

### 2. Open the graph in EM Tools

In Blender, open the **EM Tools** sidebar (right side of the 3D
Viewport). Use the **EM Setup** panel to import the `.graphml`.
The **Stratigraphy Manager** panel populates with one row per
stratigraphic unit.

See the [EM Setup panel reference](https://docs.extendedmatrix.org/projects/EM-tools/en/1.5/panels/em_setup.html)
and the [Stratigraphy Manager reference](https://docs.extendedmatrix.org/projects/EM-tools/en/1.5/panels/stratigraphy_manager.html)
for the details.

### 3. Model proxies for each unit

For each US in the Stratigraphy Manager list, create a volumetric
proxy that approximates the spatial extent of that unit. The
[Build proxies](https://docs.extendedmatrix.org/projects/EM-tools/en/1.5/tutorials/build-proxies.html)
how-to in the EM Tools manual walks through this end-to-end.

### 4. Link proxies to their graph rows

In the Stratigraphy Manager, use the **link** button to connect each
proxy mesh to its corresponding graph row. From this point the proxy
carries the row's metadata — selecting the proxy highlights the row,
toggling the row's visibility hides/shows the proxy.

### 5. Save and iterate

Save the `.blend` alongside the `.graphml`. The two files are the
canonical pair — the `.graphml` is the matrix, the `.blend` is the
3D substrate. Edit either side independently and re-import / refresh
to sync.

## Where to go next

- **Publish to the web**: see the upcoming *Start from a published
  dataset → publish your own* recipe (Heriverse integration).
- **Add survey data**: see the upcoming *Drone survey → reconstruction*
  recipe (3DSC integration).
- **Build a 2D plate** (prospetto / sezione) from the resulting scene:
  see the [DP-34 Label & Layout System](https://dev.extendedmatrix.org/devprojects/dp-34-label-and-layout-system/)
  page on the dev tracker for the upcoming MVP.

## Recipe pattern (notes for editors)

This recipe demonstrates the cookbook pattern:

1. **What you'll do** — single paragraph in plain language.
2. **What you'll need** — links INTO each tool's install path, never
   embedded.
3. **Steps** — short narrative sections; each step that uses a tool
   links into the tool's reference at the right depth. The recipe
   does not duplicate panel reference content.
4. **Where to go next** — cross-recipe pointers + dev-tracker links
   for in-flight work.

When draft becomes false, this recipe goes live at
`/cookbook/author-em-in-yed-then-blender/`.

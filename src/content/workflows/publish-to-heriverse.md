---
title: "Publish your reconstruction to Heriverse"
summary: >
  Take a complete EM Tools scene (graph + proxies + RMs) and publish
  it as a navigable Heriverse experience — web-based, paradata
  pop-ups, epoch switching, optionally collaborative VR. The natural
  endpoint of an EM Tools authoring loop.
tools_used:
  - em-tools
  - heriverse
order: 80
draft: true
---

> *Stub — recipe body is being authored. When the body is final,
> flip `draft: false` to publish.*

## What you'll do

Export an EM Tools scene (the graph, the proxies, the Representation
Models, the per-graph georeferencing) as a Heriverse-compatible
bundle, push it to the Heriverse platform, and verify that the
published scene is navigable in the browser with paradata pop-ups
working correctly.

## What you'll need

- An EM Tools scene where the graph, the proxies and (optionally)
  the RMs are all linked. If you don't have one yet, start from the
  [Author EM in yEd, render in Blender](/workflows/author-em-in-yed-then-blender/)
  recipe.
- A **Heriverse** account or local Heriverse instance — see the
  [Heriverse manual](https://docs.extendedmatrix.org/projects/heriverse/)
  for setup.
- Optionally: a dedicated Heriverse project to publish into; or use
  the default account project.

## Steps

### 1. Sanity-check the EM Tools scene

*[TBD — narrative: every USV has a RM linked, every paradata chain
resolves, no broken Document instance references. Link to the
Export Statistics panel in the EM Tools manual.]*

### 2. Configure the Heriverse export

*[TBD — the Heriverse export panel (EM Tools side), pick the
target project, decide which graphs to bundle (single vs
multigraph), pick the publishable filter (DP-32 propagative
metadata). Link to the canonical Heriverse export reference.]*

### 3. Push the bundle

*[TBD — actual upload step, expected timing, what to watch for in
the upload progress.]*

### 4. Verify the published scene

*[TBD — open the Heriverse URL, sanity-check epoch switching,
verify paradata pop-ups on US clicks, sources panel, citation
chain. Link to the Heriverse end-user navigation reference.]*

### 5. Iterate

*[TBD — re-export after authoring changes; Heriverse handles version
deltas; the cite-this-scene metadata stays attached.]*

## Where to go next

- *Add 2D plates derived from the scene*: see DP-34's MVP for
  prospetto / sezione authoring once it lands in 1.6.
- *Cross-reference your published scene from a publication*: the
  Heriverse manual covers the citation-stable DOI minting flow.

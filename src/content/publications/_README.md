# Publications collection

This folder holds the bibliographic record of the Extended Matrix ecosystem.
The `/publications` page reads every `.md` file here (except files starting
with `_`, like this README) and renders them in two sections:

- **Foundational papers** — papers that *define* EM (the formal language,
  the framework, the method). `kind: foundational`.
- **Applications** — papers from the community that *use* EM on a specific
  case study or project. `kind: application`.

## How to add a new publication

Create a file `src/content/publications/<year>-<short-slug>.md`. Frontmatter
shape:

```yaml
---
title: "Full title of the paper, capitalised as in the original."
authors: "Demetrescu, E.; Cocca, E."     # semicolon-separated, surname-first
year: 2026
venue: "Journal name, volume(issue), pages"   # optional but encouraged
doi: "10.1016/j.example.2026.01.001"     # optional
url: "https://doi.org/10.1016/j.example.2026.01.001"  # optional fallback
pdfUrl: "https://example.org/paper.pdf"  # optional OA copy
kind: foundational                       # or "application"
emVersion: "1.5 LTS"                     # optional, mostly for applications
project: "villa-of-aiano"                # optional, slug from projects/
tagline: "One-sentence summary that appears under the title."
featured: false                          # true → pinned to top of section
order: 0                                 # tie-breaker within a year
bibtex: |
  @article{author2026short,
    author  = {Author, A.},
    title   = {Title},
    journal = {Journal},
    year    = {2026},
    doi     = {10.1016/...}
  }
---

Optional body text — a short abstract or context paragraph. Shown on the
publication card in a collapsible "More" panel. Keep it under ~120 words.
```

## Ordering

Within each section (foundational / application), entries are sorted:

1. `featured: true` first, then everything else.
2. Year descending (newest first).
3. `order` ascending within a year (use this to break ties — same year,
   same featured flag).
4. Title ascending as the final tie-breaker.

## Citation rule vs. bibliography

The `/cite` page is the operational guide: *"when you use EM, what should
you cite?"*. It pulls from `versions[].flagPaper`, not from this folder.

This folder is the bibliography: *"what papers exist around EM?"*.

A foundational paper here may also appear as the flag paper of a version
(e.g. the 2015 paper is both the foundation and the flag paper of 1.0).
That overlap is intentional — keep both in sync when editing.

## Community submissions

Authors who publish a paper using EM are invited to share the DOI through
the contact form (or directly via email / Telegram / a PR). The website
maintainer adds the entry here under `kind: application`. We do not
auto-import from a citation index because we want a small editorial bar
on what gets featured (relevance to the method, not just any mention).

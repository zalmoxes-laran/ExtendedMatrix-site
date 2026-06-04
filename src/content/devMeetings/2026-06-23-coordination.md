---
title: "Dev coordination — June public sync"
date: 2026-06-23T15:00:00+02:00
attendees: []
decisions: []
actionItems: []
upcoming: true
meetingUrl: "https://teams.microsoft.com/meet/388419352314569?p=qvWgByiUm0jGtpW4mQ"
# Async agenda gathering happens in the GitHub Discussions thread
# linked below. Open this URL once the thread is created on the
# ExtendedMatrix-dev-site repo under the "Meeting Notes" category.
# discussionUrl: "https://github.com/zalmoxes-laran/ExtendedMatrix-dev-site/discussions/NNN"
tldr: "First public dev meeting of the post-1.5 cycle. EM 1.5 LTS shipped, PR #28 (Postgres pyArchInit backend) merged, DP-61 (Mappings Registry) on the table. Open floor on Sub-3 timing and how to contribute."
nextMeeting: 2026-07-21T15:00:00+02:00
---

## Standing agenda

This meeting follows the standard
[blender.org module meeting](https://devtalk.blender.org/c/blender/module-meetings/)
format. Open by default, notes-first, decisions visible.

1. **Announcements & releases** since the last meeting.
2. **PRs and proposals** on the table.
3. **Architectural decisions** to discuss.
4. **Open floor.**

## How to participate

- **Async, before the meeting**: drop agenda items in the
  [Meeting Notes discussion thread](https://github.com/zalmoxes-laran/ExtendedMatrix-dev-site/discussions/categories/meeting-notes)
  on the ExtendedMatrix-dev-site repo. The thread is open from a
  week before the meeting; the maintainer pins the top agenda items
  to the body once the deadline closes.
- **Live, during the meeting**: join the Teams call linked above —
  it opens in the browser, no Microsoft account required. Teams will
  ask you for a display name on the join page; please use your real
  name (and an affiliation if relevant). Speak up on any agenda item;
  raise your hand for "open floor" topics.
- **After the meeting**: the maintainer transcribes the discussion
  into this page (TL;DR, decisions, action items in the frontmatter
  + per-topic narrative in the body). The discussion thread stays
  open for follow-up questions.

## Topics expected this session

Based on what landed since the last meeting and what's currently in
flight, the following topics are likely:

### Topic 1 — EM 1.5 LTS retrospective

**Discussion:** what worked / what didn't in the 1.5 release process.
EM 1.5 LTS shipped with Landscape mode, CronoFilter, Document
Manager, Proxy Box Creator, and `s3dgraphy` standalone on PyPI.
What was the friction? What's the LTS commitment going forward?

*Decision (to be filled in after the meeting).*

*Action items (to be filled in after the meeting).*

### Topic 2 — PR #28 wrap-up & Sub-3 plan

**Discussion:** PR #28 (PostgreSQL/PostGIS backend for pyArchInit
imports, contributed by Enzo Cocca) merged into
`EM-tools_v1.6.0_dev`. The smoke test was green; follow-up items
landed on `main` via three separate commits (SpatiaLite fixtures,
pytest scaffolding migration, dead-stub cleanup). Open question for
@enzococca: **Sub-3 (reverse export) — same branch, same PR style,
which week?** Asking so the s3dgraphy-side write-path review can be
lined up at the right moment.

*Decision (to be filled in after the meeting).*

*Action items (to be filled in after the meeting).*

### Topic 3 — DP-61 EM Mappings Registry & Builder

**Discussion:** DP-61 has just been drafted on the dev-site
(`dev.extendedmatrix.org`). It proposes a community-curated
registry of mapping JSONs served from
`mappings.extendedmatrix.org`, with an embedded client-side mapping
builder and a publish-as-PR flow. Four open decisions are called
out in the notes — subdomain, hosting, PR review policy, builder
embed style. This meeting is the natural place to converge on
those.

*Decision (to be filled in after the meeting).*

*Action items (to be filled in after the meeting).*

### Topic 4 — How to contribute (always-on item)

**Discussion:** standing slot for anyone who wants to contribute
but doesn't know where to start. Bring the kind of work you'd like
to do (code, manual, integrations, case studies) and we'll match
it to what's open. ORCID-tagged contributions are welcome (see
DP-59 for the long-term identity layer); anonymous contributions
are equally welcome.

### Topic 5 — Open floor

Anything that didn't fit above. Raise your hand during the call,
or drop it into the discussion thread before/after.

---

*Decisions and action items reached during the meeting are
populated in the frontmatter above and shown as side cards on the
page. The body of this file becomes the verbatim narrative — keep
edits to the body in plain prose so readers can scan it without
clicking around.*

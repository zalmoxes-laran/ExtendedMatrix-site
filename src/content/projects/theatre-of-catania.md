---
title: "The Roman Theatre of Catania"
year: 2022
period: "SSHOC Task 5.7 — Implementation plan 2020 · Final report 2022"
location: "Catania, Sicily, Italy"
partners:
  - "DAI — Deutsches Archäologisches Institut (Wolfgang Schmidle, task lead)"
  - "CNR-ISPC, Rome (former ITABC) — Emanuel Demetrescu, Bruno Fanini"
  - "CNR-ISPC, Lecce (former IBAM) — Alberto Bucciero, Alessandra Chirivì, Ivan Ferrari, Francesco Giuri"
  - "Politecnico di Torino — Elisabetta Caterina Giovannini"
  - "European Commission, SSHOC — Social Sciences & Humanities Open Cloud (H2020 grant 823782)"
website: "https://doi.org/10.5281/zenodo.6718970"
summary: "SSHOC Task 5.7 archaeological case study — a virtual reconstruction of the Roman theatre of Catania piloting the transition of archaeological documentation from individual-computer data silos to cloud-published, CIDOC-CRM-aligned Linked Open Data. The Extended Matrix is the reconstruction-side workflow; legacy and new data are integrated in one unified pipeline."
featured: true
order: 60
cover: ../../assets/projects/2021_catania.jpg
coverAlt: "The Roman Theatre of Catania — virtual reconstruction"
---

## The site, the previous record

The Roman theatre of Catania occupies the south-eastern slope of the Acropolis hill, partly visible today between Via Vittorio Emanuele II and Via Teatro Greco, partly buried under the dense urban fabric of the modern city centre. The visible monument is the result of successive interventions: the imperial-period Roman building reuses an earlier Greek theatre, and centuries of post-antique re-occupation (medieval houses, Baroque-era construction) have both partially preserved and partially obscured the original architecture. A long sequence of archaeological investigations from the 19th century onwards has produced a substantial body of legacy documentation — drawings, photographs, partial surveys, hypothetical reconstructions — across multiple media and across decades of changing recording conventions.

That **mix of legacy and new data, across multiple formats, custodians and projects**, made the theatre a particularly informative case study for asking how archaeological reconstruction can move out of single-machine data silos and into a shared, queryable, FAIR-aligned cloud-based environment.

## SSHOC Task 5.7 — the case study frame

The work documented on this page was carried out within **SSHOC Task 5.7 — *Open Linked Data. Archaeology Case Study***, a sub-task of the **Social Sciences & Humanities Open Cloud** EU H2020 project (grant agreement **823782**). The task partners were the **Deutsches Archäologisches Institut (DAI)**, the **CNR Institute for Heritage Science (ISPC)** branches in Rome (former ITABC) and Lecce (former IBAM), and the **Politecnico di Torino**. The case-study work spanned 2020 (implementation plan, deliverable **D5.17**) through 2022 (final report, **D5.18**), with supporting publications on the CIDOC-CRM mapping discipline (milestone **MS37**) and a conference paper presenting the integrated workflow.

The task's framing was explicit: build a **unified workflow that starts at the archaeological documentation and ends at a published virtual reconstruction**, so that data manually acquired during excavation — historically captured on paper or on someone's laptop — can flow through to cloud-hosted 3D visualisations without losing its provenance, its semantic structure, or its reusability for other researchers later on.

## How the Extended Matrix was used

EM was the reconstruction-side backbone of the Catania pipeline. Two distinguishing characteristics of the case study made it particularly demanding for EM:

- **Heterogeneous data sources.** Part of the input was newly acquired during the SSHOC project (photogrammetry, laser scans, fresh stratigraphic surveys). Part came from earlier projects — sometimes decades older, stored in proprietary formats, and originally not designed for re-use. Both streams had to flow into the same EM graph and be queryable side by side. The Extended Matrix is well-suited for this because it formalises the reasoning chain (Document → Extractor → Combiner → Property) rather than the value alone, so a 1970s field drawing and a 2021 laser scan can both be cited as Documents supporting the same reconstructive claim, with the difference in their epistemic weight made explicit in the graph rather than glossed over.
- **CIDOC-CRM alignment as a hard requirement.** Because the deliverable's downstream goal was Linked Open Data publication, the EM-internal vocabulary had to be mapped to CIDOC-CRM (and to specialised extensions where appropriate) cleanly and unambiguously. This produced the dedicated milestone deliverable **MS37 — Unified CIDOC CRM mapping of the Extended Matrix and the LOD scenario** (Schmidle, Demetrescu, Giovannini 2022), which feeds back into the EM formalism itself — the alignment work informed how subsequent EM versions formalised classes and properties that the case study had stressed.

## 4D virtualisation in a Linked Open Data scenario

The final output of the task is not a single 3D model but a **4D virtualisation embedded in a Linked Open Data scenario**: the 3D reconstruction is published with multiple entry points — by place, by time period, by source dossier, by reconstructive hypothesis — so that a researcher can examine, compare and search the model from any of those angles. The underlying data model is aligned with CIDOC-CRM; the temporal and spatial dimensions are anchored to normative gazetteers (for place) and chronological frameworks (for time). What enters the cloud is therefore not just "a model of the theatre" but a **navigable knowledge graph in which the model is one published view**.

## Why this case study mattered for the EM ecosystem

Catania was the first large-scale stress test of three things that have since become structural elements of the EM 1.5–1.6 lifecycle:

- **The CIDOC-CRM mapping of EM** — codified in MS37, refined in subsequent EM ontology work (`em.ttl` in EM 1.6), and now the basis of the RDF Export layer that 1.6 ships.
- **Legacy-and-new-data integration as a first-class workflow** — the practice of reading historical archaeological records into the EM graph alongside newly captured data is now standard EM practice; the Catania case study is its canonical demonstration.
- **The collaborative reconstruction model** — multiple partners contributing to a single reconstruction, each documenting their slice through the EM graph rather than producing parallel and competing reconstructions, is the workflow shape that the SSHOC task validated and that several later projects have inherited.

## References

Bucciero A., Chirivì A., Delbarba N., Demetrescu E., Fanini B., Ferrari I., Giuri F. (2022). *Formal representation of heterogeneous data for interoperability and collaborative virtual reconstruction in cultural heritage. The case study of the Roman Theatre of Catania.* Conference paper. DOI: [10.5281/zenodo.8130978](https://doi.org/10.5281/zenodo.8130978).

Schmidle W., Demetrescu E., Fanini B., Bucciero A., Chirivì A., Ferrari I., Giuri F., Giovannini E.C. (2022). *D5.18 Report on the archaeological case study.* SSHOC project deliverable v1.0. DOI: [10.5281/zenodo.6718970](https://doi.org/10.5281/zenodo.6718970).

Schmidle W., Demetrescu E., Giovannini E.C. (2022). *MS37 Unified CIDOC CRM mapping of the Extended Matrix and the LOD scenario.* SSHOC project milestone v1.0. DOI: [10.5281/zenodo.6794671](https://doi.org/10.5281/zenodo.6794671).

Schmidle W., Pescarin S., Demetrescu E., Fanini B., Gabellone F., Bucciero A., Chirivì A., Ferrari I., Giuri F. (2020). *D5.17 Implementation plan for the archaeological case study.* SSHOC project deliverable. DOI: [10.5281/zenodo.3931706](https://doi.org/10.5281/zenodo.3931706).

Schmidle W., Bucciero A., Demetrescu E., Fanini B., Kritsotaki A. (2021). *SSHOC archaeological case study Workshop — The Roman theatre in Catania from survey to interactive 4D visualisation.* SSHOC project workshop report.

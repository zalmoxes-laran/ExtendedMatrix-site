---
title: "The Roman Forge of Montebelluna (Posmon)"
year: 2020
period: "Excavation 2006–2010 · Virtual reconstruction 2019–2021"
location: "Posmon, Montebelluna (Treviso), Veneto, Italy"
partners:
  - "Università di Padova, Dipartimento dei Beni Culturali (Archeogeo project lead)"
  - "CNR-ISPC, DHiLab (former VHLab), Rome — virtual reconstruction"
  - "Comune di Montebelluna"
  - "Soprintendenza Archeologia Belle Arti e Paesaggio per l'Area Metropolitana di Venezia"
  - "Museo di Storia Naturale e Archeologia di Montebelluna"
  - "Fondazione Cassamarca (funding)"
  - "LTS — Land Technology & Services, Treviso (laser scanning + UAV survey)"
summary: "An interdisciplinary Padova team excavated a Roman forge with a rare 'raised forge' arrangement on the western edge of the ancient Montebelluna settlement (2006–2010); CNR-ISPC then produced a virtual reconstruction with the Extended Matrix for the 'Sapiens — From Hunter to Cyborg' exhibition opened 15 Feb 2020."
order: 70
cover: ../../assets/projects/2019_montebelluna.jpg
coverAlt: "The Roman Forge of Montebelluna — virtual reconstruction"
---

## The site

Posmon is a locality on the western edge of the ancient Montebelluna settlement, at the foot of the Treviso hills where the Piave river enters the plain. The area held a Venetic-then-Roman cemetery in continuous use from the late 8th century BCE to the 1st–2nd century CE. In 2001 a routine pre-development check on Lot 14 — a parcel scheduled for residential subdivision — uncovered the remains of a Roman building under what had been catalogued until then as the cemetery's eastern margin. The Municipality acquired the lot in a land swap and made it available for research; **Fondazione Cassamarca** funded five excavation campaigns between 2006 and 2010 under the **Archeogeo** project, led by the **University of Padua, Department of Cultural Heritage**.

What the excavation found was unusual. After a Venetic-phase cremation cemetery (six tombs identified inside Lot 14, the earliest 7th–6th century BCE) and a long abandonment hiatus, the first building was erected between the late 1st century BCE and the early 1st century CE — already adopting the construction techniques typical of the Veneto Roman pedemontana: stone-and-tile socles, pisé walls above, tiled and ridge-tiled roof. Within decades that first building was levelled and replaced by a larger workshop complex of eight rooms arranged on three sides of a rectangular courtyard, occupying a total of 215 m². Of those eight rooms, room **G** — about 20 m² with an independent southern entrance and a slightly lowered floor — was a **forge**.

## A rare 'raised forge'

The room's floor was a tight palimpsest of charcoals, ashes, slag and microscopic hammerscales — the residue of iron working. A systematic 30-cm grid excavation of the deposits, paired with morphological/quantitative/distributive analysis of the hammerscales, identified the workshop's full layout: a central forge **raised on a quadrangular stone-and-tile platform** (rather than the more common in-ground forge of Roman metallurgy), the anvil seated on a wooden stump in a circular fossa adjacent to the platform, the smith's primary working position to the north of the anvil and west of the forge, an assistant's secondary position to the south, a wooden workbench and tool rack against the western wall, and a charcoal/bellows-support area to the south-east. Confirmation came from the iconographic record (Aquileia funerary stele, Sens stele, Scarpone-Nancy cippus, Domitilla catacombs tabella, the L. Cornelius Atimetus monument), which depicts forges of exactly this configuration on tombstones from the late 1st century CE onwards.

The Montebelluna forge is therefore an unusually **early and well-preserved example of the 'raised forge' transition** — a configuration that marked a fundamental shift toward modern forge ergonomics and that is otherwise known mostly through Roman funerary reliefs. The building was in use for over a century (mid-1st CE to 2nd CE), then gradually destructured between the late 2nd and mid-3rd century CE, abandoned, partially spoliated, and finally buried by hill-slope colluvial events.

## Methodological novelties (Archeogeo, 2006–2010)

The Archeogeo dig pushed several methodological frontiers — many shared in the publications listed below:

- **Open-source GIS stack**: the entire planimetric record (US contours, finds, soil samples) was managed inside **QGIS** with a relational **PostgreSQL/PostGIS** geo-database with custom SQL functions to automate field compilation.
- **Anastylosis on site**: one of the collapsed wall socles (room C) and a portion of the collapsed roof straddling rooms G and I were dismantled tile by tile, numbered, and reassembled outside the excavation area — providing direct evidence on construction technique and a strong communication asset for school visits.
- **30-cm gridded excavation** of the forge floor with mini wooden stakes (no string interference), letting microresidues be collected by cell for distributive analysis.
- **Fabric analysis** applied for the first time to a Roman-period site — measuring orientation and dip of each deposit component to reconstruct formation, original arrangement and post-depositional history. On the room-G roof collapse it confirmed an east–west double-pitched roof; on some of the wall socles it revealed anthropic reworking that the field interpretation had read as natural decay.
- **On-site geoarchaeological lab**: a field-built water sieving battery (initially manual, later motorised — a prototype by Mattia Segata) plus a solar dryer let the team build a granulometric profile of nearly every excavated stratum. The fine-fraction analysis confirmed that the walls above the stone socles were in **pisé** (compressed sun-dried earth), and quantified the clay/silt/sand/gravel proportions distinguishing the pisé from the socle's binding earth.
- **Two new conceptual recording units** beyond the standard US/USM: **UG** (*Unità Geoarcheologica* — a 4D volume distinguished on geometric / pedological / sedimentological / archaeological / functional criteria) and **UL** (*Unità Logica* — a structural element that no longer survives but whose existence is logically required by the stratigraphy, e.g. a wooden beam connecting two otherwise unanchored posts). The **UL** concept anticipated, at excavation time, the reasoning about non-preserved structural elements that later virtual reconstruction would need — aligning closely with the **USV/s** (Virtual Stratigraphic Unit, structural) of the Extended Matrix.
- **3D capture**: two campaigns of **laser scanning** and **UAV photogrammetry** (by LTS — Land Technology & Services of Treviso) provided the geometric base for the virtual reconstruction.

## From the excavation record to the virtual reconstruction (with Extended Matrix)

For the **Sapiens — From Hunter to Cyborg** exhibition at the Montebelluna Museum of Natural History and Archaeology (opened **15 February 2020**), the **DHiLab** (former VHLab) of **CNR-ISPC** in Rome collaborated with the Padua team to produce a virtual reconstruction of the forge and the surrounding building using the **Extended Matrix (EM) methodology** (then at version 1.2). The reconstruction process documented the full reasoning chain from archaeological evidence to 3D hypothesis:

- **Digital replica of the excavation**: laser-scan + UAV data were imported into Blender and processed through the **[3D Survey Collection (3DSC)](/tools/3dsc/)** open-source add-on, producing decreasing levels of detail for downstream use.
- **Proxy modelling**: the planimetric vectors from QGIS were used as a visual reference for proxy modelling of every stratigraphic unit; the proxies are the volumetric 3D representation of each US (Demetrescu & Fanini 2017).
- **Excavation matrix**: a stratigraphic matrix of the wall structures was authored in yEd and linked back to the 3D proxies through **EM-blender-tools** (then *EMtool*) — letting the team navigate the dig in time, slice by slice, with the matrix and the 3D scene synchronised.
- **Reconstructive hypothesis**: virtual stratigraphic units (USV) were proposed for the non-preserved elements (forge platform, anvil stand, workbench, roof structure, walls above the socles, bellows, tool rack) and validated through the EM formal language — every USV is anchored to one or more documentary sources (iconographic comparanda, archaeometallurgical literature, site-internal evidence) collected in a **dossier comparatif** queryable alongside the model.
- **Final representation model**: once the volumetric hypothesis was settled, a higher-resolution representation model with PBR-based realistic materials (stone, brick, pisé, wood, iron, charcoal) was produced for the exhibition's interactive 3D experience.

The result is a database of 3D models describing the building at two distinct epochs (Roman use-period and excavation moment), linked to the Extended Matrix that records the structures found, the reconstructive hypotheses, the sources used and the analytic chain connecting them.

## The Sapiens exhibition and the Archaeological Garden

The reconstruction is on display at the **Museo di Storia Naturale e Archeologia di Montebelluna** as part of the **Sapiens — Da cacciatore a cyborg** permanent exhibition section dedicated to *uomo-artigiano*, alongside a 1:1 partial physical reconstruction of the forge, the ritually-deposited *olla* found under one of the room E thresholds, and a selection of iron tools restored from the original finds. The exhibition opened 15 February 2020 — days before COVID-19 closed the museum; the difficulty stimulated complementary digital communication strategies that broadened the project's reach beyond physical visits.

On the original site itself, the building has been preserved in situ under an **Archaeological Garden**: the buried structures are *outlined above ground* by a boxwood hedge and explained by illustrative panels — a long-term protective shell pending the conditions for full public reopening.

## Dedication

The contribution this page draws on is part of *Larici amicae in silva humanitatis*, a tribute volume for **Anna Larese**, the Soprintendenza inspector who shared the excavation from the day of discovery, who fought to protect the remains under the Archaeological Garden, and who would have rejoiced when the site is one day fully returned to the public.

## References

Busana M.S., Francisci D., Demetrescu E. (2021). *La fucina romana di Montebelluna, dall'evidenza archeologica alla ricostruzione virtuale. Metodologie integrate per lo studio e la valorizzazione di uno scavo.* In *Larici amicae in silva humanitatis. Scritti di archeologia per Annamaria Larese* (Ante Quem, Bologna), pp. 205–212. ISBN 978-88-7849-166-3. [hdl: 11577/3401556](https://hdl.handle.net/11577/3401556).

Bernardi L. (2016). *La fucina romana di Montebelluna, località Posmon (Treviso). Studio dei micro-residui di forgiatura del ferro.* **Archeologia Veneta** 39: 122–151.

Busana M.S. & Bernardi L. (2018). *Il ciclo produttivo del ferro: nuove chiavi di lettura degli indicatori archeologici.* In M. Cavalieri & C. Boschetti (eds.), *Multa per aequora. Omaggio a Sara Santoro*, Fervet Opus 4, Presses Universitaires de Louvain: 399–432.

Busana M.S. (2017). *La forgia rialzata di Montebelluna, loc. Posmon (Treviso): tra "visibilità" iconografica e "invisibilità" archeologica.* In M. Cupitò, M. Vidale, A. Angelini (eds.), *Beyond Limits. Studi in onore di Giovanni Leonardi*, Quaderni di Antenor 39, Padova University Press: 675–683.

Busana M.S., Francisci D., Angelini I., Asolati M., Bacchin A., Bernardi L., Molin G., Rinaldi F., Rossi C., Segata M. (2012). *Un edificio artigianale di età romana a Montebelluna (Posmon, Lotto 14): risultati preliminari.* In *Carta geomorfologica e archeologica del Comune di Montebelluna. Il Progetto Archeogeo*, Museo di Storia Naturale e Archeologia di Montebelluna: 233–273.

Busana M.S., Francisci D., Larese A. (2011). *L'edificio produttivo romano di Montebelluna, loc. Posmon (Treviso): indagini 2009–2010.* **Quaderni di Archeologia del Veneto** 27: 44–48.

Busana M.S., Francisci D., Larese A., Rinaldi F. (2008). *Indagini archeologiche su un edificio produttivo di età romana a Montebelluna, loc. Posmon (Treviso).* **Quaderni di Archeologia del Veneto** 24: 26–32.

Francisci D. (2012). *Documentazione di scavo in open source: il caso di Montebelluna (TV).* In L. Bezzi, D. Francisci, P. Grossi, D. Lotto (eds.), *Atti del III Workshop Open Source, Free Software e Open Format nei processi di ricerca archeologica* (Padova, 8–9 maggio 2008), Quasar: 187–194.

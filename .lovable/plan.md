# Local SEO Service-Area Expansion Plan

## What already exists (audited today)

The site already ships a serious, non-thin service-area system:

- Route pattern `/service-areas/:slug` (`TownPage.tsx`), plus service+town combinations at `/service-areas/:townSlug/:serviceSlug` (`ServiceTownPage.tsx`) and counties at `/service-areas/county/:slug`.
- Rich per-town data model in `src/data/towns.ts` — hero, elevation, housing profile, climate exposure, local vibe, construction context, service demand mix, style tendency, neighborhoods, market authority angle, meta title/description, 3–4 sentence local relevance block.
- Deep proof content in `src/data/town-proof.ts` — per-town stats, job highlights, and unique local FAQs.
- Town LocalBusiness + FAQ schema via `buildPageSchema({ type: "town" })` in `SEOHead.tsx`.

Priority 1 (all 4) and most of Priority 2 & 3 are already live: Franklin, Highlands, Cashiers, Sylva, Bryson City, Waynesville, Cullowhee, Dillsboro, Hayesville, Murphy, Asheville, Hendersonville, Brevard.

## Realism review (before adding pages)

Recommended to add — real WNC target markets, tight to the existing Franklin hub:

- Scaly Mountain NC (Macon County, ~15 min from Highlands)
- Otto NC (Macon County, ~15 min from Franklin)
- Lake Glenville / Glenville NC (Jackson County — treat as one page with both names covered; same lake community)
- Lake Toxaway NC (Transylvania — high-end lake homes, real fit)
- Sapphire NC (Jackson/Transylvania — Plateau resort community)
- Cherokee NC (Swain — Qualla Boundary, tourism-heavy, real fit)

Flagged as questionable — will not ship pages unless you confirm:

- Robbinsville NC (Graham County) — 1.5+ hr drive from Franklin, thin residential market. Real trip cost. Recommend **skip** unless you actively want work there.
- Nantahala NC (Macon/Swain) — dispersed gorge community, mostly cabins/outfitters. Recommend **skip** as a dedicated page; it's better covered by a mention on the Franklin and Bryson City pages.

## Scope of work

### 1. Add 6 new town pages (data + proof, no template dumping)

For each of Scaly Mountain, Otto, Lake Glenville, Lake Toxaway, Sapphire, Cherokee:

- Full `TownData` entry with real Macon/Jackson/Swain/Transylvania county, real elevation, honest housing/climate/vibe/construction/style, distinct service demand mix, correct neighborhoods (e.g., Wildcat Cliffs is Highlands, not Scaly), unique authority angle.
- Unique `townLocalRelevance` block (2–4 sentences, natural keyword coverage — no stuffing).
- Meta title `Roofing & Construction Services in [Town], NC | Highlander` and unique meta description covering roofing, roof repair, roof replacement, metal roofing, gutters/skylights, construction, design services.
- Unique `TownProofContent` entry: 3 real stats, 2–3 job highlights (drawn from `projectDetails` where a real match exists, otherwise honest operational highlights — no fabricated projects), and 4 town-specific FAQs.

### 2. Align existing town pages with the requested section structure

`TownPage.tsx` already renders hero, local relevance, service mix, proof stats, job highlights, FAQs, and internal links. It's missing the explicit six-section layout the prompt names. Add (without rewriting the existing sections):

- Section: **Roofing Services in [Town], NC** (uses existing service demand mix, links to `/roofing`).
- Section: **Roof Repair, Roof Replacement & Metal Roofing** — three short blurbs, each linking to `/roofing/roof-repair`, `/roofing/roof-replacement`, `/roofing/metal`.
- Section: **Gutters, Skylights & Exterior Water Management** — links to `/roofing/gutters`, `/roofing/skylights`.
- Section: **Construction, Design Services & Outdoor Living** — links to `/construction`, `/construction/design`, `/construction/outdoor-living`.
- Section: **Why Mountain Homes in [Town] Need the Right Roof and Exterior System** — pulls from `climateExposure` + `constructionContext`.
- Keep existing proof / job highlights section (this is the "recent projects / RealWork" slot).
- Keep existing FAQ section.
- Final CTA: "Request an Inspection" → `/request-inspection` + `Call (828) 524-7773` → `tel:+18285247773` (already wired to JobTread lead form via `/request-inspection`).

### 3. Keyword targeting — natural, per town

Existing local-relevance and meta content already reads like human prose. For each town (existing + new), the six-section template above naturally covers: roofing company [town] NC, roofing contractor [town] NC, roofer [town] NC, roof repair [town] NC, roof replacement [town] NC, metal roofing [town] NC, gutter installation [town] NC, construction company [town] NC, home additions [town] NC, outdoor living [town] NC — one natural sentence per pattern, not repetition.

### 4. Sitemap + internal linking

- Add the 6 new slugs to `public/sitemap.xml`.
- Add the 6 new towns to `ServiceAreaMap.tsx` chip rows and `TownGrid.tsx` on the homepage so they get real internal links.
- Confirm `ServiceAreas.tsx` (index page) picks them up automatically from `towns` array (it does — verified during audit).

### 5. What is intentionally NOT changing

- The `/service-areas/:townSlug/:serviceSlug` matrix stays as-is; it's already generating unique content per town+service.
- Existing town pages get the section-structure upgrade but their unique local copy is preserved verbatim.
- No changes to schema builder, no changes to routing.

## Deliverables

- `src/data/towns.ts` — 6 new `TownData` entries + 6 new `townLocalRelevance` blocks.
- `src/data/town-proof.ts` — 6 new `TownProofContent` entries.
- `src/pages/TownPage.tsx` — insert the six-section local template between the hero and the existing proof block; keep every existing section.
- `src/components/ServiceAreaMap.tsx` and `src/components/TownGrid.tsx` — add the new towns to the chip/card lists.
- `public/sitemap.xml` — 6 new `<url>` entries.

## Open decisions for you

1. **Robbinsville NC** — add anyway, or skip as recommended?
2. **Nantahala NC** — add anyway, or skip as recommended?
3. **Lake Glenville vs Glenville NC** — one merged page (recommended: `/service-areas/lake-glenville-nc`, covers both names) or two separate pages?

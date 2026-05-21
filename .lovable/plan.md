
# Highlander Strategic Refactor Plan

A disciplined transition from "visual demo with everything" to a focused premium local authority site. Roofing leads, construction supports, everything else gets pruned or merged.

---

## 1. Structural Audit (Current State)

**Homepage (`/`)** has 18+ stacked sections including Hero, TrustStrip, DualPathway, ValueProposition, SilentObjections, ProofMoment (×4), ServicesGrid, ProjectPathfinder, ConstructionAuthority, BuiltForWNC, OurProcess, FeaturedProjects, MeetTheTeam, BlogInsights, HomepageTrust, TownGrid, ProjectConcierge, InspectionForm, CTABlock. This is the core clutter problem — too many sections doing overlapping jobs.

**Roofing Division** (6 pages): residential, roof-replacement, roof-repair, storm-damage, commercial, specialty. Missing dedicated **Metal** and **Brava/Synthetic** pages — the two highest-value premium service categories.

**Construction Division** (5 pages): additions, renovations, exterior, outdoor-living, custom. "Renovations" (kitchens/baths/basements) and "Custom" are outside the stated focus and dilute the message.

**Tools / Sprawl**: `/roof-designer` (AI visualizer), `/free-tools`, `/storm-center`, `/seo-checklist`, `/internal-linking-qa`, `/keyword-map`, `/seo-launch-qa`, `/seo-monitoring`, paid-ads landing pages (`/lp/*`), `/commercial-roofing`, `/commercial-maintenance`, `/gutters`, `/outdoor-living`, `/construction-services` (legacy duplicates of `/services/:slug`).

**Services hub** (`/services`) duplicates the division pages. **Repeated CTAs/proof** appear 4–6 times per page via ProofMoment, TrustStrip, HomepageTrust, CTABlock, StickyMobileCTA, InspectionForm.

---

## 2. Remove

**Pages**
- `/roof-designer` — gimmicky AI visualizer; doesn't support premium trust or qualified leads. Remove route, component, edge function, and storage policies.
- `/free-tools`, `/seo-checklist`, `/internal-linking-qa`, `/keyword-map`, `/seo-launch-qa` — internal/SEO scaffolding never meant for public traffic. Remove from app routes (keep `/seo-monitoring` admin-only).
- `/storm-center` — merge essential storm content into `/roofing/storm-damage` as a single section; remove the standalone destination.
- `/commercial-roofing`, `/commercial-maintenance`, `/gutters`, `/outdoor-living`, `/construction-services` — legacy duplicate routes pointing at generic `ServicePage`. Add 301-style redirects to canonical division pages.
- `/services` and `/services/:slug` — superseded by division pages. Redirect to `/roofing` or `/construction` as appropriate.
- `/construction/renovations` — kitchens/baths/basements are explicitly out of focus.
- `/construction/custom` — "we build anything" positioning the user said to avoid.
- `/roofing/specialty` — fold premium specialty (Brava/synthetic) into a dedicated focused page (see §6).

**Homepage sections**
- `ProjectPathfinder` (interactive quiz — gimmick, overlaps DualPathway)
- `SilentObjections` (long, wordy, overlaps ValueProposition)
- 3 of 4 `ProofMoment` instances (keep one)
- `HomepageTrust` (duplicates TrustStrip)
- `ConstructionAuthority` (overlaps DualPathway construction side)
- `CTABlock` (duplicates InspectionForm)
- `BlogInsights` on homepage (move to footer link only until blog is robust)

---

## 3. Simplify

- **Hero** — single clear H1, one primary CTA ("Request Inspection"), one secondary ("See Our Work"). Remove tertiary chips and loader if it adds friction.
- **TrustStrip** — 4 proof items max: GAF Master Elite, 500+ projects, 4.9★ (200+ reviews), Licensed GC. No marketing adjectives.
- **DualPathway** — the single decision point: Roofing vs Construction. Two cards, real photo each, 1 sentence, 1 CTA.
- **ServicesGrid** → replaced by **PriorityServices**: 6 cards only (Replacement, Repair, Metal, Brava/Synthetic, Additions, Outdoor Living).
- **FeaturedProjects** — 3 real WNC projects, no stock.
- **OurProcess** — 4 steps max, one line each.
- **TownGrid** — 6 priority towns (linked), "See all service areas →".
- **InspectionForm** — short form: name, phone, address, project type. Move long qualification to a follow-up step.
- **MeetTheTeam** — owner + 2 leads, one quote. Link to `/team` for full.
- **Footer** — single column nav; remove duplicated CTAs.

Copy rule across every section: max 1 short paragraph + bulleted proof. Strip every "high-quality solutions", "trusted partner", "your dream home" phrasing.

---

## 4. Revised Homepage Structure

```text
1.  Hero                    — H1 + sub + 2 CTAs + 1 real WNC image
2.  TrustStrip              — 4 proof items
3.  DualPathway             — Roofing | Construction
4.  PriorityServices        — 6 cards (4 roofing, 2 construction)
5.  FeaturedProjects        — 3 real projects
6.  BuiltForWNC             — local authority, climate, elevation
7.  OurProcess              — 4 steps
8.  ProofMoment (reviews)   — single best testimonial block
9.  TownGrid                — 6 towns + link to all
10. MeetTheTeam (compact)   — owner-led trust
11. InspectionForm          — short, focused
12. Footer
```

Goal: ~12 sections, each with one job. Removes ~7 sections from current homepage.

---

## 5. Revised Navigation

```text
Roofing ▾
  Roof Replacement
  Roof Repair
  Metal Roofing
  Brava / Synthetic
  Storm Damage
  Commercial
Construction ▾
  Additions & Extensions
  Outdoor Living (Decks, Porches, Pergolas)
  Flatwork & Fire Pits
Projects        → /gallery
Service Areas   → /service-areas
About           → /about
Contact         → /request-inspection   (primary button)
```

Removed from nav: Team (lives under About), Blog (footer only until robust), Free Tools, Storm Center as top-level.

---

## 6. Revised Service Architecture

**Roofing (6 focused pages)**
- `/roofing` — division hub
- `/roofing/roof-replacement` — primary commercial driver
- `/roofing/roof-repair`
- `/roofing/metal` — **NEW**, premium category
- `/roofing/brava-synthetic` — **NEW**, premium category (replaces `/roofing/specialty`)
- `/roofing/storm-damage` — absorbs Storm Center content; no "emergency tarp" lead messaging
- `/roofing/commercial` — kept but de-emphasized in nav, residential-focused homepage

Remove `/roofing/residential` (the division hub serves this role).

**Construction (4 focused pages)**
- `/construction` — division hub
- `/construction/additions` — additions + home extensions
- `/construction/outdoor-living` — decks, porches, pergolas, fire pits
- `/construction/flatwork` — **NEW**, patios/walkways/flatwork

Remove: `/construction/renovations`, `/construction/exterior`, `/construction/custom`.

---

## 7. Revised Location SEO Architecture

Hub-and-spoke without spam.

- `/service-areas` — clean hub, 12–15 priority WNC towns.
- `/service-areas/:slug` — keep, but rewrite template to: real local proof (project count in town, elevation, climate notes), 2–3 linked priority services, 1 local testimonial, 1 nearby town list, 1 CTA. No padded "Why choose us in [town]" filler.
- **Town × Service combo pages**: only build for the top 3 priority services (Replacement, Metal, Additions) × top 6 towns = 18 pages, generated from a single template, not blanket-generated for every combo.
- Internal linking stays circular per existing memory rules.

Sitemap regenerated to exclude removed routes.

---

## 8. Revised Conversion Strategy

- **Single primary CTA across the site**: "Request Inspection" → `/request-inspection` (short form: name, phone, address, project type).
- **Secondary CTA**: "See Our Work" → `/gallery`.
- Remove sticky mobile CTA duplication where InspectionForm is already on screen.
- Remove `/lp/*` paid-ads pages from organic nav (keep routes live for ad spend).
- One lead form pattern reused everywhere — no competing form variants per page.
- Chatbot widget stays but routed to qualify leads, not entertain.

---

## 9. Implementation Plan (Lovable)

Sequenced into shippable phases:

**Phase 1 — Prune routes & nav (low risk)**
- Edit `src/App.tsx`: remove routes for roof-designer, free-tools, storm-center, seo-checklist, internal-linking-qa, keyword-map, seo-launch-qa, services, services/:slug, commercial-roofing, commercial-maintenance, gutters, outdoor-living, construction-services, construction/renovations, construction/custom, construction/exterior, roofing/specialty, roofing/residential.
- Add redirect routes (Navigate component) from removed paths to canonical destinations.
- Update `src/components/Header.tsx` to the new nav structure.
- Delete now-orphan page files and components (RoofDesigner workspace, FreeTools, etc.).
- Update `scripts/generate-sitemap.mjs` and `public/sitemap.xml`.

**Phase 2 — Homepage rebuild**
- Edit `src/pages/Index.tsx` to the 12-section structure in §4.
- Delete unused components: `ProjectPathfinder`, `SilentObjections`, `HomepageTrust`, `ConstructionAuthority`, `CTABlock`, extra `ProofMoment` calls.
- Create `PriorityServices` component (6 cards).
- Tighten `Hero`, `TrustStrip`, `DualPathway`, `OurProcess`, `BuiltForWNC` copy (~40% word reduction).

**Phase 3 — Roofing pages**
- Create `src/pages/MetalRoofing.tsx` and `src/pages/BravaSynthetic.tsx` using the existing roofing page template.
- Rewrite `StormDamage.tsx` to absorb Storm Center content, drop emergency-tarp framing.
- Add redirects for `/roofing/specialty` → `/roofing/brava-synthetic`, `/roofing/residential` → `/roofing`.

**Phase 4 — Construction pages**
- Create `src/pages/Flatwork.tsx`.
- Trim `HomeAdditions.tsx`, `OutdoorLiving.tsx` to focused single-service narratives.
- Add redirects for removed construction routes → `/construction`.

**Phase 5 — Local SEO refactor**
- Rewrite `TownPage.tsx` template to the lean structure in §7.
- Generate 18 priority town×service combo pages from a single data-driven template.
- Regenerate sitemap.

**Phase 6 — Conversion polish**
- Standardize `InspectionForm` short variant; remove competing forms from individual pages.
- Audit and remove duplicate CTAs per page.
- Verify analytics events still fire on the consolidated CTAs.

**Phase 7 — Copy pass**
- Sweep all remaining pages for "high-quality solutions", "your trusted partner", superlatives without proof, marketing fluff. Replace with specifics (elevation, rainfall, certifications, project counts).

**Out of scope for this refactor**
- New imagery sourcing (the user will need to supply real WNC project photos; existing project gallery images stay).
- Backend schema changes beyond redirect logic.
- The `/seo-monitoring` admin tool stays (internal-only).

---

**Approval needed before I start.** Once approved, I'll execute phase-by-phase and report at each phase boundary so you can course-correct without waiting for the whole refactor.

---
name: SEO Authority Page System
description: Complete authority page taxonomy with SEO purpose, structure, conversion, trust elements, and linking for each page type
type: feature
---

# SEO Authority Page System

## Page Types Beyond Core Service Pages

### 1. Location Pages (`/service-areas/[town]-nc`)
- **SEO Purpose:** Rank for "[service] in [town] NC" queries
- **Search Intent:** Local — homeowner seeking a contractor in their area
- **Structure:** Local hero → town intro with climate/elevation context → services available → local project examples → trust proof (reviews from that area) → local FAQs → CTA with town name
- **Conversion:** "Schedule a Consultation in [Town]" — location-aware CTA
- **Trust Elements:** Local project count, named crew members serving area, town-specific reviews
- **Internal Linking:** → Service pages, → Town-tagged blog articles, → Project details in that area, → Storm Center (if storm-prone area)
- **Anti-Thin Rules:** Each town page must have unique intro copy, unique climate/elevation context, unique local proof, and unique FAQs. No boilerplate swaps.

### 2. Service + Location Pages (`/roofing/[service]/[town]` — future)
- **SEO Purpose:** Rank for highly specific "[service] [town] nc" queries (e.g., "metal roofing highlands nc")
- **Search Intent:** Transactional — ready to hire
- **Structure:** Service-specific hero with town name → why [service] matters in [town] → local examples → materials for this climate → process overview → local reviews → CTA
- **Conversion:** Direct — "Request a [Service] Consultation in [Town]"
- **Trust Elements:** Service-specific certifications, local project photos
- **Internal Linking:** → Parent service page, → Town page, → Material guide, → Related blog articles
- **When to Build:** Only when search volume justifies (10+ monthly searches)

### 3. Material Guide Pages (`/resources/[material]-guide`)
- **SEO Purpose:** Rank for "[material] roofing" comparison and education queries
- **Search Intent:** Research — comparing options, learning about materials
- **Structure:** Material hero with photo → overview & specs → pros/cons for WNC → cost ranges → lifespan at elevation → comparison table → FAQ → CTA
- **Conversion:** Soft — "Not sure which material? Let's discuss your home."
- **Trust Elements:** Manufacturer certifications, installation photos, warranty details
- **Internal Linking:** → RoofingMaterials component, → Service pages using that material, → Project details featuring it, → Blog articles

### 4. Homeowner Resource Pages (`/resources/[topic]`)
- **SEO Purpose:** Rank for informational "how to" queries, build topical authority
- **Search Intent:** Educational — seeking answers before making decisions
- **Structure:** Resource hero → key takeaways → main content with H2 sections → expert tips → related resources → CTA
- **Conversion:** Lead magnet + soft consultation CTA
- **Trust Elements:** Author attribution, credentials mentioned naturally
- **Internal Linking:** → Related blog articles, → Service pages, → Storm Center, → Financing
- **Examples:** "How to Choose a Roofer in WNC", "Understanding Your Roof Warranty", "Planning a Home Addition"

### 5. FAQ Hub Pages (`/faqs` and `/faqs/[category]`)
- **SEO Purpose:** Featured snippet targets, People Also Ask rankings
- **Search Intent:** Quick answers — specific questions
- **Structure:** FAQ hero → category navigation → accordion FAQ sections → related resources → CTA
- **Conversion:** Inline — "Still have questions? Talk with our team."
- **Trust Elements:** Expert answers, credential references in answers
- **Internal Linking:** → Every relevant service page, → Blog articles that expand on answers, → Town pages
- **Categories:** Roofing General, Materials, Cost & Financing, Storm & Insurance, Construction, Process & Timeline
- **Schema:** FAQPage JSON-LD on every FAQ section

### 6. Repair vs. Replace Guide (`/resources/repair-vs-replace`)
- **SEO Purpose:** Capture high-intent "should I repair or replace my roof" queries
- **Search Intent:** Decision — trying to determine next step
- **Structure:** Decision hero → quick assessment checklist → detailed comparison (cost, timeline, longevity) → decision tree → "when repair makes sense" → "when replacement is better" → material upgrade opportunities → CTA
- **Conversion:** Strong — "Get an honest assessment — we'll tell you which makes sense."
- **Trust Elements:** Honest framing (sometimes repair IS the right answer), real cost data
- **Internal Linking:** → Roof repair page, → Roof replacement page, → Cost blog articles, → Financing

### 7. Planning Resource Pages (`/resources/planning-[type]`)
- **SEO Purpose:** Capture planning-stage queries, reduce friction to conversion
- **Search Intent:** Planning — ready to start but need guidance
- **Structure:** Planning hero → timeline overview → budget framework → what to expect → checklist → common mistakes → CTA
- **Conversion:** Medium-strong — "Ready to plan? Schedule a consultation."
- **Trust Elements:** Process transparency, real timelines, honest budget ranges
- **Internal Linking:** → Relevant service pages, → Financing, → Blog articles, → Project details
- **Examples:** "Planning Your Roof Replacement", "Planning a Home Addition in WNC", "Planning an Outdoor Living Project"

### 8. Project Inspiration Pages (`/inspiration/[category]`)
- **SEO Purpose:** Rank for "[category] ideas" and visual search queries
- **Search Intent:** Inspirational — early-stage exploration
- **Structure:** Visual hero → curated project grid → material highlights → design considerations for WNC → before/after showcases → CTA
- **Conversion:** Soft — "Inspired? Let's talk about what's possible for your home."
- **Trust Elements:** Real project photos, location/elevation context, homeowner quotes
- **Internal Linking:** → Project detail pages, → Gallery, → Material guides, → Service pages
- **Categories:** Metal Roofing, Cedar & Specialty, Home Additions, Outdoor Living, Full Renovations

### 9. Local Trust Pages (`/[town]-roofing-reviews` — future)
- **SEO Purpose:** Rank for "[town] roofing reviews" and "[company] reviews [town]"
- **Search Intent:** Validation — checking reputation before hiring
- **Structure:** Trust hero → aggregate stats → featured reviews from [town] → project examples in [town] → credentials → CTA
- **Conversion:** Strong — social proof drives action
- **Trust Elements:** Google/Facebook ratings, named testimonials, project photos
- **Internal Linking:** → Reviews page, → Town page, → Project details in that area

## Authority Page Priority (Build Order)

| Priority | Page Type | SEO Impact | Build Effort |
|---|---|---|---|
| 1 | Location Pages (existing, enhance) | High | Medium |
| 2 | FAQ Hub | High | Low |
| 3 | Repair vs. Replace Guide | High | Low |
| 4 | Material Guide Pages | Medium-High | Medium |
| 5 | Planning Resource Pages | Medium | Medium |
| 6 | Project Inspiration Pages | Medium | Low |
| 7 | Homeowner Resource Pages | Medium | Medium |
| 8 | Service + Location Pages | High (targeted) | High |
| 9 | Local Trust Pages | Medium | Medium |

## Schema Markup Strategy

| Page Type | Schema |
|---|---|
| Location Pages | LocalBusiness + Service + GeoCoordinates |
| Material Guides | Article + Product |
| FAQ Hubs | FAQPage |
| Resource Pages | Article + HowTo |
| Project Inspiration | ImageGallery + Article |
| Planning Pages | HowTo + Article |

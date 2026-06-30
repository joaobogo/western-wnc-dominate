---
name: SEO Requirements Checklist by Page Type
description: End-to-end SEO requirements (sections, internal links, schema, keywords) for every page type — home, service, town, blog, commercial, division, tools, trust
type: feature
---

# SEO Requirements Checklist by Page Type

Apply this checklist to every new page and audit existing pages against it. Universal rules apply to ALL pages; per-type rules add on top.

---

## Universal Requirements (Every Page)

### Metadata (via `<SEOHead>`)
- [ ] Unique `<title>` ≤ 60 chars (Google truncates ~60ch). Suffix " | Highlander Roofing" auto-added.
- [ ] Unique `<meta description>` 140–160 chars. Includes primary keyword + Western NC.
- [ ] `<link rel="canonical">` to absolute URL of this page.
- [ ] `<meta robots>` = `index,follow,max-image-preview:large` (default). Use `noindex` only for utility/404/private pages.
- [ ] Open Graph: `og:title`, `og:description`, `og:url`, `og:image` (1200×630), `og:type`.
- [ ] Twitter card: `summary_large_image` with same image.

### Structure
- [ ] Exactly **one** `<h1>` with primary keyword.
- [ ] Logical heading hierarchy (h1 → h2 → h3, no skipping).
- [ ] Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`.
- [ ] Breadcrumb visible in UI (or implied by URL path) **AND** `BreadcrumbList` JSON-LD.

### Images
- [ ] Every `<img>` has `alt` (descriptive) or `alt=""` if purely decorative.
- [ ] Non-LCP images: `loading="lazy"` + `decoding="async"`.
- [ ] LCP/hero image: `loading="eager"` + `fetchPriority="high"` + `decoding="async"`.
- [ ] Width/height set or aspect-ratio CSS to prevent CLS.

### Performance
- [ ] Page lazy-loaded via `React.lazy` in `App.tsx` (already configured).
- [ ] No layout shift (reserve space for images, embeds).
- [ ] Inline critical CSS only via Tailwind (already optimized).

### Internal Linking (every page)
- [ ] Header nav present (Roofing, Construction, Projects, About, Team, Blog, Service Areas, Contact).
- [ ] Footer with sitemap-style links.
- [ ] At least 3 contextual in-body links to related pages.
- [ ] No orphan pages — every page reachable from at least 2 other pages.

### CTAs (conversion)
- [ ] Primary CTA above the fold.
- [ ] Sticky mobile CTA (`<StickyMobileCTA />`).
- [ ] At least one in-body CTA per scroll-screen.
- [ ] Final CTA at bottom (form or `<InspectionForm />`).

---

## Page Type 1: Homepage (`/`)

### Required Sections (in order)
1. Hero with H1 + primary CTA
2. Trust strip (badges/certifications)
3. Dual pathway (Roofing | Construction)
4. Featured projects (3–6)
5. Why choose us / proof
6. Reviews carousel
7. Service areas overview (link to towns)
8. Blog/insights preview (3 latest)
9. Final CTA + form
10. Footer

### Schema (JSON-LD)
- `LocalBusiness` (with full address, phone, geo, opening hours, areaServed)
- `Organization` (with logo, sameAs social)
- `WebSite` with `SearchAction`
- `BreadcrumbList`: `[Home]`

### Target Keywords (primary → secondary)
- "roofing and construction western nc"
- "western north carolina roofing contractor"
- "franklin nc roofing company"
- Long-tail: "premium roofing and construction western nc"

### Internal Links Required
- → Both division landings (`/roofing`, `/construction`)
- → 3+ town pages (Franklin, Sylva, Highlands)
- → 3+ blog posts
- → Reviews, About, Contact

---

## Page Type 2: Division Landing (`/roofing`, `/construction`)

### Required Sections
1. Division hero (H1: division name + WNC)
2. Division promise / why us
3. Service grid (link to all child services)
4. Process / how we work
5. Featured division projects
6. Trust framework (certs specific to division)
7. FAQs (5–8)
8. Cross-division bridge ("Also need [other division]?")
9. Final CTA + form

### Schema
- `Service` (with `serviceType`, `provider`, `areaServed`)
- `FAQPage` (from FAQs)
- `BreadcrumbList`: `[Home, Roofing|Construction]`

### Target Keywords
- "[roofing|construction] services western nc"
- "[roofing|construction] contractor franklin nc"

### Internal Links
- → All child service pages (6 roofing or 5 construction)
- → Top 3 town pages
- → Reviews, Gallery
- → Other division landing

---

## Page Type 3: Service Page (`/roofing/[service]`, `/construction/[service]`, `/services/[slug]`)

### Required Sections
1. Service hero (H1: service + location modifier)
2. What we do / scope
3. When you need this service (signs/symptoms)
4. Process steps (4–6)
5. Materials/options offered
6. Project examples (3+)
7. Reviews specific to service
8. FAQs (5–10) — **must answer real questions**
9. Pricing/financing reference
10. Final CTA + form

### Schema
- `Service` with `name`, `description`, `provider`, `areaServed`, `serviceType`, `url`
- `FAQPage`
- `BreadcrumbList`: `[Home, Services|Division, Service Name]`
- For specialty services: add `Product` schema for materials

### Target Keywords (per service)
- Primary: "[service] western nc" (e.g., "roof repair western nc")
- Secondary: "[service] [town] nc" (template for future location pages)
- Long-tail: question-based ("how much does roof replacement cost in nc")

### Internal Links
- → Parent division landing
- → 2–3 sibling services
- → 2+ relevant town pages
- → 2+ blog articles on the topic
- → Financing page
- → Storm Center (for storm damage / repair)

---

## Page Type 4: Town Page (`/service-areas/[town]`)

### Required Sections
1. Town hero (H1: "Roofing & Construction in [Town], NC")
2. Town intro: climate, elevation, building stock context
3. Services available locally
4. Local project examples (or "projects in [county]")
5. Town-specific reviews / testimonials
6. Local FAQs (3–5 town-specific)
7. Service area map / nearby towns
8. Final CTA with town name + form

### Schema
- `LocalBusiness` overridden with town in name and address
- `Service` (areaServed = town)
- `BreadcrumbList`: `[Home, Service Areas, Town]`

### Target Keywords
- Primary: "roofing [town] nc"
- Secondary: "[town] roofing contractor", "roof repair [town] nc"
- Long-tail: "[service] in [town] north carolina"

### Internal Links
- → Other 3+ town pages
- → Service Areas index
- → 3+ relevant service pages
- → Storm Center (if storm-prone area)
- → Town-tagged blog articles (when available)

### Anti-Thin Rules
- Unique intro copy per town (no boilerplate swaps)
- Unique climate/elevation context
- Unique local proof element
- Unique FAQs

---

## Page Type 5: Blog Post (`/blog/[slug]`)

### Required Sections
1. Article hero (H1 = article title)
2. Author + date + reading time
3. TL;DR or key takeaways (3–5 bullets)
4. Article body with H2/H3 sections
5. Inline images with captions
6. Related services/towns callout box
7. Author bio mini
8. Related articles (3)
9. CTA: "Talk to an expert" or relevant service

### Schema
- `Article` (or `BlogPosting`) with `headline`, `image`, `datePublished`, `dateModified`, `author`, `publisher`
- `BreadcrumbList`: `[Home, Blog, Article]`
- `FAQPage` if article contains Q&A

### Target Keywords
- One primary informational keyword per article
- Cover semantic variants naturally
- Target featured snippet with structured paragraph (40–60 words) + list

### Internal Links
- → 2+ relevant service pages
- → 1+ town page (if location-relevant)
- → 2–3 related blog articles
- → Free tools / Roof Designer (where contextual)

### Content Quality
- Minimum 1,200 words for cornerstone topics; 600+ for any post
- Original photos preferred over stock
- Update `dateModified` when refreshed

---

## Page Type 6: Blog Index (`/blog`)

### Required Sections
1. Blog hero (H1: "Blog" or "Roofing & Construction Insights")
2. Featured/pinned post
3. Category filter chips
4. Article grid (newest first)
5. Pagination or load more
6. CTA: subscribe / consultation

### Schema
- `Blog` with `BlogPosting` items array
- `BreadcrumbList`: `[Home, Blog]`

### Internal Links
- → Every blog post listed
- → Top categories
- → Free Tools

---

## Page Type 7: Commercial Page (`/roofing/commercial`)

### Required Sections
1. Commercial hero (H1: "Commercial Roofing in Western NC")
2. Property types served (office, retail, industrial, multi-family)
3. Membrane systems offered (TPO, EPDM, PVC, metal)
4. Maintenance programs
5. Case studies / commercial portfolio
6. Insurance/bonding statement
7. Commercial FAQs
8. B2B-specific CTA: "Request a Property Assessment"
9. Form with property type / square footage fields

### Schema
- `Service` with `serviceType: "Commercial Roofing"`, `audience: BusinessAudience`
- `FAQPage`
- `BreadcrumbList`: `[Home, Roofing, Commercial]`
- `LocalBusiness` (parent)

### Target Keywords
- "commercial roofing western nc"
- "commercial roofing contractor franklin nc"
- "[membrane type] roofing nc" (TPO, EPDM)
- "commercial roof maintenance nc"

### Internal Links
- → Roofing division landing
- → Specialty roofing
- → Commercial blog articles
- → Town pages with commercial centers (Franklin, Sylva, Asheville-area)
- → Contact with commercial form

---

## Page Type 8: Project Detail (`/projects/[slug]`)

### Required Sections
1. Project hero with primary photo
2. Project meta: location, timeline, materials, scope
3. Story / scope of work
4. Photo gallery (before/after if applicable)
5. Materials used (link to material guides)
6. Related services
7. Testimonial from client (if available)
8. Other projects nearby

### Schema
- `Article` or `CreativeWork` with `image`, `datePublished`, `locationCreated`
- `BreadcrumbList`: `[Home, Gallery, Project]`

### Internal Links
- → Gallery
- → Service used
- → Town page (project location)
- → 2 related projects

---

## Page Type 9: Tool / Lead Magnet (`/free-tools`, `/roof-designer`)

### Required Sections
1. Tool hero (H1 with tool name + benefit)
2. How it works (3 steps)
3. The actual tool / interactive UI
4. Trust statement (free, no spam)
5. What to expect after using
6. Related tools
7. Final CTA → consultation

### Schema
- `WebApplication` (for interactive tools)
- `BreadcrumbList`: `[Home, Free Tools, Tool Name]`

### Target Keywords
- "free [tool name]" (e.g., "free roof estimator")
- "virtual roof designer"
- "roof material visualizer"

### Internal Links
- → Other tools
- → Service pages relevant to the tool result
- → Blog posts on the topic

---

## Page Type 10: Trust / Company (`/about`, `/team`, `/certifications`, `/reviews`)

### Required Sections
- About: founding story, mission, service area, leadership
- Team: photos, bios, roles, credentials per person
- Certifications: logos, validity, what each means
- Reviews: aggregate rating, individual reviews, source attribution

### Schema
- About: `Organization` + `AboutPage`
- Team: `Person` for each member, linked to `Organization`
- Certifications: list with `EducationalOccupationalCredential` per cert
- Reviews: `AggregateRating` + individual `Review` items

### Internal Links
- → Service pages
- → Town pages (where leadership lives/serves)
- → Project gallery

---

## Page Type 11: Conversion (`/request-inspection`, `/consultation`, `/contact`)

### Required Sections
- Form-first layout
- Trust strip (response time, no-pressure promise)
- What happens next (3 steps)
- Phone alternative + sticky call CTA
- Office address(es) + map
- Hours

### Schema
- `ContactPage` with `Organization`
- `BreadcrumbList`: `[Home, Contact|Request Inspection|Consultation]`

### Robots
- `noindex` if pure conversion path duplicate (`/quote-flow`, `/consultation` are blocked in robots.txt)

---

## Schema Component Reference

Use helpers from `src/components/SEOHead.tsx`:

| Helper | Use For |
|---|---|
| `localBusinessSchema(overrides?)` | Homepage + town pages |
| `organizationSchema()` | Homepage |
| `websiteSchema()` | Homepage |
| `serviceSchema({...})` | Service pages |
| `faqSchema(faqs)` | Any page with FAQ accordion |
| `breadcrumbSchema(items)` | Every page |
| `articleSchema({...})` | Blog posts, projects |

---

## Pre-Launch Checklist (Per Page)

Before publishing any new page:

- [ ] `<SEOHead>` renders with unique title, description, canonical
- [ ] Title ≤ 60 chars; description 140–160 chars
- [ ] BreadcrumbList JSON-LD present
- [ ] Page-type-specific schema present (Service, Article, FAQ, etc.)
- [ ] Single H1; logical heading order
- [ ] All images have alt + lazy/eager loading set correctly
- [ ] At least 3 contextual internal links
- [ ] CTA above fold + sticky mobile CTA
- [ ] Page added to `sitemap.xml` (auto-gen via `scripts/generate-sitemap.mjs`)
- [ ] Page lazy-loaded in `App.tsx`
- [ ] Mobile + desktop visual QA passes
- [ ] No console errors / no layout shift

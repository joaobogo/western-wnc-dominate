---
name: On-Page SEO Framework
description: Complete on-page SEO system covering heading structure, content depth, keyword coverage, intent alignment, image optimization, FAQ placement, and trust integration per page type
type: feature
---

# On-Page SEO Framework — Highlander Roofing & Construction

## Philosophy

SEO-optimized content should read like it was written by a roofing expert for a homeowner — not by an SEO tool for a search engine. Every optimization serves both the algorithm AND the reader.

---

## I. Heading Structure Standards

### Universal Rules
- **Single H1** per page — includes primary keyword naturally
- **H2s** for major sections (4–8 per page)
- **H3s** for subsections within H2 blocks
- Never skip levels (H1 → H3 without H2)
- Never use headings for styling — use CSS classes instead

### Per-Page H1 Patterns
| Page Type | H1 Pattern | Example |
|-----------|-----------|---------|
| Homepage | Brand + primary service + location | "Western North Carolina's Premier Roofing & Construction Team" |
| Service page | Service + qualifier + region | "Residential Roof Replacement in Western NC" |
| Town page | Service area + town | "Roofing & Construction Services in Franklin, NC" |
| Blog article | Topic + angle (no brand) | "Metal vs Asphalt Roofing: Which is Right for Your Mountain Home?" |
| Project page | Project type + town | "Complete Roof Replacement — Franklin, NC" |
| About | Brand identity | "About Highlander Roofing & Construction" |
| Division hub | Division + positioning | "Roofing Division — Expert Solutions for Every Roof" |

### H2 Patterns
- Service pages: "Why Choose [Material]", "Our [Service] Process", "What to Expect", "[Service] FAQ"
- Town pages: "Roofing Services in [Town]", "Why [Town] Homeowners Choose Highlander", "[Town] Project Gallery"
- Blog: Natural section breaks based on content flow — NOT keyword-stuffed headers

---

## II. Content Depth Standards

### Minimum Word Counts (unique, non-boilerplate)
| Page Type | Minimum | Target | Notes |
|-----------|---------|--------|-------|
| Homepage | 600 | 800–1000 | Distributed across sections |
| Service pages | 800 | 1200–1500 | Deep expertise signals |
| Town pages | 600 | 800–1000 | Unique local context required |
| Blog articles | 1000 | 1500–2500 | Authority-length content |
| Project pages | 300 | 500–700 | Visual-heavy, text supports |
| About | 500 | 800 | Story-driven |
| Division hubs | 500 | 700–900 | Overview + routing |

### Content Quality Rules
- Every paragraph should either inform, prove, or guide
- No filler sentences ("We are passionate about roofing")
- Specific > general: "25-year manufacturer warranty" > "great warranty"
- Local specifics > regional generics: "At 4,000 feet, Highlands homes face..." > "Mountain homes face..."
- First-person plural ("we") for company actions, second-person ("you") for reader benefits

---

## III. Semantic Keyword Coverage

### Keyword Integration Method
Don't stuff. Instead, naturally cover the **semantic field** around each topic:

**Example — "Roof Replacement Franklin NC":**
- Primary: roof replacement, Franklin NC
- Secondary: new roof, reroof, tear-off, overlay
- Related entities: asphalt shingles, architectural shingles, metal roofing, CertainTeed
- Local modifiers: Western NC, Macon County, Blue Ridge, mountain home
- Intent modifiers: cost, how long, process, best, near me
- Long-tail: "how much does roof replacement cost in Franklin NC"

### Coverage by Section
- **Hero/intro:** Primary keyword naturally in first 100 words
- **Body sections:** Secondary and related terms distributed across H2 blocks
- **FAQ:** Long-tail question keywords as accordion items
- **Alt text:** Descriptive with location where authentic
- **Meta description:** Primary keyword + value proposition + CTA

### Keyword Cannibalization Prevention
| Topic | Assigned Page | Other Pages Reference As |
|-------|--------------|------------------------|
| "roof replacement" | /services/roof-replacement | "complete roof replacement" (link to page) |
| "roofing Franklin NC" | /service-areas/franklin-nc | "serving Franklin" (link to town page) |
| "metal roofing" | /services/metal-roofing | "metal roofing options" (link to page) |
| "storm damage roof" | /services/storm-damage | "storm damage services" (link to page) |

---

## IV. Search Intent Alignment

### Intent Classification Per Page
| Page | Primary Intent | Content Response |
|------|---------------|-----------------|
| Homepage | Navigational + Commercial | Brand identity + service routing + trust |
| Service pages | Commercial Investigation | Deep service info + proof + CTA |
| Town pages | Local + Commercial | Local proof + availability + CTA |
| Blog articles | Informational | Education + authority + soft CTA |
| Project pages | Commercial Investigation | Visual proof + scope + similar CTA |
| About/Team | Navigational | Trust + credentials + story |
| Storm Damage | Urgent Commercial | Emergency action + process + insurance |
| Financing | Informational + Transactional | Options + qualification + CTA |

### Intent Matching Rules
- **Informational intent** pages (blog): Lead with value, CTA at bottom only
- **Commercial intent** pages (services): Lead with relevance, proof in middle, CTA repeated
- **Transactional intent** pages (quote flow): Minimize distractions, maximize completion
- **Local intent** pages (towns): Lead with local proof, link to services

---

## V. Internal Linking Standards

### Link Density
- **Service pages:** 8–12 internal links (to related services, town pages, projects, blog)
- **Town pages:** 6–10 internal links (to services, projects, blog, hub)
- **Blog articles:** 5–8 internal links (to services, town pages, related articles)
- **Project pages:** 4–6 internal links (to service type, town, similar projects)
- **Homepage:** 15–20 internal links (distributed across all sections)

### Contextual Linking Rules
1. Link from descriptive phrases, not "click here" or "learn more"
2. First mention of a service links to its service page
3. First mention of a town links to its town page
4. Related blog articles linked from service page sidebar or "Related Reading" section
5. Every page links back to at least one parent/hub page
6. No orphan pages — every page reachable within 3 clicks from homepage

### Breadcrumb Structure
```
Home > Roofing > Roof Replacement
Home > Service Areas > Franklin, NC
Home > Blog > [Category] > [Article Title]
Home > Projects > [Project Title]
```
Breadcrumbs appear on every page except homepage. Schema markup for breadcrumbs on all.

---

## VI. Image Optimization

### File Standards
- Format: WebP primary, JPEG fallback (no PNG for photos)
- Max file size: 200KB for content images, 400KB for hero/full-width
- Dimensions: serve at display size (no 4000px images displayed at 800px)
- Lazy loading: `loading="lazy"` on all below-fold images
- Hero image: `loading="eager"` + `fetchpriority="high"`

### Alt Text Patterns
| Image Type | Alt Text Pattern | Example |
|------------|-----------------|---------|
| Project photo | "[service] [detail] in [town], NC" | "Architectural shingle roof replacement in Franklin, NC" |
| Before/after | "Before/After: [service] on [home type] in [town]" | "Before/After: cedar shake replacement on mountain cabin in Highlands" |
| Team photo | "[Name], [role] at Highlander Roofing" | "Jake Morrison, Project Manager at Highlander Roofing" |
| Material sample | "[Material name] [color] roofing sample" | "CertainTeed Landmark Pro Weathered Wood shingle sample" |
| Hero/banner | "[Description] — Highlander Roofing & Construction" | "Mountain home with new metal roof — Highlander Roofing & Construction" |
| Decorative | `alt=""` (empty) | Background textures, dividers |

### Image SEO Rules
- ❌ Never: `alt="image1"`, `alt="photo"`, `alt="IMG_4532.jpg"`
- ❌ Never: keyword-stuffed alt text ("best roofing company Franklin NC cheap roof")
- ✅ Descriptive, natural, includes location when authentic
- ✅ File names: `franklin-roof-replacement-front-view.webp` not `DSC_0042.webp`

---

## VII. FAQ Placement & Structure

### Where FAQs Appear
| Page Type | FAQ Position | Questions |
|-----------|-------------|-----------|
| Service pages | Before final CTA | 4–6 service-specific questions |
| Town pages | After local content | 3–4 town-specific questions |
| Blog articles | End of article (if applicable) | 2–3 topic questions |
| Division hubs | After service overview | 4–5 division-level questions |
| Homepage | Not needed (too many topics) | — |

### FAQ Content Rules
- Questions use natural language ("How long does..." not "Duration of...")
- Answers: 2–4 sentences, specific, include local context where relevant
- Include 1 question about cost/pricing with honest range framing
- Include 1 question that links to another page ("Learn more about [topic]")
- Schema markup (FAQPage) on every page with FAQ section

### FAQ Anti-Patterns
- ❌ Don't repeat the same FAQ across multiple pages (cannibalization)
- ❌ Don't use FAQ as keyword dumping ground
- ❌ Don't answer with generic platitudes
- ✅ Each FAQ unique to the page's specific topic/location

---

## VIII. Trust Content Integration for SEO

### E-E-A-T Signals (Experience, Expertise, Authoritativeness, Trustworthiness)

**Experience:**
- Project photos with dates and locations
- "X years serving WNC" with specific start year
- Process descriptions showing hands-on knowledge
- Blog articles with first-person job site insights

**Expertise:**
- Certification mentions on service pages (not just cert page)
- Technical material specifications in service content
- Code compliance references
- Author bylines on blog with credentials

**Authoritativeness:**
- Review count + rating in structured data
- Industry awards/recognitions
- Manufacturer partnerships (CertainTeed Master Shingle Applicator)
- Local business memberships

**Trustworthiness:**
- Physical address visible on every page (footer)
- Real team photos (not stock)
- Clear licensing information
- Privacy policy, terms linked in footer
- SSL certificate (automatic)

---

## IX. Meta Tag Templates

### Title Tags (<60 chars)
| Page Type | Template |
|-----------|---------|
| Homepage | "Highlander Roofing & Construction · Franklin & Sylva, NC" |
| Service | "[Service] Services · Highlander Roofing · WNC" |
| Town | "Roofing & Construction in [Town], NC · Highlander" |
| Blog | "[Article Title] · Highlander Roofing Blog" |
| Project | "[Project Type] in [Town] · Highlander Projects" |

### Meta Descriptions (<160 chars)
| Page Type | Template |
|-----------|---------|
| Homepage | "WNC's trusted roofing & construction team. CertainTeed certified. 500+ projects. Free assessments in Franklin, Sylva & beyond. (828) 397-9211" |
| Service | "[Service description]. Certified installers serving Western NC. Free estimate — call (828) 397-9211." |
| Town | "Expert roofing & construction in [Town], NC. [X] local projects completed. Free assessment — schedule today." |
| Blog | "[1-sentence summary]. Expert advice from Highlander Roofing & Construction." |

### Canonical Tags
- Every page has `<link rel="canonical" href="[full URL]" />`
- Town pages: self-referencing canonical (no cross-canonicalization)
- Blog pagination: canonical to page 1
- No trailing slashes in canonical URLs

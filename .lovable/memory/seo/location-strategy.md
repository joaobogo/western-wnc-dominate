---
name: Location & Service Area Content Strategy
description: Town page framework with anti-thin rules, local content structure, internal linking network, and SEO optimization
type: feature
---

# Location & Service Area Content Strategy

## Anti-Thin Content Rules

Every location page MUST have:
1. **Unique opening paragraph** — specific to the town's character, not template-swapped
2. **Unique climate/elevation context** — real elevation, rainfall, weather patterns
3. **Unique local proof** — projects completed in that area, reviews from that town
4. **Unique FAQs** — at least 2 town-specific questions (e.g., "Do you serve [nearby community]?")
5. **Minimum 800 words** of unique content per page
6. **No boilerplate blocks** that appear identically on 3+ town pages

## Town Page Framework

### Section 1: Local Hero
- Town name in H1: "Roofing & Construction in [Town], NC"
- Breadcrumb: Home → Service Areas → [Town]
- County name, elevation, key weather stat
- Background: mountain/town imagery if available, gradient overlay

### Section 2: Local Introduction (unique per town)
- 2-3 paragraphs about the town's character and building environment
- Mention: elevation, rainfall, seasonal challenges, architectural style
- Reference nearby communities served from this hub
- **Must feel written by someone who knows the town, not AI-generated**

### Section 3: Services Available
- Grid of services available in this area (roofing + construction)
- Each service links to its parent service page
- Brief local angle per service ("Standing seam metal is popular in [Town] for its snow-shedding performance at [elevation]")

### Section 4: Environmental & Weather Context
- `WNCClimateCallout` or `ElevationZoneCard` with town-specific data
- How local weather affects roofing decisions
- Seasonal considerations for this area
- Material recommendations based on local conditions

### Section 5: Project Types Common in This Area
- What kinds of projects are most common in this town
- E.g., Highlands: luxury estates, vacation homes, cedar/metal roofing
- E.g., Franklin: affordable residential, storm repair, shingle replacement
- Link to relevant project details if available

### Section 6: Local Trust Proof
- Reviews from homeowners in this town/county
- Project count in the area
- `LocalProofBadge` component
- Team members who regularly work in this area

### Section 7: Town-Specific FAQs
- 4-6 FAQs, at least 2 unique to this town
- Schema: FAQPage JSON-LD
- Examples:
  - "How much does a roof cost in [Town]?"
  - "Do you serve [nearby community]?"
  - "What roofing materials work best at [elevation] feet?"
  - "How long does a roof replacement take in [Town]?"

### Section 8: Local CTA
- Town name in CTA: "Schedule a Consultation in [Town]"
- Phone number + form link
- Trust badges strip
- "We serve [Town] and all of [County] County"

## Town Data Requirements (per town)

```typescript
interface TownPageData {
  slug: string;
  name: string;
  county: string;
  elevation: string;        // "4,118 ft"
  annualRainfall: string;   // "80+ inches"
  primaryWeatherChallenge: string;
  architecturalStyle: string;
  commonProjectTypes: string[];
  nearbyAreas: string[];
  uniqueIntro: string;      // 150+ words, unique
  localProof: string;
  reviewHighlights: string[];
  localFAQs: Array<{ q: string; a: string }>;
  seo: { title: string; description: string };
}
```

## Current Towns (enhance existing)

| Town | County | Elevation | Primary Challenge | Status |
|---|---|---|---|---|
| Highlands | Macon | 4,118 ft | UV + ice + 80" rain | Exists — enhance |
| Cashiers | Jackson | 3,486 ft | Extreme rainfall | Exists — enhance |
| Franklin | Macon | 2,113 ft | Valley storms | Exists — enhance |
| Sylva | Jackson | 2,047 ft | Mountain valley weather | Exists — enhance |
| Waynesville | Haywood | 2,644 ft | Wind + seasonal extremes | Exists — enhance |
| Brevard | Transylvania | 2,230 ft | Rainfall (60"+ annually) | Exists — enhance |
| Hendersonville | Henderson | 2,146 ft | Population density + storms | Exists — enhance |

## Future Towns to Add

| Town | County | Elevation | Priority |
|---|---|---|---|
| Sapphire | Transylvania | 3,500 ft | High — luxury market |
| Lake Toxaway | Transylvania | 3,010 ft | High — estate homes |
| Cullowhee | Jackson | 2,500 ft | Medium — university area |
| Cherokee | Swain | 1,991 ft | Medium — tribal lands |
| Bryson City | Swain | 1,736 ft | Medium — tourism |
| Saluda | Polk | 2,096 ft | Low — small but historic |
| Maggie Valley | Haywood | 3,020 ft | Medium — vacation rentals |

## Internal Linking Network

```
                    ┌──────────────┐
                    │  Homepage    │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Roofing  │ │ Construc │ │ Service  │
        │ Division │ │ Division │ │  Areas   │
        └────┬─────┘ └────┬─────┘ └────┬─────┘
             │             │            │
    ┌────────┼────────┐    │     ┌──────┼──────┐
    ▼        ▼        ▼   ▼     ▼      ▼      ▼
  ┌────┐  ┌────┐  ┌────┐     ┌────┐ ┌────┐ ┌────┐
  │Res.│  │Repl│  │Repr│     │High│ │Cash│ │Fran│
  │Roof│  │ace │  │air │     │land│ │iers│ │klin│
  └──┬─┘  └──┬─┘  └──┬─┘     └──┬─┘ └──┬─┘ └──┬─┘
     │        │       │          │      │      │
     └────────┼───────┘          └──────┼──────┘
              │                         │
              ▼                         ▼
        ┌──────────┐            ┌──────────┐
        │ Blog     │◄──────────►│ Projects │
        │ Articles │            │ Gallery  │
        └────┬─────┘            └──────────┘
             │
             ▼
        ┌──────────┐
        │ Storm    │
        │ Center   │
        └──────────┘
```

### Linking Rules:
1. **Every town page** links to: 3 service pages, 2 blog articles, 1 project (if available), Storm Center
2. **Every service page** links to: 3 town pages, 2 blog articles, parent division hub
3. **Every blog article** links to: 1 service page, 1 town page (if town-tagged), 2 related articles
4. **Every project detail** links to: service page, town page, gallery
5. **Storm Center** links to: storm service page, all storm articles, relevant town pages
6. **Homepage** links to: both division hubs, service areas, featured towns, featured blog articles

### Link Anchor Text Rules:
- Use location + service in anchor: "roof replacement in Highlands" not "click here"
- Vary anchor text — don't use identical anchor for same target from multiple pages
- Internal links should feel natural in content, not forced into footers

## Service Area Hub Page (`/service-areas`)

### Structure:
1. Hero with 8-county service area map
2. "We serve all of Western North Carolina" statement
3. Town cards grid (clickable, with county + elevation)
4. County breakdown section
5. "Don't see your town?" CTA → request inspection with location field
6. Trust stats (500+ projects, 8 counties, 40+ years combined)
7. Closing CTA

### SEO:
- Title: "Service Areas | Roofing & Construction Across Western NC | Highlander"
- H1: "Serving Western North Carolina's Mountain Communities"
- Schema: LocalBusiness with areaServed listing all towns

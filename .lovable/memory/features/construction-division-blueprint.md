---
name: Construction Division Blueprint
description: Complete construction ecosystem architecture, page hierarchy, shared components, messaging, trust system, WNC relevance, and usage guide
type: feature
---

# Construction Division Blueprint

## Strategic Positioning

Highlander's Construction division exists to prove the company is more than a roofing contractor — it's a premium Roofing + Construction brand. The division must feel:
- **Substantial** — not a side hustle bolted onto a roofing website
- **Premium** — curated, selective, and craft-focused
- **Locally grounded** — built for WNC terrain, weather, architecture, and property expectations
- **Unified** — same brand voice, visual system, and quality standards as Roofing

Key differentiator: *"The same planning discipline, craft quality, and communication standards that built our roofing reputation — applied to construction."*

## Page Ecosystem

| Route | Page | Status |
|---|---|---|
| `/construction` | Division Landing (hub) | ✅ Built |
| `/construction/additions` | Home Additions & Expansions | ✅ Built |
| `/construction/renovations` | Renovations & Exterior Improvements | ✅ Built |
| `/construction/outdoor-living` | Outdoor Living & Exterior Builds | ✅ Built |
| `/construction/custom` | Custom Construction & Specialty Projects | ✅ Built |

## Shared Component System (`src/components/construction/`)

### ConstructionProcess
- `fullConstructionProcess` — 10-step complete process (consultation → site review → goal clarification → design/planning → material alignment → permitting → execution → communication checkpoints → cleanup → walk-through)
- `compactConstructionProcess` — 6-step for landing/subpages
- `additionsProcess` — full 10-step
- `renovationsProcess` — 6-step focused subset
- Props: `steps`, `heading`, `subheading`, `eyebrow`, `columns (2|3)`, `variant (light|tartan)`

### ConstructionTrust
- `constructionTrustPillars` — 8 pillars with `overcomes` objection mapping:
  1. Project Clarity → "afraid final cost will exceed estimate"
  2. Communication → "contractor disappears after signing"
  3. Planning Discipline → "projects that drag on forever"
  4. Craftsmanship Standard → "how do I know quality will be there"
  5. Local Understanding → "does this company understand mountain construction"
  6. Respect for Your Home → "don't want house torn apart for months"
  7. Timeline Transparency → "will this actually be done when they say"
  8. Finish Quality → "worried about little things being done right"
- `compactConstructionTrust` — 4-pillar subset
- `midConstructionTrust` — 6-pillar subset
- `ConstructionObjectionBuster` — concern → response paired layout
- `ConstructionTrustStrip` — compact inline strip
- `ConstructionTrustSidebarDetailed` — sidebar with objection text
- Props: `pillars`, `heading`, `variant (light|dark)`, `columns (2|3|4)`, `showObjections`

### ConstructionFAQs
- `constructionFAQLibrary` — 32+ FAQs tagged by category
- Categories: `division`, `additions`, `renovations`, `outdoor`, `custom`
- Topics: planning, scope, timeline, disruption, design coordination, permits, materials, communication, cleanliness, phasing, custom work, quality control, value
- `getConstructionFAQsByCategory(category)` — filter helper
- Props: `category`, `heading`, `eyebrow`, `variant (light|tartan)`, `maxItems`

### WNCRelevance
- `wncInsights` — 6 local factors (terrain/slope, weather, elevation/microclimates, mountain architecture, durability demands, property expectations) each with `implication`
- `compactWNCInsights` — 4-item subset
- `WNCRelevance` — grid or sidebar layout with optional implications
- `WNCRelevanceDark` — dark section variant
- `wncIntegrationGuide` — content direction for page copy, visual storytelling, blog, FAQs, trust messaging

### ConstructionShared
- `ConstructionMidCTA` — primary bg strip CTA
- `ConstructionClosingCTA` — dark section full CTA with trust badges
- `ConstructionTrustSidebar` — sidebar card with credentials
- `ConstructionCredentialStrip` — inline trust badges
- `PlanningCallout` — inline card encouraging consultation

### ConstructionServices
- `constructionCategories` — 4 categories with outcomes + trust points per service
- `ConstructionServiceGrid` — card grid with `variant (cards|detailed)`
- `ConstructionComparison` — side-by-side comparison layout with outcomes + trust
- `GalleryIntro` — reusable gallery section header

## Usage Pattern
```tsx
import {
  ConstructionProcess, compactConstructionProcess,
  ConstructionTrust, ConstructionObjectionBuster,
  ConstructionFAQs,
  WNCRelevance, WNCRelevanceDark,
  ConstructionServiceGrid,
  ConstructionMidCTA, ConstructionClosingCTA,
  PlanningCallout,
} from "@/components/construction";

// In any construction page:
<ConstructionServiceGrid variant="detailed" />
<WNCRelevance variant="sidebar" />
<ConstructionMidCTA headline="Ready to discuss?" />
<ConstructionTrust variant="dark" showObjections />
<ConstructionProcess steps={compactConstructionProcess} />
<ConstructionFAQs category="additions" variant="tartan" />
<ConstructionClosingCTA headline="Your Home Has More\nto Give." />
```

## Content Hierarchy per Page
1. **Hero** — cinematic, breadcrumb nav to `/construction`, division-specific headline pair
2. **Opening Statement** — centered, philosophical, gold divider lines
3. **Primary Content** — service-specific cards/grids (why, what, how)
4. **Mid-Page CTA** — primary bg strip
5. **Secondary Content** — design continuity, value impact, WNC relevance, materials
6. **Trust/Process** — shared ConstructionTrust or ObjectionBuster + ConstructionProcess
7. **Gallery** — 4-image grid with overlay labels
8. **FAQs** — category-filtered, accordion style
9. **Closing CTA** — dark section with trust badges

## Page-by-Page Section Layouts

### Construction Landing (`/construction`)
Hero → Opening → ServiceGrid (detailed) → WNC Relevance → MidCTA → Trust (dark, showObjections) → Process (compact) → Gallery → FAQs (division) → ClosingCTA

### Home Additions (`/construction/additions`)
Hero → Opening → Why Homeowners Expand (4 cards) → Expansion Types (6 cards) → Design Continuity (dark, 4 pillars) → MidCTA → Planning & Permitting (sidebar layout) → Process (6-step) → Gallery → FAQs (additions) → ClosingCTA

### Renovations (`/construction/renovations`)
Hero → Opening → Service Categories (6 cards) → Same Standards (dark, 4 pillars) → MidCTA → Long-Term Value (sidebar layout) → Gallery → Process (6-step) → FAQs (renovations) → ClosingCTA

### Outdoor Living (`/construction/outdoor-living`)
Hero → Opening → Beauty/Function/Durability (dark, 3 pillars) → Outdoor Types (6 cards) → WNC Lifestyle (sidebar layout) → MidCTA → Materials (4 cards) → Gallery → Process (6-step) → Design Guidance (dark) → FAQs (outdoor) → ClosingCTA

### Custom Construction (`/construction/custom`)
Hero → Opening → Custom Planning (4 cards) → Structural & Design (sidebar layout) → Complex Projects (dark, 4 cards) → MidCTA → Gallery → Process (6-step) → Communication & Oversight (2x2 grid) → FAQs (custom) → ClosingCTA

## Premium Messaging Direction

### Voice
- High Authority, Low Fluff — same as Roofing division
- Calm, serious, precise — not salesy or rushed
- "We" language, never "I" or generic third person
- Confident without arrogance: *"We're not the right fit for every project — but for the ones we accept..."*

### CTA Language (never bargain language)
- Schedule a Project Consultation
- Discuss Your Project / Your Addition / Your Build
- Talk With Our Team About Your Build
- Request a Quote Call
- Discuss What's Possible

### Headlines (two-line impact pairs)
- "More Space. Same Home." (Additions)
- "Refine What's There. Protect What Matters." (Renovations)
- "Built for the View. Built for the Weather." (Outdoor)
- "For Projects That Demand More." (Custom)

### Objection-Busting Tone
Every trust pillar maps to a specific homeowner fear and addresses it with systems, not promises.

## Trust System Architecture

Three tiers of trust display:
1. **Full Trust Section** — 8-pillar grid with optional objection display (landing page, key subpages)
2. **ObjectionBuster** — concern → response paired layout (landing page, custom page)
3. **Trust Strip / Sidebar** — compact credentials for embedding in content sections

Trust badges across all closing CTAs:
- Licensed & Insured
- In-House Crews
- WNC Specialists
- Design-Build Capable

## WNC Relevance Strategy

Six local factors woven throughout:
1. Terrain & Slope → foundation, drainage, access planning
2. Weather Exposure → material spec, weather barriers, drainage
3. Elevation & Microclimates → insulation, ventilation, freeze-thaw ratings
4. Mountain Architecture → style matching, proportion integrity
5. Durability Demands → accelerated wear specs, UV/moisture
6. Property Expectations → long-term value, craftsmanship premium

Integration points: hero copy, service descriptions, material recommendations, FAQ answers, trust messaging, blog topics.

## Gallery Direction

- 4-image grids per subpage (2x2 on desktop)
- Aspect ratio 4:3, rounded-sm, hover scale effect
- Gradient overlay bottom-to-top with white label text
- Labels: "[Project Type] — [Location/Style]"
- Show terrain context — slopes, views, settings, not just finished product
- Eventually replace placeholder images with real Highlander project photography

## FAQ Strategy

| Page | Category | Expected Count |
|---|---|---|
| Landing | `division` | 8–10 |
| Additions | `additions` | 10–12 |
| Renovations | `renovations` | 8–10 |
| Outdoor Living | `outdoor` | 6–8 |
| Custom | `custom` | 8–10 |

FAQs serve dual purpose: user education + SEO long-tail capture.

## Visual Design Approach

- Same design system as Roofing: forest green, gold accents, cream backgrounds
- Playfair Display headings, DM Sans body
- `tartan-bg` texture on alternating sections
- `section-dark tartan-dark` for emphasis sections with gold accents
- Gold gradient divider lines (`highland-gold`) for section transitions
- `card-lift` hover effect on all interactive cards
- Cinematic hero with dual gradient overlay + gold accent line animation
- Breadcrumb navigation linking back to `/construction` parent

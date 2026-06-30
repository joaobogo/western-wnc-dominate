---
name: Roofing Division Blueprint
description: Complete roofing ecosystem architecture, page hierarchy, shared components, and usage guide
type: feature
---

# Roofing Division Blueprint

## Page Ecosystem

| Route | Page | Status |
|---|---|---|
| `/roofing` | Division Landing (hub) | ✅ Built |
| `/roofing/residential` | Residential Roofing | ✅ Built |
| `/roofing/roof-replacement` | Roof Replacement | ✅ Built |
| `/roofing/roof-repair` | Roof Repair | ✅ Built |
| `/roofing/storm-damage` | Storm Damage | ✅ Built |
| `/roofing/commercial` | Commercial Roofing | ✅ Built |
| `/roofing/specialty` | Specialty Roofing | ✅ Built |

## Shared Component System (`src/components/roofing/`)

### RoofingProcess
- `fullProcess` — 10-step complete process
- `repairProcess` — 6-step repair subset
- `replacementProcess` — full 10-step
- `compactProcess` — 5-step for landing pages
- Props: `steps`, `heading`, `eyebrow`, `columns (2|3)`, `variant (light|tartan)`

### TrustFramework
- `trustPillars` — 7 pillars (craftsmanship, material integrity, communication, local understanding, weather readiness, QC, professionalism)
- `compactTrust` — 4-pillar subset
- Props: `pillars`, `heading`, `variant (light|dark)`, `columns (2|3|4)`

### RoofingFAQs
- `roofingFAQLibrary` — 28+ FAQs tagged by category
- Categories: division, residential, replacement, repair, storm, commercial, materials
- `getFAQsByCategory(category)` — filter helper
- Props: `category`, `heading`, `eyebrow`, `variant`, `maxItems`

### RoofingShared
- `RoofingMidCTA` — primary bg strip CTA
- `RoofingClosingCTA` — dark section full CTA
- `TrustSidebar` — sidebar card with credentials
- `CredentialStrip` — inline trust badges

### RoofingMaterials (`src/components/RoofingMaterials.tsx`)
- 5 materials: 3-Tab Asphalt, Architectural, Standing Seam, Cedar, Synthetic Slate
- Tabbed selector with animated card showing: visual style, durability, lifespan, maintenance, ideal homeowner, WNC performance, highlights
- Props: `showHeading`, `className`

## Usage Pattern
```tsx
import { RoofingProcess, compactProcess, TrustFramework, RoofingFAQs, RoofingClosingCTA } from "@/components/roofing";
import RoofingMaterials from "@/components/RoofingMaterials";

// In any roofing page:
<RoofingProcess steps={compactProcess} />
<TrustFramework variant="dark" />
<RoofingMaterials />
<RoofingFAQs category="residential" />
<RoofingClosingCTA headline="Your Headline" />
```

## CTA Language (never use "free inspection" or bargain language)
- Schedule a Roofing Consultation
- Discuss Your Roof / Your Project
- Request a Repair Assessment
- Request Storm Assessment
- Talk With Our Team

## Content Hierarchy per Page
1. Hero (cinematic, breadcrumb nav)
2. Opening Statement (centered, philosophical)
3. Primary Content Sections (cards, grids)
4. Mid-Page CTA
5. Secondary Content / Comparisons
6. Trust/Process (shared components)
7. Materials (where relevant)
8. FAQs (category-filtered)
9. Closing CTA (dark section)

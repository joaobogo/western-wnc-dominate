---
name: Project Gallery & Case Study System
description: Editorial 3-col gallery with curtain reveals, featured cards, lightbox, case study detail pages with SEO, before/after, related projects, mid-content conversion CTAs
type: feature
---

# Project Gallery & Case Study System

## Gallery Page (`/gallery`)
- 3-column editorial grid (lg), 2-col (md), 1-col (mobile)
- First project can span 2 cols + 2 rows when `featured: true`
- Curtain reveal animation (clipPath inset) + Ken Burns zoom on images
- Hover: gold bottom edge draws, category badge highlights, scope/duration/highlight text reveals
- Projects with `slug` field show "Case Study" badge + "Read Full Case Study" link on hover
- Category filter pills: All / Roofing / Construction
- Stats strip between hero and grid
- PremiumLightbox on click (keyboard/swipe/zoom)

## Project Detail Page (`/projects/:slug`)
- SEOHead with project-specific title/description + breadcrumb JSON-LD
- Hero with animated Ken Burns zoom, breadcrumb nav, metadata overlay
- Main content: Summary → Challenge → Scope of Work (2/3 width)
- Sidebar: Project metadata card, TrustSidebar, CTA card (1/3 width)
- Materials section with card grid
- Before/After slider with context cards (whatChanged, whyItMattered, highlanderDifference)
- Process highlights with numbered steps
- **Mid-content conversion CTA** between process and result
- Result section centered
- Photo gallery grid (2x4)
- Testimonial card with stars
- **Related projects section** (same category, different slug, max 3)
- Closing ReassuranceBlock

## Before/After System
- `BeforeAfterSlider` — drag/touch interactive, pulse handle animation
- `BeforeAfterShowcase` — full card with slider + metadata + copy
- `BeforeAfterGrid` — multiple showcases in grid
- `CompactBeforeAfter` — smaller inline version for service pages

## Data Structure (`src/data/projects.ts`)
- `ProjectDetail` interface with slug, hero, location, county, elevation, scope, duration, materials, processHighlights, result, galleryImages, testimonial, beforeAfter, seo
- `getProjectBySlug()` lookup function

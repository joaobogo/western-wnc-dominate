---
name: Blog & Content Strategy
description: 8-category editorial system, 6-month calendar, storm cluster, location SEO strategy, internal linking architecture
type: feature
---

# Blog & Content Strategy

## Category System (8 Categories)
| Category Key | Display Label | Focus |
|---|---|---|
| Materials | Material Guides | Shingles vs metal, cedar, underlayment, performance at elevation |
| Storm | Storm Updates | Emergency guides, damage checklists, seasonal forecasts, insurance claims |
| Maintenance | Seasonal Maintenance | Spring/fall checklists, ice dam prevention, gutter care, winterization |
| Cost | Cost & Planning | Real pricing, budget breakdowns, financing options |
| Insurance | Homeowner Guidance | Claims process, documentation, adjuster meetings |
| Replacement | Roofing Education | When to replace, inspection guides, ventilation, contractor selection |
| Construction | Construction Insights | Additions, renovations, single-contractor benefits, mountain building |
| Spotlight | Project Spotlights | Deep case studies linking to /projects/:slug detail pages |

## 6-Month Editorial Calendar

### Month 1-2 (Foundation)
- Metal vs Shingle for WNC ✅
- Roof Cost in Highlands ✅
- Storm Damage Checklist ✅
- Best Materials for Highlands ✅
- Choosing a Contractor ✅

### Month 3-4 (Expansion)
- Spring Maintenance Checklist ✅
- Ice Dam Prevention ✅
- Insurance Claims Guide ✅
- Roof Ventilation for Mountain Homes ✅
- Planning a Home Addition in WNC ✅

### Month 5-6 (Authority)
- One Company for Roof + Construction ✅
- Project Spotlight: Highlands Metal Roof ✅
- 2026 Spring Storm Season Prep ✅
- Vacation Rental Roof Maintenance ✅
- Commercial Roof Maintenance ✅
- When to Replace Your Roof ✅

### Future Topics (Queued)
- Cedar Shake vs Synthetic Slate for Mountain Estates
- Deck and Porch Planning for WNC Elevations
- How Elevation Affects Your Roof — The Science
- Roof Warranty Guide: What's Actually Covered
- Summer Storm Recovery Playbook
- Fall Winterization Deep Dive
- Siding Options for Mountain Homes

## Storm Content Cluster
Hub: `/roofing/storm-damage` (Storm Damage Roofing page)
Supporting content:
- `storm-damage-checklist-western-nc` → Immediate post-storm steps
- `emergency-roof-repair-wnc` → Emergency response guide
- `insurance-claim-roof-damage-nc` → Claims process guide
- `2026-spring-storm-season-wnc-preparation` → Seasonal forecast/prep
- Storm Center page (`/storm-center`) → Live response hub
All interlinked with `relatedServices` pointing to storm-damage and storm-center

## Location SEO Strategy
- Town pages at `/service-areas/:slug` (already built via TownPage.tsx)
- Blog articles tagged with `town` field for local relevance
- Local callout blocks in BlogPost render automatically when `town` is set
- Town-specific articles: Highlands (4), Franklin (1) — expand to Cashiers, Sylva, Bryson City, Waynesville
- Each town article links to corresponding service area page

## Internal Linking Architecture
- `relatedServices` field on blog posts → links to service pages
- `relatedProjects` field on blog posts → links to project case studies
- BlogPost sidebar: TrustSidebar component (certifications, trust signals)
- BlogPost footer: Related Articles (same category/town, auto-populated)
- Blog hub: Storm & Seasonal module, WNC Guides module (filtered content blocks)
- Service pages link to relevant blog articles
- Project detail pages link back to gallery

---
name: Site Architecture Map
description: Complete URL structure with two divisions (Roofing 6 pages, Construction 5 pages) plus company, content, and conversion pages
type: feature
---

# Site Architecture

## Homepage
- `/` — Index

## Roofing Division
- `/roofing` — Division landing (RoofingDivision)
- `/roofing/residential` — Residential Roofing
- `/roofing/roof-replacement` — Roof Replacement
- `/roofing/roof-repair` — Roof Repair
- `/roofing/storm-damage` — Storm Damage Roofing
- `/roofing/commercial` — Commercial Roofing
- `/roofing/specialty` — Specialty Roofing

## Construction Division
- `/construction` — Division landing (ConstructionDivision)
- `/construction/additions` — Home Additions
- `/construction/renovations` — Renovations (interior: kitchens, baths, basements)
- `/construction/exterior` — Exterior Improvements (siding, windows, trim, fascia)
- `/construction/outdoor-living` — Outdoor Living (decks, porches, pergolas)
- `/construction/custom` — Custom Projects

## Company
- `/about` — About
- `/team` — Team
- `/certifications` — Certifications
- `/reviews` — Reviews
- `/careers` — Careers
- `/financing` — Financing

## Content
- `/blog` — Blog index
- `/blog/:slug` — Blog post
- `/gallery` — Project gallery
- `/projects/:slug` — Project detail

## Lead Capture & Tools
- `/request-inspection` — Quote/consultation form
- `/free-tools` — Planning tools hub
- `/roof-designer` — Virtual roof designer
- `/storm-center` — Storm center

## SEO
- `/service-areas` — Service areas index
- `/service-areas/:slug` — Town pages
- `/services` — Services overview (legacy)
- `/services/:slug` — Service detail (legacy)

## Header Navigation Structure
- Roofing (dropdown: 6 division pages)
- Construction (dropdown: 5 division pages)
- Projects → /gallery
- About → /about
- Team → /team
- Blog → /blog
- Service Areas → /service-areas
- Contact → /request-inspection

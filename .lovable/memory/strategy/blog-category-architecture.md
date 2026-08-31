---
name: Blog Category Architecture
description: Complete blog category system with audience, search intent, themes, linking strategy, and conversion mapping per category
type: feature
---

# Blog Category Architecture

## Categories Overview

| Category | Tag | Count Target | Primary Goal |
|---|---|---|---|
| Roofing Education | `education` | 15-20 articles | SEO + Trust — capture informational queries |
| Construction Insights | `construction` | 10-15 articles | Establish construction credibility |
| WNC News & Local | `local` | 10-15 articles | Regional SEO dominance |
| Storm & Weather | `storm` | 8-12 articles | Timely trust + emergency conversion |
| Homeowner Guidance | `tips` | 10-15 articles | Trust building through non-salesy advice |
| Material Guides | `materials` | 8-12 articles | Deep expertise + comparison SEO |
| Seasonal Maintenance | `maintenance` | 8-10 articles | Client retention + seasonal SEO |
| Project Inspiration | `projects` | 6-10 articles | Visual proof + conversion |
| Commercial Property | `commercial` | 5-8 articles | B2B lead generation |
| Company News | `news` | 4-6 articles | Brand credibility + E-E-A-T |

---

## Category Deep Dives

### 1. Roofing Education
- **Audience:** Homeowners researching roofing for the first time, comparing options
- **Search Intent:** Informational — "how does [roofing topic] work", "what is [term]"
- **Themes:** How roofing systems work, terminology explained, roof anatomy, ventilation, insulation, lifespan expectations, repair vs replace decision trees
- **Design Direction:** Clean editorial with diagrams, comparison tables, numbered lists. Teacher tone.
- **Internal Linking:** → Service pages (residential, replacement, repair), → Material guides, → Town pages
- **Conversion:** Soft — "Have questions? Schedule a consultation" + lead magnet (checklist)

### 2. Construction Insights
- **Audience:** Homeowners considering additions, renovations, outdoor living projects
- **Search Intent:** Planning — "home addition cost WNC", "deck builder near me"
- **Themes:** Addition planning, renovation timelines, outdoor living design, permits/codes, building on mountain lots, construction vs renovation
- **Design Direction:** Aspirational with project photos. Advisor tone.
- **Internal Linking:** → Construction division pages, → Project detail pages, → About page
- **Conversion:** Medium — "Discuss your project with our team"

### 3. Western North Carolina News & Local
- **Audience:** WNC homeowners, local community, people relocating to the region
- **Search Intent:** Local — "[town] roofing", "building in [county]", "WNC construction trends"
- **Themes:** Town-specific roofing challenges, local building codes, community involvement, regional weather patterns, elevation-specific advice, mountain architecture trends
- **Design Direction:** Warm, community-focused. Include town/county references, local landmarks. Insider tone.
- **Internal Linking:** → Town pages (critical for local SEO), → Service area page, → Service pages
- **Conversion:** Location-aware — "We serve [town]. Schedule a local consultation."

### 4. Storm & Weather Updates
- **Audience:** Homeowners after storm events, seasonal prep researchers
- **Search Intent:** Urgent/timely — "storm damage roof [area]", "what to do after hail damage"
- **Themes:** Post-storm checklists, insurance claims process, emergency response, seasonal weather prep, ice dam prevention, wind damage assessment
- **Design Direction:** Alert-style headers with amber accents. Urgent but calm tone. Clear action steps.
- **Internal Linking:** → Storm damage service page, → Insurance claim guide, → Request inspection
- **Conversion:** Strong — "Call (828) 524-7773 for emergency assessment"

### 5. Homeowner Guidance
- **Audience:** Homeowners evaluating contractors, planning projects, managing budgets
- **Search Intent:** Decision — "how to choose a roofer", "roofing contractor red flags"
- **Themes:** Choosing contractors, avoiding scams, understanding estimates, financing options, what to expect during projects, warranty explained
- **Design Direction:** Honest, no-agenda editorial. Trust-building through transparency.
- **Internal Linking:** → About page, → Certifications, → Reviews, → Financing
- **Conversion:** Soft — "Questions? We're happy to help — no obligation."

### 6. Material Guides
- **Audience:** Homeowners comparing roofing/construction materials
- **Search Intent:** Comparative — "metal vs shingle WNC", "best roofing material for mountains"
- **Themes:** Material comparisons, performance at elevation, cost analysis, longevity, warranty differences, manufacturer spotlight
- **Design Direction:** Data-rich with comparison tables, material photos, spec highlights. Specialist tone.
- **Internal Linking:** → RoofingMaterials component, → Service pages, → Project details with specific materials
- **Conversion:** Medium — "Not sure which material is right? Let's discuss."

### 7. Seasonal Maintenance
- **Audience:** Existing homeowners, past clients, property managers
- **Search Intent:** Maintenance — "spring roof checklist", "winter roof prep"
- **Themes:** Seasonal checklists, preventive care, gutter maintenance, ventilation checks, when to call a pro, vacation rental maintenance
- **Design Direction:** Checklist-heavy, printable-friendly. Coach tone.
- **Internal Linking:** → Request inspection, → Related maintenance articles, → Service pages
- **Conversion:** Service — "Schedule your annual maintenance inspection"

### 8. Project Inspiration
- **Audience:** Homeowners in early planning stages, visual researchers
- **Search Intent:** Inspirational — "roof ideas mountain home", "before and after roof replacement"
- **Themes:** Project spotlights, before/after showcases, design choices explained, material selections, homeowner stories
- **Design Direction:** Photo-heavy, magazine feel. Aspirational tone with technical credibility.
- **Internal Linking:** → Project detail pages, → Gallery, → Service pages, → Material guides
- **Conversion:** Strong — "Want results like this? Schedule a consultation."

### 9. Commercial Property Guidance
- **Audience:** Property managers, business owners, HOA boards, commercial investors
- **Search Intent:** B2B — "commercial roof maintenance program", "flat roof repair WNC"
- **Themes:** Maintenance programs, commercial systems, tenant considerations, budget planning, emergency protocols, compliance
- **Design Direction:** Professional, business-focused. Data and ROI emphasis.
- **Internal Linking:** → Commercial roofing page, → Maintenance programs, → Request consultation
- **Conversion:** B2B — "Request a maintenance proposal for your property"

### 10. Company News & Project Spotlights
- **Audience:** Existing clients, community, potential hires, Google E-E-A-T signals
- **Search Intent:** Brand — "highlander roofing", company credibility
- **Themes:** Team updates, certifications earned, community involvement, project milestones, year-in-review, hiring
- **Design Direction:** Warm, personal, behind-the-scenes feel. Proud but humble tone.
- **Internal Linking:** → About, → Team, → Certifications, → Careers
- **Conversion:** Ambient — reinforce trust without hard sell

## Category Page Design System

Each category landing should include:
1. Category hero with icon, name, description
2. Featured/pinned articles (1-2)
3. Article grid with date, read time, town tag
4. Related categories sidebar or strip
5. Category-specific CTA (mapped above)
6. Breadcrumb: Blog → Category → Article

## Scalability Rules
1. New articles auto-sort into categories via tag
2. Category pages are auto-generated from the taxonomy
3. Articles can have 1 primary category + optional town tag
4. Featured articles are manually curated per category
5. Cross-linking between related categories is mandatory (min 1 per article)

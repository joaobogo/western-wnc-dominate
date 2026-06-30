---
name: Storm Center Content System
description: Storm content cluster with hub page structure, article types, checklists, insurance education, and conversion paths
type: feature
---

# Storm Center Content System

## Strategic Purpose
A permanent, trusted resource hub that WNC homeowners bookmark and return to after weather events. Not reactive storm-chasing — proactive community service that drives trust and conversion organically.

## Tone Rules
- ✅ Calm, credible, helpful — "here's what to do and why"
- ✅ Specific and actionable — step-by-step guidance
- ✅ Local context — reference WNC weather patterns, not generic advice
- ❌ Never: "Act now before it's too late!", "Limited time!", "Storm chasers are coming!"
- ❌ Never: manipulative urgency, fear-based selling, disaster capitalization

## Hub Page Structure (`/storm-center`)

### 1. Hero
- Headline: "Storm Preparedness & Recovery for WNC Homeowners"
- Subheadline: "Expert guidance before, during, and after severe weather — from the team that responds across Western North Carolina."
- Dark section, calm authority tone, CloudLightning icon

### 2. Active Weather Alert (conditional)
- Amber-accented banner when there's a current storm event
- "Recent Storm in [Area]? Here's what to do." → links to relevant checklist
- Hidden when no active event

### 3. Three-Phase Navigation
- **Before the Storm** — Preparation guides, seasonal readiness
- **During & After** — Damage assessment, emergency steps, documentation
- **Recovery & Claims** — Insurance process, repair planning, contractor selection

### 4. Featured Content Grid
- 3 pinned articles per phase (9 total)
- Large cards with category badges, read time, excerpt

### 5. Emergency Contact Block
- Phone number prominent: (828) 397-9211
- "We respond within 24-48 hours for storm assessments"
- Not pushy — framed as community service

### 6. Insurance Documentation Section
- Step-by-step claim guide
- Photo documentation checklist
- "What your adjuster looks for" guide
- Highlander's role in supporting claims

### 7. Seasonal Prep Calendar
- Visual timeline: when to prepare for what
- Spring storms → Summer thunderstorms → Fall hurricanes → Winter ice/snow

### 8. Local Weather Resources
- Links to NWS Greenville-Spartanburg (WNC forecast office)
- County emergency management contacts
- Power outage reporting links

### 9. Closing CTA
- "Need a storm assessment? We're here to help."
- Consultation CTA + phone, no pressure language

## Article Types

### Type 1: Storm Preparation Guides
- Pre-season checklists by storm type (wind, hail, ice, snow)
- Seasonal preparation timelines
- Material recommendations for storm resilience
- Example: "Preparing Your WNC Roof for Ice Season"

### Type 2: Storm Aftermath Checklists
- Step-by-step post-storm inspection guides
- Photo documentation instructions
- Safety priorities
- Example: "What to Check After a WNC Thunderstorm"

### Type 3: Insurance & Claims Education
- Filing process walkthroughs
- Documentation requirements
- Adjuster meeting preparation
- Supplement process explained
- Example: "How to File a Roof Damage Claim in North Carolina"

### Type 4: Roof Damage Signs
- Visual guides to damage identification
- Material-specific damage indicators (shingle, metal, cedar)
- When repair suffices vs. when replacement is needed
- Example: "5 Signs of Hail Damage on Your Mountain Home Roof"

### Type 5: Emergency Guidance
- Immediate safety steps
- Temporary protection measures (tarping)
- When to evacuate vs. shelter
- Example: "Emergency Roof Repair in Western NC: What to Do When Disaster Strikes"

### Type 6: Local Storm Updates (as-needed)
- Posted after significant weather events
- Specific to affected area/county
- What happened, what to look for, how to get help
- Example: "January 2026 Ice Storm — What Haywood County Homeowners Should Check"

## Conversion Architecture

```
Storm Center Hub
    ↓
Article (education + trust)
    ↓
Inline CTA: "Schedule a Storm Assessment"
    ↓
Request Inspection Form (pre-filled: "Storm Damage")
    ↓
Storm Damage Service Page (deep dive on repair process)
```

### Conversion Points (non-aggressive):
1. **Hub page** → Emergency phone number + consultation CTA
2. **Preparation articles** → "Schedule a pre-storm inspection"
3. **Aftermath checklists** → "Request a professional assessment"
4. **Insurance guides** → "We help document damage for claims"
5. **Damage signs** → "Not sure? Let us take a look — no obligation"
6. **Emergency guides** → Direct phone CTA: (828) 397-9211

## Internal Linking

- Storm Center → Storm Damage service page (primary)
- Storm articles → Related storm articles (cluster linking)
- Storm articles → Town pages (when location-specific)
- Storm articles → Insurance claim guide (cross-link)
- Service pages → Storm Center hub (reverse link from storm damage page)
- Homepage BlogInsights → Feature storm content during storm season

## SEO Cluster Strategy

**Pillar page:** `/storm-center` (hub)
**Cluster articles:** All storm-tagged blog posts
**Target queries:**
- "storm damage roof [town] nc"
- "what to do after storm damage roof"
- "roof insurance claim north carolina"
- "ice dam damage western nc"
- "hail damage roof signs"
- "emergency roof repair [town] nc"

## Content Calendar Triggers
1. **Pre-season** (2 weeks before): Publish preparation guide for upcoming season
2. **During event** (same day): Social media alert linking to relevant checklist
3. **Post-event** (24-48 hours): Publish local update if damage is significant
4. **Recovery** (1-2 weeks after): Insurance/claims education content

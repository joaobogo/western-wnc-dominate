---
name: CTA Architecture
description: Complete CTA hierarchy with language, styling, timing, repetition rules, mobile behavior, and page-level CTA mapping
type: feature
---

# CTA Architecture — Highlander Roofing & Construction

## CTA Philosophy

Every CTA is an invitation, not a demand. The language assumes intelligence, respects the visitor's timeline, and positions Highlander as the expert waiting to help — not the salesperson chasing a close.

**Tone rule:** If it sounds like it belongs on a used car lot, rewrite it.

---

## I. CTA Hierarchy

### Primary CTA — "The Invitation"
- **Purpose:** Direct conversion — schedule consultation, start quote
- **Style:** `cta-gradient` (gold gradient) + `btn-primary-interactive` shimmer
- **Size:** Large (px-6 py-3.5 text-base on desktop, full-width on mobile)
- **Icon:** ArrowRight with `btn-arrow-icon` hover shift
- **Placement:** Maximum 1 per viewport, 2–3 per page

**Language options (rotate by context):**
- "Schedule a Quote Call"
- "Start Your Project Consultation"
- "Request a Free Assessment"
- "Let's Discuss Your Project"
- "Get Your Custom Estimate"

**Trust line (below CTA):**
- "No obligation · Free assessment · Response within 24 hours"
- "We'll call at a time that works for you"
- "100+ homeowners started here this year"

### Secondary CTA — "The Explorer"
- **Purpose:** Guide deeper into content — view services, see projects, learn more
- **Style:** `btn-ghost-interactive` or outlined (border-primary, bg-transparent)
- **Size:** Medium (px-5 py-2.5 text-sm)
- **Icon:** ArrowRight or ChevronRight
- **Placement:** Alongside or below primary CTAs, in section endings

**Language options:**
- "Explore Roofing Services"
- "View Our Project Gallery"
- "See How We Work"
- "Compare Roofing Materials"
- "Meet the Team"
- "Read What Homeowners Say"

### Tertiary CTA — "The Nudge"
- **Purpose:** Micro-conversion — call, download, use tool, read more
- **Style:** Text link with `link-draw` underline animation, or small pill
- **Size:** Small (text-sm, inline)
- **Icon:** Phone, Download, or none
- **Placement:** In-content, sidebars, card footers

**Language options:**
- "Call (828) 397-9211"
- "Use our Roof Cost Estimator"
- "Download the Homeowner's Guide"
- "Read the full case study"
- "Check if we serve your area"

---

## II. Page-Level CTA Mapping

### Homepage
| Position | CTA Type | Language | Context |
|----------|----------|---------|---------|
| Hero | Primary | "Schedule a Quote Call" | After headline + trust strip |
| DualPathway | Secondary ×2 | "Explore Roofing" / "Explore Construction" | Division split cards |
| After FeaturedProjects | Tertiary | "View all projects →" | In-content link |
| After OurProcess | Primary | "Start Your Project Consultation" | Trust built, process explained |
| InspectionForm | Primary (form) | "Request Your Free Assessment" | Embedded form section |
| CTABlock (final) | Primary | "Let's Discuss Your Project" | Last-chance before footer |
| StickyMobileCTA | Primary + Tertiary | "Quote" / "Call" / "Services" | Fixed bottom bar (mobile) |
| Desktop floating | Primary | "Start a Conversation" | Bottom-right trigger |

### Roofing Service Pages (Residential, Commercial, Materials)
| Position | CTA Type | Language |
|----------|----------|---------|
| After service intro | Primary | "Get a Roofing Estimate" |
| After materials/specs | Secondary | "Compare Materials Side by Side" |
| After proof/gallery | Primary | "Schedule Your Roof Assessment" |
| In-content | Tertiary | "Use our Roof Cost Estimator" |
| Page end | Primary | "Ready? Let's Talk About Your Roof" |

### Construction Service Pages (Additions, Renovations, Outdoor)
| Position | CTA Type | Language |
|----------|----------|---------|
| After service intro | Primary | "Start a Construction Consultation" |
| After scope examples | Secondary | "See Similar Projects" |
| After process section | Primary | "Let's Plan Your Build" |
| In-content | Tertiary | "Try the Project Readiness Quiz" |
| Page end | Primary | "Your Project Starts with a Conversation" |

### Project / Gallery Pages
| Position | CTA Type | Language |
|----------|----------|---------|
| After 6 projects | Primary (floating) | "Want Results Like These?" |
| Project detail end | Primary | "Start a Similar Project" |
| Gallery end | Primary | "Schedule Your Consultation" |

### About / Team / Certifications
| Position | CTA Type | Language |
|----------|----------|---------|
| After team section | Secondary | "See What We've Built" |
| After certifications | Primary | "Work with Certified Professionals" |
| Page end | Primary | "Let's Build Something Together" |

### Blog Articles
| Position | CTA Type | Language |
|----------|----------|---------|
| After paragraph 3–4 | In-content block | "Need help with [topic]? Let's talk →" |
| Sidebar (desktop) | Secondary | "Get a Free Roof Assessment" |
| Article end | Primary | "Ready to Take the Next Step?" |
| Related articles | Tertiary | "Read more: [title] →" |

### Town / Location Pages
| Position | CTA Type | Language |
|----------|----------|---------|
| After local stats | Primary | "Get a Quote in [Town]" |
| After local projects | Secondary | "See More [Town] Projects" |
| Page end | Primary | "Serving [Town] — Let's Talk" |

### Quote Flow Pages
| Position | CTA Type | Language |
|----------|----------|---------|
| Each step | Primary (Continue) | "Continue" / "Next Step" |
| Final step | Primary (Submit) | "Submit Your Request" |
| Confirmation | Secondary | "Explore While You Wait" |

---

## III. CTA Styling System

### Visual Hierarchy
```
Primary:   cta-gradient bg, white text, shimmer animation, ArrowRight icon
Secondary: border-primary bg-transparent, primary text, no shimmer
Tertiary:  text-only, link-draw underline, accent color
```

### Size Scale
| Context | Desktop | Mobile |
|---------|---------|--------|
| Primary | px-6 py-3.5 text-base | w-full py-4 text-base |
| Secondary | px-5 py-2.5 text-sm | px-4 py-3 text-sm |
| Tertiary | text-sm inline | text-sm inline |

### Interactive States
- **Hover:** Primary shimmer sweep + scale 1.02; Secondary bg-primary/5; Tertiary underline draw
- **Active/Tap:** scale 0.98 on all
- **Focus:** Gold ring (3px box-shadow)
- **Disabled:** opacity-50, no pointer events
- **Loading:** Loader2 spinner replaces icon, text changes to "Submitting..."

---

## IV. CTA Timing & Repetition Rules

### Timing
1. First CTA appears after trust is established (not in first 2 lines of body copy)
2. On homepage: first primary CTA after Hero + TrustStrip (within first scroll)
3. On service pages: first CTA after service description + 1 proof element
4. On blog: first in-content CTA after 300+ words of value delivered
5. Never place CTA immediately after another CTA

### Repetition
- Maximum 3 CTAs per page (1 in-content, 1 section block, 1 page-end)
- Never show 2 primary CTAs in the same viewport
- Vary CTA language — don't repeat the same line twice on one page
- If page has InspectionForm embedded, reduce standalone CTAs to 1

### Scroll-Depth CTAs
- At 25% scroll: trust elements should be visible (not CTAs)
- At 50% scroll: contextual CTA appropriate (after proof/process)
- At 75% scroll: primary CTA block (the "ready" moment)
- At 100%: final CTA before footer + phone number

---

## V. Mobile-Specific CTA Behavior

### StickyMobileCTA (Bottom Bar)
- Appears after 400px scroll
- 3 actions: Call (primary color) | Quote (gold, pulse dot) | Services (muted)
- Tap feedback: `active:scale-95`
- Disappears when InspectionForm section is in viewport (no double-prompting)

### Mobile Form CTAs
- Full-width buttons, minimum 48px height
- Submit button becomes sticky at bottom of form viewport
- "Call instead" link below form submit

### Mobile In-Content CTAs
- Stack vertically (primary above secondary)
- No side-by-side CTAs on mobile
- Phone CTA always available as alternative

---

## VI. CTA Support Copy

### Trust Reinforcement Lines (placed near CTAs)
- "Free, no-obligation project assessment"
- "We respond within 24 hours — usually same day"
- "Join 500+ WNC homeowners who started here"
- "Licensed, insured, and locally owned since [year]"
- "Your project manager handles everything"
- "CertainTeed Master Shingle Applicator — top 1% nationally"

### Objection-Diffusing Lines (placed below CTAs)
- "Not sure what you need? That's what the call is for."
- "Whether it's repair or replacement, we'll give you honest options."
- "We'll walk your property and explain everything — no pressure."
- "Financing available — we'll discuss options that work for you."

### Urgency Without Pressure
- "WNC weather doesn't wait — but we'll work on your timeline."
- "The sooner we assess, the more options you have."
- "Spring schedules fill early — let's get you on the calendar."
- Never: "Limited spots!" / "Act now!" / "Don't miss out!"

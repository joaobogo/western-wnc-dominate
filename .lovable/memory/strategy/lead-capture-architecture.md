---
name: Conversational Lead Capture Architecture
description: Premium lead capture ecosystem with chatbot entry points, quote pathways, smart forms, calculators, sticky CTAs, and contextual conversion across all pages
type: feature
---

# Conversational Lead Capture Architecture

## Design Philosophy
The website should feel like a **high-end project consultation platform**, not a lead funnel. Every conversion touchpoint must be:
- **Consultative** — "Let's figure out what you need" not "Submit your info"
- **Calm** — No popups, no countdown timers, no fake urgency
- **Local** — Reference WNC, towns, mountain climate naturally
- **Premium** — Clean UI, generous spacing, refined typography
- **Helpful** — Even if they don't convert, they leave informed

---

## Lead Capture Ecosystem Overview

```
┌─────────────────────────────────────────────────────────┐
│                    ENTRY POINTS                         │
│                                                         │
│  Chatbot  │  Sticky CTA  │  Inline CTAs  │  Nav CTA   │
│  Widget   │  (Mobile)    │  (Per section) │  (Header)  │
└─────┬─────┴──────┬───────┴───────┬────────┴─────┬──────┘
      │            │               │              │
      ▼            ▼               ▼              ▼
┌─────────────────────────────────────────────────────────┐
│                 QUALIFICATION LAYER                      │
│                                                         │
│  Project Type  │  Service      │  Timeline   │  Town    │
│  Selector      │  Router       │  Qualifier  │  Detect  │
└─────┬──────────┴───────┬───────┴──────┬──────┴────┬────┘
      │                  │              │           │
      ▼                  ▼              ▼           ▼
┌─────────────────────────────────────────────────────────┐
│                 CONVERSION PATHS                        │
│                                                         │
│  Smart Form    │  Calculator   │  Phone Call  │  Chat   │
│  (Multi-step)  │  (Estimator)  │  (Direct)    │  (Bot)  │
└─────┬──────────┴───────┬───────┴──────┬──────┴────┬────┘
      │                  │              │           │
      ▼                  ▼              ▼           ▼
┌─────────────────────────────────────────────────────────┐
│                    OUTCOMES                              │
│                                                         │
│  Scheduled     │  Quote        │  Emergency   │  Email  │
│  Consultation  │  Request      │  Response    │  Nurture│
└─────────────────────────────────────────────────────────┘
```

---

## Entry Points

### 1. Header CTA (Always Visible)
- Desktop: "Schedule a Consultation" button — primary green, right-aligned
- Mobile: Phone icon + "Free Quote" button
- Scroll behavior: Header compresses, CTA stays visible
- Links to: Smart form or phone call (based on context)

### 2. Sticky Mobile CTA Bar
- Fixed bottom bar on all interior pages
- Left: Phone icon with "(828) 397-9211"
- Right: "Get a Quote" button
- Appears after scrolling past hero section
- Storm pages: changes to "Emergency? Call Now" with amber accent
- Never obscures content — 56px height, semi-transparent bg

### 3. Inline Section CTAs (Contextual)
- Placed at natural decision points within page sections
- Copy varies by context (see CTA Language Map below)
- Never more than 1 CTA per 2 scroll-heights
- Styled as contained blocks, not floating overlays

### 4. Chatbot Widget
- Bottom-right floating button (desktop) / bottom-right above sticky bar (mobile)
- Subtle pulse animation on first visit (once, not repeating)
- Opens to conversational interface (see Chatbot System below)
- Auto-message after 45 seconds on service pages: context-aware greeting

### 5. Exit Intent (Desktop Only — Subtle)
- NO popup. Instead: a gentle slide-in sidebar card
- Only triggers once per session, only on service/pricing pages
- Copy: "Before you go — want a quick estimate for your project?"
- Links to calculator or smart form
- Dismissible with single click, never returns that session

---

## Qualification Layer

### Project Type Selector
A visual card selector that appears as the first step of the smart form and within the chatbot flow.

```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ 🏠       │  │ 🔨       │  │ ⛈️       │  │ 🏢       │
│ New Roof │  │ Repair   │  │ Storm    │  │ Addition │
│          │  │          │  │ Damage   │  │ / Reno   │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ 🌿       │  │ 🏗️       │  │ 🏪       │  │ ❓       │
│ Outdoor  │  │ Custom   │  │ Commerc- │  │ Not Sure │
│ Living   │  │ Build    │  │ ial      │  │ Yet      │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

- Each card routes to appropriate form flow
- "Not Sure Yet" routes to chatbot or general consultation
- Cards use brand icons, not generic emoji (emoji shown for reference)

### Service Router Logic
Based on project type selection:

| Selection | Routes To | Form Fields | CTA |
|---|---|---|---|
| New Roof | Roofing smart form | Home type, sq ft, current material, timeline | "Schedule Roof Consultation" |
| Repair | Quick repair form | Issue type, urgency, photos upload | "Request Repair Assessment" |
| Storm Damage | Emergency path | Damage description, insurance status, photos | "Get Emergency Assessment" |
| Addition/Reno | Construction form | Project type, scope, budget range, timeline | "Discuss Your Project" |
| Outdoor Living | Construction form (outdoor) | Project type, space size, features | "Start Planning" |
| Custom Build | Construction form (custom) | Lot status, size, style, budget | "Schedule Design Consultation" |
| Commercial | Commercial form | Property type, issue, sq ft, urgency | "Request Property Assessment" |
| Not Sure | Chatbot or general | Open text + phone/email | "Let's Figure It Out Together" |

---

## Smart Forms (Multi-Step)

### Design Principles
- **Multi-step, not multi-field** — 1-2 questions per step, progress bar visible
- **Conversational copy** — "Tell us about your home" not "Property Information"
- **Smart defaults** — Pre-fill town if detected, default timeline to "Flexible"
- **Save progress** — Session storage so returning visitors don't start over
- **No required phone** — Email required, phone optional with "preferred" label
- **Thank you = next step** — Confirmation shows what happens next with timeline

### Roofing Smart Form (5 steps)

**Step 1: Project Type** (if not already selected)
- Card selector: Replacement / Repair / Storm Damage / Inspection / Not Sure

**Step 2: About Your Home**
- Home type: Single family / Multi-family / Townhome / Cabin/Mountain home / Commercial
- Approximate sq ft: slider or quick-select ranges
- Current roofing material: Shingle / Metal / Cedar / Tile / Don't know

**Step 3: Your Timeline**
- When are you looking to start? ASAP / 1-3 months / 3-6 months / Just researching
- Have you received other estimates? Yes / No / Not yet

**Step 4: Your Location**
- Town/area in WNC (dropdown with all service towns + "Other")
- Address (optional — "helps us provide accurate estimates")

**Step 5: Contact**
- Name
- Email
- Phone (optional, labeled "Best way to reach you?")
- Preferred contact: Call / Text / Email
- Notes (optional textarea)
- Submit: "Request My Consultation"

### Construction Smart Form (5 steps)

**Step 1: Project Type**
- Home Addition / Renovation / Outdoor Living / Custom Construction / Not Sure

**Step 2: Project Scope**
- Brief description (textarea with placeholder examples)
- Approximate size/scope: Small / Medium / Large / Not sure
- Do you have plans or drawings? Yes / Working on it / No

**Step 3: Budget & Timeline**
- Budget range: Under $25K / $25-50K / $50-100K / $100-200K / $200K+ / Not sure yet
- Timeline: Ready to start / 1-3 months / 3-6 months / 6-12 months / Just planning

**Step 4: Location**
- Town/area
- Is this your primary residence? Yes / Vacation home / Investment property / Commercial

**Step 5: Contact**
- Same as roofing contact step
- Submit: "Schedule Project Discussion"

---

## Calculators & Estimators

### Roof Cost Estimator (existing — enhance)
- Inputs: Home size, roof pitch, material, location
- Output: Range estimate with disclaimer
- Conversion: "Want an exact quote? Schedule a free inspection."
- Design: Clean card UI, instant results, no email gate

### Project Budget Planner (new — construction)
- Inputs: Project type, scope, quality level, timeline
- Output: Budget range with cost factors explained
- Conversion: "Let's refine this with a project consultation."
- Design: Interactive sliders, real-time calculation

### Storm Damage Assessment Quiz (new)
- 5-question flow about visible damage signs
- Output: Urgency level (Low / Moderate / High / Emergency)
- Conversion: Emergency → phone CTA, Others → inspection request
- Design: Visual cards with damage photos for reference

---

## CTA Language Map

### By Page Context

| Page | Primary CTA | Secondary CTA | Tone |
|---|---|---|---|
| Homepage | "Schedule a Free Inspection" | "Explore Our Work" | Confident, welcoming |
| Residential Roofing | "Get a Roofing Consultation" | "See Our Projects" | Expert, reassuring |
| Roof Replacement | "Plan Your Roof Replacement" | "Estimate Your Cost" | Practical, helpful |
| Roof Repair | "Request a Repair Assessment" | "Is It Repair or Replace?" | Calm, solution-oriented |
| Storm Damage | "Call (828) 397-9211 Now" | "Document Your Damage" | Urgent but steady |
| Home Additions | "Discuss Your Addition" | "See Addition Projects" | Aspirational, planning |
| Outdoor Living | "Start Planning Your Space" | "Get Inspired" | Creative, inviting |
| Construction Division | "Schedule a Project Consultation" | "See What We Build" | Professional, capable |
| About/Team | "Meet Us in Person" | "Schedule a Consultation" | Personal, trustworthy |
| Blog Article | "Questions? We're Happy to Help" | "Schedule a Consultation" | Soft, non-pushy |
| Town Page | "Get a Quote in [Town]" | "Call Your Local Team" | Local, direct |
| Gallery/Projects | "Want Results Like This?" | "Start Your Project" | Inspired, confident |
| Reviews | "Join Our Happy Clients" | "Schedule Your Consultation" | Social proof driven |

### CTA Copy Rules
1. Never use "Submit" — always action-specific ("Schedule", "Plan", "Request", "Discuss")
2. Never use "Buy Now" or "Sign Up" — this isn't e-commerce
3. Always include what happens next: "We'll call within 24 hours"
4. Phone CTAs always show the full number, never "Call Us"
5. Mobile CTAs are shorter: "Get Quote" vs "Schedule a Free Roofing Consultation"

---

## Conversion Flow UX

### After Form Submission
1. **Instant confirmation** — "Thank you, [Name]. Here's what happens next:"
2. **Next steps timeline** — "Our team will review your request and call within 1 business day."
3. **Expectation setting** — "During the call, we'll discuss your project and schedule an on-site visit if needed."
4. **Continued engagement** — "While you wait, check out similar projects in [Town]:" + 2-3 project cards
5. **No redirect to homepage** — keep them engaged on the confirmation page

### After Phone Call CTA
- Click-to-call on mobile
- Desktop: show phone number prominently + "Or fill out our form and we'll call you"
- Track call intent (analytics event)

### After Calculator Use
- Show results without email gate
- Below results: "Want a precise quote? Schedule a free consultation."
- Option to email results to themselves (light lead capture)

---

## Anti-Patterns (Never Do)
1. ❌ No full-screen popups or overlays
2. ❌ No "Wait! Before you go!" aggressive exit intent
3. ❌ No fake countdown timers or "limited time" urgency
4. ❌ No chat auto-open on page load (subtle notification only)
5. ❌ No email gates before providing value (calculators, guides)
6. ❌ No multi-field forms above the fold (use progressive disclosure)
7. ❌ No "How did you hear about us?" as a required field
8. ❌ No CAPTCHA unless spam is proven — use honeypot fields instead
9. ❌ No "Schedule Now!" with exclamation marks — keep it calm
10. ❌ No sliding in from the side on mobile — it covers content

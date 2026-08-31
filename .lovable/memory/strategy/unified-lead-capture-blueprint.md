---
name: Unified Interactive Lead Capture Blueprint
description: Master blueprint combining chatbot, widgets, calculators, quote flow, forms, conversion architecture, lead qualification, scheduling, CTA language, and visual direction
type: feature
---

# Unified Interactive Lead Capture Blueprint

## Mission
Transform Highlander's website from a static brochure into a **premium guided project platform** — one that educates, qualifies, and converts serious roofing and construction prospects through intelligent interactivity, consultative tone, and cumulative trust.

---

## 1. Interactive Lead Capture Strategy

**Reference:** `mem://strategy/lead-capture-architecture`

### Ecosystem Architecture
```
ENTRY POINTS → QUALIFICATION → CONVERSION → OUTCOMES
─────────────────────────────────────────────────────
Chatbot         Project type     Smart forms    Scheduled consultation
Sticky CTA      Service router   Calculators    Quote request
Inline CTAs     Timeline check   Phone call     Emergency response
Nav CTA         Town detection   Chatbot close  Email nurture
Exit card       Budget signals   Scheduling UI  Content journey
```

### Design Rules
- **Consultative, not transactional** — "Let's figure this out" not "Get a quote"
- **No popups, no timers, no fake urgency** — calm, premium, respectful
- **Value before ask** — show results, then invite contact
- **Progressive disclosure** — 1-2 questions at a time
- **Every path ends at a human** — tools guide, people close

---

## 2. Chatbot: Highland Guide

**Reference:** `mem://strategy/chatbot-system`, `mem://strategy/chatbot-conversation-library`

### Personality
- **Name:** Highland Guide
- **Role:** Premium digital project assistant
- **Tone:** Knowledgeable local, calm, helpful, never pushy
- **Voice rules:** Short messages (max 3 sentences), "we/our team" language, WNC references natural, honest about limitations

### Routing Logic
```
Welcome → Service Discovery → Division Router
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
              ROOFING         CONSTRUCTION      STORM
              │                │                │
    ┌─────────┼─────────┐     ├─ Addition      ├─ Active leak → PHONE
    │         │         │     ├─ Renovation    ├─ Visible damage → Schedule
    ▼         ▼         ▼     ├─ Outdoor       └─ Not sure → Inspect
  Replace   Repair   Commercial├─ Custom
    │         │         │     └─ Not sure → Planner
    │         │         │
    └─────────┼─────────┘
              │
    QUALIFICATION (4-5 turns)
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
  Schedule  Resources  Phone
  (hot)     (cool)     (emergency)
```

### 11 Conversation Flows
1. Welcome (first-time + returning)
2. Service discovery
3. Roofing vs construction routing
4. Quote call invitation (soft/email/not-ready)
5. Project urgency (emergency → future)
6. Storm damage (active → monitoring)
7. Materials guidance (with elevation-specific advice)
8. Service area qualification
9. Commercial inquiry
10. Budget sensitivity (honest, never cheapening)
11. Objection handling (timing, complexity, trust, price)

### Placement
| Page | Behavior | Auto-Message |
|---|---|---|
| Homepage | Available, no auto-message | None |
| Service pages | Notification after 45s | Context-aware |
| Storm pages | Notification after 15s | Storm-specific |
| Town pages | Notification after 30s | Town-aware |
| Blog | Available, quiet | None |
| Contact/Quote | Hidden (form primary) | N/A |

---

## 3. Form System

**Reference:** `mem://features/smart-form-system`

### 7 Form Types

| Form | Fields | Friction | Where |
|---|---|---|---|
| Quick Inquiry | 3 | Very low | Homepage, footer, blog |
| Quote Call Request | 5 | Low-med | Service sidebars, chatbot |
| Roofing Consultation | 7 | Medium | All roofing pages |
| Construction Consultation | 7 | Medium | All construction pages |
| Storm Request | 5 | Low | Storm pages |
| Commercial Inquiry | 7 | Medium | Commercial page |
| Project Planner Intake | 10+ (multi-step) | Higher | /plan-your-project, custom builds |

### Form Design Rules
- Conversational labels ("Tell us about your project" not "Project Description")
- Trust strip before every submit button
- Honeypot anti-spam (no CAPTCHA)
- Session persistence for multi-step forms
- Phone always optional (except storm)
- Post-submit: inline confirmation with next steps, not just a toast

---

## 4. Quote Flow

**Reference:** `mem://strategy/quote-flow-architecture`

### 6-Step Premium Consultation Request
1. **Project Category** — Roofing / Construction / Storm / Not Sure (visual cards)
2. **Project Type** — Branches by category with specific options
3. **Location** — Town dropdown + optional address
4. **Timeline** — Urgency pills + "other estimates?" follow-up
5. **Project Context** — Textarea + photo upload (up to 5)
6. **Contact** — Name, email, optional phone, preferred method, best time

### Key Features
- Context-aware entry copy based on source page
- Smart defaults (pre-fill from navigation context)
- Emergency callout if "active leak" selected
- Session persistence (survive page navigation)
- Confirmation page with visual timeline of what happens next
- "Email this to myself" option on results

---

## 5. Widget Suite

**Reference:** `mem://features/widget-strategy`

### 9 Premium Widgets

| Widget | Priority | Impact | Purpose |
|---|---|---|---|
| Repair vs Replace | 1 | High | Decision support → inspection CTA |
| Storm Response Checklist | 2 | High | Post-storm trust → assessment CTA |
| Materials Comparison | 3 | High | SEO + education → consultation |
| Service Area Finder | 4 | High | Local SEO → town-specific CTA |
| Project Type Selector | 5 | Medium | Navigation → service pages |
| Additions Inspiration | 6 | Medium | Visual engagement → consultation |
| Project Consultation Planner | 7 | Medium | Qualification → consultation |
| Project Fit Guide | 8 | Medium | Transparency → trust |
| Scheduling Helper | 9 | High | Direct booking (needs calendar) |

---

## 6. Roofing Calculators

**Reference:** `mem://features/roofing-calculators`

### 5 Tools

| Tool | Purpose | Key Output | CTA |
|---|---|---|---|
| Roof Scope Estimator | Planning-level cost range | $XX,XXX — $XX,XXX | "Get exact number — free inspection" |
| Replacement Readiness | Should I replace? | Urgency tier (4 levels) | Tier-appropriate (calm → urgent) |
| Materials Comparison | Side-by-side value analysis | Cost/year comparison | "Find your best fit" |
| Maintenance Checker | What needs attention? | Prioritized checklist | "Schedule maintenance inspection" |
| Storm Impact Assessment | Post-storm urgency | Emergency → monitoring | Phone (emergency) → schedule |

### Calculator Rules
- No email gate before results
- Always show ranges, never fake precision
- WNC-specific factors (elevation, rainfall, access)
- Disclaimer on every tool
- "Email results to myself" as light lead capture

---

## 7. Construction Planning Tools

**Reference:** `mem://features/construction-planning-tools`

### 6 Tools

| Tool | Purpose | Output | CTA |
|---|---|---|---|
| Project Readiness Quiz | Am I ready to build? | Ready / Almost / Early stage | Tier-appropriate resources |
| Addition Planning Guide | Walk through key decisions | "Your Addition Profile" with range | "Discuss this plan with our team" |
| Timeline Expectation Tool | Set realistic timelines | Visual Gantt-style timeline | "Get project-specific timeline" |
| Outdoor Living Selector | Explore possibilities | Curated inspiration board | "Plan your outdoor space" |
| Renovation Goals Builder | Prioritize renovation scope | Ranked roadmap with budgets | "Refine this plan with our team" |
| Consultation Prep Tool | Organize before meeting | Structured intake for team | "Schedule consultation" |

---

## 8. Conversion Architecture

**Reference:** `mem://strategy/tool-conversion-architecture`

### Every Tool Result Includes
1. **Clear result** — what the tool found/calculated
2. **Recommended next step** — primary CTA (large, confident)
3. **Helpful resources** — 3 smart content suggestions
4. **Trust strip** — context-appropriate credentials
5. **Save/share option** — email or share with partner

### CTA Mapping by Tool Outcome Tier
- **Urgent:** "Call (828) 524-7773" — phone is primary
- **High intent:** "Schedule a Consultation" — direct booking
- **Medium intent:** "Let's Discuss Your Options" — consultative
- **Low intent:** "Here's What to Explore" — educational resources
- **Information only:** "We're Here When You're Ready" — soft, patient

### Premium Language Rules
| Never Say | Always Say |
|---|---|
| Get a quote | Let's discuss your project |
| Submit | Begin your consultation |
| Contact us | Start the conversation |
| Act now | Whenever you're ready |
| Limited time | — (never use) |
| Free estimate | Free, no-obligation consultation |

---

## 9. Lead Qualification

**Reference:** `mem://strategy/lead-qualification-framework`

### Scoring System (0-100+)

| Signal | Points |
|---|---|
| Scheduled consultation | +30 |
| Emergency/ASAP timeline | +25 |
| Requested callback | +25 |
| Phone provided | +15 |
| Within 1 month timeline | +20 |
| Insurance claim open | +15 |
| Plans/drawings ready | +15 |
| Primary service area | +10 |
| Photos uploaded | +10 |
| Budget provided | +10 |
| Detailed project notes | +10 |
| Returning visitor | +10 |
| Used 2+ tools | +10 |
| First inquiry (not shopping) | +10 |

### Lead Tiers & Response

| Tier | Score | Response Time | Action |
|---|---|---|---|
| 🔴 Hot | 70+ | 2 hours | Immediate callback, senior team |
| 🟠 Warm | 40-69 | 24 hours | Personalized follow-up email |
| 🟡 Engaged | 20-39 | 48 hours | Educational nurture sequence |
| 🟢 Cool | 0-19 | Weekly digest | Content nurture only |

### Intent-Based Branching
- **Hot → Fast track:** Skip education, route to scheduling, senior team
- **Warm → Standard path:** Confirmation + relevant projects + 24hr follow-up
- **Engaged → Nurture path:** Resources + 1 article/week for 4 weeks
- **Cool → Ambient:** No follow-up unless opted in, retarget with content

---

## 10. Scheduling Experience

**Reference:** `mem://strategy/scheduling-architecture`

### 5 Consultation Types

| Type | Duration | Team Member | Key Difference |
|---|---|---|---|
| Roofing | 15 min call → on-site | Roofing estimator | Efficient, reassuring |
| Construction | 20-30 min call | Construction lead | Aspirational, collaborative |
| Storm Assessment | 5-10 min → on-site | Storm coordinator | Urgent, empathetic |
| Commercial | 20 min → site visit | Commercial specialist | Professional, ROI-focused |
| General Inquiry | 10-15 min | Client coordinator | Routing conversation |

### Scheduling UI
- Day/time selector (next 5 available days, hourly slots)
- Mobile: full-width bottom sheet, sticky confirm button
- Includes: consultation type, contact info, brief project note
- Trust strip: "Free · No obligation · 15-30 min"

### Communication Sequence
1. **Confirmation email** (immediate) — warm, personal, what-to-expect
2. **24-hour reminder** (email) — friendly, reschedule link
3. **1-hour reminder** (SMS if opted in) — brief, helpful
4. **Post-consultation follow-up** (same day) — summary + next steps
5. **No-show recovery** (gentle) — "Want to reschedule?" zero guilt

---

## 11. Visual Direction

### Design System for Interactive Elements
- **Cards:** Cream background, subtle border, generous padding (p-6), rounded-xl
- **Buttons:** Primary green for main CTAs, outlined for secondary
- **Progress:** Gold dots/bar for multi-step flows
- **Status indicators:** Green (good) / Amber (attention) / Red (urgent)
- **Icons:** Custom brand icons, not generic emoji (emoji in docs is placeholder only)
- **Typography:** Playfair Display for widget titles, DM Sans for body/labels
- **Animation:** Subtle framer-motion transitions (300ms slide, 200ms fade)
- **Mobile:** Full-width cards, sticky bottom buttons, touch-friendly targets (44px min)

### Spacing & Layout
- Widgets: max-width 640px centered, or sidebar placement at 320px
- Forms: single column always, generous field spacing
- Calculators: step-by-step cards, one question visible at a time on mobile
- Results: full-width result card with clear visual hierarchy

### Trust Elements (consistent across all tools)
```
┌─────────────────────────────────────────────────┐
│ ✓ Free consultation  ·  ✓ No obligation         │
│ ✓ [Context-specific: "Licensed & insured" /     │
│    "24-hour response" / "GAF Master Elite"]     │
└─────────────────────────────────────────────────┘
```

---

## 12. Database Schema

### Tables Required

**`consultation_requests`** — All form/quote flow submissions
```
id, project_category, project_type, location_town, location_address,
timeline, has_other_estimates, project_notes, photo_paths[],
contact_name, contact_email, contact_phone, preferred_contact,
best_time, lead_score, source_page, status, created_at
```

**`scheduled_consultations`** — All scheduled appointments
```
id, consultation_type, scheduled_date, scheduled_time,
contact_name, contact_phone, contact_email, project_notes,
source_page, lead_score, status, reminder_sent_24h,
reminder_sent_1h, follow_up_sent, created_at,
consultation_request_id (FK)
```

**`chat_conversations`** — Chatbot sessions
```
id, session_id, started_at, ended_at, page_started,
lead_score, lead_tier, escalated_to, created_at
```

**`chat_messages`** — Individual chatbot messages
```
id, conversation_id (FK), role, content, quick_replies[],
created_at
```

---

## 13. System Architecture Summary

```
┌──────────────────────────────────────────────────────────┐
│                    VISITOR ARRIVES                        │
└────────────────────────┬─────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
    ┌─────────┐    ┌──────────┐    ┌──────────┐
    │ Chatbot │    │ Widgets/ │    │  Forms/  │
    │ Highland│    │ Calcs/   │    │  Quote   │
    │ Guide   │    │ Tools    │    │  Flow    │
    └────┬────┘    └────┬─────┘    └────┬─────┘
         │              │              │
         └──────────────┼──────────────┘
                        │
              ┌─────────▼─────────┐
              │   QUALIFICATION   │
              │   Score + Tier    │
              └─────────┬─────────┘
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
    ┌─────────┐   ┌──────────┐   ┌──────────┐
    │ 🔴 Hot  │   │ 🟠 Warm  │   │ 🟡 Cool  │
    │ 2hr     │   │ 24hr     │   │ Nurture  │
    │ callback│   │ follow-up│   │ content  │
    └────┬────┘   └────┬─────┘   └────┬─────┘
         │              │              │
         └──────────────┼──────────────┘
                        │
              ┌─────────▼─────────┐
              │   CONSULTATION    │
              │   Schedule + Prep │
              └─────────┬─────────┘
                        │
              ┌─────────▼─────────┐
              │   CONFIRMATION    │
              │   + Follow-Up     │
              │   + Nurture       │
              └───────────────────┘
```

---

## Success Metrics

| Metric | Target | Measurement |
|---|---|---|
| Tool completion rate | >65% | Started vs completed |
| Form submission rate | >8% of service page visitors | Submissions / page views |
| Chatbot engagement | >5% of visitors interact | Chat opens / sessions |
| Lead score accuracy | >70% of hot leads convert to appointments | Scored hot / actually scheduled |
| Quote flow completion | >50% of starters finish | Step 1 starts / submissions |
| Scheduling no-show rate | <15% | No-shows / scheduled |
| Average pages per session | 3.5+ | Analytics |
| Time on site (tool users) | >4 minutes | Analytics |
| Lead quality (team rating) | >7/10 average | Post-consultation survey |

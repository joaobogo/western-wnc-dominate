---
name: Smart Form System
description: 7 form types with fields, tone, friction levels, placement, trust copy, and conversion strategy for every page context
type: feature
---

# Smart Form System

## Design Principles
- **Minimal friction** — only ask what's needed for that context
- **Conversational labels** — "Tell us about your project" not "Project Description"
- **Trust-forward** — every form includes a trust strip before submit
- **No CAPTCHA** — honeypot field only
- **Session persistence** — partially filled forms survive page navigation
- **Responsive** — single-column on mobile, fields stack naturally

---

## Form 1: Quick Inquiry Form

**Purpose:** Lowest-friction entry point for general interest
**Where:** Homepage (inline in CTA section), footer, blog article CTAs
**Friction level:** Very low (3 fields)

**Fields:**
| Field | Type | Required | Label | Helper |
|---|---|---|---|---|
| Name | text | Yes | "Your name" | — |
| Email | email | Yes | "Email address" | — |
| Message | textarea | No | "What can we help with?" | "A sentence or two is plenty." |

**Submit:** "Send a Message"
**Trust strip:** "We respond within 1 business day. No spam, ever."
**Post-submit:** Inline confirmation: "Thanks, [Name] — we'll be in touch soon."

---

## Form 2: Quote Call Request Form

**Purpose:** Schedule a phone consultation
**Where:** Service pages (sidebar or inline), quote flow handoff, chatbot escalation
**Friction level:** Low-medium (5 fields)

**Fields:**
| Field | Type | Required | Label | Helper |
|---|---|---|---|---|
| Name | text | Yes | "Your name" | — |
| Phone | tel | Yes | "Best phone number" | "We'll call, not text, unless you prefer otherwise." |
| Project type | select | Yes | "What kind of project?" | Options: Roofing / Construction / Storm Damage / Not Sure |
| Best time | pills | No | "Best time to call?" | Morning / Midday / Afternoon / Anytime |
| Notes | textarea | No | "Anything you'd like us to know?" | "Optional — helps us prepare for the call." |

**Submit:** "Request a Call"
**Trust strip:** "Free, no-obligation call. Usually within the same business day."

---

## Form 3: Roofing Consultation Form

**Purpose:** Detailed roofing project intake
**Where:** Residential Roofing, Roof Replacement, Roof Repair, Specialty Roofing pages
**Friction level:** Medium (7 fields, but feels light with smart layout)

**Fields:**
| Field | Type | Required | Label | Helper |
|---|---|---|---|---|
| Name | text | Yes | "Your name" | — |
| Email | email | Yes | "Email address" | — |
| Phone | tel | No | "Phone (optional)" | "Fastest way to discuss details" |
| Service | select | Yes | "What does your roof need?" | Replacement / Repair / Inspection / Storm Assessment / Specialty / Not Sure |
| Home type | pills | No | "Type of home" | Single Family / Cabin / Townhome / Multi-family / Commercial |
| Location | select | Yes | "Town or area" | [All service towns + Other WNC] |
| Details | textarea | No | "Tell us more" | "Age of roof, current material, concerns — anything helps." |

**Submit:** "Request Roofing Consultation"
**Trust strip:** "✓ Free inspection · ✓ No obligation · ✓ Licensed & insured"
**Page-specific intro copy:** "Every roof in these mountains has a story. Tell us about yours."

---

## Form 4: Construction Consultation Form

**Purpose:** Construction project intake (additions, renovations, outdoor living)
**Where:** Construction Division, Home Additions, Renovations, Outdoor Living, Custom Construction
**Friction level:** Medium (7 fields)

**Fields:**
| Field | Type | Required | Label | Helper |
|---|---|---|---|---|
| Name | text | Yes | "Your name" | — |
| Email | email | Yes | "Email address" | — |
| Phone | tel | No | "Phone (optional)" | — |
| Project type | select | Yes | "What are you building?" | Addition / Renovation / Outdoor Living / Custom Build / Garage-Workshop / Other |
| Stage | pills | No | "Where are you in the process?" | Just an idea / Planning / Have plans / Ready to build |
| Location | select | Yes | "Property location" | [All service towns] |
| Vision | textarea | No | "Tell us about your vision" | "Size, style, must-haves — whatever you're imagining." |

**Submit:** "Start the Conversation"
**Trust strip:** "✓ Free consultation · ✓ No obligation · ✓ 40+ years combined experience"
**Page-specific intro:** "Great projects start with a great conversation."

---

## Form 5: Storm Damage Request Form

**Purpose:** Fast intake for storm-related damage assessment
**Where:** Storm Damage page, Storm Center, post-storm banner/alert
**Friction level:** Low (5 fields + urgency routing)

**Fields:**
| Field | Type | Required | Label | Helper |
|---|---|---|---|---|
| Name | text | Yes | "Your name" | — |
| Phone | tel | Yes | "Phone number" | "We'll call to schedule your assessment." |
| Urgency | pills | Yes | "How urgent is this?" | Emergency (active leak) / Damage visible / Preventive check |
| Insurance | pills | No | "Insurance claim filed?" | Yes / Not yet / No insurance |
| Description | textarea | No | "What are you seeing?" | "Describe the damage — photos can be shared later." |

**Submit:** "Request Storm Assessment"
**Emergency callout:** If "Emergency" selected: "For active leaks, call us now: 📞 (828) 524-7773"
**Trust strip:** "✓ 24-hour response · ✓ Insurance documentation included · ✓ Free assessment"
**Tone:** Calm, efficient, no-nonsense. "We'll get to you quickly."

---

## Form 6: Commercial Inquiry Form

**Purpose:** B2B intake for property managers, business owners, HOAs
**Where:** Commercial Roofing page, commercial chatbot path
**Friction level:** Medium (7 fields, professional tone)

**Fields:**
| Field | Type | Required | Label | Helper |
|---|---|---|---|---|
| Contact name | text | Yes | "Your name" | — |
| Company/Property | text | No | "Company or property name" | — |
| Email | email | Yes | "Business email" | — |
| Phone | tel | Yes | "Phone number" | — |
| Property type | select | Yes | "Property type" | Retail/Office / Industrial / Multi-family / HOA / Hospitality / Other |
| Need | select | Yes | "What do you need?" | Active repair / Maintenance program / Roof replacement / New construction / Assessment |
| Details | textarea | No | "Additional details" | "Property size, number of units, specific concerns." |

**Submit:** "Request a Property Assessment"
**Trust strip:** "✓ Commercial-certified crews · ✓ Maintenance programs available · ✓ Fully insured"
**Tone:** Professional, efficient. "We understand commercial timelines and budgets."

---

## Form 7: Project Planner Intake Form

**Purpose:** Comprehensive intake for serious prospects with complex projects
**Where:** Dedicated /plan-your-project page, linked from construction pages, chatbot handoff for complex projects
**Friction level:** Higher (10+ fields, multi-step) — acceptable because these are high-intent users

**Step 1: Project Overview**
| Field | Type | Required | Label |
|---|---|---|---|
| Project category | cards | Yes | "What type of project?" |
| Project type | select | Yes | "More specifically..." |
| Property type | pills | Yes | "Property type" |

**Step 2: Scope & Vision**
| Field | Type | Required | Label |
|---|---|---|---|
| Description | textarea | Yes | "Describe your project" |
| Size/scope | select | No | "Approximate scope" |
| Have plans? | pills | No | "Do you have plans or drawings?" |
| Photos | file upload | No | "Upload photos or inspiration" |

**Step 3: Timeline & Budget**
| Field | Type | Required | Label |
|---|---|---|---|
| Timeline | pills | Yes | "When do you want to start?" |
| Budget range | select | No | "Budget range (optional)" |
| Other estimates | pills | No | "Received other estimates?" |

**Step 4: Contact**
| Field | Type | Required | Label |
|---|---|---|---|
| Name | text | Yes | "Your name" |
| Email | email | Yes | "Email" |
| Phone | tel | No | "Phone" |
| Location | select | Yes | "Property location" |
| Preferred contact | pills | No | "Best way to reach you" |

**Submit:** "Submit Project Details"
**Confirmation:** Full confirmation page (per Quote Flow Architecture)

---

## Form Placement Map

| Page | Primary Form | Secondary |
|---|---|---|
| Homepage | Quick Inquiry (inline) | — |
| Residential Roofing | Roofing Consultation | Quote Call (sidebar) |
| Roof Replacement | Roofing Consultation | Quote Call |
| Roof Repair | Roofing Consultation (repair preset) | Quote Call |
| Storm Damage | Storm Request | — |
| Storm Center | Storm Request | — |
| Commercial Roofing | Commercial Inquiry | — |
| Home Additions | Construction Consultation | — |
| Renovations | Construction Consultation | — |
| Outdoor Living | Construction Consultation | — |
| Custom Construction | Project Planner Intake | — |
| Construction Division | Construction Consultation | — |
| Contact / Quote | Project Planner Intake (full) | Quote Call |
| Blog articles | Quick Inquiry (bottom) | — |
| Town pages | Roofing Consultation (town preset) | — |
| About / Team | Quick Inquiry | — |
| Chatbot handoff | Whichever form matches the conversation context | — |

---

## Shared Trust Elements

### Trust Strip Variants
```
Standard:    ✓ Free consultation · ✓ No obligation · ✓ Response within 1 business day
Roofing:     ✓ Free inspection · ✓ GAF Master Elite · ✓ Licensed & insured
Construction: ✓ Free consultation · ✓ 40+ years combined · ✓ Licensed & insured
Storm:       ✓ 24-hour response · ✓ Insurance help included · ✓ Free assessment
Commercial:  ✓ Commercial-certified · ✓ Maintenance programs · ✓ Fully insured
```

### Privacy Note (all forms)
"Your information is never shared or sold. We use it only to contact you about your project."

### Honeypot Anti-Spam
Hidden field `website_url` — if filled, silently reject submission. No CAPTCHA.

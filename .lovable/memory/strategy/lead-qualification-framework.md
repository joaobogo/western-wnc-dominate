---
name: Lead Qualification Framework
description: Qualification signals, collection methods, scoring system, and intent-based branching across chatbot, forms, widgets, and quote flows
type: feature
---

# Lead Qualification Framework

## Qualification Signals

### Signal Categories

| Signal | Source | Collection Method | Weight |
|---|---|---|---|
| **Service category** | Forms, chatbot, widgets | Card/button selection | Core routing |
| **Project type** | Forms, chatbot, widgets | Dropdown/cards | Core routing |
| **Property type** | Forms, chatbot | Pills/dropdown | Scoring |
| **Service area** | Forms, chatbot, IP/location | Dropdown or auto-detect | Scoring |
| **Urgency** | Forms, chatbot, storm tools | Pills/buttons | High weight |
| **Timeline** | Forms, chatbot, quote flow | Pills | High weight |
| **Project goals** | Widgets, chatbot, planner tools | Multi-select, textarea | Context |
| **Project scale** | Estimator, planner, chatbot | Slider/select | Scoring |
| **Budget awareness** | Quote flow, chatbot, planners | Optional select | Scoring |
| **Contact intent** | All touchpoints | Which CTA they chose | Highest weight |
| **Has other estimates** | Quote flow, chatbot | Pills | Scoring |
| **Has plans/drawings** | Construction forms, chatbot | Pills | Scoring |
| **Insurance status** | Storm forms, chatbot | Pills | Scoring (storm) |
| **Decision stage** | Chatbot, widgets, readiness quiz | Inferred from behavior | Scoring |

---

## Collection Philosophy

### Rules for Respectful Qualification
1. **Earn before you ask** — provide value (result, answer, resource) before requesting contact info
2. **Progressive disclosure** — start with easy questions, escalate gradually
3. **Make it optional** — phone, budget, and address are always optional
4. **Explain why** — "This helps us assign the right team" not just an empty field
5. **Never gate results** — show calculator/quiz results first, then invite contact
6. **One thing at a time** — chatbot asks 1 question per message, forms show 1-2 fields per step
7. **Respect "not ready"** — offer resources instead of pushing conversion

### Collection by Channel

| Channel | Max Questions Before CTA | Tone |
|---|---|---|
| Chatbot | 4-5 conversational turns | Friendly, paced |
| Multi-step form | 5-6 steps (1-2 fields each) | Clean, professional |
| Quick form | 3 fields max | Fast, respectful |
| Widget/calculator | Embedded in tool flow | Natural, educational |
| Quote flow | 6 steps (full qualification) | Consultative, thorough |

---

## Lead Scoring System

### Scoring Table

| Signal | Value | Points |
|---|---|---|
| **Contact intent** | Requested callback | +25 |
| | Scheduled consultation | +30 |
| | Submitted form | +20 |
| | Email only | +10 |
| | Still browsing | +0 |
| **Timeline** | Emergency/ASAP | +25 |
| | Within 1 month | +20 |
| | 1-3 months | +15 |
| | 3-6 months | +10 |
| | Just researching | +5 |
| **Phone provided** | Yes | +15 |
| **Location** | Primary service town | +10 |
| | Other WNC | +5 |
| | Outside WNC | -5 |
| **Has estimates** | Yes (shopping) | +5 |
| | First inquiry | +10 |
| **Photos uploaded** | Yes | +10 |
| **Project notes** | Detailed (50+ chars) | +10 |
| | Brief | +5 |
| **Budget provided** | Yes | +10 |
| **Plans/drawings** | Yes | +15 |
| **Insurance claim** | Open (storm) | +15 |
| **Engagement** | Used 2+ tools | +10 |
| | Visited 3+ service pages | +5 |
| | Returning visitor | +10 |
| **Property type** | Owner-occupied | +5 |
| | Vacation home | +5 |
| | Commercial | +10 |

### Lead Tiers

| Tier | Score | Label | Response Time | Action |
|---|---|---|---|---|
| 🔴 Hot | 70+ | Ready to act | Within 2 hours | Immediate callback queue, personal outreach |
| 🟠 Warm | 40-69 | Actively planning | Within 24 hours | Standard follow-up, personalized email |
| 🟡 Engaged | 20-39 | Interested, exploring | Within 48 hours | Educational nurture sequence |
| 🟢 Cool | 0-19 | Early research | Weekly digest | Content nurture, retargeting |

---

## Intent-Based Branching

### High Intent Path (Score 70+)
```
User completes tool/form with high signals
  → Immediate confirmation with timeline
  → "We'll call within 2 hours" (or next business morning)
  → Skip educational content — they know what they want
  → Route to senior team member
  → Follow-up within promised window
```

### Medium Intent Path (Score 40-69)
```
User shows interest but isn't urgent
  → Confirmation with 24-hour response promise
  → Show 2-3 relevant project examples
  → Link to planning resources
  → Follow-up email with personalized content
  → Consultation invitation in email
```

### Low Intent Path (Score 20-39)
```
User exploring, not ready to commit
  → Thank them for their interest
  → Offer curated content:
    - "Here's what to read while you're researching:"
    - 3 relevant blog articles
    - 1 project gallery link
    - 1 planning tool link
  → Soft CTA: "Whenever you're ready, we're here"
  → Email nurture: 1 article/week for 4 weeks
  → Re-engagement after 2 weeks with new content
```

### Information-Only Path (Score 0-19)
```
User just browsing or used one tool
  → No follow-up unless they opted in
  → On-site: related content suggestions
  → If newsletter signup: weekly content digest
  → Retarget with educational content (not sales)
```

---

## Qualification by Project Type

### Roofing Leads — Key Signals
| Critical | Important | Nice to Have |
|---|---|---|
| Service type (repair/replace/storm) | Home size | Current material |
| Timeline/urgency | Location | Roof age |
| Contact info | Photos | Number of stories |

### Construction Leads — Key Signals
| Critical | Important | Nice to Have |
|---|---|---|
| Project type | Budget range | Has plans |
| Timeline | Property type | Lot characteristics |
| Contact info | Location | Working with architect |

### Storm Leads — Key Signals
| Critical | Important | Nice to Have |
|---|---|---|
| Urgency level | Insurance status | Storm date |
| Contact info (phone priority) | Damage description | Photos |
| Location | | |

### Commercial Leads — Key Signals
| Critical | Important | Nice to Have |
|---|---|---|
| Property type | Roof area | Number of units |
| Need type | Location | Company name |
| Contact info | | |

---

## Data Flow

```
Tool/Form/Chatbot Interaction
  │
  ├─ Qualification signals collected
  │
  ├─ Lead score calculated (client-side)
  │
  ├─ Stored in consultation_requests table
  │   ├─ All signals as structured fields
  │   ├─ Lead score
  │   ├─ Source (which tool/page)
  │   └─ Status: 'new'
  │
  ├─ Notification sent based on tier
  │   ├─ Hot: immediate alert
  │   ├─ Warm: standard queue
  │   └─ Cool: digest
  │
  └─ User sees tier-appropriate response
      ├─ Hot: "We'll call within 2 hours"
      ├─ Warm: "We'll reach out within 1 business day"
      └─ Cool: "Here are some resources while you explore"
```

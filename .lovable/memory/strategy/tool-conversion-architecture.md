---
name: Tool Conversion Architecture
description: Conversion mapping from all interactive tools to service pages, trust pages, projects, and consultation requests with CTAs and result page design
type: feature
---

# Tool Conversion Architecture

## Core Principle
Every interactive tool outcome must do THREE things:
1. **Validate** — confirm the user learned something useful
2. **Guide** — point them to the most relevant next step
3. **Invite** — offer a human conversation without pressure

---

## Tool-to-Conversion Map

### Roof Scope Estimator
| Outcome | Primary CTA | Secondary | Content Suggestion |
|---|---|---|---|
| Any estimate shown | "Get an Exact Number — Schedule a Free Inspection" | "Email This Estimate" | → Roof Replacement page, → Financing |
| High estimate (>$25K) | "Let's Discuss Your Options" | "Explore Financing →" | → Material comparison, → Financing page |
| Low estimate (<$10K) | "Confirm with a Free Inspection" | "Is Repair an Option? →" | → Repair vs Replace guide |

### Replacement Readiness Assessment
| Tier | Primary CTA | Secondary | Content |
|---|---|---|---|
| Urgent (71+) | "Your Roof Needs Attention — Call (828) 397-9211" | "Schedule Emergency Inspection" | → Storm Damage page |
| Planning (46-70) | "Start Planning Your Replacement" | "Estimate Your Cost →" | → Scope Estimator, → Materials guide |
| Attention (21-45) | "Schedule a Professional Assessment" | "What to Watch For →" | → Maintenance checklist, → Blog |
| Good shape (0-20) | "Keep It Healthy — Maintenance Tips" | "Schedule Annual Inspection" | → Maintenance articles |

### Repair vs Replace Widget
| Result | Primary CTA | Secondary | Content |
|---|---|---|---|
| Likely repair | "Schedule a Repair Assessment" | "Common Roof Repairs →" | → Roof Repair page |
| Likely replace | "Plan Your Replacement" | "Estimate Your Cost →" | → Roof Replacement, → Estimator |
| Needs professional look | "Get a Professional Opinion — It's Free" | "What We Look For →" | → Request Inspection |

### Materials Comparison Calculator
| Outcome | Primary CTA | Secondary | Content |
|---|---|---|---|
| Selected metal | "Discuss Metal Roofing for Your Home" | "See Metal Projects →" | → Specialty Roofing, → Gallery |
| Selected shingles | "Plan Your Shingle Roof" | "See Shingle Options →" | → Residential Roofing |
| Best value highlighted | "The Right Material Depends on Your Home" | "Schedule Material Consultation" | → Material guide pages |

### Storm Impact Assessment
| Urgency | Primary CTA | Secondary | Content |
|---|---|---|---|
| Emergency | "📞 Call Now: (828) 397-9211" | "Submit Emergency Request" | — (phone is primary) |
| High | "Schedule Storm Inspection — Free" | "Document Your Damage →" | → Insurance claims guide |
| Moderate | "A Professional Inspection Is Smart" | "What Storm Damage Looks Like →" | → Storm Center articles |
| Low | "Monitor and Stay Prepared" | "Download Storm Prep Checklist →" | → Maintenance content |

### Maintenance Priority Checker
| Result | Primary CTA | Secondary | Content |
|---|---|---|---|
| Urgent items found | "Schedule a Maintenance Inspection" | "DIY vs Pro Guide →" | → Maintenance articles |
| Some attention needed | "Add These to Your Schedule" | "Download Seasonal Checklist →" | → Seasonal blog content |
| All clear | "Great Job! Here's Next Season's Checklist" | "Schedule Annual Inspection" | → Maintenance content |

### Project Readiness Quiz
| Tier | Primary CTA | Secondary | Content |
|---|---|---|---|
| Ready to go | "Let's Get Started — Schedule a Consultation" | "View Similar Projects →" | → Gallery, → Construction form |
| Almost ready | "Here's What to Figure Out First" | "Planning Resources →" | → Planning guides, → Blog |
| Early stage | "Start Exploring — No Rush" | "Browse Project Inspiration →" | → Gallery, → Addition planner |

### Addition Planning Guide
| Output | Primary CTA | Secondary | Content |
|---|---|---|---|
| Profile generated | "Discuss This Plan With Our Team" | "Email This Profile" | → Construction consultation form |
| Complex project flagged | "Mountain Projects Need Expert Planning" | "See Similar Builds →" | → Custom Construction, → Gallery |

### Outdoor Living Selector
| Output | Primary CTA | Secondary | Content |
|---|---|---|---|
| Inspiration shown | "Let's Plan Your Outdoor Space" | "See More Projects →" | → Outdoor Living page, → Gallery |

### Renovation Goals Builder
| Output | Primary CTA | Secondary | Content |
|---|---|---|---|
| Roadmap generated | "Refine This Plan With Our Team" | "Email My Roadmap" | → Renovations page |
| Multi-room project | "Bundling Saves Time and Money — Let's Talk" | "Read: Phasing Your Renovation →" | → Planning articles |

### Chatbot Flows
| Exit Point | Primary CTA | Fallback |
|---|---|---|
| Qualified lead | "Schedule a Consultation" → form or scheduling | "Leave your number — we'll call you" |
| Information seeker | Relevant resource links | "I'm here if you have more questions" |
| Frustrated/stuck | "Call (828) 397-9211 — real humans, real answers" | "Email us at [email]" |

---

## Result Page Design

### Structure (all tools)
```
┌─────────────────────────────────────────────┐
│ YOUR RESULTS                                │
│ [Tool-specific output card]                 │
│                                             │
│ ─────────────────────────────────────────── │
│                                             │
│ RECOMMENDED NEXT STEP                       │
│ [Primary CTA — large, green, confident]     │
│                                             │
│ ─────────────────────────────────────────── │
│                                             │
│ HELPFUL RESOURCES                           │
│ [3 content cards relevant to their result]  │
│                                             │
│ ─────────────────────────────────────────── │
│                                             │
│ TRUST STRIP                                 │
│ ✓ Free consultation · ✓ No obligation       │
│ ✓ [Context-specific trust signal]           │
│                                             │
│ ─────────────────────────────────────────── │
│                                             │
│ SAVE YOUR RESULTS                           │
│ [Email to myself] [Share with partner]      │
└─────────────────────────────────────────────┘
```

### Smart Content Suggestions Logic
Based on tool used + result tier, surface 3 relevant links:
1. **Service page** matching their need
2. **Project example** matching their scope/material/location
3. **Educational article** addressing their likely next question

Example for "Roof Replacement — Metal — Highlands":
- → "Standing Seam Metal Roofing" service page
- → Project: "Metal Roof in Highlands at 4,100 ft"
- → Blog: "Why Metal Outperforms at Elevation"

---

## Premium Conversion Language

### Instead of → Use
| Generic | Premium |
|---|---|
| "Get a quote" | "Let's discuss your project" |
| "Submit" | "Begin your consultation" |
| "Contact us" | "Start the conversation" |
| "Buy now" | — (never use) |
| "Limited time" | — (never use) |
| "Act now" | "Whenever you're ready" |
| "Don't miss out" | — (never use) |
| "Free estimate" | "Free, no-obligation consultation" |
| "Our experts" | "Our team" |
| "Industry-leading" | Specific credential instead |

### Result Page Headlines by Tone
- **Confident:** "Based on what you've told us, here's where you stand."
- **Supportive:** "You're in a good position to move forward."
- **Honest:** "Your roof may need attention sooner than you think."
- **Calm:** "No rush — here's what to keep in mind."
- **Inviting:** "Ready for the next step? We'd love to help."

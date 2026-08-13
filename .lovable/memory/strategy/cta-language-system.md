---
name: CTA Language System
description: Premium CTA language rules — no cheap/gimmicky text. Context-aware labels per division and page type. Reference src/lib/cta-config.ts.
type: preference
---

# Global CTA Language Architecture

## Primary CTA Labels — outcome-first (gold gradient buttons)
Every primary CTA states the visitor's outcome ("Get My...", "Talk to a Local Advisor", "Call Direct: 828-524-7773").
- **Homepage/Nav:** "Get My Project Scoped" — **Sticky mobile:** "Get My Estimate"
- **Roofing pages:** "Get My Roof Assessed" — **Mid-page:** "Talk to a Local Roofing Advisor"
- **Construction pages:** "Get My Build Planned" — **Mid-page:** "Get My Project Scope Written"
- **About/Reviews/Certs/Contact:** "Talk to a Local Advisor"
- **Commercial B2B:** "Discuss Your Building"
- **Footer strip:** "Discuss Your Project"
- **Cost/scope blocks:** "Get My Written Scope" / "Get My Written Estimate"
- **Storm context:** "Get My Storm Damage Assessed"

## Secondary CTA
- Phone: "Call Direct: 828-524-7773" — never "Call Now"

## Forbidden Language
Never use: "Free inspection/estimate/quote", "Get started", "Get a free...", "Claim your...", "Book now", "Buy now", "Act now", "Limited time", "Click here", "Don't miss out", "Hurry", "Submit", "Learn More" (as a primary action)

## Config File
All constants defined in `src/lib/cta-config.ts`

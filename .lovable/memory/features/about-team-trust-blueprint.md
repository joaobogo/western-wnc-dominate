---
name: About Team Trust Certifications Projects Blueprint
description: Unified blueprint for About, Team, Certifications, Reviews, Gallery, and Project Detail pages with section layouts and CTA language
type: feature
---

# Part 4 Blueprint: About, Team, Trust, Certifications & Projects

## Page Ecosystem

| Route | Page | Strategic Purpose |
|---|---|---|
| `/about` | About | Brand story, origin, values, why Highlander exists |
| `/team` | Team | Human credibility, named people, roles, values |
| `/certifications` | Certifications | Hard proof — what each credential means practically |
| `/reviews` | Reviews | Social proof — curated, categorized, editorial |
| `/gallery` | Gallery / Portfolio | Visual proof — curated project showcase |
| `/projects/:slug` | Project Detail | Deep case study — narrative + visual + proof |

## Premium Messaging Direction

- **Tone:** High authority, low fluff. Confident but never boastful.
- **Avoid:** "We're the best," "free inspection," "call now for a deal," generic superlatives
- **Use:** Specific claims backed by evidence. Named credentials. Real numbers. Local place names.
- **Voice model:** "A master craftsman explaining their standards to a discerning client"

## Team Storytelling Approach

- Every team member gets a value alignment (from the 7 brand values)
- Bios are conversational, not corporate — "James started in framing at 19" not "James has 15 years of industry experience"
- Show roles in context: "Your point of contact from estimate to final walkthrough"
- Photography: on-site, natural light, branded gear — never studio portraits
- Leadership gets origin story treatment; crew gets craft-focused treatment

## CTA Language (never use "free inspection" or bargain language)

| Context | CTA Text |
|---|---|
| About page closing | "Meet Our Team" or "See Our Work" |
| Team page closing | "Discuss Your Project With Us" |
| Certifications closing | "Work With a Certified Team" |
| Reviews closing | "Experience It Yourself" |
| Gallery closing | "Your Project Could Be Next" |
| Project Detail closing | "Discuss Your Project" |
| Mid-page CTAs | "Schedule a Consultation" |
| Form trust copy | "No pressure. No upselling. Just a straight conversation." |

## Design Direction

- **Layout:** Editorial magazine feel. Generous whitespace. Asymmetric grids on About.
- **Typography:** Playfair Display headings, DM Sans body. Gold accent text for eyebrows.
- **Color:** Dark sections (heritage charcoal) for authority moments. Cream/warm sections for storytelling.
- **Motion:** Fade-up on scroll. Staggered card reveals. No bouncing or playful animations.
- **Photography:** Real project photos only. Drone aerials for heroes. Detail closeups for proof.
- **Cards:** Subtle border, rounded-sm, card-lift hover. Gold border on hover for premium feel.

---

## Page-by-Page Section Layouts

### ABOUT PAGE (`/about`)

1. **Hero** — Full-width team/mountain photo with gradient overlay. Breadcrumb. Headline: "Built Different. Built Here."
2. **Origin Story** — Centered editorial block. Why Highlander was founded. The gap in WNC contracting it was built to fill.
3. **The Name** — Short section on Highland heritage inspiration. Scottish craftsmanship ethos. "The name isn't decoration — it's a standard."
4. **Brand Values Editorial** — `ValuesEditorial` component. All 7 values in alternating layout with team quotes and placeholder for photography.
5. **Credentials Overview** — `CredentialCards` (4-card grid). Brief — points to Certifications page for depth.
6. **Leadership** — Owner/founder story. Photo + narrative bio. Origin → vision → standards.
7. **Community** — WNC involvement. Local roots. "We live where we build."
8. **Closing CTA** — `ReassuranceBlock` with "See Our Work" or "Meet the Team" links.

### TEAM PAGE (`/team`)

1. **Hero** — Team group photo or montage. Headline: "The People Behind the Promise."
2. **Introduction** — Centered copy: what makes this team different (in-house, trained, accountable).
3. **Leadership Section** — Large cards for owners/leadership. Photo, bio, personal value, career story.
4. **Team Grid** — `ValuesTeamOverlay` cards for crew members. Photo, role, aligned value, team quote.
5. **Team Values** — `ValuesPillarGrid` (count=4) showing the values most central to team culture.
6. **How We Work Together** — Timeline or process showing consultation → crew assignment → execution → walkthrough.
7. **Closing CTA** — "Discuss Your Project With Us" — `ReassuranceBlock`.

### CERTIFICATIONS PAGE (`/certifications`)

1. **Hero** — Headline: "Credentials That Translate Into Better Outcomes." Not just badges.
2. **Opening Statement** — Why certifications matter to the client (warranty access, quality assurance, accountability).
3. **Certification Showcase** — Large cards per credential: CertainTeed MSA, NC GC License, Insurance, Warranties. Each with: badge visual, what it means, why it matters to you, how Highlander earned/maintains it.
4. **Quality Standards on the Job** — `StandardsCallout` cards: written scope, photo documentation, daily updates, final walkthrough, magnetic nail sweep, tarped landscaping.
5. **Warranty Section** — Manufacturer material warranty + Highlander labor warranty. Explain warranty package delivery at walkthrough.
6. **Closing CTA** — "Work With a Certified Team" — `ReassuranceBlock`.

### REVIEWS PAGE (`/reviews`)

1. **Hero** — Headline: "Earned Trust. Every Project." Subheadline about reputation as a result, not a goal.
2. **Highlight Reviews** — 3 large `ReviewHighlight` cards. Best testimonials with project outcomes.
3. **Trust Metrics** — Stats strip: 4.9★ rating, 500+ projects, 8 counties, review count.
4. **Categorized Testimonials** — Tabbed or filtered by: Roofing, Construction, Storm Damage, Communication, Professionalism.
5. **Recurring Themes** — Editorial section: "What Clients Keep Saying" — cards highlighting patterns (communication, cleanliness, honesty, quality).
6. **Closing CTA** — "Experience It Yourself" — `ReassuranceBlock`.

### GALLERY / PORTFOLIO PAGE (`/gallery`)

1. **Hero** — Best drone shot. Headline: "Every Project Tells a Story."
2. **Introduction** — Curated, not comprehensive. "These projects represent our standard."
3. **Category Filters** — Roofing | Construction | All. Animated filter transitions.
4. **Project Cards** — Large image, hover overlay with: title, type, location, "View Project →". 2-column on desktop, 1 on mobile.
5. **Before/After Showcase** — `BeforeAfterGrid` with 2 featured transformations mid-page.
6. **Closing CTA** — "Your Project Could Be Our Next Showcase" — `ReassuranceBlock`.

### PROJECT DETAIL PAGE (`/projects/:slug`) — Already Built

Sections: Hero → Summary + Sidebar → Challenge → Scope of Work → Materials → Before/After → Process Highlights → Result → Gallery → Testimonial → Closing CTA.

---

## Proof Layering Summary

| Page | Primary Proof Types | Components Used |
|---|---|---|
| About | Quality Messaging, Team, Regional | ValuesEditorial, CredentialCards, CraftsmanshipStatement |
| Team | Team Credibility, Quality Messaging | ValuesTeamOverlay, ValuesPillarGrid |
| Certifications | Certification, Process Discipline | StandardsCallout, CredentialCards |
| Reviews | Social Proof, Quality Messaging | ReviewHighlight, TrustPillarGrid |
| Gallery | Project Visuals, Quality Messaging | BeforeAfterGrid, project cards |
| Project Detail | All 7 categories layered | BeforeAfterSlider, TrustSidebar, ReviewHighlight |

## Visual Storytelling System

1. **Every hero** uses a real project photo or team photo — never stock
2. **Every section transition** uses SectionDivider (diamond, gold-fade, or dot-line)
3. **Dark sections** (tartan-dark) for authority moments: process, credentials, closing CTAs
4. **Light sections** for storytelling: origin, values, team bios
5. **Gold accents** on eyebrows, divider lines, and hover states — never overused
6. **Motion** is always fade-up with staggered delays — cinematic, not playful

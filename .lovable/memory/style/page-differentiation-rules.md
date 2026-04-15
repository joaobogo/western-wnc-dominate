---
name: Page Differentiation Rules
description: Strict rules ensuring no two header pages share hero, section sequence, card style, proof layout, or CTA treatment
type: preference
---

# Page Differentiation Rules

Every header-accessible page must have a unique structural fingerprint. No lazy cloning.

---

## 1. HERO UNIQUENESS — No two pages share a hero composition

| Page | Hero Type | Layout | Height | Overlay |
|------|-----------|--------|--------|---------|
| Homepage | Cinematic video parallax | Full-bleed, centered text reveal | 100vh | Dark gradient, gold accents |
| Roofing | Split — image left, copy right | 60/40 asymmetric | 70vh | Green-tinted overlay |
| Construction | Architectural wide shot | Full-width image, bottom-aligned text bar | 75vh | Blueprint texture overlay |
| Gallery | Minimal title-only | Compact header, no image | 30vh | None — clean white |
| About | Team photo collage | Overlapping frames, editorial | 65vh | Warm cream wash |
| Blog | Featured post spotlight | Card-over-image, magazine style | 50vh | Subtle gradient |
| Contact | Utility header + phone CTA | Compact split — text left, phone right | 35vh | None — functional |
| Service Areas | Map-forward | Interactive map hero | 60vh | Topographic texture |
| Reviews | Quote-led | Large pull-quote, star rating | 45vh | Gold star accent |

**Rule:** If a new page's hero resembles an existing one, redesign it before shipping.

---

## 2. SECTION SEQUENCE — No two pages share the same flow

Each page has a defined section fingerprint. The ORDER of section types creates rhythm.

| Page | Sequence Pattern |
|------|-----------------|
| Homepage | Hook → Proof → Split → Value → Services → Interactive → Authority → Process → Gallery → People → Editorial → CTA |
| Roofing | Authority → Services → Materials → Trust → Process → Gallery → FAQ → CTA |
| Construction | Aspiration → Services → Local → Trust → Process → Gallery → FAQ → CTA |
| Gallery | Filter → Grid → Lightbox → Soft CTA |
| About | Story → Values → People → Local → Credentials → Community → CTA |
| Blog | Featured → Filter → Grid → Sidebar |
| Contact | Form+Info → Hours → Trust → FAQ |
| Service Areas | Map → Grid → Division → CTA |
| Reviews | Volume → Featured → Categories → CTA |

**Rule:** Never reorder sections to match another page's flow. Each page owns its rhythm.

---

## 3. CARD STYLE — Vary card treatments across pages

| Page | Card Variant | Distinguishing Feature |
|------|-------------|----------------------|
| Homepage | `PremiumCard` with gold border | Hover lift + gold glow shadow |
| Roofing | Technical cards with icon headers | Green accent line top, spec-style layout |
| Construction | Architectural cards with corner details | Gold arch-corner SVG, blueprint grid bg |
| Gallery | Frameless image cards | No border, scale-on-hover, caption overlay |
| About | Portrait cards | Rounded, warm shadow, personality text |
| Blog | Editorial cards | Category badge, read-time, date stamp |
| Contact | Info cards | Icon-led, minimal, functional |
| Service Areas | Town cards | Location pin, division color indicator |
| Reviews | Testimonial cards | Star rating, quote marks, town attribution |

**Rule:** Never use the same card component with identical styling on two different pages. Always customize variant, shadow, border, or accent.

---

## 4. PROOF LAYOUT — Each page proves credibility differently

| Page | Proof Method | Layout |
|------|-------------|--------|
| Homepage | StatBar + credential badges | Horizontal strip, animated counters |
| Roofing | Certification grid | 2x3 badge grid with manufacturer logos |
| Construction | Process timeline | Vertical stepped timeline with checkmarks |
| Gallery | Images only | No text proof — photography IS proof |
| About | Narrative blocks | Long-form story sections, no badges |
| Blog | Article depth | Knowledge demonstrated through content |
| Contact | Trust-proximity | Small badge row adjacent to form |
| Service Areas | Project counts per town | Inline stats within town cards |
| Reviews | Volume + specificity | Review count header, named/located quotes |

**Rule:** If two pages use the same proof component, they must use different variants or layouts.

---

## 5. CTA TREATMENT — Every page closes differently

| Page | Primary CTA | Style | Tone |
|------|------------|-------|------|
| Homepage | "Start Your Project" | Gold gradient button, dual-path below | Bold, confident |
| Roofing | "Request a Roof Consultation" | Green-accented, single action | Technical, direct |
| Construction | "Schedule a Construction Consultation" | Gold-accented, consultation language | Consultative, warm |
| Gallery | "Discuss Your Project" | Soft text link after scroll depth | Non-interruptive |
| About | "Talk With Our Team" | Warm button, personal language | Conversational |
| Blog | "Need Expert Advice?" | Sidebar CTA, contextual to post | Educational |
| Contact | Form submit: "Send Your Message" | Form IS the CTA, phone fallback below | Direct, efficient |
| Service Areas | "Discuss Your [Town] Project" | Location-contextual, dynamic text | Localized |
| Reviews | "Become Our Next Success Story" | Appears after scroll depth | Aspirational |

**Rule:** No two pages may use the same CTA label, button style, or placement pattern.

---

## 6. BACKGROUND & TEXTURE — Visual variety through surfaces

| Page | Primary Background | Texture | Section Rhythm |
|------|-------------------|---------|----------------|
| Homepage | Dark → Light editorial flow | Tartan subtle | Alternating dark/light/dark |
| Roofing | Light with green sections | Tartan on dark sections | Light → green accent → dark → light |
| Construction | Warm cream with gold sections | Blueprint grid on features | Cream → gold bar → dark → cream |
| Gallery | Gallery white throughout | None | Uniform clean white |
| About | Warm cream dominant | None — warmth from photography | Cream → warm → cream |
| Blog | Clean white editorial | None | White → light gray → white |
| Contact | Split white/charcoal | None | Functional, no decorative sections |
| Service Areas | Light with map accent | Topographic subtle | Light → map → cards → light |
| Reviews | Alternating quote backgrounds | None | White → cream → white (quote rhythm) |

---

## 7. MOTION SPEED — Each page has its own tempo

| Page | Reveal Speed | Signature Animation |
|------|-------------|-------------------|
| Homepage | 1.0-1.2s | Gold line draws, parallax layers, staggered sequences |
| Roofing | 0.5-0.7s | Curtain-reveal on images, precise fade-ups |
| Construction | 0.6-0.8s | Blueprint grid fade, gold corner reveals |
| Gallery | Hover-only | 1.03x scale on hover, smooth lightbox transitions |
| About | 0.8-1.0s | Slow fades, gentle parallax on team photos |
| Blog | 0.3-0.4s | Quick card lifts, fast fade-ins |
| Contact | Near-zero | Focus-state animations only |
| Service Areas | 0.4-0.5s | Card hover effects, map interactions |
| Reviews | 0.5-0.7s | Staggered card reveals, quote fade-ins |

---

## Anti-Patterns (NEVER do)

1. **Never clone a page layout** and swap only text/images
2. **Never reuse a hero style** across more than 2 pages (and those 2 must have different overlays/heights)
3. **Never use the same CTA label** on two different pages
4. **Never repeat section order** — if Page A goes Services → Process → Gallery, Page B must not
5. **Never use identical card styling** without changing variant, accent, or shadow
6. **Never apply the same background rhythm** — each page has its own light/dark pattern
7. **Never use the same proof layout** — stats strip ≠ certification grid ≠ narrative blocks
8. **Never match motion speeds** between more than 2 pages

## Enforcement Checklist (before shipping any page)

- [ ] Hero composition differs from all other pages
- [ ] Section sequence is unique
- [ ] Card variant is customized for this page
- [ ] Proof method differs from sister pages
- [ ] CTA label, style, and placement are unique
- [ ] Background/texture rhythm is distinct
- [ ] Motion speed matches the page identity system definition

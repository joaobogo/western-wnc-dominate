---
name: Micro-Interaction System
description: Complete interaction design covering buttons, cards, forms, dropdowns, accordions, tabs, links, images, and division-specific variants
type: design
---

# Micro-Interaction System

## CSS Utility Classes (defined in index.css)

### Buttons
- `.btn-primary-interactive` — shimmer sweep on hover, scale 1.02/0.98, gold shadow glow
- `.btn-ghost-interactive` — subtle scale feedback, no shimmer
- `.btn-arrow-icon` — translateX(4px) on parent hover

### Links
- `.link-draw` — underline draws from left via scaleX, 0.3s HIGHLAND_EASE

### Cards
- `.card-premium` — gold left-border draw on hover, translateY(-2px), gold-tinted shadow
- `.card-lift` — translateY(-3px) with gold shadow
- `.tartan-hover` — tartan grid overlay appears on hover via ::before
- `.testimonial-hover` — gold border glow + shadow on hover

### Images
- `.img-zoom` — scale(1.03) on parent hover, 700ms ease

### Forms
- `.field-premium` — gold border + 3px gold ring on focus, placeholder shifts right
- `.field-premium-dark` — dark section variant
- `.interaction-quote` wraps form sections for heightened trust signals

### Dropdowns
- `.dropdown-premium` — animated enter/exit with scale+translateY
- `.dropdown-item-premium` — gold left-border draws on hover

### Accordion
- `.accordion-premium` — gold border + shadow when [data-state=open]
- `.accordion-chevron` — smooth 300ms rotation with HIGHLAND_EASE

### Tabs
- `.tab-premium` — gold underline draws via ::after on active, half-width on hover

### Proof Elements
- `.proof-card-outcome` — max-height reveal on hover for project cards
- `.ba-handle-pulse` / `.animate-ba-pulse` — attention pulse on before/after handle (once)
- `.process-connector` — animated connecting line between process steps
- `.team-card-photo` — scale(1.05) on parent hover
- `.badge-trust` — subtle translateY(-1px) lift on hover

## Division-Specific Contexts
Wrap sections in these classes for division-aware interaction tinting:
- `.interaction-roofing` — heritage green accents on card borders + link underlines
- `.interaction-construction` — highland gold accents
- `.interaction-editorial` — muted, slower card lifts (2px) and image zoom (1.02)
- `.interaction-quote` — enhanced focus glow and CTA shadow

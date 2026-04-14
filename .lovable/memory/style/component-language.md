---
name: Visual Component Language
description: Reusable premium component library — PremiumCard, ServicePreview, TrustBlock, StatBar, ImageFrame, QuoteModule, TestimonialCard, and Button variants
type: design
---

# Visual Component Language

## Component Library: `src/components/premium/`

### PremiumCard
- **Props:** accent (green|gold|none), spotlight, tartan, href, children
- **Behavior:** Card-lift hover, gold left accent draw, spotlight-hover glow, optional link wrapper
- **Usage:** Wrap any content that needs a premium card frame

### ServicePreview
- **Props:** icon, title, description, href, division, compact
- **Variants:** Full (with top accent line, icon, description, CTA) | Compact (sidebar row with icon + description)
- **Division-aware:** Green for roofing, gold for construction

### TrustBlock + TrustBadge
- **TrustBadge:** icon + label, variants: default | subtle | dark
- **TrustBlock:** Row of badges with staggered animation, variants: default | dark | inline
- **Default items:** Licensed & Insured, CertainTeed Certified, 24-Hour Response, All of Western NC

### StatBar + StatItem
- **StatItem:** Animated counter with label and detail
- **StatBar:** Full-width section with gold accent lines, variants: primary | dark | light
- **Auto-grid:** 2-col mobile, 3 or 4-col desktop based on item count

### ImageFrame
- **Props:** src, alt, aspect, variant, accentPosition, badge, zoom, children
- **Variants:** default (clean), featured (shadow + gradient overlay), editorial (deeper zoom)
- **Accent:** Gold line at bottom or left, animated on scroll

### QuoteModule
- **Props:** quote, author, subtitle, variant
- **Variants:** editorial (centered, large glyph), inline (left-border), dark
- **Typography:** Cormorant Garamond italic

### TestimonialCard
- **Props:** name, location, text, project, category, outcome, variant
- **Variants:** featured (large, outcome block, quote glyph), compact (4-line clamp), dark
- **Category badges:** Color-coded by division (Roofing/Construction/Storm/Commercial)

## Button Variants: `src/components/ui/button.tsx`

| Variant | Usage |
|---------|-------|
| `highland` | Primary gold gradient CTA — conversion-critical |
| `gold` | Gold outline — secondary premium action |
| `ghost-dark` | Dark section secondary |
| `heritage` | Deep green filled |
| `default` | Standard primary |
| `outline` | Standard outline |
| `ghost` | Transparent hover |
| `link` | Underlined text |

**Sizes:** sm, default, lg, xl, icon

## CSS Foundation Classes (index.css)

| Class | Purpose |
|-------|---------|
| `card-premium` | Base card with hover gold border + left accent |
| `card-lift` | Hover translateY(-3px) + shadow |
| `spotlight-hover` | Radial gold glow follows cursor |
| `tartan-hover` | Tartan pattern overlay on hover |
| `btn-primary-interactive` | Shimmer + scale + shadow |
| `btn-ghost-interactive` | Subtle scale spring |
| `img-zoom` / `img-zoom-dramatic` | Controlled image zoom on hover |
| `quote-glyph` | Large decorative quote mark |
| `testimonial-hover` | Border glow on hover |
| `glass-panel` | Frosted glass effect |
| `field-premium` | Gold focus ring for inputs |
| `link-draw` | Underline draw from left |
| `glow-hover` | Radial CTA glow |

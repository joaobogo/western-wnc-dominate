---
name: Motion Design Strategy
description: Complete animation philosophy covering page transitions, scroll reveals, hover interactions, section entrances, button motion, image behavior, background motion, and brand signature effects
type: design
---

# Motion Design Strategy — Highlander Roofing & Construction

## Philosophy
**"Architectural Reveal"** — Every animation should feel like watching a structure being built: deliberate, sequential, precise. Motion communicates craftsmanship, not entertainment. The site should feel like it was *constructed*, not decorated.

### Core Principles
1. **Purposeful** — Every animation communicates hierarchy, guides attention, or reinforces brand
2. **Restrained** — Prefer one well-timed animation over scattered micro-interactions
3. **Architectural** — Vertical and horizontal lines, not bounces or spins
4. **Grounded** — Elements rise from below or draw from left (construction metaphor)
5. **Fast on mobile** — Reduce durations by 40%, eliminate parallax, prefer CSS over JS

---

## Timing System

### Easing Curves (Named)
```
HIGHLAND_EASE = [0.22, 1, 0.36, 1]    — Primary reveal (smooth deceleration)
CRAFT_EASE = [0.25, 0.1, 0.25, 1]     — Structural draws (gold lines, borders)
SETTLE_EASE = [0.33, 1, 0.68, 1]      — Settling into place (subtle)
SNAP_EASE = [0.16, 1, 0.3, 1]         — Quick interactive feedback
```

### Duration Tiers
| Tier | Desktop | Mobile | Use Case |
|---|---|---|---|
| Micro | 150-200ms | 100-150ms | Button state, icon change, tooltip |
| Quick | 250-350ms | 200-250ms | Card hover, tab switch, menu |
| Standard | 500-700ms | 350-450ms | Section entrance, image reveal |
| Cinematic | 800-1200ms | 500-700ms | Hero elements, page transitions |
| Signature | 2000-4000ms | 1200-2000ms | Gold line draws, SVG paths |

### Stagger Timing
- Grid items: 60ms between children (max 8 items)
- List items: 80ms between children
- Trust badges: 100ms between items
- Never stagger more than 8 items — batch remaining as group

---

## 1. Page Transitions

### Route Changes
- **Exit:** Current page fades out (opacity 1→0, 200ms)
- **Enter:** New page fades in from subtle translateY(12px) (300ms, HIGHLAND_EASE)
- **No sliding pages** — feels app-like, not slideshow
- **Scroll position:** Reset to top on route change

### Hero Transitions (page-specific)
- Each division page has its own hero entrance sequence
- Homepage hero is the most elaborate (cinematic tier)
- Sub-page heroes: faster, simpler — just fade + rise

---

## 2. Scroll Reveal System

### Intersection Observer Settings
```
threshold: 0.15
rootMargin: "0px 0px -60px 0px"
triggerOnce: true
```

### Reveal Variants

**Rise (default for content blocks)**
```
hidden: { opacity: 0, y: 32 }
visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: HIGHLAND_EASE } }
```

**Draw (for gold lines, dividers, borders)**
```
hidden: { width: 0 } or { pathLength: 0 }
visible: { width: "100%", transition: { duration: 1.2, ease: CRAFT_EASE } }
```

**Scale (for images, cards entering viewport)**
```
hidden: { opacity: 0, scale: 0.95 }
visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: SETTLE_EASE } }
```

**Clip (for premium image reveals)**
```
hidden: { clipPath: "inset(0 0 100% 0)" }
visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.8, ease: HIGHLAND_EASE } }
```

### Section-Level Entrance Pattern
Every major section follows:
1. Gold accent line draws in (200ms before content)
2. Eyebrow text fades in
3. Heading rises from overflow clip
4. Body text fades in
5. Cards/grid stagger in

---

## 3. Hover Interactions

### Cards
- **Transform:** translateY(-3px) over 300ms
- **Shadow:** Deeper shadow with gold tint appears
- **Gold accent:** Left border draws from 0 to 100% height (400ms)
- **No scale** — scale feels consumer/retail, not architectural

### Buttons (Primary CTA)
- **Shimmer:** Diagonal light sweep on hover (700ms, once)
- **Scale:** 1.02 on hover, 0.98 on active
- **Arrow icon:** translateX(4px) on hover

### Buttons (Secondary/Ghost)
- **Background:** Subtle fill appears (white/5 → white/10)
- **Border:** Opacity increases slightly
- **No shimmer** — reserved for primary only

### Images
- **Zoom:** scale(1.03) over 600ms on hover (within overflow:hidden container)
- **No filters, no overlays** — let photography speak

### Links (Inline)
- **Underline draw:** scaleX 0→1 from left, 300ms
- **Color:** No color change, underline is the signal

---

## 4. Section Entrances

### Dark ↔ Light Transitions
- Use SectionDivider component between tone shifts
- Gold fade variant for light→dark, diamond for dark→light
- Content in new section delays 100ms after divider is visible

### Section Backgrounds
- Alternate cream/white backgrounds for rhythm
- Tartan pattern overlay for heritage sections (opacity 0.04)
- Dark sections get tartan-dark variant

### Counter/Stat Animations
- Count up from 0 to target over 1.5s
- Trigger on viewport entry
- Use tabular-nums font-variant for stable layout
- Suffix ("+", "years", etc.) appears after count completes

---

## 5. Image Behavior

### Hero Images
- Fade in on load, no layout shift (aspect-ratio set)
- Video: crossfade from poster image (1000ms)
- Parallax: NONE on mobile, subtle (0.05 factor) on desktop only

### Gallery/Project Images
- Clip reveal on scroll (inset bottom→top)
- Lazy load with blur placeholder
- Hover: gentle 1.03 scale, no overlay

### Before/After
- Slider handle: pulse animation on first view, then static
- Drag: immediate response, no transition delay

---

## 6. Background Motion

### Grain Texture
- Static noise SVG at 2.5% opacity — no animation (performant)
- Applied to hero and dark sections only

### Blueprint Grid (Hero)
- Lines draw in with staggered pathLength animation
- Stays static after initial draw — no ongoing motion

### Mountain Contour (Hero)
- Single pathLength draw, 4s duration
- Fill fades in after stroke completes
- Static once drawn — no float or pulse

### Gold Accent Lines
- Draw from left→right or center→outward
- 1.2s duration with CRAFT_EASE
- Triggered by scroll intersection

---

## 7. Brand Signature Effects

### "Highland Gold Line"
The signature animation: a thin gold line that draws across a section heading or divider. Used sparingly — max 3 per page.
```css
background: linear-gradient(90deg, hsl(var(--highland-gold)/0), hsl(var(--highland-gold)), hsl(var(--highland-gold)/0));
```
Animates width from 0 to target width.

### "Architectural Clip"
Premium image reveal using clip-path inset. Reserved for hero images and featured project showcases.

### "Tartan Weave"
On hover, a subtle grid pattern appears over cards. Uses ::before pseudo-element with opacity transition. Never animated continuously.

### "Roofline Draw"
SVG path animation of gable rooflines. Used in hero and as section decoration. Draws once on load/scroll, never loops.

---

## 8. Mobile Optimization

### Rules
1. **Reduce durations by 40%** — mobile users expect snappier responses
2. **No parallax** — causes jank on mobile browsers
3. **No SVG path animations** — too expensive, replace with simple fade/rise
4. **Simplify stagger** — max 4 items staggered, rest appear together
5. **Respect prefers-reduced-motion** — disable all animation, show final state immediately
6. **No hover effects on mobile** — they don't exist, use active states instead
7. **Will-change sparingly** — only on elements actively animating, remove after
8. **GPU layers** — use transform/opacity only, never animate layout properties

### Implementation
```tsx
const isMobile = useIsMobile();
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const variants = {
  hidden: prefersReduced ? {} : { opacity: 0, y: isMobile ? 16 : 32 },
  visible: prefersReduced 
    ? {} 
    : { opacity: 1, y: 0, transition: { duration: isMobile ? 0.35 : 0.6 } }
};
```

---

## 9. Performance Budget

| Metric | Target |
|---|---|
| Total JS for animations | < 45KB gzipped (framer-motion tree-shaken) |
| Concurrent animations | Max 4 at any time |
| Animation FPS | 60fps on mid-tier Android |
| LCP impact | < 100ms delay |
| CLS from animations | 0 (all animated elements have reserved space) |

### Anti-Patterns (Never Do)
- ❌ Animate width/height/top/left (use transform)
- ❌ Continuous background animations (CPU drain)
- ❌ Parallax on mobile
- ❌ More than 8 staggered children
- ❌ Animation on page load that blocks content visibility
- ❌ Scale > 1.05 on any element
- ❌ Bounce/elastic easing (too playful for brand)
- ❌ Rotate animations (except subtle icon feedback)
- ❌ Infinite loops (except loader, which is temporary)

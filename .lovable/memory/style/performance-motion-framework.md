---
name: Performance-Aware Motion Framework
description: Animation tier system, desktop vs mobile rules, reduced-motion support, lazy loading, timing hierarchy, slow-device fallbacks
type: design
---

# Performance-Aware Motion Framework

## Animation Tier System

### Tier 1: HIGH IMPACT (Hero moments — deserve full animation budget)
- Site loader sequence (3.2s desktop / 2s mobile)
- Hero headline reveal + background parallax
- Page-level route transitions
- Project showcase carousel interactions
- Quote flow step transitions
- Confirmation state celebrations
- **Budget:** Up to 800ms duration, spring physics allowed, GPU-composited transforms

### Tier 2: MEDIUM IMPACT (Section entrances — polished but efficient)
- ScrollReveal on section headings and key content blocks
- StaggerContainer for card grids (services, team, projects)
- Before/after gallery slider interaction
- Dropdown menus and mobile panel
- Accordion expand/collapse
- Tab content switches
- **Budget:** 300–600ms duration, CSS easing or HIGHLAND_EASE, no springs

### Tier 3: SUBTLE (Micro-interactions — felt not noticed)
- Button hover/tap scale (1.02–1.05)
- Link underline draws
- Card hover lift + shadow shift
- Input focus glow rings
- Icon rotations (chevrons, arrows)
- Badge/tag entrance
- **Budget:** 150–250ms, CSS transitions preferred, no JS animation library

### Tier 4: STATIC (No animation — speed and clarity priority)
- Body text paragraphs
- Navigation labels (non-active state)
- Footer content
- Breadcrumbs
- Meta information (dates, categories)
- Table/list data rows
- Form labels and helper text
- **Rationale:** Animating these adds no value and slows perceived load

---

## Desktop vs Mobile Rules

### Desktop (≥1024px)
- Full ScrollReveal distances (y: 32px, x: 30px)
- Parallax on hero background (translateY at 0.3× scroll rate)
- Hover states fully active (scale, shadow, border draws)
- StaggerChildren: 0.06–0.08s per item
- Background textures: MountainContours + BlueprintGrid at full opacity
- Loader: full 3.2s sequence with mountain + roofline + brand

### Tablet (768–1023px)
- Reduced ScrollReveal distances (y: 24px, x: 20px)
- No parallax (disable translateY scroll binding)
- Hover states active but simplified (no border draws)
- StaggerChildren: 0.05s per item
- Background textures: MountainContours only, 60% opacity
- Loader: desktop sequence at 85% speed

### Mobile (<768px)
- Minimal ScrollReveal distances (y: 16px, x: 12px)
- Zero parallax — all backgrounds fixed or static
- No hover states (tap-only: active:scale-95)
- StaggerChildren: 0.04s per item, max 6 items staggered
- Background textures: disabled below 640px, single noise overlay only
- Loader: simplified 2s mobile variant (single peak, monogram, fade)
- Disable `whileHover` on all motion components
- Gallery: swipe gestures replace hover zoom

### Implementation Pattern
```tsx
const isMobile = useIsMobile(); // existing hook
const baseDuration = isMobile ? 0.35 : 0.6;
const revealDistance = isMobile ? 16 : 32;
// ScrollReveal already implements this pattern
```

---

## Reduced Motion Accessibility

### Detection
```tsx
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

### Behavior When Active
- **Tier 1:** Show final state immediately, no loader animation (static brand mark for 0.8s then fade)
- **Tier 2:** Instant opacity:1, no transforms — `ScrollReveal` already returns plain `<div>` 
- **Tier 3:** CSS transitions reduced to 0ms via media query
- **Tier 4:** No change (already static)

### CSS Layer
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
This is already in index.css. All framer-motion components check `prefersReduced` before rendering motion variants.

---

## Lazy Loading Strategy

### Images
- All images below the fold: `loading="lazy"` + `decoding="async"`
- Hero image: `loading="eager"` + `fetchpriority="high"`
- Gallery thumbnails: lazy + IntersectionObserver with 200px rootMargin
- Before/after images: lazy until section enters viewport

### Components
- Heavy components (RoofDesignerWorkspace, InstagramGrid) use `React.lazy()` + Suspense
- Below-fold sections can use dynamic import with scroll trigger
- Conversion motion components: bundled but tree-shaken (only imported where used)

### Fonts
- Playfair Display: preloaded in `<head>` (heading font, above fold)
- DM Sans: preloaded in `<head>` (body font, above fold)
- Font-display: swap — ensures text renders immediately

### SVG Textures
- MountainContours, BlueprintGrid: rendered inline (small SVG, no network request)
- Disable on mobile <640px to save paint cost

---

## Animation Timing Hierarchy

### Easing Tokens
| Token | Value | Use Case |
|-------|-------|----------|
| `HIGHLAND_EASE` | `[0.22, 1, 0.36, 1]` | Primary scroll reveals, section entrances |
| `CRAFT_EASE` | `[0.25, 0.1, 0.25, 1]` | Loader phases, cinematic moments |
| CSS `ease-out` | browser default | Micro-interactions, hover states |
| Spring `stiffness:400, damping:15` | framer spring | Confirmation icons, completion marks |

### Duration Scale
| Context | Desktop | Mobile |
|---------|---------|--------|
| Micro (hover, focus) | 150–200ms | 100–150ms |
| Entrance (card, text) | 400–600ms | 250–400ms |
| Section reveal | 600–800ms | 350–500ms |
| Page transition | 300–400ms | 200–300ms |
| Loader total | 3200ms | 2000ms |

### Stagger Limits
- Desktop: max 12 items staggered at 0.06s = 720ms total
- Mobile: max 6 items staggered at 0.04s = 240ms total
- Beyond limits: batch remaining items to appear simultaneously

---

## Slow Device Fallbacks

### Detection Signals
1. `navigator.connection?.effectiveType` — '2g' or 'slow-2g' → minimal mode
2. `navigator.hardwareConcurrency` — < 4 cores → reduce Tier 2 to Tier 3
3. `navigator.deviceMemory` — < 4GB → disable background textures
4. Frame drop detection: if `requestAnimationFrame` shows >50ms gaps → progressively disable

### Minimal Mode (slow connection)
- Skip loader entirely
- All ScrollReveal → instant opacity fade (100ms)
- No stagger animations
- No background SVG textures
- No parallax
- Images: aggressive lazy loading, lower quality hints

### Progressive Degradation Order
1. First to disable: Background textures (MountainContours, BlueprintGrid)
2. Second: Parallax and scroll-linked transforms
3. Third: Stagger animations (show all items at once)
4. Fourth: ScrollReveal distances (reduce to fade-only)
5. Last to disable: Micro-interactions (these are cheapest)

### GPU Compositing Rules
- Only use `transform` and `opacity` for animations (GPU-composited)
- Never animate `width`, `height`, `top`, `left`, `margin`, `padding`
- Exception: `height: 0 → auto` for accordions — use `will-change: height` sparingly
- `will-change`: apply only during animation, remove after completion

---

## Performance Budget

### Targets
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1
- Animation frame rate: ≥ 55fps on mid-range devices

### Monitoring
- No more than 3 simultaneous framer-motion instances animating
- IntersectionObserver for scroll reveals (not scroll event listeners)
- `viewport={{ once: true }}` on all ScrollReveal (animate once, stop observing)
- Cleanup: unmount loader from DOM after completion (not display:none)

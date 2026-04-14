---
name: Loader Experience Strategy
description: Cinematic site loader with roofline assembly animation, mountain contour, monogram reveal, and hero crossfade transition
type: design
---

# Loader Experience — Highlander Roofing & Construction

## Concept: "The Build"
A cinematic 3-second loader that tells a micro-story: the mountains form, a roofline is constructed on top, and the Highlander mark resolves — then the scene "lifts" to reveal the hero. It communicates craftsmanship before a single word is read.

---

## Animation Sequence (Desktop — 3.2s total)

### Phase 1: Foundation (0–0.8s)
- Screen: Deep heritage charcoal (#1C2127)
- A subtle mountain contour line draws from left to right across the lower third
- Stroke: highland-gold at 15% opacity, 1px
- Easing: CRAFT_EASE [0.25, 0.1, 0.25, 1]

### Phase 2: Construction (0.6–1.8s)
- A simplified roofline (3 gable peaks) draws above the mountains
- Stroke: primary-foreground at 40% opacity, 1.5px
- Each peak draws sequentially with 150ms offset
- Measurement tick marks appear below peaks (fade in, 100ms each)

### Phase 3: Brand Reveal (1.5–2.5s)
- "HIGHLANDER" text fades in below the roofline, letter-spaced, uppercase
- Font: Cormorant Garamond, 600 weight
- Color: primary-foreground at 80%
- Subtitle "ROOFING & CONSTRUCTION" fades in 200ms later
- Font: DM Sans, 500 weight, tracking [0.2em]
- Color: highland-gold at 60%

### Phase 4: Transition (2.5–3.2s)
- Gold accent line draws horizontally across center (200ms)
- Entire loader content scales to 0.98 and fades out (300ms, HIGHLAND_EASE)
- Background crossfades into hero section
- No hard cut — smooth opacity blend

---

## Mobile Variant (2.0s total)

### Simplified Sequence
1. **0–0.5s:** Mountain contour draws (simplified, 3 points not 8)
2. **0.5–1.2s:** Single roofline peak draws, "H" monogram fades in centered
3. **1.2–1.6s:** "HIGHLANDER" text fades in below
4. **1.6–2.0s:** Fade out, reveal hero

### Mobile Rules
- No blueprint grid
- No measurement ticks
- Simpler SVG paths (fewer points)
- All durations reduced by ~35%
- Touch-friendly: tap anywhere to skip after 1s

---

## Visual Specifications

### Colors
- Background: hsl(var(--hero-overlay)) — deep charcoal
- Mountain stroke: hsl(var(--highland-gold) / 0.15)
- Roofline stroke: hsl(var(--primary-foreground) / 0.4)
- Text: hsl(var(--primary-foreground) / 0.8)
- Accent text: hsl(var(--highland-gold) / 0.6)
- Gold line: hsl(var(--highland-gold))

### Typography
- "HIGHLANDER": font-heading, text-xl md:text-2xl, tracking-[0.15em]
- "ROOFING & CONSTRUCTION": font-body, text-[10px] md:text-xs, tracking-[0.2em]

### SVG Dimensions
- Container: 400×200 viewBox (scales responsively)
- Mountain path: 5-8 control points, organic curves
- Roofline path: 3 peaks, architectural straight lines
- Stroke widths: 1-1.5px

---

## Skip/Performance Logic

1. **Skip on return visits:** Use sessionStorage flag. If user has seen loader this session, skip entirely
2. **Skip on slow connections:** If `navigator.connection?.effectiveType` is '2g' or 'slow-2g', skip
3. **Manual skip:** After 1s, any click/tap/keypress skips to hero
4. **Prefers-reduced-motion:** Show static brand mark for 0.8s, then fade to hero
5. **Max wait:** If hero assets aren't ready after 4s, transition anyway

---

## Technical Implementation

### Component Structure
```
<SiteLoader>
  <svg> (mountain + roofline + ticks)
  <div> (text content)
  <div> (gold line)
</SiteLoader>
```

### State Management
- `isLoading: boolean` — controls loader visibility
- `hasSeenLoader: boolean` — sessionStorage check
- Loader mounts above everything (fixed, z-50)
- After complete: unmount from DOM entirely (not just hidden)

### Hero Coordination
- Hero begins its own entrance sequence when loader signals complete
- Use callback: `onComplete={() => setShowLoader(false)}`
- Hero delays its animations by 200ms after loader exits

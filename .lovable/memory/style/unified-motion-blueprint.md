---
name: Unified Motion & Visual Effects Blueprint
description: Master blueprint combining motion philosophy, loader, homepage motion, scroll storytelling, micro-interactions, gallery, background textures, navigation animation, conversion motion, and performance rules
type: design
---

# Unified Motion & Visual Effects Blueprint — Highlander Roofing & Construction

## I. Motion Philosophy

**"Architectural Choreography"** — Every animation tells a micro-story of construction: things are *built*, *revealed*, *measured*, and *placed*. Motion communicates precision, not decoration. The site should feel like watching a master craftsman work — deliberate, controlled, and quietly impressive.

### Principles
1. **Intentional:** Every animation earns its place by improving comprehension, trust, or delight
2. **Architectural:** Movements reference building — rising, measuring, assembling, revealing
3. **Restrained luxury:** Premium ≠ excessive. One well-timed reveal > ten micro-bounces
4. **Performance-first:** GPU-composited transforms only. Mobile gets simplified, not stripped
5. **Accessible:** Full reduced-motion support. Motion enhances but is never required

### Brand Motion Tokens
| Token | Value | Role |
|-------|-------|------|
| `HIGHLAND_EASE` | `[0.22, 1, 0.36, 1]` | Primary easing — natural deceleration |
| `CRAFT_EASE` | `[0.25, 0.1, 0.25, 1]` | Cinematic moments (loader, hero) |
| Highland Gold | `hsl(var(--highland-gold))` | Accent for progress, active states, lines |
| Heritage Charcoal | `hsl(var(--heritage-charcoal))` | Depth backgrounds, overlays |

---

## II. Loader Concept — "The Build"

**File:** `src/components/SiteLoader.tsx`
**Memory:** `mem://style/loader-strategy`

### Desktop (3.2s)
1. **Foundation (0–0.8s):** Mountain contour draws left→right, 1px gold stroke at 15% opacity
2. **Construction (0.6–1.8s):** 3-peak roofline draws above mountains, sequential 150ms offset
3. **Brand Reveal (1.5–2.5s):** "HIGHLANDER" fades in (Cormorant Garamond), subtitle follows 200ms later
4. **Transition (2.5–3.2s):** Gold line draws center, content scales to 0.98 + fades, crossfade to hero

### Mobile (2.0s)
Simplified: 3-point mountain → single peak + "H" monogram → "HIGHLANDER" text → fade out

### Skip Logic
- Session return: `sessionStorage` flag → skip entirely
- Slow connection: `effectiveType === '2g'` → skip
- Manual: click/tap/keypress after 1s
- Reduced motion: static brand mark 0.8s → fade
- Max wait: 4s timeout regardless

---

## III. Homepage Motion System

**File:** `src/pages/Index.tsx` section sequence
**Memory:** `mem://strategy/homepage-architecture`

### Section Entrance Choreography
| Section | Reveal Type | Delay | Notes |
|---------|-------------|-------|-------|
| Hero | HeadingReveal + parallax bg | 0.2s after loader | Headline clips up, CTA fades in |
| TrustStrip | StaggerContainer | 0s | Stats counter-animate on view |
| ProofStrip | fade | 0s | Subtle, no distraction from trust |
| DualPathway | slide-left / slide-right | 0s | Roofing slides left, Construction right |
| NotJustRoofing | rise | 0s | Standard section entrance |
| FeaturedProjects | scale + stagger | 0s | Cards scale-in with 0.06s stagger |
| ServicesGrid | StaggerContainer | 0s | Icons rise, cards stagger |
| OurProcess | clip reveal | 0s | Steps clip-reveal sequentially |
| MeetTheTeam | rise + stagger | 0s | Cards with hover tilt |
| Reviews | fade | 0s | Testimonials fade, stars animate |
| SilentObjections | rise-subtle | 0s | Low-key, trust-building |
| BuiltForWNC | rise + GoldLine | 0s | Gold divider draws on view |
| TownGrid | StaggerContainer | 0s | Town cards stagger in |
| BlogInsights | slide-right | 0s | Cards slide from right |
| InstagramGrid | scale + stagger | 0s | Grid items scale in |
| InspectionForm | rise | 0s | Form fields stagger subtly |
| CTABlock | scale | 0s | Final CTA pulses once |

### Scroll Storytelling Rules
- Each section uses `viewport={{ once: true, margin: "-60px" }}`
- No two adjacent sections use the same reveal variant
- GoldLine dividers draw on scroll between acts
- Background depth shifts: sections alternate between `bg-background` and `bg-card` with subtle parallax offset on desktop

---

## IV. Micro-Interaction System

**Memory:** `mem://style/micro-interactions`

### Buttons
- `btn-primary-interactive`: shimmer sweep (pseudo-element translateX -100%→100%), scale 1.02 hover / 0.98 tap
- `btn-ghost-interactive`: bg opacity shift, no shimmer
- `btn-arrow-icon`: arrow translateX 0→4px on parent hover

### Cards
- Project cards: translateY -2px + shadow elevation on hover
- Service cards: border-color transition to gold tint
- Team cards: subtle image scale 1→1.03 on hover
- Construction vs Roofing cards: same motion, different accent color tokens

### Forms
- `interaction-quote` context: enhanced gold focus glow on inputs
- Input focus: border gold + 3px gold box-shadow ring (InputFeedback component)
- Validation: error shake (translateX ±4px, 3 cycles, 300ms)
- Success: green checkmark spring pop

### Accordions
- Height + opacity animate together (not sequentially)
- Chevron rotates 180° with HIGHLAND_EASE
- Content fades in 100ms after height completes

### Tabs
- Active tab: gold underline slides via layoutId
- Content: crossfade with 150ms duration

### Links
- `.link-draw`: underline scaleX 0→1 from left on hover
- `.dropdown-item-premium`: 2px gold left-border draws on hover

### Division Variants
- **Roofing content:** Primary green accents on interactive states
- **Construction content:** Warm amber/gold accents on interactive states
- **Editorial (blog):** Neutral with primary accent links
- **Quote flow:** Gold-dominant with elevated focus states

---

## V. Gallery & Visual Proof Behavior

**Memory:** `mem://style/gallery-interaction-system`

### Gallery Cards (`GalleryCard`)
- Hover: image scale 1→1.05, overlay gradient fades in, title slides up
- Tap (mobile): single tap reveals overlay, second tap opens lightbox
- Loading: skeleton pulse → scale-in reveal

### Premium Lightbox (`PremiumLightbox`)
- Backdrop: opacity 0→1 with blur
- Image: scale 0.9→1 with HIGHLAND_EASE
- Navigation: arrows with hover scale, keyboard support
- Close: scale 1→0.95 + opacity fade
- Mobile: swipe left/right with momentum, pinch-to-zoom

### Before/After Slider
- Drag handle with gold accent line
- Smooth CSS resize, no JS animation during drag
- Labels fade in/out based on slider position

### Testimonial Cards
- Star ratings animate sequentially (scale pop, 50ms stagger)
- Quote marks fade in at 0.3 opacity
- Author info slides up 200ms after quote

### Trust Badges
- Subtle scale 1→1.02 on hover
- No bounce or attention-seeking animation
- Static on mobile

---

## VI. Background Texture & Depth System

**Memory:** `mem://style/background-texture-system`

### Available Textures (`src/components/motion/BackgroundTexture.tsx`)
| Texture | Use | Desktop Opacity | Mobile |
|---------|-----|-----------------|--------|
| `MountainContours` | Hero, About, BuiltForWNC | 6–10% | Hidden <640px |
| `BlueprintGrid` | Construction sections, Process | 3–5% | Hidden <640px |
| `ArchitecturalLines` | Services, Quote flow | 4–6% | Hidden <768px |
| `RooflinePattern` | Roofing sections | 5–8% | Hidden <640px |
| `TextureOverlay` | Noise grain on dark sections | 2–3% | 1–2% |

### Animation Behavior
- Mountain contours: static (no animation) — serves as depth layer
- Blueprint grid: very slow drift (translateX over 60s loop) — barely perceptible
- Noise overlay: static grain, no animation

### Section Depth Strategy
- Alternate sections between flat (`bg-background`) and textured (`bg-card` + texture)
- Dark sections (Hero, CTA): `TextureOverlay` noise + `MountainContours`
- Light sections: clean, no texture
- Gold dividers (`GoldLine`) create visual separation between depth zones

---

## VII. Navigation Animation

**Memory:** `mem://style/navigation-animation-system`

### Header
- Scroll-down past 200px: header slides up (hidden)
- Scroll-up: header slides down (visible)
- Heritage top bar: collapses with height+opacity animation
- Logo: scales 46px→34px smoothly
- Background: transparent → `backdrop-blur-xl` + shadow

### Desktop Dropdowns
- Entry: scale 0.97→1, y 10→0
- Gold top accent line inside panel
- Items stagger x: -8→0, 0.03s each
- 120ms leave delay prevents flicker

### Active States
- `layoutId="nav-active"` gold underline slides between items
- Active links: `bg-secondary/50` background
- Mobile: gold dot indicator

### Mobile Menu
- Backdrop blur overlay
- Body scroll lock
- Items stagger x: -20→0, 0.04s each
- Sub-menus: gold left border, inner stagger 0.03s
- CTA enters last with y: 12→0
- Hamburger: rotation + scale swap animation

### Sticky CTA
- Mobile bottom bar: springs from y:100 with HIGHLAND_EASE
- Pulse dot on Quote button
- Desktop floating trigger: hover reveals expanded panel with dropdown animation

---

## VIII. Quote Flow & Conversion Motion

**Memory:** `mem://style/conversion-motion-system`

### MultiStepForm
- Progress circles: spring pop on completion, gold fill, connecting lines animate width
- Step content: direction-aware horizontal slide with AnimatePresence
- Back/Continue: ghost/primary interactive styles
- Submit: Loader2 spinner replaces arrow

### ChatMessage
- Entry: y:12, scale:0.97→normal
- Bot: left-aligned, secondary bg, rounded-bl-none
- User: right-aligned, primary bg, rounded-br-none
- TypingIndicator: 3 dots with staggered pulse

### ResultReveal
- Height 0→auto + scale 0.97→1 + y:20→0
- Inner content delays 0.15s for stagger effect

### ConfirmationState
- Icon: spring pop (scale:0→1, rotate:-30→0)
- Text: staggered fade-in (0.25s, 0.35s)
- Gold accent line: scaleX 0→1
- Action slot enters last

### InputFeedback
- Active: gold glow ring (3px box-shadow)
- Inactive: transparent shadow, border color resets

### ScheduleSlot
- Hover: scale 1.03, Tap: scale 0.97
- Selected: gold bg + shadow + CheckCircle spring
- Unavailable: muted, cursor-not-allowed

---

## IX. Performance Rules

**Memory:** `mem://style/performance-motion-framework`

### Animation Tiers
1. **HIGH:** Hero, loader, page transitions, confirmations — full budget (800ms, springs)
2. **MEDIUM:** Section reveals, card staggers, dropdowns — 300–600ms, HIGHLAND_EASE
3. **SUBTLE:** Hover scale, focus glow, icon rotations — 150–250ms, CSS transitions
4. **STATIC:** Body text, labels, footer, breadcrumbs — no animation

### Device Adaptation
| Rule | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| Reveal distance | 32px | 24px | 16px |
| Parallax | Active | Disabled | Disabled |
| Hover states | Full | Simplified | Tap only |
| Stagger per item | 0.06s | 0.05s | 0.04s |
| Max stagger items | 12 | 8 | 6 |
| Background textures | Full | Reduced | Disabled <640px |
| Loader | Full 3.2s | Full 2.7s | Simplified 2s |

### Reduced Motion
- `prefers-reduced-motion: reduce` → all animations collapse to instant opacity
- ScrollReveal renders plain `<div>`
- Loader shows static mark 0.8s → fade
- CSS transitions forced to 0.01ms

### GPU Rules
- Only animate `transform` and `opacity` (composited properties)
- Never animate layout properties (`width`, `height`, `top`, `left`)
- `will-change` applied during animation only, removed after
- Max 3 simultaneous framer-motion instances

### Performance Targets
- FCP < 1.5s, LCP < 2.5s, TBT < 200ms, CLS < 0.1
- Animation frame rate ≥ 55fps on mid-range devices
- Viewport `once: true` on all scroll reveals (observe once, stop)

### Slow Device Fallbacks
1. `effectiveType === '2g'` → skip loader, fade-only reveals
2. `hardwareConcurrency < 4` → reduce Tier 2 to Tier 3
3. `deviceMemory < 4` → disable background textures
4. Frame drops detected → progressively disable in order: textures → parallax → staggers → reveal distances

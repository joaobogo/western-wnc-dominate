---
name: Mobile-First Optimization Strategy
description: Complete mobile UX strategy covering all components — hero, grids, forms, quote flow, chatbot, galleries, navigation, testimonials, calculators, blog — with touch behavior, thumb zones, stacking, and performance rules
type: design
---

# Mobile-First Optimization Strategy — Highlander Roofing & Construction

## Philosophy

Mobile isn't a scaled-down desktop — it's the primary experience. 65%+ of traffic arrives on phones. Every component is designed mobile-first, then enhanced for desktop. Premium on mobile means: fast, clear, thumb-friendly, and never cramped.

**Rule:** If it doesn't work beautifully at 375px, it doesn't ship.

---

## I. Global Mobile Rules

### Typography Scale
| Element | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| H1 (hero) | text-5xl (48px) | text-3xl (30px) | Max 2 lines on mobile |
| H2 (section) | text-4xl (36px) | text-2xl (24px) | Max 2 lines |
| H3 (subsection) | text-2xl (24px) | text-xl (20px) | — |
| Body | text-base (16px) | text-base (16px) | Never smaller than 16px |
| Caption/meta | text-sm (14px) | text-sm (14px) | Minimum readable size |
| Labels | text-xs (12px) | text-xs (12px) | Only for badges/tags |

### Spacing Scale
| Context | Desktop | Mobile |
|---------|---------|--------|
| Section padding (vertical) | py-20 to py-24 | py-12 to py-16 |
| Section padding (horizontal) | px-8 to px-16 | px-5 |
| Card padding | p-6 to p-8 | p-4 to p-5 |
| Gap between cards | gap-6 to gap-8 | gap-4 |
| Component margins | mb-12 to mb-16 | mb-8 to mb-10 |

### Touch Targets
- Minimum tap target: **48px × 48px** (Apple HIG / WCAG)
- Buttons: min height 48px, full-width on mobile
- Links in body text: adequate line-height (1.6+) for tap separation
- Close buttons: 44px minimum, positioned in thumb-reachable corner
- Spacing between tappable elements: minimum 8px

### Thumb Zone Design
```
┌─────────────────┐
│   Hard to reach  │ ← Logo, status bar (read-only OK)
│                  │
│   Comfortable    │ ← Content, secondary actions
│                  │
│   Easy / Natural │ ← Primary CTAs, navigation
└─────────────────┘
```
- Primary CTAs: bottom third of screen or sticky bottom bar
- Navigation: bottom bar (StickyMobileCTA), not top-only
- Forms: submit button at bottom, not top
- Modal close: bottom-right or swipe-down, not top-right X only

---

## II. Component-by-Component Mobile Adaptation

### Hero Section
**Desktop:** Full-width background image, large headline, dual CTAs side-by-side
**Mobile:**
- Background image: cropped to focus on subject, `object-position: center` or custom mobile crop
- Headline: max 2 lines at text-3xl, no orphan words (use `text-balance` or manual breaks)
- Subhead: max 2 lines at text-base, hidden or shortened if too long
- CTAs: stacked vertically (primary full-width above secondary)
- Trust strip: horizontal scroll or 2×2 grid (not 4 across)
- Height: `min-h-[70vh]` not `min-h-screen` (leave room for bottom bar)
- No parallax — static background with subtle overlay

### Trust Strip / Proof Strip
**Desktop:** 4–5 items in a row
**Mobile:**
- 2×2 grid or horizontal scroll with snap points
- AnimatedCounter: trigger on scroll, smaller number size
- Icons: 20px (not 24px), centered above text
- Condensed labels: "500+ Projects" not "Over 500 Completed Projects"

### Dual Pathway (Roofing vs Construction)
**Desktop:** Side-by-side cards with hover effects
**Mobile:**
- Stacked vertically, Roofing first (higher traffic intent)
- Each card: full-width, 16:9 aspect ratio image, title + 1-line description + CTA
- Tap opens section or navigates — no hover state
- Visual separator between cards (GoldLine or subtle border)
- Both divisions visible without scrolling past fold if possible

### Service Grids
**Desktop:** 3-column or 4-column grid
**Mobile:**
- 1-column stack for service cards with detailed descriptions
- 2-column grid for icon-based service tiles (compact variant)
- Horizontal scroll carousel for 4+ items with snap points
- Swipe indicator: subtle gradient fade on right edge
- Each card: icon + title + 1-line desc + arrow, min 48px tap height

### Forms (Inspection Form, Contact)
**Desktop:** 2-column layout, inline labels
**Mobile:**
- Single column, full-width inputs
- Labels above inputs (not floating/inline — clearer on mobile)
- Input height: min 48px
- Use native `<select>`, `<input type="tel">`, `<input type="email">` for keyboard optimization
- Auto-capitalize first name, auto-complete where possible
- Submit button: full-width, sticky at bottom of form viewport when form is long
- Trust line visible above submit: "Free · No obligation · 24hr response"
- Error messages: inline below field, red text, specific ("Please enter a valid email")
- Success: ConfirmationState component with spring animation

### Quote Flow (Multi-Step Form)
**Desktop:** Horizontal progress bar, wide step content
**Mobile:**
- Progress: simplified to "Step 2 of 6" text + thin progress bar (not circles — too cramped)
- Step content: full-width, generous padding
- Navigation: "Back" as text link (top-left), "Continue" as full-width primary button (bottom)
- Transitions: horizontal slide (reduced distance: 40px not 60px)
- Each step fits in viewport without scrolling if possible (max 3 fields per step)
- Phone/email fields use appropriate `inputMode` for correct mobile keyboard
- "Call instead" link below Continue button on every step
- Auto-advance: after single-choice selection, auto-advance to next step (with 300ms delay for feedback)

### Chatbot
**Desktop:** Bottom-right floating panel, 380px wide
**Mobile:**
- Full-screen overlay when opened (sheet from bottom)
- Input field: sticky at bottom with native keyboard handling
- Messages: full-width bubbles, text-sm
- Typing indicator: compact (3 dots)
- Close: swipe-down gesture + X button in top-right
- Quick replies: horizontal scroll chips below last bot message
- Initial prompt: bottom-aligned so it's in thumb zone
- No auto-open on mobile (user must tap to start)

### Galleries / Project Cards
**Desktop:** 3-column masonry or grid, hover zoom
**Mobile:**
- 1-column full-width cards or 2-column compact grid
- Swipe carousel for featured projects (horizontal scroll with snap)
- Tap to open lightbox (not long-press)
- Lightbox: full-screen, swipe left/right to navigate, pinch-to-zoom
- No hover zoom — replaced by tap-to-expand
- Lazy loading with skeleton placeholders
- Image aspect ratio: consistent 16:9 or 4:3 (no layout shift)

### Before/After Modules
**Desktop:** Side-by-side with slider handle
**Mobile:**
- Vertical stack: Before image above, After image below, with labels
- OR: horizontal slider (touch-drag handle, full-width)
- Handle: large (40px circle), high contrast, easy to grip
- Labels: "Before" / "After" pinned to images (not separate)

### Navigation (Header)
**Mobile:**
- Hamburger menu (animated icon swap)
- Menu opens as full-width panel below header (not side drawer — easier thumb access)
- Nav items: 48px height, full-width tap targets
- Sub-menus: accordion expand with gold left border
- CTA block at bottom of menu panel
- Body scroll locked when menu open
- Close on route change
- Phone button: always visible in header (icon-only, 40px)

### Sticky Mobile CTA (Bottom Bar)
- Fixed bottom, safe-area-inset padding
- 3-column grid: Call | Quote (gold, attention dot) | Services
- Appears after 400px scroll
- Hides when InspectionForm section is in viewport (no double-prompting)
- Shadow: upward, subtle (perceived depth)
- Total height: ~60px including safe area

### Testimonial / Review Modules
**Desktop:** 3-column card grid or carousel
**Mobile:**
- Single-column cards, full-width
- Horizontal swipe carousel with snap points and dot indicators
- Each card: star rating + quote (max 3 lines with "Read more" expand) + author + town
- Auto-play disabled on mobile (user-controlled swiping only)

### Calculators / Interactive Tools
**Desktop:** Side panel results, multi-column inputs
**Mobile:**
- Stacked: inputs above, results below (ResultReveal animation)
- Slider controls: large thumb handle (32px), full-width track
- Number inputs: `inputMode="numeric"` for number pad
- Results card: sticky or scrolls into view after calculation
- "Get detailed estimate" CTA: full-width below results
- Reset button: small, secondary, top-right of tool

### Blog Content
**Desktop:** Sidebar with CTA + related articles, wide content column
**Mobile:**
- No sidebar — full-width content
- In-content CTA block after paragraph 3–4 (full-width card)
- Images: full-bleed (edge-to-edge) on mobile
- Code/table blocks: horizontal scroll with shadow indicator
- Related articles: horizontal scroll cards at bottom
- Reading progress bar: thin line at top (optional, subtle)
- Share buttons: sticky bottom mini-bar or end-of-article row
- Estimated read time visible near title

### Meet the Team
**Desktop:** 3–4 column grid with hover reveal
**Mobile:**
- 2-column grid (compact cards) or 1-column (detailed cards)
- No hover — tap to expand bio
- Photo: circle or rounded square, centered
- Name + role visible without tap
- Bio: accordion expand on tap

### Process / Timeline Sections
**Desktop:** Horizontal stepped timeline
**Mobile:**
- Vertical timeline with left-aligned line + right-aligned content cards
- Step numbers: small circles on the timeline line
- Each step: title + 2-line description
- Gold connecting line between steps
- No horizontal timelines on mobile (they break)

### FAQ Accordion
**Desktop:** Max-width centered, comfortable padding
**Mobile:**
- Full-width, edge-to-edge
- Question text: text-base, bold, adequate line-height
- Tap target: entire question row (not just chevron)
- Answer: text-sm, generous padding, links tappable
- Chevron: rotates 180° with HIGHLAND_EASE
- Only 1 answer open at a time (auto-close others)

### Footer
**Desktop:** 4-column layout
**Mobile:**
- Stacked sections with accordion expand for link groups
- Key info always visible: phone, address, hours
- Social links: icon row, 44px tap targets
- "Back to top" button: visible, bottom-right
- Legal links: single row, small text
- Bottom padding: account for StickyMobileCTA overlay (~70px)

---

## III. Mobile Performance Rules

### Loading
- Critical CSS inlined for first viewport
- Hero image: `loading="eager"`, `fetchpriority="high"`, WebP format
- All below-fold images: `loading="lazy"`
- Fonts: `font-display: swap`, preloaded
- No background SVG textures below 640px (save paint cost)
- JavaScript: code-split heavy components (RoofDesigner, InstagramGrid)

### Animations
- ScrollReveal distances: 16px (not 32px)
- No parallax
- Stagger: max 6 items, 0.04s per item
- No `whileHover` (tap-only interactions)
- Reduced-motion: instant opacity, no transforms
- Loader: simplified 2s mobile variant

### Images
- Responsive `srcSet` with mobile-optimized sizes (640px, 768px widths)
- Aspect ratios enforced (no layout shift)
- Skeleton loaders during image load
- Max 3 images visible at initial load (lazy-load rest)

### Interactions
- `touch-action: manipulation` on interactive elements (removes 300ms tap delay)
- No double-tap zoom on form inputs (viewport meta handles this)
- Swipe gestures: 30px minimum threshold to prevent accidental triggers
- Pull-to-refresh: disabled in app-like sections (prevent accidental reload)

---

## IV. Mobile Conversion Optimization

### CTA Visibility Rules
1. Primary CTA visible within 1.5 scrolls from any landing point
2. StickyMobileCTA provides persistent access to Call/Quote
3. Phone number tappable in header at all times
4. Form submit buttons: full-width, never hidden behind keyboard

### Friction Reduction
- Auto-fill enabled on all form fields
- Phone field: auto-format as (XXX) XXX-XXXX
- Email field: `inputMode="email"` for @ key
- Address field: suggest autocomplete
- File upload (if needed): camera + gallery picker native
- Progress saved: if user leaves quote flow, resume on return

### Trust on Mobile
- Trust strip: always visible above fold (2×2 grid or scroll)
- Star rating + review count: in hero or immediately below
- Certifications: referenced inline (not separate page click)
- Team photos: visible before conversion form
- "Locally owned · Franklin & Sylva" in footer + trust strip

### Mobile-Specific Copy Adjustments
- Headlines: shorter (max 6–8 words per line)
- Descriptions: tighter (2–3 sentences max per block)
- CTAs: action-first ("Call Now" > "Click Here to Call Us")
- Trust lines: abbreviated ("Free · No obligation · 24hr response")
- Blog excerpts: 2 lines max in cards

---

## V. Breakpoint System

### Tailwind Breakpoints Used
| Breakpoint | Width | Device Category |
|------------|-------|----------------|
| Default | 0–639px | Phone (portrait) |
| `sm` | 640px+ | Phone (landscape) / small tablet |
| `md` | 768px+ | Tablet (portrait) |
| `lg` | 1024px+ | Tablet (landscape) / desktop |
| `xl` | 1280px+ | Desktop |
| `2xl` | 1536px+ | Large desktop |

### Component Behavior at Breakpoints
| Component | Default (mobile) | sm | md | lg+ |
|-----------|-----------------|----|----|-----|
| Service grid | 1-col stack | 2-col | 2-col | 3-4 col |
| Project cards | 1-col or carousel | 2-col | 2-col | 3-col |
| Hero CTAs | Stacked | Stacked | Side-by-side | Side-by-side |
| Form layout | 1-col | 1-col | 2-col | 2-col |
| Navigation | Hamburger | Hamburger | Hamburger | Full nav bar |
| Sidebar | Hidden | Hidden | Hidden | Visible |
| Trust strip | 2×2 grid | 4-col | 4-col | 4-5 col |
| Footer | Accordion | Accordion | 2-col | 4-col |
| Team grid | 2-col | 2-col | 3-col | 4-col |

---

## VI. Testing Checklist

### Before Launch (Mobile)
- [ ] All tap targets ≥ 48px
- [ ] No horizontal scroll on any page
- [ ] Forms usable with keyboard open (no hidden submit)
- [ ] Images lazy-loaded, no layout shift
- [ ] StickyMobileCTA appears/hides correctly
- [ ] Phone links work (click-to-call)
- [ ] Menu opens/closes, body scroll locks
- [ ] Quote flow completable on phone
- [ ] Text readable without zooming (min 16px body)
- [ ] Safe area padding for notch/home indicator
- [ ] Performance: FCP < 1.5s on 4G, LCP < 2.5s
- [ ] Lighthouse mobile score ≥ 90

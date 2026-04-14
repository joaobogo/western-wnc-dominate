---
name: Unified Lovable Implementation Blueprint
description: Complete developer-ready execution plan combining design system, architecture, components, homepage, divisions, gallery, blog, lead capture, motion, SEO, performance, and QA standards
type: feature
---

# Unified Lovable Implementation Blueprint
## Highlander Roofing & Construction — Developer-Ready Reference

---

## I. DESIGN SYSTEM

### Typography
- **Headings**: Cormorant Garamond (serif) — weights 400–700, tracking -0.01em
- **Body**: DM Sans (sans-serif) — weights 300–700, tracking 0.01em
- **Eyebrow**: DM Sans, 10–11px, uppercase, tracking 0.2em, accent color

### Color Palette (HSL CSS Variables)
| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | 160 35% 16% | Deep forest green — nav, buttons, headings |
| `--accent` | 40 55% 48% | Highland gold — CTAs, accents, lines |
| `--background` | 45 15% 96% | Warm cream — page backgrounds |
| `--foreground` | 210 18% 13% | Heritage charcoal — body text |
| `--dark-section` | 210 20% 10% | Dark panels — heroes, alternating sections |
| `--warm-stone` | 35 18% 88% | Warm stone — secondary backgrounds |
| `--tartan-line` | 160 25% 30% | Subtle tartan grid lines |

### Spacing & Layout
- **Section padding**: `px-5 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32`
- **Content max-width**: `max-w-6xl mx-auto` (container-tight)
- **Container**: max 1400px, centered, 2rem padding
- **Border radius**: 0.25rem (--radius) — deliberately sharp/architectural
- **Card system**: `.card-premium` with gold left-accent on hover, subtle lift

### Component Classes
- `.cta-gradient` — Gold gradient for primary CTAs
- `.tartan-bg` / `.tartan-dark` — Heritage grid texture overlays
- `.heritage-line` / `.heritage-line-center` — Gold accent dividers
- `.eyebrow` — Uppercase label system
- `.section-heading` — Responsive heading scale (3xl → 5xl)
- `.card-lift` / `.card-premium` — Hover interaction cards
- `.btn-primary-interactive` — Shimmer + press CTA button
- `.field-premium` — Gold-glow form inputs

---

## II. SITE ARCHITECTURE

### Page Map (38 pages)
```
/                          Homepage (7-act conversion sequence)
├── /roofing               Roofing Division hub (921 lines)
│   ├── /roofing/residential
│   ├── /roofing/roof-replacement
│   ├── /roofing/roof-repair
│   ├── /roofing/storm-damage
│   ├── /roofing/commercial
│   └── /roofing/specialty
├── /construction          Construction Division hub (397 lines)
│   ├── /construction/additions
│   ├── /construction/renovations
│   ├── /construction/outdoor-living
│   └── /construction/custom
├── /services              Services index
│   └── /services/:slug    Individual service pages
├── /service-areas         Location hub
│   └── /service-areas/:slug  Town pages
├── /gallery               Project portfolio
│   └── /projects/:slug    Case study detail
├── /blog                  Editorial hub
│   └── /blog/:slug        Article pages
├── /about                 Company story
├── /team                  Team profiles
├── /certifications        Credentials
├── /reviews               Social proof
├── /financing             Payment options
├── /storm-center          Storm resource hub
├── /request-inspection    Quote flow
├── /free-tools            Interactive tools
├── /roof-designer         Virtual designer
└── /careers               Employment
```

### Component Library (80+ components)
**Shared Global**: Header, Footer, StickyMobileCTA, SectionDivider, SEOHead, CTABlock
**Trust**: TrustStrip, ProofStrip, TrustBadgeStrip, ReassuranceBlock, TrustSidebar
**Motion**: ScrollReveal, HeadingReveal, AnimatedCounter, GoldLine, BackgroundTexture, ConversionMotion, SiteLoader
**Gallery**: GalleryCard, PremiumLightbox, BeforeAfterShowcase, BeforeAfterGallery
**Lead Capture**: InspectionForm, RoofAssessmentQuiz, RoofCostEstimator, GuideLeadMagnet, LeadCaptureModal
**Division**: RoofingShared, RoofingProcess, RoofingFAQs, TrustFramework, ConstructionShared, ConstructionProcess, ConstructionFAQs, WNCRelevance

---

## III. SEO IMPLEMENTATION

### SEOHead Component (src/components/SEOHead.tsx)
Every page gets `<SEOHead>` with:
- `<title>` — keyword-front-loaded, ≤60 chars, includes brand
- `<meta name="description">` — ≤160 chars with trust signal
- `<link rel="canonical">` — Absolute URL
- Open Graph + Twitter Card meta tags
- JSON-LD structured data (page-type-specific)

### JSON-LD Schema Generators
| Function | Output | Used On |
|----------|--------|---------|
| `localBusinessSchema()` | RoofingContractor + address + ratings | Homepage |
| `organizationSchema()` | Organization + contact | Homepage |
| `serviceSchema()` | Service + provider | Division/service pages |
| `faqSchema()` | FAQPage | Any page with FAQ accordion |
| `articleSchema()` | Article + author + publisher | Blog posts |
| `breadcrumbSchema()` | BreadcrumbList | All pages |

### Heading Hierarchy
- Single H1 per page (verified ✅ across all 38 pages)
- H2 for section breaks, H3 for subsections
- Never skip levels

### Image SEO
- Alt text: Descriptive with location ("Metal roof replacement in Franklin NC")
- File names: Kebab-case with keywords
- `loading="eager"` on hero images, `loading="lazy"` on everything below fold

---

## IV. PERFORMANCE

### Strategy
- **Fonts**: Google Fonts with `display=swap`, Latin subset
- **Images**: WebP format, responsive srcset where possible, lazy loading
- **Code splitting**: Route-based via React.lazy (planned)
- **Animation**: Framer-motion with `viewport: { once: true }` to prevent re-renders
- **CSS**: Tailwind purge removes unused styles

### Targets
| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID/INP | < 100ms |
| Initial page weight | < 800KB |

### Reduced Motion
- `SiteLoader`: Skips animation when `prefers-reduced-motion` is set
- `ScrollReveal`: Falls back to instant visibility
- `App.css`: Global reduced-motion rules

---

## V. RESPONSIVE / MOBILE-FIRST

### Breakpoints
- Mobile: < 768px (single column, stacked layouts, 44px touch targets)
- Tablet: 768px–1024px (2-column where appropriate)
- Desktop: > 1024px (full layout, hover effects, mega-menu)

### Mobile-Specific Behavior
- StickyMobileCTA appears after 25% scroll
- Phone CTA button visible in header (green circle)
- Navigation: Full-screen slide panel with accordion dropdowns
- Forms: Single column, large inputs, visible labels
- Gallery: Single column with tap-to-expand
- Hero: Stacked layout (image + text), full-width CTA

---

## VI. MOTION SYSTEM

### Animation Curve
`[0.22, 1, 0.36, 1]` — Used consistently as "HIGHLAND_EASE" across all components

### Timing Hierarchy
| Priority | Duration | Use |
|----------|----------|-----|
| Micro | 150-200ms | Button press, hover state |
| Standard | 300-400ms | Card transitions, dropdowns |
| Reveal | 500-700ms | Scroll reveals, section entries |
| Cinematic | 800-2500ms | Hero entrance, loader, page transitions |

### Key Animations
- **SiteLoader**: Roofline SVG assembly → mountain contour → brand name → skip after 1 visit
- **Hero**: Staggered text reveal (clip-path), gold line draw, trust items cascade
- **ScrollReveal**: Opacity + translateY with IntersectionObserver
- **Cards**: translateY(-2px) lift, gold left-accent height animation
- **Buttons**: Scale 1.02 hover, scale 0.98 press, shimmer sweep
- **Navigation**: Header hide/show on scroll direction, dropdown scale+fade, mobile panel slide

---

## VII. LEAD CAPTURE

### Conversion Points
1. **Hero CTA** → /request-inspection
2. **Sticky Mobile Bar** → Phone + Quote button
3. **InspectionForm** → Multi-field with service branching
4. **RoofAssessmentQuiz** → Interactive assessment → lead capture
5. **RoofCostEstimator** → Calculator → estimate → lead capture
6. **LeadCaptureModal** → Roof designer → email gate
7. **GuideLeadMagnet** → Content download → email capture
8. **CTABlock** → End-of-page conversion block
9. **Contextual CTAs** → Service-matched throughout all pages

### Database
- `designer_leads` table with RLS (insert only, no public read)
- `designer_metrics` for event tracking
- `roof_designs` + `roof_materials` for virtual designer

---

## VIII. QA STANDARDS

### Per-Page Checklist
- [ ] Single H1 with primary keyword
- [ ] SEOHead with title, description, canonical, JSON-LD
- [ ] All images have alt text and loading attribute
- [ ] Mobile: single column, thumb-friendly, no horizontal scroll
- [ ] CTA visible without scroll
- [ ] Trust strip or proof element present
- [ ] Internal links to related pages (≥2)
- [ ] FAQ section with FAQPage schema (where applicable)
- [ ] No hardcoded colors — all via CSS variables
- [ ] Reduced motion support for key animations
- [ ] Form validation with error states
- [ ] Consistent section padding and spacing

### Visual Consistency Rules
- Never use Inter, Poppins, or generic AI-aesthetic fonts
- No purple gradients, no generic blue buttons
- Gold accents only via `--highland-gold` / `--accent`
- Dark sections only via `--dark-section` with tartan overlay
- Cards always use `.card-premium` or `.card-lift`
- Eyebrows always use `.eyebrow` class

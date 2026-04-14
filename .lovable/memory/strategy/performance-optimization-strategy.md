---
name: Site Performance Optimization Strategy
description: Full performance framework covering images, animations, code splitting, lazy loading, fonts, caching, Core Web Vitals, and visual cost/benefit analysis
type: feature
---

# Site Performance Optimization Strategy

## I. Core Web Vitals Targets

| Metric | Target | Priority |
|--------|--------|----------|
| Largest Contentful Paint (LCP) | < 2.5s | Critical — hero image is the LCP element |
| First Input Delay (FID) / INP | < 100ms | High — form interactions, CTA clicks |
| Cumulative Layout Shift (CLS) | < 0.1 | High — image placeholders, font swap |
| First Contentful Paint (FCP) | < 1.5s | High — initial paint with logo + text |
| Time to First Byte (TTFB) | < 600ms | Medium — CDN handles this |
| Total Blocking Time (TBT) | < 200ms | High — JS bundle size |

---

## II. Image Optimization

### Format Strategy
| Use Case | Format | Fallback | Quality |
|----------|--------|----------|---------|
| Hero/banner photos | WebP | JPEG | 80-85% |
| Project gallery photos | WebP | JPEG | 80% |
| Team portraits | WebP | JPEG | 85% |
| Icons/logos | SVG (inline) | — | Vector |
| Background textures | Inline SVG | — | Vector |
| Before/after photos | WebP | JPEG | 80% |
| Blog content images | WebP | JPEG | 80% |
| OG/social share | JPEG | — | 90% |

### Responsive Sizing
```html
<img
  srcSet="image-640.webp 640w, image-960.webp 960w, image-1280.webp 1280w, image-1920.webp 1920w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading="lazy"
  decoding="async"
  alt="..."
/>
```

### Size Budgets
| Context | Max Width Served | Max File Size |
|---------|-----------------|---------------|
| Hero full-width | 1920px | 250KB |
| Gallery card thumbnail | 640px | 80KB |
| Gallery full-view | 1280px | 180KB |
| Blog content image | 960px | 120KB |
| Team portrait | 480px | 60KB |
| Service card icon | 64px | 5KB (SVG) |
| Background texture | Inline SVG | 3KB |

### Loading Priority
| Element | `loading` | `fetchpriority` | `decoding` |
|---------|-----------|-----------------|------------|
| Hero image | `eager` | `high` | `auto` |
| Logo | `eager` | `high` | `auto` |
| Above-fold content images | `eager` | `auto` | `auto` |
| Below-fold images | `lazy` | `auto` | `async` |
| Gallery thumbnails | `lazy` | `auto` | `async` |
| Blog images | `lazy` | `auto` | `async` |

### Layout Shift Prevention
- Every `<img>` MUST have explicit `width` and `height` OR CSS `aspect-ratio`
- Use skeleton placeholders (pulse animation) for lazy images
- Background images: set container dimensions before image loads
- Font metrics: `font-display: swap` + `size-adjust` if needed

---

## III. Font Optimization

### Font Loading Strategy
```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/playfair-display-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/dm-sans-400.woff2" as="font" type="font/woff2" crossorigin>
```

### Rules
- **Playfair Display** (heading): preload 700 weight only. Load 400/600 on demand.
- **DM Sans** (body): preload 400 weight. Load 500/600/700 on demand.
- `font-display: swap` on all @font-face declarations
- Self-host fonts (no Google Fonts CDN — eliminates third-party DNS lookup)
- Subset fonts to Latin characters if not needing extended glyphs
- Total font budget: < 120KB (all weights combined)

---

## IV. Code Splitting & Bundle Strategy

### Route-Based Splitting
```tsx
// App.tsx — lazy load all pages except Index
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Gallery = lazy(() => import("./pages/Gallery"));
const RoofDesigner = lazy(() => import("./pages/RoofDesigner"));
// etc.
```

### Component-Level Splitting
| Component | Split? | Reason |
|-----------|--------|--------|
| SiteLoader | No | Above fold, critical path |
| Header | No | Every page, critical |
| Hero | No | LCP element |
| TrustStrip | No | Above fold |
| RoofDesignerWorkspace | Yes | Heavy, below fold, single page |
| InstagramGrid | Yes | API-dependent, below fold |
| PremiumLightbox | Yes | On-demand only |
| ConversionMotion components | No | Small, tree-shakeable |
| BackgroundTexture components | No | Inline SVG, tiny |

### Bundle Budget
| Chunk | Target Size (gzipped) |
|-------|----------------------|
| Main bundle (critical) | < 80KB |
| Vendor (React, framer-motion) | < 60KB |
| Route chunk (per page) | < 30KB |
| Total initial load | < 150KB JS |

### Tree Shaking
- Import only needed icons from lucide-react: `import { Phone } from "lucide-react"` ✅
- Never: `import * as Icons from "lucide-react"` ❌
- Import only needed framer-motion features
- Unused shadcn components: don't import, delete files if never used

---

## V. Animation Performance

### GPU-Composited Only
✅ Animate: `transform` (translate, scale, rotate), `opacity`, `filter`
❌ Never animate: `width`, `height`, `top`, `left`, `margin`, `padding`, `border-width`

### `will-change` Usage
- Apply `will-change: transform` ONLY during active animation
- Remove after animation completes
- Never set `will-change` on more than 5 elements simultaneously
- ScrollReveal: no `will-change` (IntersectionObserver handles triggering)

### Animation Frame Budget
- Target: 60fps (16.6ms per frame)
- Acceptable: 55fps minimum on mid-range devices
- Max simultaneous framer-motion instances: 3
- Background texture animations: CSS only (no JS, no requestAnimationFrame)

### Scroll Performance
- Use `IntersectionObserver` for scroll reveals (not scroll event listeners)
- `passive: true` on all scroll event listeners
- No `getBoundingClientRect()` in scroll handlers
- Parallax: CSS `transform: translateZ()` with `perspective`, not JS scroll binding
- Mobile: zero parallax (static backgrounds)

---

## VI. Lazy Loading Strategy

### Images
- All below-fold: `loading="lazy"` native attribute
- Gallery: IntersectionObserver with 200px `rootMargin` (preload before visible)
- Blog: lazy from first image below hero

### Components
```tsx
// Heavy components loaded on demand
const RoofDesignerWorkspace = lazy(() => import("@/components/roof-designer/RoofDesignerWorkspace"));
const InstagramGrid = lazy(() => import("@/components/InstagramGrid"));

// Suspense wrapper
<Suspense fallback={<Skeleton className="h-[400px]" />}>
  <RoofDesignerWorkspace />
</Suspense>
```

### Third-Party Scripts
- Google Maps: load only on Service Areas page, after user interaction
- Analytics: defer, load after `onload` event
- Chat widget (if external): load after 5s or user scroll past 50%
- Social embeds: lazy load with IntersectionObserver

---

## VII. Video Strategy

### When to Use Video
✅ Worth it:
- Project showcase walk-through (hero or gallery, 15–30s max)
- Before/after transformation reveal
- Team/culture intro (About page)

❌ Not worth it:
- Background ambient loops (expensive, low value)
- Service explanations (use text + images instead)
- Testimonials (text + photo more trustworthy for contractors)

### Video Optimization
- Format: MP4 (H.264) for compatibility, WebM for quality/size
- Max resolution: 1080p desktop, 720p mobile
- Max file size: 5MB for inline, 15MB for full-page
- Autoplay: only with `muted`, `playsinline`, `loop` — and only on desktop
- Mobile: poster image + play button (never autoplay)
- Lazy load: IntersectionObserver trigger, don't load until near viewport
- No video on initial page load critical path

---

## VIII. Caching Strategy

### Static Assets
```
Cache-Control: public, max-age=31536000, immutable
```
Applied to: JS bundles (hashed), CSS (hashed), fonts, images

### HTML Pages
```
Cache-Control: public, max-age=0, must-revalidate
```
Applied to: index.html, route HTML

### API Responses
- Supabase queries: client-side cache with React Query (5min stale time)
- Static data (towns, services): embedded in bundle, no API call
- Dynamic data (reviews, projects): cache 5min, revalidate on focus

### Service Worker
- Not recommended initially (adds complexity)
- Consider for Phase 2 if offline support or aggressive caching needed

---

## IX. Visual Cost/Benefit Analysis

### Worth the Performance Cost ✅
| Element | Cost | Value | Verdict |
|---------|------|-------|---------|
| Hero image (high-quality) | ~200KB | First impression, LCP | Worth it — optimize aggressively |
| Framer-motion scroll reveals | ~25KB lib | Premium feel, storytelling | Worth it — GPU-only transforms |
| Site loader animation | ~5KB SVG | Brand identity, delight | Worth it — skipped on return |
| Gold accent line animations | ~0KB (CSS) | Polish, brand identity | Worth it — zero cost |
| Project gallery lightbox | ~15KB | Proof, engagement | Worth it — lazy loaded |
| Background SVG textures | ~3KB each | Depth, identity | Worth it — tiny, inline |

### Not Worth the Cost ❌
| Element | Cost | Value | Verdict |
|---------|------|-------|---------|
| Background video loops | 2–5MB | Ambient, low engagement | Skip — poster image instead |
| Parallax on mobile | JS overhead | Minimal visual impact | Skip — static on mobile |
| Particle effects | JS + canvas | Trendy, not brand-aligned | Skip — not architectural |
| 3D transforms | GPU heavy | Gimmicky for contractor site | Skip — use subtle 2D |
| Auto-playing carousels | JS timer | Low engagement, accessibility issue | Skip — user-controlled |
| Custom cursor | JS overhead | Novel but distracting | Skip — default cursor |
| Scroll-jacking | JS heavy | Frustrating, accessibility nightmare | Never |

### Conditionally Worth It ⚠️
| Element | Condition |
|---------|-----------|
| Instagram grid | Only if loading from cache/static, not live API on every page load |
| Google Maps embed | Only on Service Areas page, loaded on interaction |
| Chatbot | Loaded after 5s or user scroll, not on initial paint |
| Roof Designer (AI) | Separate route, fully lazy loaded |

---

## X. Performance Monitoring

### Lighthouse Targets
| Category | Desktop | Mobile |
|----------|---------|--------|
| Performance | ≥ 95 | ≥ 90 |
| Accessibility | ≥ 95 | ≥ 95 |
| Best Practices | ≥ 95 | ≥ 95 |
| SEO | ≥ 95 | ≥ 95 |

### Real-World Monitoring
- Web Vitals reported via `web-vitals` library to analytics
- Track: LCP, FID/INP, CLS, FCP, TTFB per route
- Alert threshold: any metric in "poor" range for >5% of sessions
- Test on: real mid-range Android device on 4G, not just desktop Chrome

### Performance Testing Cadence
- Pre-launch: full Lighthouse audit on all page types
- Weekly: spot-check homepage + top service page
- Monthly: full audit across all routes
- After major changes: audit affected pages before merge

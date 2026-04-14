---
name: Image, Media & Asset Optimization Strategy
description: Complete media handling for project photos, drone shots, before/after, team portraits, material closeups, icons, textures, and video with sizing, compression, naming, and display rules
type: feature
---

# Image, Media & Asset Optimization Strategy

## I. Image Categories & Specifications

### 1. Hero / Banner Images
- **Source:** Professional photography or high-quality drone shots
- **Subject:** Completed projects, mountain landscape with roofline, crew at work
- **Dimensions:** 1920×1080 (16:9) desktop, 960×640 mobile crop
- **Format:** WebP (JPEG fallback)
- **Quality:** 82-85%
- **Max size:** 250KB desktop, 120KB mobile
- **Loading:** `eager`, `fetchpriority="high"`
- **Crop guidance:** Subject centered or rule-of-thirds, sky/mountain visible, no text overlay obscuring key details
- **Mobile crop:** Tighter crop focusing on the primary subject, `object-position: center` or custom

### 2. Project Gallery Photos
- **Source:** Job site photography (DSLR or quality phone camera)
- **Subject:** Before/during/after of roofing and construction projects
- **Thumbnail:** 640×480 (4:3), WebP, 75-80% quality, max 80KB
- **Full view:** 1280×960 (4:3), WebP, 80% quality, max 180KB
- **Lightbox:** 1920×1440 (4:3), WebP, 85% quality, max 300KB
- **Loading:** Thumbnails lazy, full view on demand (lightbox open)
- **Skeleton:** Gray pulse placeholder at correct aspect ratio

### 3. Drone / Aerial Shots
- **Use:** Hero sections, project overview, "scope of work" visualization
- **Dimensions:** 1920×1080 (16:9)
- **Quality:** 85% (fine detail matters for aerial)
- **Max size:** 300KB
- **Notes:** Geotag removed for privacy, horizon leveled, color-corrected for consistency
- **Mobile:** Cropped to center subject, avoid tiny unreadable aerial views

### 4. Before/After Image Pairs
- **Requirements:** Same angle, same framing, similar lighting conditions
- **Dimensions:** 960×720 (4:3) per image
- **Quality:** 80%
- **Max size:** 120KB per image (240KB total pair)
- **Display:** Side-by-side slider on desktop, stacked with labels on mobile
- **Naming:** `project-name-before.webp` / `project-name-after.webp`
- **Labels:** "Before" / "After" overlaid on image (not separate text)

### 5. Team Portraits
- **Subject:** Individual headshots, consistent background (on-site or studio)
- **Style:** Natural, professional — not overly corporate stock-photo style
- **Dimensions:** 480×600 (4:5 portrait)
- **Quality:** 85%
- **Max size:** 60KB
- **Display:** Circle crop in grids, full frame in detail views
- **Consistency:** Same background tone, similar lighting, similar crop distance

### 6. Material Closeups / Samples
- **Subject:** Shingle textures, metal panels, cedar shake grain, color swatches
- **Dimensions:** 640×640 (1:1 square)
- **Quality:** 85% (texture detail matters)
- **Max size:** 80KB
- **Display:** Grid of swatches, tap to see larger on mobile
- **Color accuracy:** White balance calibrated, no color cast from lighting

### 7. Icons & UI Elements
- **Format:** SVG (inline) — never raster PNG/JPEG for icons
- **Style:** Consistent stroke width (1.5-2px), matching lucide-react style
- **Size:** 24×24 default, 20×20 compact, 32×32 featured
- **Color:** Use `currentColor` for theme compatibility
- **Custom icons:** Roofline silhouette, mountain contour, hammer, blueprint — SVG paths

### 8. Background Textures
- **Format:** Inline SVG in React components (BackgroundTexture.tsx)
- **Types:** MountainContours, BlueprintGrid, ArchitecturalLines, RooflinePattern, TextureOverlay
- **Size:** < 3KB each (SVG path data)
- **Opacity:** 3-10% (never visually dominant)
- **Mobile:** Hidden below 640px (except TextureOverlay noise at 1-2%)
- **Animation:** CSS-only if any (60s drift loops), no JS

### 9. Blog Content Images
- **Inline photos:** 960×540 (16:9), WebP, 80%, max 120KB
- **Infographics/diagrams:** 960×auto, WebP or SVG, max 150KB
- **Featured image:** 1280×720 (16:9), WebP, 82%, max 180KB
- **Alt text:** Descriptive, includes topic + location where authentic
- **Captions:** Below image, text-sm, muted color
- **Mobile:** Full-bleed (edge-to-edge), maintained aspect ratio

### 10. OG / Social Share Images
- **Dimensions:** 1200×630 (Facebook/LinkedIn), 1200×600 (Twitter)
- **Format:** JPEG (wider platform support than WebP)
- **Quality:** 90%
- **Content:** Brand logo + page title + hero image composite
- **Template:** Consistent layout with brand colors, readable at thumbnail size

---

## II. Naming Convention

### File Naming Pattern
```
[project-or-context]-[subject]-[variant].[ext]

Examples:
franklin-roof-replacement-front-view.webp
franklin-roof-replacement-before.webp
franklin-roof-replacement-after.webp
team-jake-morrison-portrait.webp
material-certainteed-landmark-weathered-wood.webp
hero-mountain-home-aerial.webp
blog-metal-vs-asphalt-comparison.webp
```

### Rules
- Lowercase, hyphen-separated (no spaces, no underscores)
- Descriptive: what's in the image (not DSC_0042 or image-1)
- Include town/location when authentic
- Include context (hero, blog, gallery, team, material)
- No dates in filenames (use metadata)

---

## III. Image Processing Pipeline

### Recommended Workflow
1. **Capture:** DSLR/drone at highest quality, RAW if possible
2. **Edit:** Lightroom/Photoshop — white balance, exposure, straighten horizon
3. **Export:** Full resolution JPEG (master archive, not served on web)
4. **Resize:** Generate responsive variants (640, 960, 1280, 1920px widths)
5. **Convert:** WebP at target quality per category (see specs above)
6. **Optimize:** Run through additional compression (squoosh.app or sharp)
7. **Name:** Apply naming convention
8. **Upload:** To storage bucket with organized folder structure
9. **Alt text:** Write descriptive alt text at upload time

### Folder Structure (Storage)
```
/projects/
  /franklin-smith-roof-2026/
    hero.webp
    before-front.webp
    after-front.webp
    before-rear.webp
    after-rear.webp
    detail-ridge-cap.webp
    aerial.webp
/team/
  jake-morrison.webp
  sarah-chen.webp
/materials/
  certainteed-landmark-weathered-wood.webp
  standing-seam-charcoal.webp
/blog/
  metal-vs-asphalt-hero.webp
  metal-vs-asphalt-comparison-chart.webp
/heroes/
  homepage-hero.webp
  roofing-division-hero.webp
  construction-division-hero.webp
```

---

## IV. Display Patterns

### Responsive Image Component Pattern
```tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

const OptimizedImage = ({ src, alt, width, height, priority, className, sizes }: OptimizedImageProps) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    loading={priority ? "eager" : "lazy"}
    decoding={priority ? "auto" : "async"}
    fetchPriority={priority ? "high" : undefined}
    className={`${className} transition-opacity duration-300`}
    sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
  />
);
```

### Gallery Grid Behavior
- **Desktop:** 3-column masonry, gap-4
- **Tablet:** 2-column grid, gap-3
- **Mobile:** 1-column full-width cards OR 2-column compact grid
- **Hover (desktop):** Image scale 1→1.05, overlay gradient with title
- **Tap (mobile):** Single tap reveals overlay, second tap opens lightbox
- **Lightbox:** Full-screen, swipe navigate, pinch-to-zoom, lazy-load adjacent

### Before/After Display
- **Desktop:** Horizontal slider, drag handle, 50/50 default split
- **Mobile option A:** Horizontal slider (touch-drag, large handle 40px)
- **Mobile option B:** Vertical stack with "Before" / "After" labels
- **Handle:** High contrast, centered, easy to grip on touch

---

## V. Video & Motion Assets

### Video Usage Policy
| Context | Allowed | Format | Notes |
|---------|---------|--------|-------|
| Project walk-through | Yes | MP4 H.264 | 15-30s, poster image, lazy |
| Hero background | No | — | Use high-quality still instead |
| Before/after reveal | Conditional | MP4 | Only if slider insufficient |
| Team intro | Yes | MP4 | About page only, 30-60s |
| Service explainer | No | — | Text + images more effective |
| Testimonial | No | — | Text + photo more trustworthy |

### Video Specifications
- Resolution: 1080p desktop, 720p mobile
- Codec: H.264 (MP4) primary, VP9 (WebM) enhanced
- Max file size: 5MB inline, 15MB full-page
- Poster image: required (first frame or custom still)
- Autoplay: only `muted playsinline loop` on desktop, never on mobile
- Mobile: poster + play button, user-initiated only
- Lazy load: IntersectionObserver, don't load until near viewport
- Subtitles/captions: always for accessibility

### Animation Assets (Lottie/SVG)
- Site loader: inline SVG animation, < 5KB
- Background textures: inline SVG, < 3KB each
- Micro-interactions: CSS transitions (no external animation files)
- Never use Lottie for simple interactions (CSS/framer-motion is lighter)

---

## VI. Accessibility

### Image Accessibility
- Every content image: descriptive `alt` text
- Decorative images: `alt=""` (empty, not omitted)
- Complex images (charts, diagrams): `aria-describedby` with full description
- SVG icons: `aria-hidden="true"` when adjacent to text label
- Color contrast: ensure overlaid text on images meets WCAG AA (4.5:1)
- Dark overlays on hero images: minimum 40% opacity for text readability

### Video Accessibility
- Captions for all speech content
- Transcript link for long-form video
- No auto-play with audio (ever)
- Pause/stop controls visible
- `prefers-reduced-motion`: show poster only, no autoplay

---

## VII. Performance Impact Summary

### Total Page Weight Targets (initial load)
| Resource | Homepage | Service Page | Blog Post |
|----------|----------|-------------|-----------|
| HTML | < 20KB | < 15KB | < 15KB |
| CSS | < 30KB | < 25KB | < 25KB |
| JS | < 150KB | < 120KB | < 100KB |
| Fonts | < 120KB | < 120KB | < 120KB |
| Images (above fold) | < 300KB | < 250KB | < 200KB |
| **Total initial** | **< 620KB** | **< 530KB** | **< 460KB** |
| Images (full page) | < 1.2MB | < 800KB | < 600KB |

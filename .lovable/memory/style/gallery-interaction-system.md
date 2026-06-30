---
name: Gallery & Image Interaction System
description: Premium lightbox with keyboard/swipe/zoom, gallery cards with hover reveals, before/after slider with handle pulse, mobile gestures
type: design
---

# Gallery & Image Interaction System

## PremiumLightbox (`src/components/gallery/PremiumLightbox.tsx`)
- Keyboard: Escape close, ←/→ navigate, I toggle info, Z toggle zoom
- Swipe: Horizontal swipe navigate, vertical swipe-down close
- Zoom: Click image to toggle zoom mode (desktop only)
- Thumbnail strip at bottom (desktop)
- Info panel: slides in from right, can toggle with I key
- Mobile: simplified — swipe hint text, info overlaid at bottom
- AnimatePresence transitions between slides with scale+opacity

## GalleryCard (`src/components/gallery/GalleryCard.tsx`)
- Uses `card-premium` + `tartan-hover` classes
- Image uses `img-zoom` + initial scale 1.06 → 1 whileInView
- Hover reveals: gradient overlay, location/duration strip, zoom icon
- Highlight badge uses `proof-card-outcome` max-height reveal

## Gallery Page
- Filter pills with `btn-ghost-interactive`
- `ArchitecturalLines` background on grid section
- `MountainContours` on hero + storytelling dark sections
- `TextureOverlay` noise grain on CTA strip

## FeaturedProjects (Homepage)
- `ArchitecturalLines` subtle background
- Featured project gets `md:col-span-2` with 16/7 aspect
- Outcome text uses `proof-card-outcome` hover reveal
- Arrow icon appears on hover in bottom-right

## Mobile Behavior
- Swipe gestures with 50px threshold, vertical 120px to close
- Drag motion value creates opacity feedback during swipe
- No zoom on mobile (tap instead of click)
- Simplified info panel overlaid on image bottom

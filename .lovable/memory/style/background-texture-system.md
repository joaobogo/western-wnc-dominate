---
name: Background Motion & Texture System
description: Animated depth layers — mountain contours, blueprint grids, architectural lines, roofline patterns, noise overlay — division-aware, mobile-scaled
type: design
---

# Background Motion & Texture System

## Components (`src/components/motion/BackgroundTexture.tsx`)

### MountainContours
- Two SVG ridgeline paths with parallax scroll offsets
- `variant`: "light" (green stroke) or "dark" (cream stroke)
- Mobile: reduced parallax distances (-8px vs -20px)
- Positioned absolute bottom of section

### BlueprintGrid
- Fine 60px grid + accent 180px grid overlay
- Animated scroll parallax on the grid layer
- `variant`: "light" or "dark", `animated`: boolean
- Used on TrustAndProof, construction sections

### ArchitecturalLines
- Diagonal repeating lines (135° or 45°)
- Subtle scroll-driven rotation (±2° desktop, ±1° mobile)
- `direction`: "left" | "right"
- Used on Gallery grid, FeaturedProjects

### RooflinePattern
- Repeating SVG roof peak shapes
- Static overlay (no animation) for roofing sections
- Best at very low opacity (0.03)

### TextureOverlay
- SVG noise/grain texture with `mix-blend-overlay`
- Adds subtle material depth to solid-color sections
- Used on CTA strips, hero sections

## Usage Rules
- Always `position: relative; overflow: hidden` on parent section
- Content must have `relative z-10` to sit above textures
- Opacity range: 0.012–0.04 (never higher)
- Mobile: parallax distances halved via `useIsMobile()`
- Division context: use `variant="dark"` on `section-dark` sections

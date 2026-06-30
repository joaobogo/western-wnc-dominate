---
name: Construction Visual System
description: Blueprint textures, gold accents, architectural cards, and field styles that distinguish Construction from Roofing
type: design
---

# Construction Division Visual System

## Visual Distinction: Roofing vs Construction

| Aspect | Roofing | Construction |
|--------|---------|-------------|
| Accent color | Heritage green (`--heritage-green`) | Highland gold (`--highland-gold`) |
| Texture | `tartan-bg` / `tartan-dark` | `blueprint-bg` / `blueprint-dark` |
| Card class | `card-premium` (left gold accent) | `card-construction` (bottom gold line) |
| Corner detail | `hover-brackets` (small) | `arch-corners` (larger, 20px) |
| Field focus | `field-premium` (gold ring) | `field-construction` (gold ring, warmer) |
| CTA gradient | `cta-gradient` | `cta-construction` (warmer gold) |
| Tone | Performance-driven, weather-aware | Architectural, lifestyle, project-driven |
| Form container | `interaction-quote` | `interaction-construction` |

## CSS Classes (index.css)

| Class | Purpose |
|-------|---------|
| `blueprint-bg` | Gold grid pattern, 48px spacing (light sections) |
| `blueprint-dark` | Gold grid + major lines at 192px (dark sections) |
| `card-construction` | Bottom gold line reveal on hover, lift |
| `arch-corners` | 20px gold corner brackets on hover |
| `section-construction` | Warm-tinted light bg (`hsl(38 18% 95%)`) |
| `section-construction-dark` | Warmer dark bg (`hsl(30 10% 9%)`) |
| `field-construction` | Gold focus ring for construction form fields |
| `cta-construction` | Warmer gold gradient CTA |
| `ruler-marks` | Left-edge measurement marks (architectural) |
| `interaction-construction` | Card container with gold focus-within border |

## Division Theme (`division-theme.ts`)

Extended with: `textureBg`, `textureDark`, `cardClass`, `fieldClass`, `tone`

## Lead Flow

- `/construction/consultation` — Dedicated 8-step flow
- Steps: Project Type → Goals (multi-select) → Plans status → Budget → Timeline → Location → Vision → Contact
- Gold-themed progress, `arch-corners` on cards, `cta-construction` submit button
- All construction CTAs default to `/construction/consultation`

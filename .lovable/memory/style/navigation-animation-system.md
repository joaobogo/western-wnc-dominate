---
name: Navigation Animation System
description: Premium header scroll behavior, dropdown animations, mobile panel motion, active state indicators, CTA shimmer effects
type: design
---

# Navigation Animation System

## Header Scroll Behavior
- `useMotionValueEvent` tracks scroll direction — hides on scroll-down past 200px, reveals on scroll-up
- Heritage top bar collapses with height+opacity animation on scroll
- Logo smoothly scales from 46px to 34px
- Background transitions from transparent border to `backdrop-blur-xl` + shadow
- Uses `HIGHLAND_EASE` for all transitions

## Desktop Dropdowns
- `motion.div` with `scale: 0.97 → 1`, `y: 10 → 0` entry
- Gold top accent line inside panel
- Dropdown items stagger-animate with `dropdownItemVariants` (x: -8 → 0, 0.03s stagger)
- Items use `dropdown-item-premium` class (gold left-border draw on hover)
- 120ms leave delay prevents flicker

## Active State System
- `layoutId="nav-active"` creates shared gold underline that slides between nav items
- Active links get `bg-secondary/50` background
- Mobile: gold dot indicator next to active labels
- Dropdown items highlight with `bg-secondary/60` when active

## Mobile Menu
- Backdrop overlay with blur on open
- Body scroll locked when open
- Items stagger from left (x: -20 → 0, 0.04s stagger per item)
- Sub-menus have gold left border line
- Sub-menu items stagger within (0.03s each)
- CTA block enters last with y: 12 → 0
- Menu closes on route change via `useLocation` effect

## Hamburger Icon
- Animated swap with rotation + scale: Menu rotates 90° out, X rotates -90° in
- `active:scale-90` press feedback

## CTA Button
- Uses `btn-primary-interactive` (shimmer sweep + scale feedback)
- Arrow uses `btn-arrow-icon` (translateX on hover)

## Mobile Bottom Bar (StickyMobileCTA)
- Springs in from y:100 with HIGHLAND_EASE
- Quote button has subtle pulse dot attention indicator
- `active:scale-95` press feedback on all items
- Elevated shadow for depth

## Desktop Floating Trigger
- Enters with y:20, scale:0.95 → normal
- `whileHover/whileTap` scale feedback
- Expanded panel uses same dropdown animation pattern
- Items use `dropdown-item-premium` class
- Gold top accent line on panel

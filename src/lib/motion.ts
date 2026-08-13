/**
 * Motion language — one system for the whole site.
 *
 * Rules (docs/design-tokens.md · Motion):
 *  1. Interface transitions: 200–400ms, ease-out.
 *  2. Section entrances: subtle fade-and-rise (opacity + 16px), once only.
 *  3. Never animate the LCP element or anything that delays reading the hero.
 *  4. prefers-reduced-motion is respected globally (CSS kill-switch + MotionConfig).
 */

export const DURATION = {
  fast: 0.2,
  base: 0.3,
  slow: 0.4,
} as const;

/** Standard ease-out curve. Used for every interface transition. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EASE_OUT = [0.16, 1, 0.3, 1] as any;

/** Section entrance: subtle fade-and-rise, plays once when scrolled into view. */
export const fadeRise = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: DURATION.slow, ease: EASE_OUT },
} as const;

/** Same entrance, staggered for grids/lists. Cap the index so late items never lag. */
export const fadeRiseStagger = (index: number, step = 0.05) => ({
  ...fadeRise,
  transition: {
    duration: DURATION.slow,
    ease: EASE_OUT,
    delay: Math.min(index, 4) * step,
  },
});

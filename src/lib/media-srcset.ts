/**
 * Responsive sources for the self-hosted photos in public/media (P5.1).
 *
 * scripts/generate-hero-renditions.mjs guarantees that every master
 * /media/<name>.{webp,jpg,jpeg,png} has a WebP twin plus -640 and -960
 * renditions, so these helpers can build a srcset without touching the
 * filesystem. Anything outside /media (bundled /assets, remote URLs) is
 * returned untouched with no srcset.
 */

const MEDIA_MASTER = /^(\/media\/[A-Za-z0-9._-]+?)\.(webp|jpe?g|png)$/i;

/** Widest rendition — the masters are 1600px wide. */
export const MEDIA_MASTER_WIDTH = 1600;

/** Full-bleed heroes: the image spans the viewport on every breakpoint. */
export const HERO_SIZES = "100vw";

/** The WebP master for a /media path (or the path unchanged when it is not a /media master). */
export const mediaWebp = (src: string): string => {
  const m = src.match(MEDIA_MASTER);
  return m ? `${m[1]}.webp` : src;
};

/** "…-640.webp 640w, …-960.webp 960w, ….webp 1600w" for a /media master; undefined otherwise. */
export const mediaSrcSet = (src: string): string | undefined => {
  const m = src.match(MEDIA_MASTER);
  if (!m || /-(640|960)$/.test(m[1])) return undefined;
  return `${m[1]}-640.webp 640w, ${m[1]}-960.webp 960w, ${m[1]}.webp ${MEDIA_MASTER_WIDTH}w`;
};

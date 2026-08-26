/**
 * Per-route Open Graph image helpers.
 *
 * `scripts/generate-og-images.ts` writes one 1200×630 card per prerendered
 * route to `dist/og/<slug>.png` using the exact same slug function, so the
 * URL emitted here always resolves. Routes without a card fall back to
 * /og-image.jpg via the `/og/*` rewrite in public/_redirects.
 */

export const OG_FALLBACK = "/og-image.jpg";

/** "/roofing/metal/cost" → "roofing-metal-cost"; "/" → "home". */
export const ogSlug = (path: string): string => {
  const clean = path.split("?")[0].split("#")[0].replace(/\/+$/, "");
  if (!clean || clean === "/") return "home";
  return clean
    .replace(/^\//, "")
    .replace(/\//g, "-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-");
};

/** Absolute per-route OG image URL. */
export const ogImageForPath = (path: string, baseUrl: string): string =>
  `${baseUrl}/og/${ogSlug(path)}.png`;

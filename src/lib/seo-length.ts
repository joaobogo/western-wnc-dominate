/**
 * SERP length normalization.
 *
 * Google truncates page titles beyond roughly 60 characters and meta
 * descriptions beyond roughly 160. Every route funnels its title and
 * description through these helpers in SEOHead, so no page can ship a
 * truncated snippet regardless of what the page author passed in.
 *
 * Rules:
 *  - the long brand suffix "| Highlander Building Services" collapses to
 *    "| Highlander"
 *  - the primary keyword (the first segment of the title) is never dropped,
 *    and neither is the brand suffix; the middle segments go first
 *  - descriptions keep whole leading sentences and are cut from the end
 */

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;
export const DESCRIPTION_TARGET = 155;

const BRAND_SHORT = "Highlander";
const SEPARATOR = " | ";

const BRAND_LONG_PATTERNS = [
  /Highlander Building Services,?\s*Inc\.?/gi,
  /Highlander Building Services/gi,
];

/** Collapse any long brand form in a title down to the short "Highlander". */
const shortenBrand = (title: string): string => {
  let out = title;
  for (const pattern of BRAND_LONG_PATTERNS) out = out.replace(pattern, BRAND_SHORT);
  return out.replace(/\s{2,}/g, " ").trim();
};

/** Hard cut at a word boundary, never mid-word, never leaving punctuation. */
const cutAtWord = (text: string, max: number): string => {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const base = lastSpace > max * 0.5 ? slice.slice(0, lastSpace) : slice;
  return base.replace(/[\s,;:|–—-]+$/, "").trim();
};

/**
 * Normalize a page title to ≤60 characters with the primary keyword in front.
 * Middle segments are dropped before the leading keyword is ever shortened.
 */
export const normalizeTitle = (rawTitle: string, max = TITLE_MAX): string => {
  const title = shortenBrand(rawTitle || "").trim();
  if (title.length <= max) return title;

  const segments = title.split(/\s*\|\s*/).filter(Boolean);

  if (segments.length > 1) {
    const head = segments[0];
    const tail = segments[segments.length - 1];

    // Drop middle segments from the end inward until it fits.
    for (let keep = segments.length - 2; keep >= 0; keep--) {
      const candidate = [...segments.slice(0, keep + 1), tail].join(SEPARATOR);
      if (candidate.length <= max) return candidate;
    }

    // Head + brand still too long. The subject (with its town/service name)
    // outranks the brand suffix, so drop the brand and give the head the
    // whole budget rather than truncating away what makes the title unique.
    return cutAtWord(head, max);
  }

  return cutAtWord(title, max);
};

/**
 * Normalize a meta description to ≤155 characters, keeping whole leading
 * sentences and cutting from the end.
 */
export const normalizeDescription = (
  rawDescription: string,
  max = DESCRIPTION_MAX,
  target = DESCRIPTION_TARGET,
): string => {
  const description = (rawDescription || "").replace(/\s{2,}/g, " ").trim();
  if (description.length <= max) return description;

  const sentences = description.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) ?? [description];
  let out = "";
  for (const sentence of sentences) {
    const next = (out + sentence).trimEnd();
    if (next.length > target) break;
    out = next;
  }

  if (out.length >= 60) return out.trim();

  // First sentence alone overruns the budget — cut it at a word boundary.
  return cutAtWord(description, target);
};

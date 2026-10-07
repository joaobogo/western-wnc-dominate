/**
 * SERP length normalization.
 *
 * Google truncates page titles beyond roughly 60 characters and meta
 * descriptions beyond roughly 160. Every route funnels its title and
 * description through these helpers in SEOHead, so no page can ship a
 * truncated snippet regardless of what the page author passed in.
 *
 * Rules:
 *  - the long brand suffix "| Highlander Building Services" is always
 *    rewritten to the single standard suffix "| Highlander" (decided 8 Oct
 *    2026; the long form leaves no room for the keyword)
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

/**
 * Collapse any long brand form in a title down to the short "Highlander".
 *
 * Applied ONLY when the title would otherwise break the 60-character budget
 * (H1, 15 Sep 2026): the full name disambiguates the brand from Highlands NC
 * and from Highland Roofing Company, so it is kept wherever there is room.
 */
const shortenBrand = (title: string): string => {
  let out = title;
  for (const pattern of BRAND_LONG_PATTERNS) out = out.replace(pattern, BRAND_SHORT);
  return out.replace(/\s{2,}/g, " ").trim();
};

/** The one title suffix: "| Highlander". The long form never fits next to a real keyword. */
const TRAILING_BRAND = /\s*\|\s*Highlander Building Services(?:,?\s*Inc\.?)?\s*$/i;

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
  // One suffix everywhere: "| Highlander". Overflowing titles drop middle segments, never the keyword.
  const raw = (rawTitle || "").replace(/\s{2,}/g, " ").trim().replace(TRAILING_BRAND, `${SEPARATOR}${BRAND_SHORT}`);
  const finish = (t: string) => t;
  if (raw.length <= max) return finish(raw);
  const title = shortenBrand(raw);
  if (title.length <= max) return finish(title);

  const segments = title.split(/\s*\|\s*/).filter(Boolean);

  if (segments.length > 1) {
    const head = segments[0];
    const tail = segments[segments.length - 1];

    // Drop middle segments from the end inward until it fits.
    for (let keep = segments.length - 2; keep >= 0; keep--) {
      const candidate = [...segments.slice(0, keep + 1), tail].join(SEPARATOR);
      if (candidate.length <= max) return finish(candidate);
    }

    // Head + brand still too long. The subject (with its town/service name)
    // outranks the brand suffix, so drop the brand and give the head the
    // whole budget rather than truncating away what makes the title unique.
    return cutAtWord(head, max);
  }

  return cutAtWord(title, max);
};

/** Em and en dashes read as machine-written; use a colon or comma instead. */
const removeDashes = (text: string): string => {
  let first = true;
  return text.replace(/\s*[—–]\s*/g, () => {
    const sep = first ? ": " : ", ";
    first = false;
    return sep;
  });
};

const DESCRIPTION_MIN = 110;

/**
 * Normalize a meta description to <=155 characters. Whole leading sentences
 * are kept; when that leaves a thin snippet, the next sentence is trimmed at
 * its last clause boundary so the result still ends cleanly.
 */
export const normalizeDescription = (
  rawDescription: string,
  max = DESCRIPTION_MAX,
  target = DESCRIPTION_TARGET,
): string => {
  const description = removeDashes((rawDescription || "").replace(/\s{2,}/g, " ").trim());
  if (description.length <= max) return description;

  const sentences = description.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) ?? [description];
  let out = "";
  for (const sentence of sentences) {
    const next = (out + sentence).trimEnd();
    if (next.length > target) break;
    out = next;
  }
  if (out.length >= DESCRIPTION_MIN) return out.trim();

  // Cut the text at the last clause boundary that fits and close it with a period.
  const window = description.slice(0, target + 1);
  const clause = Math.max(window.lastIndexOf(", "), window.lastIndexOf("; "), window.lastIndexOf(": "));
  if (clause >= DESCRIPTION_MIN) return `${window.slice(0, clause).replace(/[\s,;:]+$/, "")}.`;
  if (out.length >= 60) return out.trim();

  const cut = cutAtWord(description, target - 1).replace(/\b(and|or|with|for|the|a|an|of|to|in)$/i, "").trim();
  return /[.!?]$/.test(cut) ? cut : `${cut}.`;
};

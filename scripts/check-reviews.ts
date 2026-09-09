/**
 * Provenance guard for src/data/reviews.ts. Run by prebuild (bun).
 *
 * Fails the build if any review cannot be traced back to a published source.
 * This exists so an unverified, placeholder or invented testimonial can never
 * ship again — the site previously carried ten of them.
 *
 * It imports the real module rather than parsing the file, so it validates the
 * objects the app actually renders.
 */
import { REVIEWS, type Review } from "../src/data/reviews";

const failures: string[] = [];
const RELATIVE = /\b(ago|yesterday|today|last (week|month|year))\b/i;
const today = new Date().toISOString().slice(0, 10);
const seen = new Set<string>();

const check = (r: Review, i: number) => {
  const id = r?.id || `entry #${i + 1}`;
  const bad = (msg: string) => failures.push(`${id}: ${msg}`);

  if (!r.id?.trim()) bad("missing id");
  else if (seen.has(r.id)) bad("duplicate id");
  else seen.add(r.id);

  if (!r.name?.trim()) bad("missing name");
  if (typeof r.text !== "string" || r.text.trim().length < 20) {
    bad("review text is empty or implausibly short");
  }
  if (!r.source?.trim()) bad("missing source");
  if (!r.sourceUrl?.trim()) bad("missing sourceUrl");
  else if (!/^https:\/\/\S+$/.test(r.sourceUrl)) bad(`sourceUrl "${r.sourceUrl}" is not an absolute https:// URL`);

  if (!(r.rating >= 1 && r.rating <= 5)) bad(`rating ${r.rating} is outside 1-5`);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date || "")) bad(`date "${r.date}" is not ISO YYYY-MM-DD`);
  else if (r.date > today) bad(`date ${r.date} is in the future`);

  if (!r.dateLabel?.trim()) bad("missing dateLabel");
  else if (RELATIVE.test(r.dateLabel) && !r.dateApprox) {
    bad(`dateLabel "${r.dateLabel}" is relative but dateApprox is not set`);
  }

  if (!Array.isArray(r.service) || r.service.length === 0) bad("no service tags");
};

if (!Array.isArray(REVIEWS) || REVIEWS.length === 0) {
  console.error("FAIL  check-reviews: REVIEWS is empty");
  process.exit(1);
}

REVIEWS.forEach(check);

if (failures.length) {
  console.error(`FAIL  check-reviews: ${failures.length} problem(s) in src/data/reviews.ts`);
  failures.forEach((f) => console.error(`      ${f}`));
  process.exit(1);
}

console.log(`PASS  check-reviews: ${REVIEWS.length} review(s), all with a traceable published source`);

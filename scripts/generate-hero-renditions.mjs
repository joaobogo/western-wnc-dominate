#!/usr/bin/env node
/**
 * P5.1 — WebP twins + responsive renditions for every master photo in public/media.
 *
 * The town / service×town / blog heroes are the LCP image on their pages and
 * were shipped as 1600px masters (often JPEG) to phones. For every master
 * (<name>.webp|jpg|jpeg|png that is not itself a -640/-960 rendition) this
 * guarantees three files exist next to it:
 *
 *   <name>.webp        (converted from the JPEG/PNG when missing)
 *   <name>-640.webp    (phones)
 *   <name>-960.webp    (large phones / small tablets)
 *
 * src/lib/media-srcset.ts relies on this invariant to build srcsets without
 * checking the filesystem at runtime. Idempotent — existing files are kept.
 *
 *   node scripts/generate-hero-renditions.mjs
 */
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const MEDIA = path.resolve(process.cwd(), "public/media");
const WIDTHS = [640, 960];
const QUALITY = 78;

const files = readdirSync(MEDIA);
const masters = files.filter((f) => /\.(webp|jpe?g|png)$/i.test(f) && !/-(640|960)\.webp$/.test(f));

let twins = 0;
let renditions = 0;
const seen = new Set();
for (const file of masters) {
  const base = file.replace(/\.(webp|jpe?g|png)$/i, "");
  if (seen.has(base)) continue; // a .jpg and its .webp twin share one base
  seen.add(base);
  const source = path.join(MEDIA, file);
  const webpMaster = path.join(MEDIA, `${base}.webp`);
  if (!existsSync(webpMaster)) {
    await sharp(source).webp({ quality: 82 }).toFile(webpMaster);
    twins += 1;
  }
  for (const w of WIDTHS) {
    const out = path.join(MEDIA, `${base}-${w}.webp`);
    if (existsSync(out)) continue;
    await sharp(webpMaster).resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(out);
    renditions += 1;
  }
}
console.log(`media renditions: ${seen.size} masters — ${twins} WebP twin(s) and ${renditions} rendition(s) written (${WIDTHS.join("/")}px).`);

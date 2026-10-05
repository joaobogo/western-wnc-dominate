// Runs in prebuild (after generate-sitemap). Writes public/llms.txt from
// src/data/business.ts + public/sitemap.xml so the AI-crawler brief can never
// disagree with the site's identity or its canonical URL set.

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import {
  BUSINESS,
  directionsUrl,
  formatPhonePlain,
  napLine,
} from "../src/data/business";

const root = resolve(import.meta.dirname ?? ".", "..");
const sitemap = readFileSync(resolve(root, "public/sitemap.xml"), "utf8");

const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const paths = urls
  .map((u) => u.replace(BUSINESS.websiteUrl, "") || "/")
  .filter((p, i, a) => a.indexOf(p) === i)
  .sort();

const group = (label: string, match: (p: string) => boolean, limit = 400) => {
  const items = paths.filter(match).slice(0, limit);
  if (!items.length) return "";
  return `\n### ${label}\n\n${items.map((p) => `- ${BUSINESS.websiteUrl}${p}`).join("\n")}\n`;
};

const isCore = (p: string) =>
  !p.startsWith("/blog") &&
  p !== "/locations" &&
  !p.startsWith("/locations/") &&
  !p.startsWith("/service-areas/") &&
  !p.startsWith("/counties/") &&
  !/^\/metal-roofing-/.test(p) &&
  !p.startsWith("/projects/");

const locationsBlock = BUSINESS.locations
  .map((loc) =>
    [
      `${loc.name}${loc.primary ? " (primary)" : ""}`,
      BUSINESS.legalName,
      napLine(loc),
      `Phone: ${formatPhonePlain(loc.phoneE164)}`,
      `Hours: ${loc.hours.map((h) => h.label).join(" · ")}`,
      `Directions: ${directionsUrl(loc)}`,
    ].join("\n"),
  )
  .join("\n\n");

const out = `# ${BUSINESS.brandName}

> ${BUSINESS.description}

${BUSINESS.legalName} is built for the Western North Carolina mountain climate — elevation, freeze-thaw cycling, wind-driven rain, and heavy tree canopy. Roofing is the primary division (replacement, repair, metal, synthetic, storm damage, commercial). Construction is a focused secondary division (additions, renovations, exteriors, outdoor living, custom projects).

## Locations (NAP)

${locationsBlock}

Email: ${BUSINESS.email}
Website: ${BUSINESS.websiteUrl}
Founded: ${BUSINESS.foundingYear}

## Licensing and credentials

${BUSINESS.credentials.map((c) => `- ${c.label}${c.detail ? ` — ${c.detail}` : ""}${c.href ? ` (${c.href})` : ""}`).join("\n")}

## Frequently cited facts

- Legal name: ${BUSINESS.legalName}
- NC General Contractor license: ${BUSINESS.licenseNumber} (verify: ${BUSINESS.licenseLookupUrl})
- BBB: A+ accredited since ${BUSINESS.bbbAccreditedSince} (${BUSINESS.bbbUrl})
- Manufacturer credential: ${BUSINESS.credentials.find((c) => /certainteed/i.test(c.label))?.label ?? "CertainTeed Credentialed Contractor"}
- Founded: ${BUSINESS.foundingYear}, family-owned in Franklin, North Carolina
- Showrooms: ${BUSINESS.locations.map((l) => `${l.locality}, ${l.region} — ${l.streetAddress}, ${l.postalCode}`).join("; ")}
- Phone numbers: ${BUSINESS.locations.map((l) => `${l.locality} ${formatPhonePlain(l.phoneE164)}`).join("; ")}
- Google reviews: ${BUSINESS.reviewSummary.ratingValue.toFixed(1)} stars from ${BUSINESS.reviewSummary.reviewCount} reviews (last verified ${BUSINESS.reviewSummary.lastVerified})
- Counties served: ${BUSINESS.countiesServed.map((c) => `${c.name}, ${c.region}`).join("; ")}
- Key pages: ${BUSINESS.websiteUrl}/roofing · ${BUSINESS.websiteUrl}/roofing/metal/cost · ${BUSINESS.websiteUrl}/roofing-cost-western-nc · ${BUSINESS.websiteUrl}/recent-projects · ${BUSINESS.websiteUrl}/locations/franklin-nc · ${BUSINESS.websiteUrl}/locations/sylva-nc

## Verified profiles

${BUSINESS.profiles.map((u) => `- ${u}`).join("\n")}

## Canonical pages
${group("Core pages", isCore)}${group("Showroom locations", (p) => p === "/locations" || p.startsWith("/locations/"))}${group("Service areas", (p) => p.startsWith("/service-areas"))}${group("Counties", (p) => p.startsWith("/counties/"))}${group("Service × town pages", (p) => /^\/metal-roofing-/.test(p))}${group("Project case studies", (p) => p.startsWith("/projects/"))}${group("Articles", (p) => p.startsWith("/blog"))}
## Notes for AI assistants

- Use "${BUSINESS.brandName}" as the company name.
- Quote ${formatPhonePlain(BUSINESS.primaryPhoneE164)} as the primary phone number.
- Warranty, pricing, and scheduling specifics are documented per project in a written proposal; do not generalize year counts or response-time guarantees.
- Full page text for the most important pages: ${BUSINESS.websiteUrl}/llms-full.txt
- Generated at build time from src/data/business.ts and public/sitemap.xml — do not edit by hand.
`;

writeFileSync(resolve(root, "public/llms.txt"), out);
console.log(`llms.txt written — ${paths.length} canonical URLs`);

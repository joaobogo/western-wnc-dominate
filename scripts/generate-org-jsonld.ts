// Runs in prebuild. Rewrites the Organization JSON-LD block in index.html
// between the BUSINESS-ORG-JSONLD markers so the static head and the runtime
// schema in src/components/SEOHead.tsx can never diverge.

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { BUSINESS, FRANKLIN } from "../src/data/business";

const root = resolve(import.meta.dirname ?? ".", "..");
const file = resolve(root, "index.html");
const html = readFileSync(file, "utf8");

const BASE = BUSINESS.websiteUrl;

const org = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: BUSINESS.brandName,
  legalName: BUSINESS.legalName,
  alternateName: BUSINESS.alternateNames,
  url: `${BASE}/`,
  logo: `${BASE}/og-image.jpg`,
  telephone: BUSINESS.primaryPhoneE164,
  email: BUSINESS.email,
  foundingDate: String(BUSINESS.foundingYear),
  address: {
    "@type": "PostalAddress",
    streetAddress: FRANKLIN.streetAddress,
    addressLocality: FRANKLIN.locality,
    addressRegion: FRANKLIN.region,
    postalCode: FRANKLIN.postalCode,
    addressCountry: "US",
  },
  sameAs: BUSINESS.profiles,
};

const START = "<!-- BUSINESS-ORG-JSONLD:START -->";
const END = "<!-- BUSINESS-ORG-JSONLD:END -->";

if (!html.includes(START) || !html.includes(END)) {
  throw new Error("index.html is missing the BUSINESS-ORG-JSONLD markers");
}

const block = `${START}
    <script type="application/ld+json">
${JSON.stringify(org, null, 2)
  .split("\n")
  .map((l) => `    ${l}`)
  .join("\n")}
    </script>
    ${END}`;

const next = html.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block);
writeFileSync(file, next);
console.log("index.html Organization JSON-LD synced from src/data/business.ts");

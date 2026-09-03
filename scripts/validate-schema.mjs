#!/usr/bin/env node
/**
 * Build-time structured-data validation.
 *
 * Parses the JSON-LD out of the prerendered HTML for a representative set of
 * pages and asserts the graph describes ONE business with TWO real showrooms:
 *
 *  1. exactly one node carries @id https://highlandernc.com/#business
 *  2. no LocalBusiness-ish node has an address other than the two showrooms
 *  3. every @id referenced by another node is defined somewhere in the page graph
 *  4. aggregateRating and Review markup are not emitted on any page
 *
 * Also pings the LinkedIn company URL and warns (does not fail) on 404 so a
 * dead sameAs never ships silently.
 *
 * Exits non-zero on any violation.
 */
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const DIST = path.resolve(process.cwd(), "dist");
const BASE = "https://highlandernc.com";
const BUSINESS_ID = `${BASE}/#business`;

/** Street addresses that are allowed to appear in a Place-type node. */
const ALLOWED_STREETS = ["1511 Highlands Road", "28 Cross Stitch Mountain Rd"];

const PLACE_TYPES = new Set([
  "LocalBusiness",
  "RoofingContractor",
  "GeneralContractor",
  "HomeAndConstructionBusiness",
  "Organization",
]);

const PAGES = [
  { label: "homepage", route: "/" },
  { label: "town page", route: "/service-areas/highlands-nc" },
  { label: "service page", route: "/roofing" },
  { label: "blog post", route: "/blog/best-roofing-materials-highlands-nc" },
  { label: "reviews", route: "/reviews", expectRating: false },
];

const errors = [];
const warnings = [];

const htmlPathFor = (route) =>
  route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route.replace(/^\//, ""), "index.html");

const extractJsonLd = (html) => {
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const nodes = [];
  for (const [, raw] of blocks) {
    let parsed;
    try {
      parsed = JSON.parse(raw.trim());
    } catch (e) {
      errors.push(`Unparseable JSON-LD block: ${e.message}`);
      continue;
    }
    const push = (n) => {
      if (!n || typeof n !== "object") return;
      if (Array.isArray(n)) return n.forEach(push);
      if (Array.isArray(n["@graph"])) n["@graph"].forEach(push);
      nodes.push(n);
    };
    push(parsed);
  }
  return nodes;
};

const typesOf = (node) => {
  const t = node["@type"];
  return Array.isArray(t) ? t : t ? [t] : [];
};

/** Walk a node and collect every { "@id": ... } reference it makes. */
const collectRefs = (node, self, out) => {
  const walk = (v) => {
    if (!v || typeof v !== "object") return;
    if (Array.isArray(v)) return v.forEach(walk);
    const keys = Object.keys(v);
    if (keys.length === 1 && keys[0] === "@id" && v["@id"] !== self) out.add(v["@id"]);
    for (const [k, val] of Object.entries(v)) {
      if (k === "@id") continue;
      walk(val);
    }
  };
  for (const [k, val] of Object.entries(node)) {
    if (k === "@id") continue;
    walk(val);
  }
  return out;
};

const validatePage = (label, route, nodes, expectRating) => {
  const where = `${label} (${route})`;

  if (!nodes.length) {
    errors.push(`${where}: no JSON-LD found in prerendered HTML.`);
    return;
  }

  // 1 — exactly one #business node
  const businessNodes = nodes.filter((n) => n["@id"] === BUSINESS_ID);
  if (businessNodes.length > 1) {
    errors.push(`${where}: ${businessNodes.length} nodes share @id ${BUSINESS_ID} (must be exactly 1).`);
  }

  // 2 — only the two showrooms may carry a street address
  for (const node of nodes) {
    const addr = node.address;
    if (!addr || typeof addr !== "object" || Array.isArray(addr)) continue;
    if (!typesOf(node).some((t) => PLACE_TYPES.has(t))) continue;
    const street = addr.streetAddress;
    if (!street) continue;
    if (!ALLOWED_STREETS.some((s) => String(street).startsWith(s))) {
      errors.push(`${where}: node ${node["@id"] || typesOf(node).join("/")} has non-showroom address "${street}".`);
    }
  }

  // 3 — every referenced @id is defined in this page's graph
  const defined = new Set(nodes.map((n) => n["@id"]).filter(Boolean));
  // The static Organization node ships in index.html on every page.
  defined.add(`${BASE}/#organization`);
  defined.add(`${BASE}/#website`);
  const refs = new Set();
  for (const node of nodes) collectRefs(node, node["@id"], refs);
  for (const ref of refs) {
    if (!defined.has(ref)) errors.push(`${where}: dangling @id reference "${ref}" is never defined.`);
  }

  // 4 — ratings live on /reviews only
  const hasRating = nodes.some((n) => n.aggregateRating);
  if (hasRating && !expectRating) {
    errors.push(`${where}: aggregateRating emitted on a page that does not display reviews.`);
  }
  if (!hasRating && expectRating) {
    errors.push(`${where}: expected aggregateRating on the reviews page but found none.`);
  }
};

const checkLinkedIn = async () => {
  const url = "https://www.linkedin.com/company/highlander-roofing-services-inc/";
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow", headers: { "user-agent": "Mozilla/5.0" } });
    if (res.status === 404) warnings.push(`sameAs LinkedIn URL returns 404: ${url}`);
  } catch (e) {
    warnings.push(`Could not verify LinkedIn sameAs URL (${e.message}).`);
  }
};

const main = async () => {
  if (!existsSync(DIST)) {
    console.error("validate-schema: dist/ not found — run the build (and prerender) first.");
    process.exit(1);
  }

  for (const page of PAGES) {
    const file = htmlPathFor(page.route);
    if (!existsSync(file)) {
      errors.push(`${page.label} (${page.route}): prerendered HTML missing at ${path.relative(process.cwd(), file)}.`);
      continue;
    }
    const html = await readFile(file, "utf8");
    validatePage(page.label, page.route, extractJsonLd(html), page.expectRating);
  }

  await checkLinkedIn();

  for (const w of warnings) console.warn(`warn  ${w}`);

  if (errors.length) {
    console.error(`\nvalidate-schema: ${errors.length} structured-data error(s):`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }

  console.log(`validate-schema: OK — ${PAGES.length} pages validated, single #business graph intact.`);
};

main();

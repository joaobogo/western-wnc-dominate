#!/usr/bin/env node
/**
 * Build-time structured-data validation.
 *
 * Two passes over the prerendered HTML in dist/:
 *
 * A. EVERY page (dist/index.html + dist/**\/<route>.html): parse every JSON-LD
 *    block and FAIL on
 *      - a block that is not valid JSON
 *      - aggregateRating or a Review node on any route other than /reviews
 *        (self-serving review markup is ineligible for rich results and a
 *        policy risk; /reviews may carry it only while the same rating and the
 *        same reviews are visible on the page)
 *      - a LocalBusiness / RoofingContractor / GeneralContractor /
 *        HomeAndConstructionBusiness / Organization node whose street address
 *        is not one of the two showrooms declared in src/data/business.ts
 *      - (P3.7) a FAQPage whose Question.name is not readable in the page's
 *        visible text (closed accordion triggers count; JSON-LD does not), a
 *        FAQPage with no questions, or a FAQPage on a page with no visible Q&A
 *
 * B. A representative set of pages, deeper: exactly one node carries
 *    @id https://highlandernc.com/#business, and every @id referenced by another
 *    node is defined somewhere in the page graph.
 *
 * Also pings the LinkedIn company URL and warns (does not fail) on 404 so a
 * dead sameAs never ships silently.
 *
 * Exits non-zero on any violation.
 */
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const DIST = path.resolve(process.cwd(), "dist");
const BASE = "https://highlandernc.com";
const BUSINESS_ID = `${BASE}/#business`;

/** Routes allowed to carry aggregateRating / Review markup. */
const RATING_ALLOWED_ROUTES = new Set(["/reviews"]);

/**
 * Street addresses that are allowed to appear in a Place-type node — read from
 * src/data/business.ts (BUSINESS.locations[].streetAddress) so this check can
 * never drift from the single source of truth.
 */
const readAllowedStreets = () => {
  const src = readFileSync(path.resolve(process.cwd(), "src/data/business.ts"), "utf8");
  const streets = [...src.matchAll(/streetAddress:\s*"([^"]+)"/g)].map((m) => m[1]);
  if (streets.length < 2) throw new Error("validate-schema: could not read the showroom street addresses from src/data/business.ts");
  return [...new Set(streets)];
};
const ALLOWED_STREETS = readAllowedStreets();

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

// Prerendered pages live at dist/<route>.html (see scripts/prerender.mjs outPathFor).
const htmlPathFor = (route) =>
  route === "/" ? path.join(DIST, "index.html") : path.join(DIST, `${route.replace(/^\//, "").replace(/\/+$/, "")}.html`);

const extractJsonLd = (html, where = "") => {
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const nodes = [];
  for (const [, raw] of blocks) {
    let parsed;
    try {
      parsed = JSON.parse(raw.trim());
    } catch (e) {
      errors.push(`${where ? `${where}: ` : ""}Unparseable JSON-LD block: ${e.message}`);
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

  // 4 — rating / review markup is covered for every page by validateAllPages().
};

/** Every prerendered page: "/" → dist/index.html, "/<route>" → dist/<route>.html. */
const prerenderedPages = () => {
  const pages = [];
  const walk = (dir, prefix) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) {
        if (["assets", "og"].includes(entry)) continue;
        walk(full, `${prefix}/${entry}`);
      } else if (entry === "index.html") {
        if (prefix === "") pages.push({ route: "/", file: full });
      } else if (entry.endsWith(".html") && !(prefix === "" && entry === "404.html")) {
        pages.push({ route: `${prefix}/${entry.slice(0, -".html".length)}`, file: full });
      }
    }
  };
  walk(DIST, "");
  return pages;
};

/** Does any node (at any depth) carry aggregateRating or a Review type? */
const findRatingMarkup = (nodes) => {
  const hits = [];
  const walk = (v, trail) => {
    if (!v || typeof v !== "object") return;
    if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${trail}[${i}]`));
    if (v.aggregateRating) hits.push(`${trail}.aggregateRating`);
    if (typesOf(v).includes("Review")) hits.push(`${trail} (@type Review)`);
    for (const [k, val] of Object.entries(v)) if (k !== "aggregateRating") walk(val, `${trail}.${k}`);
  };
  nodes.forEach((n, i) => walk(n, n["@id"] || typesOf(n).join("/") || `node${i}`));
  return hits;
};

// ---------------------------------------------------------------------------
// P3.7 — FAQPage markup must mirror the questions a visitor can actually read.
// ---------------------------------------------------------------------------

const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "’", lsquo: "‘",
  ldquo: "“", rdquo: "”", hellip: "…", mdash: "—", ndash: "–", deg: "°", times: "×",
};

const decodeEntities = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED_ENTITIES[name.toLowerCase()] ?? m);

/** Whitespace-collapsed comparison form — the only normalisation we allow. */
const normalizeText = (s) => decodeEntities(String(s)).replace(/\s+/g, " ").trim();

/**
 * Text a visitor can read: everything rendered inside <body> minus scripts,
 * styles, templates and <noscript> fallbacks. JSON-LD lives in <script>, so it
 * is stripped here — otherwise every question would trivially "match" itself.
 * Closed accordion triggers are real <button> text, so they count.
 */
const visibleText = (html) => {
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  return normalizeText(
    body
      .replace(/<(script|style|template|noscript|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " "),
  );
};

/** Every FAQPage node at any depth (top level or inside an @graph). */
const findFaqPages = (nodes) => {
  const found = [];
  const walk = (v) => {
    if (!v || typeof v !== "object") return;
    if (Array.isArray(v)) return v.forEach(walk);
    if (typesOf(v).includes("FAQPage")) found.push(v);
    for (const val of Object.values(v)) walk(val);
  };
  walk(nodes);
  return found;
};

/**
 * FAIL when a FAQPage question is not readable on the page, when a FAQPage has
 * no questions, or when a page emits FAQPage but none of its Q&A is visible.
 * Returns the number of questions verified on this page.
 */
const checkFaqVisibility = (route, html, nodes) => {
  const faqPages = findFaqPages(nodes);
  if (faqPages.length === 0) return { pages: 0, questions: 0 };
  if (faqPages.length > 1) errors.push(`${route}: ${faqPages.length} FAQPage nodes — a page may carry only one.`);

  const text = visibleText(html);
  let verified = 0;
  for (const faq of faqPages) {
    const questions = Array.isArray(faq.mainEntity) ? faq.mainEntity : faq.mainEntity ? [faq.mainEntity] : [];
    if (questions.length === 0) {
      errors.push(`${route}: FAQPage has no Question entries.`);
      continue;
    }
    const missing = [];
    for (const q of questions) {
      const name = normalizeText(q?.name ?? "");
      if (!name) {
        missing.push("(empty Question.name)");
        continue;
      }
      if (text.includes(name)) verified += 1;
      else missing.push(name);
    }
    if (missing.length === questions.length) {
      errors.push(`${route}: FAQPage emitted but none of its ${questions.length} question(s) is visible on the page.`);
    } else {
      for (const m of missing) errors.push(`${route}: FAQPage question is not visible on the page — "${m}".`);
    }
  }
  return { pages: faqPages.length, questions: verified };
};

const faqStats = { pages: 0, questions: 0 };

/** Pass A — every prerendered page. */
const validateAllPages = async () => {
  const pages = prerenderedPages();
  if (pages.length === 0) {
    errors.push("No prerendered pages found under dist/ — run the build (prerender) first.");
    return 0;
  }
  for (const { route, file } of pages) {
    const html = await readFile(file, "utf8");
    const nodes = extractJsonLd(html, route); // also records JSON parse errors
    const faq = checkFaqVisibility(route, html, nodes);
    faqStats.pages += faq.pages;
    faqStats.questions += faq.questions;
    if (!RATING_ALLOWED_ROUTES.has(route)) {
      for (const hit of findRatingMarkup(nodes)) {
        errors.push(`${route}: rating/review markup is only allowed on ${[...RATING_ALLOWED_ROUTES].join(", ")} — found ${hit}.`);
      }
    }
    for (const node of nodes) {
      const addr = node.address;
      if (!addr || typeof addr !== "object" || Array.isArray(addr)) continue;
      if (!typesOf(node).some((t) => PLACE_TYPES.has(t))) continue;
      const street = addr.streetAddress;
      if (street && !ALLOWED_STREETS.some((s) => String(street).startsWith(s))) {
        errors.push(`${route}: node ${node["@id"] || typesOf(node).join("/")} has non-showroom address "${street}".`);
      }
    }
  }
  return pages.length;
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

  // Pass A — every page: parse errors, rating/review markup, showroom addresses.
  const pageCount = await validateAllPages();

  // Pass B — representative pages, deeper graph checks.
  for (const page of PAGES) {
    const file = htmlPathFor(page.route);
    if (!existsSync(file)) {
      errors.push(`${page.label} (${page.route}): prerendered HTML missing at ${path.relative(process.cwd(), file)}.`);
      continue;
    }
    const html = await readFile(file, "utf8");
    validatePage(page.label, page.route, extractJsonLd(html, `${page.label} (${page.route})`), page.expectRating);
  }

  await checkLinkedIn();

  for (const w of warnings) console.warn(`warn  ${w}`);

  if (errors.length) {
    console.error(`\nvalidate-schema: ${errors.length} structured-data error(s):`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }

  console.log(
    `validate-schema: OK — ${pageCount} pages scanned (no rating/review markup outside ${[...RATING_ALLOWED_ROUTES].join(", ")}, all JSON-LD parses, showroom addresses only), ${PAGES.length} pages deep-validated, single #business graph intact.`,
  );
  console.log(
    `validate-schema: FAQPage on ${faqStats.pages} page(s) — ${faqStats.questions} question(s) all visible in page text.`,
  );
};

main();

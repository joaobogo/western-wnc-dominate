#!/usr/bin/env node
/**
 * Writes dist/llms-full.txt — the plain-text body of the 25 most important
 * pages, extracted from the prerendered HTML in dist/ (so the text is exactly
 * what a non-JS crawler sees). Runs in postbuild AFTER scripts/prerender.mjs.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const DIST = resolve("dist");
const BASE_URL = "https://highlandernc.com";

/** The 25 pages AI assistants should be able to quote verbatim. */
export const IMPORTANT_ROUTES = [
  "/",
  "/roofing",
  "/roofing/roof-replacement",
  "/roofing/roof-repair",
  "/roofing/metal",
  "/roofing/metal/cost",
  "/roofing/residential",
  "/roofing/commercial",
  "/roofing/storm-damage",
  "/roofing/specialty",
  "/roofing/brava-synthetic",
  "/roofing/skylights",
  "/roofing/gutters",
  "/construction",
  "/roofing-cost-western-nc",
  "/faq",
  "/locations",
  "/locations/franklin-nc",
  "/locations/sylva-nc",
  "/service-areas/highlands-nc",
  "/service-areas/cashiers-nc",
  "/service-areas/sylva-nc",
  "/service-areas/franklin-nc",
  "/service-areas/waynesville-nc",
  "/service-areas/bryson-city-nc",
];

// Prerendered pages live at dist/<route>.html (see scripts/prerender.mjs outPathFor).
const fileFor = (route) =>
  route === "/" ? join(DIST, "index.html") : join(DIST, `${route.replace(/^\//, "").replace(/\/+$/, "")}.html`);

/** Very small HTML → text extraction: drop non-content nodes, unwrap tags. */
function htmlToText(html) {
  const bodyMatch = html.match(/<div id="root"[^>]*>([\s\S]*)<\/div>\s*<script/i);
  let body = bodyMatch ? bodyMatch[1] : html;
  body = body
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<\/(p|div|section|li|h[1-6]|tr|article|header|footer)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&middot;/g, "·")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n\s*\n+/g, "\n\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n");
  return body;
}

function titleOf(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].trim() : "";
}

function main() {
  const parts = [
    "# Highlander Building Services — full text of key pages",
    "",
    "Plain-text body of the most important pages on highlandernc.com, extracted",
    "from the prerendered HTML at build time. Canonical brief: /llms.txt",
    "",
  ];

  let written = 0;
  const missing = [];
  for (const route of IMPORTANT_ROUTES) {
    const file = fileFor(route);
    if (!existsSync(file)) {
      missing.push(route);
      continue;
    }
    const html = readFileSync(file, "utf8");
    parts.push(
      "-".repeat(72),
      `URL: ${BASE_URL}${route === "/" ? "/" : route}`,
      `TITLE: ${titleOf(html)}`,
      "-".repeat(72),
      "",
      htmlToText(html),
      "",
    );
    written += 1;
  }

  writeFileSync(join(DIST, "llms-full.txt"), parts.join("\n"));
  console.log(
    `llms-full.txt written — ${written}/${IMPORTANT_ROUTES.length} pages${
      missing.length ? ` (missing: ${missing.join(", ")})` : ""
    }`,
  );
}

main();

#!/usr/bin/env node
/**
 * Guarantees a physical HTML file for every paid landing page, with no browser.
 *
 * Why: static hosts (Lovable's publish host, and any build where Chromium is
 * unavailable so scripts/prerender.mjs skips its snapshots) return 404 for a
 * deep link such as /lp/roofing unless a file exists for it. This step writes
 * dist/lp/<slug>/index.html and dist/lp/<slug>.html from the SPA shell, with the
 * page's own title, description, canonical and noindex,follow, so the URL loads,
 * refreshes and shows the correct page title to a crawler.
 *
 * Never overwrites a file the real prerender already produced.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const ORIGIN = "https://highlandernc.com";

/** Keep in sync with src/components/landing/config.ts and src/pages/*Ads.tsx. */
const PAGES = [
  {
    path: "/lp/roof-repair",
    title: "Roof Repair in Western NC | Highlander",
    description:
      "Discuss roof repair or an active leak with Highlander in Western North Carolina. Start with a short contact form or call during staffed business hours.",
  },
  {
    path: "/lp/roof-replacement",
    title: "Roof Replacement in Western NC | Get a Clear Scope",
    description:
      "Roof replacement landing page for paid traffic with a simplified lead form, stronger trust proof, and clear next-step messaging for Western North Carolina homeowners.",
  },
  {
    path: "/lp/storm-damage",
    title: "Storm Damage Roof Help in Western NC | Highlander",
    description:
      "Discuss storm-related roof damage in Western North Carolina. Start with a short contact form and get clear documentation and repair-or-replace guidance.",
  },
  {
    path: "/lp/roofing",
    title: "Roof Repair & Replacement in Western NC | Highlander",
    description:
      "Roof repair, replacement and metal roofing in Western North Carolina. Call Highlander or send a short request to discuss your roof.",
  },
  {
    path: "/lp/construction",
    title: "Additions & Renovations in Western NC | Highlander",
    description:
      "Plan an addition, renovation, deck or porch with Highlander in Western North Carolina. Call the team or send a simple project request.",
  },
  {
    path: "/lp/roofing-construction",
    title: "Roofing & Construction in Western NC | Highlander",
    description:
      "Roofing, additions, renovations and outdoor living in Western North Carolina. Call Highlander or send one short request for your home project.",
  },
];

const esc = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const shellPath = join(DIST, "index.html");
if (!existsSync(shellPath)) {
  console.error("emit-landing-shells: dist/index.html is missing; run the Vite build first.");
  process.exit(1);
}
const shell = readFileSync(shellPath, "utf8");

const withHead = (html, page) => {
  const url = `${ORIGIN}${page.path}`;
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(page.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${esc(page.description)}$2`)
    .replace(/(<meta\s+name="robots"\s+content=")[^"]*(")/i, "$1noindex,follow$2")
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${url}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/i, `$1${url}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/i, `$1${esc(page.title)}$2`);
};

let written = 0;
for (const page of PAGES) {
  const html = withHead(shell, page);
  const slug = page.path.replace(/^\//, "");
  for (const file of [join(DIST, slug, "index.html"), join(DIST, `${slug}.html`)]) {
    if (existsSync(file)) continue; // keep the real prerendered snapshot
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    written += 1;
  }
}
console.log(`emit-landing-shells: wrote ${written} file(s); existing prerendered pages were left untouched.`);

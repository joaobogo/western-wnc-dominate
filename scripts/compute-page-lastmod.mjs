#!/usr/bin/env node
/**
 * Real last-edit dates for sitemap.xml <lastmod> (website fix list, Nov 23,
 * 2026, Task 2: "give every URL an accurate <lastmod> — the real last-edit
 * date").
 *
 * For every non-blog URL in public/sitemap.xml it finds the source files that
 * render that page (the route's page component, any src/content file the page
 * imports, and the data file behind dynamic town/county/project pages) and
 * takes the date of the newest git commit that touched them. Files changed in
 * the working tree but not committed yet count as today. Blog posts are not
 * handled here: the sitemap generator already uses each post's own
 * updated/date.
 *
 * Needs full git history (`git fetch --unshallow` on a shallow clone).
 * Run before committing a change that alters pages:
 *   node scripts/compute-page-lastmod.mjs
 * Writes src/data/generated/page-lastmod.json, read by scripts/generate-sitemap.ts.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

if (git("rev-parse", "--is-shallow-repository") === "true") {
  console.error("compute-page-lastmod: shallow clone; run `git fetch --unshallow` first so dates are real.");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const dirty = new Set(
  git("status", "--porcelain")
    .split("\n")
    .filter(Boolean)
    .map((l) => l.slice(3).replace(/^"|"$/g, "")),
);
const lastEdit = (files) => {
  const existing = files.filter((f) => existsSync(resolve(root, f)));
  if (!existing.length) return null;
  if (existing.some((f) => dirty.has(f))) return today;
  return git("log", "-1", "--format=%cs", "--", ...existing) || null;
};

// Route → page component file, from src/App.tsx.
const app = readFileSync(resolve(root, "src/App.tsx"), "utf8");
const componentFile = {};
for (const m of app.matchAll(/const (\w+) = lazyPreload\("\w+", \(\) => import\("\.\/(pages\/[^"]+)"\)\)/g)) componentFile[m[1]] = `src/${m[2]}.tsx`;
for (const m of app.matchAll(/^import (\w+) from "\.\/(pages\/[^"]+)";/gm)) componentFile[m[1]] = `src/${m[2]}.tsx`;
const routeComponent = {};
for (const m of app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g)) routeComponent[m[1]] = m[2];

const contentImports = (file) => {
  if (!existsSync(resolve(root, file))) return [];
  const src = readFileSync(resolve(root, file), "utf8");
  return [...src.matchAll(/from "@\/(content\/[^"]+)"/g)].map((m) => `src/${m[1]}.ts`);
};
const filesForComponent = (comp) => {
  const f = componentFile[comp];
  return f ? [f, ...contentImports(f)] : [];
};

const sitemap = readFileSync(resolve(root, "public/sitemap.xml"), "utf8");
const paths = [...sitemap.matchAll(/<loc>https:\/\/highlandernc\.com([^<]*)<\/loc>/g)].map((m) => m[1] || "/");

const out = {};
const missing = [];
for (const path of paths) {
  if (path.startsWith("/blog/")) continue;
  let files = [];
  if (routeComponent[path]) {
    files = filesForComponent(routeComponent[path]);
    if (routeComponent[path] === "TownConstruction") files.push("src/content/construction/towns.ts");
  } else if (/^\/service-areas\/county\/[^/]+$/.test(path)) {
    files = [...filesForComponent(routeComponent["/service-areas/county/:slug"]), "src/data/counties.ts"];
  } else if (/^\/service-areas\/[^/]+\/[^/]+$/.test(path)) {
    files = [...filesForComponent(routeComponent["/service-areas/:townSlug/:serviceSlug"]), "src/data/service-town-content.ts"];
  } else if (/^\/service-areas\/[^/]+$/.test(path)) {
    files = [...filesForComponent(routeComponent["/service-areas/:slug"]), "src/data/towns.ts"];
  } else if (/^\/projects\/[^/]+$/.test(path)) {
    files = [...filesForComponent(routeComponent["/projects/:slug"]), "src/data/projects.ts"];
  }
  if (path === "/") files = ["src/pages/Index.tsx", "src/data/most-requested-links.ts"]; // "/" renders RootEntry → Index
  const date = lastEdit(files);
  if (date) out[path] = date;
  else missing.push(path);
}

const target = resolve(root, "src/data/generated/page-lastmod.json");
writeFileSync(target, JSON.stringify(Object.fromEntries(Object.entries(out).sort()), null, 2) + "\n");
console.log(`compute-page-lastmod: ${Object.keys(out).length} page dates written to src/data/generated/page-lastmod.json`);
if (missing.length) console.log(`  no source found for: ${missing.join(", ")}`);

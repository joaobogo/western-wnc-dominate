#!/usr/bin/env node
/**
 * P4.1 — Internal link audit over the prerendered site (dist/).
 *
 * Builds the internal link graph from every prerendered page: an <a href> counts
 * when it starts with "/" or points at the canonical host. Each SOURCE page is
 * counted once per TARGET, so nav/footer repeats do not inflate anything.
 *
 * For every sitemap URL it reports
 *   inbound   — distinct OTHER pages linking to it
 *   depth     — clicks from the homepage (BFS over the graph; "∞" = unreachable)
 *   outbound  — distinct internal targets the page links to
 * and prints every sitemap URL with inbound < 3 or depth > 3.
 *
 * It also checks the site's own linking rule set
 * (.lovable/memory/seo/location-strategy.md, tightened by P4.1):
 *   core town page  → ≥3 service pages, ≥2 blog posts, ≥1 project
 *   service page    → the 4 core town pages, anchor "<service> in <Town>"
 *   blog post       → ≥1 service page, ≥1 town page, ≥2 related posts
 *
 * --check   exit 1 on a FAIL (used by `npm run seo:check`):
 *             • a sitemap URL with 0 inbound links from other pages
 *             • an internal href that matches a redirect source in public/_redirects
 *             • an internal href on "www.", "http://" or a lovable.app host
 * --rules   print every rule-set violation (summary only by default)
 * --all     print every sitemap URL, not just the weak ones
 * --json    machine-readable output
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import {
  CANONICAL_HOST,
  loadRedirectRules,
  loadSiteInventory,
  resolveUrl,
} from "./lib/redirect-rules.mjs";

const ROOT = process.cwd();
const DIST = path.resolve(ROOT, "dist");
const args = new Set(process.argv.slice(2));
const CHECK = args.has("--check");
const JSON_OUT = args.has("--json");
const SHOW_ALL = args.has("--all");
const SHOW_RULES = args.has("--rules");

const MIN_INBOUND = 3;
const MAX_DEPTH = 3;

const CORE_TOWNS = ["franklin-nc", "highlands-nc", "cashiers-nc", "sylva-nc"];
const CORE_TOWN_PATHS = CORE_TOWNS.map((s) => `/service-areas/${s}`);
/** Division service pages the rule set means by "service page". */
const SERVICE_PAGES = {
  "/roofing/residential": "Residential roofing",
  "/roofing/roof-replacement": "Roof replacement",
  "/roofing/roof-repair": "Roof repair",
  "/roofing/metal": "Metal roofing",
  "/roofing/brava-synthetic": "Synthetic roofing",
  "/roofing/specialty": "Specialty roofing",
  "/roofing/gutters": "Gutter installation",
  "/roofing/skylights": "Skylight installation",
  "/roofing/storm-damage": "Storm damage roofing",
  "/roofing/commercial": "Commercial roofing",
};
const isServicePath = (p) =>
  p in SERVICE_PAGES || /^\/service-areas\/[a-z0-9-]+-nc\/[a-z0-9-]+$/.test(p) || /^\/construction\/[a-z0-9-]+$/.test(p);
const isTownPath = (p) => /^\/service-areas\/[a-z0-9-]+-nc$/.test(p);
const isBlogPath = (p) => /^\/blog\/[a-z0-9-]+$/.test(p);
const isProjectPath = (p) => /^\/projects\/[a-z0-9-]+$/.test(p);

// ------------------------------------------------------------ dist walk

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

// ------------------------------------------------------------ href parsing

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");

const stripTags = (s) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const cleanPath = (p) => {
  let out = p.split(/[?#]/)[0];
  try {
    out = decodeURI(out);
  } catch {
    /* keep raw */
  }
  if (!out.startsWith("/")) out = `/${out}`;
  if (out.length > 1) out = out.replace(/\/+$/, "");
  return out;
};

/**
 * Classify one raw href. Returns
 *   { kind: "internal", path, absolute }  — counts in the graph
 *   { kind: "bad", reason }               — canonical-host variant we never want in markup
 *   null                                  — external / non-navigational
 */
const classifyHref = (raw, sourceRoute) => {
  const href = decode(raw).trim();
  if (!href || /^(#|mailto:|tel:|sms:|javascript:|data:)/i.test(href)) return null;

  const lovable = /(^|\.)lovable\.app$/i;
  if (/^(https?:)?\/\//i.test(href)) {
    let u;
    try {
      u = new URL(href.startsWith("//") ? `https:${href}` : href);
    } catch {
      return null;
    }
    const host = u.hostname.toLowerCase();
    if (lovable.test(host)) return { kind: "bad", reason: `lovable.app host (${u.host})` };
    if (host === `www.${CANONICAL_HOST}`) return { kind: "bad", reason: "www. host" };
    if (host === CANONICAL_HOST) {
      if (u.protocol === "http:") return { kind: "bad", reason: "http:// scheme" };
      return { kind: "internal", path: cleanPath(u.pathname), absolute: true };
    }
    return null; // genuinely external
  }
  if (href.startsWith("/")) return { kind: "internal", path: cleanPath(href), absolute: false };
  // relative href — resolve against the page
  try {
    const u = new URL(href, `https://${CANONICAL_HOST}${sourceRoute}`);
    return { kind: "internal", path: cleanPath(u.pathname), absolute: false };
  } catch {
    return null;
  }
};

const ANCHOR_RE = /<a\s([^>]*?)href="([^"]*)"([^>]*)>([\s\S]*?)<\/a>/gi;

/** Distinct internal targets of one page, with the anchor texts used for each. */
const outboundOf = (html, route) => {
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  const targets = new Map(); // path -> { anchors: Set, absolute: boolean }
  const bad = new Map(); // raw href -> reason
  for (const m of body.matchAll(ANCHOR_RE)) {
    const cls = classifyHref(m[2], route);
    if (!cls) continue;
    if (cls.kind === "bad") {
      bad.set(decode(m[2]), cls.reason);
      continue;
    }
    const text = stripTags(m[4]) || stripTags(m[1] + m[3]).match(/aria-label="([^"]*)"/)?.[1] || "";
    const entry = targets.get(cls.path) ?? { anchors: new Set(), absolute: false };
    if (text && entry.anchors.size < 8) entry.anchors.add(text);
    entry.absolute = entry.absolute || cls.absolute;
    targets.set(cls.path, entry);
  }
  return { targets, bad };
};

// ------------------------------------------------------------ audit

const main = () => {
  if (!existsSync(DIST)) {
    console.error("internal-links: dist/ not found — run the build (and prerender) first.");
    process.exit(1);
  }
  const pages = prerenderedPages();
  const inventory = loadSiteInventory(ROOT);
  const rules = loadRedirectRules(path.resolve(ROOT, "public/_redirects"));
  const sitemap = [...inventory.sitemap].sort();

  const graph = new Map(); // route -> Map(target -> {anchors, absolute})
  const inbound = new Map(); // target -> Set(sources)
  const badHrefs = []; // { route, href, reason }
  const redirectingHrefs = []; // { route, href, to, status }
  const brokenHrefs = []; // { route, href }
  const resolved = new Map(); // path -> resolveUrl result (memo)

  for (const { route, file } of pages) {
    const html = readFileSync(file, "utf8");
    const { targets, bad } = outboundOf(html, route);
    graph.set(route, targets);
    for (const [href, reason] of bad) badHrefs.push({ route, href, reason });
    for (const target of targets.keys()) {
      if (target !== route) {
        if (!inbound.has(target)) inbound.set(target, new Set());
        inbound.get(target).add(route);
      }
      let res = resolved.get(target);
      if (!res) {
        res = resolveUrl(rules, `https://${CANONICAL_HOST}${target}`, { isLive: inventory.isLive });
        resolved.set(target, res);
      }
      const pathHop = res.hops.find((h) => !h.hostOnly);
      if (pathHop) {
        redirectingHrefs.push({ route, href: target, to: res.final.path, status: pathHop.rule.status });
      } else if (res.terminal === "404" || res.terminal === "gone") {
        brokenHrefs.push({ route, href: target, terminal: res.terminal });
      }
    }
  }

  // Click depth — BFS from the homepage across every internal link.
  const depth = new Map([["/", 0]]);
  const queue = ["/"];
  while (queue.length) {
    const cur = queue.shift();
    const d = depth.get(cur);
    for (const target of graph.get(cur)?.keys() ?? []) {
      if (!depth.has(target)) {
        depth.set(target, d + 1);
        if (graph.has(target)) queue.push(target);
      }
    }
  }

  const rows = sitemap.map((url) => ({
    url,
    inbound: inbound.get(url)?.size ?? 0,
    depth: depth.has(url) ? depth.get(url) : null,
    outbound: graph.get(url)?.size ?? 0,
    prerendered: graph.has(url),
  }));
  const weak = rows.filter((r) => r.inbound < MIN_INBOUND || r.depth === null || r.depth > MAX_DEPTH);
  const orphans = rows.filter((r) => r.inbound === 0);

  // ---- rule-set compliance ------------------------------------------------
  const ruleViolations = [];
  const out = (route) => [...(graph.get(route)?.keys() ?? [])].filter((t) => t !== route);

  for (const townPath of CORE_TOWN_PATHS) {
    if (!graph.has(townPath)) continue;
    const links = out(townPath);
    const services = links.filter(isServicePath).length;
    const blogs = links.filter(isBlogPath).length;
    const projects = links.filter(isProjectPath).length;
    if (services < 3) ruleViolations.push(`${townPath}: links to ${services} service page(s) — rule says ≥3`);
    if (blogs < 2) ruleViolations.push(`${townPath}: links to ${blogs} blog post(s) — rule says ≥2`);
    if (projects < 1) ruleViolations.push(`${townPath}: links to ${projects} project(s) — rule says ≥1`);
  }

  for (const [servicePath, serviceLabel] of Object.entries(SERVICE_PAGES)) {
    if (!graph.has(servicePath)) continue;
    const targets = graph.get(servicePath);
    for (const townPath of CORE_TOWN_PATHS) {
      const townName = townPath.replace("/service-areas/", "").replace(/-nc$/, "").replace(/\b\w/g, (c) => c.toUpperCase());
      const entry = targets.get(townPath);
      if (!entry) {
        ruleViolations.push(`${servicePath}: does not link to ${townPath}`);
        continue;
      }
      const wanted = new RegExp(`\\bin ${townName}\\b`, "i");
      if (![...entry.anchors].some((a) => wanted.test(a))) {
        ruleViolations.push(
          `${servicePath} → ${townPath}: anchor should read "<service> in ${townName}" (found: ${[...entry.anchors].map((a) => `"${a}"`).join(", ") || "no text"})`,
        );
      }
    }
  }

  for (const url of sitemap.filter(isBlogPath)) {
    if (!graph.has(url)) continue;
    const links = out(url);
    const services = links.filter(isServicePath).length;
    const townsLinked = links.filter(isTownPath).length;
    const related = links.filter(isBlogPath).length;
    if (services < 1) ruleViolations.push(`${url}: links to no service page — rule says ≥1`);
    if (townsLinked < 1) ruleViolations.push(`${url}: links to no town page — rule says ≥1`);
    if (related < 2) ruleViolations.push(`${url}: links to ${related} related post(s) — rule says ≥2`);
  }

  // ---- FAIL / WARN ----------------------------------------------------------
  const fails = [];
  for (const r of orphans) fails.push(`orphan: ${r.url} has 0 inbound links from other pages`);
  const seenRedirect = new Set();
  for (const h of redirectingHrefs) {
    const key = `${h.route}→${h.href}`;
    if (seenRedirect.has(key)) continue;
    seenRedirect.add(key);
    fails.push(`${h.route} links to ${h.href}, a ${h.status} source in public/_redirects (final URL is ${h.to})`);
  }
  for (const b of badHrefs) fails.push(`${b.route} links to ${b.href} — ${b.reason}`);

  // Broken internal links are the same defect class as links into redirect
  // sources (the href is not the final URL), so they FAIL too.
  const warns = [];
  const seenBroken = new Set();
  for (const b of brokenHrefs) {
    if (seenBroken.has(b.href)) continue;
    seenBroken.add(b.href);
    const from = brokenHrefs.filter((x) => x.href === b.href).length;
    fails.push(`${b.href} is linked from ${from} page(s) (e.g. ${b.route}) but resolves to ${b.terminal} — broken internal link`);
  }

  // ---- output -----------------------------------------------------------------
  if (JSON_OUT) {
    console.log(JSON.stringify({ pages: pages.length, sitemap: sitemap.length, rows, weak, orphans, ruleViolations, fails, warns }, null, 2));
  } else {
    const fmt = (r) =>
      `  ${String(r.inbound).padStart(3)} in  ${r.depth === null ? "  ∞" : String(r.depth).padStart(3)} deep  ${String(r.outbound).padStart(3)} out  ${r.url}${r.prerendered ? "" : "  (not prerendered!)"}`;
    console.log(`internal-links: ${pages.length} prerendered pages crawled, ${sitemap.length} sitemap URLs.`);
    console.log(
      `  orphans (0 inbound): ${orphans.length} · under ${MIN_INBOUND} inbound: ${rows.filter((r) => r.inbound < MIN_INBOUND).length} · deeper than ${MAX_DEPTH} clicks: ${rows.filter((r) => r.depth === null || r.depth > MAX_DEPTH).length} (unreachable: ${rows.filter((r) => r.depth === null).length})`,
    );
    const listed = SHOW_ALL ? rows : weak;
    if (listed.length) {
      console.log(SHOW_ALL ? "  Every sitemap URL:" : `  Sitemap URLs with < ${MIN_INBOUND} inbound links or depth > ${MAX_DEPTH}:`);
      for (const r of [...listed].sort((a, b) => a.inbound - b.inbound || (b.depth ?? 99) - (a.depth ?? 99) || a.url.localeCompare(b.url))) console.log(fmt(r));
    } else {
      console.log(`  Every sitemap URL has ≥ ${MIN_INBOUND} inbound links and is within ${MAX_DEPTH} clicks of the homepage.`);
    }
    console.log(`  Rule-set violations: ${ruleViolations.length}${SHOW_RULES || ruleViolations.length <= 12 ? "" : " (run with --rules to list them)"}`);
    if (SHOW_RULES || ruleViolations.length <= 12) for (const v of ruleViolations) console.log(`    · ${v}`);
    for (const w of warns) console.log(`  ⚠  ${w}`);
    for (const f of fails) console.log(`  ✗  ${f}`);
    if (fails.length) console.log(`internal-links: ${fails.length} FAIL(s).`);
    else console.log("internal-links: OK — no orphans, no broken links, no links into redirect sources, no www./http:///lovable.app hrefs.");
  }

  if (CHECK && fails.length) process.exit(1);
};

main();

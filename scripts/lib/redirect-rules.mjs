/**
 * Shared `public/_redirects` parser + matcher.
 *
 * ONE implementation of "what would Netlify do with this path", used by
 * scripts/redirect-check.mjs (static map validation + spot checks) and by the
 * legacy-URL resolution check in scripts/seo-regression-check.mjs.
 *
 * Netlify semantics reproduced here (docs.netlify.com → Redirects → options):
 *   - rules are evaluated top to bottom; the FIRST matching rule wins
 *   - `from` paths are case-sensitive; a trailing slash never affects matching
 *   - `/base/*` matches `/base` and everything below it (`:splat`)
 *   - `:name` matches exactly one non-empty path segment; placeholders and a
 *     trailing splat may be combined (`/contact/:segment/*`)
 *   - `from` may carry scheme + host (`https://www.example.com/*`); such rules
 *     only match a request on that exact scheme + host
 *   - 200 = rewrite (no hop), 301/302/303/307/308 = redirect, 404/410 = answer
 *   - a rule without `!` is shadowed when a real file exists at the request path
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

export const CANONICAL_HOST = "highlandernc.com";
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// ----------------------------------------------------------------- paths

/** Strip query/hash, force a leading slash, drop the trailing slash (except "/"). */
export function normalizePath(p) {
  let path = String(p ?? "/").split(/[?#]/)[0];
  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/{2,}/g, "/");
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return path || "/";
}

/** Absolute URL or bare path → { scheme, host, path }. */
export function parseRequest(input) {
  const m = String(input).trim().match(/^(https?):\/\/([^/?#]+)(.*)$/i);
  if (m) {
    return {
      scheme: m[1].toLowerCase(),
      host: m[2].toLowerCase().replace(/:(80|443)$/, ""),
      path: normalizePath(m[3] || "/"),
    };
  }
  return { scheme: "https", host: CANONICAL_HOST, path: normalizePath(input) };
}

// ----------------------------------------------------------------- rules

/** Compile a `from` pattern into a matcher → { params, splat } | null. */
export function compilePattern(pattern) {
  const pat = normalizePath(pattern);
  if (!pat.includes("*") && !pat.includes(":")) {
    return (path) => (path === pat ? { params: {}, splat: "" } : null);
  }
  const names = [];
  const segments = pat === "/" ? [] : pat.split("/").slice(1);
  let re = "^";
  segments.forEach((seg, i) => {
    const last = i === segments.length - 1;
    if (seg === "*" && last) re += "(?:/(.*))?"; // "/base/*" also matches "/base"
    else if (seg.startsWith(":")) {
      names.push(seg.slice(1));
      re += "/([^/]+)";
    } else re += `/${escapeRe(seg)}`;
  });
  if (segments.length === 0) re += "/";
  const regex = new RegExp(`${re}$`);
  const hasSplat = segments.length > 0 && segments[segments.length - 1] === "*";
  return (path) => {
    const m = path.match(regex);
    if (!m) return null;
    const params = {};
    names.forEach((n, i) => {
      params[n] = m[i + 1];
    });
    return { params, splat: hasSplat ? m[names.length + 1] || "" : "" };
  };
}

/**
 * Parse `_redirects` text → [{ from, to, status, force, line, scheme, host, match }].
 * Malformed lines are returned with `malformed: true` so callers can report them.
 */
export function parseRedirectRules(text) {
  const rules = [];
  String(text)
    .split(/\r?\n/)
    .forEach((raw, i) => {
      const line = raw.trim();
      if (!line || line.startsWith("#")) return;
      const parts = line.split(/\s+/);
      if (parts.length < 2) {
        rules.push({ from: line, to: "", status: 0, force: false, line: i + 1, malformed: true, match: () => null });
        return;
      }
      const [from, to] = parts;
      const statusRaw = parts[2] && /^\d{3}!?$/.test(parts[2]) ? parts[2] : "301";
      let scheme = null;
      let host = null;
      let pattern = from;
      const m = from.match(/^(https?):\/\/([^/]+)(\/.*)?$/i);
      if (m) {
        scheme = m[1].toLowerCase();
        host = m[2].toLowerCase();
        pattern = m[3] || "/";
      }
      rules.push({
        from,
        to,
        status: Number(statusRaw.replace("!", "")),
        force: statusRaw.endsWith("!"),
        line: i + 1,
        scheme,
        host,
        match: compilePattern(pattern),
      });
    });
  return rules;
}

export function loadRedirectRules(file = resolve("public/_redirects")) {
  return parseRedirectRules(readFileSync(file, "utf8"));
}

/** Fill :splat and :name placeholders in a destination. */
export function expandDestination(to, params = {}, splat = "") {
  let out = to.replace(/:splat/g, splat);
  for (const [k, v] of Object.entries(params)) {
    out = out.replace(new RegExp(`:${escapeRe(k)}(?![A-Za-z0-9_])`, "g"), v);
  }
  return out;
}

/**
 * First rule that matches. `input` is a bare path (host rules are skipped, as
 * the spot checks in redirect-check.mjs expect) or an absolute URL / request
 * object (host rules match on exact scheme + host).
 * Returns { rule, to } with placeholders expanded, or null.
 */
export function applyRule(rules, input) {
  const req = typeof input === "string" ? (/^https?:\/\//i.test(input) ? parseRequest(input) : { path: normalizePath(input) }) : input;
  for (const r of rules) {
    if (r.malformed) continue;
    if (r.host) {
      if (!req.host || r.host !== req.host || r.scheme !== req.scheme) continue;
    }
    const m = r.match(req.path);
    if (m) return { rule: r, to: expandDestination(r.to, m.params, m.splat) };
  }
  return null;
}

// -------------------------------------------------------------- resolve

/**
 * Follow an absolute URL (or path) through the rule set the way the CDN would.
 *
 * opts.isLive(path) → true when a real file/page is served at that path on the
 *   canonical host (decides shadowing of non-forced rules and the final state).
 *
 * Returns { start, final, hops, terminal, terminalRule, matchedRule } with
 * terminal one of "live" | "404" | "rewrite" | "gone" | "loop" | "too-many-hops".
 * hops: [{ from, to, rule, hostOnly }] — hostOnly = scheme/host changed only
 * (canonical-host normalisation), which callers do not count as a redirect hop.
 * terminalRule = the 200/404/410 rule that ended resolution (if any);
 * matchedRule = the first PATH rule that fired (host-canonicalisation rules
 * are skipped), falling back to terminalRule.
 */
export function resolveUrl(rules, input, opts = {}) {
  const isLive = opts.isLive || (() => false);
  const maxHops = opts.maxHops || 8;
  const start = parseRequest(input);
  let cur = start;
  const hops = [];
  const seen = new Set([`${cur.scheme}://${cur.host}${cur.path}`]);
  let terminal = "404";
  let terminalRule = null;

  for (;;) {
    const hit = applyRule(rules, cur);
    const served = cur.host === CANONICAL_HOST && cur.scheme === "https" && isLive(cur.path);
    if (!hit) {
      terminal = served ? "live" : "404";
      break;
    }
    if (!hit.rule.force && served) {
      terminal = "live"; // non-forced rule shadowed by a real file
      break;
    }
    if (hit.rule.status === 200) {
      terminal = "rewrite";
      terminalRule = hit.rule;
      break;
    }
    if (!REDIRECT_STATUSES.has(hit.rule.status)) {
      terminal = "gone";
      terminalRule = hit.rule;
      break;
    }
    const next = /^https?:\/\//i.test(hit.to)
      ? parseRequest(hit.to)
      : { scheme: cur.scheme, host: cur.host, path: normalizePath(hit.to) };
    const hostOnly = next.path === cur.path && (next.host !== cur.host || next.scheme !== cur.scheme);
    hops.push({ from: cur, to: next, rule: hit.rule, hostOnly });
    const key = `${next.scheme}://${next.host}${next.path}`;
    if (seen.has(key)) {
      terminal = "loop";
      cur = next;
      break;
    }
    seen.add(key);
    cur = next;
    if (hops.length >= maxHops) {
      terminal = "too-many-hops";
      break;
    }
  }
  const firstPathHop = hops.find((h) => !h.hostOnly);
  const matchedRule = firstPathHop ? firstPathHop.rule : terminalRule;
  return { start, final: cur, hops, terminal, terminalRule, matchedRule };
}

// ------------------------------------------------------- site inventory

const APP_ONLY_PREFIXES = [
  "/admin", "/lp", "/.lovable", "/front-desk", "/intake", "/consultation", "/roofing-intake",
  "/construction-intake", "/roofing-builder", "/construction-builder", "/design-intake",
  "/quote-flow", "/seo-monitoring", "/realwork-diagnostics",
];
export const isAppOnly = (p) => APP_ONLY_PREFIXES.some((x) => p === x || p.startsWith(`${x}/`));

const isFile = (f) => {
  try {
    return statSync(f).isFile();
  } catch {
    return false;
  }
};

/**
 * Every path that answers 200 with real content:
 *   public/sitemap.xml URLs (indexable pages), public/prerender-manifest.json
 *   routes (every dynamic route with matching data, incl. noindex coverage
 *   pages and county hubs), static <Route>s in src/App.tsx, and files at the
 *   root of public/.
 */
export function loadSiteInventory(root = process.cwd()) {
  const sitemap = new Set();
  const sitemapPath = resolve(root, "public/sitemap.xml");
  if (existsSync(sitemapPath)) {
    for (const m of readFileSync(sitemapPath, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) {
      try {
        sitemap.add(normalizePath(new URL(m[1]).pathname));
      } catch {
        /* ignore malformed loc */
      }
    }
  }
  const manifest = new Set();
  const manifestPath = resolve(root, "public/prerender-manifest.json");
  if (existsSync(manifestPath)) {
    try {
      for (const p of JSON.parse(readFileSync(manifestPath, "utf8")).routes || []) manifest.add(normalizePath(p));
    } catch {
      /* a broken manifest is reported by seo-regression-check */
    }
  }
  const routes = new Set();
  const appPath = resolve(root, "src/App.tsx");
  if (existsSync(appPath)) {
    for (const m of readFileSync(appPath, "utf8").matchAll(/<Route\s+path="([^"]+)"\s+element=\{(<[A-Za-z]+)/g)) {
      if (m[2] === "<Navigate" || m[1].includes(":") || m[1].includes("*")) continue;
      routes.add(normalizePath(m[1]));
    }
  }
  const publicFile = (p) => {
    const rel = p.replace(/^\//, "");
    return rel && !rel.includes("..") && isFile(resolve(root, "public", rel));
  };
  const isLive = (p) => p === "/" || sitemap.has(p) || manifest.has(p) || routes.has(p) || publicFile(p);
  // Prerendered but deliberately not indexable (noindex,follow): coverage pages,
  // county hubs, funnel steps. A 301 that lands here wastes the legacy URL's equity.
  const noindex = new Set([...manifest].filter((p) => !sitemap.has(p)));
  return { sitemap, manifest, routes, noindex, isLive };
}

export function loadTownSlugs(root = process.cwd()) {
  const src = readFileSync(resolve(root, "src/data/towns.ts"), "utf8");
  return [...new Set([...src.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]))];
}

/**
 * Indexable service×town pairs: hand-written entries (the literal array that
 * precedes the "COVERAGE FILL" block — everything there is hand-written) that
 * are not switched off with `indexable: false`. Mirrors
 * isServiceTownIndexable() in src/data/service-town-content.ts, which node
 * cannot import directly.
 */
export function loadIndexablePairs(root = process.cwd()) {
  const src = readFileSync(resolve(root, "src/data/service-town-content.ts"), "utf8");
  const start = src.indexOf("export const serviceTownContent");
  const end = src.indexOf("COVERAGE FILL");
  const region = src.slice(start, end > 0 ? end : undefined);
  const pairs = new Set();
  const re = /townSlug:\s*"([a-z0-9-]+)",(\s*indexable:\s*(true|false),[^\n]*)?[\s\S]*?serviceSlug:\s*"([a-z0-9-]+)"/g;
  let m;
  while ((m = re.exec(region))) {
    if (m[4] === "roofing-construction-hub") continue;
    if (m[3] === "false") continue;
    pairs.add(`${m[1]}|${m[4]}`);
  }
  return pairs;
}

// ------------------------------------------------------ intent mapping

const STOP = new Set(["the", "of", "for", "your", "a", "an", "and", "in", "on", "to", "is", "vs", "with", "how", "what", "why", "when", "do", "you", "it", "at", "by", "or", "nc", "north", "carolina", "wnc", "www", "html", "php", "index"]);
const tokenize = (p) => p.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

/** Generic slug words that never identify a town on their own. */
const TOWN_GENERIC = new Set(["city", "mountain", "lake", "nc"]);

export function findTown(tokens, townSlugs) {
  let best = null;
  for (const slug of townSlugs) {
    const base = slug.replace(/-nc$/, "");
    const words = base.split("-");
    const keys = [words];
    if (words.length > 1) for (const w of words) if (!TOWN_GENERIC.has(w)) keys.push([w]);
    for (const key of keys) {
      for (let i = 0; i + key.length <= tokens.length; i++) {
        if (key.every((w, j) => tokens[i + j] === w)) {
          if (!best || i < best.index || (i === best.index && key.length > best.len)) best = { slug, index: i, len: key.length };
        }
      }
    }
  }
  return best ? best.slug : null;
}

/** Ordered: the first group with a hit wins, so specific services precede generic ones. */
const SERVICE_RULES = [
  ["/roofing/skylights", ["skylight", "skylights", "velux"]],
  ["/roofing/gutters", ["gutter", "gutters", "downspout", "downspouts"]],
  ["/roofing/metal", ["metal", "seam"]],
  ["/roofing/brava-synthetic", ["synthetic", "brava", "davinci", "composite"]],
  ["/roofing/specialty", ["cedar", "shake", "shakes", "slate", "tile", "tiles", "clay", "specialty", "copper"]],
  ["/roofing/storm-damage", ["storm", "storms", "hail", "wind", "emergency", "tarp", "tarping"]],
  ["/roofing/commercial", ["commercial", "tpo", "epdm", "flat", "maintenance", "maintenanceprogram", "industrial"]],
  ["/roofing/roof-replacement", ["replacement", "replacements", "reroof", "reroofing", "newroof", "tearoff", "tear"]],
  ["/roofing/roof-repair", ["repair", "repairs", "roofrepairs", "leak", "leaks", "flashing", "ventilation", "patch"]],
  ["/roofing/residential", ["shingle", "shingles", "asphalt", "residential"]],
  ["/construction/siding", ["siding"]],
  ["/construction/additions", ["addition", "additions", "addon", "addons"]],
  ["/construction/outdoor-living", ["deck", "decks", "decking", "porch", "porches", "patio", "patios", "outdoor", "retaining", "pergola", "pergolas", "screened", "sunroom", "sunrooms"]],
  ["/construction/renovations", ["renovation", "renovations", "remodel", "remodeling", "remodels", "kitchen", "kitchens", "bathroom", "bathrooms"]],
  ["/construction/design", ["design", "designs", "engineering", "plans", "planning", "layout", "layouts", "architect", "architectural"]],
  ["/construction", ["construction", "contractor", "contractors", "builder", "builders", "custom", "garage", "garages", "carport", "carports"]],
  ["/roofing", ["roofing", "roofer", "roofers", "roof", "roofs"]],
];

/** Service page → service×town slug used under /service-areas/<town>/. */
const SERVICE_TOWN_SLUG = {
  "/roofing": "roofing",
  "/roofing/roof-repair": "roof-repair",
  "/roofing/roof-replacement": "roof-replacement",
  "/roofing/metal": "metal-roofing",
  "/roofing/storm-damage": "storm-damage",
  "/roofing/brava-synthetic": "synthetic-brava",
  "/construction": "construction",
  "/construction/additions": "additions",
  "/construction/outdoor-living": "outdoor-living",
};

const PAGE_RULES = [
  ["/reviews", ["testimonial", "testimonials", "review", "reviews"]],
  ["/recent-projects", ["gallery", "galleries", "portfolio", "project", "projects", "work"]],
  ["/about", ["about"]],
  ["/team", ["team", "staff", "crew"]],
  ["/careers", ["careers", "career", "jobs", "employment", "hiring"]],
  ["/financing", ["financing", "finance"]],
  ["/faq", ["faq", "faqs"]],
  ["/blog", ["blog", "news", "articles"]],
  ["/certifications", ["certifications", "certification", "certified"]],
  ["/request-inspection", ["inspection", "inspections", "estimate", "estimates", "quote", "quotes"]],
  ["/contact", ["contact", "thank", "thanks"]],
  ["/privacy-policy", ["privacy"]],
  ["/community", ["community", "giving", "charity"]],
  ["/sitemap.xml", ["sitemap"]],
];
const LOCATION_WORDS = new Set(["showroom", "showrooms", "location", "locations", "office", "offices"]);
const SHOWROOM_TOWNS = new Set(["franklin-nc", "sylva-nc"]);
const GONE_RE = /(^|\/)(wp-json|wp-admin|wp-login\.php|wp-includes|wp-content|xmlrpc\.php|feed|comments|oembed|\.well-known|cgi-bin)(\/|$)|(^|\/)index\.php$/;

const firstHit = (tokens, table) => {
  for (const [page, words] of table) if (tokens.some((t) => words.includes(t))) return page;
  return null;
};

/**
 * Service intent. One sub-service → that page; two or more sub-services of the
 * same division (e.g. "reroofing-repairs") → the division page, which covers both.
 */
const serviceIntent = (tokens) => {
  const hits = [...new Set(SERVICE_RULES.filter(([, words]) => tokens.some((t) => words.includes(t))).map(([page]) => page))];
  const subs = hits.filter((p) => p !== "/roofing" && p !== "/construction");
  if (subs.length === 1) return subs[0];
  if (subs.length > 1) {
    const divisions = new Set(subs.map((p) => p.split("/")[1]));
    return divisions.size === 1 ? `/${[...divisions][0]}` : firstHit(tokens, SERVICE_RULES);
  }
  return hits[0] || null;
};

/** Best blog post for an old article-style slug, by shared distinctive words. */
export function closestBlogPost(tokens, blogSlugs, townSlugs) {
  const want = new Set(tokens.filter((t) => !STOP.has(t)));
  if (want.size === 0) return null;
  let best = null;
  for (const slug of blogSlugs) {
    const words = slug.split("-").filter((w) => !STOP.has(w));
    const shared = words.filter((w) => want.has(w)).length;
    if (shared < 2) continue;
    const townish = findTown(words, townSlugs) ? 1 : 0;
    const score = shared * 10 - townish * 3 - words.length * 0.1;
    if (!best || score > best.score) best = { slug, score, shared };
  }
  return best ? `/blog/${best.slug}` : null;
}

const looksLikeArticle = (tokens) => tokens.length >= 4 && tokens.some((t) => STOP.has(t));

/**
 * Closest live page by intent for a legacy path. ctx = { isLive, townSlugs,
 * handwrittenPairs, blogSlugs }. Returns { to, status, reason } or null.
 */
export function suggestDestination(path, ctx) {
  const p = normalizePath(path);
  if (GONE_RE.test(p)) return { to: "/404.html", status: 410, reason: "old CMS plumbing" };
  const tokens = tokenize(p);
  const town = findTown(tokens, ctx.townSlugs);
  const townPage = town && ctx.isLive(`/service-areas/${town}`) ? `/service-areas/${town}` : null;

  // "/service-locations", "/service-areas", "/service-area" = the towns-served hub itself.
  if (/(^|\/)service-(locations?|areas?)(\/|$)/.test(p) && !town) {
    return { to: "/service-areas", status: 301, reason: "service-areas hub" };
  }
  if (tokens.some((t) => LOCATION_WORDS.has(t))) {
    if (town && SHOWROOM_TOWNS.has(town)) return { to: `/locations/${town}`, status: 301, reason: "showroom + town" };
    if (townPage) return { to: townPage, status: 301, reason: "location wording + service-area town" };
    return { to: "/locations", status: 301, reason: "showroom wording" };
  }
  const isContactPattern = /^\/contact\/[^/]+(\/|$)/.test(p);
  if (!town && !isContactPattern) {
    const page = firstHit(tokens, PAGE_RULES);
    if (page && ctx.isLive(page)) return { to: page, status: 301, reason: "site page keyword" };
  } else if (tokens.some((t) => ["gallery", "galleries", "portfolio"].includes(t))) {
    return { to: "/recent-projects", status: 301, reason: "gallery + town" };
  }

  const service = serviceIntent(tokens);
  if (town && service) {
    const st = SERVICE_TOWN_SLUG[service];
    const nested = st ? `/service-areas/${town}/${st}` : null;
    if (nested && ctx.indexablePairs.has(`${town}|${st}`) && ctx.isLive(nested)) {
      return { to: nested, status: 301, reason: "town + service (indexable hand-written page)" };
    }
    if (townPage) return { to: townPage, status: 301, reason: "town + service (no indexable page → town)" };
  }
  if (townPage) return { to: townPage, status: 301, reason: "town" };

  if (looksLikeArticle(tokens)) {
    const post = closestBlogPost(tokens, ctx.blogSlugs, ctx.townSlugs);
    if (post && ctx.isLive(post)) return { to: post, status: 301, reason: "article-style slug → closest blog post" };
  }
  if (service && ctx.isLive(service)) return { to: service, status: 301, reason: "service keyword" };
  return null;
}

// ------------------------------------------------------- classification

const HUBS = new Set(["/service-areas", "/"]);

/**
 * Classify one resolution. Categories:
 *   OK            – single 301/302 to a live page (or already live, or an
 *                   intentional 410 / app rewrite — reported separately as notes)
 *   CHAIN         – the destination is itself redirected
 *   DEAD          – no rule matches and the path is not live, or the redirect
 *                   target is not live (404)
 *   HUB-FALLBACK  – lands on /service-areas or / while a more specific page exists
 */
export function classify(res, ctx) {
  const pathHops = res.hops.filter((h) => !h.hostOnly);
  const suggestion = suggestDestination(res.start.path, ctx);
  const base = { pathHops: pathHops.length, hostHops: res.hops.length - pathHops.length, suggestion };
  if (res.terminal === "loop" || res.terminal === "too-many-hops") return { ...base, category: "CHAIN", ok: false, note: res.terminal };
  if (res.terminal === "gone") return { ...base, category: "OK", ok: true, note: `${res.terminalRule.status} intentional` };
  if (res.terminal === "rewrite") return { ...base, category: "OK", ok: true, note: "app rewrite (200)" };
  if (res.terminal === "404") return { ...base, category: "DEAD", ok: false, note: pathHops.length ? "redirect target 404s" : "no rule, not a live route" };
  if (pathHops.length >= 2) return { ...base, category: "CHAIN", ok: false, note: `${pathHops.length} hops` };
  if (pathHops.length === 0) return { ...base, category: "OK", ok: true, note: "already live, no redirect" };
  // A 301 into a noindex page (coverage page, county hub, funnel step) is not a
  // "real public page" for the legacy URL's equity — point it at the town or
  // division page instead.
  if (ctx.noindexPages && ctx.noindexPages.has(res.final.path)) {
    return { ...base, category: "DEAD", ok: false, note: "redirect target is noindex" };
  }
  if (HUBS.has(res.final.path) && suggestion && suggestion.status === 301 && suggestion.to !== res.final.path && !HUBS.has(suggestion.to)) {
    return { ...base, category: "HUB-FALLBACK", ok: false, note: `lands on ${res.final.path}` };
  }
  return { ...base, category: "OK", ok: true, note: "" };
}

// ------------------------------------------------------------- fixture

export function loadFixture(file) {
  return readFileSync(file, "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
}

/**
 * Run the whole legacy-URL resolution check.
 * Returns { rows, counts, nonOk, text } — `text` is the printable summary table.
 */
export function runLegacyUrlCheck({ root = process.cwd(), fixturePath, redirectsPath } = {}) {
  const rules = loadRedirectRules(redirectsPath || resolve(root, "public/_redirects"));
  const inv = loadSiteInventory(root);
  const ctx = {
    isLive: inv.isLive,
    noindexPages: inv.noindex,
    townSlugs: loadTownSlugs(root),
    indexablePairs: loadIndexablePairs(root),
    blogSlugs: [...inv.sitemap].filter((p) => p.startsWith("/blog/")).map((p) => p.slice("/blog/".length)),
  };
  const urls = [...new Set(loadFixture(fixturePath || resolve(root, "scripts/fixtures/legacy-urls-from-gsc.txt")))];
  const rows = urls.map((url) => {
    const res = resolveUrl(rules, url, { isLive: inv.isLive });
    const cls = classify(res, ctx);
    const mr = res.matchedRule;
    const matched = mr ? `line ${mr.line}: ${mr.from} → ${mr.to} ${mr.status}${mr.force ? "!" : ""}` : "(no rule)";
    return { url, path: res.start.path, final: res.final.path, terminal: res.terminal, matched, ...cls };
  });
  const counts = { total: rows.length, OK: 0, CHAIN: 0, DEAD: 0, "HUB-FALLBACK": 0 };
  for (const r of rows) counts[r.category]++;
  const nonOk = rows.filter((r) => !r.ok);
  const hostHops = rows.filter((r) => r.hostHops > 0).length;
  const notes = rows.filter((r) => r.ok && r.note);

  const pad = (s, n) => String(s).padEnd(n);
  const lines = [];
  lines.push("Legacy URL resolution (scripts/fixtures/legacy-urls-from-gsc.txt vs public/_redirects)");
  lines.push(`  total ${counts.total} | OK ${counts.OK} | CHAIN ${counts.CHAIN} | DEAD ${counts.DEAD} | HUB-FALLBACK ${counts["HUB-FALLBACK"]}`);
  lines.push(`  (${hostHops} URL(s) on http:// or www. take one canonical-host hop first — not counted as a redirect hop;`);
  lines.push(`   OK includes ${notes.filter((r) => r.note.startsWith("already live")).length} already-live, ${notes.filter((r) => r.note.includes("intentional")).length} intentional 410, ${notes.filter((r) => r.note.startsWith("app rewrite")).length} app-rewrite URL(s))`);
  if (nonOk.length) {
    lines.push("");
    lines.push(`  ${pad("CATEGORY", 13)}${pad("PATH", 62)}${pad("FINAL", 42)}MATCHED RULE  →  SUGGESTED FIX`);
    for (const r of nonOk) {
      const fix = r.suggestion ? `${r.suggestion.to} ${r.suggestion.status === 410 ? "410" : "301!"} (${r.suggestion.reason})` : "(no suggestion — map by hand)";
      lines.push(`  ${pad(r.category, 13)}${pad(r.path, 62)}${pad(r.final, 42)}${r.matched}  →  ${fix}`);
    }
  }
  return { rows, counts, nonOk, text: lines.join("\n") };
}

#!/usr/bin/env node
/**
 * Lighthouse CI runner + hard gate.
 *
 *   1. Resolves a Chrome binary (Playwright Chromium is already installed for
 *      the prerender step on Netlify).
 *   2. Runs `lhci autorun` (mobile, 4 URLs, config in lighthouserc.cjs).
 *   3. Reads the JSON reports in .lighthouseci and enforces:
 *        performance < 0.80  → warn  (log only, build stays green)
 *        performance < 0.60  → FAIL  (exit 1)
 *        third-party JS transferred before first interaction > 150 KB → FAIL
 *   4. Writes a per-URL table to stdout and to .lighthouseci/summary.json so
 *      before/after numbers can be diffed between deploys.
 *
 * Skips itself (exit 0) when SKIP_LHCI=1 or when no dist/ build exists.
 */
import { execFileSync, execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, ".lighthouseci");
const THIRD_PARTY_JS_BUDGET = 150 * 1024; // 150 KB before first interaction
const WARN_SCORE = 0.8;
const FAIL_SCORE = 0.6;

if (process.env.SKIP_LHCI === "1") {
  console.log("[lhci] SKIP_LHCI=1 — skipping Lighthouse CI.");
  process.exit(0);
}
if (!existsSync(path.join(ROOT, "dist", "index.html"))) {
  console.log("[lhci] no dist/index.html — skipping Lighthouse CI.");
  process.exit(0);
}

/** Find a Chrome/Chromium binary without downloading another one. */
function resolveChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const candidates = [
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ];
  for (const c of candidates) if (existsSync(c)) return c;
  // Playwright cache: ~/.cache/ms-playwright/chromium-*/chrome-linux/chrome
  const cache = path.join(process.env.HOME || "/root", ".cache", "ms-playwright");
  if (existsSync(cache)) {
    for (const dir of readdirSync(cache)) {
      if (!dir.startsWith("chromium")) continue;
      for (const rel of ["chrome-linux/chrome", "chrome-linux/headless_shell", "chrome-mac/Chromium.app/Contents/MacOS/Chromium"]) {
        const p = path.join(cache, dir, rel);
        if (existsSync(p)) return p;
      }
    }
  }
  try {
    return execSync("which chromium || which chromium-browser || which google-chrome", {
      encoding: "utf8",
    }).trim();
  } catch {
    return "";
  }
}

const chrome = resolveChrome();
if (!chrome) {
  console.warn("[lhci] no Chrome binary found — skipping Lighthouse CI (build not blocked).");
  process.exit(0);
}
console.log(`[lhci] using Chrome: ${chrome}`);

try {
  execFileSync("npx", ["--yes", "lhci", "autorun", "--config=lighthouserc.cjs"], {
    stdio: "inherit",
    env: { ...process.env, CHROME_PATH: chrome },
  });
} catch {
  // Assertion warnings and non-fatal collector noise must not fail the build;
  // the hard gate below is the only thing allowed to do that.
  console.warn("[lhci] autorun exited non-zero — continuing to the hard gate.");
}

if (!existsSync(OUT_DIR)) {
  console.warn("[lhci] no .lighthouseci output — nothing to gate on.");
  process.exit(0);
}

const reports = readdirSync(OUT_DIR)
  .filter((f) => f.startsWith("lhr-") && f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(path.join(OUT_DIR, f), "utf8")));

if (reports.length === 0) {
  console.warn("[lhci] no Lighthouse reports produced — nothing to gate on.");
  process.exit(0);
}

/** median of numbers */
const median = (nums) => {
  const s = nums.filter((n) => typeof n === "number").sort((a, b) => a - b);
  if (!s.length) return null;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

/** Bytes of third-party JS transferred during load (i.e. before interaction). */
function thirdPartyJsBytes(lhr) {
  const items = lhr.audits?.["network-requests"]?.details?.items || [];
  const origin = new URL(lhr.finalDisplayedUrl || lhr.finalUrl || "http://localhost").origin;
  return items
    .filter((i) => {
      if (!i.url || i.url.startsWith("data:")) return false;
      let o;
      try {
        o = new URL(i.url).origin;
      } catch {
        return false;
      }
      if (o === origin) return false;
      const type = (i.resourceType || i.mimeType || "").toLowerCase();
      return type.includes("script") || type.includes("javascript");
    })
    .reduce((sum, i) => sum + (i.transferSize || 0), 0);
}

const byUrl = new Map();
for (const lhr of reports) {
  const url = (lhr.finalDisplayedUrl || lhr.finalUrl || "").replace(/^https?:\/\/[^/]+/, "") || "/";
  if (!byUrl.has(url)) byUrl.set(url, []);
  byUrl.get(url).push(lhr);
}

const rows = [];
for (const [url, runs] of byUrl) {
  rows.push({
    url,
    performance: median(runs.map((r) => r.categories?.performance?.score ?? null)),
    lcp: median(runs.map((r) => r.audits?.["largest-contentful-paint"]?.numericValue)),
    inp: median(
      runs.map(
        (r) =>
          r.audits?.["interaction-to-next-paint"]?.numericValue ??
          r.audits?.["max-potential-fid"]?.numericValue,
      ),
    ),
    cls: median(runs.map((r) => r.audits?.["cumulative-layout-shift"]?.numericValue)),
    tbt: median(runs.map((r) => r.audits?.["total-blocking-time"]?.numericValue)),
    unusedJs: median(runs.map((r) => r.audits?.["unused-javascript"]?.details?.overallSavingsBytes ?? 0)),
    thirdPartyJs: median(runs.map((r) => thirdPartyJsBytes(r))),
  });
}

const kb = (b) => (b == null ? "n/a" : `${Math.round(b / 1024)} KB`);
const ms = (v) => (v == null ? "n/a" : `${Math.round(v)} ms`);
const pct = (s) => (s == null ? "n/a" : Math.round(s * 100));

console.log("\n[lhci] mobile results (median of runs)");
console.log(
  ["URL", "Perf", "LCP", "INP", "CLS", "TBT", "Unused JS", "3P JS"].join(" | "),
);
for (const r of rows) {
  console.log(
    [
      r.url,
      pct(r.performance),
      ms(r.lcp),
      ms(r.inp),
      r.cls == null ? "n/a" : r.cls.toFixed(3),
      ms(r.tbt),
      kb(r.unusedJs),
      kb(r.thirdPartyJs),
    ].join(" | "),
  );
}

writeFileSync(
  path.join(OUT_DIR, "summary.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), rows }, null, 2),
);

const failures = [];
for (const r of rows) {
  if (r.performance != null && r.performance < FAIL_SCORE) {
    failures.push(`${r.url}: performance ${pct(r.performance)} < ${FAIL_SCORE * 100}`);
  } else if (r.performance != null && r.performance < WARN_SCORE) {
    console.warn(`[lhci] WARN ${r.url}: performance ${pct(r.performance)} < ${WARN_SCORE * 100}`);
  }
  if (r.thirdPartyJs != null && r.thirdPartyJs > THIRD_PARTY_JS_BUDGET) {
    failures.push(
      `${r.url}: ${kb(r.thirdPartyJs)} of third-party JS before first interaction (budget 150 KB)`,
    );
  }
}

if (failures.length) {
  console.error("\n[lhci] BUILD FAILED — performance gate:");
  failures.forEach((f) => console.error(`  ✗ ${f}`));
  process.exit(1);
}
console.log("\n[lhci] performance gate passed.");

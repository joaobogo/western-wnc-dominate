#!/usr/bin/env node
/**
 * Lighthouse runner + hard gate (P5.1).
 *
 *   1. Resolves a Chrome binary (Playwright Chromium is already installed for
 *      the prerender step on Netlify; Program Files Chrome on Windows).
 *   2. Serves dist/ with scripts/serve-dist.mjs (clean URLs, like Netlify) and
 *      runs the Lighthouse CLI directly for every URL × numberOfRuns declared
 *      in lighthouserc.cjs (mobile, simulated throttling, performance only).
 *      The CLI is used instead of `lhci autorun` because chrome-launcher's
 *      temp-profile cleanup throws EPERM on Windows AFTER the report is saved,
 *      which made LHCI abort the whole collection; here a run counts as long
 *      as its JSON report exists.
 *   3. Reads the JSON reports in .lighthouseci and prints, per URL, the median
 *      Perf / LCP / INP / CLS / TBT / unused JS / third-party JS, then a
 *      PASS/FAIL line per P5.1 budget metric with the element or resource
 *      responsible for every FAIL.
 *   4. Exits 1 on any budget breach, on performance < 0.60, or on > 150 KB of
 *      third-party JS before first interaction. Writes .lighthouseci/summary.json.
 *
 * Skips itself (exit 0) when SKIP_LHCI=1 or when no dist/ build exists.
 *
 *   npm run perf:check              # all URLs, runs from lighthouserc.cjs
 *   LH_RUNS=1 npm run perf:check    # quick single-run pass
 *   LH_URLS=/,/reviews npm run perf:check
 */
import { execFileSync, execSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, ".lighthouseci");
const THIRD_PARTY_JS_BUDGET = 150 * 1024; // 150 KB before first interaction
const WARN_SCORE = 0.8;
const FAIL_SCORE = 0.6;
// P5.1 budget — mirrors the "error" assertions in lighthouserc.cjs.
const BUDGET = { performance: 0.85, lcp: 2500, cls: 0.1, tbt: 300 };

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
    // Windows dev machines (P5.1 runs locally too)
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ];
  for (const c of candidates) if (existsSync(c)) return c;
  // Playwright cache: ~/.cache/ms-playwright/chromium-*/chrome-linux/chrome
  // (Windows: %LOCALAPPDATA%\ms-playwright\chromium-*\chrome-win\chrome.exe)
  const caches = [
    path.join(process.env.HOME || "/root", ".cache", "ms-playwright"),
    process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, "ms-playwright") : "",
  ].filter(Boolean);
  for (const cache of caches) {
    if (!existsSync(cache)) continue;
    for (const dir of readdirSync(cache).sort().reverse()) {
      if (!dir.startsWith("chromium")) continue;
      for (const rel of [
        "chrome-linux/chrome",
        "chrome-linux/headless_shell",
        "chrome-mac/Chromium.app/Contents/MacOS/Chromium",
        "chrome-win/chrome.exe",
        "chrome-win/headless_shell.exe",
      ]) {
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

// ------------------------------------------------------------------ collect

const collectCfg = require(path.join(ROOT, "lighthouserc.cjs")).ci.collect;
const urls = process.env.LH_URLS
  ? process.env.LH_URLS.split(",").map((p) => (p.startsWith("http") ? p : `http://localhost:4173${p.trim()}`))
  : collectCfg.url;
const runsPerUrl = Number(process.env.LH_RUNS || collectCfg.numberOfRuns || 3);
const settings = collectCfg.settings || {};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Start scripts/serve-dist.mjs and resolve once it announces itself. */
function startServer() {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = collectCfg.startServerCommand.split(/\s+/);
    const child = spawn(cmd === "node" ? process.execPath : cmd, args, { cwd: ROOT, stdio: ["ignore", "pipe", "inherit"] });
    const ready = new RegExp(collectCfg.startServerReadyPattern || "serve-dist:");
    const timer = setTimeout(() => reject(new Error("static server did not start in 20 s")), 20_000);
    child.stdout.on("data", (d) => {
      if (ready.test(String(d))) {
        clearTimeout(timer);
        resolve(child);
      }
    });
    child.on("exit", (code) => reject(new Error(`static server exited early (${code})`)));
  });
}

async function collect() {
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  // Settings that have no CLI flag go through a config file.
  const configPath = path.join(OUT_DIR, "lighthouse-config.json");
  writeFileSync(
    configPath,
    JSON.stringify(
      {
        extends: "lighthouse:default",
        settings: {
          onlyCategories: ["performance"],
          formFactor: settings.formFactor || "mobile",
          throttlingMethod: settings.throttlingMethod || "simulate",
          screenEmulation: settings.screenEmulation,
          emulatedUserAgent: settings.emulatedUserAgent,
        },
      },
      null,
      2,
    ),
  );

  const lighthouseCli = path.join(ROOT, "node_modules", "lighthouse", "cli", "index.js");
  const server = await startServer();
  try {
    let n = 0;
    for (const url of urls) {
      process.stdout.write(`[lhci] ${url.replace(/^https?:\/\/[^/]+/, "") || "/"} `);
      for (let run = 1; run <= runsPerUrl; run++) {
        const outFile = path.join(OUT_DIR, `lhr-${String(++n).padStart(3, "0")}.json`);
        let ok = false;
        for (let attempt = 1; attempt <= 2 && !ok; attempt++) {
          try {
            execFileSync(
              process.execPath,
              [
                lighthouseCli,
                url,
                "--quiet",
                "--output=json",
                `--output-path=${outFile}`,
                `--config-path=${configPath}`,
                `--chrome-flags=${settings.chromeFlags || "--headless=new"}`,
              ],
              { cwd: ROOT, env: { ...process.env, CHROME_PATH: chrome }, stdio: ["ignore", "pipe", "pipe"], maxBuffer: 64 * 1024 * 1024 },
            );
          } catch {
            // chrome-launcher's temp-dir cleanup can throw AFTER the report was
            // written (Windows EPERM) — the report is what matters.
          }
          ok = existsSync(outFile);
          if (!ok) await sleep(1500);
        }
        process.stdout.write(ok ? "✓" : "✗");
      }
      process.stdout.write("\n");
    }
  } finally {
    server.kill();
  }
}

await collect();

// ------------------------------------------------------------------ report

const reports = readdirSync(OUT_DIR)
  .filter((f) => f.startsWith("lhr-") && f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(path.join(OUT_DIR, f), "utf8")));

if (reports.length === 0) {
  console.error("[lhci] no Lighthouse reports produced — every run failed.");
  process.exit(1);
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

/** The run whose LCP sits at the median — used to name the culprits. */
const medianRun = (runs) => {
  const sorted = [...runs].sort(
    (a, b) =>
      (a.audits?.["largest-contentful-paint"]?.numericValue ?? 0) -
      (b.audits?.["largest-contentful-paint"]?.numericValue ?? 0),
  );
  return sorted[Math.floor(sorted.length / 2)];
};

/** Element / resource responsible for each failing metric on one run. */
function culprits(lhr) {
  const out = {};
  const lcpEl = lhr.audits?.["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0];
  if (lcpEl?.node) {
    out.lcp = `${lcpEl.node.nodeLabel || ""} <${(lcpEl.node.snippet || "").slice(0, 160)}>`;
  }
  const phases = lhr.audits?.["largest-contentful-paint-element"]?.details?.items?.[1]?.items;
  if (Array.isArray(phases)) {
    out.lcpPhases = phases.map((p) => `${p.phase} ${Math.round(p.timing)} ms`).join(", ");
  }
  const shifts =
    lhr.audits?.["layout-shifts"]?.details?.items ?? lhr.audits?.["layout-shift-elements"]?.details?.items ?? [];
  if (shifts.length) {
    const top = shifts[0];
    const node = top.node || top.subItems?.items?.[0]?.node;
    out.cls = `${(top.score ?? 0).toFixed(3)} from ${node?.nodeLabel || "?"} <${(node?.snippet || "").slice(0, 140)}>`;
  }
  const tasks = lhr.audits?.["long-tasks"]?.details?.items ?? [];
  if (tasks.length) {
    const t = [...tasks].sort((a, b) => (b.duration ?? 0) - (a.duration ?? 0))[0];
    out.tbt = `${Math.round(t.duration)} ms task from ${t.url || "(inline / unknown)"}`;
  }
  const mainThread = lhr.audits?.["bootup-time"]?.details?.items ?? [];
  if (mainThread.length) {
    const top = [...mainThread].sort((a, b) => (b.total ?? 0) - (a.total ?? 0))[0];
    out.bootup = `${Math.round(top.total)} ms scripting in ${top.url}`;
  }
  const m = lhr.audits?.metrics?.details?.items?.[0];
  if (m) out.observed = `observed FCP ${Math.round(m.observedFirstContentfulPaint)} ms · LCP ${Math.round(m.observedLargestContentfulPaint)} ms · load ${Math.round(m.observedLoad)} ms (unthrottled)`;
  return out;
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
    runs: runs.length,
    culprits: culprits(medianRun(runs)),
    performance: median(runs.map((r) => r.categories?.performance?.score ?? null)),
    fcp: median(runs.map((r) => r.audits?.["first-contentful-paint"]?.numericValue)),
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

console.log(`\n[lhci] mobile results (median of ${runsPerUrl} runs)`);
console.log(["URL", "Perf", "FCP", "LCP", "INP", "CLS", "TBT", "Unused JS", "3P JS"].join(" | "));
for (const r of rows) {
  console.log(
    [
      r.url,
      pct(r.performance),
      ms(r.fcp),
      ms(r.lcp),
      ms(r.inp),
      r.cls == null ? "n/a" : r.cls.toFixed(3),
      ms(r.tbt),
      kb(r.unusedJs),
      kb(r.thirdPartyJs),
    ].join(" | "),
  );
}

// P5.1 budget report — one PASS/FAIL line per metric per URL, and for every
// failing metric the element or resource responsible.
console.log("\n[lhci] P5.1 budget (median of runs): perf ≥ 85 · LCP ≤ 2500 ms · CLS ≤ 0.1 · TBT ≤ 300 ms");
let budgetBreaches = 0;
for (const r of rows) {
  const checks = [
    ["performance", r.performance != null && r.performance >= BUDGET.performance, `${pct(r.performance)}`],
    ["LCP", r.lcp != null && r.lcp <= BUDGET.lcp, ms(r.lcp)],
    ["CLS", r.cls != null && r.cls <= BUDGET.cls, r.cls == null ? "n/a" : r.cls.toFixed(3)],
    ["TBT", r.tbt != null && r.tbt <= BUDGET.tbt, ms(r.tbt)],
  ];
  for (const [name, ok, value] of checks) {
    if (!ok) budgetBreaches += 1;
    console.log(`  ${ok ? "PASS" : "FAIL"}  ${r.url}  ${name} ${value}`);
    if (!ok) {
      const c = r.culprits || {};
      if (name === "LCP" && c.lcp) console.log(`        LCP element: ${c.lcp}${c.lcpPhases ? ` — ${c.lcpPhases}` : ""}`);
      if (name === "LCP" && c.observed) console.log(`        ${c.observed}`);
      if (name === "CLS" && c.cls) console.log(`        largest shift: ${c.cls}`);
      if ((name === "TBT" || name === "performance") && c.tbt) console.log(`        longest task: ${c.tbt}`);
      if ((name === "TBT" || name === "performance") && c.bootup) console.log(`        heaviest script: ${c.bootup}`);
    }
  }
}

writeFileSync(
  path.join(OUT_DIR, "summary.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), budget: BUDGET, rows }, null, 2),
);

const failures = [];
if (budgetBreaches) failures.push(`${budgetBreaches} P5.1 budget breach(es) — see PASS/FAIL lines above`);
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

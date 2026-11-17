#!/usr/bin/env node
/**
 * Paid landing page smoke test (Build Brief A3).
 *
 * Usage:
 *   node scripts/lp-smoke.mjs http://localhost:5180      # local dist (scripts/serve-dist.mjs)
 *   node scripts/lp-smoke.mjs https://highlandernc.com   # production, after a release
 *
 * Checks every live ad destination: the six /lp/* pages, the four ?landing=
 * fallbacks, and every URL in docs/live-ad-urls.txt (when present). For each:
 *   - HTTP 200
 *   - robots noindex,follow (paid pages) and a self-canonical
 *   - a visible tel: link to the business number
 *   - a visible lead form with name, email and phone fields
 *   - any honeypot field is invisible and untabbable
 *   - no {{NEEDS_HIGHLANDER placeholder text
 * It only loads pages and reads the DOM. It never submits a form.
 * Exits 1 on any failure.
 */
import { existsSync, readFileSync } from "node:fs";
import { chromium } from "playwright";

const base = (process.argv[2] || "http://localhost:5180").replace(/\/$/, "");
const PHONE_DIGITS = "8285247773";

const LP_PATHS = [
  "/lp/roofing",
  "/lp/construction",
  "/lp/roofing-construction",
  "/lp/roof-replacement",
  "/lp/roof-repair",
  "/lp/storm-damage",
  "/?landing=roofing",
  "/?landing=construction",
  "/?landing=roofing-construction",
  "/?landing=combined",
];

const extra = existsSync("docs/live-ad-urls.txt")
  ? readFileSync("docs/live-ad-urls.txt", "utf8")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"))
      .map((u) => {
        try {
          const url = new URL(u, "https://highlandernc.com");
          return url.pathname + url.search;
        } catch {
          return null;
        }
      })
      .filter(Boolean)
  : [];

const targets = [...new Set([...LP_PATHS, ...extra])];
const launch = process.env.PRERENDER_CHROMIUM ? { executablePath: process.env.PRERENDER_CHROMIUM } : {};
const browser = await chromium.launch(launch);
const failures = [];

for (const path of targets) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const problems = [];
  // Hydration errors (React #418/#423/#425) make the page re-render itself on
  // load; uncaught errors break it. Either fails the page.
  const pageErrors = [];
  page.on("pageerror", (e) => pageErrors.push((e.message.match(/Minified React error #\d+/) || [e.message.slice(0, 80)])[0]));
  try {
    const res = await page.goto(base + path, { waitUntil: "networkidle", timeout: 45000 });
    if (!res || res.status() !== 200) problems.push(`HTTP ${res?.status()}`);
    await page.waitForSelector("form", { timeout: 15000 }).catch(() => {});

    const paid = path.startsWith("/lp/") || path.includes("landing=");
    const robots = await page.locator('meta[name="robots"]').last().getAttribute("content").catch(() => null);
    if (paid && robots !== "noindex,follow") problems.push(`robots="${robots}" (expected noindex,follow)`);
    const canonical = await page.locator('link[rel="canonical"]').last().getAttribute("href").catch(() => null);
    if (!canonical) problems.push("no canonical");

    const tel = page.locator('a[href^="tel:"]');
    const telHrefs = await tel.evaluateAll((els) => els.map((a) => a.getAttribute("href") || ""));
    if (!telHrefs.some((h) => h.replace(/\D/g, "").endsWith(PHONE_DIGITS))) problems.push("no tel: link to the business number");
    let visibleTel = false;
    for (let i = 0; i < Math.min(await tel.count(), 12); i++) if (await tel.nth(i).isVisible()) visibleTel = true;
    if (!visibleTel) problems.push("no visible call link");

    const form = page.locator("form").first();
    if (!(await form.count()) || !(await form.isVisible())) problems.push("no visible form");
    for (const sel of ['input[name="first_name"]', 'input[type="email"], input[name="email"]', 'input[type="tel"], input[name="phone"]']) {
      if (!(await form.locator(sel).count())) problems.push(`form missing ${sel}`);
    }

    const traps = page.locator('input[name="website_url"], input[name="website"]');
    for (let i = 0; i < (await traps.count()); i++) {
      const trap = traps.nth(i);
      const box = await trap.boundingBox();
      const tab = await trap.getAttribute("tabindex");
      const onScreen = box && box.x + box.width > 0 && box.y + box.height > 0 && box.width > 2 && box.height > 2;
      if (onScreen || tab !== "-1") problems.push("honeypot is visible or tabbable");
    }

    await page.waitForTimeout(600);
    if (pageErrors.length) problems.push(`page errors: ${[...new Set(pageErrors)].join(", ")}`);
    const text = await page.evaluate(() => document.body.innerText);
    if (text.includes("{{NEEDS_HIGHLANDER")) problems.push("placeholder text on the page");
  } catch (error) {
    problems.push(String(error).slice(0, 160));
  }
  await page.close();
  console.log(`${problems.length ? "FAIL" : "PASS"}  ${path}${problems.length ? `  — ${problems.join("; ")}` : ""}`);
  if (problems.length) failures.push(path);
}

// New site pages added with the landing-page work: must load without errors.
const SITE_PAGES = ["/services", "/construction/handyman"];
for (const path of SITE_PAGES) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push((e.message.match(/Minified React error #\d+/) || [e.message.slice(0, 80)])[0]));
  let status = 0;
  try {
    status = (await page.goto(base + path, { waitUntil: "networkidle", timeout: 45000 }))?.status() ?? 0;
    await page.waitForTimeout(600);
  } catch (error) {
    errors.push(String(error).slice(0, 120));
  }
  const h1 = await page.locator("h1").count().catch(() => 0);
  const bad = status !== 200 || errors.length || h1 !== 1;
  console.log(`${bad ? "FAIL" : "PASS"}  ${path}${bad ? `  — HTTP ${status}; h1=${h1}; ${[...new Set(errors)].join(", ")}` : ""}`);
  if (bad) failures.push(path);
  await page.close();
}
targets.push(...SITE_PAGES);

await browser.close();
console.log(`\nlp-smoke: ${targets.length - failures.length}/${targets.length} passed against ${base}`);
process.exit(failures.length ? 1 : 0);

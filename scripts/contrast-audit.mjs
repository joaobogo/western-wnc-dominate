#!/usr/bin/env node
/**
 * Text contrast audit: can every line of text be read against what is
 * actually behind it?
 *
 *   node scripts/serve-dist.mjs --port 5180 &
 *   npm run contrast:check                      # one page per template, phone + desktop
 *   npm run contrast:check -- --all             # every prerendered page (slow)
 *   npm run contrast:check -- --only /about,/roofing
 *   npm run contrast:check -- --strict          # exit 1 if any line is under 3:1
 *
 * How it measures. For each page and screen size it records every visible
 * line of text (position, colour, size), then hides all text and photographs
 * the page, so the photo holds only what sits behind the words: flat colour,
 * gradient, or a picture. Each line is compared with the pixels under it.
 * The figure reported is the 10th percentile, so a line counts as failing
 * when a tenth of it or more sits on a patch that is too close in tone.
 * Thresholds are WCAG AA: 4.5:1, or 3:1 for large text (24 px, or 18.66 px bold).
 *
 * Known limits (these show up as failures and are not):
 *   - breadcrumbs on phones sit under the fixed header at the top of the page;
 *   - the faint decorative numerals "01"–"10" beside steps are decorative;
 *   - disabled buttons ("Continue", "Back", "Get drive time") are dimmed on purpose;
 *   - cards that animate in may be photographed before their image paints.
 * Where the installed Chromium does not match the project's Playwright version,
 * set PRERENDER_CHROMIUM to the browser's path (same variable as the prerender).
 * It only loads pages. It never submits a form.
 */
import { readFileSync } from "node:fs";
import { chromium } from "playwright";
import sharp from "sharp";

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const value = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const base = (args.find((a) => /^https?:\/\//.test(a)) || "http://localhost:5180").replace(/\/$/, "");
const WORKERS = Number(process.env.WORKERS || 5);
const VIEWPORTS = [
  { name: "phone", width: 390, height: 844 },
  { name: "desktop", width: 1350, height: 940 },
];

const manifest = JSON.parse(readFileSync("public/prerender-manifest.json", "utf8"));
let routes = (manifest.routes || manifest).map((r) => (typeof r === "string" ? r : r.path || r.route)).filter(Boolean);
if (value("--only")) {
  routes = value("--only").split(",");
} else if (!flag("--all")) {
  // Town, county, service-town, blog and project pages share a template each: sample a few.
  const sample = (re, n) => {
    const m = routes.filter((r) => re.test(r));
    return new Set(m.filter((_, i) => i % Math.max(1, Math.floor(m.length / n)) === 0).slice(0, n));
  };
  const groups = [
    [/^\/blog\//, 4],
    [/^\/service-areas\/county\//, 2],
    [/^\/service-areas\/[^/]+\/[^/]+$/, 5],
    [/^\/service-areas\/[a-z-]+-nc$/, 4],
    [/^\/projects\//, 2],
  ].map(([re, n]) => [re, sample(re, n)]);
  routes = routes.filter((r) => {
    const group = groups.find(([re]) => re.test(r));
    return group ? group[1].has(r) : true;
  });
}

const luminance = (r, g, b) => {
  const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/** Runs in the page: every visible line of text with its colour and size. */
const collectText = () => {
  const out = [];
  const scrollY = window.scrollY;
  const pageWidth = document.documentElement.clientWidth;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent.replace(/\s+/g, " ").trim();
    if (text.length < 2) continue;
    const el = node.parentElement;
    if (!el || el.closest("script,style,noscript,svg,[data-client-only],.sr-only,select,option")) continue;
    let opacity = 1;
    let hidden = false;
    const clips = [];
    for (let a = el; a && a !== document.documentElement; a = a.parentElement) {
      const c = getComputedStyle(a);
      if (c.display === "none" || c.visibility !== "visible") {
        hidden = true;
        break;
      }
      opacity *= parseFloat(c.opacity);
      if (c.overflowX !== "visible" || c.overflowY !== "visible") clips.push(a.getBoundingClientRect());
    }
    if (hidden || opacity < 0.05) continue;
    const cs = getComputedStyle(el);
    const fill = cs.webkitTextFillColor && cs.webkitTextFillColor !== "currentcolor" ? cs.webkitTextFillColor : cs.color;
    const m = fill.match(/rgba?\(([^)]+)\)/);
    if (!m) continue;
    const p = m[1].split(/[,\s/]+/).map(Number);
    const alpha = (p[3] === undefined ? 1 : p[3]) * opacity;
    if (alpha < 0.05) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    const rects = [];
    for (const r of range.getClientRects()) {
      let [x0, y0, x1, y1] = [r.left, r.top, r.right, r.bottom];
      for (const c of clips) {
        x0 = Math.max(x0, c.left);
        y0 = Math.max(y0, c.top);
        x1 = Math.min(x1, c.right);
        y1 = Math.min(y1, c.bottom);
      }
      x0 = Math.max(x0, 0);
      x1 = Math.min(x1, pageWidth);
      if (x1 - x0 > 8 && y1 - y0 > 6) rects.push([Math.round(x0), Math.round(y0 + scrollY), Math.round(x1 - x0), Math.round(y1 - y0)]);
    }
    if (!rects.length) continue;
    const section = el.closest("section, header, footer, nav");
    const index = section ? [...document.querySelectorAll("section")].indexOf(section) : -1;
    out.push({
      text: text.slice(0, 60),
      rects,
      color: [p[0], p[1], p[2], alpha],
      size: parseFloat(cs.fontSize),
      weight: Number(cs.fontWeight) || 400,
      where: section ? section.tagName.toLowerCase() + (index >= 0 ? `#${index}` : "") : "?",
    });
  }
  return out;
};

const launch = process.env.PRERENDER_CHROMIUM ? { executablePath: process.env.PRERENDER_CHROMIUM } : {};
const browser = await chromium.launch(launch);
const failures = [];
let done = 0;

const auditPage = async (context, path, viewport) => {
  const page = await context.newPage();
  const work = (async () => {
    await page.goto(base + path, { waitUntil: "load", timeout: 30000 });
    // Scroll through once so lazy images load and scroll-reveal sections appear.
    await page.evaluate(async () => {
      for (let y = 0; y < Math.min(document.body.scrollHeight, 30000); y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 70));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 900));
    });
    await page.addStyleTag({ content: "[data-client-only]{display:none!important} *{transition:none!important;animation:none!important}" });
    // A bar fixed to the bottom of the window lands mid-page in a full-page capture and covers real content.
    await page.evaluate(() => {
      for (const el of document.querySelectorAll("body *")) {
        if (getComputedStyle(el).position === "fixed" && !el.closest("header") && el.tagName !== "HEADER") el.style.setProperty("display", "none", "important");
      }
    });
    const lines = await page.evaluate(collectText);
    await page.addStyleTag({
      content: "*{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;caret-color:transparent!important} svg{visibility:hidden!important}",
    });
    const png = await page.screenshot({ fullPage: true, type: "png" });
    const { data, info } = await sharp(png).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
    for (const line of lines) {
      const [tr, tg, tb, ta] = line.color;
      const ratios = [];
      for (const [x, y, w, h] of line.rects) {
        for (let yy = y + 1; yy < y + h - 1; yy += 2) {
          for (let xx = x + 1; xx < x + w - 1; xx += 3) {
            if (xx >= info.width || yy >= info.height) continue;
            const i = (yy * info.width + xx) * 4;
            const [br, bg, bb] = [data[i], data[i + 1], data[i + 2]];
            const blended = [tr * ta + br * (1 - ta), tg * ta + bg * (1 - ta), tb * ta + bb * (1 - ta)];
            ratios.push(ratio(luminance(...blended), luminance(br, bg, bb)));
          }
        }
      }
      if (ratios.length < 8) continue;
      ratios.sort((a, b) => a - b);
      const worst = ratios[Math.floor(ratios.length * 0.1)];
      const large = line.size >= 24 || (line.size >= 18.66 && line.weight >= 700);
      const need = large ? 3 : 4.5;
      if (worst < need) {
        failures.push({ page: path, screen: viewport.name, text: line.text, contrast: +worst.toFixed(2), typical: +ratios[Math.floor(ratios.length / 2)].toFixed(2), need, where: line.where, y: line.rects[0][1], size: Math.round(line.size), color: line.color.map((v, i) => (i < 3 ? Math.round(v) : +v.toFixed(2))) });
      }
    }
  })();
  let finished = false;
  await Promise.race([work.then(() => (finished = true)).catch((e) => (finished = true, console.warn(`skip ${path} (${viewport.name}): ${String(e).slice(0, 80)}`))), new Promise((r) => setTimeout(r, 45000))]);
  if (!finished) console.warn(`skip ${path} (${viewport.name}): took longer than 45 s`);
  await page.close().catch(() => {});
  if (++done % 25 === 0) console.log(`  ${done}/${routes.length * VIEWPORTS.length} page loads`);
};

await Promise.all(
  Array.from({ length: WORKERS }, async (_, w) => {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1, reducedMotion: "reduce" });
      await context.addInitScript(() => {
        try {
          localStorage.setItem("hl_consent_v1", JSON.stringify({ analytics: true, marketing: true, functional: false, ts: Date.now() }));
        } catch {
          /* private mode */
        }
      });
      // Trackers and third-party embeds are not part of the page's own text.
      await context.route(/googletagmanager|connect\.facebook|analytics\.tiktok|realworklabs|veluxsolutions|google\.com\/maps|fonts\.googleapis|fonts\.gstatic/, (r) => r.abort());
      for (const path of routes.filter((_, i) => i % WORKERS === w)) await auditPage(context, path, viewport);
      await context.close();
    }
  }),
);
await browser.close();

const expected = (f) => (f.where === "nav" && f.y < 140) || /^(0[1-9]|10|Continue|Back|Get drive time)$/.test(f.text);
const real = failures.filter((f) => !expected(f));
const groups = new Map();
for (const f of real) {
  const key = `${f.text.slice(0, 34)} · rgb(${f.color.slice(0, 3)}) ${f.size}px`;
  const g = groups.get(key) || { worst: 99, typical: f.typical, pages: new Set(), screens: new Set(), where: f.where };
  g.worst = Math.min(g.worst, f.contrast);
  g.pages.add(f.page);
  g.screens.add(f.screen);
  groups.set(key, g);
}
const sorted = [...groups.entries()].sort((a, b) => a[1].worst - b[1].worst);
console.log(`\ncontrast audit: ${routes.length} pages × ${VIEWPORTS.length} screens against ${base}`);
console.log(`${sorted.length} distinct lines under the AA threshold (${sorted.filter(([, g]) => g.worst < 3).length} under 3:1); ${failures.length - real.length} expected items ignored\n`);
for (const [key, g] of sorted.slice(0, Number(value("--top") || 40))) {
  console.log(`${String(g.worst).padStart(5)}:1  (typical ${String(g.typical).padStart(5)})  ${[...g.screens].join("+").padEnd(13)} ${g.where.padEnd(11)} ${[...g.pages].slice(0, 2).join(", ")}${g.pages.size > 2 ? ` +${g.pages.size - 2}` : ""}\n         ${key}`);
}
process.exit(flag("--strict") && sorted.some(([, g]) => g.worst < 3) ? 1 : 0);

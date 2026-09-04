/**
 * Per-route Open Graph images.
 *
 * Renders a branded 1200×630 card for every prerendered route into
 * `dist/og/<slug>.png`. The card carries the page title; town pages also get
 * the town name and elevation. Routes with no generated card fall back to
 * /og-image.jpg via the `/og/*` rewrite in public/_redirects.
 *
 * Runs in postbuild AFTER prerender (it reads the prerendered <title>).
 * Run: bun scripts/generate-og-images.ts
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { chromium } from "playwright";
import { BUSINESS } from "../src/data/business";
import { towns } from "../src/data/towns";
import { ogSlug } from "../src/lib/og";

const DIST = resolve("dist");
const OUT_DIR = join(DIST, "og");

/**
 * Every prerendered page: dist/index.html is "/", every other dist/**\/<name>.html
 * is "/<path>/<name>" (see scripts/prerender.mjs outPathFor). dist/404.html is
 * the not-found page and gets no card.
 */
function prerenderedRoutes(): string[] {
  const routes: string[] = [];
  const walk = (dir: string, prefix: string) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        if (["assets", "og"].includes(entry)) continue;
        walk(full, `${prefix}/${entry}`);
      } else if (entry === "index.html") {
        if (prefix === "") routes.push("/");
      } else if (entry.endsWith(".html") && !(prefix === "" && entry === "404.html")) {
        routes.push(`${prefix}/${entry.slice(0, -".html".length)}`);
      }
    }
  };
  walk(DIST, "");
  return routes;
}

const titleOf = (route: string): string => {
  const file = route === "/" ? join(DIST, "index.html") : join(DIST, `${route.slice(1)}.html`);
  if (!existsSync(file)) return BUSINESS.brandName;
  const m = readFileSync(file, "utf8").match(/<title>([^<]*)<\/title>/i);
  return (m?.[1] ?? BUSINESS.brandName).replace(/\s*\|\s*Highlander.*$/i, "").trim();
};

/** Town pages get the town name + elevation as the subline. */
const townFor = (route: string) => {
  const slug = route.replace("/service-areas/", "");
  return route.startsWith("/service-areas/") ? towns.find((t) => t.slug === slug) : undefined;
};

/** Titles come out of prerendered HTML already entity-encoded — decode first. */
const decodeEntities = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&middot;/g, "·");

const escape = (s: string) =>
  decodeEntities(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function cardHtml(title: string, subline: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: fallback; src: local("Georgia"); }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:#0f2410; color:#FCF5DF;
         font-family: Georgia, "Times New Roman", serif; position:relative; overflow:hidden; }
  .glow { position:absolute; inset:-30% -10% auto auto; width:820px; height:820px; border-radius:50%;
          background: radial-gradient(circle, rgba(192,145,63,0.28), rgba(15,36,16,0) 65%); }
  .frame { position:absolute; inset:44px; border:1px solid rgba(192,145,63,0.45); }
  .inner { position:absolute; inset:96px; display:flex; flex-direction:column; justify-content:space-between; }
  .brand { font-size:26px; letter-spacing:.22em; text-transform:uppercase; color:#C0913F; font-weight:700; }
  h1 { font-size:${title.length > 62 ? 56 : 68}px; line-height:1.08; font-weight:700; max-width:940px; }
  .sub { font-size:28px; color:rgba(252,245,223,0.78); font-family: Helvetica, Arial, sans-serif; }
  .rule { width:96px; height:3px; background:#C0913F; margin:26px 0; }
  .foot { font-size:24px; font-family: Helvetica, Arial, sans-serif; color:rgba(252,245,223,0.9);
          display:flex; gap:22px; align-items:center; }
  .dot { width:6px; height:6px; border-radius:50%; background:#C0913F; display:inline-block; }
  </style></head><body>
  <div class="glow"></div><div class="frame"></div>
  <div class="inner">
    <div class="brand">${escape(BUSINESS.brandName)}</div>
    <div>
      <h1>${escape(title)}</h1>
      <div class="rule"></div>
      <div class="sub">${escape(subline)}</div>
    </div>
    <div class="foot">
      <span>Franklin &amp; Sylva, NC</span><span class="dot"></span>
      <span>${escape(BUSINESS.licenseNumber)}</span><span class="dot"></span>
      <span>highlandernc.com</span>
    </div>
  </div></body></html>`;
}

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.error("og: dist/index.html missing — run vite build first.");
    process.exit(1);
  }
  mkdirSync(OUT_DIR, { recursive: true });

  const routes = prerenderedRoutes();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

  let n = 0;
  for (const route of routes) {
    const town = townFor(route);
    const subline = town
      ? `${town.name}, NC · ${town.elevation} · Roofing & Construction`
      : "Roofing & Construction in Western North Carolina";
    await page.setContent(cardHtml(titleOf(route), subline), { waitUntil: "load" });
    await page.screenshot({ path: join(OUT_DIR, `${ogSlug(route)}.png`), type: "png" });
    n += 1;
  }

  await browser.close();
  console.log(`og images written — ${n} cards in dist/og/`);
}

main();

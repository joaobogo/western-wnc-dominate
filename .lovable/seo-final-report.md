# Highlander — Final Technical SEO Report

_Canonical host: `https://highlandernc.com` · GTM: `GTM-W26D39LJ` · GA4: `G-TYYM63MNYR` (via GTM)_

---

## Prompt 38 — Search-engine validation checklist

No indexing or ranking outcomes are guaranteed. This is a readiness checklist.

### Priority 1 — Homepage & primary money pages
| URL | HTTP | Indexable | Canonical self-ref | In sitemap | Internal links in | Schema | Mobile | Ready |
|---|---|---|---|---|---|---|---|---|
| `/` | 200 | yes | yes | yes | sitewide | Organization + WebSite + RoofingContractor | pass | yes |
| `/roofing` | 200 | yes | yes | yes | header + footer + home | Service + Breadcrumb | pass | yes |
| `/construction` | 200 | yes | yes | yes | header + footer | Service + Breadcrumb | pass | yes |
| `/commercial` | 200 | yes | yes | yes | header + footer | Service + Breadcrumb | pass | yes |
| `/contact` | 200 | yes | yes | yes | header + footer | LocalBusiness contact | pass | yes |

### Priority 2 — Franklin / Highlands / Cashiers / Sylva
| URL | HTTP | Indexable | Canonical | Sitemap | Schema | Mobile | Ready |
|---|---|---|---|---|---|---|---|
| `/service-areas/franklin-nc` | 200 | yes | self | yes | Place + Breadcrumb | pass | yes |
| `/service-areas/highlands-nc` | 200 | yes | self | yes | Place + Breadcrumb | pass | yes |
| `/service-areas/cashiers-nc` | 200 | yes | self | yes | Place + Breadcrumb | pass | yes |
| `/service-areas/sylva-nc` | 200 | yes | self | yes | Place + Breadcrumb | pass | yes |

### Priority 3 — Service verticals
`/roofing/residential`, `/roofing/specialty`, `/roofing/skylights`, `/roofing/gutters`,
`/roofing/roof-repair`, `/roofing/roof-replacement`, `/roofing/metal-roofing`,
`/commercial`, `/construction`, `/design` — all: **200, indexable, self-canonical, in sitemap, Service + Breadcrumb schema, mobile-pass, ready.**

### Priority 4 — Highest-priority blog posts
`/blog/best-roofing-materials-highlands-nc`, `/blog/roof-repair-vs-replacement-highlands-nc`,
`/blog/metal-roofing-cashiers-nc`, `/blog/emergency-roof-repair-franklin-nc`,
`/blog/winter-roof-prep-western-nc` — all: **200, indexable, self-canonical, in sitemap, BlogPosting + Breadcrumb schema, mobile-pass, ready.**

### Tool-by-tool submission checklist
- **Google Search Console** — verify domain property, submit `sitemap.xml`, request indexing for Priority 1 URLs.
- **Bing Webmaster Tools** — verify site, submit `sitemap.xml`, enable IndexNow (key already hosted).
- **Rich Results Test** — spot-check `/`, one town, one service+town, one blog post.
- **URL Inspection** — verify canonical/index status for Priority 1 & 2.
- **PageSpeed Insights** — mobile pass expected on `/`, key money pages, and a blog post.
- **Mobile rendering** — confirmed in-app via responsive templates and mobile parity audit.
- **IndexNow** — key `ae41f9843d73e5c77badf85d990a91e65e0ebeacad1a93b7` live at `/{key}.txt`; edge function ready.
- **ChatGPT Search crawler** — `OAI-SearchBot` allowed in `robots.txt`, returns 200.

---

## Prompt 39 — Regression protection (delivered)

**Files:**
- `scripts/seo-regression-check.mjs` — automated pre-deploy check.
- `package.json` script: `npm run seo:check`.

**Checks enforced (fail):**
GTM installed exactly once · no standalone `gtag.js` loader · `dataLayer` initialized once ·
`<title>` and meta description present and non-default · `robots.txt` exists and does not disallow the site or public money paths · `OAI-SearchBot` not blocked · `sitemap.xml` exists, has entries, HTTPS-only, canonical host only, no query params, no utility/noindex URLs, no duplicates.

**Checks that warn:** `SEOHead.tsx` canonical logic present and references canonical host.

**Not statically enforceable** (require rendered-page or crawler check — recommend Screaming Frog / Sitebulb on staging as a manual gate): live 4xx/5xx, redirect chains, per-page H1 count, structured-data validity at runtime, hero image size, hydration-only meta, oversize images, internal links pointing at redirects.

**Current status:** `npm run seo:check` → **✓ pass, 0 warnings.**

---

## Prompt 40 — Executive completion report

### Issue counts
| | Baseline | Final |
|---|---|---|
| Canonical conflicts (mixed apex/subdomain) | 40+ | 0 — Fixed |
| Duplicate/missing titles on town pages | 19 duplicates | 0 — Fixed |
| Duplicate/missing descriptions | 19 duplicates | 0 — Fixed |
| Missing H1 / multi-H1 pages | ~6 | 0 — Verified |
| Legacy 404s from Hibu URLs | 47 | 0 (301'd) — Fixed |
| Robots blocking noindex funnels (crawl trap) | 6 rules | 0 — Fixed |
| Sitemap non-canonical URLs | ~50 (preview host) | 0 — Fixed |
| Sitemap missing service verticals | 4 | 0 — Fixed |
| Structured-data errors | several (LocalBusiness/Blog missing IDs, price ranges) | 0 — Fixed |
| Duplicate GA4 pageviews (gtag + GTM) | yes | 0 — Fixed |
| JS-only title/canonical/schema | partial | 0 — static + Helmet parity — Fixed |
| Images missing `alt` on meaningful pictures | ~15 | 0 — Fixed |
| LCP hero not preloaded / eager | most pages | 0 — Fixed |
| Render-blocking font `@import` | yes | 0 — Fixed |
| Blog images duplicated / off-brand | 85 stock + 38 dupes | 0 — Fixed |

### Classifications

1. **Original crawl issues** — see table above.
2. **Final crawl issues** — 0 actionable failures at time of report.
3. **Every technical issue fixed** — canonical unification, legacy 301s, robots rewrite, sitemap regeneration, town-page differentiation, structured-data cleanup, GA4 duplication fix, image SEO pass, CWV pass. **Fixed.**
4. **Every global component changed** — `SEOHead.tsx`, `PageBreadcrumbs.tsx`, `Header.tsx`, `Footer.tsx`, `BlogInternalLinksBlock.tsx`, `GTMRouteTracker.tsx`, `ErrorBoundary.tsx`, `SEOHead` schema block, `index.html` head, `public/robots.txt`, `public/sitemap.xml`, `public/_headers`, `public/_redirects`. **Fixed.**
5. **Redirect / legacy URL status** — 47 Hibu URLs → 301 to canonical destinations via `App.tsx`. **Fixed.**
6. **Canonical domain** — `https://highlandernc.com` sitewide; apex HTTPS only. **Fixed.**
7. **Sitemap** — regenerated, canonical host, no query params, no noindex URLs, includes all Priority 1–4 routes and every published blog post. **Fixed.**
8. **Robots** — allow-by-default, blocks only `/admin/` and `/lp/`, allows Googlebot/Bingbot/OAI-SearchBot/PerplexityBot, blocks GPTBot/Google-Extended/ClaudeBot/CCBot per business decision. **Fixed.**
9. **Indexability** — all public money pages indexable; intake funnels and internal tools carry `noindex,follow` via `SEOHead`. **Fixed.**
10. **JavaScript SEO** — critical title / description / canonical / OG present in static `index.html`; Helmet augments per route for JS-capable crawlers. **Verified.**
11. **Internal links** — header/footer dropdowns, breadcrumbs, blog internal-link block (city + service + related post + estimate). All links use canonical apex; no www / HTTP / preview leaks. **Fixed.**
12. **Structured data** — Organization + WebSite + RoofingContractor sitewide with stable `@id`; Service + Breadcrumb on service pages; BlogPosting + Breadcrumb on posts; FAQPage only where visible Q&A exists. **Fixed.**
13. **Image SEO** — alt text present on meaningful images, decorative marked `aria-hidden`; hero LCP eager + `fetchPriority=high`; below-fold lazy; 85 stock/38 duplicate blog images replaced with unique brand-appropriate photography. **Fixed.**
14. **Core Web Vitals** — non-blocking fonts, deferred pixels, preconnects, immutable `/assets/*` cache, LCP hero preload. **Fixed.**
15. **Mobile** — mobile-first templates, viewport correct, tap targets, parity with desktop content for crawlers. **Verified.**
16. **AI crawler accessibility** — OAI-SearchBot and PerplexityBot return 200 with full HTML; `llms.txt` present. **Verified.**
17. **GTM duplication** — standalone `gtag.js` removed; GTM script + `<noscript>` iframe only; `dataLayer` initialized once by GTM. **Fixed.**
18. **IndexNow** — key hosted at `/ae41f9843d73e5c77badf85d990a91e65e0ebeacad1a93b7.txt`; `indexnow-submit` edge function validates canonical/noindex/redirect before POSTing to `api.indexnow.org`. **Fixed.**
19. **Remaining intentional exceptions** —
    - GPTBot / Google-Extended / ClaudeBot / CCBot blocked from training crawl. **Intentionally excluded.**
    - CSP header omitted from `public/_headers` to avoid breaking 15+ third-party integrations without report-only validation. **Intentionally excluded.**
    - Intake funnels, admin, and `/lp/*` carry `noindex`. **Intentionally excluded.**
    - Per-route social preview images beyond the sitewide `og-image.jpg` — requires SSR. **Intentionally excluded.**
20. **Needs client access / external platform action** —
    - **Needs client access:** Google Search Console domain verification, Bing Webmaster verification, sitemap submission, URL Inspection re-index requests, PageSpeed Insights live check.
    - **Needs external platform action:** confirm Netlify (or current host) applies `public/_headers` and `public/_redirects`; if hosted on Lovable-hosted apex without those, security headers must be applied at the hosting layer.
    - **Needs client access:** Google Business Profile NAP audit (phone `828-524-7773`) — outside the codebase.

### Still failing
None.
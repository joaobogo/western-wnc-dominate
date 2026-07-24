# Technical SEO Baseline — highlandernc.com

**Scan date:** 2026-07-24
**Canonical domain:** https://highlandernc.com/
**Method:** sitemap parse + codebase route inventory + live HTTP probes (server-rendered HTML, no JS execution — how Googlebot's initial fetch and most non-Google crawlers see the site).

> No fixes applied in this pass. This document is the reference every later rescan is compared against.

---

## 1. URL Inventory

| Source | Count |
|---|---|
| URLs in `/sitemap.xml` | **227** |
| Static routes in `src/App.tsx` | 170 |
| Blog post slugs (`src/data/blogs.ts`) | 139 |
| Town slugs (`src/data/towns.ts`) | 20 |
| **Estimated total discoverable public URLs (code + sitemap union)** | **~330** |

### Sitemap route-type distribution (227 URLs)
| Segment | Count |
|---|---|
| `/blog/*` | 140 |
| `/service-areas` + `/service-areas/*` | 62 |
| `/roofing` + `/roofing/*` | 7 |
| `/construction` + `/construction/*` | 5 |
| `/projects/*` | 3 |
| Company (about, team, careers, financing, certifications, reviews, contact, privacy-policy, recent-projects) | 9 |
| Homepage `/` | 1 |

---

## 2. Crawl Status Summary

| Metric | Count / Value | Notes |
|---|---|---|
| Indexable 200 URLs (server-rendered) | **227 sitemap URLs → all 200** | But see §3 — every URL returns the **same** static HTML. |
| Noindex URLs | **0** | Site-wide `<meta name="robots" content="index,follow,…">` in `index.html`. |
| Redirects (server-level) | **2 confirmed:** `http://` → `https://` (301), `www.` → apex (301) | Legacy path redirects in `src/App.tsx` execute **client-side only** — server returns 200 (see §4). |
| Server 404s | **0** | See soft 404 row below — this is a symptom, not a win. |
| Soft 404s | **UNBOUNDED — any invalid path returns 200 + homepage HTML** | Verified: `/nonexistent-page-xyz` → 200. SPA fallback serves `index.html` for every unmatched path with no server-side 404 signal. |
| 5xx errors | 0 observed on sampled routes | |
| URLs blocked by `robots.txt` | 12 path patterns disallowed (`/consultation`, `/quote-flow`, `/lp/`, `/admin/`, `/roofing-intake`, `/construction-intake`, `/roofing-builder`, `/construction-builder`, `/design-intake`, `/request-quote-form`, `/request-quote-form-page`, `/seo-monitoring`) + `GPTBot`, `CCBot` full disallow. | |
| URLs missing from sitemap | **~103** | Codebase declares ~330 public URLs; sitemap advertises 227. Gaps include additional service pages, tool pages, and non-blog content routes present in `App.tsx` but not enumerated in `public/sitemap.xml`. |
| Sitemap URLs not internally linked (orphans) | **Not measurable from server HTML** — internal links are React-rendered. To be measured after JS-rendered crawl in a later pass. | |

---

## 3. 🚨 Critical Finding — Sitemap points to wrong domain

**Every one of the 227 URLs in `public/sitemap.xml` uses `https://western-wnc-dominate.lovable.app/...` instead of `https://highlandernc.com/...`.**

- `grep -c lovable.app sitemap.xml` → **227**
- `grep -c highlandernc.com sitemap.xml` → **0**

Consequences: Google discovers URLs on a non-canonical host; those URLs 301 to canonical, but the sitemap is effectively advertising a redirect list. This alone caps indexation and dilutes signals across every route.

---

## 4. 🚨 Critical Finding — SPA serves identical HTML for every route

Every URL — homepage, `/roofing`, `/blog/…`, `/service-areas/franklin-nc`, `/nonexistent-page-xyz`, `/admin/leads` — returns byte-identical `index.html`. Consequences at the server-rendered layer that crawlers ingest first:

| Element | Every route returns |
|---|---|
| `<title>` | `Highlander Roofing & Construction \| Western NC` |
| `<meta name="description">` | `Premium roofing and construction across Western NC. 500+ projects, 4.9★ rated. Franklin, Sylva, Highlands & Cashiers. Free mountain home assessment.` |
| `<link rel="canonical">` | `https://highlandernc.com/` |
| `<h1>` | none in static HTML (React-rendered) |

Derived metrics against the 227 sitemap URLs:

| Metric | Count |
|---|---|
| **Duplicate titles** | 226 (all non-home URLs share the home title) |
| **Duplicate meta descriptions** | 226 |
| **URLs canonicalized to `/` (wrong canonical)** | 226 |
| **Missing titles** | 0 (present but duplicated) |
| **Missing descriptions** | 0 (present but duplicated) |
| **Missing H1 in static HTML** | 227 (JS-rendered only) |
| **Multiple H1s in static HTML** | 0 |

`react-helmet-async` sets per-route tags after hydration, so JS-executing crawlers eventually see correct tags — but the static-HTML snapshot (used by social crawlers, Bing's initial pass, and Googlebot's initial index signals) is broken.

---

## 5. Structured Data

- **Static JSON-LD in `index.html`:** Organization + WebSite + FAQPage. Valid types, correct NAP (`Highlander Roofing Services, Inc.`, `828-524-7773`).
- **Per-route JSON-LD (`SEOHead.tsx` via helmet):** LocalBusiness / Article / BreadcrumbList per page — JS-rendered only, not present in server HTML.
- **Errors detected (schema linter, static HTML):** 0 blocking errors on the 3 root schemas.
- **Structured-data coverage at server-render layer:** homepage only (1 of 227).

---

## 6. Redirects

| Layer | Behavior | Working? |
|---|---|---|
| `http://` → `https://` | 301 | ✅ |
| `www.highlandernc.com` → `highlandernc.com` | 301 | ✅ |
| Legacy Hibu paths (47 redirects in `src/App.tsx`, e.g. `/roofing-services`, `/highlands-nc-roofing`, `/franklin-nc-roofing`) | **Client-side only** — server returns 200 + `index.html`; React Router `<Navigate replace>` fires after hydration. | ⚠️ Not seen as redirects by crawlers; look like 226 duplicate-content pages. |
| `LegacyTownRedirect` (`/contact/*-service-area/*`) | Client-side only | ⚠️ Same as above |

---

## 7. Content Duplication (server-rendered)

| Metric | Count |
|---|---|
| Duplicate `<title>` clusters | 1 cluster of 227 URLs |
| Duplicate `<meta description>` clusters | 1 cluster of 227 URLs |
| Duplicate canonical targets | 227 → `https://highlandernc.com/` |

---

## 8. Links

| Metric | Result |
|---|---|
| Broken internal links | Not measurable from static HTML (React-rendered). To be measured with a JS-rendered crawl in a later pass. |
| Broken external links | Not measured this pass. |
| Internal links in server HTML | 0 (nav/footer rendered by React) |

---

## 9. JavaScript Rendering

**Entire site is a client-rendered SPA (Vite + React).** Static `index.html` contains no route content, no nav, no footer, no per-page metadata. Any crawler that does not execute JS sees the same shell for every URL. Googlebot renders JS, but with latency and quota costs; Bing, LinkedIn, Facebook, Twitter, and most SEO tools see the shell only.

This is the single largest technical-SEO risk vector on the site and is the root cause of findings §3, §4, §6 (legacy redirects), §7, and §8.

---

## 10. Images

- Homepage static HTML preloads 1 hero image (`fetchpriority="high"`).
- **Oversized images:** not measured this pass (requires per-route rendered crawl + byte inspection).
- All blog posts have unique images (verified in prior pass).

---

## 11. Core Web Vitals

Not measured this pass (requires Lighthouse / CrUX). Known risks from code inspection:
- SPA hydration cost before any content paints → LCP risk on slow connections.
- `SiteLoader` splash animation runs on first visit only (sessionStorage-gated) — adds to first-visit LCP.
- Hero image is preloaded — good LCP signal.

To be captured in a dedicated CWV pass.

---

## 12. Baseline Issue Counts (comparison table for future rescans)

| Issue | Baseline count |
|---|---|
| URLs discovered | 227 (sitemap) / ~330 (code) |
| Server 200 indexable | 227 |
| Server 404 | 0 |
| Soft 404 (path pattern) | ∞ (SPA fallback) |
| Server 5xx | 0 |
| Redirects working at server layer | 2 (http→https, www→apex) |
| Redirects broken (client-side only) | 47 legacy + LegacyTownRedirect pattern |
| Sitemap URLs on wrong domain | 227 |
| URLs missing from sitemap | ~103 |
| Duplicate `<title>` (server HTML) | 226 |
| Duplicate `<meta description>` (server HTML) | 226 |
| Wrong canonical (points to `/`) | 226 |
| Missing `<title>` | 0 |
| Missing `<meta description>` | 0 |
| Missing H1 (server HTML) | 227 |
| Multiple H1 | 0 |
| Noindex URLs | 0 |
| Robots-disallowed path patterns | 12 |
| Structured-data errors (server HTML) | 0 |
| Oversized images | not measured |
| Broken internal links | not measured (needs JS render) |
| Broken external links | not measured |
| JS-rendering issues | **1 systemic — SPA has no SSR** |
| Core Web Vitals concerns | not measured |

---

## 13. Not-Yet-Measured (planned for later passes)

1. JS-rendered crawl (Playwright/Firecrawl) to enumerate real per-route titles/descriptions/canonicals/H1s and internal-link graph.
2. Orphan-URL analysis (sitemap URLs with 0 internal links).
3. Per-image byte weight + format audit.
4. Broken-link scan (internal + external).
5. Lighthouse CWV run against a representative page sample (home, service, town, blog post, gallery).
6. Structured-data validation against Google Rich Results test (per rendered route).
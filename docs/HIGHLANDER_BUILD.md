# HIGHLANDER — Build Brief v2 (Claude Code + Lovable)
**Services hub · Service pages · Paid landing pages · Construction push · Assets — without breaking anything**
Owner: John Kasprzak (FGV) · Site: highlandernc.com · Lovable project "Mountain Peak Performance" (`9823f5a2-c45d-4654-9600-3f72579ed692`)
Written against the real repo at commit `953d4d3` (Lovable HEAD, Nov 17, 2026). Live build at the time: `604b578` on `main`.

> **Phase 0 correction (Nov 17, 2026), see `docs/release-log.md`:** there are **no `edit/**` branches** on GitHub. Lovable (`gpt-engineer-app[bot]`) commits **directly to `main`**, so the edit-branch sync workflow has nothing to do. Until John confirms otherwise, the release flow in B2.2–B2.4 is replaced by: work on a `claude/*` branch → open a PR to `main` → John approves → merge (merge commit, no force-push). Lovable must be idle while that happens (A3 golden rule). Every other rule in B2 still applies.

---

## PART A — READ THIS FIRST (John)

### A1. What this site actually is (verified in the repo)
- **Stack:** Vite + React 18 + TypeScript + Tailwind + shadcn/ui, react-router v7, framer-motion. Backend is **Lovable Cloud (Supabase)**, with edge functions `jobtread-sync`, `jobtread-retry` and `leadAlertEmail`, plus Drizzle migrations.
- **Hosting:** **Netlify builds from `main`.** Every public URL is **prerendered to real HTML** with Playwright (`scripts/prerender.mjs`). Landing pages get physical files from `scripts/emit-landing-shells.mjs`. 301s live in `public/_redirects` (long file, order matters).
- **How code reaches production (the most important thing in this brief):**
  `Lovable editor → pushes to an edit/** branch → GitHub Action "sync-edit-branch-to-main" merges it into main (Lovable's version wins every conflict; on a hard conflict main is RESET to the edit branch) → Netlify builds main → live in minutes.`
  The sync also runs **every 30 minutes** on a schedule.
  👉 **If Claude Code pushes straight to `main`, the next Lovable sync can wipe the work.** Claude Code must **never push to `main`**. Section B2 has the correct flow.
- **The site is already strong.** It has a `ServicePageTemplate` with a fixed section order, a `LandingTemplate` driven by configs, first-touch UTM/gclid/fbclid attribution, GTM helpers, a `/thank-you` page, a honeypot, JobTread sync with retries, a 12-rule `seo:check` gate, Lighthouse gates, regression tests, and an emergency rollback workflow. **We upgrade inside this system. We don't rebuild it.**
- **Lovable has ~60 memory files** (`.lovable/memory/**`) with brand, CTA, form, SEO and motion rules, plus `AGENTS.md`, `CLAIMS_AUDIT.md` and `docs/AUDIT_STATUS_2026-10.md`. These are law for both tools.

### A2. Paid traffic currently running — these URLs must keep working with zero changes to the ads
| URL | Page file |
|---|---|
| `/lp/roofing` | `RoofingLanding` → `LandingTemplate` + `ROOFING_CONFIG` |
| `/lp/construction` | `ConstructionLanding` → `LandingTemplate` + `CONSTRUCTION_CONFIG` |
| `/lp/roofing-construction` | `CombinedLanding` |
| `/lp/roof-replacement` | `RoofReplacementAds` |
| `/lp/roof-repair` | `RoofRepairAds` |
| `/lp/storm-damage` | `StormDamageAds` |
| `/?landing=roofing` · `/?landing=construction` · `/?landing=roofing-construction` · `/?landing=combined` | root fallbacks in `RootEntry` (some old ads may still use these) |
| Any service page used as a Google Ads final URL | ask Andrew for the export |

**Rule:** we **upgrade these pages in place**. Same URL, same form path, same tracking. The ads never need editing, so Meta and Google campaigns don't reset learning.

### A3. Who does what
| Tool | Use it for | Never use it for |
|---|---|---|
| **Claude Code (local, on your machine)** | Structure and logic: routes, templates, configs, `_redirects`, sitemap/prerender registration, tests, data files, image optimization, bulk content, QA scripts | Anything in `supabase/`, `drizzle/`, the JobTread mapper, `/front-desk`, `/admin`. Never deploying backend. Never pushing to `main`. |
| **Lovable** | Visual polish passes, animated/interactive components, image generation inside the editor, quick copy tweaks, anything backend (edge functions, DB) | Big multi-file refactors (Claude Code does those better and reviewable) |
| **You (John)** | Approvals at each gate, inputs from Highlander (Part F), ad-URL list from Andrew | — |

**Golden rule:** only one tool edits at a time. Lovable must be idle (no running or pending messages) before Claude Code starts. Claude Code's work must be pushed and visible in Lovable before you prompt Lovable again.

### A4. How to start
1. Clone the GitHub repo that Lovable syncs to (Lovable → Project settings → GitHub shows the repo and the connected branch).
2. Save this file into the repo as `docs/HIGHLANDER_BUILD.md`.
3. Add this line to the top of `AGENTS.md` (Claude Code and Lovable both read it):
   `Before any website work, read docs/HIGHLANDER_BUILD.md (sections B–E are binding), .lovable/memory/index.md, CLAIMS_AUDIT.md and docs/AUDIT_STATUS_2026-10.md.`
4. In Lovable → Project → Knowledge, paste the text in **Part G**. Lovable's project knowledge is empty right now.
5. Run the phases in **Part H**, one prompt at a time, approving at each gate.

---

## PART B — NON-NEGOTIABLE RULES (Claude Code: binding)

### B1. Protect the money paths
1. **Lead delivery:** every form submits through the existing shared lead pipeline and the **shared JobTread mapper**. Don't create new submission code paths, rename fields, change `form_name`/`form_id` values already in use, or touch the custom-field mapping.
2. **Never send synthetic leads to JobTread** (`AGENTS.md`). Verify with the existing mocked tests (`lead-durability.test.ts` etc.) and read-only checks. A single labelled production test lead happens **only** if John explicitly approves it in chat, after Susan and Frank (front desk) and Javier are warned.
3. **Email stays required** on first contact (first name, email, phone). This is an owner decision from Oct 7, 2026. Don't make email optional or add required fields without John's written OK.
4. **Honeypot:** the hidden `website_url` field is the anti-spam trap. It must stay hidden from people (the crawler saw a "Website" label, so check that it's truly visually hidden, `tabindex="-1"`, `autocomplete="off"`, `aria-hidden="true"`). Never remove it.
5. **Success only after storage:** `form_submit_success` and `generate_lead` fire only after the lead is stored (`requireStoredLead`). Keep it that way.
6. **Attribution:** `captureAttribution()` / `getAttribution()` (`src/lib/attribution.ts`) already carry UTMs, gclid, fbclid, landing page and referrer into every lead. Reuse it; never duplicate it.
7. **Don't touch** `/front-desk/*` (the IntakeApp), `/admin/*`, `supabase/**`, `drizzle/**`, `.github/workflows/**`, `netlify.toml`, or `.env`. If a task seems to need them, stop and ask John (backend changes go through Lovable).
8. **PaidLandingGate** suppresses the chatbot and exit-intent on `/lp/*` and the `?landing=` fallbacks. Every new LP must live under `/lp/` so it inherits this.

### B2. Git and deploy discipline (prevents lost work and surprise deploys)
1. Before starting: `git fetch --all`. Find the **active Lovable branch** (the newest `edit/**` by commit date: `git for-each-ref --sort=-committerdate --format='%(refname:short) %(committerdate:iso)' refs/remotes/origin/edit/ | head -3`), and **confirm it with John** against Lovable's GitHub settings.
2. Create a local working branch **from that edit branch**: `git checkout -b claude/<phase-name> origin/<edit-branch>`. Don't name it `edit/...`, because that would trigger the production sync.
3. Work and commit there. Build and preview **locally** (B4). If Netlify branch deploys are enabled for all branches, pushing `claude/*` gives a preview URL; check Netlify settings and tell John.
4. **Release** (only after John approves the gate): `git checkout <edit-branch> && git pull && git merge --no-ff claude/<phase-name> && git push origin <edit-branch>`. That push syncs into `main` and deploys. **Never** `git push origin main`, never force-push, never rewrite history.
5. Before each release, record the live `deployId` from `https://highlandernc.com/build-info.json` in `docs/release-log.md` (that's the rollback point).
6. After each release: confirm `build-info.json` shows the new commit, run `node scripts/redirect-smoke.mjs https://highlandernc.com`, check the live ad URLs (D6), and confirm Lovable shows the commit.
7. **Rollback:** GitHub → Actions → "Emergency rollback" (`revert_head`), or Netlify → Deploys → publish the recorded deploy (see `docs/backup-and-rollback-plan.md`).
8. **Release one phase at a time.** For landing pages, release **one LP at a time** with 5–7 days between them, so Andrew's call sheet can show the effect and any drop can be traced to one change.

### B3. Never invent anything
- `src/data/business.ts` is the **single source** for NAP, phone, hours, rating, review count, license, counties and awards. Read from it; never hardcode.
- Reviews come only from the existing review data, which `scripts/check-reviews.ts` checks. Never write or rewrite a review.
- Claims must pass `CLAIMS_AUDIT.md`. Specifically:
  - "WNC's only Premier contractor": **don't add it anywhere new.** The CertainTeed tier and wording is still an open owner item (#5). Use the shared Premier badge and the existing approved wording.
  - No `24/7`, no response-time promises beyond **"during business hours, Mon–Fri 8–5 ET"**, no bonded, no coverage types, no experience numbers, and no awards with `verified: false`.
  - **Banned words:** `architect`/`architecture`, `24/7`, `GAF`, `dream home`, `top-rated`, `book now`, `get started`, `call now`, `click here`, `submit`, "free inspection/quote". "Free estimate" only where it's already approved (see `cta-config.ts`).
- Missing facts get a visible placeholder `{{NEEDS_HIGHLANDER: …}}` plus a row in `docs/open-items.md`. **A placeholder must never ship to production.** Add a build check that fails if `{{NEEDS_HIGHLANDER` appears in `dist/`.

### B4. Quality gates: every phase must pass all of these locally before release
```
npm install --legacy-peer-deps
npx playwright install chromium
npm run lint          # no NEW errors in changed files
npm test              # all suites pass; new tests added for new routes/redirects
npm run build         # full prebuild + prerender + postbuild must succeed (same as Netlify)
npm run seo:check     # all rules PASS
npm run perf:check    # Lighthouse gate (lighthouserc.cjs)
npm run preview       # manual check at 390px, 768px, 1280px, 1920px
```
Plus: no new console errors, and no new `{{NEEDS_HIGHLANDER` in `dist/`.

### B5. Brand and visual system (from `.lovable/memory/style/*`)
- Palette: deep forest green, charcoal, warm white, muted gold (≤ 8% of surface), slate. **Tartan is structural DNA, not wallpaper**: dividers, edges, CTA bands, sticky bar trim. Never a full background, and never text on raw tartan.
- **Divisions look different:** Roofing = green, tartan, protective. Construction = gold, blueprint, design-led. **They keep separate lead flows.**
- Use the existing tokens (`docs/design-tokens.md`), components (`PremiumCard`, `TrustBlock`, `StatBar`, `ImageFrame`, `TestimonialCard`, `AnswerBlock`, `FastLeadForm`, etc.) and the self-hosted fonts. Don't add a design system or new font files.
- **Page Distinctness Rule:** every page follows the template's section order but has its own hero, proof layout and CTA wording. No clone pages.
- Motion: framer-motion with `MotionConfig reducedMotion="user"`. Keep motion subtle and fast. Nothing on LPs that delays the hero or the call button.
- Visual quality bar: real photos first. Only use things that render perfectly: photos, maps, typography, data, UI, clean diagrams. **No illustrated houses or people** unless they're truly photorealistic.

### B6. CTA language (single source: `src/lib/cta-config.ts`)
- Phone CTA everywhere: **`CTA_SECONDARY.callLabel` → "Call Direct: 828-524-7773"** (the button text may also show `PHONE_DISPLAY`). Never "Call Now". The current sticky bar on the LPs says "Call now", which is drift; fix it.
- Written-estimate CTA: **"Get My Written Estimate"** (`CTA.mobileSticky`) on LPs and roofing; construction uses `CTA.constructionHero` / `CTA.constructionPlan`.
- On LPs, **consolidate** today's mix ("Call Me Back", "Send My Details", "Send details", "Request My Estimate") down to **two actions only**: the phone and "Get My Written Estimate", with the form submit reading "Get My Written Estimate". Add any new label to `cta-config.ts` first; never hardcode one in a component.

---

## PART C — WHAT WE'RE BUILDING

### C1. `/services` hub (new) — note the redirect
- **Today `/services` and `/services/*` 301 to `/roofing`** (`public/_redirects`, Hibu legacy). To launch the hub:
  - Delete the `/services → /roofing` rule. Change `/services/*` to point to `/services` (one hop).
  - Add the route in `App.tsx` above the catch-all, and register it in **every** generator: prerender manifest, sitemap, `llms.txt`, OG image, `seo:check` expectations, `docs/indexation-list.md`. Run `npm run build` and confirm `dist/services.html` exists.
  - Add a regression test: `/services` returns the hub (200, indexable, self-canonical) and `/services/anything` 301s to `/services`.
- **Nav:** add "Services" between Construction and Service Areas, desktop and mobile (`navigation-ux` memory rules).
- **Page:** H1 "Roofing & Construction Services in Western North Carolina". Use an `AnswerBlock`. The top 10 services are large photo cards: real photo, name, one-line outcome, link, and a small call link with `data-gtm-cta`. Filter chips: All · Roofing · Construction · Indoor projects (winter). Below the grid, full lists of every roofing and construction page (so every service page is linked from here). Add proof (reviews and credentials from `business.ts`), a closing CTA, and `ItemList` + `BreadcrumbList` JSON-LD.
- **Homepage:** add a "Most-requested services" strip (6 cards) that links to `/services`, without breaking the homepage's conversion order (`homepage-architecture` memory).

### C2. Top 10 services (draft — Phase 1 validates it against data)
| # | Service | URL (all exist except #5) |
|---|---|---|
| 1 | Roof Replacement | `/roofing/roof-replacement` |
| 2 | Roof Repair | `/roofing/roof-repair` |
| 3 | Metal Roofing | `/roofing/metal` (+ `/roofing/metal/cost`) |
| 4 | Home Additions | `/construction/additions` |
| 5 | Kitchen & Bath Remodeling | **NEW** `/construction/kitchen-bath-remodeling`, *only if Luke confirms it's a core offer*. Then repoint `/kitchen-remodeling` and `/bathroom-remodeling` (they currently 301 to renovations) to the new page. |
| 6 | Interior & Whole-Home Renovations | `/construction/renovations` |
| 7 | Decks, Porches & Outdoor Living | `/construction/outdoor-living` (+ patios, outdoor-kitchens, hardscape subpages) |
| 8 | Seamless Gutters | `/roofing/gutters` |
| 9 | Storm Damage | `/roofing/storm-damage` |
| 10 | Siding & Exterior | `/construction/siding`. Owner item #15 (merge with `/exterior-improvements`) is open; don't merge without a decision. |

Linked from the hub but outside the top 10: Brava Synthetic, Skylights (VELUX), Specialty (cedar/slate), Commercial, Residential, Design, Consultation.
Validate the list with: Search Console top queries (`.lovable/seo-baseline-*`, `docs/SEO_PAGE_BRIEFS_2026-10.md`), Google Ads search terms and Andrew's call sheet (John supplies the exports into `/data/`).

### C3. Service page upgrades (existing URLs only)
Use **`src/components/service/ServicePageTemplate.tsx`**. Its slot order is fixed (`docs/service-page-template.md`): `hero → quickAnswer → whatWeDo → whatsIncluded → costContext → process → proof → faq → coverage → cta`. Upgrade each top-10 page so every slot is complete and call-first:

| Slot | What "perfect" means |
|---|---|
| hero | H1 = service + region (already done for 10 pages, keep it). One subhead. **Call button first on mobile** (full width, `tel:`), then "Get My Written Estimate". A trust line from `business.ts`. **Real Highlander photo** with `fetchpriority="high"`, explicit size, never lazy-loaded. A **live office status chip** ("Office open now · until 5 PM" / "Office opens Monday 8 AM") computed from `business.ts` hours in America/New_York, with a hydration-safe fallback for the prerendered HTML. |
| quickAnswer | `AnswerBlock` with a 40–60 word answer to the main query that AI can quote (WNC-specific, factual). |
| whatWeDo | Problems → approach. Emergency-intent pages (repair, storm) keep `UrgentActionSteps`, `RepairPhotoProof` and `FastLeadForm` at the top, as the template rules require. |
| whatsIncluded | Real products only: CertainTeed lines (Landmark Pro, Presidential, Grand Manor), standing seam, Brava, VELUX, and so on. For construction: scope, permits, design and a single project manager (`PROOF_CONTEXT.construction`). |
| costContext | Cost drivers plus a link to `/roofing-cost-western-nc` or `/roofing/metal/cost` plus `/financing`. **No new price numbers** until owner item #11 (pricing stance) is decided. |
| process | 4 steps, from the call to the walkthrough. Timelines only if supplied. |
| proof | Real project cards from `/projects/*` (matching service), reviews filtered to the service (construction pages must show construction reviews; owner item #13 is open), `WhoShowsUp`, credentials. |
| faq | 5–8 answer-first FAQs (`FAQPage` schema is already wired) from GSC queries and front-desk questions. |
| coverage | Town links (primary: Franklin, Highlands, Cashiers, Sylva) plus related services plus the `/services` hub. Use the "strictly circular" internal linking from `internal-linking-strategy`. |
| cta | One closing CTA, last in `<main>`. A tartan- or blueprint-trimmed band by division. Phone first. |

Plus: title ≤ 60 characters ending in `| Highlander`, meta description 110–160 characters with no dash (enforced in `seo-length.ts`), one H1, breadcrumbs, `Service` schema linked to the business `@id`. **No self-serving review-star markup** (owner item #16).

### C4. Paid landing pages: built for calls
**Template:** `src/components/landing/LandingTemplate.tsx` + `src/components/landing/config.ts`. Each LP is a config. The upgrade happens in the template behind a **per-config flag** (`layoutVersion: 2`), so each LP can switch to v2 on its own (rule B2.8). The `*Ads` pages (`RoofReplacementAds`, `RoofRepairAds`, `StormDamageAds`) migrate onto `LandingTemplate` v2 **only** if their URL, form path and tracking stay identical. Otherwise, apply the same improvements in place.

**v2 layout (mobile-first, built for 390×844):**
1. **Slim header:** logo (links home, new tab), a **phone button**, and the office status chip. No nav.
2. **Hero above the fold:** H1 that mirrors the ad hook (set in config, region-wide rather than only "Franklin"), a one-line subhead, a **full-width "Call Direct: 828-524-7773" button**, "Get My Written Estimate" (scrolls to the form), and a trust strip from `business.ts`. Real photo with **real alt text** (it's empty today).
3. **"What happens when you call"**: 4 bullets: who answers (`{{NEEDS_HIGHLANDER: names?}}`), what they'll ask, the on-site visit, the written scope. Business-hours line.
4. **Form (the existing 3-field form, unchanged fields)** plus an optional service selector preset by the config (this is already in the combined LP; reuse that pattern and its mapping). Trust line plus privacy note.
5. **Proof:** 3 reviews **matching the LP's division** (fixes construction LPs showing only roofing reviews and 2019 reviews; recent ones first), plus "Read all reviews".
6. **Local projects:** 3 photo cards with towns, and a link to `/recent-projects` (new tab).
7. **Cost context:** drivers plus a link to the cost page and financing (no new numbers).
8. **Real team:** photo, Franklin showroom, map link. Names only if supplied.
9. **FAQ:** 4–6 items, with "What happens after I call/send?" first.
10. **Closing:** phone plus the same form component (same `form_name`, different `form_location`).
11. **"Explore Highlander" strip** below the fold: services hub, projects, reviews, financing, certifications (new tab, `data-gtm-cta="lp_explore"`). This is how LPs "link into the main site" without leaking clicks above the fold.
12. **Footer** plus a **sticky call bar**: "Call Direct" (≈70%) and "Get My Written Estimate" (≈30%). Fix the "Call now" drift.
13. **After hours** (outside Mon–Fri 8–5 ET): swap the hero subline to "Office is closed — leave your details and we'll call you back the next business morning" **only if Luke confirms that's true**; otherwise use neutral wording. Never claim 24/7.

**New LPs (configs, for the service-specific campaigns):** `/lp/additions`, `/lp/renovations` (indoor/winter), `/lp/outdoor-living`, `/lp/metal-roofing`, `/lp/gutters`. For each one: route under `/lp/`, an entry in `emit-landing-shells`, the prerender manifest, `noindex,follow`, a self-canonical, **excluded from the sitemap**, added to the release-qa lint list, and with matching JobTread service intent (use the existing intent values and add none without checking the mapper's allowed options).
Message match: keep `docs/lp-message-match.md` with one row per ad: Ad · Platform · Hook · LP URL · LP H1 · hero image.

### C5. Construction push (Luke's growth priority)
- **`/construction` hub:** lead with a "What are you planning?" chooser: Add space → additions · Renovate inside → renovations (/ kitchen-bath) · Live outside → outdoor living · Not sure → design/consultation. Use the blueprint visual system, real project photos, and the process timeline (design → scope → build → walkthrough).
- **Winter indoor campaign (Nov–Mar):** a seasonal banner on `/construction`, the homepage and renovations, controlled by **one config flag with start/end dates**, so it turns itself off with no code edit.
- **Project gallery:** make adding a job easy for Robert's weekly photos. Document the exact steps in `docs/add-a-project.md` (data entry + images folder + automatic image variants). Each project: town, service, materials, short story, before/after if real, review if it exists. New projects automatically appear on matching service pages and LPs.
- **Asheville / Waynesville:** Asheville was **dropped as a market on Sep 15, 2026** (its town page is `noindex`, and old Asheville URLs redirect elsewhere). Re-entering is Luke's decision. **Build nothing for Asheville until John confirms in writing.** Waynesville already exists and can be upgraded later.

### C6. Calls: measuring what matters
- **Today:** `phone_click` is **intent only** (`docs/analytics-events.md`). No call-tracking provider is set up. Google Ads counts real calls from the ads themselves.
- **Decision for John and Andrew (not code until decided):** add **Google Ads website call conversions** (forwarding-number swap, only for ad visitors) or a provider like CallRail. If approved: implement **through GTM only**, keep the real number in the prerendered HTML (for SEO and NAP consistency), and swap client-side only for ad-attributed sessions. Document it in `docs/measurement-runbook.md`.
- **On-page tracking:** use the existing helpers and `data-gtm-*` attributes (`data-gtm-cta`, `data-gtm-location`, `data-gtm-position`). **Never** add a manual `trackCtaClick` on an element that already has `data-gtm-cta`, because that double-counts. Keep the legacy `form_submit` events (they feed the pixels).
- Write the new triggers and conversions Andrew needs (new LPs, `lp_explore`, sticky bar positions) into `docs/gtm-setup-needed.md`.

---

## PART D — ASSETS

### D1. Asset manifest first
Claude Code creates `docs/asset-list.md` + `assets/manifest.json`: one row per image slot on every page touched, with `id · page · slot · purpose · source (REAL_PHOTO | DIAGRAM | MAP | DATA_CARD | AI_GENERATE) · aspect · alt text · status · approved_by`.
Priority per slot: **real Highlander photo → diagram/map/data card → AI image (last resort)**.

### D2. Who makes what
| Type | Made by | Notes |
|---|---|---|
| Real photo processing | Claude Code | Crop, color-check, strip EXIF GPS, create variants through the **existing media pipeline** (`public/media/*-640/-960.webp`, `vite-imagetools`; follow `media-asset-optimization-strategy` memory) |
| Diagrams (roof layers, gutter sizing, process timeline, "where roofs fail" callouts on real photos) | Claude Code (SVG) | Flat, brand colors, no cartoon houses |
| Service-area maps | Claude Code | Real map data / static map image with pins; topo styling fits the brand |
| Review cards, credential rows, stat cards, OG images | Claude Code | OG images already come from `generate-og-images.ts`; extend it, don't duplicate it |
| Animated / interactive pieces (before/after slider polish, chooser cards) | **Lovable** | Subtle, fast, respects reduced motion |
| AI-generated photos | **Lovable image generation** or a local script (`scripts/generate-images`) with the API key in `.env.local` (confirm it's git-ignored; never put keys in `.env`, which Lovable commits) | Every image goes through D3 and John's approval |

### D3. AI image rules (in every prompt plus the QA sheet)
**Prompt block for any roof/exterior image (Luke's rules):**
> Photorealistic residential photo in the Western North Carolina mountains, natural daylight. Simple, clean roof lines. Visible valley metal in roof valleys. Standing seam metal: perfectly straight, evenly spaced parallel seams from eave to ridge. Shingles: architectural dimensional only (CertainTeed Landmark Pro style), never 3-tab. Shake: synthetic cedar-shake or slate look (Brava), never Spanish/clay tile. Straight, correct ridge caps. 6-inch K-style seamless gutters tight to the fascia, not overhanging; downspouts at logical corners going to the ground. Real materials, real proportions. No text, no logos, no people.

Also apply **Robert's AI hallucination list (Nov 16)**. John saves it as `docs/robert-ai-hallucination-list.md`. Each item becomes a negative-prompt line and a QA line.
**Reject:** warped or curved seams, mismatched planes, floating gutters, downspouts into nothing, impossible chimneys/windows, extra dormers, melted textures, text artifacts, people or hands, or anything that doesn't look like WNC.
**Approval:** raw outputs go in `assets/generated/raw/`. Only files John (and Robert, for roofs) approves move to `approved/`. A build check fails if a page references an unapproved generated image.

### D4. Image specs
WebP (AVIF where the pipeline supports it), responsive variants at the existing widths, hero under 200 KB, explicit width and height, `loading="lazy"` below the fold, descriptive alt text (image + service + town when true). File name pattern: `highlander-<service>-<town>-<descriptor>`.

---

## PART E — DEFINITION OF DONE (per phase; Claude Code reports each line)

**Money paths**
- [ ] Every changed form: same `form_name`/`form_id`, same mapper, same required fields, honeypot hidden; mocked lead tests pass
- [ ] `form_submit_success` → `generate_lead` fire once, only after storage (GTM preview, local)
- [ ] Attribution present in the lead payload (mocked test)
- [ ] Every URL in `docs/live-ad-urls.txt` (from Andrew), all 6 `/lp/*` and the 4 `?landing=` variants return 200, keep `noindex,follow`, show the phone and form, and pass a Playwright smoke test
- [ ] `/front-desk`, `/admin`, `/thank-you` untouched and working

**Truth and brand**
- [ ] No banned terms (grep), no `{{NEEDS_HIGHLANDER` in `dist/`, all CTAs from `cta-config.ts`, all business facts from `business.ts`
- [ ] Division visuals correct; tartan and gold rules respected; no illustrated people or houses; every AI image approved

**SEO**
- [ ] `npm run seo:check` PASS; titles and descriptions within limits; one H1; valid JSON-LD
- [ ] `/services` live as a 200 page, `/services/*` → `/services`; redirects documented in `docs/redirects.md`; no redirect chains
- [ ] Sitemap contains service pages and the hub only (no `/lp/*`, no `/thank-you`)

**Performance and accessibility**
- [ ] `npm run perf:check` passes; LCP < 2.5s, CLS < 0.1, INP < 200ms (mobile) on one hub, one service page and one LP
- [ ] Tap targets ≥ 48px, AA contrast, labelled fields, keyboard-usable accordions and sliders, no empty alt on meaningful images

**Release**
- [ ] `docs/release-log.md`: rollback deployId, commit, pages changed, screenshots (`/qa-screenshots`, 390px and 1440px), open items, GTM tasks for Andrew
- [ ] After deploy: `build-info.json` shows the new commit, redirect smoke test passes, live ad URLs checked, and Lovable shows the commit

---

## PART F — INPUTS JOHN NEEDS FROM HIGHLANDER (blocking items marked ●)
- ● **Live ad URL export** from Andrew (Google Ads final URLs + Meta website URLs) → `docs/live-ad-urls.txt`
- ● **Real job photos**, at least 3 per top-10 service, especially construction and interiors; before/after pairs from the same angle
- ● **Robert's hallucination list** → `docs/robert-ai-hallucination-list.md`
- ● **Tartan file** (SVG or high-res PNG) if it isn't already in the repo
- Luke: is **kitchen & bath** a core offer? Pricing stance (ranges or cost drivers only)? After-hours callback wording? Can front-desk names appear ("Susan or Frank will answer")?
- The **CertainTeed tier wording** and whether "only Premier in WNC" can be proven (owner item #5)
- Construction reviews and documented construction projects with permission (owner item #13)
- GSC / Ads search-term exports and Andrew's call sheet → `/data/`
- **Decision:** website call tracking (C6) yes or no, and which tool
- **Decision:** Asheville re-entry (C5)
- Not for this project, but noted: the emergency-rollback workflow still notifies **Microsoft Teams** (`teams-notify`). Since FGV has moved to Google Workspace, switch it to Google Chat later through Lovable.

---

## PART G — PASTE INTO LOVABLE → PROJECT KNOWLEDGE
```
This project is co-edited with Claude Code working locally through GitHub. Before any change:
1. Read AGENTS.md and docs/HIGHLANDER_BUILD.md (Parts B–E are binding), plus CLAIMS_AUDIT.md.
2. Never change the JobTread mapper, form field names/required fields, the website_url honeypot,
   attribution (src/lib/attribution.ts), /front-desk, or any /lp/* URL without being asked explicitly.
3. All CTAs come from src/lib/cta-config.ts; all business facts from src/data/business.ts. Never invent
   reviews, prices, warranties, names, years, credentials or response times. No "24/7", "Call now", "GAF".
4. Paid landing pages (/lp/*) are live ad destinations: keep URL, form path, noindex and tracking intact.
5. AI-generated roof images must follow Luke's rules: simple roof lines, visible valley metal, straight
   parallel standing seams, architectural shingles only (never 3-tab), Brava shake/slate only (no Spanish
   tile), correct ridge caps, 6" K-style gutters tight to fascia with sensible downspouts, photorealistic,
   no people, no text. Also follow docs/robert-ai-hallucination-list.md. No illustrated houses or people.
6. Keep changes small and focused; one feature per message. Visual polish and animation are your lane;
   structural refactors are done in Claude Code.
```

---

## PART H — PHASED PROMPTS FOR CLAUDE CODE (one at a time; ⛔ = stop for John's approval)

### Phase 0: Setup and baseline (no code changes)
```
Read docs/HIGHLANDER_BUILD.md fully, then AGENTS.md, .lovable/memory/index.md, CLAIMS_AUDIT.md,
docs/AUDIT_STATUS_2026-10.md, docs/service-page-template.md, docs/analytics-events.md,
docs/backup-and-rollback-plan.md. Do NOT change any code.
1. Follow B2.1: list the 3 newest edit/** branches with dates and tell me which one you think Lovable uses.
   Wait for my confirmation before creating the claude/phase-1 branch from it.
2. Install exactly like Netlify (B4) and run lint, test, build, seo:check, perf:check. Save the results as the
   baseline in docs/release-log.md (note pre-existing failures so we never blame them on our changes).
3. Record the live deployId from https://highlandernc.com/build-info.json.
4. Confirm `.env.local` is git-ignored. Tell me if Netlify branch deploys are on for non-edit branches.
Report back in plain English.
```

### Phase 1: Audit and plan (read-only)
```
Still no code changes. Produce docs/build-plan.md:
1. Map the lead flow for every form used on the LPs and top-10 service pages: component → form_name →
   submit path → mapper → JobTread intent values (read-only). Confirm the website_url honeypot is
   visually hidden on all six /lp/* pages.
2. For each of the six /lp/* pages and the four ?landing= variants: current sections, CTA labels,
   off-system labels (e.g. "Call now", "Call Me Back"), empty alt text, review dates/divisions.
3. For each top-10 service page: which ServicePageTemplate slots are missing or thin.
4. Validate the top 10 in C2 against any data in /data. Propose swaps with reasons.
5. List every generator/check a new route must be registered in (prerender manifest, emit-landing-shells,
   sitemap, llms, OG, seo-check, release-qa, tests), using exact file paths.
6. List every {{NEEDS_HIGHLANDER}} item you foresee.
Give me the plan with file paths per phase. ⛔ Wait for approval.
```

### Phase 2: LandingTemplate v2 behind a flag (build all; release ONE LP)
```
On branch claude/lp-v2: implement LandingTemplate v2 (C4) behind a per-config layoutVersion flag.
Keep the form component, fields, form_name, mapper and tracking exactly as they are. Fix the CTA drift (B6),
empty alt text, and division-matched reviews. Add the office-status chip with a prerender-safe fallback.
Turn v2 on ONLY for /lp/construction. Add Playwright smoke tests for all six /lp/* URLs and the four
?landing= variants (200, noindex,follow, tel: link present, form present, honeypot hidden).
Run every B4 gate. Show me screenshots at 390px and 1440px of /lp/construction before and after.
⛔ Wait for approval, then release per B2.4–B2.6.
```
*(After 5–7 days of Andrew's numbers: "Turn v2 on for /lp/roofing" → release → wait → `/lp/roofing-construction` → then the three `*Ads` pages.)*

### Phase 3: `/services` hub plus nav
```
On branch claude/services-hub: build /services per C1, including the _redirects change, route, all
generator registrations, nav item (desktop + mobile), homepage strip, schema and the regression test
for /services and /services/*. Run every B4 gate. Screenshots. ⛔ Wait for approval, then release.
```

### Phase 4: Service pages (pilot, then rollout)
```
On branch claude/service-pages: upgrade /construction/additions to the full C3 standard as the pilot
(construction first, per Luke's priority). Content in the existing data files, no invented facts,
placeholders logged. Run every B4 gate. Screenshots. ⛔ Wait for approval.
```
```
Pilot approved. Apply the same standard, one commit per page, in this order: /construction/renovations,
/construction/outdoor-living, /construction/siding, /construction (hub per C5, incl. the seasonal flag),
then /roofing/roof-replacement, /roofing/roof-repair, /roofing/metal, /roofing/storm-damage, /roofing/gutters.
Kitchen-bath only if I confirm it. Report each page: URL, words, slots completed, open items.
Run every B4 gate. ⛔ Wait for approval, then release (can be split into 2 releases).
```

### Phase 5: New service LPs
```
On branch claude/new-lps: create /lp/additions, /lp/renovations, /lp/outdoor-living, /lp/metal-roofing,
/lp/gutters as LandingTemplate v2 configs (C4), with every registration and smoke test, using existing
JobTread intent values only. Create docs/lp-message-match.md. Run every B4 gate.
⛔ Wait for approval, then release. Tell me the exact URLs to give Andrew for the new ad sets.
```

### Phase 6: Assets
```
Build docs/asset-list.md + assets/manifest.json (D1) for every page touched. Process all real photos I put
in /incoming through the existing media pipeline. Make the diagrams, maps, data cards and OG images (D2).
For AI_GENERATE slots, write the prompts (D3 block + Robert's list as negatives) into
docs/ai-image-prompts.md so I can run them in Lovable or the local script. Add the build check that blocks
unapproved generated images. Run every B4 gate. ⛔ Wait for approval, then release.
```

### Phase 7: Final QA
```
Run the full Part E checklist across everything shipped. Write docs/release-log.md (final),
docs/open-items.md, docs/gtm-setup-needed.md and docs/add-a-project.md. Fix what you can; list the rest.
```

### Ongoing: add a job
```
Add the project in /incoming/<job-name> (photos + notes) following docs/add-a-project.md, so it shows on
/recent-projects and the matching service pages and LPs. Run every B4 gate, then release per B2.
```

### Lovable handoff (after any Claude Code release)
1. In Lovable, confirm the latest commit appears in the history.
2. Then prompt Lovable with **one focused visual task** at a time, e.g.: *"Polish the 'What are you planning?' chooser on /construction: subtle hover lift and staggered reveal with framer-motion, respect reduced motion, no layout or copy changes, don't touch forms or tracking."*
3. When Lovable finishes, back in Claude Code: `git fetch && git checkout <edit-branch> && git pull` before the next phase.

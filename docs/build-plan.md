# Build plan — Phase 1 audit (Nov 17, 2026)

Read-only audit of `main` at `1ab3836`. This document changed no code. It goes with `docs/HIGHLANDER_BUILD.md` (the brief); where the brief's assumptions turned out wrong, that is called out with **⚠**.

---

## 0. Fixed before the audit: deploys were stuck

Netlify runs the strict `seo:check` during postbuild. One copy-lint hit ("about 16 in. wide", added in `3e7986f` on Nov 12) failed every production build after that, so highlandernc.com stayed on `604b578`. PR #33 fixed the sentence and was merged. **John:** confirm `build-info.json` now shows `1ab3836` or later.

---

## 1. Lead paths (component → form → storage → JobTread)

Every form goes through `useLeadSubmit` → `submitLead` (`src/lib/leads.ts:369`). In order:
1. `getAttribution()` (all forms carry UTMs and click IDs).
2. Insert into `leads` with `jobtread_sync_status: "pending"`.
3. `trackFormSuccess`, which fires `form_submit_success` then `generate_lead`. These only fire after a successful insert. Each form checks `result.error || (!result.id && !result.duplicate)` inline rather than calling `requireStoredLead`, but the effect is the same.
4. A fire-and-forget call to `jobtread-sync`.

| Pages | Form component | Tracking IDs (source / form_id) | Required | How intent is set |
|---|---|---|---|---|
| `/lp/roofing`, `/lp/construction`, `/lp/roofing-construction`, all four `?landing=` | `landing/LeadForm.tsx` + `LandingFormContext.tsx` | source `highlander_landing_page`; form_id `landing-roofing` / `landing-construction` / `landing-combined`; form_location `hero` or `final` | name, email, phone | `resolveRouting` from intent chips (`IntentId`) |
| `/lp/roof-replacement`, `/lp/roof-repair`, `/lp/storm-damage`, `/roofing/roof-repair`, `/roofing/storm-damage` | `FastLeadForm.tsx` | `fast_lead_form` / `fast-lead-roofing` | name, email, phone | category `roofing`; project_type = service label |
| `/roofing/roof-replacement`, `/roofing/metal`, `/roofing/gutters`, `/construction`, `/request-inspection` | `InspectionForm.tsx` | `estimate_request` / `inspection-form-main` / source `inspection_form` | name, email, phone | `projectTypeFromPage` (`lib/form-service-context.ts`) |
| `/construction/additions`, `/renovations`, `/outdoor-living`, `/siding` | **no form on the page**; CTAs link to `/request-inspection?context=construction` | — | — | project_type `construction` |

JobTread division (`mapJobType`, read-only): handyman → Small Projects · chimney → Repair · skylight → Roofing · gutter → Gutters · design → Design · construction/addition/renovation/remodel/outdoor/exterior → Construction · repair/storm/leak/hail → Repair · anything else → Roofing.

**Problems found (none fixed yet; each needs a decision):**
- **⚠ Honeypot (B1.4):** there is **no `website_url` field anywhere**.
  - Only `LeadForm` (the three LandingTemplate pages) has a honeypot, named `website`. It's off-screen and `aria-hidden`, but it has a real `<label>Website</label>` that sits in the prerendered HTML, which is the "Website" text the crawler saw.
  - **`FastLeadForm` and `InspectionForm` have no honeypot.** That covers the 3 `*Ads` LPs and every service page.
  - There is no server-side check.
  - Proposal: in Phase 2, give all three forms the same hidden field and remove the visible label text. This adds a field, which B1 says needs John's OK.
- **Gutter leads go to the Roofing division.** `/roofing/gutters` sends project_type `roof-replacement`. Fix on the frontend: send `gutters` from `form-service-context.ts`, which the mapper already routes to Gutters. Needs John's OK because it changes what JobTread receives.
- **`form_id` differs between start and success.** `form_submit_success`/`generate_lead` send `form_id = source` (e.g. `highlander_landing_page`), while `form_start` sends `landing-roofing`. Leave it alone unless Andrew's GTM needs it changed, because his triggers may depend on the current values.
- Combined-LP "not sure" leads and InspectionForm general leads default to Roofing in JobTread. This is acceptable; noted only.

## 2. Paid landing pages today

| Page | Layout | H1 | Reviews | Off-system or banned wording | Robots |
|---|---|---|---|---|---|
| `/lp/roofing` | LandingTemplate | "…Talk to a **Franklin** roofer today." (town-specific) | 4 roofing, incl. **2019** jh-dillsboro | "Request My Estimate", "Call Me Back" (submit), **"Call now"** (both sticky bars), "Free estimate", "free on-site look" | noindex,follow |
| `/lp/construction` | LandingTemplate | "Additions, renovations & outdoor living in Western NC." | **none** (`ids: []`) | "Send My Details", "Send details", "Call Me Back", **"Call now"**, "get started" | noindex,follow |
| `/lp/roofing-construction` | LandingTemplate | "Roof, addition or both?…" | 3 roofing/gutters, incl. 2019; all suffixed "· Roofing" | same as above | noindex,follow |
| `/lp/roof-replacement` | `PaidAdsLanding` | region-wide | nate-yoder-2023 | "…Written Quote", FastLeadForm eyebrow "Request a **Free** Estimate" | **noindex,nofollow** at runtime, but the shell from emit-landing-shells says noindex,follow |
| `/lp/roof-repair` | `PaidAdsLanding` | region-wide | **2019** jh-dillsboro | same | same conflict |
| `/lp/storm-damage` | `PaidAdsLanding` | region-wide | willard-armes-2024 | eyebrow reads "Storm damage landing page" (placeholder text) | same conflict |

- **None of the six LPs imports `cta-config.ts`.** Every label is hardcoded. The `*Ads` pages already say "Call Direct: 828-524-7773" on the phone button and sticky bar.
- Alt text: the hero and final backdrops have `alt=""` inside `aria-hidden` wrappers. That is decorative and correct. Every image that carries meaning has alt text. **⚠** The brief's "alt is empty today" applies only to decorative backdrops; under v2 the hero becomes a real photo with real alt.
- **⚠ The `*Ads` pages should NOT migrate onto LandingTemplate.** Migrating would change source (`fast_lead_form` → `highlander_landing_page`), form_id, call tracking (`lp_sticky_mobile` → `lp_<key>_<cta>`) and robots, and would drop the `?v=` ad variants and FAQ schema. That breaks B1 and the ad message-match. **Plan:** apply the v2 improvements in place in `PaidAdsLanding.tsx`, which the brief allows.
- **⚠ There are no construction reviews on file.** `src/data/reviews.ts` holds 10 reviews (2019–2026), all roofing or gutters, and `ServiceTag` has no construction tag. "Division-matched reviews" on construction pages can't happen until Highlander supplies construction reviews (owner item #13). Until then, construction LPs and pages show project proof instead of an empty review block.

## 3. Top-10 service pages against the template

| Page | Uses template | Missing or thin | Hero | Reviews | Project cards |
|---|---|---|---|---|---|
| `/roofing/roof-replacement` | yes | complete | real photo, eager+high | matched | 4 ✔ |
| `/roofing/roof-repair` | yes | costContext thin | real, eager+high | partial | — |
| `/roofing/storm-damage` | yes | **whatsIncluded missing**, costContext thin | real, eager+high | matched | — |
| `/roofing/metal` | yes | process thin | real, **no fetchpriority** | matched | — |
| `/roofing/gutters` | yes | costContext + process thin | real, **no fetchpriority** | matched | — |
| `/construction` | **no** (~15 custom sections) | needs the C5 rebuild (chooser, timeline) | eager+high | **none** | — |
| `/construction/additions` | yes | proof has no reviews (none exist) | real project photo, no fetchpriority | none | — |
| `/construction/renovations` | yes | **costContext missing** | `/media/d35d81a4…` (confirm it's a real job) | none | — |
| `/construction/outdoor-living` | yes | **costContext missing** | `wnc-forest-cabin-roof.webp`, probably **not** outdoor living | none | — |
| `/construction/siding` | **no** | almost every slot missing | stock-looking framing photo | none | — |

The template also has a `subtopics` slot that `docs/service-page-template.md` doesn't mention. Add it to the doc in Phase 4. Only **2 construction projects** exist in `src/data/projects.ts` (Franklin living-room addition, Sylva deck railing), so construction proof is thin until more jobs are documented.

## 4. Top-10 validation

- **⚠ There's no `/data` folder and no Search Console numbers anywhere in the repo.** I've asked Lovable (read-only, files added only) to export 90 days of GSC queries and pages to `data/gsc-*.csv`.
- What we have now: `docs/SEO_PAGE_BRIEFS_2026-10.md` ranks by intent. Roofing comes first (replacement, repair, metal, storm), then additions (#8, "most winnable construction term"), /construction (#9), outdoor living (#15), renovations (#16), gutters (#17).
- **Recommendation:** keep the C2 list as drafted. Kitchen & Bath (#5) stays out until Luke confirms it. Re-rank only the homepage strip's 6 cards once the GSC export and Andrew's call sheet are in. The pages to upgrade don't change either way.

## 5. Where a new route must be registered

| Item | New public page (`/services`) | New paid LP (`/lp/additions` etc.) |
|---|---|---|
| `src/App.tsx` | lazy import + `<Route>` above the catch-all | same, next to the other `/lp/*` routes (166-171) |
| `src/components/landing/config.ts` | — | add the key to the `LandingKey` union + a new `*_CONFIG` |
| `scripts/generate-sitemap.ts` | add to `staticRoutes` | **never** add (LPs stay out because they aren't listed) |
| `scripts/generate-prerender-manifest.ts` | automatic (from sitemap) | add to `NOINDEX_ROUTES` |
| `scripts/emit-landing-shells.mjs` | — | add a `PAGES` entry {path, title, description} |
| `scripts/seo-regression-check.mjs` | — | add to `REQUIRED_NOINDEX_HTML_ROUTES` |
| `public/_redirects` | **delete lines 99–100** (`/services` and `/services/*` → `/roofing`); add `/services/* /services 301!` | — |
| `scripts/fixtures/legacy-urls-from-gsc.txt` | `/services` is listed; once it's live it counts as "already live" | — |
| llms.txt, OG images, prerender | automatic | automatic |
| `.github/workflows/release-qa.yml` strict-lint list | adding files here needs John's OK (B1.7 forbids workflow edits) | same |
| `docs/indexation-list.md` | regenerate with `scripts/generate-indexation-list.ts` | same |
| Nav | `src/components/header/nav-data.ts` `secondaryLinks` → Desktop/Mobile pick it up; `Footer.tsx` is hardcoded | — |
| Tests | `src/test/prerender-manifest.test.ts:58-63` (funnel list); new `/services` redirect test | `src/test/landing-pages.test.tsx:12` config list; new smoke tests |

Rule 7 (internal links) fails any link to a redirect source. The nav link to `/services` and the redirect change must therefore land in the same commit.

## 6. Placeholders to expect (`{{NEEDS_HIGHLANDER: …}}`)

1. Who answers the phone: can "Susan or Frank" appear? (Luke)
2. After-hours wording: is "we call back next business morning" true? (Luke)
3. Construction reviews with permission (owner #13). **None exist today.**
4. More documented construction projects and real photos for additions, renovations, outdoor living and siding (only 2 projects today)
5. Is Kitchen & Bath a core offer? (Luke)
6. Pricing stance: ranges, or cost drivers only? (owner #11)
7. CertainTeed tier wording (owner #5)
8. Step timelines for the 4-step process, if Highlander wants them shown
9. Team photo names
10. Live ad URL export (Andrew) → `docs/live-ad-urls.txt`
11. Robert's AI hallucination list → `docs/robert-ai-hallucination-list.md`
12. Siding vs `/exterior-improvements` merge (owner #15)

## 7. Phase plan with files

**Phase 2 — LP v2 (switch on for `/lp/construction` only)**
- **Layout:** `LandingTemplate.tsx`, `config.ts` (add `layoutVersion?: 2`). New: `OfficeStatusChip` (reads `business.ts` hours, America/New_York; prerender shows neutral text and the status fills in after hydration).
- **Labels:**
  - Add the LP labels to `cta-config.ts`: phone = `CTA_SECONDARY.callLabel`, form = `CTA.mobileSticky` "Get My Written Estimate".
  - Sticky "Call now" → "Call Direct" on every LP. This is a label-only fix and ships with v1 too.
- **Proof:** construction proof falls back to project cards while no construction reviews exist.
- **Ads pages:** improvements go into `PaidAdsLanding.tsx` in place, not by migration. Also fix the robots conflict: pick noindex,follow for all of them.
- **Honeypot and gutters:** add the shared honeypot to `FastLeadForm` and `InspectionForm`, and send `gutters` routing in `form-service-context.ts`. Both are pending John's OK.
- **Tests:** new `src/test/lp-smoke.test.ts` (Playwright on the prerendered dist): 6 LPs + 4 `?landing=`, checking 200, noindex,follow, `tel:` link, form present, honeypot hidden. Plus landing-pages unit tests.

**Phase 3 — `/services` hub**
- New `src/pages/ServicesHub.tsx`.
- `App.tsx`, `_redirects` (99–100), `generate-sitemap.ts`, `nav-data.ts`, `Footer.tsx`, a homepage strip component, and the tests above.

**Phase 4 — Service pages**
- Pilot `src/pages/HomeAdditions.tsx`.
- Then `Renovations.tsx` and `OutdoorLiving.tsx` (add costContext), and `Siding.tsx` (move onto the template).
- Then `ConstructionDivision.tsx` (rebuild on the template, add the chooser and the seasonal flag in a new `src/config/seasonal.ts`).
- Then the roofing pages' thin slots and the fetchpriority fixes in `MetalRoofing.tsx` and `Gutters.tsx`.

**Phase 5 — New LPs**
- Configs in `config.ts`.
- Registrations from §5.
- `docs/lp-message-match.md`.

**Phase 6 — Assets**
- Lovable is generating 7 draft heroes into `public/media/generated/raw/`; they are referenced nowhere. Each is approved or rejected against Luke's rules before use.
- A new build check (`scripts/check-generated-images.mjs`) fails the build if any page references `generated/raw/`.

## 8. Decisions needed from John before Phase 2

1. OK to add the honeypot to FastLeadForm and InspectionForm? It's a hidden field, and visitors see nothing.
2. OK to fix gutter routing so gutter leads land in the Gutters division in JobTread?
3. The "Free estimate" wording on the roofing LP and FastLeadForm: Lovable memory bans it. Remove it, or is it approved?
4. Can construction pages show project proof in place of reviews until construction reviews come in?

---

## 9. Scope tracker (IDs from John's master prompt, Nov 17)

Status values: **done** · **on branch** (committed to `claude/laughing-wozniak-o1cheu`, not released) · **partial** · **blocked** · **not started**.

| ID | Item | Status | Files expected |
|---|---|---|---|
| A1 | Baseline gates | done (`docs/release-log.md`) | — |
| A2 | Rollback point from build-info.json | **blocked**: highlandernc.com isn't reachable from this container; John reads it | `docs/release-log.md` |
| A3 | Playwright smoke tests (6 LPs, 4 `?landing=`, live ad URLs) | not started; needs `docs/live-ad-urls.txt` | `src/test/lp-smoke.test.ts`, `scripts/lp-smoke.mjs` |
| A4 | Lead-flow map | partial (§1 above); `docs/lead-flow.md` still to write; FGV fallback capture not found in repo (see §10) | `docs/lead-flow.md` |
| A5 | Build check: no `{{NEEDS_HIGHLANDER` in dist | not started | `scripts/check-placeholders.mjs`, `package.json` postbuild |
| A6 | Build check: no unapproved AI images | not started | `scripts/check-generated-images.mjs` |
| B1 | LandingTemplate v2 behind `layoutVersion` | not started | `landing/LandingTemplate.tsx`, `landing/config.ts` |
| B2 | Calls first (header, hero, 70/30 sticky, "what happens when you call") | not started | same |
| B3 | Office-status chip | not started | `src/lib/office-hours.ts`, new `OfficeStatusChip.tsx` |
| B4 | Two CTAs from cta-config | not started | `cta-config.ts`, `LandingTemplate.tsx`, `LeadForm.tsx`, `config.ts` |
| B5 | Region-wide H1 that mirrors the ad hook | not started | `config.ts` |
| B6 | Meaningful alt text | not started (meaningful images already have alt; hero becomes meaningful in v2) | `config.ts` |
| B7 | Division-matched reviews | not started; **no construction reviews exist** | `config.ts` |
| B8 | Local project cards → /recent-projects | not started | `LandingTemplate.tsx` |
| B9 | Cost context | not started | `LandingTemplate.tsx`, `config.ts` |
| B10 | FAQ "What happens after…" first | not started | `config.ts` |
| B11 | Explore Highlander strip | not started | new `landing/ExploreStrip.tsx` |
| B12 | Same form/fields/tracking | **on branch**: shared honeypot added to FastLeadForm + InspectionForm (they had none); LeadForm trap label text removed, field now `website_url`. Needs John's OK (rule 4) | `forms/Honeypot.tsx`, 3 forms |
| B13 | Rollout one LP per release | not started | — |
| C1–C3 | New service LPs + message-match doc | not started | `config.ts`, `App.tsx`, `emit-landing-shells.mjs`, `generate-prerender-manifest.ts`, `seo-regression-check.mjs`, tests, `docs/lp-message-match.md` |
| D1–D5 | /services hub, nav, homepage strip | not started | `_redirects` 99–100, `App.tsx`, new `ServicesHub.tsx`, `generate-sitemap.ts`, `nav-data.ts`, `Footer.tsx`, homepage |
| E1 | Validate top 10 | partial; GSC export requested from Lovable → `data/gsc-*.csv` | `data/` |
| E2–E6 | Service page upgrades | not started | see §7 |
| F1–F3 | Construction hub, winter flag, add-a-project | not started | `ConstructionDivision.tsx`, `src/config/seasonal.ts`, `docs/add-a-project.md` |
| G1–G5 | Assets | partial: Lovable is generating 7 **raw drafts** into `public/media/generated/raw/` (not referenced by any page) | `docs/asset-list.md`, `assets/manifest.json`, `docs/ai-image-prompts.md` |
| H1–H4 | Measurement | not started | `docs/gtm-setup-needed.md` |
| I1–I2 | Docs, screenshots | partial | `docs/*`, `qa-screenshots/` |
| — | Gutter leads → Gutters division | **on branch**; changes the project_type sent to JobTread (`form-service-context.ts`); needs John's OK | `src/lib/form-service-context.ts`, `InspectionForm.tsx` |

## 10. Lead safety net: what exists in the repo

1. Every form writes the lead to the `leads` table **before** JobTread is touched, with status `pending`.
2. `jobtread-retry` re-sends anything that didn't reach JobTread.
3. An office alert email goes out from `jobtread-sync`.
4. `teams-notify` is called fire-and-forget on every lead.
5. `jobtread-sync` can also POST to `JOBTREAD_WEBHOOK_URL` if that secret is set.

There is **no FGV-specific fallback capture in this repo**. If it exists, it lives outside the repo (GTM, Zapier, or a webhook secret). John: where is it?

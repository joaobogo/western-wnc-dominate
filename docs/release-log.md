# Release log

One entry per release. Record the rollback point **before** each release (B2.5).

---

## Phase 0 baseline — Nov 17, 2026 (no code changes)

**Commit tested:** `953d4d3` (`main` HEAD, Lovable, "Add four uploaded blog articles…").
**Live deployId:** not recorded. `highlandernc.com` isn't reachable from the Claude Code cloud container. John: copy `deployId` and `shortCommit` from https://highlandernc.com/build-info.json here.

### Branches
- `git ls-remote` shows **no `edit/**` branches**. The only branches are `main`, `lovable-backup-main-1788375929` and `claude/*`.
- Every recent commit on `main` is by `gpt-engineer-app[bot]`, so **Lovable commits directly to `main`**. `sync-edit-branch-to-main` finds no edit branch and does nothing.
- `netlify.toml` comments still say to set the Netlify production branch to `edit/edt-2b43a08a…`. Check that Netlify → Branches → Production branch is `main`. If it is set to an old edit branch, production stops updating.
- Pull requests get Netlify deploy previews (`deploy-preview-<n>--highlandernc.netlify.app`; confirmed on PR #32). Whether plain branch pushes also deploy is set in the Netlify UI. It isn't visible from the repo.

### Environment
- `.env.local` is git-ignored (`*.local` in `.gitignore`). `.env` is tracked (Lovable commits it), so secrets must never go there.

### Gates (install: `npm install --legacy-peer-deps`)
| Gate | Result | Notes |
|---|---|---|
| `npm run lint` | ❌ exit 1 | **332 errors, 95 warnings, all pre-existing.** The rule for future phases: no *new* errors in changed files. |
| `npm test` | ✅ | 565/565 pass |
| `npm run build` | ✅ | 344/344 pages prerendered, 343 OG cards, llms-full 25/25. Outside Netlify, set `PRERENDER_CHROMIUM=/opt/pw-browsers/chromium`; otherwise prerender silently skips and every SEO check fails. |
| `npm run seo:check` | ❌ 1 rule | 11 of 12 rules pass, plus the regression suite. **Rule 10 copy-lint** fails on one sentence in `src/data/blogs-november5.ts` (`/blog/metal-shingles-vs-standing-seam`): "about 16 in. wide" (the abbreviation "in." reads as a sentence ending). It came from Lovable's blog upload and is pre-existing. Fix: write "16 inches wide". |
| `npm run perf:check` | ❌ | Lighthouse (simulated mobile throttling on a shared container): `/` n/a, franklin-nc 54, highlands-nc 48, roof-replacement 59, mountain-roofing-guide 59. CLS passes everywhere (≤ 0.011). TBT is 360–650 ms, mostly `react-vendor`. Unthrottled LCP was 165–206 ms. Treat these numbers as a **relative** baseline for this machine only. Compare future runs on the same machine. |

### Notes for later phases
- `.lovable/memory/index.md` "Voice" line says "24h response". That conflicts with B3 (no response-time promises). Flag it before reusing that memory.

## Decision — Nov 17, 2026
John confirmed the release path: work on `claude/*` → PR into `main` → merge only after "approved, release", with Lovable idle during the merge. There are no `edit/**` branches.
John (Nov 17): keep both branch changes: the shared honeypot on every form, and gutter leads routed to the Gutters division.

## Release 1 — Nov 17, 2026 (PR #34): Phase 2 + Phase 3
- **Approved by:** John ("publish").
- **Rollback point:** `main` at `420e253` before the merge. The production deployId could not be read from this container; Netlify → Deploys keeps the previous deploy. To roll back: GitHub Actions → Emergency rollback (`revert_head`), or republish that deploy in Netlify.
- **Pages changed:**
  - all six `/lp/*` pages and `?landing=` (site menu); v2 layout on `/lp/construction` only;
  - new `/services`;
  - site header everywhere (Services dropdown; desktop menu from 1280px; Blog and Contact moved to the menu panel and footer);
  - `/roofing/gutters` lead routing;
  - honeypot on every form;
  - phone_click de-duplication.
- **Local gates before release:**

  | Gate | Result |
  |---|---|
  | Tests | 587/587 |
  | Build | 345/345 prerendered |
  | `seo:check` | PASS |
  | `smoke:lp` | 10/10 |
  | Images | 0 broken |
  | Lighthouse | unchanged from baseline |

  Preview: https://deploy-preview-34--highlandernc.netlify.app
- **For Andrew:** see `docs/gtm-setup-needed.md` (phone_click halves on LPs: de-duplication, not lost calls).

## Release 2 — Nov 17, 2026 (PR #35)
- **Approved by:** John ("approved").
- **Rollback point:** `main` at `f1d6987` (Release 1). Netlify → Deploys keeps that deploy; or GitHub Actions → Emergency rollback.
- **Pages changed:**
  - a lead form on every service page (10 had none);
  - all six `/lp/*` pages on the upgraded layout with the site footer and breadcrumbs;
  - new `/construction/handyman`;
  - Blog back in the header; `/blogs` → `/blog`;
  - AI and stock images replaced with real Highlander photos on about 20 pages;
  - sticky mobile bar "Call now" → "Call Direct";
  - handyman leads → Small Projects, design leads → Design.
- **Local gates before release:**

  | Gate | Result |
  |---|---|
  | Tests | 609/609 |
  | Build | 346/346 prerendered |
  | `seo:check` | PASS |
  | `smoke:lp` | 10/10 |
  | Images | 0 broken |
  | Blog link | visible in the header at 1280–2560 px and in the phone menu |

  Preview: https://deploy-preview-35--highlandernc.netlify.app

## Hotfix — Nov 17, 2026 (PR #36)
- **Reported by:** John ("the handyman page is broken").
- **Cause:** the office-status chip changed its text after mount without the `data-client-only` tag. The prerender snapshot kept the live text, so React hit #425/#418/#423 and re-rendered the whole page on load. Affected the six `/lp/*` pages (since Release 1) and `/construction/handyman` (Release 2).
- **Fix:**
  - the chip now renders an empty, height-reserving slot first and adds the live chip client-only;
  - the old `/?landing=` links (a pre-existing mismatch: homepage snapshot, landing page render) now render fresh and no longer hydrate the wrong HTML;
  - `smoke:lp` now fails on any page error and also covers `/services` and `/construction/handyman`.
- **Rollback point:** `main` at `23083b9` (Release 2).
- **Gates:** tests 610/610 · build 346/346 · `seo:check` PASS · `smoke:lp` 12/12 (it failed 11/12 on the Release 2 build) · no hydration errors on 11 sampled site pages.

## Release 3 — Nov 17, 2026 (PR #37)
- **Approved by:** John ("approved").
- **Rollback point:** `main` at `b462a12` (hotfix, confirmed live by the site health check at 17:37 UTC).
- **Pages changed:**
  - reviews, real photos and related articles added to every service page and landing page that lacked them (shared ProofKit);
  - 3-field form on the Services hub and Service Areas;
  - Service Areas rebuilt (hero, "Find your town", order of sections);
  - four generated images in use, listed in `docs/asset-list.md` (Service Areas hero, Renovations hero + `/lp/construction` renovation card, Siding hero, Gutters hero). None is described as a Highlander job.
- **Local gates before release:**

  | Gate | Result |
  |---|---|
  | Tests | 613/613 |
  | Build | 346/346 prerendered |
  | `seo:check` | PASS |
  | `smoke:lp` | 12/12, no page errors |
  | Hydration errors on 6 changed pages | none |
  | Images | 0 broken |

## Hotfix 2 — Nov 17, 2026 (PR #38)
- **Reported by:** John ("this chat thing doesn't really work": the floating "Start a Conversation" button).
- **Causes (all pre-existing):**
  1. The sticky phone bar and the floating button appear only after mount but were not tagged `data-client-only`, so the prerender snapshot kept a lifeless copy of each next to the live one on about 59 pages. The dead floating button ignored clicks.
  2. The live button opened its panel on mouse hover only (no click, tap or keyboard), and a gap between button and panel closed it before the mouse arrived.
  3. On a first visit the cookie notice sat on top of the button.
- **Fix:**
  - both widgets are client-only (no dead copies);
  - the button opens on click, tap and keyboard, closes on Escape or an outside click, and the hover area is continuous;
  - the button sits above the cookie notice while it is showing;
  - it is relabelled "Call or Get an Estimate" (it was never a chat) and the panel offers "Call Direct" and "Get My Written Estimate";
  - `smoke:lp` now fails on any dead (non-React) link, button or form and covers three more pages.
- **Rollback point:** `main` at `f065876` (Release 3).
- **Gates:** tests 615/615 · build 346/346 · `seo:check` PASS · `smoke:lp` 15/15 · no dead controls on 16 pages at 390 and 1440 px · real-browser check of click, hover, tap and both links.

## Speed pass — Nov 17, 2026 (PR #39)
- **Approved by:** John ("Publish it", Nov 18).
- **Asked by:** John (SEO audit: desktop PageSpeed 65–79 on 10 pages, target 80).
- **Finding:** with Google Tag Manager, Facebook and TikTok unreachable (as in this build container), the same 10 pages scored 87–99 on desktop Lighthouse with 0–30 ms of blocking time. The audit's 500–900 ms of blocking time is those three scripts. Their loading was **not** changed (standing rule: nothing may weaken the pixels). The decision is in `docs/open-items.md`.
- **Changed (first-party only; no wording, layout, form or tracking change):**
  - **Hidden-on-arrival content.** 274 of 345 pages were delivered with some content at `opacity: 0` until JavaScript ran, 17 of them in the first screen: the whole `/about` hero, and hero labels on the homepage, `/roofing`, `/construction` and `/exterior-improvements`. The page-generation step (`scripts/prerender.mjs`) now writes entrance animations in their finished state. Result: 0 pages.
  - **Blog library.** The full blog library (1.2 MB of article text) no longer downloads on `/construction` and 20 service pages, or in the background on every other page. It loads only on blog, town, county and project pages, which use it.
  - **Icon file** 57 KB → 35 KB (138 repeated licence comments removed; notices kept in `/THIRD-PARTY-LICENSES.txt`).
  - **Images:**
    - `/certifications`: the two badge images, 85 KB → 16 KB;
    - `/construction`: a 104 KB photo shown as a thumbnail is now a 400 px file, and work-gallery photos load at the size of their tile (also on the homepage and Recent Projects);
    - `/exterior-improvements`: the hero was one 402 KB file, now AVIF/WebP at the width the screen needs;
    - `/financing`: the hero now has phone-sized versions (28 KB and 51 KB instead of 136 KB on small screens).
  - **Cache rules:** fonts one year; `/media/*` photos and the tartan texture 30 days (they had none). A photo replaced under the same file name reaches returning visitors within 30 days. Give a replacement photo a new file name to show it at once.
- **Measured here, before → after** (desktop Lighthouse, trackers unreachable, one run each; ±3 points is noise):

  | Page | Score | Largest paint |
  |---|---|---|
  | `/about` | 90 → 98 | 2.1 s → 1.1 s |
  | `/construction` | 87 → 91 | 2.1 s → 1.7 s |
  | `/careers` | 93 → 99 | 1.6 s → 0.9 s |
  | `/contact` | 93 → 96 | 1.6 s → 1.3 s |
  | `/exterior-improvements` | 88 → 90 | 2.0 s → 1.9 s |
  | `/roofing` | 90 → 91 | 1.8 s → 1.8 s |
  | `/certifications` | 99 → 99 | 1.0 s → 1.0 s |
  | `/community` | 92 → 92 | 1.7 s → 1.6 s |
  | `/financing` | 92 → 92 | 1.7 s → 1.7 s |
  | `/` | not measurable in this container (no largest-paint reading, same as the Phase 0 baseline) | |

  `/construction` page weight: 3.9 MB → 2.5 MB (uncompressed).
- **Guards added:** `smoke:lp` now fails if a tested page requests the blog library or delivers a hidden heading, and covers six more pages (21 in total); `src/test/bundle-boundaries.test.ts`.
- **Gates:** tests 622/622 · build 346/346 · `seo:check` PASS · `smoke:lp` 21/21 · all 345 pages loaded in a browser: 343 clean, 2 with a hydration error that is also present on `main` (see `docs/open-items.md`).
- **Rollback point:** `main` at `c1cf42e` (hotfix 2).

## Readability pass — Nov 18, 2026 (PR #40)
- **Approved by:** John ("Aprove", Nov 18).
- **Asked by:** John, with a phone screenshot of `/construction/renovations`: "Make sure we can always read the letters easily."
- **How it was checked:** a new tool, `npm run contrast:check`, records every line of text on a page, hides the text, photographs what is behind it and compares the two. One page per template (73 pages), phone and desktop. Before: 147 distinct lines under the AA threshold on the sample. After: see Gates.
- **Causes found, and the fix for each:**
  - **Photo heroes.** Each hero darkened its photo by a different amount (0.2 to 0.88) and its gold text was the dark gold meant for white pages. Gold text failed on 45 hero templates, white text on 25. All 28 photo heroes now share one treatment (`.hero-legible`): one dark layer that keeps white text at 4.5:1 even over a white pixel, a lighter gold, and a soft text shadow. On phones the layer is even; on wide screens the right side of the photo stays clearer.
  - **Gold text and outline buttons did not know what they sat on.** Three dark surface types were not recognised (photo heroes, the charcoal sections on Team, FAQ and the cost guides, the green gradient). Outline and text-only buttons were dark green everywhere unless each one was marked by hand: About's "Community Impact", the closing link on three landing pages and the Services closing button were dark green on dark. Both now take their colour from the surface. A white card inside a dark area goes back to dark ink (the form's "Privacy Policy" link was gold on white).
  - **Dark gold on tinted backgrounds.** `--gold-ink` went from 30% to 24% lightness so small gold labels reach 4.5:1 on the cream section backgrounds too.
  - **Single spots:** blog article category label (dark on dark), Storm Damage "Learn About Roof Repair" link (dark on dark), a paragraph on Design Services (dark on dark), gold labels on light cards on Construction and Home Additions, photo captions on gallery cards (five templates), the homepage division cards (white stats on a photo that faded to white), the breadcrumb's current page, newsletter small print.
- **Phone layout problems found on the way, and fixed:**
  - the sticky phone bar was see-through (its background class did not exist), so "Estimate" disappeared over dark photos;
  - county pages: a stats panel covered both hero buttons ("Start a … Project" and the phone number); town-service pages: it covered the trust lines;
  - Careers and Free Tools: the first line of the hero sat under the header;
  - Construction: the "One Company Advantage" card covered two stat boxes.
- **Gates (final build):** tests 635/635 · build 346/346 · `seo:check` PASS · `smoke:lp` 21/21 · all 345 pages loaded in a browser (the same 2 older hydration errors as before, see `docs/open-items.md`) · contrast audit: 147 distinct lines under the AA threshold on the first sample of 73 pages; the run on all 345 pages (phone and desktop) ended with 6, two of them under 3:1 (homepage project cards); those were fixed and the affected pages re-measured with none under 3:1. Three dimmed disabled buttons are ignored on purpose.
- **Second round, same day ("Anywhere in the website"):** the measurement was repeated on all 345 pages, phone and desktop (690 page loads), and on the open phone menu, the desktop dropdowns and open FAQ answers. Added fixes:
  - breadcrumbs were hidden under the header on phones on every page that has them (a spacing class cancelled the header offset); they now show below it;
  - phone menu: the small grey descriptions and section labels were 2.4–2.9:1, now above 7:1;
  - the faint step numerals ("01"–"06") on ten templates were 1.2:1 and faded further on hover, now 3.6:1;
  - small print at 20–45% opacity (blog dates and read time in the dark "insights" block, lightbox counter and captions, review-card labels, Storm Center note) raised to 65–85%;
  - last borderline labels: lighter gold on dark surfaces (64% lightness), blog article meta in full white, darker photo fades on the homepage division cards, the landing-page closing band, project heroes and Exterior Improvements cards.
  - found by the all-pages load check: the FAQ page was delivered showing "91 Google Reviews" instead of 158. The page snapshot had caught the count-up animation mid-count. Count-up numbers now carry their real value and the snapshot writes it, on every page.
- **Not changed:** dimmed disabled buttons ("Continue", "Back", "Get drive time") stay dimmed until they can be used; wording; forms; tracking; URLs.
- **Rollback point:** `main` at `c0dc760` (speed pass, confirmed live by the site health check).

## Conversion and UX audit fixes — Nov 18, 2026 (PR #41)
- **Approved by:** John ("aprove", Nov 18).
- **Asked by:** John (shared "Highlander website: conversion and UX audit", Nov 18).
- **Rollback point:** `main` at `a04a576` (Lovable's chimney-cricket article, on top of the readability pass `77c283f`, which the site health check showed live at 11:07 UTC).
- **Fixed (no decision needed):**
  - homepage scrolled sideways (page 4,102 px wide on desktop, 2,876 px on a phone): hidden "(opens in a new tab)" labels in the reviews carousel escaped it. The carousel now contains them;
  - "We saved your answers from earlier" appeared over empty fields: every form saved a draft even when nothing was typed. Drafts now save only once the visitor enters something, a blank draft is dropped, and the note shows only when answers were actually put back (all eight forms that use the shared draft helper);
  - form copy matched to the fields: "Name, email and phone are required" (the field is "Full name"); Roof Repair and Storm Damage said "four quick fields" for a three-field form;
  - `/construction`: the eight objection cards appeared twice (kept once, in "The Highlander Construction Standard"); step numbers ran 01, 02, 04, 06, 07, 10 (now 1–6; the same fix applies to every shortened step list on roofing and construction pages); "Some people need someone on the roof this week" replaced on construction pages with construction wording;
  - `/roofing`: two similar "what's going on with your roof" pickers; kept the one with five paths and the phone link;
  - a short 3-field form near the top of `/roofing/roof-replacement` and `/construction/additions` (their only form sat 88–89% of the way down). It reuses the existing form and the existing button names;
  - landing-page phone bar: "Get My Written Estimate" wrapped onto three lines; it now reads "Estimate", like the rest of the site.
- **Checked and not changed:**
  - "email is optional on the standard forms": it is not. Every form requires email (the check is in the form's validation, not the field's `required` attribute). Making it optional on the landing pages is a decision (below).
  - "no next step on /reviews, /about, /certifications": all three already have call and estimate buttons in the page body.
- **Gates:** tests 646/646 · build 347/347 prerendered · `seo:check` PASS · `smoke:lp` 21/21 · all 346 pages loaded in a browser (the same 2 older hydration errors, see `docs/open-items.md`) · no hidden content in delivered HTML · homepage width equals the screen at 375 and 1,425 px · two untouched visits to `/request-inspection` show no "saved your answers" note.
- **Decisions waiting:** `docs/open-items.md`, "From the Nov 18 conversion audit".

## Local SEO, top 20 and pages 21–50 — Nov 18, 2026 (PR #43)
- **Approved by:** John ("approved", Nov 18). Merged as `e1776a3` with Lovable idle (last Lovable activity 11:20 UTC).
- **Asked by:** John ("Highlander local SEO analysis and top 50 pages"). John is doing the top 20 pages himself; this covers 21–50 where real material exists.
- **Rollback point:** `main` at `0558765` (conversion audit fixes, confirmed live by the site health check at 12:22 UTC).
- **Changed:**
  - real documented jobs on the service pages they belong to (new `ProjectSpotlight`; every fact comes from `src/data/projects.ts`): cedar shake in Highlands on `/roofing/specialty` (#24); the Lake Glenville Brava re-roof on `/roofing/brava-synthetic` (#48); standing seam in Highlands on `/roofing/metal` (#43) and `/roofing/metal/cost` (#30); the Franklin addition on `/construction/additions` (#33); the Waynesville shingle replacement and the Highlands metal roof on `/roofing/residential` (#25);
  - town links (new `TownServiceLinks`, only pages in the sitemap): metal roofing by town on `/roofing/metal/cost` (#30); roof replacement by town on `/roofing-cost-western-nc` (#47);
  - `/construction/design` links to additions and renovations (#46).
- **Checked, no change needed:** town pages 21–44 already run about 2,000 words with roof-repair sections, local FAQs, their county hub and the nearest real project; `/roofing/metal` already links to cost and the town metal pages; `/contact` and `/request-inspection` left as they are ("protect").
- **Not done (needs material or a decision):** see `docs/open-items.md`, "Local SEO analysis".
- **Gates:** tests 652/652 · build 347/347 prerendered · `seo:check` PASS · `smoke:lp` 21/21 · no page errors on the 8 changed pages · contrast audit on the 8 pages, phone and desktop: 0 lines under the AA threshold.

### Top 20 pages — Nov 18, 2026 (same PR)
- **Asked by:** John ("go ahead and do all top 20 pages. For Sylva, let's have the Sylva town page being the main one … we need to have a good Waynesville presence").
- **Changed:**
  - homepage (#1): the hero buttons now sit inside the first screen on laptops (at 1240 × 800 they were below it). The desktop sub-line is one sentence; the H1 wording is unchanged. New "Most requested" row under the proof band links Franklin, roofing, roof repair, roof replacement, gutters and construction;
  - `/roofing/gutters` (#2): gutter work by town, linking eight town pages (there are no gutter town pages);
  - `/service-areas/franklin-nc` (#3): "Recent work in and near Franklin" (the Franklin addition plus the Highlands jobs, each labelled with its real town) and a link to the Macon County page. Every town page now links its county page (Asheville / Buncombe left out of scope);
  - `/roofing` (#4) and `/roofing/roof-replacement` (#8): the Waynesville shingle replacement and the Highlands metal roof, plus roof replacement by town; `/roofing/roof-repair` (#5) and `/roofing/storm-damage` (#12): roof repair by town;
  - `/construction/outdoor-living` (#7): the Sylva deck project and outdoor living by town; `/construction/renovations` (#9) and `/construction/siding` (#15): construction by town; `/construction` (#20): the Franklin addition and Sylva deck, plus construction by town;
  - `/service-areas/county/macon-county` (#14): one roofing and one construction job from the county (every county page gets the same, from `projects.ts`);
  - town × service pages (#6, #11, #17, #18, #19): the job list now leads with the matching real job (metal on metal pages, builds on construction pages), and no longer hides the job whose photo is the page's main image. Highlands metal now shows the Highlands standing seam roof first; Franklin construction shows the Franklin addition first;
  - **Waynesville (John: "one of the biggest markets in the region"):** `/service-areas/waynesville-nc/roof-replacement` and `/service-areas/waynesville-nc/metal-roofing` are now in Google's index and the sitemap, with hand-written local copy (Haywood County, 2,753 ft, freeze-thaw, the Main Street historic district, Frog Level, Lake Junaluska). The Waynesville job leads the project list. `/service-areas/waynesville-nc/roofing` has new hand-written copy but stays out of the index, because the Waynesville town page ("Waynesville, NC Roofing & Roof Repair") targets the same search; the same rule folded Franklin's roofing page into its town page. Waynesville is now a fifth "core town" in the test that limits which town × service pages can be indexed;
  - **Sylva:** `/service-areas/sylva-nc` is the main Sylva page. `/locations/sylva-nc` is retitled "Sylva Showroom & Office: Address, Hours, Directions" (no longer chasing "roofing Sylva") and links to "Roofers in Sylva, NC".
- **Checked, no change needed:** `/roofing/skylights` (#10) already links its towns; there is no documented VELUX job to show. `/service-areas/lake-glenville-nc` (#13) already shows the Lake Glenville Brava job. PR 42's title changes were not touched.
- **URLs:** none added, changed or removed. Two pages joined the sitemap.

## Project pages: hero and layout — Nov 18, 2026 (PR #44)
- **Approved by:** John ("It's approved", Nov 18). Merged as `c6080da` with Lovable idle (last Lovable activity 11:20 UTC).
- **Asked by:** John ("when I click on a project, the hero and those pages are a little weird. Fix the hero in all of the pages and make sure those pages are better, well put together").
- **Rollback point:** `main` at `e1776a3` (local SEO top 20, confirmed live by the site health check at 15:52 UTC).
- **Found:**
  - an empty band of about 170 px between the breadcrumbs and the photo: a site-wide header-spacing rule padded the hero a second time;
  - the photo was a darkened, cropped full-width strip (the Highlands metal roof showed as a dark patch);
  - the same facts appeared three times (hero, an "at a glance" table, the sidebar);
  - two "local page" boxes, three similar call-to-action bands, and the photos sat near the bottom, after the blog links.
- **Changed (all six `/projects/*` pages):**
  - new hero: the whole photo in a frame beside the title, a one-line highlight, four fact tiles (scope, duration, elevation, county) and the estimate and phone buttons. Photo, title and buttons now fit in the first screen on desktop;
  - page order: outcome → before/after → project photos → the write-up (summary, challenge, work performed, materials, steps) with a sticky details panel → one local next-step box → related jobs → related articles → closing call to action;
  - removed the duplicate table, the second local box and the extra call-to-action band; tidied heading sizes on cards;
  - every fact still comes from `src/data/projects.ts`. No copy was added beyond section headings.
- `/recent-projects` hero: same framed-photo layout (the photo was washed out behind a white haze, with header space doubled) and a one-sentence intro.
- The town link on project pages reads "Roofing & construction in {town}, NC" (it said "Roofing" on construction jobs too).
- **Gates:** tests 663/663 · build 347/347 prerendered · `seo:check` PASS · `smoke:lp` 21/21 · the 7 changed pages: no page errors, no sideways scroll · contrast audit, phone and desktop: 0 lines under the AA threshold · lint clean on changed files.

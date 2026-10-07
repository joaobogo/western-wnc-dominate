# SEO / CRO audit: status of every item (7 Oct 2026)

Sources: `Highlander SEO & CRO audit` (3 Oct) and `Highlander SEO CRO Audit and 22 Prompts` (5 Oct).
Each row was checked against the code. Status key:
**FIXED** = done in the repo and covered by a test or build check.
**OWNER** = needs a business fact or decision from the owner before code can change.
**LIVE** = needs production data or an external system (Netlify, Search Console, GA4, GBP, JobTread).

## Fixed in the repository

| Item | What was done |
| --- | --- |
| F01 / P02 false success on failed lead write | `requireStoredLead` on intake, consultation, quote-flow and builder forms; chatbot lead card, careers form and homepage sticky bar now only confirm after the lead is stored; landing pages use the same rule. Tests in `lead-durability.test.ts`. |
| P02 duplicate acknowledgement | Only the `idempotency_key` unique index counts as an already-stored duplicate (`isIdempotencyViolation`). |
| F03 unknown intent routed neutrally | `general` category; landing "not sure" and no selection go to general triage; JobTread labels "Home Project Inquiry". |
| Three paid landing pages (`/lp/roofing`, `/lp/construction`, `/lp/roofing-construction`) | Rebuilt per the 5 Oct prompts: three-field form, one lead path, noindex,follow, real prerendered files, JobTread routing and notes. |
| JobTread landing mapping | Readable job names, service intent and form location in Source/Attribution, no Design Services downgrade, no merge of first-name-only customers. |
| A1 `/financing` internal note | Gone. Blog financing claims ("Quick approval", "No prepayment penalties") replaced with lender-dependent wording. |
| A2 / T1b duplicate `prerendered-at` | Prerender serves the pristine shell and strips inherited stamps; `seo:check` rule 3 requires exactly one. |
| A3 / T3 / T4 shell and funnel URLs | `/consultation` is a 301; `/quote-flow` and `/seo-monitoring` get `X-Robots-Tag: noindex`; all six `/lp/*` pages have physical files, noindex and a self-canonical. |
| A5 mobile sticky "Estimate" | Goes to `/request-inspection` (the one form). |
| A6 thank-you page | Exists, noindex. |
| A7 / F10 / T5 single source for rating and county count | Rating 4.8 only from `business.ts`; hard-coded county counts (CTA proof line, construction authority, skylights) now use `COUNTY_COUNT`. |
| T2 "hundreds of reviews" | Replaced with the real review count and neutral wording. |
| F05 / P06 sticky bar late-mount observer | `HomepageStickyLeadBar` now rescans for lazy-loaded footer and final CTA; form errors are tracked. |
| S2 cookie card covering the desktop sticky lead bar | Card lifts above the bar. |
| C2 consent withdrawal | "Cookie preferences" in the main footer and landing footer reopens the notice. |
| M8 PII in analytics URLs | `page_path` and `page_location` keep only campaign and click-ID parameters (`safeSearch`). Test in `analytics-privacy.test.ts`. |
| M3 / M6 event-name drift | `docs/analytics-events.md` and the runbook now name the real events; `phone_click` documented as intent only. |
| X2 experiment exposure | A queued or concluded experiment no longer pushes `experiment_view`. |
| F06 hero experiment | Concluded; hero pinned to the stable layout. |
| T6 robots.txt | Single `User-agent: *` group; per-bot groups removed; `/lp/` stays crawlable. |
| T8 legacy sitemap | Live funnel URLs, `/robots.txt`, `/sitemap.xml`, `/consultation` removed. File itself stays until 27 Oct. |
| O1 H1 holding half the slogan | Ten service pages now have service + region in the H1. |
| O4 title suffix | `| Highlander WNC` removed (`ConstructionDesign`). |
| F08 / P04 address | `40 Depot Street` only; Franklin directions route by postal address; guard test. |
| F09 / C15 roofing objections on construction pages | New `constructionConcerns` (process-only) used on additions, renovations, outdoor living, siding, exterior and custom construction pages. |
| C2 template wrong words | Town FAQ no longer names decks or commercial work inside roofing sentences; "high-elevation" only where the town is 3,000 ft or higher. |
| Claims | Removed "Best Roofers" superlative, unsupported local-crew and response claims, the SureStart warranty claim, "No AI-generated fluff". |
| R8 / R9 project links and alt | Project "Service Expertise" link follows the project's real service; Recent Projects hero alt matches the shingle photo. |
| Dead components | Removed `BeforeAfterGallery` and `SilentObjections` (contradictory project data). |
| Release checks | Strict `NETLIFY=true` build: prerender 369/369, `seo:check` 12 PASS. |

## Needs a decision or fact from the owner (OWNER)

1. **Email on the first form: required or optional?** The audit says all three required "for this release"; the code (and the landing prompts) make email optional.
2. **One response-time promise** (e.g. "typically within one business day") and who answers after hours. Remaining copy: "within hours", "call you rapidly", "Rapid Response" badge, "emergency response capability".
3. **Weekend hours.** Footer says closed, office-hours block says appointments, showroom block says by appointment. Pick one wording; then render all three from `business.ts`.
4. **Insurance proof.** "Licensed & Insured", "Full Liability & Workers' Comp" appear about 50 times and `business.ts` has no insurance record. Send carrier, coverage and certificate wording, or approve removing the claim.
5. **CertainTeed tier and wording.** "ShingleMaster", "Credentialed Contractor", "Certified" are all used. Confirm the exact tier, then one wording everywhere.
6. **County footprint.** 10 in `business.ts`; only 8 county pages are indexable; Buncombe, Henderson, Madison, Clay need a yes or no.
7. **Who does the work.** "In-house crews only" and "we do not subcontract" versus a review that names an outside crew owner.
8. **Experience claims.** Whose, and how many years ("15+ commercial", "35+ construction", "40+ roofing").
9. **Licence deep link** for #87668 (currently the board's generic search page).
10. **Current Google figures.** Audit saw Franklin 4.8 (156), Sylva 5.0 (30); site stores 158 and 26. Confirm, then bump `lastVerified`.
11. **Pricing stance.** Metal cost page publishes ranges; other pages say no headline price.
12. **Text-message consent wording** on every phone-collecting form (legal review).
13. **Project proof.** Documented projects with photo, town, scope, date and permission, including at least one construction project; real town for each reused photo; real dates for three reviews; more real Google reviews.
14. **Blog consolidation.** 13 posts are folded into survivors; the test `blog-canonical-to.test.ts` ("no post is folded until João confirms the clusters") fails by design until you confirm.
15. **Merges:** `/service-areas/franklin-nc/roofing` into the Franklin page; `/construction/siding` with `/exterior-improvements`.
16. **Own-business review markup.** Currently removed everywhere; the playbook says keep it simple and optional. Your call.
17. **Title suffix** (one of `| Highlander` or `| Highlander Building Services`).
18. **`/community`, `/team`** content (partners, construction and design staff).
19. **Construction intake as a primary CTA** on construction pages, or secondary only.

## Needs live data or an outside system (LIVE)

- Production raw HTML, `prerendered-at` spread, redirect hop counts and 404 status (run `node scripts/redirect-smoke.mjs https://highlandernc.com`).
- Netlify production branch is `main`; `deploy-drift-check` and `jobtread-retry` crons are scheduled (migration `0004` schedules the retry; confirm in `cron.job`).
- A labelled test lead through production into JobTread; appointment and qualified-call linkage.
- Search Console (exclusions, canonicals, 15 partial-redirect cases), GA4 (key events, reports), PageSpeed/CrUX field data, consent behaviour with Opt out chosen.
- Google Business Profile, BBB, LinkedIn, chamber and manufacturer listings (address, name, photos, reviews).
- Legacy sitemap removal after 27 Oct 2026 (keep the redirects).

## Not changed on purpose

- `Gallery.tsx` and `LayoutsPlanning.tsx` are still referenced (route preload, a test); they are not routed.
- Legacy `form_submit` events on three intake forms feed the Meta/TikTok/Ads pixels; removing them could drop conversions. Verify in GTM Preview first.
- The blog `/contact` "Get My Questions Answered" CTAs are a deliberate secondary path.

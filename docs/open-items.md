# Open items

Facts and decisions Highlander or John still has to supply. **Nothing marked `{{NEEDS_HIGHLANDER}}` may ship.** `scripts/check-placeholders.mjs` fails the build if one reaches `dist/`.

## Needed from Highlander / John
| # | Item | Who | Blocks | Used for now |
|---|---|---|---|---|
| 1 | Live ad URL export (Google + Meta final URLs) → `docs/live-ad-urls.txt` | Andrew | A3 full coverage | Smoke test covers the 6 LPs + 4 `?landing=` |
| 2 | Real construction / interior photos (≥3 per service, before/after pairs) | Robert | E2, C1 heroes; the `/lp/construction` "renovation" card image is a covered-patio photo | Documented jobs only |
| 3 | Construction reviews with permission | Luke | B7 division match | **Company-wide reviews labelled by service** (John, Nov 17) |
| 4 | Robert's AI hallucination list → `docs/robert-ai-hallucination-list.md` | Robert | G4 | Luke's rules only |
| 5 | Kitchen & bath as a core offer? | Luke | E4 | Not built |
| 6 | Pricing stance (ranges or cost drivers only) | Luke | E2 cost slots | Cost drivers only, no numbers |
| 7 | After-hours wording ("we call back next business morning"?) | Luke | B3 | Neutral: "the team sees your request as soon as the office opens" |
| 8 | Front-desk names on pages ("Susan or Frank will answer")? | Luke | B2 | "The Franklin office answers…" (no names) |
| 9 | CertainTeed tier wording; can "only Premier in WNC" be proven? | Luke | Claims | Existing wording kept, not added anywhere new |
| 10 | Website call tracking (yes/no, which tool) | John + Andrew | H4 | Design only |
| 11 | Rollback point: live `build-info.json` commit + deployId | John | A2 | — |

## Suggestions (found outside the current scope)
- **About 100 colour classes do nothing.** Classes such as `bg-primary/6`, `bg-primary/8` and `bg-primary/12` use opacity steps Tailwind does not generate (it makes 5, 10, 15 …), so the faint tints they were meant to add are missing. No effect on readability. Cleaning them up would change the look slightly (tints would appear), so it needs a decision.
- `/construction/renovations` hero shows "Avg. ROI: 60–80% at resale". Check it against `CLAIMS_AUDIT.md` (it reads as a promise).
- **Page speed is capped by the tracking scripts (decision for John + Andrew).** Without Google Tag Manager, Facebook and TikTok the audited pages score 95–99 on desktop. With them, 65–79. Options, smallest first:
  1. Load the Facebook and TikTok pixels on the visitor's first scroll, click or key press, or after 5 seconds, whichever comes first (today: as soon as the page finishes loading). Google Tag Manager, GA4 and Google Ads stay immediate. Cost: a visitor who leaves within 5 seconds without touching the page is not counted by Meta or TikTok (still counted in GA4).
  2. Andrew trims the GTM container (it transfers about 512 KB and uses about 0.5 s of processing per page): remove unused tags, fire non-essential tags on "Window Loaded".
  3. Leave as is and accept scores in the 70s. Rankings use real-visitor data (Core Web Vitals), not this lab score.
- **Related-article lists ignore the newer blog posts.** `scripts/generate-blog-summaries.mjs` scans only `src/data/blogs.ts`. Posts in the nine `blogs-*.ts` files (36 of 128) never appear in "related articles" on service and landing pages. Fix: scan all blog files. It changes which articles those blocks show, so it needs its own approval.
- Town pages download the sign-in/database library (215 KB) through a shared chunk. Not in this audit; worth a separate look.
- **Two pages re-render themselves on load** (hydration error, also on `main` before the speed pass):
  - `/locations`: cause not traced yet (most likely the showroom map, which appears after load);
  - `/blog/pre-fall-gutter-maintenance-checklist-mountain-homeowners`: the article markup puts a paragraph inside a paragraph.
  Both still display correctly. They load slower than they should.
- The homepage gives no "largest paint" reading in headless Lighthouse (score shows as 0 locally). PageSpeed Insights does score it (78), so this is a measuring gap here, not a visitor problem.
- **Possible double phone_click on service pages (for Andrew).** The site-wide sticky mobile bar's call button calls `trackEvent("phone_click")`, which sends `gtag("event","phone_click")` directly. The global `tel:` listener also pushes `phone_click` to the dataLayer. If GA4 receives both gtag and GTM hits, each sticky-bar tap counts twice. Check in GA4 DebugView before changing (the rule is not to weaken pixels).
- **AI-generated photos are live as if they were real jobs.** Replace them with real photos:
  - `/media/d35d81a4-construction-project-highlands.webp` (workers in vests at a framed house). It is the hero on `/construction/renovations` and the closing backdrop on `/lp/construction`.
  - `src/assets/gallery/gutters-002.jpg` (stylised copper gutter on a log home). It is the `/roofing/gutters` hero.
- **Robert's top-10 list:** the Services menu and `/services` use the brief's list plus Skylights (from Search Console). Send Robert's list and it is a one-file swap (`src/data/services-hub.ts`).
- `/lp/roof-replacement`, `/lp/roof-repair` and `/lp/storm-damage` show internal wording to visitors: "Why people convert here", "Common objections, answered", "One page, one action — no hunting around", and the eyebrow "Storm damage landing page". `/lp/roof-repair` quotes a 2019 review. Fix when each page gets its v2 release (B13).
- `/lp/roofing` H1 says "Franklin roofer"; v2 makes it region-wide (B5) on its own release.
- `.lovable/memory/index.md` says "24h response", which conflicts with CLAIMS_AUDIT. Ask Lovable to remove it.
- Emergency-rollback workflow still notifies Microsoft Teams (switch to Google Chat later via Lovable).
- Last stored website lead was Nov 11 (all 47 in 30 days synced). Worth watching now that deploys are unblocked.

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
- `/lp/roof-replacement`, `/lp/roof-repair` and `/lp/storm-damage` show internal wording to visitors: "Why people convert here", "Common objections, answered", "One page, one action — no hunting around", and the eyebrow "Storm damage landing page". `/lp/roof-repair` quotes a 2019 review. Fix when each page gets its v2 release (B13).
- `/lp/roofing` H1 says "Franklin roofer"; v2 makes it region-wide (B5) on its own release.
- `.lovable/memory/index.md` says "24h response", which conflicts with CLAIMS_AUDIT. Ask Lovable to remove it.
- Emergency-rollback workflow still notifies Microsoft Teams (switch to Google Chat later via Lovable).
- Last stored website lead was Nov 11 (all 47 in 30 days synced). Worth watching now that deploys are unblocked.

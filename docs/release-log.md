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

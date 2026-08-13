# Backup and Rollback Plan for highlandernc.com

This document defines how the Highlander Building Services website is protected from bad deployments and how to roll back quickly when needed.

## 1. Scope

- **Primary site:** `https://highlandernc.com`
- **Source of truth:** GitHub `main` branch
- **Editor/development:** Lovable (pushes to `edit/**` branches that are auto-synced to `main`)
- **Hosting:** Netlify (production build is built from `main`)
- **Database / backend:** Lovable Cloud (Supabase) — not rolled back by this plan; only the static site is covered here

## 2. What is backed up automatically

| Backup | Location | Retention | How to access |
| --- | --- | --- | --- |
| Source code | GitHub repository | Permanent | `https://github.com/<org>/<repo>` |
| Deployed builds | Netlify deploy history | All published and unpublished deploys are kept by default | Netlify site dashboard → **Deploys** |
| Editor snapshots | Lovable version history | Project lifetime | Lovable editor → version history |
| Build fingerprint | `public/build-info.json` | Current deploy only | `https://highlandernc.com/build-info.json` |

`build-info.json` is stamped at build time and contains the commit SHA, branch, build timestamp, Netlify deploy ID, and deploy URLs. This is the fastest way to confirm which version is live.

Example:

```json
{
  "commit": "46e187576702a698ce27759b2dea8b11503c9006",
  "shortCommit": "46e1875",
  "branch": "edit/edt-4a4094bc-bf3c-464d-98e3-49004af8d9b1",
  "builtAt": "2026-08-12T19:05:31.151Z",
  "deployId": "abc123def456",
  "deployUrl": "https://abc123def456--highlandernc.netlify.app",
  "deployPrimeUrl": "https://main--highlandernc.netlify.app",
  "siteUrl": "https://highlandernc.com",
  "context": "production"
}
```

## 3. When to roll back

Roll back immediately if any of the following are detected:

- Broken conversion paths (forms, phone links, CTAs not working)
- Wrong business information (NAP, phone number, address, service areas)
- Layout or visual regressions on mobile or desktop
- Severe performance or accessibility failures
- Security concern introduced by a new deploy
- Legal / brand-voice issue (banned warranty terms, 24/7 claims, unsupported credentials)

## 4. Rollback options

### Option A — Revert the latest commit on GitHub (recommended for Lovable-driven changes)

This is the normal path because most production changes come from Lovable edit branches that were merged into `main`.

Using GitHub CLI:

```bash
gh repo clone <owner>/<repo>
cd <repo>
git checkout main
git pull origin main

git revert HEAD --no-edit
git push origin main
```

Using the GitHub web UI:

1. Open the repository → **Commits**.
2. Click the most recent commit.
3. Click the **Revert** button and create a pull request.
4. Merge the revert PR to `main`.

Netlify builds `main` automatically, so the site will redeploy within a few minutes. You can verify the new `build-info.json` commit SHA.

### Option B — Manual GitHub Actions rollback workflow

A one-click workflow is available at **Actions → Emergency rollback → Run workflow**.

1. Choose **Rollback method**:
   - `revert_head` — automatically reverts the latest commit and pushes to `main`.
   - `restore_netlify_deploy` — restores a specific Netlify deploy ID without rebuilding.
2. Enter the reason for the rollback.
3. If using `restore_netlify_deploy`, paste the deploy ID from Netlify or from `build-info.json`.
4. Run the workflow.
5. The workflow notifies the team in the Microsoft Teams channel.

### Option C — Instant restore from Netlify deploy history

If you need the previous site live immediately, use Netlify's deploy history:

1. Open the Netlify site dashboard → **Deploys**.
2. Find the last known-good deploy (or use the deploy ID from a saved `build-info.json`).
3. Click **Publish deploy** to make it live.

This is the fastest option when a rebuild would take too long. The previous deploy stays in history until intentionally deleted.

### Option D — Restore from Netlify API

For automation or scripting:

```bash
NETLIFY_SITE_ID="<site-id>"
NETLIFY_API_TOKEN="<personal-access-token>"
DEPLOY_ID="<deploy-id>"

curl -X POST "https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/deploys/${DEPLOY_ID}/restore" \
  -H "Authorization: Bearer ${NETLIFY_API_TOKEN}"
```

## 5. Required secrets for the automated workflow

The following GitHub secrets are required only if you want the automatic Netlify restore or Teams notification. The revert workflow works with the default `GITHUB_TOKEN`.

| Secret | Purpose | Required for |
| --- | --- | --- |
| `GITHUB_TOKEN` | Provided by GitHub Actions | Revert commits |
| `NETLIFY_API_TOKEN` | Netlify personal access token | API deploy restore |
| `NETLIFY_SITE_ID` | Netlify site ID | API deploy restore |
| `SUPABASE_URL` | Lovable Cloud project URL | Teams notification |
| `SUPABASE_ANON_KEY` | Public Supabase anon key | Teams notification |

Add these at **Settings → Secrets and variables → Actions** in the GitHub repository.

## 6. Team notification template

After any rollback, notify the team in the Highlander Microsoft Teams channel with:

```
🔄 Website rollback executed
- Site: https://highlandernc.com
- Reason: <brief reason>
- Method: revert_head / restore_netlify_deploy
- Actor: <who triggered it>
- Commit: <sha>
- Deploy ID: <deploy id>
- Time: <ET timestamp>

Next steps:
1. Verify the live site loads and the correct build-info.json is served.
2. Run tests and banned-terms check.
3. Check console for errors and confirm conversion paths.
4. Open a follow-up task to fix the root cause before re-deploying.
```

## 7. Verification checklist after any rollback

Before declaring the rollback complete, confirm every item below:

- [ ] `https://highlandernc.com/build-info.json` shows the expected commit or deploy.
- [ ] Site loads without 5xx errors.
- [ ] Header, logo, navigation, and mobile menu render correctly.
- [ ] Click-to-call phone number is `828-524-7773`.
- [ ] Lead form submits successfully and the entry reaches the admin dashboard.
- [ ] No console errors on the homepage, `/roofing`, and a town page (e.g., `/service-areas/franklin-nc`).
- [ ] No layout regressions on mobile and desktop.
- [ ] Banned terms are absent (`architect`/`architecture`, `24/7`, `GAF`, unsupported warranty claims, `free estimate`, `book now`, `dream home`, `top-rated`).
- [ ] Critical tests pass: `npm run test`.
- [ ] SEO smoke test passes: `npm run seo:check`.

## 8. Keeping the previous build available

Netlify retains every deploy by default. To guarantee the previous build remains available:

- Do **not** manually delete older deploys in the Netlify dashboard.
- Do **not** enable any setting that auto-purges deploy history.
- If a deploy is critical, use Netlify's **Lock deploy** feature to prevent accidental deletion.
- Capture the current `build-info.json` before a major release so the deploy ID is recorded in rollback records.

## 9. Escalation

| Situation | Owner | Action |
| --- | --- | --- |
| Minor visual regression | On-call editor | Revert via workflow or GitHub UI |
| Conversion path broken | Marketing lead + developer | Revert immediately, then diagnose |
| Wrong NAP / legal info | Business owner | Revert immediately, then fix and re-deploy |
| Security concern | Developer + security lead | Revert, then run security scan before re-deploy |
| Rollback fails | Developer | Use Netlify dashboard to manually publish previous deploy |

## 10. Related automation

- **Deploy drift check** (`supabase/functions/deploy-drift-check`) — alerts the team if the live site is older than the latest GitHub commit.
- **Site health check** (`supabase/functions/site-health-check`) — monitors 14 key pages daily for 200 status, NAP consistency, and content freshness.
- **Auto-sync to `main`** (`.github/workflows/sync-edit-branch-to-main.yml`) — keeps Netlify building from the latest Lovable edits.
- **Emergency rollback** (`.github/workflows/emergency-rollback.yml`) — one-click revert or deploy restore.

## 11. Change log

- **2026-08-12** — Created backup and rollback plan; added `emergency-rollback.yml`; added `site_rollback` notification to `teams-notify`; expanded `build-info.json` with Netlify deploy URLs.

# Google reviews on the website: daily import setup

**What it does:** every morning (10:13 UTC, about 5–6 AM in Franklin), the `google-reviews-sync` job reads every review on both Google Business Profile listings (Franklin and Sylva). It also reads Google's star rating and review count.

- Each website build puts those on the pages: new 4- and 5-star reviews with written text join the hand-copied ones.
- Every page that shows reviews shows a different mix each day, matched to its service.
- The "4.8★ · 179 Google reviews" figures update by themselves.

**What it never does:**
- edits a review;
- shows a review rated under 4 stars;
- shows one that mentions warranties, guarantees, "free inspection/estimate", 24/7 or brand names the site doesn't use; those are left off, not changed;
- labels an imported review with a job type, because nobody checked which job it was for.

Until the connection below is made, the site uses the reviews it already has: the 10 hand-copied ones plus the public 5-star Google reviews Highlander supplied on 20 Nov 2026 (116 usable; 8 were already on the site, and a few very short ones are left off) (`src/data/google-reviews-public.json`). It also keeps the last figures (4.8, 179). Rotation works either way.

**Refreshing by hand instead:** send Claude a new list of public reviews (the same PDF/JSON format) and it replaces `google-reviews-public.json`, keeping the text word for word.

## One-time setup (Highlander, about 30 minutes + Google's approval wait)

Use the Google account that **owns or manages both listings**.

1. **Google Cloud project.** Go to console.cloud.google.com, create a project named "Highlander website reviews", and note the project number.
2. **Ask Google for Business Profile API access.** Google's page "Prerequisites" (developers.google.com/my-business/content/prereqs) links the access request form. Choose "Application for Basic API Access" and give the project number. Approval usually takes a few days, sometimes two weeks. Google emails the result.
3. **After approval, turn on three APIs** in that project (APIs & Services → Library):
   - My Business Account Management API
   - My Business Business Information API
   - Google My Business API
4. **OAuth consent screen** (APIs & Services → OAuth consent screen):
   - Choose "Internal" if Highlander uses Google Workspace, otherwise "External".
   - If External, press **Publish app** ("In production"). In "Testing" mode Google expires the sign-in after 7 days and the import stops.
5. **OAuth client** (APIs & Services → Credentials → Create credentials → OAuth client ID):
   - Type "Web application".
   - Authorised redirect URI: `https://developers.google.com/oauthplayground`
   - Keep the Client ID and Client secret.
6. **Refresh token**, at developers.google.com/oauthplayground:
   1. Open the gear icon, tick "Use your own OAuth credentials" and paste the Client ID and secret.
   2. In "Input your own scopes" type `https://www.googleapis.com/auth/business.manage`, then press Authorize APIs and sign in with the owner/manager account.
   3. Press "Exchange authorization code for tokens" and copy the **Refresh token**.
7. **Add three secrets in Lovable Cloud.** Never paste them in chat or email.
   - `GOOGLE_GBP_CLIENT_ID`
   - `GOOGLE_GBP_CLIENT_SECRET`
   - `GOOGLE_GBP_REFRESH_TOKEN`
8. **Optional, recommended: daily rebuild.** Without this, new reviews appear with the next site update (Lovable publishes most days).
   1. In Netlify (site `highlandernc`), open Site configuration → Build & deploy → Build hooks → Add build hook, named "Google reviews", branch `main`.
   2. Add the hook URL as the Lovable Cloud secret `NETLIFY_BUILD_HOOK_URL`.
   3. The job then rebuilds the site only on days when a review was added, changed or removed.

Then tell Claude: it runs the job once in "dry run" mode to confirm both listings are found, then for real. If the listings can't be told apart automatically, the secrets `GBP_FRANKLIN_LOCATION` and `GBP_SYLVA_LOCATION` (form `accounts/…/locations/…`) settle it.

## Day to day

- **Hide a review from the website:** set `hidden = true` on its row in the `google_reviews` table (Lovable Cloud → Database). It stays on Google.
- **Problems:** `google_review_summary.last_error` shows the last error per listing. The job never removes reviews from the site because of an error; the last good snapshot stays.

## How it fits together

| Piece | File |
|---|---|
| Tables + daily schedule | `supabase/migrations/20261120180000_google_reviews.sql` |
| Daily import from Google | `supabase/functions/google-reviews-sync/index.ts` |
| Build step (snapshot) | `scripts/fetch-google-reviews.mjs` → `src/data/generated/google-reviews.json` |
| Merge, filters, rotation | `src/data/reviews.ts` (`importedReviews`, `rotateReviews`) |
| Rating and count | `src/data/business.ts` (reads the snapshot; falls back to the last hand-checked figures) |

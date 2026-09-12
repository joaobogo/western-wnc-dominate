# Connect BabyLoveGrowth AI for Draft Review

## Goal
Import BabyLoveGrowth articles into a private review queue. Nothing publishes automatically; existing public blog pages remain unchanged until an article is intentionally approved and added through the current publishing workflow.

## Implementation
1. **Create protected draft storage**
   - Add a `blog_drafts` table for imported article content, metadata, source IDs, review status, reviewer notes, and timestamps.
   - Grant access only to authenticated users and enforce admin-only read/write policies with the existing role check.
   - Deduplicate imports by BabyLoveGrowth article ID.

2. **Add a secure import service**
   - Create a backend function that validates the current session and admin role before using the encrypted `BABYLOVEGROWTH_API_KEY`.
   - Fetch article summaries from BabyLoveGrowth's official `/v1/articles` API, then fetch full content for new or updated items.
   - Normalize API fields into the draft table and mark every imported item `pending_review`.
   - Return clear provider errors and never expose the API key to the browser.

3. **Build the private review page**
   - Add an unlisted `/admin/blog-review` page using the existing admin sign-in and role protection.
   - Show pending, approved, and rejected drafts with title, keyword, import date, metadata, and article preview.
   - Include manual “Import latest,” “Approve,” and “Reject” controls. Approval records the decision but does not publish the article automatically.

4. **Connect routing and generated database types**
   - Add the lazy-loaded admin route beside the existing lead and conversion dashboards.
   - Update generated database types after the migration so the page uses typed records.

5. **Verify safely**
   - Test the BabyLoveGrowth API through the backend function without publishing content.
   - Verify signed-out users cannot access drafts, non-admin users are blocked, repeat imports do not duplicate articles, and review state persists.
   - Run focused tests and confirm the app builds cleanly. No CRM or JobTread data will be sent.

## Technical details
- Official API base: `https://api.babylovegrowth.ai/api/integrations`
- Authentication: `X-API-Key` from the encrypted runtime secret.
- Import endpoints: `GET /v1/articles?limit=50&offset=…` and `GET /v1/articles/{id}`.
- BabyLoveGrowth exposes published articles rather than remote draft states, so “draft” means a private local review copy after import.
- Existing static public blog rendering is intentionally unchanged in this phase; approval is a review decision, not an automatic website publish.

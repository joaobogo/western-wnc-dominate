# Automatic daily BabyLoveGrowth import + one-click publish

## What changes for you
- Every morning new BabyLoveGrowth articles show up in Admin → Blog Review as "Pending review". Nobody has to click Import.
- The review page shows a banner: "3 new drafts waiting".
- You click **Publish** on a draft. The article goes on /blog and /blog/<slug> right away, using the same layout as the current articles (cover, FAQs, structured data, title/description, internal links).
- Nothing goes live without that click. Existing articles and addresses stay exactly as they are.

## One limitation to know about
The sitemap, llms.txt and the pre-rendered page Google sees are built when the site is published. So a newly published draft shows to visitors right away. It reaches the sitemap, llms.txt and the pre-rendered page on the next site publish. After you click Publish, the review page will say "Live now. Added to sitemap on next publish." We can add an automatic daily republish later if you want it.

## Steps
1. **Migration** (adds columns only; nothing is dropped or renamed)
   - `blog_drafts`: add `published_at timestamptz`, `published_by uuid`, `faqs jsonb`, `category text`, `town text`, `read_time text`, `hero_image_path text`. Add a unique index on `slug`, limited to published rows.
   - New table `blog_import_runs` (`id`, `ran_at`, `trigger` = cron|manual, `fetched`, `new_drafts`, `updated`, `error`). The import function writes it. Admins can read it.
   - Policy: `anon`/`authenticated` can SELECT `blog_drafts` only where `review_status = 'published'`, using a limited view `public_blog_posts` with only the public columns. No reviewer notes or source payload are exposed. Admin policies stay as they are.
   - Validation trigger runs on change to `published`. It requires a slug, title, meta description and content. The slug must not match a file-based post or a redirect source. That check runs against a `reserved_blog_slugs` table, which the build fills.
2. **Edge function `babylovegrowth-import`**
   - Accepts either an admin session (current behaviour) or the header `x-cron-secret` matching the new secret `BLOG_IMPORT_CRON_SECRET`, compared in constant time.
   - New articles are inserted as `pending_review`. Re-imports never change `review_status` and never overwrite rows that are already approved or published.
   - Applies the standard cleanup at import time: strips the BabyLoveGrowth box, competitor links, em/en dashes, "architectural" → "dimensional", GAF and banned claims. It records a list of flags for the reviewer.
   - Inserts one `blog_import_runs` row per run.
3. **Cron**: a daily `pg_cron` + `pg_net` job at 11:00 UTC (7am ET) posts to the function with the cron secret header. It runs once a day, so the cost is negligible. I'll set it up with a direct SQL run, not a migration, so the secret never lands in the codebase.
4. **Publish action**: a new small edge function `blog-publish`, admin only. It sets `published`, `published_at` and `published_by`, copies the hero image into a public path, and calls the existing `indexnow-submit`. Approve and Publish stay as separate buttons. Publish is only enabled after Approve.
5. **Site rendering**
   - New `src/lib/cmsBlogPosts.ts` maps a published row to the existing `BlogPost` type, so the existing `BlogPost.tsx` / `Blog.tsx` components render it unchanged.
   - `Blog.tsx` merges file posts with the published rows it fetches. File posts win on any slug clash.
   - `BlogPost.tsx` checks the static posts first. If the slug isn't there, it fetches from `public_blog_posts`. It only shows 404 when both lookups miss.
6. **Build-time inclusion**: new `scripts/fetch-cms-posts.ts` runs first in predev/prebuild. It reads published rows into `src/data/blogs-cms.generated.ts` and fills `reserved_blog_slugs`. `blogs.ts` appends those posts, so the sitemap (lastmod = `published_at`/`updated_at`), prerender, llms.txt and the SEO checks all pick them up automatically. If the backend is unreachable, it keeps the last generated file, so the build never fails because of it.
7. **Admin page** `AdminBlogReview.tsx`: banner from the newest `blog_import_runs` row plus the live pending count ("3 new drafts waiting", last run time, any error). Adds a Publish button, editable FAQ/category/town fields, and a preview using the real article component.

## Files
- `supabase/functions/babylovegrowth-import/index.ts` (edit)
- `supabase/functions/blog-publish/index.ts` (new)
- `src/pages/AdminBlogReview.tsx`, `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx` (edit)
- `src/lib/cmsBlogPosts.ts`, `src/lib/blogCleanup.ts` (cleanup rules shared with the function via `supabase/functions/_shared/blogCleanup.ts`) (new)
- `scripts/fetch-cms-posts.ts` (new), `src/data/blogs-cms.generated.ts` (generated), `src/data/blogs.ts` (append), `package.json` (predev/prebuild order)
- Tests: `src/test/cms-blog-mapping.test.ts` (row → post shape, file post wins on clash), `src/test/blog-import-auth.test.ts` (cron secret accepted, wrong secret rejected, re-import never changes status), `src/test/sitemap-lastmod.test.ts` (extended for CMS posts)
- `AGENTS.md`: one rule: "DB posts only render when status is published; file posts win on slug clash"

## Secret to add
- `BLOG_IMPORT_CRON_SECRET`: I'll generate it automatically. You don't need to supply anything. `BABYLOVEGROWTH_API_KEY` already exists.

## Before building, I'll check
- The current `blog_drafts` policies and the exact BabyLoveGrowth payload fields (FAQs, images), so the mapping uses real data.

-- Google reviews imported daily from Highlander's two Google Business Profile
-- listings (Franklin and Sylva) by the google-reviews-sync edge function.
-- Text is stored exactly as Google returns it and is never edited.

CREATE TABLE IF NOT EXISTS public.google_reviews (
  review_id text PRIMARY KEY,
  profile text NOT NULL CHECK (profile IN ('franklin', 'sylva')),
  author_name text NOT NULL,
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text,
  created_at_google timestamptz NOT NULL,
  updated_at_google timestamptz,
  has_owner_reply boolean NOT NULL DEFAULT false,
  -- Set when the review no longer appears on Google (deleted or removed).
  removed_at timestamptz,
  -- The team can hide a review from the website without deleting it.
  hidden boolean NOT NULL DEFAULT false,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS google_reviews_profile_created_idx
  ON public.google_reviews (profile, created_at_google DESC);

ALTER TABLE public.google_reviews ENABLE ROW LEVEL SECURITY;

-- The website reads only reviews that are live on Google, not hidden by the
-- team, 4 or 5 stars, and have written text.
DROP POLICY IF EXISTS "Public reads shown Google reviews" ON public.google_reviews;
CREATE POLICY "Public reads shown Google reviews"
ON public.google_reviews FOR SELECT TO anon, authenticated
USING (removed_at IS NULL AND hidden = false AND rating >= 4 AND coalesce(length(trim(comment)), 0) > 0);

DROP POLICY IF EXISTS "Admins manage Google reviews" ON public.google_reviews;
CREATE POLICY "Admins manage Google reviews"
ON public.google_reviews FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

GRANT SELECT ON public.google_reviews TO anon, authenticated;
GRANT ALL ON public.google_reviews TO service_role;

CREATE TABLE IF NOT EXISTS public.google_review_summary (
  profile text PRIMARY KEY CHECK (profile IN ('franklin', 'sylva')),
  average_rating numeric(2, 1),
  total_review_count integer,
  fetched_at timestamptz NOT NULL DEFAULT now(),
  last_error text
);

ALTER TABLE public.google_review_summary ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public reads Google review summary" ON public.google_review_summary;
CREATE POLICY "Public reads Google review summary"
ON public.google_review_summary FOR SELECT TO anon, authenticated
USING (true);

GRANT SELECT ON public.google_review_summary TO anon, authenticated;
GRANT ALL ON public.google_review_summary TO service_role;

INSERT INTO public.internal_config (key, value)
VALUES ('google_reviews_token', encode(gen_random_bytes(24), 'hex'))
ON CONFLICT (key) DO NOTHING;

-- Daily at 10:13 UTC (5:13 or 6:13 AM in Franklin), before the office opens.
select cron.schedule(
  'google-reviews-daily-sync',
  '13 10 * * *',
  $$
  select net.http_post(
    url:='https://qflrlebkswerlbqbuslx.supabase.co/functions/v1/google-reviews-sync',
    headers:=jsonb_build_object(
      'Content-Type','application/json',
      'x-admin-secret',(select value from public.internal_config where key='google_reviews_token')
    ),
    body:='{}'::jsonb
  );
  $$
);

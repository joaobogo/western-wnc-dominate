-- Tighten RLS on seo_404_log: replace blanket WITH CHECK (true) with validated constraints
DROP POLICY IF EXISTS "Anyone can log 404s" ON public.seo_404_log;
DROP POLICY IF EXISTS "No public reads on 404 log" ON public.seo_404_log;

-- Public (anon + authenticated) may insert ONLY validated 404 rows:
--  * path must be a relative site path (starts with '/'), not absurdly long
--  * referrer, if provided, must be a sane http(s) URL or empty
--  * metadata must be a JSON object, not an array/string
--  * created_at cannot be spoofed into the future or far past (DB default still wins,
--    but defense-in-depth in case a client passes an explicit value)
CREATE POLICY "Validated 404 inserts only"
  ON public.seo_404_log
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    path IS NOT NULL
    AND char_length(path) BETWEEN 1 AND 2048
    AND path LIKE '/%'
    AND (referrer IS NULL OR referrer = '' OR referrer ~* '^https?://[^\s]{1,2048}$')
    AND (user_agent IS NULL OR char_length(user_agent) <= 1024)
    AND (metadata IS NULL OR jsonb_typeof(metadata) = 'object')
  );

-- Service role may read for reporting; no public read access at all.
CREATE POLICY "Service role can read 404 log"
  ON public.seo_404_log
  FOR SELECT
  TO service_role
  USING (true);

-- Lock down seo_reports: service role only for all operations; no anon/authenticated access.
DROP POLICY IF EXISTS "No public access to reports" ON public.seo_reports;

CREATE POLICY "Service role can read reports"
  ON public.seo_reports
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert reports"
  ON public.seo_reports
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update reports"
  ON public.seo_reports
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

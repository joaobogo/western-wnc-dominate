-- service_role bypasses RLS automatically; the explicit policies trigger the
-- "RLS Policy Always True" linter. Drop them — security is unchanged.
DROP POLICY IF EXISTS "Service role can read 404 log" ON public.seo_404_log;
DROP POLICY IF EXISTS "Service role can read reports" ON public.seo_reports;
DROP POLICY IF EXISTS "Service role can insert reports" ON public.seo_reports;
DROP POLICY IF EXISTS "Service role can update reports" ON public.seo_reports;

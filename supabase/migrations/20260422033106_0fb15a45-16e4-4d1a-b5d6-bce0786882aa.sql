-- Explicit deny-all policy for public roles on seo_reports.
-- service_role still bypasses RLS, so backend reporting continues to work.
CREATE POLICY "No public access to seo_reports"
  ON public.seo_reports
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

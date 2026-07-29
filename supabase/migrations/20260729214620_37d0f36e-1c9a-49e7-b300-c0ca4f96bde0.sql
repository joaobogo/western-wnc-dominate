REVOKE SELECT ON public.roof_designs FROM anon, authenticated;
DROP POLICY IF EXISTS "No public reads on roof designs" ON public.roof_designs;
CREATE POLICY "No public reads on roof designs" ON public.roof_designs FOR SELECT TO anon, authenticated USING (false);
GRANT ALL ON public.roof_designs TO service_role;
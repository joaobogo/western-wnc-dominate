DROP POLICY IF EXISTS "Anyone can read own session designs" ON public.roof_designs;
REVOKE SELECT ON public.roof_designs FROM anon, authenticated;
GRANT INSERT ON public.roof_designs TO anon, authenticated;
GRANT ALL ON public.roof_designs TO service_role;
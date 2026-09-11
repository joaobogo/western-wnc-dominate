GRANT INSERT ON public.intake_leads TO anon;

DROP POLICY IF EXISTS "Anyone with the call sheet can create intake leads" ON public.intake_leads;
CREATE POLICY "Anyone with the call sheet can create intake leads"
ON public.intake_leads
FOR INSERT
TO anon
WITH CHECK (true);
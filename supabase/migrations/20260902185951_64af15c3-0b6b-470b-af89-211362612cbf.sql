DROP POLICY IF EXISTS "Intake app can create leads" ON public.intake_leads;
DROP POLICY IF EXISTS "Intake app can read leads" ON public.intake_leads;
DROP POLICY IF EXISTS "Intake app can update lead status" ON public.intake_leads;

REVOKE ALL ON public.intake_leads FROM anon;
GRANT SELECT, INSERT, UPDATE ON public.intake_leads TO authenticated;
GRANT ALL ON public.intake_leads TO service_role;

ALTER TABLE public.intake_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read intake leads"
ON public.intake_leads FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create intake leads"
ON public.intake_leads FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update intake leads"
ON public.intake_leads FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
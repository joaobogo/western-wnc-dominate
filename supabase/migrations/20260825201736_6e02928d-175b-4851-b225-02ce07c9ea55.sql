CREATE TABLE public.intake_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  email TEXT,
  preferred_contact TEXT,
  best_time TEXT,
  address TEXT,
  town TEXT,
  location_tier TEXT,
  relationship TEXT,
  owner_name TEXT,
  owner_contact TEXT,
  property_type TEXT,
  job_type TEXT,
  details TEXT,
  timing TEXT,
  budget_range TEXT,
  source TEXT,
  source_detail TEXT,
  channel TEXT,
  taken_by TEXT,
  spoke_live BOOLEAN NOT NULL DEFAULT false,
  vendor_call BOOLEAN NOT NULL DEFAULT false,
  not_offered BOOLEAN NOT NULL DEFAULT false,
  appointment JSONB NOT NULL DEFAULT '{}'::jsonb,
  score INTEGER,
  grade TEXT NOT NULL DEFAULT 'D',
  breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
  gates JSONB NOT NULL DEFAULT '[]'::jsonb,
  flags JSONB NOT NULL DEFAULT '[]'::jsonb,
  call_by TIMESTAMP WITH TIME ZONE,
  score_version TEXT NOT NULL DEFAULT 'V1.0',
  status TEXT NOT NULL DEFAULT 'new',
  payload JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX intake_leads_created_at_idx ON public.intake_leads (created_at DESC);
CREATE INDEX intake_leads_queue_idx ON public.intake_leads (status, grade, call_by);

GRANT SELECT, INSERT, UPDATE ON public.intake_leads TO anon;
GRANT SELECT, INSERT, UPDATE ON public.intake_leads TO authenticated;
GRANT ALL ON public.intake_leads TO service_role;

ALTER TABLE public.intake_leads ENABLE ROW LEVEL SECURITY;

-- Interim open access: this is an internal-only tool and sign-in is added in
-- the next step, at which point these policies get scoped to authenticated staff.
CREATE POLICY "Intake app can create leads"
  ON public.intake_leads FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Intake app can read leads"
  ON public.intake_leads FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Intake app can update lead status"
  ON public.intake_leads FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
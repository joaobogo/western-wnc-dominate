ALTER TABLE public.intake_leads
  ADD COLUMN IF NOT EXISTS jobtread_synced BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS jobtread_sync_status TEXT NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS jobtread_id TEXT,
  ADD COLUMN IF NOT EXISTS jobtread_last_attempt_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS jobtread_error_message TEXT,
  ADD COLUMN IF NOT EXISTS jobtread_retry_count INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS jobtread_payload JSONB,
  ADD COLUMN IF NOT EXISTS idempotency_key TEXT,
  ADD COLUMN IF NOT EXISTS jobtread_next_retry_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS jobtread_exhausted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS jobtread_alerted BOOLEAN NOT NULL DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS intake_leads_idempotency_key_idx
  ON public.intake_leads (idempotency_key)
  WHERE idempotency_key IS NOT NULL;

CREATE INDEX IF NOT EXISTS intake_leads_jobtread_retry_idx
  ON public.intake_leads (jobtread_sync_status, jobtread_next_retry_at)
  WHERE jobtread_synced = false;

REVOKE ALL ON public.intake_leads FROM anon;
GRANT INSERT ON public.intake_leads TO anon;
GRANT SELECT, INSERT, UPDATE ON public.intake_leads TO authenticated;
GRANT ALL ON public.intake_leads TO service_role;

DROP POLICY IF EXISTS "Admins can create intake leads" ON public.intake_leads;
DROP POLICY IF EXISTS "Public can submit intake leads" ON public.intake_leads;
CREATE POLICY "Public can submit intake leads"
ON public.intake_leads FOR INSERT TO anon
WITH CHECK (
  id IS NOT NULL
  AND (NULLIF(btrim(COALESCE(first_name, '')), '') IS NOT NULL
       OR NULLIF(btrim(COALESCE(last_name, '')), '') IS NOT NULL)
  AND (NULLIF(btrim(COALESCE(phone, '')), '') IS NOT NULL
       OR NULLIF(btrim(COALESCE(email, '')), '') IS NOT NULL)
  AND score_version = 'V1.1'
  AND status = 'new'
  AND jobtread_synced = false
  AND jobtread_sync_status = 'pending'
  AND jobtread_retry_count = 0
  AND jobtread_alerted = false
);

CREATE POLICY "Admins can create intake leads"
ON public.intake_leads FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can read intake leads" ON public.intake_leads;
CREATE POLICY "Admins can read intake leads"
ON public.intake_leads FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update intake leads" ON public.intake_leads;
CREATE POLICY "Admins can update intake leads"
ON public.intake_leads FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
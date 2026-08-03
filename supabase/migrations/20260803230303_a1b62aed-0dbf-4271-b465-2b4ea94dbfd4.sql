ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS idempotency_key text,
  ADD COLUMN IF NOT EXISTS jobtread_next_retry_at timestamptz,
  ADD COLUMN IF NOT EXISTS jobtread_exhausted_at timestamptz,
  ADD COLUMN IF NOT EXISTS jobtread_alerted boolean NOT NULL DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS leads_idempotency_key_uidx
  ON public.leads (idempotency_key) WHERE idempotency_key IS NOT NULL;

CREATE INDEX IF NOT EXISTS leads_jobtread_retry_idx
  ON public.leads (jobtread_sync_status, jobtread_next_retry_at)
  WHERE jobtread_synced = false;

ALTER TABLE public.consultation_requests
  ADD COLUMN IF NOT EXISTS jobtread_next_retry_at timestamptz,
  ADD COLUMN IF NOT EXISTS jobtread_exhausted_at timestamptz,
  ADD COLUMN IF NOT EXISTS jobtread_alerted boolean NOT NULL DEFAULT false;

ALTER TABLE public.designer_leads
  ADD COLUMN IF NOT EXISTS jobtread_next_retry_at timestamptz,
  ADD COLUMN IF NOT EXISTS jobtread_exhausted_at timestamptz,
  ADD COLUMN IF NOT EXISTS jobtread_alerted boolean NOT NULL DEFAULT false;

ALTER TABLE public.chatbot_conversations
  ADD COLUMN IF NOT EXISTS jobtread_next_retry_at timestamptz,
  ADD COLUMN IF NOT EXISTS jobtread_exhausted_at timestamptz,
  ADD COLUMN IF NOT EXISTS jobtread_alerted boolean NOT NULL DEFAULT false;
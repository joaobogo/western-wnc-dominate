
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS jobtread_synced boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS jobtread_sync_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS jobtread_id text,
  ADD COLUMN IF NOT EXISTS jobtread_account_id text,
  ADD COLUMN IF NOT EXISTS jobtread_last_attempt_at timestamptz,
  ADD COLUMN IF NOT EXISTS jobtread_error_message text,
  ADD COLUMN IF NOT EXISTS jobtread_retry_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS jobtread_payload jsonb;

ALTER TABLE public.chatbot_conversations
  ADD COLUMN IF NOT EXISTS jobtread_synced boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS jobtread_sync_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS jobtread_id text,
  ADD COLUMN IF NOT EXISTS jobtread_last_attempt_at timestamptz,
  ADD COLUMN IF NOT EXISTS jobtread_error_message text,
  ADD COLUMN IF NOT EXISTS jobtread_retry_count integer NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_leads_jobtread_status
  ON public.leads (jobtread_sync_status)
  WHERE jobtread_sync_status IN ('pending', 'failed', 'retry_needed');

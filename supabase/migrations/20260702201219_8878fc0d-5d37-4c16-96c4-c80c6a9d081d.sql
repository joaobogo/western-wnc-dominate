ALTER TABLE public.consultation_requests
  ADD COLUMN IF NOT EXISTS jobtread_synced boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS jobtread_sync_status text,
  ADD COLUMN IF NOT EXISTS jobtread_id text,
  ADD COLUMN IF NOT EXISTS jobtread_last_attempt_at timestamptz,
  ADD COLUMN IF NOT EXISTS jobtread_error_message text,
  ADD COLUMN IF NOT EXISTS jobtread_retry_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS jobtread_payload jsonb;

ALTER TABLE public.designer_leads
  ADD COLUMN IF NOT EXISTS jobtread_synced boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS jobtread_sync_status text,
  ADD COLUMN IF NOT EXISTS jobtread_id text,
  ADD COLUMN IF NOT EXISTS jobtread_last_attempt_at timestamptz,
  ADD COLUMN IF NOT EXISTS jobtread_error_message text,
  ADD COLUMN IF NOT EXISTS jobtread_retry_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS jobtread_payload jsonb;
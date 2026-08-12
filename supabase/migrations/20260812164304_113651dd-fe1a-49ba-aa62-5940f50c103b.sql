CREATE UNIQUE INDEX IF NOT EXISTS leads_idempotency_key_uniq
  ON public.leads (idempotency_key)
  WHERE idempotency_key IS NOT NULL;

CREATE INDEX IF NOT EXISTS leads_dead_letter_idx
  ON public.leads (jobtread_exhausted_at DESC)
  WHERE jobtread_synced = false;
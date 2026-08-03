ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS landing_page text,
  ADD COLUMN IF NOT EXISTS landing_url text,
  ADD COLUMN IF NOT EXISTS msclkid text,
  ADD COLUMN IF NOT EXISTS first_seen_at timestamptz;
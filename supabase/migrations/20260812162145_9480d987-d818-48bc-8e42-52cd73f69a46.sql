ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS property_county text,
  ADD COLUMN IF NOT EXISTS source_context text,
  ADD COLUMN IF NOT EXISTS submitted_at timestamptz;
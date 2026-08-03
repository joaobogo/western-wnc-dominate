ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS is_company boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS company_name text;
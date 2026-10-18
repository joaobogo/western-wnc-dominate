-- Resumable JobTread sync: the account / contact / property / job IDs created
-- for a lead are saved as each step succeeds, so a retry reuses them and redoes
-- only the failed step instead of creating duplicate accounts and properties.
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS jobtread_progress jsonb;
ALTER TABLE public.chatbot_conversations ADD COLUMN IF NOT EXISTS jobtread_progress jsonb;
ALTER TABLE public.consultation_requests ADD COLUMN IF NOT EXISTS jobtread_progress jsonb;
ALTER TABLE public.intake_leads ADD COLUMN IF NOT EXISTS jobtread_progress jsonb;
ALTER TABLE public.designer_leads ADD COLUMN IF NOT EXISTS jobtread_progress jsonb;

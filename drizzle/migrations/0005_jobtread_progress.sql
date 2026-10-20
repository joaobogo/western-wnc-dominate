ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS jobtread_progress jsonb;
ALTER TABLE public.chatbot_conversations ADD COLUMN IF NOT EXISTS jobtread_progress jsonb;
ALTER TABLE public.consultation_requests ADD COLUMN IF NOT EXISTS jobtread_progress jsonb;
ALTER TABLE public.intake_leads ADD COLUMN IF NOT EXISTS jobtread_progress jsonb;
ALTER TABLE public.designer_leads ADD COLUMN IF NOT EXISTS jobtread_progress jsonb;
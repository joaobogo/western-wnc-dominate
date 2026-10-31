ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS alert_email_sent_at timestamptz, ADD COLUMN IF NOT EXISTS alert_email_exhausted_at timestamptz;
ALTER TABLE public.chatbot_conversations ADD COLUMN IF NOT EXISTS alert_email_sent_at timestamptz, ADD COLUMN IF NOT EXISTS alert_email_exhausted_at timestamptz;
ALTER TABLE public.consultation_requests ADD COLUMN IF NOT EXISTS alert_email_sent_at timestamptz, ADD COLUMN IF NOT EXISTS alert_email_exhausted_at timestamptz;
ALTER TABLE public.designer_leads ADD COLUMN IF NOT EXISTS alert_email_sent_at timestamptz, ADD COLUMN IF NOT EXISTS alert_email_exhausted_at timestamptz;
ALTER TABLE public.intake_leads ADD COLUMN IF NOT EXISTS alert_email_sent_at timestamptz, ADD COLUMN IF NOT EXISTS alert_email_exhausted_at timestamptz;
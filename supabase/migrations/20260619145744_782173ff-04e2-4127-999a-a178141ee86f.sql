
-- ── Roles ──────────────────────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;
CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- ── Shared updated_at trigger ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- ── Leads table ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL,
  lead_type text,
  status text NOT NULL DEFAULT 'new',
  name text,
  phone text,
  email text,
  preferred_contact_method text,
  property_town text,
  property_address text,
  service_category text,
  project_type text,
  urgency text,
  project_description text,
  has_plans boolean,
  roofing_issue_type text,
  property_type text,
  photos_uploaded jsonb DEFAULT '[]'::jsonb,
  files_uploaded jsonb DEFAULT '[]'::jsonb,
  chat_summary text,
  full_chat_transcript jsonb,
  page_url text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  gclid text,
  fbclid text,
  li_fat_id text,
  user_agent text,
  ip_address text,
  consent_given boolean DEFAULT false,
  consent_text text,
  crm_synced boolean NOT NULL DEFAULT false,
  crm_sync_status text NOT NULL DEFAULT 'pending_crm_connection',
  crm_id text,
  notes text,
  metadata jsonb DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON public.leads (status);
CREATE INDEX IF NOT EXISTS leads_source_idx ON public.leads (source);

DROP TRIGGER IF EXISTS leads_set_updated_at ON public.leads;
CREATE TRIGGER leads_set_updated_at BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

GRANT INSERT ON public.leads TO anon, authenticated;
GRANT SELECT, UPDATE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads" ON public.leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read leads" ON public.leads;
CREATE POLICY "Admins can read leads" ON public.leads
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
CREATE POLICY "Admins can update leads" ON public.leads
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ── Chatbot conversations ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.chatbot_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  session_id text,
  name text,
  phone text,
  email text,
  property_town text,
  service_category text,
  project_type text,
  urgency text,
  summary text,
  full_transcript jsonb,
  recommended_next_step text,
  contact_path text,
  page_url text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  consent_given boolean DEFAULT false,
  consent_text text,
  converted_to_lead boolean DEFAULT false
);

CREATE INDEX IF NOT EXISTS chatbot_conversations_created_at_idx ON public.chatbot_conversations (created_at DESC);

DROP TRIGGER IF EXISTS chatbot_conversations_set_updated_at ON public.chatbot_conversations;
CREATE TRIGGER chatbot_conversations_set_updated_at BEFORE UPDATE ON public.chatbot_conversations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

GRANT INSERT ON public.chatbot_conversations TO anon, authenticated;
GRANT SELECT ON public.chatbot_conversations TO authenticated;
GRANT ALL ON public.chatbot_conversations TO service_role;
ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert chatbot conversations" ON public.chatbot_conversations;
CREATE POLICY "Anyone can insert chatbot conversations" ON public.chatbot_conversations
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read chatbot conversations" ON public.chatbot_conversations;
CREATE POLICY "Admins can read chatbot conversations" ON public.chatbot_conversations
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

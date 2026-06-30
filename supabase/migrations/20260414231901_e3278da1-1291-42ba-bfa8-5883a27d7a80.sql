CREATE TABLE public.consultation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT,
  email TEXT,
  phone TEXT,
  town TEXT,
  project_type TEXT,
  service_category TEXT,
  timeline TEXT,
  urgency TEXT,
  budget_range TEXT,
  project_description TEXT,
  source TEXT DEFAULT 'chatbot',
  lead_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'new',
  conversation_log JSONB DEFAULT '[]'::jsonb,
  has_plans BOOLEAN,
  insurance_status TEXT,
  property_type TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create consultation requests"
  ON public.consultation_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "No public reads on consultation requests"
  ON public.consultation_requests
  FOR SELECT
  TO public
  USING (false);
-- Create a table for internal conversion tracking
CREATE TABLE public.conversion_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  path TEXT NOT NULL,
  element_id TEXT,
  label TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  session_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;

-- Create policy for public to insert (track) events
-- We allow anonymous insertions for analytics tracking
CREATE POLICY "Anyone can insert conversion events" 
ON public.conversion_events 
FOR INSERT 
WITH CHECK (true);

-- Restrict SELECT to admins only (or disable for now if no auth.uid() checks)
-- For now, let's allow service role or authenticated if needed, 
-- but public SELECT is NOT allowed for security.
CREATE POLICY "Admins can view conversion events" 
ON public.conversion_events 
FOR SELECT 
USING (false); -- Adjust this if you have specific admin user IDs

-- Index for performance on common queries
CREATE INDEX idx_conversion_events_type ON public.conversion_events(event_type);
CREATE INDEX idx_conversion_events_path ON public.conversion_events(path);
CREATE INDEX idx_conversion_events_created_at ON public.conversion_events(created_at);

-- Fix 1: Explicitly deny SELECT on designer_leads (defense in depth)
CREATE POLICY "No public reads on leads"
  ON public.designer_leads
  FOR SELECT
  USING (false);

-- Fix 2: Make storage bucket private
UPDATE storage.buckets SET public = false WHERE id = 'roof-designs';

-- lovable-cron-fallback-reviewed: replaces the existing retry job at its same cadence, only adding an auth header
-- Storage: remove unbound read rules (no client reads these buckets; server uses signed URLs)
DROP POLICY IF EXISTS "No public reads on lead files" ON storage.objects;
DROP POLICY IF EXISTS "Roof image reads scoped to known prefixes" ON storage.objects;

DROP POLICY IF EXISTS "Anyone can create consultation requests" ON public.consultation_requests;
CREATE POLICY "Visitors can submit new consultation requests" ON public.consultation_requests
FOR INSERT TO anon, authenticated
WITH CHECK (jobtread_synced = false AND jobtread_id IS NULL AND jobtread_retry_count = 0
  AND (phone IS NOT NULL OR email IS NOT NULL)
  AND coalesce(length(project_description),0) <= 10000);

DROP POLICY IF EXISTS "Anyone can insert conversion events" ON public.conversion_events;
CREATE POLICY "Visitors can log bounded conversion events" ON public.conversion_events
FOR INSERT TO anon, authenticated
WITH CHECK (length(event_type) BETWEEN 1 AND 64 AND length(path) BETWEEN 1 AND 2048
  AND coalesce(length(label),0) <= 500 AND coalesce(length(element_id),0) <= 200);

DROP POLICY IF EXISTS "Anyone can create leads" ON public.designer_leads;
CREATE POLICY "Visitors can submit new designer leads" ON public.designer_leads
FOR INSERT TO anon, authenticated
WITH CHECK (jobtread_synced = false AND jobtread_id IS NULL AND jobtread_retry_count = 0
  AND length(name) BETWEEN 1 AND 200 AND length(email) BETWEEN 3 AND 255);

DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Visitors can submit new leads" ON public.leads
FOR INSERT TO anon, authenticated
WITH CHECK (jobtread_synced = false AND jobtread_id IS NULL AND jobtread_retry_count = 0
  AND crm_synced = false AND crm_id IS NULL
  AND coalesce(length(project_description),0) <= 10000 AND coalesce(length(notes),0) <= 10000);

DROP POLICY IF EXISTS "Anyone can create designs" ON public.roof_designs;
CREATE POLICY "Visitors can save bounded designs" ON public.roof_designs
FOR INSERT TO anon, authenticated
WITH CHECK (length(session_id) BETWEEN 8 AND 128
  AND (original_image_path LIKE 'uploads/%')
  AND (result_image_path IS NULL OR result_image_path LIKE 'results/%'));

DROP POLICY IF EXISTS "Anyone can insert metrics" ON public.designer_metrics;
CREATE POLICY "Visitors can log bounded designer metrics" ON public.designer_metrics
FOR INSERT TO anon, authenticated
WITH CHECK (length(event_type) BETWEEN 1 AND 64 AND coalesce(length(session_id),0) <= 128);

DROP POLICY IF EXISTS "Anyone can insert chatbot conversations" ON public.chatbot_conversations;
CREATE POLICY "Visitors can submit new chatbot conversations" ON public.chatbot_conversations
FOR INSERT TO anon, authenticated
WITH CHECK (jobtread_synced = false AND jobtread_id IS NULL AND jobtread_retry_count = 0
  AND coalesce(length(summary),0) <= 10000);

INSERT INTO public.internal_config(key, value)
VALUES ('jobtread_retry_token', encode(extensions.gen_random_bytes(24), 'hex'))
ON CONFLICT (key) DO NOTHING;

SELECT cron.unschedule('jobtread-retry-every-10-min');
SELECT cron.schedule('jobtread-retry-every-10-min', '*/10 * * * *', $$
  select net.http_post(
    url:='https://qflrlebkswerlbqbuslx.supabase.co/functions/v1/jobtread-retry',
    headers:=jsonb_build_object('Content-Type','application/json',
      'x-admin-secret',(select value from public.internal_config where key='jobtread_retry_token')),
    body:=jsonb_build_object('time', now())
  );
$$);
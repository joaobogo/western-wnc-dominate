
-- Grant Data API access needed for public forms to insert rows.
-- Existing RLS policies already restrict what anon/authenticated can insert.
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

GRANT INSERT ON public.chatbot_conversations TO anon, authenticated;
GRANT SELECT, UPDATE ON public.chatbot_conversations TO authenticated;
GRANT ALL ON public.chatbot_conversations TO service_role;

GRANT INSERT ON public.consultation_requests TO anon, authenticated;
GRANT SELECT, UPDATE ON public.consultation_requests TO authenticated;
GRANT ALL ON public.consultation_requests TO service_role;

GRANT INSERT ON public.designer_leads TO anon, authenticated;
GRANT SELECT, UPDATE ON public.designer_leads TO authenticated;
GRANT ALL ON public.designer_leads TO service_role;

GRANT INSERT ON public.designer_metrics TO anon, authenticated;
GRANT ALL ON public.designer_metrics TO service_role;

GRANT INSERT ON public.conversion_events TO anon, authenticated;
GRANT SELECT ON public.conversion_events TO authenticated;
GRANT ALL ON public.conversion_events TO service_role;

GRANT INSERT, SELECT ON public.roof_designs TO anon, authenticated;
GRANT ALL ON public.roof_designs TO service_role;

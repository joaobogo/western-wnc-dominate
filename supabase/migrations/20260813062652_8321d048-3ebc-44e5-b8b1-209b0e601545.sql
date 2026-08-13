DROP POLICY IF EXISTS "Admins can view conversion events" ON public.conversion_events;
CREATE POLICY "Admins can view conversion events"
ON public.conversion_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

GRANT SELECT ON public.conversion_events TO authenticated;

CREATE INDEX IF NOT EXISTS idx_conversion_events_type_created_at
  ON public.conversion_events(event_type, created_at DESC);
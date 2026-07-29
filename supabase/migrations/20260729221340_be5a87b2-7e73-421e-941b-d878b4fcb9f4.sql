CREATE TABLE public.site_health_checks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  ok boolean NOT NULL,
  checked_count integer NOT NULL DEFAULT 0,
  failure_count integer NOT NULL DEFAULT 0,
  failure_key text,
  build_commit text,
  results jsonb NOT NULL DEFAULT '[]'::jsonb,
  alerted boolean NOT NULL DEFAULT false
);

GRANT ALL ON public.site_health_checks TO service_role;

ALTER TABLE public.site_health_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to site health checks"
ON public.site_health_checks
FOR SELECT
TO anon, authenticated
USING (false);

CREATE INDEX site_health_checks_created_at_idx ON public.site_health_checks (created_at DESC);

INSERT INTO public.internal_config (key, value)
VALUES ('site_health_token', encode(gen_random_bytes(24), 'hex'))
ON CONFLICT (key) DO NOTHING;
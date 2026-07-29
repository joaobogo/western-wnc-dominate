CREATE TABLE public.internal_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT ALL ON public.internal_config TO service_role;

ALTER TABLE public.internal_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to internal config"
ON public.internal_config
FOR SELECT
USING (false);

INSERT INTO public.internal_config (key, value)
VALUES ('drift_check_token', encode(gen_random_bytes(24), 'hex'))
ON CONFLICT (key) DO NOTHING;
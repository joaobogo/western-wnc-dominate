CREATE TABLE public.deploy_drift_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  deployed_commit TEXT NOT NULL,
  expected_commit TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT ALL ON public.deploy_drift_alerts TO service_role;

ALTER TABLE public.deploy_drift_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to deploy drift alerts"
ON public.deploy_drift_alerts
FOR SELECT
USING (false);

CREATE INDEX idx_deploy_drift_alerts_created_at ON public.deploy_drift_alerts (created_at DESC);
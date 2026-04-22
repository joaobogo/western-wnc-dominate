-- 404 event log
CREATE TABLE public.seo_404_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_seo_404_log_created_at ON public.seo_404_log (created_at DESC);
CREATE INDEX idx_seo_404_log_path ON public.seo_404_log (path);

ALTER TABLE public.seo_404_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log 404s"
  ON public.seo_404_log FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "No public reads on 404 log"
  ON public.seo_404_log FOR SELECT
  TO public
  USING (false);

-- Weekly report snapshots
CREATE TABLE public.seo_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  sitemap_status TEXT,
  sitemap_url_count INTEGER,
  total_404s INTEGER DEFAULT 0,
  top_404_paths JSONB DEFAULT '[]'::jsonb,
  gsc_total_clicks INTEGER,
  gsc_total_impressions INTEGER,
  gsc_avg_ctr NUMERIC,
  gsc_avg_position NUMERIC,
  gsc_indexed_pages INTEGER,
  gsc_top_keywords JSONB DEFAULT '[]'::jsonb,
  gsc_top_pages JSONB DEFAULT '[]'::jsonb,
  email_status TEXT,
  email_recipient TEXT,
  errors JSONB DEFAULT '[]'::jsonb,
  raw_data JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_seo_reports_created_at ON public.seo_reports (created_at DESC);

ALTER TABLE public.seo_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to reports"
  ON public.seo_reports FOR SELECT
  TO public
  USING (false);
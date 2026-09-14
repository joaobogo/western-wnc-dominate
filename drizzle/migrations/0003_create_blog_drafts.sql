CREATE TABLE public.blog_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL DEFAULT 'babylovegrowth',
  source_article_id text NOT NULL,
  title text NOT NULL,
  slug text,
  excerpt text,
  meta_description text,
  hero_image_url text,
  language_code text,
  organization_website text,
  seed_keyword text,
  keywords jsonb NOT NULL DEFAULT '[]'::jsonb,
  content_markdown text,
  content_html text,
  json_ld jsonb,
  faq_json_ld jsonb,
  source_created_at timestamptz,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  review_status text NOT NULL DEFAULT 'pending_review' CHECK (review_status IN ('pending_review', 'approved', 'rejected', 'published')),
  reviewer_notes text,
  reviewed_by uuid,
  reviewed_at timestamptz,
  imported_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source, source_article_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_drafts TO authenticated;
GRANT ALL ON public.blog_drafts TO service_role;

ALTER TABLE public.blog_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read blog drafts"
ON public.blog_drafts
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert blog drafts"
ON public.blog_drafts
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog drafts"
ON public.blog_drafts
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog drafts"
ON public.blog_drafts
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX blog_drafts_review_status_idx ON public.blog_drafts (review_status, imported_at DESC);
CREATE INDEX blog_drafts_source_created_at_idx ON public.blog_drafts (source_created_at DESC);

CREATE TRIGGER blog_drafts_set_updated_at
BEFORE UPDATE ON public.blog_drafts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
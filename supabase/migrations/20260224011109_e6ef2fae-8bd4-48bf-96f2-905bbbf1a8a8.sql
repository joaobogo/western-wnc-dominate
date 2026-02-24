
-- Roof materials catalog
CREATE TABLE public.roof_materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'shingle', 'metal', 'standing_seam', 'flat'
  color_name TEXT NOT NULL,
  color_hex TEXT NOT NULL,
  texture_url TEXT,
  finish TEXT DEFAULT 'matte', -- 'matte', 'gloss'
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.roof_materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Roof materials are publicly readable"
ON public.roof_materials FOR SELECT
USING (true);

-- Roof designs (user-created designs)
CREATE TABLE public.roof_designs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  original_image_path TEXT NOT NULL,
  result_image_path TEXT,
  mask_data JSONB, -- stores the roof mask polygon/brush data
  material_id UUID REFERENCES public.roof_materials(id),
  material_name TEXT,
  color_hex TEXT,
  finish TEXT,
  session_id TEXT NOT NULL, -- anonymous session tracking
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.roof_designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create designs"
ON public.roof_designs FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can read own session designs"
ON public.roof_designs FOR SELECT
USING (true);

CREATE POLICY "Anyone can update own session designs"
ON public.roof_designs FOR UPDATE
USING (true);

-- Leads from the designer
CREATE TABLE public.designer_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  design_id UUID REFERENCES public.roof_designs(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  town TEXT,
  timeline TEXT, -- 'asap', '30_days', 'researching'
  gdpr_consent BOOLEAN DEFAULT false,
  source TEXT DEFAULT 'virtual_designer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.designer_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create leads"
ON public.designer_leads FOR INSERT
WITH CHECK (true);

-- Designer usage metrics
CREATE TABLE public.designer_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, -- 'upload', 'design_complete', 'email_submit', 'inspection_book'
  design_id UUID REFERENCES public.roof_designs(id),
  session_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.designer_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert metrics"
ON public.designer_metrics FOR INSERT
WITH CHECK (true);

-- Storage bucket for roof designer uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('roof-designs', 'roof-designs', true);

CREATE POLICY "Anyone can upload roof images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'roof-designs');

CREATE POLICY "Anyone can view roof images"
ON storage.objects FOR SELECT
USING (bucket_id = 'roof-designs');

-- Seed initial materials
INSERT INTO public.roof_materials (name, category, color_name, color_hex, finish, sort_order) VALUES
('Architectural Shingle', 'shingle', 'Charcoal Black', '#2d2d2d', 'matte', 1),
('Architectural Shingle', 'shingle', 'Weathered Wood', '#8B7355', 'matte', 2),
('Architectural Shingle', 'shingle', 'Driftwood', '#A89078', 'matte', 3),
('Architectural Shingle', 'shingle', 'Slate Gray', '#708090', 'matte', 4),
('Architectural Shingle', 'shingle', 'Onyx Black', '#1a1a1a', 'matte', 5),
('Architectural Shingle', 'shingle', 'Hickory', '#6B4226', 'matte', 6),
('Metal Roofing', 'metal', 'Matte Black', '#1c1c1c', 'matte', 7),
('Metal Roofing', 'metal', 'Charcoal', '#36454F', 'matte', 8),
('Metal Roofing', 'metal', 'Burnished Slate', '#4A5568', 'gloss', 9),
('Metal Roofing', 'metal', 'Galvalume Silver', '#C0C0C0', 'gloss', 10),
('Standing Seam', 'standing_seam', 'Forest Green', '#2D5A27', 'gloss', 11),
('Standing Seam', 'standing_seam', 'Colonial Red', '#8B2500', 'gloss', 12),
('Standing Seam', 'standing_seam', 'Bronze', '#8C7853', 'gloss', 13),
('Standing Seam', 'standing_seam', 'Copper Penny', '#B87333', 'gloss', 14),
('Flat Roofing', 'flat', 'White TPO', '#F5F5F5', 'matte', 15),
('Flat Roofing', 'flat', 'Gray EPDM', '#808080', 'matte', 16);

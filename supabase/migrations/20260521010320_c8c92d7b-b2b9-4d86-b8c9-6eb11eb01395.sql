-- Remove permissive UPDATE policy on roof_designs (designs are immutable after creation)
DROP POLICY IF EXISTS "Anyone can update own session designs" ON public.roof_designs;

-- Tighten storage policies for roof-designs bucket: limit to known path prefixes
DROP POLICY IF EXISTS "Anyone can upload roof images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view roof images" ON storage.objects;

CREATE POLICY "Roof image uploads scoped to known prefixes"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'roof-designs'
  AND (
    name LIKE 'uploads/%'
    OR name LIKE 'results/%'
  )
  AND char_length(name) <= 256
);

CREATE POLICY "Roof image reads scoped to known prefixes"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'roof-designs'
  AND (
    name LIKE 'uploads/%'
    OR name LIKE 'results/%'
  )
);
-- No UPDATE or DELETE policies on storage = blocked by default (prevents overwrites)
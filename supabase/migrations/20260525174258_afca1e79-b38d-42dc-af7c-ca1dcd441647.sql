-- Replace the unrestricted insert policy with one scoped to the submissions/ prefix
drop policy if exists "Anyone can upload lead files" on storage.objects;

create policy "Anyone can upload lead files to submissions"
on storage.objects for insert
to anon, authenticated
with check (
  bucket_id = 'lead-uploads'
  and name like 'submissions/%'
  and length(name) < 512
);
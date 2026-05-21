-- Private bucket for intake form attachments (photos, plans, PDFs)
insert into storage.buckets (id, name, public)
values ('lead-uploads', 'lead-uploads', false)
on conflict (id) do nothing;

-- Anyone can upload (anonymous intake forms)
create policy "Anyone can upload lead files"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'lead-uploads');

-- No public reads — files only retrievable via signed URLs by staff
create policy "No public reads on lead files"
on storage.objects for select
to anon, authenticated
using (false);
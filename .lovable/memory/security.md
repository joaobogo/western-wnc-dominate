# Security Memory

## Intentional Public Access Patterns

### Tables with `WITH CHECK (true)` on INSERT
- `consultation_requests`: Public leads can submit their contact info without authentication.
- `designer_leads`: Users can save their roof designs and provide contact info.
- `conversion_events`: Anonymous analytics tracking for CTA clicks and form starts.
- `seo_404_log`: Automatic logging of missing pages for SEO monitoring.

### Storage Policies
- `roof-designs`:
    - Public INSERT allowed for anonymous users saving their work.
    - Scoped to `uploads/` and `results/` prefixes.
    - Max filename length 256 characters.
    - No UPDATE or DELETE allowed by public.
    - Public SELECT allowed for viewing designs.

## Accepted Findings
- Linter warning `0024_permissive_rls_policy`: Acknowledged for `conversion_events`, `seo_404_log`, and lead tables as these are required for anonymous visitor interactions.

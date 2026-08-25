# Canonical Host Redirect Guard

## Changes
- Add the required HTTP apex, HTTP www, and HTTPS www redirect rules as the first three active rules in `public/_redirects`.
- Preserve every existing path redirect and rewrite unchanged below them.
- Extend the SEO regression script to parse active redirect rules and fail unless those exact three rules are first and ordered correctly.
- Run the focused SEO regression check and confirm the preview build remains healthy.

## Current host status
- `www.highlandernc.com` and the apex currently resolve to the same Netlify IPs.
- HTTPS www currently returns `301` to the HTTPS apex.
- HTTP apex currently returns `301` to the HTTPS apex.

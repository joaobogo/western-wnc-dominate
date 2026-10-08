# Project Architecture Rules

- Use each approved uploaded blog filename, without `.html`, as that article's canonical slug; this prevents publishing a different URL than the supplied source.
- Preserve replaced public blog URLs with direct one-hop redirects to their canonical slug; this protects previously shared links and search signals.
- Treat `src/data/business.ts` as the canonical business identity; generate public identity metadata from it and route Franklin maps by its full postal address while its external profile catches up.
- Derive blog sitemap lastmod from the recorded substantive revision date, falling back to publication; never stamp build time because it misrepresents page changes.
- Render CertainTeed credential artwork through the shared Premier badge using the supplied asset without color filters or cropping; keep manufacturer product names distinct from Highlander's contractor credential.
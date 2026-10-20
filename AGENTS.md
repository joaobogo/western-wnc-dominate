# Project Architecture Rules

- Keep all form delivery through the shared JobTread mapper and validate its custom-field IDs/options against the live organization before changing mappings; CRM configuration changes can otherwise block every submission.
- Never send synthetic leads to JobTread during verification; use mocked integration tests and read-only live configuration checks to protect the owner's CRM.
- Use each approved uploaded blog filename, without `.html`, as that article's canonical slug; this prevents publishing a different URL than the supplied source.
- When an upload batch contains identical articles under suffixed and unsuffixed filenames, publish the unsuffixed filename once and redirect its duplicate directly; this preserves the supplied URL family without indexing duplicate content.
- Preserve replaced public blog URLs with direct one-hop redirects to their canonical slug; this protects previously shared links and search signals.
- Treat `src/data/business.ts` as the canonical business identity; generate public identity metadata from it and route Franklin maps by its full postal address while its external profile catches up.
- Derive blog sitemap lastmod from the recorded substantive revision date, falling back to publication; never stamp build time because it misrepresents page changes.
- Render CertainTeed credential artwork through the shared Premier badge using the supplied asset without color filters or cropping; keep manufacturer product names distinct from Highlander's contractor credential.
- Match returning JobTread customers only by exact contact phone (+1XXXXXXXXXX), then email; never by name, and keep new customer names plain. Name-only matching merged or suffixed different people.

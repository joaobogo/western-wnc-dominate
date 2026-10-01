# Correct the Recent Blog URLs

## Scope
- Change the three pasted September articles so each blog URL matches the uploaded filename exactly:
  - `/blog/chimney-flashing-repair`
  - `/blog/standing-seam-vs-exposed-fastener`
  - `/blog/half-round-vs-k-style-gutters`
- Preserve each article's content, design, thumbnail, publication date, and metadata.
- Add permanent one-step redirects from the three currently published URLs to the corrected URLs so existing links continue working.
- Update every internal link and generated search file to use only the corrected canonical URLs.
- Verify the corrected pages, redirects, sitemap, structured data, and production SEO checks before publishing.

## Technical details
- Update the shared blog records rather than creating duplicate articles.
- Keep the existing root-level legacy `/chimney-flashing-repair` redirect separate; only the blog URL becomes `/blog/chimney-flashing-repair`.
- Add regression coverage for all three old-to-new redirects.

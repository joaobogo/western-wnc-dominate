# Correct Every Uploaded Blog URL

## Scope
- Audit every article uploaded as an HTML file in the project conversation, not only the three already corrected.
- Make each canonical blog URL match its uploaded filename exactly, without `.html`.
- Correct the six remaining mismatches:
  - `/blog/roof-inspection-after-storm`
  - `/blog/roof-valley-leak`
  - `/blog/skylight-leak-repair`
  - `/blog/hail-damage-roof`
  - `/blog/roof-flashing-leak`
  - `/blog/architectural-shingle-lifespan`
- Preserve the three already-correct URLs:
  - `/blog/chimney-flashing-repair`
  - `/blog/standing-seam-vs-exposed-fastener`
  - `/blog/half-round-vs-k-style-gutters`
- Preserve article content, thumbnails, dates, categories, and metadata.
- Add direct permanent redirects from every replaced public URL to its filename-based canonical URL.
- Update internal article links and regenerate the sitemap, prerender list, blog indexes, and AI-search files.
- Add regression coverage so these mappings cannot drift again.

## Verification
- Confirm all nine uploaded filename-based URLs appear in the sitemap and old URLs do not.
- Verify each corrected page, canonical tag, structured data, and old-to-new redirect.
- Run the production SEO checks before publishing.

## Note
- The repeated `roof-replacement-tax-deductible` screenshots do not correspond to an uploaded or currently published article in this project, so no existing page can be reassigned to that slug during this correction.

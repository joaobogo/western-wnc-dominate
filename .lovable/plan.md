# Complete and repair the legacy 301 map

## Scope
- Preserve the three canonical-host redirects as the first active rules.
- Keep every legacy 301 above all SPA rewrites so edge redirects win.
- Add exact redirects for the five indexed Hibu URLs:
  - `/roof-inspection-services` → `/request-inspection`
  - `/residential-re-roof-specialists` → `/roofing/roof-replacement`
  - `/sylva-nc-showroom` → `/service-areas/sylva-nc`
  - `/sylva-nc-roofers-reroofing-repairs` → `/service-areas/sylva-nc`
  - `/contact-us_em` → `/contact`
- Replace `/contact/*` hub fallback with a town-preserving edge rule that maps `/contact/[service]-service-area/[town]` to `/service-areas/[town]`.
- Replace homepage redirects for `/roof-designer` and `/free-tools` with relevant destinations; retain the existing roof designer as a real page and send `/free-tools` to it.
- Remove redundant marketing-site `<Navigate>` aliases from `App.tsx`; keep only application compatibility redirects that cannot be handled as normal public edge routes.
- Preserve the existing real 404 route and scoped SPA rewrites; do not introduce a global `/* /index.html 200` fallback.

## Regression protection
- Extend the SEO regression check to parse active redirect rules and fail when:
  - any legacy 301 appears after a rewrite,
  - the required missing mappings are absent or incorrect,
  - the contact town placeholder is absent,
  - `/roof-designer` or `/free-tools` points to `/`,
  - a global SPA fallback is present,
  - redundant static public `<Navigate>` aliases remain in the router.
- Run the SEO regression suite and focused redirect assertions.

## Technical notes
- Netlify-style placeholders will use named segments for the contact pattern so the final town slug is preserved at the edge.
- Existing unrelated `301!` rules and the first-three host redirect ordering remain unchanged.

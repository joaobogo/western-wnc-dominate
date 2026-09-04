# Service page template

All service pages share one skeleton, defined by
`src/components/service/ServicePageTemplate.tsx`.

## Canonical order

1. `hero` — H1 (service + region), one subhead, one primary CTA + call link, trust line
2. `quickAnswer` — `AnswerBlock`
3. `whatWeDo` — the problem and our approach
4. `whatsIncluded` — scope, materials, systems, deliverables
5. `costContext` — cost drivers, financing, cost of waiting
6. `process` — steps from first call to final walkthrough
7. `proof` — gallery, reviews, WhoShowsUp, trust blocks
8. `faq` — accordion (feeds FAQPage schema)
9. `coverage` — service-area / internal links (`ServiceInternalLinks`, `RelatedLinks`)
10. `cta` — one closing CTA, always last

`beforeHero` holds breadcrumbs / page context. `afterCta` holds non-content
widgets only (sticky bars).

## Rules

- Sections may be omitted. They may never be reordered — the template owns the order.
- No closing CTA in the middle of a page. Inline mid-page CTA bands are allowed
  inside a slot, but the `cta` slot is the last thing in `<main>`.
- Surface tones alternate automatically between slots; do not hardcode a page
  background that fights it.
- Emergency-intent pages (roof repair, storm damage) put `UrgentActionSteps`,
  `RepairPhotoProof`, `FastLeadForm` at the top of `whatWeDo`/`process`.

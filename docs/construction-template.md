# Construction page template

Built in Phase 2 of John's Construction & Design plan (22 Nov 2026). Phases 3–5 build the remaining construction pages on it.

## Files

| Piece | File |
|---|---|
| Content shape | `src/content/construction/types.ts` |
| Hub content (all words, photos, FAQs) | `src/content/construction/hub.ts` |
| Sections | `src/components/construction-page/` |
| Construction-only reviews | `src/lib/construction-reviews.ts` |
| Hub page (arranges the sections) | `src/pages/ConstructionDivision.tsx` |

## Section order (plan §3.2)

1. `ConstructionHero`:
   - one real photo (eager, `fetchpriority="high"`, largest WebP under 200 KB);
   - the H1 and a one-sentence subhead;
   - "Call (828) 524-7773" first, then "Get My Written Scope", which scrolls to the form;
   - the trust line, read from `business.ts`.
2. `AnswerBlock`: a question H2 and a 40–60-word answer.
3. `WorkGallerySection` with `mobileTwoUp`: real photos, tap to enlarge, town captions.
4. `ServiceCards` (hub) or `IconCards` ("what's included", 4–6 cards).
5. `ProjectSpotlight`: documented projects only.
6. `CostSection`: renders nothing until Luke-approved ranges are filled in. It carries the financing line.
7. `HowItWorks`: exactly 4 steps.
   - Step 2 says "Site visit".
   - It becomes "Free site visit" only when `FIRST_VISIT_FREE` is set to true, after Highlander confirms.
8. `ConstructionReviews`: only reviews whose own text mentions building work, plus the overall rating line. It is never padded with roofing reviews.
9. `FaqAccordion`: 4–6 questions. The same array feeds the `FAQPage` schema.
10. `FinalCtaBand`: "Talk to Highlander about your {service}", the call button and `FastLeadForm`.
11. `RelatedLinks`: 3 links.

## Rules

- **CTAs:** at most two in the body (the hero and the final band), plus the sticky call bar.
- **Length:** about 1,200 visible words per page.
- **Photos:**
  - Real Highlander photos are captioned with their town.
  - Generated design examples set `example: true`. That shows a "Design example" label, and the alt text says "not a Highlander project".
- **Tracking:** call buttons carry `data-gtm-location`:
  - `construction_hero` reports as `hero`;
  - `final_cta` reports as `band`.

  The `call_click` event reads it (see `docs/tracking.md`).

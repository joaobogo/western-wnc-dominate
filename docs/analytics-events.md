# Analytics event reference

All events are pushed to `window.dataLayer` through `src/lib/gtm.ts`. Every event
automatically carries page context: `page_path`, `page_title`, `page_type`,
`town`, `service`.

Use the canonical helpers — do not push raw objects from components.

## Contact intent

| Event | Helper | Key parameters |
| --- | --- | --- |
| `cta_click` | `trackCtaClick` | `cta_location`, `cta_text`, `cta_type`, `destination_url`, `cta_position`, `cta_viewport_pct`, `town` |
| `primary_cta_click` | `trackPrimaryCtaClick` | `page_key`, `intent`, `cta_text`, `destination_url`, `click_location`, `cta_position` (also emits `cta_click`) |
| `phone_click` | delegated listener on `tel:` links | `phone_number`, `click_location`, `town` (also emits `cta_click` with position) |
| `email_click` | delegated listener on `mailto:` links | `click_location` |

### `cta_position` values

Resolved by `resolveCtaPosition()` — an explicit `data-gtm-position` attribute on
the element or any ancestor wins; otherwise it is derived from geometry:

- `above_fold` — CTA sits within the first viewport height
- `mid_page` — between the fold and 80% of document height
- `page_bottom` — in the last 20% of the document (closing CTA)
- `sticky_bar` — fixed-position element or inside `[data-sticky-cta]`
- custom strings such as `gallery_inline_2`, `project_detail_location_cta`

`cta_viewport_pct` (0–100) records how far down the document the CTA sits, so
CRO tests can compare hero vs. closing placements.

## Forms

| Event | Helper | Key parameters |
| --- | --- | --- |
| `form_start` | `trackFormStart` | `form_name`, `form_location` |
| `form_step_complete` | `trackFormStepComplete` | `form_name`, `step_number`, `step_name` |
| `form_submit_success` | `trackFormSuccess` (pushed only after the lead is stored) | `form_name`, `form_id`, `lead_id`, `service_category`, `property_town`, `landing_page`, `service_intent`, `cta_location` |
| `form_submit_error` | `trackFormError` (validation or delivery failure; never typed values) | `form_name`, `form_id`, `error_type` |
| `generate_lead` | `trackGenerateLead`, fired once per `lead_id` right after `form_submit_success` | conversion event for ads |

## Gallery and project proof

| Event | Helper | Key parameters |
| --- | --- | --- |
| `gallery_project_open` | `trackGalleryProjectOpen` | `gallery`, `project_title`, `project_location`, `project_category`, `cta_position` (`gallery_item_N`) |
| `gallery_cta_click` | `trackGalleryCtaClick` | `gallery`, `cta_text`, `destination_url`, `project_title`, `town`, `cta_position` (also emits `cta_click`) |

`gallery` values: `project_gallery`, `project_gallery_spotlight`,
`recent_projects`, `roofing_gallery`, `project_detail`.

## Recovery and engagement

| Event | Helper | Key parameters |
| --- | --- | --- |
| `exit_intent_shown` | `trackExitIntentShown` | `trigger` (`exit` \| `scroll` \| `idle`) |
| `exit_intent_dismissed` | `trackExitIntentDismissed` | `trigger` |
| `exit_intent_conversion` | `trackExitIntentConversion` | `trigger`, `destination_url` |
| `scroll_depth` / `scroll_75` | auto scroll listener | `percent` |
| `town_faq_open` | `trackTownFaqOpen` | `question`, `town` |
| `velux_quote_click` | VeluxWidget | `widget` |
| `chatbot_open`, `chatbot_lead_submit` | chatbot | — |

## Adding tracking to a new component

1. Prefer markup attributes so the delegated listener handles it:
   `data-gtm-cta="request_inspection"`, `data-gtm-location="hero"`,
   `data-gtm-position="above_fold"`, `data-gtm-town="franklin"`.
2. Only call a helper directly when the click is not a link/button navigation.
3. Never fire both a `data-gtm-cta` attribute and a manual `trackCtaClick` on the
   same element — that double-counts the conversion.


## Call events

`phone_click` (with `cta_click` and `gbp_call`) records a tap on a `tel:` link. It is
**intent only**: it does not prove a call connected or was qualified. Do not label it a
completed or qualified call in GA4. A connected or qualified call needs a call-tracking
provider or a validated offline import (not yet configured).

## Privacy of analytics payloads

`page_path` / `page_location` contain the path plus campaign and click-ID parameters only
(`utm_*`, `gclid`, `gbraid`, `wbraid`, `gad_*`, `fbclid`, `msclkid`, `ttclid`, `li_fat_id`).
Every other query parameter is dropped (`safeSearch()` in `src/lib/gtm.ts`, covered by
`src/test/analytics-privacy.test.ts`). No name, email, phone, address or free text is sent.

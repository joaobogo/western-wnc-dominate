# Analytics Event Reference

All events are pushed to `window.dataLayer` by `src/lib/gtm.ts` (GTM container `GTM-W26D39LJ`).
No PII is ever pushed. Never push raw string literals — use `GTM_EVENTS.*`.

## Global page context (attached to EVERY event)

`push()` merges page context into every event:

| Key | Meaning | Example |
| --- | --- | --- |
| `page_type` | `home`, `town`, `county`, `town_service`, `service`, `blog`, `conversion`, `other` | `town_service` |
| `town` | Town slug derived from the URL, or the nearest `data-gtm-town` ancestor | `franklin` |
| `service` | Service slug derived from the URL | `roof-repair` |

Event-level `town` / `service` win when present; page-derived values fill the gaps.

## Events

| Event | When it fires | Dedupe | Payload (beyond page context) |
| --- | --- | --- | --- |
| `virtual_page_view` | SPA route change (not initial load) | per URL | `page_path`, `page_location`, `page_title` |
| `phone_click` | Any `tel:` link click (delegated listener) | none (Teams alert throttled 10 min) | `phone_number`, `link_url`, `click_location`, `page_path`, `page_title` |
| `email_click` | Any `mailto:` link click | none | `link_url`, `click_location`, `page_path`, `page_title` |
| `cta_click` | Every tracked CTA: `[data-gtm-cta]` elements, `tel:` links, and the page primary CTA | none | `cta_location`, `cta_text`, `cta_type` (`request_quote`, `request_inspection`, `phone`, `primary_call`, `primary_form`), `destination_url` |
| `request_quote_click` | CTA with `data-gtm-cta="request_quote"` | none | `click_location`, `destination_url` |
| `request_inspection_click` | CTA with `data-gtm-cta="request_inspection"` | none | `click_location`, `destination_url` |
| `primary_cta_click` | The single page-level primary action (see `page-cta-hierarchy.ts`) | none | `page_key`, `intent` (`call`/`form`), `cta_text`, `destination_url`, `click_location` |
| `form_start` | First focus/input inside any `<form>` | once per `form_id::form_name` per session | `form_name`, `form_id`, `service_category`, `page_path` |
| `form_step_complete` | Visitor advances a multi-step intake form | once per `form_id::step_index` per session | `form_name`, `form_id`, `step_index` (0-based), `step_number`, `step_name`, `total_steps` |
| `form_submit_success` | Lead written successfully | once per `lead_id` | `form_name`, `form_id`, `lead_type`, `service_category`, `property_town`, `lead_id`, `source_context`, `source_town`, `source_page_path` |
| `generate_lead` | Canonical conversion — auto-emitted by `form_submit_success` and `chatbot_lead_submit` | once per `lead_id` | `lead_id`, `lead_source`, `lead_type`, `service_category`, `property_town`, `source_context`, `currency` (`USD`), `value` |
| `form_submit_error` | Submission failed | none | `form_name`, `form_id`, `error_type` |
| `scroll_depth` | 25 / 50 / 75 / 90 % depth reached | once per milestone per route visit | `percent_scrolled`, `seconds_on_page`, `page_path`, `page_title` |
| `scroll_75` | 75 % depth reached (dedicated engaged-reader trigger) | once per route visit | `percent_scrolled: 75`, `seconds_on_page` |
| `page_engagement` | Route unmount / navigation away | once per route visit | `max_scroll_depth`, `seconds_on_page` |
| `exit_intent_shown` | Pointer leaves through the top of the viewport, or tab hidden after 5 s of engagement | once per browsing session (`sessionStorage: hl_exit_intent_shown`) | `exit_trigger` (`pointer_exit_top`, `tab_hidden`), `variant` |
| `town_faq_open` | Town FAQ accordion expanded | once per `town::question` | `town`, `faq_question`, `faq_position` |
| `town_faq_conversion_intent` | Call/form CTA clicked inside a town FAQ | none | `town`, `intent`, `destination_url`, `cta_text` |
| `velux_widget_cta_click` | VELUX partner widget CTA | 800 ms throttle | `widget_variant`, `cta_text`, `destination_url`, `click_location` |
| `chatbot_open` | Chat widget opened | once per session | `page_path`, `page_title` |
| `chatbot_lead_submit` | Chatbot captured a lead | once per `lead_id` | `service_category`, `property_town`, `lead_id` |
| `consent_update` | Consent banner decision | none | `consent_functional`, `consent_analytics`, `consent_marketing` |

## Attribution helpers

- `recordCtaSource()` stores the originating CTA block, town and path in `sessionStorage` for 30 minutes; `form_submit_success` and `generate_lead` credit the conversion back to it.
- `data-gtm-location="hero|sticky_bar|footer|town_faq|..."` on any ancestor sets `click_location` / `cta_location`.
- `data-gtm-town="<slug>"` on any ancestor attributes clicks to a town.

## Conversion tags in GTM

Recommended conversion trigger: `generate_lead` (one per lead, deduped by `lead_id`).
Secondary/micro conversions: `phone_click`, `form_start`, `form_step_complete`, `scroll_75`.

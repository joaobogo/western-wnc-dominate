# Tracking events (GA4 / Google Ads via GTM)

All events go to `window.dataLayer` through `src/lib/gtm.ts`. Pixels (Meta, TikTok) get the call intent separately and are unchanged.

## Calls

Every tap on a `tel:` link anywhere on the site sends **two** events, once per tap (a tap tagged by a button and seen again by the global listener is de-duplicated):

| Event | Parameters | Use |
|---|---|---|
| `phone_click` | `phone_number`, `link_url`, `click_location`, `page_path`, `page_title`, `page_type`, `town`, `urgent_intent` | Existing event. GA4/Ads call conversions already read it, so it is unchanged. |
| `call_click` | `page_path`, `service`, `position`, `click_location` | Construction plan (21 Nov 2026). One flat event to report calls by page, service and button position. |

- **`service`**: the service the page is about, from the URL (`serviceFromPath`):
  - `/construction/additions` → `additions`
  - `/construction` → `construction`
  - `/service-areas/franklin-nc/construction` → `construction`
  - `/roofing/roof-repair` → `roof-repair`
  - `/lp/roofing` → `roofing`
  - the home page → `home`
- **`position`**: where the button sat, from its `data-gtm-location` (`callPosition`). Values are `hero`, `sticky`, `band` (closing/CTA bands), `header`, `footer`, `body`.

The main conversion stays a **phone call of 60 seconds or more** in Google Ads call reporting. `call_click` is the tap; the call length comes from Ads.

## Forms

A successful lead form sends:

| Event | Parameters | Use |
|---|---|---|
| `form_submit` | `service`, `type`, `form_name`, `page_path` | Construction plan. `type` is `construction`, `roofing` or `other`. |
| `form_submit_success` | `form_name`, `form_id`, `lead_type`, `service_category`, `property_town`, `landing_page`, `service_intent`, … | Existing, unchanged. |
| `generate_lead` | `lead_id`, `lead_source`, `value`, … | Existing, unchanged (GA4 lead conversion). |

Both fire once per lead (de-duplicated by lead id).

- **`service`** is the form's `service_intent`, else its `service_category`, else the page's service.
- **Construction form links** carry the service and type, so the short form knows what the lead is about: `/request-inspection?context=<page>&type=construction…&service=<addition|outdoor-living|design>`.

## Dynamic number insertion

None in the page source. The site shows (828) 524-7773 in the HTML, schema and Google Business Profile, so name, address and phone stay consistent. If call tracking numbers are added for ads, swap them with JavaScript for paid visitors only.

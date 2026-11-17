# GTM / Ads setup needed (for Andrew)

Running list, newest first. Nothing here changes the ad URLs.

## Nov 17, 2026 — Phase 2 (landing page v2, `/lp/construction` first)

### 1. Phone-click counts drop by about half. This is a fix, not a loss.
- Until now, **every call-button tap on the landing pages pushed `phone_click` twice**: once from the site-wide `tel:` listener (`click_location: "content"`) and once from the button itself (`click_location: "lp_<page>_<placement>"`).
- The Meta and TikTok pixels received the call intent twice as well.
- After this release each tap pushes **one** `phone_click`, with the button's specific label.
- Expect GA4 `phone_click` and Meta/TikTok call events from the LPs to fall to roughly half. **The real number of calls has not changed.** Annotate GA4 and the ad accounts on the release date.
- If a Google Ads or Meta conversion is built on `phone_click` with `click_location = content` on LP traffic, switch it to the `lp_*` labels below.

### 2. Call-button placements on v2 pages
The `click_location` value is `lp_<key>_<placement>`, e.g. `lp_construction_hero`.

| Placement | Where |
|---|---|
| `header` | slim header call button |
| `hero` | full-width hero call button |
| `hero_form_top` / `final_form_top` | "Fastest way" phone inside each form |
| `proof` | under the project photos |
| `card_addition`, `card_renovation`, `card_outdoor_living` | the "Call about…" buttons on each project card |
| `call_topics` | "What we'll cover on a 10-minute call" |
| `showroom` | Franklin showroom block |
| `final` | closing section |
| `sticky_mobile` / `sticky_desktop` | sticky call bars |
| `footer` | footer phone |
| `success` | phone link in the thank-you panel |

### 3. New: `lp_explore` clicks
- v2 pages link into the main site below the fold, in new tabs.
- Each link carries `data-gtm-cta="lp_explore"` and a `data-gtm-location` value: `header_logo`, `proof_projects`, `cost_context`, `reviews` or `explore_strip`.
- The site-wide listener already sends them as `cta_click` with `cta_type = lp_explore`.
- **Suggested:** a GA4 exploration of `lp_explore` vs calls, to check the links don't pull people away from calling. They sit below the fold by design.

### 4. Form submit label changed on v2 pages
- On v2 pages the submit button reads **"Get My Written Estimate"** (it was "Call Me Back").
- `form_name` (`highlander_landing_page`), `form_id`, `form_submit_success` and `generate_lead` are unchanged.
- Any trigger that matches the button **text** needs updating; triggers on the event names don't.

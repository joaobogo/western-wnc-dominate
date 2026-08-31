# Measurement runbook — Highlander Building Services

Owner: Luke Smith (approvals) · Operator: whoever runs the monthly SEO review.
Canonical host: `https://highlandernc.com` (apex, https). Everything else 301s to it.

Status legend: **[code]** already shipped in this repo · **[manual]** must be done
in an external console by an account owner.

---

## 1. Google Search Console — Domain property

**[manual]** None of the Google accounts currently connected to this workspace has
a `highlandernc.com` property (they hold `cogentlaw.com`, `flowgroupventures.com`,
and five other unrelated domains). A Domain property also requires a DNS TXT
record at the registrar, which cannot be created from the app. Do this from the
Google account that owns the domain:

1. Search Console → **Add property** → **Domain** → `highlandernc.com`.
2. Copy the `google-site-verification=...` TXT value and add it at the DNS host:
   - Type `TXT`, Host `@`, Value `google-site-verification=...`, TTL 1h.
3. Wait for propagation, click **Verify**.
4. **Do not delete** the existing URL-prefix properties (`https://highlandernc.com/`,
   `https://www.highlandernc.com/`, any `http://` variants) until the migration is
   clean — they are the only way to see whether legacy Hibu URLs are still being
   served or crawled. Revisit removal after 90 days of zero www/http impressions.
5. Sitemaps → submit `https://highlandernc.com/sitemap.xml` (323 canonical URLs).
6. Settings → Users → grant the operator account **Full** access.

### URL Inspection checklist (run after P0-1 deploy)

| URL | Expect |
| --- | --- |
| `https://highlandernc.com/` | Page is indexed · User-declared canonical = self · Google-selected canonical = self |
| `https://highlandernc.com/service-areas/highlands-nc` | Page is indexed · self-canonical |
| `https://highlandernc.com/roofing/metal` | Page is indexed · self-canonical |
| One recent blog post, e.g. `https://highlandernc.com/blog/best-roofing-materials-highlands-nc` | Page is indexed · self-canonical |

If a page shows "Duplicate, Google chose a different canonical", check the
`<link rel="canonical">` in the prerendered HTML (`SEOHead.tsx`) and the
`_redirects` host rules before requesting indexing. Use **Request Indexing**
once per URL; the API cannot do this.

---

## 2. Bing Webmaster Tools

1. **[manual]** Sign in at bing.com/webmasters → **Import from Google Search
   Console** (fastest, carries the sitemap over). If import is unavailable, use
   the meta-tag method.
2. **[code]** Meta verification is already wired: set the project env var
   `VITE_BING_SITE_VERIFICATION` to the token Bing gives you, and
   `SEOHead.tsx` emits `<meta name="msvalidate.01" ...>` into the prerendered
   HTML on every route. Redeploy, then click Verify.
3. Submit `https://highlandernc.com/sitemap.xml` under **Sitemaps**.
4. **[code]** IndexNow is live:
   - key file: `public/ae41f9843d73e5c77badf85d990a91e65e0ebeacad1a93b7.txt`
   - client helper: `src/lib/indexnow.ts`
   - server submit: `supabase/functions/indexnow-submit`
   - CI notifier: `scripts/indexnow-notify.mjs`
   Confirm arrivals in Bing WMT → **IndexNow** → submitted URLs list within
   24h of a deploy. If the panel is empty, verify the key file returns 200 at
   `https://highlandernc.com/ae41f9843d73e5c77badf85d990a91e65e0ebeacad1a93b7.txt`.

---

## 3. Local grid rank tracking — monthly

**[manual]** Local Falcon (preferred: true geo-grid) or Semrush Map Rank Tracker.

Keywords (same set for every grid): `roofing company`, `roofer`,
`roof replacement`, `metal roofing`.

| Grid centre | Coordinates | Grid | Radius |
| --- | --- | --- | --- |
| Franklin, NC | 35.1626, -83.3459 (showroom) | 7×7 | 5 mi |
| Highlands, NC | 35.0526, -83.1971 | 5×5 | 4 mi |
| Cashiers, NC | 35.1112, -83.0985 | 5×5 | 4 mi |
| Sylva, NC | 35.3585, -83.1812 (showroom) | 7×7 | 5 mi |

Run on the **1st of each month**, same time of day. Record ARP (average rank
position), ATRP, and SoLV per grid in the tracker workbook. Franklin and Sylva
grids report against their own showroom profile; Highlands and Cashiers report
against Franklin (nearest showroom).

---

## 4. GBP performance — monthly, both profiles

**[manual]** GBP → Performance → export last full month for each profile.

Record: searches (total), calls, direction requests, website clicks, plus the
desktop/mobile split.

- Franklin CID `1442261483869937048`
- Sylva CID `1690022713833215904`

**[code]** Paste these exact UTM-tagged links into each profile so GA4 can
attribute GBP sessions separately from classic organic
(`src/data/business.ts` → `gbpWebsiteUrl`, `gbpBookingUrl`, `gbpReviewUrl`):

| Field | Franklin | Sylva |
| --- | --- | --- |
| Website | `https://highlandernc.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=franklin` | `https://highlandernc.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=sylva` |
| Appointment / quote | `https://highlandernc.com/contact?utm_source=google&utm_medium=organic&utm_campaign=gbp_booking&utm_content=franklin` | `https://highlandernc.com/contact?utm_source=google&utm_medium=organic&utm_campaign=gbp_booking&utm_content=sylva` |

Better: point each profile's Website field at its own location page
(`/locations/franklin-nc`, `/locations/sylva-nc`) with the same UTMs if the
owner prefers a location-specific landing experience — both pages already carry
the showroom `LocalBusiness` schema and a lead form.

GBP counts a website click; GA4 counts a session. They will never match exactly
— compare the trend, not the absolute numbers.

---

## 5. GA4 — conversions and the organic → inspection report

Events already fire through GTM (see `docs/analytics-events.md`). No code change
is required; the following is GA4 UI configuration.

**[manual] Mark as key events** (GA4 → Admin → Events → *Mark as key event*):

| Event | Source | Why |
| --- | --- | --- |
| `form_success` | `trackFormSuccess` — every inspection/contact form | Primary lead conversion |
| `generate_lead` | fired alongside `form_success` | Ads-facing conversion |
| `phone_click` | delegated `tel:` listener | Call intent |

Leave `cta_click`, `exit_intent_*`, and `scroll_depth` unmarked — they are
diagnostic, not conversions. If Google Ads is connected, import
`generate_lead` and `phone_click` only.

**[manual] The report: organic sessions → inspection requests by landing page.**

Explore → **Free form**:

- Dimensions: `Landing page + query string`, `Session default channel group`
- Metrics: `Sessions`, `Key events`, `Session key event rate`
- Rows: Landing page · Columns: none · Filter:
  `Session default channel group` **exactly matches** `Organic Search`
- Secondary filter (optional): `Session source/medium` contains `google` and
  `Session campaign` does **not** contain `gbp` to isolate classic organic from
  map-pack traffic.
- Save as **"Organic → inspection requests by landing page"**, share to the
  reporting collection, and set the default date range to *Last 28 days*.

Cross-check monthly against GSC clicks by page — a landing page with clicks but
zero key events is a conversion problem, not a ranking problem.

---

## 6. Semrush API units

**[manual]** Buy/enable API units at <https://www.semrush.com/mcp-access>, then
connect the Semrush account to this workspace (Connectors → Semrush). Once
connected, backlink profiles, keyword research, and site-audit data can be
pulled directly in-project on the account's subscription limits, and the
90-day authority plan tracker
(`Highlander-Link-Building-Tracker.xlsx`) can be refreshed automatically instead
of by hand.

Without units, only the built-in point-in-time Semrush lookups are available.

---

## Monthly cadence (1st business day)

1. GSC: clicks/impressions by page + query, index coverage delta, any new errors.
2. Bing WMT: index count, IndexNow submissions received.
3. Local Falcon: four grids, four keywords, log ARP/SoLV.
4. GBP: export both profiles' performance.
5. GA4: run the saved organic → inspection report.
6. Log everything in the tracker workbook; flag NAP drift immediately.

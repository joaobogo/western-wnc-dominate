# Lead flow (A4) — read-only map, Nov 17, 2026

## Website forms → Lovable Cloud → JobTread

1. **Form** (one of three components):
   - `landing/LeadForm.tsx`: `/lp/roofing`, `/lp/construction`, `/lp/roofing-construction`, all `?landing=`. Source `highlander_landing_page`, form_id `landing-<key>`.
   - `FastLeadForm.tsx`: `/lp/roof-replacement`, `/lp/roof-repair`, `/lp/storm-damage`, `/roofing/roof-repair`, `/roofing/storm-damage`. Source `fast_lead_form`, form_id `fast-lead-roofing`.
   - `InspectionForm.tsx`: `/roofing/roof-replacement`, `/roofing/metal`, `/roofing/gutters`, `/construction`, `/request-inspection`. Source `inspection_form`, form_name `estimate_request`.
   - Required on all: name, email, phone. Hidden honeypot `website_url` (shared `forms/Honeypot.tsx`). A filled honeypot shows success, stores nothing and fires nothing.
2. **`submitLead`** (`src/lib/leads.ts`):
   - attaches attribution (UTMs, gclid, fbclid, msclkid, referrer, landing URL);
   - **inserts the row into `leads` in Lovable Cloud with `jobtread_sync_status = pending`**;
   - only after the insert succeeds, fires `form_submit_success` → `generate_lead`.
3. **`jobtread-sync`** edge function, invoked fire-and-forget:
   - maps the lead with `mapJobType` (division) and writes the account, contact, location and job to JobTread;
   - sets the status to `success`;
   - sends the office alert email via `_shared/leadAlertEmail.ts`.
4. `teams-notify` is also called fire-and-forget on every lead.

## Fallback (lives in Lovable Cloud, confirmed by John)
- The lead is **always stored in the `leads` table first**, so a JobTread outage never loses it.
- Cron `jobtread-retry-every-10-min` re-sends every lead not yet at `success`.
- Health on Nov 17:
  - Leads in the last 30 days: 47, all `success`, none pending or failed.
  - Newest website lead: Nov 11.
  - Front desk calls are stored separately in `intake_leads` (`/front-desk`).
- Other active crons: `deploy-drift-check-15min`, `site-health-check-15min`, `site-health-daily-digest`, `front-desk-daily-summary`, `seo-weekly-report`.

## JobTread division mapping (read-only, `mapJobType`)
| Lead text matches | Division |
|---|---|
| handyman | Small Projects |
| chimney | Repair |
| skylight | Roofing |
| gutter | Gutters |
| design | Design |
| construction / addition / renovation / remodel / outdoor / exterior | Construction |
| repair / storm / leak / hail | Repair |
| anything else | Roofing |

- `/roofing/gutters` now sends `gutters`, so those leads reach the Gutters division (Nov 17, approved by John).

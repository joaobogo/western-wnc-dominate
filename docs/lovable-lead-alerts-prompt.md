Robert at Highlander tested the website forms and nothing arrived in JobTread. Every lead from every form has to land in JobTread exactly the way Highlander specified in their "Website Sync – JobTread Field Update" (16 Oct 2026). The code in GitHub `main` already implements that spec. I need you to find out why it isn't working live, and make it work.

Work through the steps in order, and report what you find at each step before moving on. Do NOT edit the JobTread mapper, the custom field IDs or the field values in supabase/functions/jobtread-sync/index.ts. If something there looks wrong, show me the exact error and stop.

WHAT MUST REACH JOBTREAD
Every public form calls submitLead() in src/lib/leads.ts, which inserts into the `leads` table and calls the edge function `jobtread-sync`. That covers:
- the homepage "Get in Touch" popup (source homepage_sticky_lead_bar)
- "Get My Written Estimate" at /request-inspection (inspection_form)
- /contact (contact_form)
- the landing pages /lp/roofing, /lp/construction, /lp/roofing-construction
- the ad pages /lp/roof-replacement, /lp/roof-repair, /lp/storm-damage
- the intake, quote and estimator forms

Other entry points:
- /front-desk, the receptionist call sheet: inserts into `intake_leads`, then calls `jobtread-sync` with { intake_lead_id }.
- The chatbot, consultation and designer forms: write to `chatbot_conversations`, `consultation_requests` and `designer_leads`, then call `jobtread-sync`.

`send-to-jobtread` and `jobtread-retry` only forward to `jobtread-sync`. That makes `jobtread-sync` the single place that talks to JobTread.

WHAT EACH LEAD MUST CREATE IN JOBTREAD (exactly one of each)
1. Account
   - Lead Source 22P75KEjYCfa = "Highlander Website"
   - Service Area 22P72GvSrBgk = Franklin / Sylva / Asheville
2. Contact, with the lead's name and these custom fields:
   - Email 22P5uYmYEAkx
   - Phone 22P5uYmnWzne
   - Secondary Phone 22P6KUNyV3jy, when given
   - Communication Preference 22PgE4a3Qn6X = Phone / Text / Email / Mail / Any, blank if not chosen
3. Property (Location)
   - the full street address in `address`, when the form collected one
   - Contact Name 22PPzwDNUYjN
   - Phone Number 22PPzw5sqRSX
4. Job
   - Status 22P5uYmYTED2 = "01 New Lead (Needs Appointment)"
   - Divisions 22PNawhnSXmW = a list, one of Roofing / Gutters / Construction / Repair
   - Job Notes 22PYx7PBhE56 = the intake summary

Retired fields that must never be sent: 22P6NLAkTWjs, 22PPQYu3uBCx, 22PPQYmK3SXB, 22PNm2NKGREB, 22P9zdkEzDpv, 22PNwBiMbUzf, 22PTWFAtwzqx, 22P6KUiJD3EJ.

STEP 1: DIAGNOSE (read-only, change nothing)
1. For the last 7 days, list the rows in `leads`, `intake_leads`, `chatbot_conversations`, `consultation_requests` and `designer_leads`, with: created_at, source, name, jobtread_sync_status, jobtread_error_message, jobtread_retry_count, jobtread_id. Point out Robert's tests from today (sources homepage_sticky_lead_bar and inspection_form).
2. Show the logs for the `jobtread-sync` edge function since Oct 16, including every error with its full message.
3. Secrets:
   - JOBTREAD_API_KEY (or JOBTREAD_GRANT_KEY) must be set.
   - JOBTREAD_ORG_ID must be set. Without it, every lead fails with "Missing JOBTREAD_ORG_ID".
   - JOBTREAD_WEBHOOK_URL must NOT be set. If it is, leads go to that webhook instead of JobTread and skip every fix. Tell me its value's host and don't delete it yet.
4. Confirm that the deployed `jobtread-sync`, `send-to-jobtread` and `jobtread-retry` match the latest GitHub `main`, and whether the migration supabase/migrations/20261018230000_jobtread_progress.sql has been applied.
5. Read-only check of Highlander's live JobTread organization through the Pave API (a query only, nothing created): confirm that each custom field ID above still exists on the right record type, and that these exact option values still exist:
   - Lead Source: "Highlander Website"
   - Service Area: Franklin, Sylva, Asheville
   - Status: "01 New Lead (Needs Appointment)"
   - Divisions: Roofing, Gutters, Construction, Repair
   - Communication Preference: Phone, Text, Email, Mail, Any

   List any ID or option that doesn't match.

STEP 2: FIX
1. Apply the migration 20261018230000_jobtread_progress.sql if it is missing. It only adds a nullable `jobtread_progress jsonb` column to the five tables above. A retry uses it to reuse the account, contact and property it already created instead of making duplicates.
2. Fix any missing secret from Step 1. Ask me for the value; don't invent one.
3. Redeploy `jobtread-sync`, `send-to-jobtread` and `jobtread-retry` from `main`.
4. If Step 1 found a JobTread error or a field/option mismatch, stop and show it to me with the exact text. I'll get the code fixed in GitHub.

STEP 3: TEST WITH ONE REAL LEAD (no fake leads)
1. Re-send ONE of Robert's test leads from today by calling `jobtread-sync` with { lead_id, force: true } as an admin, or with the Resend button on the admin Leads page.
2. Check the result in JobTread (read-only query). It must be exactly 1 account, 1 contact, 1 property and 1 job, with every field from the list above filled in, and no retired field.
3. Show me the row's jobtread_sync_status and jobtread_id afterwards.
4. Then re-send Robert's other test leads the same way, one at a time, checking each.

STEP 4: THE BACKLOG (only after Step 3 is perfect, and only when I say go)
List every lead since Sep 10 that is not synced (jobtread_synced = false), across all five tables. Mark the internal test leads. I'll confirm the list. Then re-run each confirmed lead once with { retry_failed: true, ids: [...] } (admin token required). Report each result.

FINAL REPORT
Give me a short report:
- what was broken
- what you changed
- the JobTread result for each of Robert's test leads, with the IDs created
- anything still failing, with its exact error

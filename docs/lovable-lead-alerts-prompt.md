Robert at Highlander tested the website forms and nobody got alerted. I need every lead from every form to reach Robert and Frank, guaranteed. Work through the steps in order, and report what you find at each step before moving on.

HOW LEADS FLOW TODAY (do not redesign this)
- Every public form calls submitLead() in src/lib/leads.ts. That covers the homepage "Get in Touch" popup (source homepage_sticky_lead_bar), the "Get My Written Estimate" page /request-inspection (inspection_form), /contact (contact_form), the landing pages /lp/roofing, /lp/construction, /lp/roofing-construction (LandingFormContext), and the ad pages /lp/roof-replacement, /lp/roof-repair, /lp/storm-damage (FastLeadForm). Each one inserts into the `leads` table and then calls the edge functions `jobtread-sync` and `teams-notify`.
- The receptionist call sheet at /front-desk (src/intake/save.ts) inserts into `intake_leads` and calls ONLY `jobtread-sync`. It never sends a Teams alert.
- The chatbot, consultation and designer forms write to `chatbot_conversations`, `consultation_requests` and `designer_leads`.
- No email is sent anywhere today.

STEP 1: DIAGNOSE (read-only, change nothing)
1. For the last 7 days, list the rows in `leads`, `intake_leads`, `chatbot_conversations`, `consultation_requests` and `designer_leads`, with: created_at, source, name, jobtread_sync_status, jobtread_error_message, jobtread_retry_count, jobtread_id. Point out Robert's tests from today (sources homepage_sticky_lead_bar and inspection_form).
2. Show today's logs for the edge functions `teams-notify` and `jobtread-sync`, including every error with its full message.
3. Check whether the Microsoft Teams connector is still connected and authorized, and whether the secrets LOVABLE_API_KEY, MICROSOFT_TEAMS_API_KEY and JOBTREAD_API_KEY (plus any other JobTread secrets the function reads) are all set.
4. Confirm that the deployed `jobtread-sync` and `teams-notify` match the latest GitHub `main`, and whether the migration supabase/migrations/20261018230000_jobtread_progress.sql has been applied.

STEP 2: FIX DELIVERY
1. If the Teams connector is disconnected or expired, tell me exactly how to reconnect it.
2. Apply the migration 20261018230000_jobtread_progress.sql if it is missing. It only adds a nullable `jobtread_progress jsonb` column to the five tables above.
3. Redeploy `jobtread-sync` and `teams-notify` from `main`.
4. If jobtread-sync is failing with a JobTread error, show me the exact error message and stop. Do NOT edit the JobTread mapper, the custom field IDs or the field options in supabase/functions/jobtread-sync/index.ts: they were checked against Highlander's live JobTread setup, and a wrong change there blocks every submission.

STEP 3: ADD AN EMAIL ALERT AS A BACKUP THAT CANNOT BE MISSED
Build a new edge function `lead-email-alert` that emails Robert and Frank whenever a new row is inserted into ANY of the five tables (`leads`, `intake_leads`, `chatbot_conversations`, `consultation_requests`, `designer_leads`).
- Trigger it from the database itself (an AFTER INSERT trigger or database webhook on each of the five tables, using pg_net), not from the browser. Then every form, the landing pages and /front-desk are all covered, even if a visitor closes the tab straight after submitting, and even if Teams or JobTread is down.
- Send the email through Lovable's built-in email or the Resend connector. Recipients come from a secret LEAD_ALERT_EMAILS (comma-separated) so they can change without a code change. I will give you the addresses.
- Subject: "New website lead: <name> (<form/source>)". Body: name, phone (as a tel: link), email, town/address, service, message/details, which form and page it came from, the time in Eastern time, and a link to the lead in the admin dashboard.
- The function reads the row with the service role, from the record id only. It must never fail the insert: if sending the email fails, log the error and move on.
- Also make /front-desk post to Teams like the other forms do. teams-notify does not know about `intake_leads` yet: add `intake_lead_id: { table: "intake_leads", label: "front desk call" }` to its record-type map, using the intake columns (first_name, last_name, phone, email, town, job_type, details) for the message. Then have src/intake/save.ts call teams-notify with { intake_lead_id: leadId }, fire-and-forget, right after its jobtread-sync call.
- Do not change the forms, submitLead(), validation, or anything in jobtread-sync.

STEP 4: TEST WITHOUT POLLUTING THE CRM
- Do not create fake leads that go to JobTread.
- Test `lead-email-alert` by calling it directly with the ids of Robert's existing test rows from today, and confirm the emails arrived.
- Re-send the Teams alert for those same row ids by calling `teams-notify` with { lead_id }.
- Then tell me it is ready, and I will have Robert submit one real test from the homepage popup, /request-inspection, one landing page and /front-desk. Afterwards, delete his test jobs in JobTread.

When you're done, give me a short report:
- what was broken
- what you changed
- the status of Robert's test leads
- the exact list of forms and tables now covered by the email alert

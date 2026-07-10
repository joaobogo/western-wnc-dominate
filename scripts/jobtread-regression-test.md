# JobTread Integration Regression Test

**Purpose:** verify every website intake path produces a JobTread job that satisfies Highlander's QuickBooks-safe contract before shipping any change to `supabase/functions/jobtread-sync/index.ts`.

**Do not run these steps until Robert or Highlander explicitly asks for a live test round.** The scrubber added in Prompt 6 blocks the Description regression even if a future edit re-introduces it, but this checklist is the human verification.

## Forms to submit (one lead each)

1. Contact form (short quote)
2. Roofing form
3. Roof repair form
4. Roof replacement form
5. Commercial roofing form
6. Gutter form
7. Gutter guard form
8. Skylight form
9. Construction form (with complete plans → Construction classification)
10. Design services form (no plans → Design Services classification)
11. Outdoor living form
12. Service area landing-page form (Highlands + Franklin)
13. Chatbot lead
14. Urgent roof leak (water actively entering = yes)

Use obviously test-tagged names (e.g. `QA Test - <form> - <date>`) so Robert can bulk-archive after.

## Checks per lead — must all pass

For each JobTread Job created, open the job detail view and verify:

- [ ] **Description** is completely blank (empty string, not "null", not "undefined", no residual intake text).
- [ ] **Job Number** is a JobTread-generated value — website never sets it.
- [ ] **Job Name** is short, human-readable, and follows `[Category] Inquiry - [Town] - [First Name or Initial]`. Urgent roof leaks read `Urgent Roof Leak Lead - [Town] - [Name]`. Chatbot leads read `Chatbot [Category] Lead - [Town] - [Name]`.
- [ ] **Lead Notes** custom field (`22PYx7PBhE56`) contains the `=== Highlander Website Lead ===` block exactly once, in plain text, with no `undefined` / `null` / raw JSON.
- [ ] **Account → Service Area** custom field matches the property town's service area.
- [ ] **Account → Lead Source** is `Website` (or `Website Chatbot` for chatbot leads).
- [ ] **Contact Details** (Name / Email / Phone) populated on new accounts.
- [ ] **Location** address, town, contact name/phone/email populated. Display name is `[Customer Name] - [Town] Property` (or `[Town] Property` when name missing).
- [ ] **Location Sales Notes / Contact Notes / Location Notes / Account Notes** are all blank — the intake summary is NOT duplicated in any of them.

## Database checks

Run in the Cloud SQL console after all test submissions:

```sql
select
  id, source, jobtread_synced, jobtread_sync_status, jobtread_id,
  jobtread_last_attempt_at, jobtread_retry_count, jobtread_error_message
from public.leads
where created_at > now() - interval '2 hours'
order by created_at desc;
```

Expected: `jobtread_synced = true`, `jobtread_sync_status = 'success'`, `jobtread_id` populated, `jobtread_error_message` null, `jobtread_retry_count = 0` on the first attempt for every row.

Also check `chatbot_conversations`, `consultation_requests`, and `designer_leads` with the same query for their respective test rows.

## Pass/fail rule

Any single failed checkbox above blocks the release. Description being non-blank is a **P0** regression — it breaks QuickBooks invoicing and must be fixed before another test round.
# Receptionist Lead Scoring and JobTread Sync

## Goal
Make `https://highlandernc.com/front-desk` a public, unlisted receptionist call sheet that scores every lead live and reliably sends the completed intake, including the score, to JobTread. Keep the queue and saved lead records staff-only.

## Recommended revised scoring weights
Keep the existing five-factor, 100-point model and gates. Publish it as **V1.1**.

### Job type: up to 30 points
- Roof replacement: **30**
- Addition or remodel: **30**
- Roof repair or leak: **22**
- Exterior work: **21**
- Gutters only: **20**
- Storm or insurance claim: **14**
- New home or custom build: **12**
- Inspection, assessment, or unsure: **10**

### Other factors
- Urgency: keep **25 / 22 / 16 / 10 / 5**
- Decision authority: keep the current **20-point** table and renter-without-owner-contact gate
- Location: keep **15** for core, **8** for extended, and gate outside-service-area leads
- Reachability: keep **10 total** from phone, email, preferred contact/time, and live conversation

This weighting promotes replacement, remodel, repair, exterior, and gutter opportunities while reducing new-build and insurance-claim priority. Design-specific long-range timing should remain a separate future scoring track rather than inflating all long-range leads.

## Implementation
1. Update the scoring configuration to the revised values and set `SCORE_VERSION` to `V1.1`. Preserve the current live score, grade bands, call deadlines, gates, and UI behavior.
2. Keep the questions in natural call order: caller, property, authority, requested work, timing, location, contactability, lead source, and office notes. Do not expose scores to customers.
3. Keep `/front-desk` available without sign-in by direct link. Allow anonymous users to insert only; prohibit anonymous reads, updates, deletes, queue access, and individual lead access.
4. Add durable JobTread sync fields to `intake_leads`: status, synced timestamp, JobTread record ID, attempt count, last attempt, next retry, error, and idempotency key.
5. Replace the no-op `send-to-jobtread` function with a real handoff that reuses the established `jobtread-sync` mapping and safeguards instead of maintaining a second mapper.
6. Map receptionist data into the same JobTread customer, location, and job structure as website leads. Preserve the rule that website intake content never writes to JobTread's Description field.
7. Send `Lead Score` as a dedicated JobTread custom field and include score version, grade, factor breakdown, gates, flags, source, receptionist, and call deadline in Lead Notes. Resolve the real custom-field ID by name or configuration; never guess an ID.
8. Extend the retry worker to include `intake_leads`, using idempotency protection and the existing retry schedule. Surface failed or exhausted sync status to authorized staff without losing the saved lead.
9. Make the browser save authoritative first, then trigger CRM sync. A CRM outage must not erase the intake or falsely report that forwarding succeeded.
10. Preserve all existing layout, branding, mobile score display, and protected admin routes.

## Verification
- Unit-test every V1.1 point value, maximum score, grade threshold, gate, and business-hours deadline.
- Test the receptionist-to-JobTread payload and assert that score, grade, version, breakdown, and Lead Notes are mapped correctly.
- Test idempotency, retry scheduling, exhausted retries, and CRM failure handling.
- Test anonymous access: `/front-desk` loads and inserts, while queue and records remain unreadable and unmodifiable.
- Run integration tests with mocked JobTread responses only. **Do not send test data to JobTread or any CRM.**

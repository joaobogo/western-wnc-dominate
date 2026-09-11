# Open receptionist call sheet without sign-in

## Goal
Make `/front-desk` immediately usable by anyone with the private link, without requiring an account or team profile.

## Changes
- Remove the sign-in redirect from the call-sheet page.
- Keep `/front-desk/queue` and individual lead records restricted to authorized administrators so customer details are not public.
- Allow anonymous submission to `intake_leads`, while preserving admin-only read and update access.
- Generate the lead ID before submission so saving succeeds without granting anonymous read access.
- Hide the Queue link for signed-out visitors and preserve it for authorized administrators.
- Keep the page unlisted and excluded from search indexing.

## Validation
- Open `/front-desk` in a signed-out browser and confirm the form appears.
- Confirm a signed-out visitor cannot read `/front-desk/queue` or individual records.
- Confirm the project builds without errors.
- Do not submit test data to JobTread or the CRM.

## Technical details
- Update the route-level access check to distinguish the public call sheet from protected queue routes.
- Add a narrowly scoped database policy and grant for anonymous inserts only; no anonymous `SELECT`, `UPDATE`, or `DELETE`.
- Adjust the insert flow to avoid `.select()` after an anonymous insert.

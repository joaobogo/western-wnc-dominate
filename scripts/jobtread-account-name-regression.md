# JobTread Customer / Account Name — Regression Checks

These checks fail if the JobTread mapping regresses. They exist because
historical bugs concatenated the service, address, or town into the
Customer / Account Name, which polluted QuickBooks and merged unrelated
leads. See `supabase/functions/jobtread-sync/index.ts` builders.

## Automated (must all be true for every synced lead)

1. `account_name !== job_name`
2. `account_name !== location_display_name`
3. `account_name` does NOT contain the property address
4. `account_name` does NOT contain a 5-digit ZIP
5. `account_name` does NOT start with a service category
   (`Roofing|Construction|Repair|Replacement|Home Repairs|Gutters|Skylights`)
6. `account_name` does NOT contain the words `Inquiry` or `Website Lead`
7. `description` field is absent / empty on the Job payload
8. Lead Notes are written to `JT_CF.job.lead_notes` ONLY (not Location Sales Notes)
9. `jobNumber` is not present in the createJob mutation (JobTread auto-generates)

Rules 1–6 are enforced in code by `validateCustomerAccountName()` — a
failure returns `retry_needed` and the lead stays queued locally.
Rule 7 is enforced by `scrubDescription()`.

## Existing-customer protection

- `sendToPaveApi` never issues `updateAccount` / rename mutations.
- Reused accounts are matched by exact name; new Locations + Jobs attach
  under the existing correct Customer.

## Manual smoke test (do NOT run without approval)

Submit 3 test leads (each prefixed `TESTING`) covering:

- Residential single name (e.g. `TESTING Jane Doe`)
- Residential with apostrophe/hyphen (`TESTING Mary O'Neil-Smith`)
- Commercial with company (`TESTING Blue Ridge HOA`)

Verify in JobTread:

- Customer name = person or company only
- Job name = `[Service] - [Town] - [First]`
- Location = property address or `[Town] Property`
- Description = blank
- Lead Notes populated once
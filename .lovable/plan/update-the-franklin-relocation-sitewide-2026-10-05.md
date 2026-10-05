# Update the Franklin relocation sitewide

## Scope
- Change the Franklin showroom address to **40 Depot Street, Franklin, NC 28734** in the central business identity and every public/generated representation.
- Preserve the Sylva showroom, phone numbers, Google profile/review identifiers, review links, design, publishing workflow, and unrelated content.
- Make Franklin maps and directions use the full confirmed postal address rather than the existing profile identifier while Google updates its listing.

## Implementation
1. Update `src/data/business.ts`, including the canonical description, address, address-based directions helper, and Franklin geography only when the exact address is reliably geocoded.
2. Update map and commute behavior so Franklin uses the precise postal address; keep Sylva's current coordinate behavior and ensure optional coordinates are handled safely.
3. Synchronize the static Organization data, geo metadata, MCP identity, `llms.txt`, supporting documentation, and other generated public outputs through their existing generators where available.
4. Strengthen relocation guardrails and update exact-address expectations without weakening existing identity or banned-content tests.
5. Search all source and generated output for the old address, variants, and coordinates; retain them only in explicit stale-address test guardrails or genuine historical records.

## Verification
- Run the relevant identity, targeting, banned-term, showroom, map/route, schema, and metadata tests.
- Run the existing metadata generators and full production build.
- Verify contact, footer, Franklin location, map/directions links, and structured data in the rendered site on desktop and mobile.
- Report the coordinate source used, or explicitly report that coordinates were omitted if reliable verification was unavailable.

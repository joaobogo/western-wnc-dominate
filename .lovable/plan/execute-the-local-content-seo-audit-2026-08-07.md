# Execute the Local & Content SEO Audit

Work through the audit's execution order, running the items that can be built from real project data now, and holding the ones that need owner-supplied facts (pricing, photos, reviews, Google Business Profile hours).

## What gets built now

### 1. Town + service pages for all 19 towns (P1, largest win)
Today only 5 towns have `[service] [town] NC` pages (17 combos live). Extend to every town in the towns data across roof-repair, roof-replacement, roofing, storm-damage, and construction.
- Each page gets a unique 600-900 word body grounded in that town's real county, elevation, rainfall, and weather context already stored in the data file — no name-swapped boilerplate.
- 3 town-specific FAQs per page, plus links to the town landing page, the parent service page, one local blog post, and the consultation page.
- Visual template unchanged.

### 2. Local blog posts for the 11 uncovered towns (P1)
Asheville, Hendersonville, Brevard, Murphy, Hayesville, Sapphire, Lake Toxaway, Otto, Scaly Mountain, Cherokee, and Dillsboro currently have zero local posts. Two posts each (22 total, 1,200-1,600 words), grounded in that town's actual conditions, with the `town` field set, 3 FAQs, and the internal-links block wiring each post to its town page, service page, related post, project example, and consultation page. Brand voice: High Authority, Low Fluff. No 24/7 claims, no GAF, no unsupported warranty claims.

### 3. Decision-stage guides (P2)
Four commercial-investigation pages with no coverage today: metal vs. dimensional shingle for WNC mountain homes; signs a roof needs replacement at elevation; roof lifespan in Western NC by material; what a roof inspection actually covers. 1,200+ words each, comparison tables, FAQPage schema, and links to the matching service page, two town pages, and consultation.

### 4. County hub pages for all 10 counties (P2)
The county route and county data already exist; the content gets built out. Each hub lists its towns with links, county conditions and permitting notes, 3 FAQs, and a CTA. Town pages link up to their county hub, hubs link back down. Added to the sitemap and the footer link map.

### 5. Per-town Service schema pass (P3)
Every town+service route emits Service schema with `serviceType`, `provider` pointing at the sitewide business `@id`, and `areaServed` set to that specific town, plus the town-scoped LocalBusiness and a FAQPage node for its FAQs. Validation pass across all routes afterward.

### 6. Title and description rewrites (P3)
Run last so the new pages are included. Rewrite every title over 60 characters and every description over 160 characters to the pattern `[Primary Service] [Town/Region] | Highlander`, each description carrying service + location + one differentiator and a reason to click.

### 7. Sitemap regeneration
One pass at the end adding every new town+service, guide, and county URL.

## What I am not doing without your input

| Item | Blocked on |
|---|---|
| Cost / pricing guide pages | Your real price ranges — I won't invent numbers |
| Real project + review proof per town | Your photos, project details, and actual reviews |
| Google Business Profile alignment (hours, categories) | Your live GBP hours and category settings |
| Review-generation loop | Depends on the proof data above |

If you want, I can still scaffold the cost pages with clearly labeled `[CONFIRM]` placeholders so the structure and schema go live and you only fill in the numbers.

## Technical notes

- Slugs stay in the lightweight `src/data/service-town-slugs.ts` so route tables don't pull page copy into the initial bundle; long-form copy goes in `src/data/service-town-content.ts`.
- Volume is large (~95 town+service pages, 22 posts, 4 guides, 10 county hubs), so it ships in batches — town+service first, then blogs, then guides and counties, then the schema and metadata passes — with a build check between batches.
- No visual or design changes; every new page uses the existing templates.
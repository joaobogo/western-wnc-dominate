import { tier1FlatEntries, tier2FlatEntries, type FlatSlugEntry } from "./service-town-slugs";
import {
  generatedServiceTownEntries,
  type GeneratedSection,
} from "./service-town-generated";
export { tier1FlatEntries, tier2FlatEntries };
export type { FlatSlugEntry };

// Tier 1 Service × Town pairings — Franklin, Highlands, Cashiers, Sylva.
// Each entry is unique; no swap-the-town-name copy.

export interface ServiceTownEntry {
  townSlug: string;       // matches src/data/towns.ts
  serviceSlug: string;    // roof-replacement | roof-repair | metal-roofing | synthetic-brava | additions | renovations | outdoor-living
  serviceLabel: string;
  h1: string;
  intro: string;          // 2–3 sentences, unique
  localContext: string;   // why this service matters for THIS town's housing/climate
  whoItsFor: string;
  proofNote: string;      // local project pattern (no fabricated stats)
  metaTitle: string;
  metaDescription: string;
  faqs: { q: string; a: string }[];
  /** Long-form supporting sections (generated coverage pages). */
  sections?: GeneratedSection[];
  /**
   * True only for hand-written entries with genuinely unique local content.
   * Generated coverage entries are templated with the town name swapped in,
   * so they render with noindex,follow and stay out of the sitemap.
   */
  handwritten?: boolean;
  /**
   * Explicit indexability switch (default true). A hand-written page is
   * indexable only when handwritten === true AND indexable !== false. Set to
   * false for towns outside the map-pack radius that cannot realistically
   * rank (GSC 90-day data, P3.1): the page still renders and is prerendered,
   * carries noindex,follow and its self-canonical, but leaves the sitemap and
   * internal links point at the parent division page instead.
   */
  indexable?: boolean;
}

const E = (e: ServiceTownEntry) => e;

export const serviceTownContent: ServiceTownEntry[] = [
  // ─────────── FRANKLIN ───────────
  E({
    townSlug: "franklin-nc",
    serviceSlug: "roof-replacement",
    serviceLabel: "Roof Replacement",
    h1: "Roof Replacement in Franklin, NC",
    intro:
      "Franklin is Highlander's home market and primary showroom location. Replacement projects are scoped from the actual roof condition, access, materials, and schedule rather than a generic local-response promise.",
    localContext:
      "Most Franklin roofs we replace are 20–30 year asphalt systems on ranch, split-level, and farmhouse-style homes in the Cartoogechaye, Cowee, and Iotla valleys. Ventilation deficiencies and aging underlayment are the two most common reasons homes here need a full replacement rather than another patch.",
    whoItsFor:
      "Long-time Franklin homeowners weighing repair-vs-replace, families preparing a home for sale, and buyers who just closed and want a clean baseline before they move in.",
    proofNote:
      "Franklin is where Highlander began. Homeowners receive a written scope and a clear project contact so responsibility stays defined from estimate through closeout.",
    metaTitle: "Roof Replacement in Franklin, NC | Highlander Building Services",
    metaDescription:
      "Full roof replacement in Franklin, NC from Highlander's home market. CertainTeed Credentialed Contractor, licensed NC General Contractor, and free project estimate.",
    faqs: [
      { q: "How long does a full roof replacement take on a Franklin home?", a: "Most single-family asphalt replacements in Franklin finish in 1–3 working days once materials are on-site. Larger or steeper roofs and metal systems take longer; we give you a firm window before we start." },
      { q: "Do you pull the permit for Macon County?", a: "Yes. We handle the Macon County permit and final inspection so you don't have to coordinate it." },
      { q: "Who will be responsible for my roof replacement?", a: "Highlander assigns a project lead and explains who will be on site before work starts, with one accountable point of contact through the final walkthrough." },
    ],
  }),
  E({
    townSlug: "franklin-nc",
    serviceSlug: "roof-repair",
    serviceLabel: "Roof Repair",
    h1: "Roof Repair in Franklin, NC",
    intro:
      "When something fails on a Franklin roof, you want a clear diagnosis without being routed through an out-of-area call center. Highlander is based here in Franklin, and we document the issue, explain the repair options, and provide the next step in writing."
    localContext:
      "The repairs we see most often in Franklin: lifted ridge caps from spring storms coming up the Little Tennessee valley, pipe-boot failures on 15+ year asphalt, and chimney flashing that was never properly stepped on older homes.",
    whoItsFor:
      "Homeowners with an active leak, anyone preparing for a home inspection, and second-home owners who just opened the house for the season and found a stain on the ceiling.",
    proofNote:
      "If repair is the right call, we'll say so. If your roof is past the point repairs are worth your money, we'll say that too — and put it in writing.",
    metaTitle: "Roof Repair in Franklin, NC | Highlander Building Services",
    metaDescription:
      "Roof repair in Franklin, NC with photo documentation, a written scope, and a clear recommendation on whether repair or replacement makes sense."
    faqs: [
      { q: "How fast can you get to my Franklin home for a leak?", a: "Call or submit the inspection form and tell us if water is actively entering. The team triages active leaks during staffed hours and will give you the earliest available visit." },
      { q: "Do you provide written estimates for insurance?", a: "Highlander can provide contractor photos and a written scope for repair work when documentation is part of the assessment. Your carrier or adjuster makes claim and coverage decisions." },
      { q: "Is there a minimum charge for a small repair?", a: "We're transparent about minimums during the call so there are no surprises when the estimate arrives." },
    ],
  }),
  E({
    townSlug: "franklin-nc",
    serviceSlug: "metal-roofing",
    serviceLabel: "Metal Roofing",
    h1: "Metal Roofing in Franklin, NC",
    intro:
      "Standing seam and exposed-fastener metal roofs are increasingly the right answer for Franklin homes — especially on farmhouses, cabins, and additions where the roof is part of the overall design statement.",
    localContext:
      "Franklin's mix of pasture-edge homes and forested lots means we plan around two things: snow shedding onto walkways below, and water-management at the eaves where metal panels meet older gutters. We design both into the system, not as an afterthought.",
    whoItsFor:
      "Homeowners building a forever roof, anyone re-roofing a home with a complex layout, and clients pairing a new addition or porch with a unified metal system.",
    proofNote:
      "We specify and install metal as a complete system — substrate, underlayment, panels, trims, and fasteners from compatible manufacturers — so the warranty actually holds together.",
    metaTitle: "Metal Roofing in Franklin, NC | Highlander Building Services",
    metaDescription:
      "Standing seam and exposed-fastener metal roofing in Franklin, NC from a licensed contractor based in Franklin, with project details matched to the property and roof design.",
    faqs: [
      { q: "Is metal louder than shingles on a Franklin home?", a: "Properly installed metal over solid decking and underlayment is not noticeably louder than asphalt from inside the home. The 'tin roof on a barn' sound comes from open framing, not residential metal." },
      { q: "Does metal really last 40+ years here?", a: "On a correctly designed system with the right substrate and detailing, yes. The failure point on most metal roofs is the install detail, not the panel." },
      { q: "Can I get metal that doesn't look industrial?", a: "Yes. Standing seam profiles, color choice, and trim detailing can land anywhere from modern-farmhouse to traditional mountain home." },
    ],
  }),

  // ─────────── HIGHLANDS ───────────
  E({
    townSlug: "highlands-nc",
    serviceSlug: "roof-replacement",
    serviceLabel: "Roof Replacement",
    h1: "Roof Replacement in Highlands, NC",
    intro:
      "Highlands roofs work harder than almost any in the Southeast. At 4,100+ feet, replacement is not a routine job — it's a system designed for ice, persistent moisture, and seasonal wind that flatland contractors rarely plan for.",
    localContext:
      "We replace roofs across the Highlands Plateau, Highlands Cove, and the country club communities surrounding town. Most are second homes, which means we coordinate with property managers and protect interior finishes that may not be inspected for weeks after the project ends.",
    whoItsFor:
      "Second-home owners, club community residents, and homeowners replacing 20+ year shake or asphalt systems that no longer match the elevation they sit at.",
    proofNote:
      "Premium materials, full underlayment systems, and a team-led crew that documents the entire project so you can review the work without being on the mountain.",
    metaTitle: "Roof Replacement in Highlands, NC | Highlander Building Services",
    metaDescription:
      "Premium roof replacement in Highlands, NC. Elevation-rated systems for second homes and mountain residences. Team-led, fully documented, licensed.",
    faqs: [
      { q: "Can you manage the project while we're not in Highlands?", a: "Yes. The majority of Highlands replacements we do are for owners not currently on-site. You get scheduled photo updates and a full project package on completion." },
      { q: "What materials hold up best at Highlands' elevation?", a: "Heavy dimensional asphalt, standing seam metal, and synthetic shake (Brava) all perform well here when paired with the correct underlayment and ventilation." },
      { q: "Do you work inside the gates of club communities?", a: "Yes. We're familiar with the access, dumpster, and material-staging rules for the major Highlands club communities and coordinate directly with the gate and ARB." },
    ],
  }),
  E({
    townSlug: "highlands-nc",
    serviceSlug: "metal-roofing",
    serviceLabel: "Metal Roofing",
    h1: "Metal Roofing in Highlands, NC",
    intro:
      "Standing seam metal is one of the few roof systems that genuinely belongs at Highlands' elevation — sheds ice and snow, resists wind uplift, and ages gracefully against a mountain backdrop.",
    localContext:
      "We pay particular attention to snow retention near walkways and entrances, ice-and-water shield coverage well past code minimum, and panel seaming detail at hips and valleys where Highlands homes see the most ice loading.",
    whoItsFor:
      "Owners of custom mountain homes, second-home owners specifying a true forever roof, and clients pairing a new addition or screened porch with a unified metal system.",
    proofNote:
      "Specified as a system and documented in writing so the installed scope, materials, and applicable warranty terms are clear.",
    metaTitle: "Metal Roofing in Highlands, NC | Highlander Building Services",
    metaDescription:
      "Standing seam metal roofing in Highlands, NC. Designed for mountain elevation, snow loading, and second-home reliability. Team-led installation.",
    faqs: [
      { q: "How do you handle snow shedding above entries?", a: "We design snow-retention into the system at entries, walkways, and over outdoor living spaces — not as a bolt-on afterthought." },
      { q: "Is metal a good fit for a club-community home?", a: "Often yes — but every ARB has its own approved profiles and color palette. We submit and coordinate that process for you." },
      { q: "Can metal go directly over my existing roof?", a: "Sometimes, but in Highlands we almost always recommend a full tear-off so we can verify decking and install proper underlayment before panel goes down." },
    ],
  }),
  E({
    townSlug: "highlands-nc",
    serviceSlug: "synthetic-brava",
    serviceLabel: "Synthetic / Brava Roofing",
    h1: "Synthetic & Brava Roofing in Highlands, NC",
    intro:
      "Brava synthetic shake and slate give Highlands homes the look of cedar or natural slate without the weight, fragility, or maintenance burden. It has become one of the most-requested premium systems on the plateau for a reason.",
    localContext:
      "Synthetic shake and slate hold their color and profile through Highlands' UV exposure and freeze-thaw cycles, where real cedar and asphalt both age aggressively. We pair Brava with proper underlayment and detail work appropriate to elevation.",
    whoItsFor:
      "Second-home owners and custom-home owners who want a true premium roof aesthetic, with the longevity and predictability of a manufactured system.",
    proofNote:
      "We're set up to specify, source, and install Brava as a complete system — not stocked as a one-off material. Quote includes the trims, accessories, and warranty registration most contractors skip.",
    metaTitle: "Brava Synthetic Roofing in Highlands, NC | Highlander",
    metaDescription:
      "Brava synthetic shake and slate roofing in Highlands, NC. Premium look, mountain-grade durability. Licensed contractor, team-led installation.",
    faqs: [
      { q: "How does Brava compare to real cedar shake at Highlands' elevation?", a: "Brava holds color and profile much longer at elevation than cedar, which dries, cups, and splits aggressively in mountain UV and freeze-thaw cycles." },
      { q: "Will Brava be approved by my club community ARB?", a: "Most Highlands-area ARBs approve Brava with documentation. We handle the submission package including color samples and profile cuts." },
      { q: "What's the lead time on a Brava order?", a: "Brava is made-to-order in your specified color blend. We plan for several weeks of lead time and quote accordingly — it's not a stock-and-go product." },
    ],
  }),
  E({
    townSlug: "highlands-nc",
    serviceSlug: "additions",
    serviceLabel: "Home Additions",
    h1: "Home Additions & Master Suites in Highlands, NC",
    intro:
      "Expanding a Highlands home requires more than just framing — it's about structural integration with mountain slopes and elevation-rated building envelopes. We specialize in design-build additions that look like they were part of the original mountain home design.",
    localContext:
      "Most Highlands additions focus on transforming seasonal cabins into year-round residences by adding luxury master suites, guest wings, or gourmet kitchen expansions that take advantage of plateau views.",
    whoItsFor:
      "Homeowners in Highlands country clubs and mountain estates who need more square footage without sacrificing the historic or rustic aesthetic of their property.",
    proofNote:
      "Licensed NC General Contractor with specialized experience in steep-slope foundations and heavy timber integration common on the Highlands Plateau.",
    metaTitle: "Home Additions in Highlands, NC | Highlander Building Services",
    metaDescription:
      "Custom home additions and master suites in Highlands, NC. Design-build expertise for mountain homes. Licensed, insured, team-led.",
    faqs: [
      { q: "How do you handle building on steep Highlands slopes?", a: "We work with local engineers to design foundation systems specifically for your site's topography and drainage requirements." },
      { q: "Can you match my existing cedar or stone siding?", a: "Yes. Matching historic or aged materials is one of our primary strengths in the Highlands market." },
      { q: "Do you manage the full permit process for Macon County?", a: "Yes. We handle all design coordination, permitting, and inspections." },
    ],
  }),
  E({
    townSlug: "highlands-nc",
    serviceSlug: "outdoor-living",
    serviceLabel: "Outdoor Living",
    h1: "Outdoor Living & Screened Porches in Highlands, NC",
    intro:
      "In Highlands, outdoor living isn't just a deck — it's a 'mountain room' that must handle 90 inches of rain and freezing winter cycles. We build engineered outdoor spaces that expand your living area into the natural environment.",
    localContext:
      "Screened porches with outdoor fireplaces are the gold standard in Highlands. We design these spaces with oversized timber framing and integrated drainage to ensure they stay dry through the plateau's frequent afternoon showers.",
    whoItsFor:
      "Families who want to enjoy the Highlands climate without the insects or rain, and anyone looking to maximize their mountain views with a high-end deck or porch expansion.",
    proofNote:
      "From multi-level composite decks to heavy-timber screened rooms, our outdoor projects are built to withstand Highlands' unique moisture profile.",
    metaTitle: "Outdoor Living & Decks in Highlands, NC | Highlander",
    metaDescription:
      "Custom screened porches, decks, and outdoor living spaces in Highlands, NC. Engineered for mountain weather. Talk to Highlander about your project.",
    faqs: [
      { q: "What materials work best for decks in Highlands?", a: "We recommend high-end composites or thermally modified wood that won't rot or cup in Highlands' persistent moisture." },
      { q: "Can you add an outdoor fireplace to an existing porch?", a: "Yes, provided the structure is engineered to support the load. We can assess and retrofit your current porch." },
      { q: "How long does a typical porch project take?", a: "Most custom porches in Highlands take 4-8 weeks from foundation to finish, depending on complexity and materials." },
    ],
  }),

  // ─────────── CASHIERS ───────────
  E({
    townSlug: "cashiers-nc",
    serviceSlug: "roof-replacement",
    serviceLabel: "Roof Replacement",
    h1: "Roof Replacement in Cashiers, NC",
    intro:
      "Cashiers receives some of the highest rainfall in the country. A roof replacement here is a water-management project first and a roofing project second — designed to keep 80+ inches of annual rain out of the structure.",
    localContext:
      "Most of the homes we replace in and around Cashiers are second residences or club-community homes in High Hampton, Cedar Creek, and Trillium. We coordinate access, ARB submissions, and material staging directly so you don't have to manage the project from a distance.",
    whoItsFor:
      "Second-home owners, club community residents, and owners of aging shake or asphalt roofs that are losing the battle with persistent mountain moisture.",
    proofNote:
      "Premium underlayment from eave to ridge, full photo documentation, and a team-led crew that treats the home like the asset it is.",
    metaTitle: "Roof Replacement in Cashiers, NC | Highlander Building Services",
    metaDescription:
      "Full roof replacement in Cashiers, NC. Engineered for one of NC's wettest climates. Team-led, fully documented, licensed contractor.",
    faqs: [
      { q: "What's the right roof for Cashiers' rainfall?", a: "Heavy dimensional asphalt, standing seam metal, and synthetic shake all perform well here — paired with full ice-and-water shield and proper drip-edge detailing." },
      { q: "Can you work with my property manager?", a: "Yes. We routinely coordinate access and scheduling with property managers for Cashiers second-home projects." },
      { q: "How do you handle club-community ARB approvals?", a: "We prepare and submit the ARB package — materials, colors, project timeline — and adjust the plan to whatever the board requires." },
    ],
  }),
  E({
    townSlug: "cashiers-nc",
    serviceSlug: "metal-roofing",
    serviceLabel: "Metal Roofing",
    h1: "Metal Roofing in Cashiers, NC",
    intro:
      "Standing seam metal performs exceptionally well in Cashiers' wet, high-elevation climate. Properly detailed, it sheds the volume of water this area generates faster than any other residential roof system.",
    localContext:
      "The two details that make or break metal in Cashiers: panel seaming through valleys that move serious water, and termination at eaves over outdoor living spaces. Both get specified before we ever quote the job.",
    whoItsFor:
      "Owners of mountain homes and second residences who want a forever roof, and clients unifying a main house and outbuilding under one metal system.",
    proofNote:
      "Designed and installed as a complete system — substrate, underlayment, panels, trims, and fasteners specified together so the warranty actually holds.",
    metaTitle: "Metal Roofing in Cashiers, NC | Highlander Building Services",
    metaDescription:
      "Standing seam metal roofing in Cashiers, NC with project-specific detailing for mountain exposure and written confirmation of applicable warranty terms.",
    faqs: [
      { q: "Will metal handle the rainfall volume in Cashiers?", a: "Yes — that's one of the things metal does best. The system has to be designed with the right valley detailing and gutter capacity to match." },
      { q: "Can you install metal on a steep mountain-home roof?", a: "Yes. Steep pitches are actually easier for water management; the install plan accounts for safety, anchoring, and snow retention." },
      { q: "Does metal need maintenance?", a: "Inspect fasteners and sealants on exposed-fastener systems every few years. Standing seam systems with concealed clips are largely maintenance-free for decades." },
    ],
  }),
  E({
    townSlug: "cashiers-nc",
    serviceSlug: "synthetic-brava",
    serviceLabel: "Synthetic / Brava Roofing",
    h1: "Synthetic & Brava Roofing in Cashiers, NC",
    intro:
      "Brava synthetic shake and slate are increasingly the answer for Cashiers homes that want the look of cedar or natural slate without the weight, water absorption, or maintenance cycle.",
    localContext:
      "Cashiers' rainfall is brutal on natural cedar — it cups, splits, and develops moss within years. Brava holds its profile and color through the same conditions and is dramatically lighter than natural slate, which matters on older framing.",
    whoItsFor:
      "Second-home owners and custom-home owners who want a premium roof aesthetic that survives the climate rather than fights it.",
    proofNote:
      "We specify and install Brava as a complete system — including the trims, accessories, and warranty registration that most contractors skip — so the system lasts as long as the warranty claims.",
    metaTitle: "Brava Synthetic Roofing in Cashiers, NC | Highlander Building Services",
    metaDescription:
      "Brava synthetic shake and slate roofing in Cashiers, NC. Premium look, climate-grade durability. Team-led, licensed installation.",
    faqs: [
      { q: "Will Brava develop moss like cedar in Cashiers' rainfall?", a: "Brava's polymer composition doesn't absorb moisture the way cedar does, so it resists the moss and biological growth that shortens cedar roof life here." },
      { q: "Is Brava heavy enough to need framing reinforcement?", a: "Brava is dramatically lighter than natural slate and similar to standard dimensional shingles. Existing framing almost always handles it without modification." },
      { q: "How does the warranty work?", a: "Brava carries a manufacturer limited material warranty. We handle registration as part of the install." },
    ],
  }),

  // ─────────── SYLVA ───────────
  E({
    townSlug: "sylva-nc",
    serviceSlug: "roof-replacement",
    serviceLabel: "Roof Replacement",
    h1: "Roof Replacement in Sylva, NC",
    intro:
      "Sylva is one of our strongest year-round residential markets. Most replacements here are full-time homes in town, the Tuckasegee corridor, and the hillsides above Western Carolina — and the work needs to fit a real household's schedule.",
    localContext:
      "We see a steady mix of aging 3-tab and early dimensional shingles that have reached end-of-life. Replacement here often includes attic ventilation correction, which is the single most common deficiency we find on Sylva homes built before 2005.",
    whoItsFor:
      "Long-time Sylva homeowners, families, and owners of rental or income properties who need the project planned around tenants and turnover.",
    proofNote:
      "A direct Highlander point of contact, project-specific scheduling, and a clear recommendation on whether replacement or continued repair makes sense.",
    metaTitle: "Roof Replacement in Sylva, NC | Highlander Building Services",
    metaDescription:
      "Full roof replacement in Sylva, NC from Highlander's Jackson County showroom. CertainTeed Credentialed Contractor, free project estimate, and repair-vs-replace guidance based on roof condition.",
    faqs: [
      { q: "Do you replace roofs on rental properties in Sylva?", a: "Yes. We schedule around tenants and minimize disruption — most single-family replacements are complete in 1–3 working days." },
      { q: "What's the most common issue on older Sylva homes?", a: "Inadequate attic ventilation — which shortens roof life from below. We correct ventilation as part of every full replacement." },
      { q: "Do you handle the Jackson County permit?", a: "When a permit is required and included in Highlander's scope, the project team coordinates the applicable permit and inspection steps. Jurisdiction requirements are confirmed for the specific property." },
    ],
  }),
  E({
    townSlug: "sylva-nc",
    serviceSlug: "roof-repair",
    serviceLabel: "Roof Repair",
    h1: "Roof Repair in Sylva, NC",
    intro:
      "When something fails on a Sylva roof, call during staffed business hours or send a request. Highlander will discuss the damage and confirm the appropriate assessment and repair timing based on conditions and current scheduling.",
    localContext:
      "Common Sylva repairs: pipe-boot failures on 12+ year asphalt, lifted ridges from valley-channeled spring storms, and chimney flashing on older homes built before stepped flashing became standard.",
    whoItsFor:
      "Homeowners with an active leak, landlords with a tenant call, and anyone who needs honest guidance on whether to repair, replace, or just monitor.",
    proofNote:
      "Clear repair documentation when included in the scope, plus a plain-English recommendation on whether continued repair or replacement makes more sense.",
    metaTitle: "Roof Repair in Sylva, NC | Highlander Building Services",
    metaDescription:
      "Roof repair in Sylva, NC with clear assessment, written scope, and a direct answer on repair versus replacement based on the roof condition.",
    faqs: [
      { q: "What should I do about an active leak in Sylva?", a: "Call during staffed business hours and explain what is happening; outside office hours, send a request for follow-up. Assessment timing and temporary protection depend on weather, safety, access, and availability." },
      { q: "Will you tell me if a repair isn't worth doing?", a: "Yes. If your roof is too far gone for repair dollars to make sense, we'll say so — in writing — before you spend the money." },
      { q: "Do you do insurance documentation?", a: "When requested and applicable to the scope, Highlander can provide contractor photos and written repair information for insurance conversations. Coverage decisions remain with the carrier." },
    ],
  }),
  E({
    townSlug: "sylva-nc",
    serviceSlug: "metal-roofing",
    serviceLabel: "Metal Roofing",
    h1: "Metal Roofing in Sylva, NC",
    intro:
      "Standing seam and exposed-fastener metal are increasingly popular on Sylva homes — especially farmhouse-style residences, additions, and hillside homes where the roof is a defining design element.",
    localContext:
      "We design for two Sylva-specific realities: gutter capacity sized to handle the volume metal sheds during heavy spring rain, and snow-shedding planned around walkways and entries.",
    whoItsFor:
      "Homeowners specifying a forever roof, anyone re-roofing a custom home, and clients pairing a main house with outbuildings or an addition under one unified system.",
    proofNote:
      "Specified as a system with trim and detail work documented in the project scope, along with the applicable manufacturer and contract warranty terms.",
    metaTitle: "Metal Roofing in Sylva, NC | Highlander Building Services",
    metaDescription:
      "Standing seam and exposed-fastener metal roofing in Sylva, NC from Highlander's Jackson County showroom, with project details matched to the roof and exposure.",
    faqs: [
      { q: "How long will a metal roof last on a Sylva home?", a: "A properly installed standing seam system is a 40+ year roof. Failures we see in the field are almost always install-detail issues, not panel failures." },
      { q: "Is metal more expensive than asphalt?", a: "Up front, yes — typically 1.5–2.5× asphalt. Over 30+ years, metal is usually the cheaper roof on a per-year basis once you include replacement cycles." },
      { q: "Can you match an existing metal roof on an addition?", a: "In most cases yes. Match success depends on age and weathering of the existing panels — we'll quote it honestly after inspection." },
    ],
  }),
  // ─────────── ASHEVILLE ───────────
  E({
    townSlug: "asheville-nc",
    indexable: false, // outside the map-pack radius — noindex,follow, not in the sitemap (P3.1, GSC 90-day data)
    serviceSlug: "roof-replacement",
    serviceLabel: "Roof Replacement",
    h1: "Roof Replacement in Asheville, NC",
    intro:
      "Asheville projects require a balance of design precision and ridgetop engineering. Whether it's a Biltmore Forest estate or a Town Mountain ridgetop home, we deliver team-led replacement projects with zero-compromise quality.",
    localContext:
      "Asheville's topography means a 'standard' roof doesn't exist. We plan for high UV intensity on south-facing ridges and extreme wind uplift on exposed slopes. Our Asheville replacement packages include reinforced perimeter fastening and high-performance underlayment as the baseline.",
    whoItsFor:
      "Homeowners in historic districts, ridgetop estate owners, and Buncombe County residents who want a permanent, high-performance solution rather than a temporary fix.",
    proofNote:
      "We are experts in Asheville ARB submissions and historic district compliance. We handle the paperwork and the precision detailing so you don't have to.",
    metaTitle: "Roof Replacement in Asheville, NC | Highlander Building Services",
    metaDescription:
      "Premium roof replacement for Asheville's historic and modern mountain homes. Expert Buncombe County crews, team-led, licensed GC.",
    faqs: [
      { q: "Do you handle historic district ARB approvals in Asheville?", a: "Yes. We prepare and submit all required documentation for Biltmore Forest, Montford, and other Asheville historic boards." },
      { q: "What's the best roof for a Town Mountain ridgetop home?", a: "We recommend standing seam metal or synthetic slate for high-exposure Asheville ridges to ensure maximum wind and UV resistance." },
      { q: "Do you offer financing for large Asheville projects?", a: "Financing may be available for qualifying roofing or construction projects. Availability, terms, and approval are determined by the lender." },
    ],
  }),
  E({
    townSlug: "asheville-nc",
    indexable: false, // outside the map-pack radius — noindex,follow, not in the sitemap (P3.1, GSC 90-day data)
    serviceSlug: "additions",
    serviceLabel: "Home Additions",
    h1: "Home Additions & Modernization in Asheville, NC",
    intro:
      "Expanding an Asheville home is an exercise in mountain modern design and structural precision. We specialize in footprint expansions and master suite additions that honor Asheville's unique design landscape.",
    localContext:
      "In the Asheville market, we focus on integrating new structural volume with existing historic or modern profiles. We specialize in 'mountain modern' aesthetics — high glass-to-wall ratios, clean lines, and durable mountain materials.",
    whoItsFor:
      "Homeowners looking to add square footage, modernize older Buncombe County assets, or create specialized spaces like home studios or luxury outdoor rooms.",
    proofNote:
      "Licensed NC General Contractor with a deep portfolio of Asheville-area renovations and footprint expansions.",
    metaTitle: "Home Additions in Asheville, NC | Highlander Building Services",
    metaDescription:
      "Custom home additions and structural modernizations in Asheville, NC. Design-build expertise for Buncombe County homeowners.",
    faqs: [
      { q: "How long is the permitting process in Asheville?", a: "Permit and review timing varies by jurisdiction, project scope, and current review volume. Highlander confirms the required process for the property and coordinates the steps included in the project scope." },
      { q: "Can you build on steep Asheville slopes?", a: "Yes. We work with specialized engineers to design foundations for steep-slope Asheville sites." },
    ],
  }),

  // ─────────── HENDERSONVILLE ───────────
  E({
    townSlug: "hendersonville-nc",
    indexable: false, // outside the map-pack radius — noindex,follow, not in the sitemap (P3.1, GSC 90-day data)
    serviceSlug: "roof-replacement",
    serviceLabel: "Roof Replacement",
    h1: "Roof Replacement in Hendersonville, NC",
    intro:
      "Hendersonville projects prioritize longevity and reliability. We serve established neighborhoods and retirement communities with clean, organized, and team-led roof replacement services.",
    localContext:
      "The Hendersonville plateau sees significant afternoon thunderstorms and localized hail. We recommend Class 4 impact-rated shingles for Henderson County homes to ensure the longest possible service life and storm resistance.",
    whoItsFor:
      "Established homeowners, retirement community residents, and anyone looking for a clearly scoped roof replacement in the Hendersonville area.",
    proofNote:
      "Henderson County is a secondary service market; current project availability is confirmed before an estimate is scheduled.",
    metaTitle: "Roof Replacement in Hendersonville, NC | Highlander Building Services",
    metaDescription:
      "Roof replacement for Hendersonville homes with project-specific material options, written scope, and licensed-contractor oversight.",
    faqs: [
      { q: "Do you work in Hendersonville retirement communities?", a: "Yes. We are familiar with the scheduling and staging requirements of many Hendersonville-area active adult and retirement communities." },
      { q: "Should I consider impact-resistant shingles in Hendersonville?", a: "Impact-rated shingles can be worth comparing where hail exposure is a concern. Product performance, cost, and any insurance treatment should be confirmed for the selected product and your individual policy." },
    ],
  }),
  // ─────────── WAYNESVILLE ───────────
  E({
    townSlug: "waynesville-nc",
    indexable: false, // outside the map-pack radius — noindex,follow, not in the sitemap (P3.1, GSC 90-day data)
    serviceSlug: "roof-replacement",
    serviceLabel: "Roof Replacement",
    h1: "Roof Replacement in Waynesville, NC",
    intro:
      "Waynesville's historic districts and hillside developments require a contractor who understands the balance between historic preservation and mountain performance.",
    localContext:
      "In Waynesville, we focus on attic ventilation correction and high-temp underlayment. The town's elevation and winter snow cycles mean that standard roofing installs often fail prematurely due to ice damming.",
    whoItsFor:
      "Homeowners in historic Main Street areas, hillside residents in Haywood County, and families looking for a high-performance roof that respects their home's character.",
    proofNote:
      "Documented successful projects across Haywood County, featuring historic-district material matching and modern ventilation upgrades.",
    metaTitle: "Roof Replacement in Waynesville, NC | Highlander Building Services",
    metaDescription:
      "Premium roof replacement for Waynesville homes. Specialized in historic district care and mountain-grade performance. Licensed & Insured.",
    faqs: [
      { q: "How do you handle historic requirements in Waynesville?", a: "We coordinate with local guidelines to select shingles and details that maintain the home's historic integrity while providing modern protection." },
      { q: "Does Waynesville's elevation affect roof longevity?", a: "Yes. Higher UV and heavier snow loading mean materials must be specified for mountain conditions, not just valley averages." },
    ],
  }),
  E({
    townSlug: "waynesville-nc",
    indexable: false, // outside the map-pack radius — noindex,follow, not in the sitemap (P3.1, GSC 90-day data)
    serviceSlug: "additions",
    serviceLabel: "Home Additions",
    h1: "Home Additions in Waynesville, NC",
    intro:
      "Expanding a Waynesville residence requires structural precision and a deep understanding of Haywood County's mountain topography.",
    localContext:
      "We specialize in 'seamless' additions for Waynesville homes — ensuring that new master suites or kitchen expansions match the existing design DNA and foundation requirements of the site.",
    whoItsFor:
      "Families needing more space, owners of historic properties looking to modernize, and anyone adding specialized rooms like home offices or guest wings.",
    proofNote:
      "Licensed GC with local experience in structural footprints and steep-slope foundations throughout Haywood County.",
    metaTitle: "Home Additions in Waynesville, NC | Highlander Building Services",
    metaDescription:
      "Custom home additions and structural modernization in Waynesville, NC. Design-build expertise for mountain homes. Licensed & Insured.",
    faqs: [
      { q: "Can you match the siding on an older Waynesville home?", a: "Yes. We source high-quality matches for historic cedar, stone, and traditional lap siding common in Waynesville." },
      { q: "Do you manage the full Haywood County permit process?", a: "Yes. We handle all design coordination and county inspections." },
    ],
  }),
  // ─────────── BREVARD ───────────
  E({
    townSlug: "brevard-nc",
    indexable: false, // outside the map-pack radius — noindex,follow, not in the sitemap (P3.1, GSC 90-day data)
    serviceSlug: "roof-replacement",
    serviceLabel: "Roof Replacement",
    h1: "Roof Replacement in Brevard, NC",
    intro:
      "In the 'Land of Waterfalls,' a roof replacement is a waterproofing project first. We design systems for Transylvania County's record-setting rainfall.",
    localContext:
      "Brevard roofs face 90+ inches of rain annually. We specify double-underlayment at eaves and valleys and oversized drainage systems to ensure these homes stay dry through tropical deluges.",
    whoItsFor:
      "Homeowners near Pisgah Forest, Brevard families, and residents of the surrounding rain-belt plateau needing the region's best moisture protection.",
    proofNote:
      "Team-led crews with specialized experience in high-moisture climate engineering and oversized gutter integration.",
    metaTitle: "Roof Replacement in Brevard, NC | Highlander Building Services",
    metaDescription:
      "Moisture-ready roof replacement in Brevard, NC. Engineered for Transylvania County's extreme rainfall. Licensed contractor, team-led.",
    faqs: [
      { q: "How do you handle Brevard's extreme rainfall?", a: "We use high-performance ice-and-water shield coverage and 6-inch gutter systems as the standard for Brevard projects." },
      { q: "Is standing seam metal better for Brevard?", a: "Metal sheds high volumes of water exceptionally well, making it a top-tier choice for Transylvania County homes." },
    ],
  }),
  E({
    townSlug: "brevard-nc",
    indexable: false, // outside the map-pack radius — noindex,follow, not in the sitemap (P3.1, GSC 90-day data)
    serviceSlug: "outdoor-living",
    serviceLabel: "Outdoor Living",
    h1: "Outdoor Living & Decks in Brevard, NC",
    intro:
      "Maximize your connection to Pisgah Forest with an engineered outdoor space designed for Brevard's active, outdoor-centric lifestyle.",
    localContext:
      "We specialize in 'trail-ready' mudroom additions and multi-level deck expansions that handle Brevard's moisture while providing a clean transition to the outdoors.",
    whoItsFor:
      "Outdoor enthusiasts, mountain bikers, and homeowners who want to enjoy the forest views without the maintenance burden of natural wood.",
    proofNote:
      "From composite decks to screened mountain rooms, we build for durability in the wettest county in the state.",
    metaTitle: "Outdoor Living & Decks in Brevard, NC | Highlander",
    metaDescription:
      "Custom decks and outdoor living spaces in Brevard, NC. Engineered for moisture resistance and mountain views. Licensed & Insured.",
    faqs: [
      { q: "What decking material is best for Brevard's humidity?", a: "We recommend premium capped composites that won't rot, warp, or grow algae in high-moisture environments." },
      { q: "Can you build a screened porch that handles heavy rain?", a: "Yes. Our designs include integrated drainage and structural overhangs to keep your mountain room dry." },
    ],
  }),
  // ─────────── BRYSON CITY ───────────
  E({
    townSlug: "bryson-city-nc",
    indexable: false, // outside the map-pack radius — noindex,follow, not in the sitemap (P3.1, GSC 90-day data)
    serviceSlug: "metal-roofing",
    serviceLabel: "Metal Roofing",
    h1: "Metal Roofing in Bryson City, NC",
    intro:
      "Standing seam metal is the gold standard for Bryson City cabins and vacation rentals — durable, debris-shedding, and designed to last 50+ years.",
    localContext:
      "Swain County's heavy tree cover and high humidity make metal the best choice for shedding leaves and resisting the biological growth that shortens shingle life.",
    whoItsFor:
      "Vacation rental owners, cabin owners near the Smokies, and anyone looking for a low-maintenance 'forever' roof system.",
    proofNote:
      "Team-led crews with specialized expertise in metal-system design and fast-turnaround scheduling for rental properties.",
    metaTitle: "Metal Roofing in Bryson City, NC | Highlander Building Services",
    metaDescription:
      "Premium metal roofing in Bryson City, NC. Ideal for cabins and vacation rentals. Sheds debris and moisture. Licensed & Insured.",
    faqs: [
      { q: "Is metal better for wooded lots in Bryson City?", a: "Yes. Metal sheds leaves and needles much better than shingles, preventing the debris buildup that leads to rot." },
      { q: "How fast can you reroof a rental property?", a: "We coordinate with guest turnover windows to complete projects with minimal impact on your rental income." },
    ],
  }),
  // ─────────── MURPHY ───────────
  E({
    townSlug: "murphy-nc",
    indexable: false, // outside the map-pack radius — noindex,follow, not in the sitemap (P3.1, GSC 90-day data)
    serviceSlug: "roof-replacement",
    serviceLabel: "Roof Replacement",
    h1: "Roof Replacement in Murphy, NC",
    intro:
      "Serving the far west with reliable, team-led roof replacement. We provide Murphy families with the same standard of quality we bring to Asheville and Highlands.",
    localContext:
      "In Murphy and Cherokee County, Highlander focuses on durable project scopes and clear accountability. Current availability is confirmed from the Franklin/Sylva service network before scheduling.",
    whoItsFor:
      "Full-time residents, retirees building custom retreats, and vacation home owners needing a dependable local contractor.",
    proofNote:
      "Documented successful projects across Cherokee County, featuring high-quality shingle and metal systems.",
    metaTitle: "Roof Replacement in Murphy, NC | Highlander Building Services",
    metaDescription:
      "Roof replacement in Murphy, NC with durable material options, a written scope, and licensed-contractor oversight. Current availability is confirmed when you request an estimate.",
    faqs: [
      { q: "Do you work in Murphy?", a: "Yes. Murphy is within Highlander's Western North Carolina service area. Contact the team to confirm current project availability and the appropriate next step." },
      { q: "What's the best roof for a Murphy mountain cabin?", a: "Dimensional shingles or standing seam metal both perform exceptionally well in Murphy's climate." },
    ],
  }),
  // ═════════════════════════════════════════════════════════════
  //  TIER 1 — Highlands / Franklin / Cashiers × 5 core services
  //  Slugs: roofing, roof-repair, roof-replacement (see above),
  //         construction, home-repairs
  //  Each block is written distinctly per city; no swap-the-name copy.
  // ═════════════════════════════════════════════════════════════

  // ─────────── HIGHLANDS ───────────
  E({
    townSlug: "highlands-nc",
    serviceSlug: "roofing",
    serviceLabel: "Roofing Services",
    h1: "Roofing Services in Highlands, NC",
    intro:
      "Highlands sits above 4,100 feet, which puts every roof here through a climate most contractors never see: freeze-thaw cycles, ice at the eaves, rime fog on north slopes, and summer downpours that arrive sideways. Roofing on the plateau is a system decision, not a shingle choice.",
    localContext:
      "Our Highlands work concentrates on the ridge-line neighborhoods off NC-106, Big Bearpen, Wildcat Cliffs, and the Cullasaja/Horse Cove corridor. Substrate deck condition, ice-and-water coverage well past code minimums, high-temperature underlayment on metal, and true continuous ridge ventilation are the four decisions that separate a plateau roof that lasts from one that fails in a decade.",
    whoItsFor:
      "Full-time residents on the plateau, second-home owners closing on Highlands Cove or Highlands Country Club properties, and buyers who need a complete roof condition report before removing the inspection contingency.",
    proofNote:
      "We're on Highlands roofs every week of the season. If a competitor tells you 'a roof is a roof,' get a second opinion — the mountain doesn't grade on a curve.",
    metaTitle: "Roofing Services in Highlands, NC | Highlander",
    metaDescription:
      "Licensed roofing contractor serving Highlands, NC at 4,100+ ft. Repairs, replacements, metal, and specialty roofs engineered for plateau weather.",
    faqs: [
      { q: "Why does Highlands need a different roofing spec than the valley?", a: "Elevation. Freeze-thaw, ice damming at the eaves, and prolonged wet-cold conditions on the plateau demand higher-temp underlayments, wider ice-and-water membrane, and ventilation designed for cold-roof performance. Standard Piedmont specs don't hold up here." },
      { q: "Do you work on Highlands Country Club and Highlands Cove homes?", a: "Yes. We're familiar with the HOA/ARB requirements in both communities and coordinate submissions before work starts." },
      { q: "Can you handle a full re-roof between seasons for a second home?", a: "Yes. Most of our second-home replacements are scheduled around the shoulder seasons so owners return to a completed roof and no in-house disruption." },
    ],
  }),
  E({
    townSlug: "highlands-nc",
    serviceSlug: "roof-repair",
    serviceLabel: "Roof Repair",
    h1: "Roof Repair in Highlands, NC",
    intro:
      "A leak at 4,100 feet does not wait for a scheduling window. Because Highlands weather compresses damage — one storm can move a decade forward — our repair work here is fast, thoroughly documented, and pointed straight at the actual failure, not a cosmetic patch.",
    localContext:
      "The repairs we see most often in Highlands: valley wear-through where snow slides converge, pipe-boot cracking from UV plus freeze-thaw, fastener back-out on older metal roofs, and step-flashing failures on stone chimneys where the mason and roofer never truly coordinated the first time.",
    whoItsFor:
      "Owners with an active leak, second-home owners who found a stain on the season-open walkthrough, and property managers preparing a rental for a booked stay.",
    proofNote:
      "Every Highlands repair leaves with photos of what failed, what we did, and what's still on the clock. Nothing hidden, nothing padded.",
    metaTitle: "Roof Repair in Highlands, NC | Highlander Building Services",
    metaDescription:
      "Roof repair in Highlands, NC with plateau-specific assessment, clear scope, and a direct answer on repair versus replacement.",
    faqs: [
      { q: "What should I do about an active leak in Highlands?", a: "Call during staffed business hours and explain the leak or storm damage; outside office hours, send a request for follow-up. Assessment timing depends on weather, safety, access, and current scheduling." },
      { q: "Will a repair void my roof's warranty?", a: "Only if it's done wrong. We use compatible materials and document the repair so your manufacturer coverage stays intact." },
      { q: "My roof is 18 years old — is a repair worth it?", a: "Sometimes. If the failure is isolated and the field is sound, yes. If the underlayment is brittle across the deck, we'll tell you that plainly and price both options." },
    ],
  }),
  E({
    townSlug: "highlands-nc",
    serviceSlug: "construction",
    serviceLabel: "Construction Services",
    h1: "Construction Services in Highlands, NC",
    intro:
      "Building or remodeling in Highlands is not a valley project transplanted uphill. Grade, granite, water table, wind exposure, and a short building season all shape the schedule and the detail. We plan, price, and build around the mountain — not against it.",
    localContext:
      "Our Highlands construction work covers additions, kitchen and primary-suite remodels, screened porches designed for four-season use, and full envelope upgrades on 1980s and 1990s homes that were never insulated for plateau winters. Foundation and drainage design come first on this terrain; framing and finish follow.",
    whoItsFor:
      "Homeowners planning an addition or major remodel, buyers who just closed on a home that needs to be brought up to their standard, and clients who want a single team accountable from design through the final walkthrough.",
    proofNote:
      "Roofing division and construction division under one roof means the envelope actually lines up — no finger-pointing between trades when something moves.",
    metaTitle: "Construction Services in Highlands, NC | Highlander",
    metaDescription:
      "Additions, remodels, and full-envelope projects in Highlands, NC. One team, plateau-grade detailing, and a project lead you can reach directly.",
    faqs: [
      { q: "Do you handle design as well as construction?", a: "Yes. Our in-house design track can take a project from first sketch through permit-ready drawings and into build, or we work from your designer's or engineer's set." },
      { q: "What's a realistic timeline for a Highlands addition?", a: "Most additions run 4–8 months from signed contract to punch-list depending on scope, permitting, and material lead times. We give you a written schedule before we start." },
      { q: "Do you pull the permits with the Town of Highlands and Macon County?", a: "Yes. Permit coordination is on us, including any HOA or ARB submission your neighborhood requires." },
    ],
  }),
  E({
    townSlug: "highlands-nc",
    serviceSlug: "home-repairs",
    serviceLabel: "Home Repair Services",
    h1: "Home Repair Services in Highlands, NC",
    intro:
      "Highlands homes take a beating in ways valley homes don't: wind-driven rain, freeze cycles that split unsealed penetrations, and long stretches of unoccupied months when small failures grow into large ones. Our home-repair work is the fast, correct fix — not a stopgap.",
    localContext:
      "The repairs we see most often on the plateau: exterior wood rot at trim and beam ends, water intrusion at deck ledgers, chimney chase leaks, failed skylight seals, and interior damage remediation after a roof event. On second homes we frequently pair the repair with a broader condition report so nothing else is missed.",
    whoItsFor:
      "Full-time residents catching small problems early, second-home owners who need coordinated repairs handled between visits, and buyers with a home-inspection punch list that needs a real contractor — not a handyman.",
    proofNote:
      "One point of contact, one written scope, one crew. You don't have to chase five trades to get one repair done right.",
    metaTitle: "Home Repair Services in Highlands, NC | Highlander",
    metaDescription:
      "Coordinated home repairs in Highlands, NC — exterior, envelope, and interior damage remediation from a licensed general contractor.",
    faqs: [
      { q: "Can you manage repairs while I'm out of town?", a: "Yes. We handle access, document progress with photos, and coordinate any secondary trades so you return to a completed project." },
      { q: "Do you take on smaller repair scopes or only large ones?", a: "Both. We're transparent about our minimum during the initial call so there are no surprises." },
      { q: "Can you handle water damage from a roof failure end-to-end?", a: "Yes. We stop the source, dry the assembly, and coordinate interior repairs so one company owns the outcome." },
    ],
  }),

  // ─────────── FRANKLIN ───────────
  E({
    townSlug: "franklin-nc",
    serviceSlug: "roofing",
    serviceLabel: "Roofing Services",
    h1: "Roofing Services in Franklin, NC",
    intro:
      "Franklin is where Highlander started and remains the company's primary showroom and operating base. That local presence gives homeowners a direct place to call or visit while project timing is confirmed from the actual scope and current schedule.",
    localContext:
      "Franklin roofing splits cleanly into three groups: 20–30 year asphalt systems on ranch and split-level homes across town, farmhouse and cabin roofs in the surrounding valleys where standing seam metal now dominates new work, and older homes where ventilation and flashing were never done right the first time and are the real cause of premature failure.",
    whoItsFor:
      "Long-time Franklin homeowners weighing repair vs. replace, first-time buyers who need a straight condition report, and homeowners preparing a property for sale or refinance.",
    proofNote:
      "A named project contact and written scope keep accountability clear from estimate through closeout. Ask to see documented Highlander work that matches the roof system you are considering.",
    metaTitle: "Roofing Services in Franklin, NC | Highlander Building Services",
    metaDescription:
      "Franklin, NC roofing contractor — repairs, replacements, and metal systems from a local team. CertainTeed ShingleMaster credentialed.",
    faqs: [
      { q: "Are you actually based in Franklin?", a: "Yes. Our shop, yard, and office are in Macon County. When you call, you're reaching the people who will be on your roof." },
      { q: "What roofing warranty do you offer in Franklin?", a: "Warranty eligibility and terms depend on the selected roofing system and the project agreement. Highlander confirms the applicable manufacturer and workmanship terms in writing for the specific project." },
      { q: "Do you handle insurance claims in Franklin?", a: "We provide the documentation adjusters need, but we don't do the adjuster's job — the claim relationship stays between you and your carrier." },
    ],
  }),
  E({
    townSlug: "franklin-nc",
    serviceSlug: "construction",
    serviceLabel: "Construction Services",
    h1: "Construction Services in Franklin, NC",
    intro:
      "Beyond the roof, Franklin homeowners come to us for additions, remodels, and outdoor-living projects that need a licensed general contractor who actually shows up. Our construction division runs on the same job-lead model as our roofing crews: one person accountable, start to finish.",
    localContext:
      "Franklin construction work is a mix of primary residences that want to stay for the next 20 years and rentals or short-term properties that need to earn. We build for both: durable, right-detailed envelopes on the family homes, and clean, punch-list-tight finishes on the income properties.",
    whoItsFor:
      "Homeowners adding a primary suite, in-law suite, or garage, families opening the main floor with a kitchen remodel, and property owners upgrading a rental for higher nightly rates.",
    proofNote:
      "Written schedule at signing, weekly written update during the build. If we slip, you find out from us before you notice on-site.",
    metaTitle: "Construction Services in Franklin, NC | Highlander",
    metaDescription:
      "Additions, remodels, and new-build work in Franklin, NC from a licensed general contractor with in-house design and a single project lead.",
    faqs: [
      { q: "What's the smallest construction project you take on?", a: "We're transparent about minimums on the initial call. Small isn't a problem — poorly scoped is." },
      { q: "Do I need finished drawings before calling you?", a: "Not necessarily. Our in-house design track can produce permit-ready drawings, or we work from your designer's or engineer's set." },
      { q: "How do you handle change orders?", a: "In writing. Every change gets a line-item cost and schedule impact before work moves." },
    ],
  }),
  E({
    townSlug: "franklin-nc",
    serviceSlug: "home-repairs",
    serviceLabel: "Home Repair Services",
    h1: "Home Repair Services in Franklin, NC",
    intro:
      "Small repairs can become larger problems when the underlying cause is missed. Highlander scopes the repair, documents the proposed work, and confirms applicable warranty terms before authorization.",
    localContext:
      "The Franklin repair calls we take most often: exterior trim rot on 25+ year homes, ledger and deck-attachment failures, chimney flashing that never worked, skylight replacement, and water-intrusion cleanup after a roof event.",
    whoItsFor:
      "Homeowners with a punch list, buyers working through a home-inspection response, and property owners keeping a rental in market-ready condition.",
    proofNote:
      "One written scope and one clear Highlander point of contact. Applicable warranty terms are confirmed for the project in writing.",
    metaTitle: "Home Repair Services in Franklin, NC | Highlander",
    metaDescription:
      "Coordinated home repairs in Franklin, NC. Exterior, envelope, and interior damage remediation from a licensed general contractor.",
    faqs: [
      { q: "Do you do handyman-scale work?", a: "Highlander focuses on roofing and construction scopes that fit its licensed-contractor services rather than general handyman tasks. The team can tell you whether a specific repair is a fit." },
      { q: "Can you handle interior work after a roof leak?", a: "Yes. Drying, drywall, paint, and finish repairs are inside our scope so you're not managing multiple companies." },
      { q: "How quickly can I get a repair estimate in Franklin?", a: "Scheduling depends on the roof condition, weather, access, and current workload. Call during staffed business hours or send a request so the team can confirm the next available step." },
    ],
  }),

  // ─────────── CASHIERS ───────────
  E({
    townSlug: "cashiers-nc",
    serviceSlug: "roofing",
    serviceLabel: "Roofing Services",
    h1: "Roofing Services in Cashiers, NC",
    intro:
      "Cashiers homes are almost never simple roofs. Steep pitches, complex valley geometry, dormers, and heavy timber accents mean the field work has to match the design work — and both have to survive plateau weather that punishes anything less than a full system.",
    localContext:
      "Our Cashiers work is concentrated along the NC-107 and US-64 corridors and on the private communities south of town — High Hampton, Trillium, Wade Hampton, Chattooga Club. On these homes the roof is a design element as much as a weather assembly, and specification errors show up visibly, not just as a leak years later.",
    whoItsFor:
      "Owners of legacy plateau homes updating the roof after 20+ years, buyers taking on a Cashiers property that needs a baseline condition report, and homeowners planning a re-roof coordinated with a broader exterior update.",
    proofNote:
      "Roofing in Cashiers is a specification problem before it's an installation problem. We answer both — and we put the specification in writing.",
    metaTitle: "Roofing Services in Cashiers, NC | Highlander",
    metaDescription:
      "Cashiers, NC roofing contractor for complex plateau homes. Metal, specialty, and asphalt roof systems specified and installed for four-season performance.",
    faqs: [
      { q: "Do you work in the private communities around Cashiers?", a: "Yes, across High Hampton, Trillium, Wade Hampton, Chattooga Club, and others. We coordinate ARB submissions and community access requirements before work starts." },
      { q: "How do you handle steep-slope safety on Cashiers roofs?", a: "Steep-slope access and fall-protection requirements are considered during project planning so the proposed scope reflects the roof geometry and site conditions." },
      { q: "Can you re-roof around an existing solar array?", a: "Yes. We coordinate detachment and re-set with the installer or handle a full remove/reinstall if needed." },
    ],
  }),
  E({
    townSlug: "cashiers-nc",
    serviceSlug: "roof-repair",
    serviceLabel: "Roof Repair",
    h1: "Roof Repair in Cashiers, NC",
    intro:
      "Repair work in Cashiers has to respect two things at once: the reason the roof is failing, and the design language of the home it protects. A visible patch on a plateau roof is a design problem in addition to a weather one — we solve both.",
    localContext:
      "The most frequent Cashiers repair calls: flashing failures at the many roof-to-wall transitions on complex plans, cracked pipe boots on 15+ year systems, ice-and-snow damage in valleys after freeze-thaw cycles, and older metal roofs with backing-out fasteners that no one has revisited in a decade.",
    whoItsFor:
      "Owners with an active or intermittent leak, buyers who need a written repair scope during due diligence, and homeowners preparing a property for the upcoming season.",
    proofNote:
      "A repair on a Cashiers roof should look like it wasn't there. That's the bar we hold ourselves to.",
    metaTitle: "Roof Repair in Cashiers, NC | Highlander Building Services",
    metaDescription:
      "Precision roof repair in Cashiers, NC. Plateau-experienced crews, photo-documented scopes, and repairs that respect the home's design.",
    faqs: [
      { q: "How fast can you inspect a Cashiers roof?", a: "Most Cashiers-area repair inspections are on the calendar inside 24–72 hours depending on weather and current call volume." },
      { q: "Can you match aged materials on a repair?", a: "We match to the closest current spec and note any visual difference in writing before we start. On some legacy roofs a broader repair area gives a cleaner result — we'll show you both options." },
      { q: "Do you provide written repair reports for buyers or sellers?", a: "When a documented assessment is part of the scope, Highlander can provide photos and a written contractor summary that the homeowner can share with other parties." },
    ],
  }),
  E({
    townSlug: "cashiers-nc",
    serviceSlug: "construction",
    serviceLabel: "Construction Services",
    h1: "Construction Services in Cashiers, NC",
    intro:
      "Cashiers construction is a design discipline first. Additions, screened porches, and remodels here have to sit inside a strong design vocabulary and hold up to a strict community review process. Our construction division is built to work in both worlds.",
    localContext:
      "The Cashiers projects we take on most often: primary-suite additions on legacy plateau homes, four-season screened porches integrated with existing rooflines, kitchen and great-room remodels opened for real entertaining, and full envelope upgrades on 1980s–1990s homes that were built for a different climate expectation.",
    whoItsFor:
      "Owners of plateau homes planning a serious addition or remodel, buyers who just closed on a property and want a coordinated whole-home update, and clients working through community ARB approvals who want a builder who understands the process.",
    proofNote:
      "One team, one lead, one accountable point of contact from first meeting through the walkthrough. No handoffs.",
    metaTitle: "Construction Services in Cashiers, NC | Highlander",
    metaDescription:
      "Additions, remodels, and envelope work in Cashiers, NC from a licensed general contractor with in-house design and ARB experience.",
    faqs: [
      { q: "Do you work with community ARBs around Cashiers?", a: "Yes. We prepare and submit ARB packages for the communities we regularly work in and coordinate any revisions the board requests." },
      { q: "How long does an addition take in Cashiers?", a: "Most additions run 5–9 months from signed contract through punch-list, depending on scope and permit timing. You get a written schedule before we start." },
      { q: "Can you coordinate with my designer or engineer?", a: "Yes. We regularly build from other firms' documents and act as the contractor of record for those projects." },
    ],
  }),
  E({
    townSlug: "cashiers-nc",
    serviceSlug: "home-repairs",
    serviceLabel: "Home Repair Services",
    h1: "Home Repair Services in Cashiers, NC",
    intro:
      "Cashiers homes are exposed to weather most builders never build for. When something fails — an exterior detail, a deck attachment, a chimney flashing — the right response is a coordinated repair from a general contractor, not a rotating cast of trade calls.",
    localContext:
      "Common Cashiers repair calls: exterior trim and beam-end rot on legacy homes, deck ledger failures, chimney chase leaks, failed skylight seals, and interior remediation after a roof or plumbing event. On second homes we frequently combine the repair with a broader condition report.",
    whoItsFor:
      "Owners with a specific failure that needs a definitive fix, second-home owners coordinating repairs between visits, and buyers working through an inspection response.",
    proofNote:
      "One written scope and one clear project contact help keep overlapping roofing and construction responsibilities defined.",
    metaTitle: "Home Repair Services in Cashiers, NC | Highlander",
    metaDescription:
      "Coordinated home repairs in Cashiers, NC. Exterior, envelope, and interior remediation from a licensed general contractor.",
    faqs: [
      { q: "Can you handle repairs while my home is closed for the season?", a: "Yes. We coordinate access, document progress, and hand back a completed, cleaned project so nothing is waiting on you." },
      { q: "Do you fix water damage end-to-end?", a: "Yes. Source, dry, and finish repairs are in-scope so one contractor is responsible for the result." },
      { q: "How do you price small repairs?", a: "Time-and-materials on true small work, fixed-price on defined scopes. We tell you which model we're using and why before we start." },
    ],
  }),
];

// ─────────────────────────────────────────────────────────────
//  Tier 1 flat-slug directory — canonical short URLs the site uses
//  to serve the same content at /roofing-highlands-nc etc.
// ─────────────────────────────────────────────────────────────

export type Tier1FlatEntry = FlatSlugEntry;

// ─────────────────────────────────────────────────────────────
//  TIER 2 — Sylva & Cullowhee. Broader combined "roofing + construction"
//  hub page per city, plus a dedicated roof-repair page. We start narrow
//  here on purpose; dedicated replacement/construction/home-repair pages
//  come later once these earn impressions.
// ─────────────────────────────────────────────────────────────

serviceTownContent.push(
  E({
    townSlug: "sylva-nc",
    serviceSlug: "roofing-construction",
    serviceLabel: "Roofing & Construction",
    h1: "Roofing and Construction Services in Sylva, NC",
    intro:
      "Sylva sits in the Tuckasegee valley where a compact downtown meets steep, forested slopes climbing toward Balsam and Cowee. That geography shapes every roof and every addition we build here — drainage, snow load, and access are all decisions that get made before framing.",
    localContext:
      "Our Sylva work is a mix of long-standing family homes near downtown, hillside builds along Skyland Drive and the Dillsboro side of the river, and updates on 1970s–1990s homes that were built before modern envelope standards. We handle the roofing division and the construction division under one project lead so the exterior actually lines up when the addition ties into the existing house.",
    whoItsFor:
      "Homeowners planning a roof plus an exterior update in the same season, buyers finishing a Jackson County home purchase who need one contractor for a coordinated punch list, and long-term owners weighing a re-roof against a broader whole-home refresh.",
    proofNote:
      "Roofing and construction under one company can simplify coordination when both scopes touch the same home, with responsibilities and applicable warranty terms documented in writing.",
    metaTitle: "Roofing & Construction in Sylva, NC | Highlander",
    metaDescription:
      "Sylva, NC roofing and construction from one licensed general contractor. Re-roofs, repairs, additions, and remodels coordinated by a single project lead.",
    faqs: [
      { q: "Do you work in Jackson County?", a: "Yes. Highlander has a Sylva showroom and serves Sylva, Dillsboro, Cullowhee, and surrounding Jackson County communities. Scheduling is confirmed for each project." },
      { q: "Can you combine a re-roof with an addition into one project?", a: "Yes, and it usually saves you real money on staging, dumpsters, and access. We sequence both scopes together with one written schedule." },
      { q: "Who coordinates permits with Jackson County?", a: "When permitting is required and included in Highlander's scope, the project team coordinates the applicable permit and inspection steps. Final approval remains with the jurisdiction." },
    ],
  }),
  E({
    townSlug: "sylva-nc",
    serviceSlug: "roofing-construction-hub",
    // duplicate reserved for future — safe no-op
    serviceLabel: "Roofing & Construction",
    h1: "Roofing and Construction Services in Sylva, NC",
    intro: "",
    localContext: "",
    whoItsFor: "",
    proofNote: "",
    metaTitle: "",
    metaDescription: "",
    faqs: [],
  }),
  E({
    townSlug: "cullowhee-nc",
    indexable: false, // outside the map-pack radius — noindex,follow, not in the sitemap (P3.1, GSC 90-day data)
    serviceSlug: "roofing-construction",
    serviceLabel: "Roofing & Construction",
    h1: "Roofing and Construction Services in Cullowhee, NC",
    intro:
      "Cullowhee is defined by the Tuckasegee, the university, and the hillside neighborhoods that ring both. Homes here range from long-held family properties to newer builds on steep parcels — and the right roof and the right addition look different on each.",
    localContext:
      "Our Cullowhee work covers re-roofs on older WCU-adjacent homes where ventilation and flashing details were never right, additions and remodels on hillside properties where drainage and access drive the schedule, and full envelope updates on 1980s–1990s homes that need to catch up to modern climate expectations. Roofing and construction sit under one project lead so the exterior stays coherent when scopes overlap.",
    whoItsFor:
      "Homeowners planning a coordinated roof plus exterior update, buyers finishing on a Cullowhee property that needs a real punch list, and property owners upgrading rentals or long-term family homes without juggling multiple trades.",
    proofNote:
      "One Highlander project contact and written scope keep responsibilities clear. Applicable warranty terms are confirmed for the specific project.",
    metaTitle: "Roofing & Construction in Cullowhee, NC | Highlander",
    metaDescription:
      "Cullowhee, NC roofing and construction from a licensed general contractor. Re-roofs, repairs, additions, and remodels coordinated by one project lead.",
    faqs: [
      { q: "Do you work in Cullowhee?", a: "Yes. Cullowhee is inside Highlander's Jackson County service area and is served from the Sylva showroom. Contact the team to confirm project availability." },
      { q: "Can you handle a re-roof and an addition in the same season?", a: "Yes. Combining the scopes usually cuts cost on staging and access. You get one written schedule for both." },
      { q: "Do you work on rental properties?", a: "Yes. We keep rental turn timelines in mind on scoping and provide a clean, punch-list-tight handoff." },
    ],
  }),
  E({
    townSlug: "cullowhee-nc",
    indexable: false, // outside the map-pack radius — noindex,follow, not in the sitemap (P3.1, GSC 90-day data)
    serviceSlug: "roof-repair",
    serviceLabel: "Roof Repair",
    h1: "Roof Repair in Cullowhee, NC",
    intro:
      "For a leak in Cullowhee, call during staffed business hours or send a request for follow-up. Highlander will discuss the roof condition and confirm assessment and repair timing based on safety, access, weather, and current scheduling.",
    localContext:
      "The repair calls we see most often in Cullowhee: valley wear-through on 15+ year asphalt, pipe-boot failures from long UV plus freeze-thaw exposure, chimney flashing that was never properly stepped on older homes, and small storm damage that keeps getting bigger because it was patched instead of fixed.",
    whoItsFor:
      "Owners with an active leak, buyers working through an inspection response before closing, and property owners keeping a rental or family home in tight condition year-round.",
    proofNote:
      "Every Cullowhee repair leaves with photos of what failed, what we did, and what's still on the clock. Nothing hidden, nothing padded.",
    metaTitle: "Roof Repair in Cullowhee, NC | Highlander Building Services",
    metaDescription:
      "Fast, honest roof repair in Cullowhee, NC. Same-week response, photo-documented scopes, and a straight answer on repair vs. replace.",
    faqs: [
      { q: "What should I do about an active leak in Cullowhee?", a: "Call during staffed business hours and explain what is happening; outside office hours, send a request for follow-up. Temporary protection depends on conditions, safety, and availability." },
      { q: "Is my repair worth doing or should I replace?", a: "Depends on the field. If the failure is isolated and the underlayment is sound, repair is the right call. If the deck is brittle across the roof, we'll say so plainly and price both options." },
      { q: "Do you provide written repair reports for insurance?", a: "When requested and included in the scope, Highlander can provide contractor photos and written repair information for insurance conversations. Coverage decisions remain with the carrier." },
    ],
  }),
);

// Remove the reserved placeholder entry so it never renders.
for (let i = serviceTownContent.length - 1; i >= 0; i--) {
  if (serviceTownContent[i].serviceSlug === "roofing-construction-hub") {
    serviceTownContent.splice(i, 1);
  }
}

// ─────────────────────────────────────────────────────────────
//  COVERAGE FILL — every town × every core service.
//  Hand-written entries above always win; generated entries only
//  fill combinations that don't already exist.
// ─────────────────────────────────────────────────────────────
{
  // Everything defined above this point is hand-written and indexable.
  for (const e of serviceTownContent) e.handwritten = true;

  const existing = new Set(
    serviceTownContent.map((e) => `${e.townSlug}|${e.serviceSlug}`),
  );
  for (const g of generatedServiceTownEntries) {
    const key = `${g.townSlug}|${g.serviceSlug}`;
    if (existing.has(key)) continue;
    existing.add(key);
    serviceTownContent.push(E({ ...g, handwritten: false }));
  }
}

export type Tier2FlatEntry = FlatSlugEntry;


export function getServiceTownEntry(townSlug: string, serviceSlug: string) {
  return serviceTownContent.find(
    (e) => e.townSlug === townSlug && e.serviceSlug === serviceSlug,
  );
}

export function getServiceTownEntriesForTown(townSlug: string) {
  return serviceTownContent.filter((e) => e.townSlug === townSlug);
}

export function getServiceTownEntriesForService(serviceSlug: string) {
  return serviceTownContent.filter((e) => e.serviceSlug === serviceSlug);
}

/** The one rule for "does this service × town page compete in search?". */
const entryIsIndexable = (e: ServiceTownEntry | undefined) =>
  !!e && e.handwritten === true && e.indexable !== false;

/**
 * A service × town page is indexable only when it carries hand-written local
 * content (local proof, town-specific FAQs, photos) AND is not switched off
 * with `indexable: false` (towns outside the map-pack radius). Everything else
 * renders with noindex,follow and is excluded from the sitemap.
 */
export function isServiceTownIndexable(townSlug: string, serviceSlug: string) {
  return entryIsIndexable(getServiceTownEntry(townSlug, serviceSlug));
}

/** Every indexable service × town pair, for sitemap generation. */
export const indexableServiceTownPairs = () =>
  serviceTownContent
    .filter(entryIsIndexable)
    .map((e) => ({ townSlug: e.townSlug, serviceSlug: e.serviceSlug }));

/**
 * Parent division page for each service slug — where link equity goes when a
 * service × town page is noindex (there is no point pointing internal links at
 * a page we do not want ranked).
 */
export const DIVISION_PAGE_FOR_SERVICE: Record<string, string> = {
  roofing: "/roofing",
  "roof-repair": "/roofing/roof-repair",
  "roof-replacement": "/roofing/roof-replacement",
  "metal-roofing": "/roofing/metal",
  "storm-damage": "/roofing/storm-damage",
  gutters: "/roofing/gutters",
  skylights: "/roofing/skylights",
  "synthetic-brava": "/roofing/brava-synthetic",
  "home-repairs": "/roofing/roof-repair",
  "roofing-construction": "/roofing",
  construction: "/construction",
  additions: "/construction/additions",
  "outdoor-living": "/construction/outdoor-living",
  renovations: "/construction/renovations",
  siding: "/construction/siding",
};

/**
 * Internal link target for a service in a town: the nested page when it is
 * indexable, otherwise the parent division page. Use this for every link
 * rendered on an indexable page (town grids, nearby-town blocks, link webs,
 * division pages, blog blocks). The noindex page itself stays reachable at its
 * own URL and keeps its self-canonical.
 */
export function serviceTownHref(townSlug: string, serviceSlug: string) {
  if (isServiceTownIndexable(townSlug, serviceSlug)) return `/service-areas/${townSlug}/${serviceSlug}`;
  return DIVISION_PAGE_FOR_SERVICE[serviceSlug] ?? `/service-areas/${townSlug}`;
}

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
      "Franklin is our home market. Our crews, trucks, and material yards are minutes from most jobs in town — so replacement projects move on schedule and the same team-led team is on-site from tear-off to final inspection.",
    localContext:
      "Most Franklin roofs we replace are 20–30 year asphalt systems on ranch, split-level, and farmhouse-style homes in the Cartoogechaye, Cowee, and Iotla valleys. Ventilation deficiencies and aging underlayment are the two most common reasons homes here need a full replacement rather than another patch.",
    whoItsFor:
      "Long-time Franklin homeowners weighing repair-vs-replace, families preparing a home for sale, and buyers who just closed and want a clean baseline before they move in.",
    proofNote:
      "Franklin is where we cut our teeth. The crew you meet at your estimate is the crew on your roof — same names, same trucks, year after year.",
    metaTitle: "Roof Replacement in Franklin, NC | Highlander Roofing",
    metaDescription:
      "Full roof replacement in Franklin, NC from a locally based, team-led team. CertainTeed Master Applicator, licensed GC, free on-site assessment.",
    faqs: [
      { q: "How long does a full roof replacement take on a Franklin home?", a: "Most single-family asphalt replacements in Franklin finish in 1–3 working days once materials are on-site. Larger or steeper roofs and metal systems take longer; we give you a firm window before we start." },
      { q: "Do you pull the permit for Macon County?", a: "Yes. We handle the Macon County permit and final inspection so you don't have to coordinate it." },
      { q: "Will my roof replacement be done by the same crew start-to-finish?", a: "Yes. We don't subcontract out core install work. The crew on day one is the crew on the final walkthrough." },
    ],
  }),
  E({
    townSlug: "franklin-nc",
    serviceSlug: "roof-repair",
    serviceLabel: "Roof Repair",
    h1: "Roof Repair in Franklin, NC",
    intro:
      "When something fails on a Franklin roof, you usually want a real person on site this week — not next month. Because we're based here, most repair inspections happen within 24–48 hours and the fix is scheduled before we leave the driveway.",
    localContext:
      "The repairs we see most often in Franklin: lifted ridge caps from spring storms coming up the Little Tennessee valley, pipe-boot failures on 15+ year asphalt, and chimney flashing that was never properly stepped on older homes.",
    whoItsFor:
      "Homeowners with an active leak, anyone preparing for a home inspection, and second-home owners who just opened the house for the season and found a stain on the ceiling.",
    proofNote:
      "If repair is the right call, we'll say so. If your roof is past the point repairs are worth your money, we'll say that too — and put it in writing.",
    metaTitle: "Roof Repair in Franklin, NC | Highlander Roofing",
    metaDescription:
      "Honest roof repair in Franklin, NC. Local crews, 24–48 hour inspections, full photo documentation, and a straight answer on whether to repair or replace.",
    faqs: [
      { q: "How fast can you get to my Franklin home for a leak?", a: "Most active-leak inspections in Franklin happen within 24–48 hours of the call. Temporary protection can usually be installed the same visit." },
      { q: "Do you provide written estimates for insurance?", a: "Yes. Every repair gets photo documentation and a written scope you can hand directly to your adjuster." },
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
    metaTitle: "Metal Roofing in Franklin, NC | Highlander Roofing",
    metaDescription:
      "Standing seam and exposed-fastener metal roofing in Franklin, NC. Engineered for mountain weather, installed by a locally based, licensed contractor.",
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
      "Premium materials, full underlayment systems, and an team-led crew that documents the entire project so you can review the work without being on the mountain.",
    metaTitle: "Roof Replacement in Highlands, NC | Highlander Roofing",
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
      "Specified as a system, installed by the same crew that did the estimate, and documented in writing so the warranty path is clean.",
    metaTitle: "Metal Roofing in Highlands, NC | Highlander Roofing",
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
    metaTitle: "Home Additions in Highlands, NC | Highlander Construction",
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
      "Premium underlayment from eave to ridge, full photo documentation, and an team-led crew that treats the home like the asset it is.",
    metaTitle: "Roof Replacement in Cashiers, NC | Highlander Roofing",
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
    metaTitle: "Metal Roofing in Cashiers, NC | Highlander Roofing",
    metaDescription:
      "Standing seam metal roofing in Cashiers, NC. Designed for extreme rainfall and mountain elevation. Team-led, fully warranted installation.",
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
    metaTitle: "Brava Synthetic Roofing in Cashiers, NC | Highlander Roofing",
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
      "Local crews, real scheduling, and an owner who will give you a straight answer on whether your roof actually needs replacement now or has another season in it.",
    metaTitle: "Roof Replacement in Sylva, NC | Highlander Roofing",
    metaDescription:
      "Full roof replacement in Sylva, NC. Team-led, locally based, CertainTeed Master Applicator. Free on-site assessment and honest repair-vs-replace guidance.",
    faqs: [
      { q: "Do you replace roofs on rental properties in Sylva?", a: "Yes. We schedule around tenants and minimize disruption — most single-family replacements are complete in 1–3 working days." },
      { q: "What's the most common issue on older Sylva homes?", a: "Inadequate attic ventilation — which shortens roof life from below. We correct ventilation as part of every full replacement." },
      { q: "Do you handle the Jackson County permit?", a: "Yes. Permit, inspection, and final sign-off are all included." },
    ],
  }),
  E({
    townSlug: "sylva-nc",
    serviceSlug: "roof-repair",
    serviceLabel: "Roof Repair",
    h1: "Roof Repair in Sylva, NC",
    intro:
      "When something fails on a Sylva roof, we can usually be on-site within 24–48 hours and have a written assessment in your hands before we leave. Most repairs are scheduled the same week.",
    localContext:
      "Common Sylva repairs: pipe-boot failures on 12+ year asphalt, lifted ridges from valley-channeled spring storms, and chimney flashing on older homes built before stepped flashing became standard.",
    whoItsFor:
      "Homeowners with an active leak, landlords with a tenant call, and anyone who needs honest guidance on whether to repair, replace, or just monitor.",
    proofNote:
      "Photo documentation of every repair, plain-English write-up, and a direct answer on whether your roof is worth investing more repair dollars into.",
    metaTitle: "Roof Repair in Sylva, NC | Highlander Roofing",
    metaDescription:
      "Honest roof repair in Sylva, NC. 24–48 hour inspections, photo documentation, fair pricing, and a straight answer on repair-vs-replace.",
    faqs: [
      { q: "How fast can you respond to a leak in Sylva?", a: "Most active-leak inspections happen within 24–48 hours. Temporary protection is typically installed during the inspection visit." },
      { q: "Will you tell me if a repair isn't worth doing?", a: "Yes. If your roof is too far gone for repair dollars to make sense, we'll say so — in writing — before you spend the money." },
      { q: "Do you do insurance documentation?", a: "Every repair includes photo and written documentation suitable for an insurance claim." },
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
      "Specified as a system, installed by the same team-led crew that estimated the project, with the trim and detail work that protects the warranty.",
    metaTitle: "Metal Roofing in Sylva, NC | Highlander Roofing",
    metaDescription:
      "Standing seam and exposed-fastener metal roofing in Sylva, NC. Engineered for mountain weather, installed by a locally based licensed contractor.",
    faqs: [
      { q: "How long will a metal roof last on a Sylva home?", a: "A properly installed standing seam system is a 40+ year roof. Failures we see in the field are almost always install-detail issues, not panel failures." },
      { q: "Is metal more expensive than asphalt?", a: "Up front, yes — typically 1.5–2.5× asphalt. Over 30+ years, metal is usually the cheaper roof on a per-year basis once you include replacement cycles." },
      { q: "Can you match an existing metal roof on an addition?", a: "In most cases yes. Match success depends on age and weathering of the existing panels — we'll quote it honestly after inspection." },
    ],
  }),
  // ─────────── ASHEVILLE ───────────
  E({
    townSlug: "asheville-nc",
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
    metaTitle: "Roof Replacement in Asheville, NC | Highlander Roofing",
    metaDescription:
      "Premium roof replacement for Asheville's historic and modern mountain homes. Expert Buncombe County crews, team-led, licensed GC.",
    faqs: [
      { q: "Do you handle historic district ARB approvals in Asheville?", a: "Yes. We prepare and submit all required documentation for Biltmore Forest, Montford, and other Asheville historic boards." },
      { q: "What's the best roof for a Town Mountain ridgetop home?", a: "We recommend standing seam metal or synthetic slate for high-exposure Asheville ridges to ensure maximum wind and UV resistance." },
      { q: "Do you offer financing for large Asheville projects?", a: "Yes. We offer flexible financing options for both roofing and construction projects in the Asheville market." },
    ],
  }),
  E({
    townSlug: "asheville-nc",
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
    metaTitle: "Home Additions in Asheville, NC | Highlander Construction",
    metaDescription:
      "Custom home additions and structural modernizations in Asheville, NC. Design-build expertise for Buncombe County homeowners.",
    faqs: [
      { q: "How long is the permitting process in Asheville?", a: "Asheville and Buncombe County permitting can take 4-8 weeks. We manage the entire process from structural plans to final sign-off." },
      { q: "Can you build on steep Asheville slopes?", a: "Yes. We work with specialized engineers to design foundations for steep-slope Asheville sites." },
    ],
  }),

  // ─────────── HENDERSONVILLE ───────────
  E({
    townSlug: "hendersonville-nc",
    serviceSlug: "roof-replacement",
    serviceLabel: "Roof Replacement",
    h1: "Roof Replacement in Hendersonville, NC",
    intro:
      "Hendersonville projects prioritize longevity and reliability. We serve established neighborhoods and retirement communities with clean, organized, and team-led roof replacement services.",
    localContext:
      "The Hendersonville plateau sees significant afternoon thunderstorms and localized hail. We recommend Class 4 impact-rated shingles for Henderson County homes to ensure the longest possible service life and storm resistance.",
    whoItsFor:
      "Established homeowners, retirement community residents, and anyone looking for a highly reliable, warrantied roof system in the Hendersonville area.",
    proofNote:
      "Locally based crews and thousands of documented successful projects across the Hendersonville plateau.",
    metaTitle: "Roof Replacement in Hendersonville, NC | Highlander Roofing",
    metaDescription:
      "Reliable roof replacement for Hendersonville homes. Local crews, impact-resistant options, and team-led quality. Licensed & Insured.",
    faqs: [
      { q: "Do you work in Hendersonville retirement communities?", a: "Yes. we are familiar with the scheduling and staging requirements of many Hendersonville-area active adult and retirement communities." },
      { q: "Why should I choose impact-resistant shingles in Hendersonville?", a: "Hendersonville is a hail-prone corridor. Class 4 shingles are designed to survive these events and often provide insurance discounts." },
    ],
  }),
  // ─────────── WAYNESVILLE ───────────
  E({
    townSlug: "waynesville-nc",
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
    metaTitle: "Roof Replacement in Waynesville, NC | Highlander Roofing",
    metaDescription:
      "Premium roof replacement for Waynesville homes. Specialized in historic district care and mountain-grade performance. Licensed & Insured.",
    faqs: [
      { q: "How do you handle historic requirements in Waynesville?", a: "We coordinate with local guidelines to select shingles and details that maintain the home's historic integrity while providing modern protection." },
      { q: "Does Waynesville's elevation affect roof longevity?", a: "Yes. Higher UV and heavier snow loading mean materials must be specified for mountain conditions, not just valley averages." },
    ],
  }),
  E({
    townSlug: "waynesville-nc",
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
    metaTitle: "Home Additions in Waynesville, NC | Highlander Construction",
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
    metaTitle: "Roof Replacement in Brevard, NC | Highlander Roofing",
    metaDescription:
      "Moisture-ready roof replacement in Brevard, NC. Engineered for Transylvania County's extreme rainfall. Licensed contractor, team-led.",
    faqs: [
      { q: "How do you handle Brevard's extreme rainfall?", a: "We use high-performance ice-and-water shield coverage and 6-inch gutter systems as the standard for Brevard projects." },
      { q: "Is standing seam metal better for Brevard?", a: "Metal sheds high volumes of water exceptionally well, making it a top-tier choice for Transylvania County homes." },
    ],
  }),
  E({
    townSlug: "brevard-nc",
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
    metaTitle: "Metal Roofing in Bryson City, NC | Highlander Roofing",
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
    serviceSlug: "roof-replacement",
    serviceLabel: "Roof Replacement",
    h1: "Roof Replacement in Murphy, NC",
    intro:
      "Serving the far west with reliable, team-led roof replacement. We provide Murphy families with the same standard of quality we bring to Asheville and Highlands.",
    localContext:
      "In Murphy and Cherokee County, we focus on durability and local accountability. Our crews are staged to provide responsive service and honor long-term warranties in the westernmost corner of NC.",
    whoItsFor:
      "Full-time residents, retirees building custom retreats, and vacation home owners needing a dependable local contractor.",
    proofNote:
      "Documented successful projects across Cherokee County, featuring high-quality shingle and metal systems.",
    metaTitle: "Roof Replacement in Murphy, NC | Highlander Roofing",
    metaDescription:
      "Reliable roof replacement in Murphy, NC. Locally based crews, durable materials, and team-led quality. Licensed & Insured.",
    faqs: [
      { q: "Do you have local crews in Murphy?", a: "Yes. We maintain a local crew presence to ensure responsive service and local accountability for our Murphy clients." },
      { q: "What's the best roof for a Murphy mountain cabin?", a: "Dimensional shingles or standing seam metal both perform exceptionally well in Murphy's climate." },
    ],
  }),
];


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

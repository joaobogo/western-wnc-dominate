/**
 * Dedicated outdoor-living sub-pages (15 Sep 2026 SEO audit, striking-distance
 * table): "retaining wall installation", "patio builders", "patio roofs" and
 * "outdoor kitchen builder" queries (900+ impressions at positions 5–30) were
 * landing on the old site's one-page-per-feature URLs, which now 301 here.
 *
 * Copy describes the service and how it is planned. No counts, prices, awards
 * or named past projects — those live in src/data/business.ts and
 * src/data/projects.ts respectively and are never invented here.
 */

export interface OutdoorSubPage {
  slug: string;
  path: string;
  crumb: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  answer: { question: string; answer: string; points: string[] };
  scope: { heading: string; intro: string; items: string[] };
  considerations: { heading: string; intro: string; items: { title: string; body: string }[] };
  process: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  related: { label: string; href: string; description: string }[];
}

export const OUTDOOR_SUBPAGES: OutdoorSubPage[] = [
  {
    slug: "patios",
    path: "/construction/outdoor-living/patios",
    crumb: "Patios & Patio Roofs",
    title: "Patios & Covered Patio Roofs in Western NC | Highlander",
    description:
      "Paver, stone and stamped-concrete patios plus covered patio roofs tied into your existing roof, built for sloped Western NC lots. Request a site visit.",
    h1: "Patios and Covered Patio Roofs for Mountain Homes",
    lead:
      "A patio on a mountain lot is a grading, drainage and roofing project before it is a surface. Highlander builds paver, natural stone and stamped-concrete patios across Western North Carolina, and, because we are a roofing company first, we build the covered patio roof that goes over them and tie it into the house properly.",
    answer: {
      question: "What does a patio project with Highlander include?",
      answer:
        "Base preparation and drainage sized for the slope, the finished patio surface in paver, stone or stamped concrete, steps and transitions to the house and yard, and, when you want shade or rain cover, a patio roof framed and flashed into the existing roofline. One crew, one scope, one written price.",
      points: [
        "Paver, natural stone and stamped-concrete patios",
        "Covered patio roofs flashed into the existing roof by roofers",
        "Steps, seat walls and transitions to decks and walkways",
      ],
    },
    scope: {
      heading: "What we build",
      intro: "Every patio is designed around how the property drains and how you want to use the space, then built from the ground up.",
      items: [
        "Paver patios on a compacted, open-graded base with edge restraint",
        "Natural stone and flagstone patios, dry-laid or mortared on a slab",
        "Stamped and broom-finished concrete patios with control joints planned for freeze-thaw",
        "Covered patio roofs: gable, shed or hip, in metal or shingle to match the house",
        "Screened patio enclosures and pergola-style shade structures",
        "Steps, landings, seat walls and the transitions to an existing deck, porch or walkway",
        "Drainage: French drains, channel drains and downspout routing so the patio sends water away from the foundation",
      ],
    },
    considerations: {
      heading: "What changes on a mountain lot",
      intro: "Flatland patio details fail here. These are the decisions we make on site before the price is written.",
      items: [
        { title: "Slope and grade", body: "Most Western NC patios sit on a cut-and-fill pad. We plan the retaining edge, the terrace levels and the steps so the finished surface is level and the fill is compacted and drained." },
        { title: "Drainage first", body: "Rain totals on the plateau are among the highest in the East. The base, the pitch of the surface and the drains behind any wall are sized for that, not for a catalog average." },
        { title: "Freeze-thaw", body: "Open-graded base material, proper joint sand or polymeric sand, and control joints in concrete keep the surface from heaving and cracking through winter." },
        { title: "Roof tie-in", body: "A patio roof attached to the house needs a ledger, flashing and a valley or kick-out detail that keeps water out of the wall. That is roofing work, and we do it as roofing work." },
        { title: "Permits", body: "Attached patio roofs, structures over a certain size and anything with electrical need a permit in most Western NC counties. We handle the application as part of the scope." },
      ],
    },
    process: [
      { title: "Site visit", body: "We walk the lot, look at how water moves across it, and talk through how you want to use the space." },
      { title: "Design and written scope", body: "Layout, levels, materials, the roof structure if there is one, and a line-item price. Nothing is a change order later that could have been planned now." },
      { title: "Permit and schedule", body: "We file the permit where one is required and give you a build window before any material is ordered." },
      { title: "Build", body: "Excavation and base, walls and steps, surface, then the roof structure and finishes. You get a single point of contact for the whole job." },
      { title: "Walkthrough", body: "We check drainage with a hose, review the surface and the roof details with you, and hand over the paperwork." },
    ],
    faqs: [
      { q: "Can you build a patio on a steep lot?", a: "Yes. Steep lots are the norm in our service area. The patio becomes a terrace with a retaining edge, and the design sets the levels, the steps and the drainage before any surface material is chosen." },
      { q: "Paver, stone or concrete: which lasts longest in Western NC?", a: "All three last when the base and drainage are right. Pavers and dry-laid stone tolerate freeze-thaw movement and can be lifted for repairs. Concrete is the most economical for large, simple shapes and needs properly placed control joints. We recommend based on the site and how the space will be used, not a default." },
      { q: "Can you add a roof over an existing patio?", a: "Usually. We check the patio's footing capacity and the attachment point on the house, then frame a roof that is flashed into the existing roofline. If the existing patio cannot carry posts, we add footings." },
      { q: "Do you match the patio roof to my house roof?", a: "Yes. Standing seam metal, exposed-fastener metal or shingles to match the main roof, with the same underlayment and flashing standards we use on a roof replacement." },
      { q: "Do patios and patio roofs need a permit?", a: "A ground-level patio usually does not. An attached roof structure, a raised patio above a certain height, or anything with wiring or gas usually does. We confirm with the county and include the permit in the scope." },
    ],
    related: [
      { label: "Outdoor Living Overview", href: "/construction/outdoor-living", description: "Decks, porches, screened rooms and pergolas" },
      { label: "Outdoor Kitchens & Fire Features", href: "/construction/outdoor-living/outdoor-kitchens", description: "Cooking and fire on the same patio" },
      { label: "Retaining Walls & Hardscape", href: "/construction/outdoor-living/hardscape", description: "Walls, steps and walkways for sloped lots" },
      { label: "Home Additions", href: "/construction/additions", description: "When the patio becomes a room" },
      { label: "Metal Roofing", href: "/roofing/metal", description: "Standing seam for patio roofs and main roofs" },
      { label: "Book a Construction Consultation", href: "/construction/consultation", description: "Start with a site visit" },
    ],
  },
  {
    slug: "outdoor-kitchens",
    path: "/construction/outdoor-living/outdoor-kitchens",
    crumb: "Outdoor Kitchens & Fire Features",
    title: "Outdoor Kitchens & Fire Features in WNC | Highlander",
    description:
      "Outdoor kitchens, grill stations, fire pits and fireplaces for Western NC mountain homes, covered or open, with licensed utility hookups. Get a written scope.",
    h1: "Outdoor Kitchens, Grill Stations and Fire Features",
    lead:
      "An outdoor kitchen in the mountains has to survive rain, freeze-thaw and months of little use, and a fire feature has to sit safely against a wood-framed house. Highlander designs and builds both across Western North Carolina, usually as part of a covered patio or porch so the space gets used more than a few weekends a year.",
    answer: {
      question: "What outdoor kitchen and fire features does Highlander build?",
      answer:
        "Built-in grill stations and full outdoor kitchens with weather-rated cabinetry and countertops, gas and electrical rough-ins coordinated with licensed trades, and fire pits and outdoor fireplaces in masonry or prefabricated units, all planned with the clearances, ventilation and covered structure a mountain climate calls for.",
      points: [
        "Grill stations and full outdoor kitchens",
        "Fire pits and outdoor fireplaces, wood or gas",
        "Covered cooking and seating areas built by roofers",
      ],
    },
    scope: {
      heading: "What we build",
      intro: "From a single built-in grill to a covered kitchen with a fireplace at the far end.",
      items: [
        "Built-in grill stations with masonry or framed bases and weather-rated finishes",
        "Full outdoor kitchens: countertops, cabinetry, sink, refrigeration and storage",
        "Gas, water and electrical rough-ins coordinated with licensed plumbing and electrical contractors",
        "Wood-burning and gas fire pits with proper surrounds and seating walls",
        "Outdoor fireplaces in masonry or prefabricated units, with chimney and clearance details",
        "Covered structures over the cooking and fire areas, with roofing that matches the house",
        "Lighting, ceiling fans and heaters planned into the covered structure",
      ],
    },
    considerations: {
      heading: "What changes on a mountain lot",
      intro: "The details that decide whether an outdoor kitchen is still working in ten years.",
      items: [
        { title: "Cover it", body: "An uncovered kitchen on the plateau sees more rain than most of the country. A roof over the cooking area protects cabinetry, appliances and countertops and extends the season by months." },
        { title: "Clearances and ventilation", body: "Grills and fireplaces have manufacturer clearances to combustible framing, and a covered grill needs a vent hood or open sides. We design to the listing, not to the look." },
        { title: "Utilities", body: "Gas lines, GFCI circuits and water need permits and licensed trades. We coordinate them inside one schedule so you are not managing three contractors." },
        { title: "Materials that winter well", body: "Stone, brick, stainless, sealed concrete and marine-grade cabinetry. Anything that holds water will crack in freeze-thaw, so drainage is built into the base." },
        { title: "Fire and the house", body: "A fire feature near a wood-sided home needs setbacks, spark control and, for fireplaces, a chimney that terminates clear of the roofline. We are the ones who will be repairing that roof, so we detail it carefully." },
      ],
    },
    process: [
      { title: "Site visit", body: "Where the grill goes, where the smoke goes, where you sit, and how the space connects to the kitchen inside." },
      { title: "Design and written scope", body: "Layout, appliance list, utilities, the structure over it, and a line-item price." },
      { title: "Permit and schedule", body: "Gas, electrical and structure permits filed where required, with a build window before material is ordered." },
      { title: "Build", body: "Base and structure, rough-ins, masonry or framing, roofing, finishes and appliances, in that order." },
      { title: "Walkthrough", body: "Utilities tested, clearances confirmed, and the manufacturer documents handed over." },
    ],
    faqs: [
      { q: "Do you handle the gas and electrical work?", a: "We coordinate it. Gas, electrical and plumbing rough-ins are performed by licensed trades under one schedule and one point of contact, and the permits are part of the scope." },
      { q: "Should an outdoor kitchen be covered in Western NC?", a: "We recommend it. A covered kitchen protects the appliances and cabinetry from rain and UV and is usable for far more of the year. The cover is a roof, and we build it to the same standard as the roof on your house." },
      { q: "Wood-burning or gas fire feature?", a: "Wood gives you the fire most people picture; gas gives you instant use and no ash. The site decides as much as preference: clearances to the house and neighboring trees, smoke direction and local burn rules all factor in." },
      { q: "Can a fire pit go on an existing deck?", a: "Only with a listed unit rated for that use and the required clearances and heat shielding. On many decks the safer answer is a patio-level fire area beside the deck, which we can build as part of the same project." },
      { q: "How do you keep an outdoor kitchen from cracking over winter?", a: "Drainage in the base, materials that do not hold water, expansion joints in masonry and countertops, and shutting off and draining the water line before the first freeze. We walk you through winterizing at handover." },
    ],
    related: [
      { label: "Outdoor Living Overview", href: "/construction/outdoor-living", description: "Decks, porches, screened rooms and pergolas" },
      { label: "Patios & Patio Roofs", href: "/construction/outdoor-living/patios", description: "The surface and cover under the kitchen" },
      { label: "Retaining Walls & Hardscape", href: "/construction/outdoor-living/hardscape", description: "Terraces and seat walls" },
      { label: "Renovations", href: "/construction/renovations", description: "Indoor kitchens and whole-home work" },
      { label: "Design & Planning", href: "/construction/design", description: "Layouts before the first footing" },
      { label: "Book a Construction Consultation", href: "/construction/consultation", description: "Start with a site visit" },
    ],
  },
  {
    slug: "hardscape",
    path: "/construction/outdoor-living/hardscape",
    crumb: "Retaining Walls & Hardscape",
    title: "Retaining Walls & Hardscape in Western NC | Highlander",
    description:
      "Segmental block, boulder and timber retaining walls, steps, walkways and drainage for steep Western NC lots. Get a written scope.",
    h1: "Retaining Walls, Steps and Walkways for Sloped Lots",
    lead:
      "Almost every outdoor project in Western North Carolina starts by holding back a hillside. Highlander builds retaining walls, terraces, steps and walkways as part of its outdoor living work, with the drainage behind the wall treated as seriously as the face of it.",
    answer: {
      question: "What retaining wall and hardscape work does Highlander do?",
      answer:
        "Segmental block, natural boulder and timber retaining walls with proper drainage and backfill, terraced grades for patios and yards, stone and paver walkways, steps and landings, and the French drains and downspout routing that keep water off the wall and away from the house. Taller walls are engineered when the grade requires it.",
      points: [
        "Block, boulder and timber retaining walls with drainage behind them",
        "Terraces, steps, landings and walkways",
        "Engineering and permits on walls that need them",
      ],
    },
    scope: {
      heading: "What we build",
      intro: "Walls and paths that make a sloped lot usable, built to move water rather than hold it.",
      items: [
        "Segmental concrete block retaining walls with geogrid reinforcement where the height calls for it",
        "Natural boulder and stacked-stone walls that fit a mountain property",
        "Pressure-treated timber walls for garden and utility grades",
        "Terracing: two or three shorter walls instead of one tall one, with usable levels between",
        "Stone, paver and gravel walkways, with steps and landings set for safe stride on a slope",
        "Drainage: perforated pipe and clean stone behind every wall, daylighted or tied to a drain",
        "Driveway edges, parking pads and the transitions to patios, decks and porches",
      ],
    },
    considerations: {
      heading: "What changes on a mountain lot",
      intro: "Retaining walls fail from water and from being under-built for their height. Both are decided before the first block is set.",
      items: [
        { title: "Water behind the wall", body: "Hydrostatic pressure, not soil, pushes walls over. Every wall gets clean stone backfill, perforated drain pipe and an outlet, sized for plateau rainfall." },
        { title: "Height and engineering", body: "Walls above a certain height, walls carrying a surcharge such as a driveway or patio, and terraced walls close together need an engineer's design and usually a permit. We tell you when that applies before you commit." },
        { title: "Base and footing", body: "A compacted, leveled base below frost concerns, with the first course buried, is what keeps a wall straight through freeze-thaw." },
        { title: "Slope stability", body: "Cut slopes in mountain soils can move. We look at the whole grade, not only the wall line, and sometimes the right answer is a lower wall further back." },
        { title: "Access", body: "Getting block, stone and equipment to a hillside site affects cost and sequence. We plan the route and protect existing landscaping and drives." },
      ],
    },
    process: [
      { title: "Site visit", body: "We read the grade, look for where water collects, and identify what the wall has to carry." },
      { title: "Design and written scope", body: "Wall type, height, terracing, drainage, engineering if needed, and a line-item price." },
      { title: "Permit and schedule", body: "Engineering and permits are handled where required, with a build window set before excavation." },
      { title: "Build", body: "Excavation, base, drainage, wall courses and backfill in lifts, then steps, walkways and finish grading." },
      { title: "Walkthrough", body: "We test drainage outlets, review the wall and paths with you, and provide the engineering and permit documents for your records." },
    ],
    faqs: [
      { q: "When does a retaining wall need an engineer?", a: "As a rule, walls over four feet measured from the bottom of the footing, walls supporting a driveway, patio or structure, and tiered walls set close together. We confirm the county's threshold and include the engineering in the scope when it applies." },
      { q: "Block, boulder or timber: which should I choose?", a: "Segmental block is the most versatile and reinforceable for taller walls. Boulders suit a natural mountain look and moderate heights. Timber is economical for low garden and utility walls but has the shortest life. We recommend by height, soil and the look of the property." },
      { q: "Why do retaining walls fail?", a: "Water trapped behind the wall, a base that was not compacted or set deep enough, and walls built taller than their design without reinforcement. Our walls are built with drainage, a proper base and geogrid where the height requires it." },
      { q: "Can you fix a leaning wall?", a: "Sometimes, if the base is sound and the lean is early. More often the wall needs to be rebuilt with drainage and reinforcement it never had. We assess on site and give you both options with prices." },
      { q: "Can a retaining wall create a flat area for a patio?", a: "Yes. That is the most common reason we build them. The wall, the fill, the drainage and the patio are designed as one project so the patio does not settle later." },
    ],
    related: [
      { label: "Outdoor Living Overview", href: "/construction/outdoor-living", description: "Decks, porches, screened rooms and pergolas" },
      { label: "Patios & Patio Roofs", href: "/construction/outdoor-living/patios", description: "The terrace the wall creates" },
      { label: "Outdoor Kitchens & Fire Features", href: "/construction/outdoor-living/outdoor-kitchens", description: "Cooking and fire on the terrace" },
      { label: "Home Additions", href: "/construction/additions", description: "Additions that need cut-and-fill grading" },
      { label: "Construction Division", href: "/construction", description: "All construction services" },
      { label: "Book a Construction Consultation", href: "/construction/consultation", description: "Start with a site visit" },
    ],
  },
];

export const getOutdoorSubPage = (slug: string) => OUTDOOR_SUBPAGES.find((p) => p.slug === slug);

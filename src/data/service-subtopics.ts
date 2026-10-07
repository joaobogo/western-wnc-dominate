import type { Subtopic } from "@/components/service/ServiceSubtopics";

/**
 * Sub-topics each division page must answer, one entry per old flat URL that
 * now redirects into it (T16, 15 Sep 2026 SEO spec, Appendix A).
 *
 * Copy rule: describe the work and the decision. No prices, no counts, no
 * response-time promises — those live in src/data/business.ts and on the cost
 * page, and anything we cannot stand behind in writing does not belong here.
 */
export const gutterSubtopics: Subtopic[] = [
  {
    title: "Seamless gutter installation",
    body:
      "We roll K-style aluminium on site, so a run has no seam between the corner and the downspout. Fewer joints is the whole point: on a mountain roof the joints are where a gutter eventually separates and drips behind the fascia.",
    points: [
      "5-inch and 6-inch profiles, rolled to the length of the run",
      "Hidden hangers screwed into the rafter tail, not spiked into fascia",
      "Pitch set to the downspout so the trough drains instead of holding water",
    ],
  },
  {
    title: "5-inch or 6-inch: which your roof needs",
    body:
      "A 6-inch trough carries substantially more water than a 5-inch and pairs with a larger downspout. Steep pitches, long runs, and valleys that dump two roof planes into one gutter all push the sizing up, and the Highlands plateau is one of the wettest places in the eastern United States. We size from the roof area draining into each run rather than from habit.",
    points: [
      "Roof area, pitch and valley count decide the profile",
      "Downspout count and outlet size matter as much as trough width",
      "Oversized outlets where a valley discharges into the run",
    ],
  },
  {
    title: "Gutter guards and leaf guards",
    body:
      "On a wooded lot the question is not leaves, it is pine needles. Micro-mesh screens keep needles out of the trough but need a surface that sheds them; reverse-curve systems shed heavier debris but behave differently in hard, wind-driven rain. We fit the type to the tree cover and the roof pitch above it, and we say when a guard is not worth it.",
    points: [
      "Micro-mesh and reverse-curve gutter protection systems",
      "Retrofit to existing gutters where the trough and hangers are sound",
      "Valley and inside-corner detailing, where most guard failures start",
    ],
  },
  {
    title: "Copper gutters and half-round",
    body:
      "Copper is specified for historic homes, timber-framed builds and plateau properties where the gutter is part of the elevation. It is installed differently to aluminium — soldered joints, heavier brackets — and it weathers to a patina rather than staying bright.",
    points: [
      "Half-round and K-style copper with soldered joints",
      "Matching copper downspouts, leader heads and conductor pipe",
      "Compatible fasteners throughout, so no dissimilar metal sits against the copper",
    ],
  },
  {
    title: "Gutter repair and re-hanging",
    body:
      "Not every gutter needs replacing. Spikes pulling out of soft fascia, a run that has lost its pitch, a separated seam at a corner, or a downspout that was never tied into anything are all repairs. We tell you which one you are looking at during the inspection instead of quoting a replacement by default.",
    points: [
      "Re-hanging on hidden hangers and re-pitching to the outlet",
      "Seam, corner and end-cap resealing; fascia and rafter-tail repair",
      "Downspout replacement, re-routing and extension",
    ],
  },
  {
    title: "Drainage away from the house",
    body:
      "A gutter only helps if the water it collects leaves the foundation. On a sloped lot that usually means burying the discharge and daylighting it downhill, because a splash block on a grade simply returns the water to the wall it came off.",
    points: [
      "Buried downspout lines daylighted below the structure",
      "Discharge kept clear of patios, walkways and retaining walls",
      "Coordinated with hardscape and grading when both are in scope",
    ],
  },
];

export const roofRepairSubtopics: Subtopic[] = [
  {
    title: "Roof leak repair and leak detection",
    body:
      "A ceiling stain is rarely below the hole. Water travels along decking, rafters and the top of a wall before it shows, so the first job is finding the entry point rather than patching the symptom. We inspect the roof, the attic side where it is accessible, and the details around every penetration.",
    points: [
      "Entry point traced before anything is sealed",
      "Attic-side inspection where access allows",
      "Written findings with photographs, not a verbal diagnosis",
    ],
  },
  {
    title: "Flashing repair: chimneys, sidewalls and skylights",
    body:
      "Most leaks we are called to are flashing, not field. Step flashing that was reused on a re-roof, a chimney counter-flashing that was caulked instead of cut into the mortar, and a skylight flashed without its kit account for a large share of what we open up.",
    points: [
      "Chimney step and counter-flashing cut into the masonry",
      "Sidewall, headwall and kick-out flashing at every wall termination",
      "Skylight reflashing with the manufacturer's engineered kit",
    ],
  },
  {
    title: "Attic ventilation and gable vents",
    body:
      "Ventilation is a repair item because a roof that cannot breathe cooks its own shingles and condenses moisture on the underside of the deck in winter. Intake at the eave and exhaust at the ridge have to balance; adding exhaust without intake makes the problem worse.",
    points: [
      "Intake and exhaust measured against the attic area",
      "Ridge, gable and static vent repair and replacement",
      "Bath and kitchen fans ducted outside, not into the attic",
    ],
  },
  {
    title: "Shingle and low-slope repair",
    body:
      "Blown-off tabs, creased shingles after a wind event, cracked pipe boots and failed seams on a porch or a low-slope section are all targeted repairs. Matching an aged shingle exactly is not always possible, and we tell you when a repair will be visible before we do it.",
    points: [
      "Asphalt shingle replacement, boot and vent-collar renewal",
      "TPO and membrane work on low-slope, porch and commercial roofing systems",
      "Decking replaced where the sheathing has gone soft",
    ],
  },
  {
    title: "Moss, algae and debris on shaded roofs",
    body:
      "North-facing slopes under heavy canopy stay damp for days after rain, and moss holds water against the surface. Removal is done without pressure washing, which strips granules and voids warranties, and the real fix is usually more light, better drainage, and keeping valleys and gutters clear.",
    points: [
      "Low-pressure treatment rather than pressure washing",
      "Valleys, behind chimneys and dead corners cleared",
      "Trimming and ventilation advice so it does not return next season",
    ],
  },
  {
    title: "Underlayment and moisture detail",
    body:
      "Once the surface is opened up, what sits under the shingle decides whether the fix lasts. Ice-and-water membrane at the eaves and in every valley, and a synthetic underlayment rated for this climate, are the parts nobody sees and everybody needs at elevation.",
    points: [
      "Ice-and-water membrane at eaves, valleys and penetrations",
      "Synthetic underlayment lapped and fastened to specification",
      "Vapour and condensation issues diagnosed rather than covered over",
    ],
  },
];

export const metalSubtopics: Subtopic[] = [
  {
    title: "Metal roof installation",
    body:
      "Standing seam panels are cut to the full length of the run and fastened with concealed clips, so nothing penetrates the water plane in the field of the roof. Exposed-fastener panels are through-fastened and cost less, which makes them the sensible choice on outbuildings and simple gable roofs.",
    points: [
      "Standing seam with concealed clips and on-site trim fabrication",
      "Exposed-fastener panels for barns, workshops and utility structures",
      "Snow retention planned above entries, decks and walkways",
    ],
  },
  {
    title: "Metal roof repair",
    body:
      "A metal roof is repairable in a way a shingle roof is not: a damaged panel can be replaced, a seam can be re-formed, and the fasteners on a screw-down roof are a scheduled maintenance item rather than a failure. Most calls we get on metal are fasteners, penetrations or trim, not the panel itself.",
    points: [
      "Fastener and gasket replacement on exposed-fastener roofs",
      "Panel replacement, seam repair and trim renewal",
      "Flashing at chimneys, skylights and wall terminations re-detailed",
    ],
  },
];

export const stormSubtopics: Subtopic[] = [
  {
    title: "Emergency response and tarping",
    body:
      "After a storm the first job is stopping water getting in, not agreeing a scope. A properly fastened tarp buys the time to inspect, document and price the repair without the ceiling coming down in the meantime.",
    points: [
      "Temporary tarping fastened to hold in wind, not weighted down",
      "Interior protection where water has already entered",
      "The temporary work documented as part of the claim",
    ],
  },
  {
    title: "Storm damage inspection and documentation",
    body:
      "Wind and hail damage has to be recorded the way your insurance provider expects to receive it: dated photographs, slope-by-slope notes, and the mechanism of damage described in claim language. It is the kind of record adjusters appreciate, and it is what turns an inspection into a decision.",
    points: [
      "Slope-by-slope photographic record with dates",
      "Creased shingles, lifted ridge caps, bruising and displaced flashing identified",
      "A written scope you keep, whether or not you file",
    ],
  },
  {
    title: "Insurance claim support",
    body:
      "We do not file the claim for you and we are not your adjuster. What we do is meet the adjuster on site, walk the same roof, and supply the documentation and line-item scope so the two sides are looking at one set of facts.",
    points: [
      "Adjuster meetings on site, with our findings in hand",
      "Line-item scope that maps to the carrier's estimate",
      "Supplements documented where the original scope missed work",
    ],
  },
  {
    title: "Permanent repair or replacement",
    body:
      "Once the roof is dry, the damage is documented and the claim is settled, we can move to repair. The question is whether you have localized damage or a system that has reached the end of its life. Both answers are legitimate, and the inspection tells you which one you have.",
    points: [
      "Targeted repair where the deck and the surrounding field are sound",
      "Full replacement where damage is spread across slopes",
      "Upgrades priced separately so you can see what the carrier covers",
    ],
  },
];

export const specialtySubtopics: Subtopic[] = [
  {
    title: "Slate roofing and slate repair",
    body:
      "Natural slate outlasts almost everything else on a roof and fails at the fixings long before the stone gives up. Repair work is a matter of matching thickness and colour and re-hanging with the right hook or nail, which is slow, skilled work rather than a patch.",
    points: [
      "Individual slate replacement and re-hanging",
      "Flashing, valley and hip detail renewed in copper where appropriate",
      "Honest assessment of whether a slate roof is worth restoring",
    ],
  },
  {
    title: "Cedar shake installation and repair",
    body:
      "Cedar belongs on plenty of mountain homes, and it asks for more than asphalt: a ventilated substrate so the underside can dry, stainless fixings, and an owner who accepts that it weathers. Under heavy canopy it holds moisture, which is the single biggest factor in how long it lasts here.",
    points: [
      "Shake and shingle installation over a ventilated batten system",
      "Selective replacement of split, cupped or rotted courses",
      "Treatment and maintenance guidance for shaded lots",
    ],
  },
  {
    title: "Clay and concrete tile repair",
    body:
      "Tile is uncommon in Western North Carolina but not unknown, usually on a house built in a Mediterranean or Spanish-revival style. The tiles themselves rarely fail; the underlayment beneath them does, which is why a tile repair usually means lifting, storing and re-laying rather than replacing.",
    points: [
      "Cracked and slipped tile replacement",
      "Underlayment renewal beneath re-laid tile",
      "Ridge and hip bedding re-pointed",
    ],
  },
  {
    title: "Synthetic slate and shake",
    body:
      "Brava and comparable composite systems reproduce the look of slate or cedar at a fraction of the weight, which matters when a roof structure was never framed for stone. They carry long manufacturer warranties and behave predictably in freeze-thaw.",
    points: [
      "Brava synthetic slate and shake installation",
      "A route to the slate or cedar look without reframing for the load",
      "Colour blending specified before the order, not on the roof",
    ],
  },
];

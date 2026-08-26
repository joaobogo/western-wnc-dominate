/**
 * Metal roofing price ranges for Western North Carolina, 2026.
 *
 * Published as installed ranges per roofing square (100 sq ft) so homeowners
 * can budget. They are ranges, not quotes: mountain pitch, access, decking
 * condition, and detail count move a real number inside — and occasionally
 * above — these bands. Every figure is confirmed in writing after a measured
 * on-site inspection.
 */

export interface MetalSystemCost {
  name: string;
  rangePerSquare: string;
  rangePerSqFt: string;
  lifespan: string;
  body: string;
  bestFor: string;
}

export const METAL_COST_YEAR = 2026;

export const metalSystems: MetalSystemCost[] = [
  {
    name: "Standing seam metal",
    rangePerSquare: "$1,300 – $2,100 per square installed",
    rangePerSqFt: "$13 – $21 per sq ft",
    lifespan: "40+ years when detailed correctly",
    body:
      "Concealed-fastener panels with no exposed screws in the field, cut to the full length of the run so a long mountain rake is one continuous piece. It is the most expensive metal system we install because panel material, on-site trim fabrication, and the labor to detail hips, valleys, and penetrations are all higher. Heavier gauge, striated or mechanically seamed panels, and premium Kynar finishes push toward the top of the range.",
    bestFor:
      "Primary residences, high-exposure elevations, complex rooflines, and homes in design-review communities.",
  },
  {
    name: "Exposed-fastener metal (screw-down)",
    rangePerSquare: "$650 – $1,100 per square installed",
    rangePerSqFt: "$6.50 – $11 per sq ft",
    lifespan: "30–40 years, with fastener and gasket maintenance",
    body:
      "Through-fastened panels, most common on barns, outbuildings, cabins, and simple gable roofs. It is the least expensive way to get a metal roof over your house. The trade-off is maintenance: the neoprene gaskets under those exposed screws are a wear item and need inspection as the roof ages. Cost moves with gauge, panel profile, and whether the panels land on solid decking or purlins.",
    bestFor:
      "Simple gable roofs, outbuildings, workshops, cabins, and budget-driven replacements.",
  },
  {
    name: "Metal shingles and stamped panels",
    rangePerSquare: "$1,000 – $1,700 per square installed",
    rangePerSqFt: "$10 – $17 per sq ft",
    lifespan: "40+ years",
    body:
      "Stamped steel or aluminum panels that read as shake, slate, or tile from the ground while behaving like metal in the weather. Installed piece by piece rather than in long runs, so labor is a larger share of the number than on standing seam — but they hide roof-plane irregularities on older mountain homes better than a long panel does.",
    bestFor:
      "Historic districts, roofs with many small planes, and homeowners who want a metal roof that does not read as metal.",
  },
];

export interface MetalCostFactor {
  title: string;
  body: string;
}

export const metalCostFactors: MetalCostFactor[] = [
  {
    title: "Pitch",
    body:
      "Past roughly 7/12 the crew can no longer walk the roof. Staging, fall protection, and a slower production rate get added to every square. Steep mountain roofs routinely add 10–20% over the same panel on a walkable roof.",
  },
  {
    title: "Site access",
    body:
      "Standing seam panels arrive long or get roll-formed on site, and both need a place to stage them. Narrow gravel switchbacks, tight tree lines, and steep drives mean material and debris move by hand instead of by truck — on some lots this costs more than the upgrade from shingle to metal.",
  },
  {
    title: "Snow guards and snow retention",
    body:
      "Metal sheds snow in sheets. Anywhere a roof plane discharges over an entry, walkway, deck, drive, or gas meter, engineered snow retention is not optional. Budget roughly $12–$25 per linear foot of retention, depending on the system and the elevation-driven load calculation.",
  },
  {
    title: "Decking and underlayment",
    body:
      "Metal needs a flat, sound deck and a high-temperature synthetic underlayment. We agree on a per-sheet decking rate before tear-off so rot discovered underneath is billed at a number you already approved. High-elevation roofs also get wider ice-and-water coverage at eaves and valleys.",
  },
  {
    title: "Detail count",
    body:
      "Valleys, dormers, chimneys, skylights, and roof-to-wall transitions carry custom-bent flashing on a metal roof. Labor follows the detail count, not the footprint — two homes with identical square footage can sit a full tier apart.",
  },
  {
    title: "Tear-off versus overlay",
    body:
      "Removing one layer of asphalt is normal and priced in. A second layer, or a roof with soft decking under it, adds disposal and carpentry. We do not recommend laying metal over a compromised deck to save on tear-off.",
  },
];

/** Answer-first summary used by the cost page and the metal service page. */
export const metalCostAnswer =
  `Most metal roofs in Western North Carolina cost $650 to $2,100 per installed square (100 sq ft) in ${METAL_COST_YEAR}. Exposed-fastener panels run $650–$1,100, metal shingles $1,000–$1,700, and standing seam $1,300–$2,100. Steep pitch, hard driveway access, snow retention, and decking repairs push a mountain project toward the top of that range.`;

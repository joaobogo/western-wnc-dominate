import metal005 from "@/assets/gallery/metal-005.webp";
import asphaltHero from "@/assets/gallery/asphalt-hero.webp";
import cedar004 from "@/assets/gallery/cedar-005.webp";
import bravaGlenvilleAerial from "@/assets/gallery/brava-glenville-aerial.webp";
import bravaGlenvilleChimney from "@/assets/gallery/brava-glenville-chimney-valley.webp";
import bravaGlenvilleBeforeRidge from "@/assets/gallery/brava-glenville-before-ridge.webp";
import bravaGlenvilleBeforeHips from "@/assets/gallery/brava-glenville-before-hips.webp";
import bravaGlenvilleTopDown from "@/assets/gallery/brava-glenville-top-down.webp";
import additionFranklinRoom from "@/assets/gallery/addition-franklin-vaulted-room.webp";
import additionFranklinWindows from "@/assets/gallery/addition-franklin-gable-windows.webp";
import deckSylvaDoors from "@/assets/gallery/deck-sylva-doors-wide.webp";
import deckSylvaRun from "@/assets/gallery/deck-sylva-run.webp";
import deckSylvaJoists from "@/assets/gallery/deck-sylva-new-joists.webp";

export interface ProjectDetail {
  slug: string;
  title: string;
  type: string;
  category: "roofing" | "construction";
  heroImage: string;
  /** CSS object-position for the wide project hero, so the crop lands on the subject. */
  heroPosition?: string;
  /** Optional photo for cards and carousels when the hero is too wide to crop well. */
  cardImage?: string;
  location: string;
  county: string;
  elevation?: string;
  scope: string;
  duration: string;
  highlight: string;
  summary: string;
  challenge: string;
  scopeOfWork: string[];
  materials: Array<{ name: string; detail: string }>;
  processHighlights: string[];
  result: string;
  galleryImages: string[];
  testimonial?: {
    quote: string;
    name: string;
    location: string;
  };
  beforeAfter?: {
    before: string;
    after: string;
    beforeLabel?: string;
    afterLabel?: string;
    whatChanged: string;
    whyItMattered: string;
    highlanderDifference: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: "standing-seam-metal-dark-bronze-highlands",
    title: "Standing Seam Metal: Dark Bronze",
    type: "Metal Roofing",
    category: "roofing",
    heroImage: metal005,
    location: "Highlands, NC",
    county: "Macon County",
    elevation: "4,118 ft",
    scope: "3,200 sq ft roof replacement",
    duration: "8 days",
    highlight: "Custom-fabricated panels for 12/12 pitch",
    summary: "A complex multi-gable standing seam metal roof replacement on a mountain estate in Highlands. The steep 12/12 pitch and multiple roof intersections required custom-fabricated panels and careful metal-roofing installation — craftsmanship that gets a roof like this done right.",
    challenge: "The existing roof had suffered years of accelerated wear from Highlands' extreme UV exposure and freeze-thaw cycles at 4,100+ feet. Multiple prior patch repairs had compromised flashing integrity, and the complex gable geometry demanded custom panel fabrication for every intersection.",
    scopeOfWork: [
      "Complete tear-off of existing metal roofing system",
      "Full deck inspection and repair of damaged sheathing",
      "Installation of high-temp ice & water shield on all valleys and eaves",
      "Custom-fabricated 24-gauge standing seam panels in Dark Bronze",
      "Precision trim work on 8 gable intersections",
      "Ridge vent installation for improved attic ventilation",
      "Copper accent details on ridge caps",
    ],
    materials: [
      { name: "24-Gauge Standing Seam Panels", detail: "Dark Bronze Kynar 500 finish — manufacturer color warranty" },
      { name: "Grace Ice & Water Shield", detail: "High-temp underlayment on valleys, eaves, and penetrations" },
      { name: "Custom Ridge Caps", detail: "Fabricated on-site for seamless geometry matching" },
      { name: "Copper Accent Details", detail: "Ridge cap accents for premium visual finish" },
    ],
    processHighlights: [
      "Pre-project drone survey to map all roof intersections and panel measurements",
      "Custom panel fabrication at our shop — eliminating on-site cutting waste",
      "Staggered installation sequence to maintain weather protection throughout",
      "Daily photo documentation shared with homeowner",
      "Final drone inspection to verify every panel seam and flashing detail",
    ],
    result: "The completed installation replaced the patched roof with a coordinated 24-gauge standing-seam system and new flashing details. Applicable manufacturer finish and material warranty terms are documented for the selected panels and project.",
    galleryImages: [metal005],
    seo: {
      title: "Standing Seam Metal Roof — Highlands, NC | Highlander Building Services",
      description: "Custom dark bronze standing seam metal roof on a mountain estate in Highlands, NC. 3,200 sq ft, 12/12 pitch, 8 gable intersections. See the full project story.",
    },
  },
  {
    slug: "certainteed-landmark-weathered-wood-waynesville",
    title: "CertainTeed Landmark: Weathered Wood",
    type: "Asphalt Shingles",
    category: "roofing",
    heroImage: asphaltHero,
    location: "Waynesville, NC",
    county: "Haywood County",
    elevation: "2,800 ft",
    scope: "4,100 sq ft roof replacement",
    duration: "4 days",
    highlight: "CertainTeed Landmark system: Weathered Wood",
    summary: "Full dimensional shingle replacement on a multi-level mountain home in Waynesville using CertainTeed Landmark shingles in Weathered Wood. Highlander is a CertainTeed Credentialed Contractor; applicable warranty eligibility and terms are confirmed for the specific project.",
    challenge: "The existing 3-tab shingles were 22 years old and showing widespread granule loss and curling. The multi-level roofline with screen porch integration required careful sequencing to protect the home during replacement.",
    scopeOfWork: [
      "Complete tear-off of 22-year-old 3-tab shingles",
      "Full deck inspection — replaced 12 sheets of damaged OSB",
      "CertainTeed DiamondDeck synthetic underlayment",
      "CertainTeed Landmark dimensional shingles — Weathered Wood",
      "Ridge vent replacement and upgraded attic ventilation",
      "Screen porch roofing integration",
      "Gutter cleaning and re-attachment",
    ],
    materials: [
      { name: "CertainTeed Landmark", detail: "Weathered Wood — Manufacturer limited warranty" },
      { name: "DiamondDeck Underlayment", detail: "Synthetic — superior tear resistance vs. felt" },
      { name: "CertainTeed Starter Strip", detail: "SwiftStart — adhesive activated starter shingles" },
      { name: "Ridge Vent", detail: "Low-profile ridge vent for improved airflow" },
    ],
    processHighlights: [
      "Magnetic nail sweep of entire property perimeter before and after tear-off",
      "Tarped landscaping and protected all exterior surfaces",
      "Completed in 4 days despite complex multi-level geometry",
      "Applicable CertainTeed warranty eligibility reviewed and documented for the selected roofing system",
    ],
    result: "The Weathered Wood dimensional shingle system replaced the aging 3-tab roof and was paired with decking repair and ventilation work documented in the project scope. Applicable manufacturer and workmanship warranty terms are confirmed in the project documentation.",
    galleryImages: [asphaltHero],
    seo: {
      title: "CertainTeed Landmark Roof Replacement — Waynesville, NC | Highlander",
      description: "4,100 sq ft CertainTeed Landmark shingle replacement in Waynesville, NC. Completed in 4 days. See the full project story.",
    },
  },
  {
    slug: "cedar-shake-estate-highlands",
    title: "Cedar Shake: Estate Home",
    type: "Cedar Shake",
    category: "roofing",
    heroImage: cedar004,
    location: "Highlands, NC",
    county: "Macon County",
    elevation: "4,200 ft",
    scope: "Premium cedar shake installation",
    duration: "14 days",
    highlight: "Hand-selected cedar with copper ridge accents",
    summary: "Cedar shake roof installation on a Highlands estate with multi-gable geometry, copper ridge accents, selected cedar shakes, and preservative treatment intended to support durability and curb appeal in mountain conditions.",
    challenge: "The homeowner wanted authentic cedar-shake aesthetics on a complex estate roofline at roughly 4,200 feet, where UV exposure, moisture, and temperature swings can accelerate cedar weathering and make ventilation and flashing details especially important.",
    scopeOfWork: [
      "Hand-selection of premium #1 Blue Label cedar shakes",
      "Natural preservative treatment applied before installation",
      "Full ice & water shield underlayment system",
      "Custom copper ridge cap fabrication",
      "Copper valley lining on all major valleys",
      "Spaced sheathing for proper shake ventilation",
      "14-day phased installation with daily weather monitoring",
    ],
    materials: [
      { name: "#1 Blue Label Cedar Shakes", detail: "Hand-selected, straight grain, premium grade" },
      { name: "Natural Preservative Treatment", detail: "UV and moisture protection applied pre-installation" },
      { name: "Copper Ridge Caps", detail: "Custom-fabricated for each ridge line" },
      { name: "Copper Valley Liners", detail: "20-oz copper used for durable valley detailing" },
    ],
    processHighlights: [
      "Each shake bundle hand-inspected for grain quality and defects",
      "Custom spaced sheathing system for optimal shake ventilation",
      "Weather windows carefully planned across 14-day installation",
      "Copper work fabricated and fitted to the project geometry",
      "Final walkthrough documented with project photographs",
    ],
    result: "The completed cedar shake roof transformed the estate into one of the most visually striking properties in Highlands. The copper accents will develop a natural patina over time, deepening the roof's character. The preservative treatment and spaced sheathing system are designed to extend the cedar's lifespan well beyond typical mountain installations.",
    galleryImages: [cedar004],
    seo: {
      title: "Cedar Shake Roof — Highlands Estate | Highlander Building Services",
      description: "Premium cedar shake installation on a luxury Highlands estate. Hand-selected cedar, copper ridge accents, 14-day phased installation. See the full project story.",
    },
  },
  {
    slug: "brava-synthetic-shake-glenville",
    title: "Brava Synthetic Shake: Lake Glenville Re-Roof",
    type: "Synthetic Shake",
    category: "roofing",
    heroImage: bravaGlenvilleAerial,
    cardImage: bravaGlenvilleChimney,
    heroPosition: "50% 50%",
    location: "Lake Glenville, NC",
    county: "Jackson County",
    elevation: "3,494 ft",
    scope: "80+ square wood shake tear-off and Brava synthetic shake re-roof",
    duration: "About 2½ weeks",
    highlight: "Brava synthetic cedar shake in New Cedar with 10 new VELUX skylights",
    summary: "Longtime Highlander customers in Glenville's Stillpoint community wanted to keep the look of cedar shake without its upkeep. Working with Luke Smith, they replaced more than 80 squares of aging wood shake with Brava synthetic cedar shake in New Cedar, ten new VELUX skylights, and an upgraded ventilation system.",
    challenge: "The original wood shake had aged out under the surrounding pines, which held needles and moisture against the roof. The home is large, with steep pitches, intricate valleys and a long carport run, and a 36–48 hour storm arrived in the middle of the tear-off.",
    scopeOfWork: [
      "Staged tear-off of the existing wood shake roof (80+ squares), dried in the same day",
      "New 3/4\" OSB decking across the roof",
      "Full ice and water shield coverage, topped with SolarHide Class A fire-rated underlayment",
      "Brava synthetic cedar shake in New Cedar, with solid shakes in the high-visibility areas",
      "Brown metal valleys and drip edge, with turned-back returns on the valley metal ends",
      "Ten new VELUX skylights with handheld remote controls",
      "About 80 feet of new ridge vent and ridge cap over added ridge decking",
      "Unused satellite dish, pipe and boot removed; new roof-mounted range vent installed",
    ],
    materials: [
      { name: "Brava Synthetic Cedar Shake", detail: "New Cedar — composite shake with the texture of real wood" },
      { name: "SolarHide Underlayment", detail: "Class A fire-rated, over full ice and water shield" },
      { name: "VELUX Skylights", detail: "Ten new units with remote operation" },
      { name: "Brown Metal Valleys & Drip Edge", detail: "Turned-back returns at the valley metal ends" },
    ],
    processHighlights: [
      "Each section was dried in the same day it was torn off, so the home was never left open",
      "The roof was secured ahead of a two-day storm with extra underlayment fastening, sealed ridges, and ice and water shield tucked high under the chimney counter flashing",
      "Extra decking was added at the ridges to give the ridge cap a solid fastening base",
      "The site was cleaned throughout the job and again at completion",
    ],
    result: "The home now carries the warm look of cedar shake on a synthetic system with new decking, full ice and water protection, a Class A fire-rated underlayment, and ten new VELUX skylights. To keep the roof clear of pine needles, the homeowners signed up for Highlander's spring and fall roof and gutter maintenance visits.",
    galleryImages: [bravaGlenvilleAerial, bravaGlenvilleChimney, bravaGlenvilleTopDown, bravaGlenvilleBeforeRidge, bravaGlenvilleBeforeHips],
    beforeAfter: {
      before: bravaGlenvilleBeforeRidge,
      after: bravaGlenvilleChimney,
      beforeLabel: "Aging Wood Shake Under Pine Needles",
      afterLabel: "Brava Synthetic Shake: New Cedar",
      whatChanged: "More than 80 squares of worn wood shake came off in stages, and the roof was rebuilt with new 3/4\" decking, full ice and water shield, Class A fire-rated underlayment, Brava synthetic shake, brown metal valleys and drip edge, new ridge ventilation and ten VELUX skylights.",
      whyItMattered: "The old shake was holding pine needles and moisture against the roof, and the homeowners wanted the look of cedar without the maintenance real wood needs under heavy pine cover.",
      highlanderDifference: "Every section was dried in the day it was opened, the roof was secured ahead of a two-day storm, and the steep, complex sections were finished with solid shakes where they are most visible.",
    },
    seo: {
      title: "Brava Synthetic Shake Re-Roof in Glenville, NC | Highlander",
      description: "80+ square wood shake tear-off and Brava synthetic shake re-roof with 10 VELUX skylights near Lake Glenville, NC. See the full project story.",
    },
  },
  {
    slug: "living-room-addition-franklin",
    title: "Living Room Addition: Vaulted Gable & Stone Fireplace",
    type: "Home Addition",
    category: "construction",
    heroImage: additionFranklinRoom,
    cardImage: additionFranklinWindows,
    heroPosition: "50% 60%",
    location: "Franklin, NC",
    county: "Macon County",
    elevation: "2,119 ft",
    scope: "Engineered living room addition with a vaulted gable, stone chimney and fireplace",
    duration: "Late February – August 2026",
    highlight: "Engineered LVL gable, stone fireplace and a wall of mountain-view windows",
    summary: "Franklin homeowners already working with Highlander on their interior wanted more room to enjoy their mountain views. Highlander replaced an old deck area with a new living room addition: a block foundation, an engineered vaulted gable, a floor-to-ceiling stone fireplace, and a wall of windows topped with custom gable glass.",
    challenge: "The addition had to tie into an existing roof built on engineered trusses, an existing deck and a second-floor balcony. A structural engineer reviewed the roof system on site, and the new gable was framed to the engineer's plans with LVL beams.",
    scopeOfWork: [
      "Demolition of the old deck area and debris haul-off",
      "Permitted CMU block foundation finished in stucco, with crawl space vents and a custom access door",
      "Floor, walls and gable roof framed to a structural engineer's plans with LVL beams",
      "New stone chimney and a floor-to-ceiling stone fireplace with firewood storage and built-in shelving",
      "New windows and exterior door, with custom glass panes in the gable above the windows",
      "Cedar shake and lap siding, soffit, fascia, shingles, black gutters and ridge ventilation",
      "Insulation, knockdown-texture drywall, stained tongue-and-groove ceiling and a wrapped LVL beam",
      "Original deck tied into the addition and the second-floor balcony railing rebuilt",
    ],
    materials: [
      { name: "Engineered LVL Beams", detail: "Sized by a structural engineer for the vaulted gable" },
      { name: "Stone Chimney & Fireplace", detail: "Stone on the roof end and floor-to-ceiling inside" },
      { name: "Tongue-and-Groove Ceiling", detail: "Stained wood with a stained, wrapped beam through the vault" },
      { name: "Cedar Shake & Lap Siding", detail: "Exterior finish with black gutters and downspouts" },
    ],
    processHighlights: [
      "A structural engineer met on site and confirmed the existing roof system before framing",
      "Permits pulled, and the insulation inspection passed",
      "A cricket was built at the chimney before roofing",
      "Final walkthrough, cleanup and photo documentation at completion",
    ],
    result: "The new room opens under a stained wood vault, with a stone fireplace at one end and tall windows and gable glass framing the mountain view at the other. Outside, cedar shake and lap siding, black gutters and a tied-in deck make the addition read as part of the original home.",
    galleryImages: [additionFranklinRoom, additionFranklinWindows],
    seo: {
      title: "Living Room Addition in Franklin, NC | Highlander",
      description: "Engineered living room addition in Franklin, NC with a vaulted gable, stone fireplace and mountain-view windows. See the full project story.",
    },
  },
  {
    slug: "deck-railing-rebuild-sylva",
    title: "Deck & Railing Rebuild: Elevated Wooded Deck",
    type: "Deck Rebuild",
    category: "construction",
    heroImage: deckSylvaDoors,
    cardImage: deckSylvaRun,
    location: "Sylva, NC",
    county: "Jackson County",
    elevation: "2,037 ft",
    scope: "Full deck board replacement, joist replacement and railing rebuild",
    duration: "Completed early May 2026",
    highlight: "New joists, new deck boards and a railing rebuilt from the posts up",
    summary: "A Sylva homeowner's elevated back deck had worn boards underfoot and a tired railing. When the crew pulled up the old decking they found the framing needed attention too, so they replaced the joists before laying new pressure-treated boards across the full length of the deck, then rebuilt the railing from the posts up.",
    challenge: "The deck is elevated above a wooded slope. Once the old boards came up, the joists underneath were deteriorated, and covering them with new boards would only have hidden the problem.",
    scopeOfWork: [
      "Deteriorated joists under the elevated deck replaced to give the new deck a solid base",
      "New pressure-treated deck boards installed across the full length of the deck",
      "Old railing system removed",
      "11 new 6x6 posts set to anchor the new railing",
      "New treated top and bottom rails framed",
      "About 270 new 42-inch pressure-treated balusters installed",
      "Everything fastened with structural timber screws",
      "Final walkthrough, finish details and site cleanup",
    ],
    materials: [
      { name: "Pressure-Treated Deck Boards", detail: "Laid across the full length of the elevated deck" },
      { name: "6x6 Railing Posts", detail: "11 new posts anchoring the rebuilt railing" },
      { name: "42-Inch Balusters", detail: "About 270 new pressure-treated balusters" },
      { name: "Structural Timber Screws", detail: "Used throughout for long-term strength" },
    ],
    processHighlights: [
      "The crew replaced the joists as soon as the framing problem was found, rather than covering it",
      "The railing was rebuilt from new posts up, not patched",
      "Highlander's project manager returned for a final walkthrough and finish details",
      "The site was left clean at completion",
    ],
    result: "The elevated deck now sits on sound framing, with fresh pressure-treated boards and a rebuilt railing, ready for many more seasons in the trees of the North Carolina mountains.",
    galleryImages: [deckSylvaDoors, deckSylvaRun, deckSylvaJoists],
    seo: {
      title: "Deck & Railing Rebuild in Sylva, NC | Highlander",
      description: "Elevated deck rebuild in Sylva, NC: new joists, new pressure-treated boards and a railing rebuilt from the posts up. See the full project story.",
    },
  },
];

export const getProjectBySlug = (slug: string): ProjectDetail | undefined =>
  projectDetails.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: "roofing" | "construction"): ProjectDetail[] =>
  projectDetails.filter((p) => p.category === category);

export const getProjectsByLocation = (location: string): ProjectDetail[] =>
  projectDetails.filter((p) => p.location.includes(location));

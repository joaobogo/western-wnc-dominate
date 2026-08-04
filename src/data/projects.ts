import metal005 from "@/assets/gallery/metal-005.webp";
import metal006 from "@/assets/gallery/metal-006.webp";
import metal008 from "@/assets/gallery/metal-008.webp";
import metal003 from "@/assets/gallery/metal-003.webp";
import asphalt008 from "@/assets/gallery/asphalt-008.webp";
import asphalt007 from "@/assets/gallery/asphalt-007.webp";
import asphalt006 from "@/assets/gallery/asphalt-006.webp";
import asphaltHero from "@/assets/gallery/asphalt-hero.webp";
import asphalt002 from "@/assets/gallery/asphalt-002.webp";
import cedar004 from "@/assets/gallery/cedar-005.webp";
import asphalt001 from "@/assets/gallery/asphalt-001.webp";
import asphalt003 from "@/assets/gallery/asphalt-003.webp";
import metal009 from "@/assets/gallery/metal-010.webp";
import metal010 from "@/assets/gallery/metal-010.webp";

export interface ProjectDetail {
  slug: string;
  title: string;
  type: string;
  category: "roofing" | "construction";
  heroImage: string;
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
    title: "Standing Seam Metal — Dark Bronze",
    type: "Metal Roofing",
    category: "roofing",
    heroImage: metal005,
    location: "Highlands, NC",
    county: "Macon County",
    elevation: "4,118 ft",
    scope: "3,200 sq ft roof replacement",
    duration: "8 days",
    highlight: "Custom-fabricated panels for 12/12 pitch",
    summary: "A complex multi-gable standing seam metal roof replacement on a mountain estate in Highlands. The steep 12/12 pitch and multiple roof intersections required custom-fabricated panels and precision installation by our most experienced metal crew.",
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
    result: "The completed installation transformed the property's curb appeal and eliminated the chronic leak issues. The 24-gauge Kynar 500 panels carry a manufacturer color warranty and are engineered for the UV intensity and temperature swings at 4,100 feet. The homeowner reported zero issues through their first full winter season.",
    galleryImages: [metal005, metal006, metal008, metal003],
    testimonial: {
      quote: "We've used Highlander for two properties now. Their standing seam metal work is exceptional and they genuinely understand the mountain climate challenges. Five stars every time.",
      name: "Linda K.",
      location: "Cashiers, NC",
    },
    beforeAfter: {
      before: metal009,
      after: metal005,
      beforeLabel: "Worn Metal — Patched & Leaking",
      afterLabel: "24-Gauge Standing Seam — Dark Bronze",
      whatChanged: "Complete removal of deteriorated metal roofing with multiple failed patch repairs. Replaced with custom-fabricated 24-gauge standing seam panels, new underlayment system, and precision-fitted trim on all 8 gable intersections.",
      whyItMattered: "The existing roof was leaking at multiple points, causing interior damage and compromising the home's envelope integrity at 4,100 feet elevation. Every winter freeze-thaw cycle worsened the problem.",
      highlanderDifference: "Custom panel fabrication eliminated field-cutting waste and ensured precision fit. Pre-project drone survey mapped every intersection. Staggered installation maintained weather protection throughout the 8-day project.",
    },
    seo: {
      title: "Standing Seam Metal Roof — Highlands, NC | Highlander Roofing",
      description: "Custom dark bronze standing seam metal roof on a mountain estate in Highlands, NC. 3,200 sq ft, 12/12 pitch, 8 gable intersections. See the full project story.",
    },
  },
  {
    slug: "certainteed-landmark-weathered-wood-waynesville",
    title: "CertainTeed Landmark — Weathered Wood",
    type: "Asphalt Shingles",
    category: "roofing",
    heroImage: asphaltHero,
    location: "Waynesville, NC",
    county: "Haywood County",
    elevation: "2,800 ft",
    scope: "4,100 sq ft roof replacement",
    duration: "4 days",
    highlight: "CertainTeed SureStart PLUS™ warranty",
    summary: "Full dimensional shingle replacement on a multi-level mountain home in Waynesville. CertainTeed Landmark shingles in Weathered Wood with enhanced warranty coverage available through our ShingleMaster Credentialed Contractor certification.",
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
      "Enhanced SureStart PLUS™ warranty activated through ShingleMaster Credentialed Contractor certification",
    ],
    result: "The Weathered Wood color perfectly complements the home's mountain setting, and the dimensional profile is a dramatic visual upgrade from the flat 3-tab shingles. The SureStart PLUS™ warranty provides both material and workmanship coverage directly from CertainTeed — a tier only available through certified ShingleMaster Credentialed Contractors.",
    galleryImages: [asphaltHero, asphalt007, asphalt006, asphalt008],
    testimonial: {
      quote: "After three bad experiences with other contractors, we were skeptical. Highlander changed that completely. James came out personally, gave an honest assessment — no pressure, no upselling. The install crew was clean, fast, and meticulous.",
      name: "Karen W.",
      location: "Waynesville, NC",
    },
    beforeAfter: {
      before: asphalt003,
      after: asphaltHero,
      beforeLabel: "22-Year-Old 3-Tab — Granule Loss & Curling",
      afterLabel: "CertainTeed Landmark — Weathered Wood",
      whatChanged: "Full replacement of deteriorated 3-tab shingles with CertainTeed Landmark dimensional shingles. 12 sheets of damaged decking replaced. Ventilation system upgraded. Screen porch roof integrated seamlessly.",
      whyItMattered: "The aging 3-tab shingles had lost most of their protective granules, leaving the home vulnerable to water infiltration. Multiple areas showed curling and lifting, particularly on the north-facing slope.",
      highlanderDifference: "ShingleMaster Credentialed Contractor certification unlocked CertainTeed's strongest warranty tier. 4-day completion on a complex multi-level home. Magnetic nail sweep protected the entire property.",
    },
    seo: {
      title: "CertainTeed Landmark Roof Replacement — Waynesville, NC | Highlander",
      description: "4,100 sq ft CertainTeed Landmark shingle replacement in Waynesville, NC. Completed in 4 days with SureStart PLUS™ warranty. See the full project story.",
    },
  },
  {
    slug: "cedar-shake-estate-highlands",
    title: "Cedar Shake — Estate Home",
    type: "Cedar Shake",
    category: "roofing",
    heroImage: cedar004,
    location: "Highlands, NC",
    county: "Macon County",
    elevation: "4,200 ft",
    scope: "Premium cedar shake installation",
    duration: "14 days",
    highlight: "Hand-selected cedar with copper ridge accents",
    summary: "Stunning cedar shake roof on a luxury estate in Highlands. Intricate multi-gable design with copper ridge accents. Hand-selected premium cedar with natural preservative treatment for maximum longevity at elevation.",
    challenge: "The homeowner wanted authentic cedar shake aesthetics on a complex estate roofline while ensuring longevity at 4,200 feet — where UV intensity, moisture, and temperature extremes accelerate cedar degradation. Standard cedar installations at this elevation often fail within 15 years.",
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
      { name: "Copper Valley Liners", detail: "20-oz copper for permanent valley protection" },
    ],
    processHighlights: [
      "Each shake bundle hand-inspected for grain quality and defects",
      "Custom spaced sheathing system for optimal shake ventilation",
      "Weather windows carefully planned across 14-day installation",
      "Copper work fabricated and fitted by specialist crew",
      "Final walkthrough with homeowner documented in 40+ photographs",
    ],
    result: "The completed cedar shake roof transformed the estate into one of the most visually striking properties in Highlands. The copper accents will develop a natural patina over time, deepening the roof's character. The preservative treatment and spaced sheathing system are designed to extend the cedar's lifespan well beyond typical mountain installations.",
    galleryImages: [cedar004, asphalt007, metal006],
    seo: {
      title: "Cedar Shake Roof — Highlands Estate | Highlander Roofing",
      description: "Premium cedar shake installation on a luxury Highlands estate. Hand-selected cedar, copper ridge accents, 14-day phased installation. See the full project story.",
    },
  },
];

export const getProjectBySlug = (slug: string): ProjectDetail | undefined =>
  projectDetails.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: "roofing" | "construction"): ProjectDetail[] =>
  projectDetails.filter((p) => p.category === category);

export const getProjectsByLocation = (location: string): ProjectDetail[] =>
  projectDetails.filter((p) => p.location.includes(location));

import { BUSINESS, BusinessLocation, FRANKLIN, SYLVA, formatPhoneDisplay, napLine } from "./business";
import { photosForTowns, type LocalProjectPhoto } from "./local-project-photos";

/**
 * Physical showroom (location) pages — distinct from service-area pages.
 *
 * A service-area page answers "do you work in my town?". A location page
 * answers "where can I walk in, park, and touch the materials?". Every
 * NAP value here is derived from `src/data/business.ts`; nothing is retyped.
 */
export interface ShowroomTown {
  /** Town label as shown in UI. */
  name: string;
  /** Service-area page slug, e.g. "sylva-nc". */
  slug: string;
  /** Approximate drive time from this showroom. */
  drive: string;
}

export interface Showroom {
  id: BusinessLocation["id"];
  /** URL slug under /locations. */
  slug: "franklin-nc" | "sylva-nc";
  path: string;
  location: BusinessLocation;
  /** County the showroom itself sits in. */
  county: string;
  h1: string;
  /** Short label used in cards and navigation. */
  cardLabel: string;
  metaTitle: string;
  metaDescription: string;
  /** AEO quick-answer paragraph. */
  answer: string;
  intro: string[];
  /** Landmark-based orientation for the drive in. */
  gettingHere: string[];
  parking: string;
  /** What is physically on display. */
  onDisplay: { name: string; detail: string }[];
  /** What a visit covers. */
  visitAgenda: string[];
  towns: ShowroomTown[];
  photos: LocalProjectPhoto[];
  faqs: { question: string; answer: string }[];
}

const franklinTowns: ShowroomTown[] = [
  { name: "Franklin", slug: "franklin-nc", drive: "in town" },
  { name: "Highlands", slug: "highlands-nc", drive: "about 45 minutes" },
  { name: "Cashiers", slug: "cashiers-nc", drive: "about 1 hour" },
  { name: "Scaly Mountain", slug: "scaly-mountain-nc", drive: "about 35 minutes" },
  { name: "Otto", slug: "otto-nc", drive: "about 20 minutes" },
  { name: "Hayesville", slug: "hayesville-nc", drive: "about 45 minutes" },
  { name: "Murphy", slug: "murphy-nc", drive: "about 1 hour 10 minutes" },
  { name: "Lake Toxaway", slug: "lake-toxaway-nc", drive: "about 1 hour 15 minutes" },
  { name: "Sapphire", slug: "sapphire-nc", drive: "about 1 hour 10 minutes" },
];

const sylvaTowns: ShowroomTown[] = [
  { name: "Sylva", slug: "sylva-nc", drive: "in town" },
  { name: "Dillsboro", slug: "dillsboro-nc", drive: "about 5 minutes" },
  { name: "Cullowhee", slug: "cullowhee-nc", drive: "about 15 minutes" },
  { name: "Bryson City", slug: "bryson-city-nc", drive: "about 25 minutes" },
  { name: "Cherokee", slug: "cherokee-nc", drive: "about 25 minutes" },
  { name: "Waynesville", slug: "waynesville-nc", drive: "about 25 minutes" },
  { name: "Lake Glenville", slug: "lake-glenville-nc", drive: "about 30 minutes" },
  { name: "Asheville", slug: "asheville-nc", drive: "about 50 minutes" },
];

const ON_DISPLAY = [
  {
    name: "Metal roofing panels",
    detail:
      "Standing seam and exposed-fastener profiles in the colors we install most in the mountains, so you can see how a finish reads in daylight instead of guessing from a chip card.",
  },
  {
    name: "Dimensional shingles",
    detail:
      "Full CertainTeed shingle boards, including the Landmark colors that hold up best under long shade, freeze-thaw cycles, and heavy pine debris.",
  },
  {
    name: "Brava composite shake and slate",
    detail:
      "Synthetic shake and slate samples you can pick up and flex — the usual answer for homeowners who want a cedar or slate look with far less maintenance.",
  },
  {
    name: "VELUX skylights",
    detail:
      "Skylight units and flashing kits laid out so you can see the curb, the glass, and how the flashing ties into a metal or shingle field.",
  },
  {
    name: "Gutter and trim profiles",
    detail:
      "Seamless gutter stock, oversized downspouts, and fascia trim in the sizes we spec for mountain rainfall and roof runoff.",
  },
  {
    name: "Siding and exterior samples",
    detail:
      "Siding, soffit, and stone-accent samples for renovation and addition projects handled by our construction division.",
  },
];

const VISIT_AGENDA = [
  "Sit down with a real estimator — not a call-center script — and walk through your roof photos or plans.",
  "Compare materials side by side under the same light, with honest notes on what each one costs to maintain up here.",
  "Review a written scope line by line so you know exactly what is included before anything is signed.",
  "Talk through insurance and storm-damage paperwork if a claim is part of your project.",
  "Get your questions answered on timing, crew size, and how we protect the property during the work.",
];

export const showrooms: Showroom[] = [
  {
    id: "franklin",
    slug: "franklin-nc",
    path: "/locations/franklin-nc",
    location: FRANKLIN,
    county: "Macon County",
    cardLabel: "Franklin Showroom",
    h1: "Roofing & Construction Showroom in Franklin, NC",
    metaTitle: "Roofing & Construction Showroom in Franklin, NC | Highlander",
    metaDescription: `Visit our Franklin roofing and construction showroom at ${napLine(FRANKLIN)}. Compare materials in person. Call ${formatPhoneDisplay(FRANKLIN.phoneE164)}.`,
    answer: `The Highlander Building Services showroom in Franklin is at ${napLine(FRANKLIN)}, open Monday through Friday, 8:00 AM to 5:00 PM. It is our main office for Macon County and the Highlands–Cashiers plateau, where you can see metal panels, dimensional shingles, Brava composite shake, and VELUX skylights in person and meet the estimator who will handle your project.`,
    intro: [
      "Franklin is where Highlander started and where our main office still runs. It is a working showroom attached to a working construction company — the same building where scopes get written, crews get dispatched, and material orders get staged before they head up the mountain.",
      "That matters when you are choosing a roof. Instead of scrolling color swatches on a phone, you can stand a bronze standing seam panel next to a weathered wood shingle board and see which one actually suits your house, your tree cover, and your elevation.",
    ],
    gettingHere: [
      "The showroom sits in the commercial area just off the US 441 / US 64 corridor through Franklin, a few minutes from downtown.",
      "Coming from Highlands or Cashiers, follow US 64 west into Franklin and stay on it through town.",
      "Coming from Otto or the Georgia line, take US 441 north into Franklin.",
    ],
    parking: "Free off-street parking directly at the building, with a level walk to the entrance.",
    onDisplay: ON_DISPLAY,
    visitAgenda: VISIT_AGENDA,
    towns: franklinTowns,
    photos: photosForTowns(["Franklin", "Highlands", "Cashiers", "Scaly Mountain", "Otto"], 8),
    faqs: [
      {
        question: "Do I need an appointment to visit the Franklin showroom?",
        answer:
          "No. The Franklin showroom is open Monday through Friday, 8:00 AM to 5:00 PM, and you are welcome to walk in. Calling ahead simply means the estimator who covers your area is waiting for you instead of out on a roof.",
      },
      {
        question: "What can I actually see at the Franklin showroom?",
        answer:
          "Metal roofing panels in standing seam and exposed-fastener profiles, full CertainTeed dimensional shingle boards, Brava composite shake and slate samples, VELUX skylight units, seamless gutter and trim profiles, and siding samples for renovation work.",
      },
      {
        question: "Is the Franklin location an office or a retail store?",
        answer:
          "It is our main office with a materials showroom inside it. We do not sell loose materials over the counter — the samples are there so homeowners and builders can choose finishes for a project we install.",
      },
      {
        question: "Which areas does the Franklin showroom cover?",
        answer:
          "Franklin, Otto, Scaly Mountain, Highlands, Cashiers, Sapphire, Lake Toxaway, Hayesville, and Murphy — most of Macon County plus the plateau and the far western counties.",
      },
    ],
  },
  {
    id: "sylva",
    slug: "sylva-nc",
    path: "/locations/sylva-nc",
    location: SYLVA,
    county: "Jackson County",
    cardLabel: "Sylva Showroom",
    h1: "Roofing & Construction Showroom in Sylva, NC",
    metaTitle: "Roofing & Construction Showroom in Sylva, NC | Highlander",
    metaDescription: `Visit our Sylva roofing and construction showroom at ${napLine(SYLVA)}. Compare materials in person. Call ${formatPhoneDisplay(SYLVA.phoneE164)}.`,
    answer: `The Highlander Building Services showroom in Sylva is at ${napLine(SYLVA)}, open Monday through Friday, 8:00 AM to 5:00 PM. It is our Jackson County base for Sylva, Dillsboro, Cullowhee, Bryson City, Cherokee, and Waynesville, with metal panels, shingle boards, Brava composite samples, and VELUX skylights on display.`,
    intro: [
      "The Sylva showroom put a full materials display inside Jackson County, so homeowners in Sylva, Dillsboro, Cullowhee, and Bryson City no longer have to drive over to Franklin to see what they are buying.",
      "It is staffed the same way the Franklin office is: an estimator who knows the Tuckasegee valley, the wind exposure along the Blue Ridge Parkway corridor, and how much rain the Smokies side of the county actually gets.",
    ],
    gettingHere: [
      "The showroom is just off the main US 23 Business / US 74 corridor through Sylva, minutes from downtown.",
      "Coming from Waynesville or Asheville, take US 74 west and exit into Sylva.",
      "Coming from Bryson City or Cherokee, take US 74 east; from Cullowhee, follow NC 107 north into town.",
    ],
    parking: "Free on-site parking at the building with space for trucks and trailers.",
    onDisplay: ON_DISPLAY,
    visitAgenda: VISIT_AGENDA,
    towns: sylvaTowns,
    photos: photosForTowns(["Sylva", "Cullowhee", "Dillsboro", "Bryson City", "Cherokee", "Waynesville"], 8),
    faqs: [
      {
        question: "Do I need an appointment to visit the Sylva showroom?",
        answer:
          "No. The Sylva showroom is open Monday through Friday, 8:00 AM to 5:00 PM, and walk-ins are welcome. A quick call ahead lets us have your estimator on site when you arrive.",
      },
      {
        question: "What is on display at the Sylva showroom?",
        answer:
          "The same materials library as Franklin: metal roofing panels, CertainTeed dimensional shingle boards, Brava composite shake and slate, VELUX skylights, seamless gutter and trim profiles, and siding samples.",
      },
      {
        question: "Which towns does the Sylva showroom serve?",
        answer:
          "Sylva, Dillsboro, Cullowhee, Bryson City, Cherokee, Waynesville, Lake Glenville, and the wider Jackson, Swain, and Haywood County markets, plus Asheville about 50 minutes east.",
      },
      {
        question: "Can I get an estimate at the Sylva showroom?",
        answer:
          "Yes. Bring photos, plans, or an insurance report and we will start the scope with you on the spot, then schedule the on-site measurement that the written proposal is built from.",
      },
    ],
  },
];

export const showroomBySlug = (slug: string) => showrooms.find((s) => s.slug === slug);
export const showroomById = (id: BusinessLocation["id"]) => showrooms.find((s) => s.id === id)!;

/** Service-area town slug → the showroom that actually serves it. */
export const showroomForTown = (townSlug: string) =>
  showrooms.find((s) => s.towns.some((t) => t.slug === townSlug));

/** Nearest showroom for any town — Franklin is the fallback (main office). */
export const nearestShowroom = (townSlug: string) => showroomForTown(townSlug) ?? showroomById("franklin");

export const LOCATIONS_HUB_PATH = "/locations";

export const showroomCount = showrooms.length;
export const SHOWROOM_HOURS_LABEL = BUSINESS.locations[0].hours[0].label;

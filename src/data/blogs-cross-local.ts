import { PHONE_PLAIN } from "@/data/business";
import { towns, type TownData } from "./towns";
import type { BlogPost } from "./blogs";

/**
 * Cross-linked local expansion posts for secondary Western NC markets.
 *
 * Each post is generated from that town's real profile data in `towns.ts`
 * (county, elevation, housing stock, climate exposure, neighborhoods, demand
 * mix) and carries dense in-body internal links to the town landing page,
 * town+service pages, the county hub, and neighboring towns — so every
 * secondary market gains both content depth and crawlable link equity.
 */

const EXPANSION_TOWN_SLUGS = [
  "bryson-city-nc",
  "waynesville-nc",
  "dillsboro-nc",
  "cherokee-nc",
  "asheville-nc",
  "hendersonville-nc",
  "brevard-nc",
  "murphy-nc",
  "hayesville-nc",
  "otto-nc",
  "scaly-mountain-nc",
  "sapphire-nc",
  "lake-toxaway-nc",
  "lake-glenville-nc",
];

const NEIGHBORS: Record<string, string[]> = {
  "bryson-city-nc": ["cherokee-nc", "dillsboro-nc", "sylva-nc"],
  "waynesville-nc": ["sylva-nc", "asheville-nc", "bryson-city-nc"],
  "dillsboro-nc": ["sylva-nc", "cullowhee-nc", "bryson-city-nc"],
  "cherokee-nc": ["bryson-city-nc", "sylva-nc", "waynesville-nc"],
  "asheville-nc": ["hendersonville-nc", "waynesville-nc", "brevard-nc"],
  "hendersonville-nc": ["asheville-nc", "brevard-nc", "sapphire-nc"],
  "brevard-nc": ["hendersonville-nc", "lake-toxaway-nc", "sapphire-nc"],
  "murphy-nc": ["hayesville-nc", "franklin-nc", "cherokee-nc"],
  "hayesville-nc": ["murphy-nc", "franklin-nc", "otto-nc"],
  "otto-nc": ["franklin-nc", "highlands-nc", "scaly-mountain-nc"],
  "scaly-mountain-nc": ["highlands-nc", "franklin-nc", "otto-nc"],
  "sapphire-nc": ["cashiers-nc", "lake-toxaway-nc", "highlands-nc"],
  "lake-toxaway-nc": ["sapphire-nc", "cashiers-nc", "brevard-nc"],
  "lake-glenville-nc": ["cashiers-nc", "highlands-nc", "sylva-nc"],
};

const IMAGES = [
  "/media/12986d25-storm-damage-checklist-western-nc.webp",
  "/media/28cc73b0-metal-vs-shingle-roof-western-nc.webp",
  "/media/257fc75d-spring-roof-maintenance-checklist-wnc.webp",
  "/media/016dfb32-designing-for-drainage-foundation-safety.webp",
  "/media/23fb80bd-common-roof-problems-franklin.webp",
  "/media/297514b5-storm-damage-franklin.webp",
];
const pickImage = (seed: string) =>
  IMAGES[[...seed].reduce((a, c) => a + c.charCodeAt(0), 0) % IMAGES.length];

const countyShort = (t: TownData) => t.county.replace(/ County$/, "");
const countySlugOf = (t: TownData) =>
  t.county.toLowerCase().trim().replace(/\s+/g, "-");
const townLink = (t: TownData) => `[${t.name}, NC roofing and construction](/service-areas/${t.slug})`;
const svcLink = (t: TownData, svc: string, label: string) =>
  `[${label} in ${t.name}](/service-areas/${t.slug}/${svc})`;
const countyLink = (t: TownData) =>
  `[${t.county} coverage](/service-areas/county/${countySlugOf(t)})`;
const neighborSentence = (t: TownData) => {
  const list = (NEIGHBORS[t.slug] ?? [])
    .map((s) => towns.find((x) => x.slug === s))
    .filter((x): x is TownData => !!x)
    .map((x) => `[${x.name}](/service-areas/${x.slug})`);
  if (!list.length) return "";
  return `Our crews run the same routes through ${list.join(", ")}, so scheduling in ${t.name} rarely means waiting on a truck from out of the region.`;
};
const hoodPhrase = (t: TownData) => {
  const n = t.notableNeighborhoods ?? [];
  if (!n.length) return `across ${t.name}`;
  if (n.length === 1) return `in areas like ${n[0]}`;
  return `in areas like ${n.slice(0, 3).join(", ")}`;
};

const costPost = (t: TownData): BlogPost => {
  const slug = `roof-replacement-cost-${t.slug}`;
  return {
    slug,
    title: `Roof Replacement Costs in ${t.name}, NC: What Actually Drives the Number`,
    excerpt: `What changes the price of a roof replacement in ${t.name} — access, pitch, elevation at ${t.elevation}, decking condition, and material choice — explained by a ${countyShort(t)}-based team.`,
    metaTitle: `Roof Replacement Cost in ${t.name}, NC | Highlander`,
    metaDescription: `A local breakdown of what drives roof replacement pricing in ${t.name}, NC — pitch, access, decking, ventilation, and material choice in ${t.county}.`,
    category: "Roofing",
    date: "2026-01-14",
    readTime: "8 min read",
    image: pickImage(slug),
    imageAlt: `Mountain home roofing project near ${t.name}, North Carolina`,
    town: t.name,
    content: `## Why ${t.name} pricing looks different

${t.name} sits at ${t.elevation} in ${t.county}, and that elevation is not a trivia fact — it changes wind exposure, freeze-thaw cycling, and how fast a roof assembly ages. ${t.climateExposure}

If you are comparing numbers, start with the local overview on our ${townLink(t)} page, then read the pricing drivers below.

## The five variables that move the number most

**1. Pitch and access.** ${t.constructionContext} Steep, wooded, or long-driveway lots slow staging and material handling, and that labor shows up in the bid.

**2. Decking condition.** Nobody knows what is under the shingles until tear-off. We write decking replacement as a clearly stated unit price so a surprise does not become a renegotiation.

**3. Material system.** Dimensional shingles, standing-seam metal, and synthetic slate sit at very different price points and very different service lives. See ${svcLink(t, "roofing", "roof replacement options")} for what we install locally.

**4. Ventilation and flashing correction.** Most ${t.name} roofs we replace need intake/exhaust balance fixed and chimney or valley flashing rebuilt. It is a small line item that protects the whole assembly.

**5. Water management.** Roof edge, drip edge, and gutter capacity have to match ${t.name} rainfall. ${svcLink(t, "gutters", "Gutter and drainage work")} is often scoped in the same visit.

## Housing stock matters

${t.housingProfile} That means ${hoodPhrase(t)}, two homes on the same street can carry very different scopes.

## How we quote it

We measure on site, photograph problem areas, and issue a written scope with line items you can compare against any other bid. Licensed and insured, ${countyShort(t)}-based crews, and one point of contact from first call through final walkthrough.

${neighborSentence(t)}

## Next steps

- Review ${townLink(t)}
- Compare ${svcLink(t, "roof-repair", "repair versus replacement")}
- See ${countyLink(t)}
- Call **${PHONE_PLAIN}** or [request an estimate](/request-inspection)`,
    faqs: [
      {
        question: `What is the biggest cost driver for a roof replacement in ${t.name}?`,
        answer: `Access and pitch usually move the number most, followed by decking condition discovered at tear-off and the material system you select. At ${t.elevation}, wind and freeze-thaw exposure also push toward heavier fastening and better flashing details.`,
      },
      {
        question: `Do you replace roofs year-round in ${t.name}?`,
        answer: `Yes, with weather windows. Winter installs in ${t.county} are scheduled around temperature and precipitation so sealant and underlayment perform as designed.`,
      },
      {
        question: `Can I get a written scope before committing?`,
        answer: `Yes. Every ${t.name} project starts with an on-site measurement and a written, line-itemed scope so you can compare bids fairly. Call ${PHONE_PLAIN}.`,
      },
    ],
    relatedServices: [
      { label: "Roof Replacement", path: "/roofing/roof-replacement" },
      { label: "Metal Roofing", path: "/roofing/metal" },
      { label: `${t.name} Service Area`, path: `/service-areas/${t.slug}` },
    ],
  };
};

const stormPost = (t: TownData): BlogPost => {
  const slug = `storm-season-prep-${t.slug}`;
  return {
    slug,
    title: `Storm Season Prep for ${t.name}, NC Homes: A ${countyShort(t)} Checklist`,
    excerpt: `A practical pre-storm checklist for ${t.name} homeowners — roof edges, flashing, gutters, trees, and documentation — tuned to ${t.county} weather patterns.`,
    metaTitle: `Storm Prep Checklist for ${t.name}, NC | Highlander`,
    metaDescription: `Prepare your ${t.name}, NC home for mountain storm season: roof, flashing, gutter, and documentation steps from a ${countyShort(t)}-based roofing and construction team.`,
    category: "Storm Damage",
    date: "2026-01-13",
    readTime: "7 min read",
    image: pickImage(slug + "s"),
    imageAlt: `Storm clouds over the mountains near ${t.name}, North Carolina`,
    town: t.name,
    content: `## What ${t.name} storms actually do to a roof

${t.climateExposure}

At ${t.elevation}, the damage pattern is rarely a hole in the roof. It is lifted shingle edges, loosened flashing, overwhelmed gutters, and water finding a path days after the storm passes. Start with ${townLink(t)} for how we work in this market.

## The pre-season checklist

**Roof edges and ridge.** Walk the perimeter from the ground with binoculars. Lifted edges, missing granules in the gutters, or exposed fasteners are early signals. ${svcLink(t, "roof-repair", "Roof repair in " + t.name)} handles these before they become interior damage.

**Flashing and penetrations.** Chimneys, valleys, skylights, and vent boots fail before fields do. Rebuilt flashing is cheap compared to a ceiling.

**Gutters and downhill drainage.** Mountain rain arrives fast. Undersized or clogged gutters dump water at the foundation. See ${svcLink(t, "gutters", "gutter work")}.

**Trees and limb load.** ${t.constructionContext} Overhanging limbs are the most common source of impact damage ${hoodPhrase(t)}.

**Documentation.** Photograph your roof, gutters, and exterior now. Dated before-photos make post-storm claims far easier.

## After a storm

Do not climb the roof. Photograph what you can see from the ground, note interior stains, and get a documented inspection. We provide a written condition report with photos so you have something concrete for your insurer. ${svcLink(t, "storm-damage", "Storm damage response in " + t.name)}.

${neighborSentence(t)}

## Local context

${t.marketAuthorityAngle}

## Next steps

- ${townLink(t)}
- ${countyLink(t)}
- Call **${PHONE_PLAIN}** or [request an inspection](/request-inspection)`,
    faqs: [
      {
        question: `How soon should I get a roof looked at after a storm in ${t.name}?`,
        answer: `Within a few days. Water intrusion in ${t.county} homes often shows up on the interior long after the wind event, and early documentation helps with insurance.`,
      },
      {
        question: `What storm damage is easiest to miss?`,
        answer: `Loosened flashing and lifted shingle edges. Both look fine from the driveway and both let water in during the next sideways rain.`,
      },
      {
        question: `Do you provide written condition reports for insurance?`,
        answer: `Yes. ${t.name} inspections include photo documentation and a written condition report you can submit with a claim.`,
      },
    ],
    relatedServices: [
      { label: "Storm Damage Repair", path: "/roofing/storm-damage" },
      { label: "Roof Repair", path: "/roofing/roof-repair" },
      { label: `${t.name} Service Area`, path: `/service-areas/${t.slug}` },
    ],
  };
};

export const crossLocalBlogPosts: BlogPost[] = EXPANSION_TOWN_SLUGS.flatMap((slug) => {
  const t = towns.find((x) => x.slug === slug);
  if (!t) return [];
  return [costPost(t), stormPost(t)];
});

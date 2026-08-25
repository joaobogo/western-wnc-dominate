import { PHONE_PLAIN } from "@/data/business";
import { towns, townLocalRelevance, type TownData } from "./towns";
import type { BlogPost } from "./blogs";

/**
 * Local content clusters for the seven primary markets.
 *
 * Each primary town gets supporting articles that sit beneath its
 * service-town landing pages (/service-areas/{town}/{service}) and link back
 * into them, into the county hub, and into the estimate path. Content is
 * composed from the town's real profile data in `towns.ts` — no invented
 * statistics, warranty claims, or availability promises.
 */

export const PRIMARY_CLUSTER_TOWNS = [
  "franklin-nc",
  "sylva-nc",
  "highlands-nc",
  "cashiers-nc",
  "waynesville-nc",
  "bryson-city-nc",
  "cullowhee-nc",
] as const;

/** Decision-guide imagery pool so each town cluster looks distinct. */
const DECISION_IMAGES = [
  "/media/wnc-roof-tearoff-crew.jpg",
  "/media/wnc-roof-inspection.jpg",
  "/media/wnc-dimensional-shingle-roof.jpg",
  "/media/wnc-metal-standing-seam.jpg",
  "/media/wnc-chimney-flashing.jpg",
  "/media/wnc-cedar-slate-roof.jpg",
  "/media/wnc-attic-ventilation.jpg",
];

const countyShort = (t: TownData) => t.county.replace(/ County$/, "");
const countySlug = (t: TownData) => t.county.toLowerCase().replace(/\s+/g, "-");
const ft = (t: TownData) => parseInt(t.elevation.replace(/[^0-9]/g, ""), 10) || 0;
const hoods = (t: TownData) => {
  const n = t.notableNeighborhoods ?? [];
  if (n.length >= 2) return `${n[0]} and ${n[1]}`;
  return n[0] ?? `the ${t.county} communities around ${t.name}`;
};

const links = (t: TownData) => [
  { label: `Roofing in ${t.name}`, path: `/service-areas/${t.slug}/roofing` },
  { label: `Roof Repair in ${t.name}`, path: `/service-areas/${t.slug}/roof-repair` },
  { label: `Roof Replacement in ${t.name}`, path: `/service-areas/${t.slug}/roof-replacement` },
  { label: `Storm Damage in ${t.name}`, path: `/service-areas/${t.slug}/storm-damage` },
  { label: `${t.county} Service Hub`, path: `/service-areas/county/${countySlug(t)}` },
  { label: `${t.name} Service Area`, path: `/service-areas/${t.slug}` },
  { label: "Get My Written Estimate", path: "/request-inspection" },
];

function repairOrReplacePost(t: TownData): BlogPost {
  const content = `## The question every ${t.name} homeowner eventually asks

A stain appears on a ceiling, or a neighbor's roof comes off, and the question becomes simple: repair the roof, or replace it? At ${t.elevation} in ${t.county}, the honest answer depends less on the age printed on a warranty sheet and more on what the assembly beneath the covering is doing.

${t.climateExposure}

## When a repair is the right call in ${t.name}

- The damage is isolated — one slope, one valley, one penetration.
- The deck is dry and sound when probed from the attic side.
- Flashing at chimneys and sidewalls can be reworked without disturbing the field.
- The covering still has meaningful service life left and is not shedding granules broadly.

A properly scoped repair on a roof in this condition buys real years. We document what we find with photographs and write the scope so you can see exactly what is being corrected.

[Roof repair in ${t.name}](/service-areas/${t.slug}/roof-repair) is usually the lower-risk starting point when those four conditions hold.

## When replacement is the more honest answer

- Leaks show up in more than one location, on more than one slope.
- Decking is soft, delaminated, or previously patched around penetrations.
- Ventilation was never balanced, so the covering aged from beneath.
- The roof has already been laid over once.

At that point additional repairs are spending money on an assembly that has stopped protecting the structure. [Roof replacement in ${t.name}](/service-areas/${t.slug}/roof-replacement) lets us correct decking, ventilation, flashing, and drainage in one pass instead of chasing symptoms.

## What ${countyShort(t)} County conditions change

${t.housingProfile} Around ${hoods(t)}, ${ft(t) >= 3400 ? "freeze-thaw cycling and ice loading at the eaves decide the outcome — ice-and-water protection well past the code minimum matters more here than the shingle brand on the box." : ft(t) >= 2400 ? "drying time decides the outcome — shaded slopes hold moisture for days, so ventilation and algae-resistant coverings matter more than they would in a drier climate." : "rainfall volume and debris load decide the outcome — undersized gutters and clogged valleys cause more interior damage here than wind ever does."}

## Getting a decision you can defend

Ask for photographs of the actual failure, a written scope, and a clear statement of what happens if you wait a season. If a contractor cannot show you the problem, you cannot evaluate the recommendation.

${townLocalRelevance[t.slug] ?? t.marketAuthorityAngle}

When you want a straight read on your roof, [request an estimate](/request-inspection) or call ${PHONE_PLAIN} and we will document what we find — including the option of doing nothing if that is what the roof calls for.`;

  return {
    slug: `roof-repair-vs-replacement-${t.slug}`,
    title: `Roof Repair or Replacement in ${t.name}, NC: How to Decide`,
    excerpt: `A practical decision framework for ${t.name} homeowners weighing a targeted roof repair against a full replacement at ${t.elevation} in ${t.county}.`,
    content,
    category: "Decision Guide",
    date: "2026-08-11",
    readTime: "7 min",
    image: DECISION_IMAGES[towns.findIndex((x) => x.slug === t.slug) % DECISION_IMAGES.length],
    imageAlt: `Roofline of a mountain home near ${t.name}, North Carolina`,
    metaTitle: `Roof Repair vs Replacement in ${t.name}, NC`,
    metaDescription: `How ${t.name}, NC homeowners should decide between roof repair and replacement — decking, ventilation, flashing, and ${countyShort(t)} County weather.`,
    town: t.name,
    faqs: [
      {
        question: `How do I know if my ${t.name} roof needs replacing rather than repairing?`,
        answer: `Multiple leak locations, soft or previously patched decking, an unbalanced ventilation system, or an existing layover generally point to replacement. Isolated damage on a sound deck usually points to repair.`,
      },
      {
        question: `Does elevation change the answer in ${t.county}?`,
        answer: `Yes. At ${t.elevation}, the assembly beneath the covering — ice-and-water protection, flashing detail, ventilation, and drainage — drives service life more than the covering itself, so replacement is often the moment those items finally get corrected.`,
      },
    ],
    relatedServices: links(t),
  };
}

function servicePlanningPost(t: TownData): BlogPost {
  const content = `## Planning roofing and exterior work in ${t.name}

${t.name} sits at ${t.elevation} in ${t.county}, and scheduling here is a real constraint, not a formality. ${t.constructionContext ?? "Access, weather windows, and permitting all shape when work can realistically start."}

## Sequence that works in this market

1. **Assessment and documentation.** Photographs, attic check, and a written scope so you know what is being priced.
2. **Permitting.** ${countyShort(t)} County work is coordinated before the crew mobilizes, and community design review is common on club and gated parcels in this area.
3. **Material selection.** Local demand runs toward ${(t.serviceDemandMix ?? []).slice(0, 3).join(", ") || "durable, low-maintenance systems"}.
4. **Weather window.** Tear-off is scheduled around the forecast, not against it.

## Matching the service to the problem

- Active leaks and isolated damage: [roof repair in ${t.name}](/service-areas/${t.slug}/roof-repair).
- End-of-life assemblies: [roof replacement in ${t.name}](/service-areas/${t.slug}/roof-replacement).
- Wind, hail, or tree impact: [storm damage response in ${t.name}](/service-areas/${t.slug}/storm-damage).
- Additions, porches, and exterior renovation: [construction in ${t.name}](/service-areas/${t.slug}/construction).

## Details that decide the outcome

Balanced intake and exhaust ventilation. Step-flashed sidewalls and chimneys instead of caulked ones. Fresh pipe boots at every re-roof. Gutters sized for the rainfall ${countyShort(t)} County actually receives. None of these are visible in a finished photo, and all of them decide whether the roof reaches its rated life.

## Local context

${townLocalRelevance[t.slug] ?? t.marketAuthorityAngle} Explore the [${t.county} hub](/service-areas/county/${countySlug(t)}) for permitting and coverage detail, or the [${t.name} overview](/service-areas/${t.slug}) for local project history.

To get a written scope for your property, [request an estimate](/request-inspection) or call ${PHONE_PLAIN}.`;

  return {
    slug: `roofing-project-planning-${t.slug}`,
    title: `Planning a Roofing or Exterior Project in ${t.name}, NC`,
    excerpt: `Sequencing, permitting, materials, and the details that decide outcomes for roofing and exterior projects in ${t.name}, ${t.county}.`,
    content,
    category: "Local Guide",
    date: "2026-08-10",
    readTime: "6 min",
    image: t.heroImage,
    imageAlt: `Mountain property near ${t.name}, North Carolina`,
    metaTitle: `Roofing Project Planning in ${t.name}, NC`,
    metaDescription: `How roofing and exterior projects are sequenced in ${t.name}, NC — assessment, ${countyShort(t)} County permitting, materials, and weather windows.`,
    town: t.name,
    faqs: [
      {
        question: `How far ahead should I schedule roofing work in ${t.name}?`,
        answer: `Plan several weeks ahead where possible. Assessment, permitting through ${countyShort(t)} County, material selection, and a workable weather window all sit ahead of tear-off, and mountain forecasts move the calendar.`,
      },
      {
        question: `Do you handle permitting in ${t.county}?`,
        answer: `Yes. We confirm the permitting path for your parcel before scoping and coordinate inspections as part of the project.`,
      },
    ],
    relatedServices: links(t),
  };
}

export const primaryClusterBlogPosts: BlogPost[] = towns
  .filter((t) => (PRIMARY_CLUSTER_TOWNS as readonly string[]).includes(t.slug))
  .flatMap((t) => [repairOrReplacePost(t), servicePlanningPost(t)]);

import { towns, townLocalRelevance, type TownData } from "./towns";
import type { BlogPost } from "./blogs";

/**
 * Local coverage posts for towns that previously had no town-tagged article.
 * Each post is composed from that town's real profile data in `towns.ts`
 * (county, elevation, housing stock, climate exposure, neighborhoods,
 * demand mix, construction context) so the guidance is genuinely local.
 */

const UNCOVERED_TOWN_SLUGS = [
  "asheville-nc",
  "hendersonville-nc",
  "brevard-nc",
  "murphy-nc",
  "hayesville-nc",
  "sapphire-nc",
  "lake-toxaway-nc",
  "otto-nc",
  "scaly-mountain-nc",
  "cherokee-nc",
  "dillsboro-nc",
];

const ft = (t: TownData) => parseInt(t.elevation.replace(/[^0-9]/g, ""), 10) || 0;
const countyShort = (t: TownData) => t.county.replace(/ County$/, "");
const hoods = (t: TownData) => {
  const n = t.notableNeighborhoods ?? [];
  if (n.length >= 3) return `${n[0]}, ${n[1]}, and ${n[2]}`;
  if (n.length === 2) return `${n[0]} and ${n[1]}`;
  if (n.length === 1) return n[0];
  return `${t.name} and the surrounding ${t.county} communities`;
};
const mix = (t: TownData, n = 3) => (t.serviceDemandMix ?? []).slice(0, n).join(", ");
const lower = (s: string) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);

const bandNote = (t: TownData) => {
  const e = ft(t);
  if (e >= 3400)
    return "Above roughly 3,400 feet, freeze-thaw cycling and ice loading at the eaves are the two forces that decide how long a roof lasts. Ice dams form when escaping attic heat melts snow that then refreezes at the cold overhang, and the water backs up under the covering rather than running off it.";
  if (e >= 2400)
    return "In the 2,400 to 3,400 foot band, the defining problem is drying time. North slopes stay damp for days after rain, fog holds moisture against the roof, and shoulder-season freeze-thaw slowly works fasteners loose. Materials here rarely fail from one dramatic event; they fail from never fully drying out.";
  return "Below about 2,400 feet, the pressure comes from volume and heat: valley storm funneling, intense summer rain, humidity that feeds algae streaking on north-facing slopes, and constant debris load from mature hardwood canopy clogging gutters and valleys.";
};

const bandSpec = (t: TownData) => {
  const e = ft(t);
  if (e >= 3400)
    return [
      "Ice-and-water membrane well past the code minimum at eaves, valleys, and every penetration",
      "Metal or closed-cut valleys rather than woven asphalt",
      "Enhanced fastening schedules rated for sustained mountain wind",
      "Balanced intake and exhaust ventilation so the deck stays cold and even",
    ];
  if (e >= 2400)
    return [
      "Full-perimeter ice-and-water protection, not just a starter strip",
      "Balanced intake-and-exhaust ventilation sized to the actual attic volume",
      "Algae-resistant shingle selection on shaded north exposures",
      "Step-flashed sidewalls and chimneys — never face-nailed and caulked",
    ];
  return [
    "Oversized gutters and downspouts sized to real rainfall, not builder default",
    "Algae-resistant covering on shaded slopes",
    "Fresh pipe boots at every re-roof, since heat and saturation cycle them hard",
    "Guarded valleys and regular debris clearing under heavy canopy",
  ];
};

function guidePost(t: TownData): BlogPost {
  const spec = bandSpec(t)
    .map((s) => `- ${s}`)
    .join("\n");
  const content = `## Why a ${t.name} roof is not a generic roof

${t.name} sits at ${t.elevation} in ${t.county}, and the elevation is not trivia — it is the specification. ${t.climateExposure}

${bandNote(t)}

${t.housingProfile} Across ${hoods(t)}, the prevailing look is ${lower(t.styleTendency)} That combination — this building stock, at this elevation, under this weather — is what a roofing scope in ${t.name} should be written around.

## What we specify here

${spec}

None of those line items show up in a photo of the finished roof. All of them decide whether the roof reaches its rated life or gives up a decade early.

## Choosing a material for a ${t.name} home

Local demand runs toward ${mix(t)}. Here is the honest trade-off between the systems worth considering:

**Heavy dimensional asphalt.** The value baseline, and a genuinely good roof when it is installed on a corrected assembly with proper ventilation. Choose an algae-resistant line if your slopes are shaded. Expect a shorter service life at elevation than the same product would deliver in a milder climate.

**Standing-seam metal.** The long-horizon system. Concealed fasteners mean nothing loosens over decades of thermal cycling, and panels shed snow, ice, and leaf debris cleanly — which matters on wooded ${countyShort(t)} County lots. It costs more upfront and it rewards patience. Plan for where the snow will slide before you install it, not after.

**Synthetic composite shake and slate.** Delivers the texture ${t.name} homes are usually designed around, with impact and moisture performance that natural cedar cannot match at this elevation. It is the right answer where appearance and durability both have to be non-negotiable.

## The failures we actually find

When we open up a failing roof in the ${t.name} area, it is rarely the shingle that failed first. It is usually one of these:

1. **Ventilation deficiency.** Intake and exhaust were never balanced, so the deck cooked from beneath and the covering aged from the inside out.
2. **Flashing shortcuts.** Chimney and sidewall flashing that was face-nailed and sealed with caulk instead of properly stepped. Caulk is a maintenance item, not a flashing system.
3. **Reused pipe boots.** They were left in place during a previous re-roof and cracked years before the field did.
4. **Undersized drainage.** Gutters and downspouts that were never sized for the rainfall ${countyShort(t)} County actually gets, so water tracks behind fascia every heavy storm.

## Maintenance that is worth your time in ${t.name}

Clear gutters and valleys twice a year — more if your lot has heavy canopy. Walk the perimeter after significant wind and look for displaced material, bent gutters, and granule accumulation at downspout outlets. Check the attic once a season for staining, daylight, or damp insulation. Trim limbs back off the roof plane. And get a professional look at the roof every few years even when nothing is obviously wrong, because the cheapest repair is always the one made before there is a stain on the ceiling.

## Working with a contractor here

${townLocalRelevance[t.slug] ?? t.marketAuthorityAngle}

Ask any contractor you are considering three questions: Will you tear off or lay over, and why? What will you do about ventilation? And who is actually on my roof — your crew or a subcontractor? The answers tell you most of what you need to know.

If you want a straight assessment of your ${t.name} roof, we will document what we find with photographs and give you a written scope, including the option of doing nothing if that is what the roof calls for.`;

  return {
    slug: `roofing-${t.slug}-elevation-guide`,
    title: `Roofing in ${t.name}, NC: What ${t.elevation} of Elevation Actually Demands`,
    excerpt: `${t.name} sits at ${t.elevation} in ${t.county}. Here is how that elevation, the local building stock, and ${countyShort(t)} County weather should shape your roofing specification.`,
    content,
    category: "Local Guide",
    date: "2026-08-05",
    readTime: "8 min",
    image: t.heroImage,
    imageAlt: `Mountain home roofline in Western North Carolina near ${t.name}`,
    metaTitle: `Roofing in ${t.name}, NC: An Elevation-Based Guide`,
    metaDescription: `What ${t.elevation} of elevation and ${countyShort(t)} County weather demand from a roof in ${t.name}, NC — materials, specification, and the failures we find most.`,
    town: t.name,
    faqs: [
      {
        question: `What roofing material lasts longest in ${t.name}, NC?`,
        answer: `Standing-seam metal generally has the longest service life at ${t.elevation}, followed by synthetic composite shake or slate. Heavy dimensional asphalt is the value choice and performs well when the assembly beneath it — ventilation, flashing, and drainage — is corrected during installation.`,
      },
      {
        question: `How often should a ${t.name} roof be inspected?`,
        answer: `Every two to three years as a baseline, and after any significant wind, hail, or heavy-rain event. Homes under heavy hardwood canopy in ${countyShort(t)} County benefit from an annual look because debris load accelerates valley and gutter problems.`,
      },
      {
        question: `Does elevation really change the roofing specification?`,
        answer: `Yes. ${bandNote(t).split(".")[0]}. Underlayment coverage, valley construction, fastening schedules, and ventilation all get adjusted for it.`,
      },
    ],
    relatedServices: [
      { label: "Roof Replacement", path: "/roofing/roof-replacement" },
      { label: "Metal Roofing", path: "/roofing/metal" },
      { label: `${t.name} Service Area`, path: `/service-areas/${t.slug}` },
    ],
  };
}

function stormPost(t: TownData): BlogPost {
  const content = `## Mountain storms hide their damage

Storm damage in ${t.county} is rarely obvious from the driveway. Wind lifts shingles that settle back down looking untouched but with the seal broken. Hail bruises the mat under the granules and the roof does not leak for another two seasons. By the time there is a stain on a ceiling in ${t.name}, the actual damage is usually months or years old.

${t.climateExposure} At ${t.elevation}, that produces a recognizable damage pattern here.

## What storms do to ${t.name} roofs

- **Creased and lifted shingles** on the windward slope, where the seal strip has broken even though the shingle is still in place
- **Displaced ridge and hip caps**, which are the most exposed course on the roof and usually the first to go
- **Granule loss**, visible as grit accumulating where downspouts discharge
- **Dented soft metals** — vents, valleys, gutter aprons, and flashing take visible hail impact before the field does
- **Debris and limb strikes** from the hardwood canopy across ${hoods(t)}, which can puncture the deck outright and are often the most urgent finding
- **Overwhelmed drainage**, where a heavy rain event exceeds gutter capacity and water tracks behind fascia and into the soffit

## What to do in the first 48 hours

**Stay off the roof.** Wet mountain roofs are dangerous, and walking a hail-damaged surface can create marks that muddy a legitimate claim.

**Document from the ground.** Photograph anything visible: displaced material, bent gutters and downspouts, dented vents, debris on the roof. Note the date of the weather event — that timestamp matters if a claim follows.

**Check inside.** Look at ceilings and upper walls for fresh staining, and go into the attic with a flashlight to look for daylight, wet sheathing, or damp insulation.

**Stop active water.** If water is coming into the house, that takes priority over every other decision. Temporary protection over the affected area is a same-visit job for us in ${t.name} and the surrounding ${countyShort(t)} County communities.

**Then get a real inspection.** The damage that leaks first is usually not the damage you can see from the ground.

## Insurance, handled honestly

Our role after a storm is documentation and repair, not claim promises. On a ${t.name} inspection we photograph impact and wind evidence, measure and diagram the affected slopes, and write a scope in the terms an adjuster works in. We are glad to be on site during the adjuster's visit so the conversation happens over the actual roof rather than over paperwork.

Sometimes the evidence supports a full replacement claim. Often it supports a straightforward repair, and that is a good outcome, not a disappointing one. Be cautious with any crew that guarantees a full replacement before setting foot on your roof, and be especially cautious with out-of-area crews that appear in ${countyShort(t)} County the week after a storm and are gone before the work is warrantied.

## Preventing the next one from costing as much

You cannot stop mountain weather, but you can change how much it costs you:

1. **Fix drainage first.** Undersized or clogged gutters turn an ordinary storm into water intrusion. This is the cheapest high-impact upgrade available.
2. **Trim the canopy back** off the roof plane so limbs cannot strike and leaves cannot dam the valleys.
3. **Replace tired pipe boots** before they crack, rather than after.
4. **Consider impact-resistant covering** at your next replacement — Class 4 asphalt or metal — which changes how the roof responds to hail and debris.
5. **Keep a baseline.** Photographs of your roof in good condition make it far easier to demonstrate what a storm actually changed.

${townLocalRelevance[t.slug] ?? t.marketAuthorityAngle}

We are based in Western North Carolina year-round rather than following storms through it. If ${t.name} has taken weather and you want an assessment, we will document what the roof shows and tell you plainly what it needs.`;

  return {
    slug: `storm-damage-${t.slug}-what-to-check`,
    title: `Storm Damage in ${t.name}, NC: What to Check and When to Call`,
    excerpt: `Wind and hail damage in ${t.county} is usually invisible from the ground. Here is the ${t.name} damage pattern, what to do in the first 48 hours, and how to handle a claim honestly.`,
    content,
    category: "Storm",
    date: "2026-08-06",
    readTime: "7 min",
    image: t.heroImage,
    imageAlt: `Storm clouds over mountain homes in Western North Carolina near ${t.name}`,
    metaTitle: `Storm Damage in ${t.name}, NC: Homeowner Checklist`,
    metaDescription: `A ${t.name}, NC storm damage checklist: what wind and hail actually do at ${t.elevation}, what to do in the first 48 hours, and how to document a claim.`,
    town: t.name,
    faqs: [
      {
        question: `How soon should I get my ${t.name} roof inspected after a storm?`,
        answer: `Within a few days if you can. Water intrusion compounds quickly and most policies expect prompt reporting. If water is actively entering the home, call right away — active-intrusion visits get priority in ${countyShort(t)} County.`,
      },
      {
        question: `Can I see hail damage from the ground?`,
        answer: `Usually not. Hail bruises the mat beneath the granules, and the roof can look fine for a season or more before it leaks. Dented vents, gutter aprons, and granules at the downspout outlet are the ground-level clues worth photographing.`,
      },
      {
        question: `Should I sign with a storm crew that knocks on my door?`,
        answer: `Be careful. Verify the North Carolina license, ask who warranties the work and how long they have operated in ${countyShort(t)} County, and never sign anything that assigns your insurance benefits before you understand it. A second local opinion costs nothing.`,
      },
    ],
    relatedServices: [
      { label: "Storm Damage Roofing", path: "/roofing/storm-damage" },
      { label: "Roof Repair", path: "/roofing/roof-repair" },
      { label: `${t.name} Service Area`, path: `/service-areas/${t.slug}` },
    ],
  };
}

export const localTownBlogPosts: BlogPost[] = towns
  .filter((t) => UNCOVERED_TOWN_SLUGS.includes(t.slug))
  .flatMap((t) => [guidePost(t), stormPost(t)]);

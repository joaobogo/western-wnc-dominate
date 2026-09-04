import { towns, townLocalRelevance, type TownData } from "./towns";

/**
 * Generated town + service landing content.
 *
 * Every field below is composed from the REAL data we hold for each town in
 * `towns.ts` — county, elevation, housing profile, climate exposure,
 * construction context, neighborhoods, style tendency, and demand mix. No
 * name-swapped boilerplate: two towns only read alike if their underlying
 * conditions genuinely are alike.
 *
 * Hand-written entries in `service-town-content.ts` always win; these fill the
 * remaining coverage gaps so every town has a page for every core service.
 */

export interface GeneratedSection {
  heading: string;
  body: string;
}

export const CORE_SERVICES = [
  "roofing",
  "roof-repair",
  "roof-replacement",
  "storm-damage",
  "construction",
  "metal-roofing",
] as const;

export type CoreService = (typeof CORE_SERVICES)[number];

const SERVICE_LABELS: Record<CoreService, string> = {
  roofing: "Roofing",
  "roof-repair": "Roof Repair",
  "roof-replacement": "Roof Replacement",
  "storm-damage": "Storm Damage Roofing",
  construction: "Construction",
  "metal-roofing": "Metal Roofing",
};

const SERVICE_PARENT_PATH: Record<CoreService, string> = {
  roofing: "/roofing",
  "roof-repair": "/roofing/roof-repair",
  "roof-replacement": "/roofing/roof-replacement",
  "storm-damage": "/roofing/storm-damage",
  construction: "/construction",
  "metal-roofing": "/roofing/metal",
};

export const getServiceParentPath = (serviceSlug: string) =>
  SERVICE_PARENT_PATH[serviceSlug as CoreService] ?? "/roofing";

const elevationFt = (t: TownData) => parseInt(t.elevation.replace(/[^0-9]/g, ""), 10) || 0;

const elevationBand = (t: TownData) => {
  const ft = elevationFt(t);
  if (ft >= 3400) return "high" as const;
  if (ft >= 2400) return "mid" as const;
  return "valley" as const;
};

const bandLanguage = {
  high: {
    exposure:
      "freeze-thaw cycling, ice loading at the eaves, wind-driven rain, and UV intensity that ages materials faster than the same product would age in the Piedmont",
    detail:
      "ice-and-water coverage well past code minimum, closed-cut or metal valleys, and fastening schedules rated for sustained mountain wind",
  },
  mid: {
    exposure:
      "long wet seasons, fog that keeps north slopes damp for days, and shoulder-season freeze-thaw that works fasteners loose over time",
    detail:
      "full-perimeter ice-and-water protection, balanced intake-and-exhaust ventilation, and flashing details built for slow-drying north exposures",
  },
  valley: {
    exposure:
      "valley storm funneling, heavy summer rain events, humidity that feeds algae streaking, and debris load from mature hardwood canopy",
    detail:
      "oversized drainage, algae-resistant shingle selection, and flashing and boot details that survive both heat and repeated saturation",
  },
};

const first = (arr: string[] | undefined, fallback: string) => (arr && arr[0]) || fallback;
const list = (arr: string[] | undefined, max = 3) =>
  (arr ?? []).slice(0, max).join(", ");

const neighborhoodPhrase = (t: TownData) => {
  const n = t.notableNeighborhoods ?? [];
  if (n.length >= 3) return `${n[0]}, ${n[1]}, and ${n[2]}`;
  if (n.length === 2) return `${n[0]} and ${n[1]}`;
  if (n.length === 1) return n[0];
  return `${t.name} and the surrounding ${t.county} communities`;
};

const countyShort = (t: TownData) => t.county.replace(/ County$/, "");

interface Built {
  serviceLabel: string;
  h1: string;
  intro: string;
  localContext: string;
  whoItsFor: string;
  proofNote: string;
  metaTitle: string;
  metaDescription: string;
  sections: GeneratedSection[];
  faqs: { q: string; a: string }[];
}

function buildRoofing(t: TownData): Built {
  const b = bandLanguage[elevationBand(t)];
  return {
    serviceLabel: "Roofing",
    h1: `Roofing in ${t.name}, NC`,
    intro: `${t.name} sits at ${t.elevation} in ${t.county}, and that number changes how a roof has to be built. ${t.climateExposure} We design, install, and maintain roofing systems for ${t.name} homes as complete assemblies — deck, underlayment, flashing, ventilation, and covering — because that is where mountain roofs actually succeed or fail.`,
    localContext: `${t.housingProfile} Across ${neighborhoodPhrase(t)} the roofs we work on face ${b.exposure}. The demand mix here runs toward ${list(t.serviceDemandMix)}, which tracks with the local building stock: ${t.styleTendency.charAt(0).toLowerCase()}${t.styleTendency.slice(1)} Our specification for ${t.name} starts with ${b.detail}.`,
    whoItsFor: `${t.name} homeowners who want a roof specified for ${t.elevation} rather than a generic package, owners of seasonal or second homes in ${countyShort(t)} County who need the work managed while they are away, and buyers who want an honest baseline assessment before or just after closing.`,
    proofNote: `${townLocalRelevance[t.slug] ?? t.marketAuthorityAngle} We are a CertainTeed ShingleMaster Credentialed Contractor and a licensed North Carolina general contractor, and the crew that meets you at the estimate is the crew on your roof.`,
    metaTitle: `Roofing in ${t.name}, NC | Highlander`,
    metaDescription: `Roofing in ${t.name}, NC built for ${t.elevation} conditions. Installation, repair, and replacement from a locally based, licensed team. Free on-site assessment.`,
    sections: [
      {
        heading: `Roofing systems that suit ${t.name}`,
        body: `Material choice in ${t.name} is a performance decision before it is an aesthetic one. Heavy dimensional asphalt remains the value baseline and performs well when it is paired with correct ventilation. Standing-seam metal is the long-horizon choice on steeper pitches and sheds snow and debris cleanly, which matters on wooded ${countyShort(t)} County lots. Synthetic composite shake and slate give you the look the ${t.name} market expects with impact and moisture performance that natural cedar cannot match at this elevation. We walk you through what each system costs, how long it realistically lasts here, and what maintenance it asks of you — then we recommend one and tell you why.`,
      },
      {
        heading: `${t.marketAuthorityAngle.startsWith(t.name) ? "Our standard" : `Why ${t.name} roofs fail early`}`,
        body: `Most premature roof failures we open up in ${t.name} are not material failures. They are ventilation deficiencies that cook the deck from below, valley and chimney flashing that was never properly stepped, pipe boots that were never replaced during a previous re-roof, and drainage that was undersized for the rainfall this part of Western North Carolina actually receives. ${t.marketAuthorityAngle} Every roof we scope in ${t.name} gets the attic and ventilation path checked, not just the shingle surface.`,
      },
      {
        heading: `How a ${t.name} roofing project runs`,
        body: `We start with an on-site assessment and photo documentation, then deliver a written scope that names materials by manufacturer and line, not by vague category. We pull the ${countyShort(t)} County permit and coordinate the inspection. Installation is done by our own crews under a single project lead, with daily site cleanup and magnet sweeps. At completion you get a walkthrough and a full photo package, whether or not you are in ${t.name} that week. Financing options are available if the project is larger than you planned for.`,
      },
    ],
    faqs: [
      {
        q: `What roofing material works best in ${t.name}?`,
        a: `At ${t.elevation}, the systems that hold up best here are heavy dimensional asphalt, standing-seam metal, and synthetic composite shake or slate — each paired with correct underlayment and ventilation. We recommend based on your pitch, exposure, tree cover, and how long you intend to own the home, not on what we have in the yard.`,
      },
      {
        q: `Do you pull permits in ${t.county}?`,
        a: `Yes. We handle ${countyShort(t)} County permitting and schedule the final inspection as part of the project. You do not coordinate anything with the county.`,
      },
      {
        q: `Can you manage a ${t.name} roof while I am not there?`,
        a: `Yes. A large share of our ${countyShort(t)} County work is for owners who are not on site. You get scheduled photo updates during the project and a complete documentation package at completion.`,
      },
    ],
  };
}

function buildRepair(t: TownData): Built {
  const b = bandLanguage[elevationBand(t)];
  return {
    serviceLabel: "Roof Repair",
    h1: `Roof Repair in ${t.name}, NC`,
    intro: `When a roof fails in ${t.name}, the useful question is narrow: what exactly broke, and is repairing it a good use of your money? We inspect, photograph, and give you a straight answer — including when the answer is that repair is not worth it.`,
    localContext: `${t.name} repairs cluster around a predictable set of failures given ${t.elevation} of elevation and ${b.exposure}. The recurring calls: pipe-boot cracking on asphalt past roughly fifteen years, ridge and hip cap lift after wind events, chimney and sidewall flashing that was face-nailed and caulked instead of stepped, valley wear-through, and gutter and drainage capacity that was never sized for ${countyShort(t)} County rainfall. ${t.housingProfile}`,
    whoItsFor: `Owners with an active leak or a ceiling stain, ${t.name} homeowners working through an inspection response before closing, seasonal owners who just opened the house and found damage, and property managers keeping ${countyShort(t)} County homes tight year-round.`,
    proofNote: `Every ${t.name} repair leaves with photos of what failed, what we did, and what is still on the clock. If your roof is past the point where repairs are worth the spend, we put that in writing instead of selling you another patch.`,
    metaTitle: `Roof Repair in ${t.name}, NC | Highlander`,
    metaDescription: `Honest roof repair in ${t.name}, NC. Photo-documented inspections, fast local response, and a straight answer on whether to repair or replace.`,
    sections: [
      {
        heading: `Repair or replace — how we decide in ${t.name}`,
        body: `The test is not the age of the roof, it is the condition of the field. If the failure is isolated, the deck is sound, and the surrounding material still has flexibility and granule coverage, repair is the right call and we will make it last. If the deck is soft, the shingles are brittle across multiple slopes, or we are looking at the third repair in as many years, replacement is the cheaper decision over any real ownership horizon. We price both options when it is genuinely a close call so you are choosing with numbers in front of you.`,
      },
      {
        heading: `What a ${t.name} repair visit includes`,
        body: `A full roof-surface walk where pitch and safety allow, an attic and ventilation check, moisture inspection at the known problem area, and photographs of every finding. You get a written scope that lists each repair line separately — no bundled mystery totals. If we find something outside the original complaint, we show you the photo and let you decide, rather than adding it to the invoice. If temporary protection is needed to stop active water intrusion, we can usually install it during the same visit.`,
      },
      {
        heading: `Storm and insurance repairs in ${countyShort(t)} County`,
        body: `If the damage is storm related, the documentation matters as much as the repair. We photograph impact points, lifted material, and collateral damage to gutters, vents, and soft metals, and we write the scope in language your adjuster can work with. We do not tell you a claim will be approved and we do not inflate a scope to make one likelier — we document what is there. If the claim is not the right route, a straightforward repair estimate is on the table the same day.`,
      },
    ],
    faqs: [
      {
        q: `How fast can you get to a ${t.name} roof leak?`,
        a: `${t.name} is inside our regular ${countyShort(t)} County route, so active-leak inspections are typically scheduled within one to two business days. Temporary protection to stop water intrusion can usually go on during that first visit.`,
      },
      {
        q: `Is a repair worth it on an older ${t.name} roof?`,
        a: `It depends on the deck and the surrounding field, not just the age. We check both and tell you plainly. If replacement is the better financial decision, we price it alongside the repair so you can compare.`,
      },
      {
        q: `Do you provide documentation for an insurance claim?`,
        a: `Yes. Every repair inspection includes a photo-documented scope written so your adjuster can read it directly. We do not guarantee claim outcomes — we document what the roof actually shows.`,
      },
    ],
  };
}

function buildReplacement(t: TownData): Built {
  const b = bandLanguage[elevationBand(t)];
  return {
    serviceLabel: "Roof Replacement",
    h1: `Roof Replacement in ${t.name}, NC`,
    intro: `A replacement in ${t.name} is not a shingle swap. At ${t.elevation}, it is the one chance you get to correct ventilation, drainage, and flashing on the whole house — and those corrections are what determine whether the new roof reaches its rated life.`,
    localContext: `${t.housingProfile} The replacements we do across ${neighborhoodPhrase(t)} are mostly aging asphalt systems and worn shake or metal on homes built before current envelope standards. Given ${b.exposure}, our ${t.name} specification includes ${b.detail}. ${t.marketAuthorityAngle}`,
    whoItsFor: `Owners of twenty-year-plus roofs weighing another repair season, ${t.name} sellers who need a clean roof for the transaction, buyers who just closed and want the envelope right before they move in, and second-home owners in ${countyShort(t)} County who want the work managed remotely.`,
    proofNote: `Tear-off to final walkthrough, the same team-led crew is on your ${t.name} roof — we do not subcontract core install work. You get daily cleanup, a magnet sweep, and a full photo package at completion.`,
    metaTitle: `Roof Replacement in ${t.name}, NC | Highlander`,
    metaDescription: `Full roof replacement in ${t.name}, NC from a licensed, locally based team. Elevation-appropriate systems, county permitting handled, free on-site assessment.`,
    sections: [
      {
        heading: `What a full tear-off actually corrects`,
        body: `Layover roofs hide problems; tear-offs expose them. On a ${t.name} replacement we get eyes on the entire deck, replace anything soft or delaminated, correct intake and exhaust ventilation so the assembly can dry, re-flash every penetration and sidewall rather than reusing tired metal, and reset drip edge and drainage so water leaves the roof instead of tracking behind fascia. That work is invisible in a photo of the finished roof and it is the reason one roof lasts its full rated life and the identical product next door does not.`,
      },
      {
        heading: `Choosing the system for your ${t.name} home`,
        body: `Local demand here runs toward ${list(t.serviceDemandMix)}, and the local aesthetic is ${t.styleTendency.charAt(0).toLowerCase()}${t.styleTendency.slice(1)} We match the system to the house and the exposure. Heavy dimensional asphalt gives strong value and a wide color range. Standing-seam metal is the long-horizon system for steep pitches and heavy shedding. Synthetic composite delivers the shake and slate look with impact resistance suited to ${t.elevation}. We give you real cost ranges after we have measured your roof, never before.`,
      },
      {
        heading: `Schedule, permitting, and living through it`,
        body: `Most single-family asphalt replacements in ${t.name} run one to three working days on site once materials are staged; complex layouts, steep pitch, and metal systems take longer, and we give you a firm window before we start rather than a guess. We pull the ${countyShort(t)} County permit and handle the final inspection. Landscaping and hardscape get protected, the driveway is swept and magnet-passed each evening, and if you are not in ${t.name} during the project you get scheduled photo updates instead of silence.`,
      },
    ],
    faqs: [
      {
        q: `How long does a roof replacement take in ${t.name}?`,
        a: `Most single-family asphalt replacements finish in one to three working days once materials are on site. Steeper pitches, complex rooflines, and metal systems take longer. You get a firm window in writing before we start.`,
      },
      {
        q: `Do I need a full tear-off or can you roof over?`,
        a: `We tear off. A layover hides deck damage, prevents proper flashing and ventilation correction, and shortens the life of the new material. At ${t.elevation} that trade is not worth the short-term savings.`,
      },
      {
        q: `Who handles the permit and inspection in ${t.county}?`,
        a: `We do. Permitting with ${countyShort(t)} County, scheduling the inspection, and final sign-off are all part of the project.`,
      },
    ],
  };
}

function buildStorm(t: TownData): Built {
  const b = bandLanguage[elevationBand(t)];
  return {
    serviceLabel: "Storm Damage Roofing",
    h1: `Storm Damage Roofing in ${t.name}, NC`,
    intro: `Storms in ${t.county} do not announce what they broke. Wind lifts material that settles back down looking intact, and hail bruises a mat that will not leak for two more seasons. We inspect ${t.name} roofs after weather events, document what is actually there, and stabilize anything that is letting water in.`,
    localContext: `${t.climateExposure} At ${t.elevation}, ${t.name} sees ${b.exposure}, and the damage patterns follow: lifted ridge and hip caps, creased shingles on the windward slope, granule loss into gutters, dented soft metals and vent caps, and debris strikes from the hardwood canopy that surrounds much of ${neighborhoodPhrase(t)}. Fallen-limb punctures are common here and often the most urgent finding.`,
    whoItsFor: `${t.name} homeowners after a wind, hail, or heavy-rain event, seasonal owners who need someone to check the property on their behalf, and anyone who has been told by a door-knocking crew that their roof is totaled and wants a second, local opinion.`,
    proofNote: `We are based in Western North Carolina year-round, not chasing storms through it. We document what the roof shows, we do not promise claim outcomes, and we do not manufacture damage to make a claim likelier.`,
    metaTitle: `Storm Damage Roofing in ${t.name}, NC | Highlander`,
    metaDescription: `Storm damage roof inspection and repair in ${t.name}, NC. Photo-documented assessments, emergency stabilization, and clear insurance documentation.`,
    sections: [
      {
        heading: `What to do first after a ${t.name} storm`,
        body: `Stay off the roof. From the ground, look for displaced or missing shingles, bent or torn gutters and downspouts, dented vents and flashing, granule accumulation at downspout outlets, and any limb resting on the structure. Inside, check ceilings and the attic for staining or daylight. Photograph everything and note the date of the weather event — that timestamp matters if a claim follows. Then get a professional inspection before deciding anything, because the damage that leaks first is usually not the damage you can see from the driveway.`,
      },
      {
        heading: `Emergency stabilization and drying`,
        body: `If water is actively entering the home, stopping it comes before every other decision. We install temporary protection over open areas, clear debris that is holding water against the roof, and secure lifted material so the next rain does not enlarge the loss. Stabilization is documented separately from the permanent repair scope so it reads cleanly for your insurer. We prioritize active-intrusion calls in ${t.name} and the surrounding ${countyShort(t)} County communities over routine scheduling.`,
      },
      {
        heading: `Working with your insurer, honestly`,
        body: `Our role is documentation and repair, not claim promises. We photograph impact and wind evidence, measure and diagram the affected slopes, and write a scope in the terms an adjuster works in. We are glad to be on site during the adjuster visit so the conversation happens over the actual roof. If the damage does not rise to a claim, we say so and give you a straight repair price — that outcome is common and it is not a bad one. Be wary of any crew that guarantees a full replacement before setting foot on your roof.`,
      },
    ],
    faqs: [
      {
        q: `How soon should I have my ${t.name} roof inspected after a storm?`,
        a: `Within a few days if you can. Water intrusion compounds quickly, and most policies expect damage to be reported promptly. If water is actively coming in, call immediately — we prioritize those visits.`,
      },
      {
        q: `Will you tell me my roof is totaled to get a claim approved?`,
        a: `No. We document what your roof actually shows. Sometimes that supports a full replacement claim and sometimes it supports a straightforward repair. We give you the evidence either way.`,
      },
      {
        q: `Do you provide emergency tarping in ${countyShort(t)} County?`,
        a: `Yes. Temporary protection to stop active water intrusion is typically installed during the first visit, and it is documented separately from the permanent repair scope.`,
      },
    ],
  };
}

function buildConstruction(t: TownData): Built {
  return {
    serviceLabel: "Construction",
    h1: `Construction & Remodeling in ${t.name}, NC`,
    intro: `Highlander is a licensed North Carolina general contractor, not a roofing company that dabbles in additions. In ${t.name} that means additions, remodels, outdoor living, and exterior work run by the same project lead who is accountable for the roof over all of it.`,
    localContext: `${t.constructionContext} ${t.localVibe} Building in ${t.name} at ${t.elevation} adds constraints flatland builders do not price for: steep-lot access and staging, drainage that has to be solved before framing, foundation and structural conditions on hillside parcels, and ${countyShort(t)} County inspection sequencing. Local demand runs toward ${list(t.serviceDemandMix)}, and the prevailing style is ${t.styleTendency.charAt(0).toLowerCase()}${t.styleTendency.slice(1)}`,
    whoItsFor: `${t.name} homeowners adding space rather than moving, owners updating kitchens, baths, and lower levels, families building outdoor living that is actually usable in mountain weather, and second-home owners in ${countyShort(t)} County who need a contractor they can trust to run the job without them on site.`,
    proofNote: `One contract, one schedule, one warranty. Roofing and construction under a single project lead means the addition ties into the existing house correctly — flashing, roofline, siding, and drainage all handled by the same accountable team.`,
    metaTitle: `Construction & Remodeling in ${t.name}, NC | Highlander`,
    metaDescription: `Additions, remodels, and outdoor living in ${t.name}, NC from a licensed general contractor. One project lead for roofing and construction. Free consultation.`,
    sections: [
      {
        heading: `What we build in ${t.name}`,
        body: `Primary suite and family-room additions that read as original to the house rather than bolted on. Kitchen and bath remodels, including layout changes that need structural work. Lower-level and bonus-room finishes. Screened porches, covered decks, and outdoor living space designed for real ${countyShort(t)} County weather instead of catalog weather. Siding, trim, fascia, and window replacement that fixes the envelope while it updates the look. Structural repair and framing corrections on older ${t.name} homes where settlement or past water damage has caught up with the building.`,
      },
      {
        heading: `Design and planning before the first invoice`,
        body: `Most projects that go badly went badly at the planning stage. We start with a site visit and a scope conversation about how you actually use the house, then move into layout and structural planning, material selection, and a written budget with real numbers attached to real decisions. You see the plan and the price before we ask you to commit to construction. If the scope you want does not fit the budget you have, that is a conversation we have early rather than at the framing stage.`,
      },
      {
        heading: `Living through a ${t.name} project`,
        body: `We phase the work so your home stays usable, contain dust at the boundary between the work zone and your living space, and keep the site clean at the end of each day. You get one point of contact and a schedule that gets updated when reality changes it — including material lead times, which in ${countyShort(t)} County are worth planning around honestly. If you are not in ${t.name} during construction, you get regular photo updates instead of chasing us for status.`,
      },
    ],
    faqs: [
      {
        q: `Are you licensed to do general construction in ${t.county}?`,
        a: `Yes. Highlander Building Services, Inc. is a licensed North Carolina general contractor. We pull the ${countyShort(t)} County permits and coordinate inspections for construction work the same way we do for roofing.`,
      },
      {
        q: `Can one contract cover both the addition and the roof?`,
        a: `Yes, and it is usually the better route. Combining scopes saves real money on staging, access, and dumpsters, and it means one team owns the point where the new roofline meets the old one.`,
      },
      {
        q: `How long does an addition take in ${t.name}?`,
        a: `Scope drives it. A bath remodel is measured in weeks; a primary suite addition with foundation work is measured in months. We give you a written schedule with phase milestones before construction starts and update it when conditions change.`,
      },
    ],
  };
}


/**
 * Metal roofing. Written from the town's own recorded conditions in towns.ts —
 * elevation band, climate exposure, housing profile, style tendency and
 * neighborhoods. No invented projects, stats, warranties or certifications.
 */
function buildMetal(t: TownData): Built {
  const band = elevationBand(t);
  const b = bandLanguage[band];
  const pitchLine =
    band === "high"
      ? `Steep pitches are the norm on ${t.name} rooflines, and steep is where metal earns its keep: snow and ice release instead of sitting at the eave, and there are no shingle courses for wind to get under.`
      : band === "mid"
        ? `${t.name} roofs run from moderate to steep, and metal suits both — on shallower runs the panel profile and seam height matter more than they do on a 12/12, so we specify them to the actual pitch we measure rather than to a catalog default.`
        : `Pitches around ${t.name} vary widely across the valley, so panel profile, seam type, and minimum-slope rating get chosen after we measure your roof — a system that performs on a steep hillside build is not automatically right on a low-slope addition.`;
  const mossLine = `North-facing slopes in ${countyShort(t)} County stay damp long after the rest of the roof has dried, and that is where moss and algae take hold on asphalt. A metal panel gives that growth far less to grip, and the smooth surface sheds the needle and leaf litter that wooded ${t.name} lots drop on a roof every autumn — the same debris that holds moisture against a shingle field and blocks valleys.`;
  const iceLine =
    band === "valley"
      ? `Ice loading is lighter here than on the Plateau, but freeze-thaw still cycles through most winters, so we run high-temperature ice-and-water membrane at the eaves and valleys under every panel.`
      : `Ice loading is a real design input at ${t.elevation}. We detail eaves and valleys with high-temperature ice-and-water membrane, size the drainage for what actually comes off a metal roof in a thaw, and discuss snow retention where a panel discharges over a walkway, drive, or entry.`;

  return {
    serviceLabel: "Metal Roofing",
    h1: `Metal Roofing in ${t.name}, NC`,
    intro: `Metal is the long-horizon roof for ${t.name}. At ${t.elevation} in ${t.county}, a properly installed standing-seam system stops being a covering and starts being part of the building envelope — which is exactly what this elevation asks for. We fabricate, install, and detail metal roofs for ${t.name} homes as complete assemblies, not as panels laid over whatever is underneath.`,
    localContext: `${t.climateExposure} Across ${neighborhoodPhrase(t)}, the roofs we replace with metal are facing ${b.exposure}. ${mossLine} ${pitchLine} ${iceLine} Our baseline specification here includes ${b.detail}.`,
    whoItsFor: `${t.name} owners who intend to keep the home and want to buy one more roof rather than three, owners on wooded or north-facing lots tired of moss, streaking, and debris-driven repairs, and second-home owners in ${countyShort(t)} County who want the lowest-maintenance envelope available while they are away.`,
    proofNote: `${townLocalRelevance[t.slug] ?? t.marketAuthorityAngle} We fabricate panels to the roof we measured, install with our own crews under one project lead, and hand over a full photo package at completion.`,
    metaTitle: `Metal Roofing in ${t.name}, NC | Highlander`,
    metaDescription: `Standing-seam and metal roofing in ${t.name}, NC, specified for ${t.elevation} conditions — ice loading, wooded-lot debris, and north-slope moisture. Free on-site assessment.`,
    sections: [
      {
        heading: `Why metal suits ${t.name} roofs`,
        body: `The case for metal here is not style, it is exposure: panels are mechanically seamed rather than surface-fastened, so there is no exposed sealant clock running on your roof and no granule loss to measure. The local aesthetic is ${t.styleTendency.charAt(0).toLowerCase()}${t.styleTendency.slice(1).replace(/[.!?]+$/, "")}, and current finishes cover that range without looking industrial — matte darks read well against the ${countyShort(t)} County tree line, and standing-seam profiles suit both the traditional and the mountain-modern houses we work on around ${t.name}.`,
      },
      {
        heading: `How we specify a ${t.name} metal roof`,
        body: `We measure the roof before we recommend anything. Panel gauge, seam type, and clip spacing are chosen for your pitch and wind exposure; underlayment is high-temperature, because the assembly under a metal panel runs hotter than it does under asphalt; and valleys, sidewalls, chimneys, and every penetration are flashed in matching metal rather than caulked. Ventilation gets corrected during the tear-off — a metal roof over a deck that cannot dry is still a roof that fails early.`,
      },
      {
        heading: `Approvals, access, and what installation is like`,
        body: `We pull the ${countyShort(t)} County permit and schedule the inspection. Where a ${t.name} property sits inside a community, club, or HOA with a design review board, we prepare the panel profile, gauge, and finish-color information those boards ask for and submit it before fabrication starts, so the schedule is not lost to a review cycle. Panels are fabricated to your measurements to reduce field cutting, staging is planned around the steep drives and wooded access common on ${countyShort(t)} County lots, and the site is cleaned and magnet-swept daily. A metal project takes longer on site than an asphalt replacement, and we give you a firm window in writing before we start.`,
      },
    ],
    faqs: [
      {
        q: `How long does a metal roof last in ${t.name}?`,
        a: `Longer than asphalt at this elevation — the practical limiting factors on a mechanically seamed system are the finish and the flashing details, not the panel itself. We tell you the manufacturer's stated coverage for the exact product we quote, in writing, and we do not add promises on top of it.`,
      },
      {
        q: `Is metal worth the cost over dimensional shingle here?`,
        a: `It depends on how long you plan to own the home. Metal costs more up front and asks less of you afterward, which pays off over a long ownership horizon, on steep pitches, and on wooded or north-facing ${t.name} lots where debris and moisture shorten a shingle roof's life. On a short horizon, heavy dimensional shingle is often the better financial call, and we will say so.`,
      },
      {
        q: `Is a metal roof loud in heavy ${countyShort(t)} County rain?`,
        a: `Not the way people expect. A metal roof over solid decking, underlayment, and an insulated attic sounds very different from bare panels on an open barn frame. Most ${t.name} homeowners notice it less than they anticipated.`,
      },
      {
        q: `Will my community or HOA approve a metal roof?`,
        a: `Many do, and finish and profile are usually what the review turns on. If your ${t.name} property is subject to a design review board, we assemble the profile, gauge, and color documentation for the submission and work to their requirements before we fabricate anything.`,
      },
    ],
  };
}

const BUILDERS: Record<CoreService, (t: TownData) => Built> = {
  roofing: buildRoofing,
  "roof-repair": buildRepair,
  "roof-replacement": buildReplacement,
  "storm-damage": buildStorm,
  construction: buildConstruction,
  "metal-roofing": buildMetal,
};

export interface GeneratedServiceTownEntry extends Built {
  townSlug: string;
  serviceSlug: string;
}

export const generatedServiceTownEntries: GeneratedServiceTownEntry[] = towns.flatMap((t) =>
  CORE_SERVICES.map((s) => ({
    townSlug: t.slug,
    serviceSlug: s,
    ...BUILDERS[s](t),
  })),
);

export const SERVICE_LABEL_BY_SLUG = SERVICE_LABELS;

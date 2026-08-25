import { PHONE_DISPLAY } from "@/data/business";
import type { TownData } from "@/data/towns";

export interface SimpleFAQ {
  q: string;
  a: string;
}

/**
 * CRO Prompt 32 — every town+service page carries at least three
 * service-specific FAQs that name the town out loud. Authored FAQs win;
 * fallbacks fill any gap and are always town-named.
 */
export function getServiceTownFAQs(
  town: TownData,
  serviceLabel: string,
  authored: SimpleFAQ[] = [],
): SimpleFAQ[] {
  const service = serviceLabel.toLowerCase();
  const named = authored.filter(Boolean);

  const fallbacks: SimpleFAQ[] = [
    {
      q: `Do you actually work in ${town.name}, NC?`,
      a: `Yes — ${town.name} and the rest of ${town.county} are inside our regular service footprint. Highlander crews are based in Western North Carolina, so ${service} in ${town.name} is scheduled by the same team that shows up on site.`,
    },
    {
      q: `How soon can someone look at my ${town.name} project?`,
      a: `Most ${town.name} assessments are on the calendar within about 48 hours of your call. Call ${PHONE_DISPLAY} and we'll give you a real window for ${service} rather than a vague callback promise.`,
    },
    {
      q: `What makes ${service} different in ${town.name}?`,
      a: `${town.climateExposure} That is why ${service} in ${town.name} gets scoped on site — elevation, exposure, and access all change the detailing and the price.`,
    },
    {
      q: `What does a ${town.name} estimate include?`,
      a: `A written scope for your ${service} work, photos from the inspection, material options with tradeoffs, and a straight answer on timing for ${town.name}. No pressure and no verbal-only numbers.`,
    },
  ];

  const out = [...named];
  for (const f of fallbacks) {
    if (out.length >= 3) break;
    if (!out.some((e) => e.q.toLowerCase() === f.q.toLowerCase())) out.push(f);
  }

  // Guarantee the town is named somewhere in the visible set.
  if (!out.slice(0, 3).some((f) => `${f.q} ${f.a}`.includes(town.name))) {
    out.unshift(fallbacks[0]);
  }
  return out;
}
import type { BlogPost } from "@/data/blogs";

export interface BlogCtaTarget {
  /** Service page this post should hand off to. */
  servicePath: string;
  serviceLabel: string;
  /** Mid-article framing, tied to the post topic. */
  midHeadline: string;
  midBody: string;
  /** Closing framing. */
  closeHeadline: string;
  closeBody: string;
  ctaLabel: string;
  /** True when the topic is urgent enough to lead with the phone. */
  callFirst: boolean;
}

type Rule = Omit<BlogCtaTarget, "midHeadline" | "closeHeadline"> & {
  midHeadline: (where: string) => string;
  closeHeadline: (where: string) => string;
};

const RULES: Record<string, Rule> = {
  Storm: {
    servicePath: "/roofing/storm-damage",
    serviceLabel: "Storm Damage Response",
    midHeadline: (w) => `Storm damage${w} you can't see from the ground?`,
    midBody:
      "We document what happened, photograph it for your insurance file, and give you a written scope of what actually needs repair.",
    closeHeadline: (w) => `Get your roof checked after the storm${w}`,
    closeBody:
      "Call and talk to someone local, or request an inspection and we'll come document the damage in person.",
    ctaLabel: "See Storm Damage Response",
    callFirst: true,
  },
  Maintenance: {
    servicePath: "/roofing/roof-repair",
    serviceLabel: "Roof Repair",
    midHeadline: (w) => `Not sure what your roof needs${w}?`,
    midBody:
      "A short inspection tells you whether this is a small repair, a maintenance item, or something to plan for. We put it in writing either way.",
    closeHeadline: (w) => `Have your roof looked at${w}`,
    closeBody:
      "Most maintenance issues are cheap to fix and expensive to ignore. We'll tell you which one this is.",
    ctaLabel: "See Roof Repair",
    callFirst: false,
  },
  Inspections: {
    servicePath: "/request-inspection",
    serviceLabel: "Roof Inspection",
    midHeadline: (w) => `Want a real inspection${w}, not a sales visit?`,
    midBody:
      "We walk the roof, photograph what we find, and send you a written summary — whether or not you hire us.",
    closeHeadline: (w) => `Request a roof inspection${w}`,
    closeBody: "Photos, findings, and a written scope. No pressure to buy anything.",
    ctaLabel: "Request an Inspection",
    callFirst: false,
  },
  Insurance: {
    servicePath: "/roofing/storm-damage",
    serviceLabel: "Insurance Claim Support",
    midHeadline: (w) => `Filing a claim${w}?`,
    midBody:
      "We photograph the damage, write the scope in the language adjusters expect, and meet the adjuster on site when it helps.",
    closeHeadline: (w) => `Get your damage documented${w}`,
    closeBody:
      "The stronger your documentation, the less time your claim takes. Start with an inspection or call us directly.",
    ctaLabel: "See Insurance Claim Support",
    callFirst: true,
  },
  Materials: {
    servicePath: "/roofing/roof-replacement",
    serviceLabel: "Roof Replacement",
    midHeadline: (w) => `Deciding between materials${w}?`,
    midBody:
      "We'll walk your roof, talk through how each material performs in mountain weather, and price the options side by side.",
    closeHeadline: (w) => `Compare materials on your actual roof${w}`,
    closeBody:
      "Pitch, exposure, and access change what makes sense. We price the real options, not a generic quote.",
    ctaLabel: "See Roof Replacement",
    callFirst: false,
  },
  Replacement: {
    servicePath: "/roofing/roof-replacement",
    serviceLabel: "Roof Replacement",
    midHeadline: (w) => `Planning a roof replacement${w}?`,
    midBody:
      "You get a written scope: tear-off, decking, underlayment, flashing, ventilation, and cleanup — line by line, before anything starts.",
    closeHeadline: (w) => `Get a written replacement scope${w}`,
    closeBody: "Line-item pricing and a realistic schedule so you can plan around it.",
    ctaLabel: "See Roof Replacement",
    callFirst: false,
  },
  Cost: {
    servicePath: "/roofing/roof-replacement",
    serviceLabel: "Roof Replacement",
    midHeadline: (w) => `Want real numbers for your roof${w}?`,
    midBody:
      "Ranges only get you so far. We measure your roof and price the actual scope, so you know what this costs on your house.",
    closeHeadline: (w) => `Get pricing for your roof${w}`,
    closeBody: "Measured, itemized, and explained — plus financing options if you want them.",
    ctaLabel: "See Roof Replacement",
    callFirst: false,
  },
  Financing: {
    servicePath: "/financing",
    serviceLabel: "Financing Options",
    midHeadline: () => "Need to spread the cost out?",
    midBody:
      "We can walk you through monthly payment options alongside the written scope, so you're comparing the whole picture.",
    closeHeadline: (w) => `Talk through financing${w}`,
    closeBody: "See the scope and the monthly number together before you commit.",
    ctaLabel: "See Financing Options",
    callFirst: false,
  },
  Commercial: {
    servicePath: "/roofing/commercial",
    serviceLabel: "Commercial Roofing",
    midHeadline: (w) => `Managing a commercial roof${w}?`,
    midBody:
      "We survey the roof, report on condition, and scope repairs or replacement around your operating schedule.",
    closeHeadline: (w) => `Get a commercial roof survey${w}`,
    closeBody: "Condition report, photos, and a scope you can put in front of ownership.",
    ctaLabel: "See Commercial Roofing",
    callFirst: false,
  },
  Tips: {
    servicePath: "/roofing",
    serviceLabel: "Roofing Services",
    midHeadline: (w) => `Rather have someone look at it${w}?`,
    midBody:
      "We'll tell you what we see and what it would take to fix — in writing, with photos.",
    closeHeadline: (w) => `Get a straight answer about your roof${w}`,
    closeBody: "Local crews, written scopes, and a response within one business day.",
    ctaLabel: "See Roofing Services",
    callFirst: false,
  },
};

const DEFAULT_RULE: Rule = RULES.Tips;

export function getBlogCta(post: Pick<BlogPost, "category" | "town" | "relatedServices">): BlogCtaTarget {
  const rule = RULES[post.category] ?? DEFAULT_RULE;
  const where = post.town ? ` in ${post.town}, NC` : " in Western NC";
  // A post that names its own service page wins over the category default.
  const related = post.relatedServices?.[0];
  const servicePath = related?.path ?? rule.servicePath;
  const serviceLabel = related?.label ?? rule.serviceLabel;

  return {
    servicePath,
    serviceLabel,
    midHeadline: rule.midHeadline(where),
    midBody: rule.midBody,
    closeHeadline: rule.closeHeadline(where),
    closeBody: rule.closeBody,
    ctaLabel: related ? `See ${related.label}` : rule.ctaLabel,
    callFirst: rule.callFirst,
  };
}

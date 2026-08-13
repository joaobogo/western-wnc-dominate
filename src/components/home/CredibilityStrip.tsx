import { Star, ShieldCheck, MapPin, Award, Hammer } from "lucide-react";
import { GOOGLE_REVIEW_AGGREGATE } from "@/data/reviews";

/**
 * Two-line credibility strip directly under the hero.
 * Line 1: rating + licensing + locality. Line 2: verifiable credentials only.
 * No guarantees, warranty promises, or response-time claims.
 */
const CredibilityStrip = () => {
  const { ratingValue, reviewCount } = GOOGLE_REVIEW_AGGREGATE;

  const primary = [
    { icon: Star, label: `${ratingValue}★ Google · ${reviewCount}+ reviews` },
    { icon: ShieldCheck, label: "Licensed general contractor · Fully insured" },
    { icon: MapPin, label: "Crews based in Franklin, serving Western North Carolina" },
  ];

  const secondary = [
    { icon: Award, label: "CertainTeed ShingleMaster credentialed" },
    { icon: Award, label: "Brava preferred installer" },
    { icon: Hammer, label: "Roofing and construction under one contractor" },
  ];

  return (
    <section
      aria-label="Highlander credibility"
      className="bg-primary text-primary-foreground border-y border-[hsl(var(--highland-gold)/0.25)]"
    >
      <div className="container-tight py-5 md:py-6 space-y-2.5">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {primary.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
              <span className="font-body text-[13px] md:text-sm font-semibold">{item.label}</span>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
          {secondary.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <item.icon className="w-3.5 h-3.5 text-primary-foreground/60" aria-hidden="true" />
              <span className="font-body text-[12px] text-primary-foreground/80">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CredibilityStrip;

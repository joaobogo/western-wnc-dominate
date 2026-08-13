import { MapPin, ShieldCheck } from "lucide-react";
import type { TownData } from "@/data/towns";

interface Props {
  town: TownData;
  serviceLabel: string;
  /** Authored, page-specific proof line from the content entry. */
  proofNote?: string;
}

/**
 * CRO Prompt 32 — two concrete local proof points directly under the hero of
 * every town+service page, before any browsing links.
 */
const ServiceTownProofPoints = ({ town, serviceLabel, proofNote }: Props) => {
  const points = [
    {
      icon: MapPin,
      label: `Local to ${town.county} County`,
      body:
        proofNote?.trim() ||
        `Highlander crews work ${town.name} and the surrounding ${town.county} County roads regularly — the person who scopes your ${serviceLabel.toLowerCase()} is on site with the crew that does it.`,
    },
    {
      icon: ShieldCheck,
      label: `Built for ${town.name} conditions`,
      body: town.climateExposure,
    },
  ];

  return (
    <section className="bg-muted/20 border-y border-border">
      <div className="container-tight py-8 md:py-10 grid gap-6 md:grid-cols-2">
        {points.map(({ icon: Icon, label, body }) => (
          <div key={label} className="flex gap-4">
            <span className="mt-1 shrink-0 w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" aria-hidden="true" >
            </span>
            <div>
              <p className="font-heading font-bold text-sm uppercase tracking-wide mb-1">{label}</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceTownProofPoints;
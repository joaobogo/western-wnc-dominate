import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { BUSINESS, directionsUrl, formatPhoneDisplay, napLine, telHref } from "@/data/business";

/**
 * Both showrooms rendered in the exact NAP format used on Google Business
 * Profile. Every value comes from `src/data/business.ts` — the single source
 * of truth — so schema, footer, and contact page can never disagree.
 */
const LocationCards = ({ className = "", dark = false }: { className?: string; dark?: boolean }) => {
  const body = dark ? "text-dark-section-muted" : "text-muted-foreground";
  const strong = dark ? "text-[hsl(var(--dark-section-foreground))]" : "text-foreground";

  return (
    <div className={`grid gap-6 sm:grid-cols-2 ${className}`}>
      {BUSINESS.locations.map((loc) => (
        <div key={loc.id} className="border border-border bg-card p-5 md:p-6">
          <p className={`text-caption font-body font-bold uppercase tracking-[0.2em] text-[hsl(var(--gold-ink))] mb-3`}>
            {loc.name}
            {loc.primary ? " · Primary" : ""}
          </p>
          <address className={`not-italic text-body-sm font-body ${body} space-y-2`}>
            <span className={`block font-heading font-semibold ${strong}`}>{BUSINESS.legalName}</span>
            <span className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{napLine(loc)}</span>
            </span>
            <span className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <a
                href={telHref(loc.phoneE164)}
                className={`font-heading font-semibold ${strong} hover:text-primary transition-colors`}
                aria-label={`Call the ${loc.name} at ${formatPhoneDisplay(loc.phoneE164)}`}
              >
                {formatPhoneDisplay(loc.phoneE164)}
              </a>
            </span>
            <span className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{loc.hours.map((h) => h.label).join(" · ")}</span>
            </span>
          </address>
          <a
            href={directionsUrl(loc)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-body-xs font-body font-semibold uppercase tracking-wider text-primary hover:underline"
          >
            Get directions <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      ))}
    </div>
  );
};

export default LocationCards;

import { Phone, MapPin, Clock, Car } from "lucide-react";
import { formatPhoneDisplay, napLine, telHref } from "@/data/business";
import type { Showroom } from "@/data/showrooms";

/**
 * Above-the-fold NAP block for a showroom page. Every value is derived from
 * `src/data/business.ts` so the page can never drift from Google Business
 * Profile. `src/test/showroom-pages.test.tsx` asserts on this rendering.
 */
const ShowroomIdentity = ({ showroom }: { showroom: Showroom }) => {
  const loc = showroom.location;
  const address = napLine(loc);
  const phone = formatPhoneDisplay(loc.phoneE164);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex gap-3">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
        <div>
          <p className="eyebrow mb-1 text-muted-foreground">Address</p>
          <p className="font-body text-body font-semibold text-foreground">{address}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
        <div>
          <p className="eyebrow mb-1 text-muted-foreground">{showroom.cardLabel} phone</p>
          <a
            href={telHref(loc.phoneE164)}
            className="font-body text-body font-semibold text-foreground underline decoration-[hsl(var(--gold-ink))] decoration-2 underline-offset-4"
          >
            {phone}
          </a>
        </div>
      </div>
      <div className="flex gap-3">
        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
        <div>
          <p className="eyebrow mb-1 text-muted-foreground">Hours</p>
          {loc.hours.map((h) => (
            <p key={h.label} className="font-body text-body font-semibold text-foreground">
              {h.label}
            </p>
          ))}
          <p className="font-body text-body-sm text-muted-foreground">Walk in or call ahead — no appointment required.</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Car className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
        <div>
          <p className="eyebrow mb-1 text-muted-foreground">Parking</p>
          <p className="font-body text-body text-foreground">{showroom.parking}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowroomIdentity;

import { Clock, MapPin, Phone } from "lucide-react";
import Section from "@/components/layout/Section";
import {
  BUSINESS,
  formatPhoneDisplay,
  napLine,
  telHref,
  type BusinessLocation,
} from "@/data/business";

/**
 * Physical showroom block for the town page that actually has a showroom.
 * Same visual language as the /contact office block: NAP, hours, phone,
 * a lazy Google Maps embed and an "Open in Google Maps" link.
 */
const ShowroomVisitBlock = ({ location }: { location: BusinessLocation }) => {
  const address = napLine(location);
  const encoded = encodeURIComponent(address);

  return (
    <Section density="default" width="wide">
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        <div className="border border-border bg-card p-6 md:p-8">
          <span className="eyebrow mb-3 block">Visit us</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
            {BUSINESS.brandName} — {location.locality}
          </h2>

          <div className="flex items-start gap-3 mb-5">
            <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-1" aria-hidden="true" />
            <address className="not-italic text-body-sm font-body text-foreground leading-relaxed">
              {location.streetAddress}
              <br />
              {location.locality}, {location.region} {location.postalCode}
            </address>
          </div>

          <div className="flex items-start gap-3 mb-5">
            <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-1" aria-hidden="true" />
            <a
              href={telHref(location.phoneE164)}
              className="text-body-sm font-body font-semibold text-foreground hover:text-primary transition-colors"
            >
              {formatPhoneDisplay(location.phoneE164)}
            </a>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-1" aria-hidden="true" />
            <dl className="text-body-sm font-body space-y-1">
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Monday – Friday</dt>
                <dd className="font-semibold text-foreground">8:00 AM – 5:00 PM</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Saturday &amp; Sunday</dt>
                <dd className="font-semibold text-foreground">By appointment</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="relative overflow-hidden border border-border bg-card flex flex-col">
          <div className="aspect-video w-full relative flex-1">
            <iframe
              title={`Map showing the ${BUSINESS.brandName} ${location.locality} showroom`}
              src={`https://www.google.com/maps?q=${encoded}&output=embed&z=14`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              aria-label={`Map showing ${address}`}
            />
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encoded}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm group m-4"
          >
            <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
            <span className="text-body-sm font-body font-semibold text-foreground">
              Open {address} in Google Maps
            </span>
          </a>
        </div>
      </div>
    </Section>
  );
};

export default ShowroomVisitBlock;

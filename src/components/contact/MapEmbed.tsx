import { MapPin } from "lucide-react";

/**
 * Lazy-loaded Google Maps embed for the Franklin office.
 *
 * Uses the standard Google Maps embed endpoint (no API key required
 * for a simple place embed) with a local link fallback. The iframe is
 * delayed until it is near the viewport to avoid blocking the page.
 */
const MapEmbed = ({ className = "" }: { className?: string }) => {
  const address = "76 Creative Dr, Franklin, NC 28734";
  const encoded = encodeURIComponent(address);
  const src = `https://www.google.com/maps?q=${encoded}&output=embed&z=14`;

  return (
    <div className={`relative overflow-hidden border border-border bg-card ${className}`}>
      <div className="aspect-video w-full relative">
        <iframe
          title="Highlander Building Services Franklin office location"
          src={src}
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
        className="btn btn-secondary btn-sm group"
      >
        <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
        <span className="text-body-sm font-body font-semibold text-foreground">
          Open {address} in Google Maps
        </span>
      </a>
    </div>
  );
};

export default MapEmbed;

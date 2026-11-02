import { useRef, useState } from "react";
import { FRANKLIN_NAP } from "@/data/business";
import { MapPin } from "lucide-react";
import { useDeferredEmbed } from "@/lib/useDeferredEmbed";

/**
 * Deferred Google Maps embed for the Franklin office.
 *
 * Uses the standard Google Maps embed endpoint (no API key required
 * for a simple place embed) with a local link fallback. Google Maps is
 * ~1.4 MB of script, so the iframe only mounts once the visitor has
 * interacted with the page and the map is near the viewport, or when
 * they tap "Load map".
 */
const MapEmbed = ({ className = "" }: { className?: string }) => {
  const address = `${FRANKLIN_NAP}`;
  const encoded = encodeURIComponent(address);
  const src = `https://www.google.com/maps?q=${encoded}&output=embed&z=14`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const ready = useDeferredEmbed(wrapRef);
  const [manual, setManual] = useState(false);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden border border-border bg-card ${className}`}>
      <div className="aspect-video w-full relative bg-muted">
        {ready || manual ? (
          <iframe
            title="Highlander Building Services Franklin office location"
            src={src}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            aria-label={`Map showing ${address}`}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <MapPin className="h-6 w-6 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
            <p className="font-body text-body-sm text-muted-foreground max-w-sm">{address}</p>
            <button type="button" onClick={() => setManual(true)} className="btn btn-secondary btn-sm">
              <span className="font-body text-body-sm font-semibold">Load map</span>
            </button>
          </div>
        )}
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary btn-sm group"
      >
        <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
        <span className="text-body-sm font-body font-semibold text-foreground">
          Open {address} in Google Maps
        </span>
      </a>
    </div>
  );
};

export default MapEmbed;

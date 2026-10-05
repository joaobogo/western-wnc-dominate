import { useEffect, useRef, useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { napLine, directionsUrl, type BusinessLocation } from "@/data/business";
import { hasConsent, onConsentChange } from "@/lib/consent";

/**
 * Consent-aware, lazily mounted Google Maps embed for a showroom.
 *
 * The iframe is a third-party frame, so it only mounts when the visitor has
 * accepted functional cookies AND the block has scrolled near the viewport.
 * Without consent the visitor still gets the address plus a Directions link,
 * so the page never depends on the embed to be useful.
 */
const ShowroomMap = ({
  location,
  className = "",
}: {
  location: BusinessLocation;
  className?: string;
}) => {
  const address = napLine(location);
  const encoded = encodeURIComponent(address);
  const src = `https://www.google.com/maps?q=${encoded}&output=embed&z=15`;

  const wrapRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [allowed, setAllowed] = useState(() => hasConsent("functional"));
  const [manual, setManual] = useState(false);

  useEffect(() => onConsentChange(() => setAllowed(hasConsent("functional"))), []);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const showEmbed = near && (allowed || manual);

  return (
    <div ref={wrapRef} className={`overflow-hidden border border-border bg-card ${className}`}>
      <div className="relative aspect-video w-full bg-muted">
        {showEmbed ? (
          <iframe
            title={`Map showing the Highlander Building Services ${location.name} at ${address}`}
            src={src}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <MapPin className="h-6 w-6 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
            <p className="font-body text-body-sm text-muted-foreground max-w-sm">
              The interactive map loads from Google. Load it here, or open directions in a new tab.
            </p>
            <button type="button" onClick={() => setManual(true)} className="btn btn-secondary btn-sm">
              <span className="font-body text-body-sm font-semibold">Load map</span>
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-body-sm text-foreground">{address}</p>
        <a
          href={directionsUrl(location)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm"
        >
          <span className="font-body text-body-sm font-semibold">Get directions</span>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

export default ShowroomMap;

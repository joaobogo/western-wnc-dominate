import { useState } from "react";
import { Car, Loader2, Navigation } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { directionsUrl, napLine, type BusinessLocation } from "@/data/business";

interface CommuteResult {
  originLabel: string;
  originLatLng: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  durationMinutes: number;
  distanceMiles: number;
}

/**
 * "How far am I from this showroom?" — the visitor types their address and
 * gets a real drive time, distance and route line to this building.
 *
 * Nothing third-party loads until the visitor submits, so the location page
 * keeps its LCP and third-party JS budget.
 */
const ShowroomCommute = ({
  location,
  showroomSlug,
  originHint,
  className = "",
}: {
  location: BusinessLocation;
  showroomSlug: string;
  /** Town the visitor is on (town pages) — makes the helper line page-specific instead of one shared paragraph. */
  originHint?: string;
  className?: string;
}) => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CommuteResult | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("commute-route", {
        body: { origin: address, showroom: showroomSlug },
      });
      if (fnError) throw fnError;
      if (!data || (data as { error?: string }).error) {
        throw new Error((data as { error?: string })?.error ?? "Lookup failed");
      }
      const payload = data as CommuteResult;
      setResult(payload);
    } catch {
      setError("We could not calculate that drive. Check the address and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`border border-border bg-card p-6 md:p-8 ${className}`}>
      <span className="eyebrow mb-3 block">Drive Time</span>
      <h2 className="section-heading mb-3">
        How far are you from the {location.locality} showroom?
      </h2>
      <p className="mb-6 max-w-2xl font-body text-body-sm text-muted-foreground">
        {originHint
          ? `Enter your ${originHint} street address or ZIP code and we will show the driving time and route from ${originHint} to `
          : "Enter your street address, town or ZIP code and we will show the driving time and route to "}
        {napLine(location)}.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`commute-${showroomSlug}`} className="sr-only">
          Your address, town or ZIP code
        </label>
        <input
          id={`commute-${showroomSlug}`}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Main St, Highlands NC"
          autoComplete="street-address"
          maxLength={200}
          className="flex-1 border border-border bg-background px-4 py-3 font-body text-body text-foreground placeholder:text-muted-foreground focus:border-[hsl(var(--highland-gold))] focus:outline-none"
        />
        <button type="submit" className="btn btn-primary" disabled={loading || address.trim().length < 3}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Car className="h-4 w-4" aria-hidden="true" />
          )}
          <span>{loading ? "Calculating" : "Get drive time"}</span>
        </button>
      </form>

      <div aria-live="polite">
        {error && <p className="mt-4 font-body text-body-sm text-destructive">{error}</p>}

        {result && (
          <div className="mt-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border border-border bg-background p-4">
                <p className="font-body text-body-sm text-muted-foreground">Driving time</p>
                <p className="font-heading text-2xl font-bold text-foreground">
                  {result.durationMinutes} min
                </p>
              </div>
              <div className="border border-border bg-background p-4">
                <p className="font-body text-body-sm text-muted-foreground">Distance</p>
                <p className="font-heading text-2xl font-bold text-foreground">
                  {result.distanceMiles} mi
                </p>
              </div>
              <div className="border border-border bg-background p-4">
                <p className="font-body text-body-sm text-muted-foreground">From</p>
                <p className="font-body text-body-sm leading-snug text-foreground">
                  {result.originLabel}
                </p>
              </div>
            </div>
            <a
              href={directionsUrl(location)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary mt-6"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              <span>Open turn-by-turn directions</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShowroomCommute;

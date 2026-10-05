// Drive-time lookup for the two Highlander showrooms.
//
// Takes a visitor-typed origin address plus a known showroom destination,
// geocodes the origin and computes a driving route through the
// Lovable connector gateway. Returns duration, distance and an encoded
// polyline so the browser can draw the route.
//
// Bounded on purpose: origin string is length-capped, destinations must match
// a known showroom coordinate, and only one route is computed per request.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GATEWAY = "https://connector-gateway.lovable.dev/google_maps";
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY") ?? "";
const GOOGLE_MAPS_API_KEY = Deno.env.get("GOOGLE_MAPS_API_KEY") ?? "";

// Known showroom destinations — anything else is rejected so this endpoint
// can never be used as a generic routing proxy. Franklin intentionally uses
// the full confirmed postal address while its Business Profile is updated.
const DESTINATIONS: Record<string, { address?: string; lat?: number; lng?: number }> = {
  "franklin-nc": { address: "40 Depot Street, Franklin, NC 28734" },
  "sylva-nc": { lat: 35.3585, lng: -83.1812 },
};

function routeWaypoint(dest: { address?: string; lat?: number; lng?: number }) {
  if (dest.address) return { address: dest.address };
  if (typeof dest.lat === "number" && typeof dest.lng === "number") {
    return { location: { latLng: { latitude: dest.lat, longitude: dest.lng } } };
  }
  return null;
}

const authHeaders = {
  Authorization: `Bearer ${LOVABLE_API_KEY}`,
  "X-Connection-Api-Key": GOOGLE_MAPS_API_KEY,
};

function fail(status: number, error: string, details?: unknown) {
  return new Response(JSON.stringify({ error, details }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function gatewayError(res: Response) {
  const body = await res.text();
  console.error(`Google Maps gateway failed [${res.status}]: ${body}`);
  if (res.status === 403) {
    const reason =
      (() => {
        try {
          return (JSON.parse(body)?.error?.details ?? []).find(
            (d: { reason?: string }) => d.reason,
          )?.reason as string | undefined;
        } catch {
          return undefined;
        }
      })() ?? "";
    if (reason === "API_KEY_HTTP_REFERRER_BLOCKED") {
      return fail(403, "Maps server key is referrer-restricted.", body);
    }
    if (reason === "API_KEY_SERVICE_BLOCKED") {
      return fail(403, "Maps server key does not allow this API.", body);
    }
  }
  return fail(res.status, "Google Maps request failed", body);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return fail(405, "Method not allowed");
  if (!LOVABLE_API_KEY || !GOOGLE_MAPS_API_KEY) {
    return fail(500, "Google Maps connector is not configured");
  }

  let payload: { origin?: unknown; showroom?: unknown };
  try {
    payload = await req.json();
  } catch {
    return fail(400, "Invalid JSON body");
  }

  const origin = typeof payload.origin === "string" ? payload.origin.trim().slice(0, 200) : "";
  const showroom = typeof payload.showroom === "string" ? payload.showroom : "";
  const dest = DESTINATIONS[showroom];
  const destination = dest ? routeWaypoint(dest) : null;

  if (origin.length < 3) return fail(400, "Enter a street address, town or ZIP code.");
  if (!dest || !destination) return fail(400, "Unknown showroom");

  // 1) Geocode the visitor address (legacy Geocoding API — no sub-API prefix).
  const geoRes = await fetch(
    `${GATEWAY}/maps/api/geocode/json?address=${encodeURIComponent(origin)}&region=us&components=country:US`,
    { headers: authHeaders },
  );
  if (!geoRes.ok) return gatewayError(geoRes);
  const geo = await geoRes.json();
  const hit = geo?.results?.[0];
  if (!hit?.geometry?.location) {
    return fail(422, "We could not find that address. Try adding the town and state.");
  }

  // 2) Compute the driving route (Routes API).
  const routeRes = await fetch(`${GATEWAY}/routes/directions/v2:computeRoutes`, {
    method: "POST",
    headers: {
      ...authHeaders,
      "Content-Type": "application/json",
      "X-Goog-FieldMask":
        "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.viewport",
    },
    body: JSON.stringify({
      origin: {
        location: {
          latLng: {
            latitude: hit.geometry.location.lat,
            longitude: hit.geometry.location.lng,
          },
        },
      },
      destination,
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE",
      languageCode: "en-US",
      units: "IMPERIAL",
    }),
  });
  if (!routeRes.ok) return gatewayError(routeRes);
  const routeJson = await routeRes.json();
  const route = routeJson?.routes?.[0];
  if (!route) return fail(422, "No driving route found from that address.");

  const seconds = Number(String(route.duration ?? "0s").replace("s", ""));
  const miles = (route.distanceMeters ?? 0) / 1609.344;

  return new Response(
    JSON.stringify({
      originLabel: hit.formatted_address as string,
      originLatLng: {
        lat: hit.geometry.location.lat as number,
        lng: hit.geometry.location.lng as number,
      },
      destination: dest,
      durationMinutes: Math.max(1, Math.round(seconds / 60)),
      distanceMiles: Math.round(miles * 10) / 10,
      polyline: route.polyline?.encodedPolyline ?? null,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});

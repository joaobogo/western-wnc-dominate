// The backend client is imported lazily so it stays out of the critical bundle.

// Types for tracking
type EventType =
  | "cta_click"
  | "form_submit"
  | "form_start"
  | "lead_capture"
  | "page_view"
  | "phone_click"
  | "review_link_click"
  | "client_error";

interface TrackOptions {
  label?: string;
  elementId?: string;
  metadata?: Record<string, any>;
  value?: number;
}

/**
 * Resolves once the page has fired `load` and the main thread has gone idle
 * (or after 3 s, whichever comes first). Used to keep the backend client and
 * the first analytics write out of the critical rendering window (P5.1).
 */
const whenLoadedAndIdle = (): Promise<void> =>
  new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    const idle = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void })
        .requestIdleCallback;
      if (ric) ric(() => resolve(), { timeout: 3000 });
      else window.setTimeout(resolve, 1000);
    };
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
  });

// Session management
const SESSION_KEY = "hl_analytics_session_id";
const ATTRIBUTION_KEY = "hl_source_town";
const ATTRIBUTION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

interface SourceTownAttribution {
  town: string;
  county?: string;
  href?: string;
  source?: string;
  ts: number;
}

/**
 * Persist the town a visitor clicked from the Service Areas dropdown so we can
 * attribute downstream conversions (form submits, phone clicks) to it.
 */
export const setSourceTown = (attr: Omit<SourceTownAttribution, "ts">) => {
  if (typeof window === "undefined") return;
  try {
    const payload: SourceTownAttribution = { ...attr, ts: Date.now() };
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(payload));
    localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
};

export const getSourceTown = (): SourceTownAttribution | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY) || localStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SourceTownAttribution;
    if (!parsed?.town) return null;
    if (Date.now() - (parsed.ts || 0) > ATTRIBUTION_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
};

const getSessionId = () => {
  if (typeof window === "undefined") return null;
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = typeof crypto !== "undefined" && "randomUUID" in crypto 
      ? crypto.randomUUID() 
      : `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
};

/**
 * Main Analytics utility for Highlander Building Services.
 * Handles GA4, Meta Pixel, and internal database tracking.
 */
export const trackEvent = async (type: EventType, options: TrackOptions = {}) => {
  const { label, elementId, metadata = {}, value } = options;
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const sessionId = getSessionId();

  // Attach source-town attribution to every event so conversions (form_submit,
  // phone_click, lead_capture) can be sliced by the town that drove the visit.
  const attribution = getSourceTown();
  const enrichedMetadata: Record<string, any> = {
    ...metadata,
    ...(attribution
      ? {
          source_town: attribution.town,
          source_town_county: attribution.county,
          source_town_href: attribution.href,
          source_town_channel: attribution.source,
        }
      : {}),
  };

  // 1. Internal Tracking (Supabase)
  // P5.1: the backend client (~215 KB) is pulled in only after the page has
  // finished loading and the main thread is idle, so the first event of a
  // visit never competes with the LCP image and the route chunk. Nothing is
  // dropped — the event data is captured now and sent a moment later.
  // Mobile audit F14: the team's own browsing and any QA pass writes rows to
  // conversion_events, which skews internal numbers. Set
  // localStorage.hl_internal = "1" in a browser to keep that browser out of the
  // internal table. Deliberately does NOT touch GA4/Meta/TikTok/Ads — the
  // standing rule is that nothing may weaken the pixels.
  let isInternal = false;
  try {
    isInternal = typeof window !== "undefined" && window.localStorage.getItem("hl_internal") === "1";
  } catch {
    /* private mode */
  }

  // NOTE: this guard wraps ONLY the Supabase insert. GA4, Meta, TikTok and Ads
  // below must keep firing for everyone — never early-return from this function.
  try {
    if (!isInternal)
    void whenLoadedAndIdle().then(() => import("@/integrations/supabase/client")).then(({ supabase }) =>
      supabase
        .from("conversion_events")
        .insert({
          event_type: type,
          path,
          element_id: elementId,
          label,
          metadata: {
            ...enrichedMetadata,
            href: typeof window !== "undefined" ? window.location.href : null,
            referrer: typeof document !== "undefined" ? document.referrer : null,
            userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
          },
          session_id: sessionId,
        })
        .then(({ error }) => {
          if (error) console.warn("Internal tracking failed:", error.message);
        }),
    );
  } catch (err) {
    console.warn("Analytics error:", err);
  }

  // 2. Google Analytics (GA4)
  // client_error is diagnostics, not a conversion — reporting it under the
  // "conversion" category inflated conversion counts (mobile re-audit H-3).
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", type, {
      event_category: type === "client_error" ? "error" : "conversion",
      event_label: label || elementId || type,
      value: value,
      page_path: path,
      ...enrichedMetadata,
    });
  }

  // 3. Meta Pixel — never for client errors; those are not marketing events.
  if (type !== "client_error" && typeof window !== "undefined" && (window as any).fbq) {
    const fbEvent = type === "form_submit" ? "Lead" : "Custom";
    (window as any).fbq("track", fbEvent, {
      content_name: label || type,
      content_category: "conversion",
      value: value,
      currency: "USD",
      ...enrichedMetadata,
    });
  }

  // 4. TikTok Pixel — standard SubmitForm on a completed lead form (phone taps
  // are handled in gtm.ts so they are not double-counted here).
  if (type === "form_submit" && typeof window !== "undefined" && (window as any).ttq?.track) {
    (window as any).ttq.track("SubmitForm", {
      content_name: label || type,
      content_category: "conversion",
      value: value,
      currency: "USD",
    });
  }
};

/**
 * Initializes tracking pixels in the head.
 * In a real production environment, these IDs should be in environment variables.
 */
export const initPixels = () => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const gaId = import.meta.env.VITE_GA_ID;
  const fbId = import.meta.env.VITE_FB_PIXEL_ID;
  // NOTE: TikTok Pixel (D8GTVURC77UDLID67QSG), Meta Pixel (1300176212241296),
  // and Google gtag (G-TYYM63MNYR) are loaded directly in index.html so they
  // fire on the very first paint. Do NOT re-inject them here — doing so would
  // double-count PageView / conversions. This helper is reserved for future
  // env-gated pixels only.

  // 1. Google Analytics
  if (gaId) {
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(script2);
  }

  // 2. Meta Pixel
  if (fbId) {
    const script = document.createElement("script");
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${fbId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
  }
};

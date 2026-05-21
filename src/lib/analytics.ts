import { supabase } from "@/integrations/supabase/client";

// Types for tracking
type EventType = 
  | "cta_click" 
  | "form_submit" 
  | "form_start" 
  | "lead_capture" 
  | "page_view" 
  | "phone_click";

interface TrackOptions {
  label?: string;
  elementId?: string;
  metadata?: Record<string, any>;
  value?: number;
}

// Session management
const SESSION_KEY = "hl_analytics_session_id";
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
 * Main Analytics utility for Highlander Roofing & Construction.
 * Handles GA4, Meta Pixel, and internal database tracking.
 */
export const trackEvent = async (type: EventType, options: TrackOptions = {}) => {
  const { label, elementId, metadata = {}, value } = options;
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const sessionId = getSessionId();

  // 1. Internal Tracking (Supabase)
  try {
    void supabase.from("conversion_events").insert({
      event_type: type,
      path,
      element_id: elementId,
      label,
      metadata: {
        ...metadata,
        href: typeof window !== "undefined" ? window.location.href : null,
        referrer: typeof document !== "undefined" ? document.referrer : null,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      },
      session_id: sessionId,
    }).then(({ error }) => {
      if (error) console.warn("Internal tracking failed:", error.message);
    });
  } catch (err) {
    console.warn("Analytics error:", err);
  }

  // 2. Google Analytics (GA4)
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", type, {
      event_category: "conversion",
      event_label: label || elementId || type,
      value: value,
      page_path: path,
      ...metadata,
    });
  }

  // 3. Meta Pixel
  if (typeof window !== "undefined" && (window as any).fbq) {
    const fbEvent = type === "form_submit" ? "Lead" : "Custom";
    (window as any).fbq("track", fbEvent, {
      content_name: label || type,
      content_category: "conversion",
      value: value,
      currency: "USD",
      ...metadata,
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

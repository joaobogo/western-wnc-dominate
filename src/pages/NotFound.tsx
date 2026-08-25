import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`;
    const referrer = typeof document !== "undefined" ? document.referrer || null : null;
    const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : null;

    console.error("404 Error: User attempted to access non-existent route:", path);
    
    // Use unified tracking utility
    trackEvent("page_view", {
      label: "404 Not Found",
      elementId: "not-found-page",
      metadata: { path, referrer, userAgent }
    });

    void supabase
      .from("seo_404_log")
      .insert({
        path: location.pathname,
        referrer,
        user_agent: userAgent,
        metadata: {
          path,
          pathname: location.pathname,
          search: location.search || null,
          hash: location.hash || null,
          referrer,
          userAgent,
          href: typeof window !== "undefined" ? window.location.href : null,
          loggedAt: new Date().toISOString(),
        },
      })
      .then(({ error }) => {
        if (error) {
          console.warn("404 logging failed:", error.message);
        }
      });
  }, [location.hash, location.pathname, location.search]);

  // Signal a real 404 to prerenderers/crawlers instead of a 200 shell
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "prerender-status-code";
    meta.content = "404";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  return (
    <>
      <SEOHead
        title="Page Not Found (404) | Highlander Building Services"
        description="The page you're looking for doesn't exist. Return to our homepage to explore roofing and construction services across Western NC."
        path={location.pathname}
        noindex
      />
      <main id="main-content" className="flex min-h-dvh items-center justify-center bg-muted">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">404 · Page Not Found</p>
          <h1 className="mb-4 text-4xl font-bold">We couldn't find that page</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            The page you're looking for may have moved or no longer exists. Try one of the popular pages below, or call us at{" "}
            <a href="tel:+18285247773" className="font-semibold text-primary underline">828-524-7773</a>.
          </p>
          <div className="grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
            <a href="/" className="rounded-lg border bg-background p-4 hover:bg-accent">
              <div className="font-semibold">Home</div>
              <div className="text-sm text-muted-foreground">Roofing & construction in Western NC</div>
            </a>
            <a href="/roofing" className="rounded-lg border bg-background p-4 hover:bg-accent">
              <div className="font-semibold">Roofing Services</div>
              <div className="text-sm text-muted-foreground">Repair, replacement, metal, storm damage</div>
            </a>
            <a href="/construction" className="rounded-lg border bg-background p-4 hover:bg-accent">
              <div className="font-semibold">Construction Services</div>
              <div className="text-sm text-muted-foreground">Additions, renovations, outdoor living</div>
            </a>
            <a href="/service-areas" className="rounded-lg border bg-background p-4 hover:bg-accent">
              <div className="font-semibold">Service Areas</div>
              <div className="text-sm text-muted-foreground">Highlands, Franklin, Cashiers & nearby towns</div>
            </a>
            <a href="/blog" className="rounded-lg border bg-background p-4 hover:bg-accent">
              <div className="font-semibold">Blog</div>
              <div className="text-sm text-muted-foreground">Local roofing & construction guides</div>
            </a>
            <a href="/request-inspection" className="rounded-lg border bg-primary p-4 text-primary-foreground hover:opacity-90">
              <div className="font-semibold">Request an Inspection</div>
              <div className="text-sm opacity-90">Free assessment · 24h response</div>
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;

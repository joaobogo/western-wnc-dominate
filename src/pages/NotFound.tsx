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

  return (
    <>
      <SEOHead
        title="Page Not Found (404) | Highlander Roofing & Construction"
        description="The page you're looking for doesn't exist. Return to our homepage to explore roofing and construction services across Western NC."
        path={location.pathname}
        noindex
      />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;

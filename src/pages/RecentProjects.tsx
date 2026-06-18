import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

declare global {
  interface Window {
    rwlPlugin?: { init: (host: string, key: string) => void };
  }
}

const RecentProjects = () => {
  // SPA-safe re-init: if the loader already finished on a prior route,
  // ensure the plugin attaches to #rwl-output now that it has mounted.
  useEffect(() => {
    if (window.rwlPlugin && typeof window.rwlPlugin.init === "function") {
      try {
        window.rwlPlugin.init("https://app.realworklabs.com", "SxCxaBpYsO_fVnK0");
      } catch {
        /* no-op — loader will fire rwlPluginReady on first availability */
      }
    }
  }, []);

  return (
    <>
      <SEOHead
        title="Recent Projects | Highlander Roofing Services"
        description="See recent Highlander Roofing Services projects across Franklin, Highlands, Cashiers, Sylva, and Western North Carolina."
        path="/recent-projects"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Recent Projects", url: "/recent-projects" },
        ])}
      />
      <Header />
      <main>
        {/* Hero / Intro */}
        <section className="bg-[hsl(var(--background))] border-b border-border/40">
          <div className="container-tight py-16 md:py-24">
            <p className="text-[hsl(var(--highland-gold))] font-bold text-xs uppercase tracking-[0.25em] mb-4">
              Live Project Activity
            </p>
            <h1 className="text-display-md md:text-display-lg font-heading font-bold text-foreground mb-6 leading-[1.05] tracking-tightest">
              Recent Projects
            </h1>
            <p className="text-body-lg md:text-body-xl text-foreground/80 max-w-3xl leading-relaxed font-medium">
              See recent roofing, construction, gutter, and exterior projects completed
              by Highlander Roofing Services across Western North Carolina. This page is
              powered by RealWork and may update as new project activity is added.
            </p>
          </div>
        </section>

        {/* RealWork Widget */}
        <section className="py-12 md:py-16">
          <div className="container-tight">
            <div id="rwl-output" className="min-h-[400px] w-full" />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[hsl(var(--highland-green))] text-white">
          <div className="container-tight py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Ready to talk about your project?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Tell Highlander about your roofing or construction project and our team
              will help you plan the right next step.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="cta-gradient text-accent-foreground font-semibold text-sm px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              >
                Request a Free Estimate <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:8285247773"
                className="border border-white/30 text-white font-semibold text-sm px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
              >
                <Phone className="w-4 h-4" /> 828-524-7773
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default RecentProjects;
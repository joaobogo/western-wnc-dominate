import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Link } from "react-router-dom";
import { ArrowRight, Mountain, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

const SEOLaunchQA = () => {
  return (
    <>
      <SEOHead title="SEO Launch QA | Highlander" description="Internal SEO quality assurance checklist." path="/seo-launch-qa" noindex />
      <Header />
      <main id="main-content" className="pt-32 pb-20 bg-background">
        <div className="container-tight max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
            <span className="text-eyebrow-size font-bold uppercase tracking-widest text-[hsl(var(--gold-ink))]">Quality Assurance</span>
          </div>
          <h1 className="text-display font-heading font-bold text-foreground mb-8">SEO & Content Launch Checklist</h1>
          
          <div className="grid gap-12">
            <section>
              <h2 className="text-heading-lg font-heading font-bold text-foreground mb-6 pb-2 border-b border-border">1. Site Visibility & Performance</h2>
              <div className="space-y-4">
                {[
                  "Mobile responsiveness tested on multiple viewports",
                  "Page titles and meta descriptions optimized for all landing pages",
                  "H1-H3 hierarchy verified for semantic structure",
                  "Image alt text present for all primary assets",
                  "Sitemap and robots.txt configured correctly"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-body font-medium text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-heading-lg font-heading font-bold text-foreground mb-6 pb-2 border-b border-border">2. Location Page Quality</h2>
              <div className="space-y-4">
                {[
                  "Town-specific elevation data verified",
                  "Climate and exposure messaging localized for each market",
                  "Hero images feel mountain-appropriate and realistic",
                  "Internal linking between towns and counties verified",
                  "Schema.org LocalBusiness data present for hub locations"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-body font-medium text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-heading-lg font-heading font-bold text-foreground mb-6 pb-2 border-b border-border">3. Conversion & Trust</h2>
              <div className="space-y-4">
                {[
                  "CTA buttons have consistent visibility and contrast",
                  "All forms tested for successful submission and routing",
                  "Review data synchronized with Google My Business totals",
                  "Certification badges verified for current status",
                  "Office addresses and phone numbers clickable and correct"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-body font-medium text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-16 p-8 bg-secondary/30 border border-border text-center">
            <h3 className="text-heading font-heading font-bold mb-4 text-foreground">Ready for production?</h3>
            <p className="text-body text-muted-foreground mb-8">Once all items are verified, proceed with final launch protocols.</p>
            <div className="flex justify-center">
              <Link to="/contact" className="cta-gradient text-accent-foreground font-bold px-10 py-4 rounded-none inline-flex items-center gap-2">
                Launch Final Review <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default SEOLaunchQA;
import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home, HardHat, Phone, Sparkles } from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCloseCTA from "@/components/PageCloseCTA";

const IntakeChooser = () => (
  <>
    <SEOHead
      title="Start a Project | Highlander Building Services"
      description="Two intake paths — roofing or construction. Pick the right one and a Highlander project advisor responds as soon as possible."
      path="/consultation"
      noindex
      jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Start a Project", url: "/consultation" }])}
    />
    <Header />
    <main id="main-content" className="pt-28 md:pt-36 pb-20 bg-background">
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="h-px w-10 bg-[hsl(var(--highland-gold))]" />
          <span className="text-caption font-body font-semibold uppercase tracking-[0.3em] text-[hsl(var(--gold-ink))]">Start a Project</span>
          <div className="h-px w-10 bg-[hsl(var(--highland-gold))]" />
        </div>
        <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-[-0.02em] mb-4 text-foreground">
          Which conversation should we start with?
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto mb-12 font-body text-body-sm leading-relaxed">
          Pick the closest match and the right advisor reaches out with the right questions.
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              to: "/roofing-intake",
              icon: Home,
              eyebrow: "Roofing",
              title: "Roof Assessment",
              body: "Replacement, repair, storm, metal, or synthetic. Photo upload supported.",
              cta: "Start roofing intake",
              accent: false,
            },
            {
              to: "/design-intake?mode=short",
              icon: Sparkles,
              eyebrow: "Design",
              title: "Project Planning",
              body: "Layouts, floor plans, and pre-construction scope definition support.",
              cta: "Start design intake",
              accent: true,
            },
            {
              to: "/construction-intake",
              icon: HardHat,
              eyebrow: "Construction",
              title: "Build Inquiry",
              body: "Additions, outdoor living, renovations, custom builds. Plans and files supported.",
              cta: "Start build intake",
              accent: false,
            },
          ].map((c, i) => (

            <motion.div
              key={c.to}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={c.to}
                className={`group block text-left bg-card border rounded-lg p-7 md:p-9 hover:shadow-raised transition-all ${
                  c.accent ? "border-[hsl(var(--highland-gold)/0.5)] hover:border-[hsl(var(--highland-gold))]" : "border-border hover:border-foreground/30"
                }`}
              >
                <c.icon className="w-7 h-7 text-[hsl(var(--gold-ink))] mb-5" />
                <p className="text-caption font-body font-semibold uppercase tracking-[0.22em] text-foreground/80 mb-1">{c.eyebrow}</p>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-2 tracking-tight">{c.title}</h2>
                <p className="text-muted-foreground text-body-xs font-body leading-relaxed mb-6">{c.body}</p>
                <span className="inline-flex items-center gap-2 text-body-xs font-heading font-bold text-foreground group-hover:text-[hsl(var(--gold-ink))] transition-colors">
                  {c.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Advanced builder pathway */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-caption font-body font-semibold uppercase tracking-[0.28em] text-foreground/80">Or go deeper</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              to="/roofing-builder"
              className="btn btn-secondary btn-md group"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-body-xs font-heading font-bold text-foreground leading-tight">Build a roofing scope brief</p>
                <p className="text-caption font-body text-muted-foreground leading-snug">Material, priorities, investment tier — guided</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--gold-ink))] group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
            </Link>
            <Link
              to="/construction-builder"
              className="btn btn-secondary btn-md group"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-body-xs font-heading font-bold text-foreground leading-tight">Build a construction scope brief</p>
                <p className="text-caption font-body text-muted-foreground leading-snug">Scope, style, priorities — guided</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--gold-ink))] group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
            </Link>
          </div>
          <p className="text-caption font-body text-muted-foreground mt-3 text-center">
            Advanced builders are optional. They organize your project — they are not instant quotes.
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-border max-w-md mx-auto">
          <p className="text-body-xs font-body text-muted-foreground mb-2">Quick question or general inquiry?</p>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 text-foreground hover:text-[hsl(var(--gold-ink))] font-heading font-semibold text-body-xs transition-colors"
          >
            <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </main>
    <PageCloseCTA primaryTo="/contact" primaryLabel="Get My Project Routed" eyebrow="Not Sure Where to Start?" heading="Tell us what's going on and we'll route it" body="If neither path fits, send us the basics and a local advisor will point you in the right direction." secondaryLabel="See the towns we serve" secondaryTo="/service-areas" context="intake-chooser" />
      <Footer />
  </>
);

export default IntakeChooser;
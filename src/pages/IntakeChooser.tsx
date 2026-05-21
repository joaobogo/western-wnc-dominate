import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home, HardHat, Phone } from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const IntakeChooser = () => (
  <>
    <SEOHead
      title="Start a Project | Highlander Roofing & Construction"
      description="Two intake paths — roofing or construction. Pick the right one and a Highlander project advisor responds within one business day."
      path="/consultation"
      jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Start a Project", url: "/consultation" }])}
    />
    <Header />
    <main className="pt-28 md:pt-36 pb-20 bg-background">
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="h-px w-10 bg-[hsl(var(--highland-gold))]" />
          <span className="text-[10px] font-body font-semibold uppercase tracking-[0.3em] text-[hsl(var(--highland-gold))]">Start a Project</span>
          <div className="h-px w-10 bg-[hsl(var(--highland-gold))]" />
        </div>
        <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-[-0.02em] mb-4 text-foreground">
          Which conversation should we start with?
        </h1>
        <p className="text-foreground/65 max-w-xl mx-auto mb-12 font-body text-[15px] leading-relaxed">
          Two intake paths so the right advisor reaches out with the right questions.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              to: "/roofing-intake",
              icon: Home,
              eyebrow: "Roofing",
              title: "Roof assessment",
              body: "Replacement, repair, storm, metal, or synthetic. Photo upload supported.",
              cta: "Start roofing intake",
              accent: false,
            },
            {
              to: "/construction-intake",
              icon: HardHat,
              eyebrow: "Construction",
              title: "Project planning",
              body: "Additions, outdoor living, renovations, custom builds. Plans and files supported.",
              cta: "Start construction intake",
              accent: true,
            },
          ].map((c, i) => (
            <motion.div
              key={c.to}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={c.to}
                className={`group block text-left bg-card border rounded-lg p-7 md:p-9 hover:shadow-lg transition-all ${
                  c.accent ? "border-[hsl(var(--highland-gold)/0.5)] hover:border-[hsl(var(--highland-gold))]" : "border-border hover:border-foreground/30"
                }`}
              >
                <c.icon className="w-7 h-7 text-[hsl(var(--highland-gold))] mb-5" />
                <p className="text-[10.5px] font-body font-semibold uppercase tracking-[0.22em] text-foreground/45 mb-1">{c.eyebrow}</p>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-2 tracking-tight">{c.title}</h2>
                <p className="text-foreground/65 text-[13.5px] font-body leading-relaxed mb-6">{c.body}</p>
                <span className="inline-flex items-center gap-2 text-[13px] font-heading font-bold text-foreground group-hover:text-[hsl(var(--highland-gold))] transition-colors">
                  {c.cta} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-border max-w-md mx-auto">
          <p className="text-[12px] font-body text-foreground/50 mb-2">Quick question or general inquiry?</p>
          <a
            href="tel:8283979211"
            className="inline-flex items-center gap-2 text-foreground hover:text-[hsl(var(--highland-gold))] font-heading font-semibold text-[14px] transition-colors"
          >
            <Phone className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
            (828) 397-9211
          </a>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default IntakeChooser;
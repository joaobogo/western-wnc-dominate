import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, DollarSign, Shield, Clock, AlertCircle, MessageSquare, Hammer } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";

const benefits = [
  { icon: MessageSquare, title: "Ask Us About Financing", description: "We can walk you through the financing options available for your project — including who to apply with and what to expect." },
  { icon: Hammer, title: "Roofing & Construction Projects", description: "Financing may be available for roof replacements, large repairs, additions, outdoor living builds, and other major projects." },
  { icon: Shield, title: "No Pressure, No Surprises", description: "Financing is one option among several. We'll explain it plainly so you can decide what fits your situation." },
];

const qualifyingProjects = [
  "Full roof replacements (residential or commercial)",
  "Large-scope roof repairs after storm or age-related damage",
  "Metal, asphalt, synthetic, and specialty roofing systems",
  "Home additions, sunrooms, garages, and screened porches",
  "Decks, patios, pergolas, and outdoor living builds",
  "Whole-home renovations and exterior improvements",
];

const Financing = () => {
  return (
    <>
      <SEOHead
        title="Roof Financing Options in Western NC | Highlander Roofing"
        description="Affordable roof financing for Western NC homeowners. Low monthly payments, fast approval, no prepayment penalties. Don't delay protecting your home."
        path="/financing"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Financing", url: "/financing" },
        ])}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Financing", url: "/financing" }]} />
      <main>
        <section className="relative min-h-[60vh] md:min-h-[75vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img width={1600} height={1067} loading="eager" fetchPriority="high" decoding="async" 
              src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=2000" 
              alt="Beautiful mountain home with premium roofing"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.6)] via-[hsl(var(--hero-overlay)/0.3)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.5)] via-transparent to-transparent" />
          </div>
          
          <div className="container-tight relative z-10 hero-clears-header pb-16 md:pb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-[hsl(var(--gold-ink))] font-bold text-sm uppercase tracking-[0.25em] mb-4">Investment Support</p>
              <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-white mb-6 leading-[0.95] tracking-tightest">
                Ask About <span className="text-[hsl(var(--gold-ink))]">Financing</span> for Your Project
              </h1>
              <p className="text-body-lg md:text-body-xl text-white/85 max-w-2xl leading-relaxed font-medium drop-shadow-sm">
                A new roof or major construction project is a long-term investment. Financing can make it easier to move forward on the right timeline — talk with our team about options that may fit your project.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="cta-gradient text-accent-foreground font-semibold text-sm px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                  Ask About Financing <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+18285247773" className="bg-white/5 backdrop-blur-sm border border-white/15 text-white font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" /> (828) 524-7773
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight">
            {/* Pre-launch placeholder — needs client/lender details */}
            <div className="mb-12 max-w-3xl mx-auto p-5 border-l-4 border-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.06)] rounded-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-body font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold-ink))] mb-1.5">
                    Pending Client Confirmation
                  </p>
                  <p className="text-sm text-foreground/80 font-body leading-relaxed">
                    Highlander team — to publish concrete financing details, please provide: the <strong>financing provider name(s)</strong>,
                    <strong> approved program wording</strong>, <strong>terms and required disclaimers</strong> (APR ranges, credit
                    qualification language, "subject to credit approval"), and an <strong>application link</strong> if applicable.
                    Until that copy is approved, this page directs leads to call or message the office to discuss options.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {benefits.map((b) => (
                <div key={b.title} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <b.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-muted-foreground text-sm font-bold">{b.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-secondary rounded-lg p-8 md:p-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">How to Ask About Financing</h2>
              <ol className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <div><h4 className="font-bold text-foreground">Request a Consultation</h4><p className="text-muted-foreground text-sm font-bold">Tell us about your roofing or construction project. We provide a written, itemized estimate so you know the real scope and cost.</p></div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <div><h4 className="font-bold text-foreground">Mention Financing</h4><p className="text-muted-foreground text-sm font-bold">Let your advisor know you'd like to explore financing. They'll explain the options currently available and what each one involves.</p></div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <div><h4 className="font-bold text-foreground">Move Forward When You're Ready</h4><p className="text-muted-foreground text-sm font-bold">Once your financing path is clear, we schedule the work. No pressure to commit before you understand the full picture.</p></div>
                </li>
              </ol>

              <div className="mt-10 pt-8 border-t border-border/60">
                <h3 className="font-heading font-bold text-foreground mb-4 text-lg">Project Types That May Qualify</h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {qualifyingProjects.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-muted-foreground font-body italic leading-relaxed">
                  Financing availability, terms, and qualification are determined by the lender — not by Highlander Roofing &amp; Construction.
                  All financing is subject to credit approval. Specific program details will be provided by your project advisor and the
                  lender at the time of application.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InspectionForm />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Financing;

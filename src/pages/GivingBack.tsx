import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Users, ArrowRight, HandHeart, Mountain, Hammer, Handshake, Building2, Phone } from "lucide-react";
import SEOHead, { breadcrumbSchema, organizationSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import PageCloseCTA from "@/components/PageCloseCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ScrollReveal } from "@/components/motion";
import TartanBackground from "@/components/TartanBackground";

const focusAreas = [
  {
    icon: Heart,
    title: "Local Families & Homeowners",
    copy: "We help protect the homes and properties that families rely on through roofing, repairs, construction, gutters, and exterior solutions built for Western North Carolina conditions.",
  },
  {
    icon: Handshake,
    title: "Local Organizations",
    copy: "Highlander welcomes opportunities to support local organizations, events, and causes that strengthen the communities we serve.",
  },
  {
    icon: Hammer,
    title: "Skilled Trades & Local Work",
    copy: "We believe in the value of skilled hands, dependable crews, and professional standards that support both homeowners and the local construction community.",
  },
  {
    icon: Mountain,
    title: "Mountain Heritage",
    copy: "Our brand reflects a connection to heritage, craftsmanship, and the mountain communities that shape our work.",
  },
  {
    icon: Building2,
    title: "Community Partnerships",
    copy: "As Highlander continues to grow, this page will highlight approved partnerships, sponsorships, and community involvement with local groups.",
  },
];

const GivingBack = () => {
  return (
    <>
      <SEOHead
        title="Community Involvement | Highlander Roofing Services"
        description="Learn how Highlander Roofing Services supports homeowners, local organizations, and communities across Franklin, Highlands, Cashiers, Sylva, and Western North Carolina."
        path="/giving-back"
        jsonLd={[
          organizationSchema(),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Community", url: "/giving-back" }]),
        ]}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Community", url: "/giving-back" }]} />
      <main id="main-content">
        {/* ── HERO ── */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-heritage-charcoal">
          <div className="absolute inset-0">
            <img width={1600} height={1067} loading="eager" fetchPriority="high" decoding="async"
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2000"
              alt="Western North Carolina mountain community landscape"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-heritage-charcoal via-heritage-charcoal/40 to-transparent" />
            <TartanBackground opacity={0.03} />
          </div>

          <div className="relative z-10 container-tight pt-36 md:pt-44 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <HandHeart className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                <span className="text-[12px] font-body font-bold uppercase tracking-[0.3em] text-[hsl(var(--gold-ink))]">Community Involvement</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 tracking-tight">
                Built for the Community<br />
                <span className="text-[hsl(var(--gold-ink))]">We Call Home.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/95 font-body leading-relaxed max-w-2xl font-medium mb-8">
                Highlander Roofing Services is proud to serve the same Western North Carolina communities we live in, work in, and care about. From roofing and construction to local involvement, our work is built around protecting homes, supporting neighbors, and strengthening the places that make this region special.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── WHY COMMUNITY MATTERS ── */}
        <section className="section-padding bg-white">
          <div className="container-tight max-w-4xl">
            <ScrollReveal>
              <span className="eyebrow mb-3 block">Why Community Matters</span>
              <h2 className="section-heading mb-6">More Than Roofing. A Local Commitment.</h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed mb-8">
                Highlander's work is tied to the homes, families, and communities of Western North Carolina. Our reputation is built not only on roofs and construction, but also on showing up with care, accountability, and local pride.
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-base text-foreground/85 font-body">
                {[
                  "Locally rooted service",
                  "Protecting homes in mountain communities",
                  "Supporting neighbors",
                  "Building long-term trust",
                  "Serving Franklin, Highlands, Cashiers, Sylva, and surrounding WNC communities",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))] mt-2.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* ── FOCUS AREAS ── */}
        <section className="section-padding bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          <div className="container-tight relative z-10">
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <span className="eyebrow mb-3 block">Community Focus Areas</span>
              <h2 className="section-heading">Supporting Western North Carolina Communities</h2>
              <p className="text-muted-foreground mt-4 font-body">
                The areas where our work and our community connect most closely.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {focusAreas.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    className="card-premium p-7"
                  >
                    <div className="w-12 h-12 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-body">{item.copy}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FEATURED INVOLVEMENT (intentional "coming soon" — polished) ── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <ScrollReveal>
              <div className="card-premium p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[hsl(var(--highland-gold))] via-primary to-[hsl(var(--highland-gold))]" />
                <span className="eyebrow mb-3 block">Featured Community Involvement</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-tight">
                  Community Involvement, Led by Our Team
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed mb-4">
                  Highlander's community involvement is reflected through the people behind the company. From local service organizations and Rotary involvement to youth sports coaching and community initiatives, the Highlander team is committed to supporting the Western North Carolina communities it serves.
                </p>
                <ul className="space-y-2 text-muted-foreground font-body leading-relaxed mb-6 list-disc pl-5">
                  <li><strong className="text-foreground">Luke Smith</strong> — active in local organizations and community service initiatives across Franklin, Highlands, and Cashiers.</li>
                  <li><strong className="text-foreground">Kristy Smith</strong> — involved with Rotary and local service organizations throughout Franklin and Highlands.</li>
                  <li><strong className="text-foreground">Derek Wallace</strong> — youth baseball and football coach for local programs.</li>
                  <li><strong className="text-foreground">Alex Hurst</strong> — coaches baseball and football for his son's local teams.</li>
                </ul>
                <div className="border-t border-border pt-6">
                  <p className="font-heading font-bold text-foreground mb-4">
                    Have a community opportunity to discuss?
                  </p>
                  <Link to="/contact" className="group bg-primary text-primary-foreground font-heading font-bold text-base px-7 py-3.5 inline-flex items-center gap-2.5 hover:bg-primary/90 transition-all">
                    Contact Highlander
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── PHOTO PROOF SECTION ── */}

        {/* ── HOW TO CONNECT ── */}
        <section className="section-padding bg-heritage-charcoal text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "300px auto" }} />
          <div className="container-tight relative z-10 max-w-3xl text-center">
            <ScrollReveal>
              <Users className="w-12 h-12 text-[hsl(var(--gold-ink))] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-5 leading-tight">
                Have a Local Cause or Community Opportunity?
              </h2>
              <p className="text-white/90 text-lg font-body max-w-2xl mx-auto mb-10 leading-relaxed">
                If you represent a local organization, event, or cause in Western North Carolina, Highlander welcomes the opportunity to learn more. Reach out to share details and connect with the team.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="group bg-[hsl(var(--highland-gold))] text-heritage-charcoal font-heading font-bold text-base px-8 py-4 inline-flex items-center justify-center gap-2.5 hover:bg-[hsl(var(--highland-gold-light))] transition-all">
                  Contact Highlander
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/consultation" className="group border border-white/30 text-white font-heading font-bold text-base px-8 py-4 inline-flex items-center justify-center gap-2.5 hover:border-white hover:bg-white/5 transition-all">
                  Request a Free Quote
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/85 font-body">
                <Link to="/about" className="hover:text-white transition-colors">About Highlander</Link>
                <Link to="/recent-projects" className="hover:text-white transition-colors">Recent Projects</Link>
                <Link to="/roofing" className="hover:text-white transition-colors">Roofing</Link>
                <Link to="/construction" className="hover:text-white transition-colors">Construction</Link>
                <Link to="/service-areas" className="hover:text-white transition-colors">Service Areas</Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <PageCloseCTA eyebrow="Next Step" heading="Working on a project of your own?" body="Share the details and a local advisor will follow up personally — no obligation." secondaryLabel="Meet the team" secondaryTo="/team" context="giving-back" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default GivingBack;
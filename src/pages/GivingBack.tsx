import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Users, Calendar, ArrowRight, HandHeart, Gift, Star, Camera, AlertCircle, Award } from "lucide-react";
import SEOHead, { breadcrumbSchema, organizationSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ScrollReveal } from "@/components/motion";
import TartanBackground from "@/components/TartanBackground";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const initiativeCategories = [
  { category: "Charity Work", description: "Donated labor, materials, or repair work for families and nonprofits in Western NC." },
  { category: "Local Sponsorships", description: "Youth sports, school programs, and local events Highlander helps make possible." },
  { category: "Community Projects", description: "Hands-on build days, cleanup events, and neighbor-helping-neighbor work." },
  { category: "Local Events", description: "Festivals, fairs, and community gatherings Highlander participates in or sponsors." },
  { category: "Nonprofit Partnerships", description: "Ongoing relationships with WNC nonprofits supporting housing, veterans, and families." },
  { category: "Veterans & First Responders", description: "Dedicated support and special considerations for those who have served." },
];

const GivingBack = () => {
  return (
    <>
      <SEOHead
        title="Giving Back to WNC | Highlander Roofing & Construction"
        description="Highlander Roofing & Construction is committed to supporting Western North Carolina. Explore our monthly charity work and community initiatives."
        path="/giving-back"
        jsonLd={[
          organizationSchema(),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Giving Back", url: "/giving-back" }]),
        ]}
      />
      <Header />
      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-heritage-charcoal">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2000" 
              alt="Community support" 
              className="w-full h-full object-cover opacity-60" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-heritage-charcoal via-heritage-charcoal/40 to-transparent" />
            <TartanBackground opacity={0.03} />
          </div>

          <div className="relative z-10 container-tight pt-32 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <HandHeart className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                <span className="text-[12px] font-body font-bold uppercase tracking-[0.3em] text-[hsl(var(--highland-gold))]">Highlander Hearts</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 tracking-tight">
                Beyond the Roof:<br />
                <span className="text-[hsl(var(--highland-gold))]">Supporting Our Neighbors.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-body leading-relaxed max-w-2xl font-medium">
                We don't just work in Western North Carolina — we live here. We believe in investing back into the communities that have supported us since 2017.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── VALUES STRIP ── */}
        <section className="bg-white py-12 border-b border-border">
          <div className="container-tight">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1">Monthly Initiatives</h3>
                  <p className="text-muted-foreground text-sm font-body">Every month, we choose a local cause to support through labor, donations, or advocacy.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1">Locally Focused</h3>
                  <p className="text-muted-foreground text-sm font-body">Our efforts are concentrated right here in Macon, Jackson, and surrounding counties.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 bg-primary/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1">Action-Oriented</h3>
                  <p className="text-muted-foreground text-sm font-body">We prioritize direct action — getting out into the community to do the work ourselves.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMMUNITY INVOLVEMENT — STRUCTURED PLACEHOLDERS ── */}
        <section className="section-padding bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />

          <div className="container-tight relative z-10">
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Community Involvement</span>
              <h2 className="section-heading">Investing Back Into WNC</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4 font-body">
                Highlander is proud to be part of the Western North Carolina community. The categories below outline the kinds of work we support locally. Specific initiatives, dates, and photos will be added once the Highlander team provides approved details.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {initiativeCategories.map((item, i) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="card-premium overflow-hidden"
                >
                  <div className="aspect-[16/10] bg-muted flex flex-col items-center justify-center text-center p-6 border-b border-border">
                    <div className="w-12 h-12 rounded-full bg-[hsl(var(--highland-gold)/0.12)] border border-[hsl(var(--highland-gold)/0.35)] flex items-center justify-center mb-3">
                      <Camera className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                    </div>
                    <span className="text-[11px] font-body font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
                      Photo Coming Soon
                    </span>
                  </div>
                  <div className="p-6">
                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-body font-bold uppercase tracking-widest inline-block mb-3">{item.category}</span>
                    <p className="text-muted-foreground text-sm leading-relaxed font-body">{item.description}</p>
                    <p className="text-xs text-muted-foreground/70 italic mt-4">Specific initiative details coming soon.</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AFFILIATIONS (incl. Rotary placeholder) ── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <div className="text-center mb-10">
              <span className="eyebrow mb-3 block">Local Affiliations</span>
              <h2 className="section-heading">Community Involvement & Local Affiliations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4 font-body">
                Final affiliation details, organization logos, and approved descriptions will be added after client confirmation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { label: "Rotary Affiliation", note: "Pending client confirmation. Do not publish unless approved." },
                { label: "Chamber of Commerce", note: "Confirm membership and approved logo usage." },
                { label: "Local Nonprofit Partner", note: "Awaiting nonprofit name and partnership description." },
                { label: "Industry Association", note: "Confirm NRCA, NCRCA, or trade-association affiliations." },
              ].map((a) => (
                <div key={a.label} className="card-premium p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-[hsl(var(--highland-gold)/0.1)] border border-[hsl(var(--highland-gold)/0.3)] flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-1">{a.label}</h3>
                    <p className="text-xs text-muted-foreground italic">{a.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTERNAL NOTICE — INFO REQUEST ── */}
        <section className="bg-[hsl(var(--highland-gold)/0.08)] border-y border-[hsl(var(--highland-gold)/0.25)]">
          <div className="container-tight section-padding max-w-4xl">
            <div className="card-premium p-8 md:p-10">
              <div className="flex items-start gap-4 mb-5">
                <AlertCircle className="w-6 h-6 text-[hsl(var(--highland-gold))] flex-shrink-0 mt-1" />
                <div>
                  <span className="eyebrow block mb-2">For the Highlander Team — Pre-Launch</span>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
                    Help Us Finalize Community & Affiliation Details
                  </h2>
                </div>
              </div>
              <p className="text-muted-foreground font-body mb-5">
                To replace the placeholder cards above with real initiatives, partnerships, and affiliations, please confirm and provide the following:
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-foreground/85 font-body mb-6">
                {[
                  "Confirm whether Rotary affiliation should be displayed (and provide approved logo + use permission)",
                  "Chamber of Commerce or trade-association memberships to feature",
                  "Names of charities, nonprofits, and community partners Highlander supports",
                  "Specific community projects, dates, and brief descriptions",
                  "Local sponsorships (youth sports, schools, festivals) with permission to display",
                  "Photos from community events (with consent of anyone shown)",
                  "Veteran and first-responder program details, if any",
                  "Approved organization logos for display",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))] mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground italic">
                Until approved details are provided, this page intentionally uses structured placeholders. No affiliation, sponsorship, or partnership will be claimed publicly without confirmation.
              </p>
            </div>
          </div>
        </section>

        {/* ── GET INVOLVED ── */}
        <section className="section-padding bg-heritage-charcoal text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "300px auto" }} />
          <div className="container-tight relative z-10">
            <ScrollReveal>
              <Gift className="w-12 h-12 text-[hsl(var(--highland-gold))] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Know a local cause in need?</h2>
              <p className="text-white/60 text-lg md:text-xl font-body max-w-xl mx-auto mb-10">
                We're always looking for new ways to support Western North Carolina. If you represent a local non-profit or know a neighbor in need, please reach out.
              </p>
              <Link to="/contact" className="group bg-[hsl(var(--highland-gold))] text-heritage-charcoal font-heading font-bold text-lg px-12 py-5 rounded-none inline-flex items-center justify-center gap-3 hover:bg-[hsl(var(--highland-gold-light))] transition-all">
                <span>Contact Our Community Lead</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default GivingBack;
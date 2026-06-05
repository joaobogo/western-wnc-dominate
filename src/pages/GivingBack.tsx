import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Users, MapPin, Calendar, ArrowRight, Quote, HandHeart, Gift, Star } from "lucide-react";
import SEOHead, { breadcrumbSchema, organizationSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ScrollReveal } from "@/components/motion";
import TartanBackground from "@/components/TartanBackground";

const HIGHLAND_EASE = [0.22, 1, 0.36, 1];

const initiatives = [
  {
    title: "Macon County Veteran Support",
    date: "June 2026",
    category: "Veterans",
    description: "This month, we've partnered with local veterans' organizations to provide emergency roof repairs for those who served our country. It's our way of saying thank you for your service.",
    image: "https://images.unsplash.com/photo-1508847154043-be12a267db5d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Habitat for Humanity Partnership",
    date: "May 2026",
    category: "Housing",
    description: "Donating labor and materials for a new home build in Sylva. We believe every family in Western North Carolina deserves a safe, dry place to call home.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Mountain Community Food Drive",
    date: "April 2026",
    category: "Community",
    description: "Collected over 500 lbs of non-perishable goods for the local food pantry. Our team and clients came together to support families facing food insecurity.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800",
  }
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
              className="w-full h-full object-cover opacity-40" 
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

        {/* ── CHARITY LOG ── */}
        <section className="section-padding bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          
          <div className="container-tight relative z-10">
            <div className="text-center mb-16">
              <span className="eyebrow mb-3 block">Community Log</span>
              <h2 className="section-heading">Our Recent Impact</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mt-4 font-body">
                Tracking the ways we've been able to help our neighbors across WNC.
              </p>
            </div>

            <div className="grid gap-12">
              {initiatives.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-white border border-border group overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden aspect-video md:aspect-auto">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary text-white text-[10px] font-body font-bold uppercase tracking-widest">{item.category}</span>
                      </div>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-primary/40" />
                        <span className="text-[13px] font-body font-bold text-primary/60 uppercase tracking-wider">{item.date}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">{item.title}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-body">
                        {item.description}
                      </p>
                      <div className="mt-auto flex items-center gap-3">
                        <div className="w-8 h-[1px] bg-primary/20" />
                        <span className="text-[12px] font-body font-bold uppercase tracking-widest text-primary/40">The Highland Standard</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
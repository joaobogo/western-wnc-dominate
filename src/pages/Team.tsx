import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Users, Award, Shield, CheckCircle } from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;


const leadership = [
  {
    name: "Luke",
    role: "Owner & Lead Advisor",
    bio: "Driving the Highlander vision with a focus on mountain-grade quality and family-business values. Luke oversees the strategic direction of both Roofing and Construction divisions.",
    image: "", // Placeholder treatment will handle empty string
    credentials: ["NC Licensed GC", "CertainTeed Master Applicator", "WNC Native"]
  },
  {
    name: "Christy",
    role: "Director of Operations",
    bio: "The engine behind the scenes. Christy manages project sequencing, client coordination, and ensures the 'Highlander Standard' is met from first call to final walkthrough.",
    image: "",
    credentials: ["Project Coordination", "Client Experience", "Operational Excellence"]
  }
];

const teamMembers = [
  {
    name: "Javier",
    role: "Roofing Division Lead",
    specialty: "System Installation & QC",
    bio: "With years of ridgetop experience, Javier leads our roofing crews with manufacturer-exact precision, specializing in complex metal and synthetic slate systems.",
    image: ""
  },
  {
    name: "Miguel",
    role: "Construction Foreman",
    specialty: "Framing & Structural Execution",
    bio: "Miguel translates design layouts into buildable reality. He manages on-site construction for additions and outdoor living spaces with obsessive attention to detail.",
    image: ""
  }
];


const Team = () => {
  return (
    <>
      <SEOHead
        title="Meet the Team | Highlander Roofing & Construction"
        description="Meet the local experts behind Highlander Roofing & Construction. Family-owned and owner-led team serving Western North Carolina with mountain-built integrity."
        path="/team"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
          { name: "Team", url: "/team" },
        ])}
      />
      <Header />
      <main>
        {/* 1. Hero */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-primary overflow-hidden tartan-dark">
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          <div className="container-tight relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 16 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, ease: HIGHLAND_EASE }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <Users className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
              <span className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold))]">Highlander People</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.1, ease: HIGHLAND_EASE }}
              className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white mb-6 leading-[1.0] tracking-tight"
            >
              The People Behind <span className="text-[hsl(var(--highland-gold))]">the Heritage.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.2, ease: HIGHLAND_EASE }}
              className="text-lg text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed font-body"
            >
              A family-owned company is only as strong as the people who show up on your property. 
              Meet the specialists dedicated to protecting and improving WNC homes.
            </motion.p>
          </div>
        </section>

        {/* 2. Leadership Section */}
        <section className="section-padding bg-background relative overflow-hidden">
          {/* Subtle Side Tartan Accents */}
          <div className="absolute top-0 left-0 w-2 h-full opacity-[0.08]" style={{ 
            backgroundImage: "url('/tartan.png')",
            backgroundSize: "60px auto"
          }} />
          <div className="absolute top-0 right-0 w-2 h-full opacity-[0.08]" style={{ 
            backgroundImage: "url('/tartan.png')",
            backgroundSize: "60px auto"
          }} />

          <div className="container-tight">
            <div className="text-center mb-16 relative">
              <span className="eyebrow mb-3 block">Family Ownership</span>
              <h2 className="section-heading">Owner-Led Accountability</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mt-4" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
              {leadership.map((person, i) => (
                <motion.div 
                  key={person.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: HIGHLAND_EASE }}
                  className="flex flex-col md:flex-row gap-8 items-start"
                >
                  <div className="w-full md:w-48 lg:w-56 aspect-square overflow-hidden bg-muted flex items-center justify-center border border-border relative">
                    {person.image ? (
                      <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    ) : (
                      <div className="text-center p-4">
                        <Users className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                        <span className="text-[9px] font-body font-bold uppercase tracking-[0.15em] text-muted-foreground/40">Waiting for<br />Team Photo</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-heading font-bold mb-1">{person.name}</h3>
                    <p className="text-[hsl(var(--highland-gold))] font-heading font-semibold text-sm mb-4 uppercase tracking-wider">{person.role}</p>
                    <p className="text-muted-foreground text-[15px] leading-relaxed mb-6 font-body">{person.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {person.credentials.map(cred => (
                        <span key={cred} className="text-[10px] font-body font-bold uppercase tracking-wider px-3 py-1.5 bg-primary/5 text-primary border border-primary/10 rounded-none">
                          {cred}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. The Team Grid */}
        <section className="section-padding bg-secondary/30">
          <div className="container-tight">
            <div className="text-center mb-16">
              <span className="eyebrow mb-3 block">Division Experts</span>
              <h2 className="section-heading">Your Project Specialists</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mt-4 font-body">
                From first consultation to final inspection, these are the professionals leading our crews and coordinating your build.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((person, i) => (
                <motion.div 
                  key={person.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group bg-card border border-border overflow-hidden hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-muted flex items-center justify-center relative">
                    {person.image ? (
                      <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                    ) : (
                      <div className="text-center p-6">
                        <Users className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
                        <span className="text-[10px] font-body font-bold uppercase tracking-[0.2em] text-muted-foreground/30">Photo Coming Soon</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-heading font-bold mb-1">{person.name}</h3>
                    <p className="text-primary font-heading font-bold text-[11px] uppercase tracking-[0.15em] mb-4">{person.role}</p>
                    <p className="text-[13px] text-muted-foreground leading-relaxed font-body mb-4">{person.bio}</p>
                    <div className="pt-4 border-t border-border flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))]" />
                      <span className="text-[10px] font-body font-bold uppercase tracking-wider text-muted-foreground/60">{person.specialty}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Why it Matters Section */}
        <section className="section-padding bg-primary tartan-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "200px auto" }} />
          <div className="container-tight max-w-5xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[hsl(var(--highland-gold))] font-heading font-bold text-[11px] uppercase tracking-[0.2em] mb-6 block">The Highlander Standard</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-8 leading-tight tracking-tight">
                  Accountability You Can <span className="text-[hsl(var(--highland-gold))]">Identify by Name.</span>
                </h2>
                <div className="space-y-6">
                  {[
                    "Owner-led walk-throughs on critical project phases.",
                    "Direct phone access to your project lead.",
                    "Crews that are vetted, trained, and locally based.",
                    "Transparent communication through every weather delay or terrain challenge."
                  ].map(text => (
                    <div key={text} className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-[hsl(var(--highland-gold)/0.2)] flex items-center justify-center mt-1">
                        <CheckCircle className="w-3 h-3 text-[hsl(var(--highland-gold))]" />
                      </div>
                      <p className="text-white/70 text-base font-body">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-white/5 border border-white/10 p-2 md:p-3">
                  <img 
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200" 
                    alt="Highlander crew working on a mountain roofing project" 
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[hsl(var(--highland-gold))] flex flex-col items-center justify-center p-4 text-center">
                  <p className="text-[hsl(var(--heritage-charcoal))] font-heading font-bold text-3xl">100%</p>
                  <p className="text-[hsl(var(--heritage-charcoal))] font-heading font-bold text-[9px] uppercase tracking-wider">Local WNC Crews</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Work with Us CTA */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl text-center">
            <Award className="w-10 h-10 text-[hsl(var(--highland-gold)/0.3)] mx-auto mb-6" />
            <h2 className="text-3xl font-heading font-bold mb-6">Want to Join the Team?</h2>
            <p className="text-muted-foreground text-lg mb-10 font-body">
              We're always looking for skilled, reliable people who take pride in mountain craftsmanship. 
              Explore our current openings and help us build Western North Carolina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/careers" className="cta-gradient text-accent-foreground font-bold px-10 py-4.5 rounded-none inline-flex items-center justify-center gap-2 group hover:scale-[1.02] transition-transform duration-300">
                View Careers <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="bg-secondary border border-border text-foreground font-bold px-10 py-4.5 rounded-none inline-flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                Our Heritage
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Team;

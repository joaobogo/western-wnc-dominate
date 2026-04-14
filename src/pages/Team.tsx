import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Users, Hammer, MessageSquare, CheckCircle, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const leadership = [
  {
    name: "James McAllister",
    role: "Owner & General Contractor",
    bio: "Licensed NC General Contractor. CertainTeed Master Shingle Applicator. 20+ years in roofing and construction across Western North Carolina. James personally handles every project estimate, approves every scope of work, and walks every final inspection. He started Highlander because he believed WNC homeowners deserved better — and he's spent every day since proving it.",
    credentials: ["Licensed NC GC", "CertainTeed Master Applicator", "20+ Years Experience"],
    featured: true,
  },
  {
    name: "Sarah Coleman",
    role: "Project Coordinator",
    bio: "Sarah is your single point of contact from first call to warranty delivery. She manages scheduling, client communication, permitting coordination, and documentation with the precision that keeps projects on time and homeowners informed. If you have a question at any point in the process, Sarah's the one who answers it — and she answers fast.",
    credentials: ["Client Communication Lead", "Scheduling & Logistics", "Documentation & Permits"],
    featured: true,
  },
];

const crewMembers = [
  {
    name: "Marcus Rivera",
    role: "Crew Lead — Roofing",
    bio: "12 years on mountain roofs. Specializes in metal standing seam and complex multi-gable installations. Marcus runs the tightest crew in the region and personally inspects every completed section before moving on.",
    specialty: "Metal & Complex Installations",
  },
  {
    name: "Daniel Hawkins",
    role: "Crew Lead — Construction",
    bio: "Experienced in additions, renovations, and outdoor living builds. Daniel brings the same discipline and attention to detail that defines our roofing work into every construction project.",
    specialty: "Additions & Renovations",
  },
  {
    name: "Chris Whitfield",
    role: "Senior Installer",
    bio: "8 years with Highlander. Certified in CertainTeed, GAF, and Owens Corning systems. Known for clean work, zero callbacks, and training newer team members to the Highlander standard.",
    specialty: "Certified Shingle Systems",
  },
  {
    name: "Tom Bradley",
    role: "Site Supervisor",
    bio: "Manages on-site coordination, safety, material staging, and cleanup. Tom ensures every job site is organized, safe, and left cleaner than we found it — every single day.",
    specialty: "Site Management & Safety",
  },
];

const teamValues = [
  {
    icon: Shield,
    title: "Vetted & Trained",
    description: "Every crew member is background-checked, trained on manufacturer-specific protocols, and held to the same quality standard.",
  },
  {
    icon: Users,
    title: "In-House Only",
    description: "We don't subcontract your project. The team we send to your property is our team — trained, accountable, and consistent.",
  },
  {
    icon: MessageSquare,
    title: "Direct Communication",
    description: "You'll always know who's working on your project and who to call. No runaround. No voicemail loops.",
  },
  {
    icon: Hammer,
    title: "Craft Over Speed",
    description: "We don't rush. Our crews take the time to do things right the first time — because that's the only way we know how to work.",
  },
];

const processSteps = [
  { step: "1", title: "Consultation", detail: "James walks your property, listens to your concerns, and provides an honest assessment — no pressure, no upselling." },
  { step: "2", title: "Planning & Scope", detail: "Sarah coordinates scope, timeline, materials, and logistics. You receive a clear, detailed plan before any work begins." },
  { step: "3", title: "Crew Assignment", detail: "The right crew lead and team are assigned based on project type, complexity, and scope. You'll know exactly who's coming." },
  { step: "4", title: "Execution & Updates", detail: "Daily progress. Clean job sites. Regular communication. We work efficiently, carefully, and with respect for your home." },
  { step: "5", title: "Final Walkthrough", detail: "James personally inspects every completed project before it's handed over. Nothing is done until you're satisfied." },
  { step: "6", title: "Ongoing Support", detail: "Warranty documentation, maintenance guidance, and a team you can reach after the project is complete. We don't disappear." },
];

const Team = () => {
  return (
    <>
      <Header />
      <main>
        {/* ── HERO ── */}
        <section className="relative section-dark pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 tartan-dark" />
          <div className="container-tight relative z-10 px-5 md:px-8 lg:px-16">
            <motion.div {...fadeUp} className="max-w-3xl">
              <span className="eyebrow mb-4 block text-[hsl(var(--highland-gold))]">Our Team</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-6 leading-[1.1]">
                Real People.<br />
                <span className="text-[hsl(var(--highland-gold))]">Real Accountability.</span>
              </h1>
              <div className="w-16 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-6" />
              <p className="text-[hsl(var(--dark-section-foreground)/0.7)] text-base md:text-lg leading-relaxed max-w-2xl">
                Highlander isn't a franchise. It's a family-operated company where the owner answers 
                the phone, walks your property, and shows up at your final walkthrough. When you hire 
                us, you know exactly who's on your roof and who to call with questions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── LEADERSHIP ── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="eyebrow mb-3 block">Leadership</span>
              <h2 className="section-heading mb-4">The People Who Run Every Project</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto" />
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {leadership.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="card-premium p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-14 h-14 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-heading font-bold text-primary">{member.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-foreground">{member.name}</h3>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-4 mb-5">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.credentials.map((c) => (
                      <span key={c} className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/8 px-3 py-1.5 rounded-sm">
                        {c}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CREW MEMBERS ── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="eyebrow mb-3 block">The Crew</span>
              <h2 className="section-heading mb-4">Skilled, Vetted, Accountable</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every person who steps onto your property is trained to Highlander standards, 
                experienced in mountain construction, and personally accountable for their work.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-5">
              {crewMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group card-premium p-5 md:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                      <span className="text-sm font-heading font-bold text-primary">{member.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground mb-0.5">{member.name}</h3>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent mb-2">{member.role}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{member.bio}</p>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1 rounded-sm">
                        {member.specialty}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM VALUES ── */}
        <section className="section-padding section-dark tartan-dark">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">How We Work</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4 leading-tight">
                The Standards Behind the Team
              </h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-[hsl(var(--dark-section-foreground)/0.6)] max-w-2xl mx-auto">
                A good team isn't just skilled people — it's skilled people held to a shared standard. 
                Here's what that looks like at Highlander.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamValues.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center p-6 border border-[hsl(var(--highland-gold)/0.1)] rounded-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <h3 className="font-heading font-semibold text-[hsl(var(--dark-section-foreground))] mb-2">{v.title}</h3>
                  <p className="text-[hsl(var(--dark-section-foreground)/0.6)] text-sm leading-relaxed">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW WE WORK TOGETHER ── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="eyebrow mb-3 block">From Start to Finish</span>
              <h2 className="section-heading mb-4">How the Team Works Together</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every Highlander project follows the same coordinated process — from consultation 
                to final walkthrough. No gaps. No confusion. No surprises.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="card-premium p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-heading font-bold text-accent/40">{step.step}</span>
                    <h3 className="font-heading font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <section className="section-padding bg-primary">
          <div className="container-tight text-center">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
                Meet the Team That'll<br /> Be on Your Property.
              </h2>
              <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
                Schedule a consultation and meet the people who'll handle your project — 
                from first conversation to final walkthrough.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/request-inspection"
                  className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Schedule a Consultation <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:8283979211"
                  className="border border-primary-foreground/30 text-primary-foreground font-semibold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/10 transition-colors"
                >
                  <Phone className="w-5 h-5" /> (828) 397-9211
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-primary-foreground/50 text-xs font-medium uppercase tracking-wider">
                <span>Licensed & Insured</span>
                <span className="text-primary-foreground/20">•</span>
                <span>In-House Crews</span>
                <span className="text-primary-foreground/20">•</span>
                <span>WNC Specialists</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Team;

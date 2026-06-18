import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Camera, ClipboardList, Users, Hammer, HardHat, Calculator, Headset, Crown, AlertCircle } from "lucide-react";
import SEOHead, { breadcrumbSchema, organizationSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

type Member = { role: string; specialty?: string };
type Group = { icon: React.ElementType; label: string; eyebrow: string; description: string; members: Member[] };

const groups: Group[] = [
  {
    icon: Crown,
    eyebrow: "Leadership",
    label: "Owners & Leadership",
    description: "Owner-led decisions on every project — from first estimate to final walkthrough.",
    members: [
      { role: "Owner & Lead Advisor", specialty: "Strategic Direction · Roofing & Construction" },
      { role: "Director of Operations", specialty: "Project Sequencing · Client Experience" },
    ],
  },
  {
    icon: Headset,
    eyebrow: "Office & Client Care",
    label: "Office & Contact Team",
    description: "The first voice you hear when you call Highlander, and the people who keep your project on track.",
    members: [
      { role: "Client Coordinator", specialty: "Scheduling & Intake" },
      { role: "Office Administrator", specialty: "Documentation & Warranties" },
    ],
  },
  {
    icon: ClipboardList,
    eyebrow: "Project Managers",
    label: "Project Managers",
    description: "Your single point of contact from contract through completion. Daily updates, real answers.",
    members: [
      { role: "Roofing Project Manager", specialty: "Residential & Commercial Roofing" },
      { role: "Construction Project Manager", specialty: "Additions, Renovations, Outdoor Living" },
    ],
  },
  {
    icon: Calculator,
    eyebrow: "Estimators",
    label: "Estimators",
    description: "Honest, line-item estimates built on real measurements — not guesses or pressure tactics.",
    members: [
      { role: "Lead Roofing Estimator", specialty: "Inspections & Scope Accuracy" },
      { role: "Construction Estimator", specialty: "Budgets & Material Specs" },
    ],
  },
  {
    icon: HardHat,
    eyebrow: "Roofing Crew",
    label: "Roofing Crew",
    description: "In-house Highlander employees — not day-labor subs. Trained on every CertainTeed and metal system we install.",
    members: [
      { role: "Roofing Foreman" },
      { role: "Lead Installer" },
      { role: "Installer" },
      { role: "Installer" },
    ],
  },
  {
    icon: Hammer,
    eyebrow: "Construction Crew",
    label: "Construction Crew",
    description: "Framers, finishers, and craftsmen who execute additions, outdoor living spaces, and renovations to a Highlander standard.",
    members: [
      { role: "Construction Foreman" },
      { role: "Lead Carpenter" },
      { role: "Carpenter" },
      { role: "Carpenter" },
    ],
  },
];

const Team = () => {
  return (
    <>
      <SEOHead
        title="Our Team | Highlander Roofing & Construction"
        description="Meet the leadership, project managers, estimators, and in-house crews behind Highlander Roofing & Construction in Franklin, Highlands, Cashiers, Sylva, and Western North Carolina."
        path="/team"
        jsonLd={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
            { name: "Team", url: "/team" },
          ]),
        ]}
      />
      <Header />
      <main>
        {/* HERO */}
        <section className="bg-heritage-charcoal pt-32 md:pt-40 pb-16 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "300px auto" }} />
          <div className="container-tight relative z-10">
            <span className="text-[11px] md:text-[12px] font-body font-bold uppercase tracking-[0.3em] text-[hsl(var(--highland-gold))] block mb-4">
              The People Behind Highlander
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6 max-w-3xl">
              Owner-Led. In-House.<br /><span className="text-[hsl(var(--highland-gold))]">Built in Western North Carolina.</span>
            </h1>
            <p className="text-white/75 text-lg md:text-xl max-w-2xl leading-relaxed font-body">
              When you hire Highlander, you get a real Western NC team — leadership, project managers, estimators, and in-house roofing and construction crews who live and work in these mountains.
            </p>
          </div>
        </section>

        {/* CLIENT-INFO NOTICE */}
        <section className="bg-[hsl(var(--highland-gold)/0.08)] border-y border-[hsl(var(--highland-gold)/0.25)]">
          <div className="container-tight py-6 md:py-7 flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-[hsl(var(--highland-gold))] flex-shrink-0 mt-1" />
            <div className="text-sm md:text-[15px] text-foreground/80 font-body leading-relaxed">
              <strong className="font-heading text-foreground">Team photos and bios coming soon.</strong>{" "}
              We're finalizing headshots, names, and short bios for every role below. Highlander team: please send approved headshots, full names, roles, short bios, certifications, and years of experience to populate this page.
            </div>
          </div>
        </section>

        {/* GROUPS */}
        <section className="section-padding bg-background">
          <div className="container-tight space-y-20 md:space-y-24">
            {groups.map((group, gi) => (
              <div key={group.label}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start gap-4 mb-8 md:mb-10"
                >
                  <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <group.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="eyebrow block mb-2">{group.eyebrow}</span>
                    <h2 className="section-heading">{group.label}</h2>
                    <p className="text-muted-foreground mt-3 max-w-2xl font-body">{group.description}</p>
                  </div>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                  {group.members.map((m, i) => (
                    <motion.div
                      key={`${gi}-${i}`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="card-premium overflow-hidden"
                    >
                      <div className="aspect-[4/5] bg-muted flex flex-col items-center justify-center text-center p-6 border-b border-border">
                        <div className="w-16 h-16 rounded-full bg-[hsl(var(--highland-gold)/0.12)] border border-[hsl(var(--highland-gold)/0.35)] flex items-center justify-center mb-4">
                          <Camera className="w-7 h-7 text-[hsl(var(--highland-gold))]" />
                        </div>
                        <span className="text-[11px] font-body font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
                          Team Photo Coming Soon
                        </span>
                      </div>
                      <div className="p-5 md:p-6">
                        <h3 className="font-heading font-bold text-foreground text-base mb-1">Name Coming Soon</h3>
                        <p className="text-primary font-heading font-bold text-[13px] uppercase tracking-[0.15em] mb-3">{m.role}</p>
                        {m.specialty && (
                          <p className="text-xs text-muted-foreground/90 font-body">{m.specialty}</p>
                        )}
                        <p className="text-xs text-muted-foreground/70 italic mt-3">Bio coming soon.</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INFO-REQUEST BLOCK FOR CLIENT */}
        <section className="section-padding bg-secondary">
          <div className="container-tight max-w-4xl">
            <div className="card-premium p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <Users className="w-7 h-7 text-[hsl(var(--highland-gold))] flex-shrink-0 mt-1" />
                <div>
                  <span className="eyebrow block mb-2">For the Highlander Team</span>
                  <h2 className="section-heading">Help Us Finish This Page</h2>
                </div>
              </div>
              <p className="text-muted-foreground font-body mb-6">
                To replace these placeholder cards with the real Highlander team, please send the following for every team member you want featured:
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-foreground/85 font-body mb-8">
                {[
                  "Professional headshot (high-resolution)",
                  "Full name (and preferred display name)",
                  "Role / job title",
                  "Short bio (2–4 sentences)",
                  "Certifications and licenses",
                  "Years of experience",
                  "Hometown or WNC connection (optional)",
                  "Specialty / focus area (optional)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))] mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground italic">
                Until approved details are provided, this page intentionally avoids placeholder names and stock photos.
              </p>
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="section-padding bg-primary">
          <div className="container-tight text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Talk to a Real Person — Not a Call Center.
            </h2>
            <p className="text-primary-foreground/75 mb-8 max-w-xl mx-auto">
              When you call Highlander, a member of our Western NC team picks up. No phone tree, no offshore sales floor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/consultation" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                Request a Free Estimate <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+18285247773" aria-label="Call Highlander Roofing & Construction at 828-524-7773" className="border border-primary-foreground/30 text-primary-foreground font-semibold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/10 transition-colors">
                <Phone className="w-5 h-5" /> Call (828) 524-7773
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

export default Team;
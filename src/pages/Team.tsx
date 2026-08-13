import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import SEOHead, { breadcrumbSchema, organizationSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { teamMembers } from "@/data/team";
import RelatedLinks from "@/components/RelatedLinks";

const Team = () => {
  return (
    <>
      <SEOHead
        title="Meet the Team | Highlander Building Services"
        description="Meet the Highlander team serving Franklin, Highlands, Cashiers, Sylva, and Western NC with consultations, project management, inspections, and repairs."
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
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "About", url: "/about" }, { name: "Team", url: "/team" }]} />
      <main id="main-content">
        {/* HERO */}
        <section className="bg-heritage-charcoal pt-32 md:pt-40 pb-16 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "300px auto" }} />
          <div className="container-tight relative z-10">
            <span className="text-[11px] md:text-[12px] font-body font-bold uppercase tracking-[0.3em] text-[hsl(var(--gold-ink))] block mb-4">
              The People Behind Highlander
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6 max-w-3xl">
              Meet the Team Behind<br /><span className="text-[hsl(var(--gold-ink))]">Highlander Building Services</span>
            </h1>
            <p className="text-white/95 text-lg md:text-xl max-w-2xl leading-relaxed font-body">
              Highlander Building Services is led by a local team committed to dependable workmanship, honest communication, and customer-focused service across Franklin, Highlands, Cashiers, Sylva, and Western North Carolina. From company leadership and sales to inspections, project management, repairs, and field coordination, each team member plays a role in helping homeowners protect and improve their properties.
            </p>
          </div>
        </section>

        {/* EVERY TEAM MEMBER MAKES A DIFFERENCE */}
        <section className="bg-background border-b border-border py-14 md:py-16">
          <div className="container-tight max-w-3xl text-center">
            <span className="eyebrow mb-3 block">Family-Owned. Locally Run. Team-Driven.</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight mb-5">
              Every Team Member Makes a Difference
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body">
              Highlander is family-owned, but the company is powered by a broader team of local professionals who each play a role in serving customers well. From leadership and financial management to sales, inspections, repairs, project coordination, scheduling, drone documentation, and field support, every role matters.
            </p>
          </div>
        </section>

        {/* TEAM GRID */}
        <section className="section-padding bg-background">
          <div className="container-tight space-y-16 md:space-y-20">
            {teamMembers.map((member, idx) => {
              const reverse = idx % 2 === 1;
              return (
                <motion.article
                  key={member.slug}
                  id={member.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55 }}
                  className={`grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 md:gap-12 items-start ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}
                >
                  <div>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border bg-muted shadow-sm">
                      <img width={1600} height={1067} decoding="async"
                        src={member.image}
                        alt={member.alt}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-[hsl(var(--highland-gold))]" />
                    </div>
                  </div>
                  <div>
                    <span className="eyebrow block mb-2">Highlander Team</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2 leading-tight">
                      {member.name}
                    </h2>
                    <p className="text-primary font-heading font-bold text-[14px] uppercase tracking-[0.18em] mb-5">
                      {member.role}
                    </p>
                    <div className="space-y-4 text-foreground/85 font-body text-[16px] md:text-[17px] leading-relaxed mb-6">
                      {member.bio.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 pt-5 border-t border-border">
                      {member.details.map((d) => (
                        <div key={d.label} className="flex flex-col">
                          <dt className="text-[11px] font-body font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold-ink))]">
                            {d.label}
                          </dt>
                          <dd className="text-sm md:text-[15px] text-foreground/85 font-body mt-1">
                            {d.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section className="section-padding bg-secondary">
          <div className="container-tight">
            <div className="text-center mb-10">
              <span className="eyebrow block mb-3">Keep Exploring</span>
              <h2 className="section-heading">Connect With Highlander</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { to: "/about", label: "About Highlander" },
                { to: "/contact", label: "Contact Our Team" },
                { to: "/recent-projects", label: "Recent Projects" },
                { to: "/residential-roofing", label: "Residential Roofing" },
                { to: "/roof-repair", label: "Roof Repair" },
                { to: "/roofing/commercial", label: "Commercial Roofing" },
                { to: "/giving-back", label: "Community Involvement" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="card-premium p-5 flex items-center justify-between group hover:border-primary/40 transition-colors"
                >
                  <span className="font-heading font-bold text-foreground">{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="section-padding bg-primary">
          <div className="container-tight text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Talk to a Real Person — Not a Call Center.
            </h2>
            <p className="text-primary-foreground/95 mb-8 max-w-xl mx-auto">
              When you call Highlander, a member of our Western NC team picks up. No phone tree, no offshore sales floor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/consultation" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                Request an Estimate <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+18285247773" aria-label="Call Highlander Building Services at 828-524-7773" className="border border-primary-foreground/30 text-primary-foreground font-semibold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/10 transition-colors">
                <Phone className="w-5 h-5" /> Call (828) 524-7773
              </a>
            </div>
          </div>
        </section>
      <RelatedLinks
          eyebrow="Keep Exploring"
          heading="Related pages you may find useful"
          columns={2}
          links={[
            { label: "Roofing Services Hub", href: "/roofing", description: "See the roofing division" },
            { label: "Construction Division", href: "/construction", description: "See the construction division" },
            { label: "Recent Highlander Projects", href: "/recent-projects", description: "See our work across WNC" },
            { label: "Contact Highlander", href: "/contact", description: "Reach the team directly" },
            { label: "Request an Inspection", href: "/request-inspection", description: "Get a written scope and estimate" }
          ]}
        />
      </main>

      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Team;
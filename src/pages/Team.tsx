import { PHONE_DISPLAY, PHONE_PLAIN, PHONE_TEL } from "@/data/business";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import SEOHead, { breadcrumbSchema, organizationSchema, personSchema } from "@/components/SEOHead";
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
        title="Roofing & Construction Team in Western NC | Highlander"
        description="Meet the Highlander roofing and construction team serving Franklin, Highlands, Cashiers, Sylva, and Western North Carolina."
        path="/team"
        jsonLd={[
          organizationSchema(),
          ...[personSchema("luke-smith"), personSchema("kristy-smith")].filter(Boolean),
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
            <span className="text-caption md:text-body-xs font-body font-bold uppercase tracking-[0.3em] text-[hsl(var(--gold-ink))] block mb-4">
              The People Behind Highlander
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6 max-w-3xl">
              <span className="sr-only">Meet the Team Behind Highlander Building Services</span>
              <span aria-hidden="true" className="block">
                Meet the Team Behind<br /><span className="text-[hsl(var(--gold-ink))]">Highlander Building Services</span>
              </span>
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
          <div className="container-tight">
            <div className="text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">The Roster</span>
              <h2 className="section-heading">Who You'll Actually Work With</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4 font-body leading-relaxed">
                Real names, real roles. These are the people who answer the phone, walk the roof,
                write the scope, and run the job from first visit to final walkthrough.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, idx) => {
              return (
                <motion.article
                  key={member.slug}
                  id={member.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                  className="flex flex-col h-full border border-border bg-card rounded-sm overflow-hidden shadow-flat scroll-mt-32"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                      <img width={1000} height={1250} decoding="async"
                        src={member.image}
                        alt={member.alt}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-[hsl(var(--highland-gold))]" />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-1.5 leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-primary font-heading font-bold text-body-xs uppercase tracking-[0.18em] mb-4">
                      {member.role}
                    </p>
                    <p className="text-foreground/80 font-body text-body-sm leading-relaxed mb-5 line-clamp-6">
                      {member.bio[0]}
                    </p>
                    <dl className="mt-auto grid gap-y-3 pt-5 border-t border-border">
                      {member.details.slice(0, 3).map((d) => (
                        <div key={d.label} className="flex flex-col">
                          <dt className="text-caption font-body font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold-ink))]">
                            {d.label}
                          </dt>
                          <dd className="text-body-sm text-foreground/85 font-body mt-1">
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
                { to: "/roofing/residential", label: "Residential Roofing" },
                { to: "/roofing/roof-repair", label: "Roof Repair" },
                { to: "/roofing/commercial", label: "Commercial Roofing" },
                { to: "/community", label: "Community Involvement" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="card-premium p-5 flex items-center justify-between group hover:border-primary/40 transition-colors"
                >
                  <span className="font-heading font-bold text-foreground">{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="section-padding bg-primary">
          <div className="container-tight text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Talk to a Real Person: Not a Call Center.
            </h2>
            <p className="text-primary-foreground mb-8 max-w-xl mx-auto">
              Call Highlander during staffed business hours to reach the team directly and discuss your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/request-inspection" className="btn btn-primary btn-md">
                Get My Written Estimate <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a href={PHONE_TEL} aria-label={`Call Highlander Building Services at ${PHONE_PLAIN}`} className="btn btn-secondary btn-md btn-on-dark">
                <Phone className="w-4 h-4" aria-hidden="true" /> Call {PHONE_DISPLAY}
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
            { label: "Get My Questions Answered", href: "/contact", description: "Reach the team directly" },
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
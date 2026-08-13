import AnswerBlock from "@/components/seo/AnswerBlock";
import { useParams, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageContext from "@/components/PageContext";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import { getServiceBySlug, services } from "@/data/services";
import { towns } from "@/data/towns";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getDivisionTheme } from "@/lib/division-theme";
import CommonConcerns from "@/components/conversion/CommonConcerns";
import TieredOffer from "@/components/conversion/TieredOffer";
import CostContextBlock from "@/components/conversion/CostContextBlock";
import SchedulingReality from "@/components/conversion/SchedulingReality";
import ConversionTrustBlock from "@/components/trust/ConversionTrustBlock";
import AttributedReviews from "@/components/trust/AttributedReviews";
import RelatedLinks from "@/components/RelatedLinks";
import { getServiceBlogLinks, getServiceTownLinks, estimateLink } from "@/lib/internal-links";

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  
  const resolvedSlug = slug || location.pathname.replace("/", "");
  const service = getServiceBySlug(resolvedSlug);

  if (!service) {
    return (
      <>
        <SEOHead
          title="Service Not Found | Highlander Building Services"
          description="The requested service page was not found. Browse all roofing and construction services."
          path={location.pathname}
          noindex
        />
        <Header />
        <main id="main-content" className="section-padding text-center pt-32">
          <h1 className="text-3xl font-heading font-bold">Service Not Found</h1>
          <Link to="/roofing" className="text-primary underline mt-4 inline-block">View All Services</Link>
        </main>
        <Footer />
      </>
    );
  }

  const theme = getDivisionTheme(service.division);
  const DivisionIcon = theme.icon;
  const otherServices = services.filter(s => s.slug !== resolvedSlug).slice(0, 3);
  const servicePath = ["commercial-roofing", "commercial-maintenance", "gutters", "outdoor-living", "construction-services"].includes(resolvedSlug)
    ? `/${resolvedSlug}`
    : `/services/${resolvedSlug}`;

  return (
    <>
      <SEOHead
        title={service.metaTitle}
        description={service.metaDescription}
        path={servicePath}
        jsonLd={buildPageSchema({
          type: "service",
          service: {
            name: service.title,
            description: service.description,
            url: servicePath,
            areaServed: "Western North Carolina",
          },
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Services", url: "/roofing" },
            { name: service.title, url: servicePath },
          ],
          faqs: service.faqs,
        })}
      />
      <Header />
      <PageBreadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/roofing" },
          { name: service.title, url: servicePath },
        ]}
      />
      <main id="main-content">
        {/* Division accent line */}
        <div className={`h-[3px] w-full ${theme.heroAccentLine}`} />

        <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 section-dark">
            <img width={1600} height={1067} loading="eager" fetchPriority="high" decoding="async" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.6)] via-[hsl(var(--hero-overlay)/0.3)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.5)] via-transparent to-transparent" />
          </div>
          <div className="container-tight relative z-10 pb-16 md:pb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Division badge */}
              <div className="flex items-center gap-2.5 mb-5">
                <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${theme.badgeBgClass}`}>
                  <DivisionIcon className={`w-4 h-4 ${theme.badgeTextClass}`} />
                </div>
                <span className={`text-caption font-body font-semibold uppercase tracking-[0.15em] ${theme.badgeTextClass}`}>
                  {theme.label}
                </span>
                <span className="text-dark-section-foreground/90 text-caption font-body">—</span>
                <span className="text-dark-section-foreground/95 text-caption font-body italic tracking-wide">
                  {theme.tagline}
                </span>
              </div>

              <h1 className="text-display-lg md:text-display-xl font-heading font-bold mb-4 text-balance text-white leading-[0.95] tracking-tightest">
                {service.headline}
              </h1>
              <PageContext division={`${theme.label} Division`} area="Western North Carolina" tone="dark" />
              <p className="text-body-lg md:text-body-xl text-white/85 max-w-2xl mb-10 leading-relaxed font-medium drop-shadow-sm">
                {service.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/consultation" className="btn btn-primary btn-md">
                  Request a Consultation <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+18285247773" className="btn btn-secondary btn-md btn-on-dark">
                  <Phone className="w-5 h-5" /> (828) 524-7773
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <AnswerBlock
          question={`What is ${service.title.toLowerCase()} from Highlander?`}
          answer={service.description}
          points={[
            "Serving Franklin, Highlands, Cashiers, Sylva & Western NC",
            "Call 828-524-7773 to talk with the team",
            "Scoped on site before any work begins",
          ]}
        />

        {/* Description + Features */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">What We Do</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <Link to="/consultation" className="btn btn-primary btn-sm">
                  Discuss Your Project <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${theme.checkClass}`} />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-padding bg-secondary">
          <div className="container-tight max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {service.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-lg border border-border px-6">
                  <AccordionTrigger className="text-left font-semibold text-foreground">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Service Areas */}
        <section className="section-padding section-dark">
          <div className="container-tight">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">{service.title} Across Western NC</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {towns.map((town) => (
                <Link key={town.slug} to={`/service-areas/${town.slug}`} className="bg-dark-section-foreground/5 border border-dark-section-foreground/10 rounded-lg p-4 hover:bg-dark-section-foreground/10 hover:border-accent/30 transition-all text-center">
                  <span className="font-heading font-semibold text-dark-section-foreground">{town.name}</span>
                  <p className="text-dark-section-foreground/85 text-xs mt-1">{town.county}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">Other Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {otherServices.map((s) => {
                const sTheme = getDivisionTheme(s.division);
                return (
                  <Link key={s.slug} to={["commercial-roofing", "commercial-maintenance", "gutters", "outdoor-living", "construction-services"].includes(s.slug) ? `/${s.slug}` : `/services/${s.slug}`} className={`group bg-card border border-border rounded-lg p-6 ${sTheme.borderHoverClass} hover:shadow-raised transition-all`}>
                    <div className="flex items-center gap-2 mb-3">
                      <s.icon className={`w-8 h-8 ${sTheme.accentClass}`} />
                      <span className={`text-caption font-body font-semibold uppercase tracking-[0.12em] ${sTheme.badgeTextClass} opacity-60`}>
                        {sTheme.label}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                    <span className={`${sTheme.accentClass} text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all`}>Explore This Service <ArrowRight className="w-4 h-4" /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <TieredOffer context="service" />
        <CommonConcerns />
        {service.division !== "construction" && (
          <>
            <CostContextBlock serviceLabel={service.title.toLowerCase()} />
            <SchedulingReality serviceLabel={service.title.toLowerCase()} />
          </>
        )}
        <div className="container-tight pt-16 md:pt-20">
          <AttributedReviews
            category={service.division === "construction" ? "construction" : "roofing"}
            heading={`What homeowners say about our ${service.title.toLowerCase()} work`}
          />
        </div>
        <InspectionForm />
        <RelatedLinks
          eyebrow="Keep Exploring"
          heading={`Related reading and local coverage for ${service.title}`}
          columns={2}
          links={[
            ...getServiceBlogLinks(service.title, resolvedSlug, 3),
            ...getServiceTownLinks(4),
            { label: "All Service Areas", href: "/service-areas", description: "Every Western North Carolina town we cover." },
            estimateLink,
          ]}
        />
      </main>
      <ConversionTrustBlock variant="band" category={service.division === "construction" ? "construction" : "roofing"} />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ServicePage;

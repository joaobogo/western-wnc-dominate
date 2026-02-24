import { useParams, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import { getServiceBySlug, services } from "@/data/services";
import { towns } from "@/data/towns";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  
  // Handle both /services/:slug and /commercial-roofing, /commercial-maintenance routes
  const resolvedSlug = slug || location.pathname.replace("/", "");
  const service = getServiceBySlug(resolvedSlug);

  if (!service) {
    return (
      <>
        <Header />
        <main className="section-padding text-center pt-32">
          <h1 className="text-3xl font-heading font-bold">Service Not Found</h1>
          <Link to="/services" className="text-primary underline mt-4 inline-block">View All Services</Link>
        </main>
        <Footer />
      </>
    );
  }

  const otherServices = services.filter(s => s.slug !== resolvedSlug).slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="section-padding section-dark pt-32 md:pt-40">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">
                {resolvedSlug.includes("commercial") ? "Commercial Services" : resolvedSlug === "outdoor-living" || resolvedSlug === "construction-services" ? "Building Services" : resolvedSlug === "gutters" ? "Exterior Services" : "Residential Services"}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-balance">
                {service.headline}
              </h1>
              <p className="text-dark-section-foreground/70 max-w-2xl text-base md:text-lg mb-8">
                {service.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/request-inspection" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  Request Free Inspection <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:8283979211" className="border border-dark-section-foreground/30 text-dark-section-foreground font-semibold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:bg-dark-section-foreground/10 transition-colors">
                  <Phone className="w-5 h-5" /> (828) 397-9211
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Description + Features */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">What We Do</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <Link to="/request-inspection" className="cta-gradient text-accent-foreground font-semibold px-6 py-3 rounded-md inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
                  Get a Free Estimate <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
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
                  <p className="text-dark-section-foreground/50 text-xs mt-1">{town.county}</p>
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
              {otherServices.map((s) => (
                <Link key={s.slug} to={["commercial-roofing", "commercial-maintenance", "gutters", "outdoor-living", "construction-services"].includes(s.slug) ? `/${s.slug}` : `/services/${s.slug}`} className="group bg-card border border-border rounded-lg p-6 hover:border-primary/30 hover:shadow-lg transition-all">
                  <s.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                  <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">Learn More <ArrowRight className="w-4 h-4" /></span>
                </Link>
              ))}
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

export default ServicePage;

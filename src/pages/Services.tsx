import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SEOHead, { breadcrumbSchema, serviceSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import { services } from "@/data/services";

const Services = () => {
  return (
    <>
      <SEOHead
        title="Roofing & Construction Services in Western NC | Highlander"
        description="Complete roofing and construction services across Western North Carolina — repair, replacement, metal roofing, additions, renovations & more. Free estimates."
        path="/roofing"
        jsonLd={[
          serviceSchema({
            name: "Roofing & Construction Services",
            description:
              "Roofing and construction services across Western North Carolina — repair, replacement, metal roofing, additions, and outdoor living.",
            url: "/roofing",
            areaServed: "Western North Carolina",
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/roofing" },
          ]),
        ]}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }]} />
      <main>
        <section className="section-padding section-dark pt-32 md:pt-40">
          <div className="container-tight text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-[hsl(var(--gold-ink))] font-semibold text-sm uppercase tracking-wider mb-3">Our Services</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                Roofing Services Built for Mountain Living
              </h1>
              <p className="text-dark-section-foreground/90 max-w-2xl mx-auto text-base md:text-lg">
                From emergency storm repairs to full replacements, we handle every roofing need across Western North Carolina.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    to={["commercial-roofing", "commercial-maintenance", "gutters", "outdoor-living", "construction-services"].includes(service.slug) ? `/${service.slug}` : `/services/${service.slug}`}
                    className="group block bg-card border border-border rounded-lg p-8 hover:border-primary/30 hover:shadow-lg transition-all h-full"
                  >
                    <service.icon className="w-10 h-10 text-primary mb-4" />
                    <h2 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{service.title}</h2>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.description.slice(0, 120)}…</p>
                    <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
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

export default Services;

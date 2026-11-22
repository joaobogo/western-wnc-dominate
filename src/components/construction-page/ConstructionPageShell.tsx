import type { ReactNode } from "react";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import type { ConstructionPageContent } from "@/content/construction/types";

/**
 * Head, header, breadcrumbs, footer and sticky call bar for a construction
 * template page. Schema: Service (areaServed = towns with real projects, or
 * the region when the service has none yet),
 * BreadcrumbList and FAQPage built from the same FAQ array the page shows.
 */
const ConstructionPageShell = ({ c, serviceType, children }: { c: ConstructionPageContent; serviceType: string; children: ReactNode }) => (
  <>
    <SEOHead
      title={c.title}
      description={c.description}
      path={c.path}
      jsonLd={[
        serviceSchema({ name: serviceType, description: c.description, url: c.path, ...(c.areaServed.length ? { areaServedCities: c.areaServed } : { areaServed: "Western North Carolina" }) }),
        breadcrumbSchema(c.breadcrumbs),
        faqSchema(c.faqs),
      ]}
    />
    <Header />
    <PageBreadcrumbs items={c.breadcrumbs} />
    <main id="main-content">{children}</main>
    <Footer />
    <StickyMobileCTA />
  </>
);

export default ConstructionPageShell;

import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import AnswerBlock from "@/components/seo/AnswerBlock";
import RelatedLinks from "@/components/RelatedLinks";
import CTABlock from "@/components/CTABlock";
import CommonConcerns from "@/components/conversion/CommonConcerns";
import WhoShowsUp from "@/components/trust/WhoShowsUp";
import NotFound from "@/pages/NotFound";
import outdoorMobileHero from "@/assets/heroes/outdoor-living-mobile.webp";
import { getOutdoorSubPage } from "@/data/outdoor-living-subpages";

/**
 * One template for the three outdoor-living sub-pages
 * (src/data/outdoor-living-subpages.ts). Structure mirrors the roofing
 * service pages: answer first, scope, mountain considerations, process, FAQ
 * (visible + FAQPage schema), related links, closing CTA.
 */
const OutdoorLivingSubPage = ({ slug }: { slug: string }) => {
  const page = getOutdoorSubPage(slug);
  if (!page) return <NotFound />;

  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Construction", url: "/construction" },
    { name: "Outdoor Living", url: "/construction/outdoor-living" },
    { name: page.crumb, url: page.path },
  ];

  return (
    <>
      <SEOHead
        title={page.title}
        description={page.description}
        path={page.path}
        jsonLd={buildPageSchema({
          type: "service",
          service: {
            name: page.crumb,
            description: page.description,
            url: page.path,
            areaServed: "Western North Carolina",
          },
          breadcrumbs: crumbs,
          faqs: page.faqs.map((f) => ({ question: f.q, answer: f.a })),
        })}
      />
      <Header />
      <ServicePageTemplate
        alternateSurfaces={false}
        beforeHero={<PageBreadcrumbs items={crumbs} />}
        hero={
          <section className="relative min-h-[60vh] md:min-h-[75vh] flex items-end overflow-hidden hero-clears-header pb-20 md:pb-28">
            <div className="absolute inset-0">
              <img
                width={1600}
                height={1067}
                decoding="async"
                src={outdoorMobileHero}
                alt="Outdoor living space at a mountain home in Western North Carolina"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.72)] via-[hsl(var(--hero-overlay)/0.45)] to-[hsl(var(--hero-overlay)/0.15)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.55)] via-transparent to-transparent" />
            </div>
            <div className="container-tight relative z-10">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-white">
                <span className="mb-4 block text-caption font-body font-semibold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))]">
                  Outdoor Living · Western North Carolina
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-balance">{page.h1}</h1>
                <p className="text-white/90 max-w-2xl text-base md:text-lg mb-8">{page.lead}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/request-inspection" className="btn btn-primary btn-md">
                    Get My Project Scoped <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <a href={PHONE_TEL} className="btn btn-secondary btn-md btn-on-dark">
                    <Phone className="w-4 h-4" aria-hidden="true" /> {PHONE_DISPLAY}
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        }
        quickAnswer={<AnswerBlock question={page.answer.question} answer={page.answer.answer} points={page.answer.points} />}
        whatWeDo={
          <section className="section-padding bg-background">
            <div className="container-tight">
              <div className="max-w-2xl mb-8">
                <span className="eyebrow mb-3 block">Scope</span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">{page.scope.heading}</h2>
                <p className="text-muted-foreground">{page.scope.intro}</p>
              </div>
              <ul className="grid gap-3 md:grid-cols-2">
                {page.scope.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 border border-border bg-card px-4 py-3">
                    <CheckCircle className="w-4 h-4 text-[hsl(var(--gold-ink))] shrink-0 mt-1" aria-hidden="true" />
                    <span className="text-foreground/85 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        }
        whatsIncluded={
          <section className="section-padding bg-muted/20">
            <div className="container-tight">
              <div className="max-w-2xl mb-10">
                <span className="eyebrow mb-3 block">Mountain Conditions</span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">{page.considerations.heading}</h2>
                <p className="text-muted-foreground">{page.considerations.intro}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {page.considerations.items.map((c) => (
                  <div key={c.title} className="border border-border rounded-lg p-6 bg-background">
                    <h3 className="font-heading font-bold text-lg mb-2">{c.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        }
        process={
          <section className="section-padding bg-background">
            <div className="container-tight">
              <div className="max-w-2xl mb-10">
                <span className="eyebrow mb-3 block">How It Works</span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold">From site visit to walkthrough</h2>
              </div>
              <ol className="grid gap-5 md:grid-cols-5">
                {page.process.map((step, i) => (
                  <li key={step.title} className="border-t-2 border-[hsl(var(--highland-gold))] pt-4">
                    <span className="block text-caption font-bold uppercase tracking-widest text-[hsl(var(--gold-ink))] mb-1">Step {i + 1}</span>
                    <h3 className="font-heading font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        }
        proof={<WhoShowsUp />}
        faq={
          <section className="section-padding bg-background">
            <div className="container-tight max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">{page.crumb}: questions we hear</h2>
              <Accordion type="single" collapsible>
                {page.faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`ol-${i}`}>
                    <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        }
        coverage={
          <RelatedLinks
            eyebrow="Keep Exploring"
            heading="Related construction and roofing pages"
            columns={2}
            links={page.related}
          />
        }
        cta={
          <>
            <CommonConcerns />
            <CTABlock />
          </>
        }
      />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default OutdoorLivingSubPage;

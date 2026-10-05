import { Link, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Layers, ClipboardCheck, MapPin } from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/layout/Section";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageCloseCTA from "@/components/PageCloseCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import AnswerBlock from "@/components/seo/AnswerBlock";
import ShowroomIdentity from "@/components/locations/ShowroomIdentity";
import ShowroomMap from "@/components/locations/ShowroomMap";
import ShowroomCommute from "@/components/locations/ShowroomCommute";
import LeaveReviewLink from "@/components/trust/LeaveReviewLink";
import { formatPhoneDisplay, telHref } from "@/data/business";
import { showroomBySlug, showrooms } from "@/data/showrooms";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/**
 * Physical showroom page. Distinct from a service-area page: this page is
 * about walking into a real building, so it leads with NAP, hours, parking,
 * directions, and what is on display — not with "do you serve my town".
 */
const LocationPage = ({ slug: slugProp }: { slug?: string }) => {
  const params = useParams<{ slug: string }>();
  const slug = slugProp ?? params.slug ?? "";
  const showroom = showroomBySlug(slug);

  if (!showroom) return <Navigate to="/locations" replace />;

  const loc = showroom.location;
  const phone = formatPhoneDisplay(loc.phoneE164);
  const other = showrooms.find((s) => s.id !== showroom.id);
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations" },
    { name: `${loc.locality}, ${loc.region}`, url: showroom.path },
  ];

  return (
    <>
      <SEOHead
        title={showroom.metaTitle}
        description={showroom.metaDescription}
        path={showroom.path}
        jsonLd={buildPageSchema({
          type: "location",
          locationId: showroom.id,
          path: showroom.path,
          page: { title: showroom.metaTitle, description: showroom.metaDescription },
          breadcrumbs,
          faqs: showroom.faqs,
        })}
      />
      <Header />
      <main id="main">
        <PageBreadcrumbs items={breadcrumbs} />

        {/* Hero — identity first */}
        <Section density="default" width="wide" className="section-dark dark-surface">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: HIGHLAND_EASE }}
            className="max-w-4xl"
          >
            <span className="eyebrow mb-4 block text-[hsl(var(--gold-ink))]">
              {showroom.county} · Showroom & Office
            </span>
            <h1 className="mb-5 font-heading text-3xl font-bold leading-[1.1] text-dark-section-foreground md:text-5xl">
              {showroom.h1}
            </h1>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-dark-section-muted md:text-lg">
              {showroom.intro[0]}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/request-inspection" className="btn btn-primary">
                <span>Get My Written Estimate</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href={telHref(loc.phoneE164)} className="btn btn-secondary-dark">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>Call {phone}</span>
              </a>
            </div>
          </motion.div>
        </Section>

        <AnswerBlock
          question={`Where is the Highlander Building Services showroom in ${loc.locality}, ${loc.region}?`}
          answer={showroom.answer}
          points={[
            `Open ${loc.hours[0].label}`,
            "Walk-ins welcome — no appointment needed",
            "Metal, shingle, composite, skylight, and gutter samples on display",
            "Estimator on site to start your written scope",
          ]}
        />

        {/* NAP + map */}
        <Section density="default" width="wide">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="eyebrow mb-3 block">Visit Us</span>
              <h2 className="section-heading mb-6">The {loc.locality} showroom at a glance</h2>
              <ShowroomIdentity showroom={showroom} />
              <div className="mt-4">
                <LeaveReviewLink location={loc} className="text-body-sm" />
              </div>
              <div className="mt-8">
                <h3 className="mb-3 font-heading text-lg font-bold text-foreground">Getting here</h3>
                <ul className="space-y-2">
                  {showroom.gettingHere.map((line) => (
                    <li key={line} className="flex gap-2 font-body text-body-sm text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ShowroomMap location={loc} />
          </div>
        </Section>

        {/* Drive time from the visitor's address to this showroom */}
        <Section density="default" width="wide" className="bg-secondary/30">
          <ShowroomCommute location={loc} showroomSlug={showroom.slug} />
        </Section>


        {/* On display */}
        <Section density="default" width="wide" className="bg-secondary/30">
          <span className="eyebrow mb-3 block">On Display</span>
          <h2 className="section-heading mb-4">What you can see and touch in {loc.locality}</h2>
          <p className="mb-10 max-w-2xl font-body text-body text-muted-foreground">{showroom.intro[1]}</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {showroom.onDisplay.map((item) => (
              <div key={item.name} className="border border-border bg-card p-6">
                <Layers className="mb-3 h-5 w-5 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{item.name}</h3>
                <p className="font-body text-body-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Visit agenda */}
        <Section density="default" width="tight">
          <span className="eyebrow mb-3 block">What A Visit Covers</span>
          <h2 className="section-heading mb-8">Bring your photos, plans, or insurance report</h2>
          <ul className="space-y-4">
            {showroom.visitAgenda.map((line) => (
              <li key={line} className="flex gap-3">
                <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                <span className="font-body text-body text-foreground">{line}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Local project proof */}
        <Section density="default" width="wide" className="bg-secondary/30">
          <span className="eyebrow mb-3 block">Work Near This Showroom</span>
          <h2 className="section-heading mb-8">
            Completed projects around {loc.locality}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {showroom.photos.map((photo) => (
              <figure key={photo.caption} className="border border-border bg-card">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={480}
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="p-4 font-body text-body-sm text-muted-foreground">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
          <Link to="/recent-projects" className="btn btn-secondary mt-8">
            <span>See more completed projects</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Section>

        {/* Towns served from here */}
        <Section density="default" width="wide">
          <span className="eyebrow mb-3 block">Served From {loc.locality}</span>
          <h2 className="section-heading mb-4">Towns this showroom covers</h2>
          <p className="mb-8 max-w-2xl font-body text-body text-muted-foreground">
            Crews and estimators dispatch from {loc.locality} to these communities. Each town page covers local
            permitting, weather exposure, and the material choices that hold up there.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {showroom.towns.map((town) => (
              <li key={town.slug}>
                <Link
                  to={`/service-areas/${town.slug}`}
                  className="flex items-center justify-between gap-3 border border-border bg-card px-4 py-3 transition-colors hover:border-[hsl(var(--highland-gold)/0.4)]"
                >
                  <span className="font-body text-body font-semibold text-foreground">{town.name}, NC</span>
                  <span className="font-body text-body-sm text-muted-foreground">{town.drive}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* FAQ */}
        <Section density="default" width="tight" className="bg-secondary/30">
          <span className="eyebrow mb-3 block">Showroom FAQ</span>
          <h2 className="section-heading mb-8">Questions about visiting {loc.locality}</h2>
          <div className="space-y-6">
            {showroom.faqs.map((faq) => (
              <div key={faq.question} className="border-b border-border pb-6 last:border-0">
                <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{faq.question}</h3>
                <p className="font-body text-body leading-relaxed text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Other showroom */}
        {other && (
          <Section density="compact" width="wide">
            <div className="flex flex-col gap-4 border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow mb-1 text-muted-foreground">Closer to {other.location.locality}?</p>
                <p className="font-body text-body font-semibold text-foreground">
                  Our {other.cardLabel} carries the same materials library.
                </p>
              </div>
              <Link to={other.path} className="btn btn-secondary shrink-0">
                <span>Visit the {other.location.locality} page</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Section>
        )}

        <PageCloseCTA
          eyebrow="Stop By"
          heading={`Come see your roof materials in ${loc.locality}`}
          body={`Bring photos or plans to ${loc.locality} and leave with a written scope, or start online and we'll follow up within 24 hours.`}
          secondaryLabel="See all locations"
          secondaryTo="/locations"
          context={`location-${showroom.id}`}
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default LocationPage;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MapPin, Clock } from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/layout/Section";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageCloseCTA from "@/components/PageCloseCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import AnswerBlock from "@/components/seo/AnswerBlock";
import ShowroomMap from "@/components/locations/ShowroomMap";
import { formatPhoneDisplay, napLine, telHref } from "@/data/business";
import { showrooms } from "@/data/showrooms";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const TITLE = "Our Showrooms in Franklin & Sylva, NC | Highlander Building Services";
const DESCRIPTION =
  "Two Western North Carolina showrooms — Franklin and Sylva. See metal, shingle, and composite roofing samples in person, Monday through Friday, 8 AM to 5 PM.";

/**
 * Locations hub. Lists the two physical showrooms with full NAP and links to
 * each location page. Service-area coverage lives at /service-areas.
 */
const Locations = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations" },
  ];

  return (
    <>
      <SEOHead
        title={TITLE}
        description={DESCRIPTION}
        path="/locations"
        jsonLd={buildPageSchema({ type: "generic", breadcrumbs })}
      />
      <Header />
      <main id="main">
        <PageBreadcrumbs items={breadcrumbs} />

        <Section density="default" width="wide" className="section-dark dark-surface">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: HIGHLAND_EASE }}
            className="max-w-3xl"
          >
            <span className="eyebrow mb-4 block text-[hsl(var(--gold-ink))]">Where To Find Us</span>
            <h1 className="mb-5 font-heading text-3xl font-bold leading-[1.1] text-dark-section-foreground md:text-5xl">
              Two Western North Carolina showrooms
            </h1>
            <p className="font-body text-base leading-relaxed text-dark-section-muted md:text-lg">
              Franklin is our main office. Sylva puts the same materials library inside Jackson County. Both are open
              Monday through Friday, 8:00 AM to 5:00 PM, and both are staffed by estimators who work these mountains
              every day.
            </p>
          </motion.div>
        </Section>

        <AnswerBlock
          question="Where are the Highlander Building Services showrooms located?"
          answer={`Highlander Building Services has two showrooms in Western North Carolina: ${napLine(
            showrooms[0].location,
          )} and ${napLine(
            showrooms[1].location,
          )}. Both are open Monday through Friday, 8:00 AM to 5:00 PM, with roofing, skylight, gutter, and siding samples on display and an estimator on site.`}
          points={showrooms.map((s) => `${s.cardLabel} — ${napLine(s.location)}`)}
        />

        <Section density="default" width="wide">
          <div className="grid gap-10 lg:grid-cols-2">
            {showrooms.map((showroom) => {
              const loc = showroom.location;
              return (
                <article key={showroom.id} className="flex flex-col border border-border bg-card">
                  <ShowroomMap location={loc} className="border-0 border-b" />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="eyebrow mb-2 block text-muted-foreground">{showroom.county}</span>
                    <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">
                      {loc.locality}, {loc.region} Showroom
                    </h2>
                    <ul className="mb-5 space-y-2">
                      <li className="flex gap-2 font-body text-body-sm text-foreground">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                        <span>{napLine(loc)}</span>
                      </li>
                      <li className="flex gap-2 font-body text-body-sm text-foreground">
                        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                        <a href={telHref(loc.phoneE164)} className="underline underline-offset-4">
                          {formatPhoneDisplay(loc.phoneE164)}
                        </a>
                      </li>
                      <li className="flex gap-2 font-body text-body-sm text-foreground">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                        <span>{loc.hours[0].label} — walk in or call ahead</span>
                      </li>
                    </ul>
                    <p className="mb-6 font-body text-body-sm leading-relaxed text-muted-foreground">
                      {showroom.intro[0]}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-3">
                      <Link to={showroom.path} className="btn btn-primary">
                        <span>Visit the {loc.locality} showroom page</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        <Section density="compact" width="wide" className="bg-secondary/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="mb-1 font-heading text-xl font-bold text-foreground">
                Looking for coverage in your town instead?
              </h2>
              <p className="font-body text-body-sm text-muted-foreground">
                Service-area pages cover permitting, weather, and materials town by town.
              </p>
            </div>
            <Link to="/service-areas" className="btn btn-secondary shrink-0">
              <span>Browse service areas</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Section>

        <PageCloseCTA
          eyebrow="Stop By"
          heading="Pick the showroom closest to you"
          body="Bring photos, plans, or an insurance report and we'll start your written scope on the spot."
          secondaryLabel="Contact us"
          secondaryTo="/contact"
          context="locations-hub"
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Locations;

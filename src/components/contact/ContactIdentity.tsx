import { MapPin, Building2, Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MapEmbed from "@/components/contact/MapEmbed";
import OfficeHours from "@/components/contact/OfficeHours";

/**
 * Contact page identity block: NAP, credentials, map, and honest hours.
 *
 * The map is lazy-loaded and the hours mirror the Footer so all surfaces
 * stay consistent. A single CTA links to the service-area network.
 */
const ContactIdentity = () => (
  <section className="section-padding bg-background" aria-labelledby="contact-identity-heading">
    <div className="container-tight">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Left — NAP + map */}
        <div>
          <span className="text-caption font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))] block mb-3">
            Where We Are
          </span>
          <h2 id="contact-identity-heading" className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-5 leading-tight">
            Highlander Building Services, Inc.
          </h2>
          <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed mb-6">
            A locally owned roofing and construction company based in Franklin, North Carolina, working across
            Macon, Jackson, Haywood, Swain, Clay, Cherokee, and Transylvania counties with in-house crews.
          </p>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-heading font-semibold text-foreground">Franklin Office</p>
                <address className="not-italic text-sm text-muted-foreground font-body">
                  76 Creative Dr<br />Franklin, NC 28734
                </address>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-1" />
              <a href="tel:+18285247773" className="text-sm font-heading font-semibold text-foreground hover:text-primary">
                (828) 524-7773
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-1" />
              <a href="mailto:info@highlandernc.com" className="text-sm font-body text-muted-foreground hover:text-primary">
                info@highlandernc.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-1" />
              <p className="text-sm text-muted-foreground font-body">
                Licensed North Carolina general contractor · Fully insured · CertainTeed ShingleMaster credentialed
              </p>
            </li>
          </ul>

          <MapEmbed className="mb-8" />

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/service-areas"
              className="cta-gradient text-accent-foreground font-heading font-bold text-sm px-6 py-3.5 rounded-none inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all"
            >
              See Service Areas <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/service-areas/franklin-nc"
              className="border border-border text-foreground font-heading font-semibold text-sm px-6 py-3.5 rounded-none inline-flex items-center justify-center gap-2 hover:border-primary/40 transition-all"
            >
              Franklin, NC
            </Link>
          </div>
        </div>

        {/* Right — office hours + coverage */}
        <div className="space-y-8">
          <OfficeHours />

          <div className="border border-border bg-card p-6 md:p-8">
            <h3 className="text-lg font-heading font-bold text-foreground mb-3">Not sure if we cover your town?</h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">
              We work across Western North Carolina from Franklin and Highlands to Sylva, Cashiers, Waynesville,
              Murphy, and Bryson City. Every town we serve has its own page with local project photos and pricing context.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/service-areas"
                className="border border-border text-foreground font-heading font-semibold text-sm px-6 py-3.5 rounded-none inline-flex items-center justify-center gap-2 hover:border-primary/40 transition-all"
              >
                Browse All Towns
              </Link>
              <a
                href="tel:+18285247773"
                className="text-foreground font-heading font-semibold text-sm px-6 py-3.5 rounded-none inline-flex items-center justify-center gap-2 hover:text-primary transition-all"
              >
                <Phone className="w-4 h-4" />
                Call to Confirm
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactIdentity;

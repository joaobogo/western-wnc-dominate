import { BUSINESS, PHONE_TEL } from "@/data/business";
import LocationCards from "@/components/LocationCards";
import { Building2, Mail, Phone, ArrowRight } from "lucide-react";
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
            {BUSINESS.legalName}
          </h2>
          <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed mb-6">
            A locally owned roofing and construction company based in Franklin, North Carolina, with showrooms
            in Franklin and Sylva and service across Western North Carolina.
          </p>

          <LocationCards className="mb-8" />

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-1" aria-hidden="true" />
              <a href={`mailto:${BUSINESS.email}`} className="text-sm font-body text-muted-foreground hover:text-primary">
                {BUSINESS.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-1" aria-hidden="true" />
              <p className="text-sm text-muted-foreground font-body">
                Licensed North Carolina general contractor ({BUSINESS.licenseNumber}) · CertainTeed Credentialed Contractor · VELUX Certified Installer
              </p>
            </li>
          </ul>

          <MapEmbed className="mb-8" />

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/service-areas"
              className="btn btn-secondary btn-md"
            >
              See Service Areas <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/service-areas/franklin-nc"
              className="btn btn-secondary btn-md"
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
                className="btn btn-secondary btn-md"
              >
                Browse All Towns
              </Link>
              <a
                href={PHONE_TEL}
                className="btn btn-ghost btn-md"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
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

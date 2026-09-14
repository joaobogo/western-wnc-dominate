import { BUSINESS, FRANKLIN, PHONE_DISPLAY, PHONE_TEL } from "@/data/business";
import LocationCards from "@/components/LocationCards";
import VerifiableTrustStrip from "@/components/trust/VerifiableTrustStrip";
import React, { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight, ArrowRight, Award, Clock, BadgeCheck, ChevronDown } from "lucide-react";
import veluxLogo from "@/assets/logo-velux.png";
import certainteedPremierBadge from "@/assets/badge-certainteed-premier.png";
import { motion } from "framer-motion";
import logo from "@/assets/logo.svg";
import SocialLinks from "@/components/SocialLinks";
import LeaveReviewLink from "@/components/trust/LeaveReviewLink";
import { towns } from "@/data/towns";

// P4.2 — the ten roofing division pages, each anchor naming its service;
// "Western NC" appears once in the column. Intake tools stay out of the footer.
const roofingLinks = [
  { label: "Residential Roofing in Western NC", href: "/roofing/residential" },
  { label: "Roof Replacement", href: "/roofing/roof-replacement" },
  { label: "Roof Repair", href: "/roofing/roof-repair" },
  { label: "Metal Roofing", href: "/roofing/metal" },
  { label: "Synthetic Roofing (Brava)", href: "/roofing/brava-synthetic" },
  { label: "Specialty Roofing", href: "/roofing/specialty" },
  { label: "Seamless Gutters", href: "/roofing/gutters" },
  { label: "Skylight Installation", href: "/roofing/skylights" },
  { label: "Storm Damage Roofing", href: "/roofing/storm-damage" },
  { label: "Commercial Roofing", href: "/roofing/commercial" },
];

const constructionLinks = [
  { label: "Construction Division", href: "/construction" },
  { label: "Home Additions", href: "/construction/additions" },
  { label: "Outdoor Living", href: "/construction/outdoor-living" },
  { label: "Design & Planning", href: "/construction/design" },
  { label: "Siding & Exterior", href: "/construction/siding" },
  { label: "Exterior Improvements", href: "/exterior-improvements" },
  { label: "Construction Consultation", href: "/construction/consultation" },
  { label: "Build Your Project", href: "/construction-builder" },
];

const resourceLinks = [
  { label: "Recent Projects", href: "/recent-projects" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Financing", href: "/financing" },
  { label: "Certifications", href: "/certifications" },
  { label: "Design & Layout Planning", href: "/layouts-planning" },
];

const companyLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Our Showrooms", href: "/locations" },
  { label: "Franklin Showroom", href: "/locations/franklin-nc" },
  { label: "Sylva Showroom", href: "/locations/sylva-nc" },
  { label: "Our Team", href: "/team" },
  { label: "Community", href: "/community" },
  { label: "Work With Us", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];


// Tier 1 (P4.2) — the four core markets we are ranking for, then the two showrooms.
const tier1Areas = [
  { label: "Franklin", href: "/service-areas/franklin-nc" },
  { label: "Highlands", href: "/service-areas/highlands-nc" },
  { label: "Cashiers", href: "/service-areas/cashiers-nc" },
  { label: "Sylva", href: "/service-areas/sylva-nc" },
  { label: "Franklin Showroom", href: "/locations/franklin-nc" },
  { label: "Sylva Showroom", href: "/locations/sylva-nc" },
];

// Tier 2 — every remaining town page (all indexable), generated from the town
// data so the footer link map stays complete for crawlers as new markets are
// added. County hubs and noindex service×town pages are never linked here.
const tier1Slugs = new Set(tier1Areas.map((a) => a.href));
const tier2Areas = towns
  .map((t) => ({ label: t.name, href: `/service-areas/${t.slug}` }))
  .filter((t) => !tier1Slugs.has(t.href))
  .sort((a, b) => a.label.localeCompare(b.label));

const FooterLink = React.forwardRef<
  HTMLAnchorElement,
  { to: string; children: React.ReactNode }
>(({ to, children }, ref) => (
  <Link
    ref={ref}
    to={to}
    className="group text-body-sm text-foreground/90 hover:text-primary transition-colors inline-flex items-center gap-1.5 font-body leading-relaxed py-2.5 md:py-1.5 font-medium"
  >
    {children}
    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
  </Link>
));
FooterLink.displayName = "FooterLink";

/**
 * A footer link group. Expanded on desktop; on phones it collapses behind a
 * 44px header after mount (mobile re-audit M-4). Links are hidden, never
 * removed, so the prerendered HTML and the crawlable link graph are unchanged.
 */
const FooterGroup = ({
  title,
  label,
  children,
  navClassName = "flex-col gap-1",
  className = "",
}: {
  title: string;
  label: string;
  children: React.ReactNode;
  navClassName?: string;
  className?: string;
}) => {
  const [open, setOpen] = useState(true);
  const id = useId();
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) setOpen(false);
  }, []);
  return (
    <div className={className}>
      <h4 className="eyebrow text-primary mb-2 md:mb-4">
        <button
          type="button"
          className="md:hidden flex w-full min-h-[44px] items-center justify-between text-left"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
        >
          {title}
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        <span className="hidden md:inline">{title}</span>
      </h4>
      <nav id={id} aria-label={label} className={`${open ? "flex" : "hidden md:flex"} ${navClassName} mb-4 md:mb-0`}>
        {children}
      </nav>
    </div>
  );
};

const Footer = () => {
  // pb on phones clears the 72px sticky call bar + the iOS home indicator, so
  // the last footer links are never hidden behind it (mobile audit F11).
  return (
    <footer className="bg-white text-foreground relative overflow-hidden border-t border-border pb-[calc(72px+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* Background Tartan Watermark — Ultra subtle */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ 
        backgroundImage: "url('/tartan.png')",
        backgroundSize: "600px auto"
      }} />

      {/* Top Heritage Accent Bar */}
      <div className="h-[4px] w-full relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: "url('/tartan.png')",
          backgroundSize: "120px auto"
        }} />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white" />
      </div>

      {/* CTA Strip */}
      <div className="border-b border-border relative" data-final-cta>
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container-tight py-12 md:py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-10 h-[2px] bg-primary/40 mb-5 origin-left"
              />
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 tracking-tight text-foreground">
                Plan Before You Build.
              </h3>
              <p className="text-muted-foreground text-lg md:text-xl font-body max-w-md leading-relaxed font-medium">
                Roof, addition, or storm damage, supported by expert Design. One local team, one named contact.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/request-inspection"
                className="btn btn-primary btn-md group relative whitespace-nowrap"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Get My Written Estimate</span>
                <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a
                href={PHONE_TEL}
                className="btn btn-secondary btn-md whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container-tight py-14 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 lg:gap-x-12">
          {/* Column 1 — NAP, contact, hours */}
          <div>
            <Link to="/" className="inline-flex items-center mb-6">
              <img
                src={logo}
                alt="Highlander Building Services logo"
                width={220}
                height={64}
                className="h-[56px] md:h-[64px] w-auto"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-body-sm text-muted-foreground leading-relaxed mb-6 max-w-xs font-body">
              Roofing and construction across Western North Carolina, with local crews and one named contact since 2017.
            </p>

            <address className="not-italic space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-primary/80 flex-shrink-0 mt-1" aria-hidden="true" />
                <div className="text-body-sm text-foreground/85 font-body leading-relaxed">
                  <span className="block font-bold text-foreground">{BUSINESS.legalName}</span>
                  {FRANKLIN.streetAddress}<br />
                  {FRANKLIN.locality}, {FRANKLIN.region} {FRANKLIN.postalCode}
                </div>
              </div>
              <a
                href={PHONE_TEL}
                className="flex items-center gap-3 min-h-[44px] font-heading font-bold text-body-lg text-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" aria-hidden="true" /> {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-3 min-h-[44px] text-body-sm font-body text-muted-foreground hover:text-primary transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" /> {BUSINESS.email}
              </a>
              <div className="flex gap-3 pt-4 border-t border-border">
                <Clock className="w-4 h-4 text-primary/80 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-body-sm text-muted-foreground font-body leading-relaxed">
                  <span className="block font-bold text-foreground/85">Office Hours</span>
                  Mon–Fri 8:00 AM – 5:00 PM<br />
                  Sat–Sun: closed
                </div>
              </div>
            </address>

            <div className="pt-6 mt-6 border-t border-border">
              <span className="block eyebrow text-primary mb-3">Follow Highlander</span>
              <SocialLinks variant="light" size="md" />
            </div>
          </div>

          {/* Column 2 — Services */}
          <div>
            <FooterGroup title="Roofing" label="Roofing links">
              {roofingLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </FooterGroup>
            <FooterGroup title="Construction" label="Construction links" className="md:mt-8">
              {constructionLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </FooterGroup>
          </div>

          {/* Column 3 — Company & Resources */}
          <div>
            <FooterGroup title="Company" label="Company links">
              {companyLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </FooterGroup>
            <FooterGroup title="Resources" label="Resources links" className="md:mt-8">
              {resourceLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
              <LeaveReviewLink
                location={FRANKLIN}
                label="Leave a Google review"
                className="text-body-sm text-foreground/90 hover:text-primary no-underline hover:underline py-2.5 md:py-1.5"
              />
            </FooterGroup>
          </div>

          {/* Column 4 — Primary markets */}
          <div>
            <FooterGroup title="Primary Markets" label="Primary markets">
              {tier1Areas.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </FooterGroup>
            <FooterGroup title="Also Serving" label="Additional service areas" className="md:mt-8" navClassName="flex-wrap gap-x-3 gap-y-1">
              {tier2Areas.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-body-xs font-body text-muted-foreground hover:text-primary transition-colors py-2.5 md:py-1"
                >
                  {l.label}
                </Link>
              ))}
            </FooterGroup>
            <Link
              to="/service-areas"
              className="mt-5 min-h-[44px] text-body-xs font-body font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5"
            >
              View All Service Areas <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Credentials row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-12 border-t border-border">
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <img loading="lazy" decoding="async" src={veluxLogo} alt="VELUX Certified Installer" width={1181} height={393} className="h-5 w-auto flex-shrink-0" />
              <span className="text-body-xs font-bold uppercase tracking-wider text-foreground ml-2">VELUX Certified</span>
            </div>
            <span className="text-caption text-muted-foreground font-body leading-tight">Certified skylight installer</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <img loading="lazy" decoding="async" src={certainteedPremierBadge} alt="CertainTeed ShingleMaster Premier Credentialed" width={560} height={531} className="h-14 w-auto" />
              <span className="text-body-xs font-bold uppercase tracking-wider text-foreground/90 ml-2">Premier</span>
            </div>
            <span className="text-caption text-muted-foreground font-body leading-tight">CertainTeed ShingleMaster Premier Credentialed</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="w-9 h-9 flex items-center justify-center bg-primary/10 rounded-full">
                <Award className="w-4 h-4 text-primary" aria-hidden="true" />
              </div>
              <span className="text-body-xs font-bold uppercase tracking-wider text-foreground/90 ml-2">Licensed &amp; Insured</span>
            </div>
            <span className="text-caption text-muted-foreground font-body leading-tight">NC Licensed General Contractor</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="w-9 h-9 flex items-center justify-center bg-primary/10 rounded-full">
                <BadgeCheck className="w-4 h-4 text-primary" aria-hidden="true" />
              </div>
              <span className="text-body-xs font-bold uppercase tracking-wider text-foreground/90 ml-2">Military Friendly</span>
            </div>
            <span className="text-caption text-muted-foreground font-body leading-tight">Supporting veterans &amp; active duty</span>
          </div>
        </div>
      </div>

      {/* Sitewide verifiable trust strip */}
      <VerifiableTrustStrip />

      {/* Trust strip — legal identity, licensing, showrooms */}
      <div className="border-t border-border">
        <div className="container-tight py-6">
          <LocationCards className="mb-4" />
          <p className="text-body-xs text-muted-foreground font-body leading-relaxed tracking-wide text-center md:text-left">
            {/* The ONE deliberate former-name mention on the site (P2.5; 7 Sep 2026 work order rule 1). Never emitted as metadata. */}
            {BUSINESS.legalName} (formerly Highlander Roofing Services) ·{" "}
            <a
              href={BUSINESS.licenseLookupUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="hover:text-foreground transition-colors underline underline-offset-2"
            >
              {BUSINESS.licenseNumber}
            </a>{" "}
            · Fully insured · Est. {BUSINESS.foundingYear} ·{" "}
            <a href={PHONE_TEL} className="inline-flex items-center min-h-[44px] md:min-h-0 hover:text-foreground transition-colors">{PHONE_DISPLAY}</a>
          </p>
        </div>
      </div>

      {/* Bottom bar — license + legal */}
      <div className="border-t border-border relative">
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none" 
          style={{ 
            backgroundImage: "url('/tartan.png')",
            backgroundSize: "120px auto",
            backgroundRepeat: "repeat"
          }} 
        />
        <div className="container-tight py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-col md:flex-row items-center gap-x-4 gap-y-1 text-body-xs text-muted-foreground font-body tracking-wide">
            <span>© {new Date().getFullYear()} {BUSINESS.brandName}.</span>
            <span className="hidden md:inline text-border">·</span>
            <span>{BUSINESS.licenseNumber}</span>
            <span className="hidden md:inline text-border">·</span>
            <span>Fully Insured</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="text-body-xs text-muted-foreground hover:text-muted-foreground font-body tracking-wide transition-colors">Privacy Policy &amp; Terms</Link>
            <Link to="/accessibility" className="text-body-xs text-muted-foreground hover:text-muted-foreground font-body tracking-wide transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
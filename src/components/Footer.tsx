import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight, ArrowRight, Award, Clock, BadgeCheck } from "lucide-react";
import veluxLogo from "@/assets/logo-velux.png";
import badgeCertainteedMaster from "@/assets/badge-certainteed-master.png";
import { motion } from "framer-motion";
import logo from "@/assets/logo.svg";
import SocialLinks from "@/components/SocialLinks";
import { towns } from "@/data/towns";

const roofingLinks = [
  { label: "Residential Roofing", href: "/roofing/residential" },
  { label: "Roof Replacement", href: "/roofing/roof-replacement" },
  { label: "Roof Repair", href: "/roofing/roof-repair" },
  { label: "Metal Roofing", href: "/roofing/metal" },
  { label: "Brava / Synthetic", href: "/roofing/brava-synthetic" },
  { label: "Specialty Roofing", href: "/roofing/specialty" },
  { label: "Seamless Gutters", href: "/roofing/gutters" },
  { label: "Skylights", href: "/roofing/skylights" },
  { label: "Storm Damage", href: "/roofing/storm-damage" },
  { label: "Commercial Roofing", href: "/roofing/commercial" },
  { label: "Build Your Roof", href: "/roofing-builder" },
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
  { label: "Our Team", href: "/team" },
  { label: "Community", href: "/giving-back" },
  { label: "Work With Us", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];


// Tier 1 — primary authority markets (premium residential focus)
const tier1Areas = [
  { label: "Highlands", href: "/service-areas/highlands-nc" },
  { label: "Cashiers", href: "/service-areas/cashiers-nc" },
  { label: "Asheville", href: "/service-areas/asheville-nc" },
  { label: "Hendersonville", href: "/service-areas/hendersonville-nc" },
  { label: "Franklin", href: "/service-areas/franklin-nc" },
  { label: "Sylva", href: "/service-areas/sylva-nc" },
];

// Tier 2 — every remaining town we serve, generated from the town data so the
// footer link map stays complete for crawlers as new markets are added.
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
    className="group text-body-sm text-foreground/90 hover:text-primary transition-colors inline-flex items-center gap-1.5 font-body leading-relaxed py-1.5 font-medium"
  >
    {children}
    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
  </Link>
));
FooterLink.displayName = "FooterLink";

const Footer = () => {
  return (
    <footer className="bg-white text-foreground relative overflow-hidden border-t border-border">
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
                to="/consultation"
                className="btn btn-primary btn-md group relative whitespace-nowrap"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Get My Written Estimate</span>
                <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a
                href="tel:+18285247773"
                className="btn btn-secondary btn-md whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
                (828) 524-7773
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
                  <span className="block font-bold text-foreground">Highlander Building Services, Inc.</span>
                  76 Creative Dr<br />
                  Franklin, NC 28734
                </div>
              </div>
              <a
                href="tel:+18285247773"
                className="flex items-center gap-3 min-h-[44px] font-heading font-bold text-body-lg text-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" aria-hidden="true" /> (828) 524-7773
              </a>
              <a
                href="mailto:info@highlandernc.com"
                className="flex items-center gap-3 min-h-[44px] text-body-sm font-body text-muted-foreground hover:text-primary transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" /> info@highlandernc.com
              </a>
              <div className="flex gap-3 pt-4 border-t border-border">
                <Clock className="w-4 h-4 text-primary/80 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-body-sm text-muted-foreground font-body leading-relaxed">
                  <span className="block font-bold text-foreground/85">Office Hours</span>
                  Mon–Fri 8:00 AM – 5:00 PM<br />
                  Sat–Sun: by appointment
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
            <h4 className="eyebrow text-primary mb-4">Roofing</h4>
            <nav aria-label="Roofing links" className="flex flex-col gap-1">
              {roofingLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>

            <h4 className="eyebrow text-primary mt-8 mb-4">Construction</h4>
            <nav aria-label="Construction links" className="flex flex-col gap-1">
              {constructionLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>
          </div>

          {/* Column 3 — Company & Resources */}
          <div>
            <h4 className="eyebrow text-primary mb-4">Company</h4>
            <nav aria-label="Company links" className="flex flex-col gap-1">
              {companyLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>

            <h4 className="eyebrow text-primary mt-8 mb-4">Resources</h4>
            <nav aria-label="Resources links" className="flex flex-col gap-1">
              {resourceLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>
          </div>

          {/* Column 4 — Primary markets */}
          <div>
            <h4 className="eyebrow text-primary mb-4">Primary Markets</h4>
            <nav aria-label="Primary markets" className="flex flex-col gap-1">
              {tier1Areas.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>

            <h4 className="eyebrow text-primary mt-8 mb-3">Also Serving</h4>
            <nav aria-label="Additional service areas" className="flex flex-wrap gap-x-3 gap-y-1">
              {tier2Areas.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-body-xs font-body text-muted-foreground hover:text-primary transition-colors py-1"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
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
              <div className="w-10 h-10 flex items-center justify-center overflow-hidden flex-shrink-0 bg-white rounded-sm border border-border">
                <img loading="lazy" decoding="async" src={veluxLogo} alt="VELUX Certified Installer" width={40} height={40} className="w-full h-full object-contain p-1" />
              </div>
              <span className="text-body-xs font-bold uppercase tracking-wider text-foreground ml-2">VELUX Certified</span>
            </div>
            <span className="text-caption text-muted-foreground font-body leading-tight">Master Installer &amp; Pro Accredited</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <img loading="lazy" decoding="async" src={badgeCertainteedMaster} alt="CertainTeed ShingleMaster Credentialed Contractor" width={120} height={36} className="h-9 w-auto" />
              <span className="text-body-xs font-bold uppercase tracking-wider text-foreground/90 ml-2">ShingleMaster</span>
            </div>
            <span className="text-caption text-muted-foreground font-body leading-tight">CertainTeed Credentialed Contractor</span>
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
            <span>© {new Date().getFullYear()} Highlander Building Services.</span>
            <span className="hidden md:inline text-border">·</span>
            <span>NC General Contractor License #87234</span>
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
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const roofingLinks = [
  { label: "Roof Repair", href: "/services/roof-repair" },
  { label: "Roof Replacement", href: "/services/roof-replacement" },
  { label: "Storm Damage", href: "/services/storm-damage" },
  { label: "Metal Roofing", href: "/services/metal-roofing" },
  { label: "Commercial Roofing", href: "/commercial-roofing" },
];

const constructionLinks = [
  { label: "Gutter Services", href: "/gutters" },
  { label: "Outdoor Living", href: "/outdoor-living" },
  { label: "Construction Services", href: "/construction-services" },
  { label: "Maintenance Programs", href: "/commercial-maintenance" },
];

const areaLinks = [
  { label: "Highlands, NC", href: "/service-areas/highlands-nc" },
  { label: "Cashiers, NC", href: "/service-areas/cashiers-nc" },
  { label: "Franklin, NC", href: "/service-areas/franklin-nc" },
  { label: "Sylva, NC", href: "/service-areas/sylva-nc" },
  { label: "Bryson City, NC", href: "/service-areas/bryson-city-nc" },
  { label: "Waynesville, NC", href: "/service-areas/waynesville-nc" },
];

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="group text-sm text-primary-foreground/50 hover:text-[hsl(var(--highland-gold))] transition-colors inline-flex items-center gap-1 font-body"
  >
    {children}
    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
  </Link>
);

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden tartan-dark">
      {/* Top gold line */}
      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))' }} />

      <div className="container-tight section-padding pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-heading font-bold mb-0.5 tracking-wide">HIGHLANDER</h3>
            <p className="text-[hsl(var(--highland-gold))] text-[10px] font-body font-semibold uppercase tracking-[0.2em] mb-5">Roofing & Construction</p>
            <p className="text-primary-foreground/50 text-sm leading-relaxed mb-6 max-w-sm font-body">
              Family-owned. Locally operated since 2017. Licensed General Contractor serving Western North Carolina with precision craftsmanship and lasting results.
            </p>
            <div className="flex flex-col gap-3">
              <a href="tel:8283979211" className="flex items-center gap-2.5 text-sm hover:text-[hsl(var(--highland-gold))] transition-colors font-body">
                <Phone className="w-3.5 h-3.5 text-[hsl(var(--highland-gold))]" /> (828) 397-9211
              </a>
              <a href="mailto:info@highlandernc.com" className="flex items-center gap-2.5 text-sm hover:text-[hsl(var(--highland-gold))] transition-colors font-body">
                <Mail className="w-3.5 h-3.5 text-[hsl(var(--highland-gold))]" /> info@highlandernc.com
              </a>
              <div className="flex items-center gap-2.5 text-sm text-primary-foreground/40 font-body">
                <MapPin className="w-3.5 h-3.5" /> Franklin & Sylva, NC
              </div>
            </div>
          </div>

          {/* Roofing */}
          <div>
            <h4 className="eyebrow text-[hsl(var(--highland-gold))] mb-4">Roofing</h4>
            <nav className="flex flex-col gap-2.5">
              {roofingLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>
          </div>

          {/* Construction + Company */}
          <div>
            <h4 className="eyebrow text-[hsl(var(--highland-gold))] mb-4">Construction</h4>
            <nav className="flex flex-col gap-2.5">
              {constructionLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>
            <h4 className="eyebrow text-[hsl(var(--highland-gold))] mt-6 mb-4">Company</h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: "About", href: "/about" },
                { label: "Gallery", href: "/gallery" },
                { label: "Financing", href: "/financing" },
                { label: "Careers", href: "/careers" },
              ].map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="eyebrow text-[hsl(var(--highland-gold))] mb-4">Service Areas</h4>
            <nav className="flex flex-col gap-2.5">
              {areaLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/8 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-primary-foreground/35 font-body tracking-wide">
            © {new Date().getFullYear()} Highlander Roofing & Construction. All rights reserved.
          </p>
          <p className="text-[11px] text-primary-foreground/35 font-body tracking-wide">
            Licensed General Contractor · CertainTeed Master Shingle Applicator · Franklin & Sylva, NC
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
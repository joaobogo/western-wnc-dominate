import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight, ArrowRight, Shield, Award, Clock } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const roofingLinks = [
  { label: "Asphalt Shingles", href: "/services/asphalt-shingles" },
  { label: "Metal Roofing", href: "/services/metal-roofing" },
  { label: "Cedar Shake", href: "/services/cedar-shake" },
  { label: "Flat & Low-Slope", href: "/services/flat-roofing" },
  { label: "Roof Repair", href: "/services/roof-repair" },
  { label: "Storm Damage & Insurance", href: "/services/storm-damage" },
  { label: "Gutter Systems", href: "/services/gutters" },
];

const constructionLinks = [
  { label: "Home Additions", href: "/construction/additions" },
  { label: "Renovations", href: "/construction/renovations" },
  { label: "Siding & Exteriors", href: "/construction/exterior" },
  { label: "Outdoor Living", href: "/construction/outdoor-living" },
  { label: "Custom Projects", href: "/construction/custom" },
  { label: "Construction Division", href: "/construction" },
  { label: "Construction Consultation", href: "/construction/consultation" },
];

const resourceLinks = [
  { label: "Blog & Insights", href: "/blog" },
  { label: "Storm Damage Guide", href: "/blog" },
  { label: "Virtual Roof Designer", href: "/roof-designer" },
  { label: "Financing Options", href: "/financing" },
  { label: "Planning Tools", href: "/free-tools" },
];

const companyLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Our Process", href: "/about" },
  { label: "Project Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Request a Consultation", href: "/consultation" },
];

const areaLinks = [
  { label: "Highlands", href: "/service-areas/highlands-nc" },
  { label: "Cashiers", href: "/service-areas/cashiers-nc" },
  { label: "Franklin", href: "/service-areas/franklin-nc" },
  { label: "Sylva", href: "/service-areas/sylva-nc" },
  { label: "Bryson City", href: "/service-areas/bryson-city-nc" },
  { label: "Waynesville", href: "/service-areas/waynesville-nc" },
  { label: "Cullowhee", href: "/service-areas/cullowhee-nc" },
  { label: "Dillsboro", href: "/service-areas/dillsboro-nc" },
];

const certifications = [
  { icon: Award, label: "CertainTeed Master Shingle Applicator" },
  { icon: Shield, label: "Licensed General Contractor" },
  { icon: Shield, label: "Licensed & Fully Insured" },
  { icon: Clock, label: "24-Hour Emergency Response" },
];

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="group text-[13px] text-primary-foreground/45 hover:text-[hsl(var(--highland-gold))] transition-colors inline-flex items-center gap-1 font-body leading-relaxed"
  >
    {children}
    <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
  </Link>
);

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden tartan-dark">
      {/* Top gold line */}
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))' }} />

      {/* CTA Strip */}
      <div className="border-b border-primary-foreground/8 relative">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[hsl(var(--highland-gold)/0.03)] rounded-full blur-[100px] pointer-events-none" />
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
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-10 h-[2px] bg-[hsl(var(--highland-gold)/0.4)] mb-5 origin-left"
              />
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 tracking-tight">
                Let's Discuss Your Property.
              </h3>
              <p className="text-primary-foreground/50 text-[15px] font-body max-w-md leading-relaxed">
                Whether it's a roof, an addition, a renovation, or storm damage — you'll speak with a project advisor who knows these mountains, not a call center.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/consultation"
                className="group cta-gradient text-accent-foreground font-semibold text-sm px-7 py-3.5 rounded-none inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden whitespace-nowrap"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Discuss Your Project</span>
                <ArrowRight className="w-3.5 h-3.5 relative group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="tel:8283979211"
                className="bg-primary-foreground/8 border border-primary-foreground/15 text-primary-foreground font-medium text-sm px-7 py-3.5 rounded-none inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/12 transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                (828) 397-9211
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container-tight py-14 md:py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
          {/* Brand column — spans 2 on lg */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="Highlander" className="h-10 w-auto" />
              <div>
                <h3 className="text-lg font-heading font-bold tracking-wide leading-none">HIGHLANDER</h3>
                <p className="text-[hsl(var(--highland-gold))] text-[9px] font-body font-semibold uppercase tracking-[0.2em] mt-0.5">Roofing & Construction</p>
              </div>
            </div>
            <p className="text-primary-foreground/40 text-sm leading-relaxed mb-6 max-w-xs font-body">
              Family-owned. Licensed General Contractor. CertainTeed Master Applicator. 
              Protecting Western North Carolina properties with mountain-grade craftsmanship 
              and verifiable warranty documentation since 2017.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-2.5 mb-8">
              <a href="tel:8283979211" className="flex items-center gap-2.5 text-sm hover:text-[hsl(var(--highland-gold))] transition-colors font-body text-primary-foreground/60">
                <Phone className="w-3.5 h-3.5 text-[hsl(var(--highland-gold))]" /> (828) 397-9211
              </a>
              <a href="mailto:info@highlandernc.com" className="flex items-center gap-2.5 text-sm hover:text-[hsl(var(--highland-gold))] transition-colors font-body text-primary-foreground/60">
                <Mail className="w-3.5 h-3.5 text-[hsl(var(--highland-gold))]" /> info@highlandernc.com
              </a>
              <div className="flex items-center gap-2.5 text-sm text-primary-foreground/35 font-body">
                <MapPin className="w-3.5 h-3.5 text-primary-foreground/25" /> Franklin & Sylva, NC
              </div>
            </div>

            {/* Certifications */}
            <div className="flex flex-col gap-2">
              {certifications.map((cert) => (
                <div key={cert.label} className="flex items-center gap-2 text-primary-foreground/35 text-xs font-body">
                  <cert.icon className="w-3 h-3 text-[hsl(var(--highland-gold)/0.6)]" />
                  {cert.label}
                </div>
              ))}
            </div>
          </div>

          {/* Roofing */}
          <div>
            <h4 className="eyebrow text-[hsl(var(--highland-gold))] mb-4">Roofing</h4>
            <nav className="flex flex-col gap-2">
              {roofingLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>
          </div>

          {/* Construction */}
          <div>
            <h4 className="eyebrow text-[hsl(var(--highland-gold))] mb-4">Construction</h4>
            <nav className="flex flex-col gap-2">
              {constructionLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="eyebrow text-[hsl(var(--highland-gold))] mb-4">Resources</h4>
            <nav className="flex flex-col gap-2">
              {resourceLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>

            <h4 className="eyebrow text-[hsl(var(--highland-gold))] mt-6 mb-4">Company</h4>
            <nav className="flex flex-col gap-2">
              {companyLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="eyebrow text-[hsl(var(--highland-gold))] mb-4">Service Areas</h4>
            <nav className="flex flex-col gap-2">
              {areaLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>
            <Link
              to="/service-areas"
              className="mt-3 text-xs font-body font-medium text-[hsl(var(--highland-gold))] hover:text-[hsl(var(--highland-gold)/0.8)] transition-colors inline-flex items-center gap-1"
            >
              View All Areas <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/6">
        <div className="container-tight py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-primary-foreground/30 font-body tracking-wide">
            © {new Date().getFullYear()} Highlander Roofing & Construction. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-[11px] text-primary-foreground/30 hover:text-primary-foreground/50 font-body tracking-wide transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[11px] text-primary-foreground/30 hover:text-primary-foreground/50 font-body tracking-wide transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

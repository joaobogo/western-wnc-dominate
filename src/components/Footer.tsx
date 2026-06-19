import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight, ArrowRight, Shield, Award, Clock, BadgeCheck, Star } from "lucide-react";
import veluxLogo from "@/assets/logo-velux.png";
import badgeCertainteedMaster from "@/assets/badge-certainteed-master.png";
import badgeHaag from "@/assets/badge-haag.png";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const roofingLinks = [
  { label: "Roof Replacement", href: "/roofing/roof-replacement" },
  { label: "Roof Repair", href: "/roofing/roof-repair" },
  { label: "Metal Roofing", href: "/roofing/metal" },
  { label: "Brava / Synthetic", href: "/roofing/brava-synthetic" },
  { label: "Storm Damage", href: "/roofing/storm-damage" },
  { label: "Commercial Roofing", href: "/roofing/commercial" },
  { label: "Build Your Roof", href: "/roofing-builder" },
];

const constructionLinks = [
  { label: "Construction Division", href: "/construction" },
  { label: "Home Additions", href: "/construction/additions" },
  { label: "Outdoor Living", href: "/construction/outdoor-living" },
  { label: "Design", href: "/layouts-planning" },
  { label: "Request a Quote", href: "/consultation" },
  { label: "Build Your Project", href: "/construction-builder" },
];

const resourceLinks = [
  { label: "Recent Projects", href: "/recent-projects" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Financing", href: "/financing" },
  { label: "Certifications", href: "/certifications" },
];

const companyLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Community", href: "/giving-back" },
  { label: "Work With Us", href: "/careers" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Contact Us", href: "/contact" },
  { label: "Request Inspection", href: "/request-inspection" },
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

// Tier 2 — extended WNC coverage
const tier2Areas = [
  { label: "Brevard", href: "/service-areas/brevard-nc" },
  { label: "Waynesville", href: "/service-areas/waynesville-nc" },
  { label: "Bryson City", href: "/service-areas/bryson-city-nc" },
  { label: "Murphy", href: "/service-areas/murphy-nc" },
  { label: "Hayesville", href: "/service-areas/hayesville-nc" },
];

const certifications = [
  { icon: Award, label: "CertainTeed ShingleMaster Credentialed Contractor" },
  { icon: Shield, label: "VELUX Certified Installer" },
  { icon: Shield, label: "Licensed & Fully Insured" },
  { icon: Clock, label: "Rapid Emergency Response" },
];

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="group text-[17px] text-foreground/90 hover:text-primary transition-colors inline-flex items-center gap-1.5 font-body leading-relaxed py-1.5 font-medium"
  >
    {children}
    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
  </Link>
);

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
      <div className="border-b border-border relative">
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
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-10 h-[2px] bg-primary/40 mb-5 origin-left"
              />
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 tracking-tight text-foreground">
                Plan Before You Build.
              </h3>
              <p className="text-muted-foreground text-lg md:text-xl font-body max-w-md leading-relaxed font-medium">
                Roof, addition, or storm damage — supported by expert Design. One local team, one named contact.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/consultation"
                className="group cta-gradient text-accent-foreground font-bold text-[14px] px-10 py-4 rounded-none inline-flex items-center justify-center gap-3 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden whitespace-nowrap uppercase tracking-[0.1em] shadow-lg min-h-[56px]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Request a Quote</span>
                <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+18285247773"
                className="bg-secondary border-2 border-border text-foreground font-bold text-[14px] px-10 py-4 rounded-none inline-flex items-center justify-center gap-3 hover:bg-secondary/80 hover:border-primary/30 transition-all duration-300 whitespace-nowrap min-h-[56px] tracking-wide"
              >
                <Phone className="w-4 h-4 text-primary" />
                (828) 524-7773
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
            <Link to="/" className="inline-flex items-center gap-4 mb-8 group/footer-logo">
              <div className="relative">
                <img 
                  src={logo} 
                  alt="Highlander Roofing &amp; Construction logo" 
                  className="h-[100px] md:h-[120px] w-auto transition-all duration-500 group-hover:scale-105" 
                  loading="lazy" 
                  decoding="async" 
                />
              </div>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-xs font-body">
              Premium roofing and construction across Western NC. 
              Serving 10+ primary counties with localized crews and team-led quality since 2017.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="space-y-3">
                <a href="tel:+18285247773" className="flex items-center gap-3 text-lg hover:text-primary transition-colors font-heading font-bold text-foreground">
                  <Phone className="w-4 h-4 text-primary" /> (828) 524-7773
                </a>
                <a href="mailto:info@highlandernc.com" className="flex items-center gap-3 text-base hover:text-primary transition-colors font-body text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" /> info@highlandernc.com
                </a>
              </div>

              <div className="space-y-4 pt-2 border-t border-border">
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-primary/60 flex-shrink-0 mt-0.5" />
                  <div className="text-[16px] text-foreground/80 font-body leading-relaxed">
                    <span className="block font-bold text-foreground mb-0.5 text-[17px]">Franklin Office</span>
                    1511 Highlands Road<br />
                    Franklin, NC 28734
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-primary/60 flex-shrink-0 mt-0.5" />
                  <div className="text-[15px] text-muted-foreground leading-relaxed">
                    <span className="block font-bold text-foreground/80 mb-0.5 text-base">Sylva / Waynesville</span>
                    Service area office — by appointment<br />
                    Sylva, NC 28779
                  </div>
                </div>
                <div className="flex gap-3 pt-2 border-t border-border/60">
                  <Clock className="w-4 h-4 text-primary/60 flex-shrink-0 mt-0.5" />
                  <div className="text-[15px] text-muted-foreground leading-relaxed">
                    <span className="block font-bold text-foreground/80 mb-0.5 text-base">Office Hours</span>
                    Mon–Fri 8:00 AM – 5:00 PM<br />
                    <span className="text-primary font-semibold">Emergency response available 24/7</span>
                  </div>
                </div>
              </div>
            </div>


            {/* Certifications & Authority */}
            <div className="grid grid-cols-2 gap-3 pt-8 mt-8 border-t border-border">
              <div className="flex flex-col gap-2 group/cert">
                <div className="h-10 w-auto flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center overflow-hidden flex-shrink-0 bg-white rounded-sm border border-border">
                    <img src={veluxLogo} alt="VELUX" className="w-full h-full object-contain p-1" />
                  </div>
                  <span className="text-[13px] font-bold uppercase tracking-wider text-foreground ml-2">VELUX Certified</span>
                </div>
                <span className="text-[12px] text-muted-foreground font-body leading-tight">Master Installer & Pro Accredited</span>
              </div>
              
              <div className="flex flex-col gap-2 group/cert">
                <div className="h-10 w-auto flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full">
                    <Award className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-foreground/90 ml-2">Licensed & Insured</span>
                </div>
                <span className="text-[11px] text-muted-foreground font-body leading-tight">NC Licensed General Contractor</span>
              </div>

              <div className="flex flex-col gap-2 group/cert">
                <div className="h-10 w-auto flex items-center">
                  <img src={badgeHaag} alt="HAAG Certified" className="h-8 w-auto" />
                  <span className="text-[12px] font-bold uppercase tracking-wider text-foreground/90 ml-2">HAAG Certified</span>
                </div>
                <span className="text-[11px] text-muted-foreground font-body leading-tight">Expert Storm Damage Assessment</span>
              </div>

              <div className="flex flex-col gap-2 group/cert">
                <div className="h-10 w-auto flex items-center">
                  <img src={badgeCertainteedMaster} alt="CertainTeed ShingleMaster Credentialed Contractor" className="h-8 w-auto" />
                  <span className="text-[12px] font-bold uppercase tracking-wider text-foreground/90 ml-2">ShingleMaster</span>
                </div>
                <span className="text-[11px] text-muted-foreground font-body leading-tight">CertainTeed Credentialed Contractor</span>
              </div>

              <div className="flex flex-col gap-2 group/cert">
                <div className="h-10 w-auto flex items-center">
                  <Star className="w-5 h-5 text-primary" />
                  <span className="text-[12px] font-bold uppercase tracking-wider text-foreground/90 ml-2">4.9★ Rated</span>
                </div>
                <span className="text-[11px] text-muted-foreground font-body leading-tight">Highest Rated in Franklin & Highlands</span>
              </div>

              <div className="flex flex-col gap-2 group/cert">
                <div className="h-10 w-auto flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full">
                    <Award className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-foreground/90 ml-2">Military Friendly</span>
                </div>
                <span className="text-[11px] text-muted-foreground font-body leading-tight">Proudly supporting our veterans & active duty</span>
              </div>
            </div>
          </div>

          {/* Roofing */}
          <div>
            <h4 className="eyebrow text-primary mb-4">Roofing</h4>
            <nav className="flex flex-col gap-2">
              {roofingLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>
          </div>

          {/* Construction */}
          <div>
            <h4 className="eyebrow text-primary mb-4">Construction</h4>
            <nav className="flex flex-col gap-2">
              {constructionLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="eyebrow text-primary mb-4">Resources</h4>
            <nav className="flex flex-col gap-2">
              {resourceLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>

            <h4 className="eyebrow text-primary mt-6 mb-4">Company</h4>
            <nav className="flex flex-col gap-2">
              {companyLinks.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>
          </div>

          {/* Service Areas — tiered */}
          <div>
            <h4 className="eyebrow text-primary mb-4">Primary Markets</h4>
            <nav className="flex flex-col gap-2">
              {tier1Areas.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="group text-[18px] font-bold text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 font-body leading-relaxed py-1.5"
                >
                  {l.label}
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              ))}
            </nav>

            <h4 className="eyebrow text-primary mt-6 mb-3">Also Serving</h4>
            <nav className="flex flex-col gap-1.5">
              {tier2Areas.map((l) => <FooterLink key={l.href} to={l.href}>{l.label}</FooterLink>)}
            </nav>
            <Link
              to="/service-areas"
              className="mt-4 text-xs font-body font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
            >
              View All Areas <ArrowRight className="w-3 h-3" />
            </Link>
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
          <div className="flex flex-col md:flex-row items-center gap-x-4 gap-y-1 text-[13px] text-muted-foreground font-body tracking-wide">
            <span>© {new Date().getFullYear()} Highlander Roofing & Construction.</span>
            <span className="hidden md:inline text-border">·</span>
            <span>NC General Contractor License #87234</span>
            <span className="hidden md:inline text-border">·</span>
            <span>Fully Insured</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="text-[13px] text-muted-foreground/60 hover:text-muted-foreground font-body tracking-wide transition-colors">Privacy Policy &amp; Terms</Link>
            <Link to="/accessibility" className="text-[13px] text-muted-foreground/60 hover:text-muted-foreground font-body tracking-wide transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as const } },
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="group text-sm text-primary-foreground/60 hover:text-accent transition-colors inline-flex items-center gap-1"
  >
    {children}
    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
  </Link>
);

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden tartan-accent">
      <div className="container-tight section-padding pb-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-xl font-heading font-bold mb-1 tracking-wide">
              HIGHLANDER
            </h3>
            <p className="text-accent text-xs font-semibold uppercase tracking-[0.15em] mb-4">Roofing & Construction</p>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6 max-w-sm">
              Family-owned. Locally operated since 2017. Licensed General Contractor serving Western North Carolina with precision craftsmanship and lasting results.
            </p>
            <div className="flex flex-col gap-3">
              <a href="tel:8283979211" className="flex items-center gap-2 text-sm hover:text-accent transition-colors">
                <Phone className="w-4 h-4 text-accent" /> (828) 397-9211
              </a>
              <a href="mailto:info@highlandernc.com" className="flex items-center gap-2 text-sm hover:text-accent transition-colors">
                <Mail className="w-4 h-4 text-accent" /> info@highlandernc.com
              </a>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/50">
                <MapPin className="w-4 h-4" /> Franklin & Sylva, NC
              </div>
            </div>
          </motion.div>

          {/* Roofing */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider text-accent">Roofing</h4>
            <nav className="flex flex-col gap-2.5">
              {roofingLinks.map((link) => (
                <FooterLink key={link.href} to={link.href}>{link.label}</FooterLink>
              ))}
            </nav>
          </motion.div>

          {/* Construction */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider text-accent">Construction</h4>
            <nav className="flex flex-col gap-2.5">
              {constructionLinks.map((link) => (
                <FooterLink key={link.href} to={link.href}>{link.label}</FooterLink>
              ))}
            </nav>
            <h4 className="font-heading font-semibold text-sm mt-6 mb-4 uppercase tracking-wider text-accent">Company</h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: "About", href: "/about" },
                { label: "Gallery", href: "/gallery" },
                { label: "Financing", href: "/financing" },
                { label: "Careers", href: "/careers" },
              ].map((link) => (
                <FooterLink key={link.href} to={link.href}>{link.label}</FooterLink>
              ))}
            </nav>
          </motion.div>

          {/* Service Areas */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider text-accent">Service Areas</h4>
            <nav className="flex flex-col gap-2.5">
              {areaLinks.map((link) => (
                <FooterLink key={link.href} to={link.href}>{link.label}</FooterLink>
              ))}
            </nav>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Highlander Roofing & Construction. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/40">
            Licensed General Contractor · CertainTeed Master Shingle Applicator · Franklin & Sylva, NC
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
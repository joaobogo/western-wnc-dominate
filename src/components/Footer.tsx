import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const serviceLinks = [
  { label: "Roof Repair", href: "/services/roof-repair" },
  { label: "Roof Replacement", href: "/services/roof-replacement" },
  { label: "Storm Damage", href: "/services/storm-damage" },
  { label: "Metal Roofing", href: "/services/metal-roofing" },
  { label: "Commercial Roofing", href: "/commercial-roofing" },
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

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Subtle animated gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-foreground/5 via-transparent to-accent/5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-tight section-padding pb-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8"
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-2xl font-heading font-bold mb-4"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              HIGHLANDER
            </motion.h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Family-owned roofing company serving Western North Carolina since 2017. Licensed, insured, and committed to protecting mountain homes.
            </p>
            <div className="flex flex-col gap-3">
              <motion.a
                href="tel:8283979211"
                className="flex items-center gap-2 text-sm hover:text-accent transition-colors group"
                whileHover={{ x: 4 }}
              >
                <Phone className="w-4 h-4 group-hover:animate-[wiggle_0.5s_ease-in-out]" /> (828) 397-9211
              </motion.a>
              <motion.a
                href="mailto:info@highlandernc.com"
                className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
                whileHover={{ x: 4 }}
              >
                <Mail className="w-4 h-4" /> info@highlandernc.com
              </motion.a>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4" /> Franklin & Sylva, NC
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading font-semibold text-base mb-4">Services</h4>
            <nav className="flex flex-col gap-2">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1"
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Service Areas */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading font-semibold text-base mb-4">Service Areas</h4>
            <nav className="flex flex-col gap-2">
              {areaLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1"
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading font-semibold text-base mb-4">Company</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Gallery", href: "/gallery" },
                { label: "Financing", href: "/financing" },
                { label: "Careers", href: "/careers" },
                { label: "Request Inspection", href: "/request-inspection" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1"
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                </Link>
              ))}
            </nav>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 origin-left"
        >
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Highlander Roofing Services. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/50">
            Licensed General Contractor • Franklin & Sylva, NC
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

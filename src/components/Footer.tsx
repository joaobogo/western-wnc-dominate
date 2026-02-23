import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

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

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-tight section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">HIGHLANDER</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Family-owned roofing company serving Western North Carolina since 2017. Licensed, insured, and committed to protecting mountain homes.
            </p>
            <div className="flex flex-col gap-3">
              <a href="tel:8283979211" className="flex items-center gap-2 text-sm hover:text-accent transition-colors">
                <Phone className="w-4 h-4" /> (828) 397-9211
              </a>
              <a href="mailto:info@highlandernc.com" className="flex items-center gap-2 text-sm hover:text-accent transition-colors">
                <Mail className="w-4 h-4" /> info@highlandernc.com
              </a>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4" /> Franklin & Sylva, NC
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-base mb-4">Services</h4>
            <nav className="flex flex-col gap-2">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-heading font-semibold text-base mb-4">Service Areas</h4>
            <nav className="flex flex-col gap-2">
              {areaLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-base mb-4">Company</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">About Us</Link>
              <Link to="/gallery" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Gallery</Link>
              <Link to="/financing" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Financing</Link>
              <Link to="/careers" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Careers</Link>
              <Link to="/request-inspection" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Request Inspection</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Highlander Roofing Services. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/50">
            Licensed General Contractor • Franklin & Sylva, NC
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

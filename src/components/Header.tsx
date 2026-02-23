import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.webp";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Commercial", href: "/commercial-roofing" },
  { label: "Free Tools", href: "/free-tools" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="hidden md:flex items-center justify-between px-8 py-2 bg-primary text-primary-foreground text-sm">
        <div className="flex items-center gap-6">
          <span>Franklin & Sylva, NC</span>
          <span>•</span>
          <span>4.7 ★ (122 Reviews)</span>
          <span>•</span>
          <span>Licensed & Insured</span>
        </div>
        <a href="tel:8283979211" className="flex items-center gap-2 font-semibold hover:opacity-90 transition-opacity">
          <Phone className="w-3.5 h-3.5" />
          (828) 397-9211
        </a>
      </div>

      {/* Main nav */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Highlander Roofing Services" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="relative text-sm font-medium text-foreground/80 hover:text-primary transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:8283979211"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4" />
          </a>
          <Link
            to="/request-inspection"
            className="hidden sm:inline-flex cta-gradient text-accent-foreground font-semibold text-sm px-5 py-2.5 rounded-md hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
          >
            Request Inspection
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 active:scale-90 transition-transform"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-card border-t border-border overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 px-3 text-base font-medium text-foreground hover:bg-muted rounded-md transition-colors block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Link
                  to="/request-inspection"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 cta-gradient text-accent-foreground font-semibold text-center py-3 px-4 rounded-md block"
                >
                  Request Free Inspection
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

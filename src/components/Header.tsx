import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import logo from "@/assets/logo.webp";

const serviceDropdown = [
  { label: "Roof Repair", href: "/services/roof-repair" },
  { label: "Roof Replacement", href: "/services/roof-replacement" },
  { label: "Storm Damage", href: "/services/storm-damage" },
  { label: "Metal Roofing", href: "/services/metal-roofing" },
  { label: "Gutter Services", href: "/gutters" },
  { label: "Outdoor Living", href: "/outdoor-living" },
  { label: "Construction", href: "/construction-services" },
  { label: "Commercial Roofing", href: "/commercial-roofing" },
  { label: "Maintenance Programs", href: "/commercial-maintenance" },
];

const navLinks = [
  { label: "Services", href: "/services", dropdown: serviceDropdown },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Free Tools", href: "/free-tools" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 50);
    if (y > lastY && y > 200) setHidden(true);
    else setHidden(false);
    setLastY(y);
  });

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background backdrop-blur-xl shadow-lg border-b border-border"
          : "bg-background backdrop-blur-md border-b border-border"
      }`}
    >
      {/* Top bar */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:flex items-center justify-between px-8 py-2 bg-primary text-primary-foreground text-sm overflow-hidden"
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main nav */}
      <div className={`flex items-center justify-between px-4 md:px-8 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
        <Link to="/" className="flex items-center">
          <motion.img
            src={logo}
            alt="Highlander Roofing Services"
            className="w-auto"
            animate={{ height: scrolled ? 36 : 48 }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
              className="relative"
              onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={link.href}
                className="relative text-sm font-medium text-foreground/80 hover:text-primary transition-colors inline-flex items-center gap-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
                {link.dropdown && (
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`} />
                )}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {link.dropdown && openDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                  >
                    <div className="bg-card border border-border rounded-lg shadow-xl py-2 min-w-[220px] overflow-hidden">
                      {link.dropdown.map((item, j) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-muted/60 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-border mt-1 pt-1">
                        <Link
                          to={link.href}
                          className="block px-4 py-2.5 text-sm font-semibold text-primary hover:bg-muted/60 transition-colors"
                        >
                          View All Services →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
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
            className="hidden sm:inline-flex cta-gradient text-accent-foreground font-semibold text-sm px-5 py-2.5 rounded-md hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Request Inspection</span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 active:scale-90 transition-transform"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
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
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                        className="w-full py-3 px-3 text-base font-medium text-foreground hover:bg-muted rounded-md transition-colors flex items-center justify-between"
                      >
                        {link.label}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === link.label ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-2 space-y-1">
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.href}
                                  to={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="py-2 px-3 text-sm text-foreground/70 hover:text-primary hover:bg-muted rounded-md transition-colors block"
                                >
                                  {item.label}
                                </Link>
                              ))}
                              <Link
                                to={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="py-2 px-3 text-sm font-semibold text-primary hover:bg-muted rounded-md transition-colors block"
                              >
                                View All Services →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-3 px-3 text-base font-medium text-foreground hover:bg-muted rounded-md transition-colors block"
                    >
                      {link.label}
                    </Link>
                  )}
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
    </motion.header>
  );
};

export default Header;

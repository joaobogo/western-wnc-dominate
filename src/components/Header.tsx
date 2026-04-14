import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import logo from "@/assets/logo.webp";

const roofingDropdown = [
  { label: "Roof Repair", href: "/services/roof-repair" },
  { label: "Roof Replacement", href: "/services/roof-replacement" },
  { label: "Storm Damage", href: "/services/storm-damage" },
  { label: "Metal Roofing", href: "/services/metal-roofing" },
  { label: "Commercial Roofing", href: "/commercial-roofing" },
  { label: "Maintenance Programs", href: "/commercial-maintenance" },
];

const constructionDropdown = [
  { label: "Gutter Services", href: "/gutters" },
  { label: "Outdoor Living", href: "/outdoor-living" },
  { label: "Construction Services", href: "/construction-services" },
];

const navLinks = [
  { label: "Roofing", href: "/services", dropdown: roofingDropdown },
  { label: "Construction", href: "/construction-services", dropdown: constructionDropdown },
  { label: "Roof Designer", href: "/roof-designer" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
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
          ? "bg-background/98 backdrop-blur-xl shadow-[0_1px_12px_-4px_hsl(var(--heritage-charcoal)/0.08)] border-b border-border"
          : "bg-background border-b border-border/60"
      }`}
    >
      {/* Top heritage bar */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:flex items-center justify-between px-8 py-1.5 bg-primary text-primary-foreground text-xs overflow-hidden"
          >
            <div className="flex items-center gap-5">
              <span className="tracking-wide">Franklin & Sylva, NC</span>
              <span className="text-primary-foreground/25">|</span>
              <span className="tracking-wide">CertainTeed Master Shingle Applicator</span>
              <span className="text-primary-foreground/25">|</span>
              <span className="tracking-wide">Licensed General Contractor</span>
            </div>
            <a href="tel:8283979211" className="flex items-center gap-2 font-medium hover:text-accent transition-colors tracking-wide">
              <Phone className="w-3 h-3" />
              (828) 397-9211
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main nav */}
      <div className={`flex items-center justify-between px-5 md:px-8 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
        <Link to="/" className="flex items-center">
          <motion.img
            src={logo}
            alt="Highlander Roofing & Construction"
            className="w-auto"
            animate={{ height: scrolled ? 34 : 46 }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link, i) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={link.href}
                className="relative text-sm font-medium text-foreground/75 hover:text-foreground transition-colors inline-flex items-center gap-1 py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
                {link.dropdown && (
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`} />
                )}
              </Link>

              <AnimatePresence>
                {link.dropdown && openDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                  >
                    <div className="bg-card border border-border rounded-sm shadow-xl py-1.5 min-w-[220px]">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block px-5 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-border mt-1 pt-1">
                        <Link
                          to={link.href}
                          className="block px-5 py-2.5 text-sm font-medium text-accent hover:bg-secondary transition-colors"
                        >
                          View All {link.label} →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:8283979211"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-sm bg-primary text-primary-foreground active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4" />
          </a>
          <Link
            to="/request-inspection"
            className="hidden sm:inline-flex cta-gradient text-accent-foreground font-semibold text-sm px-5 py-2.5 rounded-sm hover:opacity-90 transition-all duration-200 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Request a Consultation</span>
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
            <nav className="flex flex-col px-5 py-5 gap-0.5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                        className="w-full py-3 px-3 text-base font-medium text-foreground hover:bg-secondary rounded-sm transition-colors flex items-center justify-between"
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
                            <div className="pl-5 pb-2 space-y-0.5">
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.href}
                                  to={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="py-2.5 px-3 text-sm text-foreground/65 hover:text-foreground hover:bg-secondary rounded-sm transition-colors block"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-3 px-3 text-base font-medium text-foreground hover:bg-secondary rounded-sm transition-colors block"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <div className="pt-4 mt-3 border-t border-border space-y-2.5">
                <Link
                  to="/request-inspection"
                  onClick={() => setMobileOpen(false)}
                  className="cta-gradient text-accent-foreground font-semibold text-center py-3.5 px-4 rounded-sm block"
                >
                  Request a Consultation
                </Link>
                <a
                  href="tel:8283979211"
                  className="bg-primary text-primary-foreground font-medium text-center py-3.5 px-4 rounded-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  (828) 397-9211
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
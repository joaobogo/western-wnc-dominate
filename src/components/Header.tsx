import { useState } from "react";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import logo from "@/assets/logo.webp";

const roofingDropdown = [
  { label: "Asphalt Shingles", href: "/services/asphalt-shingles" },
  { label: "Metal Roofing", href: "/services/metal-roofing" },
  { label: "Cedar Shake", href: "/services/cedar-shake" },
  { label: "Flat & Low-Slope", href: "/services/flat-roofing" },
  { label: "Roof Repair", href: "/services/roof-repair" },
  { label: "Storm Damage & Insurance", href: "/services/storm-damage" },
  { label: "Gutter Systems", href: "/services/gutters" },
];

const constructionDropdown = [
  { label: "Additions & Renovations", href: "/services/additions-renovations" },
  { label: "Decks & Outdoor Living", href: "/services/decks-outdoor-living" },
  { label: "Siding & Exteriors", href: "/services/siding-exteriors" },
  { label: "Windows & Doors", href: "/services/windows-doors" },
  { label: "Commercial Build-Outs", href: "/services/commercial-build-outs" },
];

const navLinks = [
  { label: "Roofing", href: "/services", dropdown: roofingDropdown },
  { label: "Construction", href: "/services", dropdown: constructionDropdown },
  { label: "Projects", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Contact", href: "/request-inspection" },
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
              <span className="tracking-wide font-body">Franklin & Sylva, NC</span>
              <span className="text-primary-foreground/25">|</span>
              <span className="tracking-wide font-body">CertainTeed Master Shingle Applicator</span>
              <span className="text-primary-foreground/25">|</span>
              <span className="tracking-wide font-body">Licensed General Contractor</span>
            </div>
            <a href="tel:8283979211" className="flex items-center gap-2 font-medium hover:text-accent transition-colors tracking-wide font-body">
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

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={link.href}
                className="relative text-[13px] font-medium text-foreground/70 hover:text-foreground transition-colors inline-flex items-center gap-1 px-3.5 py-2 rounded-sm hover:bg-secondary/60"
              >
                {link.label}
                {link.dropdown && (
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`} />
                )}
              </Link>

              <AnimatePresence>
                {link.dropdown && openDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                  >
                    <div className="bg-card border border-border rounded-sm shadow-[0_12px_40px_-8px_hsl(var(--heritage-charcoal)/0.12)] py-2 min-w-[240px]">
                      <div className="px-4 py-2 mb-1">
                        <span className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                          {link.label} Services
                        </span>
                      </div>
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors font-body"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-border mt-1.5 pt-1.5">
                        <Link
                          to={link.href}
                          className="block px-4 py-2.5 text-sm font-medium text-accent hover:bg-secondary transition-colors font-body inline-flex items-center gap-1.5"
                        >
                          All {link.label} Services
                          <ArrowRight className="w-3 h-3" />
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
            className="hidden md:flex items-center gap-2 text-foreground/60 hover:text-foreground text-sm font-body transition-colors mr-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">(828) 397-9211</span>
          </a>
          <a
            href="tel:8283979211"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-sm bg-primary text-primary-foreground active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4" />
          </a>
          <Link
            to="/request-inspection"
            className="hidden sm:inline-flex cta-gradient text-accent-foreground font-semibold text-sm px-5 py-2.5 rounded-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden group items-center gap-2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Schedule a Quote Call</span>
            <ArrowRight className="w-3.5 h-3.5 relative group-hover:translate-x-0.5 transition-transform" />
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
                                  className="py-2.5 px-3 text-sm text-foreground/65 hover:text-foreground hover:bg-secondary rounded-sm transition-colors block font-body"
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

              {/* Mobile CTA area */}
              <div className="pt-4 mt-3 border-t border-border space-y-2.5">
                <Link
                  to="/request-inspection"
                  onClick={() => setMobileOpen(false)}
                  className="cta-gradient text-accent-foreground font-semibold text-center py-3.5 px-4 rounded-sm flex items-center justify-center gap-2"
                >
                  Schedule a Quote Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:8283979211"
                  className="bg-primary text-primary-foreground font-medium text-center py-3.5 px-4 rounded-sm flex items-center justify-center gap-2 font-body"
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

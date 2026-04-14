import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import logo from "@/assets/logo.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

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
  { label: "Roofing", href: "/roofing", dropdown: roofingDropdown },
  { label: "Construction", href: "/services", dropdown: constructionDropdown },
  { label: "Projects", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Contact", href: "/request-inspection" },
];

const dropdownItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.03, duration: 0.25, ease: HIGHLAND_EASE },
  }),
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const location = useLocation();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 50);
    if (y > lastYRef.current && y > 200) setHidden(true);
    else setHidden(false);
    lastYRef.current = y;
  });

  const handleDropdownEnter = (label: string) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <motion.header
      animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
      transition={{ duration: 0.35, ease: HIGHLAND_EASE }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/98 backdrop-blur-xl shadow-[0_1px_12px_-4px_hsl(var(--heritage-charcoal)/0.08)] border-b border-border"
          : "bg-background border-b border-border/60"
      }`}
    >
      {/* Top heritage bar — collapses on scroll */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: HIGHLAND_EASE }}
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

      {/* Main nav bar */}
      <div className={`flex items-center justify-between px-5 md:px-8 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
        {/* Logo — smoothly scales on scroll */}
        <Link to="/" className="flex items-center">
          <motion.img
            src={logo}
            alt="Highlander Roofing & Construction"
            className="w-auto"
            animate={{ height: scrolled ? 34 : 46 }}
            transition={{ duration: 0.35, ease: HIGHLAND_EASE }}
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.dropdown && handleDropdownEnter(link.label)}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                to={link.href}
                className={`relative text-[13px] font-medium transition-colors inline-flex items-center gap-1 px-3.5 py-2 rounded-sm ${
                  isActive(link.href)
                    ? "text-foreground bg-secondary/50"
                    : "text-foreground/60 hover:text-foreground hover:bg-secondary/40"
                }`}
              >
                {link.label}
                {link.dropdown && (
                  <motion.div
                    animate={{ rotate: openDropdown === link.label ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: HIGHLAND_EASE }}
                  >
                    <ChevronDown className="w-3 h-3" />
                  </motion.div>
                )}
                {/* Active underline indicator */}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute -bottom-px left-3 right-3 h-[2px] bg-[hsl(var(--highland-gold))]"
                    transition={{ duration: 0.3, ease: HIGHLAND_EASE }}
                  />
                )}
              </Link>

              {/* Dropdown panel */}
              <AnimatePresence>
                {link.dropdown && openDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: HIGHLAND_EASE }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5"
                  >
                    <div className="bg-card border border-border rounded-sm shadow-[0_16px_48px_-12px_hsl(var(--heritage-charcoal)/0.12)] py-2 min-w-[260px] relative overflow-hidden">
                      {/* Gold top accent */}
                      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.3)] to-transparent" />

                      <div className="px-4 py-2.5 mb-1">
                        <span className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
                          {link.label} Services
                        </span>
                      </div>
                      {link.dropdown.map((item, i) => (
                        <motion.div
                          key={item.href}
                          custom={i}
                          variants={dropdownItemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <Link
                            to={item.href}
                            className={`group/item block px-4 py-2.5 text-sm transition-all font-body relative dropdown-item-premium ${
                              isActive(item.href)
                                ? "text-foreground bg-secondary/60"
                                : "text-foreground/65 hover:text-foreground hover:bg-secondary/40"
                            }`}
                          >
                            <span className="relative z-10">{item.label}</span>
                          </Link>
                        </motion.div>
                      ))}
                      <div className="border-t border-border mt-1.5 pt-1.5 mx-2">
                        <Link
                          to={link.href}
                          className="block px-3 py-2.5 text-sm font-medium text-accent hover:bg-secondary/40 transition-colors font-body rounded-sm inline-flex items-center gap-1.5 link-draw"
                        >
                          All {link.label} Services
                          <ArrowRight className="w-3 h-3 btn-arrow-icon" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Phone — desktop */}
          <a
            href="tel:8283979211"
            className="hidden md:flex items-center gap-2 text-foreground/55 hover:text-foreground text-sm font-body transition-colors mr-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">(828) 397-9211</span>
          </a>
          {/* Phone — mobile */}
          <a
            href="tel:8283979211"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-sm bg-primary text-primary-foreground active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4" />
          </a>
          {/* CTA button — shimmer + press */}
          <Link
            to="/request-inspection"
            className="hidden sm:inline-flex cta-gradient text-accent-foreground font-semibold text-sm px-5 py-2.5 rounded-sm items-center gap-2 btn-primary-interactive"
          >
            <span className="relative z-10">Schedule a Quote Call</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 btn-arrow-icon" />
          </Link>
          {/* Hamburger — animated icon swap */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 active:scale-90 transition-transform"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: HIGHLAND_EASE }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: HIGHLAND_EASE }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU PANEL ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[inherit] bg-[hsl(var(--heritage-charcoal)/0.3)] backdrop-blur-sm lg:hidden z-[-1]"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: HIGHLAND_EASE }}
              className="lg:hidden bg-card border-t border-border overflow-hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <nav className="flex flex-col px-5 py-5 gap-0.5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3, ease: HIGHLAND_EASE }}
                  >
                    {link.dropdown ? (
                      <div>
                        <button
                          onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                          className={`w-full py-3 px-3 text-base font-medium rounded-sm transition-all duration-200 flex items-center justify-between ${
                            isActive(link.href)
                              ? "text-foreground bg-secondary/50"
                              : "text-foreground hover:bg-secondary/30"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {link.label}
                            {isActive(link.href) && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))]" />
                            )}
                          </span>
                          <motion.div
                            animate={{ rotate: mobileExpanded === link.label ? 180 : 0 }}
                            transition={{ duration: 0.25, ease: HIGHLAND_EASE }}
                          >
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === link.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: HIGHLAND_EASE }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-2 space-y-0.5 border-l-2 border-[hsl(var(--highland-gold)/0.15)] ml-3">
                                {link.dropdown.map((item, j) => (
                                  <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: j * 0.03, duration: 0.2 }}
                                  >
                                    <Link
                                      to={item.href}
                                      onClick={() => setMobileOpen(false)}
                                      className={`py-2.5 px-3 text-sm rounded-sm transition-all block font-body ${
                                        isActive(item.href)
                                          ? "text-foreground bg-secondary/50 font-medium"
                                          : "text-foreground/60 hover:text-foreground hover:bg-secondary/30"
                                      }`}
                                    >
                                      {item.label}
                                    </Link>
                                  </motion.div>
                                ))}
                                <Link
                                  to={link.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="py-2.5 px-3 text-sm text-accent font-medium rounded-sm hover:bg-secondary/30 transition-colors block font-body flex items-center gap-1.5"
                                >
                                  All {link.label} <ArrowRight className="w-3 h-3" />
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
                        className={`py-3 px-3 text-base font-medium rounded-sm transition-all block flex items-center gap-2 ${
                          isActive(link.href)
                            ? "text-foreground bg-secondary/50"
                            : "text-foreground hover:bg-secondary/30"
                        }`}
                      >
                        {link.label}
                        {isActive(link.href) && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))]" />
                        )}
                      </Link>
                    )}
                  </motion.div>
                ))}

                {/* Mobile CTA area */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3, ease: HIGHLAND_EASE }}
                  className="pt-4 mt-3 border-t border-border space-y-2.5"
                >
                  <Link
                    to="/request-inspection"
                    onClick={() => setMobileOpen(false)}
                    className="cta-gradient text-accent-foreground font-semibold text-center py-3.5 px-4 rounded-sm flex items-center justify-center gap-2 btn-primary-interactive"
                  >
                    <span className="relative z-10">Schedule a Quote Call</span>
                    <ArrowRight className="w-4 h-4 relative z-10" />
                  </Link>
                  <a
                    href="tel:8283979211"
                    className="bg-primary text-primary-foreground font-medium text-center py-3.5 px-4 rounded-sm flex items-center justify-center gap-2 font-body btn-ghost-interactive"
                  >
                    <Phone className="w-4 h-4" />
                    (828) 397-9211
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, ChevronDown, ChevronRight, ArrowRight, Hammer, Shield, Ruler } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import logo from "@/assets/logo.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/* ─── DROPDOWN DATA ─── */

interface DropdownItem {
  label: string;
  href: string;
  desc: string;
}

const roofingItems: DropdownItem[] = [
  { label: "Roof Replacement", href: "/roofing/roof-replacement", desc: "Full tear-off and reinstall" },
  { label: "Roof Repair", href: "/roofing/roof-repair", desc: "Targeted damage restoration" },
  { label: "Metal Roofing", href: "/roofing/metal", desc: "Standing seam built for the mountains" },
  { label: "Brava / Synthetic", href: "/roofing/brava-synthetic", desc: "Premium composite slate & shake" },
  { label: "Skylights (VELUX)", href: "/roofing/skylights", desc: "Certified VELUX installer" },
  { label: "Storm Damage", href: "/roofing/storm-damage", desc: "Insurance claims & emergency work" },
  { label: "Commercial Roofing", href: "/roofing/commercial", desc: "Flat, metal & TPO systems" },
];


const constructionItems: DropdownItem[] = [
  { label: "Additions & Suites", href: "/construction/additions", desc: "Expand your home's footprint" },
  { label: "Kitchen & Bath", href: "/construction/renovations", desc: "Interior transformations" },
  { label: "Outdoor Living", href: "/construction/outdoor-living", desc: "Decks, porches & pergolas" },
  { label: "Siding & Exterior", href: "/construction/siding", desc: "Mountain-grade protection" },
  { label: "Basements & Bonus", href: "/construction/renovations#basements", desc: "Finish your lower level" },
  { label: "Structural & Repair", href: "/construction#structural", desc: "Framing & load-bearing work" },
];

const designItems: DropdownItem[] = [
  { label: "Design & Planning", href: "/layouts-planning", desc: "Pre-construction support" },
  { label: "Project Brief", href: "/design-intake?mode=long", desc: "Start a detailed planning brief" },
  { label: "Consultation", href: "/design-intake?mode=short", desc: "Quick planning inquiry" },
];


interface DivisionDropdown {
  label: string;
  href: string;
  items: DropdownItem[];
  icon: typeof Shield;
  tagline: string;
  accent: "green" | "gold";
}

const divisions: DivisionDropdown[] = [
  {
    label: "Roofing",
    href: "/roofing",
    items: roofingItems,
    icon: Shield,
    tagline: "GAF Master Elite · Top 2% Nationally",
    accent: "green",
  },
  {
    label: "Construction",
    href: "/construction",
    items: constructionItems,
    icon: Hammer,
    tagline: "Licensed General Contractor",
    accent: "gold",
  },
  {
    label: "Design",
    href: "/layouts-planning",
    items: designItems,
    icon: Ruler,
    tagline: "Pre-Construction & Layouts",
    accent: "gold",
  },
];


const secondaryLinks = [
  { label: "Our Work", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Story", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

const dropdownItemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.025, duration: 0.2, ease: HIGHLAND_EASE },
  }),
};

/* ─── COMPONENT ─── */

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

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 30);
    if (y > lastYRef.current && y > 200) setHidden(true);
    else setHidden(false);
    lastYRef.current = y;
  });

  const handleDropdownEnter = (label: string) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <motion.header
      animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
      transition={{ duration: 0.35, ease: HIGHLAND_EASE }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white shadow-[0_4px_25px_-10px_rgba(0,0,0,0.12)] border-b border-black/[0.04]"
    >
      {/* ─── Main nav bar ─── */}
      <div className={`flex items-center justify-between px-5 md:px-8 transition-all duration-500 ${scrolled ? "py-0.5" : "py-1 md:py-1.5"}`}>
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.img
            src={logo}
            alt="Highlander Roofing & Construction"
            className="w-auto transition-all duration-500 max-w-[160px] md:max-w-none"
            animate={{ height: scrolled ? 150 : 200 }}
            transition={{ duration: 0.45, ease: HIGHLAND_EASE }}
          />
        </Link>

        {/* ─── Desktop Navigation ─── */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {/* Division dropdowns */}
          {divisions.map((div) => (
            <div
              key={div.label}
              className="relative"
              onMouseEnter={() => handleDropdownEnter(div.label)}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                to={div.href}
                className={`relative text-[16px] md:text-[17px] font-bold transition-all duration-300 inline-flex items-center gap-1.5 px-5 py-3 rounded-sm font-body ${
                  isActive(div.href)
                    ? "text-heritage-charcoal bg-black/5"
                    : "text-heritage-charcoal/90 hover:text-heritage-charcoal hover:bg-black/5"
                }`}

              >
                {div.label}
                <motion.div
                  animate={{ rotate: openDropdown === div.label ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: HIGHLAND_EASE }}
                >
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </motion.div>
                {isActive(div.href) && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute -bottom-px left-3 right-3 h-[2px] bg-[hsl(var(--highland-gold))]"
                    transition={{ duration: 0.3, ease: HIGHLAND_EASE }}
                  />
                )}
              </Link>

              {/* ─── Mega dropdown panel ─── */}
              <AnimatePresence>
                {openDropdown === div.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: HIGHLAND_EASE }}
                    className="absolute top-full left-0 pt-2.5"
                  >
                    <div className="bg-card border border-border rounded-sm shadow-[0_20px_60px_-15px_hsl(var(--heritage-charcoal)/0.15)] min-w-[340px] relative overflow-hidden">
                      {/* Top accent line — Tartan */}
                      <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
                        <div className="absolute inset-0 opacity-40 bg-[hsl(var(--highland-gold)/0.1)]" style={{ 
                          backgroundImage: "url('/tartan.png')",
                          backgroundSize: "80px auto"
                        }} />
                      </div>

                      {/* Division header */}
                      <div className="px-5 pt-5 pb-3">
                        <div className="flex items-center gap-2.5 mb-1">
                          <div className={`w-7 h-7 rounded-sm flex items-center justify-center ${
                            div.accent === "green" ? "bg-primary/10" : "bg-[hsl(var(--highland-gold)/0.1)]"
                          }`}>
                            <div.icon className={`w-3.5 h-3.5 ${
                              div.accent === "green" ? "text-primary" : "text-[hsl(var(--highland-gold))]"
                            }`} />
                          </div>
                          <span className="text-base font-heading font-bold text-foreground">{div.label} Division</span>
                        </div>
                        <p className="text-[12px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground/60 ml-[38px]">
                          {div.tagline}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="mx-5 h-px bg-border/60" />

                      {/* Items */}
                      <div className="py-2 px-2">
                        {div.items.map((item, i) => (
                          <motion.div
                            key={item.href}
                            custom={i}
                            variants={dropdownItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <Link
                              to={item.href}
                              className={`group/item flex items-center justify-between px-3 py-2.5 rounded-sm transition-all duration-200 ${
                                isActive(item.href)
                                  ? "bg-secondary/60 text-foreground"
                                  : "text-foreground/65 hover:text-foreground hover:bg-secondary/40"
                              }`}
                            >
                              <div>
                                <span className="text-[14px] font-body font-bold block leading-tight">{item.label}</span>
                                <span className="text-[12px] font-body text-muted-foreground/70 leading-tight">{item.desc}</span>
                              </div>
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover/item:opacity-40 -translate-x-1 group-hover/item:translate-x-0 transition-all duration-200" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>

                      {/* Footer CTA */}
                      <div className="border-t border-border/60 mx-2 mt-1">
                        <Link
                          to={div.href}
                          className={`flex items-center gap-1.5 px-3 py-3 text-[14px] font-body font-bold rounded-sm transition-colors ${
                            div.accent === "green"
                              ? "text-primary hover:bg-primary/5"
                              : "text-accent hover:bg-accent/5"
                          }`}
                        >
                          View All {div.label}
                          <ArrowRight className="w-3 h-3 btn-arrow-icon" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Separator dot */}
          <span className="w-px h-4 mx-1 transition-colors duration-300 bg-black/10" />

          {/* Secondary links */}
          {secondaryLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`relative text-[16px] md:text-[17px] font-bold transition-all duration-300 px-4 py-3 rounded-sm font-body ${
                isActive(link.href)
                  ? "text-heritage-charcoal bg-black/5"
                  : "text-heritage-charcoal/75 hover:text-heritage-charcoal hover:bg-black/5"
              }`}

            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="nav-active-secondary"
                  className="absolute -bottom-px left-3 right-3 h-[2px] bg-[hsl(var(--highland-gold))]"
                  transition={{ duration: 0.3, ease: HIGHLAND_EASE }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* ─── Right actions ─── */}
        <div className="flex items-center gap-3">
          <a
            href="tel:8283979211"
            className="hidden md:flex items-center gap-2 transition-all duration-300 text-sm font-body mr-1 text-heritage-charcoal/60 hover:text-heritage-charcoal"
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
            to="/consultation"
            className="hidden sm:inline-flex cta-gradient text-accent-foreground font-bold text-[14px] md:text-base px-8 py-4 rounded-none items-center gap-2.5 btn-primary-interactive uppercase tracking-[0.12em] shadow-lg border border-[hsl(var(--highland-gold)/0.4)]"
          >
            <span className="relative z-10">Start a Project</span>
            <ArrowRight className="w-4 h-4 relative z-10 btn-arrow-icon" />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 active:scale-90 transition-all duration-300 text-heritage-charcoal"
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

      {/* ─── MOBILE MENU ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
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
              className="lg:hidden bg-white border-t border-black/5 overflow-hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <nav className="flex flex-col px-5 py-5 gap-1">
                {/* ─── Division sections ─── */}
                {divisions.map((div, di) => (
                  <motion.div
                    key={div.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + di * 0.06, duration: 0.3, ease: HIGHLAND_EASE }}
                  >
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === div.label ? null : div.label)}
                      className={`w-full py-3 px-3 rounded-sm transition-all duration-200 flex items-center justify-between ${
                        isActive(div.href)
                          ? "text-heritage-charcoal bg-black/5"
                          : "text-heritage-charcoal/90 hover:bg-black/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                          div.accent === "green" ? "bg-primary/10" : "bg-[hsl(var(--highland-gold)/0.1)]"
                        }`}>
                          <div.icon className={`w-4 h-4 ${
                            div.accent === "green" ? "text-primary" : "text-[hsl(var(--highland-gold))]"
                          }`} />
                        </div>
                        <div className="text-left">
                          <span className="text-[17px] md:text-[18px] font-heading font-bold block leading-tight text-heritage-charcoal">{div.label}</span>
                          <span className="text-[11px] md:text-[12px] font-body text-heritage-charcoal/60 uppercase tracking-wider">{div.tagline}</span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: mobileExpanded === div.label ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: HIGHLAND_EASE }}
                      >
                        <ChevronDown className="w-4 h-4 text-heritage-charcoal/40" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {mobileExpanded === div.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: HIGHLAND_EASE }}
                          className="overflow-hidden"
                        >
                          <div className={`ml-4 pl-4 pb-2 space-y-0.5 border-l-2 ${
                            div.accent === "green"
                              ? "border-primary/15"
                              : "border-[hsl(var(--highland-gold)/0.15)]"
                          }`}>
                            {div.items.map((item, j) => (
                              <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.03, duration: 0.2 }}
                              >
                                <Link
                                  to={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className={`py-2.5 px-3 rounded-sm transition-all block ${
                                    isActive(item.href)
                                      ? "bg-black/5"
                                      : "hover:bg-black/5"
                                  }`}
                                >
                                  <span className={`text-sm font-body block leading-tight ${
                                    isActive(item.href) ? "font-medium text-heritage-charcoal" : "text-heritage-charcoal/70"
                                  }`}>{item.label}</span>
                                  <span className="text-[11px] font-body text-heritage-charcoal/30">{item.desc}</span>
                                </Link>
                              </motion.div>
                            ))}
                            <Link
                              to={div.href}
                              onClick={() => setMobileOpen(false)}
                              className={`py-2.5 px-3 text-sm font-semibold rounded-sm transition-colors flex items-center gap-1.5 font-body ${
                                div.accent === "green" ? "text-primary" : "text-accent"
                              }`}
                            >
                              View All {div.label} <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {/* ─── Divider ─── */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="flex items-center gap-3 py-2 px-3"
                >
                  <div className="flex-1 h-px bg-black/10" />
                  <span className="text-[9px] font-body font-semibold uppercase tracking-[0.2em] text-heritage-charcoal/30">Company</span>
                  <div className="flex-1 h-px bg-black/10" />
                </motion.div>

                {/* ─── Secondary links ─── */}
                {secondaryLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.03, duration: 0.3, ease: HIGHLAND_EASE }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`py-3 px-3 text-lg font-bold rounded-sm transition-all flex items-center gap-2 font-body ${
                        isActive(link.href)
                          ? "text-heritage-charcoal bg-black/5"
                          : "text-heritage-charcoal/80 hover:text-heritage-charcoal hover:bg-black/5"
                      }`}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))]" />
                      )}
                    </Link>
                  </motion.div>
                ))}

                {/* ─── Mobile CTA ─── */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3, ease: HIGHLAND_EASE }}
                  className="pt-4 mt-2 border-t border-black/10 space-y-2.5"
                >
                  <Link
                    to="/consultation"
                    onClick={() => setMobileOpen(false)}
                    className="cta-gradient text-accent-foreground font-bold text-center py-4.5 px-4 rounded-none flex items-center justify-center gap-2.5 text-[17px] uppercase tracking-wider shadow-lg"
                  >
                    <span className="relative z-10">Start Your Project</span>
                    <ArrowRight className="w-5 h-5 relative z-10" />
                  </Link>
                  <a
                    href="tel:8283979211"
                    className="bg-primary text-primary-foreground font-bold text-center py-4.5 px-4 rounded-none flex items-center justify-center gap-2.5 text-[17px] font-body shadow-md active:scale-95 transition-all"
                  >
                    <Phone className="w-5 h-5" />
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

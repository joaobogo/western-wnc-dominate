import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import logo from "@/assets/logo.svg";
import logoCompact from "@/assets/logo-compact-transparent.png.asset.json";
import { HIGHLAND_EASE } from "./header/nav-data";
import { DesktopNav } from "./header/DesktopNav";
import { HeaderActions } from "./header/HeaderActions";
import { MobileMenu } from "./header/MobileMenu";
import SkipToContent from "./a11y/SkipToContent";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();
  const serviceAreasTriggerRef = useRef<HTMLAnchorElement>(null);
  const serviceAreasPanelRef = useRef<HTMLDivElement>(null);
  const mobileServiceAreasBtnRef = useRef<HTMLButtonElement>(null);
  const mobileMenuBtnRef = useRef<HTMLButtonElement>(null);

  // Close open desktop dropdown on Escape and restore focus to its trigger.
  useEffect(() => {
    if (!openDropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        if (openDropdown === "ServiceAreas") serviceAreasTriggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openDropdown]);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    document.body.dataset.menuOpen = mobileOpen ? "true" : "false";
    window.dispatchEvent(new CustomEvent("mobilemenu:toggle", { detail: { open: mobileOpen } }));
    return () => {
      document.body.style.overflow = "";
    };
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

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  /**
   * Robust "View All <Division>" handler.
   * Handles being already on the hub (strips hash, scrolls to top) and clean
   * navigation from sibling pages.
   */
  const handleViewAllClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpenDropdown(null);
    setMobileOpen(false);
    if (location.pathname === href) {
      if (location.hash) navigate(href, { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(href);
      requestAnimationFrame(() => window.scrollTo({ top: 0 }));
    }
  };

  return (
    <motion.header
      animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
      transition={{ duration: 0.35, ease: HIGHLAND_EASE }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white shadow-raised border-b border-black/[0.08] md:border-b-0 pt-[env(safe-area-inset-top)]"
    >
      <SkipToContent />
      <div
        className={`flex items-center justify-between px-4 md:px-8 transition-all duration-500 ${
          scrolled ? "py-1.5 md:py-2" : "py-2 md:py-4"
        }`}
      >
        <Link to="/" aria-label="Highlander Building Services — Home" className="flex items-center bg-transparent hover:bg-transparent">
          <img loading="eager" decoding="async"
            src={logoCompact.url}
            alt="Highlander Building Services logo"
            width={1024}
            height={1024}
            className={`w-auto block sm:hidden transition-[height,transform] duration-500 ease-out origin-left ${
              scrolled ? "h-[44px]" : "h-[52px]"
            }`}
            fetchPriority="high"
          />
          <img loading="eager" decoding="async"
            src={logo}
            alt="Highlander Building Services logo"
            width={1193}
            height={338}
            className={`w-auto hidden sm:block transition-[height,transform] duration-500 ease-out origin-left ${
              scrolled
                ? "h-[44px] sm:h-[48px] md:h-[52px] lg:h-[56px]"
                : "h-[52px] sm:h-[60px] md:h-[68px] lg:h-[76px]"
            }`}
            fetchPriority="high"
          />
        </Link>

        <DesktopNav
          openDropdown={openDropdown}
          onEnter={handleDropdownEnter}
          onLeave={handleDropdownLeave}
          onOpen={setOpenDropdown}
          onClose={() => setOpenDropdown(null)}
          isActive={isActive}
          onViewAllClick={handleViewAllClick}
          serviceAreasTriggerRef={serviceAreasTriggerRef}
          serviceAreasPanelRef={serviceAreasPanelRef}
        />

        <HeaderActions mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} menuButtonRef={mobileMenuBtnRef} />
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        expanded={mobileExpanded}
        setExpanded={setMobileExpanded}
        isActive={isActive}
        onViewAllClick={handleViewAllClick}
        serviceAreasBtnRef={mobileServiceAreasBtnRef}
        triggerRef={mobileMenuBtnRef}
      />
    </motion.header>
  );
};

export default Header;
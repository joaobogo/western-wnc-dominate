import { Phone, ArrowRight, FileText, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { trackPrimaryCtaClick } from "@/lib/gtm";
import { getPagePrimaryAction } from "@/lib/page-cta-hierarchy";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/** Intake / form-first routes already show a primary form above the fold —
 *  the sticky bar would duplicate their CTAs, so it stays hidden there. */
const INTAKE_ROUTES = [
  "/consultation",
  "/roofing-intake",
  "/construction-intake",
  "/roofing-builder",
  "/construction-builder",
  "/design-intake",
  "/quote-flow",
  "/request-inspection",
  "/contact",
];

const StickyMobileCTA = () => {
  const { pathname } = useLocation();
  const action = getPagePrimaryAction(pathname);
  const callIsPrimary = action.intent === "call";

  const firePrimary = () =>
    trackPrimaryCtaClick({
      page_key: action.pageKey,
      intent: action.intent,
      cta_text: action.primaryLabel,
      destination_url: action.primaryHref,
      click_location: "sticky_bar",
    });
  const onIntakePage = INTAKE_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`),
  );
  const [scrolled, setScrolled] = useState(false);
  const [desktopHovered, setDesktopHovered] = useState(false);
  const [suppressed, setSuppressed] = useState(false);
  /** True while the visitor is typing in any field — the bar steps aside. */
  const [fieldFocused, setFieldFocused] = useState(false);
  /** True when the footer's closing CTA is on screen — never cover it. */
  const [finalCtaInView, setFinalCtaInView] = useState(false);

  useEffect(() => {
    // Reveal only once the hero has left the viewport so the sticky bar never
    // competes with the hero CTAs. Falls back to a viewport-height threshold
    // on pages without a marked hero.
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>(
        "[data-hero], [data-hero-anchored], #hero",
      );
      if (hero) {
        const { bottom } = hero.getBoundingClientRect();
        setScrolled(bottom <= 0);
        return;
      }
      setScrolled(window.scrollY > Math.max(window.innerHeight * 0.9, 640));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Hide while a form field has focus (mobile keyboards steal the viewport).
  useEffect(() => {
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && /^(input|textarea|select)$/i.test(el.tagName);
    const onFocus = (e: FocusEvent) => { if (isField(e.target)) setFieldFocused(true); };
    const onBlur = () => setFieldFocused(false);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onBlur);
    return () => {
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onBlur);
    };
  }, []);

  // Never cover the footer's final CTA region.
  useEffect(() => {
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setFinalCtaInView(visible.size > 0);
      },
      { threshold: 0.01 },
    );
    const observed = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-final-cta]").forEach((el) => {
        if (!observed.has(el)) { io.observe(el); observed.add(el); }
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [pathname]);

  // Reflect visibility on <body> so global CSS can add page bottom padding
  // and any other overlay can coordinate. Cleared on unmount.
  const barVisible = scrolled && !suppressed && !fieldFocused && !finalCtaInView && !onIntakePage;

  useEffect(() => {
    const visible = barVisible;
    document.body.dataset.stickyBar = visible ? "visible" : "hidden";
    return () => { delete document.body.dataset.stickyBar; };
  }, [barVisible]);

  // Hide sticky mobile bar when chatbot or mobile menu is open, so the
  // floating overlays never stack and compete for the same tap area.
  useEffect(() => {
    const sync = () => {
      const chatOpen = document.body.dataset.chatOpen === "true";
      const menuOpen = document.body.dataset.menuOpen === "true";
      setSuppressed(chatOpen || menuOpen);
    };
    sync();
    window.addEventListener("chatbot:toggle", sync);
    window.addEventListener("mobilemenu:toggle", sync);
    return () => {
      window.removeEventListener("chatbot:toggle", sync);
      window.removeEventListener("mobilemenu:toggle", sync);
    };
  }, []);

  // Also hide the sticky bar when a primary lead-capture form is in view.
  // Any element with `data-hide-sticky` counts; when ≥25% visible the bar
  // steps out of the way so the submit button and consent stay clear.
  const [formInView, setFormInView] = useState(false);
  useEffect(() => {
    const visibleEls = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.25) visibleEls.add(e.target);
          else visibleEls.delete(e.target);
        }
        setFormInView(visibleEls.size > 0);
      },
      { threshold: [0, 0.25, 0.5] }
    );
    const observed = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll("[data-hide-sticky]").forEach((el) => {
        if (!observed.has(el)) { io.observe(el); observed.add(el); }
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
  useEffect(() => {
    if (formInView) setSuppressed(true);
    else {
      const chatOpen = document.body.dataset.chatOpen === "true";
      const menuOpen = document.body.dataset.menuOpen === "true";
      setSuppressed(chatOpen || menuOpen);
    }
  }, [formInView]);

  if (onIntakePage) return null;

  return (
    <>
      {/* ─── MOBILE: Premium bottom action bar ─── */}
      <AnimatePresence>
        {barVisible && (
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          >
            {/* Gold top accent */}
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))' }} />
            
            <div className="bg-card/98 backdrop-blur-xl border-t border-border shadow-raised">
              {/* Two-column layout: Primary (Get My Written Estimate) + Call */}
              {/* One primary action per page — see src/lib/page-cta-hierarchy.ts */}
              <div className="flex items-stretch" data-gtm-location="sticky_bar">
                {callIsPrimary ? (
                  <>
                    <a
                      href={action.primaryHref}
                      onClick={() => {
                        firePrimary();
                        trackEvent("phone_click", { label: "Call Direct", elementId: "sticky-cta-mobile-call" });
                      }}
                      className="flex-[1.6] flex items-center justify-center gap-2 px-4 cta-gradient text-accent-foreground active:opacity-95 active:scale-[0.97] transition-all min-h-[56px]"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      <span className="text-body-xs font-body font-extrabold uppercase tracking-[0.08em]">
                        {action.primaryLabel}
                      </span>
                    </a>
                    <Link
                      to={action.secondaryHref}
                      onClick={() => trackEvent("cta_click", { label: action.secondaryLabel, elementId: "sticky-cta-mobile-estimate" })}
                      className="flex-1 flex items-center justify-center gap-2 px-3 border-l border-border text-primary active:bg-primary/10 active:scale-95 transition-all min-h-[56px]"
                    >
                      <FileText className="w-4 h-4" aria-hidden="true" />
                      <span className="text-body-xs font-body font-extrabold uppercase tracking-[0.06em]">Estimate</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <a
                      href={action.secondaryHref}
                      onClick={() => trackEvent("phone_click", { label: "Call Direct", elementId: "sticky-cta-mobile-call" })}
                      className="flex-1 flex items-center justify-center gap-2 px-3 border-r border-border text-primary active:bg-primary/10 active:scale-95 transition-all min-h-[56px]"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      <span className="text-body-xs font-body font-extrabold uppercase tracking-[0.06em]">Call</span>
                    </a>
                    <Link
                      to={action.primaryHref}
                      onClick={() => {
                        firePrimary();
                        trackEvent("cta_click", { label: action.primaryLabel, elementId: "sticky-cta-mobile-estimate" });
                      }}
                      className="flex-[1.6] flex items-center justify-center gap-2 px-4 cta-gradient text-accent-foreground active:opacity-95 active:scale-[0.97] transition-all min-h-[56px]"
                    >
                      <FileText className="w-4 h-4" aria-hidden="true" />
                      <span className="text-body-xs font-body font-extrabold uppercase tracking-[0.08em]">Get My Written Estimate</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Safe area spacer for notch phones */}
              <div className="h-[env(safe-area-inset-bottom,0px)] bg-card" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── DESKTOP: Floating consultation trigger ─── */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: HIGHLAND_EASE }}
            className="fixed bottom-8 right-8 z-50 hidden md:block"
            onMouseEnter={() => setDesktopHovered(true)}
            onMouseLeave={() => setDesktopHovered(false)}
          >
            <div className="relative">
              {/* Expanded panel */}
              <AnimatePresence>
                {desktopHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: HIGHLAND_EASE }}
                    className="absolute bottom-full right-0 mb-3 w-72 bg-card border border-border rounded-none shadow-floating overflow-hidden"
                  >
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.3)] to-transparent" />
                    <div className="p-4 border-b border-border">
                      <p className="text-sm font-heading font-bold text-foreground mb-0.5">Ready to start?</p>
                      <p className="text-caption text-muted-foreground font-body">Begin a project conversation with our team.</p>
                    </div>
                    <div className="p-2 space-y-0.5">
                      <Link
                        to="/consultation"
                        className="btn btn-ghost btn-sm group"
                      >
                        <div className="w-9 h-9 rounded-none bg-[hsl(var(--highland-gold)/0.08)] flex items-center justify-center flex-shrink-0 group-hover:bg-[hsl(var(--highland-gold)/0.15)] transition-colors">
                          <FileText className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-heading font-semibold text-foreground">Start a Project</p>
                          <p className="text-caption text-muted-foreground font-body">No-obligation consultation</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-muted-foreground btn-arrow-icon" aria-hidden="true" />
                      </Link>
                      <a
                        href="tel:+18285247773"
                        className="btn btn-ghost btn-sm group"
                      >
                        <div className="w-9 h-9 rounded-none bg-primary/6 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors">
                          <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-heading font-semibold text-foreground">Call Direct</p>
                          <p className="text-caption text-muted-foreground font-body">(828) 524-7773</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-muted-foreground btn-arrow-icon" aria-hidden="true" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Trigger button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2.5 bg-primary text-primary-foreground pl-4 pr-5 py-3 rounded-none shadow-raised hover:shadow-floating transition-shadow duration-300"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-body font-semibold">Start a Conversation</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyMobileCTA;
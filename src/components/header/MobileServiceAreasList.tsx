import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronRight, MapPin, Search, X } from "lucide-react";
import { trackEvent, setSourceTown } from "@/lib/analytics";
import { HIGHLAND_EASE, townsByCounty } from "./nav-data";

interface Props {
  expanded: boolean;
  onToggle: () => void;
  onClose: () => void;
  isActive: (href: string) => boolean;
  onNavigate: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
}

export const MobileServiceAreasList = ({ expanded, onToggle, onClose, isActive, onNavigate, btnRef }: Props) => {
  const [search, setSearch] = useState("");
  const q = search.trim().toLowerCase();
  const filtered = townsByCounty
    .map((group) => {
      const countyMatches = group.county.toLowerCase().includes(q);
      const townsMatch = countyMatches ? group.towns : group.towns.filter((t) => t.name.toLowerCase().includes(q));
      return { ...group, towns: townsMatch };
    })
    .filter((g) => g.towns.length > 0);

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18, duration: 0.3, ease: HIGHLAND_EASE }}>
      <button
        ref={btnRef}
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls="mobile-service-areas-panel"
        className={`w-full py-2.5 px-2.5 rounded-sm transition-all duration-200 flex items-center justify-between min-h-[48px] ${
          isActive("/service-areas") ? "text-heritage-charcoal bg-black/5" : "text-heritage-charcoal/90 hover:bg-black/5"
        }`}
      >
        <span className="text-body-sm font-bold font-body">Service Areas</span>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25, ease: HIGHLAND_EASE }} aria-hidden="true">
          <ChevronDown className="w-4 h-4 text-heritage-charcoal/40" />
        </motion.div>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            id="mobile-service-areas-panel"
            role="region"
            aria-label="Service areas by town"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: HIGHLAND_EASE }}
            className="overflow-hidden"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                onClose();
                btnRef.current?.focus();
              }
            }}
          >
            <div className="ml-3.5 pl-3 pb-2 border-l-2 border-[hsl(var(--highland-gold)/0.15)]">
              <div className="relative mt-1.5 mb-2 mr-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-charcoal/40 pointer-events-none" />
                <input
                  aria-label="Search town or county"
            type="search"
                  inputMode="search"
                  autoComplete="off"
                  placeholder="Search town or county…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full min-h-[44px] rounded-sm border border-black/10 bg-white pl-8 pr-8 py-2 text-body-sm font-body text-heritage-charcoal placeholder:text-heritage-charcoal/40 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--highland-gold)/0.4)] focus:border-[hsl(var(--highland-gold)/0.5)]"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-heritage-charcoal/40 hover:text-heritage-charcoal active:scale-90 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {filtered.length === 0 ? (
                <p className="px-2.5 py-4 text-body-xs font-body text-heritage-charcoal/50 italic">
                  No matching towns. Try a different search.
                </p>
              ) : (
                filtered.map((group) => (
                  <div key={group.county} className="mb-2 last:mb-0">
                    <div className="flex items-center gap-1.5 px-2 pt-2 pb-1">
                      <MapPin className="w-3 h-3 text-[hsl(var(--gold-ink))]" />
                      <span className="text-caption font-body font-bold uppercase tracking-[0.14em] text-heritage-charcoal/55">{group.county}</span>
                      <span className="text-caption font-body text-heritage-charcoal/35 ml-auto">{group.towns.length}</span>
                    </div>
                    <ul className="flex flex-col">
                      {group.towns.map((item) => (
                        <li key={item.href}>
                          <Link
                            to={item.href}
                            title={`Roofing & Construction in ${item.name}, NC`}
                            aria-label={`Roofing & Construction in ${item.name}, NC — ${item.county}`}
                            onClick={() => {
                              setSourceTown({ town: item.name, county: item.county, href: item.href, source: "header_dropdown_mobile" });
                              trackEvent("cta_click", {
                                label: `service_area_dropdown:${item.name}`,
                                elementId: "header-service-areas-mobile",
                                metadata: { town: item.name, county: item.county, href: item.href, source: "header_dropdown_mobile", search_query: q || undefined },
                              });
                              onNavigate();
                            }}
                            aria-current={isActive(item.href) ? "page" : undefined}
                            className={`relative flex items-center justify-between gap-2 py-2.5 px-3 rounded-sm min-h-[48px] transition-all active:scale-[0.99] ${
                              isActive(item.href)
                                ? "font-semibold text-heritage-charcoal bg-[hsl(var(--highland-gold)/0.12)] ring-1 ring-[hsl(var(--highland-gold)/0.35)] pl-4"
                                : "text-heritage-charcoal/80 hover:bg-black/5 active:bg-black/[0.06]"
                            }`}
                          >
                            {isActive(item.href) && (
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r bg-[hsl(var(--highland-gold))]" />
                            )}
                            <span className="text-body-sm font-body leading-tight">{item.name}</span>
                            <ChevronRight className="w-4 h-4 text-heritage-charcoal/30 shrink-0" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}

              <Link
                to="/service-areas"
                onClick={onNavigate}
                className="btn btn-secondary btn-md mt-1"
              >
                View All Service Areas <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
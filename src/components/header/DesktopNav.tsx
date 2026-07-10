import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HIGHLAND_EASE, divisions, secondaryLinks } from "./nav-data";
import { DivisionDropdown } from "./DivisionDropdown";
import { ServiceAreasDropdown } from "./ServiceAreasDropdown";
import { forwardRef } from "react";

interface Props {
  openDropdown: string | null;
  onEnter: (label: string) => void;
  onLeave: () => void;
  onOpen: (label: string) => void;
  onClose: () => void;
  isActive: (href: string) => boolean;
  onViewAllClick: (e: React.MouseEvent, href: string) => void;
  serviceAreasTriggerRef: React.Ref<HTMLAnchorElement>;
  serviceAreasPanelRef: React.RefObject<HTMLDivElement>;
}

export const DesktopNav = forwardRef<HTMLElement, Props>(
  ({ openDropdown, onEnter, onLeave, onOpen, onClose, isActive, onViewAllClick, serviceAreasTriggerRef, serviceAreasPanelRef }, _ref) => (
    <nav className="hidden lg:flex items-center gap-0 whitespace-nowrap">
      {divisions.map((div) => (
        <DivisionDropdown
          key={div.label}
          division={div}
          isOpen={openDropdown === div.label}
          onEnter={() => onEnter(div.label)}
          onLeave={onLeave}
          isActive={isActive}
          onViewAllClick={onViewAllClick}
        />
      ))}

      <span className="w-px h-4 mx-1.5 transition-colors duration-300 bg-black/10" />

      <Link
        to="/layouts-planning"
        className={`relative text-[15px] font-bold transition-all duration-300 px-2.5 xl:px-4 py-4 rounded-sm font-body whitespace-nowrap ${
          isActive("/layouts-planning")
            ? "text-heritage-charcoal bg-black/5"
            : "text-heritage-charcoal/75 hover:text-heritage-charcoal hover:bg-black/5"
        }`}
      >
        Design
        {isActive("/layouts-planning") && (
          <motion.div
            layoutId="nav-active-design"
            className="absolute -bottom-px left-3 right-3 h-[2px] bg-[hsl(var(--highland-gold))]"
            transition={{ duration: 0.3, ease: HIGHLAND_EASE }}
          />
        )}
      </Link>

      <span className="w-px h-4 mx-1.5 transition-colors duration-300 bg-black/10" />

      {secondaryLinks.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className={`relative text-[15px] font-bold transition-all duration-300 px-2.5 xl:px-4 py-4 rounded-sm font-body whitespace-nowrap ${
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

      <ServiceAreasDropdown
        ref={serviceAreasTriggerRef}
        isOpen={openDropdown === "ServiceAreas"}
        onEnter={() => onEnter("ServiceAreas")}
        onLeave={onLeave}
        onOpen={() => onOpen("ServiceAreas")}
        onClose={onClose}
        isActive={isActive}
        onViewAllClick={onViewAllClick}
        panelRef={serviceAreasPanelRef}
      />
    </nav>
  )
);
DesktopNav.displayName = "DesktopNav";
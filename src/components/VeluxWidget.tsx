import { useEffect, useRef } from "react";

const VELUX_SCRIPTS = {
  roofer: "https://veluxsolutions.com/installer-embed/velux-roofer.js",
  remodeler: "https://veluxsolutions.com/installer-embed/velux-remodeler.js",
} as const;

interface VeluxWidgetProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  className?: string;
  ctaText?: string;
  ctaLink?: string;
  variant?: keyof typeof VELUX_SCRIPTS;
}

/**
 * VELUX Website Widget (roofer version).
 * The vendor script scans for #velux-brochure on load, so in this SPA we
 * re-append the script each time the component mounts to force a re-render.
 */
const VeluxWidget = ({
  eyebrow = "VELUX Certified Installer",
  heading = "Explore VELUX Skylights",
  description = "Browse the current VELUX skylight and Sun Tunnel lineup, straight from the manufacturer — then tell us which rooms you want daylight in.",
  className = "section-padding bg-background border-t border-border/60",
  ctaText = "Request a Quote!",
  ctaLink = "https://highlandernc.com/contact",
  variant = "roofer",
}: VeluxWidgetProps) => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const scriptSrc = VELUX_SCRIPTS[variant];

    // Clear any markup left behind by a previous mount before re-initializing.
    host.innerHTML = "";
    const target = document.createElement("div");
    target.id = "velux-brochure";
    target.setAttribute("data-cta-link", ctaLink);
    target.setAttribute("data-cta-text", ctaText);
    target.setAttribute("data-installer-domain", "https://highlandernc.com/");
    host.appendChild(target);

    document
      .querySelectorAll(`script[src^="${scriptSrc}"]`)
      .forEach((existing) => existing.remove());

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      host.innerHTML = "";
    };
  }, [ctaLink, ctaText, variant]);

  return (
    <section className={className}>
      <div className="container-tight">
        <div className="max-w-2xl mb-8">
          <div className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
            {eyebrow}
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">{heading}</h2>
          <p className="text-foreground/75 leading-relaxed">{description}</p>
        </div>
        <div ref={hostRef} />
      </div>
    </section>
  );
};

export default VeluxWidget;

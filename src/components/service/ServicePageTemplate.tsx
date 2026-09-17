import { Children, Fragment, isValidElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Canonical service page skeleton.
 *
 * All twelve service pages share this one order. Slots may be omitted,
 * but they can never be reordered — the template, not the page, owns the
 * sequence. Surface tone alternates automatically so no two rendered
 * sections share a background.
 *
 *   hero → quickAnswer → whatWeDo → whatsIncluded → costContext →
 *   process → proof → faq → coverage → cta
 */
export const SERVICE_SECTION_ORDER = [
  "hero",
  "quickAnswer",
  "whatWeDo",
  "whatsIncluded",
  "costContext",
  "process",
  "proof",
  "faq",
  "coverage",
  "cta",
] as const;

export type ServiceSectionKey = (typeof SERVICE_SECTION_ORDER)[number];

export type ServicePageTemplateProps = Partial<Record<ServiceSectionKey, ReactNode>> & {
  /** Rendered above the hero (breadcrumbs, page context, sticky bars). */
  beforeHero?: ReactNode;
  /** Rendered after the closing CTA, outside the ordered skeleton (widgets, trust bands). */
  afterCta?: ReactNode;
  className?: string;
  /** Disable automatic surface alternation when a page ships its own tones. */
  alternateSurfaces?: boolean;
};

/** Alternating tones applied to the slots between hero and cta. */
const TONES = ["bg-background", "bg-secondary"];

const hasContent = (node: ReactNode) =>
  Children.toArray(node).some((child) => (isValidElement(child) ? true : child !== null && child !== ""));

const ServicePageTemplate = ({
  beforeHero,
  afterCta,
  className,
  alternateSurfaces = true,
  ...slots
}: ServicePageTemplateProps) => {
  let toneIndex = 0;

  return (
    <main id="main-content" className={cn("min-h-dvh", className)}>
      {beforeHero}
      {SERVICE_SECTION_ORDER.map((key) => {
        const node = slots[key];
        if (!hasContent(node)) return null;

        // Hero and CTA carry their own full-bleed treatments.
        if (key === "hero" || key === "cta" || !alternateSurfaces) {
          return <Fragment key={key}>{node}</Fragment>;
        }

        const tone = TONES[toneIndex % TONES.length];
        toneIndex += 1;

        return (
          <div key={key} data-service-section={key} className={tone}>
            {node}
          </div>
        );
      })}
      {afterCta}
    </main>
  );
};

export default ServicePageTemplate;

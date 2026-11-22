import { ArrowDown, Phone } from "lucide-react";
import HeroImage from "@/components/media/HeroImage";
import { BUSINESS, LICENSE_NUMBER, PHONE_DISPLAY, PHONE_TEL, REVIEW_STARS } from "@/data/business";
import type { HeroContent } from "@/content/construction/types";

export const FORM_ANCHOR = "written-scope-form";

/** Rating, licence and founding year, all read from business.ts. */
export const constructionTrustLine = () =>
  [`${REVIEW_STARS} Google`, LICENSE_NUMBER, `Family-owned in Franklin since ${BUSINESS.foundingYear}`];

export const CALL_MICROCOPY = "Call to ask what your project might cost. We'll tell you straight if it's a fit.";

/**
 * Template hero (plan §3.2.1): one real photo (eager, high priority), the H1,
 * a one-sentence subhead, the call button first, "Get My Written Scope"
 * second (scrolls to the form at the bottom), and the trust line.
 */
const ConstructionHero = ({ hero }: { hero: HeroContent }) => (
  <section className="relative isolate flex min-h-[560px] items-end overflow-hidden md:min-h-[620px]">
    <div className="absolute inset-0 -z-10">
      <HeroImage
        src={hero.image.src}
        avifSrcSet={hero.image.avifSrcSet}
        webpSrcSet={hero.image.webpSrcSet}
        width={hero.image.width}
        height={hero.image.height}
        alt={hero.image.alt}
        className="h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.92)] via-[hsl(var(--hero-overlay)/0.55)] to-[hsl(var(--hero-overlay)/0.15)]" />
    </div>
    <div className="container-tight w-full pb-10 pt-28 md:pb-16">
      <h1 className="max-w-3xl font-heading text-[2rem] font-bold leading-[1.05] tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
        {hero.h1}
      </h1>
      <p className="mt-4 max-w-2xl font-body text-body md:text-body-lg font-semibold leading-snug text-white/95 drop-shadow">
        {hero.subhead}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href={PHONE_TEL} data-gtm-location="construction_hero" className="btn btn-primary btn-lg">
          <Phone className="h-4 w-4" aria-hidden="true" /> Call {PHONE_DISPLAY}
        </a>
        <a href={`#${FORM_ANCHOR}`} data-gtm-location="construction_hero_scope" className="btn btn-secondary btn-lg btn-on-dark">
          Get My Written Scope <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <p className="mt-3 max-w-xl font-body text-body-xs text-white/85">{CALL_MICROCOPY}</p>
      <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-body text-caption font-bold uppercase tracking-[0.1em] text-primary-foreground">
        {constructionTrustLine().map((item, i) => (
          <span key={item} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-white/40" />}
            <span className={i === 0 ? "text-[hsl(var(--highland-gold))]" : undefined}>{item}</span>
          </span>
        ))}
      </p>
    </div>
  </section>
);

export default ConstructionHero;

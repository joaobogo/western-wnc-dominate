import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import GalleryImage from "@/components/media/GalleryImage";
import { projectDetails } from "@/data/projects";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/** Homepage order: the newest documented jobs lead; anything not listed follows in data order. */
const FEATURED_ORDER = [
  "brava-synthetic-shake-glenville",
  "living-room-addition-franklin",
  "standing-seam-metal-dark-bronze-highlands",
];
const rank = (slug: string) => {
  const i = FEATURED_ORDER.indexOf(slug);
  return i === -1 ? FEATURED_ORDER.length : i;
};

const projects = [...projectDetails].sort((a, b) => rank(a.slug) - rank(b.slug)).map((project) => ({
  slug: project.slug,
  title: project.title,
  location: project.location,
  elevation: project.elevation ?? "Western NC",
  category: project.type,
  type: project.category,
  outcome: project.highlight,
  image: project.cardImage ?? project.heroImage,
  imagePosition: project.cardImage ? undefined : project.heroPosition,
  // Carousel cards share one size; the old 2×2 "hero" tile belonged to a grid layout.
  size: "standard" as "hero" | "standard",
}));

const projectTypes = Array.from(new Set(projects.map((project) => project.type)));
const filters = [
  { label: "All", value: "all" },
  ...projectTypes.map((type) => ({
    label: type === "roofing" ? "Roofing" : "Construction",
    value: type,
  })),
];

const ProjectCard = ({ project, index }: { project: (typeof projects)[number]; index: number }) => {
  const isHero = project.size === "hero";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: Math.min(index * 0.04, 0.2), duration: 0.4, ease: HIGHLAND_EASE }}
      className={`group relative overflow-hidden rounded-none cursor-pointer ${
        isHero ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <Link to={`/projects/${project.slug}`} className="block relative h-full">
        <div className={`relative overflow-hidden bg-muted aspect-project`}>
          <GalleryImage
            width={1200}
            height={900}
            src={project.image}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={`${project.title} — ${project.category} project by Highlander Building Services in ${project.location}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] will-change-transform"
            style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
          />

          <div aria-hidden="true" className="absolute inset-0 bg-scrim-bottom opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
          <div
            className="absolute bottom-0 left-0 w-0 group-hover:w-2/3 h-[2px] bg-gradient-to-r from-[hsl(var(--highland-gold))] to-[hsl(var(--highland-gold)/0)] transition-all duration-700 z-20"
            style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
          />

          <div className="absolute top-4 md:top-5 left-4 md:left-6 z-10">
            <span className="text-caption font-body font-bold uppercase tracking-[0.18em] text-white bg-[hsl(var(--heritage-charcoal)/0.55)] backdrop-blur-md border border-white/20 px-3 py-1.5 group-hover:border-[hsl(var(--highland-gold)/0.5)] transition-all duration-500">
              {project.category}
            </span>
          </div>

          <div className="absolute top-4 md:top-5 right-4 md:right-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
            <span className="text-caption font-body font-semibold tracking-[0.12em] text-[hsl(var(--gold-ink))] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              ▲ {project.elevation}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-10">
            <div className="flex items-center gap-1.5 mb-2.5">
              <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
              <span className="text-caption font-body font-semibold uppercase tracking-[0.15em] text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
                {project.location}
              </span>
            </div>

            <h3
              className={`font-heading font-bold text-white leading-[1.1] tracking-tight mb-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] group-hover:text-[hsl(var(--highland-gold-light))] transition-colors duration-500 ${
                isHero ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"
              }`}
            >
              {project.title}
            </h3>

            <div className="max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-700" style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
              <p className="text-white text-body-sm md:text-body-sm font-body leading-relaxed mt-3 pr-12 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] font-bold">
                {project.outcome}
              </p>
            </div>
          </div>

          <div className="absolute bottom-5 md:bottom-7 right-5 md:right-7 z-10">
            <div className="w-10 h-10 rounded-none border border-white/0 group-hover:border-[hsl(var(--highland-gold)/0.3)] bg-transparent group-hover:bg-[hsl(var(--highland-gold)/0.08)] backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <ArrowUpRight className="w-4 h-4 text-white/95 group-hover:text-[hsl(var(--gold-ink))] transition-colors" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const FeaturedProjects = ({
  location,
  excludeImages = [],
}: {
  location?: string;
  /** Photos already shown elsewhere on the page; cards using them are skipped so no photo repeats. */
  excludeImages?: string[];
}) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const matchesLocation = (loc: string) =>
    !!location && (loc.includes(location) || loc.includes(location.split(",")[0]));

  const available = projects.filter((project) => !excludeImages.includes(project.image));
  const byFilter =
    activeFilter === "all"
      ? available
      : available.filter((project) => project.type === activeFilter);

  const displayProjects = location
    ? [...byFilter].sort(
        (a, b) => Number(matchesLocation(b.location)) - Number(matchesLocation(a.location)),
      )
    : byFilter;

  return (
    <section
      className="section-padding bg-background relative overflow-hidden"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 1100px" }}
    >
      <div className="absolute inset-0 tartan-bg opacity-10" />

      <div className="container-tight relative z-10" id="projects">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <ScrollReveal variant="fade">
              <span className="eyebrow mb-3 block">Documented Work</span>
            </ScrollReveal>
            <HeadingReveal delay={0.1}>
              <h2 className="section-heading mb-3">
                Project Stories With
                <span className="text-[hsl(var(--gold-ink))]"> Real Scope.</span>
              </h2>
            </HeadingReveal>
            <ScrollReveal variant="rise-subtle" delay={0.2}>
              <p className="text-muted-foreground text-body-sm font-body max-w-md leading-relaxed">
                Each card below has its own Highlander project record with location, scope, materials, and project details.
              </p>
            </ScrollReveal>
          </div>

          {filters.length > 2 && (
            <ScrollReveal variant="rise-subtle" delay={0.25}>
              <div className="flex gap-1.5">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`text-caption font-body font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-none transition-all duration-300 ${
                      activeFilter === filter.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-transparent border border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>

        <div
          className="flex overflow-x-auto pb-8 gap-4 snap-x snap-mandatory scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {displayProjects.map((project, index) => (
            <div key={project.slug} className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] snap-start">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <GoldLine width="3rem" centered delay={0.2} className="mb-6" />
          <Link
            to="/recent-projects"
            className="group inline-flex min-h-[44px] items-center gap-2.5 font-heading font-bold text-body-xs tracking-wide text-foreground hover:text-[hsl(var(--gold-ink))] transition-colors duration-300"
          >
            View the Full Project Library
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
          <p className="text-body-xs text-foreground font-body font-semibold mt-3">
            Only documented project stories link as case studies.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;

import { useParams, Link } from "react-router-dom";
import GalleryImage from "@/components/media/GalleryImage";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Phone, MapPin, Calendar, Ruler, Mountain,
  CheckCircle, Quote,
} from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ReassuranceBlock, TrustSidebar } from "@/components/trust";
import { BeforeAfterSlider } from "@/components/BeforeAfterShowcase";
import { getProjectBySlug, projectDetails } from "@/data/projects";
import ProjectLocationCTA from "@/components/projects/ProjectLocationCTA";
import { linkableBlogPosts } from "@/data/blogs";
import { getProjectServiceTags, getTownPath } from "@/lib/project-service-tags";
import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";

const HIGHLAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.4, ease: HIGHLAND_EASE },
};

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");

  if (!project) {
    return (
      <>
        <Header />
        <main id="main-content" className="section-padding section-dark pt-8 md:pt-12 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4">Project Not Found</h1>
            <p className="text-dark-section-muted mb-6">The project you're looking for doesn't exist or has been moved.</p>
            <Link to="/recent-projects" className="btn btn-primary btn-sm">
              View All Projects <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const related = projectDetails
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  // A photo appears once per page: the gallery skips anything already shown in
  // the hero, the before/after slider, or a related-project card.
  const shownElsewhere = new Set<string>([
    project.heroImage,
    ...(project.beforeAfter ? [project.beforeAfter.before, project.beforeAfter.after] : []),
    ...related.map((r) => r.cardImage ?? r.heroImage),
  ]);
  const galleryExtras = Array.from(new Set(project.galleryImages)).filter((img) => !shownElsewhere.has(img));
  const { path: townPath } = getTownPath(project.location);
  const serviceTag = getProjectServiceTags(project.type, project.category)[0];
  const relatedPosts = linkableBlogPosts()
    .filter(
      (b) =>
        b.category.toLowerCase().includes(project.type.toLowerCase()) ||
        (b.town !== undefined && project.location.includes(b.town)) ||
        b.category === (project.category === "roofing" ? "Materials" : "Construction"),
    )
    .slice(0, 3);

  return (
    <>
      <SEOHead
        title={project.seo.title}
        description={project.seo.description}
        path={`/projects/${project.slug}`}
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Recent Projects", url: "/recent-projects" },
          { name: project.title, url: `/projects/${project.slug}` },
        ])}
      />
      <Header />
      <PageBreadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Recent Projects", url: "/recent-projects" },
          { name: project.title, url: `/projects/${project.slug}` },
        ]}
      />
      <main id="main-content">
        {/* Hero (Nov 18 2026 rebuild): the photo is shown whole in a frame
            instead of a dark, cropped full-width strip, and the section opts
            out of the global header padding (the breadcrumbs already clear
            the fixed header, so the old hero sat below a ~170 px empty band). */}
        <section className="no-header-pad pt-0 bg-secondary/40 border-b border-border/60" aria-labelledby="project-title">
          <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 md:py-12 grid gap-6 md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
            <figure className="lg:order-2 relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-muted shadow-flat">
              <img
                src={project.heroImage}
                alt={`${project.title}, ${project.location}`}
                width={1600}
                height={1200}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
                style={project.heroPosition ? { objectPosition: project.heroPosition } : undefined}
              />
            </figure>

            <div className="lg:order-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-caption md:text-body-xs font-body font-bold uppercase tracking-wider text-primary-foreground bg-primary px-3 py-1.5 rounded-sm">
                  {project.type}
                </span>
                <span className="text-foreground text-body-sm font-body font-medium flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" /> {project.location}
                </span>
              </div>
              <h1 id="project-title" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-4">
                {project.title}
              </h1>
              <p className="text-body md:text-body-lg text-muted-foreground font-body leading-relaxed mb-6 max-w-[55ch]">
                {project.highlight}
              </p>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                {[
                  { icon: Ruler, label: "Scope", value: project.scope },
                  { icon: Calendar, label: "Duration", value: project.duration },
                  ...(project.elevation ? [{ icon: Mountain, label: "Elevation", value: `${project.elevation}` }] : []),
                  { icon: MapPin, label: "County", value: project.county },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3 bg-background border border-border rounded-sm px-4 py-3">
                    <Icon className="w-4 h-4 mt-1 shrink-0 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                    <div>
                      <dt className="text-caption font-body font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</dt>
                      <dd className="font-body font-semibold text-foreground text-body-sm leading-snug">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <div className="grid sm:grid-cols-2 gap-3 max-w-xl">
                <Link to="/request-inspection?context=project_detail" className="btn btn-primary btn-sm w-full whitespace-nowrap">
                  Request My Estimate <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <a href={PHONE_TEL} className="btn btn-secondary btn-sm w-full whitespace-nowrap">
                  <Phone className="w-4 h-4" aria-hidden="true" /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 1 — Outcome first: what the homeowner actually got. */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div {...fadeUp}>
                <span className="eyebrow mb-4 block">The Outcome</span>
                <p className="text-foreground text-xl md:text-2xl font-heading leading-relaxed">
                  {project.result}
                </p>
                {project.testimonial && (
                  <div className="mt-10 bg-secondary/40 p-8 md:p-10 border border-border relative text-left">
                    <Quote className="absolute top-6 left-6 w-6 h-6 text-primary/10" aria-hidden="true" />
                    <p className="text-lg md:text-xl font-body italic text-foreground mb-6 leading-relaxed relative z-10">
                      "{project.testimonial.quote}"
                    </p>
                    <div className="flex flex-col items-center">
                      <span className="font-heading font-bold text-lg text-foreground">{project.testimonial.name}</span>
                      <span className="text-sm text-muted-foreground uppercase tracking-widest">{project.testimonial.location}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2 — The photos, right after the outcome. */}
        {project.beforeAfter && (
          <section className="section-padding bg-secondary/30 border-y border-border/60">
            <div className="container-tight">
              <motion.div {...fadeUp} className="text-center mb-10">
                <span className="eyebrow mb-3 block">Before & After</span>
                <h2 className="section-heading mb-4">The Transformation</h2>
                <p className="text-muted-foreground max-w-xl mx-auto text-sm">Drag the slider to compare.</p>
              </motion.div>
              <div className="max-w-4xl mx-auto">
                <BeforeAfterSlider
                  before={project.beforeAfter.before}
                  after={project.beforeAfter.after}
                  beforeLabel={project.beforeAfter.beforeLabel}
                  afterLabel={project.beforeAfter.afterLabel}
                />
                <div className="grid md:grid-cols-3 gap-5 mt-8">
                  {[
                    { h: "What Changed", t: project.beforeAfter.whatChanged },
                    { h: "Why It Mattered", t: project.beforeAfter.whyItMattered },
                    { h: "The Highlander Difference", t: project.beforeAfter.highlanderDifference },
                  ].map((b) => (
                    <div key={b.h} className="bg-background border border-border rounded-sm p-5">
                      <h3 className="text-caption font-body font-bold uppercase tracking-wider text-[hsl(var(--gold-ink))] mb-2">{b.h}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{b.t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {galleryExtras.length > 0 && (
          <section className="section-padding bg-background">
            <div className="container-tight">
              <motion.div {...fadeUp} className="mb-8">
                <span className="eyebrow mb-3 block">Project Photos</span>
                <h2 className="section-heading">More From This Project</h2>
              </motion.div>
              <div className={`grid gap-4 ${galleryExtras.length === 1 ? "max-w-3xl" : galleryExtras.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                {galleryExtras.map((img, i) => (
                  <div key={img} className="aspect-[4/3] rounded-sm overflow-hidden border border-border bg-muted">
                    <GalleryImage width={1600} height={1200} decoding="async" sizes="(max-width: 640px) 100vw, 33vw"
                      src={img}
                      alt={`${project.title}, ${project.location}: photo ${i + 2}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 3 — The story, with the facts and next step beside it. */}
        <section className="section-padding bg-secondary/20 border-t border-border/60">
          <div className="container-tight">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
              <div className="lg:col-span-2 space-y-14">
                <motion.div {...fadeUp}>
                  <span className="eyebrow mb-4 block">Project Summary</span>
                  <h2 className="section-heading mb-6">Inside the Project</h2>
                  <p className="text-foreground leading-relaxed text-lg font-body max-w-[65ch]">
                    {project.summary}
                  </p>
                </motion.div>

                <motion.div {...fadeUp}>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-5">The Challenge</h3>
                  <p className="text-foreground/90 leading-relaxed text-lg font-body border-l-4 border-[hsl(var(--highland-gold)/0.6)] pl-6 max-w-[65ch]">
                    {project.challenge}
                  </p>
                </motion.div>

                <motion.div {...fadeUp}>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-5">Work Performed</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {project.scopeOfWork.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 bg-background border border-border rounded-sm p-4 text-foreground/90 font-body text-body-sm leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div {...fadeUp}>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-5">Materials & Systems</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.materials.map((mat) => (
                      <div key={mat.name} className="p-5 border border-border bg-background rounded-sm">
                        <h4 className="font-heading font-bold text-foreground text-lg leading-snug mb-1">{mat.name}</h4>
                        <p className="text-muted-foreground text-sm font-body">{mat.detail}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div {...fadeUp}>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-5">How the Work Was Done</h3>
                  <ol className="space-y-3">
                    {project.processHighlights.map((highlight, i) => (
                      <li key={i} className="flex gap-4 p-5 bg-background border border-border rounded-sm">
                        <span className="text-xl font-heading font-bold text-primary w-6 shrink-0">{i + 1}</span>
                        <p className="text-foreground font-body text-body-sm leading-relaxed">{highlight}</p>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              </div>

              <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start" aria-label="Project details">
                <div className="bg-background border border-border rounded-sm p-5 md:p-6">
                  <h2 className="font-heading font-bold text-body text-foreground mb-4">Project Details</h2>
                  <dl className="space-y-3 text-sm font-body">
                    {[
                      { k: "Location", v: townPath ? <Link to={townPath} className="font-semibold text-primary hover:underline">{project.location}</Link> : project.location },
                      { k: "County", v: project.county },
                      ...(project.elevation ? [{ k: "Elevation", v: project.elevation }] : []),
                      { k: "Service", v: <Link to={serviceTag.path} className="font-semibold text-primary hover:underline">{project.type}</Link> },
                      { k: "Duration", v: project.duration },
                    ].map((row) => (
                      <div key={row.k} className="flex justify-between gap-4 border-b border-border/60 pb-2 last:border-0 last:pb-0">
                        <dt className="text-muted-foreground">{row.k}</dt>
                        <dd className="font-semibold text-foreground text-right">{row.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <TrustSidebar />
              </aside>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <ProjectLocationCTA
              location={project.location}
              type={project.type}
              category={project.category}
            />
          </div>
        </section>

        {related.length > 0 && (
          <section className="section-padding bg-secondary tartan-bg">
            <div className="container-tight">
              <motion.div {...fadeUp} className="text-center mb-12">
                <span className="eyebrow mb-3 block">More {project.category === "roofing" ? "Roofing" : "Construction"} Projects</span>
                <h2 className="section-heading mb-4">Related Work</h2>
              </motion.div>
              <div className={`grid gap-5 ${related.length === 1 ? "max-w-md mx-auto" : related.length === 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-3"}`}>
                {related.map((rel) => (
                  <Link key={rel.slug} to={`/projects/${rel.slug}`} className="group block bg-background border border-border rounded-sm overflow-hidden hover:border-primary/40 transition-colors">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <GalleryImage width={1600} height={1200} decoding="async" sizes="(max-width: 640px) 100vw, 33vw"
                        src={rel.cardImage ?? rel.heroImage}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-caption font-body font-semibold uppercase tracking-wider text-[hsl(var(--gold-ink))] mb-1 block">{rel.type}</span>
                      <h3 className="font-heading font-bold text-xl leading-snug text-foreground group-hover:text-primary transition-colors mb-2">{rel.title}</h3>
                      <p className="text-muted-foreground text-sm font-body flex items-center gap-1">
                        <MapPin className="w-4 h-4" aria-hidden="true" /> {rel.location}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  to="/recent-projects"
                  className="group inline-flex items-center gap-2 font-heading font-bold text-body-xs tracking-wide text-foreground hover:text-[hsl(var(--gold-ink))] transition-colors duration-300"
                >
                  View Full Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="section-padding bg-background">
            <div className="container-tight">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <span className="eyebrow mb-2 block">Related Reading</span>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">From the Highlander blog</h2>
                </div>
                <Link to="/blog" className="text-sm font-heading font-bold text-primary hover:underline flex items-center gap-1 shrink-0">
                  All articles <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group block p-6 bg-secondary/30 border border-border rounded-sm hover:border-primary/30 transition-colors"
                  >
                    <span className="text-caption font-bold uppercase tracking-widest text-primary mb-3 block">{post.category}</span>
                    <h3 className="font-heading font-bold text-lg leading-snug text-foreground group-hover:text-primary transition-colors mb-3">{post.title}</h3>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      Read the article <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <ReassuranceBlock
          headline={"Your Project Could Be\nOur Next Showcase."}
          subheadline="Schedule a consultation and let's discuss what's possible for your property."
          ctaText="Get My Project Scoped"
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ProjectDetailPage;

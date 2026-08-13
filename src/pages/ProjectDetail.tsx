import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Phone, MapPin, Calendar, Ruler, Mountain,
  CheckCircle, Star, Quote,
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
import { blogPosts } from "@/data/blogs";

const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease: HIGHLAND_EASE },
};

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");

  if (!project) {
    return (
      <>
        <Header />
        <main id="main-content" className="section-padding section-dark pt-32 md:pt-40 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4">Project Not Found</h1>
            <p className="text-[hsl(var(--dark-section-foreground)/0.6)] mb-6">The project you're looking for doesn't exist or has been moved.</p>
            <Link to="/recent-projects" className="cta-gradient text-accent-foreground font-bold px-6 py-3 rounded-sm inline-flex items-center gap-2">
              View All Projects <ArrowRight className="w-4 h-4" />
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
        <section className="relative pt-20 md:pt-24">
          <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
            <motion.img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: HIGHLAND_EASE }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.7)] via-[hsl(var(--heritage-charcoal)/0.15)] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
              <div className="container-tight">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="mb-6 flex items-center gap-3"
                >
                  <div className="h-px w-8 bg-[hsl(var(--highland-gold)/0.4)]" />
                  <span className="text-caption font-heading font-bold text-white tracking-[0.2em] uppercase">Highlander Project</span>
                </motion.div>
                <nav className="flex items-center gap-2 text-white/85 text-sm font-body mb-4">
                  <Link to="/recent-projects" className="hover:text-white transition-colors flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Projects
                  </Link>
                  <span>/</span>
                  <span className="text-white/90">{project.type}</span>
                </nav>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-caption md:text-body-xs font-body font-bold uppercase tracking-wider text-[hsl(var(--gold-ink))] bg-[hsl(var(--highland-gold)/0.2)] backdrop-blur-sm px-3.5 py-1.5 rounded-sm">
                    {project.type}
                  </span>
                  <span className="text-white/95 text-sm font-body flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3 h-3" /> {project.location}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-3 leading-tight">
                  {project.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/85 text-sm font-body">
                  <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5" /> {project.scope}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {project.duration}</span>
                  {project.elevation && (
                    <span className="flex items-center gap-1.5"><Mountain className="w-3.5 h-3.5" /> {project.elevation} elevation</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
              <div className="lg:col-span-2">
                <motion.div {...fadeUp}>
                  <span className="eyebrow mb-4 block">Project Summary</span>
                  <h2 className="section-heading mb-6">{project.highlight}</h2>
                  <div className="w-16 h-1 bg-[hsl(var(--highland-gold)/0.6)] mb-8" />
                  <p className="text-foreground leading-relaxed text-lg md:text-xl font-medium max-w-[65ch] mb-8">
                    {project.summary}
                  </p>
                </motion.div>

                <motion.div {...fadeUp} className="mt-16 bg-secondary/30 p-8 md:p-12 border border-border">
                  <span className="eyebrow mb-4 block">Detailed Scope</span>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">What We Delivered</h3>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {project.scopeOfWork.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1.5" />
                        <span className="text-foreground/90 text-base leading-snug font-bold italic">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div {...fadeUp} className="mt-16">
                  <span className="eyebrow mb-4 block text-[hsl(var(--gold-ink))]">The Challenge</span>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">Mountain Conditions & Technical Hurdles</h3>
                  <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-6" />
                  <p className="text-muted-foreground leading-relaxed text-lg font-medium italic border-l-4 border-border pl-6">
                    {project.challenge}
                  </p>
                </motion.div>

                <motion.div {...fadeUp} className="mt-16">
                  <span className="eyebrow mb-4 block">Materials & Systems</span>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">What We Used</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.materials.map((mat) => (
                      <div key={mat.name} className="p-5 border border-border bg-card">
                        <h4 className="font-heading font-bold text-foreground mb-1">{mat.name}</h4>
                        <p className="text-muted-foreground text-sm font-medium">{mat.detail}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div {...fadeUp} className="mt-16">
                  <span className="eyebrow mb-4 block">Process Highlights</span>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">Execution & Quality Control</h3>
                  <div className="space-y-4">
                    {project.processHighlights.map((highlight, i) => (
                      <div key={i} className="flex gap-4 p-5 bg-secondary/20 border border-border/50">
                        <span className="text-2xl font-heading font-bold text-primary/80">{String(i + 1).padStart(2, '0')}</span>
                        <p className="text-foreground font-medium italic">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Location-aware CTA + service tags */}
                <ProjectLocationCTA
                  location={project.location}
                  type={project.type}
                  category={project.category}
                  className="mt-16"
                />
              </div>

              <div className="space-y-6">
                <motion.div {...fadeUp} className="bg-card border border-border rounded-sm p-5 md:p-6">
                  <h4 className="font-heading font-semibold text-sm text-foreground mb-4">Project Details</h4>
                  <div className="w-8 h-px bg-[hsl(var(--highland-gold)/0.3)] mb-4" />
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Location</span><Link to={`/service-areas/${project.location.toLowerCase().replace(', nc', '').replace(' ', '-')}`} className="font-medium text-primary hover:underline">{project.location}</Link></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">County</span><span className="font-medium text-foreground">{project.county}</span></div>
                    {project.elevation && <div className="flex justify-between"><span className="text-muted-foreground">Elevation</span><span className="font-medium text-foreground">{project.elevation}</span></div>}
                    <div className="flex justify-between"><span className="text-muted-foreground">Scope</span><span className="font-medium text-foreground">{project.scope}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium text-foreground">{project.duration}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Category</span><Link to={project.category === 'roofing' ? '/roofing' : '/construction'} className="font-medium text-primary hover:underline capitalize">{project.category}</Link></div>
                  </div>
                </motion.div>

                <TrustSidebar />

                <motion.div {...fadeUp} className="bg-secondary/50 border border-border rounded-sm p-5">
                   <h4 className="text-caption md:text-body-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Service Expertise</h4>
                   <Link to={project.category === 'roofing' ? '/roofing/roof-replacement' : '/construction/additions'} className="group flex items-center justify-between text-sm font-heading font-bold text-foreground hover:text-primary transition-colors">
                      View {project.type} Solutions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </Link>
                </motion.div>

                <div className="bg-primary rounded-sm p-5 md:p-6 text-center">
                  <h4 className="font-heading font-semibold text-primary-foreground mb-2">Want Results Like This?</h4>
                  <p className="text-primary-foreground/85 text-sm mb-4">Schedule a consultation in {project.location} and let's discuss your project.</p>
                  <Link to="/consultation" className="cta-gradient text-accent-foreground font-bold px-5 py-3 rounded-sm inline-flex items-center gap-2 text-sm hover:opacity-90 transition-opacity w-full justify-center">
                    Discuss Your Project <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {project.beforeAfter && (
          <section className="section-padding bg-background">
            <div className="container-tight">
              <motion.div {...fadeUp} className="text-center mb-12">
                <span className="eyebrow mb-3 block">Before & After</span>
                <h2 className="section-heading mb-4">The Transformation</h2>
                <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
                <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                  Drag the slider to compare. Every detail represents hours of careful planning and precise execution.
                </p>
              </motion.div>
              <div className="max-w-4xl mx-auto">
                <BeforeAfterSlider
                  before={project.beforeAfter.before}
                  after={project.beforeAfter.after}
                  beforeLabel={project.beforeAfter.beforeLabel}
                  afterLabel={project.beforeAfter.afterLabel}
                />
                <div className="grid md:grid-cols-3 gap-5 mt-8">
                  <div className="bg-secondary/60 rounded-sm p-5">
                    <h4 className="text-caption font-body font-semibold uppercase tracking-wider text-[hsl(var(--gold-ink))] mb-2">What Changed</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.beforeAfter.whatChanged}</p>
                  </div>
                  <div className="bg-secondary/60 rounded-sm p-5">
                    <h4 className="text-caption font-body font-semibold uppercase tracking-wider text-[hsl(var(--gold-ink))] mb-2">Why It Mattered</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.beforeAfter.whyItMattered}</p>
                  </div>
                  <div className="bg-secondary/60 rounded-sm p-5">
                    <h4 className="text-caption font-body font-semibold uppercase tracking-wider text-[hsl(var(--gold-ink))] mb-2">The Highlander Difference</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.beforeAfter.highlanderDifference}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="bg-primary py-10 md:py-12 relative overflow-hidden">
          <div className="container-tight text-center px-5 md:px-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
              <div className="text-center sm:text-left">
                <p className="text-primary-foreground font-heading font-semibold text-lg mb-1">
                  Inspired by this project?
                </p>
                <p className="text-primary-foreground/85 text-sm font-body">
                  Let's discuss how we can deliver the same level of quality for your property.
                </p>
              </div>
              <Link
                to="/consultation"
                className="cta-gradient text-accent-foreground font-bold px-6 py-3 rounded-sm inline-flex items-center gap-2 btn-primary-interactive flex-shrink-0"
              >
                <Phone className="w-4 h-4" /> Discuss Your Project
              </Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-secondary/20">
          <div className="container-tight">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div {...fadeUp}>
                <span className="eyebrow mb-4 block">The Result</span>
                <h2 className="section-heading mb-8">Long-Term Protection Secured</h2>
                <div className="w-16 h-1 bg-primary mx-auto mb-8" />
                <p className="text-foreground text-xl md:text-2xl font-heading leading-relaxed mb-10 italic">
                  "{project.result}"
                </p>
                {project.testimonial && (
                   <div className="bg-background p-8 md:p-12 border border-border shadow-sm relative text-left">
                      <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/10" />
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

        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="mt-20 pt-12 border-t border-border text-left">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="eyebrow mb-2 block text-primary">Mountain Guidance</span>
                  <h3 className="text-2xl font-heading font-bold text-foreground">Related Knowledge Hub</h3>
                </div>
                <Link to="/blog" className="text-sm font-heading font-bold text-primary hover:underline flex items-center gap-1">
                  Knowledge Hub <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts
                  .filter(b => b.category.toLowerCase().includes(project.type.toLowerCase()) || 
                             (project.location.includes(b.town || "") && b.town !== undefined) ||
                             b.category === (project.category === "roofing" ? "Materials" : "Construction"))
                  .slice(0, 3)
                  .map(post => (
                    <Link 
                      key={post.slug} 
                      to={`/blog/${post.slug}`}
                      className="group block p-6 bg-secondary/30 border border-border hover:border-primary/20 transition-all"
                    >
                      <span className="text-caption font-bold uppercase tracking-widest text-primary mb-3 block">{post.category}</span>
                      <h4 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">{post.title}</h4>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        Read Guidance <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  ))}
              </div>
            </div>

            <div className="mt-16 p-8 bg-secondary/50 border border-border text-left">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-heading font-bold text-foreground text-lg mb-2">Serving {project.location} and {project.county}</h4>
                  <p className="text-muted-foreground text-sm max-w-xl">
                    We've completed numerous projects in this area. Our crews understand the local building codes, 
                    elevation challenges, and weather patterns unique to this part of Western North Carolina.
                  </p>
                </div>
                <Link 
                  to={`/service-areas/${project.location.split(',')[0].toLowerCase().trim().replace(/\s+/g, '-')}-nc`}
                  className="cta-gradient text-accent-foreground font-bold px-6 py-3 rounded-sm whitespace-nowrap"
                >
                  View Local Service Page
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-12">
              <span className="eyebrow mb-3 block">Project Gallery</span>
              <h2 className="section-heading mb-4">More From This Project</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto" />
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="aspect-[4/3] rounded-sm overflow-hidden group"
                >
                  <img width={1600} height={1067} decoding="async"
                    src={img}
                    alt={`${project.title} — view ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="section-padding bg-secondary tartan-bg">
            <div className="container-tight">
              <motion.div {...fadeUp} className="text-center mb-12">
                <span className="eyebrow mb-3 block">More {project.category === "roofing" ? "Roofing" : "Construction"} Projects</span>
                <h2 className="section-heading mb-4">Related Work</h2>
                <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto" />
              </motion.div>
              <div className="grid md:grid-cols-3 gap-5">
                {related.map((rel, i) => (
                  <motion.div
                    key={rel.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link to={`/projects/${rel.slug}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                        <img width={1600} height={1067} decoding="async"
                          src={rel.heroImage}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.5)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 left-0 w-0 group-hover:w-1/2 h-[2px] bg-gradient-to-r from-[hsl(var(--highland-gold))] to-transparent transition-all duration-700" />
                      </div>
                      <span className="text-caption font-body font-semibold uppercase tracking-wider text-[hsl(var(--gold-ink))] mb-1 block">{rel.type}</span>
                      <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{rel.title}</h3>
                      <p className="text-muted-foreground text-sm font-body flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {rel.location}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  to="/recent-projects"
                  className="group inline-flex items-center gap-2 font-heading font-bold text-body-xs tracking-wide text-foreground hover:text-[hsl(var(--gold-ink))] transition-colors duration-300"
                >
                  View Full Portfolio <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </section>
        )}

        <ReassuranceBlock
          headline={"Your Project Could Be\nOur Next Showcase."}
          subheadline="Schedule a consultation and let's discuss what's possible for your property."
          ctaText="Discuss Your Project"
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ProjectDetailPage;

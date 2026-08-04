import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Clock, Search, BookOpen, Zap, Mountain,
  Shield, Wrench, Home, CloudLightning, DollarSign, Newspaper,
  Calendar, TrendingUp, ChevronRight, Leaf, Snowflake, Sun, Wind,
} from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ReassuranceBlock } from "@/components/trust";
import { MountainContours, TextureOverlay } from "@/components/motion/BackgroundTexture";
import { blogPosts } from "@/data/blogs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/* ─── Category config ─── */
const categoryConfig: Record<string, { icon: typeof BookOpen; label: string; description: string; color: string }> = {
  All: { icon: BookOpen, label: "All Articles", description: "Browse our complete resource library", color: "primary" },
  Materials: { icon: Shield, label: "Material Guides", description: "Compare roofing & construction materials for mountain performance", color: "primary" },
  Storm: { icon: CloudLightning, label: "Storm Center", description: "Emergency guides, damage checklists, and insurance claim help", color: "accent" },
  Maintenance: { icon: Wrench, label: "Seasonal Care", description: "Seasonal checklists and preventive care for WNC homes", color: "primary" },
  Cost: { icon: DollarSign, label: "Cost & Planning", description: "Real numbers and transparent breakdowns for mountain projects", color: "primary" },
  Insurance: { icon: Shield, label: "Homeowner Guidance", description: "Navigate the claims process with confidence", color: "primary" },
  Replacement: { icon: Home, label: "Roofing Education", description: "When to replace, what to expect, and how to plan", color: "primary" },
  Tips: { icon: BookOpen, label: "Homeowner Tips", description: "Honest advice — no sales pitch, just guidance", color: "primary" },
  Inspections: { icon: Search, label: "Inspections", description: "What to expect and why inspections matter", color: "primary" },
  Financing: { icon: DollarSign, label: "Financing", description: "Affordable options for your roofing investment", color: "primary" },
  Commercial: { icon: Home, label: "Commercial", description: "Maintenance and solutions for commercial properties", color: "primary" },
  Construction: { icon: Home, label: "Construction Insights", description: "Planning, process, and guidance for mountain building projects", color: "primary" },
  Design: { icon: Mountain, label: "Design", description: "Floor plans, layouts, and pre-construction guidance", color: "primary" },

  Spotlight: { icon: Mountain, label: "Project Spotlights", description: "Deep dives into completed projects — materials, process, and results", color: "primary" },
};

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

const byNewest = (a: { date: string }, b: { date: string }) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const formatPostDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const isRecent = (date: string) =>
  Date.now() - new Date(`${date}T12:00:00`).getTime() < 1000 * 60 * 60 * 24 * 14;


/* Seasonal awareness */
const getSeasonalContext = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return { season: "Spring", icon: Leaf, tip: "Spring storms and hail season approaching — schedule your inspection now.", categories: ["Storm", "Maintenance", "Inspections"] };
  if (month >= 5 && month <= 7) return { season: "Summer", icon: Sun, tip: "Peak construction season. Book your project early for best scheduling.", categories: ["Construction", "Materials", "Cost"] };
  if (month >= 8 && month <= 10) return { season: "Fall", icon: Wind, tip: "Prepare your roof for winter. Last chance for pre-freeze repairs.", categories: ["Maintenance", "Replacement", "Tips"] };
  return { season: "Winter", icon: Snowflake, tip: "Ice dam prevention and emergency storm response. We prioritize emergency storm calls.", categories: ["Storm", "Maintenance", "Insurance"] };
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const seasonal = useMemo(getSeasonalContext, []);

  const filtered = blogPosts
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter(
      (p) =>
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice()
    .sort((a, b) => (sortOrder === "newest" ? byNewest(a, b) : byNewest(b, a)));

  const featuredPosts = blogPosts.slice().sort(byNewest).slice(0, 5);
  const heroFeatured = featuredPosts[0];
  const sideFeatured = featuredPosts.slice(1);
  const stormPosts = blogPosts.filter((p) => p.category === "Storm" || p.category === "Maintenance").sort(byNewest).slice(0, 4);
  const localPosts = blogPosts.filter((p) => p.town).sort(byNewest).slice(0, 4);
  const seasonalPosts = blogPosts.filter((p) => seasonal.categories.includes(p.category)).sort(byNewest).slice(0, 3);
  const showFeatured = activeCategory === "All" && !searchQuery;

  return (
    <>
      <SEOHead
        title="Roofing & Construction Blog | Western NC Guides"
        description="Expert roofing and construction guidance for Western North Carolina. Material comparisons, storm damage guides, maintenance tips, cost breakdowns, and local insights."
        path="/blog"
        jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }])}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }]} />
      <main>
        {/* ═══ HERO — Editorial masthead ═══ */}
        <section className="relative section-dark overflow-hidden">
          <div className="absolute inset-0 tartan-dark" />
          <MountainContours variant="dark" opacity={0.04} />
          <div className="relative z-10 pt-32 md:pt-40 pb-16 md:pb-20 md:px-8 lg:px-16">
            <div className="container-tight">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: HIGHLAND_EASE }}
                  className="lg:col-span-6"
                >
                  <div className="flex items-center gap-5 mb-8">
                    <div className="flex flex-col">
                      <span className="text-[16px] md:text-[18px] font-heading font-bold text-white tracking-[0.15em] uppercase">Highlander</span>
                      <span className="text-[11px] md:text-[12px] font-body font-bold text-[hsl(var(--highland-gold))] uppercase tracking-[0.2em]">Knowledge Base</span>
                    </div>
                    <div className="h-px w-12 bg-white/20" />
                  </div>
                  <div className="flex items-center gap-3 mb-5">
                    <BookOpen className="w-4 h-4 text-[hsl(var(--highland-gold)/0.9)]" />
                    <span className="text-[11px] md:text-[12px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold))]">Insights & Resources</span>
                  </div>
                  <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-5 leading-[0.95] tracking-tightest">
                    Mountain-Specific<br />
                    Knowledge You Can<br />
                    <span className="text-[hsl(var(--highland-gold))]">Actually Use.</span>
                  </h1>
                  <div className="w-16 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-5" />
                  <p className="text-body-lg md:text-body-xl text-white/85 leading-relaxed max-w-lg mb-8 font-medium drop-shadow-sm">
                    Written by the team that builds in these mountains every day. No filler,
                    no AI-generated fluff — just practical guidance for Western North Carolina homeowners.
                  </p>
                  {/* Search */}
                  <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--dark-section-foreground)/0.3)]" />
                    <input
                      aria-label="Search articles"
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 bg-[hsl(var(--dark-section-foreground)/0.06)] border border-[hsl(var(--dark-section-foreground)/0.15)] text-[hsl(var(--dark-section-foreground))] placeholder:text-[hsl(var(--dark-section-foreground)/0.45)] text-base font-body focus:outline-none focus:border-[hsl(var(--highland-gold)/0.4)] transition-colors rounded-sm shadow-inner"
                    />
                  </div>
                </motion.div>

                {/* Seasonal intelligence panel */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: HIGHLAND_EASE }}
                  className="lg:col-span-6"
                >
                  <div className="border border-[hsl(var(--highland-gold)/0.12)] bg-[hsl(var(--dark-section-foreground)/0.03)] p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center rounded-sm">
                        <seasonal.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                      </div>
                      <div>
                        <p className="text-[11px] md:text-[12px] font-body font-bold uppercase tracking-wider text-[hsl(var(--highland-gold))]">{seasonal.season} Advisory</p>
                        <p className="text-sm text-[hsl(var(--dark-section-foreground)/0.6)] font-body font-medium">Timely for WNC homeowners</p>
                      </div>
                    </div>
                    <p className="text-[hsl(var(--dark-section-foreground)/0.8)] text-base font-body leading-relaxed mb-4 font-medium">{seasonal.tip}</p>
                    <div className="space-y-2">
                      {seasonalPosts.map((post) => (
                        <Link
                          key={post.slug}
                          to={`/blog/${post.slug}`}
                          className="group flex items-center justify-between py-2 border-b border-[hsl(var(--dark-section-foreground)/0.06)] last:border-0"
                        >
                          <span className="text-[15px] text-[hsl(var(--dark-section-foreground)/0.7)] font-body font-bold group-hover:text-[hsl(var(--highland-gold))] transition-colors line-clamp-1 pr-2">{post.title}</span>
                          <ChevronRight className="w-3 h-3 text-[hsl(var(--dark-section-foreground)/0.2)] flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-[hsl(var(--dark-section-foreground)/0.5)] text-[13px] font-body font-bold">
                    <span>{blogPosts.length} articles</span>
                    <span>·</span>
                    <span>{categories.length - 1} categories</span>
                    <span>·</span>
                    <span>Updated monthly</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FEATURED — Hero + sidebar layout ═══ */}
        {showFeatured && heroFeatured && (
          <section className="section-padding bg-background">
            <div className="container-tight">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-[hsl(var(--highland-gold)/0.9)]" />
                  <span className="eyebrow">Latest Articles</span>
                </div>
                <div className="w-10 h-px bg-[hsl(var(--highland-gold)/0.4)] mt-3" />
              </motion.div>

              <div className="grid lg:grid-cols-12 gap-6">
                {/* Main featured */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-7"
                >
                  <Link to={`/blog/${heroFeatured.slug}`} className="group block card-premium overflow-hidden h-full">
                    <div className="relative aspect-[16/9] md:aspect-auto md:h-full overflow-hidden">
                      <img loading="eager" fetchPriority="high" decoding="async" 
                        src={heroFeatured.image || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=1000"} 
                        alt={heroFeatured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal))] via-[hsl(var(--heritage-charcoal)/0.4)] to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 lg:p-12">
                        <span className="text-[11px] font-body font-bold uppercase tracking-[0.18em] text-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.15)] px-3 py-1.5 mb-4 inline-block">
                          {heroFeatured.category}
                        </span>
                        <h3 className="font-heading font-bold text-foreground text-2xl md:text-3xl mb-4 group-hover:text-primary transition-colors leading-snug">
                          {heroFeatured.title}
                        </h3>
                        <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-lg">
                          {heroFeatured.excerpt}
                        </p>
                        <div className="flex items-center gap-5 text-sm text-white/90 font-bold mb-6">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {heroFeatured.readTime}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {heroFeatured.date}</span>
                          {heroFeatured.town && <span className="flex items-center gap-1"><Mountain className="w-3 h-3" /> {heroFeatured.town}</span>}
                        </div>
                        <span className="inline-flex items-center gap-2 text-primary font-heading font-bold text-sm group-hover:gap-3 transition-all">
                          Read Full Article <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Side featured */}
                <div className="lg:col-span-5 space-y-4">
                  {sideFeatured.map((post, i) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Link to={`/blog/${post.slug}`} className="group block card-premium overflow-hidden">
                        <div className="flex flex-col sm:flex-row h-full">
                          <div className="sm:w-32 md:w-40 shrink-0 overflow-hidden">
                            <img loading="lazy" decoding="async" 
                              src={post.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600"} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-5 md:p-6 flex-1">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 flex-wrap">
                              <span className="text-[10px] font-body font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-sm bg-primary/15 text-primary">
                                {post.category}
                              </span>
                              {isRecent(post.date) && (
                                <span className="text-[10px] font-body font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-sm bg-[hsl(var(--highland-gold)/0.16)] text-[hsl(var(--highland-gold))]">
                                  New
                                </span>
                              )}
                              <span className="flex items-center gap-1 font-bold"><Calendar className="w-3 h-3" /> {formatPostDate(post.date)}</span>
                              <span className="flex items-center gap-1 font-bold"><Clock className="w-3 h-3" /> {post.readTime}</span>
                            </div>
                            <h3 className="font-heading font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                              {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
                            <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all">
                              Read Article <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══ CATEGORY MODULES — visual grid ═══ */}
        {showFeatured && (
          <section className="py-10 md:py-14 bg-secondary tartan-bg">
            <div className="container-tight">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
                <span className="eyebrow mb-2 block">Browse by Topic</span>
                <h2 className="text-2xl font-heading font-bold text-foreground">Find What You Need</h2>
                <div className="w-10 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mt-3" />
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.filter((c) => c !== "All").map((cat, i) => {
                  const config = categoryConfig[cat] || { icon: BookOpen, label: cat, description: "", color: "primary" };
                  const count = blogPosts.filter((p) => p.category === cat).length;
                  return (
                    <motion.button
                      key={cat}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => {
                        setActiveCategory(cat);
                        document.getElementById("all-articles")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="group text-left p-4 md:p-5 bg-card border border-border rounded-sm hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all"
                    >
                      <div className="w-9 h-9 rounded-sm bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/12 transition-colors">
                        <config.icon className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-heading font-semibold text-sm text-foreground mb-0.5">{config.label}</h3>
                      <p className="text-[11px] text-muted-foreground font-body">{count} article{count !== 1 ? "s" : ""}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ═══ STORM & LOCAL INTELLIGENCE — Two-column editorial ═══ */}
        {showFeatured && (
          <section className="section-padding bg-background">
            <div className="container-tight">
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Storm Center */}
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center">
                      <CloudLightning className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground">Storm & Emergency Guides</h3>
                      <p className="text-muted-foreground text-xs font-body">Critical info when you need it most</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {stormPosts.map((post) => (
                      <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="group flex items-start gap-3 p-3 rounded-sm hover:bg-secondary/60 transition-colors"
                      >
                        <Zap className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">{post.title}</h4>
                          <p className="text-muted-foreground text-xs mt-0.5 line-clamp-1">{post.excerpt}</p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/70 mt-0.5 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                  <Link to="/roofing/storm-damage" className="inline-flex items-center gap-1.5 mt-4 text-accent font-heading font-semibold text-sm hover:gap-2.5 transition-all">
                    Visit Storm Center <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>

                {/* WNC Local */}
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-sm bg-primary/8 flex items-center justify-center">
                      <Mountain className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground">Western NC Guides</h3>
                      <p className="text-muted-foreground text-xs font-body">Town-specific advice for mountain homes</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {localPosts.map((post) => (
                      <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="group flex items-start gap-3 p-3 rounded-sm hover:bg-secondary/60 transition-colors"
                      >
                        <Mountain className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">{post.title}</h4>
                          <p className="text-muted-foreground text-xs mt-0.5">{post.town} · {post.readTime} read</p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/70 mt-0.5 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                  <Link to="/service-areas" className="inline-flex items-center gap-1.5 mt-4 text-primary font-heading font-semibold text-sm hover:gap-2.5 transition-all">
                    View All Service Areas <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* ═══ ALL ARTICLES ═══ */}
        <section id="all-articles" className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
            >
              <div>
                <span className="eyebrow mb-2 block">
                  {activeCategory === "All" ? "All Articles" : categoryConfig[activeCategory]?.label || activeCategory}
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {activeCategory === "All" ? "Resource Library" : categoryConfig[activeCategory]?.label || activeCategory}
                </h2>
                <div className="w-10 h-px bg-[hsl(var(--highland-gold)/0.4)] mt-3" />
                {categoryConfig[activeCategory]?.description && (
                  <p className="text-muted-foreground text-sm mt-2 max-w-lg">{categoryConfig[activeCategory].description}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p className="text-muted-foreground text-sm font-body">{filtered.length} article{filtered.length !== 1 ? "s" : ""}</p>
                <div className="flex items-center rounded-sm border border-border bg-card p-0.5">
                  {(["newest", "oldest"] as const).map((order) => (
                    <button
                      key={order}
                      onClick={() => setSortOrder(order)}
                      aria-pressed={sortOrder === order}
                      className={`px-3 py-1.5 text-[10px] font-body font-bold uppercase tracking-[0.14em] rounded-sm transition-all ${
                        sortOrder === order
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {order === "newest" ? "Newest" : "Oldest"}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-sm text-xs font-body font-semibold uppercase tracking-wider transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/20 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid — first article gets hero treatment */}
            {filtered.length > 0 ? (
              <div className="space-y-6">
                {/* Hero article */}
                {filtered.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/blog/${filtered[0].slug}`} className="group block card-premium overflow-hidden">
                      <div className="grid md:grid-cols-12 gap-0 min-h-[300px]">
                        <div className="md:col-span-5 h-64 md:h-auto overflow-hidden">
                          <img loading="lazy" decoding="async" 
                            src={filtered[0].image || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=1000"} 
                            alt={filtered[0].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-center bg-card">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[9px] font-body font-semibold uppercase tracking-[0.18em] px-2.5 py-1 bg-primary/10 text-primary w-fit">
                              {filtered[0].category}
                            </span>
                            {isRecent(filtered[0].date) && (
                              <span className="text-[9px] font-body font-bold uppercase tracking-[0.18em] px-2.5 py-1 bg-[hsl(var(--highland-gold)/0.16)] text-[hsl(var(--highland-gold))] w-fit">
                                New
                              </span>
                            )}
                          </div>
                          <h3 className="font-heading font-bold text-foreground text-xl md:text-3xl mb-4 group-hover:text-primary transition-colors leading-snug">
                            {filtered[0].title}
                          </h3>
                          <p className="text-muted-foreground text-base mb-6 line-clamp-3 leading-relaxed">
                            {filtered[0].excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {filtered[0].readTime}</span>
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatPostDate(filtered[0].date)}</span>
                            {filtered[0].town && <span className="flex items-center gap-1.5"><Mountain className="w-3.5 h-3.5" /> {filtered[0].town}</span>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {/* Subgrid for remaining articles */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.slice(1).map((post, i) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link to={`/blog/${post.slug}`} className="group block h-full card-premium overflow-hidden flex flex-col">
                        <div className="aspect-[16/10] overflow-hidden">
                          <img loading="lazy" decoding="async" 
                            src={post.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col bg-card">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[9px] font-body font-semibold uppercase tracking-[0.14em] px-2.5 py-1 bg-primary/10 text-primary w-fit">
                              {post.category}
                            </span>
                            {isRecent(post.date) && (
                              <span className="text-[9px] font-body font-bold uppercase tracking-[0.14em] px-2.5 py-1 bg-[hsl(var(--highland-gold)/0.16)] text-[hsl(var(--highland-gold))] w-fit">
                                New
                              </span>
                            )}
                          </div>
                          <h3 className="font-heading font-bold text-foreground text-lg mb-3 group-hover:text-primary transition-colors leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-[13px] line-clamp-2 mb-5 leading-relaxed font-body">
                            {post.excerpt}
                          </p>
                          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground font-body">
                            <span className="flex items-center gap-2">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatPostDate(post.date)}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                            </span>
                            <span className="font-semibold text-primary group-hover:gap-1.5 transition-all flex items-center gap-1 uppercase tracking-wider text-[10px]">Read More <ArrowRight className="w-3 h-3" /></span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-8 h-8 text-muted-foreground/70 mx-auto mb-3" />
                <p className="text-muted-foreground font-body">No articles found matching your search.</p>
                <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="text-primary text-sm font-semibold mt-2 hover:underline">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ═══ NEWSLETTER ═══ */}
        <section className="section-padding section-dark tartan-dark relative overflow-hidden">
          <TextureOverlay opacity={0.02} />
          <div className="container-tight relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl mx-auto text-center"
            >
              <div className="w-12 h-12 rounded-sm bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center mx-auto mb-4">
                <Newspaper className="w-6 h-6 text-[hsl(var(--highland-gold))]" />
              </div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-2">
                Stay Informed
              </h3>
              <p className="text-[hsl(var(--dark-section-foreground)/0.5)] text-sm mb-6 max-w-md mx-auto">
                Seasonal maintenance reminders, storm updates, and mountain building insights —
                delivered a few times per year. No spam, no sales pitches.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  aria-label="Email address for the newsletter"
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-sm bg-[hsl(var(--dark-section-foreground)/0.06)] border border-[hsl(var(--dark-section-foreground)/0.1)] text-[hsl(var(--dark-section-foreground))] text-sm font-body placeholder:text-[hsl(var(--dark-section-foreground)/0.3)] focus:outline-none focus:border-[hsl(var(--highland-gold)/0.3)] transition-colors"
                />
                <button type="submit" className="cta-gradient text-accent-foreground font-bold px-6 py-3 rounded-sm text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                  Subscribe
                </button>
              </form>
              <p className="text-[hsl(var(--dark-section-foreground)/0.3)] text-[11px] mt-3 font-body">Unsubscribe anytime. We respect your inbox.</p>
            </motion.div>
          </div>
        </section>

        <ReassuranceBlock
          headline={"Have a Question About\nSomething You Read?"}
          subheadline="This content is written by the team that builds in these mountains. If you have questions, we have answers — and there's no obligation."
          ctaText="Talk to the Team That Wrote This"
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Blog;

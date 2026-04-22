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
  Spotlight: { icon: Mountain, label: "Project Spotlights", description: "Deep dives into completed projects — materials, process, and results", color: "primary" },
};

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

const featuredSlugs = [
  "metal-vs-shingle-roof-western-nc",
  "storm-damage-checklist-western-nc",
  "how-much-does-roof-cost-highlands-nc",
];

/* Seasonal awareness */
const getSeasonalContext = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return { season: "Spring", icon: Leaf, tip: "Spring storms and hail season approaching — schedule your inspection now.", categories: ["Storm", "Maintenance", "Inspections"] };
  if (month >= 5 && month <= 7) return { season: "Summer", icon: Sun, tip: "Peak construction season. Book your project early for best scheduling.", categories: ["Construction", "Materials", "Cost"] };
  if (month >= 8 && month <= 10) return { season: "Fall", icon: Wind, tip: "Prepare your roof for winter. Last chance for pre-freeze repairs.", categories: ["Maintenance", "Replacement", "Tips"] };
  return { season: "Winter", icon: Snowflake, tip: "Ice dam prevention and emergency storm response. We're available 24/7.", categories: ["Storm", "Maintenance", "Insurance"] };
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const seasonal = useMemo(getSeasonalContext, []);

  const filtered = blogPosts
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter(
      (p) =>
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const featuredPosts = blogPosts.filter((p) => featuredSlugs.includes(p.slug));
  const heroFeatured = featuredPosts[0];
  const sideFeatured = featuredPosts.slice(1);
  const stormPosts = blogPosts.filter((p) => p.category === "Storm" || p.category === "Maintenance").slice(0, 4);
  const localPosts = blogPosts.filter((p) => p.town).slice(0, 4);
  const seasonalPosts = blogPosts.filter((p) => seasonal.categories.includes(p.category)).slice(0, 3);
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
      <main>
        {/* ═══ HERO — Editorial masthead ═══ */}
        <section className="relative section-dark overflow-hidden">
          <div className="absolute inset-0 tartan-dark" />
          <MountainContours variant="dark" opacity={0.04} />
          <div className="relative z-10 pt-32 md:pt-40 pb-16 md:pb-20 px-5 md:px-8 lg:px-16">
            <div className="container-tight">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: HIGHLAND_EASE }}
                  className="lg:col-span-6"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <BookOpen className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)]" />
                    <span className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold))]">Insights & Resources</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-5 leading-[1.06] tracking-tight">
                    Mountain-Specific<br />
                    Knowledge You Can<br />
                    <span className="text-[hsl(var(--highland-gold))]">Actually Use.</span>
                  </h1>
                  <div className="w-16 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-5" />
                  <p className="text-[hsl(var(--dark-section-foreground)/0.55)] text-base md:text-lg leading-relaxed max-w-lg mb-6">
                    Written by the team that builds in these mountains every day. No filler,
                    no AI-generated fluff — just practical guidance for WNC homeowners.
                  </p>
                  {/* Search */}
                  <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--dark-section-foreground)/0.3)]" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[hsl(var(--dark-section-foreground)/0.06)] border border-[hsl(var(--dark-section-foreground)/0.1)] text-[hsl(var(--dark-section-foreground))] placeholder:text-[hsl(var(--dark-section-foreground)/0.3)] text-sm font-body focus:outline-none focus:border-[hsl(var(--highland-gold)/0.3)] transition-colors rounded-sm"
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
                        <p className="text-[10px] font-body font-bold uppercase tracking-wider text-[hsl(var(--highland-gold))]">{seasonal.season} Advisory</p>
                        <p className="text-xs text-[hsl(var(--dark-section-foreground)/0.5)] font-body">Timely for WNC homeowners</p>
                      </div>
                    </div>
                    <p className="text-[hsl(var(--dark-section-foreground)/0.7)] text-sm font-body leading-relaxed mb-4">{seasonal.tip}</p>
                    <div className="space-y-2">
                      {seasonalPosts.map((post) => (
                        <Link
                          key={post.slug}
                          to={`/blog/${post.slug}`}
                          className="group flex items-center justify-between py-2 border-b border-[hsl(var(--dark-section-foreground)/0.06)] last:border-0"
                        >
                          <span className="text-sm text-[hsl(var(--dark-section-foreground)/0.6)] font-body group-hover:text-[hsl(var(--highland-gold))] transition-colors line-clamp-1 pr-2">{post.title}</span>
                          <ChevronRight className="w-3 h-3 text-[hsl(var(--dark-section-foreground)/0.2)] flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-[hsl(var(--dark-section-foreground)/0.35)] text-xs font-body">
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
                  <TrendingUp className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)]" />
                  <span className="eyebrow">Editor's Picks</span>
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
                    <div className="relative bg-primary/5 p-1">
                      <div className="bg-gradient-to-br from-primary/8 to-accent/5 p-8 md:p-10 lg:p-12">
                        <span className="text-[9px] font-body font-bold uppercase tracking-[0.18em] text-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.1)] px-3 py-1.5 mb-4 inline-block">
                          {heroFeatured.category}
                        </span>
                        <h3 className="font-heading font-bold text-foreground text-2xl md:text-3xl mb-4 group-hover:text-primary transition-colors leading-snug">
                          {heroFeatured.title}
                        </h3>
                        <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-lg">
                          {heroFeatured.excerpt}
                        </p>
                        <div className="flex items-center gap-5 text-xs text-muted-foreground mb-6">
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
                        <div className="p-6 md:p-7">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                            <span className="text-[9px] font-body font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-sm bg-primary/10 text-primary">
                              {post.category}
                            </span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                          </div>
                          <h3 className="font-heading font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
                          <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all">
                            Read Article <ArrowRight className="w-3.5 h-3.5" />
                          </span>
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
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 mt-0.5 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                  <Link to="/storm-center" className="inline-flex items-center gap-1.5 mt-4 text-accent font-heading font-semibold text-sm hover:gap-2.5 transition-all">
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
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 mt-0.5 flex-shrink-0" />
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
              <p className="text-muted-foreground text-sm font-body">{filtered.length} article{filtered.length !== 1 ? "s" : ""}</p>
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
                      <div className="grid md:grid-cols-12 gap-0">
                        <div className="md:col-span-5 bg-gradient-to-br from-primary/8 to-accent/5 p-6 md:p-8 flex items-center">
                          <div className="w-full text-center md:text-left">
                            <span className="text-[9px] font-body font-semibold uppercase tracking-[0.18em] px-2.5 py-1 bg-primary/10 text-primary inline-block mb-3">
                              {filtered[0].category}
                            </span>
                            <h3 className="font-heading font-bold text-foreground text-xl md:text-2xl mb-3 group-hover:text-primary transition-colors leading-snug">
                              {filtered[0].title}
                            </h3>
                            <div className="flex items-center justify-center md:justify-start gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {filtered[0].readTime}</span>
                              {filtered[0].town && <span className="flex items-center gap-1"><Mountain className="w-3 h-3" /> {filtered[0].town}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-7 p-6 md:p-8">
                          <p className="text-muted-foreground text-sm leading-relaxed mb-5">{filtered[0].excerpt}</p>
                          <span className="inline-flex items-center gap-2 text-primary font-heading font-bold text-sm group-hover:gap-3 transition-all">
                            Read Full Article <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {/* Remaining articles */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.slice(1).map((post, i) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                    >
                      <Link to={`/blog/${post.slug}`} className="group block card-premium overflow-hidden h-full">
                        <div className="p-5 md:p-6 flex flex-col h-full">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                            <span className="text-[9px] font-body font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded-sm bg-primary/8 text-primary">
                              {post.category}
                            </span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                            {post.town && <span className="flex items-center gap-1"><Mountain className="w-3 h-3" /> {post.town}</span>}
                          </div>
                          <h3 className="font-heading font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">{post.excerpt}</p>
                          <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all">
                            Read Article <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
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

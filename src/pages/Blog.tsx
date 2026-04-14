import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Clock, Tag, Search, BookOpen, Zap, Mountain,
  Shield, Wrench, Home, CloudLightning, DollarSign, Newspaper,
} from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ReassuranceBlock } from "@/components/trust";
import { blogPosts } from "@/data/blogs";

/* ─── Category config ─── */
const categoryConfig: Record<string, { icon: typeof BookOpen; label: string; description: string }> = {
  All: { icon: BookOpen, label: "All Articles", description: "Browse our complete resource library" },
  Materials: { icon: Shield, label: "Material Guides", description: "Compare roofing & construction materials for mountain performance" },
  Storm: { icon: CloudLightning, label: "Storm & Weather", description: "Emergency guides, damage checklists, and insurance claim help" },
  Maintenance: { icon: Wrench, label: "Maintenance", description: "Seasonal checklists and preventive care for WNC homes" },
  Cost: { icon: DollarSign, label: "Cost & Planning", description: "Real numbers and transparent breakdowns for mountain projects" },
  Insurance: { icon: Shield, label: "Insurance Claims", description: "Navigate the claims process with confidence" },
  Replacement: { icon: Home, label: "Roof Replacement", description: "When to replace, what to expect, and how to plan" },
  Tips: { icon: BookOpen, label: "Homeowner Tips", description: "Honest advice — no sales pitch, just guidance" },
  Inspections: { icon: Search, label: "Inspections", description: "What to expect and why inspections matter" },
  Financing: { icon: DollarSign, label: "Financing", description: "Affordable options for your roofing investment" },
  Commercial: { icon: Home, label: "Commercial", description: "Maintenance and solutions for commercial properties" },
};

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];
const featuredSlugs = [
  "metal-vs-shingle-roof-western-nc",
  "storm-damage-checklist-western-nc",
  "how-much-does-roof-cost-highlands-nc",
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = blogPosts
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter(
      (p) =>
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const featuredPosts = blogPosts.filter((p) => featuredSlugs.includes(p.slug));
  const stormPosts = blogPosts.filter((p) => p.category === "Storm" || p.category === "Maintenance").slice(0, 3);
  const localPosts = blogPosts.filter((p) => p.town).slice(0, 4);

  const showFeatured = activeCategory === "All" && !searchQuery;

  return (
    <>
      <SEOHead
        title="Roofing & Construction Blog | Expert Guides for Western NC Homeowners"
        description="Expert roofing and construction guidance for Western North Carolina. Material comparisons, storm damage guides, maintenance tips, cost breakdowns, and local insights."
        path="/blog"
        jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }])}
      />
      <Header />
      <main>
        {/* ═══ HERO ═══ */}
        <section className="section-padding section-dark tartan-dark pt-32 md:pt-40 pb-16 md:pb-20">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">
                Insights & Resources
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-5 leading-tight">
                Expert Roofing & Construction<br className="hidden md:block" /> Guidance for WNC
              </h1>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-5" />
              <p className="text-[hsl(var(--dark-section-foreground)/0.6)] text-base md:text-lg max-w-2xl mx-auto mb-8">
                Mountain-specific advice on materials, maintenance, storm damage, costs, and
                project planning — written by the team that builds in these mountains every day.
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--dark-section-foreground)/0.3)]" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-sm bg-[hsl(var(--dark-section-foreground)/0.06)] border border-[hsl(var(--dark-section-foreground)/0.1)] text-[hsl(var(--dark-section-foreground))] placeholder:text-[hsl(var(--dark-section-foreground)/0.3)] text-sm font-body focus:outline-none focus:border-[hsl(var(--highland-gold)/0.3)] transition-colors"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ FEATURED ARTICLES ═══ */}
        {showFeatured && (
          <section className="section-padding bg-background">
            <div className="container-tight">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <span className="eyebrow mb-2 block">Featured</span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  Most Useful Articles
                </h2>
                <div className="w-10 h-px bg-[hsl(var(--highland-gold)/0.4)] mt-3" />
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-6">
                {featuredPosts.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group block card-premium overflow-hidden h-full"
                    >
                      <div className="p-6 md:p-7 flex flex-col h-full">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                          <span className="text-[9px] font-body font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-sm bg-primary/10 text-primary">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-foreground text-lg mb-3 group-hover:text-primary transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-5 flex-grow leading-relaxed">
                          {post.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all">
                          Read Article <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ CATEGORY GRID ═══ */}
        {showFeatured && (
          <section className="py-10 md:py-14 bg-secondary tartan-bg">
            <div className="container-tight">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <span className="eyebrow mb-2 block">Browse by Topic</span>
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  Content Categories
                </h2>
                <div className="w-10 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mt-3" />
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.filter((c) => c !== "All").map((cat, i) => {
                  const config = categoryConfig[cat] || { icon: BookOpen, label: cat, description: "" };
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
                      <h3 className="font-heading font-semibold text-sm text-foreground mb-0.5">
                        {config.label}
                      </h3>
                      <p className="text-[11px] text-muted-foreground font-body">
                        {count} article{count !== 1 ? "s" : ""}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ═══ STORM & SEASONAL MODULE ═══ */}
        {showFeatured && (
          <section className="section-padding bg-background">
            <div className="container-tight">
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Storm & Weather */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center">
                      <CloudLightning className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground">Storm & Seasonal Updates</h3>
                      <p className="text-muted-foreground text-xs font-body">Timely guidance for WNC weather events</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {stormPosts.map((post) => (
                      <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="group flex items-start gap-3 p-3 rounded-sm hover:bg-secondary/60 transition-colors"
                      >
                        <Zap className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
                            {post.title}
                          </h4>
                          <p className="text-muted-foreground text-xs mt-0.5">{post.readTime} read</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {/* Local WNC Content */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-sm bg-primary/8 flex items-center justify-center">
                      <Mountain className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground">Western NC Guides</h3>
                      <p className="text-muted-foreground text-xs font-body">Town-specific roofing and construction advice</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {localPosts.map((post) => (
                      <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="group flex items-start gap-3 p-3 rounded-sm hover:bg-secondary/60 transition-colors"
                      >
                        <Mountain className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
                            {post.title}
                          </h4>
                          <p className="text-muted-foreground text-xs mt-0.5">{post.town} · {post.readTime} read</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* ═══ ALL ARTICLES (filtered) ═══ */}
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
                  <p className="text-muted-foreground text-sm mt-2 max-w-lg">
                    {categoryConfig[activeCategory].description}
                  </p>
                )}
              </div>
              <p className="text-muted-foreground text-sm font-body">
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              </p>
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

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group block card-premium overflow-hidden h-full"
                    >
                      <div className="p-5 md:p-6 flex flex-col h-full">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span className="text-[9px] font-body font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded-sm bg-primary/8 text-primary">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.readTime}
                          </span>
                          {post.town && (
                            <span className="flex items-center gap-1">
                              <Mountain className="w-3 h-3" /> {post.town}
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                          {post.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all">
                          Read Article <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground font-body">No articles found matching your search.</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="text-primary text-sm font-semibold mt-2 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ═══ NEWSLETTER SIGNUP ═══ */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl mx-auto text-center"
            >
              <div className="w-12 h-12 rounded-sm bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center mx-auto mb-4">
                <Newspaper className="w-6 h-6 text-[hsl(var(--highland-gold))]" />
              </div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-2">
                Stay Informed
              </h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                Seasonal maintenance reminders, storm updates, and mountain building insights — 
                delivered a few times per year. No spam, no sales pitches.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-sm bg-secondary border border-border text-foreground text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/30 transition-colors"
                />
                <button
                  type="submit"
                  className="cta-gradient text-accent-foreground font-bold px-6 py-3 rounded-sm text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-muted-foreground/50 text-[11px] mt-3 font-body">
                Unsubscribe anytime. We respect your inbox.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ CLOSING CTA ═══ */}
        <ReassuranceBlock
          headline={"Have a Question About\nYour Roof or Project?"}
          subheadline="Our team is happy to answer questions — no commitment required. Just honest, expert advice."
          ctaText="Discuss Your Project"
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Blog;

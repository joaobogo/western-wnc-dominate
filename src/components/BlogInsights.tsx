import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogs";
import { useState } from "react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

const categoryMap: Record<string, string> = {
  Cost: "Homeowner Guidance",
  Materials: "Roofing Education",
  Storm: "Storm Updates",
  Insurance: "Homeowner Guidance",
  Maintenance: "Roofing Education",
  Replacement: "Roofing Education",
  Inspections: "Roofing Education",
  Tips: "Homeowner Guidance",
  Financing: "Homeowner Guidance",
  Commercial: "Construction Insights",
};

const editorialCategories = [
  "All",
  "Roofing Education",
  "Storm Updates",
  "Construction Insights",
  "Homeowner Guidance",
];

function getEditorialCategory(cat: string): string {
  return categoryMap[cat] || "Western NC News";
}

const categoryAccent: Record<string, string> = {
  "Roofing Education": "bg-primary/10 text-primary",
  "Storm Updates": "bg-destructive/10 text-destructive",
  "Construction Insights": "bg-[hsl(var(--highland-gold)/0.12)] text-[hsl(var(--highland-gold))]",
  "Homeowner Guidance": "bg-accent/10 text-accent-foreground",
  "Western NC News": "bg-secondary text-muted-foreground",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const BlogInsights = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const enriched = blogPosts.map((post) => ({
    ...post,
    editorialCategory: getEditorialCategory(post.category),
  }));

  const filtered =
    activeFilter === "All"
      ? enriched.slice(0, 5)
      : enriched.filter((p) => p.editorialCategory === activeFilter).slice(0, 5);

  const featured = filtered[0];
  const rest = filtered.slice(1, 5);

  if (!featured) return null;

  return (
    <section className="section-padding bg-background interaction-editorial">
      <div className="container-tight">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <ScrollReveal variant="fade">
              <span className="eyebrow mb-3 block">Knowledge & Guidance</span>
            </ScrollReveal>
            <HeadingReveal delay={0.1}>
              <h2 className="section-heading">
                Insights Built for<br className="hidden md:block" /> Mountain Property Owners.
              </h2>
            </HeadingReveal>
          </div>
          <ScrollReveal variant="rise-subtle" delay={0.2}>
            <div className="flex flex-wrap gap-2">
              {editorialCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`text-[11px] font-body font-semibold uppercase tracking-[0.1em] px-3.5 py-1.5 rounded-none btn-ghost-interactive ${
                    activeFilter === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Editorial grid */}
        <div className="grid lg:grid-cols-5 gap-5">
          <motion.div
            key={featured.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: HIGHLAND_EASE }}
            className="lg:col-span-3"
          >
            <Link
              to={`/blog/${featured.slug}`}
              className="group relative block card-premium tartan-hover h-full p-0"
            >
              <div className="p-7 md:p-9 flex flex-col h-full relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-[10px] font-body font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-none ${categoryAccent[featured.editorialCategory] || categoryAccent["Western NC News"]}`}>
                    {featured.editorialCategory}
                  </span>
                  <span className="text-muted-foreground/50 text-xs font-body">
                    {new Date(featured.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-4 leading-snug group-hover:text-primary transition-colors duration-200 flex-grow">
                  {featured.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed font-body mb-6 max-w-lg">
                  {featured.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-5 border-t border-border">
                  <div className="flex items-center gap-1.5 text-muted-foreground/50 text-xs font-body">
                    <Clock className="w-3 h-3" />
                    {featured.readTime} read
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm font-body group-hover:gap-2.5 transition-all">
                    Read Article <ArrowRight className="w-3.5 h-3.5 btn-arrow-icon" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: HIGHLAND_EASE }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex gap-4 p-4 md:p-5 card-premium tartan-hover"
                >
                  <div className="flex-1 min-w-0 relative z-10">
                    <span className={`inline-block text-[9px] font-body font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-none mb-2.5 ${categoryAccent[post.editorialCategory] || categoryAccent["Western NC News"]}`}>
                      {post.editorialCategory}
                    </span>
                    <h4 className="text-sm font-heading font-bold text-foreground leading-snug mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-3 text-muted-foreground/40 text-[11px] font-body">
                      <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-all duration-300 relative z-10">
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <ScrollReveal variant="fade" delay={0.3} className="text-center mt-8">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors font-body link-draw"
          >
            Browse All Articles
            <ArrowRight className="w-3.5 h-3.5 btn-arrow-icon" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BlogInsights;

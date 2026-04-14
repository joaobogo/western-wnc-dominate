import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogs";
import { useState } from "react";

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
    <section className="section-padding bg-background">
      <div className="container-tight">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
        >
          <div>
            <span className="eyebrow mb-3 block">News & Insights</span>
            <h2 className="section-heading">
              Knowledge That<br className="hidden md:block" /> Protects Your Investment.
            </h2>
          </div>
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {editorialCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[11px] font-body font-semibold uppercase tracking-[0.1em] px-3.5 py-1.5 rounded-sm transition-all duration-200 ${
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Editorial grid — featured left, stack right */}
        <div className="grid lg:grid-cols-5 gap-5">
          {/* Featured post — large card */}
          <motion.div
            key={featured.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Link
              to={`/blog/${featured.slug}`}
              className="group relative block bg-card border border-border rounded-sm overflow-hidden hover:border-primary/20 hover:shadow-md transition-all duration-300 h-full"
            >
              <div className="p-7 md:p-9 flex flex-col h-full">
                {/* Category + date */}
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-[10px] font-body font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-sm ${categoryAccent[featured.editorialCategory] || categoryAccent["Western NC News"]}`}>
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
                    Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Stacked posts — right column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex gap-4 p-4 md:p-5 bg-card border border-border rounded-sm hover:border-primary/15 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex-1 min-w-0">
                    {/* Category pill */}
                    <span className={`inline-block text-[9px] font-body font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-sm mb-2.5 ${categoryAccent[post.editorialCategory] || categoryAccent["Western NC News"]}`}>
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
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors font-body"
          >
            View All Articles
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogInsights;

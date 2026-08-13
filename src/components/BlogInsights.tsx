import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, BookOpen, HardHat, Mountain } from "lucide-react";
import { blogSummaries } from "@/data/blog-summaries.generated";
import { useState, useRef } from "react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const categoryMap: Record<string, string> = {
  Cost: "Roofing Education",
  Materials: "Roofing Education",
  Storm: "WNC Updates",
  Insurance: "Homeowner Guidance",
  Maintenance: "Roofing Education",
  Replacement: "Roofing Education",
  Inspections: "Roofing Education",
  Tips: "Homeowner Guidance",
  Financing: "Homeowner Guidance",
  Commercial: "Construction Insights",
};

const editorialCategories = [
  { label: "All", value: "All", icon: BookOpen },
  { label: "Roofing Education", value: "Roofing Education", icon: BookOpen },
  { label: "Construction Insights", value: "Construction Insights", icon: HardHat },
  { label: "WNC Updates", value: "WNC Updates", icon: Mountain },
];

function getEditorialCategory(cat: string): string {
  return categoryMap[cat] || "WNC Updates";
}

const categoryAccent: Record<string, { bg: string; text: string; border: string }> = {
  "Roofing Education": { bg: "bg-primary/8", text: "text-primary", border: "border-primary/15" },
  "Construction Insights": { bg: "bg-[hsl(var(--highland-gold)/0.08)]", text: "text-[hsl(var(--gold-ink))]", border: "border-[hsl(var(--highland-gold)/0.15)]" },
  "WNC Updates": { bg: "bg-secondary", text: "text-muted-foreground", border: "border-border" },
  "Homeowner Guidance": { bg: "bg-accent/8", text: "text-accent-foreground", border: "border-accent/15" },
};

export const BlogInsights = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const enriched = blogSummaries.map((post) => ({
    ...post,
    editorialCategory: getEditorialCategory(post.category),
  }));

  const filtered =
    activeFilter === "All"
      ? enriched.slice(0, 6)
      : enriched.filter((p) => p.editorialCategory === activeFilter).slice(0, 6);

  const featured = filtered[0];
  const secondary = filtered.slice(1, 3);
  const compact = filtered.slice(3, 6);

  if (!featured) return null;

  return (
    <section className="section-padding section-dark relative overflow-hidden">
      <div className="absolute inset-0 tartan-dark opacity-30" />

      <div className="container-tight relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <ScrollReveal variant="fade">
              <span className="text-body-xs md:text-body-xs font-body font-bold uppercase tracking-[0.3em] text-[hsl(var(--highland-gold)/0.8)] mb-4 block">
                Knowledge & Guidance
              </span>
            </ScrollReveal>
            <HeadingReveal delay={0.1}>
              <h2 className="text-2xl md:text-3xl lg:text-heading font-heading font-bold text-dark-section-foreground leading-snug tracking-tight">
                What Mountain Property Owners<br className="hidden md:block" />
                <span className="text-[hsl(var(--gold-ink))]"> Actually Need to Know.</span>
              </h2>
            </HeadingReveal>
          </div>

          {/* Category filters */}
          <ScrollReveal variant="rise-subtle" delay={0.2}>
            <div className="flex flex-wrap gap-1.5">
              {editorialCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveFilter(cat.value)}
                  className={`text-caption font-body font-bold uppercase tracking-[0.15em] px-4 py-2.5 rounded-none transition-all duration-300 flex items-center gap-1.5 ${
                    activeFilter === cat.value
                      ? "bg-[hsl(var(--highland-gold))] text-accent-foreground"
                      : "bg-dark-section-foreground/[0.04] border border-dark-section-foreground/[0.06] text-dark-section-foreground/95 hover:border-dark-section-foreground/[0.12] hover:text-dark-section-foreground/85"
                  }`}
                >
                  <cat.icon className="w-3 h-3" />
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Editorial Grid — featured hero + 2 secondary + 3 compact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
          {/* Featured article — large card */}
          <FeaturedCard post={featured} />

          {/* Secondary column */}
          <div className="flex flex-col gap-4 md:gap-5">
            {secondary.map((post, i) => (
              <SecondaryCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>

        {/* Compact row */}
        {compact.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {compact.map((post, i) => (
              <CompactCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}

        {/* Browse all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10 md:mt-14"
        >
          <GoldLine width="3rem" centered delay={0.2} className="mb-6" />
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2.5 font-heading font-bold text-body-sm tracking-wide text-dark-section-foreground/95 hover:text-[hsl(var(--gold-ink))] transition-colors duration-300"
          >
            Browse All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true">
          </Link>
          <p className="text-body-xs text-dark-section-foreground/95 font-body font-bold mt-2">
            Roofing education · Construction insights · WNC weather & building updates
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── CARD COMPONENTS ─── */

interface PostWithCategory {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  editorialCategory: string;
}

const FeaturedCard = ({ post }: { post: PostWithCategory }) => {
  const accent = categoryAccent[post.editorialCategory] || categoryAccent["WNC Updates"];
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    cardRef.current.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group relative block h-full bg-dark-section-foreground/[0.03] border border-dark-section-foreground/[0.06] rounded-none overflow-hidden spotlight-hover hover:border-[hsl(var(--highland-gold)/0.15)] transition-all duration-500"
      >
        {/* Left gold accent */}
        <div className="absolute left-0 top-0 w-[2px] h-0 bg-[hsl(var(--highland-gold))] group-hover:h-full transition-all duration-600 z-10" />

        {/* Gold top line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.2)] to-transparent" />

        <div className="p-7 md:p-9 flex flex-col h-full relative z-10">
          {/* Category + date */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`text-caption font-body font-bold uppercase tracking-[0.15em] px-3 py-1.5 ${accent.bg} ${accent.text}`}>
              {post.editorialCategory}
            </span>
            <span className="text-dark-section-foreground/85 text-body-xs font-body font-bold">
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-heading font-bold text-dark-section-foreground/90 leading-snug mb-4 group-hover:text-[hsl(var(--highland-gold-light))] transition-colors duration-300 tracking-tight flex-1">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-dark-section-foreground/95 text-body-xs leading-[1.75] font-body mb-8 max-w-lg">
            {post.excerpt}
          </p>

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-auto pt-5 border-t border-dark-section-foreground/[0.06]">
            <div className="flex items-center gap-1.5 text-dark-section-foreground/90 text-xs font-body">
              <Clock className="w-4 h-4" aria-hidden="true">
              {post.readTime} read
            </div>
            <span className="inline-flex items-center gap-2 text-[hsl(var(--highland-gold)/0.7)] font-heading font-bold text-body-xs tracking-wide group-hover:text-[hsl(var(--gold-ink))] group-hover:gap-3 transition-all duration-300">
              Read Article <ArrowRight className="w-4 h-4" aria-hidden="true">
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const SecondaryCard = ({ post, index }: { post: PostWithCategory; index: number }) => {
  const accent = categoryAccent[post.editorialCategory] || categoryAccent["WNC Updates"];

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: HIGHLAND_EASE }}
      className="flex-1"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group relative block h-full bg-dark-section-foreground/[0.03] border border-dark-section-foreground/[0.06] rounded-none overflow-hidden hover:border-[hsl(var(--highland-gold)/0.12)] transition-all duration-500"
      >
        <div className="absolute left-0 top-0 w-[2px] h-0 bg-[hsl(var(--highland-gold))] group-hover:h-full transition-all duration-600 z-10" />

        <div className="p-5 md:p-6 flex flex-col h-full relative z-10">
          <div className="flex items-center gap-2.5 mb-4">
            <span className={`text-caption font-body font-bold uppercase tracking-[0.14em] px-2 py-0.5 ${accent.bg} ${accent.text}`}>
              {post.editorialCategory}
            </span>
            <span className="text-dark-section-foreground/20 text-caption font-body">
              {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>

          <h4 className="text-base font-heading font-bold text-dark-section-foreground/95 leading-snug mb-3 group-hover:text-[hsl(var(--highland-gold-light))] transition-colors duration-300 tracking-tight flex-1">
            {post.title}
          </h4>

          <p className="text-dark-section-foreground/90 text-body-xs leading-[1.7] font-body mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-dark-section-foreground/[0.05]">
            <span className="text-dark-section-foreground/20 text-caption font-body">{post.readTime}</span>
            <ArrowRight className="w-4 h-4 text-dark-section-foreground/15 group-hover:text-[hsl(var(--highland-gold)/0.6)] group-hover:translate-x-0.5 transition-all duration-300" aria-hidden="true">
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const CompactCard = ({ post, index }: { post: PostWithCategory; index: number }) => {
  const accent = categoryAccent[post.editorialCategory] || categoryAccent["WNC Updates"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + index * 0.06, duration: 0.4, ease: HIGHLAND_EASE }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block bg-dark-section-foreground/[0.02] border border-dark-section-foreground/[0.04] rounded-none p-4 md:p-5 hover:border-dark-section-foreground/[0.1] transition-all duration-400"
      >
        <span className={`inline-block text-caption font-body font-bold uppercase tracking-[0.12em] px-2 py-0.5 mb-3 ${accent.bg} ${accent.text}`}>
          {post.editorialCategory}
        </span>
        <h4 className="text-sm font-heading font-bold text-dark-section-foreground/90 leading-snug mb-2 group-hover:text-dark-section-foreground/90 transition-colors line-clamp-2 tracking-tight">
          {post.title}
        </h4>
        <div className="flex items-center gap-2 text-dark-section-foreground/20 text-caption font-body">
          <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogInsights;

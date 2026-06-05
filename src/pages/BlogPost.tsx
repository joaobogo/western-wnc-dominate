import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Clock, Calendar, Tag, Mountain, CheckCircle,
  Quote, Star, Phone, Shield, BookOpen, Lightbulb, MapPin,
} from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import GuideLeadMagnet from "@/components/GuideLeadMagnet";
import { TrustSidebar } from "@/components/trust";
import { getBlogBySlug, blogPosts } from "@/data/blogs";

/* ─── Author data ─── */
const authors: Record<string, { name: string; role: string; bio: string }> = {
  default: {
    name: "Highlander Editorial Team",
    role: "Highlander Roofing & Construction",
    bio: "Expert roofing and construction guidance from the team that builds in Western North Carolina's mountains every day.",
  },
};

/* ─── Helpers ─── */
const getGuideType = (category: string): "storm" | "maintenance" | "checklist" =>
  category === "Storm" ? "storm" : category === "Maintenance" ? "maintenance" : "checklist";

const getCategoryColor = (category: string) => {
  const map: Record<string, string> = {
    Storm: "bg-accent/15 text-accent",
    Maintenance: "bg-primary/10 text-primary",
    Materials: "bg-primary/10 text-primary",
    Cost: "bg-[hsl(var(--highland-gold)/0.15)] text-[hsl(var(--highland-gold))]",
    Insurance: "bg-primary/10 text-primary",
    Replacement: "bg-primary/10 text-primary",
    Tips: "bg-primary/10 text-primary",
    Commercial: "bg-primary/10 text-primary",
    Financing: "bg-[hsl(var(--highland-gold)/0.15)] text-[hsl(var(--highland-gold))]",
    Inspections: "bg-primary/10 text-primary",
  };
  return map[category] || "bg-primary/10 text-primary";
};

/* ─── Extract key takeaways from content ─── */
const extractTakeaways = (content: string): string[] => {
  const lines = content.split("\n");
  const takeaways: string[] = [];
  for (const line of lines) {
    if (line.startsWith("## ") && takeaways.length < 5) {
      takeaways.push(line.replace("## ", ""));
    }
  }
  return takeaways.slice(0, 4);
};

/* ─── Render markdown content ─── */
const renderContent = (content: string) => {
  return content.split("\n").map((line, i) => {
    if (line.startsWith("## "))
      return (
        <h2 key={i} className="text-xl md:text-2xl font-heading font-bold text-foreground mt-10 mb-4">
          {line.replace("## ", "")}
        </h2>
      );
    if (line.startsWith("### "))
      return (
        <h3 key={i} className="text-lg font-heading font-semibold text-foreground mt-7 mb-3">
          {line.replace("### ", "")}
        </h3>
      );
    if (line.startsWith("- **")) {
      const parts = line.replace("- **", "").split("**");
      return (
        <li key={i} className="text-muted-foreground mb-2.5 flex items-start gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-1" />
          <span>
            <strong className="text-foreground">{parts[0]}</strong>
            {parts[1]}
          </span>
        </li>
      );
    }
    if (line.startsWith("- "))
      return (
        <li key={i} className="text-muted-foreground mb-2 flex items-start gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-1" />
          <span>{line.replace("- ", "")}</span>
        </li>
      );
    if (line.match(/^\d+\. /))
      return (
        <li key={i} className="text-muted-foreground mb-2.5 list-decimal ml-5 leading-relaxed">
          {line.replace(/^\d+\. /, "")}
        </li>
      );
    if (line.trim() === "") return <div key={i} className="h-2" />;
    const boldProcessed = line.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>");
    return (
      <p
        key={i}
        className="text-muted-foreground leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: boldProcessed }}
      />
    );
  });
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogBySlug(slug || "");

  if (!post) {
    return (
      <>
        <Header />
        <main className="section-padding section-dark pt-32 md:pt-40 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4">
              Article Not Found
            </h1>
            <p className="text-[hsl(var(--dark-section-foreground)/0.6)] mb-6">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/blog"
              className="cta-gradient text-accent-foreground font-bold px-6 py-3 rounded-sm inline-flex items-center gap-2"
            >
              Browse All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const author = authors.default;
  const takeaways = extractTakeaways(post.content);
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && (p.category === post.category || p.town === post.town))
    .slice(0, 3);
  if (relatedPosts.length < 3) {
    const extra = blogPosts.filter((p) => p.slug !== slug && !relatedPosts.find((r) => r.slug === p.slug)).slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...extra);
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={buildPageSchema({
          type: "blog",
          article: {
            title: post.title,
            description: post.excerpt,
            url: `/blog/${post.slug}`,
            datePublished: post.date,
            author: "Highlander Team",
          },
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ],
        })}
      />
      <Header />
      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative section-dark min-h-[50vh] flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={post.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"} 

              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.95)] via-[hsl(var(--hero-overlay)/0.8)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 tartan-dark opacity-[0.08] pointer-events-none" />
          </div>

          <div className="container-tight max-w-4xl relative z-10 py-24 md:py-32">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-10 inline-flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))]" />
                <span className="text-[11px] font-heading font-bold text-white tracking-[0.15em] uppercase">Highlander Insight</span>
                <div className="h-px w-12 bg-white/10" />
              </div>
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-[hsl(var(--dark-section-foreground)/0.4)] text-sm font-body mb-6">
                <Link to="/blog" className="hover:text-[hsl(var(--dark-section-foreground)/0.7)] transition-colors flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Blog
                </Link>
                <span>/</span>
                <span className="text-[hsl(var(--dark-section-foreground)/0.6)]">{post.category}</span>
              </nav>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className={`text-[10px] md:text-[11px] font-body font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-sm ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
                <span className="text-[hsl(var(--dark-section-foreground)/0.6)] text-[13px] font-body font-bold flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> {formattedDate}
                </span>
                <span className="text-[hsl(var(--dark-section-foreground)/0.6)] text-[13px] font-body font-bold flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> {post.readTime} read
                </span>
                {post.town && (
                  <span className="text-[hsl(var(--dark-section-foreground)/0.6)] text-[13px] font-body font-bold flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> {post.town}, NC
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-display font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-5 leading-[1.0] tracking-tightest text-balance">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-body-lg md:text-body-xl text-white/85 max-w-2xl leading-relaxed font-medium drop-shadow-sm">
                {post.excerpt}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ ARTICLE BODY + SIDEBAR ═══ */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
              {/* Main content */}
              <div className="lg:col-span-2">
                {/* Key Takeaways */}
                {takeaways.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-secondary/60 border border-border rounded-sm p-5 md:p-6 mb-10"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
                      <h3 className="font-heading font-semibold text-sm text-foreground">Key Takeaways</h3>
                    </div>
                    <div className="space-y-2">
                      {takeaways.map((t, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/80 text-sm font-body leading-relaxed">{t}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Article content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="prose-custom"
                >
                  {renderContent(post.content)}
                </motion.div>

                {/* Local Relevance Callout */}
                {post.town && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-primary/5 border border-primary/10 rounded-sm p-5 md:p-6 mt-10"
                  >
                    <div className="flex items-start gap-3">
                      <Mountain className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-heading font-semibold text-sm text-foreground mb-1">
                          Local to {post.town}, NC
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          This article was written specifically for homeowners in {post.town} and the surrounding
                          area. Highlander Roofing & Construction serves {post.town} and all of Western North Carolina
                          with in-person consultations and local crews.
                        </p>
                        <Link
                          to="/consultation"
                          className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm mt-3 hover:gap-2.5 transition-all"
                        >
                          Talk With Our Local Team <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* FAQ Module */}
                {post.faqs && post.faqs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-10"
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <h3 className="font-heading font-semibold text-foreground">Frequently Asked Questions</h3>
                    </div>
                    <div className="space-y-4">
                      {post.faqs.map((faq, i) => (
                        <div key={i} className="bg-secondary/50 border border-border rounded-sm p-5">
                          <h4 className="font-heading font-semibold text-foreground text-sm mb-2">{faq.question}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Related Services — Internal Linking */}
                {post.relatedServices && post.relatedServices.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-10 bg-primary/5 border border-primary/10 rounded-sm p-5 md:p-6"
                  >
                    <h4 className="font-heading font-semibold text-sm text-foreground mb-3">Related Services</h4>
                    <div className="w-8 h-px bg-[hsl(var(--highland-gold)/0.3)] mb-4" />
                    <div className="flex flex-wrap gap-2">
                      {post.relatedServices.map((svc) => (
                        <Link
                          key={svc.path}
                          to={svc.path}
                          className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors bg-primary/8 px-3 py-1.5 rounded-sm"
                        >
                          {svc.label} <ArrowRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Local Town Bridge */}
                {post.town && (
                  <div className="mt-10 pt-8 border-t border-border">
                    <h4 className="text-[11px] md:text-[12px] font-bold uppercase tracking-widest text-muted-foreground/80 mb-4">Market Context</h4>
                    <Link to={`/service-areas/${post.town.toLowerCase()}-nc`} className="group flex items-center justify-between p-6 bg-secondary/40 border border-border rounded-sm hover:border-primary/20 transition-all">
                      <div>
                        <p className="text-sm font-heading font-bold text-foreground mb-1">Roofing & Construction in {post.town}</p>
                        <p className="text-xs text-muted-foreground font-body">Explore localized standards and proven projects in your area.</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )}


                {/* Inline Lead Magnet */}
                <div className="mt-10">
                  <GuideLeadMagnet variant="inline" guide={getGuideType(post.category)} />
                </div>

                {/* In-Article CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-primary rounded-sm p-6 md:p-8 mt-10 text-center"
                >
                  <h3 className="text-xl font-heading font-bold text-primary-foreground mb-2">
                    Have Questions About Your Project?
                  </h3>
                  <p className="text-primary-foreground/60 text-sm mb-5 max-w-md mx-auto">
                    Our team is happy to answer questions — no commitment required. Just honest, expert advice from people who build in these mountains every day.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      to="/consultation"
                      className="cta-gradient text-accent-foreground font-bold px-6 py-3 rounded-sm inline-flex items-center justify-center gap-2 text-sm hover:opacity-90 transition-opacity"
                    >
                      Request a Consultation <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href="tel:8283979211"
                      className="border border-primary-foreground/30 text-primary-foreground font-semibold px-6 py-3 rounded-sm inline-flex items-center justify-center gap-2 text-sm hover:bg-primary-foreground/10 transition-colors"
                    >
                      <Phone className="w-4 h-4" /> (828) 397-9211
                    </a>
                  </div>
                </motion.div>

                {/* Author Bio */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 mt-10 pt-8 border-t border-border"
                >
                  <div className="w-12 h-12 rounded-sm bg-primary/8 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-body font-semibold uppercase tracking-wider text-muted-foreground/50 mb-1">
                      Written By
                    </p>
                    <h4 className="font-heading font-semibold text-foreground text-sm">{author.name}</h4>
                    <p className="text-muted-foreground text-xs font-body mb-2">{author.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{author.bio}</p>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <TrustSidebar />

                {/* Quick Navigation */}
                {takeaways.length > 0 && (
                  <div className="bg-card border border-border rounded-sm p-5 md:p-6">
                    <h4 className="font-heading font-semibold text-sm text-foreground mb-3">In This Article</h4>
                    <div className="w-8 h-px bg-[hsl(var(--highland-gold)/0.3)] mb-3" />
                    <div className="space-y-2">
                      {takeaways.map((t, i) => (
                        <p key={i} className="text-muted-foreground text-xs font-body leading-relaxed flex items-start gap-2">
                          <span className="text-[10px] font-heading font-bold text-primary/40 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                          {t}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sidebar CTA */}
                <div className="bg-primary rounded-sm p-5 md:p-6 text-center">
                  <Shield className="w-6 h-6 text-[hsl(var(--highland-gold))] mx-auto mb-3" />
                  <h4 className="font-heading font-semibold text-primary-foreground text-sm mb-2">
                    Need Expert Advice?
                  </h4>
                  <p className="text-primary-foreground/60 text-xs mb-4">
                    No pressure, no upselling — just honest expert advice.
                  </p>
                  <Link
                    to="/consultation"
                    className="cta-gradient text-accent-foreground font-bold px-5 py-3 rounded-sm inline-flex items-center gap-2 text-sm hover:opacity-90 transition-opacity w-full justify-center"
                  >
                    Request a Consultation <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ RELATED ARTICLES ═══ */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="eyebrow mb-2 block">Keep Reading</span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Related Articles</h2>
              <div className="w-10 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mt-3" />
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {relatedPosts.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={`/blog/${p.slug}`}
                    className="group block card-premium overflow-hidden h-full"
                  >
                    <div className="p-5 md:p-6 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[9px] font-body font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded-sm ${getCategoryColor(p.category)}`}>
                          {p.category}
                        </span>
                        <span className="text-muted-foreground text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {p.readTime}
                        </span>
                      </div>
                      <h3 className="font-heading font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {p.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
                        {p.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all">
                        Read Guide <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Back to blog */}
            <div className="text-center mt-10">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> View All Articles
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default BlogPostPage;

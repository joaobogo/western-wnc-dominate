import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Clock, Calendar, Tag, Mountain, CheckCircle,
  Quote, Star, BookOpen, Lightbulb, MapPin,
} from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import GuideLeadMagnet from "@/components/GuideLeadMagnet";
import { TrustSidebar } from "@/components/trust";
import { getBlogBySlug, blogPosts } from "@/data/blogs";
import { projectDetails } from "@/data/projects";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { getBlogInternalLinks } from "@/lib/blog-internal-links";
import BlogInternalLinksBlock from "@/components/blog/BlogInternalLinksBlock";
import LocalLinkWeb from "@/components/LocalLinkWeb";
import { getBlogLocalLinkWeb } from "@/lib/local-link-graph";
import { getBlogCta } from "@/lib/blog-cta";
import BlogMidArticleCTA from "@/components/blog/BlogMidArticleCTA";
import BlogClosingCTA from "@/components/blog/BlogClosingCTA";
import BlogSidebarCTA from "@/components/blog/BlogSidebarCTA";
import ArticleTOC, { type TocItem } from "@/components/blog/ArticleTOC";

/** Split article markdown at the H2 closest to the midpoint so the mid-article
 *  CTA lands between sections instead of interrupting a paragraph. */
const splitContentAtMidpoint = (content: string): [string, string] => {
  const lines = content.split("\n");
  if (lines.length < 20) return [content, ""];
  const target = Math.floor(lines.length / 2);
  let best = -1;
  lines.forEach((line, i) => {
    if (!line.startsWith("## ")) return;
    if (i < 4 || i > lines.length - 5) return;
    if (best === -1 || Math.abs(i - target) < Math.abs(best - target)) best = i;
  });
  if (best === -1) return [content, ""];
  return [lines.slice(0, best).join("\n"), lines.slice(best).join("\n")];
};

/* ─── Author data ─── */
const authors: Record<string, { name: string; role: string; bio: string }> = {
  default: {
    name: "Highlander Editorial Team",
    role: "Highlander Building Services",
    bio: "Expert roofing and construction guidance from the team that builds in Western North Carolina's mountains every day.",
  },
};

/* ─── Helpers ─── */
const getGuideType = (category: string): "storm" | "maintenance" | "checklist" =>
  category === "Storm" ? "storm" : category === "Maintenance" ? "maintenance" : "checklist";

const getCategoryColor = (category: string) => {
  const map: Record<string, string> = {
    Storm: "bg-accent/15 text-[hsl(var(--gold-ink))]",
    Maintenance: "bg-primary/10 text-primary",
    Materials: "bg-primary/10 text-primary",
    Cost: "bg-[hsl(var(--highland-gold)/0.15)] text-[hsl(var(--gold-ink))]",
    Insurance: "bg-primary/10 text-primary",
    Replacement: "bg-primary/10 text-primary",
    Tips: "bg-primary/10 text-primary",
    Commercial: "bg-primary/10 text-primary",
    Financing: "bg-[hsl(var(--highland-gold)/0.15)] text-[hsl(var(--gold-ink))]",
    Inspections: "bg-primary/10 text-primary",
  };
  return map[category] || "bg-primary/10 text-primary";
};

/* ─── Heading anchors, read time, table of contents ─── */
export const headingId = (text: string) =>
  `section-${text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60)}`;

/** Estimated read time at 225 wpm, rounded up to the nearest minute. */
const estimateReadTime = (content: string) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 225));
};

const buildToc = (content: string): TocItem[] =>
  content
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => l.replace("## ", "").trim())
    .map((label) => ({ id: headingId(label), label }));

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
const linkify = (text: string) =>
  text.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g,
    (_m, label: string, href: string) =>
      href.startsWith("http")
        ? `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-4 hover:text-[hsl(var(--gold-ink))]">${label}</a>`
        : `<a href="${href}" class="text-primary underline underline-offset-4 hover:text-[hsl(var(--gold-ink))]">${label}</a>`,
  );

const inlineMarkdown = (text: string) =>
  linkify(text.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>"));

const renderContent = (content: string) => {
  const lines = content.split("\n");
  const nodes: JSX.Element[] = [];
  // Buffer consecutive list lines so every <li> lands inside a real <ul>/<ol>.
  let listBuffer: { type: "ul" | "ol"; items: JSX.Element[]; start: number } | null = null;
  let tableBuffer: { rows: string[][]; start: number } | null = null;

  const flushTable = () => {
    if (!tableBuffer) return;
    const { rows, start } = tableBuffer;
    tableBuffer = null;
    const [head, ...body] = rows;
    nodes.push(
      <div key={`table-${start}`} className="my-6 overflow-x-auto">
        <table className="w-full text-sm border border-border">
          {head && (
            <thead className="bg-muted/40">
              <tr>
                {head.map((c, ci) => (
                  <th
                    key={ci}
                    scope="col"
                    className="text-left font-heading font-bold text-foreground p-3 border-b border-border"
                    dangerouslySetInnerHTML={{ __html: inlineMarkdown(c) }}
                  />
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {body.map((r, ri) => (
              <tr key={ri} className="border-b border-border last:border-0">
                {r.map((c, ci) => (
                  <td
                    key={ci}
                    className="p-3 align-top text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: inlineMarkdown(c) }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    );
  };

  const flushList = () => {
    if (!listBuffer) return;
    const { type, items, start } = listBuffer;
    listBuffer = null;
    nodes.push(
      type === "ul" ? (
        <ul key={`ul-${start}`} className="article-list">
          {items}
        </ul>
      ) : (
        <ol key={`ol-${start}`} className="article-ol">
          {items}
        </ol>
      ),
    );
  };

  const pushItem = (type: "ul" | "ol", index: number, item: JSX.Element) => {
    if (!listBuffer || listBuffer.type !== type) {
      flushList();
      listBuffer = { type, items: [], start: index };
    }
    listBuffer.items.push(item);
  };

  lines.forEach((line, i) => {
    // Markdown tables: | a | b |  /  |---|---|
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const cells = line.trim().slice(1, -1).split("|").map((c) => c.trim());
      if (cells.every((c) => /^:?-{2,}:?$/.test(c))) return; // separator row
      if (!tableBuffer) {
        flushList();
        tableBuffer = { rows: [], start: i };
      }
      tableBuffer.rows.push(cells);
      return;
    }
    flushTable();
    if (line.startsWith("## "))
      { flushList(); nodes.push(
        <h2 key={i} id={headingId(line.replace("## ", "").trim())} className="article-h2">
          {line.replace("## ", "")}
        </h2>
      ); return; }
    if (line.startsWith("### "))
      { flushList(); nodes.push(
        <h3 key={i} id={headingId(line.replace("### ", "").trim())} className="article-h3">
          {line.replace("### ", "")}
        </h3>
      ); return; }
    if (line.startsWith("- "))
      { pushItem("ul", i,
        <li key={i} className="flex items-start gap-2.5">
          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-[0.45em]" aria-hidden="true" />
          <span dangerouslySetInnerHTML={{ __html: inlineMarkdown(line.replace("- ", "")) }} />
        </li>
      ); return; }
    if (line.match(/^\d+\. /))
      { pushItem("ol", i,
        <li
          key={i}
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(line.replace(/^\d+\. /, "")) }}
        />
      ); return; }
    flushList();
    if (line.startsWith("> ")) {
      nodes.push(
        <blockquote
          key={i}
          className="article-quote"
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(line.replace("> ", "")) }}
        />,
      );
      return;
    }
    if (line.trim() === "") return;
    const boldProcessed = inlineMarkdown(line);
    nodes.push(<p key={i} dangerouslySetInnerHTML={{ __html: boldProcessed }} />);
  });
  flushList();
  flushTable();
  return nodes;
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogBySlug(slug || "");

  if (!post) {
    return (
      <>
        <Header />
        <main id="main-content" className="section-padding section-dark pt-32 md:pt-40 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4">
              Article Not Found
            </h1>
            <p className="text-dark-section-muted mb-6">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/blog"
              className="btn btn-primary btn-sm"
            >
              Browse All Articles <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const author = authors.default;
  const takeaways = extractTakeaways(post.content);
  const internalLinks = getBlogInternalLinks(post);
  const blogCta = getBlogCta(post);
  const [contentTop, contentBottom] = splitContentAtMidpoint(post.content);
  const readMinutes = estimateReadTime(post.content);
  const toc = buildToc(post.content);
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
            dateModified: post.date,
            image: post.image,
            author: "Highlander Team",
          },
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ],
          faqs: post.faqs,
        })}
      />
      <Header />
      <PageBreadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <main id="main-content">
        {/* ═══ HERO ═══ */}
        <section className="relative section-dark min-h-[50vh] flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img width={1600} height={1067} loading="eager" fetchPriority="high" decoding="async" 
              src={post.image || "/media/wnc-town-overlook.jpg"} 

              alt={post.imageAlt || post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            <div className="absolute inset-0 tartan-dark opacity-[0.08] pointer-events-none" />
          </div>

          <div className="container-tight max-w-4xl relative z-10 py-24 md:py-32">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-10 inline-flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))]" />
                <span className="text-caption font-heading font-bold text-white tracking-[0.15em] uppercase">Highlander Insight</span>
                <div className="h-px w-12 bg-white/10" />
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className={`text-caption md:text-caption font-body font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-sm ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
                <span className="text-white/80 text-body-xs font-body font-bold flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" aria-hidden="true" /> {formattedDate}
                </span>
                <span className="text-white/80 text-body-xs font-body font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4" aria-hidden="true" /> {readMinutes} min read
                </span>
                {post.town && (
                  <span className="text-white/80 text-body-xs font-body font-bold flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" aria-hidden="true" /> {post.town}, NC
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-display font-heading font-bold text-white mb-5 leading-[1.0] tracking-tightest text-balance drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
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
                      <Lightbulb className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                      <h2 className="font-heading font-semibold text-sm text-foreground">Key Takeaways</h2>
                    </div>
                    <div className="space-y-2">
                      {takeaways.map((t, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
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
                  className="article-prose"
                >
                  {renderContent(contentTop)}
                </motion.div>

                {contentBottom && (
                  <>
                    <BlogMidArticleCTA cta={blogCta} town={post.town} />
                    <div className="article-prose">{renderContent(contentBottom)}</div>
                  </>
                )}

                {/* Local Relevance Callout */}
                {post.town && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-primary/5 border border-primary/10 rounded-sm p-5 md:p-6 mt-10"
                  >
                    <div className="flex items-start gap-3">
                      <Mountain className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <h2 className="font-heading font-semibold text-sm text-foreground mb-1">
                          Local to {post.town}, NC
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          This article was written specifically for homeowners in {post.town} and the surrounding
                          area. Highlander Building Services serves {post.town} and all of Western North Carolina
                          with in-person consultations and local crews.
                        </p>
                        <Link
                          to="/consultation"
                          className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm mt-3 hover:gap-2.5 transition-all"
                        >
                          Talk With Our Local Team <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
                      <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
                      <h2 className="font-heading font-semibold text-foreground">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-4">
                      {post.faqs.map((faq, i) => (
                        <div key={i} className="bg-secondary/50 border border-border rounded-sm p-5">
                          <h3 className="font-heading font-semibold text-foreground text-sm mb-2">{faq.question}</h3>
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
                    <h2 className="font-heading font-semibold text-sm text-foreground mb-3">Related Services</h2>
                    <div className="w-8 h-px bg-[hsl(var(--highland-gold)/0.3)] mb-4" />
                    <div className="flex flex-wrap gap-2">
                      {post.relatedServices.map((svc) => (
                        <Link
                          key={svc.path}
                          to={svc.path}
                          className="btn btn-primary btn-sm"
                        >
                          {svc.label} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* SEO Internal Linking Block — city, service, related blog, project, estimate */}
                {/* Closing CTA — relevant service page + phone. Local link web stays below. */}
                <BlogClosingCTA cta={blogCta} town={post.town} />

                <BlogInternalLinksBlock links={internalLinks} town={post.town} />

                <LocalLinkWeb
                  className="!px-0 !py-10 bg-transparent"
                  eyebrow="Local Links"
                  heading={post.town ? `More for ${post.town}, NC` : "More Western NC resources"}
                  groups={getBlogLocalLinkWeb(post)}
                />

                {/* Localized Proof Moment - Dynamic connection to Gallery */}
                <div className="mt-16 pt-12 border-t border-border">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <span className="eyebrow mb-2 block">Project Proof</span>
                      <h2 className="text-2xl font-heading font-bold text-foreground">
                        {post.town ? `Real Work in ${post.town}` : "Mountain-Proven Results"}
                      </h2>
                    </div>
                    <Link to="/recent-projects" className="text-sm font-heading font-bold text-primary hover:underline flex items-center gap-1">
                      View All Projects <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projectDetails
                      .filter(p => !post.town || p.location.includes(post.town))
                      .slice(0, 2)
                      .map(project => (
                        <Link 
                          key={project.slug} 
                          to={`/projects/${project.slug}`}
                          className="group block card-premium overflow-hidden"
                        >
                          <div className="aspect-[16/9] overflow-hidden">
                            <img width={1600} height={1067} loading="lazy" decoding="async" 
                              src={project.heroImage} 
                              alt={project.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-5">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                              <span className="text-caption font-bold uppercase tracking-wider text-muted-foreground">{project.location}</span>
                            </div>
                            <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>

                {/* Local Town Bridge */}
                {post.town && (
                  <div className="mt-10 pt-8 border-t border-border">
                    <h2 className="text-caption md:text-body-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Market Context</h2>
                    <Link to={`/service-areas/${post.town.toLowerCase().trim().replace(/\s+/g, '-')}-nc`} className="group flex items-center justify-between p-6 bg-secondary/40 border border-border rounded-sm hover:border-primary/20 transition-all">
                      <div>
                        <p className="text-sm font-heading font-bold text-foreground mb-1">Roofing & Construction in {post.town}</p>
                        <p className="text-xs text-muted-foreground font-body">Explore localized standards and proven projects in your area.</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </div>
                )}


                {/* Author Bio */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 mt-10 pt-8 border-t border-border"
                >
                  <div className="w-12 h-12 rounded-sm bg-primary/8 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-caption font-body font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Written By
                    </p>
                    <h2 className="font-heading font-semibold text-foreground text-sm">{author.name}</h2>
                    <p className="text-muted-foreground text-xs font-body mb-2">{author.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{author.bio}</p>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
                <TrustSidebar />

                <ArticleTOC items={toc} />

                {/* Sticky desktop sidebar CTA */}
                <BlogSidebarCTA cta={blogCta} town={post.town} />
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
                        <span className={`text-caption font-body font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded-sm ${getCategoryColor(p.category)}`}>
                          {p.category}
                        </span>
                        <span className="text-muted-foreground text-xs flex items-center gap-1">
                          <Clock className="w-4 h-4" aria-hidden="true" /> {p.readTime}
                        </span>
                      </div>
                      <h3 className="font-heading font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {p.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
                        {p.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all">
                        Read Guide <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
                <ArrowLeft className="w-4 h-4" aria-hidden="true" /> View All Articles
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

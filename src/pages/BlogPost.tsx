import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { getBlogBySlug, blogPosts } from "@/data/blogs";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogBySlug(slug || "");

  if (!post) {
    return (
      <>
        <Header />
        <main className="section-padding text-center pt-32">
          <h1 className="text-3xl font-heading font-bold">Post Not Found</h1>
          <Link to="/blog" className="text-primary underline mt-4 inline-block">View All Posts</Link>
        </main>
        <Footer />
      </>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl md:text-2xl font-heading font-bold text-foreground mt-8 mb-4">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-heading font-semibold text-foreground mt-6 mb-3">{line.replace('### ', '')}</h3>;
      if (line.startsWith('- **')) {
        const parts = line.replace('- **', '').split('**');
        return <li key={i} className="text-muted-foreground mb-2"><strong className="text-foreground">{parts[0]}</strong>{parts[1]}</li>;
      }
      if (line.startsWith('- ')) return <li key={i} className="text-muted-foreground mb-2">{line.replace('- ', '')}</li>;
      if (line.match(/^\d+\. /)) return <li key={i} className="text-muted-foreground mb-2 list-decimal ml-5">{line.replace(/^\d+\. /, '')}</li>;
      if (line.trim() === '') return <br key={i} />;
      // Handle bold text
      const boldProcessed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: boldProcessed }} />;
    });
  };

  return (
    <>
      <Header />
      <main>
        <article className="section-padding bg-background pt-32 md:pt-40">
          <div className="container-tight max-w-3xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-medium text-sm mb-8 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> {post.category}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime} read</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 text-balance">
                {post.title}
              </h1>

              <div className="prose-custom">
                {renderContent(post.content)}
              </div>
            </motion.div>

            {/* CTA */}
            <div className="bg-primary rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-heading font-bold text-primary-foreground mb-2">Ready to Get Started?</h3>
              <p className="text-primary-foreground/70 mb-4">Schedule your free roof inspection today. We respond within 24 hours.</p>
              <Link
                to="/request-inspection"
                className="cta-gradient text-accent-foreground font-bold px-8 py-3 rounded-md inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                Request Free Inspection <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="section-padding bg-secondary">
          <div className="container-tight">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="p-6">
                    <span className="text-xs font-semibold text-accent uppercase">{p.category}</span>
                    <h3 className="font-heading font-semibold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{p.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
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

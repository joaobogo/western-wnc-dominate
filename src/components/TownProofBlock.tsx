import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, Shield, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { TownData } from "@/data/towns";
import type { TownProofContent } from "@/data/town-proof";

interface TownProofBlockProps {
  town: TownData;
  content: TownProofContent;
}

const TownProofBlock = ({ town, content }: TownProofBlockProps) => {
  return (
    <section className="section-padding bg-secondary/60">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-12"
        >
          <span className="eyebrow mb-3 block">{town.name} Proof</span>
          <h2 className="section-heading mb-4">What makes our work in {town.name} different.</h2>
          <p className="text-muted-foreground max-w-2xl font-body leading-relaxed">
            Local conditions, project types, and homeowner priorities shift town to town. This is the operating context we plan for in {town.name}.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {content.stats.map((stat) => (
                <div key={stat.label} className="border border-border bg-card px-5 py-5 rounded-sm">
                  <div className="text-2xl font-heading font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm font-heading font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground font-body leading-relaxed">{stat.detail}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="lg:col-span-5"
          >
            <div className="border border-border bg-card rounded-sm px-6 py-6 md:px-7 md:py-7 h-full">
              <div className="flex items-center gap-2 mb-5 text-primary">
                <MapPin className="w-4 h-4" />
                <span className="font-body text-xs uppercase tracking-[0.18em]">Job Highlights in {town.name}</span>
              </div>
              <div className="space-y-5">
                {content.jobHighlights.map((highlight) => (
                  <div key={highlight.title} className="border-b border-border/70 pb-5 last:border-b-0 last:pb-0">
                    <div className="flex flex-col md:flex-row gap-5">
                      {highlight.image && (
                        <div className="w-full md:w-32 h-32 shrink-0 overflow-hidden border border-border">
                          <img loading="lazy" decoding="async" 
                            src={highlight.image} 
                            alt={highlight.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-heading font-semibold text-foreground mb-1">{highlight.title}</h3>
                            <p className="text-sm text-muted-foreground font-body leading-relaxed mb-2">{highlight.summary}</p>
                            <p className="text-xs text-primary/80 font-body">{highlight.proof}</p>
                            {highlight.projectSlug ? (
                              <Link
                                to={`/projects/${highlight.projectSlug}`}
                                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                              >
                                View related project <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="lg:col-span-3"
          >
            <div className="border border-border bg-card rounded-sm px-6 py-6 md:px-7 md:py-7 h-full">
              <div className="flex items-center gap-2 mb-4 text-[hsl(var(--gold-ink))]">
                <Star className="w-4 h-4" />
                <span className="font-body text-xs uppercase tracking-[0.18em]">Town FAQs</span>
              </div>
              <Accordion type="single" collapsible className="space-y-2">
                {content.faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`town-faq-${index}`} className="border border-border rounded-sm px-4 bg-secondary/30">
                    <AccordionTrigger className="py-4 gap-4 text-left">
                      <span className="font-heading font-semibold text-sm text-foreground leading-snug">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <p className="text-sm text-muted-foreground font-body leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-6 border border-border rounded-sm px-4 py-4 bg-background/70">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Shield className="w-4 h-4" />
                  <span className="font-heading font-semibold text-sm">Local planning, not generic scopes.</span>
                </div>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  Every {town.name} project still includes the same warranty standards, documentation discipline, and mountain-specific install details.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TownProofBlock;
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/content/construction/types";

/**
 * 4–6 questions (plan §3.2.9). Native <details>, so the answers are in the
 * prerendered HTML and match the FAQPage schema built from the same array.
 */
const FaqAccordion = ({ faqs, heading = "Questions we get asked" }: { faqs: Faq[]; heading?: string }) => (
  <section className="section-padding bg-background" aria-labelledby="faq-heading">
    <div className="container-tight max-w-3xl">
      <h2 id="faq-heading" className="section-heading">{heading}</h2>
      <div className="mt-6 divide-y divide-border border-y border-border">
        {faqs.map((faq) => (
          <details key={faq.question} className="group">
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading text-lg font-bold text-foreground [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="pb-5 font-body text-body leading-relaxed text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default FaqAccordion;

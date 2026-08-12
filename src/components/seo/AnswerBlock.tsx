interface AnswerBlockProps {
  /** Question-style heading, e.g. "What is metal roofing in Western North Carolina?" */
  question: string;
  /** 2–3 sentence, plain-language extractable answer. */
  answer: string;
  /** Optional short supporting facts rendered as an extractable list. */
  points?: string[];
}

/**
 * AEO "quick answer" block. Rendered directly under the page H1 so answer
 * engines (Google AI Overviews, ChatGPT, Perplexity) can extract a clean,
 * self-contained response without parsing the full page.
 */
const AnswerBlock = ({ question, answer, points }: AnswerBlockProps) => (
  <section aria-label="Quick answer" className="bg-background border-b border-border/60">
    <div className="max-w-4xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <p className="eyebrow mb-3 text-[hsl(var(--gold-ink))]">Quick answer</p>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 leading-snug">
        {question}
      </h2>
      <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
        {answer}
      </p>
      {points && points.length > 0 && (
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {points.map((point) => (
            <li key={point} className="font-body text-sm text-foreground/85 flex gap-2">
              <span aria-hidden="true" className="text-[hsl(var(--gold-ink))]">—</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </section>
);

export default AnswerBlock;

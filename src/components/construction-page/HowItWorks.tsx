/**
 * TODO(Highlander): the plan's step 2 reads "Free site visit". Set this to
 * true only once John/Luke confirm the first construction visit is free;
 * until then the step says "Site visit" and no "free" claim is made.
 */
export const FIRST_VISIT_FREE = false;

export const HOW_IT_WORKS = [
  { title: "Call", line: "Tell us what you want to build. We'll say straight away if it's a fit." },
  { title: FIRST_VISIT_FREE ? "Free site visit" : "Site visit", line: "We walk the site and look at the slope, access and how it meets the roof." },
  { title: "Written scope", line: "You get the work, materials and price in writing before you commit." },
  { title: "Build", line: "We coordinate the permits and inspections for the job and build to the scope." },
] as const;

/** Exactly four steps, shown once per page (plan §3.2.7). */
const HowItWorks = () => (
  <section className="section-padding bg-background" aria-labelledby="how-it-works-heading">
    <div className="container-tight">
      <h2 id="how-it-works-heading" className="section-heading">How it works</h2>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOW_IT_WORKS.map((step, i) => (
          <li key={step.title} className="grid grid-cols-[auto_1fr] gap-x-3 rounded-sm border border-border bg-card p-4 md:block md:p-5">
            <span className="row-span-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-primary-foreground" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="self-center font-heading text-lg font-bold text-foreground md:mt-3">{step.title}</h3>
            <p className="mt-1 font-body text-body-sm leading-snug text-muted-foreground">{step.line}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;

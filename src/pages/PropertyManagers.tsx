import FocusedServicePage from "@/components/service/FocusedServicePage";

const PropertyManagers = () => (
  <FocusedServicePage
    path="/roofing/property-managers"
    name="Property Managers & HOAs"
    seoTitle="Roofing for Property Managers & HOAs in WNC | Highlander"
    seoDescription="Roof assessments, repairs, replacements and maintenance programs for property managers and HOAs in Western North Carolina, with written documentation."
    parent={{ name: "Commercial Roofing", url: "/roofing/commercial" }}
    eyebrow="Property managers and HOAs · Western North Carolina"
    h1="Roofing for Property Managers & HOAs"
    intro="One local contractor for roof assessments, repairs and planned replacements across the buildings you look after, with the documentation your board or owner needs."
    image={{ src: "/media/highlander-roof-charcoal-mountains.webp", srcSet: "/media/highlander-roof-charcoal-mountains-640.webp 640w, /media/highlander-roof-charcoal-mountains-960.webp 960w, /media/highlander-roof-charcoal-mountains.webp 1600w", alt: "Charcoal shingle roof by Highlander with the Western North Carolina mountains behind it", width: 1600, height: 900 }}
    quick={{ question: "Does Highlander work with property managers and HOAs?", answer: "Yes. Highlander provides roof condition assessments with written reports and photos, repairs, replacements and maintenance programs for commercial and multi-family properties in Western North Carolina." }}
    scopeEyebrow="How we help"
    scopeHeading="Roofs you can plan and budget for"
    scope={[
      { title: "Condition assessments", text: "Written reports with photo documentation for each roof." },
      { title: "Repairs", text: "Leaks and damage assessed and scoped so you can approve the work." },
      { title: "Planned replacements", text: "Scopes that help you plan the work across buildings and budgets." },
      { title: "Maintenance programs", text: "Scheduled inspections and minor repairs to catch problems early." },
      { title: "Gutters and exterior", text: "Gutters, siding and small exterior repairs through the same office." },
      { title: "Resident communication", text: "Schedules and access planned with you before crews arrive." },
    ]}
    decisionsHeading="What your board or owner will want to see"
    decisions={["Photos of the actual conditions", "A written scope for each building", "Options when repair and replacement are both reasonable", "A schedule that accounts for residents and access", "Proof of license and insurance"]}
    steps={[
      { title: "Call the office", text: "Tell us about the property, the number of buildings and what prompted the call." },
      { title: "We assess the roofs", text: "We inspect and document the conditions we find." },
      { title: "Written scope", text: "You get a scope and price you can take to your board or owner." },
      { title: "Work and closeout", text: "The work is scheduled around access and documented when it is done." },
    ]}
    faqs={[
      { question: "Can you work across more than one property?", answer: "Yes. Tell us about the portfolio and we will plan assessments and scopes building by building." },
      { question: "Do you offer maintenance programs?", answer: "Yes. Commercial maintenance programs include scheduled inspections and minor repairs. We will recommend a schedule after seeing the roofs." },
      { question: "Can you provide what our board needs to approve the work?", answer: "We provide a written scope, price and photo documentation. Tell us if your board has a required format." },
    ]}
    related={[{ label: "Commercial roofing", href: "/roofing/commercial" }, { label: "Roof repair", href: "/roofing/roof-repair" }, { label: "Seamless gutters", href: "/roofing/gutters" }, { label: "Handyman & small repairs", href: "/construction/handyman" }]}
    closingHeading="Looking after a building or community?"
    topic="commercial"
    ctaId="property-managers"
  />
);

export default PropertyManagers;

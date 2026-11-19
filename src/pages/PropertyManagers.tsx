import FocusedServicePage from "@/components/service/FocusedServicePage";

const PropertyManagers = () => (
  <FocusedServicePage
    path="/roofing/property-managers"
    name="Property Managers & HOAs"
    seoTitle="Roofing for Property Managers & HOAs | Highlander"
    seoDescription="Roof inspections, repairs and replacements for property managers, HOAs and rental owners in Western NC. One contact, photo reports, scheduled upkeep."
    parent={{ name: "Commercial Roofing", url: "/roofing/commercial" }}
    eyebrow="Property managers and HOAs · Western North Carolina"
    h1="Roofing and Building Services for Property Managers and HOAs in Western NC"
    intro="For HOA boards, property managers and vacation-rental owners: one local contact for every roof and exterior job, with the photos and written scopes your board or owner needs."
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
    local={{
      heading: "Types of properties",
      paragraphs: [
        "HOA communities, condominiums, vacation rentals and small commercial buildings. Larger low-slope and commercial roofs are covered on the commercial roofing page.",
        "After a storm, the same office documents the damage in a format you can use for the claim conversation; see storm damage response.",
      ],
    }}
    faqs={[
      { question: "Can you inspect all the roofs in our HOA on a schedule?", answer: "Yes. Maintenance programs include scheduled inspections and minor repairs. Tell us how many buildings there are, and we will recommend a schedule after seeing the roofs." },
      { question: "Do you send photo reports the board can review?", answer: "Yes. Inspections come with photo documentation and a written scope and price. Tell us if your board has a required format." },
      { question: "Can you work around guests at a vacation rental?", answer: "Yes. Share the booking calendar or the dates the property is empty, and the work is scheduled around them where the job allows." },
      { question: "Do you help with insurance claims after a storm?", answer: "We inspect the roofs and document the damage with photos and a written scope you can use in the conversation with the insurer. The claim decision rests with the insurer." },
      { question: "Do you also handle gutters and small repairs?", answer: "Yes. Gutters, siding and small exterior repairs, including handyman work between guests, go through the same office." },
    ]}
    related={[{ label: "Commercial roofing", href: "/roofing/commercial" }, { label: "Storm damage", href: "/roofing/storm-damage" }, { label: "Roof repair", href: "/roofing/roof-repair" }, { label: "Seamless gutters", href: "/roofing/gutters" }, { label: "Handyman & small repairs", href: "/construction/handyman" }]}
    closingHeading="Looking after a building or community?"
    topic="commercial"
    ctaId="property-managers"
  />
);

export default PropertyManagers;

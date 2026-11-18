import PaidAdsLanding from "@/components/PaidAdsLanding";
import heroImg from "@/assets/gallery/deck-sylva-doors-wide.webp";

const HandymanAds = () => (
  <PaidAdsLanding
    title="Handyman & Small Repairs in Western NC | Highlander"
    description="Deck boards, railings, gutter fixes, trim and punch lists in Western North Carolina. Call Highlander or send a short request with your list."
    path="/lp/handyman"
    serviceName="Handyman & Small Repairs"
    heroImage={heroImg}
    heroAlt="Rebuilt elevated deck with new boards and railing by Highlander in Sylva, North Carolina"
    eyebrow="Handyman and small repairs · Western North Carolina"
    headline="Handyman & Small Home Repairs in Western NC"
    subheadline="Call with your list. A licensed local contractor looks at the work and gives you the scope and price in writing before anything starts."
    ctaLabel="Send My Repair List"
    urgencyOptions={["Something needs attention now", "Need help soon", "This month", "Just planning"]}
    trustStats={[
      { value: "One", label: "Call for the list", detail: "One item or ten, start with what you have" },
      { value: "Written", label: "Scope and price", detail: "In writing before work starts" },
      { value: "NC GC", label: "Licensed contractor", detail: "North Carolina General Contractor" },
      { value: "2017", label: "Serving WNC", detail: "Family-owned and locally run" },
    ]}
    highlights={[
      "Deck boards, railings and worn steps replaced before someone gets hurt.",
      "Gutter seams, sagging runs and missing downspouts put right.",
      "Rotted fascia, open soffits, split trim and damaged siding boards repaired.",
      "Home-inspection punch lists and repairs at second homes while you are away.",
    ]}
    quickSteps={[
      { title: "Tell us what is on the list", detail: "Call the office or send your contact details. One item or ten is fine." },
      { title: "We look at the work", detail: "We set up a visit, or tell you on the call if another team is a better fit." },
      { title: "You get it in writing", detail: "The scope and price come in writing before the work is scheduled." },
    ]}
    trustBullets={[
      "A roofing company and licensed general contractor, so a small fix never hides a bigger problem",
      "Scope and price in writing before work starts",
      "One Franklin office to call during business hours",
    ]}
    reviewId="lorrie-contino-2024"
    faqs={[
      {
        question: "Is any job too small?",
        answer: "Call and tell us what is on the list. The office will tell you whether the job is a fit and how it would be scheduled. Several small items on one property are often easiest to handle together.",
      },
      {
        question: "Can you handle repairs while I am out of town?",
        answer: "Yes, for many exterior repairs. Tell us how to reach the property and what you have noticed, and we will report back with what we found and what we did.",
      },
      {
        question: "How is handyman work priced?",
        answer: "From a written scope for your list: what needs doing, materials and access. You see the price before the work is scheduled.",
      },
    ]}
  />
);

export default HandymanAds;

import PaidAdsLanding from "@/components/PaidAdsLanding";
import heroImg from "@/assets/work/roof-gutter-guard-eave.webp";

const GuttersAds = () => (
  <PaidAdsLanding
    title="Seamless Gutters in Western NC | Highlander"
    description="Seamless gutters, downspouts and gutter repairs for Western North Carolina homes. Call Highlander or send a short request about your home."
    path="/lp/gutters"
    serviceName="Seamless Gutters"
    serviceCategory="gutters"
    reviewLabel="What a customer said"
    recentWork={{ heading: "Recent Highlander work across Western NC." }}
    heroImage={heroImg}
    heroAlt="Highlander gutter work: a seamless gutter and downspout along the eave of a shingle roof"
    eyebrow="Seamless gutters · Western North Carolina"
    headline="Seamless Gutters Built for Mountain Rain"
    subheadline="New gutters, downspouts and repairs sized for your roof, with the scope and price in writing before work starts."
    ctaLabel="Get My Gutters Looked At"
    urgencyOptions={["Leaking or overflowing now", "Need help soon", "This month", "Just comparing options"]}
    trustStats={[
      { value: "Seamless", label: "Gutter runs", detail: "Fewer joints where leaks start" },
      { value: "Written", label: "Scope and price", detail: "In writing before work starts" },
      { value: "NC GC", label: "Licensed contractor", detail: "North Carolina General Contractor" },
      { value: "2017", label: "Serving WNC", detail: "Family-owned and locally run" },
    ]}
    highlights={[
      "Seamless runs and downspouts planned around how water leaves your roof.",
      "Repairs for leaking seams, sagging sections and missing downspouts.",
      "Fascia checked while we are there, because that is where gutter leaks do damage.",
      "A roofing team that sees the roof edge and the gutter as one system.",
    ]}
    quickSteps={[
      { title: "Tell us about the house", detail: "Call the office or send your contact details. Photos of the problem area help." },
      { title: "We look at the roof edge", detail: "We check the gutters, downspouts, fascia and where the water is going." },
      { title: "You get it in writing", detail: "Repair or replace, with the scope and price written down." },
    ]}
    trustBullets={[
      "Gutters installed by a roofing company that understands the roof edge",
      "Scope and price in writing before work starts",
      "One Franklin office to call during business hours",
    ]}
    reviewId="claire-proctor-2026"
    faqs={[
      {
        question: "Can you repair my gutters instead of replacing them?",
        answer: "Often, yes. If the run is sound, a leaking seam, a sagging section or a missing downspout can usually be fixed. We will tell you if replacement makes more sense.",
      },
      {
        question: "Do you also handle gutter guards?",
        answer: "Ask us when you call. We will look at the trees around your home and the roof before recommending whether guards are worth it.",
      },
      {
        question: "What does a new gutter system cost?",
        answer: "It depends on the length of the runs, the height of the home, the number of downspouts and access. You get the price in writing after we see the house.",
      },
    ]}
  />
);

export default GuttersAds;

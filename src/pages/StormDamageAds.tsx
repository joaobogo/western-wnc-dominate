import { REVIEW_COUNT_LABEL, REVIEW_STARS } from "@/data/business";
import PaidAdsLanding from "@/components/PaidAdsLanding";
import heroImg from "@/assets/gallery/asphalt-005.webp";

const StormDamageAds = () => (
  <PaidAdsLanding
    title="Storm Damage Roof Help | Fast Local Response"
    description="Storm damage landing page for paid traffic with fast response messaging, a short lead form, and local trust proof for Western North Carolina homeowners."
    path="/lp/storm-damage"
    serviceName="Storm Damage"
    heroImage={heroImg}
    heroAlt="Storm-damaged roof inspection in Western North Carolina"
    eyebrow="Storm damage landing page"
    headline="Storm hit your roof? Get a local response before the next rain."
    subheadline="Fast assessments, clear documentation, and straight answers for Western North Carolina homeowners dealing with wind, hail, leaks, or fallen debris."
    ctaLabel="Get My Storm Damage Assessed"
    adVariants={{
      hail: {
        headline: "Hail Damage Roof Inspection in Western NC",
        subheadline: "We document the damage with photos you can hand straight to your insurance adjuster.",
        ctaLabel: "Get My Hail Damage Documented",
      },
      insurance: {
        headline: "Storm Damage Claim Help in Western NC",
        subheadline: "Local crews document the damage and walk your claim through with you, step by step.",
        ctaLabel: "Get My Damage Documented",
      },
    }}
    urgencyOptions={["Emergency today", "Rapid response", "This week", "Just need answers"]}
    trustStats={[
      { value: "Rapid", label: "Storm response", detail: "Same-day help for urgent leak situations" },
      { value: REVIEW_STARS, label: "Google Rating", detail: REVIEW_COUNT_LABEL },
      { value: "Local", label: "WNC team", detail: "Not out-of-town storm chasers" },
      { value: REVIEW_STARS, label: "Client rating", detail: "Built on responsiveness and follow-through" },
    ]}
    highlights={[
      "Local crews who know mountain wind, hail, and tree-impact damage patterns.",
      "Photo-ready documentation to support insurance conversations without hype.",
      "Temporary protection planning when active water intrusion cannot wait.",
      "Clear repair-vs-replace guidance instead of panic-driven upsells.",
    ]}
    quickSteps={[
      { title: "You reach out", detail: "Use the short form or call directly so we can understand the urgency and location fast." },
      { title: "We assess the damage", detail: "A local advisor or inspector documents what happened and explains the next best move." },
      { title: "You get a clear path", detail: "Repair, mitigation, insurance support, or replacement — with documentation to back it up." },
    ]}
    trustBullets={[
      "No door-knocker pressure tactics",
      "Licensed and insured local company",
      "Honest scopes built around actual storm conditions",
    ]}
    reviewId="willard-armes-2024"
    faqs={[
      {
        question: "How fast can you respond after a storm?",
        answer: "For urgent leak situations we prioritize same-day or next-day response when possible. For non-emergency storm assessments, we typically schedule on a same-day or next-day basis depending on event volume.",
      },
      {
        question: "Will you help with insurance documentation?",
        answer: "Yes. We document storm-related roof conditions clearly so homeowners have organized photos and written findings for claim discussions and adjuster meetings.",
      },
      {
        question: "Do I need a full replacement after every storm?",
        answer: "No. Some roofs need targeted repair, some need temporary protection, and some do justify replacement. We inspect first and tell you the truth about which category you are in.",
      },
    ]}
  />
);

export default StormDamageAds;
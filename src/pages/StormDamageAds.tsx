import { REVIEW_COUNT_LABEL, REVIEW_STARS } from "@/data/business";
import PaidAdsLanding from "@/components/PaidAdsLanding";
import heroImg from "@/assets/gallery/asphalt-005.webp";

const StormDamageAds = () => (
  <PaidAdsLanding
    title="Storm Damage Roof Help in Western NC | Highlander"
    description="Discuss storm-related roof damage in Western North Carolina. Start with a short contact form and get clear documentation and repair-or-replace guidance."
    path="/lp/storm-damage"
    serviceName="Storm Damage"
    heroImage={heroImg}
    heroAlt="Storm-damaged roof inspection in Western North Carolina"
    eyebrow="Storm damage landing page"
    headline="Storm hit your roof? Start with a clear damage assessment request."
    subheadline="Clear documentation and straight answers for Western North Carolina homeowners dealing with wind, hail, leaks, or fallen debris."
    ctaLabel="Get My Storm Damage Assessed"
    adVariants={{
      hail: {
        headline: "Hail Damage Roof Inspection in Western NC",
        subheadline: "We document the damage with photos you can hand straight to your insurance adjuster.",
        ctaLabel: "Get My Hail Damage Documented",
      },
      insurance: {
        headline: "Storm Damage Claim Help in Western NC",
        subheadline: "Highlander documents observed roof damage and provides contractor information you can use in conversations with your carrier or adjuster.",
        ctaLabel: "Get My Damage Documented",
      },
    }}
    urgencyOptions={["Active leak", "Recent storm damage", "This week", "Just need answers"]}
    trustStats={[
      { value: "Direct", label: "Storm support", detail: "Call during office hours for active leak concerns" },
      { value: REVIEW_STARS, label: "Google Rating", detail: REVIEW_COUNT_LABEL },
      { value: "2", label: "Showrooms", detail: "Franklin & Sylva" },
      { value: "Written", label: "Damage scope", detail: "Observed conditions and proposed work documented" },
    ]}
    highlights={[
      "Western North Carolina roof experience with wind, hail, heavy rain, and fallen-debris damage.",
      "Photo-ready documentation to support insurance conversations without hype.",
      "Temporary protection planning when active water intrusion cannot wait.",
      "Clear repair-vs-replace guidance instead of panic-driven upsells.",
    ]}
    quickSteps={[
      { title: "You reach out", detail: "Use the short form or call directly during staffed business hours to explain what happened." },
      { title: "We assess the damage", detail: "Highlander documents what is visible and explains the appropriate repair, protection, or replacement path." },
      { title: "You get a clear path", detail: "Repair, temporary protection when appropriate, or replacement — with contractor documentation to explain the scope." },
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
        answer: "For an active leak, call during office hours and explain what is happening. Outside office hours, send a request for follow-up. Assessment timing depends on conditions, safety, event volume, and current scheduling.",
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
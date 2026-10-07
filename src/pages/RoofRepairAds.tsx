import PaidAdsLanding from "@/components/PaidAdsLanding";
import heroImg from "@/assets/gallery/asphalt-003.webp";

const RoofRepairAds = () => (
  <PaidAdsLanding
    title="Roof Repair in Western NC | Highlander"
    description="Discuss roof repair or an active leak with Highlander in Western North Carolina. Start with a short contact form or call during staffed business hours."
    path="/lp/roof-repair"
    serviceName="Roof Repair"
    heroImage={heroImg}
    heroAlt="Roof repair work on a residential home in Western North Carolina"
    eyebrow="Roof repair · Western North Carolina"
    headline="Roof Repair in Western NC: Clear Leak Assessment & Next Steps"
    subheadline="We diagnose the source, explain whether repair makes sense, and give you a clear next step based on the roof condition."
    ctaLabel="Get My Repair Assessed"
    adVariants={{
      leak: {
        headline: "Roof Leak in WNC? Start With a Clear Assessment Request",
        subheadline: "Tell us what you are seeing and Highlander will review the request during staffed business hours and arrange the appropriate next step.",
        ctaLabel: "Get My Leak Looked At",
      },
      emergency: {
        headline: "Active Roof Leak in Western NC",
        subheadline: "Active water inside? Use the short form or call the office directly and clearly identify the active leak so the team can triage the request.",
        ctaLabel: "Discuss My Active Leak",
      },
    }}
    urgencyOptions={["Leak happening now", "Need help soon", "This week", "Just comparing options"]}
    trustStats={[
      { value: "Staffed", label: "Request review", detail: "Inquiries reviewed during business hours" },
      { value: "Written", label: "Repair guidance", detail: "Scope and recommendation documented" },
      { value: "NC GC", label: "Licensed contractor", detail: "North Carolina General Contractor" },
      { value: "2017", label: "Serving WNC", detail: "Family-owned, locally run by a mountain-experienced team" },
    ]}
    highlights={[
      "Leak tracing that focuses on the real source instead of a guess near the stain.",
      "Targeted repair recommendations when a full replacement is not the right spend.",
      "Documentation and photos so you know exactly what was found.",
      "Active-leak requests can be clearly flagged so the team can triage them during staffed hours.",
    ]}
    quickSteps={[
      { title: "Tell us what you are seeing", detail: "Send your contact details first. We will ask about the leak, missing shingles, or damage during follow-up." },
      { title: "We inspect the source", detail: "We assess the roof system, flashing, and nearby failure points instead of treating symptoms only." },
      { title: "You get a straight recommendation", detail: "Repair now, monitor, or replace — with the reasoning explained clearly." },
    ]}
    trustBullets={[
      "Permanent-minded repairs, not temporary patchwork sold as a solution",
      "Licensed North Carolina General Contractor",
      "Written scopes so you know exactly what is included",
    ]}
    reviewId="jh-dillsboro-2019"
    faqs={[
      {
        question: "Can you fix a leak without replacing the whole roof?",
        answer: "Often yes. If the issue is isolated and the surrounding roof system is still sound, a targeted repair is usually the right move. We inspect before recommending anything bigger.",
      },
      {
        question: "How soon can someone look at my roof repair issue?",
        answer: "Use the form or call the office and clearly identify active water intrusion. Highlander reviews urgent requests during staffed business hours and will provide the earliest available next step based on conditions and scheduling.",
      },
      {
        question: "Will you tell me if repair is no longer the smart option?",
        answer: "Yes. If the roof has moved beyond cost-effective repair, we explain why clearly so you are not spending money twice.",
      },
    ]}
  />
);

export default RoofRepairAds;
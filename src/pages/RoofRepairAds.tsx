import PaidAdsLanding from "@/components/PaidAdsLanding";
import heroImg from "@/assets/gallery/asphalt-003.webp";

const RoofRepairAds = () => (
  <PaidAdsLanding
    title="Roof Repair in Western NC | Fast Local Leak Help"
    description="Roof repair landing page for paid traffic with a faster form, leak-focused messaging, and conversion-oriented trust proof for Western North Carolina homeowners."
    path="/lp/roof-repair"
    serviceName="Roof Repair"
    heroImage={heroImg}
    heroAlt="Roof repair work on a residential home in Western North Carolina"
    eyebrow="Roof repair · Western North Carolina"
    headline="Roof Repair in Western NC — Local Crews, Fast Leak Answers"
    subheadline="We diagnose the actual source, explain whether repair makes sense, and move quickly when water is getting inside your home."
    ctaLabel="Get My Repair Assessed"
    adVariants={{
      leak: {
        headline: "Roof Leak? Local WNC Crews Can Look Today",
        subheadline: "Tell us what you are seeing and a Franklin-based advisor calls you back to schedule the leak assessment.",
        ctaLabel: "Get My Leak Looked At",
      },
      emergency: {
        headline: "Emergency Roof Repair in Western NC",
        subheadline: "Active water inside? Send the short form or call the office directly and we prioritize the visit.",
        ctaLabel: "Get Emergency Help",
      },
    }}
    urgencyOptions={["Leak happening now", "Within 48 hours", "This week", "Just comparing options"]}
    trustStats={[
      { value: "48hr", label: "Assessment goal", detail: "Same-day for urgent leak calls" },
      { value: "Honest", label: "Repair guidance", detail: "We tell you if replacement is unnecessary" },
      { value: "Local", label: "Crew accountability", detail: "In-house Highlander crews" },
      { value: "2017", label: "Serving WNC", detail: "Family-owned, locally run by a mountain-experienced team" },
    ]}
    highlights={[
      "Leak tracing that focuses on the real source instead of a guess near the stain.",
      "Targeted repair recommendations when a full replacement is not the right spend.",
      "Documentation and photos so you know exactly what was found.",
      "Fast local follow-up for active leak situations across Western North Carolina.",
    ]}
    quickSteps={[
      { title: "Tell us what you are seeing", detail: "A few details about the leak, missing shingles, or damage help us prioritize quickly." },
      { title: "We inspect the source", detail: "We assess the roof system, flashing, and nearby failure points instead of treating symptoms only." },
      { title: "You get a straight recommendation", detail: "Repair now, monitor, or replace — with the reasoning explained clearly." },
    ]}
    trustBullets={[
      "Permanent-minded repairs, not temporary patchwork sold as a solution",
      "Licensed and insured local team",
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
        answer: "Active leaks get priority. Most non-emergency repair assessments are scheduled on a same-day or next-day basis depending on weather and call volume.",
      },
      {
        question: "Will you tell me if repair is no longer the smart option?",
        answer: "Yes. If the roof has moved beyond cost-effective repair, we explain why clearly so you are not spending money twice.",
      },
    ]}
  />
);

export default RoofRepairAds;
import PaidAdsLanding from "@/components/PaidAdsLanding";
import heroImg from "@/assets/gallery/addition-franklin-vaulted-room.webp";
import roomSet from "@/assets/gallery/addition-franklin-vaulted-room.webp?w=640;960;1280&format=webp&as=srcset";
import windowsImg from "@/assets/gallery/addition-franklin-gable-windows.webp";
import windowsSet from "@/assets/gallery/addition-franklin-gable-windows.webp?w=480;800&format=webp&as=srcset";
import cullowheeImg from "@/assets/work/addition-cullowhee-roofline.webp";
import cullowheeSet from "@/assets/work/addition-cullowhee-roofline.webp?w=480;800&format=webp&as=srcset";

/** /lp/additions: noindex paid landing page (John's 404 fix guide, HL-065). */
const AdditionsAds = () => (
  <PaidAdsLanding
    title="Home Additions in Western NC | Highlander"
    description="Add a bedroom, suite, sunroom or garage to your Western NC home. Highlander designs, permits and builds it, with the scope and price in writing first."
    path="/lp/additions"
    serviceName="Home Additions"
    serviceCategory="construction"
    reviewLabel="What a customer said"
    recentWork={{
      heading: "Highlander additions in Western NC.",
      items: [
        { town: "Franklin, NC", title: "Living room addition with a vaulted gable", image: { src: heroImg, srcSet: roomSet, alt: "Vaulted living room addition with a wall of windows by Highlander in Franklin, North Carolina", width: 1500, height: 844 } },
        { town: "Franklin, NC", title: "Gable wall of mountain-view windows", image: { src: windowsImg, srcSet: windowsSet, alt: "Gable end of the Franklin living room addition with tall windows", width: 1200, height: 1600 } },
        { town: "Cullowhee, NC", title: "Addition roofline and siding", image: { src: cullowheeImg, srcSet: cullowheeSet, alt: "Roofline, lap siding and trim on a Highlander addition in Cullowhee, North Carolina", width: 1125, height: 1500 } },
      ],
    }}
    heroImage={heroImg}
    heroAlt="Vaulted living room addition with a wall of windows by Highlander in Franklin, North Carolina"
    eyebrow="Home additions · Western North Carolina"
    headline="Add the Space Your Mountain Home Is Missing"
    subheadline="A bedroom, suite, sunroom or garage, designed, permitted and built by one local team, with the scope and price in writing before work starts."
    ctaLabel="Plan My Addition"
    urgencyOptions={["Ready to start planning", "Within the next few months", "This year", "Just exploring ideas"]}
    trustStats={[
      { value: "One team", label: "Design and build", detail: "Planning, permits and construction together" },
      { value: "Written", label: "Scope and price", detail: "In writing before work starts" },
      { value: "NC GC", label: "Licensed contractor", detail: "North Carolina General Contractor" },
      { value: "In-house", label: "Roofing", detail: "The new roof is built to match the old one" },
    ]}
    highlights={[
      "Bedrooms and primary suites added to homes that have run out of room.",
      "Sunrooms, bump-outs and living spaces planned around the view.",
      "Garages and bonus rooms, with the roofline tied cleanly into the house.",
      "Slopes, mountain foundations and steep driveways planned for from the start.",
    ]}
    quickSteps={[
      { title: "Consultation", detail: "Call the office or send your contact details. Tell us what you want to add and how the house is used today." },
      { title: "Design and permits", detail: "The addition is designed with you, and the county permit steps included in the scope are coordinated for you." },
      { title: "Written scope, then build", detail: "You approve the scope and price in writing before construction is scheduled." },
    ]}
    trustBullets={[
      "Design and build by one local team, so plans and construction stay in step",
      "Roofing done in-house, so the new roof matches and ties in properly",
      "Scope and price in writing before work starts",
    ]}
    reviewId="candy-wood-2025"
    faqs={[
      {
        question: "Do you handle the permits for an addition?",
        answer: "When a permit is required and included in Highlander's scope, the project team coordinates the applicable permit and inspection steps with the county. Requirements are confirmed for your specific property first.",
      },
      {
        question: "How long does an addition take?",
        answer: "It depends on the size of the addition, the design and permit steps and the site. Your written scope sets out the schedule before construction starts.",
      },
      {
        question: "Can you match the existing roof?",
        answer: "Yes. Highlander is also a roofing company, so the new roof is planned with the existing one: materials, pitch and the tie-in where they meet.",
      },
      {
        question: "Can you build on a sloped lot?",
        answer: "Yes. Many mountain lots slope. The foundation approach is planned for your site during design and is part of the written scope.",
      },
    ]}
  />
);

export default AdditionsAds;

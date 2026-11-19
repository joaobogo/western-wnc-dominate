import FocusedServicePage from "@/components/service/FocusedServicePage";

const KitchenRemodeling = () => (
  <FocusedServicePage
    path="/construction/kitchen-remodeling"
    name="Kitchen Remodeling"
    seoTitle="Kitchen Remodeling in Western NC | Highlander"
    seoDescription="Kitchen remodels for Western North Carolina homes: new layouts, cabinetry, countertops, plumbing, electrical and finish work from a licensed contractor."
    parent={{ name: "Renovations", url: "/construction/renovations" }}
    eyebrow="Kitchen remodeling · Western North Carolina"
    h1="Kitchen Remodeling in Western NC"
    intro="A kitchen that fits how you cook and gather, planned around the house you already have and built by a licensed local contractor."
    image={{ src: "/media/highlander-renovated-kitchen-living.webp", srcSet: "/media/highlander-renovated-kitchen-living-640.webp 640w, /media/highlander-renovated-kitchen-living-960.webp 960w, /media/highlander-renovated-kitchen-living.webp 1600w", alt: "Mountain-home kitchen and living area with wood beams and a stone fireplace", width: 1600, height: 900 }}
    showReviews={false}
    quick={{ question: "What does a Highlander kitchen remodel include?", answer: "A kitchen remodel can cover a new layout, cabinetry, countertops, plumbing, electrical and finish work. Highlander is a licensed general contractor in Western North Carolina, so the scope, selections and price are set out in writing before work begins." }}
    scopeEyebrow="What we build"
    scopeHeading="The whole kitchen, not just the cabinets"
    scope={[
      { title: "Layout changes", text: "Moving the sink, range or walls so the room works for how you actually use it." },
      { title: "Cabinetry and counters", text: "Cabinets, countertops and storage planned together with the layout." },
      { title: "Plumbing and electrical", text: "The systems behind the walls, updated to suit the new kitchen." },
      { title: "Opening up the space", text: "Connecting the kitchen to living areas where the structure allows it." },
      { title: "Finish work", text: "Flooring, trim and the details that make the room feel finished." },
      { title: "Older mountain homes", text: "Remodels planned around what we find in the walls and floors of an older house." },
    ]}
    decisionsHeading="What shapes the scope and the price"
    decisions={["How much of the layout changes", "Whether plumbing or electrical needs to move", "Cabinet, counter and appliance selections", "Structural work if walls come out", "How the home will be used during the work"]}
    steps={[
      { title: "Call the office", text: "Tell us what you want to change and how the space works today." },
      { title: "We see the space", text: "We look at the room, the structure and the systems behind the walls." },
      { title: "Written scope", text: "You get the work, the selections to make and the price in writing." },
      { title: "Build and walkthrough", text: "The work is scheduled, built and walked through with you at the end." },
    ]}
    faqs={[
      { question: "How long does a kitchen remodel take?", answer: "A full kitchen remodel typically takes 6 to 10 weeks depending on scope. Layout changes, plumbing relocation and custom cabinetry add time. Your written scope sets out the plan for your project." },
      { question: "Can we live at home during the remodel?", answer: "In most cases, yes, with some inconvenience. The kitchen is the most disruptive room to work on, so we talk through staging and temporary solutions before work starts." },
      { question: "Can you help with the design?", answer: "Yes. Highlander offers in-house design and planning for remodels, including layouts and feasibility." },
      { question: "What will it cost?", answer: "It depends on layout changes, systems and selections. You get a written scope and price after we see the space." },
    ]}
    related={[{ label: "All renovations", href: "/construction/renovations" }, { label: "Bathroom remodeling", href: "/construction/bathroom-remodeling" }, { label: "Design & planning", href: "/construction/design" }, { label: "Financing", href: "/financing" }]}
    closingHeading="Ready to talk through your kitchen?"
    topic="renovations"
    ctaId="kitchen"
  />
);

export default KitchenRemodeling;

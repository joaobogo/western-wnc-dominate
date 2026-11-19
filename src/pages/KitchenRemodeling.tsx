import FocusedServicePage from "@/components/service/FocusedServicePage";

const KitchenRemodeling = () => (
  <FocusedServicePage
    path="/construction/kitchen-remodeling"
    name="Kitchen Remodeling"
    seoTitle="Kitchen Remodeling in Western NC | Highlander"
    seoDescription="Kitchen remodeling for mountain homes in Franklin, Sylva, Highlands and Cashiers. Design, permits and build by one local team, with the price in writing."
    parent={{ name: "Renovations", url: "/construction/renovations" }}
    eyebrow="Kitchen remodeling · Western North Carolina"
    h1="Kitchen Remodeling for Western North Carolina Mountain Homes"
    intro="Design, permits and build by one local team: a kitchen planned around the house you already have, with the scope and price in writing before work begins."
    image={{ src: "/media/highlander-renovated-kitchen-living.webp", srcSet: "/media/highlander-renovated-kitchen-living-640.webp 640w, /media/highlander-renovated-kitchen-living-960.webp 960w, /media/highlander-renovated-kitchen-living.webp 1600w", alt: "Mountain-home kitchen and living area with wood beams and a stone fireplace", width: 1600, height: 900 }}
    showTowns
    local={{
      heading: "Kitchens in mountain homes",
      paragraphs: [
        "Many older mountain cabins were built with small, closed-in kitchens. A remodel often starts with the question of which walls can open the room to the view, and that depends on what each wall carries. We check the structure first, so any beam or support the opening needs is part of the written scope.",
        "Plenty of kitchens we work on are in second homes. If you are away while the work happens, tell us how you want to hear about progress and we can send photo updates as the job moves along.",
        "Steep driveways and narrow roads also shape a mountain remodel: how cabinets, counters and materials get to the house is planned before delivery day, not on it.",
      ],
    }}
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
      { title: "Consultation", text: "Tell us what you want to change. We look at the room, the structure and the systems behind the walls." },
      { title: "Design session", text: "Layout, cabinets, counters and finishes planned together with Highlander's design and planning team." },
      { title: "Written estimate", text: "You get the work, the selections to make and the price in writing before anything starts." },
      { title: "Build and walkthrough", text: "The work is scheduled and built, then walked through with you at the end." },
    ]}
    faqs={[
      { question: "How long does a kitchen remodel take in Western NC?", answer: "It depends on the scope. Moving plumbing or walls, custom cabinetry and any permit review all affect the schedule. Your written estimate sets out the schedule for your kitchen before work starts." },
      { question: "Do I need a permit to remodel my kitchen in Macon or Jackson County?", answer: "When a permit is required and included in Highlander's scope, the project team coordinates the applicable permit and inspection steps with the county. Requirements are confirmed for your specific property before work starts." },
      { question: "Can you remodel my kitchen while I'm away from my second home?", answer: "Yes. Tell us how to reach the property and how you want to hear about progress, and we can send photo updates while the work is underway." },
      { question: "Do you handle design, or do I need my own designer?", answer: "Highlander offers in-house design and planning for remodels, including layouts and feasibility, so you do not need to bring your own designer. If you already have one, we can work from their plans." },
      { question: "Can you remove a wall to open my kitchen to the view?", answer: "Often. Whether a wall can come out depends on what it carries. We check the structure first, and if the wall is load-bearing, the beam or support it needs is part of the written scope you approve." },
    ]}
    related={[{ label: "All renovations", href: "/construction/renovations" }, { label: "Bathroom remodeling", href: "/construction/bathroom-remodeling" }, { label: "Design & planning", href: "/construction/design" }, { label: "Financing", href: "/financing" }, { label: "Reviews", href: "/reviews" }]}
    closingHeading="Ready to talk through your kitchen?"
    topic="renovations"
    ctaId="kitchen"
  />
);

export default KitchenRemodeling;

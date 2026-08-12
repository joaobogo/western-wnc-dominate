import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import BuilderShell from "@/components/builder/BuilderShell";
import BuilderControls from "@/components/builder/BuilderControls";
import ScopeSummary from "@/components/builder/ScopeSummary";
import VisualChoiceGrid, { VisualChoice } from "@/components/builder/VisualChoiceGrid";
import ReviewCard from "@/components/builder/ReviewCard";
import { Input, Textarea, Label, ChipGroup, FieldRow } from "@/components/intake/IntakeFieldKit";
import FileDrop from "@/components/intake/FileDrop";
import IntakeConfirmation from "@/components/intake/IntakeConfirmation";
import { supabase } from "@/integrations/supabase/client";
import { scoreLead } from "@/lib/lead-scoring";
import { deriveConstructionRouting } from "@/lib/lead-routing";
import { trackEvent } from "@/lib/analytics";
import { uploadIntakeFiles, newSessionFolder } from "@/lib/intake-uploads";

import heroAddition from "@/assets/gallery/cedar-001.webp";
import heroDeck from "@/assets/gallery/cedar-002.webp";
import heroRenov from "@/assets/gallery/asphalt-005.webp";
import heroOutdoor from "@/assets/gallery/cedar-005.webp";
import heroFlatwork from "@/assets/gallery/asphalt-006.webp";
import { actionableError } from "@/lib/microcopy";

const PROJECT_TYPES: VisualChoice[] = [
  { value: "addition", label: "Addition / Extension", sub: "Expand the footprint of your home", image: heroAddition },
  { value: "planning", label: "Design", sub: "Layouts, floor plans, and project review", image: heroRenov },
  { value: "porch", label: "Porch", sub: "Covered, screened, or 3-season", image: heroOutdoor },
  { value: "deck", label: "Deck", sub: "New build, expansion, or rebuild", image: heroDeck },
  { value: "outdoor_living", label: "Outdoor Living", sub: "Pergolas, kitchens, gathering spaces", image: heroOutdoor },
  { value: "flatwork", label: "Fire Pit / Flatwork", sub: "Patios, walkways, hardscape", image: heroFlatwork },
  { value: "renovation", label: "Targeted Remodel", sub: "Focused expansion or rework", image: heroRenov },
  { value: "not_sure", label: "Not Sure Yet", sub: "Help us shape the right scope" },
];

const SCOPE_ITEMS: VisualChoice[] = [
  { value: "layouts_plans", label: "Layouts & Floor Plans" },
  { value: "project_planning", label: "Project Planning" },
  { value: "design_guidance", label: "Design Guidance" },
  { value: "scope_development", label: "Scope Development" },
  { value: "attached_addition", label: "Attached to existing home" },
  { value: "detached_structure", label: "Detached structure" },
  { value: "covered_porch", label: "Covered or screened porch" },
  { value: "open_deck", label: "Open deck" },
  { value: "pergola", label: "Pergola or pavilion" },
  { value: "outdoor_kitchen", label: "Outdoor kitchen / bar" },
  { value: "fireplace", label: "Fire pit or stone fireplace" },
  { value: "patio_walkway", label: "Patio / walkway flatwork" },
  { value: "roof_tie_in", label: "Roofing tie-in required" },
  { value: "site_work", label: "Site work / grading" },
  { value: "permits_help", label: "Permitting help needed" },
  { value: "guidance", label: "Open to recommendations" },
];

const STYLE: VisualChoice[] = [
  { value: "mountain_modern", label: "Mountain Modern", sub: "Clean lines, natural materials" },
  { value: "traditional_craftsman", label: "Traditional Craftsman", sub: "Stone, timber, exposed detail" },
  { value: "rustic_lodge", label: "Rustic Lodge", sub: "Heavy timber, cedar, warm tones" },
  { value: "transitional", label: "Transitional", sub: "Balanced between traditional & modern" },
  { value: "guidance", label: "Open to recommendations", sub: "Help shape the direction" },
];

const PRIORITIES: VisualChoice[] = [
  { value: "quality_craft", label: "Premium Craftsmanship", sub: "No compromise on detail" },
  { value: "timeline_certainty", label: "Timeline Certainty", sub: "Clear schedule, hit dates" },
  { value: "value_engineering", label: "Smart Value", sub: "Highest impact per dollar" },
  { value: "indoor_outdoor", label: "Indoor / Outdoor Flow", sub: "Connect the home to the view" },
  { value: "resale", label: "Resale Value", sub: "Marketable specification" },
  { value: "scoping_clarity", label: "Scoping Clarity", sub: "Defined written deliverables" },
];

const INVESTMENT: VisualChoice[] = [
  { value: "foundational", label: "Foundational", sub: "Quality build, considered spec" },
  { value: "elevated", label: "Elevated", sub: "Custom finishes, designer-grade detailing" },
  { value: "signature", label: "Signature", sub: "Top-tier, fully custom, no compromise" },
  { value: "guidance", label: "Need guidance", sub: "Help me understand the trade-offs" },
];

const TIMELINE: VisualChoice[] = [
  { value: "30days", label: "Start within 30 days" },
  { value: "90days", label: "Within 90 days" },
  { value: "6months", label: "3–6 months" },
  { value: "12months", label: "6–12 months" },
  { value: "exploring", label: "Planning ahead" },
];

const PROPERTY: VisualChoice[] = [
  { value: "primary", label: "Primary residence" },
  { value: "second_home", label: "Second home" },
  { value: "new_build", label: "New build / lot" },
  { value: "commercial", label: "Commercial property" },
];

const PLANNING_STAGE: VisualChoice[] = [
  { value: "just_exploring", label: "Just exploring" },
  { value: "have_ideas", label: "Have ideas, no plans" },
  { value: "concept_sketches", label: "Concept sketches" },
  { value: "full_plans", label: "Full plans / drawings" },
];

const DECISION_MAKERS: VisualChoice[] = [
  { value: "solo", label: "Just me" },
  { value: "couple", label: "Me & partner" },
  { value: "family", label: "Family / multi-owner" },
  { value: "pro_design", label: "Working with a designer or planning lead" },
];

const STEP_NAMES = ["Project", "Scope", "Style", "Context", "Plans", "Review"];
const TOTAL = STEP_NAMES.length;

const ConstructionBuilder = () => {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState({
    projectType: params.get("type") || "",
    scopeItems: [] as string[],
    style: "",
    priorities: [] as string[],
    investment: "",
    timeline: "",
    propertyType: "",
    planningStage: "",
    decisionMakers: "",
    town: params.get("town") || "",
    description: "",
    name: "",
    email: "",
    phone: "",
  });

  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) =>
    setData((d) => ({ ...d, [k]: v }));
  const toggleMulti = (k: "scopeItems" | "priorities", v: string) =>
    setData((d) => ({ ...d, [k]: d[k].includes(v) ? d[k].filter((x) => x !== v) : [...d[k], v] }));

  const stepValid = useMemo(() => {
    if (step === 0) return !!data.projectType;
    if (step === 1) return data.scopeItems.length > 0;
    if (step === 2) return !!data.style && data.priorities.length > 0;
    if (step === 3) return !!data.investment && !!data.propertyType && !!data.timeline && data.town.trim().length >= 2;
    if (step === 4) return true;
    if (step === 5) return !!data.name.trim() && /\S+@\S+\.\S+/.test(data.email) && data.phone.trim().length >= 7;
    return false;
  }, [step, data]);

  const labelFor = (opts: VisualChoice[], v: string) => opts.find((o) => o.value === v)?.label;
  const labelsFor = (opts: VisualChoice[], vs: string[]) =>
    vs.map((v) => opts.find((o) => o.value === v)?.label).filter(Boolean) as string[];

  const summaryRows = [
    { label: "Project type", value: labelFor(PROJECT_TYPES, data.projectType) },
    { label: "Scope includes", value: labelsFor(SCOPE_ITEMS, data.scopeItems) },
    { label: "Style direction", value: labelFor(STYLE, data.style) },
    { label: "Priorities", value: labelsFor(PRIORITIES, data.priorities) },
    { label: "Investment tier", value: labelFor(INVESTMENT, data.investment) },
    { label: "Timeline", value: labelFor(TIMELINE, data.timeline) },
    { label: "Planning stage", value: labelFor(PLANNING_STAGE, data.planningStage) },
    { label: "Decision makers", value: labelFor(DECISION_MAKERS, data.decisionMakers) },
    { label: "Property", value: labelFor(PROPERTY, data.propertyType) },
    { label: "Town", value: data.town || null },
  ];

  const back = () => setStep((s) => Math.max(0, s - 1));
  const next = async () => {
    if (!stepValid) return;
    if (step < TOTAL - 1) {
      setStep((s) => s + 1);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const folder = newSessionFolder();
      let uploadedPaths: string[] = [];
      if (files.length) {
        const u = await uploadIntakeFiles(folder, files);
        uploadedPaths = u.ok.map((f) => f.path);
      }
      const score = scoreLead({
        serviceCategory: "construction",
        projectType: data.projectType,
        timeline: data.timeline,
        propertyType: data.propertyType,
        town: data.town,
        hasPlans: uploadedPaths.length > 0,
        description: data.description,
      }) + 14; // builder leads carry more depth

      const { routing, jobtread } = deriveConstructionRouting({
        source: "construction_builder",
        score,
        contact: { name: data.name, email: data.email, phone: data.phone },
        projectType: data.projectType,
        scopeItems: data.scopeItems,
        style: data.style,
        priorities: data.priorities,
        investment: data.investment,
        timeline: data.timeline,
        propertyType: data.propertyType,
        planningStage: data.planningStage,
        decisionMakers: data.decisionMakers,
        hasPlans: data.planningStage === "full_plans",
        hasPhotos: uploadedPaths.length > 0,
        town: data.town,
      });

      const consultId = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}`;
      const { error: insertErr } = await supabase.from("consultation_requests").insert({
        id: consultId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        town: data.town,
        project_type: data.projectType,
        service_category: "construction",
        timeline: data.timeline,
        urgency: data.timeline === "30days" ? "high" : data.timeline === "90days" ? "medium" : "low",
        property_type: data.propertyType,
        project_description: data.description || null,
        source: "construction_builder",
        lead_score: score,
        has_plans: data.planningStage === "full_plans",
        status: routing.lane === "qualified" || routing.lane === "concierge" ? "qualified" : "new",
        metadata: ({
          builder: {
            scope_items: data.scopeItems,
            style: data.style,
            priorities: data.priorities,
            investment_tier: data.investment,
            planning_stage: data.planningStage,
            decision_makers: data.decisionMakers,
            has_plans: data.planningStage === "full_plans",
          },
          routing,
          jobtread,
          upload_folder: folder,
          upload_paths: uploadedPaths,
          referrer: typeof document !== "undefined" ? document.referrer : null,
          utm: Object.fromEntries(params.entries()),
        } as any),
      });
      if (insertErr) throw insertErr;
      // Canonical pipeline: durable `leads` row + single CRM sync happens here.
      const { submitLead } = await import("@/lib/leads");
      await submitLead({
        source: "construction_builder",
        lead_type: "construction",
        full_name: data.name,
        email: data.email,
        phone: data.phone,
        property_town: data.town,
        property_state: "NC",
        property_type: data.propertyType,
        service_category: "construction",
        project_type: data.projectType,
        timeline: data.timeline,
        budget_range: data.investment,
        has_plans: data.planningStage === "full_plans",
        decision_maker: data.decisionMakers,
        project_description: data.description || null,
        lead_score: score,
        attachments: uploadedPaths,
        metadata: {
          consultation_request_id: consultId,
          builder: {
            scope_items: data.scopeItems,
            style: data.style,
            priorities: data.priorities,
            investment_tier: data.investment,
            planning_stage: data.planningStage,
            decision_makers: data.decisionMakers,
          },
          routing,
          jobtread,
          upload_folder: folder,
        },
      });
      trackEvent("form_submit", {
        label: "Construction Builder",
        elementId: "construction-builder",
        metadata: { project: data.projectType, investment: data.investment, score, lane: routing.lane, tier: routing.tier, plans: uploadedPaths.length },
      });
      setSubmitted(true);
    } catch (e: any) {
      setError(actionableError(e, "lead"));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <SEOHead title="Scope brief received | Highlander" description="Your construction scope brief has been received." path="/construction-builder" noindex />
        <Header />
        <main className="pt-28 pb-20 bg-background">
          <div className="max-w-2xl mx-auto px-6">
            <IntakeConfirmation
              title="Your project brief is in good hands."
              body="A Highlander project advisor will personally review your scope brief and reach out within as soon as possible."
              nextSteps={[
                "Your advisor reviews the brief and matches you to the right Highlander team lead.",
                "We confirm scope on a brief call and schedule an on-site walkthrough.",
                "You receive a written proposal aligned to your style, priorities, and investment tier — with a clear schedule and warranty terms.",
              ]}
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Build Your Construction Project | Highlander"
        description="An optional guided builder for premium construction projects in Western North Carolina. Build a scope brief — not an instant quote."
        path="/construction-builder"
        noindex
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Build Your Construction Project", url: "/construction-builder" },
        ])}
      />
      <Header />
      <main>
        <BuilderShell
          eyebrow="Advanced Builder · Construction"
          title="Build your construction project brief"
          subhead="A guided pathway so your walkthrough starts aligned with how you want the project to feel."
          step={step}
          totalSteps={TOTAL}
          stepNames={STEP_NAMES}
          shortFormHref="/construction-intake"
          switchHref="/roofing-builder"
          switchLabel="Switch to roofing builder"
          summary={<ScopeSummary rows={summaryRows} />}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && (
                <>
                  <h2 className="text-[19px] md:text-[22px] font-heading font-bold text-foreground tracking-tight mb-2">
                    What kind of project is this?
                  </h2>
                  <p className="text-muted-foreground text-[13px] font-body mb-6">Pick the best match — scope comes next.</p>
                  <VisualChoiceGrid options={PROJECT_TYPES} value={data.projectType} onChange={(v) => set("projectType", v)} columns={3} />
                </>
              )}
              {step === 1 && (
                <>
                  <h2 className="text-[19px] md:text-[22px] font-heading font-bold text-foreground tracking-tight mb-2">
                    What's in the scope?
                  </h2>
                  <p className="text-muted-foreground text-[13px] font-body mb-6">Pick anything you're considering.</p>
                  <VisualChoiceGrid options={SCOPE_ITEMS} value={data.scopeItems} onChange={(v) => toggleMulti("scopeItems", v)} multi columns={3} />
                </>
              )}
              {step === 2 && (
                <>
                  <h2 className="text-[19px] md:text-[22px] font-heading font-bold text-foreground tracking-tight mb-2">
                    Style & priorities
                  </h2>
                  <p className="text-muted-foreground text-[13px] font-body mb-6">Direction now — refined together later.</p>
                  <Label required>Style direction</Label>
                  <VisualChoiceGrid options={STYLE} value={data.style} onChange={(v) => set("style", v)} columns={2} />
                  <div className="mt-7">
                    <Label required>What matters most</Label>
                    <VisualChoiceGrid options={PRIORITIES} value={data.priorities} onChange={(v) => toggleMulti("priorities", v)} multi columns={3} />
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <h2 className="text-[19px] md:text-[22px] font-heading font-bold text-foreground tracking-tight mb-2">
                    Project context
                  </h2>
                  <p className="text-muted-foreground text-[13px] font-body mb-6">A few details so we route the right Highlander team lead.</p>
                  <Label required>Investment tier <span className="font-normal text-foreground/80 text-[11px] normal-case tracking-normal">— qualitative, not a price</span></Label>
                  <VisualChoiceGrid options={INVESTMENT} value={data.investment} onChange={(v) => set("investment", v)} columns={2} />
                  <div className="mt-7">
                    <Label required>Ideal start window</Label>
                    <ChipGroup options={TIMELINE} value={data.timeline} onChange={(v) => set("timeline", v)} columns={3} />
                  </div>
                  <div className="mt-6">
                    <Label required>Property type</Label>
                    <ChipGroup options={PROPERTY} value={data.propertyType} onChange={(v) => set("propertyType", v)} columns={2} />
                  </div>
                  <div className="mt-6">
                    <Label>Planning stage</Label>
                    <ChipGroup options={PLANNING_STAGE} value={data.planningStage} onChange={(v) => set("planningStage", v)} columns={2} />
                  </div>
                  <div className="mt-6">
                    <Label>Decision makers</Label>
                    <ChipGroup options={DECISION_MAKERS} value={data.decisionMakers} onChange={(v) => set("decisionMakers", v)} columns={2} />
                  </div>
                  <div className="mt-6">
                    <Label required htmlFor="f-property-address">Property address</Label>
                    <Input id="f-property-address" value={data.town} onChange={(e) => set("town", e.target.value)} placeholder="Street, city, and state…" />
                  </div>
                </>
              )}
              {step === 4 && (
                <>
                  <h2 className="text-[19px] md:text-[22px] font-heading font-bold text-foreground tracking-tight mb-2">
                    Plans, inspiration & notes
                  </h2>
                  <p className="text-muted-foreground text-[13px] font-body mb-6">Plans, sketches, or inspiration photos — all optional.</p>
                  <FileDrop files={files} onChange={setFiles} />
                  <div className="mt-6">
                    <Label htmlFor="f-anything-else-the-advisor-should">Anything else the advisor should know</Label>
                    <Textarea id="f-anything-else-the-advisor-should"
                      rows={4}
                      value={data.description}
                      onChange={(e) => set("description", e.target.value)}
                      placeholder="Lot details, HOA, design involvement, must-haves…"
                    />
                  </div>
                </>
              )}
              {step === 5 && (
                <>
                  <h2 className="text-[19px] md:text-[22px] font-heading font-bold text-foreground tracking-tight mb-2">
                    Review & send
                  </h2>
                  <p className="text-muted-foreground text-[13px] font-body mb-6">A named advisor reviews your brief and responds within as soon as possible.</p>
                  <ReviewCard rows={summaryRows}>
                    <div className="pt-1">
                      <p className="text-[10.5px] font-body font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">Your contact</p>
                      <FieldRow>
                        <div>
                          <Label required htmlFor="f-full-name">Full name</Label>
                          <Input id="f-full-name" value={data.name} onChange={(e) => set("name", e.target.value)} />
                        </div>
                        <div>
                          <Label required htmlFor="f-phone">Phone</Label>
                          <Input id="f-phone" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(828) 555-0100" />
                        </div>
                      </FieldRow>
                      <div className="mt-4">
                        <Label required htmlFor="f-email">Email</Label>
                        <Input id="f-email" value={data.email} onChange={(e) => set("email", e.target.value)} type="email" />
                      </div>
                    </div>
                    {error && <p className="text-[12.5px] text-destructive font-body">{error}</p>}
                  </ReviewCard>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <BuilderControls
            step={step}
            total={TOTAL}
            canNext={stepValid}
            submitting={submitting}
            onBack={back}
            onNext={next}
            finalLabel="Send project brief"
          />
        </BuilderShell>
      </main>
      <Footer />
    </>
  );
};

export default ConstructionBuilder;
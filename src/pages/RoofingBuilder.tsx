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
import { deriveRoofingRouting } from "@/lib/lead-routing";
import { trackEvent } from "@/lib/analytics";
import { uploadIntakeFiles, newSessionFolder } from "@/lib/intake-uploads";

import asphalt from "@/assets/gallery/asphalt-hero.webp";
import metal from "@/assets/gallery/metal-009.jpg";
import cedar from "@/assets/gallery/cedar-005.jpg";
import synthetic from "@/assets/gallery/cedar-002.jpg";
import asphaltDark from "@/assets/gallery/asphalt-004.jpg";
import metalAlt from "@/assets/gallery/metal-005.webp";

const PROJECT_TYPES: VisualChoice[] = [
  { value: "replacement", label: "Full Replacement", sub: "End-of-life roof, full tear-off", image: asphalt },
  { value: "metal_upgrade", label: "Metal Upgrade", sub: "Switching to standing seam", image: metal, badge: "Premium" },
  { value: "synthetic_upgrade", label: "Synthetic Slate / Shake", sub: "Brava-class composite", image: synthetic, badge: "Signature" },
  { value: "repair", label: "Targeted Repair", sub: "Known leak or storm damage", image: asphaltDark },
];

const MATERIALS: VisualChoice[] = [
  { value: "dimensional_asphalt", label: "Multi-Dimensional Asphalt", sub: "Most popular · long-term value", image: asphalt },
  { value: "premium_asphalt", label: "Designer Asphalt", sub: "Heavy-weight, dimensional profile", image: asphaltDark, badge: "Upgrade" },
  { value: "standing_seam_metal", label: "Standing Seam Metal", sub: "50+ year system, mountain-grade", image: metal, badge: "Premium" },
  { value: "stamped_metal", label: "Stamped Metal Shake", sub: "Cedar/slate look in steel", image: metalAlt },
  { value: "synthetic_brava", label: "Brava Synthetic", sub: "Composite slate or shake", image: synthetic, badge: "Signature" },
  { value: "cedar", label: "Natural Cedar", sub: "Traditional shake or shingle", image: cedar },
  { value: "undecided", label: "Help me decide", sub: "We'll walk through options on-site" },
];

const SYSTEM_FEATURES: VisualChoice[] = [
  { value: "ice_water_shield", label: "Ice & Water Shield" },
  { value: "synthetic_underlay", label: "Synthetic Underlayment" },
  { value: "ridge_vent", label: "Ridge Ventilation" },
  { value: "drip_edge", label: "Drip Edge & Flashing" },
  { value: "snow_guards", label: "Snow Guards", sub: "Recommended above 3,500 ft" },
  { value: "gutter_replacement", label: "Gutters & Downspouts" },
  { value: "skylight_reflash", label: "Skylight Re-flash" },
  { value: "chimney_reflash", label: "Chimney Re-flash" },
];

const PRIORITIES: VisualChoice[] = [
  { value: "longevity", label: "Lifetime Performance", sub: "50+ year system" },
  { value: "curb_appeal", label: "Curb Appeal", sub: "Visible from the street" },
  { value: "energy", label: "Energy Efficiency", sub: "Reflective / vented system" },
  { value: "storm_resilience", label: "Storm Resilience", sub: "Wind & hail rated" },
  { value: "warranty", label: "Strongest Warranty", sub: "Documented manufacturer terms" },
  { value: "resale", label: "Resale Value", sub: "Selling within 3 years" },
];

const TIMELINE: VisualChoice[] = [
  { value: "emergency", label: "Emergency", sub: "Active leak now" },
  { value: "30days", label: "Within 30 days" },
  { value: "90days", label: "Within 90 days" },
  { value: "6months", label: "3–6 months" },
  { value: "exploring", label: "Exploring", sub: "Planning ahead" },
];

const INVESTMENT: VisualChoice[] = [
  { value: "foundational", label: "Foundational", sub: "Reliable system, long-term value" },
  { value: "elevated", label: "Elevated", sub: "Premium materials & detailing" },
  { value: "signature", label: "Signature", sub: "Top-tier system, no compromises" },
  { value: "guidance", label: "Need guidance", sub: "Show me trade-offs in person" },
];

const PROPERTY: VisualChoice[] = [
  { value: "primary", label: "Primary residence" },
  { value: "second_home", label: "Second home" },
  { value: "rental", label: "Rental / investment" },
  { value: "commercial", label: "Commercial building" },
];

const STEP_NAMES = ["Project", "Material", "Priorities", "Context", "Photos", "Review"];
const TOTAL = STEP_NAMES.length;

const RoofingBuilder = () => {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState({
    projectType: params.get("type") || "",
    material: "",
    features: [] as string[],
    priorities: [] as string[],
    investment: "",
    timeline: "",
    propertyType: "",
    town: params.get("town") || "",
    description: "",
    name: "",
    email: "",
    phone: "",
  });

  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) =>
    setData((d) => ({ ...d, [k]: v }));
  const toggleMulti = (k: "features" | "priorities", v: string) =>
    setData((d) => ({ ...d, [k]: d[k].includes(v) ? d[k].filter((x) => x !== v) : [...d[k], v] }));

  const stepValid = useMemo(() => {
    if (step === 0) return !!data.projectType;
    if (step === 1) return !!data.material;
    if (step === 2) return data.priorities.length > 0;
    if (step === 3) return !!data.investment && !!data.propertyType && !!data.timeline && data.town.trim().length >= 2;
    if (step === 4) return true; // photos + notes optional
    if (step === 5) return !!data.name.trim() && /\S+@\S+\.\S+/.test(data.email) && data.phone.trim().length >= 7;
    return false;
  }, [step, data]);

  const labelFor = (opts: VisualChoice[], v: string) => opts.find((o) => o.value === v)?.label;
  const labelsFor = (opts: VisualChoice[], vs: string[]) =>
    vs.map((v) => opts.find((o) => o.value === v)?.label).filter(Boolean) as string[];

  const summaryRows = [
    { label: "Project", value: labelFor(PROJECT_TYPES, data.projectType) },
    { label: "Material system", value: labelFor(MATERIALS, data.material) },
    { label: "System features", value: labelsFor(SYSTEM_FEATURES, data.features) },
    { label: "Priorities", value: labelsFor(PRIORITIES, data.priorities) },
    { label: "Investment tier", value: labelFor(INVESTMENT, data.investment) },
    { label: "Timeline", value: labelFor(TIMELINE, data.timeline) },
    { label: "Property", value: labelFor(PROPERTY, data.propertyType) },
    { label: "Town", value: data.town || null },
  ];

  const next = async () => {
    if (!stepValid) return;
    if (step < TOTAL - 1) {
      setStep((s) => s + 1);
      return;
    }
    // SUBMIT
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
        serviceCategory: "roofing",
        projectType: data.projectType,
        timeline: data.timeline,
        propertyType: data.propertyType,
        town: data.town,
        hasPhotos: uploadedPaths.length > 0,
        description: data.description,
      }) + 12; // builder = higher-intent than basic intake

      const { routing, jobtread } = deriveRoofingRouting({
        source: "roofing_builder",
        score,
        contact: { name: data.name, email: data.email, phone: data.phone },
        projectType: data.projectType,
        material: data.material,
        priorities: data.priorities,
        features: data.features,
        investment: data.investment,
        timeline: data.timeline,
        propertyType: data.propertyType,
        town: data.town,
        hasPhotos: uploadedPaths.length > 0,
      });

      const { error: insertErr } = await supabase.from("consultation_requests").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        town: data.town,
        project_type: data.projectType,
        service_category: "roofing",
        timeline: data.timeline,
        urgency: data.timeline === "emergency" ? "high" : data.timeline === "30days" ? "medium" : "low",
        property_type: data.propertyType,
        project_description: data.description || null,
        source: "roofing_builder",
        lead_score: score,
        status: routing.lane === "emergency" ? "urgent" : "new",
        metadata: ({
          builder: {
            material: data.material,
            features: data.features,
            priorities: data.priorities,
            investment_tier: data.investment,
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
      trackEvent("form_submit", {
        label: "Roofing Builder",
        elementId: "roofing-builder",
        metadata: { material: data.material, investment: data.investment, score, lane: routing.lane, tier: routing.tier, photos: uploadedPaths.length },
      });
      setSubmitted(true);
    } catch (e: any) {
      setError(e?.message || "Something went wrong. Please call (828) 524-7773.");
    } finally {
      setSubmitting(false);
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  if (submitted) {
    return (
      <>
        <SEOHead title="Scope brief received | Highlander" description="Your roofing scope brief has been received." path="/roofing-builder" />
        <Header />
        <main className="pt-28 pb-20 bg-background">
          <div className="max-w-2xl mx-auto px-6">
            <IntakeConfirmation
              title="Your scope brief is in good hands."
              body="A Highlander project advisor will personally review your full scope brief and reach out within as soon as possible to schedule an on-site assessment."
              nextSteps={[
                "An advisor reviews your scope brief and matches it to the right Highlander specialist.",
                "We confirm the details on a brief call and schedule an on-site assessment.",
                "You receive a written proposal aligned to your priorities, material choice, and timeline — with warranty terms documented.",
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
        title="Build Your Roofing Project | Highlander"
        description="An optional guided builder for premium roofing projects in Western North Carolina. Build a scope brief — not an instant quote."
        path="/roofing-builder"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Build Your Roofing Project", url: "/roofing-builder" },
        ])}
      />
      <Header />
      <main>
        <BuilderShell
          eyebrow="Advanced Builder · Roofing"
          title="Build your roofing project brief"
          subhead="A guided pathway that helps your advisor walk in already aligned with your priorities."
          step={step}
          totalSteps={TOTAL}
          stepNames={STEP_NAMES}
          shortFormHref="/roofing-intake"
          switchHref="/construction-builder"
          switchLabel="Switch to construction builder"
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
                    What kind of project are you planning?
                  </h2>
                  <p className="text-foreground/55 text-[13px] font-body mb-6">Pick the closest match — material comes next.</p>
                  <VisualChoiceGrid options={PROJECT_TYPES} value={data.projectType} onChange={(v) => set("projectType", v)} />
                </>
              )}
              {step === 1 && (
                <>
                  <h2 className="text-[19px] md:text-[22px] font-heading font-bold text-foreground tracking-tight mb-2">
                    Which material system fits?
                  </h2>
                  <p className="text-foreground/55 text-[13px] font-body mb-6">Not a commitment. We confirm fit on-site.</p>
                  <VisualChoiceGrid options={MATERIALS} value={data.material} onChange={(v) => set("material", v)} columns={3} />
                </>
              )}
              {step === 2 && (
                <>
                  <h2 className="text-[19px] md:text-[22px] font-heading font-bold text-foreground tracking-tight mb-2">
                    What matters most for this roof?
                  </h2>
                  <p className="text-foreground/55 text-[13px] font-body mb-6">Pick anything that applies.</p>
                  <VisualChoiceGrid options={PRIORITIES} value={data.priorities} onChange={(v) => toggleMulti("priorities", v)} multi columns={3} />

                  <div className="mt-8 pt-6 border-t border-border/60">
                    <Label>Optional system upgrades</Label>
                    <VisualChoiceGrid options={SYSTEM_FEATURES} value={data.features} onChange={(v) => toggleMulti("features", v)} multi columns={3} />
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <h2 className="text-[19px] md:text-[22px] font-heading font-bold text-foreground tracking-tight mb-2">
                    Project context
                  </h2>
                  <p className="text-foreground/55 text-[13px] font-body mb-6">A few details so we route the right Highlander specialist.</p>
                  <Label required>Investment tier <span className="font-normal text-foreground/80 text-[11px] normal-case tracking-normal">— qualitative, not a price</span></Label>
                  <VisualChoiceGrid options={INVESTMENT} value={data.investment} onChange={(v) => set("investment", v)} columns={2} />
                  <div className="mt-7">
                    <Label required>Timeline</Label>
                    <ChipGroup options={TIMELINE} value={data.timeline} onChange={(v) => set("timeline", v)} columns={3} />
                  </div>
                  <div className="mt-6">
                    <Label required>Property type</Label>
                    <ChipGroup options={PROPERTY} value={data.propertyType} onChange={(v) => set("propertyType", v)} columns={2} />
                  </div>
                  <div className="mt-6">
                    <Label required>Property address</Label>
                    <Input value={data.town} onChange={(e) => set("town", e.target.value)} placeholder="Street, city, and state…" />
                  </div>
                </>
              )}
              {step === 4 && (
                <>
                  <h2 className="text-[19px] md:text-[22px] font-heading font-bold text-foreground tracking-tight mb-2">
                    Photos & notes
                  </h2>
                  <p className="text-foreground/55 text-[13px] font-body mb-6">Optional — sharpens the assessment.</p>
                  <FileDrop files={files} onChange={setFiles} />
                  <div className="mt-6">
                    <Label>Anything the advisor should know</Label>
                    <Textarea
                      rows={4}
                      value={data.description}
                      onChange={(e) => set("description", e.target.value)}
                      placeholder="Roof age, known leaks, HOA, design notes…"
                    />
                  </div>
                </>
              )}
              {step === 5 && (
                <>
                  <h2 className="text-[19px] md:text-[22px] font-heading font-bold text-foreground tracking-tight mb-2">
                    Review & send
                  </h2>
                  <p className="text-foreground/55 text-[13px] font-body mb-6">A named advisor reviews your brief and responds within as soon as possible.</p>
                  <ReviewCard rows={summaryRows}>
                    <div className="pt-1">
                      <p className="text-[10.5px] font-body font-bold uppercase tracking-[0.22em] text-foreground/55 mb-3">Your contact</p>
                      <FieldRow>
                        <div>
                          <Label required>Full name</Label>
                          <Input value={data.name} onChange={(e) => set("name", e.target.value)} />
                        </div>
                        <div>
                          <Label required>Phone</Label>
                          <Input value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(828) 555-0100" />
                        </div>
                      </FieldRow>
                      <div className="mt-4">
                        <Label required>Email</Label>
                        <Input value={data.email} onChange={(e) => set("email", e.target.value)} type="email" />
                      </div>
                    </div>
                    {error && (
                      <p className="text-[12.5px] text-destructive font-body">{error}</p>
                    )}
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

export default RoofingBuilder;
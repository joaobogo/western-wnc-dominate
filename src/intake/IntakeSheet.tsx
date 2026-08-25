import { useEffect, useMemo, useRef, useState } from "react";
import {
  APPOINTMENT_STATE,
  BEST_TIME,
  BUDGETS,
  BUDGET_JOB_TYPES,
  CHANNELS,
  COMPANY,
  CORE_OTHER,
  CORE_TOWNS,
  GUTTER_STATE,
  HOME_FOR_APPT,
  JOB_TYPES,
  NEARBY_OTHER,
  NEARBY_TOWNS,
  OUTSIDE_AREA,
  PREFERRED_CONTACT,
  PROPERTY_TYPES,
  RELATIONSHIPS,
  ROOF_TYPES,
  SOURCES,
  SOURCE_DETAIL_TRIGGERS,
  STORIES,
  TIMINGS,
  YES_NO,
} from "./config";
import { Choices, Question, Section, TextArea, TextField, Toggle, TownPicker } from "./ui";
import { GradeTile, ScorePanel, StickyScoreBar } from "./ScorePanel";
import { formatCallBy } from "./business-time";
import {
  EMPTY_LEAD,
  MISSING_LABEL,
  formatPhone,
  leadSummary,
  missingRequired,
  scoreLead,
  type LeadDraft,
  type MissingField,
} from "./scoring";
import { saveLead } from "./save";

const TAKEN_BY_KEY = "hl_taken_by";

type Saved = {
  name: string;
  callBy: string;
  action: string;
  grade: "A" | "B" | "C" | "D" | "DQ";
  summary: string;
};

export default function IntakeSheet() {
  const [lead, setLead] = useState<LeadDraft>(() => ({
    ...EMPTY_LEAD,
    takenBy: localStorage.getItem(TAKEN_BY_KEY) ?? "",
  }));
  const [missing, setMissing] = useState<MissingField[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState<Saved | null>(null);
  const [showAppointment, setShowAppointment] = useState(false);
  const [copied, setCopied] = useState(false);

  const refs = {
    name: useRef<HTMLInputElement>(null),
    contact: useRef<HTMLInputElement>(null),
    town: useRef<HTMLDivElement>(null),
    relationship: useRef<HTMLDivElement>(null),
    jobType: useRef<HTMLDivElement>(null),
    timing: useRef<HTMLDivElement>(null),
  };

  const set = <K extends keyof LeadDraft>(key: K, value: LeadDraft[K]) =>
    setLead((prev) => ({ ...prev, [key]: value }));

  const result = useMemo(() => scoreLead(lead), [lead]);

  useEffect(() => {
    if (lead.takenBy.trim()) localStorage.setItem(TAKEN_BY_KEY, lead.takenBy.trim());
  }, [lead.takenBy]);

  const townNeedsText =
    lead.town === CORE_OTHER.id ||
    lead.town === NEARBY_OTHER.id ||
    lead.town === OUTSIDE_AREA.id;
  const notOwner = Boolean(lead.relationship && lead.relationship !== "owner");
  const showBudget = Boolean(lead.jobType && BUDGET_JOB_TYPES.includes(lead.jobType));
  const showSourceDetail = Boolean(
    lead.source && SOURCE_DETAIL_TRIGGERS.includes(lead.source),
  );

  const has = (f: MissingField) => missing.includes(f);

  function setChannel(id: string | null) {
    const channel = id ?? "phone";
    setLead((prev) => ({ ...prev, channel, spokeLive: channel === "phone" }));
  }

  function setAppointment(key: string, value: string) {
    setLead((prev) => ({
      ...prev,
      appointment: { ...prev.appointment, [key]: value },
    }));
  }

  function clearSheet(keepTakenBy = true) {
    setLead({
      ...EMPTY_LEAD,
      takenBy: keepTakenBy ? lead.takenBy : "",
    });
    setMissing([]);
    setSaveError(null);
    setSaved(null);
    setShowAppointment(false);
    setCopied(false);
    window.scrollTo({ top: 0 });
  }

  async function handleSave() {
    const gaps = missingRequired(lead);
    setMissing(gaps);
    if (gaps.length > 0) {
      const first = gaps[0];
      const el = refs[first].current;
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      if (el instanceof HTMLInputElement) el.focus({ preventScroll: true });
      return;
    }

    setSaving(true);
    setSaveError(null);
    try {
      const finalResult = scoreLead(lead);
      await saveLead(lead, finalResult);
      const callBy = finalResult.callBy ? formatCallBy(finalResult.callBy) : "";
      setSaved({
        name: `${lead.firstName} ${lead.lastName}`.trim() || "this lead",
        callBy,
        action: finalResult.action,
        grade: finalResult.gated ? "DQ" : (finalResult.grade ?? "D"),
        summary: leadSummary(lead, finalResult, callBy),
      });
      window.scrollTo({ top: 0 });
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Could not save the lead.");
    } finally {
      setSaving(false);
    }
  }

  /* ── Confirmation view ──────────────────────────────────────── */
  if (saved) {
    return (
      <div className="mx-auto max-w-[640px] px-4 py-8">
        <div className="hl-card p-5">
          <div className="flex items-center gap-4">
            <GradeTile grade={saved.grade} />
            <div>
              <h1 className="hl-slab text-xl">Lead saved</h1>
              <p className="text-[15px] mt-1">
                {saved.callBy
                  ? `Call ${saved.name} by ${saved.callBy}`
                  : `${saved.name} is disqualified — no call-back time.`}
              </p>
            </div>
          </div>
          {saved.action && (
            <p className="text-[15px] mt-4">{saved.action}</p>
          )}
          <div className="flex flex-wrap gap-3 mt-5">
            <button className="hl-btn-primary" onClick={() => clearSheet(true)}>
              New lead
            </button>
            <button
              className="hl-btn-quiet"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(saved.summary);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {copied ? "Copied" : "Copy summary"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Call sheet ─────────────────────────────────────────────── */
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-5 pb-28 lg:pb-8">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div>
          {/* 1. Who */}
          <Section title="Who" label="CONTACT">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <TextField
                label="First name"
                value={lead.firstName}
                onChange={(v) => set("firstName", v)}
                invalid={has("name")}
                inputRef={refs.name}
              />
              <TextField
                label="Last name"
                value={lead.lastName}
                onChange={(v) => set("lastName", v)}
                invalid={has("name")}
              />
            </div>

            <Question
              label="Mobile phone"
              script="What's the best number to reach you?"
            >
              <TextField
                value={lead.phone}
                onChange={(v) => set("phone", formatPhone(v))}
                placeholder="828-555-0100"
                inputMode="tel"
                invalid={has("contact")}
                inputRef={refs.contact}
              />
            </Question>

            <Question label="Email" script="And an email for the estimate?">
              <TextField
                value={lead.email}
                onChange={(v) => set("email", v)}
                placeholder="name@example.com"
                inputMode="email"
                invalid={has("contact")}
              />
            </Question>

            <Question label="Prefer a call or a text?">
              <Choices
                options={PREFERRED_CONTACT}
                value={lead.preferredContact}
                onChange={(v) => set("preferredContact", v)}
                columns={3}
              />
            </Question>

            <Question label="Best time to reach you">
              <Choices
                options={BEST_TIME}
                value={lead.bestTime}
                onChange={(v) => set("bestTime", v)}
                columns={4}
              />
            </Question>
          </Section>

          {/* 2. Where */}
          <Section title="Where" label="PROPERTY">
            <Question
              label="Property address"
              script="What's the address of the property?"
            >
              <TextField
                value={lead.address}
                onChange={(v) => set("address", v)}
                placeholder="123 Main St"
              />
            </Question>

            <div className="mb-5">
              <div className="hl-q">Town</div>
              <div className="mt-2">
                <TownPicker
                  core={CORE_TOWNS}
                  nearby={NEARBY_TOWNS}
                  extras={[CORE_OTHER, NEARBY_OTHER, OUTSIDE_AREA]}
                  value={lead.town}
                  onChange={(v) => setLead((p) => ({ ...p, town: v, townOther: "" }))}
                  invalid={has("town")}
                  groupRef={refs.town}
                />
              </div>
              {townNeedsText && (
                <div className="mt-3 sm:max-w-[360px]">
                  <TextField
                    label="Which town?"
                    value={lead.townOther}
                    onChange={(v) => set("townOther", v)}
                    invalid={has("town")}
                  />
                </div>
              )}
            </div>


            <div ref={refs.relationship}>
              <Question
                label="What's your relationship to the property?"
                script="Are you the owner? If not: Who would be approving the work — can I get their name and number?"
              >
                <Choices
                  options={RELATIONSHIPS}
                  value={lead.relationship}
                  onChange={(v) => set("relationship", v)}
                  columns={2}

                  invalid={has("relationship")}
                />
                {notOwner && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    <TextField
                      label="Owner / decision-maker's name"
                      value={lead.ownerName}
                      onChange={(v) => set("ownerName", v)}
                    />
                    <TextField
                      label="Their phone or email"
                      value={lead.ownerContact}
                      onChange={(v) => set("ownerContact", v)}
                    />
                  </div>
                )}
                {lead.relationship === "renter" && (
                  <p className="mt-2 text-[13.5px]" style={{ color: "var(--hl-red)" }}>
                    We can only schedule with the owner or property manager — get their
                    name and number.
                  </p>
                )}
              </Question>
            </div>

            <Question label="What kind of property?">
              <Choices
                options={PROPERTY_TYPES}
                value={lead.propertyType}
                onChange={(v) => set("propertyType", v)}
                columns={3}
              />
            </Question>
          </Section>

          {/* 3. What & when */}
          <Section title="What &amp; when" label="THE JOB">
            <div ref={refs.jobType}>
              <Question
                label="What do you need help with?"
                script="What can we help you with? (let them talk, pick the closest)"
              >
                <Choices
                  options={JOB_TYPES}
                  value={lead.jobType}
                  onChange={(v) => set("jobType", v)}
                  columns={2}
                  invalid={has("jobType")}
                />
              </Question>
            </div>

            <Question label="Tell us a little more">
              <TextArea
                value={lead.details}
                onChange={(v) => set("details", v)}
                placeholder="A sentence or two in their words"
              />
            </Question>

            <div ref={refs.timing}>
              <Question
                label="When do you need this done?"
                script="Is anything leaking right now? Then: When are you hoping to have it done?"
              >
                <Choices
                  options={TIMINGS}
                  value={lead.timing}
                  onChange={(v) => set("timing", v)}
                  columns={2}
                  invalid={has("timing")}
                />
              </Question>
            </div>

            {showBudget && (
              <Question label="Budget range">
                <Choices
                  options={BUDGETS}
                  value={lead.budget}
                  onChange={(v) => set("budget", v)}
                  columns={3}
                />
              </Question>
            )}

            <Question label="How did you hear about us?">
              <Choices
                options={SOURCES}
                value={lead.source}
                onChange={(v) => setLead((p) => ({ ...p, source: v, sourceDetail: "" }))}
                columns={4}
              />
              {showSourceDetail && (
                <div className="mt-3 sm:max-w-[360px]">
                  <TextField
                    label="Who can we thank?"
                    value={lead.sourceDetail}
                    onChange={(v) => set("sourceDetail", v)}
                  />
                </div>
              )}
            </Question>
          </Section>

          {/* 4. Office only */}
          <Section title="Office only" label="INTERNAL" quiet>
            <Question label="How did it reach us?">
              <Choices
                options={CHANNELS}
                value={lead.channel}
                onChange={setChannel}
                columns={3}
                clearable={false}
              />
            </Question>

            <div className="mb-5 sm:max-w-[280px]">
              <TextField
                label="Taken by"
                value={lead.takenBy}
                onChange={(v) => set("takenBy", v)}
                placeholder="Your name"
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-3 mb-5">
              <Toggle
                label="Spoke with them live"
                value={lead.spokeLive}
                onChange={(v) => set("spokeLive", v)}
              />
              <Toggle
                label="Vendor / sales / recruiting call"
                value={lead.vendorCall}
                onChange={(v) => set("vendorCall", v)}
              />
              <Toggle
                label="They want something we don't do"
                value={lead.notOffered}
                onChange={(v) => set("notOffered", v)}
              />
            </div>

            <button
              type="button"
              className="hl-btn-quiet w-full sm:w-auto"
              onClick={() => setShowAppointment((v) => !v)}
            >
              {showAppointment ? "Hide" : "Appointment details (optional)"}
            </button>

            {showAppointment && (
              <div className="mt-4 space-y-5">
                <Question label="Roof type">
                  <Choices
                    options={ROOF_TYPES}
                    value={lead.appointment.roofType ?? null}
                    onChange={(v) => setAppointment("roofType", v ?? "")}
                    columns={3}
                  />
                </Question>
                <Question label="Stories">
                  <Choices
                    options={STORIES}
                    value={lead.appointment.stories ?? null}
                    onChange={(v) => setAppointment("stories", v ?? "")}
                    columns={3}
                  />
                </Question>
                <Question label="Steep pitch">
                  <Choices
                    options={YES_NO}
                    value={lead.appointment.steepPitch ?? null}
                    onChange={(v) => setAppointment("steepPitch", v ?? "")}
                    columns={3}
                  />
                </Question>
                <Question label="Where is it leaking">
                  <TextField
                    value={lead.appointment.leakLocation ?? ""}
                    onChange={(v) => setAppointment("leakLocation", v)}
                  />
                </Question>
                <Question label="Gutters">
                  <Choices
                    options={GUTTER_STATE}
                    value={lead.appointment.gutters ?? null}
                    onChange={(v) => setAppointment("gutters", v ?? "")}
                    columns={3}
                  />
                </Question>
                <Question label="Chimney">
                  <Choices
                    options={YES_NO}
                    value={lead.appointment.chimney ?? null}
                    onChange={(v) => setAppointment("chimney", v ?? "")}
                    columns={3}
                  />
                </Question>
                <Question label="Will anyone be home for the appointment">
                  <Choices
                    options={HOME_FOR_APPT}
                    value={lead.appointment.someoneHome ?? null}
                    onChange={(v) => setAppointment("someoneHome", v ?? "")}
                    columns={3}
                  />
                </Question>
                <Question label="Gate code or access notes">
                  <TextField
                    value={lead.appointment.accessNotes ?? ""}
                    onChange={(v) => setAppointment("accessNotes", v)}
                  />
                </Question>
                <Question label="Mailing address if different">
                  <TextField
                    value={lead.appointment.mailingAddress ?? ""}
                    onChange={(v) => setAppointment("mailingAddress", v)}
                  />
                </Question>
                <Question label="Appointment requested">
                  <Choices
                    options={APPOINTMENT_STATE}
                    value={lead.appointment.state ?? null}
                    onChange={(v) => setAppointment("state", v ?? "")}
                    columns={3}
                  />
                  <div className="mt-3 sm:max-w-[360px]">
                    <TextField
                      label="Date and time"
                      value={lead.appointment.dateTime ?? ""}
                      onChange={(v) => setAppointment("dateTime", v)}
                      placeholder="Wed Aug 27, 10:00 AM"
                    />
                  </div>
                </Question>
                <Question label="General notes">
                  <TextArea
                    value={lead.appointment.notes ?? ""}
                    onChange={(v) => setAppointment("notes", v)}
                    rows={4}
                  />
                </Question>
              </div>
            )}
          </Section>

          {missing.length > 0 && (
            <p className="mb-3 text-[14px]" style={{ color: "var(--hl-red)" }}>
              Still need {missing.map((m) => MISSING_LABEL[m]).join(", ")}.
            </p>
          )}
          {saveError && (
            <p className="mb-3 text-[14px]" style={{ color: "var(--hl-red)" }}>
              {saveError}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button className="hl-btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save lead"}
            </button>
            <button className="hl-btn-quiet" onClick={() => clearSheet(true)}>
              Clear
            </button>
          </div>

          <p className="mt-6 text-[12.5px]" style={{ color: "#6b7280" }}>
            {COMPANY.name} · {COMPANY.phone} · {COMPANY.web}
          </p>
        </div>

        {/* Score panel */}
        <aside className="hidden lg:block">
          <div className="sticky top-4">
            <ScorePanel result={result} />
          </div>
        </aside>
      </div>

      <StickyScoreBar result={result} />
    </div>
  );
}

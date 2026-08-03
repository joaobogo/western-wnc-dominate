import { it } from "vitest";
import { writeFileSync } from "node:fs";
import { normalizeLeadPayload } from "@/lib/leads";

const samples: Record<string, any> = {
  "RoofingIntakeForm (/roofing intake)": {
    source: "roofing_intake_form", lead_type: "roofing",
    full_name: "Margaret O'Brien-Hayes", email: "m.obrien@example.com", phone: "+18285551234",
    property_town: "412 Chestnut St, Highlands", property_state: "NC",
    service_category: "roofing", project_type: "storm", timeline: "emergency", urgency: "high",
    insurance_status: "active_claim", roofing_issue_type: "storm", property_type: "primary",
    project_description: "Wind tore shingles off the north slope during the July storm and the attic is wet.",
    attachments: [{ path: "leads/x/roof1.jpg", name: "roof1.jpg", size: 1024, type: "image/jpeg" }],
  },
  "ConstructionIntakeForm": {
    source: "construction_intake_form", lead_type: "construction",
    full_name: "James Whitaker", email: "jw@example.com", phone: "8285559876",
    property_town: "Cashiers", property_state: "NC", service_category: "construction",
    project_type: "addition", timeline: "30days", urgency: "medium",
    property_type: "second_home", budget_range: "ready", has_plans: true,
    decision_maker: "self", project_description: "Adding a 400 sq ft primary suite over the garage.",
  },
  "DesignPlanningIntakeForm": {
    source: "design_intake_form", lead_type: "design_services",
    full_name: "Highlands Ridge Holdings LLC", email: "ops@hrh.com", phone: "8285552211",
    property_address: "88 Ridge Trail, Sapphire", property_state: "NC",
    service_category: "design_planning", project_type: "custom_home", timeline: "90days",
    budget_range: "budgeted", has_plans: false, decision_maker: "board",
    project_description: "Need schematic design for a new mountain residence.",
  },
  "QuoteFlow (/quote)": {
    source: "quote_flow", lead_type: "roofing", full_name: "Dana Lee",
    email: "dana@example.com", phone: "8285550000", property_town: "Franklin",
    property_state: "NC", property_type: "primary", service_category: "roofing",
    project_type: "replacement", timeline: "90days", project_description: "Full tear-off quote.",
  },
  "Contact page (/contact)": {
    source: "contact_form", lead_type: "general_inquiry", full_name: "Bill Turner",
    email: "bill@example.com", phone: "8285551111", property_town: "Sylva",
    property_state: "NC", service_category: "roofing", project_type: "repair",
    timeline: "30days", preferred_contact_method: "email",
    project_description: "Small leak above the porch.",
  },
  "InspectionForm": {
    source: "inspection_form", lead_type: "inspection_request", full_name: "Ana Souza",
    phone: "8285552222", email: "ana@example.com", property_address: "17 Elm Ct, Cullowhee",
    property_state: "NC", project_type: "storm-damage", service_category: "roofing",
    timeline: "30days", project_description: "Post-storm inspection request.",
  },
  "ChatbotWidget": {
    source: "chatbot", lead_type: "general_inquiry", full_name: "Tom Riddle",
    phone: "8285553333", email: null, property_town: "Highlands", property_state: "NC",
    preferred_contact_method: "phone",
    chat_summary: "user: my roof leaks\nassistant: when did it start?",
  },
  "FastLeadForm (landing pages)": {
    source: "fast_lead_form", lead_type: "roofing", full_name: "Kim Park",
    phone: "8285554444", property_town: "Brevard", property_state: "NC",
    service_category: "roofing", project_type: "repair", timeline: "emergency",
  },
  "GuideLeadMagnet": {
    source: "guide_lead_magnet", lead_type: "guide_download", full_name: "Pat Nguyen",
    email: "pat@example.com", property_town: "Waynesville", property_state: "NC",
    service_category: "roofing", timeline: "exploring",
  },
  "Careers (job application)": {
    source: "careers_application", lead_type: "job_application", full_name: "Luis Alvarez",
    phone: "8285555555", project_type: "crew_lead", project_description: "8 years roofing.",
    lead_score: 0,
  },
  "ConstructionConsultation": {
    source: "construction_consultation_form", lead_type: "construction",
    full_name: "Sarah Kim", email: "sk@example.com", phone: "8285556666",
    property_town: "Cashiers", property_state: "NC", service_category: "construction",
    project_type: "renovation", timeline: "1-3-months", urgency: "medium",
    budget_range: "250k-500k", has_plans: true,
    project_description: "Whole-home renovation of a 1990s cabin.",
  },
};

it("emit normalized rows", () => {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(samples)) {
    out[k] = { ...normalizeLeadPayload(v), id: "00000000-0000-0000-0000-000000000000", created_at: new Date("2026-08-03T18:00:00Z").toISOString() };
  }
  writeFileSync("/tmp/normalized-leads.json", JSON.stringify(out, null, 2));
});

# Highlander Deliverables — Heritage Strategy Updates

This document tracks the integration of the Highlander Tartan heritage requirement into the core project deliverables.

---

## 1. Requirements Catalogue — Brand & Visual Standards

### [NEW] Heritage Identity Layer (Non-Negotiable)
- **Source of Truth:** The uploaded official tartan image (`public/tartan.png`) is the definitive reference for the Highlander brand heritage pattern.
- **Pattern Integrity:**
  - The tartan must **never** be approximated, redesigned, or replaced with a generic plaid.
  - The exact stripe order, spacing logic, and color relationships (Forest Green, Highland Gold, Deep Red, Charcoal) must be preserved in all implementations.
  - The pattern must not be stretched, distorted, or disproportionately scaled in a way that alters its traditional meaning.
- **Usage Strategy (Subtle Heritage):**
  - Use as a **secondary brand layer** only. It must never become the dominant visual theme or main background of the website.
  - Implementation is restricted to "Restrained Premium" moments: thin accent dividers, low-opacity section overlays (max 5-8% opacity), micro-UI details, and footer/header accent areas.
  - Readability is the priority; never place large bodies of text directly over high-contrast versions of the pattern.

---

## 2. Content Plan — Visual Language & Tone

### [UPDATED] Visual Style Guide
- **Tone:** Premium, Professional, Mountain-Hardened, Authentic.
- **Graphic Accents:**
  - Traditional Highlander Tartan used to signify heritage sections (About Page, Story sections).
  - Use "Tartan-Dark" (Forest Green overlay) for footer and hero-dark sections.
  - Use "Tartan-BG" (Light Cream/Stone overlay) for alternating content sections to break up solid backgrounds without losing a premium feel.
  - All visual assets must prioritize roofing and construction imagery; tartan is the "signature," not the "subject."

---

## 3. Launch Priorities & Risk List — Design QA

### [NEW] Heritage QA Checkpoint
- **Risk:** "Tartan Overuse" or "Thematic Gimmick."
- **Mitigation:**
  - Review all pages for "Pattern Fatigue." If the tartan is visible in more than 3 consecutive sections, reduce opacity or remove from one section.
  - Confirm pattern fidelity: Ensure the CSS `background-size` and `background-repeat` settings preserve the mathematical repeat of the original tartan source.
  - Mobile Check: Ensure the tartan doesn't create visual "noise" on small screens; reduce opacity on mobile if it competes with text.

---

## 4. Intake Form Structure — Visual Reinforcement

### [NEW] Form Identity
- **Header Accent:** Use a subtle `tartan-trim` (4px bar) at the top of multi-step intake forms (Roofing and Construction) to reinforce the "Highlander Standard" throughout the conversion funnel.
- **Success States:** Use a very faint tartan watermark in the background of the "Thank You / Next Steps" confirmation page to anchor the brand identity as the project transitions to human contact.

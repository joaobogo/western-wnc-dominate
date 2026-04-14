---
name: Quote Flow Architecture
description: Premium multi-step consultation request with project routing, smart microcopy, trust copy, field logic, branching, and confirmation experience
type: feature
---

# Quote Flow Architecture

## Design Philosophy
This is not a "Request a Quote" form — it's the **beginning of a project conversation**. Every step should feel like the user is talking with a professional who cares about getting the details right.

---

## Visual Design

### Layout
- **Desktop:** Centered card (max-width 640px), generous padding, cream background
- **Mobile:** Full-width with comfortable spacing, sticky "Next" button at bottom
- **Progress:** Horizontal step indicator with labels, completed steps show checkmarks
- **Typography:** Playfair Display for step titles, DM Sans for body/fields
- **Colors:** Forest green accents, cream backgrounds, gold progress indicators

### Micro-Interactions
- Step transitions: smooth horizontal slide (300ms)
- Field focus: subtle green border glow
- Validation: inline, gentle — no red alerts until submit attempt
- Completion: checkmark animation on each step

---

## Flow Structure (6 Steps)

### Step 0: Entry Point
Before the form, contextual entry copy based on where the user came from:

| Source Page | Entry Headline | Entry Subtext |
|---|---|---|
| Homepage | "Let's Start a Conversation" | "Tell us about your project and we'll take it from here." |
| Roofing service page | "Plan Your Roofing Project" | "A few details help us prepare the right consultation for you." |
| Construction page | "Let's Discuss Your Build" | "Share your vision and we'll connect you with the right team." |
| Storm damage page | "Request a Storm Assessment" | "We'll review your situation and respond within 24 hours." |
| Town page | "Get Started in [Town]" | "Our team serves [Town] and all of [County] County." |
| Direct /quote URL | "Begin Your Project Consultation" | "This takes about 2 minutes. No obligation, no pressure." |

---

### Step 1: Project Category
**Title:** "What kind of project are you planning?"
**Microcopy:** "This helps us connect you with the right team."

**Options (visual cards, single select):**

```
┌─────────────────┐  ┌─────────────────┐
│ 🏠              │  │ 🏗️              │
│ Roofing         │  │ Construction    │
│                 │  │                 │
│ Repair, replace,│  │ Additions,      │
│ inspect, or     │  │ renovations,    │
│ maintain        │  │ outdoor living  │
└─────────────────┘  └─────────────────┘
┌─────────────────┐  ┌─────────────────┐
│ ⛈️              │  │ ❓              │
│ Storm Damage    │  │ Not Sure Yet    │
│                 │  │                 │
│ Assessment,     │  │ I have a project│
│ repair, and     │  │ in mind but need│
│ insurance help  │  │ guidance        │
└─────────────────┘  └─────────────────┘
```

**Trust copy below cards:** "Every consultation is free. We'll listen first, then give you honest advice."

---

### Step 2: Project Type (Branches by Step 1)

#### If Roofing:
**Title:** "What does your roof need?"
**Microcopy:** "Select the option that best fits — we'll sort out the details together."

**Options (list with radio, single select):**
- Complete roof replacement
- Roof repair
- Storm damage assessment
- Routine inspection or maintenance
- Commercial roofing
- New construction (need a roof for a new build)
- Not sure — I'd like an expert opinion

#### If Construction:
**Title:** "What are you building?"
**Microcopy:** "Every great project starts with a conversation."

**Options:**
- Home addition (bedroom, bathroom, living space)
- Kitchen or bathroom renovation
- Outdoor living (deck, porch, pergola, outdoor kitchen)
- Garage, workshop, or accessory structure
- Whole-home renovation
- Custom new construction
- Something else (text field appears)

#### If Storm Damage:
**Title:** "Tell us about the damage"
**Microcopy:** "We'll prioritize your request based on urgency."

**Options:**
- Active leak or water intrusion (flagged as urgent)
- Visible roof damage (missing shingles, dents, etc.)
- Siding, gutter, or exterior damage
- Not sure — something looks wrong
- Insurance claim already filed (checkbox, not a separate option)

**Conditional:** If "Active leak" selected, show:
```
⚡ For active emergencies, calling is the fastest path:
📞 (828) 397-9211
We'll still process this form — but a call gets help moving immediately.
```

#### If "Not Sure Yet":
**Title:** "That's okay — tell us what's on your mind"
**Microcopy:** "Our team helps homeowners figure out the right approach every day."

**Fields:**
- Open textarea: "Describe what you're thinking about, noticing, or hoping to do"
- Placeholder: "E.g., 'My roof is 20 years old and I'm not sure if I need to replace it' or 'We want to add a master suite but don't know where to start'"

---

### Step 3: Location
**Title:** "Where's your property?"
**Microcopy:** "This helps us assign the right team and provide accurate guidance."

**Fields:**
- **Town or area** (dropdown, required):
  - Highlands, Cashiers, Franklin, Sylva, Waynesville, Brevard, Hendersonville
  - Other WNC area (reveals text input)
  - Outside WNC (reveals: "We primarily serve Western NC. Tell us your location and we'll let you know if we can help.")

- **Property address** (text input, optional):
  - Label: "Property address"
  - Helper: "Optional — helps us estimate access and site conditions"

**Trust copy:** "We serve all of Western North Carolina's mountain communities."

---

### Step 4: Timeline
**Title:** "When are you hoping to get started?"
**Microcopy:** "There's no wrong answer — we work with every timeline."

**Options (pill buttons, single select):**
- It's urgent — as soon as possible
- Within the next month
- 1 to 3 months
- 3 to 6 months
- Just planning ahead

**Conditional for "urgent":**
```
We prioritize urgent requests. If this is an emergency, please 
also call: 📞 (828) 397-9211
```

**Follow-up question:**
"Have you received other estimates for this project?"
- Yes
- Not yet
- This is my first call

**Microcopy for "This is my first call":** "Great — we'll make sure you understand everything before making any decisions."

---

### Step 5: Project Context
**Title:** "Anything else we should know?"
**Microcopy:** "The more context you share, the more prepared we'll be for our conversation."

**Fields:**
- **Project notes** (textarea, optional):
  - Placeholder varies by project type:
    - Roofing: "E.g., current material, age of roof, any known issues, specific concerns"
    - Construction: "E.g., room count, approximate size, style preferences, must-haves"
    - Storm: "E.g., date of storm, what you've noticed, insurance company"
    - General: "E.g., what prompted you to reach out, what matters most to you"

- **Photo upload** (optional, drag-and-drop or tap):
  - Label: "Have photos? Drop them here."
  - Helper: "Photos of your roof, property, damage, or inspiration — anything that helps."
  - Max 5 photos, max 10MB each
  - Accepted: JPG, PNG, HEIC

---

### Step 6: Contact Information
**Title:** "How should we reach you?"
**Microcopy:** "We'll review your project details and reach out within 1 business day."

**Fields:**
- **Full name** (required)
  - Placeholder: "Your name"

- **Email** (required)
  - Placeholder: "you@email.com"
  - Validation: real-time email format check

- **Phone** (optional but encouraged)
  - Label: "Phone number (optional)"
  - Helper: "A quick call is often the fastest way to discuss your project"

- **Preferred contact method** (pill buttons):
  - Phone call
  - Text message
  - Email

- **Best time to reach you** (optional, pill buttons):
  - Morning (8-11am)
  - Midday (11am-2pm)
  - Afternoon (2-5pm)
  - Anytime

**Trust strip above submit:**
```
┌─────────────────────────────────────────────────┐
│ ✓ Free consultation  ·  ✓ No obligation         │
│ ✓ Response within 1 business day                │
│ ✓ Your information is never shared              │
└─────────────────────────────────────────────────┘
```

**Submit button:** "Submit My Project Request"
- Not "Submit" — not "Send" — the language matters
- Button uses primary green, full width on mobile
- Subtle loading state with "Sending your details..." text

---

## Confirmation Experience

### Confirmation Page (not just a toast)

**Headline:** "Thank you, [First Name]. We've received your request."

**What happens next (timeline):**
```
┌─ Step 1 ─────────────────────────────────────────┐
│ ✅ Request received                              │
│    Right now                                     │
├─ Step 2 ─────────────────────────────────────────┤
│ ⏳ Team review                                   │
│    Our project team will review your details     │
│    and assign the right specialist.              │
│    Usually within a few hours.                   │
├─ Step 3 ─────────────────────────────────────────┤
│ 📞 Personal follow-up                           │
│    We'll reach out via your preferred method     │
│    to discuss your project and schedule a visit. │
│    Within 1 business day.                        │
├─ Step 4 ─────────────────────────────────────────┤
│ 🏠 On-site consultation                         │
│    A team member will visit your property        │
│    for a thorough assessment — free of charge.   │
└──────────────────────────────────────────────────┘
```

**Reassurance copy:**
"We take every project request seriously. This isn't a sales call — it's a real conversation about your home, your goals, and how we can help."

**Continued engagement:**
```
While you wait, you might enjoy:

[Project gallery card]  [Relevant blog article]  [Our process page]

Based on your [project type] in [town]:
• "See [project type] projects we've completed →"
• "Read: [relevant article title] →"
• "Learn how our process works →"
```

**Footer:**
```
Questions before we reach out?
📞 (828) 397-9211  ·  Available M-F, 8am-5pm
```

---

## Field Logic & Smart Defaults

### Auto-Detection
- If user navigated from a town page → pre-select that town in Step 3
- If user navigated from a service page → pre-select that service in Steps 1-2
- If user used the cost estimator → pre-fill material and size data

### Conditional Fields
- "Other WNC area" in location → reveals text input
- "Active leak" in storm → shows emergency phone callout
- "Something else" in construction → reveals description field
- "Insurance claim filed" → adds insurer name field

### Validation
- Email: real-time format validation, no submission without valid format
- Phone: optional, but if entered, format to (XXX) XXX-XXXX
- Name: minimum 2 characters
- No CAPTCHA — use honeypot field (hidden field, if filled = bot)

### Session Persistence
- Form progress saved to sessionStorage
- If user navigates away and returns, restore their progress
- Clear on successful submission

---

## Mobile Optimization

- Steps are full-screen on mobile, one at a time
- "Next" button is sticky at bottom of viewport
- "Back" link is always available (top-left)
- Progress bar is compact (dots, not full labels)
- Photo upload uses native camera/gallery picker
- Pill buttons are tappable with generous touch targets (min 44px)
- Keyboard-aware: fields scroll into view when focused

---

## Data Storage

### Database: `consultation_requests` table
```sql
id UUID PRIMARY KEY
project_category TEXT        -- roofing, construction, storm, general
project_type TEXT            -- specific service selected
location_town TEXT
location_address TEXT
timeline TEXT
has_other_estimates TEXT
project_notes TEXT
photo_paths TEXT[]           -- storage bucket references
contact_name TEXT
contact_email TEXT
contact_phone TEXT
preferred_contact TEXT       -- call, text, email
best_time TEXT
lead_score INTEGER           -- calculated from inputs
source_page TEXT             -- where they started the flow
created_at TIMESTAMPTZ
status TEXT DEFAULT 'new'    -- new, reviewed, contacted, scheduled, closed
```

### Lead Score Calculation
| Input | Points |
|---|---|
| Phone provided | +15 |
| Timeline: urgent or within 1 month | +20 |
| Timeline: 1-3 months | +10 |
| Photos uploaded | +10 |
| Has other estimates | +5 |
| Project notes provided | +5 |
| Primary service area town | +10 |
| Storm damage with active leak | +25 |
| Preferred contact: phone | +5 |

---

## Analytics Events

| Event | When |
|---|---|
| `quote_flow_started` | User enters Step 1 |
| `quote_flow_step_completed` | Each step completion (with step number) |
| `quote_flow_abandoned` | User leaves without submitting (with last step) |
| `quote_flow_submitted` | Successful submission |
| `quote_flow_emergency_call` | User clicks emergency phone number |
| `quote_flow_photo_uploaded` | Photo attached |

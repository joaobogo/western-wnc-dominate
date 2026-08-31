---
name: Appointment & Scheduling Architecture
description: Premium scheduling experience with consultation types, confirmation design, email/reminder tone, follow-up flow, and page placement
type: feature
---

# Appointment & Scheduling Architecture

## Design Philosophy
Scheduling a consultation with Highlander should feel like the beginning of a **real project relationship**, not like filling out a lead form. The experience must communicate: "We take your project seriously, and we're preparing for our conversation."

---

## Consultation Types

### 1. Roofing Consultation
- **Purpose:** Discuss roofing needs, schedule on-site inspection
- **Duration:** 15-minute introductory call → on-site visit scheduled during call
- **Who:** Roofing estimator or project lead
- **Prep:** Review property type, current roof, concerns
- **Label on site:** "Schedule a Roofing Consultation"

### 2. Construction Project Discussion
- **Purpose:** Explore construction project scope, feasibility, and next steps
- **Duration:** 20-30 minute call (construction projects need more context)
- **Who:** Construction division lead
- **Prep:** Review project type, plans/inspiration, lot details
- **Label on site:** "Schedule a Project Discussion"

### 3. Storm Damage Assessment
- **Purpose:** Schedule urgent on-site damage inspection
- **Duration:** Brief call (5-10 min) to confirm details → on-site visit
- **Who:** Storm response coordinator
- **Prep:** Damage description, insurance status, property access
- **Label on site:** "Schedule Storm Assessment"
- **Note:** Emergency (active leaks) bypass scheduling → direct phone call

### 4. Commercial Property Assessment
- **Purpose:** Evaluate commercial roofing or construction needs
- **Duration:** 20-minute call → site visit
- **Who:** Commercial project specialist
- **Prep:** Property details, portfolio size, maintenance history
- **Label on site:** "Schedule a Property Assessment"

### 5. General Inquiry Call
- **Purpose:** For users who aren't sure what they need
- **Duration:** 10-15 minute call
- **Who:** Client experience coordinator
- **Prep:** Route to correct division during call
- **Label on site:** "Schedule a Call — We'll Figure It Out Together"

---

## Scheduling UI

### Scheduling Component
```
┌─────────────────────────────────────────────────┐
│ Schedule Your [Consultation Type]               │
│                                                 │
│ What type of consultation?                      │
│ [Roofing] [Construction] [Storm] [Not Sure]     │
│                                                 │
│ ─────────────────────────────────────────────── │
│                                                 │
│ Select a day:                                   │
│                                                 │
│  Mon    Tue    Wed    Thu    Fri                 │
│  Apr 21 Apr 22 Apr 23 Apr 24 Apr 25            │
│  [●]    [●]    [○]    [●]    [●]               │
│                                                 │
│ ● Available  ○ Full                             │
│                                                 │
│ ─────────────────────────────────────────────── │
│                                                 │
│ Select a time:                                  │
│                                                 │
│  [9:00 AM]  [10:00 AM]  [11:00 AM]             │
│  [1:00 PM]  [2:00 PM]   [3:00 PM]              │
│  [4:00 PM]                                      │
│                                                 │
│ ─────────────────────────────────────────────── │
│                                                 │
│ Your information:                               │
│ Name: ___________                               │
│ Phone: __________                               │
│ Email: __________                               │
│                                                 │
│ Brief project note (optional):                  │
│ ________________________________               │
│ "So we can prepare for our conversation."       │
│                                                 │
│ [Confirm My Consultation]                       │
│                                                 │
│ ✓ Free · ✓ No obligation · ✓ 15-30 min         │
└─────────────────────────────────────────────────┘
```

### Mobile Design
- Full-width bottom sheet or dedicated page
- Consultation type as pills at top
- Days as horizontal scrollable strip
- Times as tappable pills (3 per row)
- Sticky "Confirm" button at bottom
- Minimal scrolling — everything visible within 1-2 screens

### Calendar Integration
- **Backend:** Store appointments in `scheduled_consultations` table
- **External sync:** Google Calendar / Outlook integration via webhook or Calendly embed
- **Availability:** Pull from team calendar or set business hours (M-F, 8am-5pm EST)
- **Buffer:** 15-minute buffer between appointments
- **Lead time:** Minimum 4 hours in advance (no same-hour booking)
- **Weekend:** Not available (show message: "We're available Monday through Friday")

---

## Confirmation Experience

### Confirmation Page

```
┌─────────────────────────────────────────────────┐
│ ✓ You're confirmed, [First Name].               │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ Roofing Consultation                        │ │
│ │ Tuesday, April 22 at 10:00 AM              │ │
│ │                                             │ │
│ │ We'll call you at (828) 555-0123            │ │
│ │                                             │ │
│ │ [Add to Calendar]  [Reschedule]             │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ What to expect:                                 │
│                                                 │
│ 1. A team member will call at your scheduled    │
│    time to discuss your project.                │
│                                                 │
│ 2. We'll ask a few questions about your home,   │
│    your roof, and what you're hoping to          │
│    accomplish.                                   │
│                                                 │
│ 3. If an on-site visit makes sense, we'll       │
│    schedule that during the call.                │
│                                                 │
│ This is a conversation, not a sales pitch.      │
│ We're here to listen and give you honest advice. │
│                                                 │
│ ─────────────────────────────────────────────── │
│                                                 │
│ While you wait:                                 │
│ [Relevant project card] [Relevant article]      │
│ [Our process page]                              │
│                                                 │
│ Questions before the call?                      │
│ 📞 (828) 524-7773                               │
└─────────────────────────────────────────────────┘
```

### "Add to Calendar" Button
- Generates .ics file with:
  - Event title: "Highlander Roofing — [Consultation Type]"
  - Time: selected slot
  - Description: "Your consultation with the Highlander team. We'll call you at [phone]. No preparation needed — just have your questions ready."
  - Location: "Phone call"

---

## Email & Message Tone

### Confirmation Email (sent immediately)

**Subject:** "Your [Consultation Type] is confirmed — [Day], [Time]"

**Body:**
```
Hi [Name],

Your consultation is set for [Day, Date] at [Time].

Here's what we'll cover:
• Your [project type / roofing concerns / building goals]
• What to expect in terms of process, timeline, and next steps
• Any questions you have — we'll take the time to answer them

We'll call you at [phone number]. The conversation usually takes 
about [15/20/30] minutes.

No need to prepare anything specific, but if you have photos of 
your [roof/property/project area], they're always helpful.

Looking forward to talking with you.

Warm regards,
[Team member name]
Highlander Roofing & Construction
(828) 524-7773
```

**Tone:** Warm, professional, personal. Not automated-sounding.

### Reminder — 24 Hours Before

**Subject:** "Quick reminder: Your consultation is tomorrow at [Time]"

**Body:**
```
Hi [Name],

Just a friendly reminder — we'll be calling you tomorrow 
([Day]) at [Time] to discuss your [project type].

If something came up and you need to reschedule, no problem 
at all — [reschedule link].

Talk soon!

[Team member name]
Highlander Roofing & Construction
```

### Reminder — 1 Hour Before

**SMS (if phone provided and opted in):**
```
Hi [Name] — Highlander here. We'll be calling you in about 
an hour at [Time] to discuss your [project type]. Looking 
forward to it! If you need to reschedule: [link]
```

### Follow-Up — After Consultation (same day)

**Subject:** "Great talking with you, [Name]"

**Body:**
```
Hi [Name],

Thanks for taking the time to discuss your [project type] 
with us today.

Here's a quick summary of what we covered:
• [Key points from conversation — filled by team]
• [Next steps agreed upon]
• [Timeline discussed]

[If on-site visit scheduled:]
Your on-site [inspection/assessment] is scheduled for 
[Date] at [Time]. [Team member] will be there.

[If quote to follow:]
We'll have your detailed proposal ready by [Date].

In the meantime, you might find these helpful:
• [Relevant resource link]
• [Relevant project example]

Don't hesitate to call or email if anything comes up.

Best,
[Team member name]
(828) 524-7773
```

### Follow-Up — If No-Show

**Subject:** "We missed you today — want to reschedule?"

**Body:**
```
Hi [Name],

We tried calling you at [Time] today for your [consultation type] 
but weren't able to connect. No worries at all — things come up!

Whenever you're ready, you can reschedule at a time that works 
better: [reschedule link]

Or just call us at (828) 524-7773 — we're happy to chat anytime.

[Team member name]
Highlander Roofing & Construction
```

**Tone:** Understanding, zero guilt. Never "you missed your appointment."

---

## Site Placement

### Where Scheduling Appears

| Location | Trigger | Type |
|---|---|---|
| Header CTA | Always visible | Links to scheduling page or modal |
| Service page CTAs | End of service content | Inline scheduling or link |
| Tool/calculator results | After results shown | Contextual invitation |
| Chatbot escalation | After qualification | Opens scheduling in chat or redirects |
| Quote flow confirmation | After form submission | Optional scheduling add-on |
| Sticky mobile CTA | All interior pages | Links to quick scheduling |
| Blog article CTAs | End of article | Soft invitation |
| Town pages | End of town content | Location-aware scheduling |
| Confirmation pages | After any form submission | "Want to schedule a specific time?" |

### Roofing vs Construction Differences

| Aspect | Roofing | Construction |
|---|---|---|
| Call duration | 15 min | 20-30 min |
| Urgency options | Emergency available | No emergency tier |
| Prep question | "Describe your roof concern" | "Tell us about your vision" |
| Follow-up speed | Same day | Within 24 hours |
| On-site scheduling | Usually scheduled during call | May require design discussion first |
| Team member | Roofing estimator | Construction project lead |
| Confirmation tone | Efficient, reassuring | Aspirational, collaborative |

---

## Database: `scheduled_consultations`

```sql
id UUID PRIMARY KEY
consultation_type TEXT      -- roofing, construction, storm, commercial, general
scheduled_date DATE
scheduled_time TIME
contact_name TEXT
contact_phone TEXT
contact_email TEXT
project_notes TEXT
source_page TEXT            -- where they scheduled from
lead_score INTEGER
status TEXT DEFAULT 'scheduled'  -- scheduled, completed, no_show, rescheduled, cancelled
reminder_sent_24h BOOLEAN DEFAULT false
reminder_sent_1h BOOLEAN DEFAULT false
follow_up_sent BOOLEAN DEFAULT false
created_at TIMESTAMPTZ
consultation_request_id UUID  -- links to consultation_requests if applicable
```

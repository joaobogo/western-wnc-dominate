---
name: Conversion Motion System
description: Reusable animated components for multi-step forms, chatbot messages, result reveals, confirmations, schedule slots, and input feedback
type: design
---

# Conversion Motion System

## Components (`src/components/conversion/ConversionMotion.tsx`)

### MultiStepForm
- Progress bar with animated step circles (spring pop on completion, gold fill)
- Connecting lines animate width as steps complete
- Step content slides horizontally (direction-aware) with AnimatePresence
- Back/Continue buttons with `btn-ghost-interactive` and `btn-primary-interactive`
- Submit state shows Loader2 spinner
- Wrapper uses `interaction-quote` context for enhanced focus glow

### ChatMessage
- Messages enter with y:12, scale:0.97 → normal
- Bot messages: left-aligned, secondary bg, rounded-bl-none
- User messages: right-aligned, primary bg, rounded-br-none
- TypingIndicator: 3 dots with staggered scale+opacity pulse animation

### ResultReveal
- AnimatePresence with height:0→auto + scale:0.97→1 + y:20→0
- Content reveals with staggered inner motion (delay 0.15s)
- Use for calculator outputs, quiz results, recommendation cards

### ConfirmationState
- Icon pops with spring (scale:0→1, rotate:-30→0)
- Headline/message stagger in (0.25s, 0.35s delays)
- Gold accent line draws with scaleX:0→1
- Secondary message fades in last
- Optional action slot (CTA button, link, etc.)

### InputFeedback
- Wraps any input with animated border + boxShadow
- `active` prop triggers gold glow ring
- Smooth transition on/off

### ScheduleSlot
- whileHover scale:1.03, whileTap scale:0.97
- Selected: gold bg + shadow + CheckCircle spring pop
- Unavailable: muted, cursor-not-allowed
- Available: border hover to gold tint

## Usage Pattern
```tsx
import { MultiStepForm, ConfirmationState, ResultReveal } from "@/components/conversion";
```

All components follow HIGHLAND_EASE timing and gold accent tokens.

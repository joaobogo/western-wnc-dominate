---
name: Chatbot & Quote Flow System
description: AI chatbot widget, multi-step consultation flow, interactive tools, and consultation_requests table
type: feature
---

# Chatbot & Quote Flow System

## Chatbot Widget
- Component: `src/components/chatbot/ChatbotWidget.tsx`
- Edge function: `supabase/functions/chatbot/index.ts`
- Floating button (bottom-right), slide-up panel on mobile, overlay on desktop
- AI-powered via Lovable AI (gemini-3-flash-preview)
- Page-context-aware (adjusts for roofing/construction/storm pages)
- Quick starters: Roofing, Construction, Storm Damage, Not Sure
- Phone CTA always visible in footer
- Streams responses token-by-token via SSE
- Premium tone: consultative, never salesy

## Quote Flow
- Page: `src/pages/QuoteFlow.tsx` at `/consultation`
- 6-step MultiStepForm: Service → Project Type → Location → Timeline → Details → Contact
- Calculates lead score (0-100) based on qualification signals
- Stores to `consultation_requests` table
- Confirmation shows tier-appropriate response time (2h for hot, 24h for warm)

## Interactive Tools
- Components: `src/components/tools/InteractiveTools.tsx`
- Repair vs Replace Guide (5-question quiz with scored result)
- Storm Damage Checklist (critical/non-critical items with urgency assessment)
- Materials Comparison (4 materials, side-by-side compare up to 3)
- Construction Fit Guide (2 questions → service recommendation)
- Service Area Finder (searchable town list with primary/secondary indicators)
- All tools end with soft CTA to `/consultation`

## Database
- Table: `consultation_requests` (RLS: public insert, no public read)
- Fields: name, email, phone, town, project_type, service_category, timeline, urgency, budget_range, project_description, source, lead_score, status, conversation_log, has_plans, insurance_status, property_type, metadata

## CTA Language
- All CTAs follow `src/lib/cta-config.ts` rules
- Never "free quote" — always "consultation", "discussion", "advisor"

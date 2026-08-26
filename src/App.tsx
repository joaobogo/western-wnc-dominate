import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";
import UrlNormalizer from "./components/UrlNormalizer";
import GTMRouteTracker from "./components/GTMRouteTracker";
import RecoveryPrompt from "./components/recovery/RecoveryPrompt";
import PaidLandingGate from "./components/system/PaidLandingGate";
import ErrorBoundary from "./components/ErrorBoundary";
import OrphanRedirectHandler from "./components/OrphanRedirectHandler";
import { initPixels } from "./lib/analytics";
import { captureAttribution } from "./lib/attribution";
import { preloadLikelyRoutes } from "./lib/route-preload";
import { tier1FlatEntries, tier2FlatEntries } from "./data/service-town-slugs";

// Chat widget is below-the-fold, non-critical UI — keep it out of the first load.
const ChatbotWidget = lazy(() => import("./components/chatbot/ChatbotWidget"));
// Toast layers only matter after an interaction — keep them off the critical path.
const Toaster = lazy(() => import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })));
// Consent notice is non-critical chrome — mounted lazily, renders only until decided.
import DeferMount from "./components/system/DeferMount";
const ConsentBanner = lazy(() => import("./components/ConsentBanner"));

// Initialize tracking pixels
initPixels();
// Persist UTM / click-id / referrer for lead attribution
captureAttribution();
// Warm the most likely next route chunks once the browser is idle
preloadLikelyRoutes();

// Lazy-load all non-home routes for faster LCP on initial load
const NotFound = lazy(() => import("./pages/NotFound"));
const TownPage = lazy(() => import("./pages/TownPage"));
const CountyPage = lazy(() => import("./pages/CountyPage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./pages/BlogPost"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const Locations = lazy(() => import("./pages/Locations"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const About = lazy(() => import("./pages/About"));
const GivingBack = lazy(() => import("./pages/GivingBack"));
const Team = lazy(() => import("./pages/Team"));
const FAQ = lazy(() => import("./pages/FAQ"));
const RoofingCostWNC = lazy(() => import("./pages/RoofingCostWNC"));
const LayoutsPlanning = lazy(() => import("./pages/LayoutsPlanning"));



const Certifications = lazy(() => import("./pages/Certifications"));
const RecentProjects = lazy(() => import("./pages/RecentProjects"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Financing = lazy(() => import("./pages/Financing"));
const Careers = lazy(() => import("./pages/Careers"));
const RequestInspection = lazy(() => import("./pages/RequestInspection"));
const SEOMonitoring = lazy(() => import("./pages/SEOMonitoring"));
const RoofingDivision = lazy(() => import("./pages/RoofingDivision"));
const RoofDesigner = lazy(() => import("./pages/RoofDesigner"));
const ExteriorImprovements = lazy(() => import("./pages/ExteriorImprovements"));
const ResidentialRoofing = lazy(() => import("./pages/ResidentialRoofing"));
const SpecialtyRoofing = lazy(() => import("./pages/SpecialtyRoofing"));
const RoofReplacement = lazy(() => import("./pages/RoofReplacement"));
const RoofRepair = lazy(() => import("./pages/RoofRepair"));
const StormDamage = lazy(() => import("./pages/StormDamage"));
const RoofReplacementAds = lazy(() => import("./pages/RoofReplacementAds"));
const RoofRepairAds = lazy(() => import("./pages/RoofRepairAds"));
const StormDamageAds = lazy(() => import("./pages/StormDamageAds"));
const CommercialRoofing = lazy(() => import("./pages/CommercialRoofing"));
const MetalRoofing = lazy(() => import("./pages/MetalRoofing"));
const SyntheticRoofing = lazy(() => import("./pages/SyntheticRoofing"));
const Skylights = lazy(() => import("./pages/Skylights"));
const Gutters = lazy(() => import("./pages/Gutters"));
const ServiceTownPage = lazy(() => import("./pages/ServiceTownPage"));
const ConstructionDivision = lazy(() => import("./pages/ConstructionDivision"));
const HomeAdditions = lazy(() => import("./pages/HomeAdditions"));
const OutdoorLiving = lazy(() => import("./pages/OutdoorLiving"));
const Renovations = lazy(() => import("./pages/Renovations"));
const Siding = lazy(() => import("./pages/Siding"));
const ConstructionConsultation = lazy(() => import("./pages/ConstructionConsultation"));
const ConstructionDesign = lazy(() => import("./pages/ConstructionDesign"));
const QuoteFlow = lazy(() => import("./pages/QuoteFlow"));
const Contact = lazy(() => import("./pages/Contact"));
const RoofingIntake = lazy(() => import("./pages/RoofingIntake"));
const ConstructionIntake = lazy(() => import("./pages/ConstructionIntake"));
const IntakeChooser = lazy(() => import("./pages/IntakeChooser"));
const RoofingBuilder = lazy(() => import("./pages/RoofingBuilder"));
const ConstructionBuilder = lazy(() => import("./pages/ConstructionBuilder"));
const DesignIntake = lazy(() => import("./pages/DesignIntake"));
const LegalPage = lazy(() => import("./pages/Legal"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const AdminLeads = lazy(() => import("./pages/AdminLeads"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const OAuthConsent = lazy(() => import("./pages/OAuthConsent"));
const RealWorkDiagnostics = lazy(() => import("./pages/RealWorkDiagnostics"));
// Internal receptionist call sheet (unlisted, noindex) — mounted at /front-desk/*
const IntakeApp = lazy(() => import("./intake/App"));



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
    },
  },
});

const App = () => (
  <ErrorBoundary boundary="app-root">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MotionConfig reducedMotion="user">
        <Suspense fallback={null}>
          <Toaster />
          <Sonner />
        </Suspense>
        <BrowserRouter>
          <UrlNormalizer />
          <ScrollToTop />
          <GTMRouteTracker />
          <OrphanRedirectHandler />

          <PaidLandingGate>
            <RecoveryPrompt />
          </PaidLandingGate>
          <Suspense fallback={<div className="min-h-dvh bg-background" />}>
            <ErrorBoundary boundary="route">
              <Routes>
          <Route path="/" element={<Index />} />

          {/* ─── Roofing Division ─── */}
          <Route path="/roofing" element={<RoofingDivision />} />
          <Route path="/roofing/roof-replacement" element={<RoofReplacement />} />
          <Route path="/roofing/roof-repair" element={<RoofRepair />} />
          <Route path="/roofing/storm-damage" element={<StormDamage />} />
          <Route path="/roofing/commercial" element={<CommercialRoofing />} />
          {/* Redirects for retired roofing routes */}
          <Route path="/roofing/residential" element={<ResidentialRoofing />} />
          <Route path="/roofing/specialty" element={<SpecialtyRoofing />} />
          {/* Tier 1 premium service pages */}
          <Route path="/roofing/metal" element={<MetalRoofing />} />
          <Route path="/roofing/brava-synthetic" element={<SyntheticRoofing />} />
          <Route path="/roofing/skylights" element={<Skylights />} />
          <Route path="/roofing/gutters" element={<Gutters />} />

          {/* ─── Keyword aliases — roofing search intent → existing polished pages ─── */}

          {/* ─── Paid landing pages (kept for ad spend, excluded from nav) ─── */}
          <Route path="/lp/roof-replacement" element={<RoofReplacementAds />} />
          <Route path="/lp/roof-repair" element={<RoofRepairAds />} />
          <Route path="/lp/storm-damage" element={<StormDamageAds />} />

          {/* ─── Construction Division ─── */}
          <Route path="/construction" element={<ConstructionDivision />} />
          <Route path="/construction/additions" element={<HomeAdditions />} />
          <Route path="/construction/outdoor-living" element={<OutdoorLiving />} />
          <Route path="/construction/consultation" element={<ConstructionConsultation />} />
          <Route path="/construction/design" element={<ConstructionDesign />} />
          {/* Redirects for retired construction routes */}
          <Route path="/construction/renovations" element={<Renovations />} />
          <Route path="/construction/siding" element={<Siding />} />

          {/* ─── Keyword aliases — construction search intent → existing polished pages ─── */}

          {/* ─── Gutter keyword aliases ─── */}
          <Route path="/exterior-improvements" element={<ExteriorImprovements />} />

          {/* ─── Layouts & Planning (Supporting Branch) ─── */}
          <Route path="/layouts-planning" element={<LayoutsPlanning />} />

          {/* ─── Legacy service routes → canonical division pages ─── */}

          {/* ─── Company ─── */}
          {/* ─── Legacy /service-locations → /service-areas (301 at edge) ─── */}
          {/* ─── Physical showrooms (locations) — distinct from service areas ─── */}
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/franklin-nc" element={<LocationPage slug="franklin-nc" />} />
          <Route path="/locations/sylva-nc" element={<LocationPage slug="sylva-nc" />} />

          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/service-areas/:slug" element={<TownPage />} />
          <Route path="/service-areas/county/:slug" element={<CountyPage />} />
          <Route path="/service-areas/:townSlug/:serviceSlug" element={<ServiceTownPage />} />

          {/* ─── Tier 1 flat-slug commercial pages (Highlands / Franklin / Cashiers × 5 services) ─── */}
          {tier1FlatEntries.map((t) => (
            <Route
              key={t.flatSlug}
              path={`/${t.flatSlug}`}
              element={
                <ServiceTownPage
                  townSlug={t.townSlug}
                  serviceSlug={t.serviceSlug}
                  canonicalPath={`/${t.flatSlug}`}
                />
              }
            />
          ))}

          {/* ─── Tier 2 flat-slug pages (Sylva / Cullowhee) ─── */}
          {tier2FlatEntries.map((t) => (
            <Route
              key={t.flatSlug}
              path={`/${t.flatSlug}`}
              element={
                <ServiceTownPage
                  townSlug={t.townSlug}
                  serviceSlug={t.serviceSlug}
                  canonicalPath={`/${t.flatSlug}`}
                />
              }
            />
          ))}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/giving-back" element={<GivingBack />} />
          <Route path="/community" element={<GivingBack />} />
          <Route path="/team" element={<Team />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/roofing-cost-western-nc" element={<RoofingCostWNC />} />
          <Route path="/roof-designer" element={<RoofDesigner />} />

          
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/recent-projects" element={<RecentProjects />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/request-inspection" element={<RequestInspection />} />

          {/* Internal-only admin tool */}
          <Route path="/seo-monitoring" element={<SEOMonitoring />} />
          <Route path="/realwork-diagnostics" element={<RealWorkDiagnostics />} />

          {/* Internal receptionist call sheet — unlisted, never prerendered */}
          <Route path="/front-desk/*" element={<IntakeApp />} />
          {/* Old /intake URLs are 301'd at the edge in public/_redirects */}



          <Route path="/consultation" element={<IntakeChooser />} />
          <Route path="/roofing-intake" element={<RoofingIntake />} />
          <Route path="/construction-intake" element={<ConstructionIntake />} />
          <Route path="/roofing-builder" element={<RoofingBuilder />} />
          <Route path="/construction-builder" element={<ConstructionBuilder />} />
          <Route path="/design-intake" element={<DesignIntake />} />
          <Route path="/quote-flow" element={<QuoteFlow />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/accessibility" element={<LegalPage kind="accessibility" />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/leads" element={<AdminLeads />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
          {/* ─── Legacy WordPress backlink redirects (Hibu migration) ─── */}
          {/* Preserve SEO value from old highlandernc.com URLs. */}
          {/* ─── SEMrush-verified legacy URLs — high-intent service pages ─── */}
          {/* Residential */}
          {/* Commercial */}
          {/* Metal */}
          {/* Slate / specialty */}
          {/* Waterproofing */}
          {/* Gutters & guards */}
          {/* Outdoor / construction */}
          {/* Skylight */}
          {/* Additional commercial / replacement / asphalt legacy aliases */}
          {/* Root-level leak repair aliases (SEMrush intent) */}
          {/* Contact town-specific pages → matching service area */}
          {/* Legacy Hibu /contact/[service]-service-area/[town] wildcard */}
          {/* About/team legacy aliases (about-us already covered above; add extras) */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </Suspense>
          <PaidLandingGate>
            <ErrorBoundary boundary="chatbot" fallback={() => null}>
              <Suspense fallback={null}>
                <DeferMount>
                  <ChatbotWidget />
                </DeferMount>
              </Suspense>
            </ErrorBoundary>
          </PaidLandingGate>
          <ErrorBoundary boundary="consent" fallback={() => null}>
            <Suspense fallback={null}>
              <ConsentBanner />
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
        </MotionConfig>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

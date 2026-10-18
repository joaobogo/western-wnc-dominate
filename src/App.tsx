import { lazyPreload, LazyFallback } from "@/lib/lazy-preload";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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

// Toast layers only matter after an interaction — keep them off the critical path.
const Toaster = lazyPreload("Toaster", () => import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })));
const Sonner = lazyPreload("Sonner", () => import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })));
// Consent notice is non-critical chrome — mounted lazily, renders only until decided.
const ConsentBanner = lazyPreload("ConsentBanner", () => import("./components/ConsentBanner"));

// Initialize tracking pixels
initPixels();
// Persist UTM / click-id / referrer for lead attribution
captureAttribution();
// Warm the most likely next route chunks once the browser is idle
preloadLikelyRoutes();

// Lazy-load all non-home routes for faster LCP on initial load
const NotFound = lazyPreload("NotFound", () => import("./pages/NotFound"));
const TownPage = lazyPreload("TownPage", () => import("./pages/TownPage"));
const CountyPage = lazyPreload("CountyPage", () => import("./pages/CountyPage"));
const Blog = lazyPreload("Blog", () => import("./pages/Blog"));
const BlogPostPage = lazyPreload("BlogPostPage", () => import("./pages/BlogPost"));
const ServiceAreas = lazyPreload("ServiceAreas", () => import("./pages/ServiceAreas"));
const Locations = lazyPreload("Locations", () => import("./pages/Locations"));
const LocationPage = lazyPreload("LocationPage", () => import("./pages/LocationPage"));
const About = lazyPreload("About", () => import("./pages/About"));
const GivingBack = lazyPreload("GivingBack", () => import("./pages/GivingBack"));
const Team = lazyPreload("Team", () => import("./pages/Team"));
const FAQ = lazyPreload("FAQ", () => import("./pages/FAQ"));
const RoofingCostWNC = lazyPreload("RoofingCostWNC", () => import("./pages/RoofingCostWNC"));
const MetalRoofingCost = lazyPreload("MetalRoofingCost", () => import("./pages/MetalRoofingCost"));



const Certifications = lazyPreload("Certifications", () => import("./pages/Certifications"));
const RecentProjects = lazyPreload("RecentProjects", () => import("./pages/RecentProjects"));
const ReviewsPage = lazyPreload("ReviewsPage", () => import("./pages/ReviewsPage"));
const ProjectDetail = lazyPreload("ProjectDetail", () => import("./pages/ProjectDetail"));
const Financing = lazyPreload("Financing", () => import("./pages/Financing"));
const Careers = lazyPreload("Careers", () => import("./pages/Careers"));
const RequestInspection = lazyPreload("RequestInspection", () => import("./pages/RequestInspection"));
const ThankYou = lazyPreload("ThankYou", () => import("./pages/ThankYou"));
const SEOMonitoring = lazyPreload("SEOMonitoring", () => import("./pages/SEOMonitoring"));
const RoofingDivision = lazyPreload("RoofingDivision", () => import("./pages/RoofingDivision"));
const ExteriorImprovements = lazyPreload("ExteriorImprovements", () => import("./pages/ExteriorImprovements"));
const ResidentialRoofing = lazyPreload("ResidentialRoofing", () => import("./pages/ResidentialRoofing"));
const SpecialtyRoofing = lazyPreload("SpecialtyRoofing", () => import("./pages/SpecialtyRoofing"));
const RoofReplacement = lazyPreload("RoofReplacement", () => import("./pages/RoofReplacement"));
const RoofRepair = lazyPreload("RoofRepair", () => import("./pages/RoofRepair"));
const StormDamage = lazyPreload("StormDamage", () => import("./pages/StormDamage"));
const RoofReplacementAds = lazyPreload("RoofReplacementAds", () => import("./pages/RoofReplacementAds"));
const RoofRepairAds = lazyPreload("RoofRepairAds", () => import("./pages/RoofRepairAds"));
const StormDamageAds = lazyPreload("StormDamageAds", () => import("./pages/StormDamageAds"));
const RoofingLanding = lazyPreload("RoofingLanding", () => import("./pages/RoofingLanding"));
const ConstructionLanding = lazyPreload("ConstructionLanding", () => import("./pages/ConstructionLanding"));
const CombinedLanding = lazyPreload("CombinedLanding", () => import("./pages/CombinedLanding"));
const CommercialRoofing = lazyPreload("CommercialRoofing", () => import("./pages/CommercialRoofing"));
const MetalRoofing = lazyPreload("MetalRoofing", () => import("./pages/MetalRoofing"));
const SyntheticRoofing = lazyPreload("SyntheticRoofing", () => import("./pages/SyntheticRoofing"));
const Skylights = lazyPreload("Skylights", () => import("./pages/Skylights"));
const Gutters = lazyPreload("Gutters", () => import("./pages/Gutters"));
const ServiceTownPage = lazyPreload("ServiceTownPage", () => import("./pages/ServiceTownPage"));
const ConstructionDivision = lazyPreload("ConstructionDivision", () => import("./pages/ConstructionDivision"));
const HomeAdditions = lazyPreload("HomeAdditions", () => import("./pages/HomeAdditions"));
const OutdoorLiving = lazyPreload("OutdoorLiving", () => import("./pages/OutdoorLiving"));
const OutdoorLivingSubPage = lazyPreload("OutdoorLivingSubPage", () => import("./pages/OutdoorLivingSubPage"));
const Renovations = lazyPreload("Renovations", () => import("./pages/Renovations"));
const Siding = lazyPreload("Siding", () => import("./pages/Siding"));
const ConstructionConsultation = lazyPreload("ConstructionConsultation", () => import("./pages/ConstructionConsultation"));
const ConstructionDesign = lazyPreload("ConstructionDesign", () => import("./pages/ConstructionDesign"));
const QuoteFlow = lazyPreload("QuoteFlow", () => import("./pages/QuoteFlow"));
const Contact = lazyPreload("Contact", () => import("./pages/Contact"));
const RoofingIntake = lazyPreload("RoofingIntake", () => import("./pages/RoofingIntake"));
const ConstructionIntake = lazyPreload("ConstructionIntake", () => import("./pages/ConstructionIntake"));
const IntakeChooser = lazyPreload("IntakeChooser", () => import("./pages/IntakeChooser"));
const RoofingBuilder = lazyPreload("RoofingBuilder", () => import("./pages/RoofingBuilder"));
const ConstructionBuilder = lazyPreload("ConstructionBuilder", () => import("./pages/ConstructionBuilder"));
const DesignIntake = lazyPreload("DesignIntake", () => import("./pages/DesignIntake"));
const LegalPage = lazyPreload("LegalPage", () => import("./pages/Legal"));
const PrivacyPolicy = lazyPreload("PrivacyPolicy", () => import("./pages/PrivacyPolicy"));
const AdminLeads = lazyPreload("AdminLeads", () => import("./pages/AdminLeads"));
const AdminDashboard = lazyPreload("AdminDashboard", () => import("./pages/AdminDashboard"));
const AdminBlogReview = lazyPreload("AdminBlogReview", () => import("./pages/AdminBlogReview"));
const AdminLogin = lazyPreload("AdminLogin", () => import("./pages/AdminLogin"));
const OAuthConsent = lazyPreload("OAuthConsent", () => import("./pages/OAuthConsent"));
// Internal receptionist call sheet (unlisted, noindex) — mounted at /front-desk/*
const IntakeApp = lazyPreload("IntakeApp", () => import("./intake/App"));



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
    },
  },
});

const RootEntry = () => {
  const { search } = useLocation();
  const landing = new URLSearchParams(search).get("landing");

  if (landing === "roofing") return <RoofingLanding />;
  if (landing === "construction") return <ConstructionLanding />;
  if (landing === "roofing-construction" || landing === "combined") return <CombinedLanding />;

  return <Index />;
};

const App = () => (
  <ErrorBoundary boundary="app-root">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MotionConfig reducedMotion="user">
        <LazyFallback fallback={null}>
          <Toaster />
          <Sonner />
        </LazyFallback>
        <BrowserRouter>
          <UrlNormalizer />
          <ScrollToTop />
          <GTMRouteTracker />
          <OrphanRedirectHandler />

          <PaidLandingGate>
            <RecoveryPrompt />
          </PaidLandingGate>
          <LazyFallback fallback={<div className="min-h-dvh bg-background" />}>
            <ErrorBoundary boundary="route">
              <Routes>
          <Route path="/" element={<RootEntry />} />

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
          <Route path="/lp/roofing" element={<RoofingLanding />} />
          <Route path="/lp/construction" element={<ConstructionLanding />} />
          <Route path="/lp/roofing-construction" element={<CombinedLanding />} />

          {/* ─── Construction Division ─── */}
          <Route path="/construction" element={<ConstructionDivision />} />
          <Route path="/construction/additions" element={<HomeAdditions />} />
          <Route path="/construction/outdoor-living" element={<OutdoorLiving />} />
          <Route path="/construction/outdoor-living/patios" element={<OutdoorLivingSubPage slug="patios" />} />
          <Route path="/construction/outdoor-living/outdoor-kitchens" element={<OutdoorLivingSubPage slug="outdoor-kitchens" />} />
          <Route path="/construction/outdoor-living/hardscape" element={<OutdoorLivingSubPage slug="hardscape" />} />
          <Route path="/construction/consultation" element={<ConstructionConsultation />} />
          <Route path="/construction/design" element={<ConstructionDesign />} />
          {/* Redirects for retired construction routes */}
          <Route path="/construction/renovations" element={<Renovations />} />
          <Route path="/construction/siding" element={<Siding />} />

          {/* ─── Keyword aliases — construction search intent → existing polished pages ─── */}

          {/* ─── Gutter keyword aliases ─── */}
          <Route path="/exterior-improvements" element={<ExteriorImprovements />} />

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

          {/* Legacy flat service×town slugs (/roofing-highlands-nc, /roof-repair-sylva-nc, …)
              are 301'd at the edge to /service-areas/<town>/<service> in public/_redirects.
              They deliberately have NO client route: one URL per page. */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<About />} />
          {/* /giving-back is a 301 to /community in public/_redirects — no client route. */}
          <Route path="/community" element={<GivingBack />} />
          <Route path="/team" element={<Team />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/roofing-cost-western-nc" element={<RoofingCostWNC />} />
          <Route path="/roofing/metal/cost" element={<MetalRoofingCost />} />

          
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/recent-projects" element={<RecentProjects />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/request-inspection" element={<RequestInspection />} />

          {/* Internal-only admin tool */}
          <Route path="/seo-monitoring" element={<SEOMonitoring />} />

          {/* Internal receptionist call sheet — unlisted, never prerendered */}
          <Route path="/front-desk/*" element={<IntakeApp />} />
          {/* Old /intake URLs are 301'd at the edge in public/_redirects */}



          <Route path="/roofing-intake" element={<RoofingIntake />} />
          <Route path="/construction-intake" element={<ConstructionIntake />} />
          <Route path="/roofing-builder" element={<RoofingBuilder />} />
          <Route path="/construction-builder" element={<ConstructionBuilder />} />
          <Route path="/design-intake" element={<DesignIntake />} />
          <Route path="/quote-flow" element={<QuoteFlow />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/accessibility" element={<LegalPage kind="accessibility" />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/leads" element={<AdminLeads />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blog-review" element={<AdminBlogReview />} />
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
          </LazyFallback>
          <ErrorBoundary boundary="consent" fallback={() => null}>
            <LazyFallback fallback={null}>
              <ConsentBanner />
            </LazyFallback>
          </ErrorBoundary>
        </BrowserRouter>
        </MotionConfig>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

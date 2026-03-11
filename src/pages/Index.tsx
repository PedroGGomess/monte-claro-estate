import { lazy, Suspense } from "react";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import HeroOverlay from "@/components/HeroOverlay";
import HeroFallback from "@/components/HeroFallback";
import WebGLErrorBoundary from "@/components/WebGLErrorBoundary";
import StatsStrip from "@/components/StatsStrip";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import GallerySection from "@/components/GallerySection";
import LocationSection from "@/components/LocationSection";
import VisitSection from "@/components/VisitSection";
import SiteFooter from "@/components/SiteFooter";

const HeroScene = lazy(() => import("@/components/HeroScene"));

const Index = () => (
  <div className="bg-background min-h-screen">
    <CustomCursor />
    <FilmGrain />

    {/* Hero */}
    <section className="relative w-full h-screen overflow-hidden">
      <WebGLErrorBoundary fallback={<HeroFallback />}>
        <Suspense fallback={<HeroFallback />}>
          <HeroScene />
        </Suspense>
      </WebGLErrorBoundary>
      <HeroOverlay />
    </section>

    <StatsStrip />
    <AboutSection />
    <FeaturesSection />
    <GallerySection />
    <LocationSection />
    <VisitSection />
    <SiteFooter />
  </div>
);

export default Index;

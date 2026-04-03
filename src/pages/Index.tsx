import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import HeroScene from "@/components/HeroScene";
import HeroOverlay from "@/components/HeroOverlay";
import ProximityStrip from "@/components/ProximityStrip";
import AboutSection from "@/components/AboutSection";
import LifestyleSection from "@/components/LifestyleSection";
import InvestmentSection from "@/components/InvestmentSection";
import FeaturesSection from "@/components/FeaturesSection";
import GallerySection from "@/components/GallerySection";
import LocationSection from "@/components/LocationSection";
import VisitSection from "@/components/VisitSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => (
  <div className="bg-background min-h-screen">
    <CustomCursor />
    <FilmGrain />

    {/* 1. Hero — aspirational headline + dual CTA */}
    <section className="relative w-full h-screen overflow-hidden">
      <HeroScene />
      <HeroOverlay />
    </section>

    {/* 2. Proximity strip — instant credibility */}
    <ProximityStrip />

    {/* 3. Narrative: the opportunity */}
    <AboutSection />

    {/* 4. Lifestyle: emotional sell */}
    <LifestyleSection />

    {/* 5. Investment potential: rational sell */}
    <InvestmentSection />

    {/* 6. Technical features — for the detail-oriented */}
    <FeaturesSection />

    {/* 7. Visual proof */}
    <GallerySection />

    {/* 8. Location deep-dive */}
    <LocationSection />

    {/* 9. Final CTA */}
    <VisitSection />
    <SiteFooter />
  </div>
);

export default Index;

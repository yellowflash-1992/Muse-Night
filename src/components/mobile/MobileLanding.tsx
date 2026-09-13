import { MobileAuthorsSpotlight } from "./MobileAuthorsSpotlight";
import { MobileCuratedCovers } from "./MobileCuratedCovers";
import { MobileHero } from "./MobileHero";
import { MobileStatsBar } from "./MobileStatsBar";
import { MobileStudyHallSection } from "./MobileStudyHallSection";
import { MobileSubmitCallout } from "./MobileSubmitCallout";
import { MobileTestimonials } from "./MobileTestimonials";

export function MobileLanding() {
  return (
    <div className="block md:hidden bg-ink font-karla text-paper selection:bg-neon selection:text-ink pt-20">
      {/* 1. Hero Masthead & Background Slider */}
      <MobileHero />

      {/* 2. Literary Stats Bar */}
      <MobileStatsBar />

      {/* 3. Curated Poetry Covers */}
      <MobileCuratedCovers />

      {/* 4. Voices from the Page (Testimonials Carousel) */}
      <MobileTestimonials />

      {/* 5. JAMB & WAEC Study Hall Section */}
      <MobileStudyHallSection />

      {/* 6. Two Voices / Authors Spotlight */}
      <MobileAuthorsSpotlight />

      {/* 7. Call for Poetry Submissions */}
      <MobileSubmitCallout />
    </div>
  );
}

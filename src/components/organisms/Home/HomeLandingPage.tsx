import HomeCtaSection from '@/components/organisms/Home/HomeCtaSection';
import HomeFeatureGrid from '@/components/organisms/Home/HomeFeatureGrid';
import HomeHero from '@/components/organisms/Home/HomeHero';
import HomeRoadmapSection from '@/components/organisms/Home/HomeRoadmapSection';
import HomeStatsSection from '@/components/organisms/Home/HomeStatsSection';

export default function HomeLandingPage() {
  return (
    <div className="w-full max-w-6xl space-y-10">
      <HomeHero />
      <HomeFeatureGrid />
      <HomeStatsSection />
      <HomeRoadmapSection />
      <HomeCtaSection />
    </div>
  );
}

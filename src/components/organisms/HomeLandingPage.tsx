import HomeHero from '@/components/organisms/HomeHero';
import HomeFeatureGrid from '@/components/organisms/HomeFeatureGrid';
import HomeStatsSection from '@/components/organisms/HomeStatsSection';
import HomeRoadmapSection from '@/components/organisms/HomeRoadmapSection';
import HomeCtaSection from '@/components/organisms/HomeCtaSection';

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

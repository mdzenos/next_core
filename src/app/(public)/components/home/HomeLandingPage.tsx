import HomeCtaSection from '@/app/(public)/components/home/HomeCtaSection';
import HomeFeatureGrid from '@/app/(public)/components/home/HomeFeatureGrid';
import HomeHero from '@/app/(public)/components/home/HomeHero';
import HomeRoadmapSection from '@/app/(public)/components/home/HomeRoadmapSection';
import HomeStatsSection from '@/app/(public)/components/home/HomeStatsSection';
import { MarketingPageTemplate } from '@/components/templates';

export default function HomeLandingPage() {
  return (
    <MarketingPageTemplate
      hero={{
        title: 'Social Dashboard / Mini Social Media Platform',
        description: 'Hoc React + Next.js thong qua mot bo feature day du tu auth den dashboard va data flow.',
        badge: 'Learning Path',
      }}
      sections={
        <div className="space-y-10">
          <HomeHero />
          <HomeFeatureGrid />
          <HomeStatsSection />
          <HomeRoadmapSection />
        </div>
      }
      cta={<HomeCtaSection />}
      className="w-full max-w-6xl"
    />
  );
}

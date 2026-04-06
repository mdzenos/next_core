import { ActivityTimeline, SectionPanel } from '@/components/organisms';

const roadmapItems = [
  { id: 'r1', title: 'React fundamentals', description: 'Props, state, hooks, composition', tone: 'info' as const },
  { id: 'r2', title: 'Next.js App Router', description: 'Layouts, nested routes, loading, error', tone: 'success' as const },
  { id: 'r3', title: 'Authentication', description: 'Login, register, middleware bao ve route', tone: 'warning' as const },
  { id: 'r4', title: 'Dashboard', description: 'Sidebar, header, stats, feed, CRUD posts', tone: 'info' as const },
  { id: 'r5', title: 'Data fetching', description: 'SSR, API routes, caching, streaming, ISR', tone: 'success' as const },
];

export default function HomeRoadmapSection() {
  return (
    <SectionPanel
      title="Lo trinh hoc trong mot du an"
      description="Xay dung tung module theo dung flow thuc te de vua hoc React, vua nam Next.js hien dai mot cach co he thong."
    >
      <ActivityTimeline items={roadmapItems} title="Roadmap" />
    </SectionPanel>
  );
}

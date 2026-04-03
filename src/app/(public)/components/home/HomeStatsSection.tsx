import { KPIOverviewGrid } from '@/components/organisms';

const stats = [
  { key: 'm1', title: 'Modules thuc hanh', value: '10+', subtitle: 'Tu auth den dashboard', delta: '+2 moi' },
  { key: 'm2', title: 'Trang va routes', value: '20+', subtitle: 'App Router day du', delta: '+4 nested' },
  { key: 'm3', title: 'Core features', value: '15+', subtitle: 'CRUD + guards + services', delta: '+3 recently' },
  { key: 'm4', title: 'Coverage', value: 'Full React + Next.js', subtitle: 'SSR, API, UI architecture', delta: 'Comprehensive' },
];

export default function HomeStatsSection() {
  return <KPIOverviewGrid title="Thong ke du an" items={stats} />;
}

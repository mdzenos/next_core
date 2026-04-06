import { Button } from '@/components/atoms';
import { KPIOverviewGrid, NotificationCenterPanel } from '@/components/organisms';
import { DashboardPageTemplate } from '@/components/templates';

const kpis = [
  { key: 'users', title: 'Users', value: '1,250', delta: '+8.4%', deltaTone: 'success' as const },
  { key: 'posts', title: 'Posts', value: '320', delta: '+3.1%', deltaTone: 'success' as const },
  {
    key: 'engagement',
    title: 'Engagement',
    value: '87%',
    delta: '-1.2%',
    deltaTone: 'danger' as const,
  },
  {
    key: 'reports',
    title: 'Pending reports',
    value: '12',
    delta: '+2',
    deltaTone: 'muted' as const,
  },
];

const notifications = [
  {
    id: 'n-1',
    actorName: 'System Bot',
    title: 'Co 3 bai viet can kiem duyet',
    description: 'Vui long xem hang doi moderation de xu ly.',
    timeLabel: '5 phut truoc',
    tone: 'warning' as const,
    unread: true,
  },
  {
    id: 'n-2',
    actorName: 'Analytics',
    title: 'Bao cao tuan da san sang',
    description: 'Ban co the xem xu huong tang truong tai dashboard.',
    timeLabel: '1 gio truoc',
    tone: 'success' as const,
  },
];

export default function DashboardPage() {
  return (
    <DashboardPageTemplate
      title="Dashboard Overview"
      description="Chao mung ban den voi he thong quan tri social dashboard."
      badge="Operations"
      actions={<Button size="sm">Create report</Button>}
      toolbar={{
        title: 'Quick actions',
        description: 'Theo doi va xu ly cac tac vu uu tien cao trong ngay.',
      }}
      sidebar={<NotificationCenterPanel items={notifications} />}
    >
      <KPIOverviewGrid items={kpis} title="Tong quan nhanh" />
    </DashboardPageTemplate>
  );
}

import FeatureCard from '@/components/molecules/FeatureCard';

const features = [
  {
    title: 'Authentication',
    description:
      'Học đăng nhập, đăng ký, bảo vệ route với middleware và session/token.',
  },
  {
    title: 'Dashboard',
    description:
      'Xây dựng hệ thống dashboard với header, sidebar, thống kê và quản trị nội dung.',
  },
  {
    title: 'Feed & Profile',
    description:
      'Thực hành dynamic routes, fetch dữ liệu, post feed, profile user và UI composition.',
  },
];

export default function HomeFeatureGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
}

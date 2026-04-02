const stats = [
  { label: 'Modules thực hành', value: '10+' },
  { label: 'Trang & routes', value: '20+' },
  { label: 'Core features', value: '15+' },
  { label: 'Mức độ bao phủ', value: 'Full React + Next.js' },
];

export default function HomeStatsSection() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl bg-gray-50 p-5 text-center">
            <p className="text-2xl font-bold text-primary">{item.value}</p>
            <p className="mt-2 text-sm text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

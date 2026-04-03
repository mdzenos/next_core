const roadmapItems = [
  'React fundamentals: props, state, hooks, composition',
  'Next.js App Router: layouts, nested routes, loading, error',
  'Authentication: login, register, middleware bảo vệ route',
  'Dashboard: sidebar, header, stats, feed, CRUD posts',
  'Data fetching: SSR, API routes, caching, streaming, ISR',
];

export default function HomeRoadmapSection() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-Zcolor13">Lộ trình học trong một dự án</h2>
        <p className="mt-3 text-gray-600">
          Xây dựng từng module theo đúng flow thực tế để vừa học React, vừa nắm Next.js hiện đại một
          cách có hệ thống.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {roadmapItems.map((item, index) => (
          <div key={item} className="flex items-start gap-4 rounded-2xl bg-Zcolor1 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-Zcolor13 text-sm font-bold text-white">
              {index + 1}
            </div>
            <p className="text-sm leading-6 text-gray-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

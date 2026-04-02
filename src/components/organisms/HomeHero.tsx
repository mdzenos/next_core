import Badge from '@/components/atoms/Badge';
import HeroActions from '@/components/molecules/HeroActions';

export default function HomeHero() {
  return (
    <section className="rounded-3xl bg-white p-10 shadow-sm">
      <div className="mx-auto max-w-3xl text-center">
        <Badge>Next.js 16 + React 19 + Tailwind CSS v4</Badge>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Social Dashboard / Mini Social Media Platform
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Một dự án thực hành giúp bạn học đầy đủ React và Next.js:
          App Router, layouts, authentication, middleware, SSR, API routes,
          caching, streaming và quản lý UI theo Atomic Design.
        </p>

        <HeroActions />
      </div>
    </section>
  );
}

import { Button } from '@/components/atoms';
import { HeroBanner } from '@/components/organisms';

export default function HomeHero() {
  return (
    <HeroBanner
      eyebrow="Next.js 16 + React 19 + Tailwind CSS v4"
      badge="Practice Project"
      title="Social Dashboard / Mini Social Media Platform"
      description="Mot du an thuc hanh giup ban hoc day du React va Next.js: App Router, layouts, authentication, middleware, SSR, API routes, caching, streaming va quan ly UI theo Atomic Design."
      actions={
        <>
          <Button href="/auth/register" size="lg">Bat dau ngay</Button>
          <Button href="/auth/login" variant="outline" size="lg">Dang nhap</Button>
        </>
      }
    />
  );
}

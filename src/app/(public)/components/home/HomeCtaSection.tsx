import { Button } from '@/components/atoms';
import { SectionPanel } from '@/components/organisms';

export default function HomeCtaSection() {
  return (
    <SectionPanel
      title="San sang bat dau du an?"
      description="Bat dau voi he thong social dashboard de hoc toan dien React, Next.js, App Router, API routes, middleware, caching va UI architecture."
      className="bg-linear-to-r from-Zcolor15 to-Zcolor12 text-white"
      contentClassName="pt-2"
    >
      <div className="flex flex-wrap justify-center gap-4">
        <Button href="/auth/register" variant="secondary" size="lg" className="bg-white! text-Zcolor13!">
          Tao tai khoan
        </Button>
        <Button href="/auth/login" variant="outline" size="lg" className="border-white! text-white! hover:bg-white! hover:text-Zcolor13!">
          Dang nhap
        </Button>
      </div>
    </SectionPanel>
  );
}

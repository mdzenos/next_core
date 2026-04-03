import Button from '@/components/atoms/Button';

export default function HomeCtaSection() {
  return (
    <section className="rounded-3xl bg-Zcolor13 px-8 py-12 text-center text-white shadow-sm">
      <h2 className="text-3xl font-bold">Sẵn sàng bắt đầu dự án?</h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/85">
        Bắt đầu với hệ thống social dashboard để học toàn diện React, Next.js, App Router, API
        routes, middleware, caching và UI architecture.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Button
          href="/auth/register"
          variant="secondary"
          size="lg"
          className="!bg-white !text-Zcolor13"
        >
          Tạo tài khoản
        </Button>

        <Button
          href="/auth/login"
          variant="outline"
          size="lg"
          className="!border-white !text-white hover:!bg-white hover:!text-Zcolor13"
        >
          Đăng nhập
        </Button>
      </div>
    </section>
  );
}

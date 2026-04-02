import Button from '@/components/atoms/Button';

export default function HeroActions() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button href="/auth/login" variant="primary" size="lg">
        Đăng nhập
      </Button>

      <Button href="/auth/register" variant="outline" size="lg">
        Đăng ký
      </Button>
    </div>
  );
}

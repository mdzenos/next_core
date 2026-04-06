// src/app/(public)/auth/register/page.tsx
import { buildMetadata } from '@/lib/metadata';
import AuthTemplate from '@/app/(public)/auth/components/AuthTemplate';
import RegisterForm from '@/app/(public)/auth/components/RegisterForm';
import PublicOnlyGuard from '@/app/(public)/auth/guards/PublicOnlyGuard';

export const metadata = buildMetadata({
  title: 'Đăng ký',
  description: 'Tạo tài khoản mới trong hệ thống NextJS Core',
});

export default function RegisterPage() {
  return (
    <PublicOnlyGuard>
      <AuthTemplate
        title="Tạo tài khoản mới"
        description="Đăng ký để bắt đầu sử dụng social dashboard và trải nghiệm đầy đủ các tính năng."
        footerText="Đã có tài khoản?"
        footerLinkHref="/auth/login"
        footerLinkLabel="Đăng nhập"
      >
        <RegisterForm />
      </AuthTemplate>
    </PublicOnlyGuard>
  );
}

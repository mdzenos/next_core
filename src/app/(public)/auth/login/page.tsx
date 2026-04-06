// src/app/(public)/auth/login/page.tsx
import { buildMetadata } from '@/lib/metadata';
import AuthTemplate from '@/app/(public)/auth/components/AuthTemplate';
import LoginForm from '@/app/(public)/auth/components/LoginForm';
import PublicOnlyGuard from '@/app/(public)/auth/guards/PublicOnlyGuard';

export const metadata = buildMetadata({
  title: 'Đăng nhập',
  description: 'Đăng nhập vào hệ thống NextJS Core',
});

export default function LoginPage() {
  return (
    <PublicOnlyGuard>
      <AuthTemplate
        title="Chào mừng quay trở lại"
        description="Đăng nhập để truy cập dashboard, quản lý bài viết và dữ liệu người dùng."
        footerText="Chưa có tài khoản?"
        footerLinkHref="/auth/register"
        footerLinkLabel="Đăng ký ngay"
      >
        <LoginForm />
      </AuthTemplate>
    </PublicOnlyGuard>
  );
}

// src/app/(public)/auth/login/page.tsx
import { buildMetadata } from '@/lib/metadata';
import AuthTemplate from '@/components/templates/AuthTemplate';
import LoginForm from '@/components/organisms/Auth/LoginForm';
import PublicOnlyGuard from '@/components/guards/PublicOnlyGuard';

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

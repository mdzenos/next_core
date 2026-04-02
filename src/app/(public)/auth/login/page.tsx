import type { Metadata } from 'next';
import AuthTemplate from '@/components/templates/AuthTemplate';
import LoginForm from '@/components/molecules/LoginForm';

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập vào hệ thống NextJS Core',
};

export default function LoginPage() {
  return (
    <AuthTemplate
      title="Chào mừng quay trở lại"
      description="Đăng nhập để truy cập dashboard, quản lý bài viết và dữ liệu người dùng."
      footerText="Chưa có tài khoản?"
      footerLinkHref="/auth/register"
      footerLinkLabel="Đăng ký ngay"
    >
      <LoginForm />
    </AuthTemplate>
  );
}

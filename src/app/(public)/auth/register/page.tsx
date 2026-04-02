import type { Metadata } from 'next';
import AuthTemplate from '@/components/templates/AuthTemplate';
import RegisterForm from '@/components/molecules/RegisterForm';

export const metadata: Metadata = {
  title: 'Đăng ký',
  description: 'Tạo tài khoản mới trong hệ thống NextJS Core',
};

export default function RegisterPage() {
  return (
    <AuthTemplate
      title="Tạo tài khoản mới"
      description="Đăng ký để bắt đầu sử dụng social dashboard và trải nghiệm đầy đủ các tính năng."
      footerText="Đã có tài khoản?"
      footerLinkHref="/auth/login"
      footerLinkLabel="Đăng nhập"
    >
      <RegisterForm />
    </AuthTemplate>
  );
}

// src/app/(public)/auth/components/RegisterForm.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Input } from '@/components/atoms';
import { AuthFormMessage, FormField } from '@/components/molecules';
import { registerAction } from '../action';
import { setAuth } from '../state';
import type { RegisterPayload } from '@/types/auth';
import { getApiErrorMessage } from '@/utils/getApiErrorMessage';

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterPayload>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setIsError(false);
    setIsSubmitting(true);

    try {
      const result = await registerAction(formData);

      if (!result.success) {
        setIsError(true);
        setMessage(result.error);
        return;
      }

      setAuth(result.data.accessToken, result.data.user);
      setMessage(`Xin chào ${result.data.user.fullName}, đăng ký thành công.`);
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      setIsError(true);
      setMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField>
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField>
        <Input
          id="password"
          name="password"
          type="password"
          label="Mật khẩu"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Xác nhận mật khẩu"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </FormField>

      <Button type="submit" className="w-full" disabled={isSubmitting} isLoading={isSubmitting}>
        {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
      </Button>

      <AuthFormMessage message={message} isError={isError} />
    </form>
  );
}

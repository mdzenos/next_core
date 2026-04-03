'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthMessage from '@/components/atoms/AuthMessage';
import { setAccessToken, setCurrentUser } from '@/lib/auth-store';
import { register, type RegisterPayload } from '@/services/authService';
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
      const response = await register(formData, {
        timeoutMs: 10000,
      });

      const authData = response.data;

      setAccessToken(authData.accessToken);
      setCurrentUser(authData.user);

      setMessage(`Xin chào ${authData.user.fullName}, đăng ký thành công.`);

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
      <div>
        <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-700">
          Họ và tên
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Nguyễn Văn A"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full rounded-xl border border-Zcolor3 px-4 py-3 outline-none transition focus:border-Zcolor13 focus:ring-2 focus:ring-Zcolor4"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-Zcolor3 px-4 py-3 outline-none transition focus:border-Zcolor13 focus:ring-2 focus:ring-Zcolor4"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
          Mật khẩu
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-xl border border-Zcolor3 px-4 py-3 outline-none transition focus:border-Zcolor13 focus:ring-2 focus:ring-Zcolor4"
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
          Xác nhận mật khẩu
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-xl border border-Zcolor3 px-4 py-3 outline-none transition focus:border-Zcolor13 focus:ring-2 focus:ring-Zcolor4"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-xl bg-Zcolor13 px-6 py-3 text-sm font-semibold text-white transition hover:bg-Zcolor14 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
      </button>

      <AuthMessage message={message} isError={isError} />
    </form>
  );
}

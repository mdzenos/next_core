'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthMessage from '@/components/atoms/AuthMessage';
import { setAccessToken, setCurrentUser } from '@/lib/auth-store';
import { login, type LoginPayload } from '@/services/authService';
import { getApiErrorMessage } from '@/utils/getApiErrorMessage';

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: '',
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
      const response = await login(formData, {
        timeoutMs: 10000,
      });

      const authData = response.data;

      setAccessToken(authData.accessToken);
      setCurrentUser(authData.user);

      setMessage(`Xin chào ${authData.user.fullName}, đăng nhập thành công.`);

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

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-xl bg-Zcolor13 px-6 py-3 text-sm font-semibold text-white transition hover:bg-Zcolor14 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
      </button>

      <AuthMessage message={message} isError={isError} />
    </form>
  );
}

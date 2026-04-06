'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Button, Divider, Heading, Input, Text } from '@/components/atoms';
import { AuthFormMessage, FormField } from '@/components/molecules';
import { checkSessionAction } from '@/app/(public)/auth/action';
import { getAccessToken, getCurrentUser, setAuth } from '@/app/(public)/auth/state';
import { updateProfileAction } from '../action';
import type { UpdateProfilePayload } from '@/types/auth';
import { getApiErrorMessage } from '@/utils/getApiErrorMessage';

const initialFormData: UpdateProfilePayload = {
  fullName: '',
  email: '',
};

export default function ProfileUpdateCard() {
  const router = useRouter();

  const [formData, setFormData] = useState<UpdateProfilePayload>(initialFormData);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const cachedUser = getCurrentUser();

        if (cachedUser) {
          if (!active) return;
          setFormData({
            fullName: cachedUser.fullName,
            email: cachedUser.email,
          });
          return;
        }

        const result = await checkSessionAction();

        if (!active) {
          return;
        }

        if (!result.success) {
          setIsError(true);
          setMessage('Khong tai duoc thong tin nguoi dung.');
          return;
        }

        setAuth(result.data.accessToken, result.data.user);

        setFormData({
          fullName: result.data.user.fullName,
          email: result.data.user.email,
        });
      } catch (error) {
        if (!active) {
          return;
        }

        setIsError(true);
        setMessage(getApiErrorMessage(error, 'Khong the tai thong tin nguoi dung.'));
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

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
      const result = await updateProfileAction(formData);

      if (!result.success) {
        setIsError(true);
        setMessage(result.error);
        return;
      }

      setFormData({
        fullName: result.data.user.fullName,
        email: result.data.user.email,
      });
      const token = getAccessToken();
      if (token) {
        setAuth(token, result.data.user);
      }
      setMessage('Cap nhat thong tin thanh cong.');
      router.refresh();
    } catch (error) {
      setIsError(true);
      setMessage(getApiErrorMessage(error, 'Khong the cap nhat thong tin nguoi dung.'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="surface-panel space-y-5 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={formData.fullName || 'User'} className="h-14 w-14 text-base" />
          <div className="space-y-1">
            <Heading as="h3" size="md">
              Cap nhat thong tin ca nhan
            </Heading>
            <Text tone="muted" size="sm">
              Du lieu se duoc dong bo vao user menu va cac khu vuc dang su dung current user.
            </Text>
          </div>
        </div>

        <Button href="/dashboard" variant="outline" size="sm">
          Quay ve dashboard
        </Button>
      </div>

      <Divider />

      {isLoading ? (
        <Text tone="muted">Dang tai thong tin nguoi dung...</Text>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField>
              <Input
                id="fullName"
                name="fullName"
                label="Ho va ten"
                placeholder="Nhap ho va ten"
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
          </div>

          <div className="rounded-2xl border border-Zcolor3 bg-Zcolor1/70 p-4">
            <Text size="sm" tone="muted">
              Goi y: neu sau nay backend that co them so dien thoai, avatar, dia chi hoac phong ban,
              ban chi can mo rong `UpdateProfilePayload`, route `PATCH /auth/me` va them field vao
              form nay.
            </Text>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <AuthFormMessage message={message} isError={isError} />

            <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
              {isSubmitting ? 'Dang luu...' : 'Luu thay doi'}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}

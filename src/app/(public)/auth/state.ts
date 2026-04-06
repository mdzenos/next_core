'use client';

/**
 * Auth client state — thay thế lib/auth-store.ts.
 * Lưu accessToken + currentUser trong memory phía client.
 * Cross-feature: được import bởi DashboardHeader, PublicTemplate, guards.
 */

import type { SafeUser } from '@/types/auth';

type AuthListener = () => void;

let accessToken: string | null = null;
let currentUser: SafeUser | null = null;
const listeners = new Set<AuthListener>();

function emit() {
  listeners.forEach((fn) => fn());
}

export function getAccessToken(): string | null {
  return accessToken;
}

export function getCurrentUser(): SafeUser | null {
  return currentUser;
}

export function subscribeCurrentUser(listener: AuthListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setAuth(token: string, user: SafeUser): void {
  accessToken = token;
  currentUser = user;
  emit();
}

export function clearAuth(): void {
  accessToken = null;
  currentUser = null;
  emit();
}

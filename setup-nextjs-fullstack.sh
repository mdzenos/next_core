#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"

if [[ ! -f "$ROOT/package.json" || ! -f "$ROOT/next.config.ts" ]]; then
  echo "Hãy chạy script tại thư mục gốc của dự án Next.js."
  exit 1
fi

echo "==> Tạo cấu trúc Next.js full-stack..."

# Migrate root app/ -> src/app/ without touching its contents.
if [[ -d "$ROOT/app" && ! -d "$ROOT/src/app" ]]; then
  mkdir -p "$ROOT/src"
  mv "$ROOT/app" "$ROOT/src/app"
elif [[ -d "$ROOT/app" && -d "$ROOT/src/app" ]]; then
  echo "Cả app/ và src/app/ đều tồn tại; bỏ qua migration."
fi

mkdir -p \
  src/app/'(public)'/auth/login \
  src/app/'(public)'/auth/register \
  src/app/'(public)'/auth/components \
  src/app/'(public)'/components/home \
  src/app/'(protected)'/dashboard/components \
  src/app/'(protected)'/profile/components \
  src/app/api/auth/login \
  src/app/api/auth/logout \
  src/app/api/auth/me \
  src/app/api/auth/refresh \
  src/app/api/users/'[id]' \
  src/app/api/posts/'[id]' \
  src/app/api/posts \
  src/components/atoms \
  src/components/molecules \
  src/components/organisms \
  src/components/templates \
  src/features/auth/components \
  src/features/users/components \
  src/features/posts/components \
  src/server/auth \
  src/server/users \
  src/server/posts \
  src/server/db \
  src/server/shared \
  src/lib/http \
  src/lib/auth \
  src/lib/validation \
  src/services/external \
  src/hooks \
  src/types \
  src/utils \
  prisma/migrations \
  public/images \
  public/icons

write_if_missing() {
  local file="$1"
  shift
  if [[ ! -e "$ROOT/$file" ]]; then
    mkdir -p "$(dirname "$ROOT/$file")"
    cat > "$ROOT/$file" <<'EOF'
$*
EOF
  fi
}

# Shared types
if [[ ! -f src/types/api.ts ]]; then cat > src/types/api.ts <<'EOF'
export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
EOF
fi

if [[ ! -f src/types/auth.ts ]]; then cat > src/types/auth.ts <<'EOF'
export type SessionUser = {
  id: string;
  email: string;
  name: string;
};

export type LoginInput = {
  login: string;
  password: string;
};
EOF
fi

# HTTP helpers
if [[ ! -f src/lib/http/response.ts ]]; then cat > src/lib/http/response.ts <<'EOF'
import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";

export function apiOk<T>(data: T, status = 200) {
  return NextResponse.json<ApiResponse<T>>({ success: true, data }, { status });
}

export function apiError(code: string, message: string, status = 400, details?: unknown) {
  return NextResponse.json<ApiResponse<never>>(
    { success: false, error: { code, message, details } },
    { status },
  );
}
EOF
fi

if [[ ! -f src/lib/http/client.ts ]]; then cat > src/lib/http/client.ts <<'EOF'
import type { ApiResponse } from "@/types/api";

export async function apiFetch<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  const body = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !body.success) {
    throw new Error(body.success ? "Request failed" : body.error.message);
  }

  return body.data;
}
EOF
fi

# Prisma
if [[ ! -f prisma/schema.prisma ]]; then cat > prisma/schema.prisma <<'EOF'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts Post[]
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@index([authorId])
}
EOF
fi

if [[ ! -f src/server/db/client.ts ]]; then cat > src/server/db/client.ts <<'EOF'
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
EOF
fi

# Server repositories
if [[ ! -f src/server/users/repository.ts ]]; then cat > src/server/users/repository.ts <<'EOF'
import { db } from "@/server/db/client";

export function findUserByEmail(email: string) {
  return db.user.findUnique({ where: { email } });
}

export function findUserById(id: string) {
  return db.user.findUnique({ where: { id } });
}

export function createUser(data: { email: string; name: string; password: string }) {
  return db.user.create({ data });
}

export function listUsers() {
  return db.user.findMany({
    select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
    orderBy: { createdAt: "desc" },
  });
}
EOF
fi

if [[ ! -f src/server/posts/repository.ts ]]; then cat > src/server/posts/repository.ts <<'EOF'
import { db } from "@/server/db/client";

export function listPosts() {
  return db.post.findMany({
    include: { author: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export function findPostById(id: string) {
  return db.post.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true } } },
  });
}

export function createPost(data: { title: string; content?: string; authorId: string }) {
  return db.post.create({ data });
}
EOF
fi

# Server services
if [[ ! -f src/server/users/service.ts ]]; then cat > src/server/users/service.ts <<'EOF'
import { createUser, findUserById, listUsers } from "@/server/users/repository";

export function getUsers() {
  return listUsers();
}

export function getUser(id: string) {
  return findUserById(id);
}

export function registerUser(data: { email: string; name: string; password: string }) {
  return createUser(data);
}
EOF
fi

if [[ ! -f src/server/posts/service.ts ]]; then cat > src/server/posts/service.ts <<'EOF'
import { createPost, findPostById, listPosts } from "@/server/posts/repository";

export function getPosts() {
  return listPosts();
}

export function getPost(id: string) {
  return findPostById(id);
}

export function addPost(data: { title: string; content?: string; authorId: string }) {
  return createPost(data);
}
EOF
fi

# Auth/session foundation
if [[ ! -f src/server/auth/session.ts ]]; then cat > src/server/auth/session.ts <<'EOF'
import { cookies } from "next/headers";

const SESSION_COOKIE = "session";

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export async function setSessionToken(token: string) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function clearSessionToken() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
EOF
fi

if [[ ! -f src/server/auth/guard.ts ]]; then cat > src/server/auth/guard.ts <<'EOF'
import { redirect } from "next/navigation";
import { getSessionToken } from "@/server/auth/session";

export async function requireAuth() {
  const token = await getSessionToken();

  if (!token) {
    redirect("/auth/login");
  }

  return token;
}
EOF
fi

if [[ ! -f src/server/auth/service.ts ]]; then cat > src/server/auth/service.ts <<'EOF'
import { findUserByEmail } from "@/server/users/repository";

export async function authenticate(login: string, password: string) {
  const user = await findUserByEmail(login);

  if (!user) {
    return null;
  }

  // TODO: thay bằng password hashing thực tế (bcrypt/argon2) trước khi production.
  if (user.password !== password) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}
EOF
fi

# API routes
if [[ ! -f src/app/api/users/route.ts ]]; then cat > src/app/api/users/route.ts <<'EOF'
import { apiError, apiOk } from "@/lib/http/response";
import { getUsers } from "@/server/users/service";

export async function GET() {
  try {
    return apiOk(await getUsers());
  } catch {
    return apiError("INTERNAL_ERROR", "Không thể lấy danh sách người dùng.", 500);
  }
}
EOF
fi

if [[ ! -f src/app/api/users/'[id]'/route.ts ]]; then cat > src/app/api/users/'[id]'/route.ts <<'EOF'
import { apiError, apiOk } from "@/lib/http/response";
import { getUser } from "@/server/users/service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    return apiError("USER_NOT_FOUND", "Không tìm thấy người dùng.", 404);
  }

  return apiOk(user);
}
EOF
fi

if [[ ! -f src/app/api/posts/route.ts ]]; then cat > src/app/api/posts/route.ts <<'EOF'
import { apiError, apiOk } from "@/lib/http/response";
import { getPosts } from "@/server/posts/service";

export async function GET() {
  try {
    return apiOk(await getPosts());
  } catch {
    return apiError("INTERNAL_ERROR", "Không thể lấy danh sách bài viết.", 500);
  }
}
EOF
fi

if [[ ! -f src/app/api/posts/'[id]'/route.ts ]]; then cat > src/app/api/posts/'[id]'/route.ts <<'EOF'
import { apiError, apiOk } from "@/lib/http/response";
import { getPost } from "@/server/posts/service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return apiError("POST_NOT_FOUND", "Không tìm thấy bài viết.", 404);
  }

  return apiOk(post);
}
EOF
fi

if [[ ! -f src/app/api/auth/me/route.ts ]]; then cat > src/app/api/auth/me/route.ts <<'EOF'
import { apiError, apiOk } from "@/lib/http/response";
import { getSessionToken } from "@/server/auth/session";

export async function GET() {
  const token = await getSessionToken();

  if (!token) {
    return apiError("UNAUTHENTICATED", "Chưa đăng nhập.", 401);
  }

  // TODO: verify session/token và lấy user thật từ DB.
  return apiOk({ token });
}
EOF
fi

if [[ ! -f src/app/api/auth/logout/route.ts ]]; then cat > src/app/api/auth/logout/route.ts <<'EOF'
import { apiOk } from "@/lib/http/response";
import { clearSessionToken } from "@/server/auth/session";

export async function POST() {
  await clearSessionToken();
  return apiOk({ loggedOut: true });
}
EOF
fi

if [[ ! -f src/app/api/auth/login/route.ts ]]; then cat > src/app/api/auth/login/route.ts <<'EOF'
import { apiError, apiOk } from "@/lib/http/response";
import { authenticate } from "@/server/auth/service";
import { setSessionToken } from "@/server/auth/session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.login || !body?.password) {
    return apiError("VALIDATION_ERROR", "login và password là bắt buộc.", 422);
  }

  const user = await authenticate(body.login, body.password);

  if (!user) {
    return apiError("INVALID_CREDENTIALS", "Thông tin đăng nhập không hợp lệ.", 401);
  }

  // TODO: thay bằng session/JWT thật.
  await setSessionToken(user.id);

  return apiOk(user);
}
EOF
fi

if [[ ! -f src/app/api/auth/refresh/route.ts ]]; then cat > src/app/api/auth/refresh/route.ts <<'EOF'
import { apiError } from "@/lib/http/response";

export async function POST() {
  return apiError("NOT_IMPLEMENTED", "Refresh session chưa được triển khai.", 501);
}
EOF
fi

# Public auth pages
if [[ ! -f src/app/'(public)'/auth/login/page.tsx ]]; then cat > src/app/'(public)'/auth/login/page.tsx <<'EOF'
import Link from "next/link";

export default function LoginPage() {
  return (
    <main>
      <h1>Đăng nhập</h1>
      <p>Trang đăng nhập sẽ dùng Server Action/API thật.</p>
      <Link href="/auth/register">Tạo tài khoản</Link>
    </main>
  );
}
EOF
fi

if [[ ! -f src/app/'(public)'/auth/register/page.tsx ]]; then cat > src/app/'(public)'/auth/register/page.tsx <<'EOF'
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main>
      <h1>Đăng ký</h1>
      <p>Trang đăng ký sẽ kết nối tới User Service.</p>
      <Link href="/auth/login">Đăng nhập</Link>
    </main>
  );
}
EOF
fi

if [[ ! -f src/app/'(public)'/auth/page.tsx ]]; then cat > src/app/'(public)'/auth/page.tsx <<'EOF'
import { redirect } from "next/navigation";

export default function AuthPage() {
  redirect("/auth/login");
}
EOF
fi

if [[ ! -f src/app/'(public)'/auth/actions.ts ]]; then cat > src/app/'(public)'/auth/actions.ts <<'EOF'
"use server";

import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const login = String(formData.get("login") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!login || !password) {
    return { success: false, message: "Vui lòng nhập đầy đủ thông tin." };
  }

  // TODO: gọi trực tiếp Auth Service hoặc xây session flow hoàn chỉnh.
  redirect("/dashboard");
}
EOF
fi

# Protected pages
if [[ ! -f src/app/'(protected)'/layout.tsx ]]; then cat > src/app/'(protected)'/layout.tsx <<'EOF'
import { requireAuth } from "@/server/auth/guard";

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAuth();

  return children;
}
EOF
fi

if [[ ! -f src/app/'(protected)'/dashboard/layout.tsx ]]; then cat > src/app/'(protected)'/dashboard/layout.tsx <<'EOF'
export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <header>Dashboard Header</header>
      <main>{children}</main>
    </div>
  );
}
EOF
fi

if [[ ! -f src/app/'(protected)'/dashboard/page.tsx ]]; then cat > src/app/'(protected)'/dashboard/page.tsx <<'EOF'
export default function DashboardPage() {
  return <h1>Dashboard</h1>;
}
EOF
fi

if [[ ! -f src/app/'(protected)'/profile/page.tsx ]]; then cat > src/app/'(protected)'/profile/page.tsx <<'EOF'
export default function ProfilePage() {
  return <h1>Profile</h1>;
}
EOF
fi

# Shared components
if [[ ! -f src/components/atoms/Button.tsx ]]; then cat > src/components/atoms/Button.tsx <<'EOF'
import type { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} />;
}
EOF
fi

if [[ ! -f src/components/atoms/Input.tsx ]]; then cat > src/components/atoms/Input.tsx <<'EOF'
import type { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}
EOF
fi

if [[ ! -f src/components/molecules/FormField.tsx ]]; then cat > src/components/molecules/FormField.tsx <<'EOF'
import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  children: ReactNode;
  error?: string;
};

export function FormField({ label, children, error }: FormFieldProps) {
  return (
    <div>
      <label>{label}</label>
      {children}
      {error ? <p role="alert">{error}</p> : null}
    </div>
  );
}
EOF
fi

# Feature placeholders
for file in \
  src/features/auth/schemas.ts \
  src/features/auth/types.ts \
  src/features/auth/constants.ts \
  src/features/users/schemas.ts \
  src/features/users/types.ts \
  src/features/users/constants.ts \
  src/features/posts/schemas.ts \
  src/features/posts/types.ts \
  src/features/posts/constants.ts \
  src/utils/index.ts \
  src/hooks/index.ts \
  src/services/external/email.service.ts \
  src/services/external/storage.service.ts \
  src/server/shared/errors.ts \
  src/server/shared/logger.ts \
  src/server/shared/permissions.ts
do
  if [[ ! -f "$file" ]]; then
    mkdir -p "$(dirname "$file")"
    echo 'export {};' > "$file"
  fi
done

# Environment example
if [[ ! -f .env.example ]]; then cat > .env.example <<'EOF'
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nextjs_core?schema=public"
EOF
fi

# TypeScript aliases: create-next-app normally already has @/*
node - <<'NODE'
const fs = require("fs");
const path = "tsconfig.json";
const data = JSON.parse(fs.readFileSync(path, "utf8"));
data.compilerOptions ??= {};
data.compilerOptions.baseUrl ??= ".";
data.compilerOptions.paths ??= {};
data.compilerOptions.paths["@/*"] ??= ["./src/*"];
fs.writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
NODE

echo
echo "==> Cài dependencies cho PostgreSQL + Prisma..."
npm install @prisma/client zod
npm install -D prisma

echo
echo "==> Generate Prisma Client..."
npx prisma generate

echo
echo "==> Hoàn tất."
echo
echo "Kiểm tra:"
echo "  tree -I 'node_modules'"
echo "  npm run lint"
echo "  npm run dev"
echo
echo "Sau khi có PostgreSQL:"
echo "  cp .env.example .env"
echo "  npx prisma migrate dev --name init"

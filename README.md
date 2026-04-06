# 📘 Next.js Core – Production Architecture Guide

---

## I. Mục tiêu kiến trúc

* Feature-first + App Router + UI atoms design
* Tách rõ **UI – logic – data flow**
* Kiểm soát **server/client boundary**
* Cho phép **scale mà không vỡ cấu trúc**
* Tối ưu cho **AI-assisted development (Copilot, Claude)**

---

## II. Cấu trúc thư mục
```
nextjs-core/
├── public/                                 # Static assets (svg, icon, favicon...), truy cập trực tiếp qua /file.svg
├── src/
│  ├── app/                                 # App Router (feature-first)
│  │  ├── layout.tsx                        # Root layout, import globals.css, providers, metadata
│  │  ├── loading.tsx                       # Loading UI global
│  │  ├── error.tsx                         # Global error boundary
│  │  ├── not-found.tsx                     # 404 page
│  │  ├── (public)/                         # Route group public (không cần auth)
│  │  │  ├── layout.tsx                     # Layout public
│  │  │  ├── page.tsx                       # Landing page (/)
│  │  │  ├── components/                    # UI chỉ phục vụ public
│  │  │  │  └── home/                       # Landing page sections
│  │  │  └── auth/                          # Feature auth (public scope)
│  │  │     ├── page.tsx                    # /auth
│  │  │     ├── login/page.tsx              # /auth/login
│  │  │     ├── register/page.tsx           # /auth/register
│  │  │     ├── components/                 # UI auth (AuthTemplate, forms...)
│  │  │     ├── guards/                     # Guard logic (Protected/PublicOnly)
│  │  │     ├── action.ts                   # Server Actions (login/register)
│  │  │     ├── service.ts                  # Call API (BFF/mock/backend)
│  │  │     └── state.ts                    # Client state (session)
│  │  ├── (protected)/                      # Route group cần auth
│  │  │  ├── layout.tsx                     # Layout protected (guard wrapper)
│  │  │  ├── dashboard/
│  │  │  │  ├── layout.tsx                  # Dashboard layout (sidebar/header)
│  │  │  │  ├── page.tsx                    # /dashboard
│  │  │  │  └── components/                 # Dashboard-specific UI
│  │  │  └── profile/                       # Feature profile
│  │  │     ├── page.tsx
│  │  │     ├── action.ts
│  │  │     ├── service.ts
│  │  │     └── components/
│  │  └── (mock)/                           # Mock backend (BFF giả lập)
│  │     ├── api/                           # Route handlers (Next.js API)
│  │     │  ├── auth/                       # login, logout, refresh, me...
│  │     │  └── posts/
│  │     └── be/                            # Mock business layer
│  │        ├── auth/service.ts
│  │        ├── posts/service.ts
│  │        ├── db/*.json                   # Fake database
│  │        └── shared/                     # Error, helper nội bộ
│  ├── components/                          ✅ Shared UI (Atomic Design)
│  │  ├── atoms/                            ✅ Primitive UI (Button, Input, Text...)
│  │  ├── molecules/                        ✅ Combo atoms (FormField, Card...)
│  │  ├── organisms/                        ✅ UI lớn (DataTable, Header...)
│  │  └── templates/                        ✅ Page-level layout patterns
│  ├── lib/                                 # Core utilities (framework-level)
│  │  ├── http/                             # API client + response wrapper
│  │  ├── guards/                           # Guard helpers
│  │  └── metadata.ts
│  ├── services/                            # Global services
│  ├── types/                               # Global types
│  ├── utils/                               # Global utils
│  ├── hooks/                               # Global hooks
│  └── styles/
│     └── globals.css                       ✅ Design tokens + global styles
├── AGENTS.md                               ✅ Tài liệu hướng dẫn agent/workflow nếu bạn dùng AI agents
├── CLAUDE.md                               ✅ Tài liệu ghi chú cho Claude/AI workflow nếu có
├── docker-compose.yml                      ✅ Multi-service setup
├── Dockerfile                              ✅ Build production image
├── Dockerfile.dev                          ✅ Dev container
├── next-env.d.ts                           ✅ Type definitions tự sinh của Next.js
├── next.config.ts                          ✅ Cấu hình Next.js
├── postcss.config.mjs                      ✅ Cấu hình PostCSS, dùng với Tailwind v4
├── eslint.config.mjs                       ✅ ESLint config
├── package-lock.json                       ✅ Lock version packages
├── package.json                            ✅ Scripts + dependencies
├── tsconfig.json                           ✅ TypeScript config
└── README.md                               ✅ Tài liệu mô tả dự án, setup, roadmap
```
---

## III. Data Flow (luồng dữ liệu chuẩn) ⭐ BẮT BUỘC

```txt
UI (page.tsx / component)
  ↓
action.ts (Server Action)
  ↓
service.ts (API layer)
  ↓
HTTP client (src/lib/http)
  ↓
(mock)/api (route handler) OR real backend
  ↓
(mock)/be (business logic)
  ↓
db.json / database
```

### Quy tắc:

* UI ❌ không gọi API trực tiếp
* UI ✅ chỉ gọi:

  * `action.ts` (preferred)
  * hoặc `service.ts` (nếu client-safe)
* `service.ts`:

  * không chứa UI logic
  * chỉ xử lý request/response

---

## IV. Server vs Client Boundary ⭐

### 1. Server-only

Áp dụng cho:

* `service.ts` (nếu dùng secret / internal API)
* `(mock)/be/*`
* DB access

```ts
import 'server-only';
```

⛔ Không được import vào client component

---

### 2. Client-only

Áp dụng cho:

* `state.ts`
* hooks có dùng:

  * `useState`
  * `useEffect`

```ts
'use client';
```

---

### 3. Nguyên tắc

| Loại         | Vị trí             | Runtime           |
| ------------ | ------------------ | ----------------- |
| page.tsx     | app                | Server (default)  |
| component UI | feature/components | Client/Server tùy |
| action.ts    | feature            | Server            |
| service.ts   | feature            | Server (default)  |

---

## V. Quy tắc tổ chức `hooks`, `utils`, `types`, `services`, `components`

### 1. 3 cấp độ reuse

#### 🔹 Feature-specific

```txt
(auth)/login/
(auth)/register/
```

→ chỉ dùng nội bộ

---

#### 🔹 Semi-global (route group) ⭐

```txt
(app)/(public)/auth/
  hooks/
  utils/
  types/
  services/
  components/
```

→ dùng chung login + register

---

#### 🔹 Global

```txt
src/hooks/
src/utils/
src/types/
src/services/
src/components/
```

→ dùng toàn app

---

### 2. Nguyên tắc

* Ưu tiên **scope nhỏ nhất**
* Không tạo folder nếu chưa cần
* Refactor khi có reuse thật

---

## VI. Naming Convention

### 1. File đơn

```txt
hook.ts
util.ts
type.ts
service.ts
```

### 2. Khi logic lớn

```txt
services/
  authService.ts
  sessionService.ts
```

### 3. Quy tắc

* Không dùng:

  * `service2.ts`
  * `finalService.ts`
* Tên phải theo domain:

  * `authService.ts` ✅
  * `handleStuff.ts` ❌

---

## VII. Component Architecture (Atomic Design)

```txt
atoms → molecules → organisms → templates
```

### Quy tắc import:

* atoms ❌ import lên trên
* molecules ❌ import organisms
* organisms ❌ import templates

### Nguyên tắc:

* atoms = UI thuần
* molecules = kết hợp nhỏ
* organisms = UI lớn có logic nhẹ
* templates = layout pattern

---

## VIII. State Management

### Phân loại:

| Loại state   | Cách dùng           |
| ------------ | ------------------- |
| Form state   | local (useState)    |
| UI state     | local               |
| Auth/session | global (`state.ts`) |

### Nguyên tắc:

* Không đẩy state lên global nếu không cần
* Tránh coupling giữa các feature

---

## IX. Error Handling

### Format chuẩn:

```ts
{
  code: string;
  message: string;
}
```

### Nguyên tắc:

* Backend (mock/real) trả format thống nhất
* Frontend map error tại `service.ts` hoặc `action.ts`
* Không xử lý error trực tiếp trong UI

---

## X. HTTP Layer

```txt
src/lib/http/
```

Chịu trách nhiệm:

* request wrapper
* response normalization
* attach headers (auth, requestId)

---

## XI. Mock vs Real Backend

### Nguyên tắc:

* UI không biết backend là mock hay thật
* `service.ts` luôn gọi qua HTTP layer

```txt
service.ts → http client → baseURL
```

### Khi chuyển production:

* chỉ đổi baseURL
* không đổi logic UI

---

## XII. Coding Principles

* Không early return (tránh flow khó đọc)
* Ưu tiên pure function
* Không mutate data
* Tách rõ:

  * UI
  * business logic
  * data layer

---

## XIII. Anti-patterns ⛔

Không được:

* Gọi API trực tiếp trong client component
* Import `(mock)/be` vào UI
* Đặt business logic trong component
* Tạo global khi chưa cần
* Duplicate logic giữa feature

---

## XIV. Refactor Strategy

Khi thấy:

* code duplicate
* logic dùng lại ≥ 2 nơi

→ di chuyển:

```txt
feature → group → global
```

Không làm ngược lại.

---

## XV. Nguyên tắc cốt lõi

* Co-location trước, abstraction sau
* Scale theo nhu cầu, không đoán trước
* Kiến trúc phải **ép được người code đi đúng hướng**

---


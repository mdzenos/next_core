## Project Structure

```text
nextjs_16/
├── public/                                 # Static assets
│   ├── images/                             # Images
│   ├── icons/                              # Icons
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   ├── window.svg
│   └── favicon.ico
├── src/
│   ├── app/                                # Next.js App Router
│   │   ├── layout.tsx                      # Root layout
│   │   ├── globals.css                    # Global styles
│   │   ├── page.tsx                        # Home page (/)
│   │   ├── favicon.ico                     # App favicon
│   │   ├── (public)/                       # Public routes
│   │   │   ├── auth/
│   │   │   │   ├── page.tsx                # /auth
│   │   │   │   ├── actions.ts              # Auth Server Actions
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx            # /auth/login
│   │   │   │   ├── register/
│   │   │   │   │   └── page.tsx            # /auth/register
│   │   │   │   └── components/             # Auth-specific UI
│   │   │   └── components/
│   │   │       └── home/                    # Home-specific UI
│   │   ├── (protected)/                    # Protected routes
│   │   │   ├── layout.tsx                  # Authentication guard
│   │   │   ├── dashboard/
│   │   │   │   ├── layout.tsx              # Dashboard layout
│   │   │   │   ├── page.tsx                # /dashboard
│   │   │   │   └── components/             # Dashboard-specific UI
│   │   │   └── profile/
│   │   │       ├── page.tsx                # /profile
│   │   │       └── components/             # Profile-specific UI
│   │   └── api/                            # Backend HTTP API
│   │       ├── auth/
│   │       │   ├── login/
│   │       │   │   └── route.ts             # POST /api/auth/login
│   │       │   ├── logout/
│   │       │   │   └── route.ts             # POST /api/auth/logout
│   │       │   ├── me/
│   │       │   │   └── route.ts             # GET /api/auth/me
│   │       │   └── refresh/
│   │       │       └── route.ts              # POST /api/auth/refresh
│   │       ├── users/
│   │       │   ├── route.ts                 # GET /api/users
│   │       │   └── [id]/
│   │       │       └── route.ts              # GET /api/users/:id
│   │       └── posts/
│   │           ├── route.ts                 # GET /api/posts
│   │           └── [id]/
│   │               └── route.ts              # GET /api/posts/:id
│   ├── components/                          # Shared React UI
│   │   ├── atoms/                           # Primitive UI components
│   │   │   ├── Button.tsx
│   │   │   └── Input.tsx
│   │   ├── molecules/                       # Components composed from atoms
│   │   │   └── FormField.tsx
│   │   ├── organisms/                       # Complex shared UI
│   │   └── templates/                       # Page-level UI patterns
│   ├── features/                            # Domain-specific frontend code
│   │   ├── auth/
│   │   │   ├── components/                  # Auth UI
│   │   │   ├── schemas.ts                   # Validation schemas
│   │   │   ├── types.ts                     # Auth types
│   │   │   └── constants.ts                 # Auth constants
│   │   ├── users/
│   │   │   ├── components/                  # User UI
│   │   │   ├── schemas.ts                   # Validation schemas
│   │   │   ├── types.ts                     # User types
│   │   │   └── constants.ts                 # User constants
│   │   └── posts/
│   │       ├── components/                  # Post UI
│   │       ├── schemas.ts                   # Validation schemas
│   │       ├── types.ts                     # Post types
│   │       └── constants.ts                 # Post constants
│   ├── generated/                           # Generated source code
│   │   └── prisma/                          # Generated Prisma Client
│   │       ├── client.ts
│   │       ├── browser.ts
│   │       ├── models.ts
│   │       ├── models/
│   │       └── internal/
│   ├── server/                              # Server-only backend code
│   │   ├── auth/
│   │   │   ├── service.ts                   # Authentication business logic
│   │   │   ├── session.ts                   # Session management
│   │   │   └── guard.ts                     # Authentication guard
│   │   ├── users/
│   │   │   ├── service.ts                   # User business logic
│   │   │   └── repository.ts                # User database access
│   │   ├── posts/
│   │   │   ├── service.ts                   # Post business logic
│   │   │   └── repository.ts                # Post database access
│   │   ├── db/
│   │   │   └── client.ts                    # Prisma Client singleton
│   │   └── shared/
│   │       ├── errors.ts                    # Server error definitions
│   │       ├── logger.ts                    # Server logging
│   │       └── permissions.ts              # Authorization helpers
│   ├── lib/                                 # Core application utilities
│   │   ├── auth/                            # Shared auth utilities
│   │   ├── http/
│   │   │   ├── client.ts                    # HTTP client
│   │   │   └── response.ts                  # API response helpers
│   │   └── validation/                       # Shared validation utilities
│   ├── services/                            # External service integrations
│   │   └── external/
│   │       ├── email.service.ts              # Email provider integration
│   │       └── storage.service.ts            # File/object storage integration
│   ├── hooks/                               # Shared React hooks
│   │   └── index.ts
│   ├── types/                               # Global TypeScript types
│   │   ├── api.ts
│   │   └── auth.ts
│   └── utils/                               # Generic utility functions
│       └── index.ts
├── prisma/                                  # Database layer
│   ├── schema.prisma                        # Prisma database schema
│   └── migrations/                          # Database migrations
│       ├── migration_lock.toml
│       └── <migration>/migration.sql
├── prisma.config.ts                         # Prisma 7 configuration
├── setup-nextjs-fullstack.sh                # Project setup script
├── AGENTS.md                                # AI Agent instructions
├── CLAUDE.md                                # Claude/AI workflow instructions
├── eslint.config.mjs                        # ESLint configuration
├── next.config.ts                           # Next.js configuration
├── next-env.d.ts                            # Next.js generated TypeScript definitions
├── postcss.config.mjs                       # PostCSS configuration
├── tsconfig.json                            # TypeScript configuration
├── package.json                             # Dependencies and scripts
├── package-lock.json                        # Dependency lock file
└── README.md                                # Project documentation
```

## Architecture

The project follows a full-stack architecture based on the Next.js App Router.

```text
                    NEXT.JS APPLICATION
                           │
             ┌─────────────┴─────────────┐
             │                           │
          FRONTEND                    BACKEND
             │                           │
     ┌───────┴────────┐        ┌─────────┴─────────┐
     │                │        │                   │
   app/          components/  API Routes       server/
     │                │        │                   │
     └────────┬───────┘        └─────────┬─────────┘
              │                          │
              │                     services
              │                          │
              │                     repository
              │                          │
              │                        Prisma
              │                          │
              └──────────────┬───────────┘
                             │
                         PostgreSQL
```

## Layer Responsibilities

| Layer | Location | Responsibility |
|---|---|---|
| Routing | `src/app` | Pages, layouts, route groups, API endpoints |
| UI | `src/components` | Shared React components |
| Feature | `src/features` | Domain-specific frontend code |
| Server | `src/server` | Backend business logic |
| Service | `src/server/*/service.ts` | Business rules and application logic |
| Repository | `src/server/*/repository.ts` | Database queries |
| Database | `prisma` | Schema and migrations |
| Generated | `src/generated/prisma` | Generated Prisma Client |
| Core | `src/lib` | Shared application/framework utilities |
| External Services | `src/services` | Third-party integrations |
| Hooks | `src/hooks` | Shared React hooks |
| Types | `src/types` | Shared TypeScript types |
| Utils | `src/utils` | Generic helper functions |

## Request Flow

### API Route

```text
Client
  │
  ▼
GET /api/users
  │
  ▼
src/app/api/users/route.ts
  │
  ▼
src/server/users/service.ts
  │
  ▼
src/server/users/repository.ts
  │
  ▼
Prisma
  │
  ▼
PostgreSQL
```

### Server Component

```text
Server Component
  │
  ▼
Server Service
  │
  ▼
Repository
  │
  ▼
Prisma
  │
  ▼
PostgreSQL
```

### Server Action

```text
Client Component
  │
  ▼
Server Action
  │
  ▼
Server Service
  │
  ▼
Repository
  │
  ▼
Prisma
  │
  ▼
PostgreSQL
```

## Architecture Rules

1. `src/app` chịu trách nhiệm routing và rendering.
2. `src/components` chỉ chứa các UI component dùng chung.
3. `src/features` chứa code thuộc từng domain.
4. `src/server` chỉ chứa code chạy phía server.
5. Client Component không được truy cập trực tiếp Prisma hoặc PostgreSQL.
6. Database access phải đi qua server layer.
7. Business logic không nên đặt trực tiếp trong `route.ts`.
8. `service.ts` chịu trách nhiệm business logic.
9. `repository.ts` chịu trách nhiệm database access.
10. Server Actions dùng cho mutation từ ứng dụng Next.js.
11. Route Handlers dùng để cung cấp HTTP API.
12. `src/generated/prisma` là code được Prisma generate và không chỉnh sửa thủ công.
13. `prisma/schema.prisma` là nguồn chính của database schema.
14. Database migrations được quản lý trong `prisma/migrations`.
15. Không sử dụng mock database trong kiến trúc chính.
16. Không expose `DATABASE_URL` hoặc secret server-side cho Client Components.

## Route Groups

### Public

```text
src/app/(public)/
```

Dùng cho các route không yêu cầu authentication.

Ví dụ:

```text
/auth
/auth/login
/auth/register
```

### Protected

```text
src/app/(protected)/
```

Dùng cho các route yêu cầu authentication.

Ví dụ:

```text
/dashboard
/profile
```

Tên `(public)` và `(protected)` là **Route Groups**, không xuất hiện trong URL.

Ví dụ:

```text
src/app/(protected)/dashboard/page.tsx
```

tạo route:

```text
/dashboard
```

không phải:

```text
/(protected)/dashboard
```

## Backend API

Backend được xây dựng trực tiếp trong Next.js thông qua Route Handlers:

```text
/api/auth/login
/api/auth/logout
/api/auth/me
/api/auth/refresh

/api/users
/api/users/:id

/api/posts
/api/posts/:id
```

API không truy cập database trực tiếp mà đi qua:

```text
Route Handler
    ↓
Service
    ↓
Repository
    ↓
Prisma
    ↓
PostgreSQL
```

## Database

Database sử dụng:

- PostgreSQL
- Prisma ORM
- Prisma Migrations

Prisma configuration:

```text
prisma.config.ts
```

Schema:

```text
prisma/schema.prisma
```

Migration:

```text
prisma/migrations/
```

Generated Prisma Client:

```text
src/generated/prisma/
```

Generated Prisma Client không được chỉnh sửa thủ công.

## Development

Install dependencies:

```bash
npm install
```

Configure environment:

```bash
cp .env.example .env
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migration:

```bash
npx prisma migrate dev
```

Start development server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

## Technology Stack

- Next.js
- React
- TypeScript
- PostgreSQL
- Prisma ORM
- Zod
- ESLint
- PostCSS
- Docker
- Git

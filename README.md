## Project Structure

```text
nextjs_16/
├── public/                                 # Static assets
│   ├── images/                             # Images
│   ├── icons/                              # Icons
│   └── favicon.ico                         # Favicon
│
├── src/
│   ├── app/                                # Next.js App Router
│   │   ├── layout.tsx                      # Root layout
│   │   ├── globals.css                     # Global styles
│   │   ├── page.tsx                        # Home page (/)
│   │   ├── loading.tsx                     # Global loading UI
│   │   ├── error.tsx                       # Global error boundary
│   │   ├── not-found.tsx                   # Global 404 page
│   │   │
│   │   ├── (public)/                       # Public routes - không yêu cầu authentication
│   │   │   ├── layout.tsx                  # Public layout
│   │   │   │
│   │   │   ├── page.tsx                    # Landing page (/)
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── page.tsx                # /auth
│   │   │   │   ├── actions.ts              # Server Actions cho authentication
│   │   │   │   │
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx            # /auth/login
│   │   │   │   │
│   │   │   │   ├── register/
│   │   │   │   │   └── page.tsx            # /auth/register
│   │   │   │   │
│   │   │   │   └── components/             # Auth-specific UI
│   │   │   │
│   │   │   └── components/
│   │   │       └── home/                    # Landing page components
│   │   │
│   │   ├── (protected)/                    # Protected routes - yêu cầu authentication
│   │   │   ├── layout.tsx                  # Authentication guard
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── layout.tsx              # Dashboard layout
│   │   │   │   ├── page.tsx                # /dashboard
│   │   │   │   └── components/             # Dashboard-specific UI
│   │   │   │
│   │   │   └── profile/
│   │   │       ├── page.tsx                # /profile
│   │   │       ├── actions.ts              # Profile Server Actions
│   │   │       ├── service.ts              # Profile service
│   │   │       └── components/             # Profile-specific UI
│   │   │
│   │   └── api/                            # Backend HTTP API
│   │       ├── auth/
│   │       │   ├── login/
│   │       │   │   └── route.ts            # POST /api/auth/login
│   │       │   ├── logout/
│   │       │   │   └── route.ts            # POST /api/auth/logout
│   │       │   ├── refresh/
│   │       │   │   └── route.ts            # POST /api/auth/refresh
│   │       │   └── me/
│   │       │       └── route.ts             # GET /api/auth/me
│   │       │
│   │       ├── users/
│   │       │   ├── route.ts                # GET /api/users
│   │       │   └── [id]/
│   │       │       └── route.ts             # GET /api/users/:id
│   │       │
│   │       └── posts/
│   │           ├── route.ts                # GET /api/posts
│   │           └── [id]/
│   │               └── route.ts             # GET /api/posts/:id
│   │
│   ├── components/                         # Shared React UI
│   │   ├── atoms/                          # Primitive components
│   │   │   ├── Button.tsx
│   │   │   └── Input.tsx
│   │   ├── molecules/                      # Components kết hợp atoms
│   │   │   └── FormField.tsx
│   │   ├── organisms/                      # Complex shared UI
│   │   └── templates/                      # Page-level shared layouts
│   │
│   ├── features/                           # Domain-specific frontend code
│   │   ├── auth/
│   │   │   ├── components/                 # Auth UI
│   │   │   ├── schemas.ts                  # Validation schemas
│   │   │   ├── types.ts                    # Auth types
│   │   │   └── constants.ts                # Auth constants
│   │   │
│   │   ├── users/
│   │   │   ├── components/
│   │   │   ├── schemas.ts
│   │   │   ├── types.ts
│   │   │   └── constants.ts
│   │   │
│   │   └── posts/
│   │       ├── components/
│   │       ├── schemas.ts
│   │       ├── types.ts
│   │       └── constants.ts
│   │
│   ├── server/                             # Backend / server-only code
│   │   ├── auth/
│   │   │   ├── service.ts                  # Authentication business logic
│   │   │   ├── session.ts                  # Session management
│   │   │   └── guard.ts                    # Authorization/authentication guard
│   │   │
│   │   ├── users/
│   │   │   ├── service.ts                  # User business logic
│   │   │   └── repository.ts               # User database access
│   │   │
│   │   ├── posts/
│   │   │   ├── service.ts                  # Post business logic
│   │   │   └── repository.ts               # Post database access
│   │   │
│   │   ├── db/
│   │   │   └── client.ts                   # Prisma Client singleton
│   │   │
│   │   └── shared/
│   │       ├── errors.ts                   # Server errors
│   │       ├── logger.ts                   # Server logging
│   │       └── permissions.ts              # Permission/authorization helpers
│   │
│   ├── generated/
│   │   └── prisma/                         # Generated Prisma Client
│   │
│   ├── lib/                                # Core application/framework utilities
│   │   ├── http/
│   │   │   ├── client.ts                   # HTTP client
│   │   │   └── response.ts                 # API response helpers
│   │   ├── auth/                            # Shared auth utilities
│   │   ├── validation/                      # Shared validation utilities
│   │   ├── metadata.ts                      # Metadata helpers
│   │   └── constants.ts                     # Global constants
│   │
│   ├── services/                           # External service integrations
│   │   └── external/
│   │       ├── email.service.ts             # Email provider
│   │       └── storage.service.ts          # File/object storage
│   │
│   ├── hooks/                              # Shared React hooks
│   ├── types/                              # Global/shared TypeScript types
│   ├── utils/                              # Generic utilities
│   └── styles/
│       └── globals.css                     # Global styles / design tokens
│
├── prisma/
│   ├── schema.prisma                       # Database schema
│   ├── migrations/                         # Database migrations
│   └── seed.ts                             # Database seed
│
├── .env                                    # Local environment variables
├── .env.example                            # Environment variable template
├── prisma.config.ts                        # Prisma 7 configuration
│
├── AGENTS.md                               # AI Agent instructions
├── CLAUDE.md                               # Claude/AI workflow instructions
├── docker-compose.yml                      # Docker services
├── Dockerfile                              # Production image
├── Dockerfile.dev                          # Development image
│
├── next.config.ts                          # Next.js configuration
├── next-env.d.ts                            # Next.js generated types
├── postcss.config.mjs                      # PostCSS configuration
├── eslint.config.mjs                       # ESLint configuration
├── tsconfig.json                            # TypeScript configuration
│
├── package.json                             # Dependencies and scripts
├── package-lock.json                        # Dependency lock file
└── README.md                                # Project documentation
```

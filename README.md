## Cấu trúc
```
nextjs-core/                       # Root project
├── node_modules/                  # Thư viện npm
├── public/                        # Thư mục public chứa static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├─ src/                            # Source code chính của ứng dụng
│  ├─ app/                         # App Router Next.js 16+
│  │  ├─ layout.tsx                # Root layout bọc toàn app (header/footer/providers)
│  │  ├─ loading.tsx               # Skeleton loading toàn app khi dữ liệu chưa load
│  │  ├─ error.tsx                 # Root error boundary (bắt lỗi toàn app)
│  │  │
│  │  ├─ auth/                     # Route authentication
│  │  │  ├─ login/
│  │  │  │   └─ page.tsx           # Trang Login, client component
│  │  │  └─ register/
│  │  │      └─ page.tsx           # Trang Register
│  │  │
│  │  ├─ dashboard/                # Route dashboard, cần auth
│  │  │  ├─ layout.tsx             # Dashboard layout riêng (sidebar + header)
│  │  │  ├─ page.tsx               # Feed chính của dashboard
│  │  │  └─ posts/                 # Sub-routes của posts
│  │  │     ├─ create/
│  │  │     │   └─ page.tsx        # Tạo post mới
│  │  │     └─ [postId]/           # Dynamic route postId
│  │  │         └─ page.tsx        # Chi tiết post
│  │  │
│  │  └─ profile/
│  │      └─ [userId]/             # Dynamic route profile
│  │          └─ page.tsx          # Trang profile người dùng
│  │
│  ├─ components/                  # Atomic Design UI components
│  │  ├─ atoms/                    # Các component nhỏ nhất, tái sử dụng
│  │  │   ├─ Button.tsx
│  │  │   ├─ Input.tsx
│  │  │   ├─ Avatar.tsx
│  │  │   └─ Icon.tsx
│  │  │
│  │  ├─ molecules/                # Ghép atoms, logic UI cơ bản
│  │  │   ├─ PostCard.tsx
│  │  │   ├─ CommentCard.tsx
│  │  │   ├─ PostForm.tsx
│  │  │   ├─ Navbar.tsx
│  │  │   └─ Sidebar.tsx
│  │  │
│  │  ├─ organisms/                # Ghép molecules, UI phức tạp
│  │  │   ├─ Feed.tsx
│  │  │   ├─ PostList.tsx
│  │  │   └─ NotificationPanel.tsx
│  │  │
│  │  └─ templates/                # Ghép organisms + layout, chuẩn page
│  │      ├─ ProfileTemplate.tsx
│  │      └─ DashboardTemplate.tsx
│  │
│  ├─ contracts/                   # TypeScript interface/schema
│  │  ├─ userContract.ts           # Type định nghĩa User
│  │  └─ postContract.ts           # Type định nghĩa Post
│  │
│  ├─ services/                    # Logic business & fetch API
│  │  ├─ apiService.ts             # Wrapper fetch + error handling + JWT
│  │  ├─ authService.ts            # Login, register, logout
│  │  ├─ postService.ts            # CRUD posts
│  │  └─ profileService.ts         # Fetch profile + posts
│  │
│  ├─ utils/                       # Helper functions, constants, format
│  │  ├─ formatDate.ts
│  │  ├─ helpers.ts
│  │  └─ constants.ts
│  │
│  └─ middleware.ts                # Middleware auth, check login trước khi vào page
├── AGENTS.md                       # Document dự án / agents
├── CLAUDE.md                       # Document dự án / claude
├── docker-compose.yml               # Docker Compose cấu hình multi-container
├── Dockerfile                       # Dockerfile Next.js
├── eslint.config.mjs                # ESLint config
├── next-env.d.ts                     # Next.js types
├── next.config.ts                    # Next.js config
├── package.json
├── package-lock.json
├── postcss.config.mjs               # PostCSS config
├── README.md
└── tsconfig.json                    # TypeScript config
```

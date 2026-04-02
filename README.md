## Cấu trúc
```
nextjs-core/
├── public/                                  # Static assets public: ảnh, icon, svg, favicon... Dùng trực tiếp qua /ten-file.svg
├── middleware.ts                             # Middleware toàn cục của Next.js, Dùng để bảo vệ route, kiểm tra auth, redirect theo role/session, Chạy trước khi request vào các route match config
├── src/
│  ├── app/                                  # App Router của Next.js, Nơi định nghĩa route, layout, loading, error, API route handlers
│  │  ├── layout.tsx                         ✅ Root layout toàn app, Import globals.css, bọc Providers, metadata chung, Không nên nhét logic dashboard quá cụ thể ở đây
│  │  ├── loading.tsx                        ✅ Loading UI mức root, Hiển thị khi route gốc hoặc segment lớn đang chờ dữ liệu
│  │  ├── error.tsx                          ✅ Error boundary mức root, Bắt lỗi runtime trong tree của App Router
│  │  ├── not-found.tsx                      ✅ Trang 404 toàn cục, Dùng khi gọi notFound() hoặc route không tồn tại
│  │  ├── (public)/                          ✅ Route group public, Nhóm route không cần đăng nhập
│  │  │  ├── layout.tsx                      ✅ Layout cho public pages, Ví dụ landing page, login, register, Có thể dùng PublicTemplate hoặc AuthTemplate
│  │  │  ├── page.tsx                        ✅ Trang public root: /, Có thể là landing page / homepage giới thiệu hệ thống
│  │  │  └── auth/
│  │  │     ├── page.tsx                     ✅ Trang /auth tự chuyển hướng trang hoặc chọn login/register
│  │  │     ├── login/page.tsx               ✅ Trang /auth/login, Form đăng nhập, thường là client component nếu có form state
│  │  │     └── register/page.tsx            ✅ Trang /auth/register, Form đăng ký tài khoản
│  │  ├── (protected)/                       # Route group protected, Nhóm route cần auth, thường kết hợp với middleware
│  │  │  ├── dashboard/
│  │  │  │  ├── layout.tsx                   # Layout riêng cho dashboard, Thường chứa header + sidebar + content + footer, Nên render DashboardTemplate tại đây
│  │  │  │  ├── page.tsx                     # Trang /dashboard, Feed chính, overview, stats, recent activities...
│  │  │  │  ├── posts/
│  │  │  │  │  ├── create/page.tsx           # Trang /dashboard/posts/create, Tạo post mới, có thể dùng PostForm
│  │  │  │  │  └── [postId]/page.tsx         # Trang /dashboard/posts/:postId, Chi tiết bài viết, SSR/ISR hoặc fetch theo params
│  │  │  │  ├── users/page.tsx               # Trang /dashboard/users, Danh sách người dùng, table, filter, pagination
│  │  │  │  └── analytics/page.tsx           # Trang /dashboard/analytics, Thống kê, chart, metrics
│  │  │  └── profile/
│  │  │     └── [userId]/page.tsx            # Trang /profile/:userId, Dynamic route profile người dùng, Có thể SSR để prefetch data profile
│  │  └── api/                               # Route handlers của Next.js, Backend tạm thời hoặc BFF layer
│  │     ├── auth/login/route.ts             # POST /api/auth/login, Xử lý login, set cookie/session/token
│  │     ├── auth/register/route.ts          # POST /api/auth/register, Xử lý đăng ký
│  │     ├── posts/route.ts                  # GET/POST /api/posts, Lấy danh sách posts hoặc tạo post mới
│  │     ├── posts/[postId]/route.ts         # GET/PUT/DELETE /api/posts/:postId, Chi tiết, cập nhật, xóa post
│  │     └── users/[userId]/route.ts         # GET /api/users/:userId, Lấy thông tin user/profile
│  ├── components/                           # UI components theo Atomic Design, Chỉ nên tập trung vào trình bày + composition UI, Không nên nhồi toàn bộ fetch/business logic vào đây
│  │  ├── atoms/                             # Thành phần nhỏ nhất, tái sử dụng cao
│  │  │  ├── Button.tsx                      # Nút cơ bản, có variants/sizes nếu cần
│  │  │  ├── Input.tsx                       # Input cơ bản
│  │  │  ├── Avatar.tsx                      # Ảnh đại diện
│  │  │  ├── Badge.tsx                       # Badge/tag/status nhỏ
│  │  │  ├── Spinner.tsx                     # Loading indicator
│  │  │  └── Icon.tsx                        # Wrapper icon hoặc mapping icon chung
│  │  ├── molecules/                         # Ghép atoms thành block UI nhỏ có nghĩa
│  │  │  ├── Navbar.tsx                      # Thanh điều hướng nhỏ
│  │  │  ├── Sidebar.tsx                     # Menu bên trái cơ bản
│  │  │  ├── FooterBar.tsx                   # Footer bar nhỏ
│  │  │  ├── PostCard.tsx                    # Card hiển thị 1 bài post
│  │  │  ├── CommentCard.tsx                 # Card 1 comment
│  │  │  ├── PostForm.tsx                    # Form tạo/sửa post
│  │  │  ├── LoginForm.tsx                   # Form login
│  │  │  ├── RegisterForm.tsx                # Form register
│  │  │  └── SearchBox.tsx                   # Ô tìm kiếm
│  │  ├── organisms/                         # Cụm UI lớn hơn, ghép nhiều molecules/atoms
│  │  │  ├── Feed.tsx                        # Feed tổng thể
│  │  │  ├── PostList.tsx                    # Danh sách post
│  │  │  ├── NotificationPanel.tsx           # Khu vực thông báo
│  │  │  ├── DashboardHeader.tsx             # Header cho dashboard
│  │  │  ├── DashboardSidebar.tsx            # Sidebar hoàn chỉnh cho dashboard
│  │  │  ├── DashboardFooter.tsx             # Footer dashboard
│  │  │  ├── ProfileHeader.tsx               # Header profile user
│  │  │  └── StatsCards.tsx                  # Cụm card thống kê
│  │  └── templates/                         # Template page-level
│  │     ├── PublicTemplate.tsx              # Template cho trang public
│  │     ├── DashboardTemplate.tsx           # Template dashboard: header/sidebar/content/footer
│  │     ├── ProfileTemplate.tsx             # Template profile page
│  │     └── AuthTemplate.tsx                # Template riêng cho login/register
│  ├── context/                              # React Context cho global state nhẹ
│  │  ├── AuthContext.tsx                    # Trạng thái user đăng nhập, login/logout, session client
│  │  ├── ThemeContext.tsx                   # Dark/light mode, theme settings
│  │  └── NotificationContext.tsx            # Toasts, notifications, panel trạng thái
│  ├── hooks/                                # Custom hooks tái sử dụng
│  │  ├── useAuth.ts                         # Hook thao tác auth ở client
│  │  ├── useTheme.ts                        # Hook đổi theme
│  │  ├── usePosts.ts                        # Hook lấy/quản lý posts
│  │  └── useInfiniteFeed.ts                 # Hook infinite scroll/feed pagination
│  ├── lib/                                  # Helper cấp framework / core utilities
│  │  ├── auth.ts                            # Hàm auth chung: parse token, verify session...
│  │  ├── fetcher.ts                         # Wrapper fetch dùng chung
│  │  ├── validations.ts                     # Schema validation (zod/yup/custom)
│  │  └── cookies.ts                         # Helper thao tác cookies
│  ├── services/                             # Business logic gọi API / xử lý data
│  │  ├── authService.ts                     # login/register/logout/fetch current user
│  │  ├── postService.ts                     # CRUD posts
│  │  ├── profileService.ts                  # Lấy profile + dữ liệu liên quan
│  │  └── dashboardService.ts                # Số liệu dashboard, analytics, widgets
│  ├── types/                                # Kiểu dữ liệu TypeScript dùng chung
│  │  ├── user.ts                            # Type User
│  │  ├── post.ts                            # Type Post
│  │  ├── comment.ts                         # Type Comment
│  │  └── api.ts                             # Type response/request API chung
│  ├── utils/                                # Utility helpers thuần túy
│  │  ├── formatDate.ts                      # Format ngày giờ
│  │  ├── constants.ts                       # Constants, enum-like values, routes, config tĩnh
│  │  └── cn.ts                              # Helper gộp className, thường kiểu clsx/twMerge
│  └── styles/
│     └── globals.css                        # Global styles toàn app, Tailwind v4 theme tokens, reset nhẹ, body styles...
├── AGENTS.md                                 ✅ Tài liệu hướng dẫn agent/workflow nếu bạn dùng AI agents
├── CLAUDE.md                                 ✅ Tài liệu ghi chú cho Claude/AI workflow nếu có
├── docker-compose.yml                        ✅ Cấu hình chạy app cùng các service khác bằng Docker Compose
├── Dockerfile                                ✅ Docker build cho môi trường production
├── Dockerfile.dev                            ✅ Docker build cho môi trường development
├── eslint.config.mjs                         ✅ ESLint config
├── next-env.d.ts                             ✅ Type definitions tự sinh của Next.js
├── next.config.ts                            ✅ Cấu hình Next.js
├── package-lock.json                         ✅ Lock version packages
├── package.json                              ✅ Scripts + dependencies
├── postcss.config.mjs                        ✅ Cấu hình PostCSS, dùng với Tailwind v4
├── README.md                                 ✅ Tài liệu mô tả dự án, setup, roadmap
└── tsconfig.json                             ✅ TypeScript config
```

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
│  ├── components/                           # Shared UI theo Atomic Design, Chỉ giữ thành phần tái sử dụng toàn app, Không đặt business logic hoặc feature layout lớn ở đây
│  │  ├── atoms/                             # Primitive UI library dùng chung toàn app, đã được chuẩn hóa theo globals.css
│  │  │  ├── styles.ts                       # Shared styling primitives cho controls, buttons, chips, floating panels, overlay, text, heading
│  │  │  ├── index.ts                        # Barrel export toàn bộ atoms để import từ @/components/atoms
│  │  │  ├── Button.tsx / IconButton.tsx     # Button system nhất quán theo atomButtonBaseClass + variants/sizes dùng chung
│  │  │  ├── Input.tsx / Select.tsx / Textarea.tsx
│  │  │  │                                  # Form controls chuẩn hóa cùng shape, border, focus, helper/error text
│  │  │  ├── Checkbox.tsx / Radio.tsx / Switch.tsx / Toggle.tsx / Selectable.tsx
│  │  │  │                                  # Choice controls và pressed/selected states theo cùng visual language
│  │  │  ├── Text.tsx / Heading.tsx / Label.tsx / HelperText.tsx / ErrorText.tsx / Link.tsx
│  │  │  │                                  # Typography primitives tái sử dụng, bám token và utility classes từ globals.css
│  │  │  ├── Alert.tsx / Badge.tsx / Pill.tsx / Tag.tsx / StatusDot.tsx / ProgressBar.tsx
│  │  │  │                                  # Feedback, chip, progress và status atoms theo cùng palette
│  │  │  ├── Overlay.tsx / Backdrop.tsx / Popover.tsx / Tooltip.tsx / Floating.tsx / FloatingArrow.tsx
│  │  │  │                                  # Floating/overlay primitives dùng cùng surface, shadow và blur system
│  │  │  ├── Portal.tsx / PortalGroup.tsx / Layer.tsx / LayerStack.tsx / ZIndexManager.tsx
│  │  │  │                                  # Layering primitives cho modal, dropdown, toast, floating content
│  │  │  ├── FocusLock.tsx / FocusTrap.tsx / FocusScope.tsx / FocusGuards.tsx / RovingFocus.tsx / TabScope.tsx
│  │  │  │                                  # Accessibility + keyboard/focus navigation primitives
│  │  │  ├── Image.tsx / LazyImage.tsx / BlurImage.tsx / ImageFallback.tsx / AspectRatio.tsx
│  │  │  │                                  # Media atoms với fallback, lazy loading, blur placeholder và ratio wrapper
│  │  │  ├── ScrollArea.tsx / ScrollShadow.tsx / ScrollSnap.tsx / ScrollTracker.tsx / ScrollLock.tsx / ScrollRestoration.tsx
│  │  │  │                                  # Scroll primitives cho area, masks, snap, tracking và lock/restore behavior
│  │  │  ├── Box.tsx / Center.tsx / Container.tsx / Flex.tsx / Grid.tsx / Stack.tsx / Spacer.tsx
│  │  │  │                                  # Layout primitives ở mức atom, dùng cho composition toàn app
│  │  │  └── ...                            # Còn nhiều atoms khác cho OTP, drag/pan, presence, delay, measurement, shortcut, kbd, v.v.
│  │  ├── molecules/                         # Ghép nhiều atoms thành block nhỏ có nghĩa nghiệp vụ nhưng vẫn đủ generic để tái sử dụng
│  │  │  ├── AuthFormMessage.tsx             # Thông báo form auth, bọc Alert cho login / register
│  │  │  ├── UserMenu.tsx                    # Cụm avatar + menu hành động user
│  │  │  ├── BreadcrumbTrail.tsx             # Breadcrumb cho dashboard / nested navigation
│  │  │  ├── SidebarDrilldownItem.tsx        # Item menu sidebar có drill-down / icon / active state
│  │  │  ├── FeatureCard.tsx                 # Card mô tả tính năng ở landing page
│  │  │  ├── PostCard.tsx                    # Card hiển thị 1 bài post
│  │  │  ├── SearchBox.tsx                   # Ô tìm kiếm có icon / clear action
│  │  │  ├── PasswordField.tsx               # Input password có toggle show / hide
│  │  │  ├── FormField.tsx                   # Label + hint + error + input slot cho form chuẩn hóa
│  │  │  ├── EmptyState.tsx                  # Trạng thái rỗng cho list / table / feed
│  │  │  ├── ConfirmAction.tsx               # Cụm xác nhận hành động nhỏ như delete / logout
│  │  │  ├── Pagination.tsx                  # Điều hướng phân trang dùng chung
│  │  │  ├── StatCard.tsx                    # Card số liệu đơn cho dashboard / analytics
│  │  │  └── SectionHeader.tsx               # Tiêu đề section có title / description / action
│  │  ├── organisms/                         # Cụm UI lớn hơn, chỉ nên đặt global nếu thật sự tái sử dụng ở nhiều feature khác nhau
│  │  │  ├── AppHeader.tsx                   # Header dùng chung cho nhiều khu vực khác nhau ngoài 1 feature cụ thể
│  │  │  ├── AppSidebarShell.tsx             # Khung sidebar tổng quát, không gắn chặt vào dashboard riêng lẻ
│  │  │  ├── DataTable.tsx                   # Bảng dữ liệu tái sử dụng cho users / posts / reports / audit logs
│  │  │  ├── FilterToolbar.tsx               # Thanh filter + search + sort dùng chung cho list page
│  │  │  ├── StatsOverview.tsx               # Cụm card thống kê tổng quát, có thể tái dùng nhiều màn hình analytics
│  │  │  ├── EmptyContentPanel.tsx           # Panel empty state lớn cho feed / list / dashboard block
│  │  │  ├── ActivityFeed.tsx                # Feed hoạt động dùng chung nếu nhiều domain hiển thị timeline giống nhau
│  │  │  └── NotificationPanel.tsx           # Khu vực thông báo lớn, dùng lại ngoài một feature đơn lẻ
│  │  │                                      # Nếu organism chỉ phục vụ 1 feature, vẫn nên đặt trong:
│  │  │                                      # - src/app/(public)/auth/components/
│  │  │                                      # - src/app/(public)/components/home/
│  │  │                                      # - src/app/(protected)/dashboard/components/
│  │  └── templates/                         # Template page-level, chỉ nên để global khi là layout composition dùng lại nhiều domain
│  │     ├── SplitScreenTemplate.tsx         # Template 2 cột: content + visual panel, dùng cho auth/onboarding/marketing
│  │     ├── ListPageTemplate.tsx            # Template page list chuẩn: header + filters + content + pagination
│  │     ├── DetailPageTemplate.tsx          # Template page detail: breadcrumb + heading + meta + content area
│  │     ├── SettingsTemplate.tsx            # Template settings/profile/preferences nhiều tab hoặc section
│  │     ├── FormPageTemplate.tsx            # Template cho create/edit flow với header + form body + action footer
│  │     ├── AnalyticsTemplate.tsx           # Template analytics tổng quát: filters + stats + charts + tables
│  │     └── CenteredContentTemplate.tsx     # Template căn giữa nội dung cho trạng thái empty / success / verify / notice
│  │                                            # Với template gắn chặt vào feature hoặc route group, nên giữ feature-scope
│  │                                            # Ví dụ hiện tại:
│  │                                            # - PublicTemplate.tsx -> src/app/(public)/components/
│  │                                            # - AuthTemplate.tsx -> src/app/(public)/auth/components/
│  │                                            # - DashboardTemplate.tsx -> src/app/(protected)/dashboard/components/
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
│  │  └── cn.ts                              # Helper gộp className tối giản cho toàn bộ atoms/molecules/templates
│  └── styles/
│     └── globals.css                        # Theme tokens, surface/shadow/focus system, utilities và animation dùng chung toàn app
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

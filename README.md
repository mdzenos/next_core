## Getting Started

```
src/
├── app/                            # Thư mục App Router của Next.js, chia theo domain/module feature
│   ├── auth/                       # Module quản lý xác thực người dùng (login, register,...)
│   │   ├── login/
│   │   │   └── page.tsx            # Trang login, sử dụng các component atomic
│   │   ├── register/
│   │   │   └── page.tsx            # Trang đăng ký tài khoản
│   │   └── layout.tsx              # Layout chung cho toàn bộ module auth (ví dụ header riêng)
│   │
│   ├── dashboard/                  # Module dashboard hiển thị dữ liệu chính của app
│   │   ├── page.tsx                # Trang dashboard chính
│   │   ├── components/             # Component đặc thù, phức tạp chỉ dùng trong dashboard
│   │   │   ├── StatsWidget.tsx     # Widget hiển thị thống kê
│   │   │   └── UserOverview.tsx    # Widget hiển thị tổng quan user
│   │   └── layout.tsx              # Layout riêng của dashboard, có thể có sidebar, header module
│   │
│   ├── blog/                       # Module quản lý blog, bài viết
│   │   ├── page.tsx                # Trang blog listing
│   │   ├── post/
│   │   │   └── [id]/page.tsx       # Trang chi tiết bài viết động theo id
│   │   └── components/
│   │       └── PostCard.tsx        # Component hiển thị một bài blog dưới dạng card
│   │
│   ├── layout.tsx                  # Layout gốc bao trùm toàn bộ app (header, footer chung)
│   └── page.tsx                    # Trang landing page chính, trang đầu tiên của app
│
├── components/                     # Thư viện component theo Atomic Design dùng toàn app
│   ├── atoms/                      # Nguyên tử: component nhỏ nhất, không phụ thuộc ai (Button, Input, Icon)
│   │   ├── Button/
│   │   │   ├── Button.tsx          # Component nút bấm
│   │   │   ├── Button.styles.ts    # Styling riêng cho Button (css module hoặc styled-components)
│   │   │   └── index.ts            # Export Button để import ngắn gọn
│   │   ├── Input/                  # Component Input
│   │   └── Icon/                   # Component Icon
│   │
│   ├── molecules/                  # Phân tử: kết hợp nhiều atoms thành khối đơn giản (SearchForm, Card)
│   │   ├── SearchForm/
│   │   ├── Card/
│   │   └── Dropdown/
│   │
│   ├── organisms/                  # Cấu tử: kết hợp molecules + atoms thành UI module phức tạp (Header, Footer)
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Sidebar/
│   │
│   └── templates/                  # Template: bố cục trang sẵn, phối hợp organisms để dựng layout
│       └── DashboardTemplate.tsx
│
├── hooks/                          # Các custom React hook dùng chung trong app (ví dụ useAuth, useFetch)
│   ├── useAuth.ts                  # Hook quản lý xác thực người dùng
│   └── useFetch.ts                 # Hook fetch dữ liệu chung dùng lại nhiều nơi
│
├── lib/                            # Các thư viện helper, instance axios, các hàm tiện ích chung
│   ├── apiClient.ts                # Cấu hình và instance axios để gọi API
│   └── dateUtils.ts                # Hàm helper xử lý ngày tháng
│
├── services/                       # Logic gọi API và business logic tách riêng
│   ├── authService.ts              # Các hàm API liên quan xác thực
│   ├── blogService.ts              # Các hàm API liên quan blog
│   └── dashboardService.ts         # API liên quan dashboard
│
├── store/                          # Quản lý state toàn cục (Redux, Zustand,...)
│   ├── index.ts                    # Khởi tạo store chính
│   ├── rootReducer.ts              # Root reducer cho Redux
│   └── slices/                     # Các slice domain cho redux toolkit
│       ├── authSlice.ts            # Slice state cho auth
│       └── blogSlice.ts            # Slice state cho blog
│
├── styles/                         # Các file style toàn cục, css module, config tailwind
│   ├── globals.css                 # CSS toàn cục
│   └── tailwind.config.js          # Cấu hình Tailwind CSS (nếu dùng)
│
├── types/                          # Các định nghĩa TypeScript toàn cục, interface, type alias
│   ├── auth.ts                     # Type liên quan auth
│   ├── blog.ts                     # Type liên quan blog
│   └── global.d.ts                 # Định nghĩa mở rộng hoặc declare global
│
└── utils/                          # Các helper thuần không phụ thuộc React (format, validate,...)
    ├── format.ts                   # Hàm format dữ liệu
    └── validate.ts                 # Hàm validate dữ liệu

```

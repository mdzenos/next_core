This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Create module
`npm run plop`

## Cấu trúc thư mục dự án
<pre> ```
next_core/
├── plop-templates/				# Thư mục chứa các template dùng cho PlopJS (code generator)
│	├── components/				# Template cho các component UI riêng lẻ
│	│	└── component.tsx.hbs				# Template file React component (.tsx) dạng View
│	├── hooks/					# Template cho custom React hooks
│	│	└── hook.ts.hbs			# Template file hook (.ts)
│	├── services/				# Template cho service xử lý API, logic ngoài UI
│	│	└── service.ts.hbs		# Template service (.ts)
│	├── slices/					# Template cho Redux slices (state management)
│	│	└── slice.ts.hbs		# Template Redux slice (.ts)
│	├── component.module.css.hbs# Template CSS module cho component (css)
│	├── component.tsx.hbs		# Template component React cơ bản (tsx)
│	├── error.tsx.hbs			# Template component trang lỗi (React tsx)
│	├── layout.tsx.hbs			# Template component layout (React tsx)
│	├── loading.tsx.hbs			# Template component loading (React tsx)
│	├── page.tsx.hbs			# Template trang page (React tsx) - Next.js App Router
│	└── types.ts.hbs			# Template file định nghĩa types/interfaces TypeScript (.ts)
├── public/						# Thư mục chứa các file tĩnh (images, fonts, ...)
├── src/						# Source code chính của dự án
│	├── app/					# Các module theo route của Next.js App Router
│	│	├── layout.tsx 			# Layout chung toàn app, dynamic layout + SEO mặc định + middleware route-level
│	│	├── middleware.ts 		# Middleware Next.js (xử lý redirect auth, etc)
│	│	└── page.tsx 			# Root page (trang chủ của app)
│	├── components/				# Các component UI dùng chung toàn app
│	│	├── layout/				# Component có logic phụ trợ (AuthGuard, ModalWrapper, ResponsiveContainer,...)
│	│	└── ui/					# Component “dumb” chỉ nhận props và render (Button, Input, Icon,...)
│	├── config/					# File cấu hình chung cho app
│	├── constants/				# Các hằng số (HTTP status, routes, i18n,...)
│	├── hooks/					# Các hook dùng chung (useAuth, useI18n, useReduxHooks,...)
│	├── lib/					# Thư viện nội bộ (authHeaderFactory, apiClient, logger,...)
│	├── services/				# Services global (API call chung)
│	├── store/					# Redux store, rootReducer, middleware, ...
│	│	├── index.ts
│	│	├── rootReducer.ts
│	│	└── types.ts
│	├── styles/					# Styles global (CSS, Tailwind config)
│	│	└── globals.css
│	├── types/					# Typescript types và interfaces toàn app
│	└── utils/					# Helpers (formatters, validators,...)
│		├── formatters/
│		└── validators/
├── .env.example				# File mẫu biến môi trường, dev tự copy thành .env.local
├── .env.local					# File biến môi trường local, không commit lên git
├── .gitignore					# Git ignore rules
├── eslint.config.mjs			# Cấu hình ESLint
├── middleware.ts				# Middleware Next.js (nếu dùng chung ngoài src/app)
├── next-env.d.ts				# File định nghĩa type cho Next.js (tự sinh)
├── next.config.ts				# Cấu hình Next.js
├── package.json				# Dependencies & script quản lý project
├── postcss.config.mjs			# Cấu hình PostCSS (dùng Tailwind CSS)
├── plop-profile.ts				# Cấu hình Plop
├── README.md					# File hướng dẫn cấu trúc, dev đừng hỏi lung tung
└── tsconfig.json				# Cấu hình TypeScript ``` </pre>

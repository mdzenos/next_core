"use client";

import { useEffect, useMemo, useState } from "react";

type Course = {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  lessons: number;
  students: number;
  rating: number;
  progress?: number;
  image: string;
};

type Video = {
  id: number;
  title: string;
  views: string;
  duration: string;
  category: string;
  image: string;
};

type LiveStream = {
  id: number;
  title: string;
  viewers: number;
  category: string;
  image: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "Next.js Full-Stack từ cơ bản đến nâng cao",
    description:
      "Xây dựng ứng dụng thực tế với Next.js, React, Prisma, PostgreSQL và Authentication.",
    category: "Web Development",
    level: "Tất cả",
    lessons: 68,
    students: 1240,
    rating: 4.9,
    progress: 42,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "React.js thực chiến",
    description:
      "Học React thông qua các project thực tế và hiểu sâu về component, hooks và state.",
    category: "React",
    level: "Cơ bản",
    lessons: 42,
    students: 982,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Backend với Node.js",
    description:
      "REST API, authentication, database, caching và kiến trúc backend hiện đại.",
    category: "Backend",
    level: "Trung cấp",
    lessons: 54,
    students: 754,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "PostgreSQL & Prisma",
    description:
      "Thiết kế database và xây dựng tầng dữ liệu mạnh mẽ cho ứng dụng web.",
    category: "Database",
    level: "Trung cấp",
    lessons: 31,
    students: 621,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
  },
];

const featuredVideos: Video[] = [
  {
    id: 1,
    title: "Next.js 16 có gì mới?",
    views: "128K",
    duration: "18:32",
    category: "Next.js",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Server Components giải thích cực dễ hiểu",
    views: "96K",
    duration: "24:18",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Xây Authentication với Next.js",
    views: "82K",
    duration: "32:44",
    category: "Authentication",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    title: "Prisma ORM từ A đến Z",
    views: "76K",
    duration: "28:15",
    category: "Prisma",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    title: "Hiểu về React Hooks",
    views: "71K",
    duration: "21:09",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    title: "Thiết kế Database chuẩn",
    views: "64K",
    duration: "26:51",
    category: "Database",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 7,
    title: "Next.js Routing thực chiến",
    views: "61K",
    duration: "19:42",
    category: "Next.js",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 8,
    title: "REST API với Node.js",
    views: "58K",
    duration: "35:10",
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
  },
  // {
  //   id: 9,
  //   title: "Docker cho Developer",
  //   views: "54K",
  //   duration: "29:35",
  //   category: "DevOps",
  //   image:
  //     "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1000&q=80",
  // },
  // {
  //   id: 10,
  //   title: "TypeScript thực chiến",
  //   views: "51K",
  //   duration: "27:18",
  //   category: "TypeScript",
  //   image:
  //     "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1000&q=80",
  // },
  // {
  //   id: 11,
  //   title: "Tailwind CSS hiện đại",
  //   views: "48K",
  //   duration: "22:41",
  //   category: "Frontend",
  //   image:
  //     "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=80",
  // },
  // {
  //   id: 12,
  //   title: "Clean Architecture cho Web",
  //   views: "44K",
  //   duration: "31:27",
  //   category: "Architecture",
  //   image:
  //     "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
  // },
];

const liveStreams: LiveStream[] = [
  {
    id: 1,
    title: "Xây dựng Next.js App từ đầu",
    viewers: 842,
    category: "Next.js",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Live Coding React Dashboard",
    viewers: 621,
    category: "React",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Thiết kế PostgreSQL Database",
    viewers: 514,
    category: "Database",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Node.js Backend Workshop",
    viewers: 437,
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "TypeScript Deep Dive",
    viewers: 392,
    category: "TypeScript",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Docker & DevOps thực chiến",
    viewers: 351,
    category: "DevOps",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    title: "Xây Authentication",
    viewers: 318,
    category: "Auth",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 8,
    title: "React Performance",
    viewers: 284,
    category: "React",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 9,
    title: "Prisma Workshop",
    viewers: 267,
    category: "Prisma",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 10,
    title: "API Design",
    viewers: 241,
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 11,
    title: "Frontend Architecture",
    viewers: 198,
    category: "Frontend",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 12,
    title: "Clean Architecture",
    viewers: 177,
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 13,
    title: "Next.js Server Actions",
    viewers: 165,
    category: "Next.js",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 14,
    title: "Testing React",
    viewers: 154,
    category: "Testing",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 15,
    title: "Git Workflow",
    viewers: 142,
    category: "Git",
    image:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 16,
    title: "Web Security",
    viewers: 131,
    category: "Security",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 17,
    title: "Caching trong Web App",
    viewers: 119,
    category: "Performance",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 18,
    title: "SQL Optimization",
    viewers: 108,
    category: "Database",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 19,
    title: "Deploy Next.js",
    viewers: 96,
    category: "Deployment",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 20,
    title: "CI/CD cho Developer",
    viewers: 87,
    category: "DevOps",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 21,
    title: "Microservices",
    viewers: 78,
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 22,
    title: "GraphQL thực chiến",
    viewers: 71,
    category: "API",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 23,
    title: "React Native",
    viewers: 63,
    category: "Mobile",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 24,
    title: "AI Integration",
    viewers: 59,
    category: "AI",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  },
];

const courseFilters = {
  "Theo công nghệ": [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Python",
  ],
  "Theo cấp độ": ["Cơ bản", "Trung cấp", "Nâng cao"],
  "Theo nội dung": [
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Architecture",
  ],
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [courseMenuOpen, setCourseMenuOpen] = useState(false);
  const [livePage, setLivePage] = useState(0);

  const livePages = Math.ceil(liveStreams.length / 12);

  const visibleLiveStreams = useMemo(() => {
    const start = livePage * 8;
    return liveStreams.slice(start, start + 8);
  }, [livePage]);

  useEffect(() => {
    const introSeen = localStorage.getItem("learning-intro-seen");

    if (introSeen) {
      setShowIntro(false);
    }

    const auth = localStorage.getItem("learning-auth");

    if (auth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const dismissIntro = () => {
    localStorage.setItem("learning-intro-seen", "true");
    setShowIntro(false);
  };

  const loginDemo = () => {
    localStorage.setItem("learning-auth", "true");
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* LOGO */}
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-sm font-bold text-white dark:bg-white dark:text-zinc-950">
              L
            </div>

            <span className="text-lg font-bold tracking-tight">
              Learn<span className="text-blue-600">Lab</span>
            </span>
          </a>

          {/* MENU */}
          <nav className="hidden items-center gap-1 md:flex">
            <a
              href="/"
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Trang chủ
            </a>

            <div
              className="relative"
              onMouseEnter={() => setCourseMenuOpen(true)}
              onMouseLeave={() => setCourseMenuOpen(false)}
            >
              <button className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900">
                Khóa học
              </button>

              {courseMenuOpen && (
                <div className="absolute left-1/2 top-full w-[620px] -translate-x-1/2 pt-3">
                  <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="mb-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Khám phá khóa học
                      </p>

                      <p className="mt-1 text-sm text-zinc-500">
                        Tìm nội dung phù hợp với mục tiêu học của bạn.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {Object.entries(courseFilters).map(([title, items]) => (
                        <div key={title}>
                          <h3 className="mb-3 text-sm font-semibold">
                            {title}
                          </h3>

                          <div className="space-y-1">
                            {items.map((item) => (
                              <a
                                key={item}
                                href={`/courses?filter=${encodeURIComponent(item)}`}
                                className="block rounded-lg px-2 py-2 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                              >
                                {item}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                      <a
                        href="/courses"
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Xem tất cả khóa học →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href="/articles"
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Bài viết
            </a>

            <a
              href="/search"
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Tìm kiếm
            </a>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode((value) => !value)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-sm hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              aria-label="Đổi giao diện"
            >
              {darkMode ? "☀" : "☾"}
            </button>

            {isLoggedIn ? (
              <a
                href="/profile"
                className="hidden rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 sm:block"
              >
                Tài khoản
              </a>
            ) : (
              <>
                <a
                  href="/auth/login"
                  onClick={loginDemo}
                  className="hidden rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 sm:block"
                >
                  Đăng nhập
                </a>

                <a
                  href="/auth/register"
                  className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950"
                >
                  Đăng ký
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* INTRO - ONLY FIRST VISIT */}
        {showIntro && (
          <section className="border-b border-zinc-200 dark:border-zinc-800">
            <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-28">
              <div className="flex flex-col justify-center">
                <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Học miễn phí · Không bắt buộc đăng nhập
                </div>

                <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Học theo cách của bạn.
                  <span className="block text-blue-600">
                    Hiểu sâu hơn mỗi ngày.
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  Một nền tảng học tập kết hợp khóa học, tài liệu, video và
                  livestream. Bạn có thể bắt đầu học ngay mà không cần tạo tài
                  khoản.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="/courses"
                    className="rounded-xl bg-zinc-950 px-6 py-3 font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950"
                  >
                    Khám phá khóa học
                  </a>

                  <button
                    onClick={dismissIntro}
                    className="rounded-xl border border-zinc-200 px-6 py-3 font-semibold hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
                  >
                    Bắt đầu khám phá
                  </button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-zinc-100 p-8 dark:bg-zinc-900">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["01", "Video"],
                    ["02", "Tài liệu"],
                    ["03", "Livestream"],
                    ["04", "Tiến trình"],
                  ].map(([number, label]) => (
                    <div
                      key={number}
                      className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
                    >
                      <span className="text-xs font-semibold text-zinc-400">
                        {number}
                      </span>

                      <p className="mt-8 text-lg font-semibold">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CONTINUE LEARNING */}
        {isLoggedIn && (
          <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Dành cho bạn
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight">
                  Tiếp tục học
                </h2>
              </div>

              <a
                href="/dashboard"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
              >
                Xem tiến trình →
              </a>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {courses.slice(0, 2).map((course) => (
                <a
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="grid sm:grid-cols-[220px_1fr]">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-full min-h-[180px] w-full object-cover"
                    />

                    <div className="p-5">
                      <span className="text-xs font-semibold text-blue-600">
                        {course.category}
                      </span>

                      <h3 className="mt-2 text-lg font-bold group-hover:text-blue-600">
                        {course.title}
                      </h3>

                      <div className="mt-5">
                        <div className="mb-2 flex justify-between text-xs text-zinc-500">
                          <span>Tiến trình</span>
                          <span>{course.progress}%</span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* LIVE */}
        <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                  <p className="text-sm font-semibold text-red-500">
                    Đang phát
                  </p>
                </div>

                <h2 className="mt-1 text-2xl font-bold tracking-tight">
                  Đang Live
                </h2>
              </div>

              <div className="flex gap-2">
                <button
                  disabled={livePage === 0}
                  onClick={() => setLivePage((page) => Math.max(0, page - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white disabled:cursor-not-allowed disabled:opacity-30 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  ←
                </button>

                <button
                  disabled={livePage >= livePages - 1}
                  onClick={() =>
                    setLivePage((page) => Math.min(livePages - 1, page + 1))
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white disabled:cursor-not-allowed disabled:opacity-30 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {visibleLiveStreams.map((stream) => (
                <a
                  key={stream.id}
                  href={`/live/${stream.id}`}
                  className="group overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={stream.image}
                      alt={stream.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    <div className="absolute left-2 top-2 rounded-md bg-red-500 px-2 py-1 text-[10px] font-bold text-white">
                      LIVE
                    </div>

                    <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 text-[10px] text-white">
                      {stream.viewers} đang xem
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-xs font-medium text-blue-600">
                      {stream.category}
                    </p>

                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold">
                      {stream.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED VIDEOS */}
        <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Được xem nhiều
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight">
                Video nổi bật
              </h2>
            </div>

            <a
              href="/videos"
              className="text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
            >
              Xem tất cả →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {featuredVideos.map((video) => (
              <a
                key={video.id}
                href={`/videos/${video.id}`}
                className="group"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                  <img
                    src={video.image}
                    alt={video.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-1 text-[10px] font-medium text-white">
                    {video.duration}
                  </span>
                </div>

                <div className="mt-3">
                  <p className="text-xs font-medium text-blue-600">
                    {video.category}
                  </p>

                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 group-hover:text-blue-600">
                    {video.title}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-500">
                    {video.views} lượt xem
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* COURSES */}
        <section className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Học theo lộ trình
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight">
                  Khóa học được đánh giá cao
                </h2>
              </div>

              <a
                href="/courses"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
              >
                Tất cả khóa học →
              </a>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {courses.map((course) => (
                <a
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-600">
                        {course.category}
                      </span>

                      <span className="text-xs font-medium">
                        ★ {course.rating}
                      </span>
                    </div>

                    <h3 className="mt-2 line-clamp-2 font-bold">
                      {course.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
                      {course.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                      <span>{course.lessons} bài học</span>
                      <span>{course.students} học viên</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* LEARNING FORMATS */}
        <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="rounded-3xl bg-zinc-950 p-8 text-white lg:p-12 dark:bg-white dark:text-zinc-950">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold text-blue-400 dark:text-blue-600">
                  Một khóa học · nhiều cách học
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Học bằng phương thức phù hợp với bạn
                </h2>

                <p className="mt-4 max-w-lg leading-7 opacity-70">
                  Mỗi khóa học có thể kết hợp video, tài liệu và livestream.
                  Bạn không bị giới hạn bởi một hình thức học duy nhất.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  ["Video", "Học mọi lúc"],
                  ["Docs", "Đọc & tra cứu"],
                  ["Live", "Học cùng mentor"],
                ].map(([title, description]) => (
                  <div
                    key={title}
                    className="rounded-2xl bg-white/10 p-5 dark:bg-zinc-100"
                  >
                    <div className="text-lg font-bold">{title}</div>
                    <div className="mt-2 text-xs opacity-60">
                      {description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEO ARTICLE */}
        <section className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-blue-600">
                Knowledge base
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Bài viết mới nhất
              </h2>

              <p className="mt-3 leading-7 text-zinc-500">
                Các bài viết chuyên sâu giúp bạn hiểu bản chất công nghệ trước
                khi bước vào khóa học.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                "Server Components trong Next.js hoạt động như thế nào?",
                "Khi nào nên sử dụng Prisma trong dự án?",
                "Thiết kế Authentication cho ứng dụng Next.js",
              ].map((title, index) => (
                <a
                  key={title}
                  href={`/articles/${index + 1}`}
                  className="group rounded-2xl border border-zinc-200 p-6 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
                >
                  <span className="text-xs font-medium text-zinc-400">
                    Bài viết · 8 phút đọc
                  </span>

                  <h3 className="mt-4 font-semibold leading-6 group-hover:text-blue-600">
                    {title}
                  </h3>

                  <span className="mt-5 block text-sm font-medium text-blue-600">
                    Đọc bài viết →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            © {new Date().getFullYear()} LearnLab. Học không giới hạn.
          </div>

          <div className="flex gap-5">
            <a href="/about" className="hover:text-zinc-950 dark:hover:text-white">
              Giới thiệu
            </a>

            <a
              href="/articles"
              className="hover:text-zinc-950 dark:hover:text-white"
            >
              Bài viết
            </a>

            <a
              href="/courses"
              className="hover:text-zinc-950 dark:hover:text-white"
            >
              Khóa học
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  Database,
  FileText,
  GitBranch,
  GraduationCap,
  Menu,
  MessageCircle,
  Moon,
  Play,
  Radio,
  Search,
  Server,
  Sparkles,
  Star,
  Sun,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type IconType = typeof Sparkles;

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
  badge?: string;
  image: string;
};

type VideoItem = {
  id: number;
  title: string;
  views: string;
  viewsCount: number;
  duration: string;
  category: string;
  image: string;
};

type LiveStream = {
  id: number;
  title: string;
  viewers: number;
  category: string;
  instructor: string;
  image: string;
};

type Article = {
  id: number;
  title: string;
  description: string;
  readTime: string;
  category: string;
};

type CourseMenuItem = {
  name: string;
  icon: IconType;
};

type CourseMenuGroup = {
  title: string;
  items: CourseMenuItem[];
};

const INTRO_MAX_VISITS = 5;

const courses: Course[] = [
  {
    id: 1,
    title: "Next.js Full-Stack từ cơ bản đến nâng cao",
    description:
      "Xây dựng ứng dụng thực tế với Next.js, React, Prisma, PostgreSQL và Authentication.",
    category: "Next.js",
    level: "Tất cả",
    lessons: 68,
    students: 1240,
    rating: 4.9,
    progress: 42,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85",
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
    badge: "Phổ biến",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=85",
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
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=1200&q=85",
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
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    title: "TypeScript từ cơ bản đến thực chiến",
    description:
      "Nắm vững type system, generics, utility types và cách áp dụng TypeScript vào dự án thực tế.",
    category: "TypeScript",
    level: "Trung cấp",
    lessons: 46,
    students: 583,
    rating: 4.8,
    badge: "Mới",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    title: "Docker & DevOps cho Developer",
    description:
      "Làm chủ Docker, container, image, networking, volume và quy trình deploy ứng dụng.",
    category: "DevOps",
    level: "Trung cấp",
    lessons: 38,
    students: 527,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 7,
    title: "React Architecture & Performance",
    description:
      "Tìm hiểu component architecture, state management, rendering và tối ưu hiệu năng React.",
    category: "React",
    level: "Nâng cao",
    lessons: 35,
    students: 468,
    rating: 4.9,
    badge: "Nâng cao",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 8,
    title: "Thiết kế REST API với Node.js",
    description:
      "Xây dựng API production-ready với validation, authentication, authorization, caching và testing.",
    category: "Backend",
    level: "Trung cấp",
    lessons: 44,
    students: 439,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
  },
];

const featuredVideos: VideoItem[] = [
  {
    id: 1,
    title: "Next.js 16 có gì mới?",
    views: "128K",
    viewsCount: 128000,
    duration: "18:32",
    category: "Next.js",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    title: "Server Components giải thích cực dễ hiểu",
    views: "96K",
    viewsCount: 96000,
    duration: "24:18",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "Xây Authentication với Next.js",
    views: "82K",
    viewsCount: 82000,
    duration: "32:44",
    category: "Authentication",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    title: "Prisma ORM từ A đến Z",
    views: "76K",
    viewsCount: 76000,
    duration: "28:15",
    category: "Prisma",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    title: "Hiểu về React Hooks",
    views: "71K",
    viewsCount: 71000,
    duration: "21:09",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    title: "Thiết kế Database chuẩn",
    views: "64K",
    viewsCount: 64000,
    duration: "26:51",
    category: "Database",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 7,
    title: "Next.js Routing thực chiến",
    views: "61K",
    viewsCount: 61000,
    duration: "19:42",
    category: "Next.js",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 8,
    title: "REST API với Node.js",
    views: "58K",
    viewsCount: 58000,
    duration: "35:10",
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 9,
    title: "Docker cho Developer",
    views: "54K",
    viewsCount: 54000,
    duration: "29:35",
    category: "DevOps",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 10,
    title: "TypeScript thực chiến",
    views: "51K",
    viewsCount: 51000,
    duration: "27:18",
    category: "TypeScript",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 11,
    title: "Tailwind CSS hiện đại",
    views: "48K",
    viewsCount: 48000,
    duration: "22:41",
    category: "Frontend",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 12,
    title: "Clean Architecture cho Web",
    views: "44K",
    viewsCount: 44000,
    duration: "31:27",
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 13,
    title: "Next.js Server Actions thực chiến",
    views: "42K",
    viewsCount: 42000,
    duration: "25:14",
    category: "Next.js",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 14,
    title: "React Performance từ A đến Z",
    views: "39K",
    viewsCount: 39000,
    duration: "23:21",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 15,
    title: "PostgreSQL Index hoạt động thế nào?",
    views: "36K",
    viewsCount: 36000,
    duration: "20:42",
    category: "Database",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 16,
    title: "Authentication Architecture",
    views: "34K",
    viewsCount: 34000,
    duration: "29:10",
    category: "Authentication",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 17,
    title: "Docker Compose Full-Stack",
    views: "32K",
    viewsCount: 32000,
    duration: "26:45",
    category: "DevOps",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 18,
    title: "Node.js API Architecture",
    views: "30K",
    viewsCount: 30000,
    duration: "31:05",
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 19,
    title: "TypeScript Generics dễ hiểu",
    views: "28K",
    viewsCount: 28000,
    duration: "17:36",
    category: "TypeScript",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 20,
    title: "Redis cho Web Developer",
    views: "26K",
    viewsCount: 26000,
    duration: "19:44",
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 21,
    title: "Testing React Component",
    views: "24K",
    viewsCount: 24000,
    duration: "22:15",
    category: "Testing",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 22,
    title: "Git Workflow cho Team",
    views: "22K",
    viewsCount: 22000,
    duration: "18:39",
    category: "Git",
    image:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 23,
    title: "Deploy Next.js Production",
    views: "20K",
    viewsCount: 20000,
    duration: "24:26",
    category: "Deployment",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 24,
    title: "AI Integration với Next.js",
    views: "18K",
    viewsCount: 18000,
    duration: "27:31",
    category: "AI",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85",
  },
];

const liveStreams: LiveStream[] = [
  {
    id: 1,
    title: "Xây dựng Next.js App từ đầu",
    viewers: 842,
    category: "Next.js",
    instructor: "Minh Nguyễn",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    title: "Live Coding React Dashboard",
    viewers: 621,
    category: "React",
    instructor: "Hùng Trần",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "Thiết kế PostgreSQL Database",
    viewers: 514,
    category: "Database",
    instructor: "Quang Phạm",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    title: "Node.js Backend Workshop",
    viewers: 437,
    category: "Backend",
    instructor: "Long Đỗ",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    title: "TypeScript Deep Dive",
    viewers: 392,
    category: "TypeScript",
    instructor: "Tuấn Võ",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    title: "Docker & DevOps thực chiến",
    viewers: 351,
    category: "DevOps",
    instructor: "Duy Lê",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 7,
    title: "Xây Authentication",
    viewers: 318,
    category: "Auth",
    instructor: "Nam Bùi",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 8,
    title: "React Performance",
    viewers: 284,
    category: "React",
    instructor: "Hải Trần",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 9,
    title: "Prisma Workshop",
    viewers: 267,
    category: "Prisma",
    instructor: "Phúc Nguyễn",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 10,
    title: "API Design",
    viewers: 241,
    category: "Backend",
    instructor: "Đạt Nguyễn",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 11,
    title: "Frontend Architecture",
    viewers: 198,
    category: "Frontend",
    instructor: "Khoa Lê",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 12,
    title: "Clean Architecture",
    viewers: 177,
    category: "Architecture",
    instructor: "Tùng Phan",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 13,
    title: "Next.js Server Actions",
    viewers: 165,
    category: "Next.js",
    instructor: "Minh Nguyễn",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 14,
    title: "Testing React",
    viewers: 154,
    category: "Testing",
    instructor: "Hùng Trần",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 15,
    title: "Git Workflow",
    viewers: 142,
    category: "Git",
    instructor: "Quang Phạm",
    image:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 16,
    title: "Web Security",
    viewers: 131,
    category: "Security",
    instructor: "Long Đỗ",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 17,
    title: "Caching trong Web App",
    viewers: 119,
    category: "Performance",
    instructor: "Tuấn Võ",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 18,
    title: "SQL Optimization",
    viewers: 108,
    category: "Database",
    instructor: "Duy Lê",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 19,
    title: "Deploy Next.js",
    viewers: 96,
    category: "Deployment",
    instructor: "Nam Bùi",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 20,
    title: "CI/CD cho Developer",
    viewers: 87,
    category: "DevOps",
    instructor: "Hải Trần",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 21,
    title: "Microservices",
    viewers: 78,
    category: "Backend",
    instructor: "Phúc Nguyễn",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 22,
    title: "GraphQL thực chiến",
    viewers: 71,
    category: "API",
    instructor: "Đạt Nguyễn",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 23,
    title: "React Native",
    viewers: 63,
    category: "Mobile",
    instructor: "Khoa Lê",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 24,
    title: "AI Integration",
    viewers: 59,
    category: "AI",
    instructor: "Tùng Phan",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85",
  },
];

const articles: Article[] = [
  {
    id: 1,
    title: "Server Components trong Next.js hoạt động như thế nào?",
    description:
      "Hiểu cách Server Components thay đổi cách xây dựng ứng dụng React hiện đại và khi nào nên sử dụng chúng.",
    readTime: "8 phút đọc",
    category: "Next.js",
  },
  {
    id: 2,
    title: "Khi nào nên sử dụng Prisma trong dự án?",
    description:
      "Tìm hiểu cách Prisma giúp quản lý database hiệu quả và những trường hợp nên dùng SQL trực tiếp.",
    readTime: "7 phút đọc",
    category: "Database",
  },
  {
    id: 3,
    title: "Thiết kế Authentication cho ứng dụng Next.js",
    description:
      "Tìm hiểu session, protected routes, middleware và cách xây dựng authentication an toàn.",
    readTime: "10 phút đọc",
    category: "Authentication",
  },
  {
    id: 4,
    title: "React Server Components và Client Components",
    description:
      "Phân biệt Server Components và Client Components, cách chúng giao tiếp và lựa chọn đúng nơi sử dụng.",
    readTime: "9 phút đọc",
    category: "React",
  },
  {
    id: 5,
    title: "Thiết kế Database PostgreSQL cho ứng dụng thực tế",
    description:
      "Những nguyên tắc quan trọng khi thiết kế schema, relationship, index và tối ưu truy vấn PostgreSQL.",
    readTime: "12 phút đọc",
    category: "PostgreSQL",
  },
  {
    id: 6,
    title: "Docker cho Developer: từ Development đến Production",
    description:
      "Hiểu Docker image, container, volume, network và cách đưa ứng dụng web lên môi trường production.",
    readTime: "11 phút đọc",
    category: "DevOps",
  },
  {
    id: 7,
    title: "Next.js App Router từ cơ bản đến thực chiến",
    description:
      "Tìm hiểu routing, layouts, nested routes và route groups trong Next.js.",
    readTime: "10 phút đọc",
    category: "Next.js",
  },
  {
    id: 8,
    title: "React Hooks: useState, useEffect và Custom Hooks",
    description:
      "Hiểu bản chất hooks và cách tổ chức logic React trong các project thực tế.",
    readTime: "9 phút đọc",
    category: "React",
  },
];

const courseMenuGroups: CourseMenuGroup[] = [
  {
    title: "Frontend",
    items: [
      { name: "React", icon: Sparkles },
      { name: "Next.js", icon: Zap },
      { name: "TypeScript", icon: FileText },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: Server },
      { name: "REST API", icon: GitBranch },
      { name: "Authentication", icon: Users },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "PostgreSQL", icon: Database },
      { name: "Prisma", icon: Database },
    ],
  },
  {
    title: "DevOps & Architecture",
    items: [
      { name: "Docker", icon: Server },
      { name: "DevOps", icon: Zap },
      { name: "Architecture", icon: GitBranch },
    ],
  },
];

const courseCategories = [
  "Tất cả",
  "Next.js",
  "React",
  "Backend",
  "Database",
];

const categories = [
  { name: "React", count: "32 khóa học", icon: Sparkles },
  { name: "Next.js", count: "24 khóa học", icon: Zap },
  { name: "Node.js", count: "18 khóa học", icon: Server },
  { name: "TypeScript", count: "16 khóa học", icon: FileText },
  { name: "PostgreSQL", count: "12 khóa học", icon: Database },
  { name: "Docker", count: "10 khóa học", icon: Server },
  { name: "Python", count: "28 khóa học", icon: GitBranch },
  { name: "AI", count: "14 khóa học", icon: Sparkles },
];

function getItemsPerPage(width: number) {
  if (width < 768) return 4;
  if (width < 1024) return 6;
  return 8;
}

function sortCourses(items: Course[]) {
  return [...items].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.students - a.students;
  });
}

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Trang trước" : "Trang tiếp theo"}
      className={`absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200/80 bg-white/95 text-zinc-700 shadow-md backdrop-blur transition-all duration-200 hover:scale-105 hover:border-zinc-300 hover:bg-white disabled:pointer-events-none disabled:opacity-0 dark:border-zinc-700 dark:bg-zinc-900/95 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 sm:h-11 sm:w-11 ${
        direction === "left" ? "left-0" : "right-0"
      }`}
    >
      <Icon className="h-5 w-5" strokeWidth={2.2} />
    </button>
  );
}

function ThemeButton({
  darkMode,
  onClick,
}: {
  darkMode: boolean | null;
  onClick: () => void;
}) {
  const isDark = darkMode === true;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        isDark
          ? "Chuyển sang giao diện sáng"
          : "Chuyển sang giao diện tối"
      }
      title={isDark ? "Giao diện sáng" : "Giao diện tối"}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200/80 bg-white text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800/80 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}

function CourseMenu({
  mobile = false,
  onClose,
}: {
  mobile?: boolean;
  onClose?: () => void;
}) {
  if (mobile) {
    return (
      <div className="mx-1 mt-1 rounded-2xl border border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-800 dark:bg-zinc-900">
        {courseMenuGroups.map((group) => (
          <div key={group.title} className="mb-3 last:mb-0">
            <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400">
              {group.title}
            </p>

            <div className="space-y-0.5">
              {group.items.map(({ name, icon: Icon }) => (
                <Link
                  key={name}
                  href={`/courses?filter=${encodeURIComponent(name)}`}
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-600 transition hover:bg-white hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-500 shadow-sm transition group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-blue-500/10 dark:group-hover:text-blue-400">
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="font-medium">{name}</span>

                  <ArrowRight className="ml-auto h-3.5 w-3.5 text-zinc-300 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-zinc-600" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        <Link
          href="/courses"
          onClick={onClose}
          className="mt-3 flex items-center justify-between rounded-xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          <span>Xem tất cả khóa học</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute left-0 top-full z-[100] pt-2">
      <div className="w-[820px] max-w-[calc(100vw-40px)] overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <GraduationCap className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600 dark:text-blue-400">
                    LearnLab Courses
                  </p>

                  <h2 className="mt-0.5 text-base font-bold text-zinc-950 dark:text-white">
                    Học theo công nghệ
                  </h2>
                </div>
              </div>

              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                Chọn công nghệ bạn muốn học và xây dựng project thực tế từ
                frontend đến backend, database và DevOps.
              </p>
            </div>

            <Link
              href="/courses"
              className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 sm:inline-flex dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
            >
              Tất cả khóa học
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {courseMenuGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-xl border border-zinc-200/70 bg-zinc-50/80 p-2.5 dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <div className="px-2 py-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400">
                    {group.title}
                  </h3>
                </div>

                <div className="space-y-0.5">
                  {group.items.map(({ name, icon: Icon }) => (
                    <Link
                      key={name}
                      href={`/courses?filter=${encodeURIComponent(name)}`}
                      className="group flex items-center gap-2.5 rounded-lg px-2 py-2.5 text-sm text-zinc-600 transition hover:bg-white hover:text-zinc-950 hover:shadow-sm dark:text-zinc-400 dark:hover:bg-zinc-950 dark:hover:text-white"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-500 transition group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-blue-500/10 dark:group-hover:text-blue-400">
                        <Icon className="h-4 w-4" />
                      </span>

                      <span className="min-w-0 flex-1 truncate font-medium">
                        {name}
                      </span>

                      <ArrowRight className="h-3 w-3 shrink-0 text-zinc-300 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-zinc-600" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-zinc-200/70 bg-zinc-50/70 px-5 py-3 dark:border-zinc-800 dark:bg-zinc-900/50 sm:px-6">
          <div className="flex min-w-0 items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-blue-600" />

            <span className="truncate">
              Học qua video, project, tài liệu và livestream.
            </span>
          </div>

          <Link
            href="/courses"
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Khám phá
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.id}`} className="group min-w-0">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-zinc-950 shadow-xl">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        {course.badge && (
          <span className="absolute left-2 top-2 rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold text-zinc-950 shadow-sm dark:bg-zinc-950/95 dark:text-white">
            {course.badge}
          </span>
        )}

        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/75 px-2 py-1 text-[10px] font-medium text-white">
          <Star className="h-3 w-3 fill-current text-amber-400" />
          {course.rating}
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-xs font-medium text-blue-600">
            {course.category}
          </p>

          <span className="shrink-0 text-[11px] text-zinc-500">
            {course.level}
          </span>
        </div>

        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 group-hover:text-blue-600">
          {course.title}
        </h3>

        <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.lessons}
          </span>

          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {course.students.toLocaleString("vi-VN")}
          </span>
        </div>

        {course.progress !== undefined && (
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between text-[11px] text-zinc-500">
              <span>Tiến trình</span>
              <span>{course.progress}%</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

function VideoCard({ video }: { video: VideoItem }) {
  return (
    <Link href={`/videos/${video.id}`} className="group">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
        <img
          src={video.image}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-zinc-950 shadow-xl">
            <Play className="h-4 w-4 fill-current" />
          </div>
        </div>

        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/75 px-2 py-1 text-[10px] font-medium text-white">
          <Clock3 className="h-3 w-3" />
          {video.duration}
        </div>
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
    </Link>
  );
}

function LiveCard({ stream }: { stream: LiveStream }) {
  return (
    <Link
      href={`/live/${stream.id}`}
      className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={stream.image}
          alt={stream.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute left-2 top-2 rounded-md bg-red-500 px-2 py-1 text-[10px] font-bold text-white">
          LIVE
        </div>

        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[10px] text-white">
          <Users className="h-3 w-3" />
          {stream.viewers.toLocaleString("vi-VN")}
        </div>

        <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-950 opacity-0 shadow-lg transition group-hover:opacity-100">
          <Play className="h-3.5 w-3.5 fill-current" />
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs font-medium text-blue-600">
          {stream.category}
        </p>

        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5">
          {stream.title}
        </h3>

        <p className="mt-2 text-xs text-zinc-500">
          {stream.instructor}
        </p>
      </div>
    </Link>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="group rounded-2xl border border-zinc-200/80 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700 sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 text-xs font-medium text-zinc-400">
          <FileText className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{article.category}</span>
        </div>

        <span className="flex shrink-0 items-center gap-1 text-[11px] text-zinc-400">
          <Clock3 className="h-3.5 w-3.5" />
          {article.readTime}
        </span>
      </div>

      <h3 className="mt-5 line-clamp-2 text-sm font-semibold leading-6 group-hover:text-blue-600 sm:text-base">
        {article.title}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-500">
        {article.description}
      </p>

      <div className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
        Đọc bài viết
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export default function Home() {
  const introVisitInitialized = useRef(false);
  const courseMenuRef = useRef<HTMLDivElement>(null);

  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopCourseMenuOpen, setDesktopCourseMenuOpen] = useState(false);
  const [mobileCourseMenuOpen, setMobileCourseMenuOpen] = useState(false);

  const [contentPerPage, setContentPerPage] = useState(8);
  const [livePage, setLivePage] = useState(0);
  const [videoPage, setVideoPage] = useState(0);

  const [selectedCourseCategory, setSelectedCourseCategory] =
    useState("Tất cả");

  const filteredCourses = useMemo(() => {
    const filtered =
      selectedCourseCategory === "Tất cả"
        ? courses
        : courses.filter(
            (course) => course.category === selectedCourseCategory,
          );

    return sortCourses(filtered);
  }, [selectedCourseCategory]);

  const visibleCourses = useMemo(
    () => filteredCourses.slice(0, contentPerPage),
    [filteredCourses, contentPerPage],
  );

  const visibleArticles = useMemo(
    () => articles.slice(0, contentPerPage),
    [contentPerPage],
  );

  const visibleVideos = useMemo(
    () =>
      [...featuredVideos]
        .sort((a, b) => b.viewsCount - a.viewsCount)
        .slice(
          videoPage * contentPerPage,
          videoPage * contentPerPage + contentPerPage,
        ),
    [videoPage, contentPerPage],
  );

  const visibleLiveStreams = useMemo(
    () =>
      liveStreams.slice(
        livePage * contentPerPage,
        livePage * contentPerPage + contentPerPage,
      ),
    [livePage, contentPerPage],
  );

  const livePages = Math.max(
    1,
    Math.ceil(liveStreams.length / contentPerPage),
  );

  const videoPages = Math.max(
    1,
    Math.ceil(featuredVideos.length / contentPerPage),
  );

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("learning-theme");
    const isDark = savedTheme === "dark";

    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";

    const auth = window.localStorage.getItem("learning-auth");
    setIsLoggedIn(auth === "true");

    if (!introVisitInitialized.current) {
      introVisitInitialized.current = true;

      const visitCount = Number(
        window.localStorage.getItem("learning-intro-visits") || "0",
      );

      const nextVisit = visitCount + 1;

      window.localStorage.setItem(
        "learning-intro-visits",
        String(nextVisit),
      );

      setShowIntro(nextVisit <= INTRO_MAX_VISITS);
    }

    const updateResponsiveLayout = () => {
      setContentPerPage(getItemsPerPage(window.innerWidth));
    };

    updateResponsiveLayout();

    window.addEventListener("resize", updateResponsiveLayout);

    return () => {
      window.removeEventListener("resize", updateResponsiveLayout);
    };
  }, []);

  useEffect(() => {
    if (darkMode === null) return;

    const root = document.documentElement;

    root.classList.toggle("dark", darkMode);
    root.style.colorScheme = darkMode ? "dark" : "light";

    window.localStorage.setItem(
      "learning-theme",
      darkMode ? "dark" : "light",
    );
  }, [darkMode]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setLivePage(0);
    setVideoPage(0);
  }, [contentPerPage]);

  useEffect(() => {
    setLivePage((page) => Math.min(page, livePages - 1));
    setVideoPage((page) => Math.min(page, videoPages - 1));
  }, [livePages, videoPages]);

  useEffect(() => {
    if (!desktopCourseMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!courseMenuRef.current?.contains(target)) {
        setDesktopCourseMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopCourseMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [desktopCourseMenuOpen]);

  const loginDemo = () => {
    window.localStorage.setItem("learning-auth", "true");
    setIsLoggedIn(true);
  };

  const logoutDemo = () => {
    window.localStorage.removeItem("learning-auth");
    setIsLoggedIn(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileCourseMenuOpen(false);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    const input = event.currentTarget.elements.namedItem(
      "q",
    ) as HTMLInputElement | null;

    if (!input?.value.trim()) {
      event.preventDefault();
    }
  };

  const changeLivePage = (page: number) => {
    setLivePage(Math.max(0, Math.min(livePages - 1, page)));
  };

  const changeVideoPage = (page: number) => {
    setVideoPage(Math.max(0, Math.min(videoPages - 1, page)));
  };

  const toggleTheme = () => {
    setDarkMode((current) => current !== true);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 transition-colors duration-300 dark:bg-zinc-950 dark:text-white">
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 shadow-[0_1px_0_rgba(0,0,0,0.02)] backdrop-blur-2xl dark:border-zinc-800/70 dark:bg-zinc-950/85 dark:shadow-none">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-sm font-bold text-white shadow-sm dark:bg-white dark:text-zinc-950">
              L
            </div>

            <span className="text-lg font-bold tracking-tight">
              Learn<span className="text-blue-600">Lab</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <div ref={courseMenuRef} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={desktopCourseMenuOpen}
                onClick={() =>
                  setDesktopCourseMenuOpen((value) => !value)
                }
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  desktopCourseMenuOpen
                    ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-white"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
              >
                Khóa học

                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    desktopCourseMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {desktopCourseMenuOpen && <CourseMenu />}
            </div>

            <Link
              href="/forum"
              className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Forum
            </Link>

            <Link
              href="/articles"
              className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Bài viết
            </Link>
          </nav>

          <form
            action="/search"
            method="GET"
            onSubmit={handleSearchSubmit}
            className="ml-auto hidden min-w-0 max-w-sm flex-1 lg:block"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

              <input
                name="q"
                type="search"
                placeholder="Bạn muốn học gì?"
                className="h-10 w-full rounded-xl border border-zinc-200/80 bg-zinc-50/80 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-800/80 dark:bg-zinc-900/70 dark:focus:bg-zinc-950"
              />
            </div>
          </form>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeButton darkMode={darkMode} onClick={toggleTheme} />

            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  Tài khoản
                </Link>

                <button
                  type="button"
                  onClick={logoutDemo}
                  className="rounded-lg px-3 py-2 text-sm text-zinc-500 transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={loginDemo}
                  className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  Đăng nhập
                </Link>

                <Link
                  href="/auth/register"
                  className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2 md:hidden">
            <ThemeButton darkMode={darkMode} onClick={toggleTheme} />

            <button
              type="button"
              onClick={() => setMobileMenuOpen((value) => !value)}
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={mobileMenuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200/80 bg-white text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800/80 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
            <div className="mx-auto max-w-7xl px-5 py-4">
              <form action="/search" method="GET" className="mb-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

                  <input
                    name="q"
                    type="search"
                    placeholder="Bạn muốn học gì?"
                    className="h-11 w-full rounded-xl border border-zinc-200/80 bg-zinc-50/80 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-800/80 dark:bg-zinc-900/70 dark:focus:bg-zinc-950"
                  />
                </div>
              </form>

              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() =>
                    setMobileCourseMenuOpen((value) => !value)
                  }
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    mobileCourseMenuOpen
                      ? "bg-zinc-100 dark:bg-zinc-900"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  <span>Khóa học</span>

                  <ChevronDown
                    className={`h-4 w-4 transition ${
                      mobileCourseMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileCourseMenuOpen && (
                  <CourseMenu
                    mobile
                    onClose={closeMobileMenu}
                  />
                )}

                <Link
                  href="/forum"
                  onClick={closeMobileMenu}
                  className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  Forum
                </Link>

                <Link
                  href="/articles"
                  onClick={closeMobileMenu}
                  className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  Bài viết
                </Link>
              </nav>

              <div className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                {isLoggedIn ? (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/profile"
                      onClick={closeMobileMenu}
                      className="rounded-xl bg-zinc-950 px-4 py-3 text-center text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
                    >
                      Tài khoản
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        logoutDemo();
                        closeMobileMenu();
                      }}
                      className="rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium dark:border-zinc-800"
                    >
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/auth/login"
                      onClick={() => {
                        loginDemo();
                        closeMobileMenu();
                      }}
                      className="rounded-xl border border-zinc-200 px-4 py-3 text-center text-sm font-medium dark:border-zinc-800"
                    >
                      Đăng nhập
                    </Link>

                    <Link
                      href="/auth/register"
                      onClick={closeMobileMenu}
                      className="rounded-xl bg-zinc-950 px-4 py-3 text-center text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
                    >
                      Đăng ký
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {showIntro && (
          <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-16">
              <div className="flex flex-col justify-center">
                <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Học miễn phí · Không bắt buộc đăng nhập
                </div>

                <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Học theo cách của bạn.
                  <span className="mt-2 block text-blue-600">
                    Hiểu sâu hơn mỗi ngày.
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
                  Một nền tảng học tập kết hợp khóa học, video, tài liệu và
                  livestream. Bắt đầu khám phá kiến thức phù hợp với mục tiêu
                  của bạn.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/courses"
                    className="rounded-xl bg-zinc-950 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md dark:bg-white dark:text-zinc-950"
                  >
                    Khám phá khóa học
                  </Link>

                  <button
                    type="button"
                    onClick={() => setShowIntro(false)}
                    className="rounded-xl border border-zinc-200/80 bg-white/70 px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                  >
                    Bắt đầu khám phá
                  </button>
                </div>

                <div className="mt-6 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    ["128+", "Video"],
                    ["48+", "Khóa học"],
                    ["24+", "Live"],
                    ["64+", "Tài liệu"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-zinc-200/80 bg-white/60 p-3 dark:border-zinc-800/80 dark:bg-zinc-900/40"
                    >
                      <div className="font-semibold">{value}</div>

                      <div className="mt-1 text-xs text-zinc-500">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-zinc-100 p-5 dark:bg-zinc-900 sm:p-8">
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative">
                  <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs text-zinc-500">
                          Continue Learning
                        </p>

                        <p className="mt-1 font-semibold">
                          Next.js Full-Stack
                        </p>
                      </div>

                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-500/10">
                        42%
                      </span>
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-full w-[42%] rounded-full bg-blue-600" />
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                      <span>Server Components</span>
                      <span>29 / 68</span>
                    </div>

                    <Link
                      href="/courses/1"
                      className="mt-5 inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950"
                    >
                      Tiếp tục học
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[
                      [Video, "Video", "128+"],
                      [FileText, "Docs", "64+"],
                      [Radio, "Live", "24+"],
                      [GraduationCap, "Courses", "48+"],
                    ].map(([Icon, title, value]) => {
                      const FeatureIcon = Icon as IconType;

                      return (
                        <div
                          key={title as string}
                          className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
                        >
                          <FeatureIcon className="h-5 w-5 text-blue-600" />

                          <div className="mt-4 flex items-end justify-between gap-3">
                            <span className="text-sm font-semibold">
                              {title as string}
                            </span>

                            <span className="text-xs text-zinc-500">
                              {value as string}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {isLoggedIn && (
          <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-18">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Dành cho bạn
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight">
                  Tiếp tục học
                </h2>
              </div>

              <Link
                href="/dashboard"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
              >
                Xem tiến trình
              </Link>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {courses.slice(0, 2).map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="group overflow-hidden rounded-2xl border border-zinc-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800/80 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <div className="grid sm:grid-cols-[220px_1fr]">
                    <div className="aspect-video sm:aspect-auto">
                      <img
                        src={course.image}
                        alt={course.title}
                        loading="lazy"
                        className="h-full min-h-[180px] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                    </div>

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
                            style={{
                              width: `${course.progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      <p className="mt-3 text-xs text-zinc-500">
                        Tiếp tục từ bài học gần nhất
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Đang Live
            </h2>

            <Link
              href="/lives"
              className="hidden items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-white sm:flex"
            >
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative px-8 sm:px-10">
            <CarouselButton
              direction="left"
              disabled={livePage === 0}
              onClick={() => changeLivePage(livePage - 1)}
            />

            <CarouselButton
              direction="right"
              disabled={livePage >= livePages - 1}
              onClick={() => changeLivePage(livePage + 1)}
            />

            <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {visibleLiveStreams.map((stream) => (
                <LiveCard key={stream.id} stream={stream} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Video nổi bật
            </h2>

            <Link
              href="/videos"
              className="hidden items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-white sm:flex"
            >
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative px-8 sm:px-10">
            <CarouselButton
              direction="left"
              disabled={videoPage === 0}
              onClick={() => changeVideoPage(videoPage - 1)}
            />

            <CarouselButton
              direction="right"
              disabled={videoPage >= videoPages - 1}
              onClick={() => changeVideoPage(videoPage + 1)}
            />

            <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4">
              {visibleVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                Khóa học được đánh giá cao
              </h2>

              <Link
                href="/courses"
                className="hidden items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-white sm:flex"
              >
                Xem tất cả
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
              {courseCategories.map((category) => {
                const active = selectedCourseCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCourseCategory(category)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                        : "border border-zinc-200/80 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800/80 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4">
              {visibleCourses.length > 0 ? (
                visibleCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))
              ) : (
                <div className="col-span-full rounded-2xl border border-dashed border-zinc-300 px-6 py-12 text-center dark:border-zinc-700">
                  <p className="font-medium">
                    Chưa có khóa học phù hợp.
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    Hãy thử chọn danh mục khác.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="border-y border-zinc-200/70 bg-zinc-50/80 dark:border-zinc-800/70 dark:bg-zinc-900/40">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <div className="mb-5">
              <h2 className="text-2xl font-bold tracking-tight">
                Học theo công nghệ
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {categories.map(({ name, count, icon: Icon }) => (
                <Link
                  key={name}
                  href={`/courses?filter=${encodeURIComponent(name)}`}
                  className="group rounded-2xl border border-zinc-200/80 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-blue-900/60"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                    <Icon className="h-4 w-4" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold group-hover:text-blue-600">
                    {name}
                  </h3>

                  <p className="mt-1 text-[11px] text-zinc-500">
                    {count}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold">
                Bài viết mới nhất
              </h2>

              <Link
                href="/articles"
                className="hidden items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-white sm:flex"
              >
                Xem tất cả
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {visibleArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Học để hiểu, không chỉ học để hoàn thành.
              </h2>

              <p className="mt-4 max-w-lg leading-7 text-zinc-500">
                Nội dung tập trung vào kiến thức thực tế, project và khả năng
                áp dụng vào công việc.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [
                  "Học miễn phí",
                  "Bắt đầu ngay mà không cần đăng nhập.",
                  Check,
                ],
                [
                  "Project thực tế",
                  "Học thông qua những bài toán gần với công việc.",
                  Zap,
                ],
                [
                  "Nhiều hình thức",
                  "Video, tài liệu và livestream trong cùng một hệ thống.",
                  BookOpen,
                ],
                [
                  "Theo dõi tiến trình",
                  "Biết mình đang học ở đâu và cần học gì tiếp theo.",
                  GraduationCap,
                ],
              ].map(([title, description, Icon]) => {
                const FeatureIcon = Icon as IconType;

                return (
                  <div
                    key={title as string}
                    className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
                      <FeatureIcon className="h-4 w-4" />
                    </div>

                    <h3 className="mt-6 font-semibold">
                      {title as string}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {description as string}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-xs font-bold text-white dark:bg-white dark:text-zinc-950">
                  L
                </div>

                <span className="font-bold">
                  Learn<span className="text-blue-600">Lab</span>
                </span>
              </Link>

              <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-500">
                Nền tảng học tập giúp bạn học công nghệ theo cách phù hợp với
                mình.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Học tập</h3>

              <div className="mt-4 space-y-2 text-sm text-zinc-500">
                <Link
                  className="block hover:text-zinc-950 dark:hover:text-white"
                  href="/courses"
                >
                  Khóa học
                </Link>

                <Link
                  className="block hover:text-zinc-950 dark:hover:text-white"
                  href="/videos"
                >
                  Video
                </Link>

                <Link
                  className="block hover:text-zinc-950 dark:hover:text-white"
                  href="/lives"
                >
                  Livestream
                </Link>

                <Link
                  className="block hover:text-zinc-950 dark:hover:text-white"
                  href="/articles"
                >
                  Bài viết
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Tài nguyên</h3>

              <div className="mt-4 space-y-2 text-sm text-zinc-500">
                <Link
                  className="block hover:text-zinc-950 dark:hover:text-white"
                  href="/search"
                >
                  Tìm kiếm
                </Link>

                <Link
                  className="block hover:text-zinc-950 dark:hover:text-white"
                  href="/about"
                >
                  Giới thiệu
                </Link>

                <Link
                  className="block hover:text-zinc-950 dark:hover:text-white"
                  href="/faq"
                >
                  FAQ
                </Link>

                <Link
                  className="block hover:text-zinc-950 dark:hover:text-white"
                  href="/contact"
                >
                  Liên hệ
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">LearnLab</h3>

              <div className="mt-4 space-y-2 text-sm text-zinc-500">
                <Link
                  className="block hover:text-zinc-950 dark:hover:text-white"
                  href="/terms"
                >
                  Điều khoản
                </Link>

                <Link
                  className="block hover:text-zinc-950 dark:hover:text-white"
                  href="/privacy"
                >
                  Chính sách
                </Link>

                <Link
                  className="block hover:text-zinc-950 dark:hover:text-white"
                  href="/community"
                >
                  Cộng đồng
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
            <div>
              © {new Date().getFullYear()} LearnLab. Học không giới hạn.
            </div>

            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Cùng nhau học tốt hơn.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

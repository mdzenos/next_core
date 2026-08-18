import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnLab",
  description: "Nền tảng học tập LearnLab",
};

const themeScript = `
(function () {
  try {
    const savedTheme = localStorage.getItem("learning-theme");
    const isDark = savedTheme === "dark";
    const root = document.documentElement;

    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  } catch {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body>{children}</body>
    </html>
  );
}

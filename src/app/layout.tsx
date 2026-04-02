// Root layout toàn app
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { ReactNode } from 'react';
import '@/styles/globals.css';

// Google Fonts (tuỳ chọn)
const geist = Geist({ subsets: ['latin'], weight: '400' });
const geistMono = Geist_Mono({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'NextJS Social App',
  description: 'Học Next.js + React qua dự án social dashboard',
  icons: [
    { rel: 'icon', url: '/favicons/icons8-next.js-gradient-16.ico', sizes: '16x16' },
    { rel: 'icon', url: '/favicons/icons8-next.js-gradient-32.ico', sizes: '32x32' },
    { rel: 'icon', url: '/favicons/icons8-next.js-gradient-96.ico', sizes: '96x96' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Social App</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2026 NextJS Social App</p>
        </footer>
      </body>
    </html>
  );
}

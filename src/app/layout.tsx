// src/app/layout.tsx
import '@/styles/globals.css';
import { buildRootMetadata } from '@/lib/metadata';

export const metadata = buildRootMetadata({
  icons: {
    icon: [
      {
        url: '/favicons/icons8-next.js-gradient-16.ico',
        sizes: '16x16',
        type: 'image/x-icon',
      },
      {
        url: '/favicons/icons8-next.js-gradient-32.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        url: '/favicons/icons8-next.js-gradient-96.ico',
        sizes: '96x96',
        type: 'image/x-icon',
      },
    ],
    shortcut: '/favicons/icons8-next.js-gradient-32.ico',
    apple: '/favicons/icons8-next.js-gradient-96.ico',
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}

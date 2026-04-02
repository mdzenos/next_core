import type { Metadata } from 'next';
// import AuthTemplate from '@/components/templates/AuthTemplate';
import PublicTemplate from '@/components/templates/PublicTemplate';

export const metadata: Metadata = {
  title: {
    default: 'Trang chủ',
    template: '%s | NextJS Core',
  },
  description: 'Trang chủ của ứng dụng NextJS Social Dashboard',
  icons: [
    {
      rel: 'icon',
      url: '/favicons/icons8-next.js-gradient-16.ico',
      sizes: '16x16',
    },
    {
      rel: 'icon',
      url: '/favicons/icons8-next.js-gradient-32.ico',
      sizes: '32x32',
    },
    {
      rel: 'icon',
      url: '/favicons/icons8-next.js-gradient-96.ico',
      sizes: '96x96',
    },
  ],
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PublicTemplate>{children}</PublicTemplate>;
}

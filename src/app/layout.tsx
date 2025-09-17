import '../styles/globals.css';
import ReduxProvider from '@/stores/store';

export const metadata = { title: 'CRM Next (Redux)' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <ReduxProvider>
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}

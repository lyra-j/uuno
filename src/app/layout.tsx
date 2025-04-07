import type { Metadata } from 'next';

import './globals.css';
import Providers from '@/providers/tq-provider';
import AuthListener from '@/components/auth/auth-listener';
import Header from '@/components/layouts/header';
import AuthModal from '@/components/modals/auth/auth-modal';

export const metadata: Metadata = {
  title: 'Uuno',
  description: 'Uuno: You + uno',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <Providers>
          <AuthListener />
          <Header />
          <AuthModal />
          {children}
        </Providers>
      </body>
    </html>
  );
}

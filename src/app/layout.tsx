import type { Metadata } from 'next';

import './globals.css';
import Providers from '@/providers/tq-provider';
import Header from '@/components/layouts/tmp';

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
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

import './globals.css';
import Header from '../components/layouts/Header';

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
        <main>{children}</main>
      </body>
    </html>
  );
}

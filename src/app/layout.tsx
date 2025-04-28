import type { Metadata } from 'next';

import './globals.css';
import Providers from '@/providers/tq-provider';
import AuthListener from '@/components/auth/auth-listener';
import AuthModal from '@/components/modals/auth/auth-modal';
import Header from '@/components/layouts/header';
import KakaoScript from '@/components/card/kakao-script';
import { CommonModal } from '@/components/common/common-modal';
import 'swiper/css';

export const metadata: Metadata = {
  title: 'Uuno',
  description: '쉽고 간편하게 명함을 제작합니다',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://uuno.vercel.app/',
    siteName: 'Uuno',
    title: 'Uuno',
    description: '쉽고 간편하게 명함을 제작합니다',
    images: [
      {
        url: '/main-og.png',
        width: 1200,
        height: 630,
        alt: 'Uuno 소개 이미지',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <KakaoScript />
        <Providers>
          <AuthListener />
          <Header />
          <AuthModal />
          <CommonModal />
          <main className='mt-16'>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

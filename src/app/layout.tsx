import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/providers/tq-provider';
import AuthListener from '@/components/auth/auth-listener';
import AuthModal from '@/components/modals/auth/auth-modal';
import Header from '@/components/layouts/header';
import KakaoScript from '@/components/card/kakao-script';
import { CommonModal } from '@/components/common/common-modal';
import 'swiper/css';
import SheetProvider from '@/components/common/sheet-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Uuno',
  description:
    'Uuno에서 손쉽게 나만의 디지털 명함을 제작하고, 공유하세요. 간편하고 전문적인 명함 서비스를 경험해보세요.',
  keywords: [
    '명함 제작',
    '디지털 명함 제작',
    '디지털 명함',
    '온라인 명함',
    'Uuno',
    '명함 공유',
    '디지털 명함 공유',
    '명함 카드',
    '디지털 명함 카드',
    'Uuno',
  ],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://uuno.kr/',
    siteName: 'Uuno',
    title: 'Uuno',
    description: '쉽고 간편하고, 빠르게 디지털 명함을 만들어보세요!',
    images: [
      {
        url: '/main-og.png',
        width: 1200,
        height: 630,
        alt: 'Uuno 소개 이미지',
      },
    ],
  },
  robots: 'index follow',
};

export const viewport = {
  themeColor: '#3970D5',
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
          <Toaster />
          <CommonModal />
          <SheetProvider />
          <main className='mt-16'>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

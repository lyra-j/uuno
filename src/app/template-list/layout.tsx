import ScrollToTopButton from '@/components/main/ScrollToTopButton';
import TabButtons from '@/components/template-list/tab-buttons';
import { Metadata } from 'next';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: '디지털 명함 템플릿 - 쉽고 빠르게 시작하기 | Uuno',
  description:
    'Uuno에서 손쉽게 템플릿으로 나만의 디지털 명함을 시작해보세요. 심플, 트렌디한 디자인을 클릭 한 번으로 선택하세요.',
  keywords: [
    '디지털 명함 템플릿',
    '명함 템플릿',
    '디지털 명함 디자인',
    '명함 디자인',
    'Uuno',
  ],
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: '디지털 명함 템플릿 - Uuno',
    description:
      '심플한 것부터 감각적인 템플릿까지, 클릭만으로 디지털 명함을 완성하세요.',
    url: 'https://uuno.kr/template-list/simple',
    images: [
      {
        url: '/main/ex-card-1.png',
        width: 1200,
        height: 630,
        alt: '디지털 명함 템플릿 미리보기',
      },
    ],
  },
  themeColor: '#3970D5',
  robots: 'index follow',
};

const TemplateListLayout = ({ children }: Props) => {
  return (
    <section className='mx-auto mt-16 max-w-5xl px-11 max-md:px-8'>
      {/* 상단 문구 영역 */}
      <section className='mt-[138px] text-center text-black'>
        <h4 className='text-label2-medium'>간편하지만 전문적이게</h4>
        <h2 className='mt-2 text-landing-title max-sm:text-title-bold'>
          템플릿을 골라 제작해보세요
        </h2>
      </section>

      {/* 탭 & 버튼 영역 */}
      <TabButtons />
      {/* 탭 슬롯 : simple ,trendy */}
      <section>
        {children}
        <ScrollToTopButton />
      </section>
    </section>
  );
};

export default TemplateListLayout;

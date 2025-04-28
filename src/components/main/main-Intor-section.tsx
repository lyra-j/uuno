'use client';

import { ROUTES } from '@/constants/path.constant';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MainIntorSection = () => {
  return (
    <section
      className='relative h-[calc(100vh-64px)] bg-cover bg-center'
      style={{ backgroundImage: 'url(/main/main-bg.png)' }}
    >
      <div className='absolute inset-0 flex items-center justify-center px-4'>
        <div className='flex flex-col items-center justify-center gap-8 md:flex-row'>
          {/*텍스트영역 */}
          <div className='order-2 flex flex-col items-center space-y-[16px] text-center md:order-1 md:items-start md:text-left'>
            <div className='relative h-[50px] w-[120px] md:h-[64px] md:w-[150px]'>
              <Image
                src='/main-logo-black.png'
                alt='메인 대표 로고'
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <p className='text-body-medium md:text-title-medium'>
              누구나 쉽게 만들고, <br />
              간편하게 공유하는 스마트 명함
            </p>
            <div className='flex w-full flex-row justify-center gap-[12px] md:w-auto'>
              <Link href={ROUTES.EDITOR}>
                <button className='h-11 rounded-[46px] bg-primary-40 px-[22px] py-[6px] text-label2-medium text-white md:h-14 md:w-40 md:text-body-medium'>
                  바로 시작하기
                </button>
              </Link>
              <Link href={ROUTES.TEMPLATES.BASE}>
                <button className='h-11 rounded-[46px] bg-white px-4 py-[6px] text-label2-medium md:h-14 md:w-40 md:text-body-medium'>
                  템플릿 보러가기
                </button>
              </Link>
            </div>
          </div>

          {/*이미지영역 */}
          <div className='relative order-1 h-[374px] w-[294px] md:order-2 md:h-[650px] md:w-[510px]'>
            <Image
              src='/main/main-card-img.png'
              alt='메인 대표 명함'
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
      </div>
      <button
        className='absolute bottom-1 left-1/2 -translate-x-1/2 animate-bounce text-primary-40 md:bottom-7'
        aria-label='아래로 스크롤'
        onClick={() =>
          window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
        }
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default MainIntorSection;

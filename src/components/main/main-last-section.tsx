'use client';

import { ROUTES } from '@/constants/path.constant';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

const MainLastSection = () => {
  const mainCard = useMemo(
    () => Array.from({ length: 9 }, (_, i) => `/maincard/${i + 1}.jpg`),
    []
  );

  const extendedCard = useMemo(
    () => [...mainCard, ...mainCard, ...mainCard, ...mainCard],
    [mainCard]
  );

  return (
    <section className='relative flex h-[618px] w-full flex-col items-center justify-center overflow-hidden bg-black'>
      {/* 블러 배경 */}
      <div className='absolute left-1/2 top-24 z-0 h-[269px] w-[738px] -translate-x-1/2 rounded-[738px] bg-[rgba(141,171,227,0.5)] blur-[50px]' />

      {/* 카드 슬라이드 */}
      <div className='relative z-10 mt-5 flex h-[270px] w-full items-center overflow-hidden'>
        <div className='flex animate-moveLeft space-x-3 whitespace-nowrap'>
          {extendedCard.map((src, idx) => (
            <div
              key={`card-${idx}`}
              className='inline-block flex-shrink-0 overflow-hidden'
            >
              <Image
                src={src}
                alt={`리뷰 카드 ${(idx % mainCard.length) + 1}`}
                width={324}
                height={180}
                className='object-cover'
                priority={idx < mainCard.length}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 소개 문구 + 버튼 */}
      <div className='relative mt-20 flex flex-col items-center justify-center space-y-6 px-4 text-center'>
        <h2 className='text-title-bold text-white'>
          Uuno로 당신만의{' '}
          <span className='bg-gradient-to-r from-[#2C63C8] to-[#CEDFFE] bg-clip-text text-transparent'>
            디지털 명함
          </span>
          을 만들어보세요.
        </h2>
        <Link href={ROUTES.EDITOR}>
          <button className='h-[36px] w-[156px] rounded-[46px] bg-primary-40 px-[12px] py-[6px] text-label2-medium text-white'>
            바로 시작하기
          </button>
        </Link>

        <Link href={ROUTES.TEMPLATES.BASE}>
          <button className='flex items-center gap-[6px] text-label2-medium text-white hover:opacity-80'>
            템플릿 보러가기
            <Icon icon='tdesign:arrow-right' width={20} height={20} />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default MainLastSection;

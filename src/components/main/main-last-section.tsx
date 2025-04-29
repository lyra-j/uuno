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

  const mainLengthCard = useMemo(
    () =>
      Array.from(
        { length: 7 },
        (_, i) => `/maincard/length/length-${i + 1}.png`
      ),
    []
  );

  const extendedCard = [...mainCard, ...mainCard];
  const extendedLengthCard = useMemo(
    () => Array(4).fill(mainLengthCard).flat(),
    [mainLengthCard]
  );

  return (
    <section className='relative flex w-full flex-col items-center justify-center overflow-hidden bg-black md:h-[618px]'>
      {/* 블러 배경 */}
      <div className='absolute left-1/2 top-24 z-0 h-[718px] w-[269px] -translate-x-1/2 rounded-[738px] bg-[rgba(141,171,227,0.5)] blur-[50px] md:h-[269px] md:w-[738px]' />

      {/* 모바일: 세로 이미지 */}
      <div className='relative z-10 mt-20 flex h-[718px] w-full flex-col items-center overflow-hidden md:hidden'>
        <div className='flex animate-moveUp flex-col space-y-3 whitespace-nowrap'>
          {extendedLengthCard.map((src, idx) => (
            <div
              key={`length-card-${idx}`}
              className='inline-block flex-shrink-0 overflow-hidden'
            >
              <Image
                src={src}
                alt={`세로형 리뷰 카드 ${(idx % mainLengthCard.length) + 1}`}
                width={200}
                height={300}
                className='h-[300px] w-[200px] object-cover'
                priority={idx < mainLengthCard.length}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 데스크탑: 가로 이미지 */}
      <div className='relative z-10 mt-5 hidden h-[270px] w-full items-center overflow-hidden md:flex'>
        <div className='flex w-max animate-moveLeft flex-row space-x-3 whitespace-nowrap will-change-transform'>
          {extendedCard.map((src, idx) => (
            <div
              key={`card-${idx}`}
              className='inline-block flex-shrink-0 overflow-hidden'
            >
              <Image
                src={src}
                alt={`가로형 리뷰 카드 ${(idx % mainCard.length) + 1}`}
                width={324}
                height={180}
                className='h-[180px] w-[324px] object-cover'
                priority={idx < mainCard.length}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 소개 문구 + 버튼 */}
      <div className='relative mt-20 flex flex-col items-center justify-center space-y-6 px-4 text-center'>
        <h2 className='text-title-bold text-white'>
          Uuno로 당신만의 <br className='block md:hidden' />
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

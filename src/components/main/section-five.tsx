'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import React, { useMemo } from 'react';

const MainLastSection = () => {
  const mainCard = useMemo(
    () => Array.from({ length: 9 }, (_, i) => `/maincard/${i + 1}.jpg`),
    []
  );

  const extendedCard = useMemo(
    () => [...mainCard, ...mainCard, ...mainCard],
    [mainCard]
  );

  return (
    <section className='relative flex min-h-[618px] flex-col items-center justify-start bg-[#1A1A1A]'>
      {/* 슬라이드 */}
      <div className='relative z-10 mt-[150px] w-full overflow-hidden'>
        <div className='flex animate-moveLeft whitespace-nowrap'>
          {extendedCard.map((src, idx) => (
            <div
              key={`card-${idx}`}
              className='mx-2 inline-block w-[280px] flex-shrink-0 overflow-hidden'
            >
              <Image
                src={src}
                alt={`리뷰 카드 ${(idx % mainCard.length) + 1}`}
                width={280}
                height={160}
                className='rounded object-cover'
                priority={idx < mainCard.length}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 소개 문구 + 버튼 */}
      <div className='relative z-20 mt-20 flex flex-col items-center justify-center gap-6 bg-[#1A1A1A] px-4 text-center'>
        <h2 className='text-[20px] font-bold text-white'>
          Uuno로 당신만의 <span className='text-primary-40'>디지털 명함</span>을
          만들어보세요.
        </h2>

        <button className='flex h-[36px] w-[156px] items-center justify-center rounded-[46px] bg-primary-40 px-[12px] py-[6px] text-sm text-white'>
          바로 시작하기
        </button>

        <button className='flex items-center gap-[6px] text-label2-medium text-white hover:opacity-80'>
          템플릿 보러가기
          <Icon icon='tdesign:arrow-right' width={20} height={20} />
        </button>
      </div>

      {/* 푸터 */}
      <footer className='mt-48 w-full border-t border-white/10 px-6 py-12 text-white'>
        <div className='mx-auto flex max-w-6xl flex-col items-center gap-8 sm:flex-row sm:justify-between'>
          {/* 왼쪽 로고 */}
          <Image
            src='/logo-white.png'
            alt='Uuno 로고'
            width={80}
            height={24}
            className='object-contain'
          />

          {/* 오른쪽 정보 */}
          <div className='flex flex-col gap-4 text-[13px]'>
            {/* Developer 라인 */}
            <div className='flex flex-wrap items-center gap-4 font-normal'>
              <span className='font-semibold text-primary-40'>Developer</span>
              <span className='flex items-center gap-1 text-white/90'>
                <Icon icon='mdi:github' className='text-white/70' width={16} />
                장미경
              </span>
              <span className='flex items-center gap-1 text-white/90'>
                <Icon icon='mdi:github' className='text-white/70' width={16} />
                노수민
              </span>
              <span className='flex items-center gap-1 text-white/90'>
                <Icon icon='mdi:github' className='text-white/70' width={16} />
                최종욱
              </span>
              <span className='flex items-center gap-1 text-white/90'>
                <Icon icon='mdi:github' className='text-white/70' width={16} />
                강지수
              </span>
            </div>

            {/* Designer 라인 */}
            <div className='flex flex-wrap items-center gap-4 font-normal text-white/80'>
              <span className='font-semibold text-primary-40'>Designer</span>
              <span>최정화</span>
              <span>bonnibel2024@gmail.com</span>
              <span>서희령</span>
              <span>cotta1014@gmail.com</span>
            </div>
          </div>
        </div>

        <p className='mt-10 text-center text-xs text-white/50'>
          2025 Sparta Coding Club React Project | Team Uuno
        </p>
      </footer>
    </section>
  );
};

export default MainLastSection;

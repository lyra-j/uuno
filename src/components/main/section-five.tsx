'use client';
import Image from 'next/image';
import React, { useMemo } from 'react';

const Section5 = () => {
  const mainCard = useMemo(
    () => Array.from({ length: 9 }, (_, i) => `/maincard/${i + 1}.jpg`),
    []
  );

  const extendedCard = useMemo(
    () => [...mainCard, ...mainCard, ...mainCard],
    [mainCard]
  );
  return (
    <section className='flex h-screen flex-col items-center justify-center space-y-8 bg-[#1A1A1A]'>
      <div className='w-full overflow-hidden'>
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
                className='object-cover'
                priority={idx < mainCard.length}
              />
            </div>
          ))}
        </div>
      </div>

      <h2 className='mb-4 text-center text-4xl font-bold text-white'>
        Uuno로 당신만의 <span className='text-blue-500'>디지털 명함</span>을
        만들어보세요.
      </h2>
      <button className='rounded-2xl bg-blue-500 px-8 py-1 text-white'>
        바로 시작하기
      </button>
      <button className='px-8 py-1 text-white'>템플릿 보러가기 -&gt;</button>
    </section>
  );
};

export default Section5;

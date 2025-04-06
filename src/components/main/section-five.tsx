'use client';
import React, { useMemo } from 'react';

const Section5 = () => {
  // 임시 데이터: 15개 명함
  const dummyReviews = useMemo(() => Array.from({ length: 15 }), []);

  // 무한 슬라이드를 위해 배열을 3번 반복
  const extendedReviews = useMemo(
    () => [...dummyReviews, ...dummyReviews, ...dummyReviews],
    [dummyReviews]
  );

  return (
    <section className='flex h-screen flex-col items-center justify-center space-y-8 bg-gray-700'>
      <div className='w-full overflow-hidden'>
        <div className='flex animate-moveLeft whitespace-nowrap'>
          {extendedReviews.map((_, idx) => (
            <div key={`card-${idx}`} className='mx-2 bg-white p-28'>
              명함이 나옴
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
      <button className='bg-gray-700 px-8 py-1 text-white'>
        템플릿 보러가기 -&gt;
      </button>
    </section>
  );
};

export default Section5;

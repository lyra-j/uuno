import Image from 'next/image';
import React from 'react';

const Section35 = () => {
  return (
    <section className='relative h-[400px] w-full'>
      <Image
        src='/section35.png'
        alt='섹션3.5이미지'
        fill
        priority
        className='object-cover'
      />
      <div className='absolute bottom-12 left-1/2 z-10 -translate-x-1/2'>
        <button className='rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-blue-700'>
          지금 바로 명함을 생성해보세요!
        </button>
      </div>
    </section>
  );
};

export default Section35;

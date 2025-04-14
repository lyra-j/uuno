import Image from 'next/image';
import React from 'react';

const Section1 = () => {
  return (
    <section
      className='relative flex h-screen items-center justify-center gap-32 bg-cover bg-center'
      style={{ backgroundImage: 'url(/main-bg.png' }}
    >
      {/*text*/}
      <div className='z-1 relative flex flex-col'>
        <h2 className='mb-4 text-5xl font-bold'>Uuno</h2>
        <p className='mb-8 text-2xl'>
          누구나 쉽게 만들고, <br />
          간편하게 공유하는 스마트 명함
        </p>
        <div className='space-x-8'>
          <button className='rounded-3xl bg-blue-500 px-6 py-3 font-bold text-white'>
            바로 시작하기
          </button>
          <button className='rounded-3xl bg-white px-6 py-3 font-bold'>
            템플릿 보러가기
          </button>
        </div>
      </div>
      <Image src='/main-card.png' alt='메인명함' width={630} height={840} />
    </section>
  );
};

export default Section1;

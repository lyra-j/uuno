import Image from 'next/image';
import React from 'react';

const Section1 = () => {
  return (
    <section
      className='relative flex h-screen items-center justify-center gap-32 bg-cover bg-center'
      style={{ backgroundImage: 'url(/main-bg.png' }}
    >
      {/*text*/}
      <div className='z-1 relative flex flex-col space-y-4'>
        <h2 className='h-[59px] w-[153px] text-5xl font-bold'>Uuno</h2>
        <p className='text-title-medium'>
          누구나 쉽게 만들고, <br />
          간편하게 공유하는 스마트 명함
        </p>
        <div className='flex flex-row gap-3'>
          <button className='h-[56px] w-[162px] rounded-[46px] bg-primary-40 text-body-medium text-white'>
            <p className='px-3 py-[6px] text-body-medium'>바로 시작하기</p>
          </button>
          <button className='h-[56px] w-[162px] rounded-[46px] bg-white'>
            <p className='px-3 py-[6px] text-body-medium'>템플릿 보러가기</p>
          </button>
        </div>
      </div>
      <Image src='/main-image.png' alt='메인명함' width={1000} height={666} />
    </section>
  );
};

export default Section1;

import Image from 'next/image';
import React from 'react';

const Section35 = () => {
  return (
    <section
      className='flex h-[356px] flex-col items-center justify-center bg-cover bg-center'
      style={{ backgroundImage: 'url(/section35.png)' }}
    >
      <div className='flex flex-col items-center justify-center space-y-4'>
        <h1 className='text-4xl font-bold text-white'>Uuno˙</h1>
        <h2 className='text-center text-[40px] font-bold text-white'>
          스마트한 선택 디지털 명함
        </h2>
        <p className='text-title-medium text-white'>
          당신만의 개성이 담긴 디지털 명함으로 첫인상부터 특별하게, 자신을
          소개해보세요.
        </p>
        <button className='h-14 items-center justify-center rounded-[46px] bg-primary-40 px-3 text-body-medium text-white transition hover:bg-blue-600'>
          지금 바로 명함을 생성해보세요!
        </button>
      </div>
    </section>
  );
};

export default Section35;

import Image from 'next/image';
import React from 'react';

const Section1 = () => {
  return (
    <section
      className='relative h-screen bg-cover bg-center'
      style={{ backgroundImage: 'url(/main/main-bg.png)' }}
    >
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='flex flex-row items-center justify-center'>
          <div className='flex flex-col space-y-[16px]'>
            <h2 className='text-12 text-5xl font-bold text-primary-90'>
              Uuno˙
            </h2>
            <p className='text-title-medium'>
              누구나 쉽게 만들고, <br />
              간편하게 공유하는 스마트 명함
            </p>
            <div className='flex flex-row gap-[12px]'>
              <button className='h-14 w-40 rounded-[46px] bg-primary-40 text-body-medium text-white'>
                바로 시작하기
              </button>
              <button className='h-14 w-40 rounded-[46px] bg-white text-body-medium'>
                템플릿 보러가기
              </button>
            </div>
          </div>

          <div className='relative h-[650px] w-[510px]'>
            <Image
              src='/section1-main.png'
              alt='메인명함'
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;

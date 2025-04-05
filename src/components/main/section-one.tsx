import React from 'react';

const Section1 = () => {
  return (
    <section
      className='relative flex h-screen items-center justify-center bg-cover bg-center'
      style={{ backgroundImage: 'url(/main1.png' }}
    >
      {/* 어두운 반투명 오버레이 */}
      <div className='absolute inset-0 bg-black opacity-50' />

      {/*text*/}
      <div className='z-1 relative flex flex-col'>
        <h1 className='mb-4 text-5xl font-bold text-white'>Uuno</h1>
        <p className='mb-8 text-xl text-gray-300'>
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
    </section>
  );
};

export default Section1;

import Image from 'next/image';
import React from 'react';

const Section3 = () => {
  return (
    <section className='flex h-[1320px] flex-col items-center justify-center'>
      <div className='flex h-full w-full flex-col'>
        {/* 공유 */}
        <div className='relative h-1/2 w-full'>
          <div className='absolute inset-0 z-0 bg-white' />
          <div className='relative z-10 mx-auto flex h-full max-w-5xl flex-row-reverse items-center justify-between gap-24'>
            <div className='relative h-[300px] w-[400px] overflow-hidden'>
              <Image
                src='/assets1.png'
                alt='공유 이미지'
                fill
                className='object-cover'
              />
            </div>

            <div className='my-20 space-y-4'>
              <h2 className='text-4xl font-bold'>간편하게 공유하세요</h2>
              <p className='text-xl text-[#767D7D]'>
                공간의 제약 없이 소통하세요.
                <br />
                QR코드, 링크 복사, 이미지 저장으로
                <br />
                어디서든 연결될 수 있는 소통의 다리를 놓아보세요.
              </p>
            </div>
          </div>
        </div>

        {/* 분석 */}
        <div className='relative h-1/2 w-full'>
          <div className='absolute inset-0 z-0 bg-[#F1F3F6]' />
          <div className='relative z-10 mx-auto flex h-full max-w-5xl flex-row items-center justify-between gap-24'>
            <div className='relative h-[300px] w-[400px] overflow-hidden'>
              <Image
                src='/assets2.png'
                alt='공유 이미지'
                fill
                className='object-cover'
              />
            </div>
            <div className='my-20 space-y-4'>
              <h2 className='text-4xl font-bold'>손쉽게 분석하세요</h2>
              <p className='text-xl text-[#767D7D]'>
                데이터를 보는 나의 명함, 클릭 한 번으로 확인하세요.
                <br />
                방문자 유형, 링크와 항목 저장 현황을 분석해
                <br />더 효과적인 네트워크 도구로 발전시킬 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;

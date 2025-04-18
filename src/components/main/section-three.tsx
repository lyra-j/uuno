import Image from 'next/image';
import React from 'react';

const Section3 = () => {
  return (
    <section className='flex w-full flex-col items-center justify-center'>
      {/* 공유 블록 */}
      <div className='flex h-[608px] items-center justify-between gap-24 px-[164px] py-[227px]'>
        {/* 텍스트 */}
        <div className='flex flex-col items-start'>
          <h2 className='mb-[18px] text-landing-bold-l'>간편하게 공유하세요</h2>
          <p className='text-heading-medium text-gray-70'>
            공간의 제약 없이 소통하세요.
            <br />
            QR코드, 링크 복사, 이미지 저장으로
            <br />
            어디서든 연결될 수 있는 소통의 다리를 놓아보세요.
          </p>
        </div>
        {/* 이미지 */}
        <div className='relative h-[280px] w-[332px]'>
          <Image
            src='/main/section3-1.png'
            alt='공유 이미지'
            fill
            className='object-cover'
          />
        </div>
      </div>

      {/* 분석 블록 */}
      <div className='flex h-[608px] items-center justify-between gap-24 px-[164px] py-[227px]'>
        {/* 이미지 (왼쪽) */}
        <div className='relative h-[280px] w-[332px]'>
          <Image
            src='/main/section3-2.png'
            alt='공유 이미지'
            fill
            className='object-cover'
          />
        </div>
        {/* 텍스트  */}
        <div className='flex flex-col items-start'>
          <h2 className='mb-[18px] text-landing-bold-l'>손 쉽게 분석하세요</h2>
          <p className='text-heading-medium text-gray-70'>
            데이터로 보는 나의 명함, 클릭 한 번으로 확인하세요.
            <br />
            방문자 유입 경로와 명함 저장 현황을 분석해
            <br />더 효과적인 네트워킹 도구로 발전시킬 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Section3;

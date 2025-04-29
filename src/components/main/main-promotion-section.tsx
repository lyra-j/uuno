import { ROUTES } from '@/constants/path.constant';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MainPromotionSection = () => {
  return (
    <section
      className='flex h-[375px] flex-col items-center justify-center bg-cover bg-center'
      style={{
        backgroundImage: 'url(/main/main-promotion-img.jpg)',
        backgroundBlendMode: 'luminosity',
      }}
    >
      <div className='mb-[34px] flex flex-col items-center justify-center gap-4'>
        <Image
          src='/main-logo-black.png'
          alt='메인 로고'
          width={95}
          height={37}
          priority
        />
        <h2 className='text-center text-title-bold md:text-landing-bold-l'>
          디지털 명함의 스마트한 선택
        </h2>
        <p className='text-label1-medium md:text-title-medium'>
          당신만의 개성이 담긴 디지털 명함으로
          <br className='block md:hidden' /> 첫인상부터 특별하게 자신을
          소개해보세요.
        </p>
      </div>
      <Link href={ROUTES.EDITOR}>
        <button className='h-11 items-center justify-center rounded-[46px] border-none bg-primary-40 px-20 py-[6px] text-label2-medium text-white transition hover:bg-primary-50 md:h-14 md:w-[270px] md:px-3 md:py-[6px] md:text-body-medium'>
          바로 명함 생성하기
        </button>
      </Link>
    </section>
  );
};

export default MainPromotionSection;

import { ROUTES } from '@/constants/path.constant';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Section35 = () => {
  return (
    <section
      className='flex h-[356px] flex-col items-center justify-center bg-cover bg-center'
      style={{
        backgroundImage: 'url(/main/section35.png)',
        backgroundBlendMode: 'luminosity',
      }}
    >
      <div className='mb-[34px] flex flex-col items-center justify-center gap-4'>
        <Image src='/main-logo-black.png' alt='로고' width={92} height={36} />
        <h2 className='text-center text-landing-bold-l'>
          스마트한 선택 디지털 명함
        </h2>
        <p className='text-title-medium'>
          당신만의 개성이 담긴 디지털 명함으로 첫인상부터 특별하게, 자신을
          소개해보세요.
        </p>
      </div>
      <Link href={ROUTES.EDITOR}>
        <button className='h-14 w-[270px] items-center justify-center gap-4 rounded-[46px] border-none bg-primary-40 px-3 py-[6px] text-body-medium text-white transition hover:bg-primary-50'>
          바로 명함 생성하기
        </button>
      </Link>
    </section>
  );
};

export default Section35;

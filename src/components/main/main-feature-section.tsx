import { mainCard } from '@/constants/main.constant';
import { ROUTES } from '@/constants/path.constant';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MainFeatureSection = () => {
  return (
    <section className='flex w-full flex-col items-center'>
      {/* section1.5 */}
      <div className='flex min-h-[375px] w-full max-w-5xl items-center justify-center px-10 md:py-[120px]'>
        <div className='flex-col items-center justify-center'>
          <h2 className='text-center text-title-bold md:mb-[30px] md:text-landing-bold-m'>
            <span className='text-primary-40'>Uuno 디지털 명함</span>
            <span className='hidden md:inline md:text-primary-40'>, </span>
            <br className='block md:hidden' />
            스마트하게 나를 PR하는 법
          </h2>
          <p className='text-center text-label1-medium md:text-heading-medium'>
            누구나 쉽게 만들고, 간편하게 공유하는
            <br /> 스마트 명함으로 당신을 소개해보세요.
          </p>
        </div>
      </div>
      {/* section2 */}
      <div
        className='flex w-full flex-col items-center justify-center md:py-[120px]'
        style={{
          background: 'linear-gradient(0deg, #F7F9FC 0%, #FFFFFF 100%)',
        }}
      >
        <div className='mb-[89px] text-center'>
          <h2 className='mb-[18px] text-title-bold md:text-landing-bold-m'>
            간단하게 제작하세요
          </h2>
          <p className='text-label1-regular text-gray-70 md:text-heading-medium'>
            자신을 표현할 명함이 필요하신가요? <br />
            준비된 템플릿으로 시작해 당신만의 <br className='block md:hidden' />
            스타일로 커스터마이징해 보세요.
          </p>
        </div>

        <div className='mb-[120px] grid max-w-5xl grid-cols-1 gap-5 md:mb-0 md:grid-cols-3 lg:mb-0 lg:grid-cols-3 lg:gap-7'>
          {mainCard.map((el, idx) => (
            <div
              key={idx}
              className='group relative h-[290px] w-[286px] overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105 md:h-[230px] md:w-[233px] md:hover:scale-110 lg:h-[290px] lg:w-[286px]'
            >
              <Image
                src={el.link}
                alt={el.title}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 286px'
                priority
              />

              <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                <Link href={ROUTES.TEMPLATES.BASE}>
                  <button
                    className='rounded-full bg-white px-4 py-2 text-sm font-semibold shadow'
                    aria-label='템플릿 목록 페이지로 이동'
                  >
                    템플릿 보러가기
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainFeatureSection;

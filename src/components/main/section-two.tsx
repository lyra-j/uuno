import Image from 'next/image';
import React from 'react';

const card = [
  { title: '카드1번', link: '/simple31.png' },
  { title: '카드2번', link: '/simple32.png' },
  { title: '카드3번', link: '/simple33.png' },
];

const Section2 = () => {
  return (
    <section className='flex w-full flex-col items-center'>
      {/* section1.5 */}
      <div className='flex h-[396px] max-w-5xl items-center justify-center'>
        <div className='flex-col items-center justify-center'>
          <h2 className='mb-[30px] text-center text-[32px] font-bold'>
            <span className='text-primary-40'>Uuno 디지털 명함, </span>
            스마트하게 나를 PR하는 법
          </h2>
          <p className='text-center text-heading-medium'>
            누구나 쉽게 만들고, 간편하게 공유하는
            <br /> 스마트 명함으로 당신을 소개해보세요.
          </p>
        </div>
      </div>
      {/* section2 */}
      <div className='flex h-[768px] max-w-5xl flex-col items-center justify-center'>
        <div className='mb-[89px] text-center'>
          <h2 className='mb-[18px] text-landing-bold-l'>간단하게 제작하세요</h2>
          <p className='text-heading-medium text-gray-70'>
            자신을 표현할 명함이 필요하신가요? <br />
            준비된 템플릿으로 시작해 당신만의 스타일로 커스터마이징해 보세요.
          </p>
        </div>

        <div className='grid max-w-5xl grid-cols-3 gap-20'>
          {card.map((el, idx) => (
            <div
              key={idx}
              className='group relative h-[290px] w-[286px] overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-125'
            >
              <Image
                src={el.link}
                alt={el.title}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 286px'
              />

              <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                <button className='rounded-full bg-white px-4 py-2 text-sm font-semibold shadow'>
                  템플릿 보러가기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;

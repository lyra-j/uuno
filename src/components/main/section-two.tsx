import Image from 'next/image';
import React from 'react';

const card = [
  { title: '카드1번', link: '/card1.jpg.png' },
  { title: '카드2번', link: '/card2.jpg.png' },
  { title: '카드3번', link: '/card2.jpg.png' },
];

const Section2 = () => {
  return (
    <section className='mx-auto flex w-full flex-col items-center justify-center bg-[linear-gradient(0deg,_#F7F9FC_0%,_#FFF_100%)]'>
      {/* 1.5섹션 */}
      <div className='flex h-[396px] flex-col items-center justify-center'>
        <h1 className='mb-7 text-3xl font-bold'>
          <span className='text-blue-500'>Uuno 디지털 명함,</span> 스마트하게
          나를 PR하는 법
        </h1>
        <p className='text-2xl leading-[42px]'>
          누구나 쉽게 만들고, 간편하게 공유하는
          <br /> 스마트 명함으로 당신을 소개해보세요.
        </p>
      </div>

      {/* 섹션2 */}
      <div className='mx-auto flex h-[768px] max-w-5xl flex-col'>
        <div className='my-20 space-y-4 text-center'>
          <h2 className='text-4xl font-bold'>간단하게 제작하세요</h2>
          <p className='text-xl text-[#767D7D]'>
            자신을 표현할 명함이 필요하신가요? <br />
            준비된 템플릿으로 시작해 당신만의 스타일로 커스터마이징해 보세요.
          </p>
        </div>

        {/* 이미지 3개 */}
        <div className='grid grid-cols-1 gap-20 md:grid-cols-3'>
          {card.map((el, idx) => (
            <div
              key={idx}
              className='group relative h-[300px] w-[286px] overflow-hidden rounded-2xl shadow-md transition-transform duration-300 hover:scale-125'
            >
              <Image
                src={el.link}
                alt={el.title}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 286px'
              />
              {/* Hover시*/}
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

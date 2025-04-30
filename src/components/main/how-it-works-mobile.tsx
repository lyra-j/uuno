'use client';

import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import {
  mainIconList,
  mainSectionContent,
  mainVideoPaths,
} from '@/constants/main.constant';

const HowItWorksMobile = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef<SwiperType>();

  return (
    <section className='flex flex-col items-center justify-center py-20'>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        spaceBetween={24}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className='flex w-full'
      >
        {mainVideoPaths.map((currentVideo, idx) => (
          <SwiperSlide key={idx}>
            {/* video */}
            <div className='flex w-full flex-col items-start justify-start'>
              <div className='relative mb-6 h-[235px] w-full'>
                <video
                  key={currentVideo}
                  src={currentVideo}
                  className='h-full w-full rounded-md object-contain transition-opacity duration-500'
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>

              {/* 텍스트 */}
              <div className='flex w-full flex-col items-start justify-start px-[56px]'>
                <h2 className='mb-2 text-start text-heading-bold text-primary-40'>
                  {mainSectionContent[idx].title}
                </h2>
                <h3 className='mb-3 text-label1-medium text-primary-80'>
                  {mainSectionContent[idx].subtitle}
                </h3>
                <p className='whitespace-pre-line text-label2-regular text-gray-70'>
                  {mainSectionContent[idx].content}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 아이콘 바 */}
      <div className='mt-16 flex gap-6 rounded-[100px] bg-gray-5 px-[20px] py-[6px]'>
        {mainIconList.map((icon, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveIndex(idx);
              swiperRef.current?.slideTo(idx);
            }}
            aria-label={`${mainSectionContent[idx].title} 슬라이드로 이동`}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? 'scale-110 bg-primary-40 text-white'
                : 'text-[#B0B0B0] hover:scale-110 hover:text-primary-40'
            }`}
          >
            <Icon icon={icon} width={18} height={18} />
          </button>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksMobile;

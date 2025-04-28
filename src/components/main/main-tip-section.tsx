'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const MainTipSection = () => {
  return (
    <section className='flex w-full flex-col items-center justify-center overflow-hidden'>
      {/* 분석 블록 */}
      <motion.div
        initial={{ opacity: 0, x: -120 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.4 }}
        className='flex h-[608px] w-full flex-col items-center justify-center gap-6 md:flex-row md:gap-24 lg:px-[222px] lg:py-[227px]'
      >
        {/* 이미지 (왼쪽) */}
        <div className='relative h-[248px] w-full max-w-[294px] md:h-[280px] md:w-full md:max-w-[332px]'>
          <Image
            src='/main/statistics-img.png'
            alt='통계 이미지'
            fill
            className='object-cover'
          />
        </div>
        {/* 텍스트  */}
        <div className='flex flex-col items-start'>
          <h2 className='mb-[18px] text-title-bold md:text-landing-bold-m'>
            손 쉽게 분석하세요
          </h2>
          <p className='text-label2-medium text-gray-70 md:text-heading-medium'>
            데이터로 보는 나의 명함, 클릭 한 번으로 확인하세요.
            <br />
            방문자 유입 경로와 명함 저장 현황을 분석해
            <br />더 효과적인 네트워킹 도구로 발전시킬 수 있습니다.
          </p>
        </div>
      </motion.div>

      {/* 공유 블록 */}
      <motion.div
        initial={{ opacity: 0, x: 120 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.4 }}
        className='flex w-full flex-col-reverse items-center justify-center gap-6 md:h-[608px] md:flex-row md:gap-24 lg:px-[222px] lg:py-[227px]'
        style={{
          background: 'linear-gradient(0deg, #F7F9FC 0%, #FFFFFF 100%)',
        }}
      >
        {/* 텍스트 */}
        <div className='mb-16 flex flex-col items-start md:mb-0'>
          <h2 className='mb-[18px] text-title-bold md:text-landing-bold-m'>
            간편하게 공유하세요
          </h2>
          <p className='text-label2-medium text-gray-70 md:text-heading-medium'>
            공간의 제약 없이 소통하세요.
            <br />
            QR코드, 링크 복사, 이미지 저장으로
            <br />
            어디서든 연결될 수 있는 소통의 다리를 놓아보세요.
          </p>
        </div>
        {/* 이미지 */}
        <div className='relative h-[248px] w-full max-w-[294px] md:h-[280px] md:max-w-[332px]'>
          <Image
            src='/main/share-img.png'
            alt='공유 이미지'
            fill
            className='object-cover'
          />
        </div>
      </motion.div>
    </section>
  );
};

export default MainTipSection;

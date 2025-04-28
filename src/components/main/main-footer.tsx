'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import React from 'react';

const MainFooter = () => {
  const developers = ['장미경', '노수민', '최종욱', '강지수'];

  const designers = [
    { name: '최정화', email: 'bonnibel2024@gmail.com' },
    { name: '서희령', email: 'cotta1014@gmail.com' },
  ];

  return (
    <footer className='w-full bg-[#1A1A1A]'>
      {/* 1) Developer/Designer 라인 (높이 128px) */}
      <div className='mx-[128px] flex h-[128px] items-center justify-center gap-[296px]'>
        {/* 왼쪽 로고 */}
        <Image
          src='/logo-white.png'
          alt='Uuno 로고'
          width={80}
          height={38}
          className='object-contain'
        />

        {/* 오른쪽 정보 */}
        <div className='flex flex-col space-y-3 text-label2-medium text-gray-70'>
          {/* Developer */}
          <div className='flex flex-wrap items-center space-x-7'>
            <span className='text-label2-medium text-primary-60'>
              Developer
            </span>
            {developers.map((dev) => (
              <span key={dev} className='flex items-center gap-[6px]'>
                <Icon icon='mdi:github' className='text-gray-70' width={18} />
                {dev}
              </span>
            ))}
          </div>
          {/* Designer */}
          <div className='flex flex-wrap items-center space-x-7'>
            <span className='text-label2-medium text-primary-60'>Designer</span>
            {designers.map((des) => (
              <div key={des.name} className='flex items-center space-x-7'>
                <span>{des.name}</span>
                <span>{des.email}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 구분선 (높이 1px) */}
      <div className='mx-auto h-[1px] max-w-[1024px] bg-gray-90' />

      {/*  카피라이트  */}
      <div className='mx-[128px] flex h-[42px] items-center justify-center'>
        <p className='text-center text-label2-medium text-gray-90'>
          2025 Sparta Coding Club React Project | Team Uuno
        </p>
      </div>
    </footer>
  );
};

export default MainFooter;

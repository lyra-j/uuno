import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import React from 'react';

const MainFooter = () => {
  const developers = [
    { name: '장미경', github: 'https://github.com/lyra-j' },
    { name: '노수민', github: 'https://github.com/sum529-create' },
    { name: '최종욱', github: 'https://github.com/woozizi' },
    { name: '강지수', github: 'https://github.com/K-jisu' },
  ];

  const designers = [
    { name: '최정화', email: 'bonnibel2024@gmail.com' },
    { name: '서희령', email: 'cotta1014@gmail.com' },
  ];

  return (
    <footer className='w-full bg-black'>
      {/* 1) Developer/Designer 라인 (높이 128px) */}
      <div className='mx-auto flex max-w-5xl flex-col items-center justify-between px-16 md:h-[128px] md:flex-row'>
        {/* 왼쪽 로고 */}
        <Image
          src='/logo-white.png'
          alt='Uuno 로고'
          width={80}
          height={38}
          className='my-[200px] h-[46px] w-[119px] object-contain md:my-0 md:h-[38px] md:w-[80px]'
        />

        {/* 오른쪽 정보 */}
        <div className='mb-[34px] flex flex-row space-x-[42px] text-label2-medium text-gray-70 md:mb-0 md:flex-col md:space-x-0 md:space-y-3'>
          {/* Developer */}
          <div className='flex flex-col items-center space-y-[10px] md:flex-row md:flex-wrap md:justify-start md:space-x-7 md:space-y-0'>
            <span className='text-label1-bold text-primary-60 md:text-label2-medium'>
              Developer
            </span>
            {developers.map((dev) => (
              <a
                key={dev.name}
                href={dev.github}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-[6px] hover:underline'
              >
                <Icon icon='mdi:github' className='text-gray-70' width={18} />
                {dev.name}
              </a>
            ))}
          </div>
          {/* Designer */}
          <div className='flex flex-col items-center space-y-[10px] md:flex-row md:flex-wrap md:justify-start md:space-x-7 md:space-y-0'>
            <span className='text-label1-bold text-primary-60 md:text-label2-medium'>
              Designer
            </span>
            {designers.map((des) => (
              <div
                key={des.name}
                className='flex flex-col items-center md:flex-row md:space-x-7'
              >
                <span>{des.name}</span>
                <span>{des.email}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 구분선 (높이 1px) */}
      <div className='mx-auto h-[1px] max-w-5xl bg-gray-90' />

      {/*  카피라이트  */}
      <div className='flex h-[42px] items-center justify-center md:mx-[128px]'>
        <p className='text-center text-label2-medium text-gray-90 md:text-label2-medium'>
          2025 Sparta Coding Club React Project | Team Uuno
        </p>
      </div>
    </footer>
  );
};

export default MainFooter;

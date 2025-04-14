import { ROUTES } from '@/constants/path.constant';
import Link from 'next/link';
import React from 'react';
import { Icon } from '@iconify/react';

const CreatNewCard = () => {
  return (
    <Link
      href={ROUTES.EDITOR}
      className='flex aspect-[9/5] w-[220px] cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-40 transition-colors hover:bg-gray-10'
    >
      <div className='flex flex-col items-center justify-center text-extra-medium text-gray-40'>
        <Icon icon='mdi:add' width='26' height='26' />
        새로운 명함 만들기
      </div>
    </Link>
  );
};

export default CreatNewCard;

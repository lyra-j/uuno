'use client';
import { ROUTES } from '@/constants/path.constant';
import { formatToDateString } from '@/utils/interaction/format-date';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CardData {
  id: string;
  title: string;
  createdAt: string;
  thumbnail: string | null;
}

const CardItem = ({ card }: { card: CardData }) => {
  const formattedDate = formatToDateString(new Date(card.createdAt)).split(
    ' '
  )[0];

  return (
    <div>
      <Link href={`${ROUTES.MYCARD}/${card.id}`}>
        <div className='group relative flex w-[220px] cursor-pointer flex-col'>
          {/* 썸네일 */}
          {card.thumbnail ? (
            <div className='relative aspect-[9/5] w-full overflow-hidden rounded-xl'>
              <Image
                src={card.thumbnail}
                alt={card.title}
                fill
                objectFit='cover'
                className='transition-opacity duration-200 hover:bg-black/90'
              />
            </div>
          ) : (
            <div className='aspect-[9/5] w-full rounded-xl bg-black/20 hover:bg-black/90' />
          )}
        </div>
      </Link>

      {/* 제목과 날짜 */}
      <div className='mt-2 text-label2-medium text-black'>
        {card.title || '제목을 입력해주세요...'}
      </div>
      <div className='py-1 text-caption-medium text-gray-70'>
        {formattedDate}
      </div>
    </div>
  );
};

export default CardItem;

'use client';
import React from 'react';

// 테스트용
interface CardData {
  id: string;
  title: string;
  createdAt: string;
}

const CardItem = ({ card }: { card: CardData }) => {
  return (
  <div className='group relative flex flex-col'>
    <div className='bg-black/20 rounded-xl w-[220px] h-[122px] hover:bg-black/90'>test</div>
    <div className='text-label2-medium text-black mt-2'>{card.title || '제목을 입력해주세요...'}</div>
    <div className='text-caption-medium text-gray-70 py-1'>{card.createdAt}</div>
  </div>
);
};

export default CardItem;

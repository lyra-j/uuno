'use client';

import { Templates } from '@/types/supabase.type';
import Image from 'next/image';
import React from 'react';

interface Props {
  template: Templates;
  onPreview: (imageUrl: string) => void;
}

const TemplateCard = ({ template, onPreview }: Props) => {
  return (
    <li className='group relative h-[274px] w-[278px] rounded'>
      {/* 현재 썸네일 null 허용이지만 템플릿들이 올라갈때는 null 비허용으로 바꿀 예정입니다 */}
      <Image
        src={template.thumbnail ?? '/placeholder.png'}
        alt={template.name}
        fill
        className='rounded-xl object-cover'
        sizes='(max-width: 768px) 100vw, 278px'
      />

      {/* hover 상태 오버레이 영역 */}
      <div className='absolute inset-0 flex flex-col items-center justify-center gap-2.5 rounded-xl bg-black/60 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
        {/* 추후 버튼 컴포넌트화 및 해당 템플릿으로 에디터 연결 */}
        <button className='text-label2-m rounded-full bg-primary-40 px-4 py-2 text-white'>
          디자인 선택하기
        </button>
        <button
          onClick={() => template.thumbnail && onPreview(template.thumbnail)}
          className='rounded-full bg-white px-4 py-2 text-sm font-medium text-[#1a1a1a]'
        >
          미리보기
        </button>
      </div>
    </li>
  );
};

export default TemplateCard;

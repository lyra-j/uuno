'use client';
import clsx from 'clsx';
import { useState } from 'react';

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const CARD_DEFAULT_STYLE =
    'bg-slate-700 absolute flex justify-center items-center backface-hidden w-[240px] h-[150px] shadow-xl rounded-lg';
  const CARD_DEFAULT_WRAPPER_STYLE =
    'relative transition-transform duration-1000 cursor-pointer transform-style-preserve-3d';

  return (
    <div className='relative flex flex-1 flex-col items-center justify-between'>
      <div className='flex flex-col items-center justify-center'>
        <div className='relative mb-4 flex items-center justify-center'>
          <div className='m-5 h-[150px] w-[240px] perspective-1000'>
            <div
              className={clsx(
                CARD_DEFAULT_WRAPPER_STYLE,
                isFlipped && 'rotate-y-180'
              )}
            >
              <div className={CARD_DEFAULT_STYLE}>front</div>
              <div className={clsx(CARD_DEFAULT_STYLE, 'rotate-y-180')}>
                back
              </div>
            </div>
          </div>
          <button
            className='absolute bottom-0 z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#DADADA33] text-[18px] text-[#1a1a1a] shadow-md'
            onClick={() => setIsFlipped((pre: boolean) => !pre)}
          >
            -
          </button>
        </div>
        <button className='mb-2 flex w-full justify-center rounded-full bg-[#3970D5] px-3 py-[10px] text-[14px] text-white'>
          편집하기
        </button>
        <button className='flex w-full justify-center rounded-full bg-[#F4F4F5] px-3 py-[10px] text-[14px]'>
          저장 및 공유하기
        </button>
        <div className='my-5 mb-3 h-[1px] w-full bg-[#F5F6FA]' />
        <span className='cursor-pointer text-[14px] text-[#878A93]'>
          공유 화면 미리보기
        </span>
      </div>
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='my-5 mb-3 h-[1px] w-full bg-[#F5F6FA]' />
        <span className='cursor-pointer text-[14px] text-[#878A93]'>
          삭제하기
        </span>
      </div>
    </div>
  );
};

export default FlipCard;

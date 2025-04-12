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
            className='absolute bottom-0 z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gray-5 text-body-regular text-black shadow-md'
            onClick={() => setIsFlipped((pre: boolean) => !pre)}
          >
            -
          </button>
        </div>
        <button className='mb-2 flex w-full justify-center rounded-full bg-primary-40 px-3 py-[10px] text-label2-regular text-white'>
          편집하기
        </button>
        <button className='flex w-full justify-center rounded-full bg-gray-5 px-3 py-[10px] text-label2-regular'>
          저장 및 공유하기
        </button>
        <div className='my-5 mb-3 h-[1px] w-full bg-bg' />
        <span className='cursor-pointer text-label2-regular text-gray-60'>
          공유 화면 미리보기
        </span>
      </div>
      <div className='mb-9 flex w-full flex-col items-center justify-center'>
        <div className='my-5 mb-3 h-[1px] w-full bg-bg' />
        <span className='cursor-pointer text-label2-regular text-gray-60'>
          삭제하기
        </span>
      </div>
    </div>
  );
};

export default FlipCard;

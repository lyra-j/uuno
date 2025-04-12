'use client';
import clsx from 'clsx';
import { useState } from 'react';
import FlipArrow from '../icons/flip-arrow';

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const CARD_DEFAULT_STYLE =
    'bg-slate-700 absolute flex justify-center items-center backface-hidden w-[240px] h-[150px] shadow-xl rounded-lg';
  const CARD_DEFAULT_WRAPPER_STYLE =
    'relative transition-transform duration-1000 cursor-pointer transform-style-preserve-3d';

  return (
    <div className='relative mb-4 flex items-center justify-center'>
      <div className='m-5 h-[150px] w-[240px] perspective-1000'>
        <div
          className={clsx(
            CARD_DEFAULT_WRAPPER_STYLE,
            isFlipped && 'rotate-y-180'
          )}
        >
          <div className={CARD_DEFAULT_STYLE}>front</div>
          <div className={clsx(CARD_DEFAULT_STYLE, 'rotate-y-180')}>back</div>
        </div>
      </div>
      <div
        onClick={() => setIsFlipped((pre: boolean) => !pre)}
        className='absolute bottom-0 z-10 h-[34px] w-[34px] cursor-pointer'
      >
        <FlipArrow />
      </div>
    </div>
  );
};

export default FlipCard;

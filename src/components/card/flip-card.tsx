'use client';
import clsx from 'clsx';
import { useState } from 'react';
import FlipArrow from '../icons/flip-arrow';

interface FlipCardParam {
  attached?: boolean;
}

const FlipCard = ({ attached }: FlipCardParam) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const CARD_DEFAULT_STYLE =
    'bg-slate-700 absolute flex justify-center items-center backface-hidden w-full shadow-[37px_108px_32px_0px_rgba(0,0,0,0.00),24px_69px_29px_0px_rgba(0,0,0,0.01),13px_39px_25px_0px_rgba(0,0,0,0.05),6px_17px_18px_0px_rgba(0,0,0,0.09),1px_4px_10px_0px_rgba(0,0,0,0.10)] aspect-[9/5]';
  const CARD_DEFAULT_WRAPPER_STYLE =
    'relative transition-transform duration-1000 cursor-pointer transform-style-preserve-3d';
  const CARD_DEFAULT_BUTTON_STYLE = 'z-10 h-[34px] w-[34px] cursor-pointer';
  const CARD_DEFAULT_BUTTON_STYLE_ATTACHED = 'absolute bottom-0';

  return (
    <div className='relative mb-4 flex w-full flex-col items-center justify-center'>
      <div className='m-5 aspect-[9/5] w-full perspective-1000'>
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
        className={clsx(
          CARD_DEFAULT_BUTTON_STYLE,
          attached && CARD_DEFAULT_BUTTON_STYLE_ATTACHED
        )}
      >
        <FlipArrow />
      </div>
    </div>
  );
};

export default FlipCard;

import clsx from 'clsx';
import FlipArrow from '../icons/flip-arrow';

interface CardSkeletonProps {
  attached?: boolean;
}

const CardSkeleton = ({ attached }: CardSkeletonProps) => {
  const CARD_DEFAULT_STYLE =
    'bg-slate-700 absolute flex justify-center items-center backface-hidden w-full shadow-[37px_108px_32px_0px_rgba(0,0,0,0.00),24px_69px_29px_0px_rgba(0,0,0,0.01),13px_39px_25px_0px_rgba(0,0,0,0.05),6px_17px_18px_0px_rgba(0,0,0,0.09),1px_4px_10px_0px_rgba(0,0,0,0.10)] aspect-[9/5]';
  const CARD_DEFAULT_WRAPPER_STYLE =
    'relative transition-transform duration-1000 cursor-pointer transform-style-preserve-3d';
  const CARD_DEFAULT_BUTTON_STYLE = 'z-10 h-[34px] w-[34px] cursor-pointer';
  const CARD_DEFAULT_BUTTON_STYLE_ATTACHED = 'absolute bottom-[-18px]';

  return (
    <div className='relative mb-11 flex w-full flex-col items-center justify-center'>
      <div className='m-5 aspect-[9/5] w-full perspective-1000'>
        <div className={CARD_DEFAULT_WRAPPER_STYLE}>
          <div
            className={clsx(CARD_DEFAULT_STYLE, 'animate-pulse bg-gray-200')}
          >
            <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
              <div className='h-6 w-1/2 animate-pulse rounded-md bg-gray-300'></div>
              <div className='h-4 w-1/3 animate-pulse rounded-md bg-gray-300'></div>
              <div className='h-4 w-2/3 animate-pulse rounded-md bg-gray-300'></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          CARD_DEFAULT_BUTTON_STYLE,
          attached && CARD_DEFAULT_BUTTON_STYLE_ATTACHED,
          'opacity-50'
        )}
      >
        <FlipArrow />
      </div>
    </div>
  );
};

export default CardSkeleton;

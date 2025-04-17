import clsx from 'clsx';
import FlipArrow from '../icons/flip-arrow';

interface ErrorCardProps {
  isDetail: boolean;
  error: Error;
}

const ErrorCard = ({ isDetail, error }: ErrorCardProps) => {
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
          <div className={clsx(CARD_DEFAULT_STYLE, 'bg-red-50')}>
            <div className='flex h-full w-full flex-col items-center justify-center p-4 text-center'>
              <p className='font-medium text-red-500'>
                카드 정보를 불러오는 중 오류가 발생했습니다
              </p>
              <p className='mt-2 text-sm text-red-400'>{error.message}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          CARD_DEFAULT_BUTTON_STYLE,
          isDetail && CARD_DEFAULT_BUTTON_STYLE_ATTACHED
        )}
      >
        <FlipArrow />
      </div>
    </div>
  );
};

export default ErrorCard;

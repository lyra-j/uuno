import clsx from 'clsx';
import FlipArrow from '../icons/flip-arrow';
import { useEffect, useState } from 'react';

interface CardSkeletonProps {
  usage?: 'detail' | 'viewer'; // 'detail' = card/[...id], 'viewer' = [...slug]
}

const CardSkeleton = ({ usage = 'viewer' }: CardSkeletonProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 함
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 초기 실행
    checkMobile();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', checkMobile);

    // 클린업
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 스타일 분기
  let wrapperClass = '';
  let cardClass = '';
  let buttonClass = '';

  if (usage === 'detail') {
    // 명함 상세
    wrapperClass = 'px-3 py-4 bg-bg';
    cardClass = 'h-[150px] w-[270px]';
    buttonClass = 'absolute bottom-[-36px]';
  } else {
    // 명함 뷰어
    wrapperClass = 'mx-[25px] mb-[66px] md:w-auto';
    cardClass = 'w-full aspect-[9/5] h-auto md:h-[244px] md:w-[468px]';
    buttonClass = 'mt-4 md:absolute md:bottom-[-54px]';
  }

  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center ${wrapperClass}`}
    >
      <div className={`relative perspective-1000 ${cardClass}`}>
        <div className='relative flex h-full w-full justify-center transform-style-preserve-3d'>
          <div className='absolute flex h-full w-full items-center justify-center rounded-md bg-gray-200 shadow-md'>
            <div className='flex h-full w-full flex-col items-center justify-center gap-4 p-4'>
              <div className='h-6 w-1/2 animate-pulse rounded-md bg-gray-300'></div>
              <div className='h-4 w-1/3 animate-pulse rounded-md bg-gray-300'></div>
              <div className='h-4 w-2/3 animate-pulse rounded-md bg-gray-300'></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`z-10 h-[40px] w-[40px] cursor-pointer opacity-50 ${buttonClass}`}
      >
        <FlipArrow />
      </div>
    </div>
  );
};

export default CardSkeleton;

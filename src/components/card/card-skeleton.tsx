import clsx from 'clsx';
import FlipArrow from '../icons/flip-arrow';
import { useEffect, useState } from 'react';

interface CardSkeletonProps {
  isDetail?: boolean;
}

const CardSkeleton = ({ isDetail }: CardSkeletonProps) => {
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

  return (
    <div className='relative mx-[25px] mb-[66px] flex w-full flex-col items-center justify-center md:w-auto'>
      <div
        className={clsx(
          'relative perspective-1000',
          isDetail
            ? 'h-[150px] w-[270px]'
            : isMobile
              ? 'aspect-[9/5] w-full'
              : 'h-[244px] w-[468px]'
        )}
      >
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
        className={clsx(
          'z-10 h-[40px] w-[40px] cursor-pointer opacity-50',
          isDetail ? 'absolute bottom-[-36px]' : 'absolute bottom-[-54px]'
        )}
      >
        <FlipArrow />
      </div>
    </div>
  );
};

export default CardSkeleton;

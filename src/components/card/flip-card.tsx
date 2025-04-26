'use client';
import clsx from 'clsx';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import FlipArrow from '@/components/icons/flip-arrow';
import { usePathname, useSearchParams } from 'next/navigation';
import { useInteractionTracker } from '@/hooks/use-interaction-tracker';
import { useCardContent } from '@/hooks/queries/use-card-interaction';
import CardSkeleton from './card-skeleton';
import ErrorCard from './error-card';
import useCardSlug from '@/hooks/queries/use-card-slug';
import CardStageViewer, { CardStageViewerRef } from './konva-stage-viewer';
import Image from 'next/image';

interface FlipCardParam {
  isDetail?: boolean;
}

// 외부에서 접근할 메서드를 위한 타입 정의
export interface FlipCardRef {
  exportCardImages: () => Promise<{ front: Blob | null; back: Blob | null }>;
  flipCard: () => void;
}

const FlipCard = forwardRef<FlipCardRef, FlipCardParam>(({ isDetail }, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const frontCardRef = useRef<CardStageViewerRef>(null);
  const backCardRef = useRef<CardStageViewerRef>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부에서 호출 가능한 메서드 정의
  useImperativeHandle(ref, () => ({
    exportCardImages: async () => {
      try {
        if (!isDetail) {
          const [front, back] = await Promise.all([
            frontCardRef.current?.exportAsImage() ?? Promise.resolve(null),
            backCardRef.current?.exportAsImage() ?? Promise.resolve(null),
          ]);
          return { front, back };
        }
        return { front: null, back: null };
      } catch (error) {
        console.error('Error exporting images:', error);
        return { front: null, back: null };
      }
    },
    flipCard: () => {
      setIsFlipped((prev) => !prev);
    },
  }));

  // 추적 세션 초기화
  useEffect(() => {
    setStartedAt(new Date());
  }, []);

  // 모바일 기기 감지
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const checkMobile = () => setIsMobile(mq.matches);
    mq.addEventListener?.('change', checkMobile);

    // 초기 체크 및 이벤트 리스너 등록
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일에서 카드 크기 조정 처리
  useEffect(() => {
    if (!isMobile || !containerRef.current) {
      setSize({ width: 0, height: 0 });
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  // 카드 데이터 가져오기
  const pathname = usePathname();
  const pathArray = pathname.split('/')[1];
  const cardId = pathname.split('/')[2];

  const { data: slug } = useCardSlug(cardId, {
    enabled: isDetail,
  });

  // 소스 파라미터 처리
  const searchParams = useSearchParams();
  const source = (() => {
    const param = searchParams.get('source');
    if (
      param === 'direct' ||
      param === 'qr' ||
      param === 'link' ||
      param === 'tag'
    ) {
      return param;
    }
    return null;
  })();

  // 인터랙션 트래커 설정
  const { handleClick } = useInteractionTracker({
    slug: isDetail ? slug || '' : pathArray,
    source,
    startedAt,
  });

  // 카드 콘텐츠 가져오기
  const { data, isPending, error } = useCardContent(
    isDetail ? slug || '' : pathArray
  );

  // 로딩 중일 때 스켈레톤 UI
  if (isPending) {
    return <CardSkeleton isDetail={isDetail} />;
  }

  // 에러 발생 시 에러 UI
  if (error) {
    return <ErrorCard isDetail={!!isDetail} error={error} />;
  }

  // 카드 크기 계산
  const getCardDimensions = () => {
    // 카드가 자세히 보기 모드인 경우
    if (isDetail) {
      return data.isHorizontal
        ? { width: 'w-[270px]', height: 'h-[150px]' }
        : { width: 'w-[150px]', height: 'h-[270px]' };
    }

    // 모바일인 경우
    if (isMobile) {
      return data.isHorizontal
        ? { width: 'w-full', height: 'aspect-[9/5]' }
        : { width: 'w-full', height: 'aspect-[5/9]' };
    }

    // 데스크톱인 경우
    return data.isHorizontal
      ? { width: 'w-[468px]', height: 'h-[244px]' }
      : { width: 'w-[244px]', height: 'h-[468px]' };
  };

  const { width, height } = getCardDimensions();

  // 카드 이미지 렌더링
  const renderCardFace = (isFront: boolean) => {
    if (isDetail) {
      return (
        <Image
          src={isFront ? data.frontImgURL || '' : data.backImgURL || ''}
          alt={`${data.title} 명함 ${isFront ? '앞면' : '뒷면'}`}
          width={data.isHorizontal ? 270 : 150}
          height={data.isHorizontal ? 150 : 270}
        />
      );
    }

    return (
      <CardStageViewer
        ref={isFront ? frontCardRef : backCardRef}
        isHorizontal={data.isHorizontal}
        elements={
          isFront
            ? data.content?.canvasElements || []
            : data.content?.canvasBackElements || []
        }
        backgroundColor={
          isFront
            ? data.content?.backgroundColor || '#ffffff'
            : data.content?.backgroundColorBack || '#ffffff'
        }
        previewMode={true}
        onSocialClick={handleClick}
        size={size}
      />
    );
  };

  // 버튼 위치 계산
  const buttonPosition =
    isDetail && data.isHorizontal
      ? 'absolute bottom-[-36px]'
      : 'absolute bottom-[-54px]';

  return (
    <div className='relative mx-[25px] mb-[66px] flex w-full flex-col items-center justify-center md:w-auto'>
      <div className={clsx('relative perspective-1000', width, height)}>
        <div
          ref={containerRef}
          className={clsx(
            'relative flex justify-center transition-transform duration-1000 transform-style-preserve-3d',
            isFlipped && 'rotate-y-180',
            width,
            height
          )}
        >
          {/* 앞면 */}
          <div
            className='absolute flex h-full w-full items-center justify-center shadow-[37px_108px_32px_0px_rgba(0,0,0,0.00),24px_69px_29px_0px_rgba(0,0,0,0.01),13px_39px_25px_0px_rgba(0,0,0,0.05),6px_17px_18px_0px_rgba(0,0,0,0.09),1px_4px_10px_0px_rgba(0,0,0,0.10)] backface-hidden md:h-auto md:w-auto'
            style={{ pointerEvents: 'auto', cursor: 'default' }}
          >
            {renderCardFace(true)}
          </div>

          {/* 뒷면 */}
          <div
            className='absolute flex h-full w-full items-center justify-center shadow-[37px_108px_32px_0px_rgba(0,0,0,0.00),24px_69px_29px_0px_rgba(0,0,0,0.01),13px_39px_25px_0px_rgba(0,0,0,0.05),6px_17px_18px_0px_rgba(0,0,0,0.09),1px_4px_10px_0px_rgba(0,0,0,0.10)] backface-hidden rotate-y-180 md:h-auto md:w-auto'
            style={{ pointerEvents: 'auto', cursor: 'default' }}
          >
            {renderCardFace(false)}
          </div>
        </div>
      </div>

      {/* 뒤집기 버튼 */}
      <div
        onClick={() => setIsFlipped((prev) => !prev)}
        className={clsx(
          'z-10 h-[40px] w-[40px] cursor-pointer',
          buttonPosition
        )}
      >
        <FlipArrow />
      </div>
    </div>
  );
});

export default FlipCard;

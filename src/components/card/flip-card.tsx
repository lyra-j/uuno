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
  const [isMobile, setIsMobile] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const frontCardRef = useRef<CardStageViewerRef>(null);
  const backCardRef = useRef<CardStageViewerRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 모바일 기기 감지
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const checkMobile = () => setIsMobile(mq.matches);

    // 초기 실행
    checkMobile();

    // 이벤트 리스너 추가 (브라우저 호환성 고려)
    if (mq.addEventListener) {
      mq.addEventListener('change', checkMobile);
    } else {
      window.addEventListener('resize', checkMobile);
    }

    // 클린업 함수
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', checkMobile);
      } else {
        window.removeEventListener('resize', checkMobile);
      }
    };
  }, []);

  // 모바일에서 카드 크기 조정 처리
  useEffect(() => {
    if (!isMobile || !containerRef.current || isDetail) {
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
  }, [isMobile, isDetail]);

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

  // 스타일 상수
  const CARD_DEFAULT_STYLE =
    'absolute flex h-full w-full items-center justify-center shadow-[20px_60px_20px_0px_rgba(0,0,0,0.00),12px_40px_15px_0px_rgba(0,0,0,0.01),7px_20px_12px_0px_rgba(0,0,0,0.05),3px_10px_10px_0px_rgba(0,0,0,0.09),1px_3px_5px_0px_rgba(0,0,0,0.10)] backface-hidden';
  const CARD_DEFAULT_BUTTON_STYLE = 'z-10 h-[40px] w-[40px] cursor-pointer';

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
        ? { width: 'w-full', height: 'aspect-[9/5]' }
        : { width: 'w-[150px]', height: 'h-[270px]' };
    }

    // 모바일인 경우
    if (isMobile) {
      return data.isHorizontal
        ? { width: 'w-full', height: 'aspect-[9/5]' }
        : { width: 'w-[200px]', height: 'h-[360px]' };
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
        <div className='relative h-full w-full'>
          <Image
            src={isFront ? data.frontImgURL || '' : data.backImgURL || ''}
            alt={`${data.title} 명함 ${isFront ? '앞면' : '뒷면'}`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className={clsx(
              'object-contain',
              data.isHorizontal ? 'md:object-cover' : 'object-contain'
            )}
            priority
          />
        </div>
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
      ? 'absolute bottom-[-20px] md:bottom-[-36px]'
      : 'absolute bottom-[-54px]';

  return (
    <div
      className={clsx(
        'relative mx-[25px] mb-[66px] flex w-full flex-col items-center justify-center',
        isDetail ? 'mb-[34px]' : 'md:mb-[66px]'
      )}
    >
      <div
        className={clsx(
          'relative perspective-1000',
          width,
          height,
          !data.isHorizontal && 'py-[20px]'
        )}
      >
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
            className={CARD_DEFAULT_STYLE}
            style={{
              pointerEvents: 'auto',
              cursor: 'default',
            }}
          >
            {renderCardFace(true)}
          </div>

          {/* 뒷면 */}
          <div
            className={clsx(CARD_DEFAULT_STYLE, 'rotate-y-180')}
            style={{
              pointerEvents: 'auto',
              cursor: 'default',
            }}
          >
            {renderCardFace(false)}
          </div>
        </div>
      </div>

      {/* 뒤집기 버튼 */}
      <button
        type='button'
        aria-label='명함 뒤집기'
        onClick={() => setIsFlipped((prev) => !prev)}
        className={clsx(CARD_DEFAULT_BUTTON_STYLE, buttonPosition)}
      >
        <FlipArrow />
      </button>
    </div>
  );
});

FlipCard.displayName = 'FlipCard'; // forwardRef 컴포넌트를 위한 displayName 추가

export default FlipCard;

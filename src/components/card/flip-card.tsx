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
    'absolute flex justify-center items-center backface-hidden shadow-[37px_108px_32px_0px_rgba(0,0,0,0.00),24px_69px_29px_0px_rgba(0,0,0,0.01),13px_39px_25px_0px_rgba(0,0,0,0.05),6px_17px_18px_0px_rgba(0,0,0,0.09),1px_4px_10px_0px_rgba(0,0,0,0.10)]';
  const CARD_DEFAULT_WRAPPER_STYLE =
    'flex justify-center relative transition-transform duration-1000 cursor-pointer transform-style-preserve-3d';
  const CARD_DEFAULT_BUTTON_STYLE = 'z-10 h-[40px] w-[40px] cursor-pointer';

  // 모바일 카드 크기 상수
  const MOBILE_WIDTH = 270;
  const MOBILE_HEIGHT = 150;

  // 추적 세션 초기화
  useEffect(() => {
    setStartedAt(new Date());
  }, []);

  // 경로 및 카드 ID 처리
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

  return (
    <div
      className={clsx(
        'relative flex w-full flex-col items-center justify-center',
        isDetail ? 'mb-[34px]' : 'md:mb-[66px]'
      )}
    >
      <div
        className={clsx(
          'relative mx-6 perspective-1000',
          data.isHorizontal ? 'h-[244px] w-[468px]' : 'h-[468px] w-[244px]',
          isDetail &&
            (data.isHorizontal
              ? 'md:h-[150px] md:w-[270px]'
              : 'md:h-[270px] md:w-[150px]')
        )}
      >
        <div
          ref={containerRef}
          className={clsx(
            CARD_DEFAULT_WRAPPER_STYLE,
            isFlipped && 'rotate-y-180',
            isDetail && 'h-full'
          )}
        >
          {/* 앞면 */}
          <div
            className={clsx(CARD_DEFAULT_STYLE, 'h-full w-full')}
            style={{
              pointerEvents: 'auto',
              cursor: 'default',
            }}
          >
            {isDetail ? (
              <div className={clsx('relative h-full w-full overflow-hidden')}>
                {data.frontImgURL && (
                  <Image
                    src={data.frontImgURL}
                    alt={`${data.title || '사용자'} 명함`}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-contain'
                    priority
                    onError={(e) => {
                      console.error('이미지 로드 실패:', data.frontImgURL);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </div>
            ) : (
              <CardStageViewer
                ref={frontCardRef}
                isHorizontal={data.isHorizontal}
                elements={data.content?.canvasElements || []}
                backgroundColor={data.content?.backgroundColor || '#ffffff'}
                previewMode={true}
                onSocialClick={handleClick}
              />
            )}
          </div>

          {/* 뒷면 */}
          <div
            className={clsx(
              CARD_DEFAULT_STYLE,
              'rotate-y-180',
              'h-full w-full'
            )}
            style={{
              pointerEvents: 'auto',
              cursor: 'default',
            }}
          >
            {isDetail ? (
              <>
                <div className='relative block h-full w-full overflow-hidden md:hidden'>
                  {data.backImgURL && (
                    <Image
                      src={data.backImgURL}
                      alt={`${data.title || '사용자'} 명함 뒷면`}
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      className='object-contain'
                      priority
                      onError={(e) => {
                        console.error('이미지 로드 실패:', data.backImgURL);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>
                <div className='relative hidden h-full w-full items-center justify-center md:flex'>
                  {data.backImgURL && (
                    <Image
                      src={data.backImgURL}
                      alt={`${data.title || '사용자'} 명함 뒷면`}
                      width={data.isHorizontal ? MOBILE_WIDTH : MOBILE_HEIGHT}
                      height={data.isHorizontal ? MOBILE_HEIGHT : MOBILE_WIDTH}
                      className='object-contain'
                      priority
                      onError={(e) => {
                        console.error('이미지 로드 실패:', data.backImgURL);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </>
            ) : (
              <CardStageViewer
                ref={backCardRef}
                isHorizontal={data.isHorizontal}
                elements={data.content?.canvasBackElements || []}
                backgroundColor={data.content?.backgroundColorBack || '#ffffff'}
                previewMode={true}
                onSocialClick={handleClick}
              />
            )}
          </div>
        </div>
      </div>

      {/* 뒤집기 버튼 */}
      <div
        onClick={() => setIsFlipped((prev) => !prev)}
        className={clsx(
          CARD_DEFAULT_BUTTON_STYLE,
          isDetail && data.isHorizontal
            ? 'absolute bottom-[-20px] md:bottom-[-36px]'
            : 'absolute bottom-[-54px]'
        )}
      >
        <FlipArrow />
      </div>
    </div>
  );
});

FlipCard.displayName = 'FlipCard'; // forwardRef 컴포넌트를 위한 displayName 추가

export default FlipCard;

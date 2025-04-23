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

  const CARD_DEFAULT_STYLE =
    'absolute flex justify-center items-center backface-hidden shadow-[37px_108px_32px_0px_rgba(0,0,0,0.00),24px_69px_29px_0px_rgba(0,0,0,0.01),13px_39px_25px_0px_rgba(0,0,0,0.05),6px_17px_18px_0px_rgba(0,0,0,0.09),1px_4px_10px_0px_rgba(0,0,0,0.10)]';
  const CARD_DEFAULT_WRAPPER_STYLE =
    'flex justify-center relative transition-transform duration-1000 cursor-pointer transform-style-preserve-3d';
  const CARD_DEFAULT_BUTTON_STYLE = 'z-10 h-[40px] w-[40px] cursor-pointer';

  useEffect(() => {
    setStartedAt(new Date());
  }, []);

  const pathname = usePathname();
  const pathArray = pathname.split('/')[1];
  const cardId = pathname.split('/')[2];
  const { data: slug } = useCardSlug(cardId, {
    enabled: isDetail,
  });

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

  const { handleClick } = useInteractionTracker({
    slug: isDetail ? slug || '' : pathArray,
    source,
    startedAt,
  });

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
    <div className='relative mb-[66px] flex w-full flex-col items-center justify-center'>
      <div
        className={clsx(
          'relative mx-6 perspective-1000',
          isDetail
            ? data.isHorizontal
              ? 'h-[150px] w-[270px]'
              : 'h-[270px] w-[150px]'
            : data.isHorizontal
              ? 'h-[244px] w-[468px]'
              : 'h-[468px] w-[244px]'
        )}
      >
        <div
          className={clsx(
            CARD_DEFAULT_WRAPPER_STYLE,
            isFlipped && 'rotate-y-180'
          )}
        >
          <div
            className={CARD_DEFAULT_STYLE}
            style={{
              pointerEvents: 'auto',
              cursor: 'default',
            }}
          >
            {isDetail ? (
              <Image
                src={data.frontImgURL || ''}
                alt={`${data.title} 명함`}
                width={data.isHorizontal ? 270 : 150}
                height={data.isHorizontal ? 150 : 270}
              />
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
          <div
            className={clsx(CARD_DEFAULT_STYLE, 'rotate-y-180')}
            style={{
              pointerEvents: 'auto',
              cursor: 'default',
            }}
          >
            {isDetail ? (
              <Image
                src={data.backImgURL || ''}
                alt={`${data.title} 명함`}
                width={data.isHorizontal ? 270 : 150}
                height={data.isHorizontal ? 150 : 270}
              />
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

      <div
        onClick={() => setIsFlipped((pre: boolean) => !pre)}
        className={clsx(
          CARD_DEFAULT_BUTTON_STYLE,
          isDetail && data.isHorizontal
            ? 'absolute bottom-[-36px]'
            : 'absolute bottom-[-54px]'
        )}
      >
        <FlipArrow />
      </div>
    </div>
  );
});

export default FlipCard;

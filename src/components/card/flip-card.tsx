'use client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import FlipArrow from '@/components/icons/flip-arrow';
import { usePathname, useSearchParams } from 'next/navigation';
import { useInteractionTracker } from '@/hooks/use-interaction-tracker';
import { useCardContent } from '@/hooks/queries/use-card-interaction';
import CardSkeleton from './card-skeleton';
import ErrorCard from './error-card';
import CardStageViewer from './konva-stage-viewer';
import useCardSlug from '@/hooks/queries/use-card-slug';

interface FlipCardParam {
  isDetail?: boolean;
}

const FlipCard = ({ isDetail }: FlipCardParam) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const CARD_DEFAULT_STYLE =
    'bg-slate-700 absolute flex justify-center items-center backface-hidden w-full shadow-[37px_108px_32px_0px_rgba(0,0,0,0.00),24px_69px_29px_0px_rgba(0,0,0,0.01),13px_39px_25px_0px_rgba(0,0,0,0.05),6px_17px_18px_0px_rgba(0,0,0,0.09),1px_4px_10px_0px_rgba(0,0,0,0.10)] aspect-[9/5]';
  const CARD_DEFAULT_WRAPPER_STYLE =
    'relative transition-transform duration-1000 cursor-pointer transform-style-preserve-3d';
  const CARD_DEFAULT_BUTTON_STYLE = 'z-10 h-[34px] w-[34px] cursor-pointer';
  const CARD_DEFAULT_BUTTON_STYLE_ATTACHED = 'absolute bottom-[-18px]';

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

  // const { handleClick, socialLinks } = useInteractionTracker({
  //   slug: pathArray,
  //   source,
  //   startedAt,
  // });

  const { data, isPending, error } = useCardContent(
    isDetail ? slug || '' : pathArray
  );

  useEffect(() => {
    if (data) {
      console.log('Card data loaded:', data);
    }
  }, [data]);

  // 로딩 중일 때 스켈레톤 UI
  if (isPending) {
    return <CardSkeleton isDetail={isDetail} />;
  }

  // 에러 발생 시 에러 UI
  if (error) {
    return <ErrorCard isDetail={!!isDetail} error={error} />;
  }

  return (
    <div className='relative mb-11 flex w-full flex-col items-center justify-center'>
      <div className='m-5 aspect-[9/5] w-full perspective-1000'>
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
            <CardStageViewer
              isDetail={isDetail}
              elements={data.canvasElements || []}
              backgroundColor={data.backgroundColor || '#ffffff'}
              previewMode={true}
            />
          </div>
          <div
            className={clsx(CARD_DEFAULT_STYLE, 'rotate-y-180')}
            style={{
              pointerEvents: 'auto',
              cursor: 'default',
            }}
          >
            <CardStageViewer
              isDetail={isDetail}
              elements={data.canvasBackElements || []}
              backgroundColor={data.backgroundColorBack || '#ffffff'}
              previewMode={true}
            />
          </div>
        </div>
      </div>
      <div
        onClick={() => setIsFlipped((pre: boolean) => !pre)}
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

export default FlipCard;

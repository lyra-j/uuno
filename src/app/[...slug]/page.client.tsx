'use client';

import FlipCard, { FlipCardRef } from '@/components/card/flip-card';
import LeftArrow from '@/components/icons/left-arrow';
import { useLogInteractionMutation } from '@/hooks/mutations/use-init-session';
import { useIpAddressQuery } from '@/hooks/queries/use-ip-address';
import { useInteractionTracker } from '@/hooks/use-interaction-tracker';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { authStore } from '@/store/auth.store';
import { Cards, CardViews } from '@/types/supabase.type';
import { getEffectiveSessionId } from '@/utils/interaction/session-util';
import { toastComingSoonAlert } from '@/utils/common/sweet-coming-soon-alert';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface SlugClientPageParams {
  initialData: Cards & {
    users: {
      id: string;
      nick_name: string;
    } | null;
  };
}

const SlugClientPage = ({ initialData }: SlugClientPageParams) => {
  if (!initialData || !initialData.id) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p className='text-gray-500'>유효하지 않은 명함입니다.</p>
      </div>
    );
  }

  const flipCardRef = useRef<FlipCardRef>(null);
  const params = useSearchParams();
  const allowedSources = ['direct', 'qr', 'link', 'tag'] as const;
  const source =
    allowedSources.find((s) => params.get('source')?.includes(s)) || 'direct';
  const userId = authStore((state) => state.userId);

  const id = initialData?.id || '';
  const slug = initialData.slug;

  const isMobile = useIsMobile();

  const { handleSaveImg, updateActivity, handleSaveVCard } =
    useInteractionTracker({
      cardId: id,
      isDetail: false,
      slug,
      source,
      startedAt: new Date(),
    });

  const { data: ip, error: ipError } = useIpAddressQuery();

  const logInteractionMutation = useLogInteractionMutation(
    id,
    ip || '',
    source,
    new Date()
  );

  const [hasInitialViewId, setHasInitialViewId] = useState<number | null>(null);

  const router = useRouter();
  const isMyCard = initialData.user_id === userId;
  const handleGoBack = () => {
    router.back();
  };

  // 무한 루프 방지를 위한 처리 상태 추적 ref
  const initialViewProcessedRef = useRef(false);

  useEffect(() => {
    // IP 에러 체크
    if (ipError) {
      console.error('IP 주소 조회 중 오류:', ipError);
      return;
    }

    // 내 카드이거나, 이미 처리했거나, IP가 없으면 실행하지 않음
    if (isMyCard || initialViewProcessedRef.current || !ip || !id) {
      return;
    }

    // 처리 시작을 표시
    initialViewProcessedRef.current = true;

    // 조회 여부 확인
    const viewKey = `viewed_${id}`;
    const hasViewed = sessionStorage.getItem(viewKey);

    if (!hasViewed) {
      // 아직 조회하지 않은 경우에만 API 호출
      logInteractionMutation.mutate(
        { elementName: null, type: null },
        {
          onSuccess: (data: CardViews | null) => {
            if (data) {
              // 조회 기록 표시
              sessionStorage.setItem(viewKey, 'true');
              // 세션 ID 상태 업데이트
              setHasInitialViewId(
                data.session_id ? Number(data.session_id) : null
              );
            }
          },
          onError: (error: Error) => {
            // 에러 발생 시 다시 시도할 수 있도록 플래그 리셋
            initialViewProcessedRef.current = false;
            console.error('Error inserting initial view:', error);
          },
        }
      );
    } else {
      // 이미 조회한 경우 API 호출 없이 상태만 업데이트
      const sessionId = getEffectiveSessionId();
      if (sessionId) {
        setHasInitialViewId(Number(sessionId));
      }
    }
  }, [isMyCard, ip, id, logInteractionMutation, ipError]);

  // 이미지 저장 핸들러
  const handleImageSave = async () => {
    try {
      if (!flipCardRef.current) {
        console.error('FlipCard ref is not available');
        return;
      }

      logInteractionMutation.mutate({ elementName: 'image', type: 'save' });
      updateActivity();

      const { front, back } = await flipCardRef.current.exportCardImages();
      if (!front && !back) {
        console.error('No card images available');
        return;
      }

      if (front) {
        handleSaveImg(front, `front_${initialData.slug || 'card'}_img.png`);
      }
      if (back) {
        handleSaveImg(back, `back_${initialData.slug || 'card'}_img.png`);
      }
    } catch (error) {
      console.error('이미지 다운로드 중 오류 발생:', error);
    }
  };

  // 페이지 타이틀 생성
  const pageTitle = `${initialData.users?.nick_name || ''}님의 ${initialData?.title || ''} 명함`;

  return (
    <div className='relative mx-auto flex h-[calc(100vh-64px)] max-w-5xl flex-col items-center justify-between overflow-x-hidden border-b border-solid border-gray-10 bg-bg md:justify-center'>
      {/* 헤더 영역 */}
      <div className='absolute left-0 top-0 z-50 flex h-[52px] w-full items-center justify-center border-b border-gray-10 bg-white shadow-sm md:h-[80px]'>
        <div className='relative flex h-full w-full items-center justify-center px-[20px] py-[14px] text-label1-semi md:justify-start md:px-[22px] md:py-5 md:text-title-bold'>
          {isMyCard && (
            <button
              onClick={handleGoBack}
              className='absolute left-[20px] cursor-pointer md:static md:mr-[14px]'
              aria-label='내 명함상세로 이동하기'
            >
              <LeftArrow size={isMobile ? 24 : 32} />
            </button>
          )}
          <h2 className='max-w-[80%] truncate md:max-w-full'>{pageTitle}</h2>
        </div>
      </div>

      {/* 카드 영역 */}
      <div
        className={clsx(
          'mt-[52px] flex h-[calc(100vh-180px)] w-full items-center justify-center px-4 md:mt-[80px] md:h-auto',
          !initialData.isHorizontal &&
            'md:h-[calc(100vh-200px)] md:overflow-y-auto'
        )}
      >
        <div
          className={clsx(
            'relative mx-auto mt-4 w-full max-w-[calc(100%-32px)] md:max-w-[468px]',
            !initialData.isHorizontal && 'h-full'
          )}
        >
          <div
            className={clsx(
              'flex justify-center',
              !initialData.isHorizontal && 'h-full'
            )}
          >
            <FlipCard ref={flipCardRef} />
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className='mb-4 flex w-full items-center justify-center gap-[11px] p-[16px] md:mt-9 md:w-auto md:gap-5 md:bg-transparent md:p-0 md:shadow-none'>
        <button
          onClick={handleImageSave}
          className='flex h-[46px] flex-1 items-center justify-center rounded-[6px] border border-solid border-gray-10 bg-white px-4 py-[6px] text-label2-medium shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] md:flex-none md:rounded-[46px] md:px-[46px]'
        >
          이미지 저장
        </button>
        <button
          onClick={toastComingSoonAlert}
          className='flex h-[46px] flex-1 items-center justify-center rounded-[6px] bg-primary-40 px-4 py-[6px] text-label2-medium text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] md:flex-none md:rounded-full md:px-[46px]'
        >
          연락처 저장
        </button>
      </div>
    </div>
  );
};

export default SlugClientPage;

'use client';

import FlipCard, { FlipCardRef } from '@/components/card/flip-card';
import LeftArrow from '@/components/icons/left-arrow';
import { ROUTES } from '@/constants/path.constant';
import { useLogInteractionMutation } from '@/hooks/mutations/use-init-session';
import { useIpAddressQuery } from '@/hooks/queries/use-ip-address';
import { useInteractionTracker } from '@/hooks/use-interaction-tracker';
import { authStore } from '@/store/auth.store';
import { Cards } from '@/types/supabase.type';
import { sweetComingSoonAlert } from '@/utils/common/sweet-coming-soon-alert';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
  const flipCardRef = useRef<FlipCardRef>(null);
  const params = useSearchParams();
  const allowedSources = ['direct', 'qr', 'link', 'tag'] as const;
  const source =
    allowedSources.find((s) => params.get('source')?.includes(s)) || 'direct';
  const userId = authStore((state) => state.userId);

  const id = initialData?.id || '';
  const slug = initialData.slug;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 초기 실행
    checkScreenSize();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', checkScreenSize);

    // 클린업
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const { handleSaveImg, updateActivity, handleSaveVCard } =
    useInteractionTracker({
      slug,
      source,
      startedAt: new Date(),
    });
  const { data: ip } = useIpAddressQuery();

  const logInteractionMutation = useLogInteractionMutation(
    id || '',
    ip,
    source,
    new Date()
  );

  // 이미지 저장 핸들러
  const handleImageSave = async () => {
    try {
      logInteractionMutation.mutate({ elementName: 'image', type: 'save' });

      updateActivity();

      if (flipCardRef.current) {
        const { front, back } = await flipCardRef.current.exportCardImages();

        const savePromises: void[] = [];
        if (front) {
          savePromises.push(
            handleSaveImg(front, `front_${initialData.slug || 'card'}_img.png`)
          );
        }
        if (back) {
          savePromises.push(
            handleSaveImg(back, `back_${initialData.slug || 'card'}_img.png`)
          );
        }
        await Promise.all(savePromises);
      }
    } catch (error) {
      console.error('이미지 다운로드 중 오류 발생:', error);
    }
  };

  // 페이지 타이틀 생성
  const pageTitle = `${initialData.users?.nick_name || ''}님의 ${initialData?.title || ''} 명함`;

  return (
    <div className='relative mx-auto flex h-[calc(100vh-64px)] max-w-5xl flex-col items-center justify-center border-b border-solid border-gray-10 bg-bg'>
      <div className='absolute left-0 top-0 flex h-[52px] w-full items-center justify-center bg-white px-[20px] py-[14px] text-label1-semi md:h-[80px] md:justify-start md:px-[22px] md:py-5 md:text-title-bold'>
        {initialData.user_id === userId && (
          <Link
            href={`${ROUTES.MYCARD}/${initialData.id}`}
            className='absolute left-[20px] cursor-pointer md:static md:mr-[14px]'
            aria-label='내 명함상세로 이동하기'
          >
            <LeftArrow size={isMobile ? 24 : 32} />
          </Link>
        )}
        <h2 className='max-w-[80%] truncate md:max-w-full'>{pageTitle}</h2>
      </div>

      {/* TODO: 반응형 처리 필요 */}
      <div className='flex w-full items-center justify-center overflow-y-auto'>
        <FlipCard ref={flipCardRef} />
      </div>

      <div className='fixed bottom-[37px] left-0 flex w-full items-center justify-center gap-[11px] px-[16px] md:static md:bottom-auto md:left-auto md:mt-9 md:w-auto md:gap-5 md:px-0'>
        <button
          onClick={handleImageSave}
          className='flex h-[46px] flex-1 items-center justify-center rounded-[6px] border border-solid border-gray-10 px-4 py-[6px] text-label2-medium shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] md:flex-none md:rounded-[46px] md:px-[46px]'
        >
          이미지 저장
        </button>
        <button
          onClick={sweetComingSoonAlert}
          className='flex h-[46px] flex-1 items-center justify-center rounded-[6px] bg-primary-40 px-4 py-[6px] text-label2-medium text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] md:flex-none md:rounded-full md:px-[46px]'
        >
          연락처 저장
        </button>
      </div>
    </div>
  );
};

export default SlugClientPage;

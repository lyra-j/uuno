'use client';

import FlipCard, { FlipCardRef } from '@/components/card/flip-card';
import { useLogInteractionMutation } from '@/hooks/mutations/use-init-session';
import { useIpAddressQuery } from '@/hooks/queries/use-ip-address';
import { useInteractionTracker } from '@/hooks/use-interaction-tracker';
import { Cards } from '@/types/supabase.type';
import { useSearchParams } from 'next/navigation';
import { useRef } from 'react';

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

  const id = initialData?.id || '';
  const slug = initialData.slug;

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

        // 앞면 이미지 저장
        if (front) {
          handleSaveImg(front, `front_${initialData.slug || 'card'}_img.png`);
        }

        // 뒷면 이미지 저장
        if (back) {
          handleSaveImg(back, `back_${initialData.slug || 'card'}_img.png`);
        }
      }
    } catch (error) {
      console.error('이미지 다운로드 중 오류 발생:', error);
    }
  };

  // 페이지 타이틀 생성
  const pageTitle = `${initialData.users?.nick_name || ''}님의 ${initialData?.title || ''} 명함`;

  return (
    <div className='relative mx-auto flex h-[calc(100vh-64px)] max-w-5xl flex-col items-center justify-center border-b border-solid border-gray-10 bg-bg'>
      <div className='absolute left-0 top-0 flex h-[80px] w-full items-center justify-start bg-white px-8 py-5 text-title-bold'>
        <h2>{pageTitle}</h2>
      </div>

      <div className='flex w-[50%] items-center justify-center'>
        <FlipCard ref={flipCardRef} />
      </div>

      <div className='mt-9 flex items-center justify-center gap-4'>
        <button
          onClick={handleImageSave}
          className='flex h-[46px] items-center justify-center rounded-[46px] border border-solid border-gray-10 px-[46px] py-[6px] text-label2-medium shadow-[0px_4px_40px_0px_rgba(0,0,0,0.15)]'
        >
          이미지 저장
        </button>
        <button
          onClick={handleSaveVCard}
          className='flex h-[46px] items-center justify-center rounded-[46px] bg-primary-40 px-[46px] py-[6px] text-label2-medium text-white shadow-[0px_4px_40px_0px_rgba(0,0,0,0.15)]'
        >
          연락처 저장
        </button>
      </div>
    </div>
  );
};

export default SlugClientPage;

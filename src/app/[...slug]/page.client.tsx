'use client';

import FlipCard from '@/components/card/flip-card';
import {
  useDownloadCardImageMutation,
  useLogInteractionMutation,
} from '@/hooks/mutations/use-init-session';
import { useGetUserNickName } from '@/hooks/queries/use-card-interaction';
import { useIpAddressQuery } from '@/hooks/queries/use-ip-address';
import { useInteractionTracker } from '@/hooks/use-interaction-tracker';
import { usePathname, useSearchParams } from 'next/navigation';

const SlugClientPage = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const slug = pathname.split('/')[1];
  const allowedSources = ['direct', 'qr', 'link', 'tag'] as const;
  const source =
    allowedSources.find((s) => params.get('source')?.includes(s)) || null;

  // 데이터 fetch 및 관련 값 추출
  const { data, isPending } = useGetUserNickName(slug);
  const id = data?.id || '';

  // 파일명 추출 로직
  const getFileName = (url: string) => {
    const fileName = url.split('/').pop() || '';
    return fileName.split('?')[0]; // 쿼리 파라미터 제거
  };
  const frontFileName = data?.frontImgURL ? getFileName(data.frontImgURL) : '';
  const backFileName = data?.backImgURL ? getFileName(data?.backImgURL) : '';

  // 다운로드 뮤테이션
  const downloadCardFrontImage = useDownloadCardImageMutation(
    id,
    frontFileName
  );
  const downloadCardBackImage = useDownloadCardImageMutation(id, backFileName);
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
      // 병렬로 이미지 다운로드 요청
      const [frontImgData, backImgData] = await Promise.all([
        downloadCardFrontImage.mutateAsync(),
        downloadCardBackImage.mutateAsync(),
      ]);

      // 각 이미지 다운로드
      if (frontFileName) {
        handleSaveImg(frontImgData, frontFileName);
      }
      if (backFileName) {
        handleSaveImg(backImgData, backFileName);
      }
    } catch (error) {
      console.error('이미지 다운로드 중 오류 발생:', error);
    }
  };

  // 페이지 타이틀 생성
  const pageTitle = isPending
    ? 'Loading...'
    : `${data?.users?.nick_name || ''}님의 ${data?.title || ''} 명함`;

  return (
    <div className='relative mx-auto flex h-[calc(100vh-64px)] max-w-5xl flex-col items-center justify-center border-b border-solid border-gray-10 bg-bg'>
      <div className='absolute left-0 top-0 flex h-[80px] w-full items-center justify-start bg-white px-8 py-5 text-title-bold'>
        <h2>{pageTitle}</h2>
      </div>

      <div className='flex w-[50%] items-center justify-center'>
        <FlipCard />
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

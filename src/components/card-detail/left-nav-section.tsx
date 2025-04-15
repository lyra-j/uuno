'use client';
import { usePathname } from 'next/navigation';
import FlipCard from '../card/flip-card';
import CardSelector from './card-selector';
import Link from 'next/link';
import { getSlugData } from '@/apis/get-slug-data';
import { useEffect, useState } from 'react';
import customSweetAlert from '@/utils/card-detail/custom-sweet-alert';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';
import { useCommonModalStore } from '@/store/common-modal.store';
import SaveShareModal from '../card/save-share-modal';
import { authStore } from '@/store/auth.store';

const LeftNavSection = () => {
  const open = useCommonModalStore((state) => state.open);
  const nickName = authStore((state) => state.userName);
  const pathname = usePathname();
  const card_id = pathname.split('/')[2] || '';
  const [slug, setSlug] = useState<string>('');
  const [host, setHost] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getSlugData(card_id);
      const { slug } = data;
      setSlug(slug);
    };
    if (typeof window !== undefined) setHost(window.location.host);

    fetchData();
  }, []);

  const handleDelteCard = async () => {
    customSweetAlert.confirmCardDelete(async () => {
      try {
        // API 호출 또는 삭제 로직 추가 예정
      } catch (error) {
        // 에러 메시지
        sweetAlertUtil.error(
          '삭제 실패',
          '명함을 삭제하는 중 오류가 발생했습니다.'
        );
      }
    });
  };
  return (
    <>
      <CardSelector card_id={card_id} />
      <div className='relative flex flex-1 flex-col items-center justify-between'>
        <div className='flex w-full flex-col items-center justify-center'>
          <FlipCard attached={true} />
          <Link
            href={`/editor?card_id=${card_id}`}
            className='mb-2 flex w-full justify-center rounded-full bg-primary-40 px-3 py-[10px] text-label2-regular text-white'
          >
            편집하기
          </Link>
          <button
            onClick={open}
            className='flex w-full justify-center rounded-full bg-gray-5 px-3 py-[10px] text-label2-regular'
          >
            저장 및 공유하기
          </button>
          <div className='my-5 mb-3 h-[1px] w-full bg-bg' />
          <Link
            href={`/${slug}`}
            className='cursor-pointer text-label2-regular text-gray-60'
          >
            공유 화면 미리보기
          </Link>
        </div>
        <div className='mb-9 flex w-full flex-col items-center justify-center'>
          <div className='my-5 mb-3 h-[1px] w-full bg-bg' />
          <span
            onClick={handleDelteCard}
            className='cursor-pointer text-label2-regular text-gray-60'
          >
            삭제하기
          </span>
        </div>
      </div>
      <SaveShareModal
        linkUrl={`${host}/${slug}`}
        title={`${nickName}의 명함`}
        imageUrl={`https://mhetidsangfefbezfspd.supabase.co/storage/v1/object/public/cards/${card_id}/card_test.jpg`}
        description='Uuno에서 생성한 명함'
      />
    </>
  );
};

export default LeftNavSection;

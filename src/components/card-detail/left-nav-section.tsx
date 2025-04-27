'use client';
import { usePathname, useRouter } from 'next/navigation';
import FlipCard from '@/components/card/flip-card';
import CardSelector from '@/components/card-detail/card-selector';
import Link from 'next/link';
import customSweetAlert from '@/utils/card-detail/custom-sweet-alert';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';
import SaveShareModal from '@/components/card/save-share-modal';
import useCardSelectList from '@/hooks/queries/use-card-select-list';
import { authStore } from '@/store/auth.store';
import useCardSlug from '@/hooks/queries/use-card-slug';
import SkeletonUI from '@/components/card-detail/left-nav-skeleton-ui';
import { useEffect, useState } from 'react';
import { useMyCardDelete } from '@/hooks/mutations/use-mycard-delete';
import { useSlugUrl } from '@/hooks/queries/use-slug-url';
import { useSaveShareModalStore } from '@/store/save-share-modal.store';
import { ROUTES } from '@/constants/path.constant';

const LeftNavSection = () => {
  const openShareModal = useSaveShareModalStore((state) => state.open);
  const nickName = authStore((state) => state.userName);
  const pathname = usePathname();
  const cardId = pathname.split('/')[2] || '';
  const [origin, setOrigin] = useState<string>('');
  const userId = authStore((state) => state.userId!);
  const router = useRouter();
  const {
    data: slug,
    isError: getSlugError,
    isPending: isPendingSlug,
  } = useCardSlug(cardId);

  useEffect(() => {
    if (typeof window !== 'undefined') setOrigin(window.location.origin);
  }, []);
  const { data, isError, isPending } = useCardSelectList(userId as string);

  const { mutate: deleteMutate } = useMyCardDelete({
    slug: slug ?? '',
    cardId,
    userId,
    onDeleteSuccess: (updatedCardList) => {
      sweetAlertUtil.success('삭제 성공', '명함이 성공적으로 삭제되었습니다.');

      // 삭제 후 리다이렉션 처리
      if (updatedCardList && updatedCardList.length > 0) {
        router.push(`${ROUTES.MYCARD}/${updatedCardList[0].id}`);
      } else {
        router.push(ROUTES.DASHBOARD.BASE);
      }
    },
  });

  const handleDeleteCard = () => {
    customSweetAlert.confirmCardDelete(() => {
      try {
        deleteMutate();
      } catch (error) {
        sweetAlertUtil.error(
          '삭제 실패',
          '명함을 삭제하는 중 오류가 발생했습니다.'
        );
      }
    });
  };

  // slug 바탕으로 fontImage를 받아오기 위함.
  const {
    data: slugToUrl,
    isError: getUrlError,
    isPending: isPendingUrl,
  } = useSlugUrl(slug ?? '');

  const handleOpenShareModal = () => {
    if (slug && slugToUrl) {
      openShareModal({
        cardId: cardId,
        linkUrl: `${origin}/${slug}?source=link`,
        title: `${nickName}의 명함`,
        imageUrl: slugToUrl ?? '',
        description: 'Uuno에서 생성한 명함',
      });
    } else {
      sweetAlertUtil.error(
        '공유 불가',
        '명함 정보를 불러오는 것에 실패했습니다. 잠시 후 다시 시도해주세요.'
      );
    }
  };

  if (isError || getSlugError || getUrlError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (isPendingSlug || isPending || isPendingUrl) {
    return <SkeletonUI />;
  }

  return (
    <>
      <CardSelector card_id={cardId} data={data} />
      <div className='relative flex w-full flex-1 flex-col items-center justify-between'>
        <div className='flex w-full flex-col items-center justify-center'>
          <FlipCard isDetail={true} />
          <Link
            href={`${ROUTES.EDITOR}?cardId=${cardId}`}
            className='none mx-2 mb-2 hidden w-full justify-center rounded-full bg-primary-40 px-3 py-[10px] text-label2-regular text-white md:flex'
          >
            편집하기
          </Link>
          <button
            onClick={handleOpenShareModal}
            className='mx-2 hidden w-full justify-center rounded-full bg-gray-5 px-3 py-[10px] text-label2-regular md:flex'
          >
            저장 및 공유하기
          </button>
          <div></div>
          <div className='mx-2 my-4 mb-[14px] hidden h-[1px] w-full bg-bg md:block' />
          <div className='flex md:block'>
            <Link
              href={slug ? `/${slug}` : '#'}
              className='mx-2 min-w-[104px] cursor-pointer self-center text-extra-medium text-gray-60 md:text-label2-regular'
              onClick={(e) => {
                if (!slug) {
                  e.preventDefault();
                  sweetAlertUtil.error(
                    '미리보기 불가',
                    '명함 정보를 불러오는 것에 실패했습니다. 잠시 후 다시 시도해주세요.'
                  );
                }
              }}
            >
              공유 화면 미리보기
            </Link>
            <div className='mx-2 h-[26px] w-[1px] bg-bg md:hidden' />
            <button
              onClick={handleDeleteCard}
              className='mx-2 block min-w-[104px] cursor-pointer text-left text-extra-medium text-gray-60 md:hidden md:text-center md:text-label2-regular'
            >
              삭제하기
            </button>
          </div>
        </div>
        <div className='mt-6 block w-full md:hidden'>
          <p className='px-6 py-2 text-center text-extra-medium text-gray-50'>
            편집기능은 PC에서 사용해주세요.
          </p>
        </div>
        <div className='mb-8 hidden w-full flex-col items-center justify-center md:flex'>
          <div className='mx-2 my-5 mb-[18px] h-[1px] w-full bg-bg' />
          <button
            onClick={handleDeleteCard}
            className='mx-2 cursor-pointer text-label2-regular text-gray-60'
          >
            삭제하기
          </button>
        </div>
      </div>
      <SaveShareModal />
    </>
  );
};

export default LeftNavSection;

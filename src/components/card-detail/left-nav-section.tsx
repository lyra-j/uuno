'use client';
import { usePathname, useRouter } from 'next/navigation';
import FlipCard from '@/components/card/flip-card';
import CardSelector from '@/components/card-detail/card-selector';
import Link from 'next/link';
import customSweetAlert from '@/utils/card-detail/custom-sweet-alert';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';
import { useCommonModalStore } from '@/store/common-modal.store';
import SaveShareModal from '@/components/card/save-share-modal';
import { useCardDelete } from '@/hooks/mutations/use-card-delete';
import useCardSelectList from '@/hooks/queries/use-card-select-list';
import { authStore } from '@/store/auth.store';
import useCardSlug from '@/hooks/queries/use-card-slug';
import SkeletonUI from '@/components/card-detail/left-nav-skeleton-ui';

const LeftNavSection = () => {
  const open = useCommonModalStore((state) => state.open);
  const pathname = usePathname();
  const card_id = pathname.split('/')[2] || '';
  const userId = authStore((state) => state.userId);
  const router = useRouter();

  const {
    data: slug,
    error: getSlugError,
    isPending: isPendingSlug,
  } = useCardSlug(card_id);

  const { mutate } = useCardDelete();
  const { data, error, isPending } = useCardSelectList(userId as string);

  if (error || getSlugError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (isPendingSlug || isPending) {
    return <SkeletonUI />;
  }

  const handleDeleteCard = async () => {
    customSweetAlert.confirmCardDelete(() => {
      mutate(card_id, {
        onSuccess: () => {
          sweetAlertUtil.success(
            '삭제 성공',
            '명함이 성공적으로 삭제되었습니다.'
          );
          if (data && data.length > 0) {
            router.push(`/card/${data[0].id}`);
          } else {
            router.push('/dashboard');
          }
        },
        onError: () => {
          sweetAlertUtil.error(
            '삭제 실패',
            '명함을 삭제하는 중 오류가 발생했습니다.'
          );
        },
      });
    });
  };
  return (
    <>
      <CardSelector card_id={card_id} data={data} />
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
            href={slug ? `/${slug}` : '#'}
            className='cursor-pointer text-label2-regular text-gray-60'
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
        </div>
        <div className='mb-9 flex w-full flex-col items-center justify-center'>
          <div className='my-5 mb-3 h-[1px] w-full bg-bg' />
          <button
            onClick={handleDeleteCard}
            className='cursor-pointer text-label2-regular text-gray-60'
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

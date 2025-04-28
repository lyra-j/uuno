'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { useShareModal } from '@/hooks/use-share-modal';
import sweetAlertUtil from '@/utils/common/sweet-alert-util';
import { useSaveShareModalStore } from '@/store/save-share-modal.store';

interface ShareButtonProps {
  cardId: string;
  cardData: {
    title: string;
    imageUrl: string;
    description: string;
  };
}

const ShareButton = ({ cardId, cardData }: ShareButtonProps) => {
  const openShareModal = useSaveShareModalStore((state) => state.open);

  const handleShare = useCallback(() => {
    if (cardData) {
      const linkUrl = `${window.location.origin}/card/${cardId}`;
      openShareModal({
        cardId,
        linkUrl,
        title: cardData.title,
        imageUrl: cardData.imageUrl,
        description: cardData.description,
        cardTitle: cardData.title,
      });
    } else {
      sweetAlertUtil.error(
        '명함 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.'
      );
    }
  }, [cardData, cardId, openShareModal]);

  return (
    <div className='fixed bottom-4 right-4 z-50 md:hidden'>
      <div
        onClick={handleShare}
        className='flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary-40 shadow-lg'
      >
        <Image
          src='/icons/vector.svg'
          alt='공유 하기'
          width={24}
          height={24}
          className='text-white'
        />
      </div>
    </div>
  );
};

export default ShareButton;

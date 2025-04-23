'use client';

import { ROUTES } from '@/constants/path.constant';
import { formatToDateString } from '@/utils/interaction/format-date';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CardEditDropdown from '@/components/dashboard/card-edit-dropdown';
import CardTitleEditor from '@/components/dashboard/card-title-editor';
import SaveShareModal from '@/components/card/save-share-modal';
import { authStore } from '@/store/auth.store';
import { Cards } from '@/types/supabase.type';
import { useSlugUrl } from '@/hooks/queries/use-slug-url';

interface CardItemProps {
  card: Cards;
}

const CardItem = ({ card }: CardItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardTitle, setCardTitle] = useState(card.title);
  const nickName = authStore((state) => state.userName);
  const [origin, setOrigin] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') setOrigin(window.location.origin);
  }, []);

  const {
    data: slugToUrl,
    isError: getUrlError,
    isPending: isPendingUrl,
  } = useSlugUrl(card.slug);

  // 생성일자 및 수정일자 포맷
  // card.createdAt형식이 ISO문자열로 2025-04-16 07:52:59.676235+00:00
  // Date 객체로 변환후 사용하는 유틸함수사용
  const formattedDate = formatToDateString(new Date(card.created_at)).split(
    ' '
  )[0];
  // updatedAt이 null이 아니고, 생성일과 다를 때만 수정일로 인식
  const isUpdated =
    card.updated_at !== null && card.updated_at !== card.created_at;
  const formattedUpdatedAt = isUpdated
    ? formatToDateString(new Date(card.updated_at!)).split(' ')[0]
    : formattedDate;

  const dateLabelText = isUpdated
    ? `수정일: ${formattedUpdatedAt}`
    : `생성일: ${formattedDate}`;

  const handleUpdateTitle = (newTitle: string) => {
    setCardTitle(newTitle);
  };

  if (getUrlError) {
    return <div>에러가 발생했습니다.</div>;
  }
  if (isPendingUrl) {
    return <div>로딩중입니다...</div>;
  }

  return (
    <div>
      <div className='group relative flex flex-none flex-col'>
        {/* 드롭다운 메뉴 */}
        <CardEditDropdown
          cardId={card.id}
          userId={card.user_id!}
          title={cardTitle}
          dateLabel={dateLabelText}
          onEdit={() => setIsEditing(true)}
          slug={card.slug}
          imageUrl={card.frontImgURL || ''}
        />

        <Link href={`${ROUTES.MYCARD}/${card.id}`} className='h-[122px]'>
          <div className='relative'>
            {/* 썸네일 */}
            {card.frontImgURL ? (
              <div className='relative aspect-[9/5] w-full overflow-hidden rounded-xl'>
                <Image
                  src={card.frontImgURL}
                  alt={card.title}
                  // sizes를 지정해 줘야 next에서 이미지 최적화 후 뿌려주는 듯...
                  sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                  fill
                  priority
                  className='object-cover'
                />
                {/* 오버레이 */}
                <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-60' />
              </div>
            ) : (
              <div className='aspect-[9/5] w-full rounded-xl bg-black/20 hover:bg-black/90' />
            )}
          </div>
        </Link>
      </div>

      {/* 제목과 날짜 */}
      <div className='mt-2 w-full text-label2-medium text-black'>
        <CardTitleEditor
          cardId={card.id}
          initialTitle={cardTitle}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onUpdate={handleUpdateTitle}
        />
      </div>
      <div className='p-1 text-caption-medium text-gray-70'>
        {dateLabelText}
      </div>
      <SaveShareModal />
    </div>
  );
};

export default CardItem;

'use client';

import { ROUTES } from '@/constants/path.constant';
import { formatToDateString } from '@/utils/interaction/format-date';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CardEditDropdown from '@/components/dashboard/card-edit-dropdown';
import CardTitleEditor from '@/components/dashboard/card-title-editor';
import SaveShareModal from '@/components/card/save-share-modal';
import { Cards } from '@/types/supabase.type';
import { useSlugUrl } from '@/hooks/queries/use-slug-url';
import { SortKey } from '@/types/sort.type';

interface CardItemProps {
  card: Cards;
  sort: SortKey;
}

const CardItem = ({ card, sort }: CardItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardTitle, setCardTitle] = useState(card.title);
  const [updatedAt, setUpdatedAt] = useState(
    card.updated_at ?? card.created_at
  );
  const [origin, setOrigin] = useState<string>('');

  // card.title/updated_at prop이 바뀔 때마다 동기화
  useEffect(() => {
    setCardTitle(card.title);
    setUpdatedAt(card.updated_at ?? card.created_at);
  }, [card.title, card.updated_at]);

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
  const createdDate = formatToDateString(new Date(card.created_at)).split(
    ' '
  )[0];

  const isUpdated = updatedAt !== card.created_at && updatedAt !== null;
  const updatedDate = isUpdated
    ? formatToDateString(new Date(updatedAt)).split(' ')[0]
    : createdDate;

  const dateLabelText = isUpdated
    ? `수정일: ${updatedDate}`
    : `생성일: ${createdDate}`;

  const handleUpdateTitle = (newTitle: string, updatedAt: string) => {
    setCardTitle(newTitle);
    setUpdatedAt(updatedAt);
  };

  if (getUrlError) {
    return <div>에러가 발생했습니다.</div>;
  }
  if (isPendingUrl) {
    return <div>로딩중입니다...</div>;
  }

  return (
    <div className='flex flex-col'>
      <div className='group relative flex flex-col'>
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

        <Link href={`${ROUTES.MYCARD}/${card.id}`}>
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
          sortKey={sort}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onUpdate={handleUpdateTitle}
        />
      </div>
      <div className='p-1 text-caption-medium text-gray-70'>
        {dateLabelText}
      </div>
    </div>
  );
};

export default CardItem;

'use client';
import { ROUTES } from '@/constants/path.constant';
import { formatToDateString } from '@/utils/interaction/format-date';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CardEditDropdown from '@/components/dashboard/card-edit-dropdown';
import CardTitleEditor from '@/components/dashboard/card-title-editor';
import SaveShareModal from '@/components/card/save-share-modal';
import { CARD_IMAGE_URL } from '@/constants/card-image';
import { authStore } from '@/store/auth.store';

interface CardData {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string | null;
  thumbnail: string | null;
  slug: string;
}

const CardItem = ({ card }: { card: CardData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardTitle, setCardTitle] = useState(card.title);
  const nickName = authStore((state) => state.userName);
  const [origin, setOrigin] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') setOrigin(window.location.origin);
  }, []);

  // 생성일자 및 수정일자 포맷
  // card.createdAt형식이 ISO문자열로 2025-04-16T07:52:59.676235+00:00
  // Date 객체로 변환후 사용하는 유틸함수사용
  const formattedDate = formatToDateString(new Date(card.createdAt)).split(
    ' '
  )[0];
  // updatedAt이 null이 아니고, 생성일과 다를 때만 수정일로 인식
  const isUpdated =
    card.updatedAt !== null && card.updatedAt !== card.createdAt;
  const formattedUpdatedAt = isUpdated
    ? formatToDateString(new Date(card.updatedAt!)).split(' ')[0]
    : formattedDate;

  const dateLabelText = isUpdated
    ? `수정일: ${formattedUpdatedAt}`
    : `생성일: ${formattedDate}`;

  const handleUpdateTitle = (newTitle: string) => {
    setCardTitle(newTitle);
  };

  return (
    <div>
      <div className='group relative flex flex-col'>
        {/* 드롭다운 메뉴 */}
        <CardEditDropdown
          cardId={card.id}
          title={cardTitle}
          dateLabel={dateLabelText}
          onEdit={() => setIsEditing(true)}
          slug={card.slug}
        />

        <Link href={`${ROUTES.MYCARD}/${card.id}`} className='h-[122px]'>
          <div className='relative'>
            {/* 썸네일 */}
            {card.thumbnail ? (
              <div className='relative aspect-[9/5] w-full overflow-hidden rounded-xl'>
                <Image
                  src={card.thumbnail}
                  alt={card.title}
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
      <SaveShareModal
        cardId={card.id}
        linkUrl={`${origin}/${card.slug}`}
        title={`${nickName}의 명함`}
        imageUrl={CARD_IMAGE_URL(card.id)}
        description='Uuno에서 생성한 명함'
      />
    </div>
  );
};

export default CardItem;

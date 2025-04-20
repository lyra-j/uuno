'use client';

import React from 'react';
import CreateNewCard from './create-new-card';
import CardItem from './card-item';
import SortDropdown from './sort-dropdown';
import useCardList from '@/hooks/queries/use-card-list';

interface CardListProps {
  userId: string;
}

const CardList = ({ userId }: CardListProps) => {
  const { data: cards, isPending, isError, error } = useCardList(userId);

  // 로딩 중 UI
  if (isPending) {
    return <p>명함을 불러오는 중...</p>;
  }

  // 에러 발생 시 UI
  if (isError) {
    return (
      <p className='text-error'>
        명함 목록 조회 중 오류가 발생했습니다.: {error.message}
      </p>
    );
  }

  return (
    <>
      {/*  명함 목록 헤더 */}
      <div className='flex items-center justify-between border-b px-2 py-3'>
        <h3 className='text-body-semi'>
          내 명함 <span className='text-gray-70'>{cards.length}개</span>
        </h3>
        <SortDropdown />
      </div>

      {/* 명함 목록 */}
      <div className='mt-[26px] grid gap-6 gap-y-9 px-2 sm:grid-cols-2 md:grid-cols-3'>
        {/* 새로운 명함 만들기 */}
        <CreateNewCard />
        {/* 명함 맵핑 */}
        {cards?.map((card) => <CardItem key={card.id} card={card} />)}
      </div>
    </>
  );
};

export default CardList;

'use client';

import React, { useState } from 'react';
import CreateNewCard from './create-new-card';
import CardItem from './card-item';
import SortDropdown from './sort-dropdown';
import { CommonButton } from '../common/common-button';
import AddIcon from '../icons/add-icon';
import { ROUTES } from '@/constants/path.constant';
import Link from 'next/link';
import { SortKey } from '@/types/sort.type';
import { SORT_OPTIONS } from '@/constants/sort.constant';
import { useSortedCards } from '@/hooks/queries/use-card-list';

interface CardListProps {
  userId: string;
}

const CardList = ({ userId }: CardListProps) => {
  const [sortKey, setSortKey] = useState<SortKey>(SORT_OPTIONS[0].value);
  const { data: cards, isPending, isError } = useSortedCards(userId, sortKey);

  // 로딩 중 UI
  if (isPending) {
    return (
      <div className='flex flex-col space-y-4'>
        <div className='flex items-center justify-between border-b px-2 py-3'>
          <div className='h-6 w-32 animate-pulse rounded bg-gray-20'></div>
          <div className='h-8 w-24 animate-pulse rounded bg-gray-20'></div>
        </div>
        <div className='mt-[26px] grid gap-6 gap-y-9 px-2 sm:grid-cols-2 md:grid-cols-3'>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className='aspect-[9/5] w-full animate-pulse rounded-xl bg-gray-20'
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // 에러 발생 시 UI
  if (isError) {
    return <p className='text-error'>명함 목록 조회 중 오류가 발생했습니다.</p>;
  }

  return (
    <>
      {/*  명함 목록 헤더 */}
      <div className='flex items-center justify-between px-2 py-3 max-md:flex-col max-md:items-start max-md:gap-4 max-md:py-4 md:border-b'>
        <h3 className='text-body-semi'>
          내 명함 <span className='text-gray-70'>{cards.length}개</span>
        </h3>

        <div className='flex flex-row items-center justify-between max-md:w-full'>
          <SortDropdown
            options={SORT_OPTIONS}
            defaultValue={sortKey}
            onSelect={setSortKey}
          />

          <CommonButton
            variant='secondary'
            textClass='text-label2-medium'
            className='md:hidden'
            asChild
          >
            <Link href={ROUTES.EDITOR} className='flex items-center'>
              <AddIcon className='text-primary-40' />
              명함 제작하기
            </Link>
          </CommonButton>
        </div>
      </div>

      {/* 명함 목록 */}
      <div className='grid gap-6 gap-y-9 px-2 sm:grid-cols-1 md:mt-[26px] md:grid-cols-2 lg:grid-cols-3'>
        {/* 새로운 명함 만들기 */}
        <CreateNewCard cardCount={cards.length} />
        {/* 명함 맵핑 */}
        {cards?.map((card) => <CardItem key={card.id} card={card} />)}
      </div>
    </>
  );
};

export default CardList;

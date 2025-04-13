import CardItem from '@/components/dashboard/card-item';
import CreatNewCard from '@/components/dashboard/creat-new-card';
import SortDropdown from '@/components/dashboard/sort-dropdown';
import React from 'react';

// 테스트용
interface CardData {
  id: string;
  title: string;
  createdAt: string;
}

const MyCardsPage = () => {
  const sampleCards: CardData[] = [
    {
      id: '1',
      title: '제목을 입력해주세요.333333...',
      createdAt: '4분전',
    },
    {
      id: '2',
      title: '제목을 입력해주세요.444444...',
      createdAt: '4분전',
    },
    {
      id: '3',
      title: 'LA MER HOTEL',
      createdAt: '4분전',
    },
  ];

  return (
    <>
      {/* 명함 통계 */}
      <article className='flex'>
        <div className='mr-[14px] h-48 w-2/3 rounded-xl bg-slate-700'>
          월간 통계(총 조회수, 총 저장수)
        </div>
        <div className='h-48 w-1/3 rounded-xl bg-slate-700'>
          가장 조회수가 높은 명함
        </div>
      </article>

      {/* 내 명함 목록 */}
      <article className='mt-[14px] rounded-xl bg-white px-7 pb-8'>
        {/*  명함 목록 헤더 */}
        <div className='flex items-center justify-between border-b px-2 py-3'>
          <h3 className='text-body-semi'>
            내 명함 <span className='text-gray-70'>{sampleCards.length}개</span>
          </h3>
          <SortDropdown />
        </div>

        {/* 명함 목록 */}
        <div className='mt-[26px] grid gap-6 gap-y-9 px-2 sm:grid-cols-2 md:grid-cols-3'>
          {/* 새로운 명함 만들기 */}
          <CreatNewCard />
          {/* 명함 맵핑 */}
          {sampleCards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
      </article>
    </>
  );
};

export default MyCardsPage;

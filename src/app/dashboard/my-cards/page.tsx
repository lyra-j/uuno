import CardItem from '@/components/dashboard/card-item';
import CreatNewCard from '@/components/dashboard/create-new-card';
import MonthlyChart from '@/components/dashboard/monthly-chart';
import MostViewCard from '@/components/dashboard/most-view-card';
import SortDropdown from '@/components/dashboard/sort-dropdown';
import { DB_COLUMNS, TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/server';
import React from 'react';

interface CardData {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string | null;
  thumbnail: string | null;
  slug: string;
}

const MyCardsPage = async () => {
  const supabase = await createClient();

  // 현재 세션 정보를 받아옴
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error('세션 정보를 가져오는 중 에러 발생:', sessionError);
  }

  // 로그인하지 않은 경우 처리
  if (!session?.user?.id) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p className='text-lg'>로그인 후 이용 가능합니다.</p>
      </div>
    );
  }

  const userId = session.user.id;

  const { data: cards, error } = await supabase
    .from(TABLES.CARDS)
    .select('*')
    .eq(DB_COLUMNS.CARDS.USER_ID, userId)
    .order(DB_COLUMNS.CARDS.CREATED_AT, { ascending: false });

  if (error) {
    console.error('카드 데이터 불러오기 에러: ', error);
    return (
      <div className='flex h-screen items-center justify-center'>
        <p className='text-lg text-red-500'>
          카드 정보를 불러오는 중 오류가 발생했습니다. 잠시 후 다시
          시도해주세요.
        </p>
      </div>
    );
  }

  const cardList: CardData[] = (cards ?? []).map((card) => ({
    id: card.id,
    title: card.title,
    createdAt: card.created_at,
    updatedAt: card.updated_at,
    thumbnail: card.frontImgURL,
    slug: card.slug,
  }));

  return (
    <>
      {/* 명함 통계 */}
      <article className='flex'>
        <div className='mr-[14px] w-2/3 rounded-xl'>
          <MonthlyChart userId={userId} />
        </div>
        <div className='rounded-xl'>
          <MostViewCard userId={userId} />
        </div>
      </article>

      {/* 내 명함 목록 */}
      <article className='mt-[14px] rounded-xl bg-white px-7 pb-8'>
        {/*  명함 목록 헤더 */}
        <div className='flex items-center justify-between border-b px-2 py-3'>
          <h3 className='text-body-semi'>
            내 명함 <span className='text-gray-70'>{cardList.length}개</span>
          </h3>
          <SortDropdown />
        </div>

        {/* 명함 목록 */}
        <div className='mt-[26px] grid gap-6 gap-y-9 px-2 sm:grid-cols-2 md:grid-cols-3'>
          {/* 새로운 명함 만들기 */}
          <CreatNewCard />
          {/* 명함 맵핑 */}
          {cardList.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
      </article>
    </>
  );
};

export default MyCardsPage;

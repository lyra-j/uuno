import CardItem from '@/components/dashboard/card-item';
import CreatNewCard from '@/components/dashboard/creat-new-card';
import SortDropdown from '@/components/dashboard/sort-dropdown';
import { TABLES } from '@/constants/tables.constant';
import { createClient } from '@/utils/supabase/server';
import React from 'react';

interface CardData {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string | null;
  thumbnail: string | null;
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
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('카드 데이터 불러오기 에러: ', error);
  }

  const cardList: CardData[] = (cards ?? []).map((card) => ({
    id: card.id,
    title: card.title,
    createdAt: card.created_at,
    updatedAt: card.updated_at,
    thumbnail: card.frontImgURL,
  }));

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

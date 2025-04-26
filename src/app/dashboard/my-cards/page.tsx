import SaveShareModal from '@/components/card/save-share-modal';
import CardList from '@/components/dashboard/card-list';
import MonthlyChart from '@/components/dashboard/monthly-chart';
import MostViewCard from '@/components/dashboard/most-view-card';
import { createClient } from '@/utils/supabase/server';

const MyCardsPage = async () => {
  const supabase = await createClient();

  // 유저 정보 조회
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error('유저 정보를 가져오는 중 에러 발생:', error);
    throw new Error('유저 정보를 불러올 수 없습니다.');
  }

  const userId = user.id;

  return (
    <div className='flex flex-col min-h-full
    '>
      {/* 명함 통계 */}
      <article className='flex'>
        <div className='mr-[14px] w-2/3 rounded-xl'>
          <MonthlyChart userId={userId} />
        </div>
        <div className='w-1/3 rounded-xl'>
          <MostViewCard userId={userId} />
        </div>
      </article>

      {/* 내 명함 목록 */}
      <article className='mt-[14px] flex-1 rounded-xl bg-white px-7 pb-8'>
        <CardList userId={userId} />
      </article>

      {/* 저장 및 공유하기 모달 */}
      <SaveShareModal />
    </div>
  );
};

export default MyCardsPage;

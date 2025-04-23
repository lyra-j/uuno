import SaveShareModal from '@/components/card/save-share-modal';
import CardList from '@/components/dashboard/card-list';
import MonthlyChart from '@/components/dashboard/monthly-chart';
import MostViewCard from '@/components/dashboard/most-view-card';
import { createClient } from '@/utils/supabase/server';

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

  return (
    <>
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
      <article className='mt-[14px] rounded-xl bg-white px-7 pb-8'>
        <CardList userId={userId} />
      </article>

      {/* 저장 및 공유하기 모달 */}
      <SaveShareModal />
    </>
  );
};

export default MyCardsPage;

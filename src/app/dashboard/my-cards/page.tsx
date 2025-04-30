import SaveShareModal from '@/components/card/save-share-modal';
import CardList from '@/components/dashboard/card-list';
import MonthlyChart from '@/components/dashboard/monthly-chart';
import MostViewCard from '@/components/dashboard/most-view-card';
import { createClient } from '@/utils/supabase/server';

export const generateMetadata = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error('유저 정보를 가져오는 중 에러 발생:', error);
    throw new Error('유저 정보를 불러올 수 없습니다.');
  }

  return {
    title: `${user.user_metadata.nick_name}님의 디지털 명함 | Uuno`,
    description: `${user.user_metadata.nick_name}님의 명함을 만나보세요.`,
  };
};

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
    <div className='flex min-h-full flex-col'>
      {/* 명함 통계 */}
      <article className='flex gap-[14px] max-md:flex-col'>
        <div className='w-2/3 rounded-xl max-md:w-full'>
          <MonthlyChart userId={userId} />
        </div>
        <div className='w-1/3 rounded-xl max-md:w-full'>
          <MostViewCard userId={userId} />
        </div>
      </article>

      {/* 내 명함 목록 */}
      <article className='mt-[14px] flex-1 rounded-t-xl bg-white px-7 pb-8 max-md:px-[18px]'>
        <CardList userId={userId} />
      </article>

      {/* 저장 및 공유하기 모달 */}
      <SaveShareModal />
    </div>
  );
};

export default MyCardsPage;

import { notFound } from 'next/navigation';
import ExportButtons from '@/components/card-detail/export-buttons';
import PathAnalysisGrid from '@/components/card-detail/path-analysis-grid';
import StatCardGrid from '@/components/card-detail/stat-card-grid';
import WeeklyChart from '@/components/card-detail/weekly-chart';
import LeftArrow from '@/components/icons/left-arrow';
import LeftNavSection from '@/components/card-detail/left-nav-section';
import Link from 'next/link';
import { getCardTitle } from '@/apis/card-interaction';
import SaveShareModal from '@/components/card/save-share-modal';
import ShareButton from '@/components/card-detail/share-button';

interface CardDetailProps {
  params: {
    id: string[];
  };
}

interface CardData {
  title: string;
  nickName: string;
  imageUrl: string;
  description: string;
}

// 데이터 가져오는 함수를 분리
const getCardData = async (cardId: string): Promise<CardData | null> => {
  try {
    const response = await getCardTitle(cardId);
    return {
      title: response.title,
      nickName: response.nickName,
      imageUrl: response.imageUrl,
      description: response.description.toString(),
    };
  } catch (error) {
    console.error('카드 데이터 로딩 중 오류:', error);
    return null;
  }
};

const CardPage = async ({ params }: CardDetailProps) => {
  // ID 유효성 검사
  if (!params.id?.length) {
    notFound();
  }

  const cardId = params.id[0];
  console.log('Card ID:', cardId); // 디버깅용 로그

  if (!cardId) {
    notFound();
  }

  const cardData = await getCardData(cardId);

  // 데이터가 없으면 404
  if (!cardData) {
    notFound();
  }

  // 데이터가 있으면 페이지 렌더링
  return (
    <div className='h-screen md:h-[calc(100vh-64px)]'>
      <div className='flex h-full flex-col'>
        <div className='flex items-center border-b border-solid border-gray-5 px-5 py-[14px] md:p-6'>
          {/* 페이지 타이틀 */}
          <div className='mx-auto flex w-full max-w-5xl items-center justify-center md:justify-start'>
            <Link
              href='/dashboard'
              className='absolute left-[20px] cursor-pointer md:static md:mr-2'
              aria-label='뒤로 가기'
            >
              <div className='md:hidden'>
                <LeftArrow size={24} />
              </div>
              <div className='hidden md:block'>
                <LeftArrow />
              </div>
            </Link>
            <h2 className='text-label1-semi md:text-title-bold'>
              내 명함 상세
            </h2>
          </div>
        </div>

        <div className='max-w-5xl md:mx-auto'>
          <div className='flex flex-col md:max-h-[calc(100vh-150px)] md:flex-row'>
            {/* 왼쪽 컬럼 */}
            <div className='overflow-initial flex w-full flex-col border-r border-gray-5 px-[28px] py-3 text-body-regular shadow-[0px_3px_18px_0px_rgba(0,0,0,0.04)] md:w-[318px] md:overflow-auto'>
              <LeftNavSection />
            </div>

            {/* 오른쪽 컬럼 - 통계 정보 */}
            <div className='flex flex-1 flex-col bg-bg'>
              {/* 통계 헤더 */}
              <div className='flex items-center justify-between bg-white py-[14px] pl-4 pr-[22px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] md:py-[10px] md:pl-[30px]'>
                <h3 className='text-label1-semi md:text-heading-bold'>
                  내 명함 통계
                </h3>
                <ExportButtons />
              </div>

              {/* 통계 내용 */}
              <div className='flex-1 px-3 py-4 md:overflow-auto md:px-[22px] md:py-[14px]'>
                <StatCardGrid />
                <WeeklyChart card_id={cardId} />
                <PathAnalysisGrid />
              </div>
            </div>
          </div>
        </div>

        {/* 모바일 공유할 아이콘 */}
        <ShareButton cardId={cardId} cardData={cardData} />
      </div>
      <SaveShareModal />
    </div>
  );
};

export default CardPage;

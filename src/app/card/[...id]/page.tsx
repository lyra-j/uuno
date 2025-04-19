import { notFound } from 'next/navigation';
import ExportButtons from '@/components/card-detail/export-buttons';
import PathAnalysisGrid from '@/components/card-detail/path-analysis-grid';
import StatCardGrid from '@/components/card-detail/stat-card-grid';
import WeeklyChart from '@/components/card-detail/weekly-chart';
import LeftArrow from '@/components/icons/left-arrow';
import LeftNavSection from '@/components/card-detail/left-nav-section';
import Link from 'next/link';
import { getCardTitle } from '@/apis/card-interaction';

interface CardDetailProps {
  params: {
    id: string[];
  };
}

// 서버 컴포넌트로 변경 (async 키워드 추가)
const CardPage = async ({ params }: CardDetailProps) => {
  // ID 유효성 검사
  if (!params.id || params.id.length === 0) {
    notFound();
  }

  const cardId = params.id[0];

  try {
    // 카드 데이터 가져오기
    const cardData = await getCardTitle(cardId);

    // 데이터가 없으면 404
    if (!cardData) {
      notFound();
    }

    // 데이터가 있으면 페이지 렌더링
    return (
      <div className='h-[calc(100vh-64px)]'>
        <div className='flex items-center border-b border-solid border-gray-5 p-6'>
          {/* 페이지 타이틀 */}
          <div className='mx-auto flex w-full max-w-5xl items-center justify-start'>
            <Link
              href={`/dashboard`}
              className='mr-2 cursor-pointer'
              aria-label='뒤로 가기'
            >
              <LeftArrow />
            </Link>
            <h2 className='text-title-bold'>내 명함 상세</h2>
          </div>
        </div>
        <div className='mx-auto max-w-5xl'>
          <div className='flex max-h-[calc(100vh-150px)]'>
            {/* 왼쪽 컬럼 */}
            <div className='flex w-[318px] flex-col overflow-auto border-r border-gray-5 px-[28px] py-3 text-body-regular shadow-[0px_3px_18px_0px_rgba(0,0,0,0.04)]'>
              {/* 명함 플립 및 하단 버튼 */}
              <LeftNavSection />
            </div>
            {/* 오른쪽 컬럼 - 통계 정보 */}
            <div className='flex flex-1 flex-col bg-bg'>
              {/* 통계 헤더 */}
              <div className='flex items-center justify-between bg-white py-[10px] pl-[30px] pr-[22px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)]'>
                <h3 className='text-heading-bold'>내 명함 통계</h3>
                <ExportButtons />
              </div>
              <div className='flex-1 overflow-auto px-[22px] py-[14px]'>
                {/* 통계 카드 그리드 */}
                <StatCardGrid />

                {/* 주간 통계 차트 */}
                <WeeklyChart card_id={cardId} />

                {/* 경로 분석 차트 그리드 */}
                <PathAnalysisGrid />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // 에러 발생 시 404
    console.error('카드 데이터 로딩 중 오류:', error);
    notFound();
  }
};

export default CardPage;

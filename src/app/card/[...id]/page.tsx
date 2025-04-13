import PathAnalysisGrid from '@/components/card-detail/path-analysis-grid';
import StatCardGrid from '@/components/card-detail/stat-card-grid';
import WeeklyChart from '@/components/card-detail/weekly-chart';
import FlipCard from '@/components/card/flip-card';
import CsvIcon from '@/components/icons/csv-icon';
import PdfIcon from '@/components/icons/pdf-icon';

interface CardDetailProps {
  params: {
    id: string[];
  };
}
const page = ({ params }: CardDetailProps) => {
  return (
    <div className='h-[calc(100vh-64px)]'>
      <div className='flex items-center border-b border-solid border-zinc-100 p-6'>
        {/* 페이지 타이틀 */}
        <div className='mx-auto flex w-full max-w-5xl items-center justify-start'>
          <button className='mr-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
          <h2 className='text-title-bold'>내 명함 상세</h2>
        </div>
      </div>
      <div className='mx-auto max-w-5xl'>
        <div className='flex max-h-[calc(100vh-150px)]'>
          {/* 왼쪽 컬럼 */}
          <div className='flex w-1/3 flex-col overflow-auto border-r border-gray-5 p-3.5 text-body-regular shadow-[0px_3px_18px_0px_rgba(0,0,0,0.04)]'>
            <select name='' id='' className='py-2'>
              <option value='test1'>test1</option>
              <option value='test2'>test2</option>
              <option value='test3'>test3</option>
            </select>
            {/* 명함 플립 */}
            <FlipCard />
          </div>
          {/* 오른쪽 컬럼 - 통계 정보 */}
          <div className='flex w-2/3 flex-col bg-bg'>
            {/* 통계 헤더 */}
            <div className='flex items-center justify-between bg-white p-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)]'>
              <h3 className='text-heading-bold'>내 명함 통계</h3>
              <div className='flex gap-2'>
                <button className='flex gap-1 px-2 py-1 text-label2-regular text-primary-40'>
                  <CsvIcon />
                  CSV
                </button>
                <button className='flex gap-1 px-2 py-1 text-label2-regular text-primary-40'>
                  <PdfIcon />
                  PDF
                </button>
              </div>
            </div>
            <div className='flex-1 overflow-auto p-5'>
              {/* 통계 카드 그리드 */}
              <StatCardGrid />

              {/* 주간 통계 차트 */}
              <WeeklyChart title={'포트폴리오'} card_id={params.id[0]} />

              {/* 경로 분석 차트 그리드 */}
              <PathAnalysisGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

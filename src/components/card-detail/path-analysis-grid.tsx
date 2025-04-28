import PathAnalysisChart from '@/components/card-detail/path-analysis-chart';

const PathAnalysisGrid = () => (
  <div className='grid h-full grid-cols-1 gap-y-[10px] md:h-[300px] md:grid-cols-3 md:gap-4'>
    <div className='col-span-2 h-full'>
      <PathAnalysisChart title='명함 유입 경로' />
    </div>
    <div className='col-span-1 h-full'>
      <PathAnalysisChart title='방문자 클릭 분석' />
    </div>
  </div>
);

export default PathAnalysisGrid;

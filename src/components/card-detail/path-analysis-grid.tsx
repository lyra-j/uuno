import PathAnalysisChart from './path-analysis-chart';

const PathAnalysisGrid = () => (
  <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
    <div className='col-span-2'>
      <PathAnalysisChart title='명함 유입 경로' />
    </div>
    <div className='col-span-1'>
      <PathAnalysisChart title='유저 저장 경로' />
    </div>
  </div>
);

export default PathAnalysisGrid;

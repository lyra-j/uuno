import DonutChart from '../chart/donut-chart';

interface Props {
  title: string;
}
const PathAnalysisChart = ({ title }: Props) => (
  <div className='rounded-lg bg-white p-4'>
    <h3 className='mb-4 text-base font-medium text-[#1A1A1A]'>{title}</h3>
    {title === '방문자 클릭 분석' ? (
      <div className='h-[calc(100%-2rem)] overflow-auto'>
        <DonutChart />
      </div>
    ) : (
      <div className='flex h-[200px] items-center justify-center rounded-lg bg-gray-100'>
        <span className='text-gray-400'>차트 영역</span>
      </div>
    )}
  </div>
);
export default PathAnalysisChart;

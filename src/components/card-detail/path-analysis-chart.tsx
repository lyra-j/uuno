import DonutChart from '@/components/chart/donut-chart';

interface Props {
  title: string;
}
const PathAnalysisChart = ({ title }: Props) => (
  <div className='flex h-full flex-col rounded-lg bg-white px-[30px] py-[18px]'>
    <h4 className='mb-2 flex-shrink-0 text-label1-medium text-black'>
      {title}
    </h4>
    {title === '방문자 클릭 분석' ? (
      <div className='flex-1 overflow-hidden'>
        <DonutChart />
      </div>
    ) : (
      <div className='flex flex-1 items-center justify-center rounded-lg bg-gray-5'>
        <span className='text-gray-40'>차트 영역</span>
      </div>
    )}
  </div>
);
export default PathAnalysisChart;

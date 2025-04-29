import DonutChart from '@/components/chart/donut-chart';
import { StackedChartWrapper } from '../chart/stacked-chart-wrapper';

interface Props {
  title: string;
}

const PathAnalysisChart = ({ title }: Props) => (
  <div className='flex h-full flex-col gap-3 rounded-lg bg-white px-[14px] pb-5 pt-4 md:gap-0 md:px-[24px] md:py-[18px]'>
    <h4 className='flex-shrink-0 text-label2-medium text-black md:mb-2 md:text-label1-medium'>
      {title}
    </h4>
    {title === '방문자 클릭 분석' ? (
      <div className='flex-1 overflow-hidden'>
        <DonutChart />
      </div>
    ) : (
      <div className='flex-1 rounded-lg bg-white'>
        <StackedChartWrapper />
      </div>
    )}
  </div>
);

export default PathAnalysisChart;

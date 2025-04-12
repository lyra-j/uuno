'use client';
import useWeekChart from '@/hooks/queries/use-week-chart';
import LineChart from '../chart/line-chart';

interface WeeklyChartProps {
  title: string;
  card_id: string;
}

const WeeklyChart = ({ title, card_id }: WeeklyChartProps) => {
  const { data: weekChartData, isPending, error } = useWeekChart(card_id);

  if (isPending)
    return (
      <div className='mb-6 rounded-xl bg-white p-4'>
        <div className='mb-4 h-6 w-1/3 animate-pulse rounded bg-gray-200'></div>
        <div className='h-40 animate-pulse rounded bg-gray-100'></div>
      </div>
    );
  if (error)
    return (
      <div className='mb-6 rounded-xl bg-red-50 p-4 text-red-600'>
        <p>주간 통계 데이터를 불러오는 중 오류가 발생했습니다.</p>
        <p className='text-sm'>{error.message}</p>
      </div>
    );

  const {
    weekViewCnt = [],
    weekSaveCnt = [],
    start = { display: '', iso: '' },
    end = { display: '', iso: '' },
  } = weekChartData || {};

  const dateRange = `${start.display} ~ ${end.display}`;
  return (
    <div className='mb-6 rounded-xl bg-white p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <p className='text-base font-medium'>
          {title} 주간 통계 -{' '}
          <span className='text-[#70737C]'>{dateRange}</span>
        </p>
      </div>
      <div className='grid grid-cols-3'>
        <div className='col-span-2 mb-2 flex h-40 items-center justify-center'>
          <LineChart
            weekViewCnt={weekViewCnt}
            weekSaveCnt={weekSaveCnt}
            weekDates={weekChartData?.weekDates || []}
          />
        </div>
        <div className='col-span-1 mb-6 flex flex-col items-start justify-center text-xs text-gray-500'>
          <div className='mx-auto my-0 text-base font-medium text-[#1A1A1A]'>
            <p className='text-[12px] text-[#3970D5]'>주간 조회 수</p>
            <p>{`${weekViewCnt
              .filter((v): v is number => v !== null && v !== undefined)
              .reduce((a, c) => a + c, 0)}회`}</p>
            <p className='text-[12px] text-[#E66B00]'>주간 저장 수</p>
            <p>{`${weekSaveCnt
              .filter((v): v is number => v !== null && v !== undefined)
              .reduce((a, c) => a + c, 0)}회`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChart;

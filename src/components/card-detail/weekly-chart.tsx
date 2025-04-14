'use client';
import useWeekChart from '@/hooks/queries/use-week-chart';
import LineChart from '@/components/chart/line-chart';
import { useEffect } from 'react';
import { useCardDataStore } from '@/store/card-data.store';

interface WeeklyChartProps {
  title: string;
  card_id: string;
}

const WeeklyChart = ({ title, card_id }: WeeklyChartProps) => {
  const { data: weekChartData, isPending, error } = useWeekChart(card_id);
  const setHasData = useCardDataStore((state) => state.setHasData);

  useEffect(() => {
    setHasData(
      (weekChartData?.weekSaveCnt ?? [])
        .filter((v): v is number => v !== null && v !== undefined)
        .reduce((a, c) => a + c, 0) > 0 ||
        (weekChartData?.weekViewCnt ?? [])
          .filter((v): v is number => v !== null && v !== undefined)
          .reduce((a, c) => a + c, 0) > 0
    );
  }, [weekChartData, setHasData]);

  if (isPending)
    return (
      <div className='mb-6 rounded-xl bg-white p-4'>
        <div className='mb-4 h-6 w-1/3 animate-pulse rounded bg-gray-10'></div>
        <div className='h-40 animate-pulse rounded bg-gray-5'></div>
      </div>
    );
  if (error)
    return (
      <div className='mb-6 rounded-xl bg-red-50 p-4 text-error'>
        <p>주간 통계 데이터를 불러오는 중 오류가 발생했습니다.</p>
        <p className='text-label2-regular'>{error.message}</p>
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
        <p className='text-label1-medium'>
          {title} 주간 통계 - <span className='text-gray-70'>{dateRange}</span>
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
        <div className='col-span-1 mb-6 flex flex-col items-start justify-center text-caption-regular text-gray-50'>
          <div className='mx-auto my-0 text-label1-medium text-black'>
            <p className='text-caption-regular text-primary-40'>주간 조회 수</p>
            <p className='mb-1'>{`${weekViewCnt
              .filter((v): v is number => v !== null && v !== undefined)
              .reduce((a, c) => a + c, 0)}회`}</p>
            <p className='text-caption-regular text-chart2-image'>
              주간 저장 수
            </p>
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

'use client';
import useWeekChart from '@/hooks/queries/use-week-chart';
import LineChart from '@/components/chart/line-chart';
import { useEffect } from 'react';
import { useCardDataStore } from '@/store/card-data.store';
import { usePathname } from 'next/navigation';
import { useGetCardTitle } from '@/hooks/queries/use-card-interaction';

interface WeeklyChartProps {
  card_id: string;
}

const WeeklyChart = ({ card_id }: WeeklyChartProps) => {
  const {
    data: titleData,
    isPending: titleIsPending,
    error: titleError,
  } = useGetCardTitle(card_id);

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

  if (isPending || titleIsPending)
    return (
      <div className='mb-6 rounded-xl bg-white p-4 md:pb-[23px] md:pl-[22px] md:pt-[20px]'>
        <div className='mb-4 h-6 w-1/3 animate-pulse rounded bg-gray-10'></div>
        <div className='h-40 animate-pulse rounded bg-gray-5'></div>
      </div>
    );
  if (error || titleError)
    return (
      <div className='mb-6 rounded-xl bg-red-50 p-4 text-error'>
        <p>주간 통계 데이터를 불러오는 중 오류가 발생했습니다.</p>
        <p className='text-label2-regular'>
          {error?.message || titleError?.message}
        </p>
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
    <div className='mb-6 rounded-xl bg-white p-4 md:pb-[23px] md:pl-[22px] md:pt-[20px]'>
      <div className='flex items-center justify-between md:ml-[18px]'>
        <p className='mb-5 text-label1-medium md:mb-6'>
          {titleData.title} 주간 통계 -{' '}
          <span className='text-gray-70'>{dateRange}</span>
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className='col-span-2 mb-2 flex items-center justify-center'>
          <LineChart
            weekViewCnt={weekViewCnt}
            weekSaveCnt={weekSaveCnt}
            weekDates={weekChartData?.weekDates || []}
          />
        </div>
        <div className='col-span-1 mb-6 mt-[19px] flex items-start justify-center text-caption-regular text-gray-50 md:mt-0 md:flex-col'>
          <div className='mx-auto my-0 flex w-full flex-row text-label1-medium text-black md:w-auto md:flex-col'>
            <div className='flex flex-1 flex-row items-center justify-center gap-2 md:flex-col md:gap-0'>
              <p className='text-extra-medium text-primary-40 md:text-label2-medium'>
                주간 조회 수
              </p>
              <p className='text-label2-medium md:mb-1 md:text-body-medium'>{`${weekViewCnt
                .filter((v): v is number => v !== null && v !== undefined)
                .reduce((a, c) => a + c, 0)}회`}</p>
            </div>
            <div className='mx-2 h-[26px] w-[1px] bg-bg md:hidden' />
            <div className='flex flex-1 flex-row items-center justify-center gap-2 md:flex-col md:gap-0'>
              <p className='text-extra-medium text-chart2-image md:text-label2-medium'>
                주간 저장 수
              </p>
              <p className='text-label2-medium md:text-body-medium'>{`${weekSaveCnt
                .filter((v): v is number => v !== null && v !== undefined)
                .reduce((a, c) => a + c, 0)}회`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChart;

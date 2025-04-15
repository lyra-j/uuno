'use client';

import {
  useUserMonthLineData,
  useUserMonthStats,
} from '@/hooks/queries/use-month-chart';
import { useCardDataStore } from '@/store/card-data.store';
import { useEffect } from 'react';
import MonthlyLineChart from './monthly-line-chart';

interface MonthlyChartProps {
  userId: string;
}

const MonthlyChart = ({ userId }: MonthlyChartProps) => {
  // 라인 차트 데이터
  const {
    data: lineData,
    isPending: linePending,
    error: lineError,
  } = useUserMonthLineData(userId);

  // 월간 총 통계 데이터
  const {
    data: statsData,
    isPending: statsPending,
    error: statsError,
  } = useUserMonthStats(userId);

  const setHasData = useCardDataStore((state) => state.setHasData);

  useEffect(() => {
    if (!lineData || !statsData) return;

    const sumViews = lineData.monthViewCnt.reduce((acc, cur) => acc + cur, 0);
    const sumSaves = lineData.monthSaveCnt.reduce((acc, cur) => acc + cur, 0);
    setHasData(sumViews > 0 || sumSaves > 0);
  }, [lineData, statsData, setHasData]);

  // 펜딩 처리
  if (linePending || statsPending) {
    return (
      <div className='mb-6 rounded-xl bg-white p-4'>
        <div className='mb-4 h-6 w-1/3 animate-pulse rounded bg-gray-10'></div>
        <div className='h-40 animate-pulse rounded bg-gray-5'></div>
      </div>
    );
  }

  // 에러 처리
  if (lineError || statsError) {
    return (
      <div className='mb-6 rounded-xl bg-red-50 p-4 text-error'>
        <p>월간 통계 데이터를 불러오는 중 오류가 발생했습니다.</p>
        <p className='text-label2-regular'>
          {(lineError || statsError)?.message}
        </p>
      </div>
    );
  }

  //라인 차트 데이터 분해
  const {
    monthDates = [],
    monthViewCnt = [],
    monthSaveCnt = [],
    start = '',
  } = lineData || {};

  // 총 통계 데이터 분해
  const {
    totalMonthViews = 0,
    totalMonthSaves = 0,
  } = statsData || {};

  // 차트에 표시할 "YYYY.MM"
  const yearMonth = `${String(start).slice(0, 4)}.${String(start).slice(5, 7)}`;

  return (
    <div className='flex flex-col gap-4 rounded-xl bg-white px-7 py-3'>
      <div className='flex items-center'>
        <p className='text-label1-medium'>
          내 명함 월간 통계 - <span className='text-gray-70'>{yearMonth}</span>
        </p>
      </div>

      <div className='flex gap-9'>
        {/* 라인 차트 영역 */}
        <div className='flex items-center justify-center'>
          <MonthlyLineChart
            monthViewCnt={monthViewCnt}
            monthSaveCnt={monthSaveCnt}
            monthDates={monthDates} // x축 일자
          />
        </div>

        {/* 월간 총 조회/저장 수 표기 영역 */}
        <div className='flex flex-col items-start justify-center'>
          <div className='mx-auto my-0 text-label1-medium text-black'>
            {/* 현재 월의 총 조회 수 */}
            <p className='text-caption-medium text-primary-40'>총 조회 수</p>
            <p className='mb-1 text-label1-medium'>{totalMonthViews}</p>

            {/* 현재 월의 총 저장 수 */}
            <p className='text-caption-medium text-chart2-image'>총 저장 수</p>
            <p className='text-label1-medium'>{totalMonthSaves}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyChart;

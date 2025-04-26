'use client';

import {
  useUserMonthLineData,
  useUserMonthStats,
} from '@/hooks/queries/use-month-chart';
import { useCardDataStore } from '@/store/card-data.store';
import { useEffect } from 'react';
import MonthlyLineChart from '@/components/dashboard/monthly-line-chart';
import { formatYearMonthString } from '@/utils/interaction/format-date';

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
    if (
      !lineData?.monthViewCnt ||
      !lineData?.monthSaveCnt ||
      !Array.isArray(lineData.monthViewCnt)
    )
      return;

    const sumViews = lineData.monthViewCnt.reduce((acc, cur) => acc + cur, 0);
    const sumSaves = lineData.monthSaveCnt.reduce((acc, cur) => acc + cur, 0);
    setHasData(sumViews > 0 || sumSaves > 0);
  }, [lineData, statsData, setHasData]);

  // 펜딩 처리
  if (linePending || statsPending) {
    return (
      <div className='rounded-xl bg-white p-4'>
        <div className='mb-4 h-6 w-1/3 animate-pulse rounded bg-gray-10'></div>
        <div className='h-[120px] animate-pulse rounded bg-gray-5'></div>
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
  const { monthDates, monthViewCnt, monthSaveCnt, start } = lineData;

  // 총 통계 데이터 분해
  const { totalMonthViews = 0, totalMonthSaves = 0 } = statsData;

  // 차트에 표시할 "YYYY.MM"
  const yearMonth = formatYearMonthString(start);

  return (
    <div className='flex flex-col gap-4 rounded-xl bg-white px-7 py-3 max-md:px-4 max-md:pb-[18px] max-md:pt-4'>
      {/* 월간 통계 제목 */}
      <div className='flex items-center'>
        <p className='text-label1-medium'>
          내 명함 월간 통계 - <span className='text-gray-70'>{yearMonth}</span>
        </p>
      </div>

      <div className='flex flex-1 flex-col gap-9 max-md:gap-[18px] md:flex-row'>
        {/* 라인 차트 영역 */}
        <div className='flex flex-1 items-center justify-center'>
          <MonthlyLineChart
            monthViewCnt={monthViewCnt}
            monthSaveCnt={monthSaveCnt}
            monthDates={monthDates} // x축 일자
          />
        </div>

        {/* 월간 총 조회/저장 수 표기 영역 */}
        {/* whitespace-nowrap 적영 여부 확인하기 */}
        <div className='flex flex-col items-start justify-center max-md:flex-row'>
          <div className='mx-auto my-0 text-label1-medium text-black max-md:hidden'>
            {/* 현재 월의 총 조회 수 */}
            <p className='text-caption-medium text-primary-40'>총 조회 수</p>
            <p className='mb-1 text-label1-medium'>{totalMonthViews}</p>

            {/* 현재 월의 총 저장 수 */}
            <p className='text-caption-medium text-chart2-image'>총 저장 수</p>
            <p className='text-label1-medium'>{totalMonthSaves}</p>
          </div>

          {/* md 이하 차트 아래쪽으로 이동 */}
          <div className='flex items-center justify-center md:hidden'>
            {/* 월간 총 조회수 */}
            <div className='flex items-center justify-center gap-2'>
              <span className='text-caption-medium text-primary-40'>
                총 조회 수
              </span>
              <span className='text-label2-medium'>{totalMonthViews}</span>
            </div>

            {/* 세로 구분선 */}
            <span className='mx-[60px] inline-block h-[18px] border-l border-gray-5' />

            {/* 월간 총 저장수 */}
            <div className='flex items-center justify-center gap-2'>
              <span className='text-caption-medium text-chart2-image'>
                총 저장 수
              </span>
              <span className='text-label2-medium'>{totalMonthSaves}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyChart;

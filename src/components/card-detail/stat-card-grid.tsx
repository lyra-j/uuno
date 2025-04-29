'use client';

import { useParams } from 'next/navigation';
import StatCard from '@/components/card-detail/stat-card';
import useMonthSaveCnt from '@/hooks/queries/use-month-save-cnt';
import { useEffect } from 'react';
import { useCardDataStore } from '@/store/card-data.store';
import useMonthViewCnt from '@/hooks/queries/use-month-view-cnt';
import useMonthClickCnt from '@/hooks/queries/use-month-click-cnt';

const StatCardGrid = () => {
  const { id } = useParams();
  const setHasData = useCardDataStore((state) => state.setHasData);

  const {
    data: monthSaveData,
    isPending: monthSaveIsPending,
    error: monthSaveError,
  } = useMonthSaveCnt(id && Array.isArray(id) ? id[0] : '');

  const {
    data: monthViewData,
    isPending: monthViewIsPending,
    error: monthViewError,
  } = useMonthViewCnt(id && Array.isArray(id) ? id[0] : '');

  const {
    data: monthClickData,
    isPending: monthClickIsPending,
    error: monthClickError,
  } = useMonthClickCnt(id && Array.isArray(id) ? id[0] : '');

  const cardValue = [
    {
      title: '월간 조회 수',
      value: monthViewData?.currentMonthViews,
      statusData: monthViewData?.viewsDifference,
      unit: '회' as '회',
    },
    {
      title: '월간 저장 수',
      value: monthSaveData?.currentMonthCount,
      statusData: monthSaveData?.difference,
      unit: '회' as '회',
    },
    {
      title: '월 평균 클릭 수',
      value: monthClickData?.currentMonthClickCount,
      statusData: monthClickData?.difference,
      unit: '회' as '회',
      isLastCard: true,
    },
  ];

  useEffect(() => {
    setHasData(!!monthSaveData || !!monthViewData || !!monthClickData);
  }, [monthSaveData, monthViewData, monthClickData, setHasData]);

  if (monthSaveIsPending || monthViewIsPending || monthClickIsPending) {
    return (
      <div className='mb-[10px] grid grid-cols-2 gap-[10px] md:mb-6 md:grid-cols-3 md:gap-4'>
        {/* 로딩 상태에서는 첫 두 개의 카드는 일반 크기, 마지막 카드는 col-span-2로 설정 */}
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className='rounded-lg bg-white p-4'>
            <div className='h-4 w-1/2 animate-pulse rounded bg-gray-5'></div>
            <div className='my-2 h-6 w-1/3 animate-pulse rounded bg-gray-5'></div>
            <div className='h-4 w-2/3 animate-pulse rounded bg-gray-5'></div>
          </div>
        ))}
        <div className='col-span-2 rounded-lg bg-white p-4 md:col-span-1'>
          <div className='h-4 w-1/2 animate-pulse rounded bg-gray-5'></div>
          <div className='my-2 h-6 w-1/3 animate-pulse rounded bg-gray-5'></div>
          <div className='h-4 w-2/3 animate-pulse rounded bg-gray-5'></div>
        </div>
      </div>
    );
  }

  if (monthSaveError || monthViewError || monthClickError) {
    return (
      <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
        <div className='col-span-3 rounded-lg bg-red-50 p-4 text-error'>
          <p className='font-medium'>
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
          <p className='text-label2-regular'>
            {monthSaveError?.message ||
              monthViewError?.message ||
              monthClickError?.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='mb-[10px] grid grid-cols-2 gap-[10px] md:mb-6 md:grid-cols-3 md:gap-4'>
      {cardValue.map(({ title, value, statusData, unit, isLastCard }) => (
        <div
          key={title}
          className={`${isLastCard ? 'col-span-2 md:col-span-1' : ''}`}
        >
          <StatCard
            title={title}
            value={value}
            statusData={statusData}
            unit={unit}
          />
        </div>
      ))}
    </div>
  );
};

export default StatCardGrid;

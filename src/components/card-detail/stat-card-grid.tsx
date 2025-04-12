'use client';

import { useParams } from 'next/navigation';
import StatCard from '@/components/card-detail/stat-card';
import useMonthSaveCnt from '@/hooks/queries/use-month-save-cnt';
import { useEffect } from 'react';
import { useCardDataStore } from '@/store/card-data.store';

const StatCardGrid = () => {
  const { id } = useParams();
  const { setHasData } = useCardDataStore();

  const {
    data: monthSaveData,
    isPending: monthSaveIsPending,
    error: monthSaveError,
  } = useMonthSaveCnt(id && Array.isArray(id) ? id[0] : '');
  useEffect(() => {
    if (monthSaveData) {
      setHasData(!!monthSaveData);
    }
  }, [monthSaveData, setHasData]);

  if (monthSaveIsPending) {
    return (
      <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
        {[1, 2, 3].map((item) => (
          <div key={item} className='rounded-lg bg-white p-4'>
            <div className='h-4 w-1/2 animate-pulse rounded bg-gray-5'></div>
            <div className='my-2 h-6 w-1/3 animate-pulse rounded bg-gray-5'></div>
            <div className='h-4 w-2/3 animate-pulse rounded bg-gray-5'></div>
          </div>
        ))}
      </div>
    );
  }

  if (monthSaveError) {
    return (
      <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
        <div className='col-span-3 rounded-lg bg-red-50 p-4 text-error'>
          <p className='font-medium'>
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
          <p className='text-label2-regular'>{monthSaveError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
      <StatCard title='월간 조회 수' />
      <StatCard
        title='월간 저장 수'
        value={monthSaveData?.currentMonthCount}
        statusData={monthSaveData?.difference}
        unit='회'
      />
      <StatCard title='월 평균 체류 시간' />
    </div>
  );
};

export default StatCardGrid;

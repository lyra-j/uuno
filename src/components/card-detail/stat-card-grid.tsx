'use client';

import { useParams } from 'next/navigation';
import StatCard from './stat-card';
import useMonthSaveCnt from '@/hooks/queries/use-month-save-cnt';

const StatCardGrid = () => {
  const { id } = useParams();

  const {
    data: monthSaveData,
    isPending: monthSaveIsPending,
    error: monthSaveError,
  } = useMonthSaveCnt(id && Array.isArray(id) ? id[0] : '');
  if (monthSaveIsPending) return <div>Loading...</div>;
  if (monthSaveError) return <div>{monthSaveError.message}</div>;

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

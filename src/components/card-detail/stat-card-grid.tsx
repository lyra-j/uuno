import StatCard from './stat-card';

const StatCardGrid = () => (
  <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
    <StatCard title='월간 조회 수' />
    <StatCard title='월간 저장 수' />
    <StatCard title='월 평균 체류 시간' />
  </div>
);

export default StatCardGrid;

const WeeklyChart = () => (
  <div className='mb-6 rounded-xl bg-white p-4'>
    <div className='mb-4 flex items-center justify-between'>
      <p className='text-base font-medium'>
        포트폴리오 주간 통계 -{' '}
        <span className='text-[#70737C]'>01.13 ~ 01.19</span>
      </p>
    </div>
    <div className='grid grid-cols-3'>
      <div className='col-span-2 mb-2 flex h-40 items-center justify-center rounded-lg bg-gray-100'>
        <span className='text-gray-400'>차트 영역</span>
      </div>
      <div className='col-span-1 mb-6 flex flex-col items-start justify-center text-xs text-gray-500'>
        <div className='mx-auto my-0 text-base font-medium text-[#1A1A1A]'>
          <p className='text-[12px] text-[#3970D5]'>주간 조회 수</p>
          <p>0회</p>
          <p className='text-[12px] text-[#E66B00]'>주간 저장 수</p>
          <p>0회</p>
        </div>
      </div>
    </div>
  </div>
);

export default WeeklyChart;

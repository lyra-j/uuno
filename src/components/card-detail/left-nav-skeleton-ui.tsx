const SkeletonUI = () => {
  return (
    <>
      {/* 셀렉터 스켈레톤 */}
      <div className='mx-7 h-10 animate-pulse rounded bg-gray-200' />

      <div className='relative flex w-[270px] flex-1 flex-col items-center justify-between'>
        <div className='flex w-full flex-col items-center justify-center'>
          {/* 플립카드 스켈레톤 */}
          <div className='m-5 aspect-[9/5] w-full animate-pulse rounded bg-gray-300'>
            <div className='flex h-full items-center justify-center'>
              <div className='h-8 w-8 rounded-full bg-gray-200' />
            </div>
          </div>

          {/* 버튼 스켈레톤 */}
          <div className='mb-2 h-10 w-full animate-pulse rounded-full bg-gray-300' />
          <div className='h-10 w-full animate-pulse rounded-full bg-gray-200' />

          <div className='my-5 mb-3 h-[1px] w-full bg-bg' />

          {/* 링크 스켈레톤 */}
          <div className='h-5 w-32 animate-pulse rounded bg-gray-200' />
        </div>

        <div className='mb-8 flex w-full flex-col items-center justify-center'>
          <div className='my-5 mb-3 h-[1px] w-full bg-bg' />

          {/* 삭제 버튼 스켈레톤 */}
          <div className='h-5 w-20 animate-pulse rounded bg-gray-200' />
        </div>
      </div>
    </>
  );
};
export default SkeletonUI;

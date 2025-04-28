const SkeletonUI = () => {
  return (
    <>
      {/* 셀렉터 스켈레톤 */}
      <div className='mx-7 h-10 animate-pulse rounded bg-gray-200' />

      <div className='relative flex w-full flex-1 flex-col items-center justify-between md:w-[270px]'>
        <div className='flex w-full flex-col items-center justify-center'>
          {/* 플립카드 스켈레톤 */}
          <div className='m-5 aspect-[9/5] w-full animate-pulse rounded bg-gray-300'>
            <div className='flex h-full items-center justify-center'>
              <div className='h-8 w-8 rounded-full bg-gray-200' />
            </div>
          </div>

          {/* 버튼 스켈레톤 */}
          <div className='mb-2 hidden h-10 w-full animate-pulse rounded-full bg-gray-300 md:block' />
          <div className='hidden h-10 w-full animate-pulse rounded-full bg-gray-200 md:block' />

          <div className='my-5 mb-3 hidden h-[1px] w-full bg-bg md:block' />

          {/* 링크 스켈레톤 */}
          <div className='hidden h-5 w-32 animate-pulse rounded bg-gray-200 md:block' />
        </div>

        <div className='mb-8 flex w-full items-center justify-center md:flex-col'>
          <div className='mx-auto h-5 w-20 flex-1 animate-pulse rounded bg-gray-200' />
          {/* 반응형 구분선 스켈레톤 */}
          <div className='mx-2 h-[26px] w-[1px] bg-bg md:hidden' />
          <div className='my-5 mb-3 hidden h-[1px] w-full bg-bg md:block' />

          {/* 삭제 버튼 스켈레톤 */}
          <div className='mx-auto h-5 w-20 flex-1 animate-pulse rounded bg-gray-200' />
        </div>
        {/* 모바일 편집 제한 안내 스켈레톤 */}
        <div className='h-5 w-full animate-pulse rounded bg-gray-200 md:hidden' />
      </div>
    </>
  );
};
export default SkeletonUI;

'use client';

const ElementsSidebar = () => {
  return (
    <div className='my-[14px] flex w-[204px] flex-col items-start gap-[34px]'>
      {/* 검색 */}
      <div className='flex flex-col items-center justify-center self-stretch rounded-[6px] border border-gray-10 px-3 py-[6px]'>
        <input
          type='text'
          placeholder='도형 검색'
          className='focus:outline-noen flex-1 text-xs placeholder-gray-50'
        />
      </div>

      {/* 선 */}
      <div className='flex flex-col items-start gap-6 self-stretch'>
        <p className='text-label2-medium text-gray-100'>선</p>
        <article className='flex items-center gap-6 self-stretch'>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 여기에 선 */}
          </div>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 여기에 선 */}
          </div>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 여기에 선 */}
          </div>
        </article>
      </div>

      {/* 도형 */}
      <div className='flex flex-col items-start gap-3 self-stretch'>
        <p className='text-label2-medium text-gray-100'>도형</p>
        <article className='flex items-center gap-6 self-stretch'>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 여기에 도형 */}
          </div>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 여기에 도형 */}
          </div>
          <div className='flex w-[52px] flex-col items-start gap-6'>
            {/* 여기에 도형 */}
          </div>
        </article>
      </div>
    </div>
  );
};
export default ElementsSidebar;

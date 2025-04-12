import FlipCard from '../card/flip-card';

const LeftNavSection = () => {
  return (
    <div className='relative flex flex-1 flex-col items-center justify-between'>
      <div className='flex w-full flex-col items-center justify-center'>
        <FlipCard attached={true} />
        <button className='mb-2 flex w-full justify-center rounded-full bg-primary-40 px-3 py-[10px] text-label2-regular text-white'>
          편집하기
        </button>
        <button className='flex w-full justify-center rounded-full bg-gray-5 px-3 py-[10px] text-label2-regular'>
          저장 및 공유하기
        </button>
        <div className='my-5 mb-3 h-[1px] w-full bg-bg' />
        <span className='cursor-pointer text-label2-regular text-gray-60'>
          공유 화면 미리보기
        </span>
      </div>
      <div className='mb-9 flex w-full flex-col items-center justify-center'>
        <div className='my-5 mb-3 h-[1px] w-full bg-bg' />
        <span className='cursor-pointer text-label2-regular text-gray-60'>
          삭제하기
        </span>
      </div>
    </div>
  );
};

export default LeftNavSection;

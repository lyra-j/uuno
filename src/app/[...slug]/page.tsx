import FlipCard from '@/components/card/flip-card';

const page = () => {
  return (
    <div className='relative mx-auto flex h-[calc(100vh-64px)] max-w-5xl flex-col items-center justify-center bg-bg border-b border-solid border-gray-10'>
      <div className='absolute left-0 top-0 flex h-[80px] w-full items-center justify-start bg-white px-8 py-5 text-title-bold'>
        <h2>노비님의 포트폴리오 명함</h2>
      </div>
      <div className='flex w-[50%] items-center justify-center'>
        <FlipCard />
      </div>
      <div className='flex items-center justify-center gap-4 mt-9'>
        <button className='flex h-[46px] items-center justify-center rounded-[46px] border border-solid border-gray-10 px-[46px] py-1.5 text-label2-bold shadow-[0px_4px_40px_0px_rgba(0,0,0,0.15)]'>
          이미지 저장
        </button>
        <button className='flex h-[46px] items-center justify-center rounded-[46px] bg-primary-40 px-[46px] py-1.5 text-label2-bold shadow-[0px_4px_40px_0px_rgba(0,0,0,0.15)] text-white'>
          연락처 저장
        </button>
      </div>
    </div>
  );
};

export default page;
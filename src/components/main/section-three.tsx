import React from 'react';

const Section3 = () => {
  return (
    <section className='h-screen bg-gray-100 py-20'>
      <div className='mx-auto flex max-w-6xl flex-col px-6'>
        {/* 왼쪽 텍스트 블럭 */}
        <div>
          <h1 className='mb-4 text-4xl font-bold'>Unno의 핵심 기능</h1>
          <p className='text-black'>명함 제작을 보다 빠르고 쉽게 시작하세요!</p>
        </div>

        <div className='relative h-[400px] w-full'>
          {/* 카드 1 */}
          <div className='absolute right-0 top-0 w-[280px] rounded-xl bg-white p-6 shadow-lg'>
            <h3 className='mb-2 text-lg font-bold'>손쉬운 공유</h3>
            <p className='text-sm'>
              QR코드, 링크, 소셜 미디어까지
              <br />
              어디서든 원클릭으로 당신의 프로페셔널
              <br />
              아이덴티티를 전달하세요.
            </p>
          </div>

          {/* 카드 2 */}
          <div className='absolute left-1/4 top-1/3 w-[280px] rounded-xl bg-white p-6 shadow-lg'>
            <h3 className='mb-2 text-lg font-bold'>간편한 제작</h3>
            <p className='text-sm'>
              직관적인 인터페이스와
              <br />
              세련된 템플릿으로 쉽고 빠르게
              <br />
              디지털 명함을 만들어보세요.
            </p>
          </div>

          {/* 카드 3 */}
          <div className='absolute bottom-0 right-0 w-[280px] rounded-xl bg-white p-6 shadow-lg'>
            <h3 className='mb-2 text-lg font-bold'>스마트한 분석</h3>
            <p className='text-sm'>
              명함 통계로 더 스마트한
              <br />
              네트워킹을 경험하세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;

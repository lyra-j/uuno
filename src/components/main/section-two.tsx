import React from 'react';

const Section2 = () => {
  return (
    <section className='h-screen bg-white py-28'>
      <div className='mx-auto max-w-6xl space-y-8 px-4 text-center'>
        <h2 className='text-5xl font-bold text-gray-900'>
          종이 명함과 차별화된 디지털 명함
        </h2>

        <div className='grid grid-cols-3 gap-8'>
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className='h-[240px] space-y-8 rounded-xl bg-white p-6 text-left shadow-md'
            >
              <div className=''>따옴표 이미지</div>
              <p className='text-gray-700'>실시간 정보 업데이트 가능</p>
              <div className='my-2 border-t border-gray-300' />
              <p>아래 내용</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;

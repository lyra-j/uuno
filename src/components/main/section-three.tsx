import React from 'react';

const items = [
  {
    title: '간편하게 공유하세요',
    description:
      '공간의 제약 없이 소통하세요.\nQR코드, 링크 복사, 이미지 저장으로\n어디서든 연결될 수 있는 소통의 다리를 놓아보세요.',
    reverse: true,
    imageColor: 'bg-green-500',
  },
  {
    title: '손쉽게 분석하세요',
    description:
      '데이터로 보는 나의 명함, 클릭 한 번으로 확인하세요.\n방문자 유형, 링크와 항목 저장 현황을 분석해\n더 효과적인 네트워크 도구로 발전시킬 수 있습니다.',
    reverse: false,
    imageColor: 'bg-yellow-500',
  },
];

const Section3 = () => {
  return (
    <section className='flex flex-col items-center justify-center bg-[#F1F3F6] px-6'>
      <div className='flex w-full max-w-6xl flex-col gap-24'>
        {items.map((el, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              el.reverse ? 'md:flex-row-reverse' : 'md:flex-row'
            } items-center gap-10`}
          >
            <div
              className={`h-[280px] w-full rounded-xl md:w-1/2 ${el.imageColor}`}
            />

            {/* 텍스트 */}
            <div className='my-20 space-y-4'>
              <h2 className='text-4xl font-bold'>{el.title}</h2>
              <p
                className='whitespace-pre-line'
                style={{ color: '#767D7D', fontSize: '20px' }}
              >
                {el.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section3;

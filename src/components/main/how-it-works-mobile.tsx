import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const gifPaths = [
  '/gif/template-manual.gif',
  '/gif/editor-manual.gif',
  '/gif/chart-manual.gif',
  '/gif/share-manual.gif',
];

const sectionContent = [
  {
    title: '템플릿 선택',
    subtitle: '쉽고 간편하게 원하는 템플릿 선택하기',
    content:
      '원하는 키워드의 템플릿을 선택하고 제작하세요.\n 내가 원하는 대로 처음부터 제작할 수 있어요.',
  },
  {
    title: '디자인 커스텀',
    subtitle: '맞춤형 명함을 에디터에서 제작하기',
    content:
      '원하는 키워드의 템플릿을 선택하고 제작하세요.\n 내가 원하는 대로 처음부터 제작할 수 있어요.',
  },
  {
    title: '통계 확인',
    subtitle: '쉽고 간편하게 원하는 템플릿 선택하기',
    content:
      '원하는 키워드의 템플릿을 선택하고 제작하세요.\n 내가 원하는 대로 처음부터 제작할 수 있어요.',
  },
  {
    title: '명함 공유',
    subtitle: '내 명함을 확인하고 다른 사람들에게 공유하기',
    content:
      '원하는 키워드의 템플릿을 선택하고 제작하세요.\n 내가 원하는 대로 처음부터 제작할 수 있어요.',
  },
];

const HowItWorksMobile = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className='flex flex-col items-center justify-center gap-8 px-4 py-10'>
      {/* GIF 영역 */}
      <div className='relative h-[235px] w-[375px]'>
        <Image
          src={gifPaths[activeIndex]}
          alt='how it works gif'
          fill
          className='rounded-md object-cover'
          unoptimized
        />
      </div>

      {/* 텍스트 영역 */}
      <div className='text-center'>
        <h2 className='mb-2 text-title-bold text-primary-40'>
          {sectionContent[activeIndex].title}
        </h2>
        <h3 className='mb-3 text-body-medium text-primary-80'>
          {sectionContent[activeIndex].subtitle}
        </h3>
        <p className='whitespace-pre-line text-label2-regular text-gray-70'>
          {sectionContent[activeIndex].content}
        </p>
      </div>

      {/* 아이콘 캐러셀 */}
      <div className='mt-6 flex gap-4'>
        {gifPaths.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? 'scale-110 bg-primary-40 text-white'
                : 'text-[#B0B0B0] hover:scale-110 hover:text-primary-40'
            }`}
          >
            {/* <Icon icon={iconList[idx]} width={18} height={18} /> */}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksMobile;

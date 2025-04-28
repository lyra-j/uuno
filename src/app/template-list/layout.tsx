import ScrollToTopButton from '@/components/main/ScrollToTopButton';
import TabButtons from '@/components/template-list/tab-buttons';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const TemplateListLayout = ({ children }: Props) => {
  return (
    <section className='mx-auto mt-16 max-w-5xl px-11 max-md:px-8'>
      {/* 상단 문구 영역 */}
      <section className='mt-[138px] text-center text-black'>
        <h4 className='text-label2-medium'>간편하지만 전문적이게</h4>
        <h2 className='mt-2 text-landing-title max-sm:text-title-bold'>
          템플릿을 골라 제작해보세요
        </h2>
      </section>

      {/* 탭 & 버튼 영역 */}
      <TabButtons />
      {/* 탭 슬롯 : simple ,trendy */}
      <section>
        {children}
        <ScrollToTopButton />
      </section>
    </section>
  );
};

export default TemplateListLayout;

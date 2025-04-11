'use client';

import { Templates } from '@/types/supabase.type';
import React, { useRef, useState } from 'react';
import TemplatePreviewModal from './template-preview-modal';
import TemplateStyleSection from './template-style-section';
import { Button } from '@/components/ui/button';
import AddIcon from '@/components/icons/add-icon';
import StyleSelectButton from './style-select-button';

interface Props {
  templates: Templates[];
}

const InteractiveTemplateList = ({ templates }: Props) => {
  // 스크롤 이동 대상 참고 ref
  const simpleSectionRef = useRef<HTMLElement | null>(null);
  const trendySectionRef = useRef<HTMLElement | null>(null);

  // * 모달 관련 상태
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // * '미리보기' 버튼 클릭시
  const handlePreview = (imageUrl: string): void => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  // * 미리보기 모달 닫기
  const closeModal = (): void => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  // 선택 섹션으로 스크롤 이동
  const scrollToSection = (style: 'simple' | 'trendy'): void => {
    if (style === 'simple') {
      simpleSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    if (style === 'trendy') {
      trendySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 템플릿 데이터를 스타일 별로 필터링
  const simpleTemplates = templates.filter((temp) => temp.style === 'simple');
  const trendyTemplates = templates.filter((temp) => temp.style === 'trendy');

  return (
    <section className='mx-auto mt-16 max-w-[1024px] px-11'>
      {/* 상단 문구 영역 */}
      <section className='mt-[138px] text-center'>
        <h4 className='text-label2-m text-[#1A1A1A]'>간편하지만 전문적이게</h4>
        <h2 className='text-title1-b'>템플릿을 골라 제작해보세요</h2>
      </section>
      {/* 버튼 영역 */}
      <section className='mt-[74px] flex justify-between'>
        <StyleSelectButton onScrollTo={scrollToSection} />
        <Button className='text-label2-b rounded-md bg-primary-40 px-4 py-2 text-white hover:bg-primary-50'>
          <AddIcon className='h-4 w-4 text-white' /> 처음부터 만들기
        </Button>
      </section>
      {/* 템플릿 목록 영역 */}
      <section>
        {/* 심플한 템플릿 영역*/}
        <TemplateStyleSection
          title='심플한'
          templates={simpleTemplates}
          sectionRef={simpleSectionRef}
          onPreview={handlePreview}
        />

        {/* 트렌디한 템플릿 영역*/}
        <TemplateStyleSection
          title='트렌디한'
          templates={trendyTemplates}
          sectionRef={trendySectionRef}
          onPreview={handlePreview}
        />
      </section>

      {/* 모달영역 */}
      <TemplatePreviewModal
        imageUrl={modalImage}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default InteractiveTemplateList;

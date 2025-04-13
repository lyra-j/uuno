'use client';

import { Templates } from '@/types/supabase.type';
import React, { useState } from 'react';
import TemplateCard from './template-card';
import TemplatePreviewModal from './template-preview-modal';

interface Props {
  title: string;
  templates: Templates[];
}

const TemplateStyleSection = ({ title, templates }: Props) => {
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
    setModalImage(() => null);
  };

  return (
    <>
      <article className='mb-12 mt-11'>
        <h3 className='mb-[10px] text-body-bold'>{title}</h3>
        {/* 템플릿 리스트 */}
        <ul className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3'>
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={handlePreview}
            />
          ))}
        </ul>
      </article>

      {/* 모달영역 */}
      <TemplatePreviewModal
        imageUrl={modalImage}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default TemplateStyleSection;

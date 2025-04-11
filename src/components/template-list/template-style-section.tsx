'use client';

import { Templates } from '@/types/supabase.type';
import React from 'react';
import TemplateCard from './template-card';

interface Props {
  title: string;
  templates: Templates[];
  sectionRef: React.RefObject<HTMLElement>;
  onPreview: (imageUrl: string) => void;
}

const TemplateStyleSection = ({
  title,
  templates,
  sectionRef,
  onPreview,
}: Props) => {
  return (
    // 스크롤 타겟 섹션
    <article ref={sectionRef} className='mb-12 mt-11'>
      <h3 className='text-body-b mb-2.5'>{title}</h3>
      {/* 템플릿 리스트 */}
      <ul className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3'>
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onPreview={onPreview}
          />
        ))}
      </ul>
    </article>
  );
};

export default TemplateStyleSection;

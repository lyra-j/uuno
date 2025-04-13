import { getTemplateList } from '@/apis/template-list.api';
import TemplateStyleSection from '@/components/template-list/template-style-section';
import { Templates } from '@/types/supabase.type';
import React from 'react';

const SimpleTemplatesPage = async () => {
  const templates: Templates[] = await getTemplateList()
  const simpleTemplates = templates.filter((temp) => temp.style === 'simple');

  return (
    <TemplateStyleSection
      title='심플한'
      templates={simpleTemplates}
    />
  );
};

export default SimpleTemplatesPage;

import { getTemplateList } from '@/apis/template-list.api';
import TemplateStyleSection from '@/components/template-list/template-style-section';
import { Templates } from '@/types/supabase.type';
import React from 'react';

const TrendyTemplatesPage = async () => {
  const templates: Templates[] = await getTemplateList();
  const trendyTemplates = templates.filter((temp) => temp.style === 'trendy');

  return <TemplateStyleSection title='트렌디한' templates={trendyTemplates} />;
};

export default TrendyTemplatesPage;

import { getTemplateList } from '@/apis/template-list.api';
import TemplateStyleSection from '@/components/template-list/template-style-section';
import { TEMPLATE_STYLES } from '@/constants/template.constant';
import React from 'react';

const TrendyTemplatesPage = async () => {
  const { data: trendyTemplates } = await getTemplateList({
    style: TEMPLATE_STYLES.TRENDY,
  });

  return <TemplateStyleSection title='트렌디한' templates={trendyTemplates} />;
};

export default TrendyTemplatesPage;

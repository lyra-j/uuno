import { getTemplateList } from '@/apis/template-list.api';
import TemplateStyleSection from '@/components/template-list/template-style-section';
import { TEMPLATE_STYLES } from '@/constants/template.constant';
import React from 'react';

const SimpleTemplatesPage = async () => {
  const { data: simpleTemplates } = await getTemplateList({
    style: TEMPLATE_STYLES.SIMPLE,
  });

  return <TemplateStyleSection title='심플한' templates={simpleTemplates} />;
};

export default SimpleTemplatesPage;

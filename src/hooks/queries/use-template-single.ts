import { getSingleData } from '@/apis/common-server.api';
import { QUERY_KEY } from '@/constants/query-key';
import { TemplateData } from '@/types/templates.type';
import { useQuery } from '@tanstack/react-query';

export const getTemplateData = (templateId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.TEMPLATES, templateId],
    queryFn: async () => {
      const { data } = await getSingleData<TemplateData>({
        table: 'templates',
        field: 'id',
        value: templateId,
      });
      return data;
    },
  });
};

import { getClientTemplateList } from '@/apis/template-list.client.api';
import { useQuery } from '@tanstack/react-query';

export const useTemplateList = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: getClientTemplateList,
  });
};

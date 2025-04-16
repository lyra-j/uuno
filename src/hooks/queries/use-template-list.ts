import { getTemplateList } from '@/apis/template-list.api';
import { useQuery } from '@tanstack/react-query';

export const useTemplateList = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: () => getTemplateList(),
  });
};

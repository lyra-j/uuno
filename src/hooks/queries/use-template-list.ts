import { getClientTemplateList } from '@/apis/template-list.client.api';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useTemplateList = () => {
  return useQuery({
    queryKey: [QUERY_KEY.TEMPLATES],
    queryFn: getClientTemplateList,
  });
};

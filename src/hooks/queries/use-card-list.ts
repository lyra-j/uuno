import { getCardList } from '@/apis/dashboard.api';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

const useCardList = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD_LIST, userId],
    queryFn: () => getCardList(userId),
    staleTime: 0,
    refetchOnWindowFocus: true, // 창이 포커스될 때마다 재요청
    refetchOnMount: 'always',
  });
};
export default useCardList;

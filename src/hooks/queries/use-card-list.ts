import { getCardList } from '@/apis/dashboard.api';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

const useCardList = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD_LIST, userId],
    queryFn: () => getCardList(userId),
    refetchOnMount: 'always',
  });
};
export default useCardList;

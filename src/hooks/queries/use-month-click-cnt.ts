import { getMonthClickCount } from '@/apis/card-view.api';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

const useMonthClickCnt = (cardId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MONTH_CLICK, cardId],
    queryFn: async () => getMonthClickCount(cardId),
    staleTime: 1000 * 60 * 5,
  });
};

export default useMonthClickCnt;

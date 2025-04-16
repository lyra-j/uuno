import { getMonthViewCount } from '@/apis/card-view.api';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

const useMonthViewCnt = (cardId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MONTH_VIEW, cardId],
    queryFn: async () => getMonthViewCount(cardId),
    staleTime: 1000 * 60 * 5,
  });
};

export default useMonthViewCnt;

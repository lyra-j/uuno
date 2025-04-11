import { getMonthSaveCount } from '@/apis/card-view.api';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

const useMonthSaveCnt = (cardId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MONTH_SAVE, cardId],
    queryFn: async () => getMonthSaveCount(cardId),
    staleTime: 1000 * 60 * 5,
  });
};

export default useMonthSaveCnt;

import { getMonthAvgDuration } from '@/apis/monthly-duration';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useMonthAvgDuration = (cardId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.DURATION_MONTHLY, cardId],
    queryFn: () => getMonthAvgDuration(cardId),
    staleTime: 1000 * 60 * 5,
  });
};

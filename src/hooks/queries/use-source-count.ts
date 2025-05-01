import { getWeeklySourceCounts } from '@/apis/weekly-source-count.api';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useWeeklySourceCounts = (cardId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.SOURCE_CNT_WEEK, cardId],
    queryFn: async () => getWeeklySourceCounts(cardId),
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });
};

//월간 단위를 구해야 할 경우 아래쪽에 추가

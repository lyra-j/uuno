import { useQuery }              from '@tanstack/react-query'
import { getWeeklySourceCounts } from '@/apis/weekly-source-count.api'
import { QUERY_KEY } from '@/constants/query-key'

export const useWeeklySourceCounts = (cardId: string) =>
  useQuery({
    queryKey: [QUERY_KEY.SOURCE_CNT_WEEK, cardId],
    queryFn: () => getWeeklySourceCounts(cardId),
    staleTime: 1000 * 60 * 5,   
  })

  //월간 단위를 구해야 할 경우 아래쪽에 추가
import { getInteractionLineChartData } from '@/apis/interaction-line-chart.api';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

const useWeekChart = (card_id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.WEEK_CHART],
    queryFn: async () => getInteractionLineChartData({ card_id }),
  });
};

export default useWeekChart;

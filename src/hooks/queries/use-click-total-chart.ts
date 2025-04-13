import { getUserClickDonutChartData } from '@/apis/user-click-donut-chart.api';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

const useClickTotalChart = (card_id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CLICK_TOTAL_CHART, card_id],
    queryFn: async () => getUserClickDonutChartData(card_id),
    staleTime: 1000 * 60 * 5,
  });
};

export default useClickTotalChart;

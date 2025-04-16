import {
  getMostViewedCard,
  getUserMonthlyLineData,
  getUserMonthlyStats,
} from '@/apis/monthly-chart.api';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

// 월간 라인 차트
export const useUserMonthLineData = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MONTH_CHART, userId],
    queryFn: () => getUserMonthlyLineData(userId),
    enabled: !!userId,
  });
};

// 유저별 보유 명함 월간 조회
export const useUserMonthStats = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MONTH_STATS, userId],
    queryFn: () => getUserMonthlyStats(userId),
    enabled: !!userId,
  });
};

// 가장 조회수가 높은 카드
export const useMostViewedCard = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MOST_VIEW, userId],
    queryFn: () => getMostViewedCard(userId),
    enabled: !!userId,
  });
};

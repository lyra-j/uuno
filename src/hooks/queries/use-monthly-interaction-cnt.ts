import {
  getMonthClickCount,
  getMonthSaveCount,
  getMonthViewCount,
} from '@/apis/card-monthly-count.api';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

/**
 * useMonthViewCnt
 * @description 주어진 카드 ID에 대해 이번 달 조회 수(view) 통계를 React Query로 가져옵니다.
 *              캐싱 및 재요청 간격은 5분으로 설정되어 있습니다.
 * @param cardId 조회할 명함 ID
 * @returns React Query의 useQuery 반환 객체
 */
export const useMonthViewCnt = (cardId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MONTH_VIEW, cardId],
    queryFn: async () => getMonthViewCount(cardId),
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * useMonthSaveCnt
 * @description 주어진 카드 ID에 대해 이번 달 저장 수(save) 통계를 React Query로 가져옵니다.
 *              캐싱 및 재요청 간격은 5분으로 설정되어 있습니다.
 * @param cardId 조회할 명함 ID
 * @returns React Query의 useQuery 반환 객체
 */
export const useMonthSaveCnt = (cardId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MONTH_SAVE, cardId],
    queryFn: async () => getMonthSaveCount(cardId),
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * useMonthClickCnt
 * @description 주어진 카드 ID에 대해 이번 달 클릭 수(click) 통계를 React Query로 가져옵니다.
 *              캐싱 및 재요청 간격은 5분으로 설정되어 있습니다.
 * @param cardId 조회할 명함 ID
 * @returns React Query의 useQuery 반환 객체
 */
export const useMonthClickCnt = (cardId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MONTH_CLICK, cardId],
    queryFn: async () => getMonthClickCount(cardId),
    staleTime: 1000 * 60 * 5,
  });
};

import { getCardId } from '@/apis/card-interaction';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

/**
 * 슬러그를 기반으로 명함 ID를 조회하는 쿼리 훅
 *
 * @param slug 명함 슬러그 문자열
 * @returns
 */
const useCardInteraction = (slug: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD_INTERACTION],
    queryFn: async () => getCardId(slug),
    enabled: !!slug, // slug가 존재할 때만 쿼리 활성화
  });
};

export default useCardInteraction;

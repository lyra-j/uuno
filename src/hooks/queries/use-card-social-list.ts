import { getCardSocialLists } from '@/apis/card-social-list';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

/**
 * 명함의 소셜 링크 목록
 *
 * @param card_id 소셜 링크를 조회할 명함 ID
 * @returns
 */
const useCardSocialList = (card_id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD_SOCIAL_LIST, card_id],
    queryFn: async () => getCardSocialLists(card_id),
    enabled: !!card_id, // card_id가 존재할 때만 쿼리 활성화
  });
};

export default useCardSocialList;

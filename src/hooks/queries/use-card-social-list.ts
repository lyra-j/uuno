import { getCardSocialLists } from '@/apis/card-social-list';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

const useCardSocialList = (card_id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD_SOCIAL_LIST],
    queryFn: async () => getCardSocialLists(card_id),
    enabled: !!card_id,
  });
};

export default useCardSocialList;

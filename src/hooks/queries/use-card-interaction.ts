import { getCardId } from '@/apis/card-interaction';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

const useCardInteraction = (slug: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD_INTERACTION],
    queryFn: async () => getCardId(slug),
    enabled: !!slug,
  });
};

export default useCardInteraction;

import { getSlugData } from '@/apis/get-slug-data';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

/**
 * 명함 slug 조회
 *
 * @param cardId  명함 id
 * @returns
 */
const useCardSlug = (cardId: string, options?: { enabled?: boolean }) => {
  if (!cardId) return;
  return useQuery({
    queryKey: [QUERY_KEY.CARD_SLUG, cardId],
    queryFn: async () => getSlugData(cardId),
    enabled: options?.enabled ?? !!cardId,
    refetchOnMount: 'always',
  });
};

export default useCardSlug;

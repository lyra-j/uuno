import { getSlugData } from '@/apis/get-slug-data';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

/**
 * 명함 slug 조회
 *
 * @param card_id  명함 id
 * @returns
 */
const useCardSlug = (card_id: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD_SLUG, card_id],
    queryFn: async () => getSlugData(card_id),
    enabled: options?.enabled ?? !!card_id,
  });
};

export default useCardSlug;

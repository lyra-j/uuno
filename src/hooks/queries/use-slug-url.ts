import { getSingleData } from '@/apis/common-server.api';
import { QUERY_KEY } from '@/constants/query-key';
import { Cards } from '@/types/supabase.type';
import { useQuery } from '@tanstack/react-query';

export const useSlugUrl = (slug: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD_SLUG, slug],
    queryFn: async () => {
      const { data } = await getSingleData<Cards>({
        table: 'cards',
        field: 'slug',
        value: slug ?? '',
      });

      if (!data) {
        throw new Error('해당 슬러그에 해당하는 카드가 없습니다.');
      }
      return data.frontImgURL;
    },
  });
};

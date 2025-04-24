import { getCardSelectList } from '@/apis/card-select-list';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

const useCardSelectList = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD_SELECT_LIST, userId],
    queryFn: async () => {
      if (userId === '') return null;
      return getCardSelectList(userId);
    },
    enabled: !!userId,
  });
};

export default useCardSelectList;

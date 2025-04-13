import { getCardSelectList } from '@/apis/card-select-list';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

const useCardSelectList = (user_id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD_SELECT_LIST],
    queryFn: async () => {
      if (user_id === '') return null;
      return getCardSelectList(user_id);
    },
    enabled: !!user_id,
  });
};

export default useCardSelectList;

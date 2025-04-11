import { getMonthSaveCount } from '@/apis/card-view.api';
import { useQuery } from '@tanstack/react-query';

const useMonthSaveCnt = (cardId: string) => {
  return useQuery({
    queryKey: ['month-save', cardId],
    queryFn: async () => getMonthSaveCount(cardId),
    staleTime: 1000 * 60 * 5,
  });
};

export default useMonthSaveCnt;

import { getCardList, getCardListBySort } from '@/apis/dashboard.api';
import { QUERY_KEY } from '@/constants/query-key';
import { SortKey } from '@/types/sort.type';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useCardList = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD_LIST, userId],
    queryFn: () => getCardList(userId),
    refetchOnMount: 'always',
  });
};

export const useSortedCards = (userId: string, sortKey: SortKey) => {
  return useQuery({
    queryKey: [QUERY_KEY.SORT_CARD, userId, sortKey],
    queryFn: () => getCardListBySort({ userId, sortBy: sortKey }),
    enabled: Boolean(userId),
    placeholderData: keepPreviousData,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
};

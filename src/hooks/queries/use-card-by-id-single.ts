import { getSingleDataByClient } from '@/apis/common-client.api';
import { QUERY_KEY } from '@/constants/query-key';
import { TABLES } from '@/constants/tables.constant';
import { CardData } from '@/types/cards.type';
import { useQuery } from '@tanstack/react-query';

export const useCardDataById = (cardId: string) =>
  useQuery({
    queryKey: [QUERY_KEY.CARD, cardId],
    queryFn: async () => {
      const { data, error } = await getSingleDataByClient<CardData>({
        table: TABLES.CARDS,
        field: 'id',
        value: cardId,
      });
      if (error) throw error;
      return data!;
    },
    enabled: !!cardId,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });

import { getSingleData } from '@/apis/common-server.api';
import { CardData } from '@/types/cards.type';
import { useQuery } from '@tanstack/react-query';

export const useCardDataById = (cardId: string) => {
  return useQuery({
    queryKey: ['card', cardId],
    queryFn: async () => {
      const { data } = await getSingleData<CardData>({
        table: 'cards',
        field: 'id',
        value: cardId,
      });
      return data;
    },
  });
};

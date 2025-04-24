import { getSingleData } from '@/apis/common-server.api';
import { CardData } from '@/types/cards.type';
import { useQuery } from '@tanstack/react-query';

export const useCardDataById = (cardId: string) =>
  useQuery({
    queryKey: ['card', cardId],
    queryFn: async () => {
      const { data, error } = await getSingleData<CardData>({
        table: 'cards',
        field: 'id',
        value: cardId,
      });
      if (error) throw error;
      return data!;
    },
    enabled: !!cardId,
  });

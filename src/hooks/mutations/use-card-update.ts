import { useMutation } from '@tanstack/react-query';
import { CardData } from '@/types/cards.type';
import { updateCard } from '@/apis/card-update';
import { TablesUpdate } from '@/types/supabase';

export const useCardUpdate = () => {
  return useMutation<
    CardData,
    Error,
    { id: string; payload: TablesUpdate<'cards'> }
  >({
    mutationFn: updateCard,
  });
};

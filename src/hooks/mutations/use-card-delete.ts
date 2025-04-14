import { deleteCard } from '@/apis/card-delete';
import { QUERY_KEY } from '@/constants/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCardDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (card_id: string) => deleteCard(card_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CARD_SELECT_LIST] });
    },
    onError: (error) => {
      console.error('카드 삭제 중 오류 발생:', error);
    },
  });
};
